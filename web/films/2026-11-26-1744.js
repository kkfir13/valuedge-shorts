// "The Butter Forecast" (a quant's data-mining joke: annual butter production in Bangladesh 'explained' 75% of the S&P 500;
// with US cheese and the sheep of Bangladesh and the US, 99%; useless outside the fitted years; mined from a UN database;
// meant as a warning — yet investors and money managers asked him for the latest butter numbers) — film module.
// The real researcher (living) is never shown: the chart slides in from off-frame, the "he" is only implied.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const H = {};
  const PI = Math.PI;
  const AH = 1.55;
  const BUT = "#ffd45a", CHE = "#f2b43a", GREEN = "#38c172", RED = "#e2453c", INK = "#241726", CREAM = "#f4efe2";
  const STAGE = K.backdrop("#f2c14e");
  const DRUM = K.backdrop("#5a3a8a");
  // fitted sign text
  const tt = (B, s, bg, fg, pw, ph) => { const w = 1024, h = Math.round((1024 * ph) / pw), cv = document.createElement("canvas"); cv.width = w; cv.height = h; const g = cv.getContext("2d");
    g.fillStyle = bg; g.fillRect(0, 0, w, h); g.strokeStyle = fg; g.lineWidth = Math.max(6, Math.min(16, h * 0.06)); g.strokeRect(10, 10, w - 20, h - 20);
    const lines = s.split("\n"); let fs = Math.round((h * 0.56) / lines.length); g.font = `bold ${fs}px Georgia, serif`;
    const mw = Math.max(...lines.map((l) => g.measureText(l).width)); if (mw > w * 0.86) fs = Math.floor((fs * w * 0.86) / mw);
    g.font = `bold ${fs}px Georgia, serif`; g.fillStyle = fg; g.textAlign = "center"; g.textBaseline = "middle";
    lines.forEach((l, i) => g.fillText(l, w / 2, h / 2 + (i - (lines.length - 1) / 2) * fs * 1.12 + 4));
    const t = new B.THREE.CanvasTexture(cv); t.colorSpace = B.THREE.SRGBColorSpace; return t; };
  const hide = (o) => { o.visible = false; if (o.userData && o.userData.base) o.userData.base.v = false; return o; };
  const pop = (o, f, t0, d = 7, s = 1) => { const k = Math.max(0.01, E.back(E.prog(f, t0, t0 + d))); o.scale.setScalar(k * s); };
  const label = (B, s, bg, fg, w, h, x, y, z, o = {}) => B.dyn(B.plate(w, h, tt(B, s, bg, fg, w, h), x, y, z, { d: 0.02, edge: o.edge ?? fg, ...o }));
  const canvasTex = (B, w, h, draw) => { const cv = document.createElement("canvas"); cv.width = w; cv.height = h; draw(cv.getContext("2d"), w, h);
    const t = new B.THREE.CanvasTexture(cv); t.colorSpace = B.THREE.SRGBColorSpace; return t; };

  // the two-line chart: green = the stock market, yellow = butter in Bangladesh. gap 1 = loose, 0 = on top of each other.
  // win = highlight the tested years (0.3..0.7), wild = the butter line wanders off outside them.
  const mkt = (x) => 0.18 + 0.55 * x + 0.09 * Math.sin(9 * x) + 0.05 * Math.sin(23 * x + 1);
  const chart = (B, x, y, z, w, h, o = {}) => {
    const cv = document.createElement("canvas"); cv.width = 768; cv.height = Math.round((768 * h) / w); const tex = new B.THREE.CanvasTexture(cv); tex.colorSpace = B.THREE.SRGBColorSpace;
    const p = B.dyn(B.plate(w, h, tex, x, y, z, { d: 0.06, edge: o.frame ?? "#2a2d36", in: o.in }));
    let key = "";
    const draw = (q = {}) => { const s = { t: 1, gap: 1, win: false, wild: 0, title: "", ...q }; const k = JSON.stringify(s); if (k === key) return; key = k;
      const c = cv.getContext("2d"), W2 = cv.width, H2 = cv.height; c.fillStyle = "#13202b"; c.fillRect(0, 0, W2, H2);
      c.strokeStyle = "rgba(255,255,255,0.08)"; c.lineWidth = 2; for (let i = 1; i < 8; i++) { c.beginPath(); c.moveTo(0, (i * H2) / 8); c.lineTo(W2, (i * H2) / 8); c.stroke(); c.beginPath(); c.moveTo((i * W2) / 8, 0); c.lineTo((i * W2) / 8, H2); c.stroke(); }
      const X = (u) => W2 * 0.06 + u * W2 * 0.88, Y = (v) => H2 * 0.88 - v * H2 * 0.66;
      if (s.win) { c.fillStyle = "rgba(79,209,139,0.16)"; c.fillRect(X(0.3), 0, X(0.7) - X(0.3), H2); c.strokeStyle = "#4fd18b"; c.setLineDash([14, 10]); c.lineWidth = 4;
        for (const u of [0.3, 0.7]) { c.beginPath(); c.moveTo(X(u), 0); c.lineTo(X(u), H2); c.stroke(); } c.setLineDash([]);
        c.fillStyle = "#4fd18b"; c.font = `bold ${Math.round(H2 * 0.07)}px Arial`; c.textAlign = "center"; c.fillText("TESTED YEARS", X(0.5), H2 * 0.97); }
      const but = (u) => { const inside = u >= 0.3 && u <= 0.7; const off = inside || !s.win ? 0 : s.wild * (u < 0.3 ? (0.3 - u) * 2.2 : -(u - 0.7) * 2.4) * (1 + 0.4 * Math.sin(31 * u));
        return mkt(u) + s.gap * (0.13 * Math.sin(5 * u + 1) + 0.07 * Math.sin(17 * u)) + off; };
      const line = (fn, col, lw) => { const n = 140; c.lineJoin = c.lineCap = "round"; for (const [a, ww] of [["55", lw * 2.6], ["", lw]]) { c.strokeStyle = col + a; c.lineWidth = ww; c.beginPath();
        for (let i = 0; i <= n * s.t; i++) { const u = i / n; const xx = X(u), yy = Y(Math.max(-0.2, Math.min(1.25, fn(u)))); i ? c.lineTo(xx, yy) : c.moveTo(xx, yy); } c.stroke(); } };
      line(mkt, "#4fd18b", 8); line(but, "#ffd45a", 6);
      c.font = `bold ${Math.round(H2 * 0.075)}px Arial`; c.textAlign = "left"; c.fillStyle = "#4fd18b"; c.fillText("STOCK MARKET", W2 * 0.04, H2 * 0.1); c.fillStyle = "#ffd45a"; c.fillText("BUTTER, BANGLADESH", W2 * 0.04, H2 * 0.19);
      if (s.title) { c.textAlign = "right"; c.fillStyle = "#ffffff"; c.font = `bold ${Math.round(H2 * 0.16)}px Arial`; c.fillText(s.title, W2 * 0.96, H2 * 0.2); }
      tex.needsUpdate = true; };
    draw(); return { p, draw };
  };
  // a black-and-white cow (origin at its feet, facing +x); returns {g, head}
  const cow = (B, x, z, ry, s = 1) => { const g = B.grp(x, 0, z, ry, s);
    B.box(1.3, 0.62, 0.62, "#f8f6f0", 0, 0.62, 0, { in: g });
    for (const [px, py, pz, r] of [[-0.25, 1.0, 0.32, 0.18], [0.3, 0.8, -0.32, 0.16], [-0.45, 0.75, -0.32, 0.14], [0.2, 1.05, 0.32, 0.12]]) B.ball(r, "#2a2426", px, py, pz, { in: g, sz: 0.25 });
    for (const lx of [-0.5, 0.5]) for (const lz of [-0.22, 0.22]) B.box(0.14, 0.62, 0.14, "#f8f6f0", lx, 0, lz, { in: g });
    for (const lx of [-0.5, 0.5]) for (const lz of [-0.22, 0.22]) B.box(0.15, 0.1, 0.15, "#3a2a22", lx, 0, lz, { in: g });
    B.box(0.06, 0.5, 0.06, "#f8f6f0", -0.68, 0.72, 0, { in: g }); B.ball(0.07, "#2a2426", -0.68, 0.7, 0, { in: g });
    B.ball(0.12, "#f3a8b8", 0.05, 0.6, 0, { in: g, sy: 0.7 });
    const head = B.dyn(B.grp(0.72, 1.1, 0, 0, 1, g));
    B.box(0.42, 0.4, 0.38, "#f8f6f0", 0.12, 0, 0, { in: head }); B.box(0.2, 0.24, 0.36, "#f3b8c4", 0.36, -0.08, 0, { in: head });
    for (const sz of [-1, 1]) { B.ball(0.045, INK, 0.27, 0.08, sz * 0.12, { in: head }); B.ball(0.02, "#ffffff", 0.3, 0.1, sz * 0.12, { in: head }); B.cone(0.04, 0.16, "#e8dcc0", 0.05, 0.27, sz * 0.14, { in: head });
      B.box(0.06, 0.1, 0.18, "#2a2426", 0.0, 0.1, sz * 0.25, { in: head }); }
    return { g: B.dyn(g), head };
  };
  // a fluffy sheep (origin at its feet, facing +x)
  const sheep = (B, x, y, z, ry, s = 1, parent) => { const g = B.grp(x, y, z, ry, s, parent);
    for (const [px, py, pz, r] of [[0, 0.55, 0, 0.32], [-0.22, 0.6, 0.1, 0.24], [0.2, 0.62, -0.1, 0.24], [-0.15, 0.72, -0.12, 0.22], [0.12, 0.75, 0.12, 0.22], [-0.3, 0.5, -0.1, 0.2]]) B.ball(r, "#fbf8ef", px, py, pz, { in: g });
    for (const lx of [-0.18, 0.18]) for (const lz of [-0.12, 0.12]) B.box(0.08, 0.4, 0.08, "#2a2426", lx, 0, lz, { in: g });
    B.ball(0.16, "#2a2426", 0.4, 0.68, 0, { in: g, sx: 1.2 }); for (const sz of [-1, 1]) { B.ball(0.035, "#ffffff", 0.52, 0.74, sz * 0.08, { in: g }); B.ball(0.018, INK, 0.545, 0.74, sz * 0.08, { in: g }); B.box(0.05, 0.05, 0.14, "#2a2426", 0.36, 0.78, sz * 0.17, { in: g }); }
    return B.dyn(g);
  };
  // a block of butter in gold foil
  const butter = (B, x, y, z, s = 1, parent) => { const g = B.grp(x, y, z, 0, s, parent);
    B.box(1.0, 0.45, 0.55, BUT, 0, 0, 0, { in: g }); B.box(1.02, 0.2, 0.57, "#e0b030", 0, 0, 0, { in: g }); B.box(0.6, 0.12, 0.59, "#c99020", 0, 0.08, 0, { in: g });
    return B.dyn(g);
  };
  // a cheese wedge (triangular prism with holes)
  const cheese = (B, x, y, z, s = 1, parent) => { const g = B.grp(x, y, z, 0, s, parent);
    const w = B.cyl(0.6, 0.6, 0.5, CHE, 0, 0, 0, { in: g, seg: 3 }); w.rotation.y = PI / 6;
    for (const [px, py, pz] of [[0.1, 0.25, 0.27], [-0.15, 0.12, 0.2], [0.25, 0.4, 0.05]]) B.ball(0.06, "#c8861a", px, py, pz, { in: g });
    return B.dyn(g);
  };
  // striped "lucky" socks
  const socks = (B, parent) => { const g = B.grp(0, 0, 0, 0, 1, parent);
    for (const sx of [-0.09, 0.09]) { for (let i = 0; i < 4; i++) B.box(0.12, 0.09, 0.07, i % 2 ? "#ffffff" : RED, sx, -i * 0.09, 0, { in: g }); B.box(0.12, 0.08, 0.2, RED, sx, -0.36, 0.06, { in: g }); }
    return B.dyn(g);
  };
  // a night-city painting for the office window
  const skyline = (B) => canvasTex(B, 900, 600, (c, w, h) => { const gr = c.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, "#0e1a3a"); gr.addColorStop(1, "#3a2a5a"); c.fillStyle = gr; c.fillRect(0, 0, w, h);
    c.fillStyle = "#fff6c8"; c.beginPath(); c.arc(w * 0.82, h * 0.18, 34, 0, 7); c.fill(); let s = 7;
    const rr = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    for (let i = 0; i < 14; i++) { const bx = i * 68 - 10, bw = 50 + rr() * 30, bh = h * (0.3 + rr() * 0.5); c.fillStyle = ["#1c2448", "#232c56", "#18203e"][i % 3]; c.fillRect(bx, h - bh, bw, bh);
      c.fillStyle = "#ffd87a"; for (let yy = h - bh + 12; yy < h - 10; yy += 22) for (let xx = bx + 8; xx < bx + bw - 8; xx += 16) if (rr() > 0.45) c.fillRect(xx, yy, 7, 10); } });

  return {
    cast: {
      morty: { jacket: "#2f3d5c", pants: "#2a2f40", boots: "#1a1a22", hat: "hair", hair: "#5a3a22", skin: "#f2c9a4", buttons: "#c9a44a" },
      rina: { jacket: "#2f8a6a", pants: "#7a3a5a", boots: "#5a3a2a", hat: "hair", hair: "#1a1414", dress: "#e2783c", skin: "#b07a52" },
      fan: { jacket: "#2f3d5c", pants: "#2a2f40", boots: "#1a1a22", hat: "cap", cap: RED, skin: "#f2c9a4" },
      m2: { jacket: "#4a4a5a", pants: "#2a2a34", boots: "#1a1a22", hat: "hair", hair: "#b8b8c0", skin: "#c98a5a", moustache: "#b8b8c0", build: "stout" },
      m3: { jacket: "#6a3a3a", pants: "#2a2a34", boots: "#1a1a22", hat: "hair", hair: "#2a1a12", dress: "#6a3a3a", skin: "#f5d6b8" },
    },
    sets: {
      // the metaphor stage: butter-yellow, a giant butter block on a pedestal, the two-line chart, cheese and sheep piles
      stage: (B) => {
        B.set.stage({ floor: "#fbecc0", back: "#f2c14e" });
        B.prop.pedestal({ x: 0, z: 0.2, r: 1.0, h: 0.5, col: CREAM, trim: "#c9a44a" });
        H.bigButter = butter(B, 0, 0.72, 0.2, 1.6);
        H.chart = chart(B, 0, 3.1, -1.6, 3.4, 2.1);
        H.pct75 = hide(label(B, "75%", INK, BUT, 1.3, 0.62, -1.5, 4.55, -1.4, { edge: BUT }));
        H.pct99 = hide(label(B, "99%", INK, GREEN, 1.5, 0.7, 1.4, 4.55, -1.4, { edge: GREEN }));
        H.cheese = hide(cheese(B, -1.6, 0.25, 0.4, 1.4));
        H.sheep = []; for (let i = 0; i < 8; i++) H.sheep.push(hide(sheep(B, 1.2 + (i % 4) * 0.55, 0, 0.3 + Math.floor(i / 4) * 0.6, PI + 0.3 * (i % 3), 0.8)));
        H.joke = hide(label(B, "JUST A JOKE", RED, "#ffffff", 2.6, 0.7, 0, 1.75, 0.9, { edge: "#ffffff" }));
        H.warn = hide(label(B, "WARNING:\nDATA MINING", "#ffffff", RED, 2.2, 1.0, 0, 3.1, -1.5, { edge: RED }));
        B.lamp(0, 6, 3, "#fff0d8", 7, 16); B.lamp(-3, 3, 1, "#ffe0b0", 3, 10); B.lamp(3, 4, -2, "#fff4c8", 3, 9);
      },
      // a Bangladesh dairy yard at dawn: palms, a tin-roof shed, a wooden churn, a cow, butter pats on a banana leaf
      farm: (B) => {
        B.set.landscape({ kind: "farm", seed: 11, count: 18, clear: 7 });
        for (const [x, z] of [[-4.5, -5], [4.6, -4.5], [-6.5, -8], [6.8, -9], [2.5, -10]]) B.prop.tree({ x, z, kind: "palm" });
        const shed = B.grp(-2.4, 0, -3.6, 0.15, 1); B.box(3.0, 2.0, 2.0, "planks:#a8784a", 0, 0, 0, { in: shed }); B.box(3.4, 0.08, 2.5, "metal:#8aa0b0", 0, 2.1, 0.15, { in: shed }).rotation.x = 0.18;
        B.box(0.9, 1.5, 0.05, "#3a2a1e", 0.6, 0, 1.01, { in: shed });
        B.plate(1.6, 0.42, tt(B, "DAIRY", "#2f8a6a", CREAM, 1.6, 0.42), -0.6, 1.5, 1.03, { in: shed, d: 0.02, edge: CREAM });
        // the churn and the table of butter
        H.churn = B.grp(0.0, 0, -1.0, 0, 1); B.cyl(0.32, 0.38, 0.95, "planks:#9a6a3a", 0, 0, 0, { in: H.churn, seg: 18 }); for (const y of [0.2, 0.75]) B.cyl(0.39, 0.39, 0.05, "#5a4a3a", 0, y, 0, { in: H.churn, seg: 18 });
        H.dasher = B.dyn(B.grp(0, 0.95, 0, 0, 1, H.churn)); B.cyl(0.025, 0.025, 0.8, "#c8a070", 0, 0, 0, { in: H.dasher }); B.box(0.18, 0.04, 0.18, "#c8a070", 0, 0.8, 0, { in: H.dasher });
        B.box(1.4, 0.7, 0.8, "planks:#8a5a32", 1.4, 0, -1.4);
        B.box(1.1, 0.02, 0.6, "#3f9a4a", 1.4, 0.71, -1.4);
        H.pats = []; for (let i = 0; i < 3; i++) H.pats.push(butter(B, 1.05 + i * 0.34, 0.78, -1.4, 0.26));
        H.cow = cow(B, 3.2, -2.6, -0.5, 1.0);
        H.flock = []; for (let i = 0; i < 4; i++) H.flock.push(hide(sheep(B, -1.2 + i * 0.75, 0, -0.2 + (i % 2) * 0.4, -0.4 + 0.3 * i, 0.9)));
        H.fsign = B.prop.sign({ x: -3.6, y: 0, z: -1.6, text: "BANGLADESH", w: 1.6, h: 0.42, bg: CREAM, fg: "#2f6a4a", post: true, ry: 0.4 });
        H.hq = hide(label(B, "FORECAST HQ", INK, BUT, 1.8, 0.42, -1.6, 2.6, -2.4, { edge: BUT }));
        H.fence2 = B.prop.fence({ x: 0.6, z: 1.4, len: 5, col: "#c8b898" });
        B.lamp(2, 5, 4, "#ffe0b0", 4, 14);
      },
      // your office, top floor, night: a city skyline window, a desk with a nameplate, a lamp, a phone
      office: (B) => {
        B.set.room({ style: "office", wall: "panel:#2f3a4f", floor: "carpet:#3a3550", w: 8, d: 7, h: 3.6, door: false });
        B.plate(5.2, 2.6, skyline(B), 0, 1.95, -3.44, { d: 0.05, edge: "#1a1a22" });
        for (const x of [-1.3, 1.3]) B.box(0.08, 2.6, 0.08, "#1a1a22", x, 0.65, -3.38);
        B.prop.desk({ x: 0, z: -1.2, w: 2.4, col: "floor:#5a3a24" });
        B.plate(0.9, 0.24, tt(B, "MORTY · FUND MANAGER", "#c9a44a", INK, 0.9, 0.24), -0.55, 0.92, -0.72, { d: 0.04, edge: "#8a6a2a" });
        B.prop.lamp({ x: 0.95, y: 0.8, z: -1.4, kind: "desk" });
        H.phone = B.prop.phone({ x: 0.65, y: 0.8, z: -1.0 });
        H.folder = B.dyn(B.grp(0, 0.82, -0.95, 0, 1.25)); B.box(0.9, 0.02, 0.62, "#e2c25a", 0, 0, 0, { in: H.folder });
        B.plate(0.78, 0.5, canvasTex(B, 390, 250, (c, w, h) => { c.fillStyle = "#fbf6e6"; c.fillRect(0, 0, w, h); c.lineWidth = 6; c.lineJoin = "round";
          for (const [col, g] of [["#2f9a5a", 0], ["#e0a820", 1]]) { c.strokeStyle = col; c.beginPath(); for (let i = 0; i <= 60; i++) { const u = i / 60, v = mkt(u) + g * 0.04 * Math.sin(11 * u); const x = 16 + u * (w - 32), y = h - 20 - v * (h - 50); i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); } }),
          0, 0.012, 0, { in: H.folder, d: 0.005, edge: "#fbf6e6", rx: -PI / 2 });
        H.bigButter = hide(butter(B, 0, 0.8, -1.0, 0.9));
        B.prop.plant({ x: -3.3, z: -3.0 }); B.prop.shelf({ x: 3.1, z: -3.1, w: 1.2, h: 1.8 });
        B.lamp(0.9, 1.6, -0.8, "#ffd9a0", 3, 6); B.lamp(0, 3, 2, "#a8b8ff", 2, 10);
      },
      // the ballpark at sunset: bleachers, a scoreboard, light towers, a grass field
      ballpark: (B) => {
        B.box(60, 0.1, 40, "grass", 0, -0.1, -10);
        for (let r = 0; r < 4; r++) B.box(9, 0.45, 0.8, r % 2 ? "#2f5a9a" : "#3a6aaa", 0, r * 0.45, -1.4 - r * 0.8);
        for (let r = 0; r < 4; r++) B.box(9, 0.06, 0.82, "#d8d0c0", 0, r * 0.45 + 0.45, -1.4 - r * 0.8);
        const sb = B.grp(1.6, 0, -6.0, -0.15, 1); B.box(0.25, 3.0, 0.25, "#3a3e48", -1.2, 0, 0, { in: sb }); B.box(0.25, 3.0, 0.25, "#3a3e48", 1.2, 0, 0, { in: sb });
        B.box(3.4, 2.0, 0.3, "#1a2a20", 0, 3.0, 0, { in: sb });
        H.sbLines = ["GAME 1: LOST", "GAME 7: LOST", "GAME 12: LOST", "GAME 19: LOST"].map((s) => hide(label(B, s, "#0f1a14", "#ffd84a", 3.0, 0.8, 0, 4.3, 0.17, { in: sb, edge: "#0f1a14" })));
        H.sbWin = hide(label(B, "WIN!", "#0f1a14", "#4fd18b", 3.0, 1.4, 0, 4.0, 0.18, { in: sb, edge: "#0f1a14" }));
        H.sbTitle = label(B, "HOME TEAM", "#0f1a14", "#ffffff", 3.0, 0.5, 0, 4.72, 0.17, { in: sb, edge: "#0f1a14" });
        for (const x of [-7, 8]) { B.box(0.3, 8, 0.3, "#9aa0aa", x, 0, -9); B.box(2.0, 0.9, 0.3, "#e8ecf0", x, 8, -9); }
        H.fanSocks = socks(B);
        B.lamp(0, 5, 3, "#ffd0a0", 4, 14);
      },
      // the data archive: rows of labelled crates and filing cabinets, papers flying
      archive: (B) => {
        B.set.room({ style: "library", w: 10, d: 8, h: 4.2, door: false });
        B.prop.bulbSign({ x: 0, y: 3.2, z: -3.9, text: "UN DATABASE", w: 3.2, h: 0.6, bg: "#1a3a6a", fg: "#ffffff" });
        const names = ["RAINFALL", "TEA", "JUTE", "GOATS", "RICE", "COTTON", "SUGAR", "FISH", "TIN", "WOOL"];
        names.forEach((n, i) => { const x = -3.6 + (i % 5) * 1.8, y = Math.floor(i / 5) * 0.95, z = -3.1; B.prop.crate({ x, y, z, size: 0.9, col: "planks:#b88a52" });
          B.plate(0.8, 0.26, tt(B, n, CREAM, INK, 0.8, 0.26), x, y + 0.5, z + 0.47, { d: 0.01, edge: "#8a6a3a" }); });
        H.cBut = B.dyn(B.grp(-0.9, 0, -0.9, 0.1, 1)); B.prop.crate({ x: 0, y: 0, z: 0, size: 0.9, col: "planks:#d9a441", in: H.cBut }); B.plate(0.8, 0.26, tt(B, "BUTTER", BUT, INK, 0.8, 0.26), 0, 0.5, 0.47, { in: H.cBut, d: 0.01, edge: "#8a6a3a" });
        H.cRain = B.dyn(B.grp(0.9, 0, -0.9, -0.1, 1)); B.prop.crate({ x: 0, y: 0, z: 0, size: 0.9, col: "planks:#a87a4a", in: H.cRain }); B.plate(0.8, 0.26, tt(B, "RAINFALL", "#9ac8f0", INK, 0.8, 0.26), 0, 0.5, 0.47, { in: H.cRain, d: 0.01, edge: "#8a6a3a" });
        H.fits = hide(label(B, "FITS!", GREEN, "#ffffff", 0.8, 0.34, -0.9, 1.25, -0.4, { edge: "#ffffff" }));
        H.nope = hide(label(B, "NOPE", RED, "#ffffff", 0.8, 0.34, 0.9, 1.25, -0.4, { edge: "#ffffff" }));
        H.papers = []; for (let i = 0; i < 10; i++) H.papers.push(B.dyn(B.box(0.3, 0.01, 0.4, i % 2 ? "#fbf6e6" : "#eae2cc", 0, -2, 0)));
        B.lamp(0, 3.6, 0, "#ffe0b0", 4, 10); B.lamp(-3, 2.5, -2, "#ffd890", 2, 7);
      },
      // pure chance: a giant glass lottery drum full of numbered balls on a purple stage
      drum: (B) => {
        B.set.stage({ floor: "#3a2a5a", back: "#5a3a8a" });
        B.box(0.3, 1.6, 0.3, "#c9a44a", -1.5, 0, -0.6); B.box(0.3, 1.6, 0.3, "#c9a44a", 1.5, 0, -0.6);
        B.cyl(0.06, 0.06, 3.2, "#c9a44a", 0, 0.3, -0.6, { rz: PI / 2 });
        const glass = new B.THREE.MeshToonMaterial({ color: "#cfe8ff", transparent: true, opacity: 0.28 });
        B.ball(1.35, glass, 0, 1.9, -0.6, { cast: false });
        H.balls = B.dyn(B.grp(0, 1.9, -0.6, 0, 1));
        const cols = ["#e2453c", "#ffd84a", "#4fd18b", "#3f8fe0", "#f08a2c", "#c27ab8", "#ffffff"];
        for (let i = 0; i < 26; i++) { const a = i * 2.39996, r = 0.5 + 0.55 * ((i * 37) % 11) / 11, y = -0.8 + 1.4 * ((i * 53) % 13) / 13;
          B.ball(0.17, cols[i % cols.length], Math.cos(a) * r * 0.85, y * 0.75, Math.sin(a) * r * 0.85, { in: H.balls }); }
        B.box(0.5, 0.5, 1.6, "#c9a44a", 0, 0.25, 0.9).rotation.x = 0.1;
        H.winBall = hide(B.dyn(B.grp(0, 0.75, 1.3, 0, 1))); B.ball(0.32, BUT, 0, 0, 0, { in: H.winBall });
        H.match = hide(label(B, "PERFECT MATCH", INK, BUT, 2.0, 0.46, 0, 2.75, 0.7, { edge: BUT }));
        B.lamp(0, 5, 3, "#f0e0ff", 6, 14); B.lamp(0, 1.9, 1.2, "#fff4c8", 2, 4);
      },
    },
    shots: [
      // 0 · frame 0: a giant gold-foiled butter block drops onto the pedestal — THUD — the chart glows behind
      { set: "stage", f: 0, light: STAGE, cam: CAM.fit([0, 1.6, -0.4], { w: 3.6, a0: -22, a1: 6, e0: 2, e1: 8, push: 0.16 }),
        act: (S, u, f) => { const k = E.prog(f, 0, 8); H.bigButter.position.y = 0.72 + 3.4 * (1 - E.easeIn(k)); H.bigButter.scale.set(1.6 * (f >= 8 && f < 13 ? 1.12 : 1), 1.6 * (f >= 8 && f < 13 ? 0.82 : 1), 1.6);
          H.chart.draw({ t: E.ss(E.prog(f, 10, 50)), gap: 0.7 }); S.kick(8, 0.1); S.pop("puff", 8, 14, { x: 0, y: 0.6, z: 1.0, w: 2.6, h: 1.1 });
          S.pop("label", W(0, "forecast") - 2, 30, { x: 0, y: 4.55, z: -1.3, w: 1.6, h: 0.42, text: "BEST FORECAST", bg: INK, col: BUT, hold: true }); } },
      // 1 · ever found…: whip to the dairy yard at dawn — the churn pumps, a cow chews
      { set: "farm", word: [0, "found"], lead: 3, trans: "whip", dir: 1, light: "golden", cam: CAM.fit([0.6, 1.1, -1.6], { w: 5.2, a0: -16, a1: -6, elev: 7, push: 0.08 }),
        act: (S, u, f) => { H.dasher.position.y = 0.95 + 0.25 * Math.abs(Math.sin(f * 0.25)); H.cow.head.rotation.x = 0.08 * Math.sin(f * 0.4);
          S.actor("rina", { x: -0.55, z: -0.9, expr: "smile", prop: "hold", look: 0.5 }); } },
      // 2 · …ran on butter: insert — a fresh butter pat pops up on the banana leaf, sparkle
      { set: "farm", word: [0, "butter."], lead: 4, steady: true, coc: 11, light: "golden", cam: CAM.fit([1.4, 0.85, -1.4], { w: 1.4, a0: 14, a1: 4, elev: 18, push: 0.14 }),
        act: (S, u, f) => { const t = W(0, "butter."); H.pats.forEach((p, i) => pop(p, f, t - 4 + i * 4, 7, 0.26)); S.pop("sparks", t + 4, 14, { x: 1.4, y: 1.0, z: -1.2, w: 1.0, h: 1.0 });
          S.pop("word", t + 2, 26, { x: 1.4, y: 1.35, z: -1.2, w: 1.0, h: 0.42, text: "BUTTER", col: BUT }); } },
      // 3 · imagine: whip to your office, top floor at night — Morty at the desk
      { set: "office", beat: 1, trans: "whip", dir: -1, light: "night", cam: CAM.fit([0, 1.35, -1.6], { w: 2.4, a0: -14, a1: -4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.folder.position.x = 2.6; S.actor("morty", { x: 0, z: -1.75, expr: "neutral", look: 0.2 }); } },
      // 4 · a quant slides you one chart: the folder slides in from off-frame and stops in front of Morty
      { set: "office", word: [1, "slides"], lead: 4, light: "night", cam: CAM.fit([0.2, 1.0, -1.2], { w: 2.0, a0: 22, a1: 12, elev: 22, push: 0.1 }), coc: 9,
        act: (S, u, f) => { const k = E.easeOut(E.prog(f, W(1, "slides") - 2, W(1, "chart.") + 2)); H.folder.position.x = E.lerp(2.6, 0, k); H.folder.rotation.y = 0.5 * (1 - k);
          S.actor("morty", { x: 0, z: -1.75, expr: k > 0.9 ? "smile" : "neutral", look: 0.4 * (1 - k) }); S.fx("speed", { x: 0.9 * (1 - k) + 0.4, y: 0.9, z: -0.9, w: 0.6, h: 0.3, dir: -1 });
          S.pop("label", W(1, "chart.") + 2, 30, { x: 0, y: 1.25, z: -0.8, w: 0.9, h: 0.26, text: "ONE CHART", bg: CREAM, hold: true }); } },
      // 5 · push THROUGH the chart into the butter stage: the two lines draw, almost together
      { set: "stage", beat: 2, trans: "zoom", light: STAGE, cam: CAM.fit([0, 3.1, -1.6], { w: 3.9, a0: -6, a1: 4, elev: 0, push: 0.1 }),
        act: (S, u, f) => { H.chart.draw({ t: E.ss(E.prog(f, S.a, W(2, "explained") + 4)), gap: 0.7 });
          S.pop("ring", W(2, "Bangladesh") - 2, 18, { x: -0.8, y: 3.8, z: -1.3, w: 1.6, h: 0.6 }); } },
      // 6 · seventy-five percent: Morty in front of the stage, the 75% slams in
      { set: "stage", word: [2, "seventy-five"], lead: 3, trans: "smash", light: STAGE, cam: CAM.fit([-0.6, 2.6, -0.8], { w: 4.0, a0: -14, a1: -6, elev: 4, push: 0.08 }),
        act: (S, u, f) => { const t = W(2, "seventy-five"); H.chart.draw({ t: 1, gap: 0.7 }); H.pct75.visible = true; pop(H.pct75, f, t);
          S.actor("morty", { x: -1.4, z: 0.7, expr: "shock", prop: "point", look: 0.4 }); S.kick(t, 0.06);
          S.pop("sparks", t, 14, { x: -1.5, y: 4.5, z: -1.2, w: 1.8, h: 1.2 }); } },
      // 7 · add American cheese: a giant wedge drops beside the butter — PLOP
      { set: "stage", beat: 3, trans: "whip", dir: 1, light: STAGE, cam: CAM.fit([-0.7, 1.0, 0.3], { w: 3.6, a0: 18, a1: 8, elev: 8, push: 0.1 }),
        act: (S, u, f) => { H.pct75.visible = true; const t = W(3, "cheese,"); H.cheese.visible = f >= t - 8; const k = E.prog(f, t - 8, t); H.cheese.position.y = 0.25 + 3 * (1 - E.easeIn(k));
          S.kick(t, 0.07); S.pop("impact", t, 16, { x: -1.6, y: 1.4, z: 0.8, w: 0.9, h: 0.5, text: "PLOP!" });
          S.pop("label", t + 4, 40, { x: -1.6, y: 1.85, z: 0.6, w: 1.4, h: 0.3, text: "U.S. CHEESE", bg: CHE, hold: true }); } },
      // 8 · the lines got even tighter: close on the screen as they squeeze together
      { set: "stage", word: [3, "lines"], lead: 3, steady: true, light: STAGE, cam: CAM.fit([0, 3.1, -1.6], { w: 3.7, a0: 4, a1: 0, elev: 0, push: 0.12 }),
        act: (S, u, f) => { H.cheese.visible = true; const k = E.ss(E.prog(f, W(3, "lines"), W(3, "tighter.") + 6)); H.chart.draw({ t: 1, gap: E.lerp(0.7, 0.3, k) });
          S.pop("arrow", W(3, "tighter.") - 4, 24, { x: -1.3, y: 3.4, z: -1.3, w: 0.35, h: 0.5, dir: "down" }); S.pop("arrow", W(3, "tighter.") - 4, 24, { x: 1.3, y: 2.6, z: -1.3, w: 0.35, h: 0.5, dir: "up" }); } },
      // 9 · then he threw in sheep: whip to the yard — sheep tumble in, Rina laughs
      { set: "farm", beat: 4, trans: "whip", dir: -1, light: "golden", cam: CAM.fit([0.0, 0.9, -0.4], { w: 4.2, a0: 12, a1: 4, elev: 9, push: 0.1 }),
        act: (S, u, f) => { H.flock.forEach((s, i) => { const t0 = W(4, "sheep,") - 8 + i * 4; s.visible = f >= t0; const k = E.prog(f, t0, t0 + 10); s.position.y = 1.6 * (1 - E.easeIn(k)) + 0.08 * Math.abs(Math.sin((f - t0) * 0.3)) * (k >= 1 ? 1 : 0); });
          S.actor("rina", { x: -2.0, z: -1.0, expr: f > W(4, "sheep,") ? "laugh" : "smile", prop: f > W(4, "sheep,") ? "up" : "hold", look: 0.6 });
          S.pop("label", W(4, "Bangladeshi") - 2, 40, { x: 0.0, y: 2.0, z: -0.4, w: 1.9, h: 0.32, text: "BANGLADESHI SHEEP", bg: CREAM, hold: true }); } },
      // 10 · …and American, every last one: sheep rain down onto the stage
      { set: "stage", word: [4, "American,"], lead: 3, trans: "whip", dir: 1, light: STAGE, cam: CAM.fit([1.4, 1.2, 0.4], { w: 3.8, a0: -18, a1: -8, elev: 8, push: 0.08 }),
        act: (S, u, f) => { H.cheese.visible = true; H.pct75.visible = true; H.sheep.forEach((s, i) => { const t0 = S.a + i * 5; s.visible = f >= t0; const k = E.prog(f, t0, t0 + 9); s.position.y = 3.2 * (1 - E.easeIn(k)); if (f >= t0 + 9 && f < t0 + 12) S.kick(t0 + 9, 0.02); });
          S.pop("label", S.a + 2, 34, { x: 1.9, y: 2.3, z: 0.4, w: 1.7, h: 0.32, text: "AMERICAN SHEEP", bg: "#9ac8f0", hold: true });
          S.say("Baaa!", W(4, "every") , 30, { x: 2.5, y: 1.6, z: 0.9, w: 0.75, h: 0.4 }); } },
      // 11 · ninety-nine percent: the lines lock together, 99% slams in, confetti
      { set: "stage", beat: 5, trans: "smash", light: STAGE, cam: CAM.fit([0.2, 3.3, -1.5], { w: 4.2, a0: 8, a1: -4, elev: 2, push: 0.1 }),
        act: (S, u, f) => { const t = W(5, "Ninety-nine"); H.pct75.visible = true; H.pct99.visible = true; pop(H.pct99, f, t); H.chart.draw({ t: 1, gap: E.lerp(0.3, 0.02, E.ss(E.prog(f, S.a, t + 8))), });
          S.kick(t + 1, 0.08); S.pop("confetti", t + 2, 40, { x: 0, y: 3.6, z: -1.0, w: 4.0, h: 2.6, pop: false }); } },
      // 12 · a near-perfect forecast: Morty in the office, holding the chart up — "Genius!"
      { set: "office", word: [5, "near-perfect"], lead: 3, trans: "whip", dir: -1, light: "night", cam: CAM.fit([0, 1.5, -1.6], { w: 2.2, a0: 10, a1: 2, elev: 3, push: 0.12 }),
        act: (S, u, f) => { H.folder.position.set(0, 0.82, -0.95); S.actor("morty", { x: 0, z: -1.75, expr: "laugh", prop: "up", tilt: 4 * Math.sin(f * 0.4) });
          S.say("Genius!", S.a + 4, 34, { x: 0.55, y: AH + 0.65, z: -1.6, w: 0.9, h: 0.42 }); S.pop("stars", S.a + 6, 20, { x: -0.4, y: AH + 0.4, z: -1.5, w: 0.6, h: 0.6 }); } },
      // 13 · …from a farmyard: dissolve to the dairy yard wide — the shed is now FORECAST HQ, the cow moos
      { set: "farm", word: [5, "farmyard."], lead: 6, trans: "dissolve", light: "golden", cam: CAM.fit([-0.2, 1.4, -2.4], { w: 6.0, a0: -6, a1: 4, elev: 6, push: 0.08 }),
        act: (S, u, f) => { H.flock.forEach((s) => (s.visible = true)); H.hq.visible = true; pop(H.hq, f, W(5, "farmyard."));
          H.cow.head.rotation.z = 0.12 * Math.sin(f * 0.3); S.actor("rina", { x: -0.55, z: -0.9, expr: "grin", look: 0.4 });
          S.say("Moo.", W(5, "farmyard.") + 6, 26, { x: 3.7, y: 1.95, z: -2.4, w: 0.7, h: 0.38, tail: "left" }); } },
      // 14 · so why isn't every fund on earth watching cows? Suits peer over the fence at the cow — question marks
      { set: "farm", beat: 6, trans: "whip", dir: 1, light: "golden", cam: CAM.fit([1.6, 1.3, 0.6], { w: 4.6, a0: 28, a1: 18, elev: 5, push: 0.08 }),
        act: (S, u, f) => { H.flock.forEach((s) => (s.visible = true)); H.hq.visible = true; H.cow.head.rotation.y = 0.5 * E.ss(E.prog(f, W(6, "watching"), W(6, "cows?") + 6));
          S.actor("morty", { x: 0.1, z: 1.75, expr: "nervous", look: 0.7 }); S.actor("m2", { x: 1.1, z: 1.8, expr: "neutral", look: 0.6 }); S.actor("m3", { x: 2.1, z: 1.75, expr: "neutral", look: 0.4 });
          S.pop("question", W(6, "cows?") - 2, 40, { x: 1.1, y: AH + 0.65, z: 1.6, w: 0.45, h: 0.55, hold: true }); S.pop("question", W(6, "fund") , 40, { x: 0.1, y: AH + 0.65, z: 1.6, w: 0.4, h: 0.5, hold: true }); } },
      // 15 · because outside the years he tested: back on the stage, the tested window lights up and the butter line wanders off
      { set: "stage", beat: 7, trans: "whip", dir: -1, light: STAGE, cam: CAM.fit([0, 3.1, -1.6], { w: 3.9, a0: -4, a1: 4, elev: 0, push: 0.08 }),
        act: (S, u, f) => { H.cheese.visible = true; H.sheep.forEach((s) => (s.visible = true)); const k = E.ss(E.prog(f, W(7, "outside") - 2, W(7, "tested,") + 6)); H.chart.draw({ t: 1, gap: 0.02, win: true, wild: k }); } },
      // 16 · the magic died: the giant butter melts into a puddle — POOF, USELESS
      { set: "stage", word: [7, "magic"], lead: 4, trans: "cut", light: (u) => K.mixLight(STAGE, K.light("storm"), E.ss(u) * 0.6), cam: CAM.fit([0, 1.0, 0.2], { w: 2.8, a0: 10, a1: 2, elev: 10, push: 0.12 }),
        act: (S, u, f) => { H.cheese.visible = true; H.sheep.forEach((s) => (s.visible = true)); const t = W(7, "died."); const k = E.ss(E.prog(f, S.a, t + 4));
          H.bigButter.scale.set(1.6 * (1 + 0.5 * k), 1.6 * (1 - 0.82 * k), 1.6 * (1 + 0.5 * k)); H.bigButter.position.y = 0.72 - 0.2 * k;
          S.pop("puff", t, 18, { x: 0, y: 0.9, z: 0.8, w: 2.0, h: 1.0 }); S.kick(t, 0.06);
          S.pop("label", t + 1, 30, { x: 0, y: 1.6, z: 0.6, w: 1.4, h: 0.4, text: "USELESS", bg: RED, col: "#fff", hold: true }); } },
      // 17 · you see, it's like your lucky socks: whip to the ballpark — Morty in a cap holds up striped socks
      { set: "ballpark", beat: 8, trans: "whip", dir: 1, light: "sunset", cam: CAM.fit([0, 1.4, -0.4], { w: 2.4, a0: -14, a1: -4, elev: 4, push: 0.12 }),
        act: (S, u, f) => { S.actor("fan", { x: 0, z: -0.6, expr: "grin", prop: "up", look: 0.2 }); H.fanSocks.position.set(0.42, 2.05 + 0.04 * Math.sin(f * 0.5), -0.45); H.fanSocks.rotation.z = 0.15 * Math.sin(f * 0.3);
          S.pop("sparks", W(8, "lucky") - 2, 16, { x: 0.42, y: 1.95, z: -0.3, w: 0.8, h: 0.8 }); S.pop("label", W(8, "socks.") , 30, { x: -0.5, y: 2.2, z: -0.4, w: 1.1, h: 0.3, text: "LUCKY SOCKS", bg: RED, col: "#fff", hold: true }); } },
      // 18 · wear them to enough games: the scoreboard flips LOST, LOST, LOST; Morty slumps
      { set: "ballpark", beat: 9, trans: "dissolve", light: "sunset", cam: CAM.fit([0.8, 2.6, -3.4], { w: 5.2, a0: 10, a1: 2, elev: 0, push: 0.08 }),
        act: (S, u, f) => { const i = Math.min(3, Math.floor((f - S.a) / 12)); H.sbLines.forEach((p, j) => (p.visible = j === i)); H.fanSocks.position.set(0.42, 1.25, -0.45);
          S.actor("fan", { x: 0, z: -0.6, expr: "pained", prop: "chin" }); } },
      // 19 · …and some day your team wins anyway: WIN! — Morty jumps, "It's the socks!"
      { set: "ballpark", word: [9, "team"], lead: 3, trans: "smash", light: "sunset", cam: CAM.fit([0.6, 2.2, -2.4], { w: 4.6, a0: -10, a1: -2, elev: 2, push: 0.1 }),
        act: (S, u, f) => { const t = W(9, "wins"); H.sbLines.forEach((p) => (p.visible = false)); H.sbWin.visible = f >= t - 2; if (f >= t - 2) pop(H.sbWin, f, t - 2);
          S.actor("fan", { x: 0, z: -0.6, expr: f >= t ? "laugh" : "pained", prop: f >= t ? "up" : "chin", tilt: f >= t ? 5 * Math.sin(f * 0.5) : 0 }); H.fanSocks.position.set(0.42, f >= t ? 2.05 : 1.25, -0.45);
          S.pop("confetti", t, 40, { x: 0.6, y: 3.2, z: -1.5, w: 4, h: 2.4, pop: false }); S.say("It's the socks!", t + 6, 30, { x: -0.55, y: AH + 0.7, z: -0.4, w: 1.4, h: 0.45, tail: "right" }); } },
      // 20 · he'd dug through a UN database: whip to the archive — papers fly out of a crate behind the stacks
      { set: "archive", beat: 10, trans: "whip", dir: -1, light: "lamp", cam: CAM.fit([0, 1.6, -2.4], { w: 5.4, a0: 12, a1: 2, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.papers.forEach((p, i) => { const t0 = S.a + i * 5, k = E.prog(f, t0, t0 + 22); p.visible = k > 0 && k < 1; p.position.set(-0.9 + 1.8 * k * Math.cos(i * 1.7), 0.6 + 2.2 * Math.sin(PI * k), -0.9 + 0.8 * k * Math.sin(i * 2.3)); p.rotation.set(f * 0.2 + i, f * 0.15, i); });
          S.pop("puff", S.a + 4, 20, { x: -0.9, y: 0.6, z: -0.5, w: 1.2, h: 0.8, pop: false }); S.pop("puff", S.a + 30, 20, { x: 0.9, y: 0.6, z: -0.5, w: 1.2, h: 0.8, pop: false }); } },
      // 21 · …and kept whatever fit the past: BUTTER gets a green FITS!, RAINFALL gets NOPE and topples
      { set: "archive", word: [10, "kept"], lead: 3, light: "lamp", cam: CAM.fit([0, 0.9, -0.9], { w: 2.9, a0: -10, a1: 0, elev: 8, push: 0.12 }), coc: 9,
        act: (S, u, f) => { const t = W(10, "kept"); H.fits.visible = f >= t; pop(H.fits, f, t); const t2 = W(10, "past.") - 4; H.nope.visible = f >= t2; pop(H.nope, f, t2);
          H.cRain.rotation.z = -1.2 * E.easeIn(E.prog(f, t2 + 4, t2 + 14)); H.cRain.position.x = 0.9 + 0.4 * E.prog(f, t2 + 4, t2 + 14);
          S.pop("stars", t + 2, 18, { x: -0.9, y: 1.1, z: -0.3, w: 0.7, h: 0.7 }); } },
      // 22 · search enough numbers: push through into the lottery drum — balls tumble
      { set: "drum", beat: 11, trans: "zoom", light: DRUM, cam: CAM.fit([0, 1.9, -0.6], { w: 3.4, a0: -10, a1: 8, elev: 3, push: 0.1 }),
        act: (S, u, f) => { H.balls.rotation.set(f * 0.11, f * 0.07, f * 0.05); S.pop("label", W(11, "numbers,") - 2, 34, { x: 0, y: 3.65, z: -0.4, w: 1.8, h: 0.34, text: "ENOUGH NUMBERS", bg: BUT, hold: true }); } },
      // 23 · pure chance hands you a perfect match: one golden ball pops out and rolls to the front
      { set: "drum", word: [11, "hands"], lead: 3, trans: "cut", light: DRUM, cam: CAM.fit([0, 1.4, 0.3], { w: 2.6, a0: 14, a1: 4, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.balls.rotation.set(f * 0.11, f * 0.07, f * 0.05); const t = W(11, "hands"), k = E.easeOut(E.prog(f, t, t + 14)); H.winBall.visible = true; H.winBall.position.set(0, 0.75 + 0.1 * Math.sin(PI * k), 0.6 + 0.9 * k);
          const tm = W(11, "perfect"); H.match.visible = f >= tm - 2; pop(H.match, f, tm - 2); S.pop("sparks", tm, 16, { x: 0, y: 1.0, z: 1.5, w: 1.2, h: 1.2 }); } },
      // 24 · the whole thing was a joke (music stops): the chart is stamped JUST A JOKE, Morty's jaw drops
      { set: "stage", beat: 12, trans: "flash", light: K.light("storm"), cam: CAM.fit([0.3, 2.0, 0.3], { w: 3.8, a0: -8, a1: 2, elev: 4, push: 0.12, roll: 2 }),
        act: (S, u, f) => { H.cheese.visible = true; H.sheep.forEach((s) => (s.visible = true)); H.bigButter.scale.set(2.4, 0.3, 2.4); H.bigButter.position.y = 0.52; H.chart.draw({ t: 1, gap: 0.02, win: true, wild: 1 });
          const t = W(12, "joke,"); H.joke.visible = f >= t - 2; pop(H.joke, f, t - 2); S.kick(t, 0.07);
          S.actor("morty", { x: 1.0, z: 1.0, expr: f >= t ? "shock" : "neutral", look: -0.5 }); } },
      // 25 · built to warn investors: the WARNING: DATA MINING sign drops over the chart
      { set: "stage", word: [12, "warn"], lead: 4, steady: true, light: K.light("storm"), cam: CAM.fit([0, 3.1, -1.4], { w: 3.4, a0: 4, a1: -2, elev: 0, push: 0.14 }),
        act: (S, u, f) => { H.chart.draw({ t: 1, gap: 0.02, win: true, wild: 1 }); const t = W(12, "warn"); H.warn.visible = true; H.warn.position.y = 3.1 + 2.5 * (1 - E.easeIn(E.prog(f, t - 4, t + 3))); S.kick(t + 3, 0.05);
          S.pop("exclaim", t + 6, 30, { x: 1.4, y: 3.9, z: -1.2, w: 0.3, h: 0.5, hold: true }); } },
      // 26 · and investors still called him: the office, Morty on the phone — "Latest butter numbers?"
      { set: "office", beat: 13, trans: "whip", dir: 1, light: "night", cam: CAM.fit([0.2, 1.4, -1.5], { w: 2.4, a0: -16, a1: -6, elev: 3, push: 0.12 }),
        act: (S, u, f) => { H.folder.position.set(0, 0.82, -0.95); H.phone.position.set(0.32, 1.42 + 0.01 * Math.sin(f), -1.6); H.phone.rotation.z = 0.5;
          S.actor("morty", { x: 0, z: -1.75, expr: "grin", prop: "hold", look: 0.3 }); S.pop("ring", S.a + 2, 14, { x: 0.65, y: 1.0, z: -1.0, w: 0.5, h: 0.4 });
          S.say("Latest butter numbers?", W(13, "asking") - 6, 60, { x: -0.3, y: AH + 0.72, z: -1.5, w: 1.6, h: 0.5, tail: "right" }); } },
      // 27 · …butter numbers: SPLAT — a giant butter block slams onto the desk on the last word
      { set: "office", word: [13, "butter"], lead: 3, trans: "smash", light: "night", cam: CAM.fit([0, 1.1, -1.2], { w: 2.6, a0: 8, a1: 2, elev: 10, push: 0.06 }),
        act: (S, u, f) => { const t = W(13, "numbers."); H.bigButter.visible = true; H.bigButter.position.x = 0.5; const k = E.prog(f, t - 6, t); H.bigButter.position.y = 0.8 + 2.4 * (1 - E.easeIn(k));
          H.bigButter.scale.set(0.9 * (f >= t && f < t + 5 ? 1.15 : 1), 0.9 * (f >= t && f < t + 5 ? 0.78 : 1), 0.9); H.folder.visible = false;
          S.actor("morty", { x: -0.5, z: -1.75, expr: f >= t ? "dazed" : "grin", prop: f >= t ? "shrug" : "hold" }); S.kick(t, 0.12);
          S.pop("impact", t, 22, { x: 0.55, y: 1.45, z: -0.6, w: 1.1, h: 0.55, text: "SPLAT!" }); S.pop("puff", t, 16, { x: 0.5, y: 0.95, z: -0.6, w: 1.8, h: 0.8 }); } },
    ],
  };
};
