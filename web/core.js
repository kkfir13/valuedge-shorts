// Core: shared world groups, toon materials and building helpers used by the legacy town and the film kit.
import * as THREE from "three";
import * as P from "./paint.js";
export { THREE, P };
export const world = new THREE.Group(), cards = new THREE.Group();
// ---------- toon materials ----------
export const grad = (() => { const d = new Uint8Array([90, 170, 255]); const t = new THREE.DataTexture(d, 3, 1, THREE.RedFormat); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
const mats = new Map();
export const toon = (key, map, color = 0xffffff) => {
  if (mats.has(key)) return mats.get(key);
  const m = new THREE.MeshToonMaterial({ map: map || null, color, gradientMap: grad });
  mats.set(key, m); return m;
};
export const flat = (c) => toon("c" + c, null, c);

// ---------- world helpers ----------
export const TILE = 2.0; // metres per texture repeat
/** box with constant texel density; x,y,z = centre of the bottom face */
export function tbox(w, h, d, mat, x, y, z, ry = 0, parent = world, tile = TILE) {
  const g = new THREE.BoxGeometry(w, h, d);
  const uv = g.attributes.uv, dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  for (let f = 0; f < 6; f++) for (let i = 0; i < 4; i++) { const k = f * 4 + i; uv.setXY(k, uv.getX(k) * dims[f][0] / tile, uv.getY(k) * dims[f][1] / tile); }
  const m = new THREE.Mesh(g, mat); m.position.set(x, y + h / 2, z); m.rotation.y = ry;
  m.castShadow = m.receiveShadow = true; parent.add(m); return m;
}
/** a plane carrying a texture once (signs, windows), facing +z, centred at x,y,z */
export function decal(w, h, map, x, y, z, ry = 0, parent = world, own = false) {
  const face = own ? new THREE.MeshToonMaterial({ map, gradientMap: grad }) : toon("d" + map.uuid, map);
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.06), [flat(0x888888), flat(0x888888), flat(0x888888), flat(0x888888), face, flat(0x888888)]);
  m.face = face;
  m.position.set(x, y, z); m.rotation.y = ry; m.receiveShadow = true; parent.add(m); return m;
}
export function cyl(r0, r1, h, mat, x, y, z, seg = 12, parent = world) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r0, r1, h, seg), mat); m.position.set(x, y + h / 2, z);
  m.castShadow = m.receiveShadow = true; parent.add(m); return m;
}
export function ball(r, mat, x, y, z, sy = 1, parent = world, seg = 14) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.max(8, seg - 4)), mat); m.position.set(x, y, z); m.scale.y = sy;
  m.castShadow = m.receiveShadow = true; parent.add(m); return m;
}
/** gable house: walls, prism gable, snowy roof planes */
export function house(x, z, w, d, h, wall, roofMat, ry = 0, y = 0, opts = {}) {
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
  for (const wx of opts.windows ?? [-w * 0.3, w * 0.3]) { const m = decal(0.9, 0.9, P.windowTex(!!opts.lit), wx, h * 0.55, d / 2 + 0.03, 0, G, !!opts.own); if (opts.own && opts.collect) opts.collect.push(m); }
  return G;
}
export function pine(x, z, s = 1, y = 0) {
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
export function oak(x, z, s = 1, y = 0, leafKey = "green") {
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
export const LEAF = { green: "#5f9e3a", orange: "#e08a2c", snow: "#eef3f8", bare: "#7a5232" };
export const leafMats = Object.fromEntries(Object.entries(LEAF).map(([k, c]) => [k, toon("leaf" + k, P.leaves(c))]));
