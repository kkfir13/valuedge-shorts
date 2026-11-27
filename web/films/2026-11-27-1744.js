// "Trust Only Each Other" — the Panic of 1792 and the Buttonwood Agreement. William Duer, Hamilton's former assistant at
// the Treasury, borrows from everyone and, with rich partner Alexander Macomb, tries to corner government bonds; short of
// cash, they endorse each other's notes. In March 1792 Duer stops paying, prices fall over 20% in weeks and he lands in
// debtors' prison (he never leaves; dies there 1799). Two months later 24 brokers sign a short deal (legend: under a
// buttonwood tree): a minimum fee and preference to each other. It grew into the New York Stock Exchange.
// Worlds: a plum metaphor stage with a tower of IOU bundles (Duer on top) that collapses, 1792 Wall Street (cobbles,
// COFFEE HOUSE/AUCTIONS signs, a giant buttonwood tree, Duer's front door, a columned exchange that rises from the ground),
// Duer's candle-lit study (desk, empty cash chest, swapped notes), a coffee house with a chalk price board, a stone
// debtors' prison cell with sliding bars, and a kitchen pantry (the analogy: you on Ned's shoulders reaching the top shelf).
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const H = {};
  const PI = Math.PI;
  const AH = 1.55;
  const GOLD = "#f2c14e", INK = "#1d1a26", CREAM = "#f4ecd6", RED = "#c8352e", GREEN = "#2f6a4a", PLUM = "#3b2350";
  const STAGE = K.backdrop(PLUM);

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

  // the agreement on parchment: q.n = how many terms are written
  const dealPaint = (c, w, h, q) => { c.fillStyle = "#f1e4c4"; c.fillRect(0, 0, w, h); c.strokeStyle = "#8a6a3a"; c.lineWidth = 10; c.strokeRect(16, 16, w - 32, h - 32);
    c.fillStyle = INK; c.textAlign = "center"; c.textBaseline = "middle"; c.font = `italic bold ${Math.round(h * 0.09)}px Georgia`; c.fillText("We the Subscribers,", w / 2, h * 0.14);
    c.font = `italic ${Math.round(h * 0.06)}px Georgia`; c.fillText("New York, May 17, 1792", w / 2, h * 0.25);
    c.font = `bold ${Math.round(h * 0.085)}px Georgia`; if ((q.n ?? 0) >= 1) c.fillText("1. Fee: at least ¼ %", w / 2, h * 0.45); if ((q.n ?? 0) >= 2) c.fillText("2. Each other first", w / 2, h * 0.6);
    c.font = `italic ${Math.round(h * 0.06)}px Georgia`; c.fillStyle = "#3a3048"; for (let i = 0; i < (q.sig ?? 0); i++) c.fillText(["L. Lispenard", "A. Bleecker", "J. Pintard", "B. Seixas", "S. Marsh", "J. Ferrers"][i % 6], w * (0.27 + (i % 2) * 0.46), h * (0.75 + Math.floor(i / 2) * 0.075)); };
  // IOU block (paper bundle with a red ribbon and a label)
  const bundle = (B, x, y, z, ry, label, parent) => { const g = B.dyn(B.grp(x, y, z, ry, 1, parent)); B.box(1.0, 0.36, 0.7, "#efe6cf", 0, 0, 0, { in: g }); B.box(0.08, 0.37, 0.72, RED, 0.25, 0, 0, { in: g });
    B.plate(0.5, 0.24, tt(B, label, CREAM, INK, 0.5, 0.24), -0.15, 0.18, 0.36, { in: g, d: 0.01, edge: INK }); return g; };
  const towerY = (i) => i * 0.37;
  const TX = [0, 0.06, -0.05, 0.08, -0.04, 0.05, -0.07, 0.03, -0.02];
  const towerTop = 9 * 0.37;

  return {
    cast: {
      duer: { jacket: "#7a1f2e", pants: "#e8dcc0", boots: "#141418", hat: "tricorn", skin: "#f2cca6", buttons: "#d8b04a" },
      macomb: { jacket: "#1f3b5a", pants: "#e8dcc0", boots: "#141418", hat: "wig", skin: "#eec6a0", buttons: GOLD, build: "stout" },
      you: { jacket: "#2f6a4a", pants: "#d8ccb0", boots: "#3a2418", hat: "tricorn", skin: "#f0c8a0", buttons: "#c9c9d0" },
      ned: { jacket: "#c08a3a", pants: "#3a3f52", boots: "#3a2418", hat: "cap", cap: "#7a2a2a", skin: "#e2b48c", buttons: "#f4efe2" },
      b1: { jacket: "#5a3a6a", pants: "#d8ccb0", boots: "#141418", hat: "wig", skin: "#f2cfae" },
      b2: { jacket: "#8a5a2a", pants: "#3a3028", boots: "#141418", hat: "tricorn", skin: "#d8a878", moustache: "#3a2418" },
      b3: { jacket: "#2a4a6a", pants: "#d8ccb0", boots: "#141418", hat: "bowler", skin: "#eec6a0" },
    },
    sets: {
      // metaphor stage: deep plum void, a tower of IOU bundles, a little WALL ST sign for the rubble
      tower: (B) => {
        B.set.stage({ floor: "#eadcc0", back: PLUM });
        H.blocks = []; for (let i = 0; i < 9; i++) H.blocks.push(bundle(B, TX[i], towerY(i), 0, (i % 3 - 1) * 0.08, i === 8 ? "BONDS" : "IOU"));
        H.wsign = B.dyn(B.grp(1.3, 0, 1.0, -0.3, 1)); B.box(0.06, 1.1, 0.06, "#5a3a24", 0, 0, 0, { in: H.wsign }); B.plate(0.9, 0.3, tt(B, "WALL ST", "#f4efe2", INK, 0.9, 0.3), 0, 1.05, 0.04, { in: H.wsign, d: 0.02, edge: INK }); hide(H.wsign);
        B.lamp(0, 7, 4, "#fff0dc", 7, 18); B.lamp(-3, 3, 2, "#e8c8ff", 3, 10);
      },
      // Wall Street, 1792: cobbles, low brick and plaster fronts, the buttonwood tree, Duer's door, the exchange that rises
      wall: (B) => {
        B.set.street({ style: ["brick", "village"], length: 44, road: 8, seed: 92, ground: "cobble", signs: ["COFFEE HOUSE", "AUCTIONS", "BROKER", "TAVERN", "MERCHANT", "WALL STREET", "PRINTER", "SHIP CHANDLER"], end: true });
        for (const z of [-2, -9, -16]) for (const x of [-4.4, 4.4]) B.prop.lampPost({ x, z });
        H.tree = B.prop.tree({ x: 3.2, z: -6.5, s: 1.35, col: "#6aa03a" });
        // Duer's house front with a door
        B.box(4.4, 3.6, 0.5, "brick:#8a4a3a", 0, 0, -19.4); H.hdoor = B.prop.door({ x: 0, z: -19.1, w: 1.1, h: 2.2, col: "planks:#3a5a4a" });
        B.plate(1.6, 0.36, tt(B, "W. DUER, ESQ.", "#f4efe2", INK, 1.6, 0.36), 0, 2.75, -19.1, { d: 0.03, edge: "#5a3a24" });
        // the exchange: steps, six columns, a pediment, doors that slam
        H.exch = B.dyn(B.grp(-0.6, 0, -13.2, 0, 1));
        B.box(7.4, 0.45, 3.6, "marble", 0, 0, 0, { in: H.exch }); B.box(7.0, 4.6, 0.4, "marble:#e9e2d4", 0, 0.45, -1.4, { in: H.exch });
        for (let i = 0; i < 6; i++) if (i !== 2 && i !== 3) B.cyl(0.24, 0.27, 3.9, "marble", -2.9 + i * 1.16, 0.45, 0.9, { in: H.exch, seg: 14 });
        B.box(7.4, 0.8, 1.2, "marble:#e9e2d4", 0, 4.35, 0.5, { in: H.exch }); B.plate(6.6, 0.62, tt(B, "STOCK EXCHANGE", "#e9e2d4", INK, 6.6, 0.62), 0, 4.75, 1.12, { in: H.exch, d: 0.02, edge: "#b8a888" });
        H.dL = B.dyn(B.grp(-1.1, 0.45, -1.15, 0, 1, H.exch)); B.box(1.1, 2.8, 0.1, "westwood:#4a2c1a", 0.55, 0, 0, { in: H.dL }); B.ball(0.06, GOLD, 0.95, 1.4, 0.07, { in: H.dL });
        H.dR = B.dyn(B.grp(1.1, 0.45, -1.15, 0, 1, H.exch)); B.box(1.1, 2.8, 0.1, "westwood:#4a2c1a", -0.55, 0, 0, { in: H.dR }); B.ball(0.06, GOLD, -0.95, 1.4, 0.07, { in: H.dR });
        H.members = B.dyn(B.plate(1.9, 0.42, tt(B, "MEMBERS ONLY", RED, "#ffffff", 1.9, 0.42, "Arial"), 0, 3.6, -1.1, { in: H.exch, d: 0.03, edge: INK })); hide(H.members);
        hide(H.exch);
        // the deal table under the tree
        H.dtable = B.dyn(B.grp(1.0, 0, -4.6, 0, 1)); B.prop.table({ x: 0, z: 0, w: 1.3, d: 0.8, h: 0.8, col: "planks:#8a5a34", in: H.dtable });
        H.deal = live(B, 1.0, 0.72, 1.0, 0.84, -4.6, dealPaint, { init: {}, frame: "#8a6a3a", rx: -PI / 2 });
        H.quill = B.dyn(B.grp(1.3, 0.86, -4.5, 0, 1)); B.box(0.02, 0.5, 0.02, "#f4efe2", 0, 0, 0, { in: H.quill }); B.box(0.08, 0.3, 0.01, "#f4efe2", 0.03, 0.2, 0, { in: H.quill });
        B.lamp(0, 6, 2, "#ffe6b8", 4, 18);
      },
      // Duer's study at night: green wallpaper, desk, candle lamp, an empty cash chest, two IOU notes
      study: (B) => {
        B.set.room({ style: "home", w: 9, d: 7, h: 4, door: false, wall: "wallpaper:#2f4a3a", windows: [-3], lit: false });
        B.prop.desk({ x: 0, z: -1.2, w: 2.2, col: "floor:#5a3420" }); B.prop.lamp({ kind: "desk", x: -0.7, y: 0.78, z: -1.35, glow: "#ffd28a", intensity: 4 });
        B.plate(1.2, 0.26, tt(B, "W. DUER · TREASURY", "#2a1a12", GOLD, 1.2, 0.26), 0.15, 0.5, -0.76, { d: 0.02, edge: GOLD });
        B.plate(1.1, 1.3, tt(B, "BONDS\n6%", "#e8dcc0", "#3a2418", 1.1, 1.3), 2.6, 2.3, -3.45, { d: 0.05, edge: "#c9a44a" });
        H.chest = B.dyn(B.grp(2.4, 0, -1.0, -0.4, 1)); B.box(1.0, 0.55, 0.6, "planks:#6a4026", 0, 0, 0, { in: H.chest }); B.plate(0.6, 0.18, tt(B, "CASH", CREAM, INK, 0.6, 0.18), 0, 0.3, 0.31, { in: H.chest, d: 0.01 });
        H.lid = B.dyn(B.grp(0, 0.55, -0.3, 0, 1, H.chest)); B.box(1.02, 0.1, 0.62, "planks:#5a3420", 0, 0, 0.31, { in: H.lid });
        H.noteA = B.dyn(B.grp(-0.35, 0.8, -1.05, 0, 1)); B.plate(0.42, 0.3, tt(B, "IOU\nDUER", "#ffffff", INK, 0.42, 0.3), 0, 0, 0, { in: H.noteA, d: 0.01, edge: INK });
        H.noteB = B.dyn(B.grp(0.55, 0.8, -1.05, 0, 1)); B.plate(0.42, 0.3, tt(B, "IOU\nMACOMB", "#ffffff", INK, 0.42, 0.3), 0, 0, 0, { in: H.noteB, d: 0.01, edge: INK });
        H.mbag = B.dyn(B.grp(1.4, 0, 0.3, 0, 1)); B.prop.moneyBag({ x: 0, z: 0, size: 0.55, in: H.mbag }); hide(H.mbag);
        B.lamp(0, 3, 1.5, "#ffcf8a", 3, 9);
      },
      // a coffee house where brokers trade: plaster walls, round tables, a chalk price board
      coffee: (B) => {
        B.set.room({ style: "saloon", w: 10, d: 8, h: 4.2, door: false, wall: "plaster:#e6d6b8" });
        B.plate(3.6, 0.6, tt(B, "COFFEE HOUSE", "#3a2418", "#f4e6b8", 3.6, 0.6), 0, 3.65, -3.92, { d: 0.05, edge: GOLD });
        H.board = B.prop.screen({ x: 0, z: -3.85, w: 2.8, h: 1.7, y0: 1.35, bg: "#2a312c", line: "#f4efe2", label: "U.S. BONDS" });
        for (const [x, z] of [[-2.6, -0.8], [2.6, -0.8]]) B.prop.roundTable({ x, z, r: 0.7, felt: "#8a5a34" });
        for (const x of [-3.2, 3.2]) B.prop.lamp({ kind: "hang", x, y: 4.2, z: -1.5 });
        B.lamp(0, 3.4, 1.0, "#ffe2b0", 5, 12);
      },
      // a stone debtors' prison cell: bars across the front, a sliding barred door, a high window
      prison: (B) => {
        B.set.room({ style: "cabin", w: 7, d: 6, h: 4, door: false, wall: "brick:#6a645c", floor: "concrete:#7a756c" });
        for (let x = -3.2; x <= 3.21; x += 0.34) if (Math.abs(x) > 0.7) B.cyl(0.035, 0.035, 3.0, "metal:#3a3e46", x, 0, 1.2, { seg: 8 });
        B.box(6.8, 0.12, 0.12, "metal:#3a3e46", 0, 2.95, 1.2); B.box(6.8, 0.1, 0.1, "metal:#3a3e46", 0, 0.45, 1.2);
        H.cell = B.dyn(B.grp(0, 0, 1.28, 0, 1)); for (let i = 0; i < 4; i++) B.cyl(0.035, 0.035, 2.9, "metal:#4a4e56", -0.51 + i * 0.34, 0, 0, { in: H.cell, seg: 8 }); B.box(1.15, 0.1, 0.1, "metal:#4a4e56", 0, 0.45, 0, { in: H.cell }); B.box(1.15, 0.1, 0.1, "metal:#4a4e56", 0, 2.85, 0, { in: H.cell });
        B.plate(2.6, 0.42, tt(B, "DEBTORS' PRISON", "#2a2a2e", "#e8e0d0", 2.6, 0.42), 0, 3.4, 1.25, { d: 0.04, edge: "#8a8a92" });
        B.box(1.0, 0.7, 0.05, "#9ab8e8", 0.9, 2.7, -2.97); for (const x of [0.7, 0.9, 1.1]) B.box(0.04, 0.7, 0.06, "#2a2a2e", x, 2.7, -2.95);
        B.prop.stool({ x: 0.0, z: -1.0, col: "#5a4a3a" }); B.prop.crate({ x: 1.8, z: -2.2, size: 0.6 });
        B.lamp(0.9, 2.8, -2.2, "#b8d0ff", 3, 8); B.lamp(0, 2.6, 3, "#ffd8a0", 2, 8);
      },
      // the analogy: a kitchen pantry, a tall shelf with the GAINS jar on top
      pantry: (B) => {
        B.set.room({ style: "kitchen", w: 8, d: 7, h: 4.4, door: false, wall: "tiles:#f4f0e6:#e8d8b0" });
        B.prop.shelf({ x: 0, z: -3.15, w: 2.4, h: 3.0 });
        H.jar = B.dyn(B.grp(0.1, 3.0, -3.05, 0, 1)); B.cyl(0.2, 0.2, 0.38, "#f2a63a", 0, 0, 0, { in: H.jar, seg: 18 }); B.cyl(0.21, 0.21, 0.08, RED, 0, 0.38, 0, { in: H.jar, seg: 18 });
        B.plate(0.32, 0.14, tt(B, "GAINS", "#ffffff", INK, 0.32, 0.14, "Arial"), 0, 0.2, 0.21, { in: H.jar, d: 0.01 });
        B.prop.counter({ x: -2.8, z: -2.9, w: 2.0, h: 0.95, col: "westwood:#9a6a3e" }); B.prop.lamp({ kind: "hang", x: 0, y: 4.4, z: -1.2 });
        B.lamp(0, 3.2, 1.5, "#fff0d0", 4, 10);
      },
    },
    shots: [
      // 0 · frame 0: a teetering tower of IOU bundles, Duer waving on top — the camera cranes up it
      { set: "tower", f: 0, light: STAGE, cam: CAM.fit([0, 2.3, 0], { w: 3.4, a0: -18, a1: -6, e0: -4, e1: 6, push: 0.12 }),
        act: (S, u, f) => { const sw = 0.04 * Math.sin(f * 0.22); H.blocks.forEach((b, i) => { b.position.x = TX[i] + sw * i * 1.2; b.rotation.z = sw * 0.6; });
          S.actor("duer", { x: sw * 10, y: towerTop, z: 0, expr: "grin", prop: "up", tilt: 10 * Math.sin(f * 0.22) });
          S.pop("label", W(0, "exchange") - 4, 50, { x: 0, y: 1.0, z: 0.8, w: 1.9, h: 0.38, text: "STOCK EXCHANGE?", bg: GOLD, hold: true }); } },
      // 1 · …was born from a crash: wider — the tower topples, bundles tumble, CRASH on "crash."
      { set: "tower", word: [0, "born"], lead: 3, light: STAGE, cam: CAM.fit([0.3, 1.8, 0.2], { w: 4.6, a0: 10, a1: 4, elev: 8, push: 0.1 }),
        act: (S, u, f) => { const t = W(0, "crash."), t0 = t - 12;
          H.blocks.forEach((b, i) => { const k = E.easeIn(E.prog(f, t0 + i * 0.6, t + 4)), dir = i % 2 ? 1 : -1; b.position.set(TX[i] + dir * (0.4 + i * 0.22) * k, towerY(i) * (1 - k) + 0.37 * (i % 3) * k * 0.6, 0.5 * (i % 3 - 1) * k); b.rotation.set(0.3 * k * (i % 2), 0.5 * k * dir, dir * 1.3 * k); });
          const kd = E.easeIn(E.prog(f, t0 + 3, t + 2)); S.actor("duer", { x: 0.9 * kd, y: Math.max(0, towerTop * (1 - kd)), z: 0.3, expr: f > t0 ? "shock" : "nervous", mode: f > t ? "fall" : "stand", prop: "up" });
          S.kick(t + 2, 0.18); S.pop("impact", t + 2, 22, { x: -0.8, y: 2.0, z: 0.8, w: 1.1, h: 0.55, text: "CRASH!" }); S.pop("puff", t + 2, 18, { x: 0, y: 0.4, z: 0.6, w: 3.0, h: 0.8 }); S.pop("paper", t + 2, 24, { x: 0.6, y: 1.4, z: 0.6, w: 0.5, h: 0.5, rise: 0.8, spin: 2 }); } },
      // 2 · New York, 1792: whip to cobbled Wall Street — brokers in tricorns stroll past the shop signs
      { set: "wall", beat: 1, trans: "whip", dir: 1, light: "golden", cam: CAM.fit([0, 1.7, -3.0], { w: 4.6, a0: -12, a1: 0, e0: 8, e1: 4, push: 0.1 }),
        act: (S, u, f) => { const d = (f - S.a) * 0.012;
          S.actor("b1", { x: -1.4, z: -1.6 - d * 2, expr: "smile", mode: "stroll", phase: f * 0.05, look: 0.3 }); S.actor("b2", { x: 1.0, z: -3.4 + d, expr: "grin", mode: "stroll", phase: f * 0.05 + 1, look: -0.3 }); S.actor("you", { x: -0.1, z: -1.0, expr: "smile", prop: "wave", wave: 0.5 + 0.5 * Math.sin(f * 0.4) });
          S.pop("label", W(1, "seventeen") - 2, 60, { x: 0, y: 3.2, z: -2.8, w: 2.0, h: 0.4, text: "NEW YORK · 1792", bg: "#f4efe2", col: RED, hold: true }); } },
      // 3 · everyone wants to lend to William Duer: at Duer's door — the brokers hold out money bags; he tips his hat
      { set: "wall", word: [1, "Everyone"], lead: 3, light: "golden", cam: CAM.fit([0, 1.5, -17.2], { w: 3.6, a0: 14, a1: 4, elev: 5, push: 0.1 }),
        act: (S, u, f) => { S.actor("duer", { x: 0, z: -18.3, expr: "grin", prop: "point", look: 0.1 }); S.actor("b1", { x: -1.25, z: -17.2, expr: "smile", prop: "hold", look: 0.6 }); S.actor("you", { x: 1.2, z: -17.0, expr: "grin", prop: "hold", look: -0.6 });
          S.say("Take my money!", W(1, "wants"), 40, { x: -0.9, y: AH + 0.75, z: -17.0, w: 1.2, h: 0.44, tail: "left" }); S.pop("coin", W(1, "lend"), 18, { x: -0.6, y: 1.2, z: -16.8, w: 0.35, h: 0.35 }); S.pop("coin", W(1, "lend") + 5, 18, { x: 0.7, y: 1.3, z: -16.8, w: 0.35, h: 0.35 });
          S.pop("label", W(1, "William") - 3, 40, { x: 0, y: 3.05, z: -18.6, w: 1.6, h: 0.36, text: "WILLIAM DUER", bg: GOLD, hold: true }); } },
      // 4 · He was Hamilton's assistant at the Treasury: dissolve to his candle-lit study, the nameplate
      { set: "study", beat: 2, trans: "dissolve", light: "lamp", cam: CAM.fit([0.1, 1.3, -1.0], { w: 2.6, a0: -12, a1: -4, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("duer", { x: 0.1, z: -1.8, expr: "smile_closed", prop: "chin", look: 0.3 });
          S.pop("label", W(2, "assistant") - 3, 40, { x: 0.1, y: 2.85, z: -1.6, w: 2.0, h: 0.36, text: "EX-TREASURY OFFICIAL", bg: "#f4efe2", col: INK, hold: true }); S.pop("glow", W(2, "Treasury."), 18, { x: 0.15, y: 0.55, z: -0.7, w: 1.4, h: 0.5 }); } },
      // 5 · with rich partner Alexander Macomb: Macomb strides in with a money bag
      { set: "study", word: [3, "With"], lead: 3, light: "lamp", cam: CAM.fit([0.6, 1.4, -0.6], { w: 3.4, a0: 12, a1: 6, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const k = E.ss(E.prog(f, S.a, S.a + 22)); H.mbag.visible = true; H.mbag.position.set(E.lerp(2.9, 1.65, k), 0, -0.6);
          S.actor("macomb", { x: E.lerp(3.4, 1.2, k), z: -0.8, expr: "grin", mode: k < 1 ? "stroll" : "stand", phase: f * 0.06, look: -0.6 }); S.actor("duer", { x: -0.3, z: -1.8, expr: "grin", prop: "wave", wave: 0.5 + 0.5 * Math.sin(f * 0.4), look: 0.5 });
          S.pop("label", W(3, "Alexander") - 3, 40, { x: 0.85, y: 2.85, z: -0.8, w: 2.0, h: 0.36, text: "ALEXANDER MACOMB", bg: GOLD, hold: true }); S.pop("label", W(3, "rich") - 2, 26, { x: 0.85, y: 2.4, z: -0.8, w: 0.8, h: 0.3, text: "RICH", bg: GREEN, col: "#fff" }); } },
      // 6 · he borrows big to corner government bonds: PUSH THROUGH to the stage — the IOU tower stacks up block by block
      { set: "tower", word: [3, "borrows"], lead: 3, trans: "zoom", light: STAGE, cam: CAM.fit([0.2, 1.9, 0], { w: 4.2, a0: -10, a1: 2, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const t0 = S.a + 2, t1 = W(3, "bonds.") + 2;
          H.blocks.forEach((b, i) => { const ti = E.lerp(t0, t1, i / 8), k = E.easeOut(E.prog(f, ti, ti + 6)); b.visible = f >= ti; b.position.y = towerY(i) + 1.5 * (1 - k); });
          S.actor("duer", { x: -1.3, z: 0.5, expr: "laugh", prop: "up", look: 0.4 }); S.actor("macomb", { x: 1.4, z: 0.5, expr: "grin", prop: "point", look: -0.4 });
          S.pop("label", W(3, "big") - 2, 22, { x: 0, y: 3.45, z: 0.3, w: 1.5, h: 0.36, text: "BORROWED", bg: RED, col: "#fff" }); S.pop("label", W(3, "corner") - 2, 40, { x: 0, y: 3.95, z: 0.3, w: 2.2, h: 0.36, text: "CORNER THE BONDS", bg: GOLD, hold: true }); } },
      // 7 · short of cash?: the cash chest creaks open — empty, a puff of dust; Duer shrugs
      { set: "study", beat: 4, trans: "cut", steady: true, coc: 10, light: "lamp", cam: CAM.fit([2.0, 1.0, -0.6], { w: 2.2, a0: -16, a1: -10, elev: 14, push: 0.12 }),
        act: (S, u, f) => { H.lid.rotation.x = -1.6 * E.back(E.prog(f, S.a, S.a + 10)); S.actor("duer", { x: 1.3, z: -1.4, expr: "nervous", prop: "shrug", look: 0.5 });
          S.pop("puff", S.a + 8, 18, { x: 2.4, y: 0.9, z: -0.9, w: 0.9, h: 0.5 }); S.pop("label", W(4, "cash?") - 2, 30, { x: 2.3, y: 1.7, z: -0.8, w: 1.0, h: 0.32, text: "CASH: $0", bg: "#ffffff", col: RED, hold: true }); } },
      // 8 · they sign each other's notes: the two IOUs swap across the desk; Macomb winks
      { set: "study", word: [4, "They"], lead: 3, light: "lamp", cam: CAM.fit([0.15, 1.3, -1.0], { w: 2.8, a0: 6, a1: -2, elev: 8, push: 0.1 }),
        act: (S, u, f) => { const k = E.ss(E.prog(f, W(4, "each"), W(4, "notes.") + 4));
          H.noteA.position.set(E.lerp(-0.35, 0.55, k), 0.8 + 0.45 * Math.sin(PI * k), -1.05); H.noteB.position.set(E.lerp(0.55, -0.35, k), 0.8 + 0.3 * Math.sin(PI * k), -1.15); H.noteA.rotation.z = 2 * PI * k; H.noteB.rotation.z = -2 * PI * k;
          S.actor("duer", { x: -0.75, z: -1.75, expr: "grin", prop: "point", look: 0.5 }); S.actor("macomb", { x: 0.95, z: -1.75, expr: "laugh", prop: "point", look: -0.5 });
          S.say("You sign mine!", W(4, "sign") - 2, 36, { x: 0.8, y: AH + 0.85, z: -1.7, w: 1.1, h: 0.42, tail: "right" }); S.pop("sparks", W(4, "notes."), 14, { x: 0.1, y: 1.1, z: -0.9, w: 0.8, h: 0.5 }); } },
      // 9 · then, in March, Duer stops paying: whip to the street at night — lenders pound on his door, it SLAMS shut
      { set: "wall", beat: 5, trans: "whip", dir: -1, light: "night", cam: CAM.fit([0, 1.5, -17.6], { w: 3.6, a0: -14, a1: -6, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const t = W(5, "stops"); H.hdoor.leaf.rotation.y = f < t ? -1.2 : -1.2 * (1 - E.easeIn(E.prog(f, t, t + 4))); S.kick(t + 4, 0.08);
          S.actor("b1", { x: -1.2, z: -17.6, expr: f > t ? "shock" : "stern", prop: "fists", look: 0.5 }); S.actor("b2", { x: 1.2, z: -17.4, expr: f > t ? "shock" : "stern", prop: "paper", look: -0.5 });
          if (f < t + 2) S.actor("duer", { x: 0.05, z: -18.6, expr: "nervous", look: 0 });
          S.pop("label", W(5, "March,") - 3, 40, { x: 0, y: 3.4, z: -18.6, w: 1.6, h: 0.38, text: "MARCH 1792", bg: "#f4efe2", col: RED, hold: true }); S.pop("impact", t + 4, 20, { x: 0, y: 2.2, z: -18.5, w: 1.1, h: 0.5, text: "NO PAY!" }); } },
      // 10 · prices fall: whip into the coffee house — the chalk line on the price board dives
      { set: "coffee", beat: 6, trans: "whip", dir: 1, light: "interior", cam: CAM.fit([0, 1.7, -2.0], { w: 3.8, a0: 10, a1: 2, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const k = E.prog(f, S.a, W(6, "weeks.") + 4); H.board.draw({ curve: (x) => (x < 0.45 ? 0.72 + 0.08 * x : 0.756 - 0.55 * (x - 0.45)), t: 0.45 + 0.55 * k, ck: Math.round(k * 30), label: "U.S. BONDS", down: true });
          S.actor("you", { x: -1.4, z: -1.6, expr: f > W(6, "fall") ? "shock" : "neutral", look: 0.4 }); S.actor("b3", { x: 1.4, z: -1.5, expr: f > W(6, "fall") + 6 ? "shock" : "nervous", prop: "shrug", look: -0.4 }); } },
      // 11 · …over twenty percent in weeks: close on the board — −20%
      { set: "coffee", word: [6, "twenty"], lead: 4, steady: true, coc: 10, light: "interior", cam: CAM.fit([0, 2.1, -3.6], { w: 2.9, a0: -6, a1: 2, elev: 2, push: 0.1 }),
        act: (S, u, f) => { const k = E.prog(f, S.a - 30, W(6, "weeks.") + 4); H.board.draw({ curve: (x) => (x < 0.45 ? 0.72 + 0.08 * x : 0.756 - 0.55 * (x - 0.45)), t: Math.min(1, 0.6 + 0.4 * k), ck: 100 + Math.round(k * 30), label: "U.S. BONDS", down: true });
          S.pop("label", W(6, "percent") - 4, 34, { x: 0.45, y: 3.25, z: -3.4, w: 1.0, h: 0.44, text: "−20%", bg: RED, col: "#fff", hold: true }); S.pop("arrow", W(6, "weeks."), 16, { x: -0.8, y: 2.6, z: -3.4, w: 0.5, h: 0.6, dir: "down" }); } },
      // 12 · Duer lands in debtors' prison: SMASH — the barred door slides shut on him
      { set: "prison", word: [6, "Duer"], lead: 3, trans: "smash", light: "cold", cam: CAM.fit([0.1, 1.4, 1.0], { w: 2.8, a0: 12, a1: 6, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const t = W(6, "prison."); H.cell.position.x = 1.15 * (1 - E.easeIn(E.prog(f, t - 8, t))); S.kick(t, 0.12);
          S.actor("duer", { x: 0.0, z: 0.2, expr: f >= t ? "shock" : "nervous", prop: f >= t ? "shrug" : "hold", look: 0.1 });
          S.pop("impact", t, 18, { x: 1.0, y: 2.1, z: 1.5, w: 0.9, h: 0.45, text: "CLANG!" }); } },
      // 13 · so how did that build Wall Street?: dissolve to the stage — the IOU rubble, a WALL ST sign stuck in it
      { set: "tower", beat: 7, trans: "dissolve", light: (u) => K.mixLight(STAGE, K.light("night"), 0.35), cam: CAM.fit([0.4, 1.0, 0.4], { w: 3.6, a0: -16, a1: -4, e0: 18, e1: 8, push: 0.1 }),
        act: (S, u, f) => { H.blocks.forEach((b, i) => { const dir = i % 2 ? 1 : -1; b.position.set(TX[i] + dir * (0.4 + i * 0.22), 0.37 * (i % 3) * 0.6, 0.5 * (i % 3 - 1)); b.rotation.set(0.3 * (i % 2), 0.5 * dir, dir * 1.3); });
          H.wsign.visible = true; H.wsign.rotation.z = 0.15; S.actor("you", { x: -0.6, z: 1.6, expr: "nervous", prop: "chin", look: 0.4 });
          S.pop("question", W(7, "how") - 2, 50, { x: 0.4, y: 2.2, z: 1.0, w: 0.5, h: 0.6, hold: true }); } },
      // 14 · you see, borrowing is standing on a friend's shoulders: whip to the pantry — you on Ned's shoulders
      { set: "pantry", beat: 8, trans: "whip", dir: 1, light: "interior", cam: CAM.fit([0, 1.9, -1.4], { w: 3.2, a0: -12, a1: -4, elev: 6, push: 0.1 }),
        act: (S, u, f) => { S.actor("ned", { x: 0, z: -1.9, expr: "grin", prop: "up", look: 0 }); S.actor("you", { x: 0, y: 1.25, z: -1.85, expr: "smile", prop: "point", look: 0.2 });
          S.pop("label", W(8, "borrowing") - 3, 40, { x: 0, y: 3.95, z: -1.6, w: 1.5, h: 0.34, text: "BORROWING", bg: GOLD, hold: true }); S.pop("label", W(8, "friend's") - 2, 34, { x: 1.1, y: 1.0, z: -1.4, w: 0.8, h: 0.3, text: "NED", bg: "#ffffff", col: INK }); } },
      // 15 · …to reach the top shelf: close — your hand stretches for the GAINS jar
      { set: "pantry", word: [8, "reach"], lead: 3, steady: true, coc: 11, light: "interior", cam: CAM.fit([0.05, 2.95, -2.4], { w: 1.8, a0: 14, a1: 6, elev: -6, push: 0.12 }),
        act: (S, u, f) => { S.actor("ned", { x: 0, z: -1.9, expr: "grin", prop: "up" }); S.actor("you", { x: 0, y: 1.25, z: -1.85, expr: "grin", prop: "up", look: 0.2 });
          S.pop("label", W(8, "top") - 3, 30, { x: 0.1, y: 3.65, z: -2.9, w: 1.2, h: 0.3, text: "TOP SHELF", bg: "#ffffff", col: INK, hold: true }); S.pop("glow", W(8, "shelf."), 16, { x: 0.1, y: 3.2, z: -2.8, w: 0.6, h: 0.6 }); } },
      // 16 · when he wobbles: wider — Ned's knees shake, you sway, sweat flies
      { set: "pantry", beat: 9, light: "interior", cam: CAM.fit([0, 1.7, -1.2], { w: 3.4, a0: 10, a1: 4, elev: 4, push: 0.1, roll: 2 }),
        act: (S, u, f) => { const a = 12 * E.prog(f, S.a, S.a + 30) * Math.sin(f * 0.6);
          S.actor("ned", { x: 0.05 * a, z: -1.9, expr: "pained", prop: "up", tilt: a }); S.actor("you", { x: 0.06 * a, y: 1.25, z: -1.85, expr: "shock", prop: "up", tilt: a * 1.6 });
          S.pop("sweat", W(9, "wobbles,"), 24, { x: 0.5, y: 1.6, z: -1.6, w: 0.25, h: 0.3 }); S.pop("label", W(9, "wobbles,") - 3, 30, { x: 0, y: 3.7, z: -1.8, w: 1.3, h: 0.32, text: "WOBBLE", bg: RED, col: "#fff" }); } },
      // 17 · …you both hit the floor: both crash down — BONK, stars, the jar wobbles
      { set: "pantry", word: [9, "both"], lead: 2, light: "interior", cam: CAM.fit([0.1, 1.0, -1.2], { w: 3.7, a0: -8, a1: -2, elev: 14, push: 0.12 }),
        act: (S, u, f) => { const t = W(9, "floor."), k = E.easeIn(E.prog(f, S.a, t));
          S.actor("ned", { x: -0.3 * k, z: -1.8, expr: f >= t ? "dazed" : "shock", mode: f >= t ? "fall" : "stand", tilt: -40 * k }); S.actor("you", { x: 0.5 * k, y: Math.max(0, 1.25 * (1 - k)), z: -1.5, expr: f >= t ? "dazed" : "shock", mode: f >= t ? "fall" : "stand", tilt: 60 * k });
          H.jar.rotation.z = f > t ? 0.15 * Math.sin((f - t) * 0.8) * Math.exp(-(f - t) * 0.08) : 0; S.kick(t, 0.16);
          S.pop("impact", t, 20, { x: 0.2, y: 1.3, z: -1.0, w: 0.9, h: 0.45, text: "BONK!" }); S.pop("stars", t + 3, 26, { x: 0.8, y: 0.8, z: -1.2, w: 0.6, h: 0.4 }); } },
      // 18 · two months later: whip to Wall Street, spring morning — the brokers walk toward the buttonwood tree
      { set: "wall", beat: 10, trans: "whip", dir: -1, light: "golden", cam: CAM.fit([0.8, 1.8, -3.4], { w: 4.6, a0: 16, a1: 6, elev: 6, push: 0.1 }),
        act: (S, u, f) => { const d = (f - S.a) * 0.02;
          S.actor("you", { x: -0.4, z: -1.6 - d, expr: "smile", mode: "stroll", phase: f * 0.05 }); S.actor("b1", { x: 0.6, z: -2.4 - d, expr: "smile", mode: "stroll", phase: f * 0.05 + 1 }); S.actor("b3", { x: 1.6, z: -2.0 - d, expr: "grin", mode: "stroll", phase: f * 0.05 + 2 });
          S.pop("label", W(10, "Two") - 2, 40, { x: 0.8, y: 3.4, z: -3.0, w: 2.0, h: 0.38, text: "MAY 17, 1792", bg: "#f4efe2", col: GREEN, hold: true }); } },
      // 19 · …you and twenty-three brokers sign a deal: under the tree, a crowd around the table; 24 BROKERS
      { set: "wall", word: [10, "twenty-three"], lead: 3, light: "golden", cam: CAM.fit([1.0, 1.5, -4.2], { w: 4.0, a0: -10, a1: -2, elev: 8, push: 0.1 }),
        act: (S, u, f) => { const ids = [["you", -0.3, -3.9], ["b1", 0.5, -5.4], ["b2", 1.6, -5.4], ["b3", 2.3, -4.0], ["b1", -0.5, -5.0, "k1"], ["b2", 2.6, -5.1, "k2"]];
          ids.forEach(([id, x, z, key], i) => S.actor(id, { x, z, key, expr: i % 2 ? "grin" : "smile", prop: i === 0 && f > W(10, "sign") ? "point" : undefined, look: x < 1 ? 0.4 : -0.4 }));
          H.deal.draw({ n: 0, sig: Math.floor(E.prog(f, W(10, "sign"), W(10, "deal.") + 8) * 4) });
          S.pop("label", W(10, "twenty-three") - 2, 50, { x: 1.0, y: 3.3, z: -4.6, w: 1.6, h: 0.38, text: "24 BROKERS", bg: GOLD, hold: true }); } },
      // 20 · legend says, under a buttonwood tree: dissolve — the camera cranes up the big tree, leaves stirring
      { set: "wall", beat: 11, trans: "dissolve", light: "golden", cam: CAM.fit([3.0, 3.2, -6.5], { w: 6.0, a0: -24, a1: -14, e0: 0, e1: 10, push: 0.06 }),
        act: (S, u, f) => { H.tree.rotation && (H.tree.rotation.z = 0.015 * Math.sin(f * 0.15));
          S.pop("label", W(11, "Legend") - 3, 30, { x: 1.8, y: 1.3, z: -5.2, w: 1.5, h: 0.36, text: "LEGEND SAYS…", bg: "#ffffff", col: INK }); S.pop("label", W(11, "buttonwood") - 3, 34, { x: 2.0, y: 2.0, z: -5.0, w: 2.0, h: 0.36, text: "BUTTONWOOD TREE", bg: GREEN, col: "#fff", hold: true });
          S.pop("heart", W(11, "tree."), 16, { x: 1.4, y: 3.0, z: -5.2, w: 0.3, h: 0.3 }); } },
      // 21 · a minimum fee: insert on the parchment — the quill writes the two terms
      { set: "wall", beat: 12, steady: true, coc: 12, light: "golden", cam: CAM.fit([1.0, 0.84, -4.6], { w: 1.25, a0: 0, a1: 4, elev: 62, push: 0.08 }),
        act: (S, u, f) => { const n = f >= W(12, "trade") - 2 ? 2 : f >= W(12, "minimum") - 2 ? 1 : 0; H.deal.draw({ n, sig: 4 });
          H.quill.position.set(1.42 + 0.06 * Math.sin(f * 0.7), 0.86, n >= 1 ? -4.62 : -4.5); H.quill.rotation.set(0.3, 0, 0.4); } },
      // 22 · …and you trade with each other first: you shake on it with a fellow broker under the tree
      { set: "wall", word: [12, "trade"], lead: 3, light: "golden", cam: CAM.fit([0.6, 1.45, -4.0], { w: 2.6, a0: -14, a1: -6, elev: 4, push: 0.1 }),
        act: (S, u, f) => { S.actor("you", { x: 0.0, z: -3.9, expr: "laugh", prop: "point", look: 0.6 }); S.actor("b2", { x: 1.2, z: -3.9, expr: "grin", prop: "point", look: -0.6 });
          S.say("You first, partner.", W(12, "with"), 34, { x: 1.0, y: AH + 0.8, z: -3.8, w: 1.3, h: 0.44, tail: "right" }); S.pop("sparks", W(12, "first."), 14, { x: 0.6, y: 1.1, z: -3.5, w: 0.5, h: 0.4 }); } },
      // 23 · that deal grew into…: dissolve, wide — a columned exchange rises out of the cobbles behind the tree
      { set: "wall", beat: 13, trans: "dissolve", light: "golden", cam: CAM.fit([-1.0, 2.7, -10.0], { w: 6.4, a0: -12, a1: -4, elev: 5, push: 0.06 }),
        act: (S, u, f) => { const k = E.back(E.prog(f, S.a + 4, W(13, "Exchange.") - 2)); H.exch.visible = true; H.exch.scale.set(1, Math.max(0.01, k), 1); S.kick(W(13, "Exchange.") - 2, 0.06);
          S.actor("you", { x: -1.4, z: -4.6, expr: "laugh", prop: "up" }); S.actor("b1", { x: -0.4, z: -4.8, expr: "grin", prop: "up" }); S.actor("b3", { x: 0.6, z: -4.6, expr: "laugh", prop: "fists" });
          S.pop("puff", S.a + 6, 20, { x: -0.6, y: 0.4, z: -11.4, w: 6.0, h: 0.9 }); } },
      // 24 · …the New York Stock Exchange: push in on the pediment, gold sparkle
      { set: "wall", word: [13, "Stock"], lead: 4, light: "golden", cam: CAM.fit([-0.6, 3.9, -11.8], { w: 4.4, a0: 4, a1: -2, elev: -4, push: 0.1 }),
        act: (S, u, f) => { H.exch.visible = true; S.pop("sparks", W(13, "Exchange."), 20, { x: -0.6, y: 4.9, z: -11.8, w: 3.0, h: 0.6 }); S.pop("label", W(13, "New") - 2, 40, { x: -0.6, y: 2.6, z: -11.6, w: 1.4, h: 0.32, text: "NYSE", bg: GOLD, hold: true }); } },
      // 25 · Duer never left prison (music stops): cold cell, Duer alone on the stool by the window
      { set: "prison", word: [13, "Duer"], lead: 3, light: (u) => K.mixLight(K.light("cold"), K.light("night"), 0.4), cam: CAM.fit([0.0, 1.3, -0.2], { w: 2.4, a0: -10, a1: -4, elev: 6, push: 0.08, roll: 1 }),
        act: (S, u, f) => { S.actor("duer", { x: 0.0, y: 0.0, z: -0.9, expr: "pained", mode: "sit", look: 0.2 });
          S.pop("label", W(13, "never") - 2, 40, { x: 0, y: 2.25, z: 1.4, w: 1.15, h: 0.26, text: "DIED HERE · 1799", bg: "#2a2a2e", col: "#fff", hold: true }); } },
      // 26 · he'd borrowed from everybody: whip to the stage — the lenders stand around the rubble, each holding an IOU
      { set: "tower", beat: 14, trans: "whip", dir: 1, light: STAGE, cam: CAM.fit([0, 1.3, 0.6], { w: 4.2, a0: 10, a1: 2, elev: 10, push: 0.1 }),
        act: (S, u, f) => { H.blocks.forEach((b, i) => { const dir = i % 2 ? 1 : -1; b.position.set(TX[i] + dir * (0.4 + i * 0.22), 0.37 * (i % 3) * 0.6, 0.5 * (i % 3 - 1)); b.rotation.set(0.3 * (i % 2), 0.5 * dir, dir * 1.3); });
          [["b1", -1.6, 1.2], ["you", -0.5, 1.7], ["b2", 0.6, 1.7], ["b3", 1.6, 1.2]].forEach(([id, x, z]) => S.actor(id, { x, z, expr: "stern", prop: "paper", look: -x * 0.3 }));
          S.pop("label", W(14, "everybody.") - 6, 30, { x: 0, y: 3.1, z: 1.2, w: 2.0, h: 0.36, text: "OWED: EVERYBODY", bg: RED, col: "#fff", hold: true }); } },
      // 27 · so the brokers agreed: whip to the exchange steps — the brokers walk in arm in arm, MEMBERS ONLY
      { set: "wall", word: [14, "So"], lead: 3, trans: "whip", dir: -1, light: "golden", cam: CAM.fit([-0.6, 1.8, -10.4], { w: 4.0, a0: -10, a1: -4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.exch.visible = true; H.members.visible = true; const d = E.prog(f, S.a, S.a + 50);
          [["you", -1.3], ["b1", -0.4], ["b2", 0.5]].forEach(([id, x], i) => S.actor(id, { x: x - 0.6, z: -10.6 - 0.9 * d, expr: "grin", mode: "stroll", phase: f * 0.05 + i }));
          S.pop("label", W(14, "trust") - 3, 30, { x: -0.6, y: 3.0, z: -10.2, w: 1.8, h: 0.34, text: "TRUST ONLY US", bg: GOLD }); } },
      // 28 · …only each other.: the great doors SLAM shut on the last word
      { set: "wall", word: [14, "only"], lead: 3, light: "golden", cam: CAM.fit([-0.6, 1.9, -11.2], { w: 3.2, a0: 6, a1: 2, elev: 2, push: 0.12 }),
        act: (S, u, f) => { const t = W(14, "other."), k = E.easeIn(E.prog(f, t - 8, t)); H.exch.visible = true; H.members.visible = true;
          H.dL.rotation.y = -1.3 * (1 - k); H.dR.rotation.y = 1.3 * (1 - k); S.kick(t, 0.2);
          S.pop("impact", t, 24, { x: 0.4, y: 2.3, z: -11.6, w: 1.1, h: 0.55, text: "SLAM!" }); S.pop("puff", t, 18, { x: -0.6, y: 0.8, z: -11.8, w: 2.6, h: 0.8 }); } },
    ],
  };
};
