// "The Janitor Nobody Noticed" — shots, cameras, lights, actors and effects as pure functions of the frame (30 fps).
import * as THREE from "three";
import { headInfo, OUTFITS } from "./cast.js";

export const N = 1422;
const SU = 0.00225;
// ---------- motion helpers ----------
export const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const ss = (t) => { t = clamp(t); return t * t * t * (t * (t * 6 - 15) + 10); };
export const easeOut = (t) => 1 - Math.pow(1 - clamp(t), 3);
export const back = (t, k = 1.7) => { t = clamp(t) - 1; return 1 + t * t * ((k + 1) * t + k); };
export const spring = (t) => { t = Math.max(0, t); return 1 - Math.exp(-6 * t) * Math.cos(12 * t); };
const prog = (f, a, b) => clamp((f - a) / (b - a));
const L3 = (a, b, t) => a.map((v, i) => lerp(v, b[i], t));
export const idle = (f, seed) => ({ tilt: 1.3 * Math.sin(f * 0.07 + seed), headTilt: 2.2 * Math.sin(f * 0.05 + seed * 2.1), sy: 1 + 0.01 * Math.sin(f * 0.13 + seed) });
export const blinkAt = (f, seed) => { const per = 80 + (seed % 5) * 9, ph = (f + seed * 23) % per; return ph < 2 ? 1 : ph < 4 ? 0.5 : 0; };
const hash = (i) => { const x = Math.sin(i * 127.1) * 43758.5453; return x - Math.floor(x); };

/** camera keys [{f, p, t, fov, roll, e}] ; e = "ss" | "out" ; holds creep */
function camFromKeys(keys, f, kicks = []) {
  let k0 = keys[0], k1 = keys[0];
  for (let i = 0; i < keys.length; i++) { if (keys[i].f <= f) { k0 = keys[i]; k1 = keys[i + 1] || keys[i]; } }
  const t = k1 === k0 ? 0 : (f - k0.f) / (k1.f - k0.f), e = k1.e === "out" ? easeOut(t) : ss(t);
  const p = L3(k0.p, k1.p, e), tg = L3(k0.t, k1.t, e);
  const fov = lerp(k0.fov ?? 40, k1.fov ?? 40, e), roll = lerp(k0.roll ?? 0, k1.roll ?? 0, e);
  // creep: nothing is ever static
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

// ---------- shots ----------
// voice phrases (s): hook 0-4.78 | pumped gas 5.71-10.05 | swept 10.59-12.06 | pins 12.57-14.89 | hat 15.45-18.29
// died 18.93-20.59 | box 20.91-23.23 | packed 23.72-25.90 | you see 26.53-27.93 | bought 28.06-30.49 | hardest 30.99-33.30
// nothing 33.92-34.42 | acorns 34.98-38.06 | left 38.62-42.45 | thought 43.05-44.45 | in the end 45.02-45.64 | helped 45.98-47.15
export const SHOTS = [
  { id: "hook", a: 0 }, { id: "station", a: 160 }, { id: "sweep", a: 312 }, { id: "pins", a: 372 }, { id: "hat", a: 458 },
  { id: "chair", a: 566 }, { id: "vault", a: 622 }, { id: "reads", a: 795 }, { id: "rock", a: 930 }, { id: "acorn", a: 1046 },
  { id: "gift", a: 1158 }, { id: "pity", a: 1291 }, { id: "end", a: 1350 },
];
export const FLASH = [312, 566, 622, 795, 1046, 1158, 1291, 1350];
export const KICKS = [726, 864, 882, 897, 1068, 1350, 1398];
export const shotAt = (f) => { let s = SHOTS[0]; for (const x of SHOTS) if (f >= x.a) s = x; return s; };

const RON = [-0.3, 0, -1.9], STORE = [15.0, 0, -5.0], PORCH_Y = 0.5;
const ron = (f, extra) => { const i = idle(f, 3); return { id: "ron", o: "ronald", seed: 3, expr: "smile", mode: "stand", tilt: i.tilt, headTilt: i.headTilt, sy: i.sy, blink: blinkAt(f, 3), ...extra }; };
const npc = (id, o, seed, f, extra) => { const i = idle(f, seed); return { id, o, seed, expr: "smile", mode: "stand", tilt: i.tilt, headTilt: i.headTilt, sy: i.sy, blink: blinkAt(f, seed), ...extra }; };
/** world y of a design-space y on a card standing at y0 with scale s */
const cardY = (yd, y0 = 0, s = 1) => y0 + (975 - yd) * SU * s;

export function frameState(f, R) {
  const sh = shotAt(f), out = { actors: [], fx: [], snow: 0, flash: 0, coc: 8, focus: 4, fade: 1 };
  let light = LIGHTS.day, cam;
  // ---- defaults for animated world parts ----
  R.chair.rotation.x = 0; R.CAR.position.set(2.4, 0, -0.7); R.carPaint.color.set("#3f6fb5");
  R.toys.forEach((t, i) => { t.position.y = 0.8; t.visible = true; t.rotation.z = 0; t.scale.setScalar(1); });
  R.lid.rotation.x = 0; R.vlamp.intensity = 0;
  R.bigOak.g.scale.setScalar(0.001); R.oaks.forEach((o) => o.g.scale.setScalar(o.s));
  R.dirtM.visible = false;
  const setWins = (list, lit) => list.forEach((m) => { const t = R.P.windowTex(lit); if (m.face.map !== t) { m.face.map = t; } });
  setWins(R.hospWins, false); setWins(R.libWins, false); setWins(R.ronWins, false);
  const leaf = (k) => R.yardTree.lv.forEach((m) => (m.material = R.leafMats[k]));
  leaf("snow");

  switch (sh.id) {
    case "hook": case "station": {
      out.snow = 0.55;
      const [x, , z] = RON;
      cam = camFromKeys([
        { f: 0, p: [x + 0.28, 1.78, z + 2.75], t: [x, 1.66, z], fov: 40 },
        { f: 150, p: [x + 0.22, 1.8, z + 2.35], t: [x, 1.68, z], fov: 40 },
        { f: 212, p: [x + 1.6, 2.7, z + 11.0], t: [x + 1.2, 1.7, z - 0.8], fov: 42 },
        { f: 312, p: [x + 1.9, 2.8, z + 10.4], t: [x + 1.2, 1.75, z - 0.8], fov: 42 },
      ], f, KICKS);
      out.focus = f < 170 ? 2.5 : lerp(2.5, 11, prog(f, 160, 212)); out.coc = f < 170 ? 11 : lerp(11, 3, prog(f, 160, 212));
      const money = prog(f, 98, 112); // "eight million dollars"
      out.actors.push(ron(f, { x, y: 0, z, look: f > 100 && f < 150 ? -0.6 : 0, expr: f > 100 && f < 150 ? "whistle" : "smile",
        wave: f >= 175 && f < 215 ? 0.5 + 0.5 * Math.sin(f * 0.5) : undefined }));
      if (f >= 98 && f < 160) {
        const s = 0.42 * back(money) * (1 - prog(f, 148, 160));
        out.fx.push({ kind: "coin", x: x + 0.15, y: 2.42 + 0.03 * Math.sin(f * 0.3), z: z + 0.05, w: s, h: s, rot: 0.15 * Math.sin(f * 0.2) });
        if (f < 116) out.fx.push({ kind: "burst", t: prog(f, 98, 116), x: x + 0.15, y: 2.42, z: z - 0.02, w: 0.9, h: 0.9 });
      }
      // twenty-five years: days, sunsets and nights roll past, cars come and go
      const cyc = prog(f, 252, 300);
      if (cyc > 0 && cyc < 1) {
        const k = cyc * 3, i = Math.floor(k), u = k - i, seq = [LIGHTS.day, LIGHTS.golden, LIGHTS.night, LIGHTS.day];
        light = mixLight(seq[i], seq[i + 1], ss(u));
        R.carPaint.color.set(["#3f6fb5", "#d9a441", "#5d7a3a", "#8c3b4a", "#7b5ac9", "#3f6fb5"][Math.floor(cyc * 6)]);
        R.CAR.position.x = 2.4 + 6 * Math.pow(Math.sin(cyc * 6 * Math.PI) ** 2, 4) * 0.3;
      }
      if (f > 160 && f < 300 && (f - 175) % 40 < 10 && f > 175) out.fx.push({ kind: "puff", t: ((f - 175) % 40) / 10, x: 2.4 - 2.2, y: 0.3, z: -0.4, w: 0.9, h: 0.9 });
      break;
    }
    case "sweep": {
      out.snow = 0.6;
      const [x, , z] = STORE;
      cam = camFromKeys([{ f: 312, p: [x + 1.3, 1.85, z + 4.6], t: [x + 0.2, 2.0, z], fov: 48 }, { f: 372, p: [x + 0.9, 1.8, z + 4.1], t: [x + 0.15, 1.9, z], fov: 48 }], f, KICKS);
      out.focus = 4.4; out.coc = 6;
      const k = Math.sin(f * 0.32);
      out.actors.push(ron(f, { x, y: 0, z, prop: ["broom", k], expr: "smile_closed", tilt: 2 * k }));
      if (Math.abs(Math.cos(f * 0.32)) > 0.92 && f % 2 === 0) out.fx.push({ kind: "puff", t: 0.4, x: x + 0.25 + 0.15 * k, y: 0.12, z: z + 0.2, w: 0.5, h: 0.5 });
      break;
    }
    case "pins": {
      out.snow = 0.5;
      const [x, , z] = STORE;
      cam = camFromKeys([{ f: 372, p: [x + 0.1, 1.34, z + 1.32], t: [x, 1.3, z], fov: 40 }, { f: 458, p: [x + 0.05, 1.32, z + 1.08], t: [x, 1.28, z], fov: 40 }], f, KICKS);
      out.focus = 1.2; out.coc = 10;
      out.actors.push(ron(f, { x, y: 0, z, expr: "smile", look: 0.4 }));
      const hi = headInfo(OUTFITS.ronald, 3), HH = 2 * hi.b;
      for (const [i, at] of [[0, 404], [1, 414], [2, 424]]) {
        const yd = hi.chin + (0.22 + i * 0.26) * HH, t = prog(f, at, at + 14);
        if (t > 0 && t < 1) out.fx.push({ kind: "stars", t, x: x + 0.03, y: cardY(yd), z: z + 0.05, w: 0.32, h: 0.32 });
      }
      break;
    }
    case "hat": {
      out.snow = 0.7;
      const [x, , z] = STORE;
      cam = camFromKeys([{ f: 458, p: [x + 0.95, 1.75, z + 4.2], t: [x + 0.55, 1.55, z], fov: 45 }, { f: 566, p: [x + 0.8, 1.72, z + 3.6], t: [x + 0.5, 1.6, z], fov: 45 }], f, KICKS);
      out.focus = 4.0; out.coc = 7;
      const on = f >= 497, w = prog(f, 458, 488), lift = prog(f, 484, 497);
      out.actors.push(ron(f, { x, y: 0, z, o: on ? "ronaldHat" : "ronald", expr: on ? "grin" : "neutral", look: 0.6,
        headTilt: on ? 6 * Math.exp(-(f - 497) / 8) * Math.sin((f - 497) * 0.8) : 0, sy: on ? 1 + 0.05 * Math.exp(-(f - 497) / 5) : 1 }));
      out.actors.push(npc("nb", "neighbor", 5, f, { x: lerp(x + 2.8, x + 1.05, ss(w)), y: 0, z: z + 0.25, mode: w < 1 ? "stroll" : "stand", phase: f * 0.04,
        wave: f >= 484 && f < 512 ? (f < 497 ? back(lift) : 1 - prog(f, 500, 512)) : undefined, look: -0.6, expr: on ? "smile_closed" : "smile" }));
      if (f >= 486 && f < 497) { const t = prog(f, 486, 497); out.fx.push({ kind: "beanie", x: lerp(x + 0.75, x + 0.02, t), y: lerp(2.55, 2.12, t) + 0.15 * Math.sin(t * Math.PI), z: z + 0.1, w: 0.42, h: 0.42 }); }
      if (f >= 497 && f < 512) out.fx.push({ kind: "stars", t: prog(f, 497, 512), x, y: 2.15, z: z + 0.06, w: 0.9, h: 0.9 });
      break;
    }
    case "chair": {
      light = LIGHTS.night; out.snow = 0.35;
      cam = camFromKeys([{ f: 566, p: [-15.0, 1.5, -4.0], t: [-15.4, 0.95, -6.9], fov: 40 }, { f: 622, p: [-15.15, 1.35, -4.6], t: [-15.4, 0.95, -6.9], fov: 40 }], f, KICKS);
      out.focus = 2.9; out.coc = 9;
      R.chair.rotation.x = 0.07 * Math.sin(f * 0.09);
      out.fx.push({ kind: "beanie", x: -15.4, y: 1.05 + 0.03 * Math.sin(f * 0.09), z: -6.75, w: 0.4, h: 0.4, tint: "#c8d0ec" });
      break;
    }
    case "vault": {
      light = LIGHTS.vault; R.vlamp.intensity = 6;
      cam = camFromKeys([{ f: 622, p: [121.0, 1.85, 2.9], t: [120.45, 1.3, -0.8], fov: 46 }, { f: 712, p: [120.85, 1.9, 2.3], t: [120.4, 1.3, -0.8], fov: 48 },
        { f: 795, p: [120.6, 2.05, 1.7], t: [120.35, 1.2, -0.7], fov: 50 }], f, KICKS);
      out.focus = 2.9; out.coc = 7;
      const open = f >= 726 ? spring((f - 726) / 30) : 0;
      R.lid.rotation.x = -1.75 * open - (f >= 715 && f < 726 ? 0.04 * Math.sin(f * 2.5) : 0);
      out.actors.push(npc("law", "lawyer", 8, f, { x: 120.78, y: 0, z: -1.05, expr: f >= 726 ? "shock" : f > 690 ? "nervous" : "neutral",
        wave: f >= 640 && f < 700 ? 0.3 + 0.2 * Math.sin(f * 0.4) : undefined, look: -0.5 }));
      if (f >= 726) {
        if (f < 742) out.fx.push({ kind: "burst", t: prog(f, 726, 742), x: 120, y: 1.35, z: -0.55, w: 2.0, h: 2.0 });
        for (let i = 0; i < 22; i++) {
          const t0 = 726 + (i % 6), t = (f - t0) / 30; if (t < 0) continue;
          const vx = (hash(i) - 0.5) * 2.6, vy = 2.6 + hash(i + 9) * 1.8, vz = 0.4 + hash(i + 3) * 1.4;
          const y = 1.25 + vy * t - 2.2 * t * t; if (y < 0.9 && t > 0.5) continue;
          out.fx.push({ kind: "paper", cw: 300, ch: 200, x: 120 + vx * t, y: Math.max(0.9, y), z: -0.6 + vz * t * 0.7, w: 0.34, h: 0.23, rot: (hash(i + 5) - 0.5) * 8 * t });
        }
      }
      break;
    }
    case "reads": case "rock": {
      const tx = -12.4, rz = -7.6;
      cam = camFromKeys([
        { f: 795, p: [-12.55, 2.0, -4.7], t: [-12.6, 1.95, rz], fov: 40 },
        { f: 842, p: [-12.5, 2.0, -4.8], t: [-12.6, 1.9, rz], fov: 40 },
        { f: 868, p: [-12.4, 1.75, -4.75], t: [tx, 1.5, -7.0], fov: 44 },
        { f: 929, p: [-12.4, 1.7, -4.97], t: [tx, 1.48, -7.0], fov: 44 },
        { f: 930, p: [-15.15, 1.55, -4.2], t: [-15.4, 1.25, -6.9], fov: 42 },
        { f: 962, p: [-15.15, 1.55, -4.35], t: [-15.4, 1.25, -6.9], fov: 42 },
        { f: 1046, p: [-15.3, 1.42, -5.25], t: [-15.4, 1.3, -6.9], fov: 42 },
      ], f, KICKS);
      out.focus = f < 930 ? 2.7 : 2.0; out.coc = 9; out.snow = 0.3;
      // toys land on "solid", "boring", "companies"
      [864, 882, 897].forEach((at, i) => {
        const t = prog(f, at - 8, at), y = f < at - 8 ? 3 : lerp(2.0, 0.8, t * t);
        R.toys[i].position.y = y; R.toys[i].visible = f >= at - 8;
        if (f >= at) { const s = Math.exp(-(f - at) / 5); R.toys[i].scale.set(1 + 0.25 * s, 1 - 0.25 * s, 1 + 0.25 * s); }
        if (f >= at && f < at + 10) out.fx.push({ kind: "puff", t: prog(f, at, at + 10), x: tx - 0.42 + i * 0.42, y: 1.4, z: -6.75, w: 0.45, h: 0.45 });
      });
      if (f < 930) {
        out.actors.push(ron(f, { o: "ronaldHat", x: -12.55, y: PORCH_Y, z: rz, prop: f < 842 ? "paper" : null, expr: f < 842 ? "smile" : "smile_closed",
          wave: f >= 850 && f < 905 ? 0.4 + 0.2 * Math.sin(f * 0.3) : undefined, blob: false }));
      } else {
        // seasons roll by while he rocks: winter -> summer -> autumn -> winter; "Nothing." at 1018
        const cyc = prog(f, 935, 1005);
        if (cyc > 0 && cyc < 1) {
          const seq = [LIGHTS.day, LIGHTS.spring, LIGHTS.golden, LIGHTS.day], k = cyc * 3, i = Math.min(2, Math.floor(k));
          light = mixLight(seq[i], seq[i + 1], ss(k - i));
          leaf(cyc < 0.33 ? "green" : cyc < 0.66 ? "orange" : "snow");
          out.snow = cyc < 0.66 ? 0 : 0.3;
        }
        const calm = 1 - prog(f, 1000, 1020), rock = 0.09 * calm * Math.sin(f * 0.14);
        R.chair.rotation.x = rock;
        const sleep = f >= 1018;
        out.actors.push(ron(f, { o: "ronaldHat", x: -15.4, y: PORCH_Y + 0.02 * Math.sin(f * 0.14) * calm, z: -6.62, mode: "sit", expr: sleep ? "smile_closed" : "smile",
          blink: sleep ? 0 : blinkAt(f, 3), tilt: rock * 40, headTilt: sleep ? 7 : 0, blob: false }));
        if (sleep) for (let j = 0; j < 3; j++) { const t = ((f - 1020 + j * 9) % 27) / 27; if (f - 1020 + j * 9 < 0) continue;
          out.fx.push({ kind: "zz", x: -15.15 + 0.25 * t, y: 2.0 + 0.5 * t, z: -6.55, w: 0.18 + 0.12 * t, h: 0.18 + 0.12 * t }); }
      }
      break;
    }
    case "acorn": {
      light = LIGHTS.spring;
      cam = camFromKeys([{ f: 1046, p: [-91.0, 1.45, -1.7], t: [-90.9, 1.05, -5.4], fov: 44 }, { f: 1070, p: [-90.9, 1.45, -1.5], t: [-90.8, 1.05, -5.4], fov: 44 },
        { f: 1112, p: [-89.6, 2.5, 4.0], t: [-90.0, 3.3, -5.6], fov: 50, e: "out" }, { f: 1158, p: [-89.5, 2.4, 3.6], t: [-90.0, 3.2, -5.6], fov: 50 }], f, KICKS);
      out.focus = f < 1080 ? 3.8 : 9.4; out.coc = f < 1080 ? 8 : 4;
      R.dirtM.visible = true;
      const g = f < 1068 ? 0.001 : 0.02 + 0.98 * back(prog(f, 1068, 1108), 1.2);
      R.bigOak.g.scale.setScalar(g); R.bigOak.g.rotation.z = 0.04 * Math.sin(f * 0.11) * clamp(g);
      R.oaks.forEach((o, i) => o.g.scale.setScalar(o.s * (0.001 + 0.999 * back(prog(f, 1076 + i * 6, 1110 + i * 6), 1.2))));
      const wag = f >= 1112 && f < 1152;
      out.actors.push(ron(f, { o: "ronaldHat", x: -91.7, y: 0, z: -5.2, expr: wag ? "stern" : f < 1068 ? "smile" : "grin",
        wave: wag ? 0.55 + 0.35 * Math.sin(f * 0.7) : f < 1052 ? 0.1 : undefined }));
      if (f >= 1050 && f < 1068) { const t = prog(f, 1050, 1068); out.fx.push({ kind: "acorn", x: lerp(-91.3, -90.2, t), y: lerp(1.75, 0.08, t * t) + 0.3 * Math.sin(t * Math.PI), z: -5.5, w: 0.2, h: 0.2, rot: t * 5 }); }
      if (f >= 1066 && f < 1080) out.fx.push({ kind: "puff", t: prog(f, 1066, 1080), x: -90.2, y: 0.25, z: -5.4, w: 0.9, h: 0.9 });
      const din = prog(f, 1098, 1122), dout = prog(f, 1136, 1158);
      if (f >= 1098) out.actors.push(npc("dig", "digger", 9, f, { x: lerp(-86.0, -88.5, ss(din)) + 2.8 * ss(dout), y: 0, z: -4.9, mode: din < 1 || dout > 0 ? "stroll" : "stand", phase: f * 0.05,
        prop: ["shovel", f < 1122 ? 0.2 : 0.1], expr: f >= 1122 ? "nervous" : "grin", look: -0.6 }));
      break;
    }
    case "gift": {
      light = LIGHTS.golden;
      const hy = R.hillY(-14, -52);
      cam = camFromKeys([{ f: 1158, p: [-7.0, hy + 2.3, -29.5], t: [-8, hy + 3.6, -48.5], fov: 46 }, { f: 1236, p: [-7.4, hy + 2.6, -31.0], t: [-8, hy + 3.4, -48.5], fov: 46 },
        { f: 1268, p: [-19.6, hy + 2.4, -31.0], t: [-20, hy + 3.2, -48.5], fov: 46 }, { f: 1291, p: [-19.8, hy + 2.5, -32.0], t: [-20, hy + 3.2, -48.5], fov: 46 }], f, KICKS);
      out.focus = 17.5; out.coc = 3;
      setWins(R.hospWins, f >= 1236); setWins(R.libWins, f >= 1257);
      for (let i = 0; i < 26; i++) {
        const lib = i >= 14, t0 = (lib ? 1238 : 1168) + (i % 14) * 4, t = (f - t0) / 22; if (t < 0 || t > 1) continue;
        const bx = lib ? -20 : -8;
        out.fx.push({ kind: "coin", x: bx + (hash(i) - 0.5) * 7, y: hy + 12 - 11 * t * t, z: -46.2 + hash(i + 2) * 1.5, w: 0.75, h: 0.75, rot: t * 6 * (hash(i + 4) - 0.5) });
      }
      for (const [at, bx] of [[1236, -8], [1257, -20]]) if (f >= at && f < at + 16) out.fx.push({ kind: "burst", t: prog(f, at, at + 16), x: bx, y: hy + 1.2, z: -48.0, w: 7, h: 7 });
      break;
    }
    case "pity": {
      light = LIGHTS.flashback; out.snow = 0.45;
      cam = camFromKeys([{ f: 1291, p: [0.6, 1.72, 3.8], t: [0.6, 1.4, -2.0], fov: 45 }, { f: 1350, p: [0.6, 1.66, 3.0], t: [0.6, 1.4, -2.0], fov: 45 }], f, KICKS);
      out.focus = 5.4; out.coc = 5;
      R.CAR.position.x = 30;
      out.actors.push(ron(f, { o: "ronaldHat", x: 0.55, y: 0, z: -2.2, expr: "smile_closed" }));
      out.actors.push(npc("t3", "t3", 13, f, { x: 1.15, y: 0, z: -3.6, expr: "nervous", look: -0.6, headTilt: -8 * Math.sin(f * 0.25) }));
      out.actors.push(npc("t1", "t1", 11, f, { x: -0.4, y: 0, z: -1.0, expr: "nervous", look: 0.6, wave: 0.15, headTilt: 7 * Math.sin(f * 0.22) }));
      out.actors.push(npc("t2", "t2", 12, f, { x: 1.6, y: 0, z: -1.2, expr: "nervous", look: -0.6, headTilt: -6 * Math.sin(f * 0.2 + 1) }));
      out.fx.push({ kind: "coin", x: -0.05, y: 1.55 + 0.02 * Math.sin(f * 0.3), z: -0.95, w: 0.16, h: 0.16 });
      break;
    }
    case "end": {
      light = LIGHTS.golden;
      const hy0 = R.hillY(-14, -42), hy = R.hillY(-14, -52);
      cam = camFromKeys([{ f: 1350, p: [-14.0, hy0 + 1.85, -36.6], t: [-14.0, hy0 + 2.0, -43], fov: 44, roll: 0.06 },
        { f: 1422, p: [-14.0, hy0 + 4.0, -28.5], t: [-14.0, hy0 + 4.2, -48], fov: 48, roll: 0 }], f, KICKS);
      out.focus = lerp(6.5, 15, prog(f, 1350, 1422)); out.coc = 5;
      setWins(R.hospWins, true); setWins(R.libWins, true);
      const crowd = [["nb", "neighbor", 5, -16.4], ["t1", "t1", 11, -15.3], ["law", "lawyer", 8, -14.2], ["t2", "t2", 12, -13.1], ["dig", "digger", 9, -12.0], ["t3", "t3", 13, -14.75, -0.9]];
      for (const [id, o, seed, x, dz = 0] of crowd) {
        const z = -42 + dz, happy = f >= 1395;
        out.actors.push(npc(id, o, seed, f, { x, y: R.hillY(x, z), z, expr: happy ? (seed % 2 ? "laugh" : "grin") : "smile_closed",
          wave: happy && seed % 3 === 0 ? 0.6 + 0.3 * Math.sin(f * 0.5 + seed) : undefined, tilt: happy ? 4 * Math.sin(f * 0.4 + seed) : 0 }));
      }
      if (f >= 1396) { const t = prog(f, 1396, 1422); out.fx.push({ kind: "glow", x: -14, y: hy + 4, z: -49.5, w: 26 * easeOut(t), h: 26 * easeOut(t), cw: 256, ch: 256 });
        if (f < 1414) out.fx.push({ kind: "burst", t: prog(f, 1396, 1414), x: -14, y: hy + 5, z: -49.0, w: 16, h: 16 }); }
      break;
    }
  }
  // flashes on place / time jumps
  for (const c of FLASH) { const d = f - c; if (d >= 0 && d < 6) out.flash = Math.max(out.flash, 0.9 * (1 - d / 6)); }
  out.cam = cam; out.light = light; out.cardTint = light.card;
  return out;
}
