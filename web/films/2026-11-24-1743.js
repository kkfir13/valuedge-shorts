// "The Stocks You'd Never Sell" (the 1972 Nifty Fifty: Polaroid at ~95x earnings, the 1973-74 crash, Siegel's test from the top,
// Philip Morris paid 24x but worth 68x) — film module.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const H = {};
  const PI = Math.PI;
  // text texture whose canvas matches the plate's aspect (no squashed letters)
  const tt = (B, s, bg, fg, pw, ph) => B.textTex(s, bg, fg, 1024, Math.round((1024 * ph) / pw));
  const hide = (o) => { o.visible = false; if (o.userData && o.userData.base) o.userData.base.v = false; return o; };
  const SHOW = K.backdrop("#3b2a5e");          // the showroom's purple velvet
  const PZ = -1.0;                             // z of the three hero pedestals
  const PX = { avon: -2.1, pola: 0, pm: 2.1 };
  const PH = 1.0;                              // hero pedestal height

  // a giant instant camera (white body, black lens, rainbow stripe) — the POLAROID exhibit
  const instantCam = (B, x, y, z) => { const g = B.grp(x, y, z, 0, 1);
    B.box(1.2, 0.75, 0.7, "#f4f2ea", 0, 0, 0, { in: g }); B.box(1.2, 0.18, 0.72, "#2a2a30", 0, 0.75, -0.02, { in: g });
    B.cyl(0.24, 0.24, 0.1, "#1e1e24", -0.1, 0.36, 0.36, { in: g, rx: PI / 2, seg: 24 }); B.cyl(0.15, 0.15, 0.12, "#4a7ab8", -0.1, 0.36, 0.38, { in: g, rx: PI / 2, seg: 24 });
    B.box(0.28, 0.16, 0.06, "#d8eef8", 0.38, 0.52, 0.34, { in: g });
    ["#e2453c", "#f08a2c", "#f2c14e", "#4fb86a", "#3f8fe0"].forEach((c, i) => B.box(0.08, 0.5, 0.02, c, 0.25 + i * 0.08, 0.06, 0.355, { in: g }));
    B.box(0.9, 0.04, 0.4, "#f4f2ea", 0, -0.02, 0.15, { in: g }); return B.dyn(g); };
  // a giant gold-and-red lipstick — the AVON exhibit
  const lipstick = (B, x, y, z) => { const g = B.grp(x, y, z, 0, 1);
    B.cyl(0.3, 0.3, 0.6, "#c9a44a", 0, 0, 0, { in: g, seg: 24 }); B.cyl(0.26, 0.26, 0.45, "#e8c86a", 0, 0.6, 0, { in: g, seg: 24 });
    const tip = B.dyn(B.grp(0, 1.05, 0, 0, 1, g)); B.cyl(0.22, 0.22, 0.4, "#d02a4a", 0, 0, 0, { in: tip, seg: 24 }); B.cone(0.22, 0.32, "#e2385a", 0, 0.4, 0, { in: tip, seg: 24 });
    return { g: B.dyn(g), tip }; };
  // a gold box with a name — the PHILIP MORRIS exhibit (no logo, just the name)
  const goldBox = (B, x, y, z) => { const g = B.grp(x, y, z, 0, 1);
    B.box(0.85, 1.05, 0.6, "#e0b23e", 0, 0, 0, { in: g }); B.box(0.87, 0.12, 0.62, "#b8862a", 0, 0.88, 0, { in: g });
    B.plate(0.8, 0.16, tt(B, "PHILIP MORRIS", "#fbf3dc", "#5a3a10", 0.8, 0.16), 0, 0.5, 0.31, { in: g, d: 0.01 }); return B.dyn(g); };
  // a silver cloche over a dish (lid animatable)
  const cloche = (B, x, y, z, s = 1) => { const g = B.grp(x, y, z, 0, s);
    B.cyl(0.32, 0.3, 0.03, "#f4f6fa", 0, 0, 0, { in: g, seg: 28 }); const food = B.dyn(B.grp(0, 0.03, 0, 0, 1, g));
    B.ball(0.17, "#8a4a2a", 0, 0.06, 0, { in: food, sx: 1.3, sy: 0.5 }); B.ball(0.06, "#4fa04a", 0.14, 0.08, 0.06, { in: food }); B.ball(0.05, "#e2453c", -0.12, 0.08, 0.08, { in: food });
    const lid = B.dyn(B.grp(0, 0.03, 0, 0, 1, g)); B.ball(0.28, "#c8ced6", 0, 0, 0, { in: lid, sy: 0.75 }); B.ball(0.045, "#c8ced6", 0, 0.23, 0, { in: lid });
    return { g: B.dyn(g), lid, food }; };

  return {
    cast: {
      you: { jacket: "#9a5a2a", pants: "#6a4a2e", boots: "#3a2418", hat: "hair", hair: "#5a3a24", skin: "#f2c9a4", buttons: "#c9a44a", pins: "#f2c14e" },
      youOld: { jacket: "#4a5a6a", pants: "#3a3a40", boots: "#2a2420", hat: "hair", hair: "#d0d0d0", skin: "#f2c9a4", buttons: "#c9c9c9" },
      pem: { jacket: "#26324e", pants: "#26324e", boots: "#1a1418", hat: "hair", hair: "#e4e4e4", moustache: "#e4e4e4", skin: "#f0c4a2", buttons: "#c9a44a", build: "stout" },
      waiter: { jacket: "#f4f6fa", pants: "#1a1a20", boots: "#121216", hat: "hair", hair: "#1a1a20", moustache: "#1a1a20", skin: "#d9a27a", buttons: "#1a1a20" },
      walkA: { jacket: "#2f8a8a", pants: "#3a3a40", boots: "#2a2420", hat: "hair", hair: "#2a201a", skin: "#c99067" },
      walkB: { jacket: "#d8742a", pants: "#4a3a2a", boots: "#2a2420", hat: "hair", hair: "#e8c86a", dress: "#d8742a", skin: "#f5d6b8" },
    },
    sets: {
      // metaphor: a velvet-rope showroom of golden "never sell" exhibits
      show: (B) => {
        B.set.stage({ floor: "#e8d8c0", back: "#3b2a5e" });
        B.prop.bulbSign({ x: 0, y: 3.4, z: -6.2, w: 4.6, h: 1.0, text: "THE NIFTY FIFTY", bg: "#1e1636", fg: "#ffd84a" });
        B.prop.rug({ x: 0, z: 0.6, w: 7.5, d: 4.5, col: "#7a1e2e" });
        // three hero pedestals
        for (const k of ["avon", "pola", "pm"]) B.prop.pedestal({ x: PX[k], z: PZ, r: 0.62, h: PH, col: "#f4efe2", trim: "#c9a44a" });
        H.lip = lipstick(B, PX.avon, PH, PZ); H.cam = instantCam(B, PX.pola, PH, PZ - 0.05); H.pm = goldBox(B, PX.pm, PH, PZ);
        const nm = (s, x) => B.plate(1.1, 0.2, tt(B, s, "#1e1636", "#ffd84a", 1.1, 0.2), x, 0.55, PZ + 0.66, { d: 0.02, edge: "#c9a44a" });
        nm("AVON", PX.avon); nm("POLAROID", PX.pola); nm("PHILIP MORRIS", PX.pm);
        // price tags on stands (flip between texts)
        const tag = (s, x, bg, fg = "#241726") => hide(B.dyn(B.plate(1.4, 0.3, tt(B, s, bg, fg, 1.4, 0.3), x, 2.3, PZ + 0.35, { d: 0.02, edge: "#c9a44a" })));
        H.tagP = tag("95x EARNINGS", PX.pola, "#ffd84a"); H.tagA = tag("- 86%", PX.avon, "#ff6a5a", "#ffffff"); H.tagP2 = tag("- 90%", PX.pola, "#ff6a5a", "#ffffff");
        H.tagM = tag("24x EARNINGS", PX.pm, "#f4efe2"); H.tagM2 = tag("WORTH 68x", PX.pm, "#4fd18b");
        // the "never sell" plaque that slams onto the Polaroid pedestal at frame 0
        H.plaque = B.dyn(B.plate(1.0, 0.3, tt(B, "NEVER SELL", "#c0353a", "#ffffff", 1.0, 0.3), PX.pola, 0.28, PZ + 0.68, { d: 0.03, edge: "#c9a44a" }));
        // velvet ropes
        for (const x of [-3.2, -1.05, 1.05, 3.2]) { B.cyl(0.05, 0.07, 0.95, "#c9a44a", x, 0, 0.3); B.ball(0.08, "#e0b23e", x, 0.98, 0.3); }
        for (const [a, b] of [[-3.2, -1.05], [-1.05, 1.05], [1.05, 3.2]]) B.cyl(0.035, 0.035, b - a, "#b01e3a", (a + b) / 2, 0.82, 0.3, { rz: PI / 2 });
        // the other forty-seven: rows of small gold exhibits behind
        for (let r = 0; r < 2; r++) for (let i = 0; i < 9; i++) { const x = -4.4 + i * 1.1, z = -3.4 - r * 1.3;
          B.cyl(0.28, 0.3, 0.7 + r * 0.25, "#efe6d4", x, 0, z, { seg: 18 }); const y = 0.7 + r * 0.25;
          if ((i + r) % 3 === 0) B.ball(0.22, "#e0b23e", x, y + 0.22, z); else if ((i + r) % 3 === 1) B.box(0.34, 0.4, 0.34, "#e0b23e", x, y, z); else B.cone(0.22, 0.5, "#e0b23e", x, y, z); }
        // the one big red BUY button (only in its shot)
        H.btn = hide(B.dyn(B.grp(1.0, 0, 1.3, 0, 1))); B.cyl(0.3, 0.34, 0.9, "#f4efe2", 0, 0, 0, { in: H.btn, seg: 20 });
        H.btnTop = B.dyn(B.ball(0.24, "#e2252c", 0, 0.92, 0, { in: H.btn, sy: 0.55 }));
        B.plate(0.5, 0.16, tt(B, "BUY", "#f4efe2", "#c0353a", 0.5, 0.16), 0, 0.6, 0.32, { in: H.btn, d: 0.01 });
        B.lamp(0, 5, 2.5, "#fff0c8", 6, 12); B.lamp(-3, 3.5, 1, "#ffd0a0", 3, 8);
      },
      // New York, 1972: a brick-and-glass avenue, a big quote board for the crash
      ave: (B) => {
        B.set.street({ style: ["brick", "modern"], signs: ["TRUST CO.", "DELI", "SHOE SHINE", "RECORDS", "DINER", "BANK"], seed: 21 });
        B.prop.car({ x: -2.6, z: -5, col: "#d8742a" }); B.prop.car({ x: 2.4, z: -14, ry: PI, col: "#5a7a3a" });
        for (const z of [2, -10]) B.prop.lampPost({ x: 4.8, z });
        H.board = B.prop.screen({ x: 0, y: 0, z: -7.5, w: 4.4, h: 2.4, y0: 1.9, stand: true, label: "STOCK MARKET 1973-74", curve: (x) => 0.85 - 0.75 * x ** 1.3, down: true, t: 0 });
        H.paper = B.prop.newspaper({ x: 1.6, y: 0, z: -2.6, flat: true, text: "CRASH" });
      },
      // the 1972 trust department: orange wallpaper, avocado carpet, a desk with the list
      office: (B) => {
        B.set.room({ style: "office", wall: "wallpaper:#c8742a", floor: "carpet:#6b7a2a", w: 7, d: 6, h: 3.2, windows: [2.0], door: false });
        B.prop.desk({ x: 0, z: -1.3, w: 1.9, col: "floor:#7a4a2a" }); H.pchair = B.prop.chair({ x: 0, z: -1.95, col: "#3a2418" });
        B.prop.chair({ x: 1.4, z: -0.2, ry: -0.5, col: "#d8742a" });
        B.prop.lamp({ x: -0.75, y: 0.81, z: -1.35, kind: "desk" }); B.prop.lamp({ x: 0.3, y: 3.2, z: -0.8, kind: "hang", cord: 0.5, intensity: 4 });
        B.prop.phone({ x: 0.7, y: 0.81, z: -1.45 }); B.prop.shelf({ x: -2.7, z: -2.75, w: 1.0, h: 2.2 }); B.prop.plant({ x: 2.9, z: -2.6 });
        B.prop.poster({ x: -1.4, y: 1.3, z: -2.95, w: 1.0, h: 1.3, text: "BUY & HOLD", bg: "#f2c14e", fg: "#5a2a1a" });
        B.cyl(0.07, 0.09, 0.34, "#f08a2c", -0.45, 0.81, -1.5, { seg: 12 }); B.ball(0.06, "#ffd84a", -0.45, 1.0, -1.5);   // a lava lamp
        // the list: a sheet of paper that slides across the desk, with readable lines
        H.list = B.dyn(B.grp(-0.25, 0.815, -1.2, 0, 1)); B.box(0.62, 0.01, 0.8, "#fbf8ee", 0, 0, 0, { in: H.list });
        const L = ["THE NIFTY FIFTY", "POLAROID", "AVON", "COCA-COLA", "PHILIP MORRIS", "XEROX", "IBM", "... 44 MORE"];
        L.forEach((s, i) => B.plate(0.54, 0.075, tt(B, s, "#fbf8ee", i ? "#241726" : "#c0353a", 0.54, 0.075), 0, 0.012, -0.32 + i * 0.092, { in: H.list, d: 0.002, rx: -PI / 2 }));
        B.lamp(0, 2.8, 1.5, "#ffe2b0", 4, 9);
      },
      // 1998: a professor's library at night, a quote screen and two bars
      lib: (B) => {
        B.set.room({ style: "library", w: 8, d: 6, h: 3.6, door: false });
        B.prop.desk({ x: -1.4, z: -1.4, w: 1.6 }); B.prop.lamp({ x: -1.9, y: 0.81, z: -1.45, kind: "desk" });
        for (let i = 0; i < 4; i++) B.box(0.42, 0.06, 0.32, i % 2 ? "#f4efe2" : "#e8dcc4", -1.1, 0.81 + i * 0.06, -1.35, { ry: i * 0.2 });
        // a mortarboard on the desk (the professor stays off screen)
        B.box(0.5, 0.03, 0.5, "#1e1e24", -1.75, 0.98, -1.2, { ry: 0.6 }); B.cyl(0.14, 0.16, 0.14, "#1e1e24", -1.75, 0.84, -1.2);
        H.scr = B.prop.screen({ x: 1.0, y: 0, z: -2.4, w: 2.6, h: 1.6, y0: 1.2, stand: true, label: "NIFTY FIFTY, BOUGHT DEC 1972", curve: (x) => 0.95 - 0.55 * Math.sin(Math.min(1, x * 3) * PI / 2) + 0.55 * Math.max(0, x - 0.3) ** 1.2, t: 0 });
        H.bars = B.prop.bars3d({ x: 1.0, z: -0.9, vals: [0.92, 1.0], cols: ["#f2c14e", "#4f9ad8"], bw: 0.55, gap: 0.5, h: 1.6 });
        B.plate(0.9, 0.2, tt(B, "NIFTY 50", "#1e1e24", "#f2c14e", 0.9, 0.2), 0.47, 0.12, -0.55, { d: 0.01 });
        B.plate(0.9, 0.2, tt(B, "MARKET", "#1e1e24", "#8fc4f0", 0.9, 0.2), 1.53, 0.12, -0.55, { d: 0.01 });
        B.lamp(1, 3, 0.5, "#cfe0ff", 3, 8);
      },
      // the analogy and the mechanism: a fancy restaurant, a perfect dish and a crazy bill
      rest: (B) => {
        B.set.room({ style: "home", wall: "wallpaper:#7a1e2e", floor: "tiles:#2a2226:#e8dcc8", w: 8, d: 6, h: 3.6, windows: [-2.6, 2.6], lit: true, door: false });
        B.prop.table({ x: 0, z: -0.8, w: 1.3, d: 0.9, h: 0.78, col: "#f4f2ea" }); B.box(1.36, 0.25, 0.96, "#f4f2ea", 0, 0.55, -0.8, { cast: false });
        B.prop.chair({ x: -0.95, z: -0.8, ry: PI / 2, col: "#3a2418" }); B.prop.chair({ x: 0.95, z: -0.8, ry: -PI / 2, col: "#3a2418" });
        H.dish = cloche(B, -0.2, 0.8, -0.75);
        for (const x of [0.35, 0.45]) { B.cyl(0.02, 0.02, 0.2, "#f4efe2", x, 0.8, -1.05); } B.ball(0.03, "#ffd84a", 0.35, 1.03, -1.05); B.ball(0.03, "#ffd84a", 0.45, 1.03, -1.05);   // candles
        B.prop.lamp({ x: 0, y: 3.6, z: -0.8, kind: "hang", cord: 1.0, intensity: 5, glow: "#ffd8a0" });
        B.prop.plant({ x: -3.2, z: -2.5 }); B.prop.plant({ x: 3.2, z: -2.5 });
        B.plate(1.6, 0.4, tt(B, "CHEZ MARKET", "#2a1418", "#ffd84a", 1.6, 0.4), 0, 2.7, -2.95, { d: 0.03, edge: "#c9a44a" });
        // the bill: a receipt that unrolls down to the floor
        H.bill = hide(B.dyn(B.grp(0.35, 0.79, -0.55, 0, 1)));
        B.box(0.32, 0.005, 0.24, "#fbf8ee", 0, 0, 0, { in: H.bill }); B.plate(0.3, 0.1, tt(B, "$ 9,500", "#fbf8ee", "#c0353a", 0.3, 0.1), 0, 0.007, 0, { in: H.bill, d: 0.002, rx: -PI / 2 });
        H.roll = B.dyn(B.grp(0.3, 0.79, -0.3, 0, 1)); B.box(0.3, 1.0, 0.006, "#fbf8ee", 0, -1.0, 0, { in: H.roll }); hide(H.roll);
        // price vs worth columns for Polaroid and Philip Morris (on the table)
        H.priceCol = hide(B.dyn(B.grp(-0.25, 0.8, -1.0, 0, 1))); B.box(0.24, 1.6, 0.24, "#e2453c", 0, 0, 0, { in: H.priceCol });
        B.plate(0.4, 0.13, tt(B, "PRICE", "#e2453c", "#ffffff", 0.4, 0.13), 0, 1.72, 0.13, { in: H.priceCol, d: 0.01 });
        H.worthCol = hide(B.dyn(B.grp(0.25, 0.8, -1.0, 0, 1))); B.box(0.24, 0.2, 0.24, "#4fd18b", 0, 0, 0, { in: H.worthCol });
        B.plate(0.4, 0.13, tt(B, "WORTH", "#4fd18b", "#123", 0.4, 0.13), 0, 0.32, 0.13, { in: H.worthCol, d: 0.01 });
        // the finale's giant price tag
        H.bigTag = hide(B.dyn(B.grp(0, 4, -0.55, 0, 1)));
        B.box(1.5, 0.7, 0.06, "#ffd84a", 0, 0, 0, { in: H.bigTag }); B.plate(1.4, 0.42, tt(B, "THE PRICE", "#ffd84a", "#7a1e2e", 1.4, 0.42), 0, 0.35, 0.04, { in: H.bigTag, d: 0.01 });
        B.ball(0.06, "#241726", -0.62, 0.35, 0.05, { in: H.bigTag });
        B.lamp(0, 2.6, 1.2, "#ffd0a0", 4, 9);
      },
    },
    shots: [
      // 0 · frame 0: in the showroom, a NEVER SELL plaque slams onto the Polaroid pedestal, the exhibit flashes
      { set: "show", f: 0, light: SHOW, cam: CAM.fit([0, 1.4, PZ + 0.4], { w: 2.4, a0: -18, a1: -4, elev: 6, push: 0.15 }),
        act: (S, u, f) => { H.plaque.position.y = 0.28 + 2.4 * (1 - E.easeIn(E.prog(f, 0, 7)));
          S.kick(7, 0.08); S.pop("impact", 7, 24, { x: 0.6, y: 0.9, z: PZ + 1.0, w: 0.9, h: 0.6, text: "LOCKED!" });
          S.pop("burst", 12, 12, { x: 0, y: 1.4, z: PZ + 0.5, w: 1.2, h: 1.0, pop: false }); S.pop("sparks", 8, 18, { x: 0, y: 0.5, z: PZ + 0.8, w: 1.0, h: 0.5 }); } },
      // 1 · fifty stocks: whip back to the whole showroom, rows of golden exhibits
      { set: "show", word: [0, "fifty"], lead: 3, trans: "whip", dir: 1, light: SHOW, cam: CAM.keys([[0, { p: [-3.0, 2.6, 7.5], t: [-0.8, 1.4, -2.5], fov: 42 }], [1, { p: [2.4, 2.4, 7.0], t: [0.6, 1.4, -2.5], fov: 42 }]]),
        act: (S, u, f) => { S.pop("label", W(0, "stocks") - 2, 40, { x: 0, y: 2.6, z: -0.6, w: 2.4, h: 0.45, text: "50 STOCKS", bg: "#ffd84a", hold: true }); } },
      // 2 · you'd never have to sell: insert on the plaque, a red stamp lands on "sell"
      { set: "show", word: [0, "never"], lead: 3, steady: true, coc: 11, light: SHOW, cam: CAM.fit([0, 0.5, PZ + 0.7], { w: 1.5, a0: 6, a1: 0, elev: 6, push: 0.12 }),
        act: (S, u, f) => { const t = W(0, "sell."); S.kick(t, 0.06); S.pop("impact", t, 26, { x: 0.35, y: 0.85, z: PZ + 0.9, w: 0.7, h: 0.45, text: "EVER!" }); } },
      // 3 · imagine you're a young bank trust officer: whip to a New York avenue, 1972
      { set: "ave", beat: 1, trans: "whip", dir: -1, light: "cold", cam: CAM.fit([0, 1.3, 2.5], { w: 3.0, a0: -14, a1: -4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { S.actor("you", { x: 0, z: 2.0 + 0.02 * (f - S.a), expr: "grin", mode: "stroll", phase: f * 0.06 });
          S.actor("walkA", { x: -1.6, z: -1.0, expr: "neutral", mode: "stroll", phase: f * 0.05 + 2 });
          S.pop("label", W(1, "you're") - 2, 44, { x: 0, y: 2.55, z: 2.6, w: 2.2, h: 0.42, text: "NEW YORK, 1972", bg: "#f4efe2", hold: true }); } },
      // 4 · trust officer: dissolve into the trust department, YOU at the desk
      { set: "office", word: [1, "trust"], lead: 3, trans: "dissolve", light: "office", cam: CAM.fit([0.5, 1.2, -0.6], { w: 2.6, a0: 16, a1: 6, elev: 5 }),
        act: (S, u, f) => { S.actor("you", { x: 0.75, z: -0.4, expr: "smile", prop: "hold" }); S.actor("pem", { x: 0, z: -1.91, mode: "sit", expr: "neutral" });
          S.pop("label", W(1, "officer,") - 2, 40, { x: 0.75, y: 2.05, z: -0.3, w: 0.8, h: 0.26, text: "YOU", bg: "#ffd84a", hold: true }); } },
      // 5 · old Mister Pembroke slides you the list
      { set: "office", word: [1, "old"], lead: 3, light: "office", cam: CAM.fit([-0.05, 1.15, -1.5], { w: 2.1, a0: -14, a1: -6, elev: 7, push: 0.12 }),
        act: (S, u, f) => { const k = E.ss(E.prog(f, W(1, "slides"), W(1, "list.")));
          H.list.position.x = -0.25 + 0.55 * k; S.actor("pem", { x: 0, z: -1.91, mode: "sit", expr: "grin", prop: "point" });
          S.pop("label", W(1, "Mister") - 2, 32, { x: 0, y: 2.0, z: -1.7, w: 1.4, h: 0.26, text: "MR. PEMBROKE", bg: "#f4efe2", hold: true });
          S.say("Buy these. Forever.", W(1, "slides") + 2, 34, { x: -0.45, y: 1.95, z: -1.5, w: 1.2, h: 0.4 }); } },
      // 6 · the Nifty Fifty: insert, top-down on the list
      { set: "office", beat: 2, steady: true, coc: 12, light: "office", cam: CAM.keys([[0, { p: [0.3, 1.85, -0.75], t: [0.3, 0.81, -1.22], fov: 36 }], [1, { p: [0.3, 1.7, -0.85], t: [0.3, 0.81, -1.22], fov: 36 }]]),
        act: (S, u, f) => { H.list.position.x = 0.3; S.pop("stars", W(2, "Fifty.") - 2, 22, { x: 0.3, y: 0.95, z: -1.5, w: 0.6, h: 0.3 }); } },
      // 7 · one-decision stocks: whip to the showroom, a single red BUY button
      { set: "show", word: [2, "One-decision"], lead: 3, trans: "whip", dir: 1, light: SHOW, cam: CAM.fit([0.85, 1.15, 1.2], { w: 2.4, a0: -20, a1: -10, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.btn.visible = true; const t = W(2, "buy"); H.btnTop.position.y = f >= t && f < t + 5 ? 0.86 : 0.92;
          S.actor("you", { x: 0.35, z: 1.45, expr: f < t ? "stern" : "grin", prop: f < t ? "fists" : "point" });
          S.pop("label", W(2, "stocks:") - 2, 30, { x: 0.8, y: 2.2, z: 1.2, w: 1.5, h: 0.32, text: "ONE DECISION", bg: "#ffd84a", hold: true });
          S.kick(t, 0.06); S.pop("impact", t, 22, { x: 1.2, y: 1.5, z: 1.5, w: 0.8, h: 0.55, text: "BUY!" }); } },
      // 8 · never think again: back in the office, both lean back and snooze
      { set: "office", word: [2, "never"], lead: 3, trans: "dissolve", light: "office", cam: CAM.fit([0.4, 1.1, -1.0], { w: 2.7, a0: 10, a1: 2, elev: 5, push: 0.1 }),
        act: (S, u, f) => { H.list.position.x = 0.3; S.actor("pem", { x: 0, z: -1.91, mode: "sit", expr: "smile_closed", headTilt: 0.2 });
          S.actor("you", { x: 1.4, z: -0.16, mode: "sit", expr: "smile_closed", headTilt: -0.2 });
          S.pop("zz", W(2, "think") - 2, 40, { x: 0.15, y: 1.75, z: -1.8, w: 0.4, h: 0.4, hold: true }); S.pop("zz", W(2, "again.") - 2, 30, { x: 1.55, y: 1.7, z: -0.1, w: 0.35, h: 0.35, hold: true }); } },
      // 9 · Polaroid costs ninety-five times earnings: the giant camera, the tag swings in
      { set: "show", beat: 3, trans: "whip", dir: -1, light: SHOW, cam: CAM.fit([0, 1.75, PZ + 0.2], { w: 2.8, a0: 10, a1: 0, elev: 3, push: 0.1 }),
        act: (S, u, f) => { const t = W(3, "ninety-five"); H.tagP.visible = f >= t - 2; H.tagP.rotation.x = -1.4 * (1 - E.ss(E.prog(f, t - 2, t + 6)));
          S.pop("burst", W(3, "costs"), 10, { x: -0.1, y: 1.4, z: PZ + 0.5, w: 1.2, h: 1.0, pop: false }); S.kick(t, 0.05); S.pop("dollar", t + 4, 24, { x: 0.75, y: 2.75, z: PZ + 0.3, w: 0.35, h: 0.35 }); } },
      // 10 · Pembroke doesn't blink: close-up, a camera flash pops right in his face, he stays put
      { set: "office", word: [3, "Pembroke"], lead: 3, trans: "whip", dir: 1, light: "office", cam: CAM.fit([0, 1.15, -1.9], { w: 1.6, a0: -6, a1: 4, elev: 3, push: 0.08 }), coc: 10,
        act: (S, u, f) => { S.actor("pem", { x: 0, z: -1.91, mode: "sit", expr: "stern" });
          const t = W(3, "blink."); S.pop("burst", t - 10, 10, { x: 0.35, y: 1.55, z: -1.6, w: 0.9, h: 0.9, pop: false }); S.flash(f >= t - 10 && f < t - 6 ? 0.5 : 0);
          S.pop("label", t - 2, 26, { x: 0, y: 1.75, z: -1.6, w: 1.2, h: 0.22, text: "NOT A BLINK", bg: "#f4efe2", hold: true }); } },
      // 11 · then the market falls almost in half: smash onto the avenue in a storm, the board crashes
      { set: "ave", beat: 4, trans: "smash", light: "storm", cam: CAM.fit([0, 2.6, -6.5], { w: 6.0, a0: -10, a1: 2, e0: 2, e1: 6, push: 0.1 }),
        act: (S, u, f) => { H.board.draw({ t: 0.15 + 0.85 * E.prog(f, S.a, W(4, "half.") + 2), label: "STOCK MARKET 1973-74", down: true });
          S.actor("walkA", { x: -1.4, z: -3.6, expr: "shock", prop: "up" }); S.actor("walkB", { x: 1.3, z: -3.9, expr: "shock", prop: "paper" });
          S.pop("arrow", W(4, "falls") - 2, 40, { x: 2.0, y: 3.6, z: -7.2, w: 0.6, h: 0.9, dir: "down", hold: true });
          S.kick(W(4, "half."), 0.08); S.pop("label", W(4, "half.") - 2, 30, { x: 0, y: 4.7, z: -7.2, w: 2.6, h: 0.55, text: "ALMOST HALF", bg: "#ff6a5a", hold: true }); } },
      // 12 · Avon drops eighty-six percent: the giant lipstick sinks into its case
      { set: "show", beat: 5, trans: "whip", dir: 1, light: "danger", cam: CAM.fit([PX.avon, 1.7, PZ], { w: 2.2, a0: -10, a1: -2, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const t = W(5, "eighty-six"); const k = E.easeIn(E.prog(f, t - 4, t + 6)); H.lip.tip.position.y = 1.05 - 0.9 * k; H.lip.tip.scale.y = 1 - 0.6 * k;
          H.tagA.visible = f >= t; S.kick(t + 4, 0.06); S.pop("sweat", t, 20, { x: PX.avon + 0.4, y: 2.2, z: PZ + 0.3, w: 0.25, h: 0.3 }); S.pop("puff", t + 6, 14, { x: PX.avon, y: 1.6, z: PZ + 0.4, w: 0.8, h: 0.5, pop: false }); } },
      // 13 · Polaroid drops ninety: the giant camera topples off its pedestal
      { set: "show", word: [5, "Polaroid"], lead: 3, trans: "whip", dir: 1, light: "danger", cam: CAM.fit([0.2, 1.5, PZ], { w: 2.8, a0: 6, a1: 0, elev: 5, push: 0.1, roll: 2 }),
        act: (S, u, f) => { const t = W(5, "ninety."); const k = E.easeIn(E.prog(f, t - 10, t)); H.cam.rotation.z = -1.4 * k; H.cam.position.x = 0.9 * k; H.cam.position.y = PH - (PH + 0.05) * k;
          H.tagP2.visible = f >= t; S.kick(t, 0.12); S.pop("impact", t, 28, { x: 0.9, y: 0.9, z: PZ + 0.8, w: 1.1, h: 0.75, text: "CRASH!" }); S.pop("smoke", t + 2, 22, { x: 0.9, y: 0.3, z: PZ + 0.6, w: 1.4, h: 0.8, pop: false }); } },
      // 14 · so were the experts just fools? night in the office, both men slumped, question marks
      { set: "office", beat: 6, trans: "whip", dir: -1, light: "lamp", cam: CAM.fit([0.5, 1.15, -1.0], { w: 2.6, a0: -10, a1: -2, elev: 4, push: 0.12 }),
        act: (S, u, f) => { H.list.position.x = 0.3; S.actor("pem", { x: 0, z: -1.91, mode: "sit", expr: "dazed" }); S.actor("you", { x: 1.0, z: -0.5, expr: "nervous", prop: "chin" });
          S.pop("question", S.a + 6, 40, { x: 0, y: 1.95, z: -1.8, w: 0.35, h: 0.5, hold: true }); S.pop("question", W(6, "fools?") - 4, 30, { x: 1.1, y: 2.15, z: -0.4, w: 0.35, h: 0.5, hold: true }); } },
      // 15 · later, a professor tested it: flash forward to a 1998 library, a mortarboard on the desk
      { set: "lib", beat: 7, trans: "flash", light: "lamp", cam: CAM.fit([-0.3, 1.3, -1.6], { w: 3.6, a0: -14, a1: -4, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.scr.draw({ t: 0 }); H.bars.grow(0.001); for (let q = 0; q < 3; q++) S.pop("page", W(7, "tested") + q * 5, 22, { x: -1.1 + q * 0.2, y: 1.3 + q * 0.15, z: -1.2, w: 0.3, h: 0.35 });
          S.pop("label", W(7, "professor") - 2, 40, { x: -1.4, y: 2.1, z: -1.2, w: 1.6, h: 0.3, text: "A PROFESSOR'S TEST", bg: "#f4efe2", hold: true }); } },
      // 16 · the whole list, bought at the very top: insert on the screen, the line starts at the peak
      { set: "lib", word: [7, "whole"], lead: 3, steady: true, coc: 10, light: "lamp", cam: CAM.fit([1.0, 2.0, -2.4], { w: 2.9, a0: -4, a1: 4, elev: 2, push: 0.08 }),
        act: (S, u, f) => { H.scr.draw({ t: 0.03 + 0.12 * E.prog(f, S.a, W(7, "top.") + 6) }); H.bars.grow(0.001);
          S.pop("arrow", W(7, "very") - 2, 30, { x: 0.05, y: 2.95, z: -2.2, w: 0.3, h: 0.4, dir: "down", hold: true });
          S.pop("label", W(7, "top.") - 2, 26, { x: 0.3, y: 3.25, z: -2.2, w: 1.0, h: 0.26, text: "THE TOP", bg: "#ff6a5a", hold: true }); } },
      // 17 · twenty-six years on, it had nearly matched the market: two bars grow almost level
      { set: "lib", beat: 8, trans: "dissolve", light: "lamp", cam: CAM.fit([1.0, 1.1, -0.9], { w: 2.6, a0: 12, a1: 4, elev: 5, push: 0.1 }),
        act: (S, u, f) => { H.scr.draw({ t: 1 }); const k = E.ss(E.prog(f, S.a + 4, W(8, "matched"))); H.bars.grow(Math.max(0.001, k));
          S.pop("label", S.a + 2, 40, { x: 1.0, y: 2.55, z: -0.9, w: 1.4, h: 0.3, text: "1972 → 1998", bg: "#f4efe2", hold: true });
          S.pop("sparks", W(8, "matched"), 20, { x: 1.0, y: 1.8, z: -0.8, w: 1.4, h: 0.5 }); } },
      // 18 · …the market: an older YOU reads the result, grins
      { set: "lib", word: [8, "market."], lead: 6, trans: "dissolve", light: "lamp", cam: CAM.fit([-0.7, 1.4, -0.4], { w: 2.0, a0: -10, a1: -2, elev: 4 }),
        act: (S, u, f) => { H.scr.draw({ t: 1 }); H.bars.grow(1); S.actor("youOld", { x: -0.8, z: -0.4, expr: "grin", prop: "paper" });
          S.say("Nearly a tie!", S.a + 2, 30, { x: -1.0, y: 2.05, z: -0.3, w: 1.0, h: 0.36 }); } },
      // 19 · you see — push through into a fancy restaurant
      { set: "rest", beat: 9, trans: "zoom", light: "lamp", cam: CAM.fit([0, 1.25, -0.8], { w: 3.4, a0: -14, a1: -4, e0: 6, e1: 10, push: 0.12 }),
        act: (S, u, f) => { S.actor("you", { x: -0.98, z: -0.76, mode: "sit", expr: "grin", flip: true }); S.actor("waiter", { x: 0.6, z: -0.1, expr: "smile", prop: "hold" });
          S.pop("label", W(9, "great") - 2, 34, { x: 0, y: 2.4, z: -1.2, w: 2.0, h: 0.36, text: "GREAT RESTAURANT", bg: "#ffd84a", hold: true }); } },
      // 20 · perfect food: the cloche lifts, the dish sparkles
      { set: "rest", word: [9, "Perfect"], lead: 3, steady: true, coc: 10, light: "lamp", cam: CAM.fit([-0.2, 0.95, -0.75], { w: 1.2, a0: 10, a1: 2, elev: 14, push: 0.1 }),
        act: (S, u, f) => { const k = E.back(E.prog(f, S.a + 2, S.a + 12)); H.dish.lid.position.y = 0.03 + 0.55 * Math.sin(PI * Math.min(1, k)) * 1 + (k >= 1 ? -0.03 : 0) * 0; H.dish.lid.position.x = 0.55 * Math.min(1, k); if (k >= 1) H.dish.lid.position.y = 0.0;
          S.pop("stars", S.a + 6, 26, { x: -0.2, y: 1.05, z: -0.7, w: 0.6, h: 0.35 }); S.pop("heart", W(9, "food") , 20, { x: 0.05, y: 1.25, z: -0.6, w: 0.25, h: 0.25 }); } },
      // 21 · can't save a crazy bill: the waiter drops the bill, it unrolls to the floor, YOU faint
      { set: "rest", word: [9, "can't"], lead: 3, trans: "whip", dir: 1, light: "lamp", cam: CAM.fit([-0.1, 0.95, -0.6], { w: 2.6, a0: 14, a1: 6, elev: 5, push: 0.1 }),
        act: (S, u, f) => { H.dish.lid.position.y = 0.0; H.dish.lid.position.x = 0.55; const t = W(9, "bill.");
          H.bill.visible = true; H.roll.visible = f >= W(9, "crazy") - 2; H.roll.scale.y = Math.max(0.01, E.ss(E.prog(f, W(9, "crazy") - 2, t)) * 0.8);
          S.actor("waiter", { x: 0.75, z: -0.15, expr: "smile", prop: "point" });
          S.actor("you", { x: -0.98, z: -0.76 + (f >= t ? 0.4 : 0), mode: f < t ? "sit" : "fall", expr: f < t ? "shock" : "dazed", flip: true });
          S.say("Your bill, sir.", S.a + 2, 22, { x: 0.8, y: 2.05, z: -0.1, w: 1.0, h: 0.34 });
          S.kick(t, 0.08); S.pop("impact", t, 24, { x: -0.6, y: 1.5, z: -0.3, w: 0.9, h: 0.6, text: "$$$!" }); } },
      // 22 · Polaroid was priced about eight times higher: on the table, a red PRICE column towers over a green WORTH stub
      { set: "rest", beat: 10, trans: "whip", dir: -1, light: "lamp", cam: CAM.fit([0, 1.6, -1.0], { w: 2.6, a0: -6, a1: 2, elev: 3, push: 0.08 }),
        act: (S, u, f) => { H.dish.lid.position.y = 0.0; H.dish.lid.position.x = 0.55; H.priceCol.visible = true; H.worthCol.visible = true;
          const k = E.ss(E.prog(f, S.a + 2, W(10, "eight") + 4)); H.priceCol.scale.y = Math.max(0.05, k);
          S.pop("label", W(10, "Polaroid"), 40, { x: -0.25, y: 0.6, z: -0.3, w: 1.0, h: 0.22, text: "POLAROID", bg: "#f4efe2", hold: true });
          S.pop("label", W(10, "eight") + 2, 50, { x: -0.25, y: 2.9, z: -0.9, w: 1.0, h: 0.3, text: "8x TOO MUCH", bg: "#ff6a5a", hold: true }); } },
      // 23 · than its future could pay: Pembroke at the next table, sweating over the long bill
      { set: "rest", word: [10, "than"], lead: 3, trans: "dissolve", light: "lamp", cam: CAM.fit([0.95, 1.25, -0.8], { w: 1.8, a0: 12, a1: 4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.dish.lid.position.y = 0.0; H.dish.lid.position.x = 0.55; H.bill.visible = true; H.roll.visible = true; H.roll.scale.y = 0.8;
          S.actor("pem", { x: 0.98, z: -0.76, mode: "sit", expr: "pained" }); S.pop("sweat", S.a + 4, 30, { x: 1.25, y: 1.6, z: -0.6, w: 0.22, h: 0.28 });
          S.pop("arrow", W(10, "pay.") - 2, 26, { x: 0.6, y: 1.7, z: -0.5, w: 0.25, h: 0.35, dir: "down", hold: true }); } },
      // 24 · Philip Morris looked pricey at twenty-four times earnings: whip back to the showroom, the gold box gets a modest tag
      { set: "show", beat: 11, trans: "whip", dir: 1, light: SHOW, cam: CAM.fit([PX.pm - 0.5, 1.6, PZ + 0.4], { w: 2.8, a0: 14, a1: 4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.cam.visible = false; const t = W(11, "twenty-four"); H.tagM.visible = f >= t - 2; H.tagM.rotation.x = -1.4 * (1 - E.ss(E.prog(f, t - 2, t + 6)));
          S.actor("you", { x: PX.pm - 1.1, z: PZ + 1.3, expr: "nervous", prop: "chin" }); S.pop("sweat", W(11, "pricey") - 2, 20, { x: PX.pm - 0.85, y: 1.95, z: PZ + 1.4, w: 0.2, h: 0.25 }); } },
      // 25 · twist — it was worth sixty-eight: the tag flips to WORTH 68x, golden glow, slow push with a roll
      { set: "show", beat: 12, trans: "smash", light: K.backdrop("#2a1e48"), cam: CAM.fit([PX.pm, 1.75, PZ + 0.2], { w: 2.3, a0: -2, a1: 2, elev: 3, push: 0.18, roll: 3 }),
        act: (S, u, f) => { H.cam.visible = false; const t = W(12, "sixty-eight."); H.tagM.visible = f < t; H.tagM2.visible = f >= t;
          S.fx("glow", { x: PX.pm, y: 1.5, z: PZ, w: 2.0, h: 2.0 }); S.kick(t, 0.06); S.pop("stars", t + 2, 26, { x: PX.pm, y: 2.75, z: PZ + 0.5, w: 1.2, h: 0.5 }); } },
      // 26 · the one decision was never the stock: back at the restaurant table, the dish labelled STOCK
      { set: "rest", beat: 13, trans: "whip", dir: -1, light: "lamp", cam: CAM.fit([0, 1.05, -0.8], { w: 2.4, a0: -10, a1: -2, elev: 8, push: 0.1 }),
        act: (S, u, f) => { H.dish.lid.position.y = 0.0; H.dish.lid.position.x = 0.55;
          S.actor("you", { x: -0.98, z: -0.76, mode: "sit", expr: "stern", flip: true }); S.actor("waiter", { x: 0.75, z: -0.15, expr: "neutral", prop: "hold" });
          S.pop("label", W(13, "stock.") - 2, 30, { x: -0.2, y: 1.45, z: -0.7, w: 1.1, h: 0.26, text: "THE STOCK", bg: "#f4efe2", hold: true }); } },
      // 27 · it was the price: a giant price tag slams down on the table on the last word
      { set: "rest", word: [13, "It"], lead: 4, trans: "whip", dir: 1, light: "lamp", cam: CAM.fit([0, 1.2, -0.8], { w: 2.8, a0: 6, a1: -2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.dish.lid.position.y = 0.0; H.dish.lid.position.x = 0.55; const t = W(13, "price.");
          H.bigTag.visible = true; H.bigTag.position.y = 0.8 + 3.2 * (1 - E.easeIn(E.prog(f, t - 9, t))); H.bigTag.rotation.z = 0.15 * (1 - E.prog(f, t, t + 6));
          S.actor("you", { x: -0.98, z: -0.76 + (f >= t ? 0.35 : 0), mode: f < t ? "sit" : "fall", expr: f < t ? "shock" : "dazed", flip: true });
          S.actor("waiter", { x: 0.9, z: -0.1, expr: f < t ? "neutral" : "shock", prop: f < t ? "hold" : "up" });
          S.kick(t, 0.14); S.pop("impact", t, 30, { x: 0.3, y: 2.0, z: -0.4, w: 1.2, h: 0.8, text: "BAM!" }); S.pop("puff", t + 1, 16, { x: 0, y: 0.9, z: -0.5, w: 1.6, h: 0.5, pop: false }); } },
    ],
  };
};
