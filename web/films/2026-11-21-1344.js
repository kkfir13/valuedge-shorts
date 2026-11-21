// "The Company That Bought Itself With Paper" (John Law's Mississippi Company, Paris 1719-1720) — film module.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const AH = 1.58;
  const H = {};
  const tx = (B, s, bg, fg, w = 1024, h = 256) => B.textTex(s, bg, fg, w, h);
  // crowd of 1719 share buyers on the street (positions; ids cycle through the buyer costumes)
  const CROWD = [[-1.6, -1.2], [1.5, -0.8], [-0.7, -2.6], [0.9, -3.0], [-1.9, -4.2], [1.8, -4.6], [0.0, -5.4], [-1.0, -6.6], [1.2, -7.0], [-2.0, 0.6], [2.0, 0.9]];
  const BUY = ["b1", "b2", "b3", "b4", "coach"];
  const crowd = (S, f, n = CROWD.length, rush = 0) => CROWD.slice(0, n).forEach(([x, z], i) => S.actor(BUY[i % BUY.length], {
    key: "c" + i, x: x + 0.05 * Math.sin(f * 0.1 + i), z: z + rush, expr: ["grin", "laugh", "smile", "shock", "grin"][i % 5], prop: i % 3 === 0 ? "up" : i % 3 === 1 ? "paper" : "hold",
    mode: rush ? "stroll" : "stand", phase: f * 0.06 + i, look: 0.2 * Math.sin(i) }));
  // which price shows on the board: "500" | "10000" | "9000" | "1000"
  const board = (v) => { for (const k of ["500", "10000", "9000", "1000"]) H.price[k].visible = k === v; };

  return {
    cast: {
      margot: { jacket: "#f4efe2", pants: "#3a3a4a", boots: "#3a2418", hat: "bonnet", dress: "#3f5f8a", skin: "#f5c9a0", buttons: "#c0353a" },
      margotRich: { jacket: "#c0353a", pants: "#3a3a4a", boots: "#3a2418", hat: "wig", hair: "#f4f0e8", dress: "#e8b84a", skin: "#f5c9a0", buttons: "#f2c14e", pins: "#f2c14e" },
      law: { jacket: "#8a2a3a", pants: "#2a2230", boots: "#1a1418", hat: "wig", hair: "#6a4a30", skin: "#f3cfae", buttons: "#e8c44a" },
      b1: { jacket: "#2f5a8a", pants: "#d8c8a0", boots: "#2a1a14", hat: "tricorn", skin: "#f0c8a0", buttons: "#e8c44a" },
      b2: { jacket: "#6a8a3a", pants: "#3a2a20", boots: "#2a1a14", hat: "hair", hair: "#3a2418", dress: "#c25a7a", skin: "#e8b48a" },
      b3: { jacket: "#7a4a8a", pants: "#d8c8a0", boots: "#2a1a14", hat: "wig", hair: "#d8d4cc", skin: "#f3cfae", buttons: "#e8c44a" },
      b4: { jacket: "#c8783a", pants: "#3a3a44", boots: "#2a1a14", hat: "tricorn", capColor: "#3a2418", skin: "#c99067", moustache: "#2a1a14" },
      coach: { jacket: "#2f6a4a", pants: "#d8c8a0", boots: "#1a1418", hat: "tricorn", skin: "#f5c9a0", buttons: "#f2c14e" },
    },
    sets: {
      // rue Quincampoix, 1719: a narrow cobbled lane of tall plaster houses, the share office at the end with its price board and balcony
      quinc: (B) => {
        B.ground("cobble", 200, 200);
        const cols = ["#f0e6d0", "#e8d0b0", "#d8c8b8", "#e8d8a0", "#d8b8a8"];
        for (const sd of [-1, 1]) for (let i = 0; i < 6; i++) B.facade({ style: i % 2 ? "village" : "victorian", w: 4.4, x: sd * 3.4, z: 10 - i * 4.5 - 2.2, ry: sd < 0 ? Math.PI / 2 : -Math.PI / 2, seed: 11 + i * 5 + (sd > 0 ? 50 : 0), col: cols[(i + (sd > 0 ? 2 : 0)) % 5], h: 7.5 });
        B.facade({ style: "village", w: 7.4, x: 0, z: -14, seed: 4, col: "#e8dcc4", h: 8 });
        B.plate(5.2, 0.7, tx(B, "MISSISSIPPI CO. · ACTIONS", "#2a1a2a", "#f2c14e", 1024, 138), 0, 7.1, -13.92, { d: 0.06, edge: "#c9a44a" });
        B.plate(3.2, 0.55, tx(B, "RUE QUINCAMPOIX", "#f4efe2", "#2a3a5a", 1024, 176), -3.33, 3.4, -2.0, { d: 0.04, edge: "#2a3a5a", ry: Math.PI / 2 });
        // price board above the door
        B.plate(3.4, 1.55, "#1f2a24", 0, 5.15, -13.9, { d: 0.08, edge: "#c9a44a" });
        B.plate(2.4, 0.3, tx(B, "PRICE PER SHARE · LIVRES", "#1f2a24", "#f4efe2", 1024, 128), 0, 5.72, -13.82, { d: 0.01 });
        H.price = {};
        for (const [k, s, c] of [["500", "500", "#f4efe2"], ["10000", "10 000", "#7ef0a0"], ["9000", "9 000", "#ffd84a"], ["1000", "1 000", "#ff6a5a"]]) {
          H.price[k] = B.dyn(B.plate(3.0, 0.95, tx(B, s, "#1f2a24", c, 1024, 324), 0, 4.95, -13.8, { d: 0.01 })); H.price[k].visible = k === "500"; }
        H.lock = B.dyn(B.grp(1.4, 4.5, -13.7, 0, 1)); B.box(0.36, 0.3, 0.12, "metal:#c9a44a", 0, 0, 0, { in: H.lock }); B.cyl(0.11, 0.11, 0.06, "metal:#a8a8b0", 0, 0.28, 0, { in: H.lock, rx: Math.PI / 2 }); H.lock.visible = false;
        // Law's balcony
        B.box(3.0, 0.14, 1.0, "#5a3a24", 0, 2.55, -13.5); for (let k = 0; k < 9; k++) B.box(0.05, 0.6, 0.05, "#3a2418", -1.4 + k * 0.35, 2.69, -13.05);
        B.box(3.0, 0.06, 0.06, "#3a2418", 0, 3.28, -13.05);
        for (const [x, z] of [[-2.6, -5], [2.6, -9], [-2.6, 4]]) B.prop.lampPost({ x, z });
        B.prop.barrel({ x: 2.6, z: 1.8 }); B.prop.crate({ x: -2.6, z: -8.5, size: 0.7, label: "ACTIONS" });
        H.carriage = B.dyn(B.grp(0, 0, 30, 0, 1)); B.box(1.4, 1.2, 2.0, "#2a1a2a", 0, 0.6, 0, { in: H.carriage }); for (const sx of [-0.75, 0.75]) for (const sz of [-0.7, 0.7]) B.cyl(0.42, 0.42, 0.08, "#c9a44a", sx, 0.42, sz, { in: H.carriage, rz: Math.PI / 2, seg: 18 });
      },
      // Louisiana as Paris imagined it: a dream shore with a glowing mine of gold
      louis: (B) => {
        B.set.landscape({ kind: "forest", seed: 6, hills: true });
        for (const [x, z] of [[-4, -6], [4.5, -7], [-6.5, -11], [6, -12]]) B.prop.tree({ x, z, kind: "palm" });
        B.prop.rock({ x: -1.6, z: -4.4, s: 2.0 }); B.prop.rock({ x: 1.7, z: -4.5, s: 1.8 }); B.box(3.4, 0.5, 1.2, "#6a5a4a", 0, 2.1, -4.6);
        B.box(1.8, 1.9, 0.2, "#1a1414", 0, 0.1, -4.3);
        H.gold = B.dyn(B.grp(0, 0, -1.8, 0, 1)); B.prop.goldBars({ in: H.gold, x: -0.45, y: 0, z: 0, n: 6 }); B.prop.goldBars({ in: H.gold, x: 0.45, y: 0, z: 0.1, n: 6 }); B.prop.coinStack({ in: H.gold, x: 0, y: 0, z: 0.6, r: 0.22, n: 7 });
        B.prop.sign({ x: 2.3, z: -1.4, w: 1.8, h: 0.6, text: "LOUISIANE", post: true, bg: "#f4efe2", fg: "#2a3a5a", edge: "#5a3a24" });
        B.lamp(0, 1.2, -1.6, "#ffd84a", 6, 6);
      },
      // a maid's attic: sloping plaster, a narrow bed, the broom, a share certificate pinned to the wall
      attic: (B) => {
        B.set.room({ style: "home", wall: "plaster:#d8c8a8", floor: "planks:#8a6a4a", w: 7, d: 6, h: 3.0, windows: [1.6], door: false });
        B.box(1.0, 0.45, 2.0, "#f4efe2", -2.3, 0, -1.8); B.box(1.0, 0.12, 2.0, "#7a2a2a", -2.3, 0.45, -1.8);
        B.plate(0.8, 0.55, tx(B, "1 ACTION", "#f4e6c8", "#5a2a1a", 512, 352), -0.6, 1.7, -2.97, { d: 0.02, edge: "#c9a44a" });
        B.prop.lamp({ kind: "hang", x: 0, y: 3.0, z: -1.0, glow: "#ffe6b0" });
        H.bag = B.prop.moneyBag({ x: 0.9, z: -1.6, size: 0.6 }); H.bag.visible = false;
      },
      // the board game: a giant board on a purple stage, two dice, the banker's money printer
      game: (B) => {
        B.set.stage({ floor: "#e8dcc8", back: "#4a2a7a" });
        B.box(5.4, 0.1, 4.2, "tiles:#f4efe2:#2f8a6a", 0, 0, -1.4);
        B.plate(2.4, 0.5, tx(B, "BANK", "#2f8a6a", "#f4efe2", 1024, 214), 1.6, 1.6, -2.6, { d: 0.05, edge: "#f4efe2" });
        H.printer = B.dyn(B.grp(1.6, 0.1, -2.4, 0, 1)); B.box(1.1, 0.8, 0.7, "metal:#5a5a6a", 0, 0, 0, { in: H.printer }); B.box(0.8, 0.06, 0.2, "#1a1a20", 0, 0.62, 0.36, { in: H.printer });
        H.dice = [B.dyn(B.grp(-1.2, 0.1, -0.6, 0, 1)), B.dyn(B.grp(-0.4, 0.1, -0.2, 0, 1))];
        for (const d of H.dice) { B.box(0.45, 0.45, 0.45, "#f4f6fa", 0, 0, 0, { in: d }); for (const [a, b] of [[-0.1, 0.1], [0.1, 0.3], [0, 0.2]]) B.ball(0.04, "#241726", a, b + 0.03, 0.226, { in: d }); }
        H.stack = B.dyn(B.grp(0.6, 0.1, -1.6, 0, 1)); for (let k = 0; k < 10; k++) B.box(0.5, 0.05, 0.25, k % 2 ? "#7fb86a" : "#9ad08a", 0, k * 0.05, 0, { in: H.stack });
      },
      // the Banque Royale: panelled walls, the printing press, a counter where shares are swapped for notes
      bank: (B) => {
        B.set.room({ style: "bank", wall: "panel:#5a2a3a", floor: "marble", w: 9, d: 7, h: 3.8, windows: [-3.2], door: false });
        B.plate(3.0, 0.5, tx(B, "BANQUE ROYALE", "#2a1a2a", "#f2c14e", 1024, 170), 0, 3.25, -3.44, { d: 0.05, edge: "#c9a44a" });
        // printing press (x -1.6)
        for (const sx of [-0.6, 0.6]) B.box(0.16, 2.4, 0.16, "planks:#6a4a2a", -1.6 + sx, 0, -2.2);
        B.box(1.4, 0.22, 0.4, "planks:#6a4a2a", -1.6, 2.4, -2.2); B.box(1.3, 0.5, 0.9, "planks:#7a5a3a", -1.6, 0, -2.2); B.box(1.2, 0.08, 0.8, "#2a2230", -1.6, 0.85, -2.2);
        H.platen = B.dyn(B.box(1.0, 0.16, 0.6, "metal:#8a8a96", -1.6, 1.6, -2.2)); H.screw = B.dyn(B.cyl(0.06, 0.06, 0.8, "metal:#c9a44a", -1.6, 1.76, -2.2));
        H.pile = B.dyn(B.grp(-0.4, 0.5, -2.0, 0, 1)); for (let k = 0; k < 16; k++) B.box(0.55, 0.06, 0.3, k % 2 ? "#e8dcc0" : "#f4ead4", ((k * 37) % 5 - 2) * 0.02, k * 0.06, 0, { in: H.pile, ry: (k % 3) * 0.08 }); B.box(0.7, 0.5, 0.5, "planks:#7a5a3a", -0.4, 0, -2.0);
        B.prop.counter({ x: 1.6, z: -0.9, w: 2.6, h: 1.05, col: "panel:#7a3a4a", top: "marble" });
        H.crate = B.prop.crate({ x: 2.9, z: -2.4, size: 0.8, label: "ACTIONS" });
        B.prop.lamp({ kind: "hang", x: 0, y: 3.8, z: -1.2, glow: "#ffe6b0" }); B.prop.rug({ x: 0, z: 0, w: 4, d: 2.4, col: "#7a2a2a" });
        // the banknote that tears in half
        H.nL = B.dyn(B.grp(1.3, 1.45, -0.7, 0, 1)); B.plate(0.5, 0.42, tx(B, "100", "#f4ead4", "#5a2a3a", 512, 430), 0, 0, 0, { in: H.nL, d: 0.01, edge: "#8a6a4a" });
        H.nR = B.dyn(B.grp(1.8, 1.45, -0.7, 0, 1)); B.plate(0.5, 0.42, tx(B, "LIVRES", "#f4ead4", "#5a2a3a", 512, 430), 0, 0, 0, { in: H.nR, d: 0.01, edge: "#8a6a4a" });
        H.nL.visible = H.nR.visible = false;
      },
      // finale stage: the company standing on a tower of its own banknotes, fed by its own press
      tower: (B) => {
        B.set.stage({ floor: "#d8ccb8", back: "#2a1a3a" });
        B.box(1.2, 0.7, 0.8, "planks:#6a4a2a", -1.6, 0, -1.6); B.box(1.0, 0.1, 0.6, "metal:#8a8a96", -1.6, 0.9, -1.6); for (const sx of [-0.5, 0.5]) B.box(0.1, 1.2, 0.1, "planks:#6a4a2a", -1.6 + sx, 0, -1.6);
        H.bricks = [];
        for (let k = 0; k < 14; k++) H.bricks.push(B.dyn(B.box(0.9, 0.22, 0.5, k % 2 ? "#e8dcc0" : "#f4ead4", 0.4, k * 0.24, -1.6, { ry: (k % 3 - 1) * 0.06 })));
        H.co = B.dyn(B.grp(0.4, 14 * 0.24, -1.6, 0, 1)); B.box(0.9, 0.7, 0.7, "plaster:#e8dcc4", 0, 0, 0, { in: H.co }); B.cone(0.62, 0.45, "#7a3a3a", 0, 0.7, 0, { in: H.co, seg: 4 });
        B.plate(0.8, 0.22, tx(B, "MISSISSIPPI CO.", "#2a1a2a", "#f2c14e", 1024, 280), 0, 0.42, 0.36, { in: H.co, d: 0.01 });
        B.lamp(0, 6, 2, "#fff2c8", 7, 14);
      },
    },
    shots: [
      // 0 · frame 0: a stampede of share buyers rushes down the lane toward the camera
      { set: "quinc", f: 0, light: "golden", cam: CAM.move({ p: [0, 1.6, 7.5], t: [0, 2.2, -8] }, { p: [0, 1.9, 4.2], t: [0, 2.6, -12] }),
        act: (S, u, f) => { board("500"); crowd(S, f, 11, 0.06 * f - 3);
          for (let q = 0; q < 4; q++) S.pop("paper", 2 + q * 9, 26, { x: -1.2 + q * 0.8, y: 2.4, z: -1 + 0.06 * f, w: 0.3, h: 0.22, rise: 0.8, spin: 2, pop: q === 0 });
          S.pop("label", W(0, "Paris") - 4, 60, { x: 0, y: 3.6, z: -2, w: 1.7, h: 0.38, text: "PARIS · 1719", col: "#2a3a5a", hold: true }); } },
      // 1 · a colony nobody had seen: whip into the misty dream of Louisiana, a big question mark
      { set: "louis", word: [0, "colony"], lead: 3, trans: "whip", light: K.light("dream", { sat: 0.8 }), cam: CAM.fit([0, 1.5, -2.6], { w: 4.6, a0: -10, a1: 6, elev: 6, push: 0.14 }),
        act: (S, u, f) => { H.gold.visible = false; S.pop("question", W(0, "nobody") - 2, 50, { x: 0, y: 2.4, z: -2.0, w: 0.7, h: 0.9, hold: true }); } },
      // 2 · imagine you're on the rue Quincampoix: Margot (you) squeezes through the crowd
      { set: "quinc", beat: 1, trans: "dissolve", light: "golden", cam: CAM.fit([0.2, 1.4, -0.4], { w: 3.0, a0: -14, a1: 4, elev: 4, push: 0.12 }),
        act: (S, u, f) => { board("500"); crowd(S, f, 9); S.actor("margot", { x: 0.3, z: 0.2, expr: "nervous", mode: "stroll", phase: f * 0.05, look: -0.3 });
          S.pop("label", W(1, "you're") - 2, 70, { x: 0.3, y: AH + 0.55, z: 0.4, w: 1.2, h: 0.32, text: "MARGOT (YOU)", col: "#3f5f8a", hold: true }); } },
      // 3 · jammed with buyers: crane up over the packed lane
      { set: "quinc", word: [1, "jammed"], lead: 3, trans: "cut", light: "golden", cam: CAM.move({ p: [0.6, 3.2, 5.5], t: [0, 1.0, -3] }, { p: [0.4, 5.6, 6.0], t: [0, 0.6, -4] }),
        act: (S, u, f) => { board("500"); crowd(S, f, 11); S.actor("margot", { x: 0.3, z: 0.2, expr: "shock", prop: "up" });
          S.pop("sweat", S.a + 4, 30, { x: 0.55, y: AH + 0.3, z: 0.3, w: 0.3, h: 0.3, pop: false }); S.pop("impact", W(1, "buyers.") - 2, 24, { x: 0, y: 2.6, z: -1, w: 1.6, h: 0.6, text: "SQUEEZE!" }); } },
      // 4 · John Law's Mississippi Company: Law on the balcony of the share office
      { set: "quinc", beat: 2, trans: "whip", light: "golden", cam: CAM.fit([0, 3.6, -13.3], { w: 3.6, a0: -12, a1: 4, e0: -12, e1: -6, push: 0.14 }),
        act: (S, u, f) => { board("500"); S.actor("law", { x: 0, y: 2.62, z: -13.4, expr: "grin", prop: "wave", wave: (f % 20) / 20 });
          S.pop("label", W(2, "John") - 2, 50, { x: -1.2, y: 5.2, z: -13.3, w: 1.2, h: 0.32, text: "JOHN LAW", col: "#8a2a3a", hold: true });
          S.say("Shares! Shares!", W(2, "Company") - 4, 30, { x: 0.9, y: 4.9, z: -13.2, w: 1.3, h: 0.45 }); } },
      // 5 · five hundred livres: the price board
      { set: "quinc", word: [2, "five"], lead: 3, trans: "cut", light: K.light("golden", { sat: 1.2 }), steady: true, cam: CAM.fit([0, 5.1, -13.9], { w: 3.8, a0: 6, a1: 0, elev: -4, push: 0.1 }), coc: 10,
        act: (S, u, f) => { board("500"); S.pop("coin", W(2, "livres.") - 2, 24, { x: 1.4, y: 5.4, z: -13.6, w: 0.3, h: 0.3, rise: 0.4 }); } },
      // 6 · rumor says Louisiana is full of gold: the dream mine blazes
      { set: "louis", beat: 3, trans: "whip", dir: -1, light: "dream", cam: CAM.fit([0, 0.9, -2.0], { w: 2.8, a0: 12, a1: 0, elev: 16, push: 0.14 }),
        act: (S, u, f) => { const k = E.back(E.prog(f, W(3, "gold.") - 6, W(3, "gold.") + 4)); H.gold.visible = true; H.gold.scale.setScalar(Math.max(0.5, 1.15 * k));
          S.pop("sparks", W(3, "gold."), 16, { x: 0, y: 0.9, z: -1.3, w: 2.2, h: 1.8 });
          S.pop("label", S.a + 2, 50, { x: -0.7, y: 2.0, z: -1.8, w: 1.1, h: 0.32, text: "RUMOR", col: "#8a2a3a", hold: true }); } },
      // 7 · within a year (flash, time jump): the street, the crowd looks up at the board
      { set: "quinc", beat: 4, trans: "flash", light: "golden", cam: CAM.fit([0, 3.2, -10], { w: 6.0, a0: 8, a1: -2, e0: 6, e1: 0, push: 0.12 }),
        act: (S, u, f) => { board("500"); crowd(S, f, 9); S.pop("label", S.a + 2, 50, { x: -1.2, y: 6.4, z: -12.5, w: 1.6, h: 0.4, text: "1 YEAR LATER", col: "#2a3a5a", hold: true }); } },
      // 8 · ten thousand: smash, the board flips, the crowd erupts
      { set: "quinc", word: [4, "ten"], lead: 2, trans: "smash", light: K.light("golden", { sat: 1.25 }), cam: CAM.fit([0, 4.9, -13.8], { w: 4.0, a0: -6, a1: 4, elev: -6, push: 0.12 }),
        act: (S, u, f) => { board("10000"); S.pop("confetti", S.a, 30, { x: 0, y: 5.8, z: -13, w: 4, h: 2.4, pop: false }); S.kick(S.a + 1, 0.08);
          S.pop("word", W(4, "thousand.") - 2, 26, { x: 1.3, y: 6.15, z: -13.4, w: 1.0, h: 0.6, text: "x20!", col: "#2a8a4a" }); } },
      // 9 · even maids get rich: whip to Margot's attic, bills rain on her broom
      { set: "attic", beat: 5, trans: "whip", light: "interior", cam: CAM.fit([0.2, 1.3, -1.6], { w: 2.4, a0: -16, a1: -6, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("margot", { x: 0.2, z: -1.6, expr: f < W(5, "rich.") ? "shock" : "laugh", prop: ["broom", 0.5 + 0.3 * Math.sin(f * 0.3)] });
          for (let q = 0; q < 6; q++) S.pop("bill", S.a + q * 4, 30, { x: -0.8 + q * 0.35, y: 2.7, z: -1.3, w: 0.28, h: 0.15, rise: -1.4, spin: 1.5, pop: q === 0 }); } },
      // 10 · Paris calls them millionaires: Margot in a wig and gold dress, money bag
      { set: "attic", word: [5, "Paris"], lead: 2, trans: "cut", light: K.light("interior", { sat: 1.2 }), cam: CAM.fit([0.4, 1.35, -1.6], { w: 2.2, a0: 10, a1: 2, elev: 4, push: 0.14 }),
        act: (S, u, f) => { H.bag.visible = true; S.actor("margotRich", { x: 0.1, z: -1.7, expr: "grin", prop: "up" }); S.fx("glow", { x: 0.1, y: 1.2, z: -1.8, w: 1.6, h: 2.0 });
          S.pop("word", W(5, "millionaires.") - 2, 30, { x: 0.4, y: 2.45, z: -1.4, w: 2.0, h: 0.5, text: "MILLIONAIRE!", col: "#e8b84a", hold: true }); S.pop("stars", W(5, "millionaires."), 18, { x: 0.1, y: 2.0, z: -1.5, w: 1.0, h: 1.0 }); } },
      // 11 · so where's all that money coming from? the lane at dusk, Margot puzzled
      { set: "quinc", beat: 6, trans: "dissolve", light: K.light("lamp", { hemi: 1.6 }), cam: CAM.fit([0.2, 1.4, 0.0], { w: 2.0, a0: 12, a1: 2, elev: 2, push: 0.14 }),
        act: (S, u, f) => { board("10000"); S.actor("margotRich", { x: 0.2, z: 0.0, expr: "nervous", prop: "chin" });
          S.pop("question", W(6, "money") - 3, 40, { x: 0.65, y: AH + 0.5, z: 0.2, w: 0.3, h: 0.42, hold: true }); S.pop("question", W(6, "from?") - 2, 20, { x: -0.3, y: AH + 0.45, z: 0.2, w: 0.26, h: 0.38 }); } },
      // 12 · you see, picture a board game: push through into the giant board, dice tumble
      { set: "game", beat: 7, trans: "zoom", light: K.backdrop("#4a2a7a"), cam: CAM.fit([0, 1.1, -1.4], { w: 4.6, a0: -18, a1: 0, e0: 18, e1: 10, push: 0.12 }),
        act: (S, u, f) => { H.dice.forEach((d, i) => { const k = E.prog(f, S.a + i * 4, S.a + 22 + i * 4); d.position.y = 0.1 + 1.2 * Math.abs(Math.sin(k * Math.PI * 2)) * (1 - k); d.rotation.set(k * 6, k * 4 + i, 0); });
          S.actor("margot", { x: -1.6, z: -2.0, expr: "grin", prop: "hold" }); S.actor("law", { x: 2.4, z: -2.2, expr: "smile", look: -0.4 }); } },
      // 13 · where the banker prints cash: the printer spits bills
      { set: "game", word: [7, "banker"], lead: 3, trans: "cut", light: K.backdrop("#5a3a8a"), cam: CAM.fit([1.9, 1.3, -2.3], { w: 2.4, a0: 14, a1: 4, elev: 4, push: 0.12 }),
        act: (S, u, f) => { S.actor("law", { x: 2.4, z: -2.2, expr: "laugh", prop: "point", look: -0.5 }); H.printer.position.y = 0.1 + 0.03 * Math.abs(Math.sin(f * 0.9));
          for (let q = 0; q < 7; q++) S.pop("bill", W(7, "prints") + q * 4, 26, { x: 1.6, y: 1.1, z: -1.9, w: 0.3, h: 0.16, rise: 1.0 + 0.1 * q, spin: 2, pop: q === 0 });
          S.pop("label", W(7, "banker") , 40, { x: 2.4, y: AH + 0.55, z: -2.0, w: 0.9, h: 0.3, text: "BANKER", col: "#2f8a6a" }); } },
      // 14 · whenever you run short: Margot turns out empty pockets, the banker slides a fresh stack
      { set: "game", word: [7, "short."], lead: 6, trans: "cut", light: K.backdrop("#4a2a7a"), cam: CAM.fit([-0.25, 1.3, -2.0], { w: 3.7, a0: -8, a1: -2, elev: 4, push: 0.1 }),
        act: (S, u, f) => { S.actor("margot", { x: -1.4, z: -2.0, expr: "nervous", prop: "shrug" }); S.actor("law", { x: 0.9, z: -2.2, expr: "grin", prop: "hold", look: -0.6 });
          H.stack.position.x = 0.6 - 1.2 * E.ss(E.prog(f, S.a + 4, S.a + 14)); S.say("More cash!", S.a + 2, 22, { x: 0.45, y: AH + 0.65, z: -2.0, w: 0.9, h: 0.42 }); } },
      // 15 · that's Law: whip into the Banque Royale, Law at his press
      { set: "bank", beat: 8, trans: "whip", light: "interior", cam: CAM.fit([-1.2, 1.6, -2.0], { w: 3.0, a0: -14, a1: -2, elev: 4, push: 0.14 }),
        act: (S, u, f) => { const k = 0.5 + 0.5 * Math.sin(f * 0.45); H.platen.position.y = 1.0 + 0.6 * k; H.screw.position.y = 1.16 + 0.6 * k; H.screw.rotation.y = f * 0.3;
          S.actor("law", { x: -0.3, z: -1.5, expr: "grin", prop: "point", look: -0.5 });
          S.pop("label", W(8, "royal") - 2, 50, { x: -1.6, y: 2.9, z: -2.4, w: 1.6, h: 0.34, text: "HE RUNS THE BANK", col: "#8a2a3a", hold: true }); } },
      // 16 · whose notes buy the shares: notes fly from the press into the ACTIONS crate
      { set: "bank", word: [8, "notes"], lead: 3, trans: "cut", light: K.light("interior", { sat: 1.15 }), cam: CAM.fit([0.8, 1.3, -2.0], { w: 4.2, a0: 8, a1: -2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { const k = 0.5 + 0.5 * Math.sin(f * 0.45); H.platen.position.y = 1.0 + 0.6 * k;
          for (let q = 0; q < 6; q++) { const t0 = S.a + q * 6, p = E.prog(f, t0, t0 + 16); if (f >= t0 && p < 1) S.fx("bill", { x: -0.4 + 3.3 * p, y: 1.3 + 0.9 * Math.sin(p * Math.PI), z: -2.0, w: 0.45, h: 0.24 }); }
          S.pop("arrow", W(8, "shares.") - 2, 26, { x: 2.9, y: 1.8, z: -2.0, w: 0.4, h: 0.6, dir: "down" }); S.pop("label", W(8, "buy") - 2, 40, { x: 1.2, y: 2.7, z: -2.2, w: 1.7, h: 0.34, text: "NOTES → SHARES", col: "#2a3a5a" }); } },
      // 17 · March 1720: back on the lane, the board still at 10 000
      { set: "quinc", beat: 9, trans: "whip", light: "cold", cam: CAM.fit([0, 3.6, -12.5], { w: 4.6, a0: 10, a1: 0, e0: 0, e1: -4, push: 0.12 }),
        act: (S, u, f) => { board("10000"); S.actor("law", { x: 0, y: 2.62, z: -13.4, expr: "stern", prop: "point" });
          S.pop("label", W(9, "March") - 2, 50, { x: -1.2, y: 6.35, z: -13.2, w: 1.5, h: 0.38, text: "MARCH 1720", col: "#2a3a5a", hold: true }); } },
      // 18 · he fixes the price at nine thousand: smash, padlock clamps on the board
      { set: "quinc", word: [9, "fixes"], lead: 2, trans: "smash", light: K.light("cold", { sat: 1.1 }), steady: true, cam: CAM.fit([0.3, 4.8, -13.8], { w: 3.8, a0: -4, a1: 2, elev: -4, push: 0.1 }), coc: 10,
        act: (S, u, f) => { const n = W(9, "nine"); board(f < n ? "10000" : "9000"); H.lock.visible = f >= n; H.lock.position.y = 4.5 + 0.8 * (1 - E.easeIn(E.prog(f, n, n + 5)));
          S.kick(n + 5, 0.07); S.pop("impact", n + 5, 26, { x: 1.4, y: 4.0, z: -13.4, w: 1.0, h: 0.5, text: "FIXED!" }); } },
      // 19 · and buys back shares with fresh notes: at the bank counter, a certificate in, a stack of notes out
      { set: "bank", word: [9, "buys"], lead: 3, trans: "whip", light: "interior", cam: CAM.fit([1.6, 1.45, -1.1], { w: 2.6, a0: 14, a1: 4, elev: 4, push: 0.12 }),
        act: (S, u, f) => { S.actor("law", { x: 1.2, z: -1.7, expr: "grin", prop: "hold" }); S.actor("b1", { x: 2.3, z: -0.2, expr: "smile", prop: "paper", look: -0.6 });
          S.say("Fresh notes!", W(9, "fresh") - 6, 26, { x: 1.0, y: AH + 0.7, z: -1.6, w: 1.0, h: 0.42 });
          for (let q = 0; q < 4; q++) S.pop("bill", W(9, "fresh") + q * 3, 22, { x: 1.7, y: 1.3, z: -0.8, w: 0.3, h: 0.16, rise: 0.6, spin: 1, pop: q === 0 }); } },
      // 20 · so everyone sells: a queue of sellers at the counter waving certificates
      { set: "bank", beat: 10, trans: "whip", dir: -1, light: "interior", cam: CAM.fit([1.9, 1.3, -0.4], { w: 3.9, a0: -16, a1: -6, elev: 6, push: 0.1 }),
        act: (S, u, f) => { S.actor("law", { x: 1.2, z: -1.7, expr: "nervous", prop: "hold" });
          ["b2", "b3", "b4", "coach", "margotRich"].forEach((id, i) => { const t0 = S.a + i * 4; if (f >= t0) S.actor(id, { key: "s" + i, x: 1.1 + i * 0.6, z: -0.1 + i * 0.3, expr: i % 2 ? "grin" : "shock", prop: "paper", mode: f < t0 + 10 ? "stroll" : "stand", phase: f * 0.06 }); });
          S.pop("label", W(10, "sells,") - 3, 30, { x: 2.4, y: 2.6, z: 0.0, w: 1.0, h: 0.32, text: "SELL!", col: "#c0353a" }); } },
      // 21 · and the paper multiplies: the press pounds, the pile shoots up
      { set: "bank", word: [10, "paper"], lead: 3, trans: "cut", light: K.light("interior", { sat: 1.2 }), cam: CAM.fit([-1.0, 1.4, -2.1], { w: 2.6, a0: -8, a1: 4, elev: 4, push: 0.16 }),
        act: (S, u, f) => { const k = 0.5 + 0.5 * Math.sin(f * 0.9); H.platen.position.y = 1.0 + 0.6 * k; H.screw.position.y = 1.16 + 0.6 * k; H.screw.rotation.y = f * 0.6;
          H.pile.scale.y = 1 + 2.2 * E.ss(E.prog(f, S.a, S.a + 36)); for (let q = 0; q < 3; q++) S.kick(S.a + 6 + q * 7, 0.02);
          S.pop("word", W(10, "multiplies.") , 26, { x: -0.6, y: 2.7, z: -1.8, w: 1.2, h: 0.5, text: "PRINT!", col: "#c0353a" }); } },
      // 22 · by December, the share is down to one thousand: the frozen lane, snow, red arrow
      { set: "quinc", beat: 11, trans: "dissolve", light: "storm", cam: CAM.fit([0, 3.4, -11.5], { w: 5.0, a0: -6, a1: 4, e0: 4, e1: -2, push: 0.12 }),
        act: (S, u, f) => { S.snow(0.7); const o = W(11, "one"); board(f < o ? "9000" : "1000"); H.lock.visible = false;
          S.actor("margotRich", { x: 0.5, z: -8.8, expr: f < o ? "nervous" : "shock", prop: f < o ? "chin" : "up" });
          S.pop("label", W(11, "December,") - 2, 50, { x: -1.2, y: 6.35, z: -13.2, w: 1.6, h: 0.38, text: "DEC 1720", col: "#2a3a5a", hold: true });
          S.pop("arrow", o, 40, { x: 1.9, y: 5.2, z: -13.4, w: 0.6, h: 1.0, dir: "down", hold: true }); S.kick(o, 0.06); } },
      // 23 · and the notes have lost half their value: a banknote tears in two
      { set: "bank", word: [11, "notes"], lead: 3, trans: "whip", light: K.light("storm", { hemi: 1.6 }), steady: true, cam: CAM.fit([1.55, 1.45, -0.7], { w: 1.4, a0: -4, a1: 4, elev: 2, push: 0.12 }), coc: 11,
        act: (S, u, f) => { H.nL.visible = H.nR.visible = true; const h0 = W(11, "half") - 2, k = E.ss(E.prog(f, h0, h0 + 8));
          H.nL.position.set(1.3 - 0.18 * k, 1.45 - 0.1 * k, -0.7); H.nL.rotation.z = 0.25 * k; H.nR.position.set(1.8 + 0.18 * k, 1.45 - 0.14 * k, -0.7); H.nR.rotation.z = -0.3 * k;
          S.pop("impact", h0 + 2, 26, { x: 1.55, y: 1.85, z: -0.5, w: 0.8, h: 0.4, text: "-50%" }); S.kick(h0 + 2, 0.05); } },
      // 24 · Law flees France: night lane, Law hurries off with his bag
      { set: "quinc", beat: 12, trans: "whip", light: "night", cam: CAM.fit([0.2, 1.2, -2.0], { w: 2.5, a0: 18, a1: 10, elev: 4, push: 0.1 }),
        act: (S, u, f) => { board("1000"); S.actor("law", { x: -0.8 + 0.05 * (f - S.a), z: -2.0, expr: "nervous", side: true, mode: "march", phase: f * 0.08 });
          S.fx("speed", { t: u, x: -1.3, y: 1.1, z: -1.9, w: 1.2, h: 1.0 }); S.pop("label", S.a + 1, 30, { x: 0.2, y: 2.25, z: -2.2, w: 1.3, h: 0.32, text: "FLEES FRANCE", col: "#8a2a3a" }); } },
      // 25 · nobody had been paying for the company: push through into the tower of notes, its own press feeding it
      { set: "tower", word: [12, "Nobody"], lead: 3, trans: "zoom", light: K.backdrop("#2a1a3a"), cam: CAM.fit([-0.2, 2.2, -1.6], { w: 4.2, a0: -14, a1: 4, e0: 6, e1: 2, push: 0.12 }),
        act: (S, u, f) => { for (let q = 0; q < 5; q++) { const t0 = S.a + q * 10, p = E.prog(f, t0, t0 + 18); if (f >= t0 && p < 1) S.fx("bill", { x: -1.6 + 2.0 * p, y: 1.1 + 2.4 * p, z: -1.4, w: 0.3, h: 0.16 }); }
          S.pop("label", W(12, "company.") - 4, 50, { x: 1.9, y: 3.9, z: -1.4, w: 1.3, h: 0.34, text: "WHO PAYS?", col: "#c0353a", hold: true }); } },
      // 26 · it was paying for itself, in paper: the tower wobbles and collapses on the last word
      { set: "tower", word: [12, "itself,"], lead: 6, trans: "cut", light: K.backdrop("#3a1a3a"), cam: CAM.fit([0.4, 2.0, -1.6], { w: 3.8, a0: 10, a1: -2, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const c = W(12, "paper.") + 1, t = Math.max(0, f - c);
          const wob = f < c ? 0.04 * Math.sin(f * 0.9) * E.prog(f, S.a, c) : 0;
          H.bricks.forEach((b, k) => { const dx = ((k * 53) % 7 - 3) * 0.12, y0 = k * 0.24; b.position.set(0.4 + wob * k * 0.25 + dx * t * 0.25, Math.max(0.11, y0 - 0.012 * t * t), -1.6 + ((k * 31) % 5 - 2) * 0.04 * t); b.rotation.z = wob * 2 + (t ? (k % 2 ? 1 : -1) * Math.min(1.2, 0.05 * t) : 0); });
          H.co.position.set(0.4 + wob * 3.5 + 0.03 * t, Math.max(0.35, 14 * 0.24 - 0.015 * t * t), -1.6); H.co.rotation.z = wob * 3 - Math.min(1.3, 0.06 * t);
          S.pop("impact", c, 40, { x: 0.4, y: 2.2, z: -1.0, w: 1.8, h: 0.8, text: "PAPER!" }); S.kick(c, 0.12);
          for (let q = 0; q < 8; q++) S.pop("paper", c + q * 2, 30, { x: -0.6 + q * 0.3, y: 1.0, z: -1.2, w: 0.3, h: 0.22, rise: 1.6, spin: 3, pop: false }); } },
    ],
  };
};
