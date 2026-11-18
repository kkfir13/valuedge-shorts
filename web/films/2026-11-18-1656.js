// "The Dullest Stocks in America" (Shelby Cullom Davis and the double play, 1947-1994) — film module timed to the narration.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const AH = 1.58;
  const H = {};
  const GREY = K.light("storm", { sat: 0.7 });
  // apple tree positions in the orchard (rows) and the apples hung on the front trees
  const TREES = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) TREES.push([-6 + c * 4 + (r % 2) * 2, -3 - r * 5]);

  return {
    cast: {
      davis: { jacket: "#4a4e5a", pants: "#3a3d48", boots: "#1a1418", hat: "bowler", hair: "#3a2a1a", skin: "#f5c9a0", buttons: "#c9a44a" },
      kathryn: { jacket: "#a83a5a", pants: "#3a2a30", boots: "#3a1a20", hat: "hair", hair: "#5a3a24", dress: "#b84a6a", skin: "#f8d2b4" },
      c1: { jacket: "#3a6ab0", pants: "#2a2d38", boots: "#1a1418", hat: "hair", hair: "#2a1a10", skin: "#f0c8a0" },
      c2: { jacket: "#c8783a", pants: "#2a2d38", boots: "#1a1418", hat: "hair", hair: "#c8a060", skin: "#e8b88a" },
      c3: { jacket: "#2e7a4a", pants: "#2a2d38", boots: "#1a1418", hat: "bowler", skin: "#c88a60" },
      c4: { jacket: "#8a2e5a", pants: "#3a2d38", boots: "#1a1418", hat: "hair", hair: "#e8c070", dress: "#a84a7a", skin: "#ffe2c2" },
    },
    sets: {
      // Insurance Row, 1947: three sleepy insurance offices on a cobbled street, cobwebs and a tumbleweed
      row: (B) => {
        B.ground("cobble", 200, 200, { tile: 4 }); B.ground("concrete:#c8c2b8", 30, 3, { z: -4.4, y: 0.01 });
        B.facade({ style: "brick", w: 6.2, x: -6.4, z: -6, seed: 3, col: "#8a4a3a", floors: 3, sign: "LIFE INS." });
        B.facade({ style: "brick", w: 6.2, x: 0, z: -6, seed: 8, col: "#7a3a30", floors: 4, sign: "FIRE INS." });
        B.facade({ style: "brick", w: 6.2, x: 6.4, z: -6, seed: 11, col: "#a5503a", floors: 3, sign: "CASUALTY" });
        B.prop.sign({ x: 0, z: -5.3, w: 1.6, h: 0.5, text: "4× EARNINGS", bg: "#f4efe2", fg: "#c0353a", y: 0.9, edge: "#3a3a40" });
        B.prop.lampPost({ x: -3.2, z: -4.2 }); B.prop.lampPost({ x: 3.2, z: -4.2 });
        for (const x of [-9, 9]) B.prop.tree({ x, z: -12, kind: "bare" });
        H.weed = B.dyn(B.grp(0, 0.45, 0, 0, 1)); B.ball(0.45, "#a8865a", 0, 0, 0, { in: H.weed, seg: 8 }); B.ball(0.3, "#8a6a40", 0.12, 0.1, 0.1, { in: H.weed, seg: 6 }); H.weed.visible = false;
        H.door = B.prop.door({ x: 2.0, z: -5.9, w: 1.0, h: 2.1, col: "planks:#4a3226" });
      },
      // Davis's small 1947 office: green wallpaper, a desk stacked with insurance reports, a calendar and a nameplate
      office: (B) => {
        B.set.room({ style: "office", w: 7, d: 6, h: 3.2, windows: [2.0], door: false });
        B.prop.desk({ x: 0, z: -1.6, w: 2.0 });
        for (let i = 0; i < 4; i++) B.box(0.42, 0.08 + i * 0.07, 0.32, ["#e8dcc0", "#d8c8a0", "#f0e6d0", "#c8b890"][i], -0.65 + (i % 2) * 0.05, 0.78, -1.75 + i * 0.02);
        B.prop.lamp({ x: 0.75, y: 0.78, z: -1.85, glow: "#ffe39a", intensity: 4 });
        B.prop.phone({ x: 0.45, y: 0.78, z: -1.5 });
        H.plate = B.dyn(B.grp(0, 0.79, -1.25, 0, 1)); B.box(0.9, 0.16, 0.08, "#3a2a1a", 0, 0, 0, { in: H.plate }); B.plate(0.84, 0.12, B.textTex("INSURANCE DEPT.", "#c9a44a", "#241726", 1024, 146), 0, 0.08, 0.045, { in: H.plate, d: 0.002 });
        H.env = B.dyn(B.grp(-0.1, 0.825, -1.62, 0, 1)); B.plate(0.46, 0.28, B.textTex("4× → 20×", "#f4ead0", "#2a3a6a", 512, 313), 0, 0, 0, { in: H.env, rx: -Math.PI / 2, d: 0.002 });
        B.plate(0.8, 0.9, B.textTex("", "#f4efe2", "#f4efe2", 256, 288), -2.2, 1.7, -2.97, { d: 0.02 });
        B.plate(0.76, 0.5, B.textTex("1947", "#f4efe2", "#c0353a", 512, 337), -2.2, 1.65, -2.95, { d: 0.02 });
        B.prop.shelf({ x: 2.6, z: -2.7, w: 1.4, h: 2.2 });
        B.prop.sign({ x: 0, y: 2.35, z: -2.95, w: 2.6, h: 0.42, text: "SHELBY C. DAVIS & CO.", bg: "#241726", fg: "#c9a44a" });
        B.prop.chair({ x: 0, z: -2.3 });
      },
      // the orchard metaphor: rows of apple trees on a farm, a fruit stand by the lane
      orchard: (B) => {
        B.set.landscape({ kind: "farm", count: 8, clear: 18, seed: 4 });
        TREES.forEach(([x, z]) => B.prop.tree({ x, z, kind: "oak", col: "#4f8e3a" }));
        H.apples = [];
        TREES.slice(0, 4).forEach(([x, z], ti) => { for (let k = 0; k < 9; k++) { const a = k * 2.1 + ti, r = 1.3 + 0.35 * Math.sin(k * 3.1); H.apples.push(B.dyn(B.ball(0.2, "#d8302a", x + Math.cos(a) * r, 3.8 + 0.9 * Math.sin(k * 1.7), z + 1.2 + 0.3 * Math.sin(a), { seg: 10 }))); } });
        B.prop.counter({ x: 3.0, z: 1.6, w: 2.4, h: 0.95, col: "planks:#a87a4a", top: "#6a4a30" });
        B.box(2.8, 0.06, 1.2, "stripes:#c0353a:#f4efe2", 3.0, 2.2, 1.6);
        for (const sx of [-1.25, 1.25]) B.box(0.08, 2.2, 0.08, "#5a3a24", 3.0 + sx, 0, 2.1);
        for (let k = 0; k < 12; k++) B.ball(0.12, "#d8302a", 2.2 + (k % 6) * 0.3, 1.02, 1.5 + Math.floor(k / 6) * 0.25, { seg: 8 });
        H.price = B.prop.sign({ x: 3.0, y: 1.35, z: 2.1, w: 1.4, h: 0.4, text: "APPLES", bg: "#f4efe2", fg: "#2a6a2a" });
      },
      // the double-play machine: a stock certificate lifted by two stacked columns, EARNINGS and the MULTIPLE
      play: (B) => {
        B.set.stage({ floor: "#efe6d2", back: "#1e3a5a" });
        B.prop.pedestal({ x: 0, z: 0, r: 1.3, h: 0.25, col: "#ffffff", trim: "#c9a44a" });
        H.earn = B.dyn(B.grp(0, 0.25, 0, 0, 1)); B.box(1.4, 1, 1.4, "#f2c14e", 0, 0, 0, { in: H.earn });
        H.pe = B.dyn(B.grp(0, 1.25, 0, 0, 1)); B.box(1.1, 1, 1.1, "#4fd18b", 0, 0, 0, { in: H.pe });
        H.cert = B.dyn(B.grp(0, 2.25, 0, 0, 1)); B.box(1.6, 0.06, 1.0, "#f4ead0", 0, 0, 0, { in: H.cert });
        B.plate(1.0, 0.4, B.textTex("STOCK", "#f4ead0", "#2a4a3a", 512, 205), 0, 0.26, 0.0, { in: H.cert, d: 0.02, edge: "#c9a44a" });
        H.coins = B.prop.coinStack({ x: -1.6, z: 0.9, r: 0.22, n: 18 });
      },
    },
    shots: [
      // 0 · frame 0: a tumbleweed rolls down the grey Insurance Row at the lens
      { set: "row", f: 0, light: GREY, cam: CAM.fit([0, 1.8, -4.5], { w: 7.0, a0: -10, a1: 2, e0: 6, e1: 2, push: 0.14 }),
        act: (S, u, f) => { H.weed.visible = true; H.weed.position.set(-5 + 0.11 * f, 0.45, -2 + 0.04 * f); H.weed.rotation.z = -0.25 * f;
          S.pop("label", W(0, "dullest") - 2, 46, { x: 0, y: 3.3, z: -3.0, w: 2.6, h: 0.55, text: "THE DULLEST STOCKS", col: "#5a5e66", hold: true }); S.pop("zz", W(0, "stocks") , 40, { x: 3.0, y: 3.0, z: -5.4, w: 0.4, h: 0.4, rise: 0.4 }); } },
      // 1 · made one man a fortune: smash to the stage, coins tower up beside Davis
      { set: "play", word: [0, "made"], trans: "smash", light: K.backdrop("#1e3a5a"), cam: CAM.fit([-0.7, 1.3, 1.0], { w: 3.4, a0: -14, a1: -4, elev: 6, push: 0.14 }),
        act: (S, u, f) => { const n = Math.round(18 * E.prog(f, S.a, W(0, "fortune.") + 6)); H.coins.coins.forEach((c, i) => (c.visible = i < n)); S.actor("davis", { x: -0.5, z: 1.5, expr: "grin", prop: "point", look: -0.5 });
          S.pop("impact", W(0, "fortune.") , 30, { x: -1.6, y: 2.4, z: 0.8, w: 1.2, h: 0.7, text: "FORTUNE" }); S.pop("label", S.a + 2, 30, { x: -0.5, y: AH + 0.5, z: 1.6, w: 1.2, h: 0.28, text: "SHELBY DAVIS", col: "#2a3a5a" }); } },
      // 2 · nineteen forty-seven: whip to the office calendar
      { set: "office", beat: 1, trans: "whip", light: "lamp", steady: true, cam: CAM.fit([-2.2, 1.7, -2.95], { w: 1.2, a0: 10, a1: -2, elev: 2, push: 0.14 }), coc: 10,
        act: (S, u, f) => { S.pop("label", W(1, "forty-seven.") , 34, { x: -2.2, y: 2.25, z: -2.85, w: 0.8, h: 0.22, text: "NEW YORK", col: "#2a3a5a" }); } },
      // 3 · you're Shelby Davis, thirty-eight: Davis stands behind his desk
      { set: "office", word: [1, "You're"], lead: 3, trans: "dissolve", light: "lamp", cam: CAM.fit([0, 1.3, -1.9], { w: 2.4, a0: -12, a1: -2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("davis", { x: -0.1, z: -2.25, expr: "smile", prop: "chin" });
          S.pop("label", W(1, "thirty-eight,") - 2, 34, { x: 0.9, y: AH + 0.5, z: -1.9, w: 0.75, h: 0.3, text: "AGE 38", col: "#2a3a5a" }); } },
      // 4 · a former insurance regulator: insert on the nameplate, FORMER stamped across it
      { set: "office", word: [1, "former"], lead: 3, steady: true, light: "lamp", cam: CAM.fit([0, 0.9, -1.25], { w: 1.1, a0: 6, a1: -4, elev: 14, push: 0.14 }), coc: 11,
        act: (S, u, f) => { S.pop("label", W(1, "regulator.") , 30, { x: 0.1, y: 1.05, z: -1.15, w: 0.5, h: 0.16, text: "FORMER", col: "#c0353a", hold: true }); S.kick(W(1, "regulator.") + 2, 0.03); } },
      // 5 · you take your wife's $50,000: Kathryn hands over the money bag
      { set: "office", beat: 2, trans: "whip", light: K.light("lamp", { hemi: 1.5 }), cam: CAM.fit([0.2, 1.3, -0.6], { w: 2.6, a0: 14, a1: 4, elev: 4, push: 0.12 }),
        act: (S, u, f) => { const k = E.prog(f, W(2, "fifty") - 6, W(2, "dollars") + 4); S.actor("kathryn", { x: 0.9, z: -0.7, expr: "smile", prop: "hold" }); S.actor("davis", { x: -0.5, z: -0.8, expr: k > 0.5 ? "grin" : "smile", prop: "hold" });
          S.fx("dollar", { x: 0.75 - 1.1 * k, y: 1.05 + 0.35 * Math.sin(Math.PI * k), z: -0.5, w: 0.32, h: 0.32 });
          S.pop("label", W(2, "fifty") - 2, 40, { x: 0.2, y: 2.25, z: -0.6, w: 1.0, h: 0.32, text: "$50,000", col: "#2a6a2a", hold: true }); S.pop("label", W(2, "wife's") - 2, 26, { x: 0.9, y: AH + 0.45, z: -0.6, w: 0.9, h: 0.26, text: "KATHRYN", col: "#a83a5a" }); } },
      // 6 · and buy insurance stocks: whip to the street, Davis marches to the insurer's door
      { set: "row", word: [2, "buy"], lead: 3, trans: "whip", light: GREY, cam: CAM.fit([1.4, 1.4, -4.3], { w: 3.4, a0: 16, a1: 6, elev: 4, push: 0.12 }),
        act: (S, u, f) => { S.actor("davis", { x: 0.2 + 1.0 * u, z: -4.4, mode: "march", side: true, phase: f * 0.06, expr: "grin" }); H.door.leaf.rotation.y = -1.2 * E.prog(f, S.a + 6, S.a + 16);
          S.pop("label", W(2, "stocks.") - 2, 30, { x: 2.0, y: 2.6, z: -5.4, w: 0.7, h: 0.28, text: "BUY", col: "#2a6a2a" }); } },
      // 7 · insurance, the most unloved corner: wide of the dead street, cobwebs and zzz
      { set: "row", beat: 3, trans: "dissolve", light: K.light("storm", { sat: 0.55 }), cam: CAM.fit([0, 2.6, -5.0], { w: 10, a0: 8, a1: -4, e0: 12, e1: 6, push: 0.1 }),
        act: (S, u, f) => { [-6.4, 0, 6.4].forEach((x, i) => S.pop("zz", S.a + 4 + i * 8, 60, { x, y: 4.2 + i * 0.2, z: -5.4, w: 0.5, h: 0.5, rise: 0.5, pop: i === 0 }));
          S.pop("label", W(3, "unloved") - 2, 44, { x: 0, y: 3.6, z: -3.0, w: 2.2, h: 0.6, text: "UNLOVED", col: "#5a5e66", hold: true }); } },
      // 8 · four times earnings: insert on the 4x price sign, smash on "four"
      { set: "row", beat: 4, trans: "whip", light: GREY, steady: true, cam: CAM.fit([0, 1.2, -5.3], { w: 3.2, a0: -8, a1: 4, elev: 4, push: 0.16 }), coc: 10,
        act: (S, u, f) => { S.pop("impact", W(4, "four") - 1, 40, { x: 0.8, y: 1.85, z: -5.0, w: 0.9, h: 0.6, text: "4×", hold: true }); S.kick(W(4, "four"), 0.06);
          S.pop("label", W(4, "fifty,") - 2, 30, { x: -0.8, y: 1.9, z: -5.0, w: 0.9, h: 0.3, text: "1950", col: "#2a3a5a" }); } },
      // 9 · so how does boring make you rich? Davis in the office at night, question marks
      { set: "office", beat: 5, trans: "whip", light: K.light("night", { hemi: 1.4 }), cam: CAM.fit([0, 1.3, -1.9], { w: 2.2, a0: 10, a1: 0, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("davis", { x: -0.1, z: -2.25, expr: "nervous", prop: "shrug" });
          S.pop("question", W(5, "boring") - 2, 40, { x: 0.6, y: AH + 0.4, z: -2.0, w: 0.3, h: 0.45, hold: true }); S.pop("question", W(5, "rich?") - 2, 26, { x: -0.8, y: AH + 0.3, z: -2.0, w: 0.3, h: 0.45, hold: true }); } },
      // 10 · you see, it's an apple orchard: push-through into the orchard
      { set: "orchard", beat: 6, trans: "zoom", light: "spring", cam: CAM.fit([0, 2.4, -6], { w: 11, a0: -12, a1: 0, e0: 14, e1: 8, push: 0.12 }),
        act: (S, u, f) => { H.apples.forEach((a, i) => (a.visible = i % 3 === 0)); S.pop("label", W(6, "orchard.") - 2, 34, { x: 0, y: 6.4, z: -6, w: 2.4, h: 0.6, text: "THE ORCHARD", col: "#2a6a2a" }); } },
      // 11 · first, the trees grow more apples: apples pop onto the front trees
      { set: "orchard", word: [6, "First,"], lead: 3, light: "spring", cam: CAM.fit([-3.0, 3.6, -1.8], { w: 4.6, a0: 10, a1: -2, elev: 4, push: 0.14 }),
        act: (S, u, f) => { const k = E.prog(f, S.a + 4, W(6, "apples.") + 8); H.apples.forEach((a, i) => { const t = (i * 0.37) % 1; a.visible = i % 3 === 0 || k > t; const g = E.back(E.prog(k, t, t + 0.12)); if (i % 3 !== 0) a.scale.setScalar(Math.max(0.01, g)); });
          S.pop("label", W(6, "grow") - 2, 44, { x: -3, y: 5.6, z: -1.6, w: 1.6, h: 0.42, text: "EARNINGS ↑", col: "#2a6a2a", hold: true }); } },
      // 12 · then apples come into fashion: a crowd rushes the fruit stand
      { set: "orchard", beat: 7, trans: "whip", light: "golden", cam: CAM.fit([2.6, 1.4, 1.6], { w: 4.6, a0: 22, a1: 10, elev: 6, push: 0.12 }),
        act: (S, u, f) => { const t = f - S.a; [["c1", 0.6], ["c2", 1.4], ["c3", 4.6], ["c4", 5.3]].forEach(([c, x], i) => S.actor(c, { x: x + (i < 2 ? 1 : -1) * Math.min(0.6, t * 0.02), z: 2.6, expr: "grin", prop: i % 2 ? "point" : "up" }));
          S.pop("heart", W(7, "fashion,") - 2, 30, { x: 3.0, y: 2.6, z: 2.0, w: 0.4, h: 0.4, rise: 0.4 }); S.pop("label", W(7, "fashion,") , 30, { x: 3.0, y: 2.9, z: 2.0, w: 1.2, h: 0.32, text: "IN FASHION", col: "#c0353a" }); } },
      // 13 · and every apple sells for more: insert on the stand, price arrows climb
      { set: "orchard", word: [7, "every"], lead: 3, steady: true, light: "golden", cam: CAM.fit([3.0, 1.35, 1.8], { w: 2.0, a0: -6, a1: 6, elev: 8, push: 0.16 }), coc: 10,
        act: (S, u, f) => { for (let q = 0; q < 3; q++) S.pop("arrow", W(7, "sells") - 4 + q * 5, 30, { x: 2.4 + q * 0.6, y: 1.9, z: 2.0, w: 0.3, h: 0.45, dir: "up", rise: 0.5, pop: q === 0 });
          S.pop("label", W(7, "more.") - 2, 30, { x: 3.0, y: 2.45, z: 2.1, w: 1.1, h: 0.3, text: "PRICE ↑", col: "#c0353a", hold: true }); } },
      // 14 · Davis called it the double play: smash to the machine, both columns punch up
      { set: "play", beat: 8, trans: "smash", light: K.backdrop("#1e3a5a"), cam: CAM.fit([0.3, 1.8, 0.3], { w: 4.8, a0: -16, a1: -4, elev: 4, push: 0.12 }),
        act: (S, u, f) => { const e = 1 + 0.8 * E.back(E.prog(f, W(8, "double") - 4, W(8, "double") + 6)); H.earn.scale.y = e; H.pe.position.y = 0.25 + e; H.pe.scale.y = 1; H.cert.position.y = 1.25 + e;
          S.actor("davis", { x: 1.3, z: 1.5, expr: "grin", prop: "point", look: -0.6 }); S.pop("label", W(8, "double") - 2, 40, { x: 0, y: H.cert.position.y + 1.1, z: 0.6, w: 1.8, h: 0.42, text: "DOUBLE PLAY", col: "#1e3a5a", hold: true });
          S.pop("label", W(8, "called") - 2, 30, { x: -1.6, y: 0.9, z: 0.8, w: 1.1, h: 0.28, text: "EARNINGS", col: "#8a6a10" }); } },
      // 15 · ten years later: the multiple column rockets up, the certificate climbs high
      { set: "play", beat: 9, trans: "flash", light: K.backdrop("#1e4a3a"), cam: CAM.fit([0, 3.0, 0], { w: 5.0, a0: 12, a1: 2, e0: -6, e1: 6, push: 0.1 }),
        act: (S, u, f) => { const k = E.back(E.prog(f, W(9, "sold") - 4, W(9, "twenty") + 6)); H.earn.scale.y = 1.8; H.pe.position.y = 2.05; H.pe.scale.y = 1 + 3.2 * k; H.cert.position.y = 3.05 + 3.2 * k;
          S.pop("label", W(9, "later,") - 2, 30, { x: -1.6, y: 1.2, z: 0.8, w: 0.8, h: 0.28, text: "1960", col: "#2a3a5a" }); S.pop("label", W(9, "insurers") - 2, 40, { x: 1.4, y: 2.6, z: 0.8, w: 1.1, h: 0.3, text: "MULTIPLE", col: "#2a7a4a", hold: true }); } },
      // 16 · fifteen to twenty times earnings: the number slams in, certificate at the top
      { set: "play", word: [9, "fifteen"], lead: 2, trans: "smash", light: K.backdrop("#1e4a3a"), cam: CAM.fit([0, 6.0, 0], { w: 3.2, a0: -8, a1: 4, elev: -2, push: 0.14 }),
        act: (S, u, f) => { H.earn.scale.y = 1.8; H.pe.position.y = 2.05; H.pe.scale.y = 4.2; H.cert.position.y = 6.25; S.kick(S.a + 3, 0.07);
          S.pop("impact", S.a + 2, 50, { x: 0.2, y: 7.3, z: 0.6, w: 1.6, h: 0.9, text: "15–20×", hold: true }); S.fx("sparks", { x: 0, y: 6.4, z: 0.6, w: 1.6, h: 0.8, t: (f - S.a) / 30 }); } },
      // 17 · rich? he still scribbled on old envelopes: night office, Davis at his desk
      { set: "office", beat: 10, trans: "whip", light: K.light("lamp", { hemi: 1.4 }), cam: CAM.fit([0, 1.2, -1.9], { w: 2.2, a0: -14, a1: -4, elev: 8, push: 0.12 }),
        act: (S, u, f) => { S.actor("davis", { x: -0.1, z: -2.25, expr: "stern", prop: "paper" }); S.pop("label", S.a + 2, 26, { x: 0.8, y: AH + 0.5, z: -1.9, w: 0.6, h: 0.28, text: "RICH?", col: "#2a6a2a" }); } },
      // 18 · old envelopes: insert on the envelope covered in his sums
      { set: "office", word: [10, "notes"], lead: 3, steady: true, light: K.light("lamp", { hemi: 1.5 }), cam: CAM.fit([-0.1, 0.82, -1.62], { w: 0.65, a0: 8, a1: -4, elev: 40, push: 0.14 }), coc: 12,
        act: (S, u, f) => { S.pop("label", W(10, "envelopes.") , 30, { x: -0.1, y: 1.02, z: -1.95, w: 0.4, h: 0.12, text: "NO NOTEPAD", col: "#5a4a3a", hold: true }); } },
      // 19 · by 1994: time-jump flash, the coin stack grows into a tower on the stage
      { set: "play", beat: 11, trans: "flash", light: K.backdrop("#3a2a5a"), cam: CAM.fit([-1.0, 2.0, 0.4], { w: 4.2, a0: -18, a1: -6, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.earn.scale.y = 1.8; H.pe.position.y = 2.05; H.pe.scale.y = 4.2; H.cert.position.y = 6.25; const k = E.prog(f, S.a, W(11, "nine")); H.coins.scale.set(1, 1 + 7 * k, 1);
          S.pop("label", W(11, "ninety-four,") - 2, 40, { x: -1.2, y: 1.0, z: 1.3, w: 0.8, h: 0.28, text: "1994", col: "#3a2a5a", hold: true }); S.pop("label", W(11, "fifty") - 2, 30, { x: -0.6, y: 1.5, z: 1.0, w: 0.9, h: 0.28, text: "$50,000", col: "#2a6a2a" }); } },
      // 20 · nine hundred million: coins rain, the number slams in
      { set: "play", word: [11, "nine"], lead: 2, trans: "smash", light: K.backdrop("#3a2a5a"), cam: CAM.fit([-1.0, 2.8, 0.6], { w: 4.6, a0: 8, a1: 0, elev: 4, push: 0.14 }),
        act: (S, u, f) => { H.earn.scale.y = 1.8; H.pe.position.y = 2.05; H.pe.scale.y = 4.2; H.cert.position.y = 6.25; H.coins.scale.set(1, 8, 1); S.kick(S.a + 3, 0.08);
          for (let q = 0; q < 8; q++) S.pop("coin", S.a + q * 3, 24, { x: -2.2 + (q % 4) * 0.5, y: 4.4, z: 1.0, w: 0.22, h: 0.22, rise: -2.6, spin: 3, pop: q === 0 });
          S.pop("impact", S.a + 2, 60, { x: -0.4, y: 3.4, z: 1.6, w: 1.4, h: 0.75, text: "$900M", hold: true }); } },
      // 21 · he didn't buy exciting stocks: dissolve back to the grey 1947 street, Davis alone at the door
      { set: "row", beat: 12, trans: "dissolve", light: GREY, cam: CAM.fit([1.4, 1.4, -4.3], { w: 4.2, a0: -10, a1: 0, elev: 4, push: 0.12 }),
        act: (S, u, f) => { S.actor("davis", { x: 1.6, z: -4.6, expr: "smile_closed", prop: "chin" }); H.door.leaf.rotation.y = -1.2;
          S.pop("label", W(12, "exciting") - 2, 30, { x: -0.6, y: 2.6, z: -5.0, w: 1.4, h: 0.32, text: "1947: NOBODY", col: "#5a5e66" }); } },
      // 22 · he bought them before they were exciting: golden 1960 street, a crowd stampedes in and Davis slams the door on the last word
      { set: "row", word: [12, "bought"], lead: 3, trans: "whip", light: K.light("golden", { sat: 1.2 }), cam: CAM.fit([1.2, 1.5, -3.4], { w: 5.0, a0: 14, a1: 4, elev: 6, push: 0.12 }),
        act: (S, u, f) => { const hit = W(12, "exciting.") + 4, t = f - S.a, shut = f >= hit;
          S.actor("davis", { x: 2.0, z: -5.3, expr: shut ? "laugh" : "grin", prop: shut ? "wave" : "point", wave: (f * 0.06) % 1 }); H.door.leaf.rotation.y = shut ? 0 : -1.2;
          [["c1", -3.5], ["c2", -4.3], ["c3", -5.1], ["c4", -2.7]].forEach(([c, x0], i) => { const x = Math.min(x0 + t * 0.07, 0.6 + i * 0.25); S.actor(c, { x, z: -3.6 + (i % 2) * 0.5, mode: shut ? "fall" : "march", side: !shut, phase: f * 0.12 + i, expr: shut ? "dazed" : "shock" }); });
          S.fx("speed", { x: -1.5, y: 1.0, z: -3.5, w: 3, h: 1.4, t: (t % 15) / 15 });
          S.pop("label", S.a + 2, 30, { x: -1.5, y: 2.6, z: -3.6, w: 1.0, h: 0.3, text: "1960", col: "#c0602a" });
          S.pop("impact", hit, 30, { x: 1.0, y: 2.2, z: -3.4, w: 1.2, h: 0.75, text: "SLAM!" }); S.kick(hit, 0.12); S.pop("stars", hit + 3, 26, { x: 0.8, y: 0.8, z: -3.4, w: 1.0, h: 0.5 }); } },
    ],
  };
};
