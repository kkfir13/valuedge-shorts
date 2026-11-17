#!/usr/bin/env python3
"""ValuEdge Shorts: script JSON -> voiceover -> word timing -> board -> render -> music/SFX -> captions -> MP4.

usage: python3 make_video.py scripts/<slug>.json [--voice existing.mp3] [--scale 0.6667] [--procs 2] [--stills-only]
Writes out/<slug>.mp4, out/<slug>_sheet.jpg, out/<slug>.srt, out/<slug>.json (meta + QA).
Needs ELEVENLABS_API_KEY in the environment unless --voice is given.
"""
import argparse, base64, json, math, os, re, ssl, subprocess, sys, time, urllib.request, wave
import numpy as np

ROOT = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, ROOT)
import audio_lib as A

FPS, SR = 30, 48000
VOICE_ID = os.environ.get("VOICE_ID", "CwhRBWXzGAHq8TQ4Fs17")  # ElevenLabs premade "Roger - Laid-Back, Casual, Resonant"
VOICE_SETTINGS = {"stability": 0.55, "similarity_boost": 0.70}
SHOT_LOC = {"vault": "vault", "crates": "porch", "rock": "chair", "empty_chair": "chair", "grow": "meadow", "rain": "hill", "finale": "hill",
            "chart": "exchange", "ticker": "exchange", "bankrun": "city", "ship": "harbor", "stack": "office", "calendar": "office"}
SHOTS = {"intro", "wide", "work", "closeup", "gift", "empty_chair", "vault", "crates", "rock", "grow", "rain", "crowd", "finale",
         "chart", "ticker", "bankrun", "ship", "stack", "calendar"}
HITS_NEEDED = {"intro": 1, "closeup": 3, "gift": 1, "vault": 1, "crates": 3, "rock": 1, "grow": 1, "rain": 2, "finale": 1,
               "chart": 1, "ticker": 1, "bankrun": 1, "ship": 1, "stack": 3, "calendar": 1}
LOCS = {"gas", "store", "street", "porch", "meadow", "city", "exchange", "harbor", "office"}
ERAS = {"1600s", "1700s", "1800s", "1900s", "modern"}
CAMS = {"push", "pull", "orbit", "low", "high", "dutch", "whip", "drift"}


def sh(cmd, **kw):
    return subprocess.run(cmd, check=True, capture_output=True, **kw)


def norm(w): return re.sub(r"[^a-z0-9']", "", w.lower())


# ---------------- voiceover ----------------
def _ctx():
    for p in (os.environ.get("SSL_CERT_FILE"), os.path.expanduser("~/.ccr/ca-bundle.crt")):
        if p and os.path.exists(p): return ssl.create_default_context(cafile=p)
    return ssl.create_default_context()


def eleven(text, out_mp3, speed=1.0):
    """Returns per-character (char, start, end) alignment, or None when only plain audio was available."""
    key = os.environ.get("ELEVENLABS_API_KEY")
    if not key: raise SystemExit("ELEVENLABS_API_KEY is not set")
    errors = []
    for model in (os.environ.get("TTS_MODEL", "eleven_v4"), "eleven_multilingual_v2"):
        body = json.dumps({"text": text, "model_id": model, "voice_settings": {**VOICE_SETTINGS, "speed": speed}}).encode()
        req = urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps?output_format=mp3_44100_128",
                                     data=body, headers={"xi-api-key": key, "Content-Type": "application/json"})
        try:
            r = json.loads(urllib.request.urlopen(req, context=_ctx(), timeout=180).read())
            open(out_mp3, "wb").write(base64.b64decode(r["audio_base64"]))
            al = r.get("alignment") or r.get("normalized_alignment")
            print(f"voice: {model} with timestamps")
            return list(zip(al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]))
        except Exception as e:  # noqa
            errors.append(f"{model}: {e}")
    # plain TTS as last resort (timing from silence detection)
    body = json.dumps({"text": text, "model_id": os.environ.get("TTS_MODEL", "eleven_v4"), "voice_settings": {**VOICE_SETTINGS, "speed": speed}}).encode()
    req = urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}?output_format=mp3_44100_128",
                                 data=body, headers={"xi-api-key": key, "Content-Type": "application/json"})
    try:
        open(out_mp3, "wb").write(urllib.request.urlopen(req, context=_ctx(), timeout=180).read())
    except Exception as e:  # noqa
        raise SystemExit("ElevenLabs failed: " + " | ".join(errors + [str(e)]))
    print("voice: plain audio (timestamps unavailable: " + " | ".join(errors) + ")")
    return None


KOKORO_DIR = os.path.expanduser("~/.cache/kokoro")
KOKORO_URL = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/"
KOKORO_VOICE = os.environ.get("KOKORO_VOICE", "af_heart")
# narration mastering: rumble cut, a little warmth and presence, gentle de-ess, light compression, a small dry room
VOICE_CHAIN = ("highpass=f=70,equalizer=f=180:t=q:w=1:g=2,equalizer=f=3200:t=q:w=1.2:g=2.5,equalizer=f=7500:t=q:w=1.5:g=-2.5,"
               "acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120:makeup=2,aecho=0.85:0.5:23|37:0.12|0.08,loudnorm=I=-18:TP=-2")


def kokoro(beats, out_mp3, voice=None, speed=0.96, pace=1.0):
    """Offline voice (Kokoro-82M via kokoro-onnx, Apache-2.0). Whole sentences are spoken in one pass so the
    intonation carries across a sentence; beat boundaries inside a sentence snap to the model's own pauses.
    Pauses between sentences are paced: longer after the hook and before the twist. Returns word timings."""
    try:
        from kokoro_onnx import Kokoro
    except ImportError:
        sh([sys.executable, "-m", "pip", "install", "--break-system-packages", "-q", "kokoro-onnx", "soundfile"])
        from kokoro_onnx import Kokoro
    os.makedirs(KOKORO_DIR, exist_ok=True)
    for f in ("kokoro-v1.0.onnx", "voices-v1.0.bin"):
        if not os.path.exists(f"{KOKORO_DIR}/{f}"):
            sh(["curl", "-sSfL", "--retry", "3", "-o", f"{KOKORO_DIR}/{f}", KOKORO_URL + f])
    k = Kokoro(f"{KOKORO_DIR}/kokoro-v1.0.onnx", f"{KOKORO_DIR}/voices-v1.0.bin")
    voice = voice or KOKORO_VOICE
    if "+" in voice:  # blend, e.g. "am_michael+am_fenrir"
        parts = voice.split("+"); voice = sum(k.get_voice_style(v) for v in parts) / len(parts)
    groups, cur = [], []
    for i, b in enumerate(beats):
        cur.append(i)
        if re.search(r"[.!?]['\"]?$", b["text"].strip()) or i == len(beats) - 1: groups.append(cur); cur = []
    twist = next((i for i, b in enumerate(beats) if b.get("twist")), None)
    sr0, chunks, words, t = 24000, [np.zeros(int(0.25 * 24000), np.float32)], [], 0.25
    for gi, g in enumerate(groups):
        texts = [beats[i]["text"].strip() for i in g]
        a, sr0 = k.create(" ".join(texts), voice=voice, speed=speed, lang="en-us")
        a = np.asarray(a, dtype=np.float32)
        nz = np.where(np.abs(a) > 0.01)[0]
        if len(nz): a = a[max(0, nz[0] - int(0.03 * sr0)): nz[-1] + int(0.08 * sr0)]
        d = len(a) / sr0
        # energy envelope (10 ms) to find the model's own pauses
        hop = int(0.01 * sr0); env = np.sqrt(np.convolve(a ** 2, np.ones(hop) / hop, "same"))[::hop]; quiet = env < 0.02
        lens = [len(x) for x in texts]; cum = np.cumsum([0] + lens) / sum(lens)
        bounds = [0.0]
        for j in range(1, len(texts)):
            exp = cum[j] * d; best, bs = None, -1e9
            i = 0
            while i < len(quiet):
                if quiet[i]:
                    j2 = i
                    while j2 < len(quiet) and quiet[j2]: j2 += 1
                    mid, ln = (i + j2) / 2 * 0.01, (j2 - i) * 0.01
                    if ln >= 0.04 and mid > bounds[-1] + 0.3:
                        sc = ln * 3 - abs(mid - exp)
                        if sc > bs: best, bs = mid, sc
                    i = j2
                else: i += 1
            bounds.append(best if best is not None and abs(best - exp) < 0.35 * d else exp)
        bounds.append(d)
        for j, txt in enumerate(texts):
            s0, e0 = bounds[j], bounds[j + 1]
            ws = txt.split(); L = [len(w) + 1 for w in ws]; c = np.cumsum([0] + L) / sum(L)
            for q, w in enumerate(ws): words.append({"w": w, "s": t + s0 + c[q] * (e0 - s0), "e": t + s0 + c[q + 1] * (e0 - s0) - 0.02})
        nxt = g[-1] + 1
        gap = 0.62 if gi == 0 else 0.72 if twist is not None and nxt == twist else 0.85 if twist is not None and nxt == twist + 1 else 0.42
        gap *= pace
        if gi == len(groups) - 1: gap = 0.3
        chunks += [a, np.zeros(int(gap * sr0), np.float32)]
        t += d + gap
    audio = np.concatenate(chunks)
    raw = f"{out_mp3}.f32"; audio.astype("<f4").tofile(raw)
    sh(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(sr0), "-ac", "1", "-i", raw, "-af", VOICE_CHAIN, "-ar", "44100", "-b:a", "192k", out_mp3])
    os.remove(raw)
    print(f"voice: kokoro {voice if isinstance(voice, str) else 'blend'}, {t:.1f}s")
    return words


def duration(p):
    return float(sh(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p]).stdout)


def speech_segments(p):
    err = subprocess.run(["ffmpeg", "-hide_banner", "-i", p, "-af", "silencedetect=noise=-35dB:d=0.25", "-f", "null", "-"], capture_output=True, text=True).stderr
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", err)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", err)]
    dur = duration(p); segs, t = [], 0.0
    for s0, e0 in zip(starts, ends + [dur]):
        if s0 > t + 0.05: segs.append((t, s0))
        t = e0
    if t < dur - 0.05: segs.append((t, dur))
    return segs


def words_from_alignment(text, al):
    words, cur, i = [], None, 0
    chars = [c for c, _, _ in al]
    # alignment is over the same text; walk both
    for k, (c, t0, t1) in enumerate(al):
        if c.isspace():
            if cur: words.append(cur); cur = None
        else:
            if not cur: cur = {"w": "", "s": t0, "e": t1}
            cur["w"] += c; cur["e"] = t1
    if cur: words.append(cur)
    return words


def words_from_silence(beats, segs):
    """Fallback: beat boundaries snap to speech-segment starts (monotonic DP on expected char-proportional times);
    words are spread by length over the speech (not the pauses) inside each beat."""
    texts = [b["text"] for b in beats]; K, S = len(texts), len(segs)
    if S < K:  # fewer pauses than beats: split the longest segments
        segs = list(segs)
        while len(segs) < K:
            i = max(range(len(segs)), key=lambda j: segs[j][1] - segs[j][0]); s0, e0 = segs[i]; m = (s0 + e0) / 2
            segs[i:i + 1] = [(s0, m), (m, e0)]
        S = len(segs)
    lens = [len(t) for t in texts]; cum = np.cumsum([0] + lens) / sum(lens)
    total = sum(e - s for s, e in segs); sp = np.cumsum([0] + [e - s for s, e in segs]) / total  # speech fraction at each seg start
    INF = 1e18; cost = [[INF] * (S + 1) for _ in range(K + 1)]; arg = [[0] * (S + 1) for _ in range(K + 1)]
    cost[0][0] = 0.0
    for k in range(1, K + 1):  # beat k-1 uses segments [j, i)
        for i in range(k, S - (K - k) + 1):
            for j in range(k - 1, i):
                if cost[k - 1][j] == INF: continue
                c = cost[k - 1][j] + (sp[j] - cum[k - 1]) ** 2
                if c < cost[k][i]: cost[k][i] = c; arg[k][i] = j
    bounds, i = [S], S
    for k in range(K, 0, -1): i = arg[k][i]; bounds.append(i)
    bounds = bounds[::-1]
    out = []
    for k, t in enumerate(texts):
        my = segs[bounds[k]:bounds[k + 1]]; tot = sum(e - s for s, e in my)
        def at(x):
            acc = x * tot
            for s0, e0 in my:
                if acc <= e0 - s0 + 1e-9: return s0 + acc
                acc -= e0 - s0
            return my[-1][1]
        ws = t.split(); L = [len(w) + 1 for w in ws]; c = np.cumsum([0] + L) / sum(L)
        for i2, w in enumerate(ws): out.append({"w": w, "s": at(c[i2]), "e": at(c[i2 + 1]) - 0.03})
    return out


# ---------------- board ----------------
def build_board(script, words, dur):
    beats, wi = [], 0
    for i, b in enumerate(script["beats"]):
        n = len(b["text"].split()); bw = words[wi:wi + n]; wi += n
        if len(bw) < n: raise SystemExit(f"timing mismatch in beat {i}")
        bt = {k: v for k, v in b.items() if k not in ("text", "hit_words")}
        if bt.get("shot") not in SHOTS: raise SystemExit(f"beat {i}: unknown shot {bt.get('shot')}")
        if bt.get("loc") and bt["loc"] not in LOCS: raise SystemExit(f"beat {i}: unknown loc {bt['loc']}")
        if bt.get("cam") and bt["cam"] not in CAMS: raise SystemExit(f"beat {i}: unknown cam {bt['cam']}")
        bt["_s"], bt["_e"], bt["_words"] = bw[0]["s"], bw[-1]["e"], bw
        hits, j = [], 0
        for hwd in b.get("hit_words", []):
            for k in range(j, len(bw)):
                if norm(bw[k]["w"]) == norm(hwd): hits.append(max(0, round(bw[k]["s"] * FPS) - 2)); j = k + 1; break
        bt["hits"] = hits
        beats.append(bt)
    N = int(math.ceil((dur + 0.6) * FPS))
    for i, bt in enumerate(beats):
        bt["a"] = 0 if i == 0 else max(beats[i - 1]["a"] + 12, round(bt["_s"] * FPS) - 3)
    for i, bt in enumerate(beats):
        bt["b"] = beats[i + 1]["a"] if i + 1 < len(beats) else N
        need = HITS_NEEDED.get(bt["shot"], 0)
        bt["hits"] = [h for h in bt["hits"] if bt["a"] <= h < bt["b"]]
        while len(bt["hits"]) < need: bt["hits"].append(round(bt["a"] + (bt["b"] - bt["a"]) * (len(bt["hits"]) + 1) / (need + 1)))
    board = {"frames": N, "seed": script.get("seed", 0), "hero": script.get("hero", {}), "crates": script.get("crates", ["SOAP", "POWER", "RAILS"]),
             "buildings": script.get("buildings", ["HOSPITAL", "LIBRARY"]), "era": script.get("era", "modern"), "sets": script.get("sets", {}),
             "chart": script.get("chart", {}), "calendar": script.get("calendar", ""),
             "beats": [{k: v for k, v in bt.items() if not k.startswith("_")} for bt in beats]}
    loc = lambda bt: SHOT_LOC.get(bt["shot"]) or bt.get("loc") or ("street" if bt["shot"] == "crowd" else "gas")
    flashes = [bt["a"] for i, bt in enumerate(board["beats"]) if i > 0 and bt.get("flash", loc(bt) != loc(board["beats"][i - 1]))]
    return board, beats, flashes


def film_timing(script, words, dur):
    """film mode: beat windows + word frames for the film module (web/films/<slug>.timing.json)."""
    beats, wi = [], 0
    for i, b in enumerate(script["beats"]):
        n = len(b["text"].split()); bw = words[wi:wi + n]; wi += n
        if len(bw) < n: raise SystemExit(f"timing mismatch in beat {i}")
        beats.append({"text": b["text"], "twist": bool(b.get("twist")), "finale": bool(b.get("finale")), "_s": bw[0]["s"], "_e": bw[-1]["e"], "_words": bw})
    N = int(math.ceil((dur + 0.6) * FPS))
    for i, bt in enumerate(beats): bt["a"] = 0 if i == 0 else max(beats[i - 1]["a"] + 8, round(bt["_s"] * FPS) - 2)
    for i, bt in enumerate(beats): bt["b"] = beats[i + 1]["a"] if i + 1 < len(beats) else N
    timing = {"fps": FPS, "frames": N, "beats": [{"a": bt["a"], "b": bt["b"], "text": bt["text"],
              "words": [{"w": w["w"], "f": round(w["s"] * FPS), "e": round(w["e"] * FPS)} for w in bt["_words"]]} for bt in beats]}
    board = {"frames": N, "seed": script.get("seed", 0),
             "beats": [{"a": bt["a"], "b": bt["b"], "twist": bt["twist"], "shot": "finale" if bt["finale"] else "film",
                        "hits": [round(bt["_words"][-1]["s"] * FPS)]} for bt in beats]}
    return timing, board, beats


# ---------------- render ----------------
def render(board_name, out_dir, N, scale, procs, frames=None, film=None, manifest=None):
    os.makedirs(out_dir, exist_ok=True)
    env = {**os.environ, "SCALE": str(scale), **({"FILM": film[0], "TIMING": film[1]} if film else {"BOARD": board_name})}
    if frames is not None:
        sh(["node", "render.mjs", out_dir, ",".join(map(str, frames)) or "none"], cwd=ROOT, env={**env, **({"MANIFEST": manifest} if manifest else {})}); return
    cuts = [round(N * k / procs) for k in range(procs + 1)]
    ps = [subprocess.Popen(["node", "render.mjs", out_dir, f"{cuts[k]}-{cuts[k + 1] - 1}"], cwd=ROOT, env={**env, "RESUME": "1", **({"MANIFEST": manifest} if manifest and k == 0 else {})},
                           stdout=open(f"{out_dir}/r{k}.log", "w"), stderr=subprocess.STDOUT) for k in range(procs)]
    t0 = time.time()
    while any(p.poll() is None for p in ps):
        time.sleep(30)
        n = len([f for f in os.listdir(out_dir) if f.endswith(".jpg")])
        print(f"  render {n}/{N} frames, {time.time() - t0:.0f}s", flush=True)
    if any(p.returncode for p in ps): raise SystemExit("render failed, see " + out_dir)
    missing = [f for f in range(N) if not os.path.exists(f"{out_dir}/f{f:04d}.jpg")]
    if missing: raise SystemExit(f"missing frames: {missing[:10]}")


# ---------------- audio ----------------
def load(p):
    raw = sh(["ffmpeg", "-v", "error", "-i", p, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"]).stdout
    return np.frombuffer(raw, "<f4").astype(np.float64)


def gated_rms(x, gate_db=-40):
    w = int(0.05 * SR); n = len(x) // w
    r = np.sqrt((x[: n * w].reshape(n, w) ** 2).mean(1) + 1e-20)
    keep = r > r.max() * 10 ** (gate_db / 20)
    return float(np.sqrt((r[keep] ** 2).mean()))


def make_audio(board, flashes, voice_mp3, work, music_db=-16.0, sfx_db=-6.0, cues=None):
    dur = board["frames"] / FPS
    A.save(f"{work}/music.wav", A.music(board, dur)); A.save(f"{work}/sfx.wav", A.sfx_film(cues, dur, FPS) if cues is not None else A.sfx(board, dur, flashes))
    sh(["ffmpeg", "-v", "error", "-y", "-i", f"{work}/music.wav", "-af", "equalizer=f=1500:t=o:w=2.2:g=-6,equalizer=f=300:t=q:w=1:g=-3", f"{work}/music_eq.wav"])
    v, m, s = load(voice_mp3), load(f"{work}/music_eq.wav"), load(f"{work}/sfx.wav")
    L = int(dur * SR); v = np.pad(v, (0, max(0, L - len(v))))[:L]; m = np.pad(m, (0, max(0, L - len(m))))[:L]; s = np.pad(s, (0, max(0, L - len(s))))[:L]
    rv = gated_rms(v)
    m *= 10 ** (music_db / 20) * rv / gated_rms(m)
    s *= 10 ** (sfx_db / 20) * rv / gated_rms(s)
    cap = 0.7 * np.abs(v).max()
    if np.abs(s).max() > cap: s *= cap / np.abs(s).max()
    mix = v + m + s
    with wave.open(f"{work}/mix.wav", "wb") as w:
        w.setnchannels(1); w.setsampwidth(4); w.setframerate(SR)
        w.writeframes((np.clip(mix, -1, 1) * 2147483647).astype("<i4").tobytes())
    I = re.findall(r"I:\s+(-?[\d.]+) LUFS", subprocess.run(["ffmpeg", "-hide_banner", "-i", f"{work}/mix.wav", "-af", "ebur128=framelog=quiet", "-f", "null", "-"],
                                                         capture_output=True, text=True).stderr)[-1]
    g = -14.0 - float(I)
    sh(["ffmpeg", "-v", "error", "-y", "-i", f"{work}/mix.wav", "-af", f"volume={g}dB,alimiter=limit=0.891:level=false:attack=2:release=60", "-ar", "48000", "-ac", "2", f"{work}/master.wav"])
    return {"music_vs_voice_db": round(20 * np.log10(gated_rms(m) / rv), 1), "sfx_vs_voice_db": round(20 * np.log10(gated_rms(s) / rv), 1)}


# ---------------- captions ----------------
def ts(x, srt=False):
    h, m, s = int(x // 3600), int(x % 3600 // 60), x % 60
    return f"{h:02d}:{m:02d}:{s:06.3f}".replace(".", ",") if srt else f"{h}:{m:02d}:{s:05.2f}"


def captions(beats, dur, work, srt_path, max_words=2):
    cues = []
    for bt in beats:
        ws, cur = bt["_words"], []
        for k, w in enumerate(ws):
            cur.append(w)
            if len(cur) >= max_words or re.search(r"[.,!?;:]$", w["w"]) or k == len(ws) - 1:
                if len(cur) < 2 and cues and k == len(ws) - 1 and not re.search(r"[.!?]$", cues[-1][2]) and len(cues[-1][2].split()) < max_words:
                    s0, _, t = cues.pop(); cues.append((s0, w["e"], t + " " + w["w"]))
                else:
                    cues.append((cur[0]["s"], cur[-1]["e"], " ".join(x["w"] for x in cur)))
                cur = []
    out = []
    for i, (s, e, t) in enumerate(cues):
        nxt = cues[i + 1][0] if i + 1 < len(cues) else dur
        out.append((s, min(nxt, e + 0.35), t))
    with open(srt_path, "w") as f:
        for i, (s, e, t) in enumerate(out, 1): f.write(f"{i}\n{ts(s, True)} --> {ts(e, True)}\n{t}\n\n")
    font = "Poppins" if subprocess.run(["fc-list", ":family=Poppins"], capture_output=True, text=True).stdout.strip() else "DejaVu Sans"
    hdr = f"""[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,{font},84,&H00FFFFFF,&H00FFFFFF,&H00201420,&H70000000,-1,0,0,0,100,100,0,0,1,5,3,2,70,70,520,1
Style: Mark,{font},54,&H40FFFFFF,&H40FFFFFF,&H60201420,&H00000000,-1,0,0,0,100,100,1,0,1,3,0,8,40,40,70,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 1,{ts(0)},{ts(dur)},Mark,,0,0,0,,valuedge.app
"""
    with open(f"{work}/subs.ass", "w") as f:
        f.write(hdr)
        for s, e, t in out: f.write(f"Dialogue: 0,{ts(s)},{ts(e)},Cap,,0,0,0,,{t}\n")
    return out


# ---------------- film mode ----------------
def film_main(a, script, slug, work, voice, words, dur):
    """The script's film module (web/films/<slug>.js, or the path in "film") stages every shot; this renders it."""
    import shutil
    timing, board, beats = film_timing(script, words, dur)
    fpath = f"films/{slug}.js"; src = script["film"] if isinstance(script["film"], str) else f"web/{fpath}"
    src = src if os.path.isabs(src) else f"{ROOT}/{src}"
    tpath0 = f"films/{slug}.timing.json"
    if not os.path.exists(src):
        json.dump(timing, open(f"{ROOT}/web/{tpath0}", "w"))
        for i, b in enumerate(timing["beats"]): print(f"  beat {i} [{b['a']}-{b['b']}] " + " ".join(f"{w['w']}@{w['f']}" for w in b["words"]))
        print(f"voice ready ({dur:.1f}s, {timing['frames']} frames). Now write the film module {src} and run again."); return
    if os.path.abspath(src) != os.path.abspath(f"{ROOT}/web/{fpath}"): shutil.copy(src, f"{ROOT}/web/{fpath}")
    tpath = f"films/{slug}.timing.json"; json.dump(timing, open(f"{ROOT}/web/{tpath}", "w"))
    N = timing["frames"]; man = f"{work}/manifest.json"; film = (fpath, tpath)
    print(f"{slug}: {dur:.1f}s voice, {N} frames, {len(beats)} beats (film mode)")
    for i, b in enumerate(timing["beats"]): print(f"  beat {i} [{b['a']}-{b['b']}] " + " ".join(f"{w['w']}@{w['f']}" for w in b["words"]))
    if a.stills_only:
        st = f"{work}/stills"; shutil.rmtree(st, ignore_errors=True)
        render(None, st, N, a.scale, 1, [], film=film, manifest=man)
        M = json.load(open(man)); fr = sorted(set(min(N - 1, s["a"] + max(6, (s["b"] - s["a"]) // 2)) for s in M["shots"]))
        print(f"shots {len(M['shots'])}, cues {len(M['cues'])}, sets {sorted(set(s['set'] for s in M['shots']))}")
        render(None, st, N, a.scale, 1, fr, film=film)
        sh(["python3", "sheet.py", st, f"{ROOT}/out/{slug}_sheet.jpg"], cwd=ROOT); print("stills:", f"out/{slug}_sheet.jpg"); return
    t0 = time.time()
    render(None, f"{work}/frames", N, a.scale, a.procs, film=film, manifest=man)
    M = json.load(open(man))
    levels = make_audio(board, [], voice, work, cues=M["cues"])
    cues = captions(beats, N / FPS, work, f"{ROOT}/out/{slug}.srt")
    mp4 = f"{ROOT}/out/{slug}.mp4"
    sh(["ffmpeg", "-v", "error", "-y", "-framerate", str(FPS), "-i", f"{work}/frames/f%04d.jpg", "-i", f"{work}/master.wav",
        "-map", "0:v:0", "-map", "1:a:0", "-vf", f"scale=1080:1920:flags=lanczos,ass={work}/subs.ass", "-c:v", "libx264", "-preset", "veryfast",
        "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-c:a", "aac", "-b:a", "192k", "-shortest", mp4])
    qa = subprocess.run(["ffmpeg", "-hide_banner", "-i", mp4, "-vf", "freezedetect=n=0.0005:d=0.4,blackdetect=d=0.05:pix_th=0.05",
                         "-af", "ebur128=framelog=quiet", "-f", "null", "-"], capture_output=True, text=True).stderr
    sh(["ffmpeg", "-v", "error", "-y", "-i", mp4, "-vf", "fps=1,scale=216:384,tile=8x6", "-frames:v", "1", f"{ROOT}/out/{slug}_sheet.jpg"])
    sl = [s["b"] - s["a"] for s in M["shots"]]
    meta = {"slug": slug, "title": script.get("title"), "duration": duration(mp4), "bytes": os.path.getsize(mp4), "levels": levels,
            "freezes": re.findall(r"freeze_duration: ([\d.]+)", qa), "black": re.findall(r"black_start:([\d.]+)", qa),
            "lufs": (re.findall(r"I:\s+(-?[\d.]+) LUFS", qa) or [None])[-1], "render_s": round(time.time() - t0), "captions": len(cues),
            "mode": "film", "shots": [f"{s['set']}:{s['trans']}" + (f":{s['name']}" if s.get("name") else "") for s in M["shots"]],
            "sets": sorted(set(s["set"] for s in M["shots"])), "avg_shot_s": round(sum(sl) / len(sl) / FPS, 2), "sfx_cues": len(M["cues"]),
            "narrator": script.get("voice_label") or ("file:" + os.path.basename(a.voice) if a.voice else (script.get("narrator") or KOKORO_VOICE) if a.tts == "kokoro" else "eleven:roger")}
    json.dump(meta, open(f"{ROOT}/out/{slug}.json", "w"), indent=1)
    print(json.dumps(meta))


# ---------------- main ----------------
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("script"); ap.add_argument("--voice"); ap.add_argument("--scale", type=float, default=1.0)
    ap.add_argument("--procs", type=int, default=2); ap.add_argument("--stills-only", action="store_true")
    ap.add_argument("--tts", choices=["eleven", "kokoro"], default=os.environ.get("TTS", "eleven"), help="voice source when --voice is not given")
    a = ap.parse_args()
    script = json.load(open(a.script)); slug = script["slug"]
    work = f"{ROOT}/work/{slug}"; os.makedirs(work, exist_ok=True); os.makedirs(f"{ROOT}/out", exist_ok=True)
    text = " ".join(b["text"].strip() for b in script["beats"])
    voice = f"{work}/voice.mp3"
    if a.voice:
        tempo = float(script.get("tempo", 1.0))  # e.g. 1.15 brings Roger (≈2.7 words/s) to the reference pace
        af = ["silenceremove=stop_periods=-1:stop_duration=0.3:stop_threshold=-40dB:stop_silence=0.24"] if script.get("film") else []
        if tempo != 1.0: af.append(f"atempo={tempo}")
        if af: sh(["ffmpeg", "-v", "error", "-y", "-i", a.voice, "-af", ",".join(af), "-ar", "44100", "-b:a", "192k", voice])
        else: sh(["cp", a.voice, voice])
        dur = duration(voice); words = words_from_silence(script["beats"], speech_segments(voice))
    elif a.tts == "kokoro":
        wj = f"{work}/words_kokoro.json"
        if os.path.exists(voice) and os.path.exists(wj): words = json.load(open(wj)); print("voice: reused kokoro")
        else: words = kokoro(script["beats"], voice, script.get("narrator"), script.get("speed", 1.04 if script.get("film") else 0.96), script.get("pace", 0.7 if script.get("film") else 1.0)); json.dump(words, open(wj, "w"))
        dur = duration(voice)
    else:
        if os.path.exists(voice) and os.path.exists(f"{work}/align.json"): al = json.load(open(f"{work}/align.json")) or None; print("voice: reused")
        else: al = eleven(text, voice, float(script.get("speed", 1.08))); json.dump(al, open(f"{work}/align.json", "w"))
        dur = duration(voice)
        words = words_from_alignment(text, al) if al else words_from_silence(script["beats"], speech_segments(voice))
    if script.get("film"): return film_main(a, script, slug, work, voice, words, dur)
    board, beats, flashes = build_board(script, words, dur)
    bname = f"boards/{slug}.json"; os.makedirs(f"{ROOT}/web/boards", exist_ok=True)
    json.dump(board, open(f"{ROOT}/web/{bname}", "w"), indent=1)
    print(f"{slug}: {dur:.1f}s voice, {board['frames']} frames, {len(beats)} beats, flashes {flashes}")
    mids = [ (bt['a'] + bt['b']) // 2 for bt in board["beats"]] + [h for bt in board["beats"] for h in bt["hits"][:1]]
    sheet_frames = sorted(set(min(board["frames"] - 1, f + 4) for f in mids))
    if a.stills_only:
        render(bname, f"{work}/stills", board["frames"], a.scale, 1, sheet_frames)
        sh(["python3", "sheet.py", f"{work}/stills", f"{ROOT}/out/{slug}_sheet.jpg"], cwd=ROOT); print("stills:", f"out/{slug}_sheet.jpg"); return
    t0 = time.time()
    render(bname, f"{work}/frames", board["frames"], a.scale, a.procs)
    levels = make_audio(board, flashes, voice, work)
    cues = captions(beats, board["frames"] / FPS, work, f"{ROOT}/out/{slug}.srt")
    mp4 = f"{ROOT}/out/{slug}.mp4"
    sh(["ffmpeg", "-v", "error", "-y", "-framerate", str(FPS), "-i", f"{work}/frames/f%04d.jpg", "-i", f"{work}/master.wav",
        "-map", "0:v:0", "-map", "1:a:0", "-vf", f"scale=1080:1920:flags=lanczos,ass={work}/subs.ass", "-c:v", "libx264", "-preset", "veryfast",
        "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-c:a", "aac", "-b:a", "192k", "-shortest", mp4])
    qa = subprocess.run(["ffmpeg", "-hide_banner", "-i", mp4, "-vf", "freezedetect=n=0.0005:d=0.4,blackdetect=d=0.05:pix_th=0.05",
                         "-af", "ebur128=framelog=quiet", "-f", "null", "-"], capture_output=True, text=True).stderr
    sh(["ffmpeg", "-v", "error", "-y", "-i", mp4, "-vf", "fps=1,scale=216:384,tile=8x6", "-frames:v", "1", f"{ROOT}/out/{slug}_sheet.jpg"])
    meta = {"slug": slug, "title": script.get("title"), "duration": duration(mp4), "bytes": os.path.getsize(mp4), "levels": levels,
            "freezes": re.findall(r"freeze_duration: ([\d.]+)", qa), "black": re.findall(r"black_start:([\d.]+)", qa),
            "lufs": (re.findall(r"I:\s+(-?[\d.]+) LUFS", qa) or [None])[-1], "render_s": round(time.time() - t0), "captions": len(cues),
            "shots": [f"{b['shot']}@{SHOT_LOC.get(b['shot']) or b.get('loc') or ('street' if b['shot'] == 'crowd' else 'gas')}" for b in board["beats"]],
            "era": board.get("era"), "narrator": "eleven:roger" if a.tts == "eleven" and not a.voice else (script.get("narrator") or KOKORO_VOICE)}
    json.dump(meta, open(f"{ROOT}/out/{slug}.json", "w"), indent=1)
    print(json.dumps(meta))


if __name__ == "__main__":
    main()
