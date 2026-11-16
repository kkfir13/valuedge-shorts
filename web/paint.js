// Painted canvas textures: flat colour, dark seams, light speckle. All cached by key.
import * as THREE from "three";

const cache = new Map();
export const rng = (seed) => { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); };
const hex = (c, k) => { const n = new THREE.Color(c); n.multiplyScalar(k); return "#" + n.getHexString(); };

export function ctex(key, w, h, draw, rep = [1, 1]) {
  if (cache.has(key)) return cache.get(key);
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const g = c.getContext("2d"); draw(g, w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4;
  t.repeat.set(rep[0], rep[1]);
  cache.set(key, t); return t;
}

const speckle = (g, w, h, col, n, r, seed, a = 0.25) => {
  const R = rng(seed); g.globalAlpha = a; g.fillStyle = col;
  for (let i = 0; i < n; i++) { g.beginPath(); g.ellipse(R() * w, R() * h, r * (0.5 + R()), r * (0.3 + R() * 0.6), R() * 3, 0, 7); g.fill(); }
  g.globalAlpha = 1;
};

export const snow = () => ctex("snow", 512, 512, (g, w, h) => {
  g.fillStyle = "#eef3f8"; g.fillRect(0, 0, w, h);
  speckle(g, w, h, "#d3dfee", 90, 30, 3, 0.35); speckle(g, w, h, "#ffffff", 60, 22, 4, 0.6); speckle(g, w, h, "#c3d2e6", 120, 4, 5, 0.4);
});
export const grass = () => ctex("grass", 512, 512, (g, w, h) => {
  g.fillStyle = "#7fbf4f"; g.fillRect(0, 0, w, h);
  speckle(g, w, h, "#6aa83f", 90, 30, 6, 0.4); speckle(g, w, h, "#9bd462", 70, 22, 7, 0.45);
  const R = rng(8); g.strokeStyle = "#4f8a32"; g.lineWidth = 3;
  for (let i = 0; i < 260; i++) { const x = R() * w, y = R() * h; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (R() - 0.5) * 6, y - 10 - R() * 8); g.stroke(); }
});
export const dirt = () => ctex("dirt", 256, 256, (g, w, h) => {
  g.fillStyle = "#8a5f3c"; g.fillRect(0, 0, w, h); speckle(g, w, h, "#6e4a2e", 80, 12, 9, 0.5); speckle(g, w, h, "#a87a52", 60, 8, 10, 0.5);
});
export const road = () => ctex("road", 512, 512, (g, w, h) => {
  g.fillStyle = "#6d7380"; g.fillRect(0, 0, w, h); speckle(g, w, h, "#5a5f6b", 140, 10, 11, 0.5); speckle(g, w, h, "#868c99", 120, 6, 12, 0.5);
  g.fillStyle = "#f2d35a"; for (let x = 0; x < w; x += 128) g.fillRect(x + 20, h / 2 - 6, 80, 12);
});
export const siding = (col) => ctex("siding" + col, 256, 256, (g, w, h) => {
  g.fillStyle = col; g.fillRect(0, 0, w, h);
  for (let y = 0; y < h; y += 32) { g.fillStyle = hex(col, 0.78); g.fillRect(0, y + 27, w, 5); g.fillStyle = hex(col, 1.08); g.fillRect(0, y, w, 4); }
  speckle(g, w, h, hex(col, 0.85), 40, 8, 13, 0.3);
});
export const brick = (col) => ctex("brick" + col, 256, 256, (g, w, h) => {
  g.fillStyle = hex(col, 0.7); g.fillRect(0, 0, w, h);
  const R = rng(14);
  for (let r = 0; r < 8; r++) for (let c = -1; c < 5; c++) {
    const x = c * 64 + (r % 2) * 32 + 3, y = r * 32 + 3; g.fillStyle = hex(col, 0.9 + R() * 0.22); g.fillRect(x, y, 58, 26);
  }
});
export const shingles = (col) => ctex("shing" + col, 256, 256, (g, w, h) => {
  g.fillStyle = col; g.fillRect(0, 0, w, h); const R = rng(15);
  for (let r = 0; r < 8; r++) { g.fillStyle = hex(col, 0.7); g.fillRect(0, r * 32 + 28, w, 4);
    for (let c = 0; c < 9; c++) { g.fillStyle = hex(col, 0.85 + R() * 0.25); g.fillRect(c * 32 + (r % 2) * 16, r * 32, 30, 28); } }
});
export const planks = (col) => ctex("plank" + col, 256, 256, (g, w, h) => {
  g.fillStyle = col; g.fillRect(0, 0, w, h); const R = rng(16);
  for (let i = 0; i < 8; i++) { g.fillStyle = hex(col, 0.88 + R() * 0.2); g.fillRect(0, i * 32, w, 28); g.fillStyle = hex(col, 0.6); g.fillRect(0, i * 32 + 28, w, 4); }
  speckle(g, w, h, hex(col, 0.7), 30, 5, 17, 0.4);
});
export const metal = (col) => ctex("metal" + col, 256, 256, (g, w, h) => {
  g.fillStyle = col; g.fillRect(0, 0, w, h); speckle(g, w, h, hex(col, 0.9), 40, 18, 18, 0.3);
  g.fillStyle = hex(col, 0.6); for (let y = 24; y < h; y += 104) for (let x = 24; x < w; x += 104) { g.beginPath(); g.arc(x, y, 5, 0, 7); g.fill(); }
});
/** wall of safe-deposit boxes */
export const boxWall = () => ctex("boxwall", 512, 512, (g, w, h) => {
  g.fillStyle = "#8f979f"; g.fillRect(0, 0, w, h);
  for (let r = 0; r < 8; r++) for (let c = 0; c < 4; c++) {
    const x = c * 128 + 6, y = r * 64 + 5; g.fillStyle = "#b9c0c7"; g.fillRect(x, y, 116, 54);
    g.strokeStyle = "#5d646c"; g.lineWidth = 4; g.strokeRect(x, y, 116, 54);
    g.fillStyle = "#d9a441"; g.beginPath(); g.arc(x + 58, y + 27, 7, 0, 7); g.fill(); g.strokeStyle = "#241726"; g.lineWidth = 2; g.stroke();
  }
});
export const plaster = (col) => ctex("plaster" + col, 256, 256, (g, w, h) => {
  g.fillStyle = col; g.fillRect(0, 0, w, h); speckle(g, w, h, hex(col, 0.9), 60, 20, 19, 0.3); speckle(g, w, h, hex(col, 1.05), 40, 14, 20, 0.4);
});
export const bark = () => ctex("bark", 128, 256, (g, w, h) => {
  g.fillStyle = "#7a5232"; g.fillRect(0, 0, w, h); g.strokeStyle = "#5a3a22"; g.lineWidth = 5; const R = rng(21);
  for (let i = 0; i < 12; i++) { const x = R() * w; g.beginPath(); g.moveTo(x, 0); g.bezierCurveTo(x + 10, h / 3, x - 10, (2 * h) / 3, x + 4, h); g.stroke(); }
});
export const leaves = (col) => ctex("leaves" + col, 256, 256, (g, w, h) => {
  g.fillStyle = col; g.fillRect(0, 0, w, h); speckle(g, w, h, hex(col, 0.78), 50, 22, 22, 0.6); speckle(g, w, h, hex(col, 1.2), 40, 14, 23, 0.6);
});
/** sign board with text (never mirrored: drawn on the +z face via planar UVs) */
export const sign = (text, bg = "#f4efe2", fg = "#241726", w = 1024, h = 256) => ctex("sign" + text + bg, w, h, (g) => {
  g.fillStyle = bg; g.fillRect(0, 0, w, h); g.strokeStyle = fg; g.lineWidth = 16; g.strokeRect(14, 14, w - 28, h - 28);
  g.fillStyle = fg; g.font = `bold ${Math.round(h * 0.52)}px Georgia, serif`; g.textAlign = "center"; g.textBaseline = "middle";
  g.fillText(text, w / 2, h / 2 + 6);
});
export const windowTex = (lit) => ctex("win" + lit, 128, 128, (g, w, h) => {
  g.fillStyle = "#f4efe2"; g.fillRect(0, 0, w, h);
  g.fillStyle = lit ? "#ffd86b" : "#5a7fa8"; g.fillRect(12, 12, w - 24, h - 24);
  if (!lit) { g.fillStyle = "#8db3d6"; g.beginPath(); g.moveTo(20, 60); g.lineTo(60, 20); g.lineTo(80, 20); g.lineTo(20, 80); g.fill(); }
  g.fillStyle = "#f4efe2"; g.fillRect(w / 2 - 5, 12, 10, h - 24); g.fillRect(12, h / 2 - 5, w - 24, 10);
});
export const cloud = () => ctex("cloud", 512, 256, (g, w, h) => {
  g.fillStyle = "#ffffff"; const R = rng(24);
  for (let i = 0; i < 9; i++) { g.beginPath(); g.ellipse(80 + R() * 350, 120 + R() * 60 - (i % 3) * 20, 60 + R() * 50, 40 + R() * 30, 0, 0, 7); g.fill(); }
  g.globalCompositeOperation = "source-atop"; g.fillStyle = "rgba(200,212,232,0.8)"; g.fillRect(0, 150, w, 120); g.globalCompositeOperation = "source-over";
});

// ---------- extra sets (city, exchange, harbor, office) ----------
export const cobble = () => ctex("cobble", 512, 512, (g, w, h) => {
  g.fillStyle = "#6f6a66"; g.fillRect(0, 0, w, h); const R = rng(41);
  for (let r = 0; r < 16; r++) for (let c = 0; c < 12; c++) {
    const x = c * 44 + (r % 2) * 22 + R() * 4, y = r * 32 + R() * 3;
    g.fillStyle = hex("#9a948c", 0.82 + R() * 0.3); g.beginPath(); g.ellipse(x + 20, y + 15, 19, 13, 0, 0, 7); g.fill();
  }
  speckle(g, w, h, "#55504c", 80, 4, 42, 0.4);
});
export const floorboards = (col = "#9a6b42") => ctex("floor" + col, 256, 256, (g, w, h) => {
  g.fillStyle = col; g.fillRect(0, 0, w, h); const R = rng(43);
  for (let i = 0; i < 8; i++) { g.fillStyle = hex(col, 0.85 + R() * 0.25); g.fillRect(i * 32, 0, 28, h); g.fillStyle = hex(col, 0.55); g.fillRect(i * 32 + 28, 0, 4, h);
    g.fillRect(i * 32, (R() * h) | 0, 28, 3); }
  speckle(g, w, h, hex(col, 0.7), 30, 5, 44, 0.35);
});
export const wallpaper = (col = "#3f6a5a") => ctex("wallp" + col, 256, 256, (g, w, h) => {
  g.fillStyle = col; g.fillRect(0, 0, w, h);
  g.fillStyle = hex(col, 1.18); for (let x = 0; x < w; x += 32) g.fillRect(x, 0, 10, h);
  g.fillStyle = hex(col, 0.85); for (let y = 0; y < h; y += 64) for (let x = 16; x < w; x += 64) { g.beginPath(); g.arc(x + (y / 64 % 2) * 32, y + 32, 6, 0, 7); g.fill(); }
});
export const marble = (col = "#e9e2d4") => ctex("marble" + col, 256, 256, (g, w, h) => {
  g.fillStyle = col; g.fillRect(0, 0, w, h); speckle(g, w, h, hex(col, 0.92), 50, 26, 45, 0.3);
  g.strokeStyle = hex(col, 0.8); g.lineWidth = 2; const R = rng(46);
  for (let i = 0; i < 6; i++) { g.beginPath(); let x = R() * w; g.moveTo(x, 0); for (let y = 0; y < h; y += 32) { x += (R() - 0.5) * 30; g.lineTo(x, y); } g.stroke(); }
});
export const water = () => ctex("water", 512, 512, (g, w, h) => {
  g.fillStyle = "#3f7fb0"; g.fillRect(0, 0, w, h); speckle(g, w, h, "#356f9c", 70, 30, 47, 0.5);
  g.strokeStyle = "#a9d4ef"; g.lineWidth = 4; const R = rng(48);
  for (let i = 0; i < 60; i++) { const x = R() * w, y = R() * h; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 12, y - 5, x + 24, y); g.stroke(); }
});
export const sailcloth = () => ctex("sail", 256, 256, (g, w, h) => {
  g.fillStyle = "#f1e9d6"; g.fillRect(0, 0, w, h); g.fillStyle = "#e0d6bf"; for (let x = 0; x < w; x += 42) g.fillRect(x, 0, 4, h); speckle(g, w, h, "#d8ccb2", 30, 10, 49, 0.4);
});
export const rowhouse = (col) => ctex("row" + col, 256, 256, (g, w, h) => { // brick rowhouse facade, tiles every 2 m
  g.fillStyle = hex(col, 0.72); g.fillRect(0, 0, w, h); const R = rng(50);
  for (let r = 0; r < 16; r++) for (let c = -1; c < 9; c++) { g.fillStyle = hex(col, 0.9 + R() * 0.2); g.fillRect(c * 32 + (r % 2) * 16 + 2, r * 16 + 2, 28, 12); }
});
/** chalk price board: a line chart drawn up to progress t (0..1) along a named curve; redrawn each frame */
export function chartDraw(g, w, h, curve, t, label) {
  g.fillStyle = "#2c3a33"; g.fillRect(0, 0, w, h);
  g.strokeStyle = "#8a6a44"; g.lineWidth = 22; g.strokeRect(11, 11, w - 22, h - 22);
  g.strokeStyle = "rgba(240,240,230,0.18)"; g.lineWidth = 2;
  for (let i = 1; i < 6; i++) { g.beginPath(); g.moveTo(40, 40 + i * (h - 80) / 6); g.lineTo(w - 40, 40 + i * (h - 80) / 6); g.stroke(); }
  g.fillStyle = "rgba(245,240,225,0.85)"; g.font = `bold ${Math.round(h * 0.09)}px Georgia, serif`; g.textAlign = "left"; g.fillText(label || "PRICE", 50, 40 + h * 0.1);
  const n = 120, pts = [];
  for (let i = 0; i <= n * t; i++) { const x = i / n; pts.push([60 + x * (w - 120), h - 50 - curve(x) * (h - 150)]); }
  if (pts.length < 2) return;
  g.lineCap = "round"; g.lineJoin = "round";
  g.strokeStyle = "rgba(255,255,240,0.35)"; g.lineWidth = 22; g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke();
  g.strokeStyle = "#f6f1df"; g.lineWidth = 9; g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke();
  const [lx, ly] = pts[pts.length - 1]; g.fillStyle = "#ffd25a"; g.beginPath(); g.arc(lx, ly, 14, 0, 7); g.fill();
}
/** wall calendar page with a year (or any short text) */
export function calendarDraw(g, w, h, text, sub) {
  g.fillStyle = "#f6f1e4"; g.fillRect(0, 0, w, h); g.fillStyle = "#c0353a"; g.fillRect(0, 0, w, h * 0.24);
  g.fillStyle = "#f6f1e4"; g.font = `bold ${Math.round(h * 0.13)}px Georgia, serif`; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(sub || "YEAR", w / 2, h * 0.12);
  g.fillStyle = "#241726"; g.font = `bold ${Math.round(h * (String(text).length > 4 ? 0.3 : 0.4))}px Georgia, serif`; g.fillText(String(text), w / 2, h * 0.62);
  g.strokeStyle = "#241726"; g.lineWidth = 10; g.strokeRect(5, 5, w - 10, h - 10);
}
