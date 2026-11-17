// Film kit: sets, props, lights and camera builders that each video's film module composes.
// Units are metres; y up; the camera usually sits at +z looking toward -z. A character card is ~1.9 m tall at scale 1.
import { THREE, P, toon, flat, TILE, grad } from "./core.js";

// ---------- math / easing (also handed to film modules as K.E) ----------
export const E = (() => {
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ss = (t) => { t = clamp(t); return t * t * t * (t * (t * 6 - 15) + 10); };
  const easeIn = (t) => clamp(t) ** 3;
  const easeOut = (t) => 1 - Math.pow(1 - clamp(t), 3);
  const back = (t, k = 1.7) => { t = clamp(t) - 1; return 1 + t * t * ((k + 1) * t + k); };
  const spring = (t) => { t = Math.max(0, t); return 1 - Math.exp(-6 * t) * Math.cos(12 * t); };
  const prog = (f, a, b) => clamp((f - a) / Math.max(1, b - a));
  const L3 = (a, b, t) => a.map((v, i) => lerp(v, b[i], t));
  const wob = (f, k = 1, s = 0) => Math.sin(f * 0.21 * k + s) * 0.6 + Math.sin(f * 0.13 * k + s * 2.3) * 0.4;
  const hash = (i) => { const x = Math.sin(i * 127.1 + 1.3) * 43758.5453; return x - Math.floor(x); };
  const bounce = (t) => { t = clamp(t); const n = 7.5625, d = 2.75; if (t < 1 / d) return n * t * t; if (t < 2 / d) return n * (t -= 1.5 / d) * t + 0.75; if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + 0.9375; return n * (t -= 2.625 / d) * t + 0.984375; };
  return { clamp, lerp, ss, easeIn, easeOut, back, spring, prog, L3, wob, hash, bounce };
})();
const { clamp, lerp, ss, L3, hash } = E;

// ---------- lights (sky + grade presets). Override fields with K.light(name, {...}) ----------
export const LIGHTS = {
  day: { skyTop: "#6fa8de", skyHor: "#e4eef7", fog: "#dde8f3", fogNear: 50, fogFar: 300, hemiSky: "#dbe8ff", hemiGround: "#c4cfe0", hemi: 1.5, sun: "#fff3df", sunI: 2.6, az: 35, el: 40, sat: 1.12, tint: [1, 1, 1.02], lift: [0, 0, 0.004], vign: 0.25, card: "#ffffff" },
  noon: { skyTop: "#3f8ee0", skyHor: "#cfe6f7", fog: "#d6e6f2", fogNear: 60, fogFar: 340, hemiSky: "#e6f0ff", hemiGround: "#d8c8a8", hemi: 1.55, sun: "#fffaf0", sunI: 2.9, az: 15, el: 68, sat: 1.15, tint: [1.02, 1, 0.98], lift: [0, 0, 0], vign: 0.2, card: "#ffffff" },
  desert: { skyTop: "#4a8fd8", skyHor: "#f3dcb4", fog: "#ecd6b0", fogNear: 60, fogFar: 320, hemiSky: "#fff0d8", hemiGround: "#d8a870", hemi: 1.45, sun: "#fff0d0", sunI: 3.0, az: 55, el: 48, sat: 1.2, tint: [1.06, 1.0, 0.9], lift: [0.008, 0.004, 0], vign: 0.26, card: "#fff6e8" },
  golden: { skyTop: "#6a86c8", skyHor: "#ffd2a0", fog: "#f2cfa8", fogNear: 50, fogFar: 300, hemiSky: "#ffe0c0", hemiGround: "#b8a8b8", hemi: 1.3, sun: "#ffc078", sunI: 2.9, az: -50, el: 16, sat: 1.15, tint: [1.05, 1.0, 0.92], lift: [0.005, 0, 0], vign: 0.3, card: "#fff0dc" },
  sunset: { skyTop: "#4a3a8a", skyHor: "#ff8a4a", fog: "#e08a6a", fogNear: 40, fogFar: 260, hemiSky: "#ffb890", hemiGround: "#7a5070", hemi: 1.2, sun: "#ff8040", sunI: 2.8, az: -75, el: 7, sat: 1.25, tint: [1.1, 0.95, 0.9], lift: [0.012, 0, 0.008], vign: 0.36, card: "#ffd8c0" },
  dusk: { skyTop: "#3a3f78", skyHor: "#f08a6a", fog: "#c88a80", fogNear: 50, fogFar: 300, hemiSky: "#ffc8b0", hemiGround: "#8a7090", hemi: 1.25, sun: "#ff9a6a", sunI: 2.4, az: -70, el: 9, sat: 1.18, tint: [1.06, 0.97, 0.95], lift: [0.008, 0, 0.006], vign: 0.34, card: "#ffe2d2" },
  night: { skyTop: "#162246", skyHor: "#3d5285", fog: "#2e3f6a", fogNear: 30, fogFar: 220, hemiSky: "#5a6faa", hemiGround: "#2a3050", hemi: 1.1, sun: "#a9bfff", sunI: 1.1, az: 20, el: 42, sat: 0.95, tint: [0.84, 0.92, 1.12], lift: [0, 0, 0.01], vign: 0.4, card: "#aeb9dc" },
  neon: { skyTop: "#1a0f3a", skyHor: "#6a2a7a", fog: "#3a1f5a", fogNear: 30, fogFar: 200, hemiSky: "#8a6aff", hemiGround: "#ff4a9a", hemi: 1.3, sun: "#7af0ff", sunI: 1.4, az: -30, el: 30, sat: 1.3, tint: [0.98, 0.9, 1.12], lift: [0.01, 0, 0.02], vign: 0.42, card: "#d8c8ff" },
  storm: { skyTop: "#4a5466", skyHor: "#9aa3b0", fog: "#8a929e", fogNear: 40, fogFar: 220, hemiSky: "#c8d0dc", hemiGround: "#6a6e78", hemi: 1.35, sun: "#d8dde6", sunI: 1.2, az: 20, el: 50, sat: 0.7, tint: [0.95, 0.98, 1.05], lift: [0, 0.002, 0.01], vign: 0.42, card: "#e6e9ef" },
  cold: { skyTop: "#7aa6d8", skyHor: "#eef4fa", fog: "#e2ecf6", fogNear: 40, fogFar: 260, hemiSky: "#e8f2ff", hemiGround: "#b8c8dc", hemi: 1.55, sun: "#eef4ff", sunI: 2.2, az: 30, el: 25, sat: 0.95, tint: [0.96, 1.0, 1.08], lift: [0, 0.004, 0.012], vign: 0.28, card: "#f2f6ff" },
  spring: { skyTop: "#4f9ee6", skyHor: "#d8f0ff", fog: "#cfe6f5", fogNear: 50, fogFar: 300, hemiSky: "#e2f2ff", hemiGround: "#a9c88a", hemi: 1.5, sun: "#fff6dc", sunI: 2.8, az: 40, el: 45, sat: 1.15, tint: [1, 1, 1], lift: [0, 0, 0], vign: 0.22, card: "#ffffff" },
  interior: { skyTop: "#5a4a3a", skyHor: "#8a7058", fog: "#5a4a3a", fogNear: 40, fogFar: 160, hemiSky: "#ffe6c8", hemiGround: "#8a6a50", hemi: 1.75, sun: "#ffe2b8", sunI: 1.6, az: 40, el: 55, sat: 1.1, tint: [1.04, 1.0, 0.93], lift: [0.004, 0.002, 0], vign: 0.34, card: "#fff3e2" },
  lamp: { skyTop: "#1e2846", skyHor: "#3a4870", fog: "#2a2a3a", fogNear: 40, fogFar: 160, hemiSky: "#ffd9a8", hemiGround: "#5a4038", hemi: 1.35, sun: "#ffcf90", sunI: 0.7, az: -40, el: 35, sat: 1.05, tint: [1.06, 0.98, 0.88], lift: [0.006, 0.002, 0], vign: 0.45, card: "#ffe8cc" },
  office: { skyTop: "#9ab8d8", skyHor: "#e8eef4", fog: "#dfe6ee", fogNear: 40, fogFar: 200, hemiSky: "#f0f4ff", hemiGround: "#b8b4ac", hemi: 1.8, sun: "#ffffff", sunI: 1.5, az: 20, el: 60, sat: 1.0, tint: [1, 1, 1.03], lift: [0, 0, 0.006], vign: 0.26, card: "#ffffff" },
  vault: { skyTop: "#3a3230", skyHor: "#3a3230", fog: "#3a3230", fogNear: 40, fogFar: 140, hemiSky: "#ffe3c0", hemiGround: "#6a5a50", hemi: 1.5, sun: "#ffe8c8", sunI: 1.4, az: 20, el: 62, sat: 1.06, tint: [1.04, 1.0, 0.94], lift: [0, 0, 0], vign: 0.38, card: "#fff1e0" },
  mind: { skyTop: "#123a4a", skyHor: "#2a6a7a", fog: "#1f4a58", fogNear: 30, fogFar: 140, hemiSky: "#9af0ff", hemiGround: "#3a5a6a", hemi: 1.5, sun: "#d8fff8", sunI: 1.2, az: 10, el: 60, sat: 1.15, tint: [0.95, 1.02, 1.06], lift: [0, 0.006, 0.01], vign: 0.45, card: "#e8fffc" },
  studio: { skyTop: "#d8d4cc", skyHor: "#d8d4cc", fog: "#d8d4cc", fogNear: 60, fogFar: 300, hemiSky: "#ffffff", hemiGround: "#c8c4bc", hemi: 1.8, sun: "#ffffff", sunI: 2.0, az: 30, el: 50, sat: 1.1, tint: [1, 1, 1], lift: [0, 0, 0], vign: 0.3, card: "#ffffff" },
  dream: { skyTop: "#b8a8f0", skyHor: "#ffd8ec", fog: "#f0d8ec", fogNear: 40, fogFar: 260, hemiSky: "#fff0ff", hemiGround: "#c8b0e0", hemi: 1.6, sun: "#fff0f8", sunI: 2.2, az: 30, el: 40, sat: 1.05, tint: [1.04, 0.98, 1.06], lift: [0.01, 0.004, 0.014], vign: 0.3, card: "#fff4fc" },
  flashback: { skyTop: "#6fa8de", skyHor: "#e4eef7", fog: "#dde8f3", fogNear: 50, fogFar: 300, hemiSky: "#dbe8ff", hemiGround: "#c4cfe0", hemi: 1.5, sun: "#fff3df", sunI: 2.6, az: 35, el: 40, sat: 0.35, tint: [1.1, 1.0, 0.84], lift: [0.02, 0.012, 0], vign: 0.5, card: "#ffffff" },
  danger: { skyTop: "#3a0f14", skyHor: "#a83a2a", fog: "#6a2a24", fogNear: 30, fogFar: 180, hemiSky: "#ff9a7a", hemiGround: "#4a1a1a", hemi: 1.3, sun: "#ff6a4a", sunI: 2.0, az: -20, el: 25, sat: 1.2, tint: [1.12, 0.9, 0.86], lift: [0.02, 0, 0], vign: 0.5, card: "#ffd0c4" },
};
const _c = new THREE.Color(), _d = new THREE.Color();
export function mixLight(a, b, t) {
  if (t <= 0) return a; if (t >= 1) return b;
  const o = {};
  for (const k in a) {
    if (typeof a[k] === "number") o[k] = lerp(a[k], b[k] ?? a[k], t);
    else if (Array.isArray(a[k])) o[k] = L3(a[k], b[k] ?? a[k], t);
    else if (typeof a[k] === "string") o[k] = "#" + _c.set(a[k]).lerp(_d.set(b[k] ?? a[k]), t).getHexString();
    else o[k] = a[k];
  }
  return o;
}
export const light = (name, over = {}) => ({ ...(typeof name === "string" ? LIGHTS[name] || LIGHTS.day : name), ...over });
/** flat backdrop light for abstract stages: one sky colour */
export const backdrop = (col, over = {}) => light("studio", { skyTop: col, skyHor: col, fog: col, ...over });

// ---------- cameras: each returns (u, lf, f) => {p, t, fov, roll}; u = 0..1 through the shot ----------
const camOf = (c) => ({ p: [...c.p], t: [...c.t], fov: c.fov ?? 40, roll: c.roll ?? 0 });
export const CAM = {
  /** fixed framing with a slow push toward the target (creep 0 = locked) */
  still: (p, t, fov = 40, creep = 0.06) => (u) => { const k = creep * ss(u); return { p: p.map((v, i) => v + (t[i] - v) * k), t: [...t], fov, roll: 0 }; },
  /** a -> b with easing ("ss" | "out" | "in" | "lin") */
  move: (a, b, ease = "ss") => (u) => {
    const e = ease === "out" ? E.easeOut(u) : ease === "in" ? E.easeIn(u) : ease === "lin" ? clamp(u) : ss(u), A = camOf(a), B = camOf(b);
    return { p: L3(A.p, B.p, e), t: L3(A.t, B.t, e), fov: lerp(A.fov, B.fov, e), roll: lerp(A.roll, B.roll, e) };
  },
  /** keyframes [[u, {p,t,fov,roll}], ...] eased between */
  keys: (ks) => (u) => {
    let i = 0; while (i < ks.length - 2 && u > ks[i + 1][0]) i++;
    const [u0, a] = ks[i], [u1, b] = ks[Math.min(i + 1, ks.length - 1)];
    return CAM.move(a, b, b.e || "ss")(u1 === u0 ? 1 : (u - u0) / (u1 - u0));
  },
  /** circle around target t at radius r, height h, from angle a0 to a1 (degrees; 0 = camera on +z) */
  orbit: (t, r, h, a0, a1, fov = 40, ease = "ss") => (u) => {
    const e = ease === "lin" ? clamp(u) : ss(u), a = (lerp(a0, a1, e) * Math.PI) / 180;
    return { p: [t[0] + Math.sin(a) * r, t[1] + h, t[2] + Math.cos(a) * r], t: [...t], fov, roll: 0 };
  },
  /** follow a moving point: at(u) -> [x,y,z]; camera sits at point + off, looks at point + look */
  follow: (at, off = [0, 0.3, 3], look = [0, 0, 0], fov = 40) => (u) => { const q = at(u); return { p: q.map((v, i) => v + off[i]), t: q.map((v, i) => v + look[i]), fov, roll: 0 }; },
  /** frame a point so a width w (or height h) fills the 9:16 frame. a0->a1 = orbit angle in degrees (0 = from +z),
   *  elev = camera elevation in degrees, push = how much closer it drifts by the end (0.1 = 10 %), dy = look offset */
  fit: (c, o = {}) => (u) => {
    const fov = o.fov ?? 40, vf = (fov * Math.PI) / 360, hf = Math.atan(Math.tan(vf) * (9 / 16));
    let d = Math.max((o.w ?? 0) / 2 / Math.tan(hf), (o.h ?? 0) / 2 / Math.tan(vf), 0.6); d *= 1 - (o.push ?? 0.08) * ss(u);
    const a = (lerp(o.a0 ?? 0, o.a1 ?? o.a0 ?? 0, ss(u)) * Math.PI) / 180, e = (lerp(o.e0 ?? o.elev ?? 4, o.e1 ?? o.elev ?? 4, ss(u)) * Math.PI) / 180;
    return { p: [c[0] + Math.sin(a) * Math.cos(e) * d, c[1] + Math.sin(e) * d, c[2] + Math.cos(a) * Math.cos(e) * d], t: [c[0], c[1] + (o.dy ?? 0), c[2]], fov, roll: ((o.roll ?? 0) * Math.PI) / 180 };
  },
  /** crane: rise from low to high while looking at t */
  crane: (t, r, h0, h1, ang = 0, fov = 40) => (u) => { const a = (ang * Math.PI) / 180, h = lerp(h0, h1, ss(u)); return { p: [t[0] + Math.sin(a) * r, h, t[2] + Math.cos(a) * r], t: [...t], fov, roll: 0 }; },
};

// ---------- texture / material helpers ----------
const TEX = {
  grass: () => P.grass(), dirt: () => P.dirt(), snow: () => P.snow(), sand: (c) => P.sand(c), road: () => P.road(), asphalt: () => P.asphalt(), cobble: () => P.cobble(),
  floor: (c) => P.floorboards(c), boards: (c) => P.floorboards(c), planks: (c) => P.planks(c || "#8a5a34"), tiles: (c, c2) => P.tiles(c, c2), carpet: (c) => P.carpet(c), concrete: (c) => P.concrete(c),
  marble: (c) => P.marble(c), metal: (c) => P.metal(c || "#8d949c"), brick: (c) => P.brick(c || "#a5503a"), siding: (c) => P.siding(c || "#d8c8a8"), plaster: (c) => P.plaster(c || "#e8dcc4"),
  wallpaper: (c) => P.wallpaper(c), westwood: (c) => P.westwood(c), panel: (c) => P.panel(c), glass: (c, lit) => P.glass(c, lit), books: () => P.books(), water: () => P.water(),
  shingles: (c) => P.shingles(c || "#6a4a3a"), rowhouse: (c) => P.rowhouse(c || "#a5503a"), stripes: (a, b) => P.stripes(a, b), bark: () => P.bark(), leaves: (c) => P.leaves(c || "#5f9e3a"),
};
/** material from: "#hex" | "tex:arg" (e.g. "brick:#9a4a3a", "floor") | THREE.Texture | THREE.Material */
export function mat(m) {
  if (m && m.isMaterial) return m;
  if (m && m.isTexture) return toon("t" + m.uuid, m);
  if (typeof m === "string" && m[0] === "#") return flat(m);
  if (typeof m === "string") { const [k, a, b] = m.split(":"); const f = TEX[k]; if (!f) throw new Error("unknown texture " + k); const t = f(a, b === "lit" ? true : b); return toon("t" + t.uuid, t); }
  return flat("#cccccc");
}
const glow = (c) => new THREE.MeshBasicMaterial({ color: c, fog: false });

// ---------- the kit: every builder adds into the set's group G ----------
export function makeKit(G, reg, lamps) {
  const meta = { clouds: true };
  const shadowOn = (m, cast = true) => { m.traverse((o) => { if (o.isMesh) { o.castShadow = cast; o.receiveShadow = true; } }); return m; };
  const grp = (x = 0, y = 0, z = 0, ry = 0, s = 1, parent = G) => { const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry; g.scale.setScalar(s); parent.add(g); return g; };
  /** register an animatable object: its transform/visibility is restored every frame before shots act */
  const dyn = (o) => { o.userData.base = { p: o.position.clone(), r: o.rotation.clone(), s: o.scale.clone(), v: o.visible }; reg.push(o); return o; };
  /** box: w,h,d; bottom-centre at x,y,z */
  const box = (w, h, d, m, x = 0, y = 0, z = 0, o = {}) => {
    const g = new THREE.BoxGeometry(w, h, d), tile = o.tile ?? TILE;
    const uv = g.attributes.uv, dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
    for (let f = 0; f < 6; f++) for (let i = 0; i < 4; i++) { const k = f * 4 + i; uv.setXY(k, (uv.getX(k) * dims[f][0]) / tile, (uv.getY(k) * dims[f][1]) / tile); }
    const me = new THREE.Mesh(g, mat(m)); me.position.set(x, y + h / 2, z); me.rotation.y = o.ry ?? 0; me.castShadow = o.cast ?? true; me.receiveShadow = true; (o.in || G).add(me); return me;
  };
  const cyl = (r0, r1, h, m, x = 0, y = 0, z = 0, o = {}) => { const me = new THREE.Mesh(new THREE.CylinderGeometry(r0, r1, h, o.seg ?? 16, 1, !!o.open), mat(m)); me.position.set(x, y + h / 2, z); if (o.rx) me.rotation.x = o.rx; if (o.rz) me.rotation.z = o.rz; me.castShadow = o.cast ?? true; me.receiveShadow = true; (o.in || G).add(me); return me; };
  const ball = (r, m, x = 0, y = 0, z = 0, o = {}) => { const me = new THREE.Mesh(new THREE.SphereGeometry(r, o.seg ?? 16, Math.max(8, (o.seg ?? 16) - 4)), mat(m)); me.position.set(x, y, z); me.scale.set(o.sx ?? 1, o.sy ?? 1, o.sz ?? 1); me.castShadow = o.cast ?? true; me.receiveShadow = true; (o.in || G).add(me); return me; };
  const cone = (r, h, m, x = 0, y = 0, z = 0, o = {}) => { const me = new THREE.Mesh(new THREE.ConeGeometry(r, h, o.seg ?? 12), mat(m)); me.position.set(x, y + h / 2, z); me.castShadow = o.cast ?? true; me.receiveShadow = true; (o.in || G).add(me); return me; };
  /** flat picture facing +z (rotate with o.ry); tex = THREE.Texture | "#hex" */
  const plate = (w, h, tex, x = 0, y = 0, z = 0, o = {}) => {
    const face = tex && tex.isTexture ? (o.own ? new THREE.MeshToonMaterial({ map: tex, gradientMap: grad }) : mat(tex)) : mat(tex);
    const edge = mat(o.edge || "#5a4a3e");
    const me = new THREE.Mesh(new THREE.BoxGeometry(w, h, o.d ?? 0.05), [edge, edge, edge, edge, face, edge]); me.face = face;
    me.position.set(x, y, z); me.rotation.y = o.ry ?? 0; if (o.rx) me.rotation.x = o.rx; me.receiveShadow = true; me.castShadow = !!o.cast; (o.in || G).add(me); return me;
  };
  const textTex = (text, bg = "#f4efe2", fg = "#241726", w = 1024, h = 256) => P.sign(text, bg, fg, w, h);
  /** a wall/ground slab with texture: horizontal ground at y=0 if o.ground */
  const ground = (m, w = 200, d = 200, o = {}) => { const me = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat(m)); me.rotation.x = -Math.PI / 2; me.position.set(o.x ?? 0, o.y ?? 0, o.z ?? 0);
    const uv = me.geometry.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) * w) / (o.tile ?? TILE * 2), (uv.getY(i) * d) / (o.tile ?? TILE * 2)); me.receiveShadow = true; G.add(me); return me; };
  /** point light slot (the engine owns 4 shared lights; sets just declare where lamps glow) */
  const lamp = (x, y, z, color = "#ffd59a", intensity = 6, dist = 12) => { const L = { pos: [x, y, z], color, intensity, dist, on: 1 }; lamps.push(L); return L; };
  const R = (seed) => P.rng(seed);

  // ---------------- props ----------------
  const prop = {};
  const PR = (name, fn) => (prop[name] = (o = {}) => { const g = grp(o.x ?? 0, o.y ?? 0, o.z ?? 0, o.ry ?? 0, o.s ?? 1, o.in || G); const h = fn(g, o) || {}; shadowOn(g, o.cast ?? true); Object.assign(g, h); return dyn(g); });
  PR("table", (g, o) => { const w = o.w ?? 1.6, d = o.d ?? 0.9, h = o.h ?? 0.78, c = o.col ?? "floor:#8a5a34";
    box(w, 0.07, d, c, 0, h - 0.07, 0, { in: g }); for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(0.08, h - 0.07, 0.08, "#5a3a24", sx * (w / 2 - 0.08), 0, sz * (d / 2 - 0.08), { in: g }); });
  PR("roundTable", (g, o) => { const r = o.r ?? 0.85, h = o.h ?? 0.76; cyl(r, r, 0.07, o.felt ?? "#2f7a4a", 0, h - 0.07, 0, { in: g, seg: 28 }); cyl(r + 0.06, r + 0.06, 0.05, o.col ?? "#6a4026", 0, h - 0.1, 0, { in: g, seg: 28 });
    cyl(0.08, 0.1, h - 0.1, "#4a2e1c", 0, 0, 0, { in: g }); cyl(0.4, 0.45, 0.05, "#4a2e1c", 0, 0, 0, { in: g, seg: 20 }); });
  PR("chair", (g, o) => { const c = o.col ?? "#7a4a2c"; box(0.46, 0.06, 0.46, c, 0, 0.44, 0, { in: g }); box(0.46, 0.55, 0.06, c, 0, 0.5, -0.2, { in: g });
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(0.05, 0.44, 0.05, c, sx * 0.19, 0, sz * 0.19, { in: g }); });
  PR("stool", (g, o) => { cyl(0.2, 0.2, 0.07, o.col ?? "#a03a2a", 0, 0.68, 0, { in: g }); cyl(0.04, 0.06, 0.68, "#5a5e66", 0, 0, 0, { in: g }); });
  PR("desk", (g, o) => { const w = o.w ?? 1.8, c = o.col ?? "floor:#6a4630"; box(w, 0.07, 0.85, c, 0, 0.74, 0, { in: g }); box(0.5, 0.74, 0.8, c, -w / 2 + 0.27, 0, 0, { in: g }); box(0.06, 0.74, 0.8, c, w / 2 - 0.05, 0, 0, { in: g }); box(w - 0.1, 0.5, 0.04, c, 0, 0.24, -0.38, { in: g }); });
  PR("counter", (g, o) => { const w = o.w ?? 5, h = o.h ?? 1.1; box(w, h - 0.08, 0.7, o.col ?? "westwood:#7a4a2c", 0, 0, 0, { in: g }); box(w + 0.2, 0.08, 0.9, o.top ?? "#3a2418", 0, h - 0.08, 0, { in: g }); });
  PR("shelf", (g, o) => { const w = o.w ?? 2, h = o.h ?? 2.2; box(w, h, 0.4, o.col ?? "#5a3b2a", 0, 0, 0, { in: g }); plate(w - 0.16, h - 0.16, o.fill === "bottles" ? P.sign("", "#3a2a20") : P.books(), 0, h / 2, 0.21, { in: g, d: 0.02 }); });
  PR("lamp", (g, o) => { const k = o.kind ?? "desk", col = o.glow ?? "#ffe39a";
    if (k === "floor") { cyl(0.2, 0.25, 0.05, "#3a3a40", 0, 0, 0, { in: g }); cyl(0.025, 0.025, 1.5, "#3a3a40", 0, 0, 0, { in: g }); cyl(0.18, 0.3, 0.32, o.col ?? "#e8d8b0", 0, 1.45, 0, { in: g, open: true }); ball(0.08, glow(col), 0, 1.55, 0, { in: g, cast: false }); }
    else if (k === "hang") { cyl(0.01, 0.01, o.cord ?? 1.0, "#222", 0, 0, 0, { in: g }); cyl(0.12, 0.38, 0.28, o.col ?? "#2f5f3a", 0, -0.28, 0, { in: g, open: true }); ball(0.09, glow(col), 0, -0.25, 0, { in: g, cast: false }); }
    else { cyl(0.12, 0.14, 0.03, "#3a3a40", 0, 0, 0, { in: g }); cyl(0.02, 0.02, 0.4, "#3a3a40", 0, 0, 0, { in: g }); cyl(0.07, 0.16, 0.16, o.col ?? "#2f7a4a", 0, 0.36, 0, { in: g, open: true }); ball(0.05, glow(col), 0, 0.4, 0, { in: g, cast: false }); }
    const y = k === "floor" ? 1.5 : k === "hang" ? -0.35 : 0.4; g.updateMatrixWorld(true); const wp = new THREE.Vector3(0, y, 0).applyMatrix4(g.matrixWorld);
    return { light: o.light === false ? null : lamp(wp.x, wp.y, wp.z, col, o.intensity ?? 5, o.dist ?? 9) }; });
  PR("crate", (g, o) => { const s = o.size ?? 0.8; box(s, s, s, o.col ?? "planks:#a87a4a", 0, 0, 0, { in: g }); if (o.label) plate(s * 0.8, s * 0.35, textTex(o.label, "#e8dcc0", "#3a2418"), 0, s * 0.55, s / 2 + 0.01, { in: g, d: 0.01 }); });
  PR("barrel", (g, o) => { cyl(0.36, 0.32, 0.95, o.col ?? "planks:#8a5a34", 0, 0, 0, { in: g }); for (const y of [0.15, 0.78]) cyl(0.37, 0.37, 0.05, "#3a3a40", 0, y, 0, { in: g }); });
  PR("safe", (g, o) => { const s = o.size ?? 1; box(s, s * 1.1, s * 0.9, o.col ?? "#4a5a6a", 0, 0, 0, { in: g });
    const door = grp(-s * 0.42, 0, s * 0.46, 0, 1, g); box(s * 0.84, s * 0.95, 0.06, o.col ?? "#566a7c", s * 0.42, s * 0.07, 0, { in: door }); cyl(0.12, 0.12, 0.05, "#c9a44a", s * 0.42, s * 0.55, 0.05, { in: door, rx: Math.PI / 2 });
    return { door: dyn(door) }; });
  PR("vaultDoor", (g, o) => { const r = o.r ?? 1.6, door = grp(0, r + 0.1, 0, 0, 1, g);
    cyl(r, r, 0.4, "metal:#9aa3ad", 0, -0.2, 0, { in: door, rx: Math.PI / 2, seg: 40 }); cyl(r * 0.7, r * 0.7, 0.42, "#7d868f", 0, -0.21, 0, { in: door, rx: Math.PI / 2, seg: 40 });
    const wheel = grp(0, 0, 0.25, 0, 1, door); for (let i = 0; i < 3; i++) { const b = box(r * 1.1, 0.1, 0.1, "#c9a44a", 0, -0.05, 0, { in: wheel }); b.rotation.z = (i * Math.PI) / 3; } cyl(0.18, 0.18, 0.1, "#c9a44a", 0, -0.05, 0, { in: wheel, rx: Math.PI / 2 });
    return { door: dyn(door), wheel: dyn(wheel) }; });
  PR("coin", (g, o) => { const r = o.r ?? 0.3; cyl(r, r, r * 0.18, o.col ?? "#f2c14e", 0, 0, 0, { in: g, rx: o.flat ? 0 : Math.PI / 2, seg: 28 }); });
  PR("coinStack", (g, o) => { const r = o.r ?? 0.2, n = o.n ?? 8, coins = []; for (let i = 0; i < n; i++) coins.push(dyn(cyl(r, r, r * 0.22, o.col ?? "#f2c14e", (hash(i) - 0.5) * 0.03, i * r * 0.22, (hash(i + 9) - 0.5) * 0.03, { in: g, seg: 24 }))); return { coins }; });
  PR("goldBars", (g, o) => { const n = o.n ?? 6, bars = []; let i = 0; for (let row = 0; i < n; row++) for (let c = 0; c < Math.max(1, 3 - row) && i < n; c++, i++) bars.push(dyn(box(0.5, 0.16, 0.24, "#e8b83a", (c - (Math.max(1, 3 - row) - 1) / 2) * 0.52, row * 0.16, (row % 2) * 0.02, { in: g }))); return { bars }; });
  PR("cash", (g, o) => { const n = o.n ?? 4, stacks = []; for (let i = 0; i < n; i++) { const s = dyn(box(0.42, 0.12 + hash(i) * 0.1, 0.2, "#7fb86a", (i % 2) * 0.46 - 0.23, Math.floor(i / 2) * 0.25, 0, { in: g })); box(0.08, s.geometry.parameters.height + 0.005, 0.205, "#e8e0c4", 0, -s.geometry.parameters.height / 2, 0, { in: s }); stacks.push(s); } return { stacks }; });
  PR("moneyBag", (g, o) => { const s = o.size ?? 1; ball(0.4 * s, o.col ?? "#c8a878", 0, 0.38 * s, 0, { in: g, sy: 1.0 }); cone(0.18 * s, 0.25 * s, o.col ?? "#c8a878", 0, 0.68 * s, 0, { in: g }); cyl(0.12 * s, 0.12 * s, 0.05 * s, "#7a5232", 0, 0.73 * s, 0, { in: g });
    plate(0.32 * s, 0.32 * s, P.sign("$", o.col ?? "#c8a878", "#3d5e3a", 256, 256), 0, 0.38 * s, 0.4 * s, { in: g, d: 0.01 }); });
  /** live screen: handle.draw({curve, t, label, down, ticker, bg}) — curve is x->y in 0..1 */
  PR("screen", (g, o) => { const w = o.w ?? 2.4, h = o.h ?? 1.5, cv = document.createElement("canvas"); cv.width = 512; cv.height = Math.round((512 * h) / w);
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; const face = new THREE.MeshBasicMaterial({ map: tex });
    box(w + 0.12, h + 0.12, 0.08, o.frame ?? "#2a2d36", 0, (o.y0 ?? 0) - 0.06, -0.05, { in: g }); const sc = new THREE.Mesh(new THREE.PlaneGeometry(w, h), face); sc.position.set(0, (o.y0 ?? 0) + h / 2, 0.0); g.add(sc);
    if (o.stand) { box(0.1, o.y0 ?? 0.8, 0.1, "#2a2d36", 0, 0, -0.05, { in: g }); }
    const def = { curve: o.curve ?? ((x) => 0.2 + 0.6 * x), t: o.t ?? 1, label: o.label ?? "", down: !!o.down, ticker: o.ticker ?? "", bg: o.bg ?? "#13202b", line: o.line ?? "#4fd18b" }; let key = "";
    const draw = (q = {}) => { const s = { ...def, ...q }, k = JSON.stringify([s.t, s.label, s.down, s.ticker, s.bg, q.curve ? q.curve.toString() + (q.ck ?? "") : "d"]); if (k === key) return; key = k; P.screenDraw(cv.getContext("2d"), cv.width, cv.height, s); tex.needsUpdate = true; };
    draw(); return { draw, reset: () => draw() }; });
  PR("clock", (g, o) => { const r = o.r ?? 0.5, cv = document.createElement("canvas"); cv.width = cv.height = 256; const c = cv.getContext("2d");
    c.fillStyle = o.face ?? "#f8f2e2"; c.beginPath(); c.arc(128, 128, 124, 0, 7); c.fill(); c.lineWidth = 10; c.strokeStyle = "#241726"; c.stroke(); c.fillStyle = "#241726";
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; c.fillRect(128 + Math.sin(a) * 100 - 5, 128 - Math.cos(a) * 100 - 5, 10, 10); }
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; cyl(r, r, 0.08, o.col ?? "#7a4a2c", 0, -0.04, 0, { in: g, rx: Math.PI / 2, seg: 32 });
    const f = new THREE.Mesh(new THREE.CircleGeometry(r * 0.94, 32), new THREE.MeshToonMaterial({ map: tex, gradientMap: grad })); f.position.z = 0.045; g.add(f);
    const hand = (L, wdt) => { const p = grp(0, 0, 0.06, 0, 1, g); const b = box(wdt, L, 0.02, "#241726", 0, 0, 0, { in: p, cast: false }); b.position.y = L / 2; return dyn(p); };
    const hh = hand(r * 0.5, 0.06), mm = hand(r * 0.78, 0.04);
    const time = (hours) => { mm.rotation.z = -(hours % 1) * Math.PI * 2; hh.rotation.z = -((hours % 12) / 12) * Math.PI * 2; }; time(o.time ?? 10.1); hh.userData.base.r.copy(hh.rotation); mm.userData.base.r.copy(mm.rotation);
    return { time }; });
  PR("hourglass", (g, o) => { const s = o.size ?? 1; for (const y of [0, 0.86 * s]) cyl(0.32 * s, 0.32 * s, 0.06 * s, "#7a4a2c", 0, y, 0, { in: g });
    const gl = new THREE.MeshToonMaterial({ color: "#cfe8f4", transparent: true, opacity: 0.45, gradientMap: grad });
    cone(0.26 * s, 0.4 * s, gl, 0, 0.06 * s, 0, { in: g, cast: false }).rotation.x = Math.PI; cone(0.26 * s, 0.4 * s, gl, 0, 0.46 * s, 0, { in: g, cast: false });
    const top = dyn(cone(0.2 * s, 0.3 * s, "#e8c070", 0, 0.5 * s, 0, { in: g })), bot = dyn(cone(0.2 * s, 0.25 * s, "#e8c070", 0, 0.07 * s, 0, { in: g }));
    top.rotation.x = Math.PI; top.position.y = 0.66 * s; top.userData.base.r.copy(top.rotation); top.userData.base.p.copy(top.position);
    const level = (k) => { top.scale.setScalar(Math.max(0.01, 1 - k)); bot.scale.setScalar(Math.max(0.01, k)); }; return { level }; });
  PR("scale", (g, o) => { cyl(0.3, 0.35, 0.08, "#c9a44a", 0, 0, 0, { in: g }); cyl(0.04, 0.04, 1.4, "#c9a44a", 0, 0, 0, { in: g }); const beam = dyn(grp(0, 1.4, 0, 0, 1, g)); box(1.6, 0.05, 0.05, "#c9a44a", 0, 0, 0, { in: beam });
    const pans = [-1, 1].map((sd) => { const p = dyn(grp(sd * 0.78, 0, 0, 0, 1, beam)); cyl(0.005, 0.005, 0.5, "#555", 0, -0.5, 0, { in: p }); cyl(0.32, 0.22, 0.06, "#c9a44a", 0, -0.55, 0, { in: p, seg: 20 }); return p; });
    const tilt = (a) => { beam.rotation.z = a; for (const p of pans) p.rotation.z = -a; }; return { tilt, pans }; });
  PR("piggy", (g, o) => { const c = o.col ?? "#f4a3b8", s = o.size ?? 1; ball(0.5 * s, c, 0, 0.55 * s, 0, { in: g, sx: 1.25, sy: 0.95 }); cyl(0.14 * s, 0.16 * s, 0.14 * s, c, 0.62 * s, 0.5 * s, 0, { in: g, rz: Math.PI / 2 });
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) cyl(0.08 * s, 0.09 * s, 0.25 * s, c, sx * 0.3 * s, 0, sz * 0.22 * s, { in: g }); for (const sz of [-1, 1]) cone(0.1 * s, 0.18 * s, c, 0.35 * s, 0.92 * s, sz * 0.2 * s, { in: g });
    for (const sz of [-1, 1]) ball(0.04 * s, "#241726", 0.5 * s, 0.68 * s, sz * 0.15 * s, { in: g }); box(0.2 * s, 0.02 * s, 0.05 * s, "#241726", 0, 1.0 * s, 0, { in: g }); });
  PR("plant", (g, o) => { cyl(0.22, 0.17, 0.4, o.pot ?? "#b8643a", 0, 0, 0, { in: g }); ball(0.42, mat("leaves:" + (o.col ?? "#4f9a4a")), 0, 0.8, 0, { in: g, sy: 1.15 }); });
  PR("tree", (g, o) => { const k = o.kind ?? "oak", s = 1;
    if (k === "pine") { cyl(0.18, 0.22, 1.0, "bark", 0, 0, 0, { in: g, seg: 7 }); for (let i = 0; i < 3; i++) cone(1.5 - i * 0.38, 1.9 - i * 0.3, "leaves:" + (o.col ?? "#2f6b4a"), 0, 0.9 + i * 0.95, 0, { in: g, seg: 9 }); }
    else if (k === "palm") { const tr = grp(0, 0, 0, 0, 1, g); for (let i = 0; i < 6; i++) cyl(0.17 - i * 0.012, 0.19 - i * 0.012, 0.75, "bark", Math.sin(i * 0.35) * 0.25, i * 0.72, 0, { in: tr, seg: 8 });
      for (let i = 0; i < 7; i++) { const a = (i / 7) * Math.PI * 2, f = box(2.4, 0.04, 0.5, "leaves:" + (o.col ?? "#4f9a3a"), 0, 0, 0, { in: g }); f.position.set(0.5 + Math.cos(a) * 1.0, 4.3, Math.sin(a) * 1.0); f.rotation.set(0, -a, -0.4); } }
    else if (k === "cactus") { const c = "leaves:" + (o.col ?? "#5a9a4a"); cyl(0.3, 0.3, 2.4, c, 0, 0, 0, { in: g, seg: 10 }); ball(0.3, c, 0, 2.4, 0, { in: g });
      for (const sd of [-1, 1]) { cyl(0.18, 0.18, 0.5, c, sd * 0.45, 0.9, 0, { in: g, rz: Math.PI / 2 }); cyl(0.18, 0.18, 0.8 + (sd > 0 ? 0.3 : 0), c, sd * 0.68, 0.95, 0, { in: g, seg: 10 }); ball(0.18, c, sd * 0.68, 1.75 + (sd > 0 ? 0.3 : 0), 0, { in: g }); } }
    else if (k === "bare") { cyl(0.2, 0.32, 3, "bark", 0, 0, 0, { in: g, seg: 8 }); for (let i = 0; i < 5; i++) { const b = cyl(0.05, 0.1, 1.4, "bark", 0, 0, 0, { in: g, seg: 6 }); b.position.set(Math.cos(i * 1.3) * 0.4, 2.6 + i * 0.15, Math.sin(i * 1.3) * 0.4); b.rotation.set(Math.sin(i * 1.3) * 0.7, 0, -Math.cos(i * 1.3) * 0.7); } }
    else { cyl(0.22, 0.38, 3.2, "bark", 0, 0, 0, { in: g, seg: 9 }); const lm = "leaves:" + (o.col ?? "#5f9e3a");
      for (const [lx, ly, lz, r] of [[0, 4.2, 0, 1.7], [1.2, 3.7, 0.2, 1.2], [-1.1, 3.6, -0.1, 1.25], [0.3, 5.2, -0.2, 1.15], [-0.4, 3.9, 0.9, 1.0]]) { const m = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), mat(lm)); m.position.set(lx, ly, lz); g.add(m); } } });
  PR("rock", (g, o) => { const m = new THREE.Mesh(new THREE.DodecahedronGeometry(o.r ?? 0.8, 0), mat(o.col ?? "#9a948a")); m.scale.set(1, 0.6, 0.9); m.position.y = (o.r ?? 0.8) * 0.4; m.rotation.y = hash(o.seed ?? 1) * 3; g.add(m); });
  PR("bush", (g, o) => { for (let i = 0; i < 3; i++) ball(0.5 - i * 0.08, "leaves:" + (o.col ?? "#4f8a3a"), (i - 1) * 0.45, 0.35, (hash(i) - 0.5) * 0.3, { in: g }); });
  PR("fence", (g, o) => { const L = o.len ?? 6, c = o.col ?? "#e8e0d0"; for (let x = -L / 2; x <= L / 2 + 0.01; x += 0.6) box(0.1, 1.0, 0.06, c, x, 0, 0, { in: g }); for (const y of [0.35, 0.75]) box(L + 0.1, 0.08, 0.04, c, 0, y, 0.04, { in: g }); });
  PR("lampPost", (g, o) => { cyl(0.07, 0.1, 3.4, o.col ?? "#2a2d36", 0, 0, 0, { in: g }); box(0.3, 0.4, 0.3, o.col ?? "#2a2d36", 0, 3.4, 0, { in: g }); box(0.22, 0.3, 0.22, glow(o.glow ?? "#ffe8a8"), 0, 3.45, 0, { in: g, cast: false });
    g.updateMatrixWorld(true); const wp = new THREE.Vector3(0, 3.5, 0).applyMatrix4(g.matrixWorld); return { light: o.light ? lamp(wp.x, wp.y, wp.z, o.glow ?? "#ffe8a8", o.intensity ?? 8, 14) : null }; });
  PR("bench", (g, o) => { const c = o.col ?? "planks:#8a5a34"; box(1.8, 0.06, 0.45, c, 0, 0.45, 0, { in: g }); box(1.8, 0.4, 0.05, c, 0, 0.55, -0.22, { in: g }); for (const sx of [-0.8, 0.8]) box(0.08, 0.45, 0.42, "#3a3a40", sx, 0, 0, { in: g }); });
  PR("car", (g, o) => { const c = o.col ?? "#3f6fb5", body = grp(0, 0, 0, 0, 1, g); box(3.6, 0.7, 1.7, c, 0, 0.35, 0, { in: body }); box(2.0, 0.6, 1.5, c, -0.2, 1.05, 0, { in: body });
    for (const sz of [-1, 1]) plate(1.7, 0.45, "#9cc4e8", -0.2, 1.36, sz * 0.76, { in: body, ry: sz > 0 ? 0 : Math.PI, d: 0.02 });
    const wheels = []; for (const sx of [-1.2, 1.2]) for (const sz of [-0.85, 0.85]) wheels.push(dyn(cyl(0.38, 0.38, 0.25, "#2a2a2e", sx, 0.38 - 0.125, sz, { in: g, rx: Math.PI / 2, seg: 18 })));
    for (const sz of [-0.6, 0.6]) ball(0.11, glow("#fff6c8"), 1.8, 0.75, sz, { in: body, cast: false }); return { body: dyn(body), wheels }; });
  /** sign board with text; post:true puts it on a pole */
  PR("sign", (g, o) => { const w = o.w ?? 2.4, h = o.h ?? 0.6; plate(w, h, textTex(o.text ?? "SIGN", o.bg ?? "#f4efe2", o.fg ?? "#241726", 1024, Math.round((1024 * h) / w)), 0, (o.post ? 2.0 : 0) + h / 2, 0, { in: g, d: 0.08, edge: o.edge ?? "#5a3a24", cast: true });
    if (o.post) for (const sx of [-1, 1]) box(0.08, 2.0, 0.08, o.edge ?? "#5a3a24", sx * (w / 2 - 0.1), 0, -0.02, { in: g }); });
  PR("poster", (g, o) => { const w = o.w ?? 1, h = o.h ?? 1.4; plate(w, h, o.tex ?? textTex(o.text ?? "", o.bg ?? "#f4e6c8", o.fg ?? "#5a2a1a", 512, Math.round((512 * h) / w)), 0, h / 2, 0, { in: g, d: 0.02 }); });
  PR("rug", (g, o) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(o.w ?? 3, o.d ?? 2), mat("carpet:" + (o.col ?? "#8c3b4a"))); m.rotation.x = -Math.PI / 2; m.position.y = 0.012; g.add(m); });
  PR("telegraph", (g, o) => { box(0.6, 0.12, 0.35, "#5a3b2a", 0, 0, 0, { in: g }); box(0.08, 0.1, 0.08, "#c9a44a", -0.15, 0.12, 0, { in: g }); const key = dyn(grp(0.05, 0.22, 0, 0, 1, g)); box(0.35, 0.03, 0.05, "#c9a44a", 0.1, 0, 0, { in: key }); ball(0.04, "#241726", 0.27, 0.04, 0, { in: key });
    cyl(0.1, 0.1, 0.12, "#e8e0c4", -0.2, 0.12, 0.08, { in: g, rz: Math.PI / 2 }); return { key }; });
  PR("phone", (g, o) => { cyl(0.1, 0.12, 0.04, "#241726", 0, 0, 0, { in: g }); cyl(0.025, 0.025, 0.35, "#241726", 0, 0.04, 0, { in: g }); cyl(0.05, 0.03, 0.08, "#241726", 0, 0.38, 0, { in: g }); });
  PR("newspaper", (g, o) => { plate(0.6, 0.8, P.sign(o.text ?? "NEWS", "#f2ede0", "#241726", 512, 680), 0, 0.4, 0, { in: g, d: 0.01, rx: o.flat ? -Math.PI / 2 : 0 }); });
  PR("globe", (g, o) => { cyl(0.15, 0.18, 0.05, "#7a4a2c", 0, 0, 0, { in: g }); cyl(0.02, 0.02, 0.25, "#c9a44a", 0, 0.05, 0, { in: g }); const sph = dyn(ball(0.3, "#4a8fd0", 0, 0.62, 0, { in: g }));
    for (let i = 0; i < 4; i++) ball(0.12, "#6ab04a", Math.cos(i * 1.7) * 0.23, Math.sin(i * 2.3) * 0.15, Math.sin(i * 1.7) * 0.23, { in: sph, sy: 0.6 }); return { sph }; });
  PR("arrow", (g, o) => { const up = o.dir !== "down", c = o.col ?? (up ? "#4fd18b" : "#ff5a5a"), s = o.size ?? 1;
    const sh = new THREE.Shape([[0, 1], [0.6, 0.35], [0.22, 0.35], [0.22, -0.8], [-0.22, -0.8], [-0.22, 0.35], [-0.6, 0.35]].map(([x, y]) => new THREE.Vector2(x * s, y * s)));
    const m = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.25 * s, bevelEnabled: false }), mat(c)); m.position.set(0, 0.8 * s, -0.12 * s); if (!up) { m.rotation.z = Math.PI; m.position.y = 1.0 * s; } g.add(m); });
  PR("pedestal", (g, o) => { const r = o.r ?? 1.2, h = o.h ?? 0.5; cyl(r, r * 1.05, h, o.col ?? "#f4efe2", 0, 0, 0, { in: g, seg: 32 }); cyl(r * 1.08, r * 1.08, 0.06, o.trim ?? "#c9a44a", 0, h - 0.03, 0, { in: g, seg: 32 }); });
  PR("bars3d", (g, o) => { const vals = o.vals ?? [0.3, 0.5, 0.7, 1], cols = o.cols ?? ["#4fd18b"], bw = o.bw ?? 0.5, gap = o.gap ?? 0.2, H = o.h ?? 2.5, bars = [];
    vals.forEach((v, i) => bars.push(dyn(box(bw, Math.max(0.01, v * H), bw, cols[i % cols.length], (i - (vals.length - 1) / 2) * (bw + gap), 0, 0, { in: g }))));
    const grow = (k) => bars.forEach((b, i) => { const kk = Math.max(0.004, Array.isArray(k) ? k[i] : k); b.scale.y = kk; b.position.y = (Math.max(0.01, vals[i] * H) * kk) / 2; }); return { bars, grow }; });
  PR("chips", (g, o) => { const cols = o.cols ?? ["#d23a3a", "#2f5fb5", "#f4efe2"], n = o.n ?? 3; for (let s = 0; s < n; s++) for (let i = 0; i < 4 + (s % 3); i++) cyl(0.06, 0.06, 0.02, cols[s % cols.length], (s - (n - 1) / 2) * 0.14, i * 0.021, 0, { in: g, seg: 14 }); });
  PR("bottle", (g, o) => { const c = o.col ?? "#3a6a3a"; cyl(0.06, 0.06, 0.22, c, 0, 0, 0, { in: g }); cyl(0.02, 0.05, 0.1, c, 0, 0.22, 0, { in: g }); });
  PR("door", (g, o) => { const w = o.w ?? 1.1, h = o.h ?? 2.2; box(w + 0.2, h + 0.1, 0.12, o.frame ?? "#4a3226", 0, 0, -0.04, { in: g }); const leaf = dyn(grp(-w / 2, 0, 0.03, 0, 1, g)); box(w, h, 0.06, o.col ?? "planks:#6b4a33", w / 2, 0, 0, { in: leaf }); ball(0.05, "#c9a44a", w - 0.12, 1.05, 0.05, { in: leaf }); return { leaf }; });
  PR("swingDoors", (g, o) => { const leaves = [-1, 1].map((sd) => { const l = dyn(grp(sd * 0.6, 0.4, 0, 0, 1, g)); box(0.58, 1.1, 0.05, o.col ?? "westwood:#9a6a3e", -sd * 0.29, 0, 0, { in: l }); return l; }); return { leaves }; });
  PR("window", (g, o) => { plate(o.w ?? 1.2, o.h ?? 1.4, P.windowTex(!!o.lit), 0, (o.h ?? 1.4) / 2, 0, { in: g, d: 0.04 }); });
  PR("cloud3d", (g, o) => { const c = o.col ?? "#ffffff"; for (let i = 0; i < 5; i++) ball(0.8 + hash(i + (o.seed ?? 0)) * 0.6, c, (i - 2) * 0.9, hash(i * 3) * 0.4, (hash(i * 5) - 0.5) * 0.6, { in: g, sy: 0.75 }); });
  PR("mountain", (g, o) => { const r = o.r ?? 30, h = o.h ?? 22; cone(r, h, o.col ?? "#7a8aa8", 0, 0, 0, { in: g, seg: 7 }); if (o.snowcap !== false) cone(r * 0.32, h * 0.32, "#f4f6fa", 0, h * 0.68, 0, { in: g, seg: 7 }); });
  PR("mesa", (g, o) => { const w = o.w ?? 30, h = o.h ?? 14; cyl(w * 0.4, w * 0.5, h, o.col ?? "#c8784a", 0, 0, 0, { in: g, seg: 9 }); cyl(w * 0.42, w * 0.4, h * 0.08, "#b0603a", 0, h, 0, { in: g, seg: 9 }); });
  PR("ship", (g, o) => { const c = o.col ?? "#6a3e24", hull = new THREE.Shape([[-4, 0.6], [4.5, 0.6], [3.4, -0.9], [-3.2, -0.9]].map(([x, y]) => new THREE.Vector2(x, y)));
    const m = new THREE.Mesh(new THREE.ExtrudeGeometry(hull, { depth: 2.2, bevelEnabled: false }), mat("planks:" + c.replace("#", "#"))); m.position.set(0, 0.9, -1.1); g.add(m);
    for (const [x, h] of [[-1.4, 6], [1.4, 7]]) { cyl(0.1, 0.12, h, "#5a3a24", x, 1.4, 0, { in: g }); const sl = plate(2.4, h * 0.55, P.sailcloth(), x, 1.6 + h * 0.55, 0.15, { in: g, d: 0.04, edge: "#e8dcc0" }); sl.rotation.y = Math.PI / 2 - 0.15; }
    plate(1.0, 0.6, o.flag ? textTex(o.flag, "#c0353a", "#fff") : "#c0353a", 1.4, 8.8, 0, { in: g, d: 0.02 }); });
  PR("dock", (g, o) => { const L = o.len ?? 10; box(3, 0.2, L, "planks:#8a6a4a", 0, 0.6, 0, { in: g }); for (let z = -L / 2 + 0.5; z < L / 2; z += 2) for (const sx of [-1.4, 1.4]) cyl(0.15, 0.15, 1.6, "#5a3a24", sx, -0.8, z, { in: g }); });
  PR("bulbSign", (g, o) => { const w = o.w ?? 3, h = o.h ?? 0.9; plate(w, h, textTex(o.text ?? "OPEN", o.bg ?? "#2a1a2a", o.fg ?? "#ffd84a", 1024, Math.round((1024 * h) / w)), 0, h / 2, 0, { in: g, d: 0.12, edge: "#c9a44a" });
    for (let i = 0; i < Math.round(w / 0.25); i++) for (const y of [0, h]) ball(0.05, glow("#fff2b0"), -w / 2 + 0.12 + i * 0.25, y, 0.08, { in: g, cast: false }); });

  // ---------------- facades & sets ----------------
  const winGrid = (in_, w, h, rows, cols, y0, lit, z) => { for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) plate(0.85, 1.1, P.windowTex(lit && hash(r * 7 + c) > 0.4), (c - (cols - 1) / 2) * (w / cols), y0 + r * (h / rows), z, { in: in_, d: 0.05 }); };
  /** one building front, facing +z before rotation. style: western | brick | victorian | modern | adobe | village | shop */
  function facade(o = {}) {
    const st = o.style ?? "brick", w = o.w ?? 6, g = grp(o.x ?? 0, 0, o.z ?? 0, o.ry ?? 0), seed = o.seed ?? 1, rr = R(seed), pick = (a) => a[Math.floor(rr() * a.length)];
    const col = o.col ?? pick({ western: ["#b07a4a", "#9a6a3e", "#c8925a", "#8a5a3a", "#a8a088"], brick: ["#a5503a", "#8a4a3a", "#b8683a", "#7a3a30"], victorian: ["#e8b8c8", "#a8c8d8", "#e8d8a0", "#b8d8b0", "#d8b8e8"], modern: ["#5f8fb8", "#4a7a8a", "#6a7aa8"], adobe: ["#d8a878", "#e0b890", "#c89870"], village: ["#f0e6d0", "#e8d0b0", "#d8c8b8"], shop: ["#3f6a5a", "#7a3a4a", "#2f4a7a", "#c0803a"] }[st] || ["#a5503a"]);
    let h = o.h;
    if (st === "western") { h = h ?? 4.2 + rr() * 1.6; const d = 5;
      box(w, h, d, "westwood:" + col, 0, 0, -d / 2, { in: g }); box(w, 1.0 + rr() * 0.8, 0.25, "westwood:" + col, 0, h, -0.12, { in: g }); // false front
      box(w + 0.2, 0.12, 2.0, "planks:#7a5a3a", 0, 0, 1.0, { in: g }); // boardwalk
      box(w + 0.3, 0.1, 2.2, "planks:#6a4a30", 0, 2.85, 1.0, { in: g }); for (const sx of [-1, 1]) box(0.14, 2.85, 0.14, "#5a3a24", sx * (w / 2 - 0.1), 0.12, 1.95, { in: g });
      if (o.sign !== "") plate(Math.min(w - 0.4, 4.2), 0.75, textTex(o.sign ?? pick(["HOTEL", "GENERAL STORE", "BANK", "SALOON", "BARBER", "ASSAY OFFICE", "GUNSMITH", "SHERIFF"]), pick(["#f4efe2", "#e8d8b0", "#2a1a14"]), "#3a2418"), 0, h + 0.3, 0.02, { in: g, d: 0.06 });
      plate(1.2, 2.0, P.planks("#5a3a24"), 0, 1.12, 0.02, { in: g }); for (const sx of [-1, 1]) plate(1.0, 1.2, P.windowTex(!!o.lit), sx * w * 0.3, 1.6, 0.02, { in: g }); if (h > 5) for (const sx of [-1, 1]) plate(0.8, 1.0, P.windowTex(!!o.lit), sx * w * 0.25, 4.0, 0.02, { in: g });
    } else if (st === "brick" || st === "shop") { const fl = o.floors ?? 2 + Math.floor(rr() * 3); h = h ?? fl * 3.2 + 1; const d = 6;
      box(w, h, d, (st === "shop" ? "plaster:" : "brick:") + col, 0, 0, -d / 2, { in: g }); box(w + 0.3, 0.35, 0.4, "#e8e0d0", 0, h - 0.35, 0.05, { in: g });
      winGrid(g, w, 3.2 * (fl - 1), fl - 1, Math.max(2, Math.round(w / 2)), 4.6, !!o.lit, 0.02);
      plate(w - 0.6, 2.2, P.windowTex(!!o.lit), 0, 1.3, 0.02, { in: g, d: 0.04 }); const aw = box(w, 0.08, 1.4, "stripes:" + pick(["#c0353a", "#2f6a4a", "#2f4a8a", "#d08a2a"]) + ":#f4efe2", 0, 2.75, 0.6, { in: g }); aw.rotation.x = 0.35;
      if (o.sign !== "") plate(Math.min(w - 0.6, 4), 0.6, textTex(o.sign ?? pick(["BAKERY", "BANK", "BOOKS", "TAILOR", "CAFE", "PHARMACY", "HARDWARE", "NEWS"]), "#241726", "#f4e6b8"), 0, 3.35, 0.03, { in: g, d: 0.05 });
    } else if (st === "victorian" || st === "village") { h = h ?? 5 + rr() * 2; const d = 6, rh = w * 0.35;
      box(w, h, d, (st === "village" ? "plaster:" : "siding:") + col, 0, 0, -d / 2, { in: g });
      const sh = new THREE.Shape([new THREE.Vector2(-w / 2 - 0.2, 0), new THREE.Vector2(w / 2 + 0.2, 0), new THREE.Vector2(0, rh)]); const pr = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: d + 0.4, bevelEnabled: false }), mat("shingles:" + pick(["#6a4a3a", "#4a5a6a", "#7a3a3a", "#3a4a3a"]))); pr.position.set(0, h, -d - 0.2); g.add(pr);
      plate(1.0, 2.0, P.planks("#6b4a33"), 0, 1.0, 0.02, { in: g }); for (const sx of [-1, 1]) { plate(0.9, 1.2, P.windowTex(!!o.lit), sx * w * 0.3, 1.6, 0.02, { in: g }); plate(0.9, 1.2, P.windowTex(!!o.lit), sx * w * 0.3, h - 1.6, 0.02, { in: g }); }
      if (st === "victorian") { box(w, 0.12, 1.6, "planks:#d8d0c0", 0, 0, 0.8, { in: g }); box(w + 0.2, 0.1, 1.8, "#e8e0d0", 0, 2.6, 0.8, { in: g }); for (const sx of [-1, 0, 1]) box(0.12, 2.6, 0.12, "#f4efe2", sx * (w / 2 - 0.1), 0, 1.55, { in: g }); }
    } else if (st === "modern") { const fl = o.floors ?? 6 + Math.floor(rr() * 10); h = h ?? fl * 3.4; const d = 10;
      box(w, h, d, "glass:" + col + (o.lit ? ":lit" : ""), 0, 0, -d / 2, { in: g, tile: 3.4 }); box(w + 0.2, 0.5, d + 0.2, "#d8dce2", 0, h, -d / 2, { in: g }); box(w - 1, 3.2, 0.3, "#2a2d36", 0, 0, 0.1, { in: g });
      if (o.sign) plate(Math.min(w - 1, 5), 0.7, textTex(o.sign, "#f4f6fa", "#1a2a3a"), 0, 3.6, 0.15, { in: g, d: 0.05 });
    } else if (st === "adobe") { h = h ?? 3.4 + rr() * 1.2; const d = 5;
      box(w, h, d, "plaster:" + col, 0, 0, -d / 2, { in: g }); for (let i = 0; i < Math.round(w / 0.9); i++) cyl(0.09, 0.09, 0.6, "#6a4a30", -w / 2 + 0.4 + i * 0.9, h - 0.6, 0.25, { in: g, rx: Math.PI / 2, seg: 8 });
      plate(1.0, 2.0, P.planks("#7a4a2a"), 0, 1.0, 0.02, { in: g }); for (const sx of [-1, 1]) plate(0.8, 0.9, P.windowTex(!!o.lit), sx * w * 0.3, 1.7, 0.02, { in: g });
    }
    return g;
  }
  const set = {};
  /** a street running along z. styles: one style or a list (mixed) */
  set.street = (o = {}) => {
    const L = o.length ?? 70, rw = o.road ?? 9, styles = [].concat(o.style ?? "brick"), rr = R(o.seed ?? 3), signs = [...(o.signs ?? [])];
    const gm = o.ground ?? (styles[0] === "western" || styles[0] === "adobe" ? "dirt" : "asphalt");
    ground(gm, 400, 400); if (gm === "asphalt" || gm === "cobble") { ground("concrete:#c8c2b8", 3, L + 40, { x: -rw / 2 - 1.5, y: 0.01 }); ground("concrete:#c8c2b8", 3, L + 40, { x: rw / 2 + 1.5, y: 0.01 }); }
    const side = gm === "asphalt" || gm === "cobble" ? 3 : 0;
    for (const sd of [-1, 1]) { let z = L / 2; let i = 0;
      while (z > -L / 2) { const w = 5 + rr() * 2.5, st = styles[Math.floor(rr() * styles.length)];
        facade({ style: st, w, x: sd * (rw / 2 + side + (st === "western" ? 2 : 0)), z: z - w / 2, ry: (sd < 0 ? 1 : -1) * Math.PI / 2, seed: (o.seed ?? 3) * 31 + i * 7 + (sd > 0 ? 100 : 0), lit: o.lit, sign: signs.length ? signs.shift() : undefined });
        z -= w + 0.15; i++; } }
    if (o.end !== false) { const st = styles[0]; if (st === "western" || st === "adobe") { prop.mesa({ x: -20, z: -L / 2 - 70, w: 40, h: 18 }); prop.mesa({ x: 30, z: -L / 2 - 90, w: 50, h: 24, col: "#b86a40" }); }
      else facade({ style: styles[0] === "modern" ? "modern" : "brick", w: rw + 2 * side + 6, z: -L / 2 - 2, seed: 99, lit: o.lit, sign: "" }); }
    return { road: rw, len: L, sidewalk: side };
  };
  /** an interior: back wall at z=-d/2, side walls at x=±w/2, open to +z. style presets set textures */
  set.room = (o = {}) => {
    const S = { saloon: { wall: "westwood:#9a6a3e", floor: "floor:#7a5232", trim: "panel:#5a3a24", ceil: "planks:#5a3a24" }, office: { wall: "wallpaper:#3f6a5a", floor: "carpet:#6a3a3a", trim: "panel:#4a3226", ceil: "plaster:#efe8dc" },
      bank: { wall: "marble:#e9e2d4", floor: "tiles:#e8e2d4:#2a2d36", trim: "marble:#b8a888", ceil: "plaster:#f4efe2" }, home: { wall: "wallpaper:#b86a5a", floor: "floor:#9a6b42", trim: "panel:#f0e8d8", ceil: "plaster:#f4efe2" },
      modern: { wall: "concrete:#d8d4cc", floor: "tiles:#e8e6e2:#d0ccc4", trim: "#2a2d36", ceil: "concrete:#e8e4dc" }, mind: { wall: "panel:#2f5a5a", floor: "metal:#5a6a72", trim: "metal:#c9a44a", ceil: "panel:#24484a" },
      library: { wall: "books", floor: "floor:#6a4630", trim: "panel:#4a2e1c", ceil: "planks:#4a2e1c" }, vault: { wall: "metal:#7d868f", floor: "metal:#5a626a", trim: "metal:#c9a44a", ceil: "metal:#6a727a" },
      studio: { wall: "#e8e4dc", floor: "#dcd8d0", trim: "#e8e4dc", ceil: "#e8e4dc" }, kitchen: { wall: "tiles:#f4f0e6:#cfe0e8", floor: "tiles:#f4efe2:#c84a3a", trim: "#f4f0e6", ceil: "plaster:#f4efe2" },
      factory: { wall: "brick:#8a4a3a", floor: "concrete:#a8a49c", trim: "metal:#5a5e66", ceil: "metal:#4a4e56" }, cabin: { wall: "planks:#8a5a34", floor: "floor:#6a4630", trim: "planks:#5a3a24", ceil: "planks:#5a3a24" },
    }[o.style ?? "home"] || {};
    const w = o.w ?? 10, d = o.d ?? 8, h = o.h ?? 4, wall = o.wall ?? S.wall, flo = o.floor ?? S.floor;
    ground("concrete:#6a645c", 120, 120, { y: -0.02 }); // under everything, in case a camera dips outside
    const fl = box(w, 0.1, d + 6, flo, 0, -0.1, 3, { cast: false }); fl.receiveShadow = true;
    box(w, h, 0.3, wall, 0, 0, -d / 2 - 0.15, { cast: false }); for (const sx of [-1, 1]) box(0.3, h, d + 6, wall, sx * (w / 2 + 0.15), 0, 3, { cast: false });
    if (S.trim && o.trim !== false) { box(w, 1.0, 0.06, S.trim, 0, 0, -d / 2 + 0.03, { cast: false }); for (const sx of [-1, 1]) box(0.06, 1.0, d + 6, S.trim, sx * (w / 2 - 0.03), 0, 3, { cast: false }); }
    if (o.ceiling !== false) box(w + 0.6, 0.2, d + 6, o.ceil ?? S.ceil ?? "#e8e4dc", 0, h, 3, { cast: false });
    for (const wx of o.windows ?? []) plate(1.4, 1.7, P.windowTex(!!o.lit), wx, h * 0.55, -d / 2 + 0.02, { d: 0.05 });
    if (o.door !== false) prop.door({ x: o.doorX ?? w / 2 - 1.4, z: -d / 2 + 0.06 });
    meta.clouds = false; return { w, d, h, clouds: false };
  };
  /** open land: meadow | desert | snow | farm | beach | forest | moon */
  set.landscape = (o = {}) => {
    const k = o.kind ?? "meadow", rr = R(o.seed ?? 5), gm = { meadow: "grass", farm: "grass", forest: "grass", desert: "sand:#e2c48f", beach: "sand:#f0dcae", snow: "snow", moon: "concrete:#b8b4ac" }[k] || "grass";
    ground(gm, 600, 600, { tile: 8 });
    if (k === "beach") { const w = new THREE.Mesh(new THREE.PlaneGeometry(600, 300), mat("water")); w.rotation.x = -Math.PI / 2; w.position.set(0, 0.03, -170); G.add(w); }
    const n = o.count ?? 26, clear = o.clear ?? 6;
    for (let i = 0; i < n; i++) { const a = rr() * Math.PI * 2, r = clear + rr() * 60, x = Math.cos(a) * r, z = Math.sin(a) * r - 10; if (k === "beach" && z < -18) continue;
      const kind = { desert: rr() > 0.5 ? "cactus" : "rock", snow: "pine", forest: rr() > 0.4 ? "pine" : "oak", beach: "palm", moon: "rock", farm: rr() > 0.7 ? "oak" : "bush", meadow: rr() > 0.5 ? "oak" : "bush" }[k];
      if (kind === "rock") prop.rock({ x, z, r: 0.6 + rr() * 1.5, seed: i, col: k === "moon" ? "#9a968e" : "#b8865a" }); else if (kind === "bush") prop.bush({ x, z }); else prop.tree({ x, z, kind, ry: rr() * 6 }); }
    if (o.mountains !== false && k !== "beach") for (let i = 0; i < 7; i++) { const x = -160 + i * 55 + rr() * 20, z = -150 - rr() * 60;
      if (k === "desert") prop.mesa({ x, z, w: 30 + rr() * 30, h: 10 + rr() * 16, col: rr() > 0.5 ? "#c8784a" : "#b86a40" }); else if (k !== "moon") prop.mountain({ x, z, r: 25 + rr() * 25, h: 18 + rr() * 22, col: k === "snow" ? "#9ab0c8" : "#7a8aa8" }); }
    if (o.hills) for (let i = 0; i < 5; i++) ball(20 + rr() * 15, gm, -60 + i * 30, -10, -60 - rr() * 30, { sy: 0.25, seg: 20 });
    if (o.road) { const r = new THREE.Mesh(new THREE.PlaneGeometry(o.road === true ? 5 : o.road, 600), mat(k === "desert" ? "dirt" : "asphalt")); r.rotation.x = -Math.PI / 2; r.position.y = 0.02; G.add(r); }
    if (k === "farm") { prop.fence({ x: -4, z: -6, len: 10 }); }
    meta.clouds = k !== "moon"; return { clouds: k !== "moon" };
  };
  /** skyline plaza: modern towers around an open square */
  set.city = (o = {}) => { const rr = R(o.seed ?? 8); ground("concrete:#bdb8ae", 400, 400, { tile: 6 });
    for (let i = 0; i < 22; i++) { const a = (i / 22) * Math.PI * 2 + rr() * 0.2, r = 22 + rr() * 30, x = Math.cos(a) * r, z = Math.sin(a) * r - 8; if (z > 6) continue;
      facade({ style: "modern", w: 7 + rr() * 6, x, z, ry: Math.atan2(-x, -z + 8), seed: i * 13, lit: o.lit, floors: 6 + Math.floor(rr() * 16), col: ["#5f8fb8", "#4a7a8a", "#6a7aa8", "#7a9ab0"][i % 4] }); }
    return { clouds: true };
  };
  /** abstract void stage for metaphors: round floor + curved backdrop (pair with K.backdrop(col)) */
  set.stage = (o = {}) => { const fc = o.floor ?? "#e8dcc8", bc = o.back ?? "#f2c14e";
    cyl(o.r ?? 14, o.r ?? 14, 0.2, fc, 0, -0.2, 0, { seg: 48, cast: false });
    const bg = new THREE.CylinderGeometry(o.r ?? 14, o.r ?? 14, 40, 48, 1, true, Math.PI * 0.5, Math.PI); bg.scale(-1, 1, 1); // faces inward, so depth/normal passes see it
    const bk = new THREE.Mesh(bg, new THREE.MeshToonMaterial({ color: bc, gradientMap: grad })); bk.position.y = 19; bk.receiveShadow = true; G.add(bk);
    meta.clouds = false; return { clouds: false };
  };
  /** the inside-the-head control room: porthole eyes on the back wall show the outside */
  set.mind = (o = {}) => { const r = set.room({ style: "mind", w: 9, d: 7, h: 4.2, door: false, ...o }), eye = o.eye ?? "#9ad8ff";
    for (const sx of [-1.9, 1.9]) { cyl(1.05, 1.05, 0.2, "metal:#c9a44a", sx, 2.4, -3.45, { rx: Math.PI / 2, seg: 32 }); const pane = new THREE.Mesh(new THREE.CircleGeometry(0.9, 32), glow(eye)); pane.position.set(sx, 2.5, -3.33); G.add(pane); }
    prop.desk({ x: 0, z: -1.6, w: 4.5, col: "metal:#4a5a62" }); const levers = []; for (let i = 0; i < 5; i++) { const lv = dyn(grp(-1.6 + i * 0.8, 0.8, -1.5, 0, 1)); levers.push(lv); cyl(0.03, 0.03, 0.45, "#c9c9c9", 0, 0, 0, { in: lv }); ball(0.08, ["#e2453c", "#ffd84a", "#4fd18b", "#3f8fe0", "#e2453c"][i], 0, 0.47, 0, { in: lv }); }
    prop.sign({ x: -3.3, z: -3.2, text: o.left ?? "PANIC", bg: "#e2453c", fg: "#fff", w: 1.6, h: 0.5, y: 3.4 }); prop.sign({ x: 3.3, z: -3.2, text: o.right ?? "PATIENCE", bg: "#4fd18b", fg: "#123", w: 1.8, h: 0.5, y: 3.4 });
    for (let i = 0; i < 3; i++) cyl(0.12, 0.12, 9, "metal:#8a8f96", 0, 3.7 - i * 0.3, -3.2 + i * 0.1, { rz: Math.PI / 2, seg: 10 });
    return { ...r, levers };
  };
  /** water + dock; a ship moored at x */
  set.harbor = (o = {}) => { ground("water", 600, 600, { tile: 10 }); prop.dock({ x: 0, z: 2, len: 14 }); const ship = prop.ship({ x: o.shipX ?? -6, z: -6, ry: 0.2, col: o.shipCol }); for (let i = 0; i < 4; i++) prop.crate({ x: (i % 2) * 0.9 - 0.4, z: 6 - i * 1.2, y: 0.8, label: o.crates?.[i] }); return { ship, clouds: true }; };

  return { G, meta, box, cyl, ball, cone, plate, ground, textTex, mat, lamp, grp, dyn, prop, set, facade, P, THREE, R };
}
