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
  hall: { skyTop: "#4a3a30", skyHor: "#6a5444", fog: "#4a3a30", fogNear: 40, fogFar: 160, hemiSky: "#ffe6c8", hemiGround: "#7a6050", hemi: 1.7, sun: "#ffe2b8", sunI: 0.9, az: 60, el: 30, sat: 1.08, tint: [1.04, 1.0, 0.93], lift: [0.004, 0.002, 0], vign: 0.36, card: "#fff3e2" },
  lamp: { skyTop: "#1e2846", skyHor: "#3a4870", fog: "#2a2a3a", fogNear: 40, fogFar: 160, hemiSky: "#ffd9a8", hemiGround: "#5a4038", hemi: 1.35, sun: "#ffcf90", sunI: 0.6, az: -40, el: 25, sat: 1.05, tint: [1.06, 0.98, 0.88], lift: [0.006, 0.002, 0], vign: 0.45, card: "#ffe8cc" },
  storm: { skyTop: "#4a5466", skyHor: "#9aa3b0", fog: "#8a929e", fogNear: 40, fogFar: 220, hemiSky: "#c8d0dc", hemiGround: "#6a6e78", hemi: 1.35, sun: "#d8dde6", sunI: 1.2, az: 20, el: 50, sat: 0.7, tint: [0.95, 0.98, 1.05], lift: [0, 0.002, 0.01], vign: 0.42, card: "#e6e9ef" },
  dusk: { skyTop: "#3a3f78", skyHor: "#f08a6a", fog: "#c88a80", fogNear: 50, fogFar: 300, hemiSky: "#ffc8b0", hemiGround: "#8a7090", hemi: 1.25, sun: "#ff9a6a", sunI: 2.4, az: -70, el: 9, sat: 1.18, tint: [1.06, 0.97, 0.95], lift: [0.008, 0, 0.006], vign: 0.34, card: "#ffe2d2" },
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
// period costume for the townspeople: board.era = 1700s | 1800s | 1900s | modern (default)
const ERA = {
  "1700s": { neighbor: { hat: "bonnet" }, t1: { hat: "tricorn" }, lawyer: { hat: "wig", hair: "#eeeae2" }, t2: { hat: "bonnet" }, digger: { hat: "tricorn" }, t3: { hat: "wig", hair: "#e4dfd6" }, t4: { hat: "bonnet" } },
  "1600s": { neighbor: { hat: "bonnet" }, t1: { hat: "tophat" }, lawyer: { hat: "tophat" }, t2: { hat: "bonnet" }, digger: { hat: "cap" }, t3: { hat: "tophat" }, t4: { hat: "bonnet" } },
  "1800s": { neighbor: { hat: "bonnet" }, t1: { hat: "tophat" }, lawyer: { hat: "tophat" }, t2: { hat: "bonnet" }, digger: { hat: "bowler" }, t3: { hat: "bowler" }, t4: { hat: "bonnet" } },
  "1900s": { neighbor: { hat: "hair" }, t1: { hat: "bowler" }, lawyer: { hat: "tophat" }, t2: { hat: "hair" }, digger: { hat: "cap" }, t3: { hat: "bowler" }, t4: { hat: "hair" } },
};
for (const [k, v] of Object.entries(ERA[B.era] || {})) OUTFITS[k] = { ...OUTFITS[k], ...v };
const SEED = { neighbor: 5, t1: 11, lawyer: 8, t2: 12, digger: 9, t3: 13, t4: 14 };

// town anchors (hero stands here)
const LOC = {
  gas: { x: -0.3, y: 0, z: -1.9, snow: 0.55 },
  store: { x: 15, y: 0, z: -5, snow: 0.6 },
  street: { x: 0.55, y: 0, z: -2.2, snow: 0.45 },
  porch: { x: -12.55, y: 0.5, z: -7.6, snow: 0.3 },
  meadow: { x: -91.7, y: 0, z: -5.2, snow: 0, light: "spring" },
  city: { x: 220, y: 0, z: -2.6, snow: 0 },
  exchange: { x: 318.0, y: 0, z: -2.4, snow: 0, light: "hall" },
  harbor: { x: 420, y: 0.6, z: -0.6, snow: 0 },
  office: { x: 519.6, y: 0, z: -3.15, snow: 0, light: "lamp" },
};
// default location per shot (used for flashes on place changes)
const SHOT_LOC = { vault: "vault", crates: "porch", rock: "chair", empty_chair: "chair", grow: "meadow", rain: "hill", finale: "hill",
  chart: "exchange", ticker: "exchange", bankrun: "city", ship: "harbor", stack: "office", calendar: "office" };
export const beatLoc = (bt) => SHOT_LOC[bt.shot] || bt.loc || (bt.shot === "crowd" ? "street" : "gas");

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
      const sz = kind === "paper" ? [0.34, 0.23, 300, 200] : kind === "spice" ? [0.26, 0.26, 256, 256] : [0.2, 0.2, 256, 256];
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
  const mood = bt.mood || "nervous", L = LOC[bt.loc] || LOC.street, { x, y, z } = L;
  X.light = mood === "nervous" ? LIGHTS.flashback : X.base; X.out.snow = bt.snow === false || !L.snow ? 0 : L.snow;
  X.cam = camFromKeys([{ f: bt.a, p: [x + 0.05, y + 1.72, z + 6.0], t: [x + 0.05, y + 1.4, z + 0.2], fov: 45 }, { f: bt.b, p: [x + 0.05, y + 1.66, z + 5.2], t: [x + 0.05, y + 1.4, z + 0.2], fov: 45 }], f, KICKS);
  X.out.focus = 5.4; X.out.coc = 5;
  X.R.CAR.position.x = 30;
  const happy = mood !== "nervous", ex = happy ? "laugh" : "nervous";
  X.hero({ x, y, z, expr: bt.expr || (happy ? "grin" : "smile_closed") });
  X.npc("t3", f, { x: x + 0.6, y, z: z - 1.4, expr: ex, look: -0.6, headTilt: -8 * Math.sin(f * 0.25), tilt: happy ? 4 * Math.sin(f * 0.4) : 0 });
  X.npc("t1", f, { x: x - 0.95, y, z: z + 1.2, expr: happy ? "grin" : ex, look: 0.6, wave: happy ? 0.6 + 0.3 * Math.sin(f * 0.5) : 0.15, headTilt: 7 * Math.sin(f * 0.22) });
  X.npc("t2", f, { x: x + 1.05, y, z: z + 1.0, expr: ex, look: -0.6, headTilt: -6 * Math.sin(f * 0.2 + 1) });
  if (!happy && bt.coin !== false) X.out.fx.push({ kind: "coin", x: x - 0.6, y: y + 1.55 + 0.02 * Math.sin(f * 0.3), z: z + 1.25, w: 0.16, h: 0.16 });
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

// ---------- new sets ----------
const CURVES = {
  bubble: [(x) => (x < 0.72 ? 0.06 + 0.9 * Math.pow(x / 0.72, 2.4) : Math.max(0.1, 0.96 - 4.2 * (x - 0.72))), 0.72],
  crash: [(x) => (x < 0.4 ? 0.84 + 0.05 * Math.sin(x * 30) : Math.max(0.08, 0.89 - 2.4 * (x - 0.4))), 0.4],
  up: [(x) => 0.08 + 0.82 * x + 0.04 * Math.sin(x * 40), 0.8],
  compound: [(x) => 0.04 + 0.92 * (Math.exp(3.4 * x) - 1) / (Math.exp(3.4) - 1), 0.85],
  zigzag: [(x) => 0.3 + 0.5 * x + 0.16 * Math.sin(x * 22), 0.6],
  flat: [(x) => 0.45 + 0.03 * Math.sin(x * 25), 0.5],
  zero: [(x) => 0.05 + 0.006 * Math.sin(x * 30), 0.9],
};
let chartKey = "";
function drawChart(R, trend, t, label) {
  const k = trend + Math.round(t * 200) + label; if (k === chartKey) return; chartKey = k;
  R.P.chartDraw(R.chartCv.getContext("2d"), R.chartCv.width, R.chartCv.height, (CURVES[trend] || CURVES.up)[0], t, label); R.chartTex.needsUpdate = true;
}
let calKey = "";
function drawCal(R, text, sub) { const k = text + "|" + sub; if (k === calKey) return; calKey = k; R.P.calendarDraw(R.calCv.getContext("2d"), R.calCv.width, R.calCv.height, text, sub); R.calTex.needsUpdate = true; }

function T_chart(f, bt, X) {
  const L = LOC.exchange, x = L.x, z = L.z, trend = bt.trend || "bubble", [, xe] = CURVES[trend] || CURVES.up;
  const [h] = hitsOf(bt, 1), u = prog(f, bt.a, bt.b);
  const t = f < h ? xe * prog(f, bt.a + 4, h) : xe + (1 - xe) * prog(f, h, bt.b - 6);
  drawChart(X.R, trend, t, bt.label || "PRICE");
  X.cam = camFromKeys([{ f: bt.a, p: [x + 0.6, 1.9, z + 9.5], t: [x + 0.9, 2.9, -6.0], fov: 46 }, { f: bt.b, p: [x + 1.1, 2.2, z + 7.0], t: [x + 1.3, 3.2, -6.6], fov: 46 }], f, KICKS);
  X.out.focus = 7; X.out.coc = 3;
  const after = f >= h, bad = trend === "bubble" || trend === "crash", meh = trend === "zero" || trend === "flat";
  X.hero({ x: x - 0.4, y: 0, z: z + 0.6, look: -0.5, expr: bt.expr || (meh ? (after ? "nervous" : "neutral") : after ? (bad ? "shock" : "grin") : (bad ? "grin" : "smile")), wave: !after && bad ? 0.5 + 0.3 * Math.sin(f * 0.4) : undefined });
  X.npc("t1", f, { x: x + 2.3, y: 0, z: z + 0.2, look: -0.6, expr: meh ? "nervous" : after ? (bad ? "nervous" : "laugh") : "laugh", tilt: after && bad ? 0 : 4 * Math.sin(f * 0.4) });
  X.npc("lawyer", f, { x: x + 4.0, y: 0, z: z - 0.6, look: -0.6, expr: meh ? "stern" : after ? (bad ? "shock" : "grin") : "grin" });
  if (after && !meh && f < h + 16) X.out.fx.push({ kind: "burst", t: prog(f, h, h + 16), x: x + 2.0, y: 4.2, z: -6.7, w: 2.2, h: 2.2 });
}
function T_ticker(f, bt, X) {
  const L = LOC.exchange, tx = X.R.ticker.position.x, tz = X.R.ticker.position.z;
  X.cam = camFromKeys([{ f: bt.a, p: [tx - 1.0, 1.6, tz + 3.0], t: [tx - 0.5, 1.3, tz], fov: 44 }, { f: bt.b, p: [tx - 0.75, 1.5, tz + 2.3], t: [tx - 0.45, 1.25, tz], fov: 44 }], f, KICKS);
  X.out.focus = 2.6; X.out.coc = 8;
  const [h] = hitsOf(bt, 1);
  X.hero({ x: tx - 0.9, y: 0, z: tz + 0.2, prop: "paper", expr: f >= h ? (bt.expr || "shock") : "smile" });
  const rate = f >= h ? 3 : 9;
  for (let i = 0; i < 26; i++) {
    const t0 = bt.a + i * rate - (f >= h ? (h - bt.a) * 0.6 : 0), tt = (f - t0) / 24; if (tt < 0 || tt > 1.4) continue;
    out_tape(X, tx + 0.05 + 0.5 * (hash(i) - 0.5) * tt, Math.max(0.12, 1.5 - 1.4 * tt * tt), tz + 0.3 + 0.4 * hash(i + 1) * tt, (hash(i + 2) - 0.5) * 3 * tt);
  }
  if (f >= h && f < h + 14) X.out.fx.push({ kind: "burst", t: prog(f, h, h + 14), x: tx, y: 1.55, z: tz + 0.1, w: 1.1, h: 1.1 });
}
const out_tape = (X, x, y, z, rot) => X.out.fx.push({ kind: "tape", cw: 320, ch: 64, x, y, z, w: 0.5, h: 0.1, rot });
function T_bankrun(f, bt, X) {
  X.light = LIGHTS[bt.light || "storm"]; X.out.snow = 0;
  const bx = 220, bz = -6.4, [h] = hitsOf(bt, 1);
  X.cam = camFromKeys([{ f: bt.a, p: [bx + 3.0, 5.2, bz + 13], t: [bx, 1.6, bz - 0.5], fov: 44 }, { f: bt.b, p: [bx + 2.0, 3.6, bz + 10.5], t: [bx, 1.8, bz - 0.5], fov: 44 }], f, KICKS);
  X.out.focus = 11; X.out.coc = 3;
  const shut = f >= h ? spring((f - h) / 18) : 0;
  X.R.bankDoors.forEach((g, i) => (g.rotation.y = (i ? -1 : 1) * 1.35 * (1 - shut)));
  const ids = ["t1", "t2", "t3", "t4", "digger", "neighbor"];
  ids.forEach((id, i) => {
    const side = i % 2 ? 1 : -1, d0 = 7 + hash(i) * 4, tt = prog(f, bt.a - 10 + i * 4, h + 6);
    const px = bx + side * (d0 * (1 - ss(tt)) + 0.4 + (i % 3) * 0.5), pz = bz + 2.6 + (i % 3) * 0.7 - 1.0 * ss(tt);
    X.npc(id, f, { x: px, y: 0, z: pz, mode: tt < 1 ? "stroll" : "stand", phase: f * 0.09 + i, look: -side * 0.6, expr: f >= h ? "shock" : "nervous", wave: f >= h ? 0.7 + 0.3 * Math.sin(f * 0.8 + i) : undefined });
  });
  if (bt.hero !== false) X.hero({ x: bx + 4.6, y: 0, z: bz + 4.4, expr: bt.expr || "smile_closed", look: -0.6 });
  if (f >= h && f < h + 12) X.out.fx.push({ kind: "puff", t: prog(f, h, h + 12), x: bx, y: 1.2, z: bz + 0.6, w: 2.4, h: 2.4 });
}
function T_ship(f, bt, X) {
  const L = LOC.harbor, { x, y, z } = L, [h] = hitsOf(bt, 1), out = bt.dir === "out";
  X.cam = camFromKeys([{ f: bt.a, p: [x - 3.2, 1.9, z + 5.2], t: [x + 1.5, 2.6, -14], fov: 46 }, { f: bt.b, p: [x - 2.6, 2.1, z + 4.4], t: [x + 1.0, 2.8, -14], fov: 46 }], f, KICKS);
  X.out.focus = 4.5; X.out.coc = 3;
  const S = X.R.ship, tt = out ? ss(prog(f, bt.a, bt.b)) : easeOut(prog(f, bt.a, h));
  S.position.set(out ? x + 1.5 - 4 * tt : x + 7 - 5.5 * tt, 0.12 * Math.sin(f * 0.12), out ? -16 - 55 * tt : -70 + 54 * tt); S.rotation.z = 0.03 * Math.sin(f * 0.09); S.rotation.x = 0.02 * Math.sin(f * 0.07);
  X.R.sea.position.y = 0.008 + 0.02 * Math.sin(f * 0.1);
  X.hero({ x: x - 0.8, y, z, wave: 0.55 + 0.35 * Math.sin(f * 0.45), look: 0.5, expr: f >= h ? (bt.expr || "grin") : "smile" });
  if (bt.npc) X.npc(bt.npc, f, { x: x + 0.6, y, z: z - 0.4, look: 0.6, expr: "smile" });
  if (f >= h && f < h + 16) X.out.fx.push({ kind: "stars", t: prog(f, h, h + 16), x: S.position.x + 2, y: 6, z: S.position.z + 0.5, w: 3, h: 3 });
}
function T_stack(f, bt, X) {
  X.R.deskLamp.intensity = 5;
  const L = LOC.office, hits = hitsOf(bt, 3), heights = bt.heights || [2, 4, 8, 16];
  X.cam = camFromKeys([{ f: bt.a, p: [L.x + 0.35, 1.45, -0.2], t: [L.x + 0.3, 1.2, -1.9], fov: 42 }, { f: bt.b, p: [L.x + 0.4, 1.38, -0.55], t: [L.x + 0.32, 1.22, -1.9], fov: 42 }], f, KICKS);
  X.out.focus = 1.45; X.out.coc = 9;
  const shown = 1 + hits.filter((hh) => f >= hh).length;
  X.R.stacks.forEach((g, i) => { const on = i < shown, at = i ? hits[i - 1] : bt.a; g.children.forEach((c, k) => (c.visible = on && k < heights[i]));
    const b = on && i ? Math.exp(-(f - at) / 5) : 0; g.scale.set(1 + 0.3 * b, 1 - 0.3 * b, 1 + 0.3 * b); });
  X.hero({ x: L.x, y: 0, z: L.z, expr: shown >= 4 ? "grin" : "smile", look: 0.3 });
  hits.forEach((hh) => { if (f >= hh && f < hh + 14) X.out.fx.push({ kind: "stars", t: prog(f, hh, hh + 14), x: L.x - 0.1 + hits.indexOf(hh) * 0.32 + 0.32, y: 1.5, z: -1.8, w: 0.5, h: 0.5 }); });
}
function T_calendar(f, bt, X) {
  X.R.deskLamp.intensity = 5;
  const L = LOC.office, [h] = hitsOf(bt, 1);
  X.cam = camFromKeys([{ f: bt.a, p: [L.x + 1.1, 2.5, 1.4], t: [L.x + 1.4, 2.9, -5.3], fov: 44 }, { f: bt.b, p: [L.x + 0.9, 2.7, -0.6], t: [L.x + 1.4, 3.0, -5.3], fov: 40 }], f, KICKS);
  X.out.focus = 4.6; X.out.coc = 5;
  const from = +bt.from, to = +bt.to, u = prog(f, bt.a + 4, h), e = 1 - Math.pow(1 - u, 2.2);
  const val = Number.isFinite(from) && Number.isFinite(to) ? Math.round(from + (to - from) * e) : (u < 1 ? bt.from : bt.to);
  drawCal(X.R, val, bt.sub || "YEAR");
  X.hero({ x: L.x - 0.6, y: 0, z: L.z + 0.2, look: 0.6, expr: f >= h ? (bt.expr || "grin") : "neutral" });
  if (u > 0 && u < 1) for (let i = 0; i < 6; i++) { const t0 = (f + i * 5) % 30 / 30; X.out.fx.push({ kind: "page", cw: 128, ch: 150, x: L.x + 1.4 + 1.2 * t0 + 0.2 * hash(i), y: 3.2 - 2.4 * t0 * t0, z: -5.1 + 0.8 * t0, w: 0.4, h: 0.47, rot: 4 * t0 * (hash(i + 3) - 0.5) }); }
  if (f >= h && f < h + 14) X.out.fx.push({ kind: "burst", t: prog(f, h, h + 14), x: L.x + 1.4, y: 3.0, z: -5.2, w: 1.6, h: 1.6 });
}

// ---------- camera styles: any beat can add "cam": push | pull | orbit | low | high | dutch | whip | drift ----------
function camStyle(cam, f, bt) {
  const st = bt.cam; if (!st || !cam) return cam;
  const u = prog(f, bt.a, bt.b), p = cam.p.slice(), t = cam.t.slice(), d = [p[0] - t[0], p[1] - t[1], p[2] - t[2]];
  if (st === "push") for (let i = 0; i < 3; i++) p[i] = t[i] + d[i] * (1 - 0.35 * ss(u));
  if (st === "pull") for (let i = 0; i < 3; i++) p[i] = t[i] + d[i] * (0.7 + 0.5 * ss(u));
  if (st === "orbit" || st === "drift") { const a = (st === "orbit" ? 0.55 : 0.22) * (ss(u) - 0.5), c = Math.cos(a), s = Math.sin(a); p[0] = t[0] + d[0] * c + d[2] * s; p[2] = t[2] - d[0] * s + d[2] * c; }
  if (st === "low") { p[1] = Math.max(t[1] - 0.9, 0.35 + (t[1] > 2 ? 1 : 0)); t[1] += 0.25; }
  if (st === "high") { p[1] += 1.6 + Math.hypot(d[0], d[2]) * 0.25; }
  if (st === "whip") { const k = 1 - easeOut(prog(f, bt.a, bt.a + 10)); t[0] += 3.5 * k; }
  return { p, t, fov: cam.fov, roll: (cam.roll || 0) + (st === "dutch" ? 0.1 : 0) };
}

const TEMPLATES = { intro: T_intro, wide: T_wide, work: T_work, closeup: T_closeup, gift: T_gift, empty_chair: T_empty_chair, vault: T_vault,
  crates: T_crates, rock: T_rock, grow: T_grow, rain: T_rain, crowd: T_crowd, finale: T_finale,
  chart: T_chart, ticker: T_ticker, bankrun: T_bankrun, ship: T_ship, stack: T_stack, calendar: T_calendar };
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
  R.bankDoors.forEach((g, i) => (g.rotation.y = (i ? -1 : 1) * 1.35)); R.ship.position.set(431, 0, -16); R.ship.rotation.set(0, 0, 0); R.sea.position.y = 0.008;
  R.stacks.forEach((g, i) => { g.scale.setScalar(1); g.children.forEach((c, k) => (c.visible = k < [2, 4, 8, 16][i])); });
  const bl = beatLoc(bt);
  R.hallLamp.intensity = bl === "exchange" ? 9 : 0; R.deskLamp.intensity = bl === "office" ? 5 : 0;
  if (bl === "exchange" && !["chart"].includes(bt.shot)) drawChart(R, B.chart?.trend || "up", 1, B.chart?.label || "PRICE");
  if (bl === "office" && bt.shot !== "calendar") drawCal(R, B.calendar ?? "", B.calendarSub || "YEAR");
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
  X.cam = camStyle(X.cam, f, bt);
  for (const a of out.actors) if (a.blink === undefined) a.blink = blinkAt(f, a.seed);
  for (const c of FLASH) { const d = f - c; if (d >= 0 && d < 6) out.flash = Math.max(out.flash, 0.9 * (1 - d / 6)); }
  out.cam = X.cam; out.light = X.light; out.cardTint = X.light.card;
  return out;
}
