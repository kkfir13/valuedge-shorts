// ValuEdge Shorts — generic storyboard. window.BOARD = { frames, hero, crates, buildings, beats:[{a,b,shot,loc,hits,...}] }.
// Every frame is a pure function of (f, BOARD). Shot templates below reuse the fixed ValuEdge town.
import * as THREE from "three";
import { headInfo, OUTFITS } from "./cast.js";

const B = window.BOARD;
export const N = B.frames;
const SU = 0.00225;
// ---------- motion helpers ----------
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, t) => a + (b - a) * t;
const ss = (t) => { t = clamp(t); return t * t * t * (t * (t * 6 - 15) + 10); };
const easeOut = (t) => 1 - Math.pow(1 - clamp(t), 3);
const back = (t, k = 1.7) => { t = clamp(t) - 1; return 1 + t * t * ((k + 1) * t + k); };
const spring = (t) => { t = Math.max(0, t); return 1 - Math.exp(-6 * t) * Math.cos(12 * t); };
const prog = (f, a, b) => clamp((f - a) / Math.max(1, b - a));
const L3 = (a, b, t) => a.map((v, i) => lerp(v, b[i], t));
const idle = (f, seed) => ({ tilt: 1.3 * Math.sin(f * 0.07 + seed), headTilt: 2.2 * Math.sin(f * 0.05 + seed * 2.1), sy: 1 + 0.01 * Math.sin(f * 0.13 + seed) });
const blinkAt = (f, seed) => { const per = 80 + (seed % 5) * 9, ph = (f + seed * 23) % per; return ph < 2 ? 1 : ph < 4 ? 0.5 : 0; };
const hash = (i) => { const x = Math.sin(i * 127.1) * 43758.5453; return x - Math.floor(x); };

function camFromKeys(keys, f, kicks) {
  let k0 = keys[0], k1 = keys[0];
  for (let i = 0; i < keys.length; i++) if (keys[i].f <= f) { k0 = keys[i]; k1 = keys[i + 1] || keys[i]; }
  const t = k1 === k0 ? 0 : (f - k0.f) / (k1.f - k0.f), e = k1.e === "out" ? easeOut(t) : ss(t);
  const p = L3(k0.p, k1.p, e), tg = L3(k0.t, k1.t, e);
  const fov = lerp(k0.fov ?? 40, k1.fov ?? 40, e), roll = lerp(k0.roll ?? 0, k1.roll ?? 0, e);
  p[0] += 0.03 * Math.sin(f * 0.021); p[1] += 0.02 * Math.sin(f * 0.017 + 1); tg[0] += 0.015 * Math.sin(f * 0.019 + 2);
  for (const kf of kicks) { const d = f - kf; if (d >= 0 && d < 7) { const a = 0.05 * (1 - d / 7) * (d % 2 ? -1 : 1); p[1] += a; tg[1] += a * 0.6; tg[0] += a * 0.4; } }
  return { p, t: tg, fov, roll };
}

// ---------- lights ----------
const LIGHTS = {
  day: { skyTop: "#6fa8de", skyHor: "#e4eef7", fog: "#dde8f3", fogNear: 50, fogFar: 300, hemiSky: "#dbe8ff", hemiGround: "#c4cfe0", hemi: 1.5, sun: "#fff3df", sunI: 2.6, az: 35, el: 40, sat: 1.12, tint: [1, 1, 1.02], lift: [0, 0, 0.004], vign: 0.25, card: "#ffffff" },
  golden: { skyTop: "#6a86c8", skyHor: "#ffd2a0", fog: "#f2cfa8", fogNear: 50, fogFar: 300, hemiSky: "#ffe0c0", hemiGround: "#b8a8b8", hemi: 1.3, sun: "#ffc078", sunI: 2.9, az: -50, el: 16, sat: 1.15, tint: [1.05, 1.0, 0.92], lift: [0.005, 0, 0], vign: 0.3, card: "#fff0dc" },
  night: { skyTop: "#162246", skyHor: "#3d5285", fog: "#2e3f6a", fogNear: 30, fogFar: 220, hemiSky: "#5a6faa", hemiGround: "#2a3050", hemi: 1.1, sun: "#a9bfff", sunI: 1.1, az: 20, el: 42, sat: 0.95, tint: [0.84, 0.92, 1.12], lift: [0, 0, 0.01], vign: 0.4, card: "#aeb9dc" },
  vault: { skyTop: "#3a3230", skyHor: "#3a3230", fog: "#3a3230", fogNear: 40, fogFar: 140, hemiSky: "#ffe3c0", hemiGround: "#6a5a50", hemi: 1.5, sun: "#ffe8c8", sunI: 1.4, az: 20, el: 62, sat: 1.06, tint: [1.04, 1.0, 0.94], lift: [0, 0, 0], vign: 0.38, card: "#fff1e0" },
  spring: { skyTop: "#4f9ee6", skyHor: "#d8f0ff", fog: "#cfe6f5", fogNear: 50, fogFar: 300, hemiSky: "#e2f2ff", hemiGround: "#a9c88a", hemi: 1.5, sun: "#fff6dc", sunI: 2.8, az: 40, el: 45, sat: 1.15, tint: [1, 1, 1], lift: [0, 0, 0], vign: 0.22, card: "#ffffff" },
  flashback: { skyTop: "#6fa8de", skyHor: "#e4eef7", fog: "#dde8f3", fogNear: 50, fogFar: 300, hemiSky: "#dbe8ff", hemiGround: "#c4cfe0", hemi: 1.5, sun: "#fff3df", sunI: 2.6, az: 35, el: 40, sat: 0.35, tint: [1.1, 1.0, 0.84], lift: [0.02, 0.012, 0], vign: 0.5, card: "#ffffff" },
};
const C = new THREE.Color(), D = new THREE.Color();
function mixLight(a, b, t) {
  if (t <= 0) return a; if (t >= 1) return b;
  const o = {};
  for (const k in a) {
    if (typeof a[k] === "number") o[k] = lerp(a[k], b[k], t);
    else if (Array.isArray(a[k])) o[k] = L3(a[k], b[k], t);
    else o[k] = "#" + C.set(a[k]).lerp(D.set(b[k]), t).getHexString();
  }
  return o;
}

// ---------- cast ----------
const H0 = B.hero || {};
const heroBase = { jacket: "#7a5a3c", pants: "#4a4e5a", boots: "#3a2a20", hat: "hair", hair: "#eeeae2", skin: "#f5c9a0", ...H0 };
const HAT_COL = { beanie: "#d4473b", cap: "#2f5f6a" };
OUTFITS.hero = { ...heroBase };
OUTFITS.hero_beanie = { ...heroBase, hat: "beanie", cap: H0.beanie || "#d4473b", pom: "#f4f1ea" };
OUTFITS.hero_cap = { ...heroBase, hat: "cap", cap: H0.capColor || HAT_COL.cap };
const heroOutfit = (hat) => (hat === "beanie" ? "hero_beanie" : hat === "cap" ? "hero_cap" : "hero");
const NPCS = ["neighbor", "t1", "lawyer", "t2", "digger", "t3", "t4"];
const SEED = { neighbor: 5, t1: 11, lawyer: 8, t2: 12, digger: 9, t3: 13, t4: 14 };

// town anchors (hero stands here)
const LOC = {
  gas: { x: -0.3, y: 0, z: -1.9, snow: 0.55 },
  store: { x: 15, y: 0, z: -5, snow: 0.6 },
  street: { x: 0.55, y: 0, z: -2.2, snow: 0.45 },
  porch: { x: -12.55, y: 0.5, z: -7.6, snow: 0.3 },
  meadow: { x: -91.7, y: 0, z: -5.2, snow: 0, light: "spring" },
};
// default location per shot (used for flashes on place changes)
const SHOT_LOC = { vault: "vault", crates: "porch", rock: "chair", empty_chair: "chair", grow: "meadow", rain: "hill", finale: "hill", crowd: "street" };
export const beatLoc = (bt) => SHOT_LOC[bt.shot] || bt.loc || "gas";

// precompute flashes and kicks
export const FLASH = [], KICKS = [];
B.beats.forEach((bt, i) => {
  if (i > 0 && (bt.flash ?? beatLoc(bt) !== beatLoc(B.beats[i - 1]))) FLASH.push(bt.a);
  if (["vault", "crates", "finale"].includes(bt.shot)) for (const h of bt.hits || []) KICKS.push(h);
});
const beatAt = (f) => { let k = 0; for (let i = 0; i < B.beats.length; i++) if (f >= B.beats[i].a) k = i; return k; };
const hitsOf = (bt, n) => { const h = (bt.hits || []).slice(0, n); while (h.length < n) h.push(Math.round(lerp(bt.a, bt.b, (h.length + 1) / (n + 1)))); return h; };

// ---------- shot templates ----------
function T_intro(f, bt, X) {
  const L = LOC[bt.loc] || LOC.gas, { x, y, z } = L;
  X.cam = camFromKeys([{ f: bt.a, p: [x + 0.28, y + 1.78, z + 2.75], t: [x, y + 1.66, z], fov: 40 }, { f: bt.b, p: [x + 0.22, y + 1.8, z + 2.35], t: [x, y + 1.68, z], fov: 40 }], f, KICKS);
  X.out.focus = 2.5; X.out.coc = 11; X.out.snow = bt.snow === false ? 0 : L.snow;
  const [h] = hitsOf(bt, 1), fx = bt.fx ?? "coin";
  const pop = f >= h && f < h + 40;
  X.hero({ x, y, z, expr: pop && fx === "coin" ? "whistle" : bt.expr || "smile", look: pop ? -0.6 : 0 });
  if (fx !== "none" && f >= h) {
    const s = 0.42 * back(prog(f, h, h + 14)) * (1 - prog(f, bt.b - 10, bt.b));
    if (fx === "coin") X.out.fx.push({ kind: "coin", x: x + 0.15, y: y + 2.42 + 0.03 * Math.sin(f * 0.3), z: z + 0.05, w: s, h: s, rot: 0.15 * Math.sin(f * 0.2) });
    if (f < h + 18) X.out.fx.push({ kind: fx === "stars" ? "stars" : "burst", t: prog(f, h, h + 18), x: x + 0.15, y: y + 2.42, z: z - 0.02, w: 0.9, h: 0.9 });
  }
}
function T_wide(f, bt, X) {
  const L = LOC[bt.loc] || LOC.gas, { x, y, z } = L;
  X.cam = camFromKeys([{ f: bt.a, p: [x + 1.6, y + 2.7, z + 11.0], t: [x + 1.2, y + 1.7, z - 0.8], fov: 42 }, { f: bt.b, p: [x + 1.9, y + 2.8, z + 10.4], t: [x + 1.2, y + 1.75, z - 0.8], fov: 42 }], f, KICKS);
  X.out.focus = 11; X.out.coc = 3; X.out.snow = bt.snow === false ? 0 : L.snow;
  X.hero({ x, y, z, wave: bt.wave ? 0.5 + 0.5 * Math.sin(f * 0.5) : undefined, expr: bt.expr || "smile" });
  if (bt.timelapse) {
    const cyc = prog(f, lerp(bt.a, bt.b, 0.25), lerp(bt.a, bt.b, 0.85));
    if (cyc > 0 && cyc < 1) {
      const k = cyc * 3, i = Math.min(2, Math.floor(k)), seq = [X.base, LIGHTS.golden, LIGHTS.night, X.base];
      X.light = mixLight(seq[i], seq[i + 1], ss(k - i));
      if (bt.loc === "gas" || !bt.loc) { X.R.carPaint.color.set(["#3f6fb5", "#d9a441", "#5d7a3a", "#8c3b4a", "#7b5ac9", "#3f6fb5"][Math.floor(cyc * 6)]); X.R.CAR.position.x = 2.4 + 1.8 * Math.pow(Math.sin(cyc * 6 * Math.PI) ** 2, 4); }
    }
  }
}
function T_work(f, bt, X) {
  const L = LOC[bt.loc] || LOC.store, { x, y, z } = L;
  X.cam = camFromKeys([{ f: bt.a, p: [x + 1.3, y + 1.85, z + 4.6], t: [x + 0.2, y + 2.0, z], fov: 48 }, { f: bt.b, p: [x + 0.9, y + 1.8, z + 4.1], t: [x + 0.15, y + 1.9, z], fov: 48 }], f, KICKS);
  X.out.focus = 4.4; X.out.coc = 6; X.out.snow = bt.snow === false ? 0 : L.snow;
  const k = Math.sin(f * 0.32);
  if (bt.prop === "paper") X.hero({ x, y, z, prop: "paper", expr: bt.expr || "smile" });
  else {
    X.hero({ x, y, z, prop: ["broom", k], expr: bt.expr || "smile_closed", tilt: 2 * k });
    if (Math.abs(Math.cos(f * 0.32)) > 0.92 && f % 2 === 0) X.out.fx.push({ kind: "puff", t: 0.4, x: x + 0.25 + 0.15 * k, y: y + 0.12, z: z + 0.2, w: 0.5, h: 0.5 });
  }
}
function T_closeup(f, bt, X) {
  const L = LOC[bt.loc] || LOC.store, { x, y, z } = L;
  X.cam = camFromKeys([{ f: bt.a, p: [x + 0.1, y + 1.34, z + 1.32], t: [x, y + 1.3, z], fov: 40 }, { f: bt.b, p: [x + 0.05, y + 1.32, z + 1.08], t: [x, y + 1.28, z], fov: 40 }], f, KICKS);
  X.out.focus = 1.2; X.out.coc = 10; X.out.snow = bt.snow === false ? 0 : L.snow;
  X.hero({ x, y, z, expr: bt.expr || "smile", look: 0.4 });
  const hi = headInfo(OUTFITS.hero, 3), HH = 2 * hi.b;
  hitsOf(bt, 3).forEach((at, i) => {
    const yd = hi.chin + (0.22 + i * 0.26) * HH, t = prog(f, at, at + 14);
    if (t > 0 && t < 1) X.out.fx.push({ kind: "stars", t, x: x + 0.03, y: y + (975 - yd) * SU, z: z + 0.05, w: 0.32, h: 0.32 });
  });
}
function T_gift(f, bt, X) {
  const L = LOC[bt.loc] || LOC.store, { x, y, z } = L;
  X.cam = camFromKeys([{ f: bt.a, p: [x + 0.95, y + 1.75, z + 4.2], t: [x + 0.55, y + 1.55, z], fov: 45 }, { f: bt.b, p: [x + 0.8, y + 1.72, z + 3.6], t: [x + 0.5, y + 1.6, z], fov: 45 }], f, KICKS);
  X.out.focus = 4.0; X.out.coc = 7; X.out.snow = bt.snow === false ? 0 : L.snow;
  const [h] = hitsOf(bt, 1), on = f >= h, item = bt.item || "beanie";
  const w = prog(f, bt.a, Math.min(h - 10, bt.a + 30)), lift = prog(f, h - 12, h);
  X.hero({ x, y, z, hat: item === "beanie" && on ? "beanie" : undefined, expr: on ? "grin" : "neutral", look: 0.6,
    headTilt: on ? 6 * Math.exp(-(f - h) / 8) * Math.sin((f - h) * 0.8) : 0 });
  X.npc(bt.npc || "neighbor", f, { x: lerp(x + 2.8, x + 1.05, ss(w)), y, z: z + 0.25, mode: w < 1 ? "stroll" : "stand", phase: f * 0.04,
    wave: f >= h - 12 && f < h + 15 ? (f < h ? back(lift) : 1 - prog(f, h + 3, h + 15)) : undefined, look: -0.6, expr: on ? "smile_closed" : "smile" });
  if (f >= h - 11 && f < h) { const t = prog(f, h - 11, h); X.out.fx.push({ kind: item, x: lerp(x + 0.75, x + 0.02, t), y: y + lerp(2.55, 2.12, t) + 0.15 * Math.sin(t * Math.PI), z: z + 0.1, w: 0.42, h: 0.42 }); }
  if (f >= h && f < h + 15) X.out.fx.push({ kind: "stars", t: prog(f, h, h + 15), x, y: y + 2.15, z: z + 0.06, w: 0.9, h: 0.9 });
}
function T_empty_chair(f, bt, X) {
  X.light = LIGHTS.night; X.out.snow = 0.35;
  X.cam = camFromKeys([{ f: bt.a, p: [-15.0, 1.5, -4.0], t: [-15.4, 0.95, -6.9], fov: 40 }, { f: bt.b, p: [-15.15, 1.35, -4.6], t: [-15.4, 0.95, -6.9], fov: 40 }], f, KICKS);
  X.out.focus = 2.9; X.out.coc = 9;
  X.R.chair.rotation.x = 0.07 * Math.sin(f * 0.09);
  X.out.fx.push({ kind: "beanie", x: -15.4, y: 1.05 + 0.03 * Math.sin(f * 0.09), z: -6.75, w: 0.4, h: 0.4, tint: "#c8d0ec" });
}
function T_vault(f, bt, X) {
  X.light = LIGHTS.vault; X.R.vlamp.intensity = 6;
  X.cam = camFromKeys([{ f: bt.a, p: [121.0, 1.85, 2.9], t: [120.45, 1.3, -0.8], fov: 46 }, { f: lerp(bt.a, bt.b, 0.5), p: [120.85, 1.9, 2.3], t: [120.4, 1.3, -0.8], fov: 48 },
    { f: bt.b, p: [120.6, 2.05, 1.7], t: [120.35, 1.2, -0.7], fov: 50 }], f, KICKS);
  X.out.focus = 2.9; X.out.coc = 7;
  const [h] = hitsOf(bt, 1);
  const open = f >= h ? spring((f - h) / 30) : 0;
  X.R.lid.rotation.x = -1.75 * open - (f >= h - 11 && f < h ? 0.04 * Math.sin(f * 2.5) : 0);
  X.npc(bt.npc || "lawyer", f, { x: 120.78, y: 0, z: -1.05, expr: f >= h ? "shock" : f > h - 30 ? "nervous" : "neutral",
    wave: f >= bt.a + 10 && f < h - 20 ? 0.3 + 0.2 * Math.sin(f * 0.4) : undefined, look: -0.5 });
  if (f >= h) {
    const kind = bt.item || "paper";
    if (f < h + 16) X.out.fx.push({ kind: "burst", t: prog(f, h, h + 16), x: 120, y: 1.35, z: -0.55, w: 2.0, h: 2.0 });
    for (let i = 0; i < 22; i++) {
      const t0 = h + (i % 6), t = (f - t0) / 30; if (t < 0) continue;
      const vx = (hash(i) - 0.5) * 2.6, vy = 2.6 + hash(i + 9) * 1.8, vz = 0.4 + hash(i + 3) * 1.4;
      const yy = 1.25 + vy * t - 2.2 * t * t; if (yy < 0.9 && t > 0.5) continue;
      const sz = kind === "paper" ? [0.34, 0.23, 300, 200] : [0.2, 0.2, 256, 256];
      X.out.fx.push({ kind, cw: sz[2], ch: sz[3], x: 120 + vx * t, y: Math.max(0.9, yy), z: -0.6 + vz * t * 0.7, w: sz[0], h: sz[1], rot: (hash(i + 5) - 0.5) * 8 * t });
    }
  }
}
function T_crates(f, bt, X) {
  const L = LOC.porch, tx = -12.4, rz = -7.6;
  X.cam = camFromKeys([{ f: bt.a, p: [-12.55, 2.0, -4.7], t: [-12.6, 1.95, rz], fov: 40 }, { f: lerp(bt.a, bt.b, 0.35), p: [-12.5, 2.0, -4.8], t: [-12.6, 1.9, rz], fov: 40 },
    { f: lerp(bt.a, bt.b, 0.55), p: [-12.4, 1.75, -4.75], t: [tx, 1.5, -7.0], fov: 44 }, { f: bt.b, p: [-12.4, 1.7, -4.97], t: [tx, 1.48, -7.0], fov: 44 }], f, KICKS);
  X.out.focus = 2.7; X.out.coc = 9; X.out.snow = 0.3;
  const hits = hitsOf(bt, 3);
  hits.forEach((at, i) => {
    const t = prog(f, at - 8, at), yy = f < at - 8 ? 3 : lerp(2.0, 0.8, t * t);
    X.R.toys[i].position.y = yy; X.R.toys[i].visible = f >= at - 8;
    if (f >= at) { const s = Math.exp(-(f - at) / 5); X.R.toys[i].scale.set(1 + 0.25 * s, 1 - 0.25 * s, 1 + 0.25 * s); }
    if (f >= at && f < at + 10) X.out.fx.push({ kind: "puff", t: prog(f, at, at + 10), x: tx - 0.42 + i * 0.42, y: 1.4, z: -6.75, w: 0.45, h: 0.45 });
  });
  const early = f < hits[0] - 12;
  X.hero({ x: -12.55, y: L.y, z: rz, prop: early ? "paper" : null, expr: early ? "smile" : "smile_closed",
    wave: f >= hits[0] && f < hits[2] + 10 ? 0.4 + 0.2 * Math.sin(f * 0.3) : undefined, blob: false });
}
function T_rock(f, bt, X) {
  X.cam = camFromKeys([{ f: bt.a, p: [-15.15, 1.55, -4.2], t: [-15.4, 1.25, -6.9], fov: 42 }, { f: bt.b, p: [-15.3, 1.42, -5.25], t: [-15.4, 1.3, -6.9], fov: 42 }], f, KICKS);
  X.out.focus = 2.0; X.out.coc = 9; X.out.snow = 0.3;
  const [h] = hitsOf(bt, 1), sleep = bt.sleep !== false && f >= h;
  const cyc = prog(f, bt.a + 4, Math.min(h - 4, lerp(bt.a, bt.b, 0.75)));
  if (cyc > 0 && cyc < 1) {
    const seq = [LIGHTS.day, LIGHTS.spring, LIGHTS.golden, LIGHTS.day], k = cyc * 3, i = Math.min(2, Math.floor(k));
    X.light = mixLight(seq[i], seq[i + 1], ss(k - i));
    X.leaf(cyc < 0.33 ? "green" : cyc < 0.66 ? "orange" : "snow");
    X.out.snow = cyc < 0.66 ? 0 : 0.3;
  }
  const calm = 1 - prog(f, h - 18, h + 2), rock = 0.09 * calm * Math.sin(f * 0.14);
  X.R.chair.rotation.x = rock;
  X.hero({ x: -15.4, y: 0.5 + 0.02 * Math.sin(f * 0.14) * calm, z: -6.62, mode: "sit", expr: sleep ? "smile_closed" : "smile",
    blink: sleep ? 0 : undefined, tilt: rock * 40, headTilt: sleep ? 7 : 0, blob: false });
  if (sleep) for (let j = 0; j < 3; j++) { const d = f - h - 2 + j * 9; if (d < 0) continue; const t = (d % 27) / 27;
    X.out.fx.push({ kind: "zz", x: -15.15 + 0.25 * t, y: 2.0 + 0.5 * t, z: -6.55, w: 0.18 + 0.12 * t, h: 0.18 + 0.12 * t }); }
}
function T_grow(f, bt, X) {
  X.light = LIGHTS.spring; X.out.snow = 0;
  const a = bt.a, d = bt.b - bt.a;
  X.cam = camFromKeys([{ f: a, p: [-91.0, 1.45, -1.7], t: [-90.9, 1.05, -5.4], fov: 44 }, { f: a + 0.2 * d, p: [-90.9, 1.45, -1.5], t: [-90.8, 1.05, -5.4], fov: 44 },
    { f: a + 0.6 * d, p: [-89.6, 2.5, 4.0], t: [-90.0, 3.3, -5.6], fov: 50, e: "out" }, { f: bt.b, p: [-89.5, 2.4, 3.6], t: [-90.0, 3.2, -5.6], fov: 50 }], f, KICKS);
  X.out.focus = f < a + 0.3 * d ? 3.8 : 9.4; X.out.coc = f < a + 0.3 * d ? 8 : 4;
  X.R.dirtM.visible = true;
  const [h] = hitsOf(bt, 1);
  const g = f < h ? 0.001 : 0.02 + 0.98 * back(prog(f, h, h + 40), 1.2);
  X.R.bigOak.g.scale.setScalar(g); X.R.bigOak.g.rotation.z = 0.04 * Math.sin(f * 0.11) * clamp(g);
  X.R.oaks.forEach((o, i) => o.g.scale.setScalar(o.s * (0.001 + 0.999 * back(prog(f, h + 8 + i * 6, h + 42 + i * 6), 1.2))));
  const dig = bt.digger !== false, din = prog(f, a + 0.5 * d, a + 0.68 * d), dout = prog(f, a + 0.85 * d, bt.b), wag = dig && f >= a + 0.62 * d && f < a + 0.9 * d;
  X.hero({ x: -91.7, y: 0, z: -5.2, expr: wag ? "stern" : f < h ? "smile" : "grin", wave: wag ? 0.55 + 0.35 * Math.sin(f * 0.7) : f < h - 16 ? 0.1 : undefined });
  if (f >= h - 16 && f < h) { const t = prog(f, h - 16, h); X.out.fx.push({ kind: "acorn", x: lerp(-91.3, -90.2, t), y: lerp(1.75, 0.08, t * t) + 0.3 * Math.sin(t * Math.PI), z: -5.5, w: 0.2, h: 0.2, rot: t * 5 }); }
  if (f >= h && f < h + 14) X.out.fx.push({ kind: "puff", t: prog(f, h, h + 14), x: -90.2, y: 0.25, z: -5.4, w: 0.9, h: 0.9 });
  if (dig && f >= a + 0.5 * d) X.npc("digger", f, { x: lerp(-86.0, -88.5, ss(din)) + 2.8 * ss(dout), y: 0, z: -4.9, mode: din < 1 || dout > 0 ? "stroll" : "stand", phase: f * 0.05,
    prop: ["shovel", 0.15], expr: f >= a + 0.62 * d ? "nervous" : "grin", look: -0.6 });
}
function T_rain(f, bt, X) {
  X.light = LIGHTS.golden; X.out.snow = 0;
  const hy = X.R.hillY(-14, -52), m = lerp(bt.a, bt.b, 0.6);
  X.cam = camFromKeys([{ f: bt.a, p: [-7.0, hy + 2.3, -29.5], t: [-8, hy + 3.6, -48.5], fov: 46 }, { f: m - 20, p: [-7.4, hy + 2.6, -31.0], t: [-8, hy + 3.4, -48.5], fov: 46 },
    { f: m + 10, p: [-19.6, hy + 2.4, -31.0], t: [-20, hy + 3.2, -48.5], fov: 46 }, { f: bt.b, p: [-19.8, hy + 2.5, -32.0], t: [-20, hy + 3.2, -48.5], fov: 46 }], f, KICKS);
  X.out.focus = 17.5; X.out.coc = 3;
  const [h1, h2] = hitsOf(bt, 2);
  X.wins("hosp", f >= h1); X.wins("lib", f >= h2);
  for (let i = 0; i < 26; i++) {
    const lib = i >= 14, t0 = (lib ? h2 - 18 : h1 - 66) + (i % 14) * 4, t = (f - t0) / 22; if (t < 0 || t > 1) continue;
    const bx = lib ? -20 : -8;
    X.out.fx.push({ kind: "coin", x: bx + (hash(i) - 0.5) * 7, y: hy + 12 - 11 * t * t, z: -46.2 + hash(i + 2) * 1.5, w: 0.75, h: 0.75, rot: t * 6 * (hash(i + 4) - 0.5) });
  }
  for (const [at, bx] of [[h1, -8], [h2, -20]]) if (f >= at && f < at + 16) X.out.fx.push({ kind: "burst", t: prog(f, at, at + 16), x: bx, y: hy + 1.2, z: -48.0, w: 7, h: 7 });
}
function T_crowd(f, bt, X) {
  const mood = bt.mood || "nervous";
  X.light = mood === "nervous" ? LIGHTS.flashback : X.base; X.out.snow = 0.45;
  X.cam = camFromKeys([{ f: bt.a, p: [0.6, 1.72, 3.8], t: [0.6, 1.4, -2.0], fov: 45 }, { f: bt.b, p: [0.6, 1.66, 3.0], t: [0.6, 1.4, -2.0], fov: 45 }], f, KICKS);
  X.out.focus = 5.4; X.out.coc = 5;
  X.R.CAR.position.x = 30;
  const happy = mood !== "nervous", ex = happy ? "laugh" : "nervous";
  X.hero({ x: 0.55, y: 0, z: -2.2, expr: bt.expr || (happy ? "grin" : "smile_closed") });
  X.npc("t3", f, { x: 1.15, y: 0, z: -3.6, expr: ex, look: -0.6, headTilt: -8 * Math.sin(f * 0.25), tilt: happy ? 4 * Math.sin(f * 0.4) : 0 });
  X.npc("t1", f, { x: -0.4, y: 0, z: -1.0, expr: happy ? "grin" : ex, look: 0.6, wave: happy ? 0.6 + 0.3 * Math.sin(f * 0.5) : 0.15, headTilt: 7 * Math.sin(f * 0.22) });
  X.npc("t2", f, { x: 1.6, y: 0, z: -1.2, expr: ex, look: -0.6, headTilt: -6 * Math.sin(f * 0.2 + 1) });
  if (!happy && bt.coin !== false) X.out.fx.push({ kind: "coin", x: -0.05, y: 1.55 + 0.02 * Math.sin(f * 0.3), z: -0.95, w: 0.16, h: 0.16 });
}
function T_finale(f, bt, X) {
  X.light = LIGHTS.golden; X.out.snow = 0;
  const hy0 = X.R.hillY(-14, -42), hy = X.R.hillY(-14, -52);
  X.cam = camFromKeys([{ f: bt.a, p: [-14.0, hy0 + 1.85, -36.6], t: [-14.0, hy0 + 2.0, -43], fov: 44, roll: 0.06 }, { f: bt.b, p: [-14.0, hy0 + 4.0, -28.5], t: [-14.0, hy0 + 4.2, -48], fov: 48, roll: 0 }], f, KICKS);
  X.out.focus = lerp(6.5, 15, prog(f, bt.a, bt.b)); X.out.coc = 5;
  X.wins("hosp", true); X.wins("lib", true);
  const [h] = hitsOf(bt, 1);
  const crowd = [["neighbor", -16.4], ["t1", -15.3], ["lawyer", -14.2], ["t2", -13.1], ["digger", -12.0], ["t3", -14.75, -0.9]];
  if (bt.hero !== false) crowd.push(["HERO", -13.65, 0.6]);
  for (const [id, x, dz = 0] of crowd) {
    const z = -42 + dz, happy = f >= h, seed = SEED[id] || 3;
    const o = { x, y: X.R.hillY(x, z), z, expr: happy ? (seed % 2 ? "laugh" : "grin") : "smile_closed",
      wave: happy && seed % 3 === 0 ? 0.6 + 0.3 * Math.sin(f * 0.5 + seed) : undefined, tilt: happy ? 4 * Math.sin(f * 0.4 + seed) : 0 };
    if (id === "HERO") X.hero(o); else X.npc(id, f, o);
  }
  if (f >= h) { const t = prog(f, h, h + 26); X.out.fx.push({ kind: "glow", x: -14, y: hy + 4, z: -49.5, w: 26 * easeOut(t), h: 26 * easeOut(t), cw: 256, ch: 256 });
    if (f < h + 18) X.out.fx.push({ kind: "burst", t: prog(f, h, h + 18), x: -14, y: hy + 5, z: -49.0, w: 16, h: 16 }); }
}
const TEMPLATES = { intro: T_intro, wide: T_wide, work: T_work, closeup: T_closeup, gift: T_gift, empty_chair: T_empty_chair, vault: T_vault,
  crates: T_crates, rock: T_rock, grow: T_grow, rain: T_rain, crowd: T_crowd, finale: T_finale };
export const SHOT_NAMES = Object.keys(TEMPLATES);

export function frameState(f, R) {
  const bi = beatAt(f), bt = B.beats[bi];
  const out = { actors: [], fx: [], snow: 0, flash: 0, coc: 8, focus: 4, fade: 1 };
  // defaults for animated parts
  R.chair.rotation.x = 0; R.CAR.position.set(2.4, 0, -0.7); R.carPaint.color.set("#3f6fb5");
  R.toys.forEach((t) => { t.position.y = 0.8; t.visible = true; t.scale.setScalar(1); });
  R.lid.rotation.x = 0; R.vlamp.intensity = 0;
  R.bigOak.g.scale.setScalar(0.001); R.oaks.forEach((o) => o.g.scale.setScalar(o.s));
  R.dirtM.visible = false;
  const setWins = (list, lit) => list.forEach((m) => { const t = R.P.windowTex(lit); if (m.face.map !== t) m.face.map = t; });
  setWins(R.hospWins, false); setWins(R.libWins, false);
  const leaf = (k) => R.yardTree.lv.forEach((m) => (m.material = R.leafMats[k]));
  leaf("snow");
  const base = LIGHTS[bt.light] || LIGHTS[(LOC[bt.loc] || {}).light] || LIGHTS.day;
  // hero hat: beat override, else board default; once a gift with beanie happened earlier, keep it
  let hat = bt.hat || H0.hat || "hair";
  if (!bt.hat) for (let i = 0; i < bi; i++) if (B.beats[i].shot === "gift" && (B.beats[i].item || "beanie") === "beanie") hat = "beanie";
  const X = {
    out, R, base, light: base, cam: null,
    hero: (o) => { const i = idle(f, 3); const { hat: h2, ...rest } = o;
      out.actors.push({ id: "hero", o: heroOutfit(h2 || hat), seed: 3, expr: "smile", mode: "stand", tilt: i.tilt, headTilt: i.headTilt, sy: i.sy, blink: blinkAt(f, 3), ...rest }); },
    npc: (id, f2, o) => { const s = SEED[id] || 7, i = idle(f2, s); out.actors.push({ id, o: id, seed: s, expr: "smile", mode: "stand", tilt: i.tilt, headTilt: i.headTilt, sy: i.sy, blink: blinkAt(f2, s), ...o }); },
    leaf, wins: (k, lit) => setWins(k === "hosp" ? R.hospWins : R.libWins, lit),
  };
  (TEMPLATES[bt.shot] || T_intro)(f, bt, X);
  for (const a of out.actors) if (a.blink === undefined) a.blink = blinkAt(f, a.seed);
  for (const c of FLASH) { const d = f - c; if (d >= 0 && d < 6) out.flash = Math.max(out.flash, 0.9 * (1 - d / 6)); }
  out.cam = X.cam; out.light = X.light; out.cardTint = X.light.card;
  return out;
}
