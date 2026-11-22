// "The Price of the Last Chair" (the Northern Pacific corner, May 1901) — film module.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const AH = 1.58;
  const H = {};
  const tx = (B, s, bg, fg, w = 1024, h = 256) => B.textTex(s, bg, fg, w, h);
  const PI = Math.PI;

  // a wooden ladder (rails + rungs) standing on y=0, leaning by `lean`
  const ladder = (B, x, y, z, len = 3.2, parent) => {
    const g = B.grp(x, y, z, 0, 1, parent);
    for (const sx of [-0.22, 0.22]) B.box(0.07, len, 0.07, "#c8925a", sx, 0, 0, { in: g });
    for (let k = 0.3; k < len - 0.1; k += 0.38) B.box(0.44, 0.05, 0.05, "#a8703a", 0, k, 0, { in: g });
    return g;
  };
  // brokers of 1901 (bowlers and top hats)
  const BRK = ["b1", "b2", "b3", "b4", "b5"];
  const POST = [[-1.7, -0.2], [1.7, -0.3], [-1.1, 0.9], [1.0, 1.0], [-2.3, -1.6], [2.3, -1.7], [0, 1.5]];
  const mob = (S, f, n = POST.length, expr = "shock") => POST.slice(0, n).forEach(([x, z], i) => S.actor(BRK[i % BRK.length], {
    key: "m" + i, x: x + 0.06 * Math.sin(f * 0.25 + i), z, expr: Array.isArray(expr) ? expr[i % expr.length] : expr, prop: i % 2 ? "up" : "point",
    tilt: 4 * Math.sin(f * 0.3 + i), look: -x * 0.2 }));
  const board = (v) => { for (const k of ["100", "200", "1000"]) H.price[k].visible = k === v; };

  return {
    cast: {
      pete: { jacket: "#9a6a34", pants: "#4a3a2a", boots: "#2a1a14", hat: "bowler", capColor: "#3a2a20", skin: "#f5c9a0", moustache: "#5a3418", buttons: "#e8c44a" },
      harriman: { jacket: "#22232c", pants: "#2a2a34", boots: "#141418", hat: "bowler", capColor: "#1a1a20", skin: "#f0c8a0", moustache: "#2a1a14", buttons: "#9aa3ad" },
      hill: { jacket: "#6a6a72", pants: "#3a3a44", boots: "#1a1418", hat: "tophat", capColor: "#1a1a20", hair: "#eeeeee", skin: "#f3cfae", moustache: "#f0f0f0", buttons: "#c9a44a" },
      banker: { jacket: "#1f2a3a", pants: "#2a2a34", boots: "#141418", hat: "tophat", capColor: "#1a1a20", skin: "#f5d0b0", moustache: "#7a7a7a", buttons: "#e8c44a" },
      neighbor: { jacket: "#3f7a4a", pants: "#4a4030", boots: "#3a2418", hat: "cap", cap: "#c0353a", skin: "#c99067" },
      buyer: { jacket: "#2f5a8a", pants: "#3a3a44", boots: "#2a1a14", hat: "cap", cap: "#f2c14e", skin: "#f0c8a0", moustache: "#3a2418" },
      b1: { jacket: "#3a4a6a", pants: "#2a2a34", boots: "#1a1418", hat: "bowler", capColor: "#2a2a30", skin: "#f0c8a0", moustache: "#3a2418" },
      b2: { jacket: "#5a3a2a", pants: "#3a3030", boots: "#1a1418", hat: "bowler", capColor: "#4a3020", skin: "#e8b48a", buttons: "#e8c44a" },
      b3: { jacket: "#4a5a3a", pants: "#2a2a34", boots: "#1a1418", hat: "tophat", capColor: "#1a1a20", skin: "#f3cfae", moustache: "#8a6a4a" },
      b4: { jacket: "#6a2a3a", pants: "#2a2a34", boots: "#1a1418", hat: "bowler", capColor: "#1a1a20", skin: "#c99067" },
      b5: { jacket: "#3a3a44", pants: "#5a4a3a", boots: "#1a1418", hat: "bowler", capColor: "#3a2a20", skin: "#f5c9a0", moustache: "#c8a060" },
    },
    sets: {
      // the Northern Pacific line through pine country and mountains
      plains: (B) => {
        B.set.landscape({ kind: "forest", seed: 3, count: 22, clear: 18 });
        B.box(300, 0.08, 2.6, "dirt", 0, 0, 0);
        for (let x = -60; x <= 60; x += 0.9) B.box(0.24, 0.1, 2.1, "#5a3a24", x, 0.04, 0);
        for (const z of [-0.72, 0.72]) B.box(300, 0.1, 0.08, "metal:#8a8a90", 0, 0.13, z);
        for (const x of [-9, 9]) B.prop.tree({ x, z: -5, kind: "pine" });
        const t = H.train = B.dyn(B.grp(0, 0.2, 0, 0, 1));
        B.box(5.4, 0.35, 1.7, "#2a2a30", 0.2, 0.5, 0, { in: t });
        B.cyl(0.75, 0.75, 3.0, "#2a3a4a", 0.9, 1.65 - 1.5, 0, { in: t, rz: PI / 2, seg: 24 });
        B.cyl(0.8, 0.8, 0.4, "#1a1a20", 2.6, 1.65 - 0.2, 0, { in: t, rz: PI / 2, seg: 24 });
        B.cyl(0.22, 0.38, 1.0, "#1a1a20", 2.1, 2.2, 0, { in: t });
        B.ball(0.3, "#c9a44a", 1.0, 2.45, 0, { in: t });
        B.box(0.36, 0.36, 0.36, "#ffe8a8", 2.75, 2.25, 0, { in: t });
        B.box(1.6, 1.9, 1.9, "#8a2a2a", -1.4, 0.85, 0, { in: t }); B.box(1.95, 0.15, 2.15, "#2a2a30", -1.4, 2.75, 0, { in: t });
        B.plate(0.9, 0.6, "#2a3a4a", -1.4, 1.95, 0.96, { in: t, d: 0.02 });
        B.box(0.5, 0.5, 1.7, "#c0353a", 3.0, 0.3, 0, { in: t });
        for (const [x, r] of [[-0.5, 0.62], [0.9, 0.62], [2.3, 0.42]]) for (const z of [-0.88, 0.88]) B.cyl(r, r, 0.1, "#c0353a", x, r + 0.0 - 0.05, z, { in: t, rx: PI / 2, seg: 20 });
        B.box(2.4, 1.6, 1.85, "#2a3a4a", -3.7, 0.65, 0, { in: t });
        B.plate(2.2, 0.42, tx(B, "NORTHERN PACIFIC", "#2a3a4a", "#f2c14e", 1024, 196), -3.7, 1.75, 0.94, { in: t, d: 0.02 });
        for (const [x, z] of [[-3.0, 0.88], [-4.4, 0.88], [-3.0, -0.88], [-4.4, -0.88]]) B.cyl(0.38, 0.38, 0.1, "#c0353a", x, 0.33, z, { in: t, rx: PI / 2, seg: 18 });
        H.sameTag = B.dyn(B.plate(1.6, 0.6, tx(B, "SAME.", "#f4efe2", "#2a3a4a", 1024, 384), 0.3, 3.4, 1.6, { d: 0.05, edge: "#2a3a4a" })); H.sameTag.visible = false;
      },
      // the exchange floor, 1901: marble hall, the Northern Pacific post, a chalk price board
      floor: (B) => {
        B.set.room({ style: "bank", wall: "marble", floor: "tiles:#e8dcc4:#8a6a4a", w: 14, d: 10, h: 6.5, windows: [-5, 5], door: false });
        B.cyl(1.2, 1.25, 1.1, "westwood:#7a4a2c", 0, 0, -2.2, { seg: 28 }); B.cyl(1.32, 1.32, 0.08, "#3a2418", 0, 1.1, -2.2, { seg: 28 });
        B.cyl(0.09, 0.09, 1.2, "#3a2418", 0, 1.1, -2.2);
        B.plate(2.6, 0.5, tx(B, "NORTHERN PACIFIC", "#2a3a4a", "#f2c14e", 1024, 196), 0, 2.5, -2.2, { d: 0.06, edge: "#c9a44a" });
        B.plate(5.0, 2.3, "#1f2a24", 0, 4.7, -4.9, { d: 0.08, edge: "#7a4a2c" });
        B.plate(4.4, 0.4, tx(B, "N. PACIFIC · PRICE PER SHARE", "#1f2a24", "#f4efe2", 1024, 94), 0, 5.55, -4.83, { d: 0.01 });
        H.price = {};
        for (const [k, s, c] of [["100", "$100", "#f4efe2"], ["200", "$200", "#ffd84a"], ["1000", "$1,000", "#ff6a5a"]]) {
          H.price[k] = B.dyn(B.plate(4.2, 1.4, tx(B, s, "#1f2a24", c, 1024, 342), 0, 4.5, -4.82, { d: 0.01 })); H.price[k].visible = k === "100"; }
        B.prop.lamp({ kind: "hang", x: -3, y: 6.2, z: -1, cord: 1.6, col: "#c9a44a" }); B.prop.lamp({ kind: "hang", x: 3, y: 6.2, z: -1, cord: 1.6, col: "#c9a44a" });
        for (const x of [-5.5, 5.5]) B.cyl(0.35, 0.35, 6.5, "marble", x, 0, -3.5, { seg: 18 });
        B.prop.sign({ x: -4.8, y: 2.4, z: -4.9, w: 2.2, h: 0.5, text: "OTHER STOCKS", bg: "#f4efe2", fg: "#2a3a5a" });
        H.tick = []; for (let i = 0; i < 4; i++) H.tick.push(B.dyn(B.plate(1.8, 0.32, tx(B, ["STEEL", "RAILS", "COPPER", "SUGAR"][i], "#1f2a24", "#f4efe2", 512, 92), -4.8, 2.1 - i * 0.38, -4.88, { d: 0.01 })));
        for (let i = 0; i < 14; i++) B.box(0.22, 0.02, 0.3, "#f4efe2", -4 + (i * 1.7) % 8, 0.01, 1.5 - (i * 0.9) % 4, { ry: i });
      },
      // Harriman's office at night: lamp, telegraph, a pile of share certificates going into a safe
      office: (B) => {
        B.set.room({ style: "office", wall: "panel:#3a2a20", floor: "carpet:#5a2a2a", w: 7, d: 6, h: 3.6, windows: [2.2], door: false });
        B.prop.desk({ x: 0, z: -1.2, w: 2.0 }); B.prop.lamp({ x: -0.6, y: 0.78, z: -1.3, col: "#2f7a4a" });
        H.key = B.prop.telegraph({ x: 0.45, y: 0.78, z: -1.1 });
        H.pile = B.dyn(B.grp(0, 0.78, -1.05, 0, 1)); for (let i = 0; i < 8; i++) B.box(0.5, 0.03, 0.34, i % 2 ? "#f4e6c8" : "#e8d8b0", 0.02 * Math.sin(i), i * 0.035, 0, { in: H.pile, ry: 0.1 * Math.sin(i * 3) });
        H.safe = B.prop.safe({ x: 2.2, z: -2.2, size: 1.0 });
        B.prop.poster({ x: -1.8, y: 1.3, z: -2.95, w: 1.2, h: 0.8, text: "UNION PACIFIC", bg: "#f4e6c8", fg: "#2a3a5a" });
        B.prop.clock({ x: -0.2, y: 2.6, z: -2.95, r: 0.32 });
      },
      // Hill and the bankers buying back: a bank counter piled with cash
      bank: (B) => {
        B.set.room({ style: "bank", w: 9, d: 7, h: 4.2, windows: [-3.2, 3.2], door: false });
        B.prop.counter({ x: 0, z: -1.4, w: 4.5 }); B.prop.cash({ x: -0.6, y: 1.1, z: -1.4, n: 6 }); B.prop.cash({ x: 0.9, y: 1.1, z: -1.4, n: 4 });
        B.prop.sign({ x: 0, y: 2.6, z: -3.4, w: 2.6, h: 0.55, text: "BUY · N. PACIFIC", bg: "#2a3a4a", fg: "#f2c14e" });
        H.vault = B.prop.vaultDoor({ x: 3.0, z: -3.3, r: 1.0 });
      },
      // metaphor stage: the giant share certificate both giants hold on to (later: the crashing market bars)
      duel: (B) => {
        B.set.stage({ floor: "#f4e6c8", back: "#2a3a5a" });
        H.cert = B.dyn(B.grp(0, 0, 0, 0, 1));
        B.plate(2.4, 1.6, "#f4e6c8", 0, 1.75, -0.2, { in: H.cert, d: 0.06, edge: "#c9a44a", cast: true }); B.plate(2.0, 0.5, tx(B, "ONE SHARE", "#f4e6c8", "#2a3a5a", 1024, 256), 0, 1.95, -0.16, { in: H.cert, d: 0.01 }); B.plate(1.8, 0.22, tx(B, "NORTHERN PACIFIC RAILWAY", "#f4e6c8", "#8a2a2a", 1024, 125), 0, 1.45, -0.16, { in: H.cert, d: 0.01 });
        H.lock = B.dyn(B.grp(0, 1.3, 0.0, 0, 1)); B.box(0.5, 0.42, 0.16, "metal:#c9a44a", 0, 0, 0, { in: H.lock }); B.cyl(0.16, 0.16, 0.08, "metal:#a8a8b0", 0, 0.4 - 0.04, 0, { in: H.lock, rx: PI / 2 }); H.lock.visible = false;
        H.bars = B.prop.bars3d({ x: 0, z: -1.5, vals: [0.9, 0.8, 1, 0.85, 0.95], cols: ["#ff5a5a"], bw: 0.42, gap: 0.22, h: 2.6 }); H.bars.visible = false;
      },
      // a small town street: the neighbor's ladder and the hardware store
      town: (B) => {
        B.set.street({ style: ["village", "shop"], length: 50, road: 7, ground: "dirt", seed: 17, signs: ["HARDWARE", "POST OFFICE", "BAKERY", "GENERAL STORE", "BARBER"] });
        B.prop.fence({ x: -1.5, z: -1.8, len: 4 });
        H.ladder = B.dyn(ladder(B, -0.6, 0, -2.5, 3.0)); H.ladder.rotation.x = -0.18;
        H.shopSign = B.prop.sign({ x: 2.2, y: 0.4, z: -5.2, w: 1.6, h: 0.5, text: "LADDERS", bg: "#f4efe2", fg: "#8a2a2a", post: true });
        H.sold = B.dyn(B.plate(1.5, 0.45, tx(B, "SOLD OUT", "#c0353a", "#fff4e0", 1024, 306), 2.2, 1.9, -5.05, { d: 0.04, edge: "#7a1a1a" })); H.sold.visible = false;
        H.stack = B.dyn(B.grp(0, 0, 0, 0, 1)); for (let i = 0; i < 5; i++) { const l = ladder(B, 0, 0, 0, 3.0, H.stack); l.rotation.z = PI / 2; l.position.set(1.5, 1.2 + i * 0.12, 0.04 * i); } H.stack.visible = false;
        B.prop.cash({ x: 0, y: -5, z: 0, n: 2 });
      },
      // musical chairs: one golden chair, a ring of short sellers, a gramophone
      chairs: (B) => {
        B.set.stage({ floor: "#f4efe2", back: "#5a2a6a" });
        H.chair = B.prop.chair({ x: 0, z: 0, col: "#e8b84a" }); H.chair.scale.setScalar(1.6);
        H.tag = B.dyn(B.plate(0.8, 0.35, tx(B, "1 SHARE", "#f4efe2", "#2a3a5a", 1024, 448), 0, 1.75, -0.33, { d: 0.03, edge: "#c9a44a" }));
        H.gram = B.dyn(B.grp(2.6, 0, -1.6, -0.5, 1)); B.box(0.6, 0.35, 0.6, "#6a3a24", 0, 0.6, 0, { in: H.gram }); B.cyl(0.04, 0.04, 0.6, "#c9a44a", 0, 0.95, 0, { in: H.gram });
        const horn = B.cone(0.4, 0.7, "#c9a44a", 0, 1.3, 0.2, { in: H.gram }); horn.rotation.x = -2.2;
        B.cyl(0.6, 0.6, 0.6, "#4a2a5a", 2.6, 0, -1.6, { seg: 20 });
        H.price1k = B.dyn(B.plate(1.8, 0.9, tx(B, "$1,000", "#f4efe2", "#c0353a", 1024, 512), 0, 4.5, 0.0, { d: 0.1, edge: "#c0353a", cast: true })); H.price1k.visible = false;
        B.lamp(0, 4, 1.5, "#ffe8b0", 8, 10);
      },
    },
    shots: [
      // 0 · hook: the locomotive thunders through on frame 0
      { set: "plains", f: 0, light: "golden", cam: CAM.fit([0, 1.6, 0], { w: 7, a0: 38, a1: 18, elev: 4, push: 0.15 }),
        act: (S, u, f) => { H.train.position.x = -3.2 + f * 0.06; S.fx("smoke", { x: H.train.position.x + 2.1, y: 3.6, z: 0, w: 1.6, h: 1.6 });
          S.pop("puff", 2, 18, { x: H.train.position.x + 2.0, y: 3.4, z: 0, w: 1.4, h: 1.2, pop: false }); S.kick(1, 0.04); } },
      // 1 · a railroad stock: the price board says $100
      { set: "floor", word: [0, "stock"], trans: "whip", light: "interior", cam: CAM.fit([0, 4.6, -4.8], { w: 5.4, a0: -10, a1: 6, elev: -4, push: 0.12 }),
        act: (S, u, f) => { board(f < W(0, "ten") + 8 ? "100" : "200"); S.pop("arrow", W(0, "ten"), 40, { x: 2.0, y: 4.7, z: -4.4, w: 0.8, h: 1.2, dir: "up", hold: true });
          S.pop("word", W(0, "ten"), 40, { x: -1.5, y: 3.4, z: -4.2, w: 1.5, h: 0.8, text: "x10", col: "#ffd84a", hold: true }); S.kick(W(0, "ten"), 0.04); } },
      // 2 · one week (wide of the floor, crowd turning)
      { set: "floor", word: [0, "week."], lead: 4, light: "interior", cam: CAM.fit([0, 1.6, -2.2], { w: 6.0, a0: 20, a1: 8, elev: 10 }),
        act: (S, u, f) => { board("200"); mob(S, f, 7, ["grin", "shock", "laugh"]); } },
      // 3 · imagine you sold it short: meet Pete
      { set: "floor", beat: 1, trans: "whip", light: "interior", cam: CAM.fit([1.0, AH - 0.1, 1.6], { w: 1.6, a0: -14, a1: -4, elev: 2, push: 0.12 }), coc: 9,
        act: (S, u, f) => { board("100"); S.actor("pete", { x: 1.0, z: 1.6, expr: "grin", prop: "paper" }); S.say("Way overpriced.", S.a + 4, 46, { x: 0.85, y: AH + 0.6, z: 1.7, w: 1.2, h: 0.42 }); } },
      // 4 · you borrowed shares (a lender hands them over)
      { set: "bank", beat: 2, trans: "dissolve", light: "interior", cam: CAM.fit([0.2, 1.3, -0.6], { w: 2.6, a0: -18, a1: -8, elev: 4 }),
        act: (S, u, f) => { S.actor("banker", { x: -0.6, z: -0.7, expr: "smile", prop: "hold" }); S.actor("pete", { x: 0.8, z: -0.5, expr: "grin", prop: "hold" });
          S.pop("page", S.a + 6, 22, { x: 0.1, y: 1.5, z: -1.0, w: 0.5, h: 0.5, pop: false }); S.fx("label", { x: 0.1, y: 2.2, z: -1.0, w: 1.1, h: 0.34, text: "BORROWED", bg: "#f4efe2" }); } },
      // 5 · sold them: certificates become cash
      { set: "bank", word: [2, "sold"], lead: 3, light: "interior", steady: true, cam: CAM.fit([0.8, 1.25, -0.4], { w: 1.3, a0: 6, a1: 0, elev: 2, push: 0.15 }), coc: 10,
        act: (S, u, f) => { S.actor("pete", { x: 0.8, z: -0.5, expr: "laugh", prop: "up" }); S.pop("dollar", S.a + 3, 26, { x: 0.8, y: 2.1, z: -0.2, w: 0.7, h: 0.7 }); S.pop("coin", S.a + 8, 20, { x: 0.4, y: 1.8, z: -0.2, w: 0.4, h: 0.4 }); } },
      // 6 · and plan to buy back cheaper
      { set: "floor", word: [2, "plan"], trans: "whip", light: "interior", cam: CAM.fit([1.0, AH - 0.1, 1.6], { w: 1.7, a0: 10, a1: 2, elev: 2 }),
        act: (S, u, f) => { board("100"); S.actor("pete", { x: 1.0, z: 1.6, expr: "whistle", prop: "chin" });
          S.pop("arrow", W(2, "cheaper."), 30, { x: 1.6, y: AH + 0.35, z: 1.8, w: 0.45, h: 0.7, dir: "down", hold: true }); } },
      // 7 · but two railroad giants: the duel stage
      { set: "duel", beat: 3, trans: "smash", light: K.backdrop("#2a3a5a"), cam: CAM.fit([0, 1.5, 0], { w: 3.8, a0: -12, a1: 10, elev: 4, push: 0.12 }),
        act: (S, u, f) => { S.actor("harriman", { x: -1.25, z: 0.4, expr: "stern", prop: "fists" }); S.actor("hill", { x: 1.25, z: 0.4, expr: "stern", prop: "fists", flip: true });
          S.pop("sparks", W(3, "same"), 18, { x: 0, y: 1.75, z: 0.2, w: 1.6, h: 1.6 }); } },
      // 8 · Harriman buys in secret (night office)
      { set: "office", beat: 4, trans: "whip", light: "night", cam: CAM.fit([0.1, 1.3, -1.2], { w: 2.4, a0: -16, a1: -6, elev: 6 }),
        act: (S, u, f) => { S.actor("harriman", { x: -0.2, z: -1.85, expr: "whistle", prop: "point" }); H.key.key.rotation.z = 0.15 * (Math.sin(f * 1.3) > 0);
          H.pile.scale.y = 1 + 0.6 * E.prog(f, S.a, S.a + 50); S.pop("label", W(4, "secret."), 30, { x: 0.9, y: 2.2, z: -1.3, w: 1.0, h: 0.34, text: "SHHH", hold: true }); } },
      // 9 · Hill and Morgan's bank buy to stop him
      { set: "bank", word: [4, "Hill"], lead: 3, trans: "whip", light: "office", cam: CAM.fit([0, 1.4, -0.8], { w: 2.8, a0: 14, a1: 4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { S.actor("hill", { x: -0.7, z: -0.7, expr: "stern", prop: "point" }); S.actor("banker", { x: 0.75, z: -0.75, expr: "grin", prop: "up" });
          S.say("Buy it all!", W(4, "buy") - 4, 40, { x: -0.4, y: AH + 0.75, z: -0.6, w: 1.2, h: 0.42 }); S.pop("dollar", W(4, "stop"), 20, { x: 0, y: 1.6, z: -1.2, w: 0.6, h: 0.6 }); } },
      // 10 · and nobody sells: the certificate gets padlocked
      { set: "duel", beat: 5, trans: "whip", light: K.backdrop("#2a3a5a"), cam: CAM.fit([0, 1.6, 0], { w: 3.0, a0: 6, a1: -4, elev: 2, push: 0.18 }),
        act: (S, u, f) => { S.actor("harriman", { x: -0.95, z: 0.6, expr: "grin", prop: "hold" }); S.actor("hill", { x: 0.95, z: 0.6, expr: "grin", prop: "hold", flip: true });
          const t = W(5, "sells."); H.lock.visible = f >= t; H.lock.position.y = 1.3 + 0.6 * (1 - E.back(E.prog(f, t, t + 6))); S.kick(t, 0.05); S.pop("impact", t, 16, { x: 0, y: 1.3, z: 0.4, w: 0.9, h: 0.9, text: "CLICK" }); } },
      // 11 · so why is that your problem?
      { set: "floor", beat: 6, trans: "dissolve", light: (u) => K.mixLight(K.light("interior"), K.light("danger"), 0.3 * u), cam: CAM.fit([1.0, AH, 1.6], { h: 0.9, a0: 4, a1: -4, elev: 1, push: 0.15 }), coc: 10,
        act: (S, u, f) => { board("200"); S.actor("pete", { x: 1.0, z: 1.6, expr: "nervous" }); S.pop("sweat", S.a + 6, 40, { x: 1.3, y: AH + 0.25, z: 1.8, w: 0.3, h: 0.3, pop: false });
          S.pop("question", W(6, "problem?"), 26, { x: 0.65, y: AH + 0.55, z: 1.8, w: 0.4, h: 0.5, hold: true }); } },
      // 12 · you see: selling the neighbor's ladder
      { set: "town", beat: 7, trans: "whip", light: "day", cam: CAM.fit([0.4, 1.4, -2.0], { w: 3.4, a0: -14, a1: -6, elev: 5 }),
        act: (S, u, f) => { const k = E.ss(E.prog(f, W(7, "ladder,") - 6, W(7, "ladder,") + 8)); H.ladder.position.x = E.lerp(-0.6, 0.55, k); H.ladder.rotation.x = E.lerp(-0.18, 0, k);
          S.actor("pete", { x: 0.0, z: -1.6, expr: "grin", prop: "hold" }); S.actor("buyer", { x: 1.3, z: -1.3, expr: "smile", prop: "hold" });
          S.pop("coin", W(7, "ladder,") + 4, 20, { x: 0.6, y: 1.9, z: -1.2, w: 0.4, h: 0.4 }); } },
      // 13 · then someone bought every ladder in town
      { set: "town", word: [7, "then"], lead: 3, trans: "whip", light: "day", cam: CAM.fit([0.9, 1.7, -3.8], { w: 3.6, a0: -6, a1: 4, elev: 5 }),
        act: (S, u, f) => { H.ladder.visible = false; H.stack.visible = true; H.stack.scale.setScalar(0.6); H.stack.position.set(E.lerp(1.4, 0.0, u), 1.25, -2.95); H.sold.visible = f >= W(7, "every");
          S.actor("harriman", { key: "carry", x: E.lerp(1.4, 0.0, u), z: -3.0, expr: "grin", mode: "stroll", phase: f * 0.06, prop: "up" });
          S.pop("impact", W(7, "every"), 14, { x: 2.2, y: 2.5, z: -4.8, w: 0.8, h: 0.8, text: "SOLD!" }); } },
      // 14 · neighbor wants his ladder back
      { set: "town", word: [7, "town."], lead: 6, light: "day", cam: CAM.fit([0.4, AH, -1.6], { w: 1.9, a0: -6, a1: 2, elev: 1, push: 0.15 }), coc: 9,
        act: (S, u, f) => { H.ladder.visible = false; S.actor("pete", { x: 0.0, z: -1.6, expr: "shock" }); S.actor("neighbor", { x: 0.9, z: -1.7, expr: "stern", prop: "point", flip: true });
          S.say("My ladder?", S.a + 2, 28, { x: 0.7, y: AH + 0.6, z: -1.5, w: 0.9, h: 0.4 }); } },
      // 15 · May ninth (time jump onto the floor)
      { set: "floor", beat: 8, trans: "flash", light: "interior", cam: CAM.fit([0, 2.0, -1.0], { w: 6.2, a0: -14, a1: -4, elev: 12 }),
        act: (S, u, f) => { board("200"); mob(S, f, 7, ["shock", "nervous"]); S.actor("pete", { x: 0.4, z: 1.9, expr: "nervous", prop: "up" });
          S.fx("label", { x: 0, y: 3.3, z: 0.6, w: 2.8, h: 0.5, text: "THURSDAY, MAY 9, 1901", bg: "#f4efe2" }); } },
      // 16 · every short seller needs shares at once: hands up at the post
      { set: "floor", word: [8, "needs"], lead: 3, light: (u) => K.mixLight(K.light("interior"), K.light("danger"), 0.45), cam: CAM.fit([0, 1.6, -0.6], { w: 3.6, a0: 24, a1: 14, elev: 4, push: 0.12 }),
        act: (S, u, f) => { board("200"); mob(S, f, 7, ["shock", "pained", "nervous"]); for (let q = 0; q < 3; q++) S.pop("exclaim", S.a + 4 + q * 7, 14, { x: -1.5 + q * 1.5, y: 2.5, z: -0.2 + q * 0.4, w: 0.35, h: 0.45 }); } },
      // 17 · musical chairs: push through into the metaphor stage
      { set: "chairs", beat: 9, trans: "zoom", light: K.backdrop("#5a2a6a"), cam: CAM.fit([0, 1.2, 0], { w: 5.2, a0: -10, a1: 12, elev: 14 }),
        act: (S, u, f) => { const stop = W(9, "stopped."); for (let i = 0; i < 6; i++) { const a = i * PI / 3 + Math.min(f, stop) * 0.035; S.actor(i === 0 ? "pete" : BRK[i % 5], { key: "r" + i, x: 2.0 * Math.sin(a), z: 2.0 * Math.cos(a) - 0.3, mode: "stroll", phase: f * 0.06 + i, expr: "grin" }); }
          S.pop("word", S.a + 4, 50, { x: 2.6, y: 2.3, z: -1.4, w: 0.9, h: 0.6, text: "♪♫", col: "#ffd84a", pop: false }); } },
      // 18 · and the music stopped: everybody dives
      { set: "chairs", word: [9, "stopped."], lead: 2, trans: "smash", light: K.backdrop("#3a1a4a"), cam: CAM.fit([0, 1.0, 0.2], { w: 4.6, a0: 6, a1: 0, elev: 18, push: 0.1 }),
        act: (S, u, f) => { for (let i = 0; i < 6; i++) { const a = i * PI / 3 + S.a * 0.035; S.actor(i === 0 ? "pete" : BRK[i % 5], { key: "r" + i, x: 1.4 * Math.sin(a), z: 1.4 * Math.cos(a) - 0.3, mode: "fall", expr: "dazed" }); }
          S.pop("stars", S.a + 6, 24, { x: 0, y: 1.4, z: 0.6, w: 1.8, h: 1.2 }); S.kick(S.a + 2, 0.06); } },
      // 19 · one thousand dollars a share
      { set: "floor", beat: 10, trans: "smash", light: K.light("danger"), cam: CAM.fit([0, 4.5, -4.8], { w: 5.0, a0: 8, a1: -4, elev: -4, push: 0.2 }),
        act: (S, u, f) => { board(f >= W(10, "thousand") ? "1000" : "200"); S.pop("sparks", W(10, "thousand"), 18, { x: 0, y: 4.5, z: -4.4, w: 3.4, h: 2.2 }); S.kick(W(10, "thousand"), 0.07);
          S.pop("arrow", W(10, "thousand"), 60, { x: 2.3, y: 4.7, z: -4.4, w: 0.8, h: 1.3, dir: "up", hold: true }); } },
      // 20 · short sellers dump everything else: the other boards collapse
      { set: "floor", beat: 11, trans: "whip", light: "storm", cam: CAM.fit([-2.4, 1.9, -2.4], { w: 4.8, a0: -20, a1: -12, elev: 6 }),
        act: (S, u, f) => { board("1000"); mob(S, f, 6, ["pained", "shock"]); for (let i = 0; i < 4; i++) S.pop("arrow", S.a + 6 + i * 6, 60, { x: -3.6, y: 2.2 - i * 0.38, z: -4.6, w: 0.3, h: 0.36, dir: "down", hold: true });
          S.pop("page", S.a + 4, 30, { x: -2.2, y: 2.4, z: -1.0, w: 0.5, h: 0.5, pop: false }); S.pop("page", S.a + 16, 30, { x: -1.4, y: 2.6, z: -0.6, w: 0.5, h: 0.5, pop: false }); } },
      // 21 · and the market crashes: red bars fall on the stage
      { set: "duel", word: [11, "market"], lead: 4, trans: "whip", light: K.backdrop("#3a1a1a"), cam: CAM.fit([0, 1.4, -1.5], { w: 3.8, a0: -6, a1: 6, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.cert.visible = false; H.bars.visible = true; const k = E.easeIn(E.prog(f, W(11, "crashes."), W(11, "crashes.") + 12));
          H.bars.grow([0.9, 0.8, 1, 0.85, 0.95].map((v, i) => v * (1 - 0.7 * k * (0.7 + 0.3 * ((i * 7) % 3) / 2)))); S.kick(W(11, "crashes."), 0.08);
          S.pop("impact", W(11, "crashes."), 18, { x: 0, y: 2.8, z: -0.8, w: 1.3, h: 1.0, text: "CRASH!" }); } },
      // 22 · the giants call a truce
      { set: "duel", beat: 12, trans: "dissolve", light: K.backdrop("#3a5a4a"), cam: CAM.fit([0, 1.5, 0], { w: 3.2, a0: 10, a1: -2, elev: 3 }),
        act: (S, u, f) => { H.lock.visible = false; S.actor("harriman", { x: -0.8, z: 0.4, expr: "smile", prop: "wave", wave: 0.5 + 0.5 * Math.sin(f * 0.3) }); S.actor("hill", { x: 0.8, z: 0.4, expr: "smile", prop: "wave", wave: 0.5 + 0.5 * Math.cos(f * 0.3), flip: true });
          S.say("Truce.", W(12, "truce") - 4, 30, { x: 0, y: AH + 0.9, z: 0.5, w: 0.8, h: 0.4 }); } },
      // 23 · and let them off the hook: Pete exhales
      { set: "floor", word: [12, "let"], lead: 2, light: "interior", cam: CAM.fit([1.0, AH - 0.05, 1.6], { h: 1.0, a0: -6, a1: 2, elev: 1, push: 0.12 }), coc: 9,
        act: (S, u, f) => { board("1000"); S.actor("pete", { x: 1.0, z: 1.6, expr: "relief_open", prop: "up" }); S.pop("puff", W(12, "hook."), 16, { x: 1.0, y: AH + 0.1, z: 1.9, w: 0.6, h: 0.5 }); } },
      // 24 · and the railroad? the same train, calm, at sunset
      { set: "plains", beat: 13, trans: "whip", light: "sunset", cam: CAM.fit([0, 2.0, 0.4], { w: 6.6, a0: -16, a1: -8, elev: 6 }),
        act: (S, u, f) => { H.train.position.x = -0.8 + (f - S.a) * 0.03; S.fx("smoke", { x: H.train.position.x + 2.1, y: 3.6, z: 0, w: 1.2, h: 1.2 });
          H.sameTag.visible = f >= W(13, "Exactly"); } },
      // 25 · that thousand dollars wasn't a railroad's price: the empty chair, the price hanging over it
      { set: "chairs", beat: 14, trans: "dissolve", light: K.backdrop("#2a1a3a"), cam: CAM.fit([0, 1.6, 0], { w: 3.2, a0: 14, a1: 4, elev: 6 }),
        act: (S, u, f) => { H.price1k.visible = true; H.price1k.position.y = 3.3 + 0.05 * Math.sin(f * 0.1); } },
      // 26 · it was the price of the last chair: Pete lunges, the $1,000 tag slams onto the chair
      { set: "chairs", word: [14, "It"], lead: 2, trans: "cut", light: K.backdrop("#2a1a3a"), cam: CAM.fit([0.2, 1.6, 0.3], { w: 3.0, a0: -8, a1: 2, elev: 4, push: 0.15 }),
        act: (S, u, f) => { const t = W(14, "chair."); H.price1k.visible = true; H.price1k.position.y = f < t - 6 ? 3.3 : E.lerp(3.3, 1.6, E.easeIn(E.prog(f, t - 6, t)));
          S.actor("pete", { x: 0.85, z: 0.7, expr: f < t ? "grin" : "dazed", mode: f < t ? "stroll" : "fall", phase: f * 0.08, prop: f < t ? "up" : null });
          S.kick(t, 0.09); S.pop("impact", t, 20, { x: 0, y: 1.6, z: 0.8, w: 1.1, h: 1.0, text: "SLAM!" }); } },
    ],
  };
};
