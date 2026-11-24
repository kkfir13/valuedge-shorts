// "The Chairs Never Lost" (the first Dow Jones average, 1896: twelve companies at 40.94; all twelve cut; 50,000 in 2026) — film module.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const H = {};
  const PI = Math.PI;
  const tx = (B, s, bg, fg, w = 1024, h = 256) => B.textTex(s, bg, fg, w, h);
  const NAMES = ["LEATHER", "SUGAR", "TOBACCO", "GAS", "WHISKEY", "ELECTRIC", "COTTON OIL", "LEAD", "RUBBER", "COAL & IRON", "ST. LOUIS GAS", "UTILITIES"];
  const CX = (i) => -4.125 + i * 0.75;   // chair x on the stage
  const CZ = -1.0;                       // chair z (seat faces +z); a seated actor sits at CZ + 0.04
  const LINE = (i) => -3.0 + i * 0.545;  // the line-up of cut giants (front of stage)
  const KH = 1.05;

  // a simple cartoon cow facing +x before rotation; returns the group and its head (to chomp)
  const cow = (B, x, z, ry, c = "#f4efe2") => { const g = B.grp(x, 0, z, ry, 1);
    for (const [lx, lz] of [[-0.45, -0.18], [-0.45, 0.18], [0.4, -0.18], [0.4, 0.18]]) B.cyl(0.06, 0.06, 0.5, c, lx, 0, lz, { in: g });
    B.box(1.25, 0.55, 0.6, c, 0, 0.45, 0, { in: g }); B.box(0.35, 0.3, 0.62, "#2a2226", -0.2, 0.62, 0, { in: g }); B.box(0.25, 0.22, 0.62, "#2a2226", 0.3, 0.5, 0, { in: g });
    B.cyl(0.03, 0.01, 0.4, c, -0.65, 0.55, 0, { in: g, rz: 0.6 });
    const head = B.dyn(B.grp(0.62, 0.8, 0, 0, 1, g)); B.box(0.36, 0.34, 0.36, c, 0.12, -0.17, 0, { in: head }); B.box(0.16, 0.2, 0.3, "#e8a0a8", 0.33, -0.2, 0, { in: head });
    for (const sz of [-1, 1]) { B.cone(0.04, 0.16, "#e8dcc0", 0.05, 0.16, sz * 0.14, { in: head }); B.ball(0.035, "#241726", 0.3, 0.06, sz * 0.12, { in: head }); }
    return { g: B.dyn(g), head }; };

  // a gold trophy for the finale
  const trophy = (B) => { const g = B.grp(0, 4, -0.2, 0, 1);
    B.box(0.5, 0.18, 0.5, "#5a3a24", 0, 0, 0, { in: g }); B.cyl(0.07, 0.1, 0.35, "#f2c14e", 0, 0.18, 0, { in: g }); B.cyl(0.32, 0.12, 0.45, "#f2c14e", 0, 0.53, 0, { in: g, seg: 24 });
    for (const sx of [-1, 1]) B.ball(0.11, "#e0a82e", sx * 0.36, 0.82, 0, { in: g, sy: 1.4 });
    B.plate(0.4, 0.12, tx(B, "WIN", "#f2c14e", "#5a3a10", 1024, 307), 0, 0.09, 0.26, { in: g, d: 0.01 }); return B.dyn(g); };

  const giants = { g0: ["#7a4a2a", "tophat"], g1: ["#f0ece0", "bowler"], g2: ["#4a6a3a", "tophat"], g3: ["#3a5a8a", "bowler"], g4: ["#8a2a2a", "tophat"], g5: ["#e8b83a", "hair"],
    g6: ["#b8863a", "bowler"], g7: ["#6a6e78", "tophat"], g8: ["#2a2a30", "bowler"], g9: ["#5a3a5a", "tophat"], g10: ["#2f6a6a", "bowler"], g11: ["#7a5a8a", "tophat"] };
  const cast = {};
  Object.entries(giants).forEach(([k, [j, h]], i) => { cast[k] = { jacket: j, pants: "#2a2a34", boots: "#1a1418", hat: h, capColor: "#1e1a20", hair: "#4a3424", skin: ["#f2c9a4", "#e8b48a", "#f5d6b8", "#d9a27a"][i % 4], moustache: i % 3 === 0 ? "#5a3a24" : undefined, buttons: "#c9a44a", build: "stout" }; });
  Object.assign(cast, {
    dow: { jacket: "#3a3a4a", pants: "#2a2a34", boots: "#1a1418", hat: "hair", hair: "#8a7a6a", moustache: "#8a7a6a", skin: "#f2c9a4", buttons: "#c9a44a" },
    pharm: { jacket: "#f4f6fa", pants: "#3a4a6a", boots: "#2a2d38", hat: "hair", hair: "#2a201a", skin: "#c99067", buttons: "#4fd18b" },
    riseA: { jacket: "#2fb8a0", pants: "#2a3a4a", boots: "#1a1a20", hat: "hair", hair: "#2a201a", skin: "#e8b48a", buttons: "#f4f6fa" },
    riseB: { jacket: "#e2453c", pants: "#2a2a3a", boots: "#1a1a20", hat: "hair", hair: "#e8c86a", dress: "#e2453c", skin: "#f5d6b8", buttons: "#f4f6fa" },
    riseC: { jacket: "#3f8fe0", pants: "#2a2a3a", boots: "#1a1a20", hat: "hair", hair: "#6a3a24", skin: "#c99067", buttons: "#f4f6fa" },
    fader: { jacket: "#8a8a8e", pants: "#4a4a50", boots: "#2a2a2e", hat: "bowler", capColor: "#4a4a50", skin: "#e8d8c8", moustache: "#9a9a9a", buttons: "#b8b8b8", build: "stout" },
    kidA: { jacket: "#c0353a", pants: "#f4efe2", boots: "#2a2d38", hat: "cap", cap: "#c0353a", skin: "#f5c9a0", build: "kid" },
    kidB: { jacket: "#c0353a", pants: "#f4efe2", boots: "#2a2d38", hat: "hair", hair: "#2a201a", skin: "#c99067", build: "kid" },
    kidC: { jacket: "#c0353a", pants: "#f4efe2", boots: "#2a2d38", hat: "hair", hair: "#e8c86a", dress: "#c0353a", skin: "#f5d6b8", build: "kid" },
    kidD: { jacket: "#c0353a", pants: "#f4efe2", boots: "#2a2d38", hat: "cap", cap: "#f4efe2", skin: "#8a5a3a", build: "kid" },
    coach: { jacket: "#2a3a5a", pants: "#3a3a40", boots: "#1a1a20", hat: "cap", cap: "#c0353a", skin: "#e8b48a", moustache: "#5a3a24", build: "stout" },
  });
  const GK = Object.keys(giants);
  const RISE = ["riseA", "riseB", "riseC"];

  return {
    cast,
    sets: {
      // metaphor stage: THE DOW — twelve chairs in a row, name plates, a bulb sign, the trophy
      chairs: (B) => {
        B.set.stage({ floor: "#e8dcc8", back: "#2a2f5a" });
        B.prop.bulbSign({ x: 0, y: 3.0, z: -3.4, w: 3.6, h: 0.9, text: "THE DOW", bg: "#1a1e3a", fg: "#ffd84a" });
        B.box(10.2, 0.02, 2.0, "carpet:#7a2a3a", 0, 0, -1.2, { cast: false });
        H.chair = []; H.plate = [];
        for (let i = 0; i < 12; i++) { H.chair.push(B.prop.chair({ x: CX(i), z: CZ, col: "#c0353a" }));
          H.plate.push(B.dyn(B.plate(0.62, 0.17, tx(B, NAMES[i], "#f4efe2", "#241726", 1024, 281), CX(i), 0.3, -0.18, { d: 0.02, edge: "#c9a44a", rx: -0.3 }))); }
        H.trophy = trophy(B); H.trophy.visible = false;
        B.lamp(0, 5, 3, "#fff0c8", 6, 12); B.lamp(-4, 4, 1, "#c8d8ff", 3, 8);
      },
      // New York harbour, 1896: dock, sailing ship, crates of the new industrial goods
      harbor: (B) => {
        B.set.harbor({ crates: ["SUGAR", "TOBACCO", "LEATHER", "COTTON OIL"], shipX: -5 });
        B.prop.lampPost({ x: -1.4, z: 4.2 }); B.prop.barrel({ x: 0.9, y: 0.8, z: 1.4 }); B.prop.barrel({ x: 0.2, y: 0.8, z: 0.8 });
        B.prop.sign({ x: -1.35, y: 1.0, z: 4.25, w: 1.4, h: 0.38, text: "NEW YORK", bg: "#2f4a7a", fg: "#f4efe2" });
        for (let i = 0; i < 5; i++) B.facade({ style: "brick", w: 6, x: 9 + i * 0.2, z: 10 - i * 6.2, ry: -PI / 2, seed: 40 + i, sign: ["SUGAR REFINERY", "TANNERY", "TOBACCO", "GAS WORKS", "WAREHOUSE"][i] });
      },
      // the 1896 newsroom: a desk, a telegraph, a blackboard where twelve prices are added up
      newsroom: (B) => {
        B.set.room({ style: "office", wall: "wallpaper:#8a6a3a", floor: "planks:#6a4a30", w: 7, d: 6, h: 3.4, windows: [2.4], door: false });
        B.prop.desk({ x: -1.2, z: -1.3, w: 1.5 }); B.prop.chair({ x: -1.2, z: -1.95, col: "#3a2418" }); H.tel = B.prop.telegraph({ x: -0.7, y: 0.81, z: -1.2 });
        B.prop.lamp({ x: -1.6, y: 0.81, z: -1.3, kind: "desk" }); B.prop.lamp({ x: 0.6, y: 3.4, z: -1.6, kind: "hang", cord: 0.6, intensity: 4 });
        B.prop.shelf({ x: -3.0, z: -2.75, w: 0.9, h: 2.4 });
        B.box(3.0, 2.1, 0.08, "#5a3a24", 0.9, 0.6, -2.96); B.plate(2.85, 1.95, "#2f4a3a", 0.9, 1.65, -2.91, { d: 0.01 });
        B.plate(2.6, 0.3, tx(B, "INDUSTRIALS 1896", "#2f4a3a", "#f4efe2", 1024, 118), 0.9, 2.42, -2.9, { d: 0.01, edge: "#2f4a3a" });
        const px = ["$15", "$59", "$92", "$118", "$62", "$30", "$24", "$85", "$18", "$22", "$9", "$5"];
        H.prices = []; H.names = []; H.cross = [];
        for (let i = 0; i < 12; i++) { const x = 0.9 + (i % 2 ? 0.7 : -0.7), y = 2.15 - Math.floor(i / 2) * 0.2;
          const n = B.dyn(B.plate(0.85, 0.16, tx(B, NAMES[i], "#2f4a3a", "#f4efe2", 1024, 193), x - 0.2, y, -2.895, { d: 0.005, edge: "#2f4a3a" })); n.visible = false; H.names.push(n);
          const p = B.dyn(B.plate(0.36, 0.16, tx(B, px[i], "#2f4a3a", "#ffd84a", 512, 228), x + 0.45, y, -2.895, { d: 0.005, edge: "#2f4a3a" })); p.visible = false; H.prices.push(p);
          const c = B.dyn(B.box(1.3, 0.03, 0.01, "#e2453c", x + 0.05, y - 0.015, -2.88)); c.visible = false; H.cross.push(c); }
        H.div = B.dyn(B.plate(1.0, 0.26, tx(B, "÷ 12 =", "#2f4a3a", "#f4efe2", 1024, 266), 0.35, 0.92, -2.895, { d: 0.005, edge: "#2f4a3a" })); H.div.visible = false;
        H.res = B.dyn(B.plate(1.1, 0.34, tx(B, "40.94", "#2f4a3a", "#ffd84a", 1024, 316), 1.45, 0.92, -2.893, { d: 0.005, edge: "#2f4a3a" })); H.res.visible = false;
      },
      // the Whiskey Trust: a brick distillery with a smokestack, barrels, and cattle at a trough of leftover mash
      distillery: (B) => {
        B.set.landscape({ kind: "farm", hills: true, seed: 9, clear: 10 });
        B.facade({ style: "brick", w: 9, x: 0, z: -7, floors: 3, sign: "DISTILLING & CATTLE FEEDING CO." });
        B.cyl(0.55, 0.7, 14, "brick:#8a4a3a", 3.4, 0, -9); B.cyl(0.6, 0.6, 0.5, "#3a3a40", 3.4, 14, -9);
        for (let i = 0; i < 5; i++) B.prop.barrel({ x: -3.6 + (i % 3) * 0.75, y: i > 2 ? 0.95 : 0, z: -3.4 });
        B.prop.fence({ x: 0.4, z: 1.4, len: 6 });
        B.box(3.4, 0.4, 0.5, "planks:#7a5232", 0.4, 0, -0.6); B.box(3.2, 0.06, 0.4, "#8a6a2a", 0.4, 0.36, -0.6);
        H.cows = [cow(B, -0.8, 0.0, PI / 2 + 0.15), cow(B, 0.5, 0.1, PI / 2, "#a8683a"), cow(B, 1.8, 0.0, PI / 2 - 0.15)];
        B.prop.sign({ x: 0.4, y: 0.5, z: -0.86, w: 0.9, h: 0.22, text: "MASH", bg: "#f4e6c8", fg: "#5a3a24" });
      },
      // modern New York: towers, a big ticker screen, a drugstore front
      city: (B) => {
        B.set.city({ lit: true, seed: 12 });
        H.screen = B.prop.screen({ x: 0, y: 0, z: -3.2, w: 3.6, h: 2.0, y0: 1.6, stand: true, label: "THE DOW", curve: (x) => 0.08 + 0.85 * x ** 2.2, ticker: "" });
        B.facade({ style: "shop", w: 6, x: 3.6, z: -1.0, ry: -1.0, floors: 2, sign: "DRUGSTORE", seed: 5 });
        for (const x of [-2.6, 6.5]) B.prop.lampPost({ x, z: 0.5 });
      },
      // the school football field at sunset: yard lines, goalposts, bleachers, a scoreboard, the old team photo
      field: (B) => {
        B.ground("grass", 300, 300, { tile: 6 });
        for (let i = -3; i <= 3; i++) B.box(16, 0.01, 0.12, "#f4f6fa", 0, 0.01, i * 3);
        for (const sx of [-1.2, 1.2]) B.cyl(0.07, 0.07, 3.5, "#f2c14e", sx, 0, -11); B.box(2.5, 0.12, 0.12, "#f2c14e", 0, 1.2, -11);
        for (let r = 0; r < 4; r++) B.box(14, 0.45, 0.8, "planks:#9aa3ad", 0, r * 0.45, -14 - r * 0.8);
        for (const x of [-7, 7]) B.prop.lampPost({ x, z: -9, glow: "#fff2c0", s: 2 });
        B.box(3.6, 1.8, 0.3, "#1e2430", 3.2, 2.0, -10); B.plate(1.6, 0.4, tx(B, "HOME", "#1e2430", "#ffd84a", 1024, 256), 2.3, 3.4, -9.83, { d: 0.01 });
        B.cyl(0.1, 0.1, 2.0, "#3a3a40", 2.0, 0, -10.2); B.cyl(0.1, 0.1, 2.0, "#3a3a40", 4.4, 0, -10.2);
        H.scA = B.dyn(B.plate(1.4, 0.6, tx(B, "FRIDAY", "#1e2430", "#ff6a4a", 1024, 439), 3.8, 3.4, -9.83, { d: 0.01 }));
        H.scB = B.dyn(B.plate(3.0, 0.7, tx(B, "WIN", "#1e2430", "#4fd18b", 1024, 239), 3.2, 2.5, -9.83, { d: 0.01 }));
        // the old team photo: a sepia backdrop in a big frame on the sideline
        H.photo = B.dyn(B.grp(-1.6, 0, -3, 0.25, 1));
        B.plate(2.6, 1.9, "#c8a878", 0, 1.15, -0.35, { in: H.photo, d: 0.04 });
        for (const [w, h, x, y] of [[2.9, 0.16, 0, 2.15], [2.9, 0.16, 0, 0.15], [0.16, 2.1, -1.37, 1.15], [0.16, 2.1, 1.37, 1.15]]) B.box(w, h, 0.12, "#c9a44a", x, y - h / 2, 0.3, { in: H.photo });
        B.plate(1.4, 0.2, tx(B, "OUR TEAM, LONG AGO", "#5a3a24", "#f4e6c8", 1024, 146), 0, 1.95, 0.32, { in: H.photo, d: 0.01 });
        B.prop.bench({ x: 2.2, z: -1.6, ry: 0.2 });
      },
    },
    shots: [
      // 0 · frame 0: on the DOW stage the LEATHER giant is yanked off his chair
      { set: "chairs", f: 0, light: K.backdrop("#2a2f5a"), cam: CAM.fit([CX(1), 1.0, CZ + 0.3], { w: 2.6, a0: -16, a1: 0, elev: 5, push: 0.15 }),
        act: (S, u, f) => { for (let i = 0; i < 4; i++) { const out = i === 0 && f >= 6;
            S.actor(GK[i], { x: CX(i), z: CZ + 0.04 + (out ? 0.5 : 0), mode: out ? "fall" : "sit", expr: out ? "dazed" : i === 1 && f > 10 ? "shock" : "smile" }); }
          S.kick(6, 0.07); S.pop("impact", 6, 26, { x: CX(0) - 0.4, y: 1.3, z: CZ + 0.6, w: 1.1, h: 0.75, text: "FIRED!" }); S.pop("puff", 8, 16, { x: CX(0) - 0.5, y: 0.35, z: CZ + 0.7, w: 0.9, h: 0.4, pop: false }); } },
      // 1 · fired: SUGAR goes next
      { set: "chairs", word: [0, "fired"], lead: 3, light: K.backdrop("#2a2f5a"), cam: CAM.fit([CX(2), 1.0, CZ + 0.3], { w: 2.4, a0: 12, a1: 4, elev: 4 }),
        act: (S, u, f) => { const t = W(0, "fired"); H.plate[0].visible = false;
          for (let i = 1; i < 4; i++) { const out = i === 1 && f >= t; S.actor(GK[i], { x: CX(i) + (out ? 0.0 : 0), z: CZ + 0.04 + (out ? 0.55 : 0), mode: out ? "fall" : "sit", expr: out ? "dazed" : "shock" }); }
          S.kick(t, 0.06); S.pop("impact", t, 22, { x: CX(1), y: 1.4, z: CZ + 0.7, w: 0.9, h: 0.6, text: "OUT!" }); } },
      // 2 · every company it started with: wide, the whole row empties
      { set: "chairs", word: [0, "every"], lead: 2, trans: "whip", dir: 1, light: K.backdrop("#2a2f5a"), cam: CAM.keys([[0, { p: [-2.4, 1.8, 8.6], t: [-1.6, 1.0, CZ], fov: 40 }], [1, { p: [2.4, 1.8, 8.6], t: [1.6, 1.0, CZ], fov: 40 }]]),
        act: (S, u, f) => { for (let i = 0; i < 12; i++) { const tf = S.a + 4 + i * 5, out = f >= tf; H.plate[i].visible = !out;
            S.actor(GK[i], { x: CX(i), z: CZ + 0.04 + (out ? 0.7 : 0), mode: out ? "fall" : "sit", expr: out ? "dazed" : "nervous" });
            S.pop("puff", tf, 12, { x: CX(i), y: 0.4, z: CZ + 0.8, w: 0.6, h: 0.3, pop: false }); }
          S.pop("label", W(0, "started") - 4, 36, { x: 0, y: 1.95, z: CZ + 0.3, w: 2.2, h: 0.36, text: "ALL 12 ORIGINALS", bg: "#ffd84a", hold: true }); } },
      // 3 · Picture New York, 1896: whip to the harbour, a crane over the dock
      { set: "harbor", beat: 1, trans: "whip", light: "golden", cam: CAM.keys([[0, { p: [3.4, 4.6, 12], t: [-1, 1.4, 1], fov: 42 }], [1, { p: [2.6, 2.6, 9.5], t: [0, 1.2, 3], fov: 40 }]]),
        act: (S, u, f) => { S.actor("dow", { x: 0.9, z: 5.4, y: 0.8, expr: "smile", mode: "stroll", phase: f * 0.05 });
          S.pop("label", W(1, "New"), 50, { x: 0.6, y: 3.3, z: 4, w: 2.4, h: 0.5, text: "NEW YORK, 1896", bg: "#f4efe2", hold: true }); } },
      // 4 · eighteen ninety-six: the crates of the new industrial goods
      { set: "harbor", word: [1, "eighteen"], lead: 3, trans: "dissolve", light: "golden", cam: CAM.fit([0.3, 1.9, 4.8], { w: 2.4, a0: 24, a1: 14, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("dow", { x: 0.75, z: 4.6, y: 0.8, expr: "grin", prop: "point", flip: true }); S.pop("bulb", W(1, "ninety-six.") - 2, 26, { x: 0.75, y: 2.75, z: 4.6, w: 0.3, h: 0.4 }); } },
      // 5 · Charles Dow at his desk in the newsroom
      { set: "newsroom", beat: 2, trans: "whip", light: "lamp", cam: CAM.fit([-0.8, 1.35, -1.4], { w: 2.4, a0: -10, a1: 0, elev: 8, push: 0.12 }),
        act: (S, u, f) => { S.actor("dow", { x: -0.35, z: -1.45, expr: "smile", prop: "paper", flip: true }); H.tel.key.rotation.z = 0.15 * (Math.sin(f * 0.9) > 0.4 ? 1 : 0);
          S.pop("label", W(2, "Charles") - 2, 40, { x: -0.35, y: 2.1, z: -1.3, w: 1.3, h: 0.28, text: "CHARLES DOW", bg: "#ffd84a", hold: true }); } },
      // 6 · adds twelve stock prices: the blackboard fills
      { set: "newsroom", word: [2, "twelve"], lead: 3, light: "lamp", steady: true, coc: 10, cam: CAM.fit([0.9, 1.75, -2.9], { w: 2.4, a0: -4, a1: 4, elev: 2, push: 0.1 }),
        act: (S, u, f) => { H.names.forEach((n, i) => { n.visible = true; H.prices[i].visible = f >= S.a + 2 + i * 3; }); for (let i = 0; i < 12; i++) if (f === S.a + 2 + i * 3) S.sfx("tick", f); } },
      // 7 · divides by twelve: Dow at the board with chalk
      { set: "newsroom", word: [2, "divides"], lead: 3, trans: "dissolve", light: "lamp", cam: CAM.fit([0.6, 1.4, -2.2], { w: 2.6, a0: 12, a1: 4, elev: 4 }),
        act: (S, u, f) => { H.names.forEach((n, i) => { n.visible = true; H.prices[i].visible = true; }); H.div.visible = f >= W(2, "twelve,") - 2;
          S.actor("dow", { x: -0.55, z: -2.4, expr: "stern", prop: "point" }); S.pop("label", W(2, "twelve,") - 2, 26, { x: 0.35, y: 0.62, z: -2.6, w: 0.8, h: 0.24, text: "÷ 12", bg: "#f4efe2", hold: true }); } },
      // 8 · forty point nine four: smash on the result
      { set: "newsroom", word: [2, "forty"], lead: 3, trans: "smash", light: "lamp", cam: CAM.fit([0.45, 1.3, -2.4], { w: 2.6, a0: -8, a1: 0, elev: 3, push: 0.12 }),
        act: (S, u, f) => { H.names.forEach((n, i) => { n.visible = true; H.prices[i].visible = true; }); H.div.visible = true; H.res.visible = true;
          S.actor("dow", { x: -0.15, z: -2.3, expr: "grin", prop: "up" }); S.kick(W(2, "forty"), 0.05); S.pop("stars", W(2, "four.") - 2, 24, { x: 1.45, y: 1.2, z: -2.7, w: 1.0, h: 0.5 });
          S.say("40.94!", W(2, "nine") - 2, 30, { x: 0.15, y: 2.25, z: -2.2, w: 0.9, h: 0.38 }); } },
      // 9 · your giants? the full stage, twelve stout tycoons seated
      { set: "chairs", beat: 3, trans: "whip", light: K.backdrop("#2a2f5a"), cam: CAM.keys([[0, { p: [2.8, 1.7, 7.6], t: [2.0, 1.0, CZ], fov: 40 }], [1, { p: [-1.6, 1.7, 7.0], t: [-1.2, 1.0, CZ], fov: 40 }]]),
        act: (S, u, f) => { for (let i = 0; i < 12; i++) S.actor(GK[i], { x: CX(i), z: CZ + 0.04, mode: "sit", expr: i % 2 ? "grin" : "smile" });
          S.pop("label", W(3, "giants?") - 2, 30, { x: 0.4, y: 1.95, z: CZ + 0.3, w: 1.8, h: 0.36, text: "YOUR GIANTS", bg: "#ffd84a", hold: true }); } },
      // 10 · leather, sugar
      { set: "chairs", word: [3, "Leather,"], lead: 3, light: K.backdrop("#2a2f5a"), cam: CAM.fit([(CX(0) + CX(1)) / 2, 1.0, CZ + 0.3], { w: 1.9, a0: -10, a1: -4, elev: 3 }),
        act: (S, u, f) => { for (let i = 0; i < 3; i++) S.actor(GK[i], { x: CX(i), z: CZ + 0.04, mode: "sit", expr: "grin" });
          S.pop("label", W(3, "Leather,"), 60, { x: CX(0), y: 1.68, z: CZ + 0.2, w: 0.75, h: 0.2, text: "LEATHER", bg: "#c8925a", hold: true });
          S.pop("label", W(3, "sugar,"), 40, { x: CX(1), y: 1.68, z: CZ + 0.2, w: 0.75, h: 0.2, text: "SUGAR", bg: "#f4efe2", hold: true }); } },
      // 11 · tobacco, gas
      { set: "chairs", word: [3, "tobacco,"], lead: 3, trans: "dissolve", light: K.backdrop("#2a2f5a"), cam: CAM.fit([(CX(2) + CX(3)) / 2, 1.0, CZ + 0.3], { w: 1.9, a0: 6, a1: 0, elev: 3 }),
        act: (S, u, f) => { for (let i = 1; i < 5; i++) S.actor(GK[i], { x: CX(i), z: CZ + 0.04, mode: "sit", expr: i === 3 ? "laugh" : "smile" });
          S.pop("label", W(3, "tobacco,"), 50, { x: CX(2), y: 1.68, z: CZ + 0.2, w: 0.75, h: 0.2, text: "TOBACCO", bg: "#8fc46a", hold: true });
          S.pop("label", W(3, "gas,"), 30, { x: CX(3), y: 1.68, z: CZ + 0.2, w: 0.75, h: 0.2, text: "GAS", bg: "#8fb8f0", hold: true }); } },
      // 12 · and a whiskey trust: the distillery, smoke rising
      { set: "distillery", word: [3, "whiskey"], lead: 3, trans: "whip", light: "golden", cam: CAM.fit([0.0, 1.9, -2.6], { w: 5.2, a0: -10, a1: 0, e0: 4, e1: 10 }),
        act: (S, u, f) => { H.cows.forEach((c, i) => { c.head.rotation.z = -0.35 + 0.12 * Math.sin(f * 0.35 + i); });
          S.actor("g4", { x: -2.4, z: -1.6, expr: "grin", prop: "point" });
          for (let q = 0; q < 4; q++) S.pop("smoke", S.a + q * 7, 26, { x: 3.4, y: 14.6, z: -9, w: 2.2, h: 2.2, rise: 2, pop: false });
          S.pop("label", W(3, "trust") - 2, 40, { x: 0, y: 3.4, z: -3.0, w: 2.6, h: 0.5, text: "THE WHISKEY TRUST", bg: "#ffd84a", hold: true }); } },
      // 13 · feeding cattle its leftover mash: a cow chomps at the trough
      { set: "distillery", word: [3, "cattle"], lead: 3, light: "golden", cam: CAM.keys([[0, { p: [2.0, 1.6, -3.4], t: [0.5, 0.7, -0.2], fov: 40 }], [1, { p: [1.6, 1.5, -3.0], t: [0.5, 0.7, -0.2], fov: 40 }]]),
        act: (S, u, f) => { H.cows.forEach((c, i) => { c.head.rotation.z = -0.4 + 0.2 * Math.abs(Math.sin(f * 0.45 + i)); });
          for (let q = 0; q < 3; q++) S.pop("burst", W(3, "mash.") - 4 + q * 8, 10, { x: 0.55, y: 0.55, z: -0.45, w: 0.4, h: 0.3, pop: false });
          S.pop("label", W(3, "leftover") - 2, 40, { x: 0.5, y: 1.45, z: -0.2, w: 1.0, h: 0.24, text: "LEFTOVER MASH", bg: "#f4e6c8", hold: true }); } },
      // 14 · the whiskey trust is out: yanked off his chair
      { set: "chairs", beat: 4, trans: "whip", light: K.backdrop("#2a2f5a"), cam: CAM.fit([CX(4), 1.0, CZ + 0.3], { w: 2.4, a0: -6, a1: 4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const t = W(4, "out"); for (let i = 3; i < 6; i++) { const out = i === 4 && f >= t;
            S.actor(GK[i], { x: CX(i), z: CZ + 0.04 + (out ? 0.6 : 0), mode: out ? "fall" : "sit", expr: out ? "dazed" : i === 4 ? "nervous" : "shock" }); }
          S.kick(t, 0.07); S.pop("impact", t, 22, { x: CX(4), y: 1.3, z: CZ + 0.7, w: 1.0, h: 0.7, text: "OUT!" }); S.pop("sweat", S.a + 2, 20, { x: CX(4) + 0.25, y: 1.35, z: CZ + 0.3, w: 0.2, h: 0.25 }); } },
      // 15 · by 1899: his name plate falls, the year stamps in
      { set: "chairs", word: [4, "eighteen"], lead: 3, light: K.backdrop("#2a2f5a"), steady: true, coc: 10, cam: CAM.fit([CX(4), 0.75, -0.2], { w: 1.6, a0: 8, a1: 0, elev: 10, push: 0.1 }),
        act: (S, u, f) => { const t = W(4, "ninety-nine."); H.plate[4].rotation.x = -0.3 - 1.25 * E.easeIn(E.prog(f, S.a, S.a + 10)); H.plate[4].position.y = 0.3 - 0.2 * E.prog(f, S.a, S.a + 10);
          S.actor(GK[4], { x: CX(4), z: CZ + 0.64, mode: "fall", expr: "dazed" }); S.kick(t, 0.05);
          S.pop("label", t - 2, 40, { x: CX(4), y: 1.2, z: -0.3, w: 0.8, h: 0.32, text: "1899", bg: "#ff6a5a", hold: true }); } },
      // 16 · by 2018: flash forward to the modern city
      { set: "city", beat: 5, trans: "flash", light: "night", cam: CAM.fit([0.5, 2.8, -3.0], { w: 7.5, a0: -10, a1: 4, e0: 4, e1: 8 }),
        act: (S, u, f) => { H.screen.draw({ t: 0.6, label: "THE DOW" });
          S.pop("label", W(5, "eighteen,") - 4, 40, { x: 0, y: 4.4, z: -2.8, w: 2.4, h: 0.8, text: "2018", bg: "#ffd84a", hold: true }); } },
      // 17 · the last original: ELECTRIC sits alone among the newcomers
      { set: "chairs", word: [5, "last"], lead: 3, trans: "whip", light: "office", cam: CAM.fit([CX(5), 1.0, CZ + 0.3], { w: 2.6, a0: -8, a1: 2, elev: 4, push: 0.1 }),
        act: (S, u, f) => { S.actor("riseA", { x: CX(4), z: CZ + 0.04, mode: "sit", expr: "smile", key: "r4" }); S.actor("g5", { x: CX(5), z: CZ + 0.04, mode: "sit", expr: "nervous" }); S.actor("riseC", { x: CX(6), z: CZ + 0.04, mode: "sit", expr: "grin", key: "r6" });
          S.fx("bulb", { x: CX(5), y: 1.75, z: CZ + 0.2, w: 0.25, h: 0.35 });
          S.pop("label", W(5, "original") - 2, 40, { x: CX(5), y: 2.12, z: CZ + 0.2, w: 1.2, h: 0.24, text: "LAST ORIGINAL", bg: "#ffd84a", hold: true }); } },
      // 18 · swapped: the pharmacist takes the seat, ELECTRIC walks off
      { set: "chairs", word: [5, "swapped"], lead: 3, light: "office", cam: CAM.fit([CX(5) + 0.3, 1.0, CZ + 0.3], { w: 2.8, a0: 8, a1: 2, elev: 4 }),
        act: (S, u, f) => { const k = E.ss(E.prog(f, S.a, S.a + 14));
          S.actor("g5", { x: CX(5) + 1.1 * k, z: CZ + 0.5, expr: "pained", mode: "stroll", phase: f * 0.05 });
          S.actor("pharm", { x: CX(5), z: CZ + 0.04, mode: k > 0.6 ? "sit" : "stand", expr: "grin", prop: k > 0.6 ? "wave" : null, wave: E.prog(f, S.a + 10, S.a + 30) });
          S.say("My seat now.", S.a + 4, 28, { x: CX(5) - 0.3, y: 1.85, z: CZ + 0.3, w: 0.95, h: 0.34 }); } },
      // 19 · for a drugstore chain: the shopfront in the city
      { set: "city", word: [5, "drugstore"], lead: 3, trans: "whip", light: "night", cam: CAM.fit([2.3, 1.7, -0.3], { w: 3.4, a0: -24, a1: -14, elev: 3, push: 0.1 }),
        act: (S, u, f) => { S.actor("pharm", { x: 1.8, z: 0.2, expr: "smile", prop: "wave", wave: E.prog(f, S.a, S.a + 30) });
          S.pop("label", W(5, "chain.") - 2, 30, { x: 2.4, y: 2.5, z: 0.4, w: 1.4, h: 0.3, text: "NEW SEAT", bg: "#4fd18b", hold: true }); } },
      // 20 · not one of the twelve is left: the originals stand off to the side, the chairs are full of newcomers
      { set: "chairs", beat: 6, trans: "whip", light: K.backdrop("#2a2f5a"), cam: CAM.fit([0, 1.4, 0.2], { w: 5.0, a0: -8, a1: 2, elev: 10 }),
        act: (S, u, f) => { for (let i = 0; i < 12; i++) { H.plate[i].visible = false; S.actor(RISE[i % 3], { x: CX(i), z: CZ + 0.04, mode: "sit", expr: "smile", key: "s" + i }); }
          for (let i = 0; i < 12; i++) S.actor(GK[i], { x: LINE(i), z: 1.2, expr: "pained", key: "l" + i });
          const n = Math.max(0, 12 - Math.floor(13 * E.prog(f, S.a, W(6, "left.") + 4))); S.fx("label", { x: 0, y: 2.35, z: 1.2, w: 1.8, h: 0.4, text: n + " OF 12 LEFT", bg: n === 0 ? "#ff6a5a" : "#f4efe2" }); } },
      // 21 · this year, the Dow: the big screen, the line climbing
      { set: "city", beat: 7, trans: "whip", light: "neon", cam: CAM.fit([0, 2.6, -3.1], { w: 4.6, a0: -6, a1: 4, elev: 2, push: 0.12 }),
        act: (S, u, f) => { const k = E.prog(f, S.a, W(7, "fifty")); H.screen.draw({ t: 0.3 + 0.7 * k, label: "THE DOW" }); } },
      // 22 · crossed fifty thousand: smash, confetti
      { set: "city", word: [7, "fifty"], lead: 3, trans: "smash", light: "neon", cam: CAM.fit([0, 2.6, -3.1], { w: 3.8, a0: 4, a1: 0, elev: 3, push: 0.1 }),
        act: (S, u, f) => { H.screen.draw({ t: 1, label: "50,000", ticker: "DOW 50,000" }); S.kick(W(7, "fifty"), 0.07);
          S.pop("confetti", W(7, "fifty") + 2, 34, { x: 0, y: 4.2, z: -2.8, w: 4, h: 2 }); S.pop("label", W(7, "thousand.") - 2, 30, { x: 0, y: 4.0, z: -2.9, w: 2.6, h: 0.6, text: "50,000", bg: "#ffd84a", hold: true }); } },
      // 23 · how does a list outlive everything on it? Dow back at his board, puzzled
      { set: "newsroom", beat: 8, trans: "whip", light: "lamp", cam: CAM.fit([0.4, 1.4, -2.2], { w: 2.8, a0: -10, a1: -2, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.names.forEach((n, i) => { n.visible = true; H.prices[i].visible = true; }); S.actor("dow", { x: -0.6, z: -2.3, expr: "nervous", prop: "chin" });
          S.pop("question", S.a + 6, 40, { x: -0.3, y: 2.25, z: -2.2, w: 0.35, h: 0.5, hold: true }); S.pop("question", W(8, "outlive") - 2, 30, { x: 0.25, y: 2.4, z: -2.2, w: 0.3, h: 0.42, hold: true }); } },
      // 24 · …everything on it: insert — red lines strike out all twelve names
      { set: "newsroom", word: [8, "everything"], lead: 3, light: "lamp", steady: true, coc: 11, cam: CAM.fit([0.9, 1.7, -2.9], { w: 2.2, a0: 4, a1: -2, elev: 2, push: 0.1 }),
        act: (S, u, f) => { H.names.forEach((n, i) => { n.visible = true; H.prices[i].visible = true; H.cross[i].visible = f >= S.a + i * 2; H.cross[i].scale.x = E.ss(E.prog(f, S.a + i * 2, S.a + i * 2 + 4)) || 0.001; }); S.sfx("speed", S.a); } },
      // 25 · you see — push through into the school football field at sunset
      { set: "field", beat: 9, trans: "zoom", light: "sunset", cam: CAM.fit([0, 1.3, -3.5], { w: 5.0, a0: -12, a1: 4, e0: 4, e1: 10, push: 0.1 }),
        act: (S, u, f) => { H.photo.visible = false; ["kidA", "kidB", "kidC", "kidD"].forEach((k, i) => S.actor(k, { x: -2.4 + i * 1.5 + 0.02 * (f - S.a), z: -3 - (i % 2), expr: "grin", mode: "stroll", phase: f * 0.08 + i }));
          S.pop("label", W(9, "football") - 2, 30, { x: 0, y: 2.4, z: -3.4, w: 2.0, h: 0.4, text: "SCHOOL TEAM", bg: "#ffd84a", hold: true }); } },
      // 26 · football team: the coach and the squad cheer
      { set: "field", word: [9, "football"], lead: 3, light: "sunset", cam: CAM.fit([0.2, 1.1, -1.8], { w: 3.0, a0: 10, a1: 2, elev: 3, push: 0.1 }),
        act: (S, u, f) => { H.photo.visible = false; ["kidA", "kidB", "kidC"].forEach((k, i) => S.actor(k, { x: -0.7 + i * 0.7, z: -1.6 - (i % 2) * 0.3, expr: "laugh", prop: "up" }));
          S.actor("coach", { x: 1.3, z: -1.2, expr: "grin", prop: "fists", flip: true }); S.say("Go team!", S.a + 4, 26, { x: 1.2, y: 2.25, z: -1.1, w: 0.9, h: 0.36 }); } },
      // 27 · every kid in the old photo graduated: the sepia photo empties
      { set: "field", beat: 10, trans: "whip", light: "sunset", cam: CAM.fit([-1.6, 1.2, -3], { w: 3.2, a0: 6, a1: -4, elev: 3, push: 0.1 }),
        act: (S, u, f) => { const t = W(10, "graduated,"); const C = ["kidA", "kidB", "kidC", "kidD"];
          for (let i = 0; i < 4; i++) { const tf = t - 6 + i * 3; if (f < tf) S.actor(C[i], { x: -2.4 + i * 0.55, z: -3.1, expr: "smile_closed", key: "p" + i }); S.pop("puff", tf, 12, { x: -2.4 + i * 0.55, y: 0.8, z: -3.0, w: 0.5, h: 0.5, pop: false }); }
          S.pop("confetti", t, 30, { x: -1.6, y: 2.2, z: -2.8, w: 2.4, h: 1.4 }); S.pop("label", t, 30, { x: -1.6, y: 2.6, z: -2.6, w: 1.6, h: 0.32, text: "GRADUATED", bg: "#ffd84a", hold: true }); } },
      // 28 · the jersey still plays Friday: a new squad charges past the empty frame
      { set: "field", word: [10, "jersey"], lead: 3, trans: "whip", light: "sunset", cam: CAM.fit([0.4, 1.0, -1.2], { w: 4.0, a0: -14, a1: -6, elev: 4 }),
        act: (S, u, f) => { const C = ["kidD", "kidC", "kidB", "kidA"]; for (let i = 0; i < 4; i++) S.actor(C[i], { x: -2.5 + 0.06 * (f - S.a) + i * 0.7, z: -1.0 - (i % 2) * 0.4, expr: "grin", mode: "stroll", phase: f * 0.12 + i, key: "n" + i });
          S.fx("speed", { x: -1.2 + 0.06 * (f - S.a), y: 0.8, z: -1.0, w: 1.0, h: 0.5 }); S.pop("label", W(10, "Friday.") - 2, 30, { x: 0.6, y: 2.2, z: -1.4, w: 1.3, h: 0.3, text: "SAME JERSEY", bg: "#ff6a5a", hold: true }); } },
      // 29 · a fading company gets benched
      { set: "chairs", beat: 11, trans: "whip", light: K.backdrop("#2a2f5a"), cam: CAM.fit([CX(6), 1.0, CZ + 0.3], { w: 2.6, a0: -10, a1: -2, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const t = W(11, "benched;"); S.actor("riseB", { x: CX(5), z: CZ + 0.04, mode: "sit", expr: "smile", key: "b5" });
          S.actor("fader", { x: CX(6) + (f >= t ? 0.7 * E.ss(E.prog(f, t, t + 8)) : 0), z: CZ + 0.04 + (f >= t ? 0.6 : 0), mode: f < t ? "sit" : "fall", expr: f < t ? "pained" : "dazed" });
          S.pop("arrow", W(11, "fading") - 2, 30, { x: CX(6) + 0.35, y: 1.5, z: CZ + 0.3, w: 0.3, h: 0.45, dir: "down", hold: true }); S.kick(t, 0.05); S.pop("impact", t, 20, { x: CX(6) + 0.5, y: 1.1, z: CZ + 0.7, w: 0.9, h: 0.6, text: "BENCHED" }); } },
      // 30 · a rising one takes its seat
      { set: "chairs", word: [11, "rising"], lead: 3, light: K.backdrop("#2a2f5a"), cam: CAM.fit([CX(6), 1.0, CZ + 0.3], { w: 2.4, a0: 6, a1: 0, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const t = W(11, "seat."); S.actor("riseB", { x: CX(5), z: CZ + 0.04, mode: "sit", expr: "smile", key: "b5" });
          S.actor("riseC", { x: CX(6) + (f < t ? 0.9 * (1 - E.ss(E.prog(f, S.a, t))) : 0), z: CZ + 0.04 + (f < t ? 0.3 : 0), mode: f < t ? "stand" : "sit", expr: "grin", prop: f < t ? "up" : null });
          S.pop("arrow", S.a + 2, 30, { x: CX(6) - 0.4, y: 1.6, z: CZ + 0.3, w: 0.3, h: 0.45, dir: "up", hold: true }); S.pop("sparks", t, 20, { x: CX(6), y: 1.2, z: CZ + 0.3, w: 0.8, h: 0.6 }); } },
      // 31 · twist: all twelve giants got cut — the line-up, music stops, slow push with a roll
      { set: "chairs", beat: 12, trans: "whip", light: "danger", cam: CAM.fit([0, 1.15, 1.2], { w: 3.0, a0: -4, a1: 2, elev: 3, push: 0.2, roll: 3 }),
        act: (S, u, f) => { const t = W(12, "cut."); for (let i = 0; i < 12; i++) S.actor(GK[i], { x: LINE(i), z: 1.2, expr: f < t ? "nervous" : "dazed", key: "l" + i });
          S.kick(t, 0.06); S.pop("impact", t, 30, { x: 0, y: 2.2, z: 1.4, w: 1.6, h: 0.9, text: "CUT!" }); } },
      // 32 · finale: the chairs never lost a game — a gold trophy slams down in front of the full row
      { set: "chairs", beat: 13, trans: "whip", light: K.backdrop("#2a2f5a"), cam: CAM.fit([0, 1.0, CZ + 0.5], { w: 3.3, a0: 6, a1: -2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { const t = W(13, "game."); for (let i = 3; i < 9; i++) { H.plate[i].visible = false; S.actor(RISE[i % 3], { x: CX(i), z: CZ + 0.04, mode: "sit", expr: f < t ? "smile" : "laugh", prop: f >= t ? "up" : null, key: "s" + i }); }
          H.trophy.visible = true; H.trophy.position.y = 0.0 + 3.6 * (1 - E.easeIn(E.prog(f, t - 10, t))); H.trophy.scale.setScalar(f >= t && f < t + 5 ? 1.1 : 1);
          S.kick(t, 0.12); S.pop("impact", t, 30, { x: 0, y: 1.5, z: 0.1, w: 1.4, h: 0.9, text: "WIN!" }); S.pop("confetti", t + 2, 30, { x: 0, y: 2.6, z: CZ, w: 4, h: 1.6 });
          S.pop("label", W(13, "chairs") - 2, 40, { x: 0, y: 2.0, z: CZ + 0.3, w: 1.8, h: 0.34, text: "THE CHAIRS", bg: "#ffd84a", hold: true }); } },
    ],
  };
};
