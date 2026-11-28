// "The Locked Box" — the 1911 Standard Oil breakup. On May 15, 1911 the Supreme Court ordered Standard Oil split up
// (six months to do it); it became 34 companies and every shareholder got a pro-rata slice of each. Rockefeller owned
// about a quarter. Two years later the pieces were worth about twice the old whole and his fortune had tripled: the
// secretive giant had been a locked box, and the breakup made investors look inside and price every piece.
// Worlds: a burnt-orange metaphor stage (a giant oil drum smashed by a mallet into 34 small drums that later grow and
// get price tags), a 1911 refinery yard (white storage tanks, smokestacks, pipe racks, barrels, a PRIVATE gate), an
// Edwardian investor's parlor (mauve wallpaper, armchair, framed share certificate, newspaper, hourglass), Rockefeller's
// panelled office (desk, ticker, pie-chart easel, money bags), a suburban yard sale (the analogy: a locked red toolbox),
// and a navy vault stage with a giant chained STANDARD OIL chest whose lid blasts open on the last word.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const H = {};
  const PI = Math.PI;
  const AH = 1.55;
  const GOLD = "#f2c14e", INK = "#1d1a26", CREAM = "#f4ecd6", RED = "#c8352e", GREEN = "#2f6a4a", ORANGE = "#d8743a", NAVY = "#1b2440";
  const STAGE = K.backdrop(ORANGE);
  const VAULT = K.backdrop(NAVY);

  const tt = (B, s, bg, fg, pw, ph, font = "Georgia") => { const w = 1024, h = Math.round((1024 * ph) / pw), cv = document.createElement("canvas"); cv.width = w; cv.height = h; const g = cv.getContext("2d");
    g.fillStyle = bg; g.fillRect(0, 0, w, h); g.strokeStyle = fg; g.lineWidth = Math.max(6, Math.min(16, h * 0.06)); g.strokeRect(10, 10, w - 20, h - 20);
    const lines = s.split("\n"); let fs = Math.round((h * 0.56) / lines.length); g.font = `bold ${fs}px ${font}`;
    const mw = Math.max(...lines.map((l) => g.measureText(l).width)); if (mw > w * 0.86) fs = Math.floor((fs * w * 0.86) / mw);
    g.font = `bold ${fs}px ${font}`; g.fillStyle = fg; g.textAlign = "center"; g.textBaseline = "middle";
    lines.forEach((l, i) => g.fillText(l, w / 2, h / 2 + (i - (lines.length - 1) / 2) * fs * 1.12 + 4));
    const t = new B.THREE.CanvasTexture(cv); t.colorSpace = B.THREE.SRGBColorSpace; return t; };
  const hide = (o) => { o.visible = false; if (o.userData && o.userData.base) o.userData.base.v = false; return o; };
  const live = (B, w, h, x, y, z, paint, o = {}) => { const cv = document.createElement("canvas"); cv.width = 768; cv.height = Math.round((768 * h) / w);
    const tex = new B.THREE.CanvasTexture(cv); tex.colorSpace = B.THREE.SRGBColorSpace; const p = B.dyn(B.plate(w, h, tex, x, y, z, { d: 0.04, edge: o.frame ?? "#1a1a22", ...o }));
    let key = ""; const draw = (q = {}) => { const k = JSON.stringify(q); if (k === key) return; key = k; paint(cv.getContext("2d"), cv.width, cv.height, q); tex.needsUpdate = true; };
    draw(o.init ?? {}); return { p, draw }; };

  // newspaper front page: q.h = headline on
  const paperPaint = (c, w, h, q) => { c.fillStyle = "#f2ede0"; c.fillRect(0, 0, w, h); c.fillStyle = INK; c.textAlign = "center"; c.textBaseline = "middle";
    c.font = `bold ${Math.round(h * 0.09)}px Georgia`; c.fillText("THE DAILY TICKER", w / 2, h * 0.09); c.fillRect(30, h * 0.16, w - 60, 6);
    c.font = `italic ${Math.round(h * 0.045)}px Georgia`; c.fillText("May 16, 1911", w / 2, h * 0.21);
    if (q.h) { c.font = `bold ${Math.round(h * 0.11)}px Georgia`; c.fillStyle = RED; c.fillText("STANDARD OIL", w / 2, h * 0.36); c.fillStyle = INK; c.fillText("MUST SPLIT UP", w / 2, h * 0.49); }
    c.fillStyle = "#8a8478"; for (let i = 0; i < 8; i++) { c.fillRect(40, h * (0.6 + i * 0.045), w * 0.4, 8); c.fillRect(w * 0.53, h * (0.6 + i * 0.045), w * 0.42, 8); } };
  // pie chart: q.k = how much of the gold quarter is drawn
  const piePaint = (c, w, h, q) => { c.fillStyle = "#f4efe2"; c.fillRect(0, 0, w, h); const cx = w / 2, cy = h * 0.47, r = Math.min(w, h) * 0.36;
    c.fillStyle = "#3a4a6a"; c.beginPath(); c.arc(cx, cy, r, 0, PI * 2); c.fill();
    const k = q.k ?? 0; if (k > 0) { c.fillStyle = GOLD; c.beginPath(); c.moveTo(cx, cy); c.arc(cx, cy, r * (1 + 0.06 * k), -PI / 2, -PI / 2 + (PI / 2) * k); c.closePath(); c.fill(); }
    c.strokeStyle = INK; c.lineWidth = 8; c.beginPath(); c.arc(cx, cy, r, 0, PI * 2); c.stroke();
    c.fillStyle = INK; c.font = `bold ${Math.round(h * 0.075)}px Georgia`; c.textAlign = "center"; c.fillText("WHO OWNS IT", cx, h * 0.92); };

  // the 34 small drums: grid positions (6 x 6 minus two corners)
  const GRID = []; for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) { if ((r === 0 && c === 0) || (r === 0 && c === 5)) continue; GRID.push([(c - 2.5) * 0.78, (r - 3.2) * 0.78]); }
  const PRICES = ["$8", "$12", "$5", "$9", "$15", "$7", "$11", "$6", "$10", "$14", "$9", "$8", "$13", "$5", "$7", "$12", "$9", "$16", "$6", "$10", "$8", "$11", "$7", "$13", "$9", "$5", "$12", "$8", "$10", "$6", "$14", "$9", "$7", "$11"];
  const drumsAt = (k, s = 1) => H.drums.forEach((d, i) => { const [gx, gz] = GRID[i], kk = E.clamp ? E.clamp(k * 1.4 - i * 0.012, 0, 1) : Math.max(0, Math.min(1, k * 1.4 - i * 0.012)), e = E.easeOut(kk);
    d.visible = k > 0; d.position.set(gx * e, 1.0 * (1 - e) + 1.6 * Math.sin(PI * e), gz * e); d.rotation.set(2.5 * (1 - e) * (i % 2 ? 1 : -1), 0, 1.8 * (1 - e)); d.scale.setScalar(s); });
  const drumsGrid = (s = 1) => H.drums.forEach((d, i) => { d.visible = true; d.position.set(GRID[i][0] * (0.6 + 0.4 * s), 0, GRID[i][1] * (0.6 + 0.4 * s)); d.rotation.set(0, 0, 0); d.scale.setScalar(s); });

  return {
    cast: {
      you: { jacket: "#5a3a6a", pants: "#3a3f52", boots: "#3a2418", hat: "bowler", skin: "#f0c8a0", buttons: "#c9c9d0", moustache: "#5a3a24" },
      rock: { jacket: "#22232c", pants: "#22232c", boots: "#141418", hat: "hair", hair: "#e6e2da", skin: "#f2d2b4", buttons: GOLD },
      gus: { jacket: "#c08a3a", pants: "#3a5a8a", boots: "#3a2418", hat: "cap", cap: "#2f6a4a", skin: "#e2b48c", buttons: "#f4efe2", build: "stout" },
      b1: { jacket: "#3f8a7a", pants: "#3b3f52", boots: "#5a3b2a", hat: "hair", hair: "#5a3b2a", dress: "#c25a7a", skin: "#ffe2c2" },
      b2: { jacket: "#8a3b2a", pants: "#3a3028", boots: "#141418", hat: "bowler", skin: "#d8a878" },
    },
    sets: {
      // metaphor stage: burnt orange void, a giant oil drum, a mallet above it, 34 small drums, a two-bar chart off to the side
      smash: (B) => {
        B.set.stage({ floor: "#f0e0c4", back: ORANGE });
        H.big = B.dyn(B.grp(0, 0, 0, 0, 1)); B.cyl(1.15, 1.15, 2.5, "#22252e", 0, 0, 0, { in: H.big, seg: 32 }); for (const y of [0.3, 2.2]) B.cyl(1.18, 1.18, 0.1, "#3a3e48", 0, y, 0, { in: H.big, seg: 32 });
        B.plate(1.6, 0.6, tt(B, "STANDARD\nOIL", "#f4efe2", INK, 1.6, 0.6), 0, 1.3, 1.17, { in: H.big, d: 0.02, edge: INK });
        H.mallet = B.dyn(B.grp(0, 6, 0, 0, 1)); B.box(2.0, 0.9, 0.95, "westwood:#7a4a2c", 0, 0, 0, { in: H.mallet }); for (const x of [-0.92, 0.92]) B.box(0.14, 0.96, 1.0, "metal:#5a5e66", x, -0.03, 0, { in: H.mallet }); B.cyl(0.11, 0.11, 3.2, "westwood:#c08a5a", 0, 0.9, 0, { in: H.mallet, seg: 10 });
        H.drums = []; H.tags = []; H.certs = [];
        GRID.forEach((g, i) => { const d = B.dyn(B.grp(g[0], 0, g[1], 0, 1)); B.cyl(0.27, 0.27, 0.62, "#22252e", 0, 0, 0, { in: d, seg: 16 }); B.cyl(0.28, 0.28, 0.07, ORANGE, 0, 0.42, 0, { in: d, seg: 16 }); H.drums.push(hide(d));
          const t = B.dyn(B.plate(0.36, 0.22, tt(B, PRICES[i], "#ffffff", GREEN, 0.36, 0.22, "Arial"), 0, 0.95, 0.05, { in: d, d: 0.01, edge: GREEN })); H.tags.push(hide(t));
          const c = B.dyn(B.plate(0.3, 0.2, tt(B, "1 SHARE", CREAM, "#3a5a3a", 0.3, 0.2), 0, 0.72, 0, { in: d, d: 0.01, edge: "#3a5a3a", rx: -0.5 })); H.certs.push(hide(c)); });
        H.bars = B.prop.bars3d({ x: 5.2, z: 1.2, vals: [0.42, 0.84], cols: ["#3a4a6a", GOLD], bw: 0.8, gap: 0.5, h: 3.0 }); hide(H.bars);
        H.barL = B.dyn(B.plate(0.9, 0.3, tt(B, "1911", "#ffffff", INK, 0.9, 0.3, "Arial"), 4.55, 0.25, 1.75, { d: 0.02 })); hide(H.barL);
        H.barR = B.dyn(B.plate(0.9, 0.3, tt(B, "1913", "#ffffff", INK, 0.9, 0.3, "Arial"), 5.85, 0.25, 1.75, { d: 0.02 })); hide(H.barR);
        B.lamp(0, 7, 4, "#fff0dc", 7, 18); B.lamp(-3, 3, 2, "#ffd8b0", 3, 10);
      },
      // a 1911 refinery yard: white storage tanks, smokestacks, a pipe rack, rows of barrels, a PRIVATE gate
      refinery: (B) => {
        B.set.landscape({ kind: "meadow", count: 10, clear: 18, seed: 11 });
        B.box(40, 0.04, 30, "dirt", 0, 0, -6, { cast: false });
        for (const [x, z, r] of [[-5.5, -9, 2.0], [-1.2, -11, 2.4], [3.6, -9.5, 2.1], [7.6, -12, 2.3]]) { B.cyl(r, r, 4.2, "metal:#e6e2d8", x, 0, z, { seg: 28 }); B.ball(r, "metal:#d8d4ca", x, 4.2, z, { sy: 0.28, seg: 24 });
          B.box(0.12, 4.4, 0.12, "#5a5e66", x + r * 0.7, 0, z + r * 0.72); }
        B.plate(2.6, 0.7, tt(B, "S.O. No. 1", "#e6e2d8", "#8a2a2a", 2.6, 0.7), -1.2, 2.6, -8.62, { d: 0.02, edge: "#e6e2d8" });
        for (const [x, h] of [[-8.5, 9], [10.5, 10], [5.8, 8]]) { B.cyl(0.45, 0.6, h, "brick:#7a3a2a", x, 0, -15, { seg: 12 }); B.cyl(0.5, 0.5, 0.3, "#2a2a2e", x, h, -15, { seg: 12 }); }
        for (const y of [1.6, 2.2]) B.cyl(0.14, 0.14, 16, "metal:#7a6a5a", 0, y, -5.4, { rz: PI / 2, seg: 10 });
        for (const x of [-7, -3.5, 0, 3.5, 7]) B.box(0.15, 2.4, 0.15, "#4a4e56", x, 0, -5.4);
        H.barrels = []; for (let i = 0; i < 10; i++) { const b = B.prop.barrel({ x: -3.15 + i * 0.7, z: 0.4, col: i === 9 ? "planks:#8a5a34" : "#2a3f5a" }); H.barrels.push(b); }
        B.prop.sign({ x: -4.2, z: -3.2, w: 3.0, h: 0.62, text: "STANDARD OIL CO. · REFINERY", bg: "#f4efe2", fg: "#8a2a2a", post: true });
        // the private gate
        B.prop.fence({ x: 6.2, z: -2.5, len: 4, col: "#5a5e66" }); H.gate = B.dyn(B.grp(6.2, 0, -2.45, 0, 1)); B.box(1.2, 1.6, 0.08, "metal:#4a4e56", 0, 0, 0, { in: H.gate });
        B.plate(1.5, 0.5, tt(B, "PRIVATE\nKEEP OUT", RED, "#ffffff", 1.5, 0.5, "Arial"), 6.2, 1.85, -2.38, { d: 0.03, edge: INK }); B.box(0.18, 0.22, 0.08, GOLD, 6.75, 0.85, -2.36);
        B.lamp(0, 5, 2, "#ffe6b8", 4, 18);
      },
      // an Edwardian investor's parlor: mauve wallpaper, armchair, framed share certificate, side table, newspaper, hourglass
      parlor: (B) => {
        B.set.room({ style: "home", w: 8, d: 6.5, h: 3.8, door: false, wall: "wallpaper:#8a5a7a", windows: [-2.6] });
        B.prop.rug({ x: 0, z: -0.8, w: 3.4, d: 2.4, col: "#7a2a3a" });
        H.chair = B.dyn(B.grp(0, 0, -1.6, 0, 1)); B.box(1.1, 0.5, 0.9, "carpet:#8a2a2a", 0, 0, 0, { in: H.chair }); B.box(1.1, 1.2, 0.22, "carpet:#8a2a2a", 0, 0.4, -0.38, { in: H.chair }); for (const x of [-0.5, 0.5]) B.box(0.16, 0.75, 0.9, "carpet:#7a2222", x, 0, 0, { in: H.chair });
        B.prop.table({ x: 1.35, z: -1.4, w: 0.7, d: 0.6, h: 0.7, col: "floor:#5a3420" }); H.glass = B.prop.hourglass({ x: 1.35, y: 0.7, z: -1.4, size: 0.5 });
        H.cert = live(B, 1.5, 1.0, 1.4, 2.25, -3.18, (c, w, h, q) => { c.fillStyle = CREAM; c.fillRect(0, 0, w, h); c.strokeStyle = "#3a6a3a"; c.lineWidth = 18; c.strokeRect(20, 20, w - 40, h - 40);
          c.fillStyle = "#3a6a3a"; c.textAlign = "center"; c.textBaseline = "middle"; c.font = `bold ${Math.round(h * 0.15)}px Georgia`; c.fillText("STANDARD OIL CO.", w / 2, h * 0.33); c.font = `italic ${Math.round(h * 0.11)}px Georgia`; c.fillText("One Share", w / 2, h * 0.55);
          c.fillStyle = RED; c.beginPath(); c.arc(w * 0.8, h * 0.76, h * 0.08, 0, 7); c.fill(); }, { frame: "#b08a3a" });
        H.news = live(B, 0.7, 0.95, 0.0, 1.0, -0.9, paperPaint, { init: {}, frame: "#d8d0c0" }); hide(H.news.p);
        H.fan = []; for (let i = 0; i < 34; i++) { const a = -1.25 + (2.5 * i) / 33, p = B.dyn(B.plate(0.32, 0.21, tt(B, "1 SHARE", CREAM, "#3a5a3a", 0.32, 0.21), Math.sin(a) * 1.05, 1.55 + Math.cos(a) * 0.9, -1.2 + (i % 2) * 0.04, { d: 0.01, edge: "#3a5a3a" })); p.rotation.z = -a * 0.8; H.fan.push(hide(p)); }
        B.prop.lamp({ kind: "floor", x: -1.4, z: -2.2, glow: "#ffd8a0", intensity: 4 });
        B.lamp(0, 3.0, 1.5, "#ffe2b8", 4, 10);
      },
      // Rockefeller's panelled office: desk, ticker machine, clock, pie-chart easel, three money bags
      office: (B) => {
        B.set.room({ style: "office", w: 8, d: 6.5, h: 3.8, door: false, wall: "panel:#5a3a26", windows: [2.6] });
        B.prop.desk({ x: 0, z: -1.3, w: 2.2, col: "floor:#4a2e1c" }); H.tick = B.prop.telegraph({ x: -0.6, y: 0.81, z: -1.3 });
        B.prop.clock({ x: -2.4, y: 2.7, z: -3.2, r: 0.4, time: 10.2 });
        B.plate(2.4, 0.5, tt(B, "STANDARD OIL CO.", "#2a1a12", GOLD, 2.4, 0.5), -0.2, 2.75, -3.2, { d: 0.03, edge: GOLD });
        H.easel = B.dyn(B.grp(1.75, 0, -1.6, -0.35, 1)); for (const x of [-0.5, 0.5]) B.box(0.06, 1.9, 0.06, "#5a3a24", x, 0, 0, { in: H.easel });
        H.pie = live(B, 1.2, 1.2, 1.75, 1.55, -1.55, piePaint, { init: {}, frame: "#5a3a24", ry: -0.35 });
        H.bags = [0, 1, 2].map((i) => { const g = B.dyn(B.grp(0.25 + i * 0.42, 0.81, -1.25, 0, 1)); B.prop.moneyBag({ x: 0, z: 0, size: 0.42, in: g }); return hide(g); });
        B.lamp(0, 3.0, 1.0, "#fff0d8", 4, 10);
      },
      // the analogy: a sunny yard sale, a house behind, two tables, a locked red toolbox
      yard: (B) => {
        B.set.landscape({ kind: "meadow", count: 14, clear: 9, seed: 4 });
        B.facade({ style: "village", w: 8, x: 0, z: -7.5, sign: "" }); B.prop.fence({ x: -6.5, z: -4, len: 6 }); B.prop.tree({ x: 5.5, z: -4.5, kind: "oak" });
        B.prop.sign({ x: -2.6, z: -1.2, w: 1.6, h: 0.5, text: "YARD SALE", bg: "#ffe06a", fg: RED, post: true });
        B.prop.table({ x: 0, z: -1.6, w: 2.0, d: 0.9, h: 0.8, col: "planks:#c8a878" }); B.prop.table({ x: 2.4, z: -1.9, w: 1.4, d: 0.8, h: 0.8, col: "planks:#c8a878" });
        B.prop.lamp({ kind: "desk", x: 2.1, y: 0.8, z: -1.9, light: false }); B.prop.bottle({ x: 2.7, y: 0.8, z: -1.8 }); B.prop.globe({ x: 2.6, y: 0.8, z: -2.1, s: 0.6 });
        H.tbox = B.dyn(B.grp(-0.2, 0.8, -1.6, 0, 1)); B.box(0.9, 0.42, 0.45, RED, 0, 0, 0, { in: H.tbox }); B.box(0.5, 0.05, 0.05, "#2a2a2e", 0, 0.62, 0, { in: H.tbox }); for (const x of [-0.25, 0.25]) B.box(0.05, 0.2, 0.05, "#2a2a2e", x, 0.42, 0, { in: H.tbox });
        H.tlid = B.dyn(B.grp(0, 0.42, -0.23, 0, 1, H.tbox)); B.box(0.92, 0.1, 0.47, "#a82a24", 0, 0, 0.23, { in: H.tlid });
        H.lock = B.dyn(B.grp(0, 0.3, 0.24, 0, 1, H.tbox)); B.box(0.14, 0.14, 0.05, GOLD, 0, 0, 0, { in: H.lock }); B.box(0.1, 0.1, 0.03, "#8a6a2a", 0, 0.12, 0, { in: H.lock });
        H.price0 = B.dyn(B.plate(0.4, 0.24, tt(B, "$2", "#ffffff", RED, 0.4, 0.24, "Arial"), 0.45, 1.35, -1.35, { d: 0.01, edge: INK })); hide(H.price0);
        // the tools laid out, each with a tag
        H.tools = []; const TL = [["#5a5e66", 0.45, 0.06, 0.12, "$5"], ["#c08a5a", 0.5, 0.05, 0.16, "$8"], ["#8a8e96", 0.36, 0.05, 0.1, "$4"], ["#d8b04a", 0.3, 0.12, 0.12, "$9"], ["#3a6aa8", 0.3, 0.05, 0.08, "$3"]];
        TL.forEach(([col, w, h, d, p], i) => { const g = B.dyn(B.grp(-0.85 + i * 0.4, 0.8, -1.3, 0, 1)); B.box(w * 0.7, h, d, col, 0, 0, 0, { in: g }); B.plate(0.3, 0.18, tt(B, p, "#ffffff", GREEN, 0.3, 0.18, "Arial"), 0, 0.3, 0.02, { in: g, d: 0.01, edge: GREEN }); H.tools.push(hide(g)); });
        H.total = B.dyn(B.plate(1.3, 0.4, tt(B, "TOTAL: $29", "#ffffff", GREEN, 1.3, 0.4, "Arial"), 0, 2.45, -1.5, { d: 0.02, edge: INK })); hide(H.total);
        B.lamp(0, 5, 3, "#fff4dc", 3, 14);
      },
      // a navy vault stage: a giant chained chest labelled STANDARD OIL, a big padlock, light waiting inside
      chest: (B) => {
        B.set.stage({ floor: "#3a3f52", back: NAVY });
        H.ch = B.dyn(B.grp(0, 0, -0.5, 0, 1)); B.box(3.2, 1.8, 2.0, "planks:#6a4026", 0, 0, 0, { in: H.ch }); for (const x of [-1.3, 1.3]) B.box(0.16, 1.82, 2.04, "metal:#5a5e66", x, 0, 0, { in: H.ch });
        B.plate(2.0, 0.5, tt(B, "STANDARD OIL", "#2a1a12", GOLD, 2.0, 0.5), 0, 1.1, 1.02, { in: H.ch, d: 0.02, edge: GOLD });
        H.clid = B.dyn(B.grp(0, 1.8, -1.0, 0, 1, H.ch)); B.box(3.3, 0.4, 2.1, "planks:#5a3420", 0, 0, 1.0, { in: H.clid }); for (const x of [-1.3, 1.3]) B.box(0.16, 0.42, 2.14, "metal:#5a5e66", x, 0, 1.0, { in: H.clid });
        H.glowIn = B.dyn(B.box(2.9, 0.06, 1.7, "#ffe28a", 0, 1.74, 0, { in: H.ch, cast: false })); hide(H.glowIn);
        H.chainA = B.dyn(B.grp(0, 0, -0.5, 0, 1)); B.box(3.6, 0.14, 0.14, "metal:#8a8e96", 0, 1.95, 1.04, { in: H.chainA }); B.box(0.14, 2.0, 0.14, "metal:#8a8e96", -0.7, 0.05, 1.08, { in: H.chainA });
        H.chainB = B.dyn(B.grp(0, 0, -0.5, 0, 1)); B.box(0.14, 2.0, 0.14, "metal:#8a8e96", 0.7, 0.05, 1.08, { in: H.chainB }); B.box(3.6, 0.14, 0.14, "metal:#8a8e96", 0, 0.5, 1.06, { in: H.chainB });
        H.padlock = B.dyn(B.grp(0, 1.5, 0.62, 0, 1)); B.box(0.55, 0.5, 0.18, GOLD, 0, 0, 0, { in: H.padlock }); B.box(0.08, 0.35, 0.1, "#8a6a2a", -0.18, 0.45, 0, { in: H.padlock }); B.box(0.08, 0.35, 0.1, "#8a6a2a", 0.18, 0.45, 0, { in: H.padlock }); B.box(0.44, 0.08, 0.1, "#8a6a2a", 0, 0.66, 0, { in: H.padlock });
        B.lamp(0, 6, 4, "#dfe8ff", 6, 16); B.lamp(0, 2.6, -0.5, "#ffd88a", 2, 6);
      },
    },
    shots: [
      // 0 · frame 0: the giant mallet is already falling on the STANDARD OIL drum — SMASH on "smashed"
      { set: "smash", f: 0, light: STAGE, cam: CAM.fit([0, 2.7, 0], { w: 4.6, a0: -16, a1: -6, e0: -6, e1: 4, push: 0.1 }),
        act: (S, u, f) => { const t = W(0, "smashed"), k = E.easeIn(E.prog(f, 0, t)); H.mallet.position.y = E.lerp(5.6, 2.95, k) + (f > t ? -2.5 * E.easeOut(E.prog(f, t, t + 6)) : 0); H.mallet.rotation.z = 0.25 * (1 - k);
          const gone = f >= t; H.big.visible = !gone; if (!gone) H.big.scale.set(1, 1, 1); drumsAt(gone ? E.prog(f, t, t + 34) : 0);
          S.kick(t, 0.22); S.pop("impact", t, 22, { x: 0, y: 2.6, z: 1.2, w: 1.4, h: 0.62, text: "SMASH!" }); S.pop("puff", t, 20, { x: 0, y: 0.5, z: 1.0, w: 3.6, h: 1.0 }); S.pop("sparks", t + 1, 16, { x: 0.4, y: 1.6, z: 1.2, w: 1.6, h: 0.8 });
          S.pop("label", W(0, "nineteen") - 3, 60, { x: 0, y: 4.2, z: 0.6, w: 1.2, h: 0.38, text: "1911", bg: "#f4efe2", col: INK, hold: true }); } },
      // 1 · …thirty-four pieces: high wide — 34 little drums land in a grid; 34 COMPANIES
      { set: "smash", word: [0, "thirty-four"], lead: 3, light: STAGE, cam: CAM.fit([0, 0.4, -0.6], { w: 5.2, a0: 10, a1: 2, e0: 40, e1: 34, push: 0.06 }),
        act: (S, u, f) => { const t = W(0, "smashed"); H.big.visible = false; H.mallet.position.y = 0.45; H.mallet.position.x = 3.2; H.mallet.rotation.z = PI / 2; drumsAt(E.prog(f, t, t + 34));
          S.pop("label", W(0, "thirty-four") - 2, 46, { x: 0, y: 1.6, z: 2.6, w: 2.1, h: 0.42, text: "34 COMPANIES", bg: GOLD, col: INK, hold: true }); } },
      // 2 · And John D. Rockefeller got richer: whip to his office — he grins behind the desk, coins pop
      { set: "office", word: [0, "And"], lead: 3, trans: "whip", dir: 1, light: "office", cam: CAM.fit([0, 1.4, -1.4], { w: 2.8, a0: -12, a1: -4, elev: 4, push: 0.12 }),
        act: (S, u, f) => { H.pie.p.visible = false; H.easel.visible = false; S.actor("rock", { x: 0, z: -2.0, expr: f > W(0, "richer.") - 4 ? "grin" : "smile_closed", prop: f > W(0, "richer.") - 4 ? "up" : "chin", look: 0.1 });
          S.pop("label", W(0, "John") - 3, 50, { x: 0, y: 2.6, z: -1.9, w: 2.4, h: 0.38, text: "JOHN D. ROCKEFELLER", bg: GOLD, col: INK, hold: true });
          S.pop("coin", W(0, "richer.") - 2, 20, { x: -0.6, y: 1.9, z: -1.5, w: 0.35, h: 0.35 }); S.pop("coin", W(0, "richer.") + 3, 20, { x: 0.6, y: 2.0, z: -1.5, w: 0.35, h: 0.35 }); S.pop("dollar", W(0, "richer.") + 6, 20, { x: 0.0, y: 2.2, z: -1.4, w: 0.4, h: 0.4 }); } },
      // 3 · Imagine you own its stock: dissolve to your parlor — you in the armchair, the framed share glows
      { set: "parlor", beat: 1, trans: "dissolve", light: "interior", cam: CAM.fit([0.6, 1.4, -1.8], { w: 3.2, a0: 14, a1: 6, elev: 4, push: 0.1 }),
        act: (S, u, f) => { S.actor("you", { x: 0, z: -1.45, expr: "smile", mode: "sit", look: 0.5 }); S.pop("glow", W(1, "stock.") - 3, 22, { x: 1.4, y: 2.25, z: -3.0, w: 1.9, h: 1.3 });
          S.pop("label", W(1, "Imagine") - 2, 40, { x: 0.0, y: 2.55, z: -1.3, w: 0.8, h: 0.32, text: "YOU", bg: "#ffffff", col: INK }); } },
      // 4 · It once refined…: whip to the refinery yard at golden hour — tanks, stacks, smoke
      { set: "refinery", beat: 2, trans: "whip", dir: -1, light: "golden", cam: CAM.fit([0, 2.6, -7], { w: 10, a0: -14, a1: -6, e0: 6, e1: 12, push: 0.06 }),
        act: (S, u, f) => { for (const [x, h, d] of [[-8.5, 9, 0], [5.8, 8, 9], [10.5, 10, 18]]) S.pop("smoke", S.a + d, 60, { x, y: h + 0.8, z: -15, w: 2.2, h: 2.2, rise: 1.2, hold: true });
          S.pop("label", W(2, "refined") - 3, 40, { x: -1.2, y: 6.0, z: -8, w: 3.2, h: 0.6, text: "STANDARD OIL REFINERY", bg: "#f4efe2", col: "#8a2a2a" }); } },
      // 5 · …nine of every ten American barrels: low insert along ten barrels — nine are blue Standard barrels
      { set: "refinery", word: [2, "nine"], lead: 3, steady: true, coc: 10, light: "golden", cam: CAM.fit([0, 0.7, 0.4], { w: 7.2, a0: 22, a1: 14, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.barrels.forEach((b, i) => { const ti = W(2, "nine") + i * 3; b.position.y = 0.25 * Math.max(0, Math.sin(PI * E.prog(f, ti, ti + 8))); });
          S.pop("label", W(2, "nine") - 2, 56, { x: 0, y: 1.9, z: 0.6, w: 2.4, h: 0.46, text: "9 OF EVERY 10", bg: "#2a3f5a", col: "#ffffff", hold: true }); S.pop("exclaim", W(2, "barrels,"), 16, { x: 3.3, y: 1.4, z: 0.6, w: 0.3, h: 0.5 }); } },
      // 6 · …and it loved secrets: at the PRIVATE gate, Rockefeller peeks out — "Shh."
      { set: "refinery", word: [2, "and"], lead: 2, light: "dusk", cam: CAM.fit([5.9, 1.5, -2.2], { w: 3.2, a0: -14, a1: -6, elev: 4, push: 0.12 }),
        act: (S, u, f) => { const k = E.back(E.prog(f, S.a, S.a + 12)); H.gate.position.x = 6.2 + 0.9 * k;
          S.actor("rock", { x: 5.6, z: -1.8, expr: "smile_closed", prop: "point", look: 0.4 }); S.say("Shh. Private.", W(2, "loved") - 2, 34, { x: 6.3, y: AH + 0.75, z: -2.8, w: 1.2, h: 0.44, tail: "left" }); } },
      // 7 · Then the Supreme Court…: SMASH back to the parlor — the newspaper headline, you jump
      { set: "parlor", beat: 3, trans: "smash", light: "interior", cam: CAM.fit([0, 1.3, -1.2], { w: 2.4, a0: -8, a1: 0, elev: 4, push: 0.12 }),
        act: (S, u, f) => { H.news.p.visible = true; H.news.draw({ h: f >= W(3, "Supreme") - 2 }); H.news.p.position.set(0.62, 1.05 + 0.05 * Math.sin(f * 0.5), -0.85); H.news.p.rotation.y = -0.25;
          S.actor("you", { x: 0, z: -1.45, expr: f > W(3, "Court") ? "shock" : "neutral", mode: "sit" }); S.pop("label", W(3, "Supreme") - 4, 46, { x: 0, y: 2.55, z: -1.2, w: 1.7, h: 0.36, text: "MAY 15, 1911", bg: "#f4efe2", col: RED, hold: true }); } },
      // 8 · …six months to split up: insert on the hourglass draining; 6 MONTHS
      { set: "parlor", word: [3, "six"], lead: 4, steady: true, coc: 12, light: "interior", cam: CAM.fit([1.35, 1.0, -1.4], { w: 1.2, a0: -10, a1: -2, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.glass.level(E.prog(f, S.a, S.a + 60)); S.pop("label", W(3, "months") - 3, 40, { x: 1.35, y: 1.55, z: -1.2, w: 0.9, h: 0.3, text: "6 MONTHS", bg: RED, col: "#fff", hold: true }); } },
      // 9 · Your one stock becomes thirty-four: you hold up the paper — it bursts into a fan of 34 shares
      { set: "parlor", beat: 4, light: "interior", cam: CAM.fit([0, 1.7, -1.3], { w: 3.0, a0: 10, a1: 2, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const t = W(4, "becomes"); S.actor("you", { x: 0, z: -1.45, expr: f > t ? "laugh" : "smile", mode: "sit", prop: f > t ? "up" : "paper" });
          H.fan.forEach((p, i) => { const k = E.back(E.prog(f, t + i * 0.2, t + 7 + i * 0.2)); p.visible = k > 0.01; p.scale.setScalar(Math.max(0.01, k)); });
          S.pop("puff", t, 16, { x: 0, y: 1.6, z: -1.1, w: 1.0, h: 0.6 }); S.pop("label", W(4, "thirty-four,") - 2, 40, { x: 0, y: 3.0, z: -1.2, w: 1.0, h: 0.4, text: "×34", bg: GOLD, col: INK, hold: true }); } },
      // 10 · …a slice of every piece: push through to the stage — a share certificate drops onto every drum
      { set: "smash", word: [4, "slice"], lead: 3, trans: "zoom", light: STAGE, cam: CAM.fit([0, 0.5, -0.8], { w: 4.4, a0: -22, a1: -12, e0: 24, e1: 30, push: 0.08 }),
        act: (S, u, f) => { H.big.visible = false; drumsGrid(1); H.mallet.visible = false;
          H.certs.forEach((c, i) => { const ti = S.a + 2 + (i % 12) * 1.5, k = E.easeOut(E.prog(f, ti, ti + 10)); c.visible = f >= ti; c.position.y = 0.72 + 1.6 * (1 - k); });
          S.pop("label", W(4, "every") - 2, 34, { x: 0, y: 2.2, z: 0.2, w: 2.2, h: 0.4, text: "A SLICE OF EACH", bg: "#ffffff", col: GREEN, hold: true }); } },
      // 11 · Rockefeller owns a quarter: whip to the office — the pie chart fills a gold quarter
      { set: "office", beat: 5, trans: "whip", dir: -1, light: "office", cam: CAM.fit([0.9, 1.5, -1.6], { w: 3.0, a0: 14, a1: 6, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.pie.draw({ k: Math.round(E.ss(E.prog(f, W(5, "quarter.") - 8, W(5, "quarter.") + 6)) * 20) / 20 });
          S.actor("rock", { x: -0.2, z: -2.0, expr: "smile_closed", prop: "point", look: 0.6 }); S.pop("label", W(5, "quarter.") - 2, 36, { x: 1.75, y: 2.45, z: -1.5, w: 1.3, h: 0.36, text: "ABOUT 1/4", bg: GOLD, col: INK, hold: true }); } },
      // 12 · Surely, this ends him: back in the parlor — you laugh at the headline, "He's finished!"
      { set: "parlor", word: [5, "Surely,"], lead: 3, light: "interior", cam: CAM.fit([-0.3, 1.4, -1.3], { w: 2.6, a0: -16, a1: -8, elev: 4, push: 0.12 }),
        act: (S, u, f) => { H.news.p.visible = true; H.news.draw({ h: true }); H.news.p.position.set(0.66, 1.0, -0.85); H.news.p.rotation.y = -0.3;
          S.actor("you", { x: 0, z: -1.45, expr: "laugh", mode: "sit", prop: "point", tilt: 4 * Math.sin(f * 0.5) }); S.say("He's finished!", W(5, "this") - 2, 30, { x: -0.7, y: AH + 0.5, z: -1.2, w: 1.2, h: 0.44, tail: "right" }); } },
      // 13 · Two years later…: flash (time jump) to the stage — 1913; the 34 drums swell
      { set: "smash", beat: 6, trans: "flash", light: STAGE, cam: CAM.fit([0, 0.8, -0.6], { w: 4.8, a0: 14, a1: 6, e0: 18, e1: 14, push: 0.08 }),
        act: (S, u, f) => { H.big.visible = false; H.mallet.visible = false; const k = E.back(E.prog(f, W(6, "pieces") - 2, W(6, "pieces") + 14)); drumsGrid(1 + 0.45 * k);
          S.pop("label", W(6, "Two") - 2, 50, { x: 0, y: 2.6, z: 0.4, w: 1.2, h: 0.4, text: "1913", bg: "#f4efe2", col: INK, hold: true }); S.pop("sparks", W(6, "pieces") + 6, 16, { x: 0, y: 1.2, z: 0.8, w: 3.0, h: 0.7 }); } },
      // 14 · …worth twice the old whole: dolly to the side — two bars, the 1913 bar grows to double
      { set: "smash", word: [6, "twice"], lead: 4, light: STAGE, cam: CAM.fit([5.2, 1.5, 1.2], { w: 3.4, a0: -10, a1: -4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.big.visible = false; H.mallet.visible = false; drumsGrid(1.45); H.bars.visible = true; H.barL.visible = true; H.barR.visible = true;
          H.bars.grow([1, E.back(E.prog(f, W(6, "twice") - 2, W(6, "whole.")))]); S.pop("label", W(6, "twice") - 1, 44, { x: 5.85, y: 3.15, z: 1.5, w: 0.8, h: 0.42, text: "×2", bg: GOLD, col: INK, hold: true }); } },
      // 15 · And Rockefeller's fortune triples: whip to the office — three money bags thump onto the desk
      { set: "office", beat: 7, trans: "whip", dir: 1, light: "office", cam: CAM.fit([0.3, 1.3, -1.5], { w: 2.7, a0: -10, a1: -2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.pie.p.visible = false; H.easel.visible = false; const t0 = W(7, "fortune") - 4, t1 = W(7, "triples.");
          H.bags.forEach((b, i) => { const ti = E.lerp(t0, t1 + 6, i / 2), k = E.easeIn(E.prog(f, ti, ti + 6)); b.visible = f >= ti; b.position.y = 0.81 + 1.4 * (1 - k); if (f >= ti) S.kick(ti + 6, 0.05); });
          S.actor("rock", { x: -0.4, z: -2.0, expr: f > t1 ? "laugh" : "grin", prop: "up", look: 0.4 }); S.pop("label", t1 - 2, 44, { x: 0.65, y: 2.3, z: -1.3, w: 1.6, h: 0.38, text: "FORTUNE ×3", bg: GOLD, col: INK, hold: true });
          S.pop("coin", t1 + 8, 22, { x: 0.6, y: 1.6, z: -1.1, w: 0.4, h: 0.4, rise: 0.6 }); } },
      // 16 · So how does chopping something up make it bigger?: dissolve to the dim stage — you among the drums, a question mark
      { set: "smash", beat: 8, trans: "dissolve", light: (u) => K.mixLight(STAGE, K.light("night"), 0.45), cam: CAM.fit([0, 1.2, 0.8], { w: 3.4, a0: -18, a1: -6, e0: 12, e1: 6, push: 0.1 }),
        act: (S, u, f) => { H.big.visible = false; H.mallet.visible = true; H.mallet.position.set(-2.2, 0.45, 1.4); H.mallet.rotation.set(0, 0.4, PI / 2); drumsGrid(1.45);
          S.actor("you", { x: 0.2, z: 1.9, expr: "nervous", prop: "chin", look: -0.3 }); S.pop("question", W(8, "how") - 2, 70, { x: 0.8, y: 2.4, z: 1.9, w: 0.5, h: 0.6, hold: true });
          S.pop("label", W(8, "bigger?") - 3, 34, { x: 0.2, y: 2.9, z: 1.6, w: 1.3, h: 0.36, text: "BIGGER?", bg: "#ffffff", col: INK }); } },
      // 17 · You see, picture a locked toolbox at a yard sale: whip to a sunny yard sale; Gus behind the table
      { set: "yard", beat: 9, trans: "whip", dir: -1, light: "day", cam: CAM.fit([0, 1.5, -1.8], { w: 4.6, a0: 14, a1: 4, e0: 8, e1: 4, push: 0.1 }),
        act: (S, u, f) => { S.actor("gus", { x: 0.7, z: -2.4, expr: "grin", prop: "wave", wave: 0.5 + 0.5 * Math.sin(f * 0.4), look: -0.2 }); S.actor("you", { x: -1.2, z: -0.6, expr: "smile", mode: "stroll", phase: f * 0.05, look: 0.4 });
          S.pop("label", W(9, "see,") - 2, 40, { x: 0.7, y: 2.55, z: -2.3, w: 0.8, h: 0.3, text: "GUS", bg: "#ffffff", col: INK }); } },
      // 18 · …a locked toolbox: insert — the red box, a padlock, a $2 tag; you shrug "Two bucks, tops."
      { set: "yard", word: [9, "locked"], lead: 3, steady: true, coc: 11, light: "day", cam: CAM.fit([-0.4, 1.3, -1.4], { w: 2.3, a0: -14, a1: -6, elev: 10, push: 0.12 }),
        act: (S, u, f) => { H.price0.visible = true; S.actor("you", { x: -0.9, z: -0.9, expr: "nervous", prop: "shrug", look: 0.5 });
          S.say("Two bucks, tops.", W(9, "yard") - 6, 30, { x: -0.45, y: AH + 0.7, z: -0.8, w: 1.3, h: 0.44, tail: "left" }); S.pop("glow", W(9, "locked"), 14, { x: -0.2, y: 1.2, z: -1.3, w: 0.4, h: 0.4 }); } },
      // 19 · Open it: the lid flips open, sparkle
      { set: "yard", beat: 10, light: "day", cam: CAM.fit([-0.2, 1.15, -1.6], { w: 1.7, a0: 8, a1: 2, elev: 22, push: 0.1 }),
        act: (S, u, f) => { const k = E.back(E.prog(f, W(10, "Open"), W(10, "Open") + 10)); H.tlid.rotation.x = -1.9 * k; H.lock.visible = k < 0.2; H.price0.visible = true;
          S.pop("sparks", W(10, "it,") - 2, 16, { x: -0.2, y: 1.4, z: -1.5, w: 0.9, h: 0.5 }); } },
      // 20 · …tag every tool: the tools pop out onto the table one by one, each with a tag
      { set: "yard", word: [10, "tag"], lead: 3, light: "day", cam: CAM.fit([-0.05, 1.1, -1.4], { w: 2.4, a0: -8, a1: 0, elev: 18, push: 0.08 }),
        act: (S, u, f) => { H.tlid.rotation.x = -1.9; H.lock.visible = false; H.price0.visible = false;
          H.tools.forEach((g, i) => { const ti = W(10, "tag") + i * 3, k = E.back(E.prog(f, ti, ti + 7)); g.visible = f >= ti; g.scale.setScalar(Math.max(0.01, k)); }); } },
      // 21 · …the same stuff sells for more: wider — buyers crowd the table; TOTAL $29
      { set: "yard", word: [10, "the"], lead: 3, light: "day", cam: CAM.fit([0.2, 1.5, -1.6], { w: 4.0, a0: 12, a1: 4, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.tlid.rotation.x = -1.9; H.lock.visible = false; H.tools.forEach((g) => { g.visible = true; g.scale.setScalar(1); });
          const d = E.ss(E.prog(f, S.a, S.a + 24)); S.actor("b1", { x: -1.4, z: E.lerp(1.0, -0.6, d), expr: "grin", mode: d < 1 ? "stroll" : "stand", phase: f * 0.06, prop: d >= 1 ? "point" : undefined }); S.actor("b2", { x: 1.3, z: E.lerp(1.2, -0.7, d), expr: "laugh", mode: d < 1 ? "stroll" : "stand", phase: f * 0.06 + 1 });
          S.actor("gus", { x: 0.7, z: -2.4, expr: f > W(10, "sells") ? "laugh" : "grin", prop: "up" }); H.total.visible = f >= W(10, "more.") - 3; S.pop("dollar", W(10, "more."), 18, { x: 0.8, y: 2.1, z: -1.4, w: 0.4, h: 0.4 }); } },
      // 22 · Standard Oil was that locked box: push through to the navy vault — the giant chained chest, padlock gleams
      { set: "chest", beat: 11, trans: "zoom", light: VAULT, cam: CAM.fit([0, 1.4, 0], { w: 4.4, a0: -14, a1: -4, e0: 4, e1: 8, push: 0.1 }),
        act: (S, u, f) => { S.actor("you", { x: -1.4, z: 1.8, expr: "neutral", prop: "point", look: 0.5 }); S.pop("glow", W(11, "locked") - 2, 18, { x: 0, y: 1.6, z: 0.8, w: 0.9, h: 0.9 }); S.kick(W(11, "box."), 0.05); } },
      // 23 · The breakup made investors look inside: the chains SNAP off, investors gather, the lid cracks
      { set: "chest", beat: 12, light: VAULT, cam: CAM.fit([0, 1.3, 0.3], { w: 4.8, a0: 12, a1: 4, elev: 6, push: 0.1 }),
        act: (S, u, f) => { const t = W(12, "breakup") + 2, k = E.easeOut(E.prog(f, t, t + 14)); H.chainA.position.set(-2.5 * k, -1.2 * k, 0.6 * k - 0.5); H.chainA.rotation.z = 0.8 * k; H.chainB.position.set(2.5 * k, -1.0 * k, 0.6 * k - 0.5); H.chainB.rotation.z = -0.8 * k;
          H.padlock.visible = f < t; S.kick(t, 0.12); S.pop("impact", t, 18, { x: 0, y: 2.4, z: 1.0, w: 1.0, h: 0.45, text: "SNAP!" });
          const lk = E.ss(E.prog(f, W(12, "look") - 4, W(12, "look") + 8)); H.clid.rotation.x = -0.35 * lk; H.glowIn.visible = lk > 0.05;
          [["you", -1.8, 1.4], ["b1", 1.9, 1.3], ["b2", 1.0, 2.0]].forEach(([id, x, z], i) => S.actor(id, { x, z, expr: f > W(12, "investors") ? "shock" : "neutral", look: -x * 0.3, prop: i === 0 ? "point" : undefined })); } },
      // 24 · …and price every piece: push through the lid gap into the box — the 34 drums, a price tag popping on each
      { set: "smash", word: [12, "inside"], lead: 3, trans: "zoom", light: (u) => K.mixLight(STAGE, K.light("lamp"), 0.3), cam: CAM.fit([0, 0.6, -0.6], { w: 4.6, a0: 8, a1: -2, e0: 30, e1: 24, push: 0.08 }),
        act: (S, u, f) => { H.big.visible = false; H.mallet.visible = false; drumsGrid(1.45);
          H.tags.forEach((t, i) => { const ti = W(12, "price") - 4 + (i % 17) * 1.4, k = E.back(E.prog(f, ti, ti + 6)); t.visible = f >= ti; t.scale.setScalar(Math.max(0.01, k)); });
          S.pop("label", W(12, "price") - 3, 40, { x: 0, y: 2.6, z: 0.4, w: 2.2, h: 0.4, text: "PRICE EVERY PIECE", bg: GOLD, col: INK, hold: true }); } },
      // 25 · Same refineries (music stops): cold refinery at dusk — the camera drifts past the tanks
      { set: "refinery", beat: 13, trans: "dissolve", light: "dusk", cam: CAM.fit([-1.2, 2.6, -9], { w: 8.0, a0: -6, a1: 4, elev: 4, push: 0.06 }),
        act: (S, u, f) => { S.pop("label", W(13, "refineries.") - 3, 26, { x: -1.2, y: 5.2, z: -8, w: 1.4, h: 0.45, text: "SAME", bg: "#ffffff", col: INK }); } },
      // 26 · Same pipelines. Same oil.: insert on the pipe rack and the barrels below; a drop of oil falls
      { set: "refinery", word: [13, "Same", 2], lead: 3, steady: true, coc: 10, light: "dusk", cam: CAM.fit([0, 1.6, -2.6], { w: 4.0, a0: 16, a1: 10, elev: 4, push: 0.1 }),
        act: (S, u, f) => { S.pop("label", W(13, "Same", 3) - 2, 26, { x: 0, y: 2.8, z: -2.4, w: 1.4, h: 0.45, text: "SAME", bg: "#ffffff", col: INK }); H.barrels.forEach((b, i) => { const ti = W(13, "oil.") - 2 + i * 2; b.position.y = 0.18 * Math.max(0, Math.sin(PI * E.prog(f, ti, ti + 7))); });
          S.pop("smoke", S.a, 40, { x: 5.8, y: 8.8, z: -15, w: 2.0, h: 2.0, rise: 1.0, hold: true }); } },
      // 27 · The court didn't shrink Rockefeller: whip to the office — he stands tall and grows a little
      { set: "office", beat: 14, trans: "whip", dir: -1, light: "office", cam: CAM.fit([0, 1.5, -1.4], { w: 2.8, a0: 10, a1: 2, elev: 2, push: 0.1 }),
        act: (S, u, f) => { H.pie.p.visible = false; H.easel.visible = false; H.bags.forEach((b) => { b.visible = true; });
          const k = E.back(E.prog(f, W(14, "shrink") - 2, W(14, "Rockefeller.") + 4)); S.actor("rock", { x: -0.3, z: -2.0, expr: f > W(14, "shrink") ? "grin" : "smile_closed", prop: "up", scale: 1 + 0.15 * k, look: 0.2 }); } },
      // 28 · It opened his box.: the vault — the chest lid BLASTS open on "box." in a shower of light and coins
      { set: "chest", word: [14, "It"], lead: 3, trans: "whip", dir: 1, light: VAULT, cam: CAM.fit([0, 1.6, 0], { w: 4.6, a0: -10, a1: -4, elev: 6, push: 0.12 }),
        act: (S, u, f) => { const t = W(14, "box."); H.chainA.visible = false; H.chainB.visible = false; H.padlock.visible = false; H.glowIn.visible = true;
          H.clid.rotation.x = f < t ? -0.35 : -0.35 - 1.6 * E.back(E.prog(f, t, t + 7)); S.kick(t, 0.25);
          S.pop("burst", t, 22, { x: 0, y: 2.4, z: 0.2, w: 3.4, h: 2.2 }); S.pop("confetti", t + 1, 30, { x: 0, y: 3.0, z: 0.4, w: 3.6, h: 1.8 }); S.pop("coin", t + 2, 26, { x: -0.8, y: 2.6, z: 0.6, w: 0.45, h: 0.45, rise: 1.0 }); S.pop("coin", t + 4, 26, { x: 0.9, y: 2.8, z: 0.6, w: 0.45, h: 0.45, rise: 1.0 });
          S.pop("impact", t, 24, { x: 0, y: 3.6, z: 0.6, w: 1.2, h: 0.55, text: "OPEN!" }); } },
    ],
  };
};
