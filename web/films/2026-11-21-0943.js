// "The Rule-Breaker's Biggest Win" (Benjamin Graham buys half of GEICO, 1948) — film module.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const AH = 1.58, KH = 1.05;
  const H = {};
  const tx = (B, s, bg, fg, w = 1024, h = 256) => B.textTex(s, bg, fg, w, h);

  return {
    cast: {
      graham: { jacket: "#2a3a5a", pants: "#2a3a5a", boots: "#1a1418", hat: "hair", hair: "#d8d4cc", skin: "#f3cfae", buttons: "#c9a44a" },
      graham72: { jacket: "#4a4a58", pants: "#3a3a44", boots: "#1a1418", hat: "hair", hair: "#f4f2ee", skin: "#f0caa8", buttons: "#c9a44a" },
      mort: { jacket: "#c8783a", pants: "#4a3a2a", boots: "#2a1a14", hat: "hair", hair: "#3a2418", skin: "#f5c9a0", buttons: "#f4efe2" },
      tex: { jacket: "#e8dcc0", pants: "#6a4a30", boots: "#5a3a24", hat: "cowboy", skin: "#e8b48a", moustache: "#8a6a4a", buttons: "#c0353a" },
      clerk: { jacket: "#6a7a8a", pants: "#3a4250", boots: "#1a1418", hat: "hair", hair: "#5a3a24", skin: "#d8a070", buttons: "#f4efe2" },
      typist: { jacket: "#7a9a6a", pants: "#3a4250", boots: "#3a2418", hat: "hair", hair: "#a8642a", dress: "#3a6a9a", skin: "#f8d8bc" },
      agent: { jacket: "#c0353a", pants: "#d8c8a0", boots: "#3a2418", hat: "bowler", skin: "#f0c8a0", moustache: "#2a1a14", buttons: "#f2c14e" },
      kid: { jacket: "#f2c14e", pants: "#3a5a9a", boots: "#f4f1ea", hat: "cap", cap: "#c0353a", skin: "#f5c9a0", build: "kid" },
      kid2: { jacket: "#4fa86a", pants: "#3b3f52", boots: "#5a3b2a", hat: "hair", hair: "#2a201a", dress: "#d8642a", skin: "#c99067", build: "kid" },
      kid3: { jacket: "#8a5ab5", pants: "#2f4a7a", boots: "#f4f1ea", hat: "beanie", cap: "#3f8fe0", pom: "#f4efe2", skin: "#ecd0b6", build: "kid" },
      middle: { jacket: "#5a3a6a", pants: "#2a2d38", boots: "#1a1418", hat: "tophat", skin: "#f0c8a0", moustache: "#1a1418", buttons: "#c9a44a" },
    },
    sets: {
      // 1948 Graham-Newman chart room: deep-green walls, the "MAX 5%" rule plaque, a 20-bar diversification chart, two desks
      office: (B) => {
        B.set.room({ style: "office", wall: "wallpaper:#2f5a4a", floor: "floor:#7a5232", w: 9, d: 7, h: 3.6, windows: [3.0], door: false });
        // the chart board: twenty equal 5% bars, one of them can grow to 20%
        B.plate(3.9, 2.25, "#f4efe2", 0.9, 2.3, -3.44, { d: 0.04, edge: "#6a4630" });
        H.chart = B.prop.bars3d({ x: 0.9, y: 1.4, z: -3.3, vals: Array.from({ length: 20 }, (_, i) => (i === 13 ? 1 : 0.25)), cols: ["#3f8fa0"], bw: 0.12, gap: 0.05, h: 1.9 });
        B.plate(2.2, 0.28, tx(B, "20 STOCKS × 5%", "#f4efe2", "#2a3a5a", 1024, 130), 0.9, 1.3, -3.4, { d: 0.02 });
        // the rule plaque, in two halves that can crack apart
        B.plate(1.3, 0.3, tx(B, "RULE No. 1", "#2a2d38", "#f2c14e", 900, 208), -2.75, 2.95, -3.42, { d: 0.03 });
        H.plL = B.dyn(B.grp(-3.1, 2.4, -3.38, 0, 1)); B.plate(0.7, 0.62, tx(B, "MAX", "#c0353a", "#f4efe2", 512, 455), 0, 0, 0, { in: H.plL, d: 0.06, edge: "#c9a44a" });
        H.plR = B.dyn(B.grp(-2.4, 2.4, -3.38, 0, 1)); B.plate(0.7, 0.62, tx(B, "5%", "#c0353a", "#f4efe2", 512, 455), 0, 0, 0, { in: H.plR, d: 0.06, edge: "#c9a44a" });
        // Graham's desk: lamp, ten tiny coin stacks, the toy insurer that splits in half
        B.prop.desk({ x: -1.3, z: -1.7, w: 2.0 });
        B.prop.lamp({ kind: "desk", x: -2.1, y: 0.81, z: -1.9, glow: "#ffe39a", col: "#2f6a4a" });
        for (let k = 0; k < 10; k++) B.prop.coinStack({ x: -1.95 + k * 0.13, y: 0.81, z: -1.45, r: 0.045, n: 3 });
        H.toyL = B.dyn(B.grp(-0.75, 0.81, -1.75, 0, 1)); B.box(0.18, 0.3, 0.34, "plaster:#e8dcc4", 0, 0, 0, { in: H.toyL }); B.box(0.2, 0.06, 0.36, "#c0353a", 0, 0.3, 0, { in: H.toyL });
        H.toyR = B.dyn(B.grp(-0.57, 0.81, -1.75, 0, 1)); B.box(0.18, 0.3, 0.34, "plaster:#e8dcc4", 0, 0, 0, { in: H.toyR }); B.box(0.2, 0.06, 0.36, "#c0353a", 0, 0.3, 0, { in: H.toyR });
        B.plate(0.34, 0.08, tx(B, "AUTO INS.", "#f2c14e", "#241726", 512, 120), -0.66, 1.0, -1.57, { d: 0.005 });
        H.bag = B.prop.moneyBag({ x: -1.0, y: 0.81, z: -1.6, size: 0.45 }); H.bag.visible = false;
        // Mort's small desk
        B.prop.desk({ x: 1.3, z: -0.7, w: 1.2, col: "floor:#8a6a4a" });
        B.prop.plant({ x: -4.0, z: -3.0 }); B.prop.rug({ x: -0.5, z: -0.6, w: 4, d: 2.6, col: "#7a2a2a" });
        B.prop.lamp({ kind: "hang", x: 0, y: 3.6, z: -1.2, glow: "#fff2c8" });
      },
      // a 1948 automat: green-and-white tiles, a wall of little glass doors, a counter with Graham's twenty-piece lunch
      automat: (B) => {
        B.set.room({ style: "kitchen", wall: "tiles:#f4f0e6:#2f8a6a", floor: "tiles:#f4efe2:#2a2d38", w: 8, d: 6, h: 3.4, windows: [], door: false });
        B.box(3.6, 1.6, 0.25, "metal:#c9a44a", 0, 0.9, -2.95);
        for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) B.plate(0.46, 0.4, "glass:#9ad8ff:lit", -1.45 + c * 0.58, 1.15 + r * 0.5, -2.8, { d: 0.03, edge: "#8a6a2a" });
        B.plate(2.4, 0.45, tx(B, "AUTOMAT", "#c0353a", "#f2c14e", 1024, 192), 0, 2.85, -2.9, { d: 0.05, edge: "#c9a44a" });
        B.prop.counter({ x: 0, z: -0.9, w: 3.2, h: 1.0, col: "marble:#e8e2d4", top: "#2a2d38" });
        B.cyl(0.3, 0.26, 0.03, "#f4f6fa", 0, 1.0, -0.85, { seg: 28 });
        H.bites = [];
        for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) H.bites.push(B.dyn(B.box(0.06, 0.04, 0.06, (r + c) % 2 ? "#e8b86a" : "#f4e6c8", -0.18 + c * 0.09, 1.03, -1.0 + r * 0.09)));
        for (const x of [-1.2, 1.2]) B.prop.stool({ x, z: -0.2 });
        B.prop.lamp({ kind: "hang", x: 0, y: 3.4, z: -1.0, glow: "#fff6d8" });
      },
      // Washington, 1948: a little row of fronts, the small car insurer with a FOR SALE sign, the dome far behind
      dc: (B) => {
        B.ground("asphalt", 200, 200); B.ground("concrete:#c8c2b8", 40, 5, { z: -3.6, y: 0.01 });
        B.facade({ style: "brick", w: 6, x: -6.6, z: -6, floors: 3, sign: "BANK" });
        B.facade({ style: "shop", w: 6, x: 0, z: -6, floors: 2, sign: "AUTO INSURANCE", col: "#e8d8b0" });
        B.facade({ style: "brick", w: 6, x: 6.6, z: -6, floors: 3, sign: "POST OFFICE", col: "#8a4a3a" });
        B.cyl(16, 17, 10, "marble:#f4f2ea", 0, 4, -90, { seg: 32 }); B.ball(13, "#f4f2ea", 0, 14, -90, { sy: 0.95, seg: 28 }); B.cyl(2, 2, 5, "#f4f2ea", 0, 26, -90); B.cone(1.6, 3, "#e8e4da", 0, 31, -90);
        H.forSale = B.dyn(B.grp(1.5, 0, -4.4, 0, 1)); B.cyl(0.05, 0.05, 2.2, "#3a3a40", 0, 0, 0, { in: H.forSale }); B.plate(1.3, 0.55, tx(B, "FOR SALE", "#f2c14e", "#c0353a", 900, 380), 0, 2.0, 0.05, { in: H.forSale, d: 0.06, edge: "#7a1a1a" });
        H.car = B.prop.car({ x: -3.4, z: -1.6, col: "#2a4a3a", s: 0.8 });
        B.prop.lampPost({ x: -1.8, z: -3.4 }); B.prop.lampPost({ x: 4.2, z: -3.4 }); B.prop.bench({ x: 3.0, z: -4.2 });
        B.plate(1.1, 1.0, tx(B, "1948", "#f4efe2", "#2a3a5a", 512, 465), -4.6, 1.6, -3.0, { d: 0.04, edge: "#2a3a5a" });
      },
      // the mail room: pigeonholes, sorting table, sacks of policies, a door that slams on the agent
      mail: (B) => {
        B.set.room({ style: "office", wall: "plaster:#c8b48a", floor: "planks:#8a6a4a", w: 9, d: 7, h: 3.6, windows: [-3.2], door: false });
        B.box(3.4, 2.2, 0.3, "#5a3b2a", -0.4, 0.4, -3.3);
        for (let r = 0; r < 5; r++) for (let c = 0; c < 8; c++) { B.box(0.36, 0.36, 0.05, "#3a2418", -1.9 + c * 0.43, 0.6 + r * 0.42, -3.12); if ((r * 3 + c) % 3) B.plate(0.24, 0.14, "#f4efe2", -1.9 + c * 0.43, 0.78 + r * 0.42, -3.08, { d: 0.02, edge: "#c8b890" }); }
        B.plate(2.6, 0.4, tx(B, "POLICIES BY MAIL", "#2a3a5a", "#f4efe2", 1024, 158), -0.4, 2.95, -3.4, { d: 0.03 });
        B.prop.table({ x: -0.4, z: -1.4, w: 2.6, d: 0.9, h: 0.8, col: "planks:#a87a4a" });
        for (let k = 0; k < 6; k++) B.plate(0.24, 0.14, "#f4efe2", -1.3 + k * 0.36, 0.82, -1.4 + (k % 2) * 0.15, { d: 0.02, edge: "#c8b890", rx: -Math.PI / 2 });
        for (const x of [-3.0, -2.4]) B.prop.moneyBag({ x, z: -2.2, size: 0.9, col: "#c8b890" });
        B.plate(0.7, 0.24, tx(B, "U.S. MAIL", "#c8b890", "#2a3a5a", 512, 175), -2.7, 0.55, -1.75, { d: 0.02 });
        H.door = B.prop.door({ x: 3.0, z: -3.44, col: "planks:#3f6a8a" });
        H.pile = B.dyn(B.grp(2.2, 0, -2.0, 0, 1));
        for (let k = 0; k < 14; k++) B.box(0.5 - (k % 4) * 0.06, 0.16, 0.34, k % 3 ? "#f4efe2" : "#e8dcc0", ((k * 37) % 5 - 2) * 0.05, k * 0.16, ((k * 13) % 3 - 1) * 0.04, { in: H.pile, ry: (k % 5) * 0.3 });
        B.prop.lamp({ kind: "hang", x: -0.4, y: 3.6, z: -1.4, glow: "#fff2c8" });
      },
      // metaphor: a summer lemonade stand, the middleman, the price card, the line of kids
      lemon: (B) => {
        B.set.landscape({ kind: "meadow", seed: 8, hills: true, count: 0 }); for (const [x, z] of [[-4.5, -6], [4.8, -7], [-8, -10], [9, -12], [1.5, -14]]) B.prop.tree({ x, z, kind: "oak" });
        B.ground("concrete:#d8d2c4", 30, 3, { z: 0.6, y: 0.01 });
        B.box(1.8, 0.9, 0.7, "planks:#f4efe2", 0, 0, -1.2); B.box(2.0, 0.06, 0.9, "#f2c14e", 0, 0.9, -1.2);
        for (const sx of [-0.9, 0.9]) B.box(0.06, 1.2, 0.06, "#f4efe2", sx, 0.96, -1.5);
        const aw = B.box(2.1, 0.06, 1.0, "stripes:#f2c14e:#f4efe2", 0, 2.1, -1.3); aw.rotation.x = 0.25;
        B.plate(1.5, 0.36, tx(B, "LEMONADE", "#f2c14e", "#c0353a", 1024, 246), 0, 0.55, -0.84, { d: 0.03 });
        B.cyl(0.14, 0.12, 0.36, "glass:#f8e86a:lit", -0.5, 0.96, -1.2); for (let k = 0; k < 4; k++) B.cyl(0.05, 0.04, 0.12, "#f4f6fa", 0.1 + k * 0.14, 0.96, -1.05);
        H.p10 = B.dyn(B.plate(0.6, 0.45, tx(B, "10¢", "#f4efe2", "#c0353a", 512, 384), 0.6, 1.6, -1.45, { d: 0.03, edge: "#c0353a" }));
        H.p5 = B.dyn(B.plate(0.6, 0.45, tx(B, "5¢", "#f4efe2", "#2a8a4a", 512, 384), 0.6, 1.6, -1.45, { d: 0.03, edge: "#2a8a4a" })); H.p5.visible = false;
        B.prop.fence({ x: -6, z: -3.4, len: 12 });
      },
      // a 1950s highway: cars streaming toward camera past a billboard
      road: (B) => {
        B.set.landscape({ kind: "meadow", seed: 3, road: 6, hills: true, count: 0 }); for (const [x, z] of [[-6, -10], [-7, -20], [7.5, -16], [-9, -4], [9, -30], [-5, -34]]) B.prop.tree({ x, z, kind: "oak" });
        for (let k = 0; k < 10; k++) B.box(0.15, 0.02, 1.4, "#f4efe2", 0, 0.03, 8 - k * 4);
        B.prop.sign({ x: 5.0, z: -6, w: 3.4, h: 1.2, text: "CAR INSURANCE BY MAIL", post: true, bg: "#f4efe2", fg: "#2a3a5a", edge: "#2a3a5a" });
        H.cars = [];
        const cols = ["#c0353a", "#2a4a8a", "#f2c14e", "#2f6a4a", "#e8e0c8", "#8a3ab5", "#d8642a", "#3f8fe0"];
        for (let k = 0; k < 8; k++) H.cars.push(B.prop.car({ x: k % 2 ? 1.5 : -1.5, z: -30, ry: -Math.PI / 2, col: cols[k], s: 0.75 }));
      },
      // dark-green stage: the 1948 stack vs the 1972 tower, the balance scale, the coin of LUCK / SKILL
      stage: (B) => {
        B.set.stage({ floor: "#e8dcc8", back: "#1f5a4a" });
        // tower area (x -4)
        B.prop.coinStack({ x: -5.0, z: -1.8, r: 0.22, n: 4 });
        H.tower = B.dyn(B.grp(-3.4, 0, -1.8, 0, 1)); B.box(0.9, 4.2, 0.9, "metal:#e8c44a", 0, 0, 0, { in: H.tower });
        for (let k = 0; k < 10; k++) B.box(0.95, 0.04, 0.95, "#b8902a", 0, k * 0.42, 0, { in: H.tower });
        // scale (x 0)
        H.scale = B.prop.scale({ x: 0, z: -2.2, s: 2.0 });
        const [pl, pr] = H.scale.pans;
        B.prop.coin({ in: pl, x: 0, y: -0.36, z: 0, r: 0.12, col: "#f2c14e" });
        for (let k = 0; k < 9; k++) B.box(0.09, 0.09, 0.09, k % 2 ? "planks:#a87a4a" : "planks:#c09a5a", (k % 3 - 1) * 0.1, -0.49 + Math.floor(k / 3) * 0.09, ((k * 7) % 3 - 1) * 0.04, { in: pr });
        // coin and pedestal (x 4)
        B.prop.pedestal({ x: 4.0, z: -1.8, r: 0.9, h: 0.6, col: "#f4efe2", trim: "#c9a44a" });
        H.coin = B.dyn(B.grp(4.0, 1.6, -1.8, 0, 1));
        B.cyl(0.8, 0.8, 0.14, "metal:#e8c44a", 0, -0.07, 0, { in: H.coin, rx: Math.PI / 2, seg: 36 });
        B.plate(1.0, 0.42, tx(B, "LUCK", "#e8c44a", "#7a1a1a", 700, 294), 0, 0, 0.08, { in: H.coin, d: 0.02, edge: "#b8902a" });
        B.plate(1.0, 0.42, tx(B, "SKILL", "#e8c44a", "#1f5a4a", 700, 294), 0, 0, -0.08, { in: H.coin, d: 0.02, edge: "#b8902a", ry: Math.PI });
        B.lamp(0, 5, 2, "#fff2c8", 7, 14);
      },
    },
    shots: [
      // 0 · frame 0: push into the chart room, Graham at his desk, papers flying
      { set: "office", f: 0, light: "office", cam: CAM.fit([-1.2, 1.45, -2.0], { w: 2.5, a0: -24, a1: 4, e0: 10, e1: 4, push: 0.3 }),
        act: (S, u, f) => { S.actor("graham", { x: -1.3, z: -2.4, expr: "smile", prop: "paper" });
          S.pop("paper", 0, 26, { x: -0.6, y: 1.6, z: -1.6, w: 0.4, h: 0.4, rise: 1.0, spin: 2, pop: false }); S.pop("paper", 4, 26, { x: -1.9, y: 1.5, z: -1.6, w: 0.35, h: 0.35, rise: 1.2, spin: -2, pop: false });
          S.pop("label", W(0, "father") - 2, 60, { x: -1.3, y: AH + 0.75, z: -2.1, w: 2.0, h: 0.34, text: "FATHER OF VALUE INVESTING", col: "#2a3a5a", hold: true }); } },
      // 1 · his biggest profit: a money bag thumps onto the desk
      { set: "office", word: [0, "biggest"], lead: 3, trans: "cut", light: K.light("office", { sat: 1.2 }), cam: CAM.fit([-1.0, 1.1, -1.7], { w: 1.4, a0: 12, a1: 4, elev: 8, push: 0.12 }), coc: 10,
        act: (S, u, f) => { const land = W(0, "profit") - 1, k = E.prog(f, land - 6, land); H.bag.visible = true; H.bag.position.y = 0.81 + 1.4 * (1 - E.easeIn(k)); S.kick(land, 0.06);
          S.pop("coin", land, 24, { x: -1.0, y: 1.3, z: -1.5, w: 0.2, h: 0.2, rise: 0.6 }); S.pop("impact", land + 1, 26, { x: -0.9, y: 1.55, z: -1.4, w: 0.8, h: 0.4, text: "BIGGEST $" }); } },
      // 2 · breaking his own rule: smash — the MAX 5% plaque cracks and falls
      { set: "office", word: [0, "breaking"], lead: 3, trans: "smash", light: K.light("office", { sat: 1.1 }), cam: CAM.fit([-2.75, 2.4, -3.4], { w: 2.4, a0: 10, a1: -4, elev: -6, push: 0.14 }),
        act: (S, u, f) => { const c = W(0, "rule.") - 2, k = E.prog(f, c, c + 14);
          H.plL.rotation.z = 0.5 * k; H.plL.position.y = 2.4 - 1.2 * E.easeIn(k); H.plL.position.x = -3.1 - 0.2 * k;
          H.plR.rotation.z = -0.6 * k; H.plR.position.y = 2.4 - 1.3 * E.easeIn(k); H.plR.position.x = -2.4 + 0.2 * k;
          S.pop("impact", c, 22, { x: -2.75, y: 2.6, z: -3.0, w: 1.0, h: 0.5, text: "CRACK!" }); S.kick(c, 0.08); } },
      // 3 · New York, 1948: whip to the street-level skyline of a working day — Mort arriving (dissolve into office)
      { set: "office", beat: 1, trans: "whip", light: K.light("golden", { hemi: 1.2 }), cam: CAM.fit([2.4, 1.7, -2.6], { w: 2.6, a0: -20, a1: -8, elev: 4, push: 0.12 }),
        act: (S, u, f) => { S.actor("mort", { x: 1.6 + 0.6 * u, z: -2.4, expr: "smile", mode: "stroll", phase: f * 0.05 });
          S.pop("label", W(1, "York,") - 3, 70, { x: 2.6, y: 2.7, z: -3.0, w: 1.6, h: 0.36, text: "NEW YORK · 1948", col: "#2a3a5a", hold: true }); } },
      // 4 · you work for Benjamin Graham: Mort at his small desk, Graham behind
      { set: "office", word: [1, "You"], lead: 2, trans: "cut", light: "office", cam: CAM.fit([0.0, 1.45, -1.5], { w: 3.4, a0: 14, a1: 6, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("mort", { x: 1.2, z: -1.2, expr: "grin", prop: "wave", wave: (f % 18) / 18 }); S.actor("graham", { x: -1.3, z: -2.4, expr: "smile", prop: "hold" });
          S.pop("label", W(1, "You") - 1, 50, { x: 1.2, y: AH + 0.55, z: -1.0, w: 1.0, h: 0.3, text: "MORT (YOU)", col: "#c8783a", hold: true });
          S.pop("label", W(1, "Benjamin") - 1, 40, { x: -1.3, y: AH + 0.55, z: -2.2, w: 1.3, h: 0.3, text: "BEN GRAHAM", col: "#2a3a5a" }); } },
      // 5 · his rule: five percent, tops — Graham taps the chart of twenty equal bars
      { set: "office", beat: 2, trans: "whip", dir: -1, light: "office", cam: CAM.fit([-0.1, 1.9, -2.9], { w: 3.6, a0: -10, a1: 2, elev: 0, push: 0.12 }),
        act: (S, u, f) => { const g = E.ss(E.prog(f, S.a, S.a + 24)); H.chart.grow(Array.from({ length: 20 }, (_, i) => Math.max(0.01, (i === 13 ? 0.25 : 1) * E.clamp(g * 1.4 - i * 0.02))));
          S.actor("graham", { x: -1.0, z: -2.9, expr: "stern", prop: "point", look: 0.6 });
          S.say("Five percent. Tops!", W(2, "five") - 4, 46, { x: -0.7, y: AH + 0.75, z: -2.7, w: 1.5, h: 0.48 }); } },
      // 6 · in any one stock: insert, ten tiny equal coin stacks, a 5% tag
      { set: "office", word: [2, "any"], lead: 3, trans: "cut", light: K.light("office", { sat: 1.1 }), steady: true, cam: CAM.fit([-1.35, 0.95, -1.45], { w: 1.3, a0: -8, a1: 6, elev: 14, push: 0.1 }), coc: 11,
        act: (S, u, f) => { S.pop("label", W(2, "one") - 2, 36, { x: -1.35, y: 1.15, z: -1.3, w: 0.5, h: 0.2, text: "5% EACH", col: "#3f8fa0" }); } },
      // 7 · he'd diversify his lunch: whip to the automat, twenty tiny bites on one plate
      { set: "automat", beat: 3, trans: "whip", light: "interior", cam: CAM.fit([0.2, 1.4, -1.2], { w: 2.6, a0: 14, a1: 4, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("graham", { x: -0.3, z: -1.6, expr: "smile_closed", prop: "hold" }); S.actor("mort", { x: 0.9, z: -1.5, expr: f > W(3, "lunch.") ? "laugh" : "grin", look: -0.5 });
          S.pop("label", W(3, "diversify") - 2, 40, { x: -0.2, y: 2.4, z: -1.3, w: 1.4, h: 0.3, text: "20 TINY BITES", col: "#2f8a6a" }); } },
      // 8 · insert on the plate: the bites pop up one by one
      { set: "automat", word: [3, "lunch."], lead: 6, trans: "cut", light: "interior", steady: true, cam: CAM.fit([0, 1.05, -0.86], { w: 0.85, a0: -4, a1: 4, elev: 26, push: 0.12 }), coc: 12,
        act: (S, u, f) => { H.bites.forEach((b, i) => { const k = E.back(E.prog(f, S.a + i * 1.2, S.a + i * 1.2 + 6)); b.scale.set(1, Math.max(0.01, k), 1); });
          S.pop("word", S.a + 22, 24, { x: 0, y: 1.3, z: -0.7, w: 0.5, h: 0.24, text: "5% EACH", col: "#2f8a6a" }); } },
      // 9 · then a small car insurer comes up for sale: Washington, the FOR SALE sign swings in
      { set: "dc", beat: 4, trans: "whip", light: "golden", cam: CAM.fit([0.8, 2.0, -3.8], { w: 4.0, a0: -12, a1: 4, e0: 10, e1: 4, push: 0.14 }),
        act: (S, u, f) => { const k = E.back(E.prog(f, W(4, "sale.") - 8, W(4, "sale.") + 2)); H.forSale.position.y = 3.0 * (1 - k); H.forSale.rotation.z = 0.2 * (1 - k) * Math.sin(f * 0.5);
          S.actor("tex", { x: 0.9, z: -3.6, expr: "grin", prop: "point", look: 0.4 });
          S.pop("label", W(4, "small") - 2, 50, { x: 0.5, y: 3.4, z: -4.2, w: 1.9, h: 0.36, text: "WASHINGTON, D.C.", col: "#2a3a5a", hold: true }); S.kick(W(4, "sale."), 0.05); } },
      // 10 · it sells by mail to government workers: the mail room, envelopes flying to the clerks
      { set: "mail", beat: 5, trans: "dissolve", light: "interior", cam: CAM.fit([-0.4, 1.4, -1.8], { w: 3.6, a0: -14, a1: 2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("clerk", { x: -1.2, z: -2.0, expr: "smile", prop: "hold" }); S.actor("typist", { x: 0.4, z: -2.0, expr: "grin", prop: "paper" });
          for (let q = 0; q < 5; q++) S.pop("paper", S.a + 4 + q * 7, 22, { x: -2.4 + q * 0.6, y: 1.2, z: -1.2, w: 0.26, h: 0.18, rise: 0.8, spin: 2, pop: q === 0 });
          S.pop("label", W(5, "government") - 2, 40, { x: -0.4, y: AH + 0.75, z: -1.8, w: 2.0, h: 0.32, text: "GOVERNMENT WORKERS", col: "#2a3a5a" }); } },
      // 11 · no agents: the salesman at the door — slam
      { set: "mail", word: [5, "No"], lead: 4, trans: "smash", light: K.light("interior", { sat: 1.1 }), cam: CAM.fit([3.0, 1.4, -3.1], { w: 2.0, a0: -16, a1: -8, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.pile.visible = false; const sl = W(5, "agents.") + 2, k = E.prog(f, sl - 5, sl); H.door.leaf.rotation.y = 1.4 * (1 - E.easeIn(k));
          if (f < sl) S.actor("agent", { x: 3.0, z: -3.2, expr: "grin", prop: "wave", wave: (f % 14) / 14 });
          S.say("Need an agent?", S.a + 1, 16, { x: 2.6, y: AH + 0.65, z: -3.0, w: 1.1, h: 0.4 });
          S.pop("impact", sl, 24, { x: 3.0, y: 1.6, z: -2.9, w: 1.4, h: 0.6, text: "NO AGENTS!" }); S.kick(sl, 0.08); } },
      // 12 · Graham buys half of it: back in the office, the toy insurer splits, half slides to Graham
      { set: "office", beat: 6, trans: "whip", light: "office", cam: CAM.fit([-0.7, 1.3, -1.9], { w: 2.4, a0: 16, a1: 6, elev: 8, push: 0.12 }),
        act: (S, u, f) => { const k = E.ss(E.prog(f, W(6, "half") - 4, W(6, "half") + 8)); H.toyR.position.x = -0.57 + 0.35 * k; H.toyL.position.x = -0.75 - 0.15 * k;
          S.actor("graham", { x: -1.3, z: -2.4, expr: "grin", prop: "point", look: 0.3 }); S.actor("tex", { x: 0.0, z: -2.3, expr: "smile", prop: "hold", look: -0.4 });
          S.pop("label", W(6, "half") - 1, 40, { x: -0.6, y: 1.55, z: -1.5, w: 0.6, h: 0.24, text: "50%", col: "#c0353a" }); } },
      // 13 · for $712,000: bills rain, the number
      { set: "office", word: [6, "seven"], lead: 3, trans: "cut", light: K.light("office", { sat: 1.2 }), cam: CAM.fit([-0.6, 1.6, -1.8], { w: 3.0, a0: -10, a1: 0, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.toyR.position.x = -0.22; H.toyL.position.x = -0.9; S.actor("graham", { x: -1.3, z: -2.4, expr: "laugh", prop: "up" }); S.actor("tex", { x: 0.0, z: -2.3, expr: "laugh", prop: "hold" });
          for (let q = 0; q < 6; q++) S.pop("bill", S.a + q * 4, 30, { x: -1.6 + q * 0.4, y: 2.6, z: -1.6, w: 0.3, h: 0.16, rise: -1.2, spin: 1.5, pop: q === 0 });
          S.pop("label", W(6, "twelve") - 2, 50, { x: -0.6, y: 2.4, z: -1.6, w: 1.5, h: 0.42, text: "$712,000", col: "#2a6a2a", hold: true }); } },
      // 14 · about a fifth of the fund, in one stock: the chart — one bar shoots up to 20%
      { set: "office", beat: 7, trans: "zoom", light: "office", cam: CAM.fit([0.9, 2.2, -3.3], { w: 3.6, a0: 6, a1: -4, elev: 0, push: 0.12 }),
        act: (S, u, f) => { const k = E.back(E.prog(f, W(7, "fifth") - 4, W(7, "fifth") + 8)); H.chart.grow(Array.from({ length: 20 }, (_, i) => (i === 13 ? 0.25 + 0.75 * k : 1)));
          S.pop("label", W(7, "fifth"), 50, { x: 1.55, y: 3.35, z: -3.0, w: 0.8, h: 0.34, text: "20%", col: "#c0353a", hold: true }); S.pop("sparks", W(7, "fifth") + 2, 14, { x: 1.55, y: 3.2, z: -3.0, w: 1.2, h: 1.0 });
          S.pop("label", W(7, "one") - 2, 30, { x: 0.0, y: 3.35, z: -3.0, w: 1.2, h: 0.3, text: "ONE STOCK", col: "#2a3a5a" }); } },
      // 15 · Mort: "A fifth?!"
      { set: "office", word: [7, "one"], lead: 1, trans: "cut", light: "office", cam: CAM.fit([1.2, AH - 0.05, -1.2], { w: 1.3, a0: -12, a1: -4, elev: 2, push: 0.14 }), coc: 9,
        act: (S, u, f) => { S.actor("mort", { x: 1.2, z: -1.2, expr: "shock", prop: "up" }); S.say("A FIFTH?!", S.a + 1, 26, { x: 0.95, y: AH + 0.5, z: -1.0, w: 0.8, h: 0.4, tail: "right" }); } },
      // 16 · why would Wall Street's most careful man do that? Graham calm, question marks, dusk
      { set: "office", beat: 8, trans: "dissolve", light: K.light("lamp", { hemi: 1.4 }), cam: CAM.fit([-1.3, 1.5, -2.2], { w: 2.2, a0: 14, a1: 4, elev: 4, push: 0.14 }),
        act: (S, u, f) => { S.actor("graham", { x: -1.3, z: -2.4, expr: "smile_closed", prop: "chin" });
          S.pop("question", W(8, "Why") - 2, 60, { x: -0.6, y: AH + 0.45, z: -2.1, w: 0.32, h: 0.45, hold: true }); S.pop("question", W(8, "that?") - 4, 30, { x: -1.95, y: AH + 0.4, z: -2.1, w: 0.28, h: 0.4 }); } },
      // 17 · you see, a lemonade stand with no middleman: push through into the summer stand, the middleman is yanked away
      { set: "lemon", beat: 9, trans: "zoom", light: "golden", cam: CAM.fit([0.0, 1.2, -1.2], { w: 3.9, a0: -12, a1: 0, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("kid", { x: -1.25, z: -1.0, expr: "grin", prop: "hold" });
          const y = W(9, "middleman.") - 2, k = E.easeIn(E.prog(f, y, y + 10)); if (k < 1) S.actor("middle", { x: 1.4 + 5 * k, z: -1.2, expr: f >= y ? "shock" : "grin", prop: "hold", tilt: -20 * k });
          S.pop("label", S.a + 4, Math.max(10, y - S.a - 4), { x: 1.4, y: AH + 0.55, z: -1.0, w: 0.9, h: 0.3, text: "MY CUT", col: "#5a3a6a" });
          S.pop("puff", y + 2, 16, { x: 2.2, y: 0.9, z: -1.0, w: 1.2, h: 1.0 }); } },
      // 18 · cheaper cups: the price card flips 10¢ → 5¢
      { set: "lemon", word: [9, "Cheaper"], lead: 2, trans: "cut", light: K.light("golden", { sat: 1.2 }), steady: true, cam: CAM.fit([-0.45, 1.25, -1.1], { w: 2.7, a0: 8, a1: 0, elev: 2, push: 0.12 }), coc: 10,
        act: (S, u, f) => { const fl = W(9, "cups,") - 2; H.p10.visible = f < fl; H.p5.visible = f >= fl; S.pop("stars", fl, 16, { x: 0.6, y: 1.6, z: -1.2, w: 0.8, h: 0.8 });
          S.actor("kid", { x: -1.25, z: -1.0, expr: "laugh", prop: "point", look: 0.5 }); } },
      // 19 · longer line: kids pile into the queue
      { set: "lemon", word: [9, "longer"], lead: 3, trans: "whip", light: "golden", cam: CAM.fit([1.8, 1.1, -0.2], { w: 4.4, a0: 24, a1: 14, elev: 6, push: 0.1 }),
        act: (S, u, f) => { S.actor("kid", { x: -1.25, z: -1.0, expr: "laugh", prop: "hold" }); const ids = ["kid2", "kid3", "kid2", "kid3", "kid2"];
          ids.forEach((id, i) => { const t0 = S.a + i * 5; if (f >= t0) S.actor(id, { key: "q" + i, x: 0.4 + i * 0.75, z: -0.4 + i * 0.25, expr: i % 2 ? "grin" : "smile", mode: f < t0 + 10 ? "stroll" : "stand", phase: f * 0.06 }); });
          S.pop("arrow", W(9, "line.") - 2, 30, { x: 3.4, y: 1.8, z: 0.4, w: 0.5, h: 0.8, dir: "up" }); } },
      // 20 · cheaper policies, more drivers: whip to the highway, cars stream in
      { set: "road", beat: 10, trans: "whip", light: "golden", cam: CAM.fit([1.0, 1.3, -6.0], { w: 5.5, a0: -14, a1: -4, e0: 8, e1: 4, push: 0.12 }),
        act: (S, u, f) => { H.cars.forEach((c, i) => { const t0 = S.a + i * 5; c.visible = f >= t0; c.position.z = -34 + 0.5 * Math.max(0, f - t0); });
          S.pop("label", W(10, "drivers,") - 2, 40, { x: 1.0, y: 2.6, z: -5.4, w: 1.9, h: 0.36, text: "MORE DRIVERS", col: "#2a6a2a" }); } },
      // 21 · and the company kept growing: the mail room, the pile of policies rises
      { set: "mail", word: [10, "company"], lead: 4, trans: "whip", dir: -1, light: K.light("interior", { sat: 1.15 }), cam: CAM.fit([1.6, 1.5, -1.9], { w: 3.0, a0: 12, a1: 2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.pile.scale.y = 0.1 + 1.0 * E.ss(E.prog(f, S.a, S.a + 34)); S.actor("clerk", { x: 0.4, z: -1.8, expr: "laugh", prop: "up" });
          S.pop("arrow", W(10, "growing.") - 2, 30, { x: 2.9, y: 2.4, z: -1.8, w: 0.5, h: 0.8, dir: "up" }); } },
      // 22 · by 1972 the stake was worth: flash (time jump) to the stage, small stack vs rising tower
      { set: "stage", beat: 11, trans: "flash", light: K.backdrop("#1f5a4a"), cam: CAM.fit([-4.1, 1.7, -1.8], { w: 3.6, a0: -16, a1: 4, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.tower.scale.y = Math.max(0.02, 0.5 * E.ss(E.prog(f, S.a + 6, W(11, "four") - 4)));
          S.pop("label", S.a + 2, 60, { x: -5.0, y: 1.0, z: -1.4, w: 0.9, h: 0.3, text: "1948: $712K", col: "#2a3a5a", hold: true });
          S.pop("label", W(11, "seventy-two,") - 3, 50, { x: -4.1, y: 3.4, z: -1.6, w: 0.9, h: 0.36, text: "1972", col: "#c0353a", hold: true }); } },
      // 23 · four hundred million dollars: smash, the tower slams to full height, confetti, old Graham laughing
      { set: "stage", word: [11, "four"], lead: 3, trans: "smash", light: K.backdrop("#2a7a5a"), cam: CAM.fit([-3.6, 2.0, -1.4], { w: 4.6, a0: 10, a1: -2, e0: -4, e1: 6, push: 0.1 }),
        act: (S, u, f) => { H.tower.scale.y = 0.5 + 0.5 * E.back(E.prog(f, S.a, S.a + 8)); S.actor("graham72", { x: -2.2, z: -1.0, expr: "laugh", prop: "up" });
          S.pop("confetti", S.a + 4, 40, { x: -3.4, y: 3.6, z: -1.2, w: 3.0, h: 2.0, pop: false }); S.kick(S.a + 4, 0.08);
          S.pop("impact", W(11, "million") - 2, 40, { x: -3.6, y: 3.0, z: -0.8, w: 2.4, h: 0.9, text: "$400 MILLION" }); } },
      // 24 · Graham wrote: night, Graham at his lamp writing
      { set: "office", beat: 12, trans: "dissolve", light: K.light("night", { hemi: 1.9 }), cam: CAM.fit([-1.4, 1.3, -2.0], { w: 2.0, a0: -14, a1: -4, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("graham72", { x: -1.3, z: -2.4, expr: "smile_closed", prop: "paper", look: 0.3 });
          S.pop("label", W(12, "wrote") - 1, 40, { x: -1.4, y: AH + 0.95, z: -2.1, w: 1.2, h: 0.3, text: "POSTSCRIPT", col: "#2a3a5a" }); } },
      // 25 · one decision beat all his others, twenty years, combined: the scale — one coin outweighs a pile of crates
      { set: "stage", word: [12, "beat"], lead: 3, trans: "whip", light: K.backdrop("#1f5a4a"), cam: CAM.fit([0, 2.0, -2.2], { w: 4.6, a0: -8, a1: 6, elev: 6, push: 0.12 }),
        act: (S, u, f) => { const k = E.back(E.prog(f, W(12, "combined.") - 6, W(12, "combined.") + 4)); H.scale.tilt(-0.18 + 0.5 * k);
          S.pop("label", S.a + 2, 80, { x: -1.2, y: 3.6, z: -2.0, w: 1.2, h: 0.3, text: "1 DECISION", col: "#c0353a", hold: true });
          S.pop("label", W(12, "twenty") - 2, 50, { x: 1.2, y: 3.6, z: -2.0, w: 1.2, h: 0.3, text: "20 YEARS", col: "#2a3a5a", hold: true });
          S.kick(W(12, "combined.") - 1, 0.07); } },
      // 26 · one lucky break: the coin spins in the air, LUCK
      { set: "stage", beat: 13, trans: "whip", light: K.backdrop("#1f5a4a"), cam: CAM.fit([4.0, 1.5, -1.8], { w: 2.6, a0: -12, a1: 0, elev: 4, push: 0.12 }),
        act: (S, u, f) => { H.coin.rotation.y = 0.12 * Math.sin(f * 0.3); H.coin.position.y = 1.7 + 0.06 * Math.sin(f * 0.2);
          S.pop("stars", W(13, "lucky") - 2, 24, { x: 5.0, y: 2.5, z: -1.5, w: 0.8, h: 0.8 }); } },
      // 27 · or one supremely shrewd decision: the coin flips to SKILL
      { set: "stage", word: [13, "shrewd"], lead: 8, trans: "cut", light: K.backdrop("#2a6a5a"), cam: CAM.fit([4.0, 1.6, -1.8], { w: 2.3, a0: 10, a1: 2, elev: 2, push: 0.12 }),
        act: (S, u, f) => { H.coin.rotation.y = Math.PI * E.ss(E.prog(f, S.a, S.a + 10)); H.coin.position.y = 1.7;
          S.pop("bulb", W(13, "shrewd") , 26, { x: 4.9, y: 2.6, z: -1.5, w: 0.5, h: 0.6 }); } },
      // 28 · can we tell them apart? the coin spins faster and slams down — landing on its edge
      { set: "stage", word: [13, "Can"], lead: 3, trans: "cut", light: K.backdrop("#1f5a4a"), cam: CAM.fit([3.6, 1.3, -1.6], { w: 3.0, a0: -16, a1: -6, elev: 6, push: 0.1 }),
        act: (S, u, f) => { const hit = W(13, "apart?") + 2, k = E.prog(f, hit - 8, hit);
          H.coin.rotation.y = f < hit ? Math.PI + (f - S.a) * 0.9 : Math.PI / 2 + 0.06 * Math.sin((f - hit) * 0.8) * Math.exp(-(f - hit) * 0.08);
          H.coin.position.y = f < hit - 8 ? 2.0 : 2.0 - (2.0 - 1.42) * E.easeIn(k);
          S.actor("mort", { x: 2.85, z: -0.7, expr: f < hit ? "nervous" : "shock", prop: f < hit ? "chin" : "up" });
          S.pop("impact", hit, 30, { x: 4.0, y: 2.6, z: -1.3, w: 1.0, h: 0.8, text: "?!" }); S.kick(hit, 0.1); S.pop("puff", hit, 14, { x: 4.0, y: 0.8, z: -1.2, w: 1.6, h: 0.6 }); } },
    ],
  };
};
