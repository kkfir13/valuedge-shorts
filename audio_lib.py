# Synthesized music + SFX for a ValuEdge board. All original, generated from the board's beats and hit frames.
import wave
import numpy as np

SR = 48000
rng = np.random.default_rng(7)


def env(n, a=0.005, d=0.2):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)


def tone(freq, dur, a=0.005, d=0.3, harm=(1, 0.5, 0.25), detune=0.0):
    n = int(dur * SR); t = np.arange(n) / SR
    return sum(h * np.sin(2 * np.pi * freq * (k + 1) * (1 + detune) * t) for k, h in enumerate(harm)) * env(n, a, d)


def noise(dur): return rng.uniform(-1, 1, int(dur * SR))


def lp(x, k):
    y = np.zeros_like(x); acc = 0.0
    for i in range(len(x)):
        acc += k * (x[i] - acc); y[i] = acc
    return y


def pluck(freq, dur=0.6):  # soft nylon-style Karplus-Strong
    n = int(dur * SR); p = max(2, int(SR / freq))
    buf = lp(lp(rng.uniform(-1, 1, p), 0.35), 0.35); buf -= buf.mean(); buf /= max(1e-9, np.abs(buf).max())
    out = np.zeros(n); prev = 0.0
    for i in range(n):
        j = i % p; out[i] = buf[j]
        nv = 0.5 * (buf[j] + buf[(j + 1) % p]) * 0.994; buf[j] = 0.6 * nv + 0.4 * prev; prev = nv
    a = int(0.004 * SR); out[:a] *= np.linspace(0, 1, a)
    return lp(out, 0.3)


def add(buf, sig, at, g=1.0):
    i = int(at * SR)
    if i >= len(buf) or i + len(sig) <= 0: return
    j = min(len(buf), i + len(sig)); buf[max(0, i):j] += g * sig[max(0, -i):j - i]


def hz(m): return 440 * 2 ** ((m - 69) / 12)


def whoosh(d=0.5, k0=0.05, k1=0.4):
    n = int(d * SR); x = noise(d); y = np.zeros(n); acc = 0.0
    for i in range(n):
        k = k0 + (k1 - k0) * np.sin(np.pi * i / n); acc += k * (x[i] - acc); y[i] = acc
    return y * np.sin(np.pi * np.arange(n) / n) ** 2


def ting(f=2400, d=0.6): return tone(f, d, 0.001, 0.25, (1, 0.3, 0.15, 0.1))
def thunk(f=90, d=0.3): return tone(f, d, 0.001, 0.07, (1, 0.5)) + lp(noise(d), 0.15) * env(int(d * SR), 0.001, 0.03) * 0.6
def creak(d=0.5):
    n = int(d * SR); t = np.arange(n) / SR; fr = 180 + 60 * np.sin(2 * np.pi * 2.3 * t)
    return np.sign(np.sin(2 * np.pi * np.cumsum(fr) / SR)) * 0.3 * np.sin(np.pi * t / d) * lp(noise(d), 0.2).clip(0, 1) * 4
def pop(): return tone(700, 0.15, 0.001, 0.04, (1, 0.6)) * np.linspace(1.3, 0.7, int(0.15 * SR))


PROGS = [  # (bass roots, chords, melody) — a few original loops, picked by board seed
    ([48, 45, 41, 43], [[60, 64, 67], [57, 60, 64], [57, 60, 65], [55, 59, 62]], [[72, 76, 79, 76], [72, 74, 76, 72], [69, 72, 77, 76], [74, 71, 67, 71]]),
    ([43, 40, 36, 38], [[55, 59, 62], [52, 55, 59], [52, 55, 60], [50, 54, 57]], [[67, 71, 74, 71], [67, 69, 71, 67], [64, 67, 72, 71], [69, 66, 62, 66]]),
    ([45, 41, 48, 43], [[57, 60, 64], [57, 60, 65], [55, 60, 64], [55, 59, 62]], [[69, 72, 76, 72], [69, 72, 77, 72], [67, 72, 76, 79], [74, 71, 67, 71]]),
]


def music(board, dur):
    N = int(dur * SR); out = np.zeros(N)
    roots, chords, mel = PROGS[board.get("seed", 0) % len(PROGS)]
    bpm = 100 + 8 * (board.get("seed", 0) % 3); beat = 60 / bpm
    stop = dur
    for bt in board["beats"]:
        if bt.get("twist"): stop = bt["a"] / 30; break
    bar, t = 0, 0.15
    while t < stop:
        root, ch = roots[bar % 4], chords[bar % 4]
        for b in range(4):
            tb = t + b * beat
            if tb >= stop: break
            add(out, pluck(hz(root if b % 2 == 0 else root + 7), 0.5) * 0.5, tb)
            if b % 2 == 1:
                for m in ch: add(out, pluck(hz(m), 0.35) * 0.15, tb)
            k = noise(0.12) * env(int(0.12 * SR), 0.001, 0.03)
            add(out, (lp(k, 0.35) if b % 2 else np.sin(2 * np.pi * 60 * np.arange(int(0.15 * SR)) / SR) * env(int(0.15 * SR), 0.001, 0.06)) * 0.35, tb)
            if bar >= 2: add(out, tone(hz(mel[bar % 4][b]), 0.4, 0.002, 0.18, (1, 0.0, 0.15)) * 0.16, tb)
        pad = sum(tone(hz(m), 4 * beat, 0.25, 3.0, (1, 0.3), d) for m in ch for d in (-0.002, 0.002))
        fade = np.minimum(1, (stop - (t + np.arange(len(pad)) / SR)).clip(0) / 0.05)
        add(out, pad * 0.07 * fade, t)
        bar += 1; t += 4 * beat
    if stop < dur - 0.5:
        dr = sum(tone(hz(m), dur - stop, 0.6, 99, (1, 0.4)) for m in (36, 43))
        add(out, dr * 0.12 * np.minimum(1, np.linspace(1, 0, len(dr)) * 4), stop)
    for bt in board["beats"]:
        if bt["shot"] == "finale":
            h = (bt.get("hits") or [int((bt["a"] + bt["b"]) / 2)])[0]
            add(out, sum(tone(hz(m), 2.2, 0.35, 2.5, (1, 0.35, 0.1)) for m in (60, 64, 67, 72)) * 0.2, h / 30 - 0.05)
    return out


def sfx(board, dur, flashes):
    N = int(dur * SR); s = np.zeros(N); F = lambda f: f / 30.0
    for f in flashes: add(s, whoosh(0.45), F(f) - 0.3, 0.5)
    for bt in board["beats"]:
        a, b, H, sh = bt["a"], bt["b"], bt.get("hits") or [], bt["shot"]
        h0 = H[0] if H else (a + b) // 2
        if sh == "intro" and bt.get("fx", "coin") != "none":
            add(s, ting(1900, 0.9), F(h0), 0.6); add(s, ting(2850, 0.7), F(h0 + 2), 0.4)
        elif sh == "wide" and bt.get("timelapse"):
            add(s, whoosh(1.6, 0.02, 0.2), F(a + 0.25 * (b - a)), 0.45)
        elif sh == "work" and bt.get("prop") != "paper":
            for f in np.arange(a + 6, b, 19.6): add(s, lp(noise(0.25), 0.3) * np.sin(np.pi * np.arange(int(0.25 * SR)) / (0.25 * SR)), F(f), 0.35)
        elif sh == "closeup":
            for f in H: add(s, ting(3200, 0.4), F(f), 0.35)
        elif sh == "gift":
            add(s, whoosh(0.3, 0.1, 0.5), F(h0 - 11), 0.4); add(s, pop(), F(h0), 0.6)
        elif sh == "empty_chair":
            add(s, creak(0.9), F(a + 4), 0.25)
        elif sh == "vault":
            add(s, thunk(70, 0.3), F(h0 - 11), 0.5); add(s, creak(0.35), F(h0 - 10), 0.3)
            add(s, thunk(55, 0.6), F(h0), 0.8); add(s, whoosh(0.8, 0.2, 0.7), F(h0), 0.6)
            for i in range(10): add(s, lp(noise(0.12), 0.5) * env(int(0.12 * SR), 0.002, 0.04), F(h0 + 4 + i * 4), 0.25)
        elif sh == "crates":
            for f in H[:3]: add(s, thunk(110, 0.3), F(f), 0.7)
        elif sh == "rock":
            for f in range(a + 5, h0 - 10, 22): add(s, creak(0.45), F(f), 0.22)
            add(s, whoosh(2.0, 0.02, 0.15), F(a + 5), 0.35)
            if bt.get("sleep", True):
                for j in range(3):
                    n = int(0.9 * SR); add(s, lp(noise(0.9), 0.05) * np.sin(np.pi * np.arange(n) / n) ** 2, F(h0 + 4) + j * 1.0, 0.45)
        elif sh == "grow":
            add(s, thunk(160, 0.2), F(h0 - 2), 0.6); add(s, whoosh(1.4, 0.03, 0.25), F(h0), 0.55)
            for f in range(h0 + 8, h0 + 42, 6): add(s, lp(noise(0.3), 0.6) * env(int(0.3 * SR), 0.01, 0.1), F(f), 0.2)
        elif sh == "rain":
            h1 = H[0] if H else a + 60; h2 = H[1] if len(H) > 1 else h1 + 20
            for i in range(26):
                t0 = (h2 - 18 if i >= 14 else h1 - 66) + (i % 14) * 4 + 18
                add(s, ting(2000 + 600 * ((i * 7) % 5) / 5, 0.35), F(t0), 0.18)
            for f in (h1, h2): add(s, tone(hz(84), 1.2, 0.002, 0.5, (1, 0.4, 0.2)), F(f), 0.4)
        elif sh == "chart":
            bad = bt.get("trend", "bubble") in ("bubble", "crash")
            for k, f in enumerate(range(a + 4, h0, 5)): add(s, tone(hz(72 + min(k, 14)), 0.12, 0.002, 0.05, (1, 0.3)), F(f), 0.12)
            if bad: add(s, thunk(50, 0.9), F(h0), 0.8); add(s, tone(hz(48), 1.2, 0.002, 0.6, (1, 0.5)) * np.linspace(1, 0.4, int(1.2 * SR)), F(h0), 0.4); add(s, whoosh(1.0, 0.3, 0.05), F(h0), 0.5)
            else: add(s, ting(2600, 0.8), F(h0), 0.5)
        elif sh == "ticker":
            for f in np.arange(a + 2, b, 1.6): add(s, lp(noise(0.03), 0.7) * env(int(0.03 * SR), 0.001, 0.008), F(f), 0.18)
            add(s, whoosh(0.6, 0.2, 0.6), F(h0), 0.5); add(s, ting(2200, 0.5), F(h0), 0.35)
        elif sh == "bankrun":
            n = int(F(b - a) * SR); mur = lp(noise(F(b - a)), 0.08) * (0.6 + 0.4 * np.sin(np.arange(n) / SR * 7) ** 2)
            add(s, mur * np.minimum(1, np.arange(n) / (0.3 * SR)), F(a), 0.35)
            for f in np.arange(a + 3, h0, 7.5): add(s, thunk(140, 0.08), F(f), 0.18)
            add(s, thunk(60, 0.7), F(h0), 0.9); add(s, creak(0.3), F(h0 - 6), 0.3)
        elif sh == "ship":
            n = int(F(b - a) * SR); add(s, lp(noise(F(b - a)), 0.03) * (0.5 + 0.5 * np.sin(np.arange(n) / SR * 1.4) ** 2), F(a), 0.4)
            add(s, sum(tone(hz(m), 1.6, 0.08, 1.2, (1, 0.6, 0.3)) for m in (43, 50)), F(h0), 0.45)
        elif sh == "stack":
            for f in H[:3]:
                for j in range(4): add(s, ting(3000 + 300 * j, 0.25), F(f) + j * 0.035, 0.22)
        elif sh == "calendar":
            u = 0.0
            while a + 4 + u < h0: add(s, lp(noise(0.06), 0.5) * env(int(0.06 * SR), 0.002, 0.02), F(a + 4 + u), 0.3); u += max(1.2, 5 - u * 0.08)
            add(s, ting(1800, 0.9), F(h0), 0.5)
        elif sh == "finale":
            add(s, thunk(45, 1.2), F(a), 0.8); add(s, tone(hz(36), 1.5, 0.002, 0.6, (1, 0.6)), F(a), 0.4)
            add(s, ting(1500, 1.5), F(h0), 0.35)
    return s


def save(p, x):
    x = np.clip(x / max(1e-9, np.abs(x).max()) * 0.9, -1, 1)
    with wave.open(p, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype("<i2").tobytes())
