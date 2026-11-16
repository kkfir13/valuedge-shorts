// Cast for "The Janitor Nobody Noticed": outfits + one draw() entry used by the engine and the test sheet.
import { Pen, bodyFront, headInfo, INK, SKINS, fxBurst, fxPuff, fxStars, mul, shade } from "./toon.js";

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
  bodyFront(p, o, { phase: a.phase ?? 0, expr: a.expr ?? "neutral", mode: a.mode ?? "stand", look: a.look ?? 0, blink: a.blink ?? 0,
    prop: a.prop ?? null, tilt: a.tilt ?? 0, headTilt: a.headTilt ?? 0, wave: a.wave, light: a.light, facing: a.facing ?? 0, seed: a.seed ?? 1 });
  g.restore();
}

/** effect cards: kind in burst | puff | stars | paper | coin | snow | leaf | acorn | zz */
export function drawFx(g, kind, t, w, h) {
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
