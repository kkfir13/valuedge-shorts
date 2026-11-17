// Legacy: the fixed ValuEdge town (gas station, store, porch, hill, vault, meadow, city, exchange, harbor, office).
import { THREE, P, world, grad, toon, flat, tbox, decal, cyl, ball, house, pine, oak, leafMats } from "./core.js";
export function buildLegacy(BOARD) {
// ---------- the town ----------
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
house(-14, -10.2, 6, 5, 3.0, SIDING, SNOW, 0, 0, { windows: [-1.9, 1.9], doorX: 0, lit: false, own: true, collect: ronWins });
tbox(6.4, 0.5, 2.4, PL, -14, 0, -6.6);
tbox(1.6, 0.25, 0.5, PL, -14, 0, -5.15);
tbox(6.6, 0.2, 2.8, SNOW, -14, 3.0, -6.6);
for (const px of [-16.9, -11.1]) tbox(0.2, 2.5, 0.2, PL, px, 0.5, -5.6);
const chair = new THREE.Group(); chair.position.set(-15.4, 0.5, -6.9); world.add(chair);
{ const CW_ = toon("plankD", P.planks("#7a4f2e"));
  tbox(0.9, 0.08, 0.7, CW_, 0, 0.42, 0, 0, chair); tbox(0.9, 0.9, 0.08, CW_, 0, 0.5, -0.34, 0, chair);
  for (const s of [-1, 1]) { tbox(0.06, 0.42, 0.06, CW_, s * 0.4, 0.04, 0.25, 0, chair); tbox(0.06, 0.42, 0.06, CW_, s * 0.4, 0.04, -0.3, 0, chair); const r = tbox(0.07, 0.07, 1.2, CW_, s * 0.4, 0, 0, 0, chair); r.position.y = 0.06; }
}
const TABLE = new THREE.Group(); TABLE.position.set(-12.4, 0.5, -6.9); world.add(TABLE);
tbox(1.3, 0.08, 0.8, toon("plankD", null), 0, 0.72, 0, 0, TABLE);
for (const [lx, lz] of [[-0.55, -0.32], [0.55, -0.32], [-0.55, 0.32], [0.55, 0.32]]) tbox(0.07, 0.72, 0.07, toon("plankD", null), lx, 0, lz, 0, TABLE);
const CRATES = BOARD?.crates ?? ["SOAP", "POWER", "RAILS"];
const toys = [[CRATES[0], 0x5a8fc2], [CRATES[1], 0xd9a441], [CRATES[2], 0x8c3b4a]].map(([t, c], i) => {
  const g = new THREE.Group(); g.position.set(-0.42 + i * 0.42, 0.8, 0.05); TABLE.add(g);
  const bm = new THREE.MeshToonMaterial({ color: c, gradientMap: grad });
  tbox(0.3, 0.26 + i * 0.05, 0.26, bm, 0, 0, 0, 0, g, 0.6);
  tbox(0.12, 0.18, 0.12, bm, 0.08, 0.26 + i * 0.05, -0.04, 0, g, 0.6);
  decal(0.28, 0.09, P.sign(t, "#f4efe2", "#241726", 512, 160), 0, 0.15, 0.135, 0, g);
  return g;
});
const yardTree = oak(-9.4, -6.5, 0.8);

// hill with hospital + library
const HILL = { x: -14, y: -8, z: -78, r: 62, sy: 0.2 };
const hillY = (x, z) => { const d2 = HILL.r * HILL.r - (x - HILL.x) ** 2 - (z - HILL.z) ** 2; return d2 > 0 ? HILL.y + HILL.sy * Math.sqrt(d2) : 0; };
ball(HILL.r, SNOW, HILL.x, HILL.y, HILL.z, HILL.sy, world, 40);
const hy = hillY(-14, -52);
tbox(10, 7, 7, WHITE, -8, hy - 3, -52); tbox(10.3, 0.4, 7.3, flat(0x5a8fc2), -8, hy + 4, -52);
decal(5.8, 1.1, P.sign(BOARD?.buildings?.[0] ?? "HOSPITAL", "#ffffff", "#c0353a"), -8, hy + 3.2, -48.45);
const hospWins = [];
for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) hospWins.push(decal(1.1, 1.1, P.windowTex(false), -11.6 + c * 2.4, hy + 0.2 + r * 1.6, -48.45, 0, world, true));
const STONE = toon("stone", P.plaster("#d9c49a"));
tbox(10, 6, 7, STONE, -20, hy - 3, -52);
{ const sh = new THREE.Shape([new THREE.Vector2(-5.4, 0), new THREE.Vector2(5.4, 0), new THREE.Vector2(0, 1.8)]);
  const pd = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.8, bevelEnabled: false }), STONE); pd.position.set(-20, hy + 3, -48.6); pd.castShadow = true; world.add(pd); }
tbox(11, 0.4, 2.2, STONE, -20, hy + 2.6, -48.0);
for (let c = 0; c < 5; c++) cyl(0.28, 0.32, 3.6, toon("plasterW", null), -24 + c * 2, hy - 1, -47.6, 12);
decal(4.6, 0.8, P.sign(BOARD?.buildings?.[1] ?? "LIBRARY", "#f4efe2", "#2f5f6a"), -20, hy + 3.3, -47.75);
const libWins = [];
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
const box = new THREE.Group(); box.position.set(120, 0.85, -0.6); world.add(box);
tbox(0.9, 0.32, 0.5, MET, 0, 0, 0, 0, box, 0.5);
const lid = new THREE.Group(); lid.position.set(0, 0.32, -0.25); box.add(lid);
tbox(0.92, 0.06, 0.52, toon("metalL", P.metal("#b9c0c7")), 0, 0, 0.25, 0, lid, 0.5);
const vlamp = new THREE.PointLight(0xffd9a0, 0, 14, 1.4); vlamp.position.set(120, 3.4, 0.5); world.add(vlamp);

// meadow (x = -90): grass, oaks that grow
const meadow = new THREE.Mesh(new THREE.CircleGeometry(70, 40), GRASS); meadow.rotation.x = -Math.PI / 2; meadow.position.set(-90, 0.02, -10);
meadow.geometry.attributes.uv.array.forEach((v, i, a) => (a[i] = v * 25)); meadow.receiveShadow = true; world.add(meadow);
const bigOak = oak(-90.2, -5.6, 1.0);
const oaks = [[-94, -9, 0.9], [-86.5, -10, 0.85], [-97, -14, 1.0], [-83, -15, 1.0], [-91, -18, 1.1]].map(([x, z, s]) => ({ ...oak(x, z, s), s }));
{ const R = P.rng(5); for (let i = 0; i < 18; i++) { const a = R() * 6.28, r = 26 + R() * 30; const t = oak(-90 + Math.cos(a) * r, -10 - Math.abs(Math.sin(a)) * r, 1 + R() * 0.6); } }
const dirtM = new THREE.Mesh(new THREE.CircleGeometry(0.45, 16), toon("dirt", P.dirt())); dirtM.rotation.x = -Math.PI / 2; dirtM.position.set(-90.2, 0.04, -5.6); world.add(dirtM);


// ================= extra sets =================
const BWORDS = BOARD?.sets || {};
const plane = (w, d, mat, x, y, z, rep) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z);
  m.geometry.attributes.uv.array.forEach((v, i, a) => (a[i] = v * (i % 2 ? d : w) / (rep || 4))); m.receiveShadow = true; world.add(m); return m; };
const INKC = flat(0x241726), GOLD = flat(0xd9a441), DARK = flat(0x2e2a36);
/** lamp post */
function lamp(x, z) { cyl(0.07, 0.09, 3.4, DARK, x, 0, z, 8); tbox(0.34, 0.42, 0.34, toon("lampG", P.windowTex(true)), x, 3.3, z); tbox(0.46, 0.08, 0.46, DARK, x, 3.72, z); }
/** brick rowhouse with stoop, cornice, windows; front face at z + d/2 */
function rowhouse(x, z, w, h, col, door = true, lit = false) {
  const d = 6, M = toon("row" + col, P.rowhouse(col)); tbox(w, h, d, M, x, 0, z);
  tbox(w + 0.3, 0.35, d + 0.3, flat(0xe8e0cc), x, h, z); tbox(w + 0.5, 0.2, d + 0.5, flat(0x5a4a40), x, h + 0.35, z);
  const fz = z + d / 2 + 0.03;
  for (let r = 0; r < Math.max(1, Math.floor((h - 1.2) / 2.1)); r++) for (const wx of [-w * 0.3, w * 0.3]) {
    if (door && r === 0 && wx < 0) continue;
    decal(0.9, 1.3, P.windowTex(lit && (r + wx > 0)), x + wx, 1.3 + r * 2.1, fz); tbox(1.1, 0.1, 0.12, flat(0xe8e0cc), x + wx, 0.6 + r * 2.1, fz + 0.04);
  }
  if (door) { decal(1.0, 2.1, P.planks("#3f2e28"), x - w * 0.3, 1.25, fz); for (let k = 0; k < 3; k++) tbox(1.5, 0.18, 0.45 - k * 0.12, flat(0xb8aea0), x - w * 0.3, k * 0.18, fz + 0.4 - k * 0.12); }
}
// ---- CITY (x = 220): cobbled street, rowhouses, a marble bank ----
plane(160, 70, toon("cobble", P.cobble()), 220, 0.015, -12, 3);
tbox(160, 0.16, 2.6, flat(0xb8aea0), 220, 0, -5.1);
{ const cols = ["#b5533f", "#8c5a46", "#a8743f", "#7a4a3a", "#c0806a", "#96604c"]; let x = 196;
  for (let i = 0; x < 246; i++) { const w = 4.6 + (i % 3) * 0.7, h = 6.5 + ((i * 5) % 4) * 1.4; if (Math.abs(x + w / 2 - 220) > 5.5) rowhouse(x + w / 2, -9.6, w, h, cols[i % cols.length], true, i % 2 === 0); x += w + (Math.abs(x + w - 214) < 3 ? 12 : 0); }
  for (let i = 0; i < 14; i++) { const x2 = 186 + i * 5.4; tbox(5.2, 10 + (i % 4) * 2.5, 6, toon("rowb" + i, P.rowhouse(cols[(i + 2) % 6])), x2, 0, -22 - (i % 2) * 3); }
  for (const lx of [210, 216, 224, 230]) lamp(lx, -4.4);
}
// bank: steps, columns, pediment, doors
const BANK_X = 220, BANK_Z = -10.6;
{ const MB = toon("marble", P.marble());
  tbox(11, 7.6, 7, MB, BANK_X, 0, BANK_Z); for (let k = 0; k < 4; k++) tbox(11.4 - k * 0.3, 0.22, 1.2 - k * 0.0, MB, BANK_X, k * 0.22, BANK_Z + 4.0 - k * 0.32);
  for (let c = 0; c < 6; c++) cyl(0.3, 0.34, 5.6, MB, BANK_X - 4.5 + c * 1.8, 0.88, BANK_Z + 3.95, 14);
  tbox(11.6, 0.6, 1.4, MB, BANK_X, 6.48, BANK_Z + 3.95);
  const sh = new THREE.Shape([new THREE.Vector2(-5.9, 0), new THREE.Vector2(5.9, 0), new THREE.Vector2(0, 1.9)]);
  const pd = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 1.2, bevelEnabled: false }), MB); pd.position.set(BANK_X, 7.08, BANK_Z + 3.3); pd.castShadow = true; world.add(pd);
  decal(5.4, 0.85, P.sign(BWORDS.bank || "BANK", "#f4efe2", "#241726"), BANK_X, 6.48, BANK_Z + 4.67);
  for (const wx of [-3.6, 3.6]) decal(1.2, 2.2, P.windowTex(true), BANK_X + wx, 2.6, BANK_Z + 3.53);
}
const bankDoors = [-1, 1].map((s) => { const g = new THREE.Group(); g.position.set(BANK_X + s * 1.1, 0.88, BANK_Z + 3.53); world.add(g);
  tbox(1.1, 3.0, 0.12, toon("bdoor", P.planks("#5a3b2a")), -s * 0.55, 0, 0, 0, g); tbox(0.12, 0.12, 0.2, GOLD, -s * 0.95, 1.4, 0.1, 0, g); return g; });
tbox(2.4, 3.1, 0.1, flat(0x1d1b22), BANK_X, 0.88, BANK_Z + 3.47);

// ---- EXCHANGE HALL (x = 320): panelled hall, live chalk price board, ticker machine ----
const EX = 320;
{ const WALL = toon("wallp", P.wallpaper("#3f5a6a")), WOOD = toon("panel", P.planks("#6b4a33"));
  plane(18, 16, toon("floor", P.floorboards()), EX, 0.02, -2, 3);
  tbox(18, 7, 0.3, WALL, EX, 0, -7.2, 0, world, 3); tbox(18, 1.1, 0.34, WOOD, EX, 0, -7.0);
  for (const s of [-1, 1]) { tbox(0.3, 7, 16, WALL, EX + s * 9, 0, -2, 0, world, 3); tbox(0.34, 1.1, 16, WOOD, EX + s * 8.85, 0, -2);
    for (const wz of [-4.5, 0.5]) decal(1.6, 3.2, P.windowTex(true), EX + s * 8.82, 3.4, wz, -s * Math.PI / 2); }
  tbox(18, 0.3, 16, toon("ceil", P.plaster("#e9e2d4")), EX, 7, -2);
  for (const cx of [-5, 5]) cyl(0.32, 0.36, 7, toon("marble", P.marble()), EX + cx, 0, -5.4, 14);
  tbox(14, 0.2, 0.6, WOOD, EX, 1.0, -4.6); for (let k = 0; k < 8; k++) tbox(0.08, 1.0, 0.08, WOOD, EX - 6.8 + k * 1.95, 0, -4.6);
}
const chartCv = document.createElement("canvas"); chartCv.width = 1024; chartCv.height = 640;
const chartTex = new THREE.CanvasTexture(chartCv); chartTex.colorSpace = THREE.SRGBColorSpace;
{ const m = new THREE.Mesh(new THREE.PlaneGeometry(7.2, 4.5), new THREE.MeshBasicMaterial({ map: chartTex })); m.position.set(EX, 3.75, -7.0); world.add(m);
  tbox(7.6, 0.25, 0.3, toon("panel", null), EX, 1.4, -6.95); }
const ticker = new THREE.Group(); ticker.position.set(EX + 3.2, 0, -3.0); world.add(ticker);
{ cyl(0.08, 0.3, 1.0, toon("brass", P.metal("#c9a24a")), 0, 0, 0, 10, ticker); tbox(0.6, 0.35, 0.45, toon("brass", null), 0, 1.0, 0, 0, ticker);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(0.3, 14, 10, 0, 6.29, 0, 1.6), new THREE.MeshToonMaterial({ color: 0xcfe4ee, gradientMap: grad, transparent: true, opacity: 0.55 }));
  dome.position.y = 1.35; ticker.add(dome); }
const hallLamp = new THREE.PointLight(0xffe2b0, 0, 22, 1.2); hallLamp.position.set(EX, 6.0, -2); world.add(hallLamp);

// ---- HARBOR (x = 420): sea, wooden pier, sailing ship ----
const HB = 420;
const sea = plane(170, 300, toon("water", P.water()), HB, 0.008, -152.9, 6);
plane(26, 7, toon("pier", P.floorboards("#8a6a4a")), HB, 0.6, 0.5, 3);
tbox(26, 0.6, 7, toon("pierS", P.planks("#6b4a33")), HB, 0, 0.5);
for (let k = 0; k < 9; k++) { cyl(0.18, 0.18, 1.6, toon("bark", P.bark()), HB - 12 + k * 3, -0.8, -2.95, 8); cyl(0.14, 0.18, 0.5, DARK, HB - 12 + k * 3, 0.6, -2.7, 8); }
for (const [bx, bz, s] of [[HB - 5.2, 1.6, 0.9], [HB - 4.3, 1.9, 0.7], [HB + 5.5, 1.2, 0.8]]) tbox(s, s, s, toon("crate", P.planks("#a4774f")), bx, 0.6, bz);
for (const [bx, bz] of [[HB + 4.4, 2.0], [HB + 4.9, 2.6]]) cyl(0.32, 0.32, 0.9, toon("barrel", P.planks("#7a4f2e")), bx, 0.6, bz, 12);
{ const R2 = P.rng(9); for (let i = 0; i < 7; i++) ball(30 + R2() * 25, toon("headland", P.grass()), HB - 160 + i * 55, -14, -230 - R2() * 40, 0.45, world, 18); }
const ship = new THREE.Group(); ship.position.set(HB, 0, -16); world.add(ship);
{ const hull = new THREE.Shape([new THREE.Vector2(-6, 1.4), new THREE.Vector2(6.8, 1.6), new THREE.Vector2(5.4, -0.6), new THREE.Vector2(-5, -0.6)]);
  const hm = new THREE.Mesh(new THREE.ExtrudeGeometry(hull, { depth: 3, bevelEnabled: false }), [toon("hullC", null, 0x5a3b2a), toon("hull", P.planks("#6b4a33"))]);
  hm.position.set(0, 0, -1.5); hm.castShadow = true; ship.add(hm);
  tbox(12, 0.12, 3.0, toon("hullC", null, 0x5a3b2a), 0.3, 1.45, 0, 0, ship); tbox(12.6, 0.3, 0.2, flat(0xd9a441), 0.3, 1.1, 1.55, 0, ship);
  const SAIL = toon("sail", P.sailcloth());
  for (const [mx, mh] of [[-2.6, 8.5], [2.2, 9.5]]) { cyl(0.13, 0.16, mh, toon("mast", P.bark()), mx, 1.5, 0, 8, ship);
    for (const [sy, sw, shh] of [[3.4, 4.4, 2.6], [6.4, 3.6, 2.2]]) { const sm = new THREE.Mesh(new THREE.BoxGeometry(sw, shh, 0.08), SAIL); sm.position.set(mx, sy + 1.5, 0.15); sm.castShadow = true; ship.add(sm); }
    const fl = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.5, 0.04), flat(0xc0353a)); fl.position.set(mx + 0.5, mh + 1.4, 0); ship.add(fl); }
}

// ---- OFFICE (x = 520): desk, lamp, ledger, wall calendar, coin stacks ----
const OF = 520;
{ const WALL = toon("wallpO", P.wallpaper("#6a4a3a"));
  plane(12, 10, toon("floorO", P.floorboards("#7a5232")), OF, 0.02, -2, 3);
  tbox(12, 5, 0.3, WALL, OF, 0, -5.5, 0, world, 3); for (const s of [-1, 1]) tbox(0.3, 5, 10, WALL, OF + s * 6, 0, -2, 0, world, 3);
  tbox(12, 0.3, 10, toon("ceil", null), OF, 5, -2);
  decal(2.2, 2.0, P.windowTex(true), OF - 3.2, 2.6, -5.32);
  tbox(2.6, 0.12, 1.2, toon("desk", P.planks("#5a3b2a")), OF, 0.92, -2.2); tbox(2.5, 0.92, 1.1, toon("desk", null), OF, 0, -2.2);
  tbox(0.9, 0.06, 0.6, flat(0xf1ece0), OF - 0.5, 1.04, -2.1); tbox(0.06, 0.07, 0.6, flat(0x8c3b4a), OF - 0.5, 1.04, -2.1);
  cyl(0.12, 0.14, 0.04, DARK, OF + 0.8, 1.04, -2.45, 10); cyl(0.025, 0.025, 0.5, DARK, OF + 0.8, 1.06, -2.45, 6);
  const shade = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.2, 12, 1, true), flat(0x3f8a5a)); shade.position.set(OF + 0.8, 1.6, -2.45); world.add(shade);
  tbox(1.4, 2.2, 0.4, toon("shelf", P.planks("#6b4a33")), OF + 3.6, 0, -5.1);
}
const calCv = document.createElement("canvas"); calCv.width = 512; calCv.height = 600;
const calTex = new THREE.CanvasTexture(calCv); calTex.colorSpace = THREE.SRGBColorSpace;
{ const m = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.76), new THREE.MeshBasicMaterial({ map: calTex })); m.position.set(OF + 1.4, 3.0, -5.32); world.add(m); }
const stacks = [0, 1, 2, 3].map((i) => { const g = new THREE.Group(); g.position.set(OF - 0.1 + i * 0.32, 1.04, -1.85); world.add(g);
  for (let k = 0; k < 16; k++) { const c = cyl(0.11, 0.11, 0.04, toon("coinM", null, 0xf2c14e), 0, k * 0.045, 0, 14, g); c.visible = false; } return g; });
const deskLamp = new THREE.PointLight(0xffd9a0, 0, 8, 1.5); deskLamp.position.set(OF + 0.8, 1.5, -2.3); world.add(deskLamp);
  return { chair, toys, yardTree, hospWins, libWins, ronWins, box, lid, bigOak, oaks, CAR, carPaint, vlamp, hillY, dirtM, leafMats, P,
    bankDoors, chartCv, chartTex, ticker, hallLamp, ship, sea, calCv, calTex, stacks, deskLamp };
}
