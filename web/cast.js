// Cast for "The Janitor Nobody Noticed": outfits + one draw() entry used by the engine and the test sheet.
import { Pen, bodyFront, bodySide, headInfo, INK, SKINS, fxBurst, fxPuff, fxStars, mul, shade } from "./toon.js";

export const OUTFITS = {
  // Ronald: old, frugal, white fringe of hair, patched brown coat with safety pins
  ronald: { jacket: "#7a5a3c", pants: "#4a4e5a", boots: "#3a2a20", hat: "hair", hair: "#eeeae2", moustache: "#e4e0d8", skin: "#f5c9a0", pins: true, patch: "#5b7a4a" },
  ronaldHat: { jacket: "#7a5a3c", pants: "#4a4e5a", boots: "#3a2a20", moustache: "#e4e0d8", hat: "beanie", cap: "#d4473b", pom: "#f4f1ea", skin: "#f5c9a0", pins: true, patch: "#5b7a4a" },
  neighbor: { jacket: "#3f8a7a", pants: "#3b3f52", boots: "#5a3b2a", hat: "hair", hair: "#b8b2aa", dress: "#c25a7a", skin: "#ffe2c2" },
  lawyer: { jacket: "#2e3448", pants: "#2a2d38", boots: INK, hat: "hair", hair: "#3a2a22", buttons: "#c9ccd2", skin: "#ecd0b6", build: "stout" },
  digger: { jacket: "#3f6fb5", pants: "#3b3f52", boots: "#4a3426", hat: "cap", cap: "#e2a33c", skin: "#c99067" },
  t1: { jacket: "#8c3b4a", pants: "#3b3f52", boots: "#4a3426", hat: "beanie", cap: "#3f6fb5", skin: "#ffe2c2" },
  t2: { jacket: "#5d7a3a", pants: "#3b3f52", boots: "#4a3426", hat: "hair", hair: "#5a3b2a", dress: "#d9a441", skin: "#ecd0b6" },
  t3: { jacket: "#b5653f", pants: "#3b3f52", boots: "#4a3426", hat: "cap", cap: "#2f5f6a", skin: "#c99067" },
  t4: { jacket: "#7b5ac9", pants: "#3b3f52", boots: "#4a3426", hat: "hair", hair: "#2a201a", dress: "#5a8fc2", skin: "#f5c9a0" },
};

export const CW = 720, CH = 1200, DS = CW / 600; // canvas px per design unit

/** draw actor `a` = { o, seed, expr, mode, phase, prop, wave, tilt, headTilt, look, blink, facing, light, extraHat } on ctx */
export function drawActor(g, a) {
  g.clearRect(0, 0, CW, CH);
  g.save(); g.scale(DS, DS);
  const p = new Pen(g);
  const o = OUTFITS[a.o] || a.o;
  if (a.side) { // profile view facing screen-right; flip:true faces left
    if (a.flip) { g.translate(600, 0); g.scale(-1, 1); }
    bodySide(p, o, { phase: a.phase ?? 0, expr: a.expr ?? "neutral", mode: a.mode ?? "stand", blink: a.blink ?? 0, seed: a.seed ?? 1, stride: a.stride ?? 1 });
    g.restore(); return;
  }
  if (a.flip) { g.translate(600, 0); g.scale(-1, 1); }
  bodyFront(p, o, { phase: a.phase ?? 0, expr: a.expr ?? "neutral", mode: a.mode ?? "stand", look: a.look ?? 0, blink: a.blink ?? 0,
    prop: a.prop ?? null, tilt: a.tilt ?? 0, headTilt: a.headTilt ?? 0, wave: a.wave, light: a.light, facing: a.facing ?? 0, seed: a.seed ?? 1 });
  g.restore();
}

/** effect cards: kind in burst | puff | stars | paper | coin | snow | leaf | acorn | zz */
export function drawFx(g, kind, t, w, h, e = {}) {
  g.clearRect(0, 0, w, h);
  const p = new Pen(g);
  if (kind === "burst") { g.save(); g.translate(w / 2, h / 2); g.scale(w / 600, w / 600); g.translate(-300, -300); fxBurst(p, t, "#fff3b0", 12, 40, 260); g.restore(); }
  else if (kind === "puff") { g.save(); g.translate(w / 2, h / 2); g.scale(w / 600, w / 600); g.translate(-300, -300); fxPuff(p, t); g.restore(); }
  else if (kind === "stars") { g.save(); g.translate(w / 2, h / 2); g.scale(w / 600, w / 600); g.translate(-300, -300); fxStars(p, t); g.restore(); }
  else if (kind === "paper") { // stock certificate
    p.ol = 6;
    p.poly([[8, 8], [w - 8, 8], [w - 8, h - 8], [8, h - 8]], "#f3ecd6", 7);
    g.strokeStyle = "#5f8a5a"; g.lineWidth = 6; g.strokeRect(22, 22, w - 44, h - 44);
    g.fillStyle = "#3d5e3a"; g.font = `bold ${Math.round(h * 0.16)}px Georgia, serif`; g.textAlign = "center";
    g.fillText("STOCK", w / 2, h * 0.42);
    g.font = `${Math.round(h * 0.09)}px Georgia, serif`; g.fillText("CERTIFICATE", w / 2, h * 0.6);
    p.ell(w * 0.8, h * 0.78, h * 0.09, h * 0.09, "#d9a441", 4);
  } else if (kind === "coin") {
    p.ol = 8; p.ell(w / 2, h / 2, w * 0.42, h * 0.42, "#f2c14e", 9); p.ell(w / 2, h / 2, w * 0.3, h * 0.3, null, 5);
    g.fillStyle = "#a8781c"; g.font = `bold ${Math.round(h * 0.42)}px Georgia, serif`; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("$", w / 2, h / 2 + 2);
  } else if (kind === "snow") {
    p.ell(w / 2, h / 2, w * 0.3, h * 0.3, "#ffffff", 0);
  } else if (kind === "acorn") {
    p.ol = 7; p.ell(w / 2, h * 0.58, w * 0.26, h * 0.3, "#b8743a", 8);
    p.ell(w / 2, h * 0.36, w * 0.32, h * 0.14, "#7a5232", 8); p.stroke([[w / 2, h * 0.22], [w / 2 + 6, h * 0.1]], 9);
  } else if (kind === "beanie") {
    p.ol = 8; const cx = w / 2, by = h * 0.78;
    p.poly([[cx - w * 0.38, by], [cx - w * 0.36, by - h * 0.32], [cx - w * 0.2, by - h * 0.52], [cx, by - h * 0.58], [cx + w * 0.2, by - h * 0.52], [cx + w * 0.36, by - h * 0.32], [cx + w * 0.38, by]], "#d4473b", 9);
    g.save(); g.strokeStyle = "#a8352c"; g.lineWidth = 5; for (let i = -3; i <= 3; i++) { g.beginPath(); g.moveTo(cx + i * w * 0.09, by - h * 0.5); g.lineTo(cx + i * w * 0.1, by - 6); g.stroke(); } g.restore();
    p.poly([[cx - w * 0.42, by - h * 0.14], [cx + w * 0.42, by - h * 0.14], [cx + w * 0.42, by + h * 0.04], [cx - w * 0.42, by + h * 0.04]], "#b83c32", 9);
    p.ell(cx, by - h * 0.64, w * 0.11, h * 0.11, "#f4f1ea", 8);
  } else if (kind === "spice") { // a dried mace/nutmeg pod: red-orange lacy husk around a brown seed
    p.ol = 7; p.ell(w / 2, h / 2, w * 0.36, h * 0.4, "#c8452a", 8);
    g.save(); g.strokeStyle = "#f08a3c"; g.lineWidth = 9; for (let i = -2; i <= 2; i++) { g.beginPath(); g.moveTo(w / 2 + i * w * 0.08, h * 0.16); g.quadraticCurveTo(w / 2 + i * w * 0.16, h / 2, w / 2 + i * w * 0.07, h * 0.84); g.stroke(); } g.restore();
    p.ell(w / 2, h / 2, w * 0.16, h * 0.18, "#6b3f22", 6);
  } else if (kind === "tape") { // ticker tape strip
    p.ol = 4; p.poly([[6, 14], [w - 6, 8], [w - 6, h - 14], [6, h - 8]], "#f6f1df", 5);
    g.fillStyle = "#3d3a44"; g.font = `bold ${Math.round(h * 0.42)}px "Courier New", monospace`; g.textAlign = "left"; g.textBaseline = "middle";
    g.fillText("RR 3/8 ▲ USS 1/4 ▼", 18, h / 2 + 1);
  } else if (kind === "page") { // calendar page flying off
    p.ol = 5; p.poly([[6, 6], [w - 6, 10], [w - 10, h - 6], [8, h - 10]], "#f6f1e4", 6);
    g.fillStyle = "#c0353a"; g.fillRect(12, 12, w - 24, h * 0.2);
    g.strokeStyle = "#9a948a"; g.lineWidth = 3; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(20, h * (0.42 + i * 0.13)); g.lineTo(w - 20, h * (0.42 + i * 0.13)); g.stroke(); }
  } else if (kind === "zz") {
    g.fillStyle = "#ffffff"; g.strokeStyle = INK; g.lineWidth = 10; g.font = `bold ${Math.round(h * 0.6)}px Arial`; g.textAlign = "center"; g.textBaseline = "middle";
    g.strokeText("z", w / 2, h / 2); g.fillText("z", w / 2, h / 2);
  } else if (FX2[kind]) { FX2[kind](g, p, t, w, h, e);
  } else if (kind === "blob") {
    const gr = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    gr.addColorStop(0, "rgba(30,20,40,0.55)"); gr.addColorStop(0.6, "rgba(30,20,40,0.35)"); gr.addColorStop(1, "rgba(30,20,40,0)");
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
  } else if (kind === "glow") {
    const gr = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    gr.addColorStop(0, "rgba(255,240,170,0.9)"); gr.addColorStop(1, "rgba(255,220,120,0)");
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
  }
}

export { headInfo };

// ---------- film FX (t = 0..1 animation phase; e = the fx entry: text, col, n, seed) ----------
const R1 = (i) => { const x = Math.sin(i * 127.1 + 3.7) * 43758.5453; return x - Math.floor(x); };
const outline = (g, txt, x, y, size, fill, stroke = INK, lw = 0.16, font = "Arial Black, Arial") => {
  g.font = `900 ${size}px ${font}`; g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round";
  g.strokeStyle = stroke; g.lineWidth = size * lw; g.strokeText(txt, x, y); g.fillStyle = fill; g.fillText(txt, x, y);
};
const FX2 = {
  // flame ring hugging a character card (draw w:1.6,h:2.6 behind the actor)
  aura(g, p, t, w, h, e) {
    const col = e.col || "#ff8a2a", n = 22;
    for (let k = 0; k < 2; k++) { g.beginPath();
      for (let i = 0; i <= n; i++) { const a = (i / n) * Math.PI * 2, fl = 1 + 0.18 * Math.sin(i * 3.1 + t * 25 + k) + 0.12 * Math.sin(i * 7.3 - t * 40);
        const rx = w * (0.36 - k * 0.07) * fl, ry = h * (0.42 - k * 0.07) * (a > Math.PI ? 1 + 0.25 * Math.sin(a - Math.PI) : 1) * fl;
        const x = w / 2 + Math.cos(a) * rx, y = h * 0.55 + Math.sin(a) * ry * (Math.sin(a) < 0 ? 1.25 : 0.85); i ? g.lineTo(x, y) : g.moveTo(x, y); }
      g.closePath(); g.fillStyle = k ? "#ffe066" : col; g.globalAlpha = 0.92; g.fill(); g.globalAlpha = 1; g.lineWidth = 7; g.strokeStyle = INK; if (!k) g.stroke(); }
    g.clearRect(w * 0.3, h * 0.3, w * 0.4, h * 0.62); // hollow centre so the actor reads
  },
  sparks(g, p, t, w, h, e) { const n = e.n || 14; g.lineCap = "round";
    for (let i = 0; i < n; i++) { const a = R1(i + (e.seed || 0)) * Math.PI * 2, sp = 0.25 + 0.75 * R1(i * 3 + 1), r0 = w * 0.08 + t * w * 0.42 * sp, r1 = r0 + w * 0.08 * (1 - t);
      g.strokeStyle = i % 3 ? "#ffd84a" : "#fff6c8"; g.lineWidth = 9 * (1 - t) + 2;
      g.beginPath(); g.moveTo(w / 2 + Math.cos(a) * r0, h / 2 + Math.sin(a) * r0 + t * t * h * 0.15); g.lineTo(w / 2 + Math.cos(a) * r1, h / 2 + Math.sin(a) * r1 + t * t * h * 0.15); g.stroke(); } },
  speed(g, p, t, w, h, e) { g.strokeStyle = e.col || "rgba(255,255,255,0.85)"; g.lineCap = "round";
    for (let i = 0; i < 18; i++) { const y = h * R1(i), x0 = w * ((R1(i * 7) + t * 2.5) % 1), L = w * (0.15 + 0.3 * R1(i * 5)); g.lineWidth = 3 + 6 * R1(i * 2); g.beginPath(); g.moveTo(x0, y); g.lineTo(x0 - L, y); g.stroke(); } },
  impact(g, p, t, w, h, e) { // comic star burst with an optional word
    const s = Math.min(1, t * 4) * (1 - Math.max(0, t - 0.7) / 0.3), n = 14; g.save(); g.translate(w / 2, h / 2); g.scale(s, s); g.rotate(t * 0.3);
    for (const [k, col] of [[1, e.col || "#ffd84a"], [0.62, "#ffffff"]]) { g.beginPath();
      for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2, r = (i % 2 ? 0.28 : 0.48 - 0.06 * R1(i)) * w * k; i ? g.lineTo(Math.cos(a) * r, Math.sin(a) * r) : g.moveTo(Math.cos(a) * r, Math.sin(a) * r); }
      g.closePath(); g.fillStyle = col; g.fill(); g.lineWidth = 8; g.strokeStyle = INK; g.stroke(); }
    g.restore(); if (e.text && s > 0.3) outline(g, e.text, w / 2, h / 2, Math.round(w * 0.2 * s), "#e2453c", INK, 0.14);
  },
  sweat(g, p, t, w, h) { p.ol = 5; for (let i = 0; i < 3; i++) { const x = w * (0.25 + i * 0.25), y = h * (0.25 + 0.5 * ((t * 1.5 + i * 0.33) % 1));
    g.beginPath(); g.moveTo(x, y - h * 0.12); g.quadraticCurveTo(x + w * 0.09, y + h * 0.02, x, y + h * 0.06); g.quadraticCurveTo(x - w * 0.09, y + h * 0.02, x, y - h * 0.12);
    g.fillStyle = "#9fd4ff"; g.fill(); g.lineWidth = 5; g.strokeStyle = INK; g.stroke(); } },
  question(g, p, t, w, h, e) { const s = 1 + 0.08 * Math.sin(t * 20); outline(g, e.text || "?", w / 2, h / 2, Math.round(h * 0.8 * s), e.col || "#ffd84a", INK, 0.12); },
  exclaim(g, p, t, w, h, e) { const s = 1 + 0.12 * Math.sin(t * 30); outline(g, e.text || "!", w / 2, h / 2, Math.round(h * 0.85 * s), e.col || "#e2453c", INK, 0.12); },
  dollar(g, p, t, w, h, e) { outline(g, "$", w / 2, h / 2, Math.round(h * 0.85), e.col || "#5fd17a", INK, 0.12); },
  word(g, p, t, w, h, e) { // big comic word, e.text, e.col; auto-fits width
    const txt = e.text || "WOW"; let size = h * 0.7; g.font = `900 ${size}px Arial Black, Arial`; const m = g.measureText(txt).width; if (m > w * 0.92) size *= (w * 0.92) / m;
    g.save(); g.translate(w / 2, h / 2); g.rotate(-0.08); outline(g, txt, 0, 0, Math.round(size), e.col || "#ffd84a", INK, 0.13); g.restore(); },
  arrow(g, p, t, w, h, e) { // big stock arrow; e.dir = up|down
    const up = e.dir !== "down", col = e.col || (up ? "#4fd18b" : "#ff5a5a"); g.save(); if (!up) { g.translate(0, h); g.scale(1, -1); }
    const pts = [[w * 0.5, h * 0.04], [w * 0.95, h * 0.48], [w * 0.68, h * 0.48], [w * 0.68, h * 0.96], [w * 0.32, h * 0.96], [w * 0.32, h * 0.48], [w * 0.05, h * 0.48]];
    g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); g.fillStyle = col; g.fill(); g.lineJoin = "round"; g.lineWidth = 12; g.strokeStyle = INK; g.stroke();
    g.fillStyle = "rgba(255,255,255,0.35)"; g.fillRect(w * 0.36, h * 0.52, w * 0.08, h * 0.4); g.restore(); },
  bulb(g, p, t, w, h) { p.ol = 7; const on = t > 0.2;
    if (on) { const gr = g.createRadialGradient(w / 2, h * 0.4, 0, w / 2, h * 0.4, w / 2); gr.addColorStop(0, "rgba(255,240,150,0.9)"); gr.addColorStop(1, "rgba(255,230,120,0)"); g.fillStyle = gr; g.fillRect(0, 0, w, h); }
    p.ell(w / 2, h * 0.4, w * 0.24, h * 0.24, on ? "#fff3a0" : "#e8e8e0", 8); p.poly([[w * 0.4, h * 0.6], [w * 0.6, h * 0.6], [w * 0.58, h * 0.78], [w * 0.42, h * 0.78]], "#9aa3ad", 7); },
  smoke(g, p, t, w, h, e) { for (let i = 0; i < 6; i++) { const k = (t + i / 6) % 1, x = w * (0.5 + 0.2 * Math.sin(i * 2.1 + k * 3)), y = h * (0.9 - k * 0.8), r = w * (0.08 + k * 0.18);
    g.globalAlpha = 0.85 * (1 - k); p.ell(x, y, r, r, e.col || "#d9d4cc", 5); } g.globalAlpha = 1; },
  confetti(g, p, t, w, h, e) { const cols = ["#e2453c", "#ffd84a", "#4fd18b", "#3f8fe0", "#c05ad9", "#ff9a3c"];
    for (let i = 0; i < (e.n || 40); i++) { const x = w * R1(i * 3), y = (h * (R1(i * 5) + t * (0.6 + 0.6 * R1(i)))) % h, a = t * 12 * (R1(i * 7) - 0.5) + i;
      g.save(); g.translate(x, y); g.rotate(a); g.fillStyle = cols[i % cols.length]; g.fillRect(-w * 0.02, -h * 0.008, w * 0.04, h * 0.016); g.restore(); } },
  bill(g, p, t, w, h) { p.ol = 5; p.poly([[6, 6], [w - 6, 8], [w - 6, h - 6], [6, h - 8]], "#9fd08a", 6);
    g.strokeStyle = "#4e8a45"; g.lineWidth = 4; g.strokeRect(w * 0.08, h * 0.15, w * 0.84, h * 0.7); p.ell(w / 2, h / 2, h * 0.26, h * 0.26, "#cfe8bf", 4);
    g.fillStyle = "#3d6e36"; g.font = `bold ${Math.round(h * 0.38)}px Georgia, serif`; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("$", w / 2, h / 2 + 2); },
  bubble(g, p, t, w, h, e) { // speech bubble, e.text; tail to bottom-left (e.tail = "right" flips)
    const txt = e.text || "...", tail = e.tail === "right" ? -1 : 1, bx = w * 0.04, by = h * 0.04, bw = w * 0.92, bh = h * 0.7, r = h * 0.2;
    g.beginPath(); g.moveTo(bx + r, by); g.arcTo(bx + bw, by, bx + bw, by + bh, r); g.arcTo(bx + bw, by + bh, bx, by + bh, r);
    const tx = tail > 0 ? w * 0.3 : w * 0.7; g.lineTo(tx + 26 * tail, by + bh); g.lineTo(tx - 30 * tail, h * 0.97); g.lineTo(tx - 6 * tail, by + bh);
    g.arcTo(bx, by + bh, bx, by, r); g.arcTo(bx, by, bx + bw, by, r); g.closePath(); g.fillStyle = "#ffffff"; g.fill(); g.lineJoin = "round"; g.lineWidth = 8; g.strokeStyle = INK; g.stroke();
    let size = h * 0.34; g.font = `bold ${size}px Arial`; const m = g.measureText(txt).width; if (m > bw * 0.86) size *= (bw * 0.86) / m;
    g.fillStyle = INK; g.font = `bold ${Math.round(size)}px Arial`; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(txt, w / 2, by + bh / 2 + 2); },
  heart(g, p, t, w, h, e) { g.beginPath(); g.moveTo(w / 2, h * 0.85); g.bezierCurveTo(-w * 0.1, h * 0.4, w * 0.25, -h * 0.05, w / 2, h * 0.3); g.bezierCurveTo(w * 0.75, -h * 0.05, w * 1.1, h * 0.4, w / 2, h * 0.85);
    g.fillStyle = e.col || "#e2453c"; g.fill(); g.lineWidth = 8; g.strokeStyle = INK; g.stroke(); },
  card(g, p, t, w, h, e) { // playing card, e.text e.g. "A♠"
    p.ol = 5; p.poly([[6, 6], [w - 6, 6], [w - 6, h - 6], [6, h - 6]], "#fbf8f0", 6); const red = /[♥♦]/.test(e.text || "");
    g.fillStyle = red ? "#d23a3a" : INK; g.font = `bold ${Math.round(h * 0.34)}px Georgia, serif`; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(e.text || "A♠", w / 2, h / 2); },
  label(g, p, t, w, h, e) { // flat sign / price tag text on a coloured plate
    p.ol = 5; p.poly([[6, 6], [w - 6, 6], [w - 6, h - 6], [6, h - 6]], e.bg || "#fbf3dc", 6); let size = h * 0.55; g.font = `bold ${size}px Arial`; const m = g.measureText(e.text || "").width; if (m > w * 0.86) size *= (w * 0.86) / m;
    g.fillStyle = e.col || INK; g.font = `bold ${Math.round(size)}px Arial`; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(e.text || "", w / 2, h / 2 + 2); },
  ring(g, p, t, w, h, e) { g.lineWidth = 10 * (1 - t) + 2; g.strokeStyle = e.col || "#ffffff"; g.beginPath(); g.arc(w / 2, h / 2, (w / 2 - 8) * (0.2 + 0.8 * t), 0, 7); g.stroke(); },
  zap(g, p, t, w, h, e) { g.lineJoin = "round"; const pts = [[w * 0.55, 0], [w * 0.3, h * 0.5], [w * 0.5, h * 0.5], [w * 0.38, h], [w * 0.75, h * 0.38], [w * 0.55, h * 0.38], [w * 0.72, 0]];
    g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); g.fillStyle = e.col || "#ffd84a"; g.fill(); g.lineWidth = 8; g.strokeStyle = INK; g.stroke(); },
};
export const FX_KINDS = ["burst", "puff", "stars", "paper", "coin", "snow", "acorn", "beanie", "spice", "tape", "page", "zz", "glow", ...Object.keys(FX2)];
