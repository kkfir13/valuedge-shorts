// Film runtime: loads a per-video film module (sets + shots) and the narration timing, and turns any frame f
// into render layers. Each layer is a function that poses the scene for one shot and returns its frame state;
// two layers + mix make a dissolve. Everything is a pure function of f, so frames render in any order.
import * as THREE from "three";
import { world } from "./core.js";
import { OUTFITS } from "./cast.js";
import { E, LIGHTS, light, backdrop, mixLight, CAM, makeKit, mat } from "./kit.js";

const { clamp, lerp, prog, back, easeIn, easeOut, ss, wob } = E;
let FPS = 30, N = 0;
const SETS = {}, PL = [], CUES = [];
let SHOTS = [], SCAN = false, TT = null;
const hashStr = (s) => { let h = 7; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) % 9973; return h; };
const idle = (f, seed) => ({ tilt: 1.3 * Math.sin(f * 0.07 + seed), headTilt: 2.2 * Math.sin(f * 0.05 + seed * 2.1), sy: 1 + 0.01 * Math.sin(f * 0.13 + seed) });
const blinkAt = (f, seed) => { const per = 80 + (seed % 5) * 9, ph = (f + seed * 23) % per; return ph < 2 ? 1 : ph < 4 ? 0.5 : 0; };
const norm = (w) => String(w).toLowerCase().replace(/[^a-z0-9']/g, "");

function helpers(TIM) {
  const B = TIM.beats;
  const T = {
    fps: FPS, N, beats: B.length,
    sec: (s) => Math.round(s * FPS),
    beat: (i) => { const b = B[Math.max(0, Math.min(B.length - 1, i))]; return { a: b.a, b: b.b, s: b.words[0]?.f ?? b.a, e: b.words[b.words.length - 1]?.e ?? b.b, text: b.text }; },
    at: (i, k = 0) => { const b = T.beat(i); return Math.round(lerp(b.a, b.b, k)); },
    /** frame where word w (n-th match) is spoken in beat i; falls back to the beat start */
    word: (i, w, n = 0) => { const b = B[i]; if (!b) return 0; let k = 0; for (const x of b.words) if (norm(x.w) === norm(w) && k++ === n) return x.f; console.warn("word not found", i, w); return b.a; },
    wordEnd: (i, w, n = 0) => { const b = B[i]; if (!b) return 0; let k = 0; for (const x of b.words) if (norm(x.w) === norm(w) && k++ === n) return x.e; return b.b; },
  };
  return T;
}

export async function buildFilm(path, timingPath) {
  const TIM = await (await fetch(timingPath)).json();
  FPS = TIM.fps || 30; N = TIM.frames;
  const T = helpers(TIM); TT = T;
  const mod = await import(new URL(path, location.href).href);
  const K = { E, CAM, LIGHTS, light, backdrop, mixLight, mat, THREE, T };
  const spec = mod.default(K, T);
  for (const [id, o] of Object.entries(spec.cast || {})) OUTFITS[id] = { ...(o.base ? OUTFITS[o.base] : {}), ...o };
  for (const [id, fn] of Object.entries(spec.sets || {})) {
    const G = new THREE.Group(); G.visible = false; world.add(G);
    const reg = [], lamps = [], Bk = makeKit(G, reg, lamps);
    const anchors = fn(Bk) || {};
    G.updateMatrixWorld(true);
    for (const o of reg) { const b = o.userData.base; b.p.copy(o.position); b.r.copy(o.rotation); b.s.copy(o.scale); b.v = o.visible; }
    SETS[id] = { G, reg, lamps, anchors: { clouds: Bk.meta.clouds, ...anchors } };
  }
  for (let i = 0; i < 4; i++) { const l = new THREE.PointLight(0xffffff, 0, 10, 1.6); world.add(l); PL.push(l); }
  // shot timing: f | t (seconds) | beat (+frac) | word: [beat, "word"]
  SHOTS = spec.shots.map((s, i) => {
    let a = s.f ?? (s.t != null ? T.sec(s.t) : s.word ? T.word(s.word[0], s.word[1], s.word[2] ?? 0) - (s.lead ?? 2) : s.beat != null ? T.at(s.beat, s.frac ?? 0) : null);
    if (a == null) throw new Error(`shot ${i}: needs f, t, beat or word`);
    if (!SETS[s.set]) throw new Error(`shot ${i}: unknown set ${s.set}`);
    return { ...s, i, a };
  });
  SHOTS.sort((x, y) => x.a - y.a); SHOTS[0].a = 0;
  for (let i = 1; i < SHOTS.length; i++) SHOTS[i].a = Math.max(SHOTS[i].a, SHOTS[i - 1].a + 10);
  SHOTS.forEach((s, i) => (s.b = i + 1 < SHOTS.length ? SHOTS[i + 1].a : N));
  window.FILM = { frames: N, fps: FPS, shots: SHOTS.map((s) => ({ a: s.a, b: s.b, set: s.set, trans: s.trans || "cut", name: s.name || "" })) };
  window.filmScan = scan;
  return { film: true };
}

// ---------- transitions ----------
const TR = { cut: [0, 0], dissolve: [4, 4], whip: [4, 4], zoom: [8, 6], flash: [0, 6], dip: [5, 5], smash: [0, 7] };
const span = (s) => { const d = TR[s.trans || "cut"] || [0, 0], k = s.transDur ? s.transDur / (d[0] + d[1] || 1) : 1; return [Math.round(d[0] * k), Math.round(d[1] * k)]; };
const shotAt = (f) => { let i = 0; for (let k = 0; k < SHOTS.length; k++) if (f >= SHOTS[k].a) i = k; return i; };
function yaw(cam, ang, roll = 0) {
  const d = [cam.t[0] - cam.p[0], cam.t[2] - cam.p[2]], c = Math.cos(ang), s = Math.sin(ang);
  cam.t[0] = cam.p[0] + d[0] * c - d[1] * s; cam.t[2] = cam.p[2] + d[0] * s + d[1] * c; cam.roll = (cam.roll || 0) + roll; return cam;
}

export function frameState(f) {
  const i = shotAt(f), s = SHOTS[i], nx = SHOTS[i + 1];
  const res = { layers: [], mix: 0, blur: [0, 0], zoomBlur: 0 };
  // which cut's window are we in? (the next cut before it, or this shot's own cut after it)
  let j = -1;
  if (nx && f >= nx.a - span(nx)[0]) j = i + 1; else if (i > 0 && f < s.a + span(s)[1]) j = i;
  if (j < 0) { res.layers.push(() => evalShot(s, f)); return res; }
  const A = SHOTS[j - 1], B = SHOTS[j], c = B.a, [pre, post] = span(B), tr = B.trans || "cut", dir = B.dir ?? (B.i % 2 ? -1 : 1);
  if (tr === "dissolve") { res.layers.push(() => evalShot(A, f), () => evalShot(B, f)); res.mix = ss(prog(f, c - pre, c + post)); }
  else if (tr === "whip") {
    if (f < c) { const k = easeIn(prog(f, c - pre, c)); res.layers.push(() => evalShot(A, f, (cm) => yaw(cm, dir * 0.95 * k, dir * 0.05 * k))); res.blur = [dir * 0.07 * k, 0]; }
    else { const k = 1 - easeOut(prog(f, c, c + post)); res.layers.push(() => evalShot(B, f, (cm) => yaw(cm, -dir * 0.95 * k, -dir * 0.05 * k))); res.blur = [dir * 0.07 * k, 0]; }
  } else if (tr === "zoom") {
    const kp = prog(f, c - pre, c + 3), km = ss(prog(f, c - 4, c + 3));
    const push = (cm) => { const e = easeIn(kp); cm.p = cm.p.map((v, q) => lerp(v, cm.t[q], 0.92 * e)); cm.fov *= 1 - 0.4 * e; return cm; };
    const land = (cm) => { cm.fov *= lerp(0.55, 1, easeOut(prog(f, c - 4, c + post))); return cm; };
    if (f < c + 3) res.layers.push(() => evalShot(A, f, push));
    if (f >= c - 4) res.layers.push(() => evalShot(B, f, land));
    res.mix = res.layers.length === 2 ? km : 0; res.zoomBlur = 0.16 * (1 - Math.abs(f - c) / Math.max(pre, post));
  } else if (tr === "dip") {
    const sh = f < c ? A : B; res.layers.push(() => { const st = evalShot(sh, f); st.fade *= f < c ? 1 - prog(f, c - pre, c) : prog(f, c, c + post); return st; });
  } else if (tr === "flash" || tr === "smash") {
    if (f < c) res.layers.push(() => evalShot(A, f));
    else res.layers.push(() => { const d = f - c; const st = evalShot(B, f, tr === "smash" ? (cm) => { const a = 0.09 * (1 - d / post) * (d % 2 ? -1 : 1); cm.p[1] += a; cm.t[1] += a * 0.7; cm.t[0] += a * 0.5; return cm; } : null);
      st.flash = Math.max(st.flash, (tr === "smash" ? 0.55 : 0.9) * (1 - d / post)); return st; });
  } else res.layers.push(() => evalShot(f < c ? A : B, f));
  return res;
}

// ---------- one shot at frame f ----------
let VIS = null;
function evalShot(s, f, camMod) {
  const set = SETS[s.set], lf = f - s.a, len = Math.max(1, s.b - s.a), u = lf / len;
  if (VIS !== s.set) { for (const [id, x] of Object.entries(SETS)) x.G.visible = id === s.set; VIS = s.set; }
  for (const o of set.reg) { const b = o.userData.base; o.position.copy(b.p); o.rotation.copy(b.r); o.scale.copy(b.s); o.visible = b.v; }
  for (const L of set.lamps) L.on = 1;
  const camF = typeof s.cam === "function" ? s.cam : s.cam ? CAM.still(s.cam.p, s.cam.t, s.cam.fov ?? 40, s.cam.creep ?? 0.06) : CAM.still([0, 1.6, 6], [0, 1.4, 0]);
  const cam = camF(u, lf, f); cam.p = [...cam.p]; cam.t = [...cam.t]; cam.fov = cam.fov ?? 40;
  const Lt = typeof s.light === "function" ? s.light(u, lf, f) : light(s.light ?? "day");
  const out = { set: s.set, cam, light: Lt, actors: [], fx: [], focus: null, coc: s.coc ?? 7, snow: s.snow ?? 0, flash: 0, fade: 1, clouds: set.anchors.clouds ?? true, flashCol: [1, 1, 1] };
  const kicks = [];
  const S = {
    f, lf, u, len, a: s.a, b: s.b, E, T: TT, A: set.anchors,
    actor(id, o = {}) { const seed = o.seed ?? hashStr(id), q = idle(f, seed);
      out.actors.push({ o: id, expr: "neutral", mode: "stand", tilt: q.tilt, headTilt: q.headTilt, sy: q.sy, blink: blinkAt(f, seed), seed, ...o, id: o.key ?? id }); },
    fx(kind, o = {}) { out.fx.push({ kind, w: 0.5, h: 0.5, x: 0, y: 1, z: 0, ...o }); },
    /** timed effect: shows from f0 for dur frames, pops in (and out unless hold), t runs 0..1 */
    pop(kind, f0, dur, o = {}) {
      if (SCAN && f === f0) CUES.push([o.sfx ?? kind, f0]);
      if (f < f0 || f >= f0 + dur) return;
      const t = (f - f0) / dur, k = (o.pop === false ? 1 : back(prog(f, f0, f0 + 6))) * (o.hold ? 1 : 1 - easeIn(prog(f, f0 + dur - 5, f0 + dur)));
      out.fx.push({ kind, t, w: 0.5, h: 0.5, x: 0, y: 1, z: 0, ...o, w: (o.w ?? 0.5) * k, h: (o.h ?? 0.5) * k, y: (o.y ?? 1) + (o.rise ?? 0) * t, rot: (o.rot ?? 0) + (o.spin ?? 0) * t });
    },
    /** speech bubble above a point */
    say(text, f0, dur, o = {}) { S.pop("bubble", f0, dur, { w: o.w ?? Math.max(1.0, 0.13 * text.length + 0.5), h: o.h ?? 0.62, sfx: "bubble", ...o, text }); },
    kick(f0, amp = 0.07) { if (SCAN && f === f0) CUES.push(["kick", f0]); kicks.push([f0, amp]); },
    sfx(kind, f0) { if (SCAN && f === f0) CUES.push([kind, f0]); },
    light(name, over) { out.light = typeof name === "string" ? light(name, over) : name; },
    lightMix(a, b, k) { out.light = mixLight(typeof a === "string" ? light(a) : a, typeof b === "string" ? light(b) : b, clamp(k)); },
    focus(d) { out.focus = d; }, coc(v) { out.coc = v; }, snow(v) { out.snow = v; }, fade(k) { out.fade = k; },
    flash(k, col) { out.flash = Math.max(out.flash, k); if (col) out.flashCol = col; },
    lamp(i, on) { if (set.lamps[i]) set.lamps[i].on = on; },
  };
  s.act?.(S, u, f, lf);
  // handheld drift, kicks, transition camera, focus
  if (!s.steady) { const h = s.handheld ?? 1; cam.p[0] += 0.03 * h * wob(f, 1, 1); cam.p[1] += 0.022 * h * wob(f, 1.3, 2); cam.t[0] += 0.02 * h * wob(f, 0.9, 3); cam.t[1] += 0.016 * h * wob(f, 1.1, 4); }
  for (const [k0, amp] of kicks) { const d = f - k0; if (d >= 0 && d < 8) { const a = amp * (1 - d / 8) * (d % 2 ? -1 : 1); cam.p[1] += a; cam.t[1] += a * 0.6; cam.t[0] += a * 0.4; } }
  if (camMod) camMod(cam);
  if (out.focus == null) out.focus = s.focus ?? Math.hypot(cam.t[0] - cam.p[0], cam.t[1] - cam.p[1], cam.t[2] - cam.p[2]);
  out.cardTint = out.light.card;
  // shared point lights: this set's lamps (max 4)
  PL.forEach((l, q) => { const L = set.lamps[q]; if (L) { l.position.set(...L.pos); l.color.set(L.color); l.intensity = L.intensity * L.on; l.distance = L.dist; } else l.intensity = 0; });
  return out;
}

/** walk every frame once (no rendering) to collect timed sound cues from pops, kicks and transitions */
function scan() {
  CUES.length = 0; SCAN = true;
  for (let f = 0; f < N; f++) for (const L of frameState(f).layers) L();
  SCAN = false;
  for (const s of SHOTS.slice(1)) { const tr = s.trans || "cut"; if (tr === "whip") CUES.push(["whip", s.a - 4]); if (tr === "zoom") CUES.push(["zoom", s.a - 8]); if (tr === "smash") CUES.push(["kick", s.a]); if (tr === "flash") CUES.push(["flash", s.a]); }
  const seen = new Set(), cues = CUES.filter(([k, fr]) => { const key = k + "@" + fr; if (seen.has(key)) return false; seen.add(key); return true; }).sort((a, b) => a[1] - b[1]);
  return { frames: N, fps: FPS, shots: window.FILM.shots, cues };
}
