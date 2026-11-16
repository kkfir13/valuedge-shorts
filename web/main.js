// Engine: toon world + ink (depth/normal edges) + cartoon cards + DOF + grade. window.renderFrame(f) draws frame f.
import * as THREE from "three";
import * as P from "./paint.js";
import { drawActor, drawFx, CW, CH } from "./cast.js";
const Q = new URLSearchParams(location.search);
const SCALE = parseFloat(Q.get("s") || "1");
const BOARD = Q.get("board") ? await (await fetch(Q.get("board"))).json() : null;
window.BOARD = BOARD;
const S = BOARD ? await import("./board.js") : await import("./story.js");

const W = Math.round(1080 * SCALE / 2) * 2, H = Math.round(1920 * SCALE / 2) * 2;
const SU = 0.00225, CARD_W = 600 * SU, CARD_H = 1000 * SU;
const renderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true });
renderer.setSize(W, H); renderer.setPixelRatio(1);
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const world = new THREE.Group(), cards = new THREE.Group();
scene.add(world, cards);
const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 900);
scene.fog = new THREE.Fog(0xdfeaf5, 60, 320);

// ---------- toon materials ----------
const grad = (() => { const d = new Uint8Array([90, 170, 255]); const t = new THREE.DataTexture(d, 3, 1, THREE.RedFormat); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
const mats = new Map();
const toon = (key, map, color = 0xffffff) => {
  if (mats.has(key)) return mats.get(key);
  const m = new THREE.MeshToonMaterial({ map: map || null, color, gradientMap: grad });
  mats.set(key, m); return m;
};
const flat = (c) => toon("c" + c, null, c);

// ---------- world helpers ----------
const TILE = 2.0; // metres per texture repeat
/** box with constant texel density; x,y,z = centre of the bottom face */
function tbox(w, h, d, mat, x, y, z, ry = 0, parent = world, tile = TILE) {
  const g = new THREE.BoxGeometry(w, h, d);
  const uv = g.attributes.uv, dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  for (let f = 0; f < 6; f++) for (let i = 0; i < 4; i++) { const k = f * 4 + i; uv.setXY(k, uv.getX(k) * dims[f][0] / tile, uv.getY(k) * dims[f][1] / tile); }
  const m = new THREE.Mesh(g, mat); m.position.set(x, y + h / 2, z); m.rotation.y = ry;
  m.castShadow = m.receiveShadow = true; parent.add(m); return m;
}
/** a plane carrying a texture once (signs, windows), facing +z, centred at x,y,z */
function decal(w, h, map, x, y, z, ry = 0, parent = world, own = false) {
  const face = own ? new THREE.MeshToonMaterial({ map, gradientMap: grad }) : toon("d" + map.uuid, map);
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.06), [flat(0x888888), flat(0x888888), flat(0x888888), flat(0x888888), face, flat(0x888888)]);
  m.face = face;
  m.position.set(x, y, z); m.rotation.y = ry; m.receiveShadow = true; parent.add(m); return m;
}
function cyl(r0, r1, h, mat, x, y, z, seg = 12, parent = world) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r0, r1, h, seg), mat); m.position.set(x, y + h / 2, z);
  m.castShadow = m.receiveShadow = true; parent.add(m); return m;
}
function ball(r, mat, x, y, z, sy = 1, parent = world, seg = 14) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.max(8, seg - 4)), mat); m.position.set(x, y, z); m.scale.y = sy;
  m.castShadow = m.receiveShadow = true; parent.add(m); return m;
}
/** gable house: walls, prism gable, snowy roof planes */
function house(x, z, w, d, h, wall, roofMat, ry = 0, y = 0, opts = {}) {
  const G = new THREE.Group(); G.position.set(x, y, z); G.rotation.y = ry; world.add(G);
  tbox(w, h, d, wall, 0, 0, 0, 0, G);
  const rh = opts.rh ?? w * 0.32, sh = new THREE.Shape([new THREE.Vector2(-w / 2, 0), new THREE.Vector2(w / 2, 0), new THREE.Vector2(0, rh)]);
  const pr = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: d, bevelEnabled: false }), wall);
  const uv = pr.geometry.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) / TILE, uv.getY(i) / TILE);
  pr.position.set(0, h, -d / 2); pr.castShadow = pr.receiveShadow = true; G.add(pr);
  const L = Math.hypot(w / 2, rh) + 0.35, a = Math.atan2(rh, w / 2);
  for (const s of [-1, 1]) {
    const r = tbox(L, 0.22, d + 0.6, roofMat, 0, 0, 0, 0, G);
    r.position.set(s * (w / 4 + 0.05), h + rh / 2 + 0.05, 0); r.rotation.z = -s * a;
  }
  // windows + door on the front (+z)
  if (opts.door !== false) decal(0.95, 1.9, P.planks("#6b4a33"), opts.doorX ?? 0, 0.95 + (opts.doorY ?? 0), d / 2 + 0.03, 0, G);
  for (const wx of opts.windows ?? [-w * 0.3, w * 0.3]) { const m = decal(0.9, 0.9, P.windowTex(!!opts.lit), wx, h * 0.55, d / 2 + 0.03, 0, G, !!opts.own); if (opts.own) ronWins.push(m); }
  return G;
}
function pine(x, z, s = 1, y = 0) {
  cyl(0.18 * s, 0.22 * s, 1.0 * s, toon("bark", P.bark()), x, y, z, 6);
  for (let i = 0; i < 3; i++) {
    const r = (1.5 - i * 0.38) * s, hh = (1.9 - i * 0.3) * s;
    const c = new THREE.Mesh(new THREE.ConeGeometry(r, hh, 9), toon("pine", P.leaves("#2f6b4a")));
    c.position.set(x, y + (0.9 + i * 0.95) * s + hh / 2, z); c.castShadow = c.receiveShadow = true; world.add(c);
    const sc = new THREE.Mesh(new THREE.ConeGeometry(r * 0.55, hh * 0.42, 9), toon("snowc", P.snow()));
    sc.position.set(x, y + (0.9 + i * 0.95) * s + hh * 0.79, z); world.add(sc);
  }
}
/** deciduous tree; returns {g, leaves:[meshes]} for season/grow animation */
function oak(x, z, s = 1, y = 0, leafKey = "green") {
  const g = new THREE.Group(); g.position.set(x, y, z); world.add(g);
  const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.38, 3.2, 9), toon("bark", P.bark())); tr.position.y = 1.6; tr.castShadow = true; g.add(tr);
  const br = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, 1.6, 7), toon("bark", P.bark())); br.position.set(0.55, 2.9, 0); br.rotation.z = -0.7; g.add(br);
  const lv = [];
  for (const [lx, ly, lz, r] of [[0, 4.2, 0, 1.7], [1.2, 3.7, 0.2, 1.2], [-1.1, 3.6, -0.1, 1.25], [0.3, 5.2, -0.2, 1.15], [-0.4, 3.9, 0.9, 1.0]]) {
    const m = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), leafMats[leafKey]);
    m.position.set(lx, ly, lz); m.castShadow = m.receiveShadow = true; g.add(m); lv.push(m);
  }
  g.scale.setScalar(s); return { g, lv };
}

// ---------- the town ----------
export const LEAF = { green: "#5f9e3a", orange: "#e08a2c", snow: "#eef3f8", bare: "#7a5232" };
export const leafMats = Object.fromEntries(Object.entries(LEAF).map(([k, c]) => [k, toon("leaf" + k, P.leaves(c))]));
const ronWins = [];
const SNOW = toon("snow", P.snow()), GRASS = toon("grass", P.grass());
const ground = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), SNOW); ground.rotation.x = -Math.PI / 2;
ground.geometry.attributes.uv.array.forEach((v, i, a) => (a[i] = v * 900 / 6)); ground.receiveShadow = true; world.add(ground);
const roadM = new THREE.Mesh(new THREE.PlaneGeometry(140, 5), toon("road", P.road()));
roadM.rotation.x = -Math.PI / 2; roadM.position.set(0, 0.012, 1.5); roadM.geometry.attributes.uv.array.forEach((v, i, a) => (a[i] = i % 2 ? v : v * 28)); roadM.receiveShadow = true; world.add(roadM);

// gas station (x = 0)
const WHITE = toon("plasterW", P.plaster("#f1ede4")), RED = flat(0xd4473b);
tbox(6, 3.2, 4, WHITE, 0, 0, -8);
tbox(6.1, 0.5, 4.1, RED, 0, 3.2, -8);
decal(2.4, 0.8, P.sign("GAS", "#d4473b", "#ffffff", 768, 256), -1.2, 2.55, -5.96);
decal(1.0, 2.0, P.windowTex(false), 1.5, 1.0, -5.96);
tbox(7.5, 0.45, 5, RED, 0, 3.6, -2.6); tbox(7.6, 0.18, 5.1, WHITE, 0, 3.55, -2.6);
for (const px of [-3.2, 3.2]) tbox(0.3, 3.6, 0.3, WHITE, px, 0, -2.6);
for (const px of [-1.2, 1.4]) { tbox(0.65, 1.5, 0.45, RED, px, 0, -2.6); decal(0.42, 0.45, P.windowTex(true), px, 1.05, -2.36); tbox(0.9, 0.2, 0.6, WHITE, px, 0, -2.6); }
// car (body colour animated)
const CAR = new THREE.Group(); CAR.position.set(1.6, 0, -0.7); world.add(CAR);
const carPaint = new THREE.MeshToonMaterial({ color: 0x3f6fb5, gradientMap: grad });
tbox(3.8, 0.75, 1.7, carPaint, 0, 0.32, 0, 0, CAR); tbox(2.0, 0.62, 1.5, carPaint, -0.2, 1.07, 0, 0, CAR);
decal(1.7, 0.45, P.windowTex(false), -0.2, 1.38, 0.76, 0, CAR);
for (const [wx, wz] of [[-1.2, 0.8], [1.2, 0.8], [-1.2, -0.8], [1.2, -0.8]]) { const w = cyl(0.36, 0.36, 0.3, flat(0x2a2630), wx, 0.36, wz, 14, CAR); w.rotation.x = Math.PI / 2; w.position.y = 0.36; }

// department store (x = 16)
const BRICK = toon("brickR", P.brick("#b5533f"));
tbox(10, 5.2, 5, BRICK, 16, 0, -9);
decal(5.5, 0.9, P.sign("DEPT. STORE", "#2f5f6a", "#f4efe2"), 16, 3.55, -6.46);
tbox(10.4, 0.25, 1.4, flat(0x3f8a7a), 16, 2.75, -6.0);
for (const wx of [12.6, 19.4]) decal(2.6, 1.7, P.windowTex(true), wx, 1.35, -6.46);
decal(1.4, 2.3, P.windowTex(false), 16, 1.15, -6.46);

// Ronald's house (x = -14) with porch, chair, table, yard tree
const SIDING = toon("sidingB", P.siding("#9cb7c9")), PL = toon("plank", P.planks("#a4774f"));
house(-14, -10.2, 6, 5, 3.0, SIDING, SNOW, 0, 0, { windows: [-1.9, 1.9], doorX: 0, lit: false, own: true });
tbox(6.4, 0.5, 2.4, PL, -14, 0, -6.6);
tbox(1.6, 0.25, 0.5, PL, -14, 0, -5.15);
tbox(6.6, 0.2, 2.8, SNOW, -14, 3.0, -6.6);
for (const px of [-16.9, -11.1]) tbox(0.2, 2.5, 0.2, PL, px, 0.5, -5.6);
export const chair = new THREE.Group(); chair.position.set(-15.4, 0.5, -6.9); world.add(chair);
{ const CW_ = toon("plankD", P.planks("#7a4f2e"));
  tbox(0.9, 0.08, 0.7, CW_, 0, 0.42, 0, 0, chair); tbox(0.9, 0.9, 0.08, CW_, 0, 0.5, -0.34, 0, chair);
  for (const s of [-1, 1]) { tbox(0.06, 0.42, 0.06, CW_, s * 0.4, 0.04, 0.25, 0, chair); tbox(0.06, 0.42, 0.06, CW_, s * 0.4, 0.04, -0.3, 0, chair); const r = tbox(0.07, 0.07, 1.2, CW_, s * 0.4, 0, 0, 0, chair); r.position.y = 0.06; }
}
const TABLE = new THREE.Group(); TABLE.position.set(-12.4, 0.5, -6.9); world.add(TABLE);
tbox(1.3, 0.08, 0.8, toon("plankD", null), 0, 0.72, 0, 0, TABLE);
for (const [lx, lz] of [[-0.55, -0.32], [0.55, -0.32], [-0.55, 0.32], [0.55, 0.32]]) tbox(0.07, 0.72, 0.07, toon("plankD", null), lx, 0, lz, 0, TABLE);
const CRATES = BOARD?.crates ?? ["SOAP", "POWER", "RAILS"];
export const toys = [[CRATES[0], 0x5a8fc2], [CRATES[1], 0xd9a441], [CRATES[2], 0x8c3b4a]].map(([t, c], i) => {
  const g = new THREE.Group(); g.position.set(-0.42 + i * 0.42, 0.8, 0.05); TABLE.add(g);
  const bm = new THREE.MeshToonMaterial({ color: c, gradientMap: grad });
  tbox(0.3, 0.26 + i * 0.05, 0.26, bm, 0, 0, 0, 0, g, 0.6);
  tbox(0.12, 0.18, 0.12, bm, 0.08, 0.26 + i * 0.05, -0.04, 0, g, 0.6);
  decal(0.28, 0.09, P.sign(t, "#f4efe2", "#241726", 512, 160), 0, 0.15, 0.135, 0, g);
  return g;
});
export const yardTree = oak(-9.4, -6.5, 0.8);

// hill with hospital + library
const HILL = { x: -14, y: -8, z: -78, r: 62, sy: 0.2 };
export const hillY = (x, z) => { const d2 = HILL.r * HILL.r - (x - HILL.x) ** 2 - (z - HILL.z) ** 2; return d2 > 0 ? HILL.y + HILL.sy * Math.sqrt(d2) : 0; };
ball(HILL.r, SNOW, HILL.x, HILL.y, HILL.z, HILL.sy, world, 40);
const hy = hillY(-14, -52);
tbox(10, 7, 7, WHITE, -8, hy - 3, -52); tbox(10.3, 0.4, 7.3, flat(0x5a8fc2), -8, hy + 4, -52);
decal(5.8, 1.1, P.sign(BOARD?.buildings?.[0] ?? "HOSPITAL", "#ffffff", "#c0353a"), -8, hy + 3.2, -48.45);
export const hospWins = [];
for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) hospWins.push(decal(1.1, 1.1, P.windowTex(false), -11.6 + c * 2.4, hy + 0.2 + r * 1.6, -48.45, 0, world, true));
const STONE = toon("stone", P.plaster("#d9c49a"));
tbox(10, 6, 7, STONE, -20, hy - 3, -52);
{ const sh = new THREE.Shape([new THREE.Vector2(-5.4, 0), new THREE.Vector2(5.4, 0), new THREE.Vector2(0, 1.8)]);
  const pd = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.8, bevelEnabled: false }), STONE); pd.position.set(-20, hy + 3, -48.6); pd.castShadow = true; world.add(pd); }
tbox(11, 0.4, 2.2, STONE, -20, hy + 2.6, -48.0);
for (let c = 0; c < 5; c++) cyl(0.28, 0.32, 3.6, toon("plasterW", null), -24 + c * 2, hy - 1, -47.6, 12);
decal(4.6, 0.8, P.sign(BOARD?.buildings?.[1] ?? "LIBRARY", "#f4efe2", "#2f5f6a"), -20, hy + 3.3, -47.75);
export const libWins = [];
for (let c = 0; c < 4; c++) libWins.push(decal(1.0, 1.5, P.windowTex(false), -23 + c * 2, hy + 0.6, -48.45, 0, world, true));
tbox(1.6, 2.2, 0.1, toon("plankDoor", P.planks("#6b4a33")), -20, hy - 0.2, -48.45);

// background: town houses, pines, mountains
const SIDS = ["#e3b37a", "#c27a6a", "#a9c48f", "#e8d9b8", "#b8a4cf"];
[[30, -12], [38, -10], [-30, -11], [-38, -14], [8, -22], [24, -26], [-4, -26], [44, -24], [-44, -28], [30, -40]].forEach(([x, z], i) =>
  house(x, z, 5 + (i % 3), 4.5, 2.8 + (i % 2) * 0.6, toon("sid" + i, P.siding(SIDS[i % 5])), SNOW, (i % 3 - 1) * 0.15, 0, { lit: true, doorX: 0.8 }));
{ const R = P.rng(77);
  for (let i = 0; i < 140; i++) { const x = -150 + R() * 300, z = -12 - R() * 140; if (Math.abs(x + 14) < 12 && z > -60) continue; if (Math.abs(x - 16) < 8 && z > -16) continue; pine(x, z, 0.8 + R() * 0.9, hillY(x, z)); }
  for (let i = 0; i < 12; i++) { const x = -260 + i * 48 + R() * 20, z = -260 - R() * 60, r = 50 + R() * 40;
    const m = new THREE.Mesh(new THREE.ConeGeometry(r, r * 1.1, 10), toon("mtn", P.plaster("#8fa3c4"))); m.position.set(x, r * 0.55 - 6, z); world.add(m);
    const c = new THREE.Mesh(new THREE.ConeGeometry(r * 0.38, r * 0.42, 10), SNOW); c.position.set(x, r * 1.1 - 6 - r * 0.21 + 0.5, z); world.add(c); }
}

// vault room (x = 120)
const MET = toon("metal", P.metal("#9aa3ad"));
tbox(8, 0.1, 8, toon("vfloor", P.planks("#8a6a4a")), 120, 0, -1);
tbox(8, 4, 0.3, toon("boxwall", P.boxWall()), 120, 0, -5.0, 0, world, 4);
for (const s of [-1, 1]) tbox(0.3, 4, 8, MET, 120 + s * 4, 0, -1);
tbox(8, 0.3, 8, MET, 120, 4, -1);
tbox(1.8, 0.85, 1.0, toon("plankD", null), 120, 0, -0.7);
export const box = new THREE.Group(); box.position.set(120, 0.85, -0.6); world.add(box);
tbox(0.9, 0.32, 0.5, MET, 0, 0, 0, 0, box, 0.5);
export const lid = new THREE.Group(); lid.position.set(0, 0.32, -0.25); box.add(lid);
tbox(0.92, 0.06, 0.52, toon("metalL", P.metal("#b9c0c7")), 0, 0, 0.25, 0, lid, 0.5);
const vlamp = new THREE.PointLight(0xffd9a0, 0, 14, 1.4); vlamp.position.set(120, 3.4, 0.5); world.add(vlamp);

// meadow (x = -90): grass, oaks that grow
const meadow = new THREE.Mesh(new THREE.CircleGeometry(70, 40), GRASS); meadow.rotation.x = -Math.PI / 2; meadow.position.set(-90, 0.02, -10);
meadow.geometry.attributes.uv.array.forEach((v, i, a) => (a[i] = v * 25)); meadow.receiveShadow = true; world.add(meadow);
export const bigOak = oak(-90.2, -5.6, 1.0);
export const oaks = [[-94, -9, 0.9], [-86.5, -10, 0.85], [-97, -14, 1.0], [-83, -15, 1.0], [-91, -18, 1.1]].map(([x, z, s]) => ({ ...oak(x, z, s), s }));
{ const R = P.rng(5); for (let i = 0; i < 18; i++) { const a = R() * 6.28, r = 26 + R() * 30; const t = oak(-90 + Math.cos(a) * r, -10 - Math.abs(Math.sin(a)) * r, 1 + R() * 0.6); } }
const dirtM = new THREE.Mesh(new THREE.CircleGeometry(0.45, 16), toon("dirt", P.dirt())); dirtM.rotation.x = -Math.PI / 2; dirtM.position.set(-90.2, 0.04, -5.6); world.add(dirtM);

// ---------- lights ----------
const hemi = new THREE.HemisphereLight(0xcfe2ff, 0xb8c4d8, 1.0); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffffff, 2.0); sun.castShadow = true;
sun.shadow.mapSize.set(SCALE < 1 ? 1536 : 2048, SCALE < 1 ? 1536 : 2048); Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, near: 1, far: 160 });
sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.03; scene.add(sun, sun.target);

// ---------- cards ----------
const cardGeo = new THREE.PlaneGeometry(CARD_W, CARD_H); cardGeo.translate(0, (975 - 500) * SU, 0);
const cardPool = new Map();
function cardFor(id, w = CW, h = CH) {
  if (cardPool.has(id)) return cardPool.get(id);
  const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  const mat = new THREE.MeshBasicMaterial({ map: tex, alphaTest: 0.5, side: THREE.DoubleSide, fog: true });
  const mesh = new THREE.Mesh(id.startsWith("fx") ? new THREE.PlaneGeometry(1, 1) : cardGeo, mat);
  const c = { cv, g: cv.getContext("2d"), tex, mat, mesh, key: "" }; cards.add(mesh); cardPool.set(id, c); return c;
}
const blobTex = (() => { const cv = document.createElement("canvas"); cv.width = cv.height = 128; drawFx(cv.getContext("2d"), "blob", 0, 128, 128); const t = new THREE.CanvasTexture(cv); return t; })();
const blobs = [];
function blobAt(i) {
  if (!blobs[i]) { const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: blobTex, transparent: true, depthWrite: false })); m.rotation.x = -Math.PI / 2; cards.add(m); blobs[i] = m; }
  return blobs[i];
}
const clouds = [];
{ const R = P.rng(31); for (let i = 0; i < 9; i++) { const m = new THREE.Mesh(new THREE.PlaneGeometry(90, 45), new THREE.MeshBasicMaterial({ map: P.cloud(), transparent: true, depthWrite: false, fog: false }));
  m.position.set(-300 + i * 75 + R() * 30, 70 + R() * 50, -330 - R() * 40); cards.add(m); clouds.push(m); } }

// ---------- passes ----------
const mkRT = (samples, depth) => { const rt = new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType, samples });
  if (depth) { rt.depthTexture = new THREE.DepthTexture(W, H); rt.depthTexture.type = THREE.UnsignedIntType; } return rt; };
const rtCol = mkRT(4, false), rtNrm = mkRT(0, true), rtCard = mkRT(4, true), rtComp = mkRT(0, false);
const normalMat = new THREE.MeshNormalMaterial();
const depthOnly = new THREE.MeshBasicMaterial({ colorWrite: false });
const fsq = (frag, uniforms) => { const m = new THREE.ShaderMaterial({ uniforms, vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.,1.); }", fragmentShader: frag, depthTest: false, depthWrite: false });
  const s = new THREE.Scene(); s.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), m)); return { m, s }; };
const ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const COMMON = `
uniform float near, far; uniform vec2 res;
float lin(float d){ float z = d * 2.0 - 1.0; return 2.0 * near * far / (far + near - z * (far - near)); }`;
const inkP = fsq(`
varying vec2 vUv; uniform sampler2D tCol, tNrm, tD, tCard; uniform vec3 ink, skyTop, skyHor; uniform float inkW;
${COMMON}
void main(){
  vec3 col = texture2D(tCol, vUv).rgb; float d0 = texture2D(tD, vUv).r;
  if (d0 >= 0.99999) { float t = smoothstep(0.25, 1.0, vUv.y); col = mix(skyHor, skyTop, t); }
  else {
    float l0 = lin(d0); vec3 n0 = texture2D(tNrm, vUv).rgb * 2.0 - 1.0; float e = 0.0;
    vec2 px = inkW / res;
    for (int i = 0; i < 8; i++) {
      float a = float(i) * 0.785398; vec2 o = vec2(cos(a), sin(a)) * px;
      float dn = texture2D(tD, vUv + o).r; float ln = dn >= 0.99999 ? far : lin(dn);
      if (ln - l0 > 0.035 * l0 + 0.04) e = 1.0;
      vec3 nn = texture2D(tNrm, vUv + o).rgb * 2.0 - 1.0;
      if (abs(ln - l0) < 0.08 * l0 && dot(n0, nn) < 0.72) e = max(e, 0.85);
    }
    float fade = 1.0 - smoothstep(140.0, 520.0, l0);
    col = mix(col, ink, e * fade);
  }
  vec4 c = texture2D(tCard, vUv);
  col = col * (1.0 - c.a) + c.rgb;
  gl_FragColor = vec4(col, 1.0);
}`, { tCol: { value: rtCol.texture }, tNrm: { value: rtNrm.texture }, tD: { value: rtNrm.depthTexture }, tCard: { value: rtCard.texture },
  ink: { value: new THREE.Color(0x241726).convertSRGBToLinear() }, skyTop: { value: new THREE.Color() }, skyHor: { value: new THREE.Color() }, inkW: { value: 2.5 * SCALE },
  near: { value: 0.1 }, far: { value: 900 }, res: { value: new THREE.Vector2(W, H) } });
const finP = fsq(`
varying vec2 vUv; uniform sampler2D tC, tD; uniform float focus, coc, sat, flash, vign, time, snowAmt, fadeK; uniform vec3 tint, lift, flashCol;
${COMMON}
float h1(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void main(){
  float d = texture2D(tD, vUv).r; float l = d >= 0.99999 ? far : lin(d);
  float c0 = clamp(abs(l - focus) / max(l, 0.01) * coc, 0.0, 14.0);
  vec3 acc = texture2D(tC, vUv).rgb; float wsum = 1.0;
  if (c0 > 0.6) {
    for (int i = 1; i < 32; i++) {
      float r = sqrt(float(i) / 32.0) * c0; float a = float(i) * 2.39996;
      vec2 o = vec2(cos(a), sin(a)) * r / res; float ds = texture2D(tD, vUv + o).r; float ls = ds >= 0.99999 ? far : lin(ds);
      float cs = clamp(abs(ls - focus) / max(ls, 0.01) * coc, 0.0, 14.0);
      float w = (ls < l - 0.3) ? smoothstep(r - 1.0, r + 1.0, cs) : 1.0;
      acc += texture2D(tC, vUv + o).rgb * w; wsum += w;
    }
  }
  vec3 col = acc / wsum;
  // snow (screen-space, 3 depth layers)
  if (snowAmt > 0.0) for (int k = 0; k < 3; k++) {
    float sc = 14.0 + float(k) * 10.0; vec2 p = vUv * vec2(sc * 0.5625, sc);
    p.y += time * (0.9 - float(k) * 0.2); p.x += sin(time * 0.7 + float(k)) * 0.3;
    vec2 cell = floor(p), f = fract(p); float r = h1(cell + float(k) * 7.0);
    vec2 c = vec2(0.2 + 0.6 * h1(cell + 3.1), 0.2 + 0.6 * r);
    float s = smoothstep(0.09 - float(k) * 0.02, 0.0, length(f - c)) * step(0.45, r);
    col = mix(col, vec3(1.0), s * snowAmt * (0.95 - float(k) * 0.2));
  }
  float Y = dot(col, vec3(0.2126, 0.7152, 0.0722)); col = mix(vec3(Y), col, sat);
  col = col * tint + lift;
  vec2 q = vUv - 0.5; col *= 1.0 - vign * smoothstep(0.35, 0.85, length(q * vec2(1.0, 0.75)));
  col = mix(col, flashCol, flash); col *= fadeK;
  gl_FragColor = linearToOutputTexel(vec4(col, 1.0));
}`, { tC: { value: rtComp.texture }, tD: { value: rtCard.depthTexture }, focus: { value: 5 }, coc: { value: 8 }, sat: { value: 1.1 }, flash: { value: 0 }, vign: { value: 0.25 },
  time: { value: 0 }, snowAmt: { value: 0 }, fadeK: { value: 1 }, tint: { value: new THREE.Vector3(1, 1, 1) }, lift: { value: new THREE.Vector3() }, flashCol: { value: new THREE.Vector3(1, 1, 1) },
  near: { value: 0.1 }, far: { value: 900 }, res: { value: new THREE.Vector2(W, H) } });

// ---------- per-frame ----------
const tmpV = new THREE.Vector3();
function applyLight(L, target) {
  hemi.color.set(L.hemiSky); hemi.groundColor.set(L.hemiGround); hemi.intensity = L.hemi;
  sun.color.set(L.sun); sun.intensity = L.sunI;
  const az = L.az * Math.PI / 180, el = L.el * Math.PI / 180;
  sun.position.set(target.x + Math.cos(el) * Math.sin(az) * 60, target.y + Math.sin(el) * 60, target.z + Math.cos(el) * Math.cos(az) * 60);
  sun.target.position.copy(target); sun.target.updateMatrixWorld();
  scene.fog.color.set(L.fog); scene.fog.near = L.fogNear; scene.fog.far = L.fogFar;
  inkP.m.uniforms.skyTop.value.set(L.skyTop); inkP.m.uniforms.skyHor.value.set(L.skyHor);
  const U = finP.m.uniforms; U.sat.value = L.sat; U.tint.value.set(...L.tint); U.lift.value.set(...L.lift); U.vign.value = L.vign;
}

let st = null;
function placeActors(list, cam) {
  const used = new Set(); let bi = 0;
  for (const a of list) {
    const c = cardFor(a.id); used.add(a.id);
    const key = JSON.stringify([a.o, a.expr, a.mode, a.prop, a.wave, a.tilt, a.headTilt, a.blink, a.look, a.facing, a.phase, a.seed].map((v) => typeof v === "number" ? Math.round(v * 100) / 100 : v));
    if (key !== c.key) { drawActor(c.g, a); c.tex.needsUpdate = true; c.key = key; }
    const s = a.scale ?? 1; c.mesh.visible = true; c.mesh.position.set(a.x, a.y ?? 0, a.z); c.mesh.scale.set(s * (a.sx ?? 1), s * (a.sy ?? 1), 1);
    c.mesh.rotation.set(0, Math.atan2(cam.position.x - a.x, cam.position.z - a.z), a.roll ?? 0);
    c.mat.color.set(st.cardTint);
    if (a.blob !== false) { const b = blobAt(bi++); b.visible = true; b.position.set(a.x, (a.y ?? 0) + 0.02, a.z); b.scale.set(1.1 * s, 0.6 * s, 1); }
  }
  for (let i = bi; i < blobs.length; i++) blobs[i].visible = false;
  return used;
}
function placeFx(list, cam, used) {
  list.forEach((e, i) => {
    const id = "fx_" + e.kind + "_" + i, w = e.cw ?? 256, h = e.ch ?? 256;
    const c = cardFor(id, w, h); used.add(id);
    const key = e.kind + Math.round((e.t ?? 0) * 20);
    if (c.key !== key) { drawFx(c.g, e.kind, e.t ?? 0, w, h); c.tex.needsUpdate = true; c.key = key; }
    c.mesh.visible = true; c.mesh.position.set(e.x, e.y, e.z); c.mesh.scale.set(e.w, e.h, 1);
    if (e.flat) c.mesh.rotation.set(-Math.PI / 2, 0, e.rot ?? 0);
    else c.mesh.rotation.set(0, Math.atan2(cam.position.x - e.x, cam.position.z - e.z), e.rot ?? 0);
    c.mat.color.set(e.tint ?? st.cardTint);
  });
}

window.renderFrame = (f) => {
  st = S.frameState(f, { chair, toys, yardTree, hospWins, libWins, ronWins, box, lid, bigOak, oaks, CAR, carPaint, vlamp, hillY, dirtM, leafMats, P });
  const cm = st.cam;
  camera.position.set(...cm.p); camera.fov = cm.fov; camera.up.set(Math.sin(cm.roll || 0), Math.cos(cm.roll || 0), 0);
  camera.lookAt(tmpV.set(...cm.t)); camera.updateProjectionMatrix();
  if (cm.roll) camera.rotateZ(cm.roll);
  applyLight(st.light, new THREE.Vector3(...cm.t));
  for (const c of cardPool.values()) c.mesh.visible = false;
  const used = placeActors(st.actors, camera); placeFx(st.fx, camera, used);
  for (const c of clouds) c.lookAt(camera.position);

  // 1 colour (world only)
  cards.visible = false; world.visible = true;
  renderer.setRenderTarget(rtCol); renderer.setClearColor(0x000000, 1); renderer.clear(); renderer.render(scene, camera);
  // 2 normals + depth (world only)
  const sm = renderer.shadowMap.enabled; renderer.shadowMap.enabled = false; scene.overrideMaterial = normalMat; const fog = scene.fog; scene.fog = null;
  renderer.setRenderTarget(rtNrm); renderer.setClearColor(0x8080ff, 1); renderer.clear(); renderer.render(scene, camera);
  // 3 cards over a world depth prepass
  scene.overrideMaterial = depthOnly; renderer.setRenderTarget(rtCard); renderer.setClearColor(0x000000, 0); renderer.clear(); renderer.render(scene, camera);
  scene.overrideMaterial = null; scene.fog = fog; world.visible = false; cards.visible = true;
  renderer.autoClear = false; renderer.render(scene, camera); renderer.autoClear = true;
  world.visible = true; renderer.shadowMap.enabled = sm;
  // 4 ink + composite
  inkP.m.uniforms.near.value = finP.m.uniforms.near.value = camera.near; inkP.m.uniforms.far.value = finP.m.uniforms.far.value = camera.far;
  renderer.setRenderTarget(rtComp); renderer.render(inkP.s, ortho);
  // 5 DOF + grade
  const U = finP.m.uniforms; U.focus.value = st.focus; U.coc.value = st.coc * SCALE; U.flash.value = st.flash; U.time.value = f / 30; U.snowAmt.value = st.snow; U.fadeK.value = st.fade ?? 1;
  U.flashCol.value.set(...(st.flashCol || [1, 1, 1]));
  renderer.setRenderTarget(null); renderer.render(finP.s, ortho);
  return true;
};
window.ready = true;
