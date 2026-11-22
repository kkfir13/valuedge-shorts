// "The Economist Who Stopped Forecasting" (Keynes and the King's College fund, 1921-1946) — film module.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const AH = 1.6;
  const H = {};
  const tx = (B, s, bg, fg, w = 1024, h = 256) => B.textTex(s, bg, fg, w, h);
  // the coaster track: height above the stage floor at x
  const TRK = (x) => x < 1.2 ? 0.5 + 3.0 * E.ss(E.clamp((x + 5.5) / 6.7)) : 0.4 + 3.1 * (1 - E.ss(E.clamp((x - 1.2) / 2.6)));
  // a hot-air balloon (envelope, stripes, basket, name board)
  const balloon = (B, x, z, col, name) => {
    const g = B.dyn(B.grp(x, 0, z, 0, 1));
    B.ball(1.25, "stripes:" + col + ":#f4efe2", 0, 2.6, 0, { in: g, sy: 1.15 });
    B.cone(0.55, 0.7, col, 0, 1.25, 0, { in: g });
    for (const sx of [-0.28, 0.28]) B.box(0.03, 0.7, 0.03, "#5a3a24", sx, 0.62, 0, { in: g });
    B.box(0.75, 0.6, 0.6, "planks:#a87a4a", 0, 0, 0, { in: g });
    B.plate(1.4, 0.42, tx(B, name, "#f4efe2", "#241726", 1024, 307), 0, 2.55, 1.46, { in: g, d: 0.02, edge: "#241726" });
    return g;
  };

  return {
    cast: {
      keynes: { jacket: "#2e3240", pants: "#2e3240", boots: "#1a1418", hat: "hair", hair: "#4a3a2c", skin: "#f3d2b4", moustache: "#4a3a2c", buttons: "#c9a44a" },
      keynesOut: { jacket: "#2e3240", pants: "#2e3240", boots: "#1a1418", hat: "bowler", capColor: "#1f1a18", skin: "#f3d2b4", moustache: "#4a3a2c", buttons: "#c9a44a" },
      keynesPJ: { jacket: "#8fb4dc", pants: "#8fb4dc", boots: "#f4efe2", hat: "hair", hair: "#4a3a2c", skin: "#f3d2b4", moustache: "#4a3a2c", buttons: "#f4efe2" },
      provost: { jacket: "#1c1c22", pants: "#2a2a30", boots: "#1a1418", hat: "tophat", skin: "#f0c8a8", moustache: "#d8d4cc", buttons: "#c9a44a" },
      s1: { jacket: "#c25a3a", pants: "#3a3a44", boots: "#3a2418", hat: "hair", hair: "#2a201a", dress: "#d88a4a", skin: "#e8b48a" },
      s2: { jacket: "#4a7a5a", pants: "#3a3a44", boots: "#2a1a14", hat: "cap", cap: "#6a5a4a", skin: "#f0c8a0" },
      s3: { jacket: "#7a5a8a", pants: "#3a3a44", boots: "#2a1a14", hat: "hair", hair: "#d8d4cc", dress: "#9a7ab0", skin: "#f5c9a0" },
      s4: { jacket: "#c8a03a", pants: "#3a2a20", boots: "#2a1a14", hat: "beanie", cap: "#2f5a8a", pom: "#f4efe2", skin: "#c99067" },
      clerk: { jacket: "#f4efe2", pants: "#3a3a44", boots: "#2a1a14", hat: "hair", hair: "#7a3a24", skin: "#f5c9a0", buttons: "#2f8a4a" },
    },
    sets: {
      // King's College, Cambridge: the long Gothic chapel with four corner spires across a green lawn
      kings: (B) => {
        B.ground("grass", 200, 200);
        B.box(1.6, 0.02, 30, "cobble", 0, 0.01, -2);
        const st = "plaster:#e2d6b8";
        B.box(11, 7.5, 3.4, st, 0, 0, -14);
        for (let i = 0; i < 6; i++) B.plate(0.9, 4.2, "glass:#5a7aa8", -4.2 + i * 1.68, 4.0, -12.28, { d: 0.04, edge: "#c8b890" });
        for (const sx of [-5.3, 5.3]) for (const sz of [-12.4, -15.6]) { B.cyl(0.45, 0.5, 9.2, st, sx, 0, sz, { seg: 8 }); B.cone(0.5, 1.6, st, sx, 9.2, sz, { seg: 8 }); }
        for (let i = 0; i < 9; i++) B.cone(0.14, 0.7, st, -4.8 + i * 1.2, 7.5, -12.4, { seg: 6 });
        B.facade({ style: "victorian", w: 6, x: -8, z: -9, ry: Math.PI / 2, seed: 7, col: "#d8ccb0", h: 6 });
        B.facade({ style: "victorian", w: 6, x: 8, z: -9, ry: -Math.PI / 2, seed: 9, col: "#d8ccb0", h: 6 });
        B.plate(2.6, 0.5, tx(B, "KING'S COLLEGE", "#1f3a5a", "#f4efe2", 1024, 197), -1.9, 1.6, -3.5, { d: 0.05, edge: "#c9a44a" });
        B.box(0.08, 1.4, 0.08, "#3a2a20", -1.9, 0, -3.52);
        for (const [x, z] of [[-4.5, -5], [4.8, -6], [-6, 1], [5.5, 0.5]]) B.prop.tree({ x, z, kind: "oak" });
        B.prop.bench({ x: 2.4, z: -3.2 });
      },
      // the bursar's study, 1920s: dark panels, wall chart of booms and slumps, desk, lamp, globe and a crystal ball
      study: (B) => {
        B.set.room({ style: "library", wall: "panel:#5a3a2a", floor: "floor:#7a4a2c", w: 7, d: 6, h: 3.4, windows: [2.2], door: false });
        H.chart = B.prop.screen({ x: -0.3, z: -2.92, w: 2.6, h: 1.25, y0: 1.25, bg: "#f4efe2", line: "#c0353a", label: "BUSINESS CYCLE", frame: "#3a2418",
          curve: (x) => 0.5 + 0.38 * Math.sin(x * Math.PI * 4) });
        B.prop.desk({ x: 0, z: -1.1, w: 1.9 });
        B.prop.chair({ x: 0, z: -1.75 });
        B.prop.lamp({ kind: "desk", x: -0.7, y: 0.78, z: -1.2, glow: "#ffd890" });
        H.globe = B.prop.globe({ x: 0.72, y: 0.78, z: -1.25, s: 0.7 });
        H.cb = B.dyn(B.grp(0.05, 0.78, -0.85, 0, 1));
        B.cyl(0.1, 0.13, 0.08, "#c9a44a", 0, 0, 0, { in: H.cb, seg: 16 });
        H.cbBall = B.dyn(B.ball(0.15, "#b8dcff", 0, 0.22, 0, { in: H.cb }));
        B.prop.shelf({ x: -2.9, z: -2.7, w: 1.3, h: 2.4 });
        B.prop.rug({ x: 0, z: -0.4, w: 3.2, d: 2.2, col: "#7a2a2a" });
        H.memo = B.dyn(B.plate(0.42, 0.55, tx(B, "MEMO 1938", "#f4efe2", "#241726", 512, 680), -0.25, 0.79, -0.85, { d: 0.005, rx: -Math.PI / 2 }));
      },
      // the 1929 roller coaster: a track climbing over a teal sky and dropping off a cliff
      coaster: (B) => {
        B.set.stage({ floor: "#d8e4e8", back: "#4aa8c8" });
        for (let x = -5.5; x < 4.2; x += 0.25) { const y = TRK(x), y2 = TRK(x + 0.25), a = Math.atan2(y2 - y, 0.25);
          B.box(0.3, 0.06, 0.9, "#c0353a", x + 0.125, (y + y2) / 2 - 0.03, -1.5).rotation.z = a;
          if (Math.round(x * 4) % 3 === 0) B.box(0.06, Math.max(0.05, y), 0.06, "#f4efe2", x, 0, -1.5); }
        B.plate(1.6, 0.6, tx(B, "1929", "#241726", "#f2c14e", 512, 192), 1.2, 4.4, -1.5, { d: 0.05, edge: "#f2c14e" });
        H.cart = B.dyn(B.grp(-4.5, TRK(-4.5), -1.5, 0, 1));
        B.box(0.9, 0.42, 0.8, "#2f5a8a", 0, 0, 0, { in: H.cart }); B.box(0.95, 0.06, 0.85, "#f2c14e", 0, 0.42, 0, { in: H.cart });
      },
      // a 1930s grocery: two checkout counters, tiled walls, shelves of tins
      shop: (B) => {
        B.set.room({ style: "kitchen", wall: "tiles:#f4efe2:#8fc4a8", floor: "tiles:#e8dcc0:#a85a3a", w: 8, d: 8, h: 3.4, windows: [], door: false });
        for (const x of [-2.6, 0, 2.6]) B.prop.shelf({ x, z: -3.7, w: 2.2, h: 2.2, fill: "bottles" });
        for (const [x, n] of [[-1.1, "1"], [1.1, "2"]]) {
          B.box(0.6, 0.9, 1.6, "westwood:#a85a3a", x + 0.55, 0, -1.6); B.box(0.7, 0.06, 1.7, "#3a2418", x + 0.55, 0.9, -1.6);
          B.plate(0.9, 0.36, tx(B, "TILL " + n, "#2f8a4a", "#f4efe2", 512, 205), x + 0.55, 2.3, -2.2, { d: 0.03, edge: "#f4efe2" });
          B.box(0.05, 1.3, 0.05, "#3a3a40", x + 0.55, 1.0, -2.2);
        }
        B.prop.lamp({ kind: "hang", x: 0, y: 3.4, z: -1.0, glow: "#ffe6b0" });
      },
      // the picking stage (metaphor): rows of company crates under a night-blue sky; he lifts only a few
      pick: (B) => {
        B.set.stage({ floor: "#dfe6ee", back: "#24345a" });
        const L = ["SHIPS", "MINES", "TEA", "RAILS", "MOTORS", "RUBBER", "TIN", "BANKS", "OIL"];
        H.crates = L.map((t, i) => B.prop.crate({ x: -1.6 + (i % 3) * 1.6, z: -0.6 - Math.floor(i / 3) * 1.3, size: 0.62, label: t, col: "planks:#b8865a" }));
        H.keep = [1, 4, 6];
      },
      // Keynes's bedroom, morning: green wallpaper, a big bed, newspapers, the telephone
      bed: (B) => {
        B.set.room({ style: "home", wall: "wallpaper:#7a9a82", floor: "floor:#8a5a3a", w: 7, d: 6, h: 3.2, windows: [-2.0], door: false });
        B.box(1.7, 0.42, 2.3, "planks:#6a3a24", 0, 0, -1.75); B.box(1.75, 1.2, 0.1, "planks:#5a2e1c", 0, 0, -2.92);
        B.box(1.6, 0.12, 2.2, "#f4efe2", 0, 0.42, -1.75);
        H.pillow = B.dyn(B.grp(0, 0.6, -2.62, 0, 1)); B.box(1.1, 0.22, 0.42, "#fbf8f0", 0, 0, 0, { in: H.pillow });
        B.box(1.66, 0.1, 1.25, "#c0353a", 0, 0.62, -1.15);
        B.box(0.5, 0.6, 0.45, "planks:#6a3a24", 1.25, 0, -2.55);
        B.prop.phone({ x: 1.18, y: 0.6, z: -2.5, s: 0.9 });
        for (let i = 0; i < 4; i++) B.box(0.42, 0.03, 0.55, "#efe8d6", -1.3, 0.04 + i * 0.035, -1.0, { ry: 0.1 * i });
        H.clock = B.prop.clock({ x: 1.6, y: 2.25, z: -2.96, r: 0.3 });
        B.prop.lamp({ kind: "hang", x: 0, y: 3.2, z: -1.5, glow: "#ffe6b0" });
        H.paper = B.dyn(B.plate(0.55, 0.42, tx(B, "STOCKS", "#f2ede0", "#241726", 512, 390), 0, 1.05, -2.05, { d: 0.01 }));
      },
      // two hot-air balloons racing over the Cambridgeshire fields
      sky: (B) => {
        B.set.landscape({ kind: "meadow", road: false, hills: true, seed: 5 });
        for (const [x, y, z] of [[-6, 9, -14], [5, 11, -18], [0, 14, -22], [-3, 6, -10]]) B.prop.cloud3d({ x, y, z, s: 1.3, seed: x + 7 });
        H.bK = balloon(B, -1.0, -2.4, "#2f5a8a", "KING'S");
        H.bM = balloon(B, 1.3, -5.0, "#8a8a92", "MARKET");
      },
    },
    shots: [
      // 0 · frame 0: the KING'S balloon shoots up past the grey MARKET balloon
      { set: "sky", f: 0, light: "golden", cam: CAM.keys([[0, { p: [0.0, 1.8, 7.5], t: [-0.3, 2.4, -3.0], fov: 46 }], [1, { p: [-0.3, 6.6, 8.5], t: [-0.6, 6.4, -3.0], fov: 46 }]]),
        act: (S, u, f) => { H.bK.position.y = 0.6 + 6.0 * E.ss(E.prog(f, 0, 62)); H.bM.position.y = 0.4 + 2.0 * E.ss(E.prog(f, 0, 62));
          S.pop("speed", 2, 40, { x: -1.0, y: 1.2 + 5 * E.prog(f, 0, 62), z: -2.2, w: 1.6, h: 1.6, pop: false }); } },
      // 1 · the economist at his desk; the crystal ball drops on "quit"
      { set: "study", word: [0, "beat"], trans: "whip", light: "lamp", cam: CAM.fit([0, 1.15, -1.2], { w: 2.1, a0: -18, a1: 6, elev: 6, push: 0.12 }),
        act: (S, u, f) => { const q = W(0, "quit"), k = E.easeIn(E.prog(f, q, q + 9)); S.actor("keynes", { x: 0, z: -1.75, expr: f < q ? "stern" : "smile", prop: f < q ? "chin" : "shrug" });
          H.cb.position.y = 0.78 - 0.78 * k; H.cb.position.z = -0.85 + 0.5 * k; S.fx("glow", { x: 0.05, y: 1.0 - 0.8 * k, z: -0.8, w: 0.6, h: 0.6 });
          S.pop("label", W(0, "economist"), 40, { x: -0.6, y: 2.45, z: -1.6, w: 1.3, h: 0.34, text: "ECONOMIST", hold: true }); S.pop("impact", q + 9, 16, { x: 0.1, y: 0.25, z: -0.3, w: 0.7, h: 0.7, text: "CLUNK" }); S.kick(q + 9, 0.05); } },
      // 2 · Cambridge: crane down over the chapel
      { set: "kings", beat: 1, trans: "whip", light: "golden", cam: CAM.keys([[0, { p: [1.5, 9, 9], t: [0, 5, -13], fov: 44 }], [1, { p: [0.6, 2.4, 4.2], t: [0, 2.6, -10], fov: 44 }]]),
        act: (S, u, f) => { S.actor("keynesOut", { x: 0, z: E.lerp(-6, -4.5, u), mode: "stroll", phase: f * 0.05, expr: "smile" }); } },
      // 3 · John Maynard Keynes walks the path, 1921
      { set: "kings", word: [1, "Keynes,"], lead: 4, light: "golden", cam: CAM.fit([0, 1.4, -2.2], { w: 1.9, a0: 14, a1: -6, elev: 3, push: 0.1 }),
        act: (S, u, f) => { S.actor("keynesOut", { x: 0, z: E.lerp(-2.6, -2.0, u), mode: "stroll", phase: f * 0.05, expr: "grin" });
          S.pop("label", W(1, "nineteen"), 50, { x: 0.75, y: 2.35, z: -2.0, w: 0.85, h: 0.38, text: "1921", hold: true, x: 0.45 }); } },
      // 4 · the college hands you its money
      { set: "kings", beat: 2, trans: "dissolve", light: "golden", cam: CAM.fit([-0.05, 1.3, -2.6], { w: 2.4, a0: -16, a1: -6, elev: 4 }),
        act: (S, u, f) => { const g = W(2, "money"); S.actor("provost", { x: -0.6, z: -2.7, expr: "smile", prop: f < g ? "hold" : "point" }); S.actor("keynesOut", { x: 0.55, z: -2.5, expr: f < g ? "smile" : "grin", prop: f < g ? null : "hold" });
          S.say("Make King's rich!", S.a + 6, 60, { x: -0.3, y: AH + 0.7, z: -2.6, w: 1.25, h: 0.45, tail: "right" }); S.pop("coin", g, 20, { x: 0.1, y: 1.3, z: -2.3, w: 0.4, h: 0.4 }); } },
      // 5 · your plan: the business cycle on the wall chart
      { set: "study", beat: 3, trans: "whip", light: "lamp", cam: CAM.fit([0.0, 1.85, -2.9], { w: 3.4, a0: -6, a1: 6, elev: -2, push: 0.08 }),
        act: (S, u, f) => { H.chart.draw({ t: E.prog(f, S.a, W(3, "cycle,") + 4) }); S.actor("keynes", { x: -1.2, z: -2.3, expr: "grin", prop: "point" }); } },
      // 6 · buy before booms, sell before slumps (the crystal ball says so)
      { set: "study", word: [3, "buy"], lead: 3, light: (u) => K.mixLight(K.light("lamp"), K.light("mind"), 0.5), steady: true, cam: CAM.fit([0.05, 1.15, -1.0], { w: 1.25, a0: 4, a1: -4, elev: 4, push: 0.15 }), coc: 10,
        act: (S, u, f) => { S.actor("keynes", { x: 0, z: -1.75, expr: "grin", prop: "chin" }); S.fx("glow", { x: 0.05, y: 1.0, z: -0.8, w: 0.7, h: 0.7 });
          S.pop("word", W(3, "buy"), 26, { x: 0.0, y: 1.6, z: -0.7, w: 0.6, h: 0.3, text: "BUY", col: "#4fd18b" }); S.pop("word", W(3, "sell"), 30, { x: 0.0, y: 1.6, z: -0.7, w: 0.6, h: 0.3, text: "SELL", col: "#ff5a5a" }); } },
      // 7 · 1929: the cart climbs the coaster
      { set: "coaster", beat: 4, trans: "whip", light: "desert", cam: CAM.fit([-1.2, 2.0, -1.5], { w: 5.0, a0: -12, a1: -4, elev: 3 }),
        act: (S, u, f) => { const x = E.lerp(-4.5, 1.0, E.prog(f, S.a, W(4, "crashes,"))); H.cart.position.set(x, TRK(x), -1.5);
          S.actor("keynes", { x: x, y: TRK(x) + 0.15, z: -1.45, expr: "grin", prop: "up", scale: 0.7, blob: false }); } },
      // 8 · crashes: over the top and straight down
      { set: "coaster", word: [4, "crashes,"], lead: 1, trans: "smash", light: "storm", cam: CAM.fit([2.3, 1.9, -1.5], { w: 4.0, a0: 14, a1: 6, elev: 4 }),
        act: (S, u, f) => { const x = E.lerp(1.0, 3.9, E.easeIn(E.prog(f, S.a, S.a + 14))); H.cart.position.set(x, TRK(x), -1.5); H.cart.rotation.z = x > 1.3 ? -0.8 : 0;
          S.actor("keynes", { x: x, y: TRK(x) + 0.15, z: -1.45, expr: "shock", prop: "up", scale: 0.7, blob: false });
          S.pop("impact", S.a + 14, 18, { x: 3.6, y: 1.2, z: -1.0, w: 1.4, h: 1.4, text: "CRASH!" }); S.kick(S.a + 14, 0.08); } },
      // 9 · the great forecaster never sees it coming: the crystal ball goes cloudy
      { set: "study", word: [4, "never"], lead: 3, light: "danger", cam: CAM.fit([0.02, 1.25, -1.3], { w: 1.35, a0: -6, a1: 4, elev: 2, push: 0.12 }), coc: 9,
        act: (S, u, f) => { S.actor("keynes", { x: 0, z: -1.75, expr: "shock" }); H.cbBall.material && (H.cbBall.visible = true);
          S.pop("smoke", S.a + 2, 34, { x: 0.05, y: 1.0, z: -0.75, w: 0.6, h: 0.6, pop: false }); S.pop("sweat", S.a + 8, 30, { x: 0.25, y: AH + 0.2, z: -1.6, w: 0.25, h: 0.25, pop: false }); } },
      // 10 · so what does a genius do when his genius fails?
      { set: "study", beat: 5, trans: "dissolve", light: K.mixLight(K.light("lamp"), K.light("night"), 0.45), cam: CAM.fit([0, 1.2, -1.4], { w: 2.3, a0: 22, a1: 12, elev: 6 }),
        act: (S, u, f) => { S.actor("keynes", { x: 0, z: -1.75, expr: "pained", prop: "fists" }); S.pop("question", W(5, "fails?") - 3, 26, { x: 0.45, y: AH + 0.55, z: -1.6, w: 0.45, h: 0.55, hold: true }); } },
      // 11 · You see: two checkout lines
      { set: "shop", beat: 6, trans: "whip", light: "interior", cam: CAM.fit([0.0, 1.2, -0.4], { w: 4.0, a0: -14, a1: -6, elev: 8 }),
        act: (S, u, f) => { S.actor("clerk", { key: "c1", x: -0.55, z: -2.0 }); S.actor("clerk", { key: "c2", x: 1.65, z: -2.0, expr: "smile" });
          S.actor("s1", { x: -1.1, z: -1.4, expr: "neutral" }); S.actor("s2", { x: -1.1, z: -0.6 }); S.actor("keynesOut", { x: -1.1, z: 0.2, expr: "stern", prop: "hold" });
          S.actor("s3", { x: 1.1, z: -1.3, expr: "smile" }); S.actor("s4", { x: 1.1, z: -0.5 }); } },
      // 12 · the moment you move…
      { set: "shop", word: [6, "The"], lead: 2, light: "interior", cam: CAM.fit([0.0, 1.25, 0.0], { w: 3.4, a0: 8, a1: 0, elev: 5 }),
        act: (S, u, f) => { const k = E.ss(E.prog(f, W(6, "move,") - 8, W(6, "move,") + 6)); S.actor("s1", { x: -1.1, z: -1.4 }); S.actor("s2", { x: -1.1, z: -0.6 });
          S.actor("s3", { x: 1.1, z: -1.3 }); S.actor("s4", { x: 1.1, z: -0.5, expr: "smile" });
          S.actor("keynesOut", { x: E.lerp(-1.1, 1.1, k), z: E.lerp(0.2, 0.35, k), mode: k > 0 && k < 1 ? "stroll" : "stand", phase: f * 0.08, expr: "grin", prop: "hold" }); } },
      // 13 · …the old line speeds up
      { set: "shop", word: [6, "old"], lead: 2, trans: "whip", dir: -1, light: "interior", cam: CAM.fit([0.15, 1.25, -0.4], { w: 3.8, a0: -10, a1: -4, elev: 5 }),
        act: (S, u, f) => { const k = E.prog(f, S.a, S.a + 20); S.actor("s1", { x: -1.1, z: E.lerp(-1.4, -4.5, k), mode: "stroll", phase: f * 0.2, expr: "laugh" }); S.actor("s2", { x: -1.1, z: E.lerp(-0.6, -1.4, k), mode: "stroll", phase: f * 0.2, expr: "grin" });
          S.actor("s3", { x: 1.1, z: -1.3, expr: "nervous" }); S.actor("s4", { x: 1.1, z: -0.5 }); S.actor("keynesOut", { x: 1.1, z: 0.35, expr: "shock", prop: "hold" });
          S.pop("speed", S.a + 2, 20, { x: -1.1, y: 1.1, z: -1.0, w: 1.0, h: 1.0 }); S.pop("exclaim", S.a + 10, 22, { x: 1.3, y: AH + 0.45, z: 0.4, w: 0.25, h: 0.35 }); } },
      // 14 · Keynes wrote it down: the 1938 memo
      { set: "study", beat: 7, trans: "dissolve", light: "office", cam: CAM.fit([0, 1.2, -1.2], { w: 2.0, a0: -14, a1: -4, elev: 8 }),
        act: (S, u, f) => { S.actor("keynes", { x: 0, z: -1.75, expr: "stern", prop: "paper" }); H.cb.visible = false; } },
      // 15 · sell too late, buy too late
      { set: "study", word: [7, "sell"], lead: 3, light: "office", cam: CAM.fit([0, 1.75, -1.75], { w: 1.4, a0: 6, a1: -2, elev: 2, push: 0.12 }), coc: 10,
        act: (S, u, f) => { H.cb.visible = false; S.actor("keynes", { x: 0, z: -1.75, expr: f < W(7, "buy") ? "stern" : "pained", prop: "paper" });
          S.pop("label", W(7, "sell"), 70, { x: 0, y: AH + 0.62, z: -1.55, w: 1.0, h: 0.24, text: "SELL TOO LATE", col: "#c0353a", hold: true });
          S.pop("label", W(7, "buy"), 40, { x: 0, y: AH + 0.36, z: -1.55, w: 1.0, h: 0.24, text: "BUY TOO LATE", col: "#c0353a", hold: true }); } },
      // 16 · so he throws out the crystal ball (through the window)
      { set: "study", beat: 8, trans: "whip", light: "office", cam: CAM.fit([0.8, 1.4, -1.6], { w: 3.0, a0: -20, a1: -10, elev: 4 }),
        act: (S, u, f) => { const t0 = W(8, "throws"), k = E.prog(f, t0, W(8, "ball.") + 2); S.actor("keynes", { x: 0, z: -1.75, expr: f < t0 ? "stern" : "laugh", prop: f < t0 ? "hold" : "up" });
          H.cb.position.set(E.lerp(0.05, 2.4, k), 0.78 + 1.1 * Math.sin(Math.PI * k), E.lerp(-0.85, -2.9, k)); H.cb.rotation.z = -6 * k;
          S.pop("impact", W(8, "ball.") + 2, 16, { x: 2.3, y: 1.7, z: -2.6, w: 0.9, h: 0.9, text: "SMASH!" }); S.kick(W(8, "ball.") + 2, 0.05); } },
      // 17 · push through into the picking stage: he picks a few companies
      { set: "pick", beat: 9, trans: "zoom", light: K.backdrop("#24345a"), cam: CAM.fit([0, 0.9, -1.3], { w: 4.6, a0: -16, a1: 4, elev: 18, push: 0.1 }),
        act: (S, u, f) => { const p = [W(9, "few"), W(9, "companies"), W(9, "understands")]; H.keep.forEach((i, j) => { const k = E.back(E.prog(f, p[j], p[j] + 8)); H.crates[i].position.y = 0.6 * k; });
          H.crates.forEach((c, i) => { if (!H.keep.includes(i)) c.position.y = -0.7 * E.ss(E.prog(f, W(9, "understands"), W(9, "understands") + 14)); });
          S.actor("keynes", { x: 0, z: 0.6, expr: "smile", prop: "point" }); H.keep.forEach((i, j) => S.pop("glow", p[j], 60, { x: H.crates[i].position.x, y: 0.9, z: H.crates[i].position.z + 0.3, w: 0.9, h: 0.9, pop: false, hold: true })); } },
      // 18 · …and holds on: hugging his three crates
      { set: "pick", word: [9, "holds"], lead: 3, light: K.backdrop("#24345a"), cam: CAM.fit([0, 1.2, 0.2], { w: 2.0, a0: 10, a1: 2, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.crates.forEach((c, i) => { if (H.keep.includes(i)) { c.position.set(-0.45 + 0.45 * H.keep.indexOf(i), 0.05, 0.45); c.scale.setScalar(0.75); } else c.visible = false; });
          S.actor("keynes", { x: 0, z: 0.2, expr: "smile_closed", prop: "hold" }); S.pop("heart", S.a + 6, 24, { x: 0.45, y: AH + 0.35, z: 0.3, w: 0.35, h: 0.35 }); } },
      // 19 · half an hour each morning, still in bed
      { set: "bed", beat: 10, trans: "dissolve", light: "golden", cam: CAM.fit([0, 1.0, -2.0], { w: 2.6, a0: -12, a1: 4, elev: 8 }),
        act: (S, u, f) => { H.paper.visible = false; H.clock.time(8 + 0.5 * u); S.actor("keynesPJ", { x: 0, y: 0.5, z: -2.3, mode: "sit", expr: "smile", prop: "paper", blob: false });
          S.pop("label", W(10, "hour"), 60, { x: -1.0, y: 2.2, z: -2.6, w: 0.9, h: 0.36, text: "30 MIN", hold: true }); } },
      // 20 · still in bed: on the telephone to his broker
      { set: "bed", word: [10, "still"], lead: 3, light: "golden", cam: CAM.fit([0.2, 1.3, -2.3], { w: 1.4, a0: 18, a1: 10, elev: 3, push: 0.12 }), coc: 9,
        act: (S, u, f) => { H.paper.visible = false; S.actor("keynesPJ", { x: 0, y: 0.5, z: -2.3, mode: "sit", expr: "grin", prop: "hold", blob: false }); S.say("Buy. Then hold.", S.a + 2, 36, { x: 0.3, y: 1.95, z: -2.2, w: 1.1, h: 0.42 }); } },
      // 21 · over a quarter century: KING'S balloon climbs
      { set: "sky", beat: 11, trans: "whip", light: "golden", cam: CAM.fit([0, 3.8, -3.2], { h: 6.4, a0: -10, a1: 6, elev: 2 }),
        act: (S, u, f) => { H.bK.position.y = 0.4 + 3.4 * E.ss(u); H.bM.position.y = 0.4 + 1.6 * E.ss(u); } },
      // 22 · sixteen percent a year
      { set: "sky", word: [11, "sixteen"], lead: 3, light: "golden", cam: CAM.fit([-1.6, 6.6, -3.0], { w: 3.2, a0: -8, a1: 4, elev: 0, push: 0.1 }),
        act: (S, u, f) => { H.bK.position.y = 3.8 + 0.3 * u; H.bM.position.y = 2.0;
          S.pop("word", W(11, "sixteen"), 46, { x: -1.6, y: 8.0, z: -1.6, w: 1.8, h: 0.8, text: "16% A YEAR", col: "#4fd18b", hold: true }); S.pop("sparks", W(11, "sixteen"), 14, { x: -1.6, y: 6.6, z: -1.6, w: 2.4, h: 2.4 }); } },
      // 23 · the British market: ten point four
      { set: "sky", beat: 12, trans: "whip", dir: -1, light: "golden", cam: CAM.fit([1.6, 4.6, -3.4], { w: 3.2, a0: 8, a1: 0, elev: 0, push: 0.08 }),
        act: (S, u, f) => { H.bK.position.y = 4.1; H.bM.position.y = 2.0;
          S.pop("word", W(12, "ten"), 40, { x: 1.6, y: 3.6, z: -2.0, w: 1.4, h: 0.7, text: "10.4%", col: "#d8d4cc", hold: true }); } },
      // 24 · the man who explained the economy to the world (twist: music stops)
      { set: "study", beat: 13, trans: "dissolve", light: "sunset", cam: CAM.fit([0.45, 1.3, -1.4], { w: 1.9, a0: 16, a1: 6, elev: 2, push: 0.1 }),
        act: (S, u, f) => { H.cb.visible = false; H.globe.sph && (H.globe.sph.rotation.y = f * 0.05); S.actor("keynes", { x: 0.1, z: -1.75, expr: "smile", prop: "point" }); } },
      // 25 · finale: beat the market from his pillow — FLUMP
      { set: "bed", beat: 14, trans: "whip", light: "golden", cam: CAM.fit([0, 1.0, -2.3], { w: 1.9, a0: -6, a1: 4, elev: 6, push: 0.12 }),
        act: (S, u, f) => { const p = W(14, "pillow."), k = E.ss(E.prog(f, p - 8, p)); H.paper.visible = false; S.actor("keynesPJ", { x: 0, y: 0.5, z: -2.3, mode: "sit", expr: f < p ? "grin" : "smile_closed", tilt: -14 * k, headTilt: -10 * k, blob: false });
          H.pillow.scale.y = f >= p && f < p + 8 ? 0.6 + 0.05 * (f - p) : 1;
          S.pop("impact", p, 18, { x: -0.35, y: 1.25, z: -2.1, w: 0.8, h: 0.8, text: "FLUMP!" }); S.pop("puff", p, 20, { x: 0, y: 0.8, z: -2.2, w: 1.6, h: 0.8 }); S.kick(p, 0.06);
          S.pop("word", W(14, "beat"), 50, { x: 0.45, y: 1.95, z: -2.2, w: 0.9, h: 0.45, text: "16%", col: "#4fd18b", hold: true }); } },
    ],
  };
};
