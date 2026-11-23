// "Goblin Gold" (Joseph de la Vega, Confusion de Confusiones, Amsterdam 1688) — film module.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const AH = 1.58;
  const H = {};
  const PI = Math.PI;
  const tx = (B, s, bg, fg, w = 1024, h = 256) => B.textTex(s, bg, fg, w, h);

  // a tall narrow Amsterdam canal house with a stepped gable, facing +z
  const canalHouse = (B, x, z, w, h, col, seed) => {
    const g = B.grp(x, 0, z, 0, 1);
    B.box(w, h, 3, "brick:" + col, 0, 0, -1.5, { in: g });
    const steps = 3;
    for (let i = 0; i < steps; i++) B.box(w * (1 - (i + 1) / (steps + 1.4)), 0.7, 3, "brick:" + col, 0, h + i * 0.7, -1.5, { in: g });
    B.box(0.5, 0.5, 0.4, "#f4efe2", 0, h + steps * 0.7, -0.1, { in: g });
    const rows = Math.floor((h - 1) / 1.6);
    for (let r = 0; r < rows; r++) for (const sx of [-0.28, 0.28]) {
      B.box(w * 0.3, 0.95, 0.06, "#f4efe2", sx * w, 0.9 + r * 1.6, 0.02, { in: g });
      B.box(w * 0.22, 0.75, 0.06, (seed + r) % 3 ? "#2a3a4a" : "#ffd98a", sx * w, 1.0 + r * 1.6, 0.05, { in: g });
    }
    B.box(w * 0.3, 1.5, 0.08, "#3a2418", 0, 0, 0.03, { in: g });
    return g;
  };
  // a stock certificate slab
  const cert = (B, x, y, z, s, parent) => { const g = B.grp(x, y, z, 0, s, parent);
    B.box(1.4, 0.06, 0.9, "#f4e6c8", 0, 0, 0, { in: g }); B.box(1.2, 0.065, 0.06, "#c9a44a", 0, 0, 0.33, { in: g }); B.box(1.2, 0.065, 0.06, "#c9a44a", 0, 0, -0.33, { in: g }); return g; };

  const MER = ["m1", "m2", "m3", "m4"];
  const QUAY = [[-1.6, -0.6], [1.7, -0.7], [-2.4, 0.4], [2.5, 0.3]];
  const mob = (S, f, expr = "shock", props = ["up", "point"]) => QUAY.forEach(([x, z], i) => S.actor(MER[i], { key: "q" + i, x: x + 0.05 * Math.sin(f * 0.3 + i), z,
    expr: Array.isArray(expr) ? expr[i % expr.length] : expr, prop: props[i % props.length], tilt: 4 * Math.sin(f * 0.28 + i), look: -x * 0.2 }));
  const GEMS = ["red", "coal", "diamond", "pebbles", "dew", "tears"];
  const gem = (k) => { for (const g of GEMS) H.gem[g].visible = g === k; };
  const phoneNum = (i) => { H.nums.forEach((p, j) => { p.visible = j === i; }); };

  return {
    cast: {
      piet: { jacket: "#2a2a34", pants: "#3a3030", boots: "#1a1418", hat: "tricorn", capColor: "#1a1a20", skin: "#f5c9a0", moustache: "#7a4a24", buttons: "#f4efe2" },
      vega: { jacket: "#3a2a4a", pants: "#2a2a34", boots: "#1a1418", hat: "wig", hair: "#2a1a14", skin: "#e8b48a", moustache: "#2a1a14", buttons: "#e8c44a" },
      philo: { jacket: "#6a5a4a", pants: "#4a4040", boots: "#2a1a14", hat: "hair", hair: "#eeeeee", skin: "#f3cfae", moustache: "#f0f0f0", buttons: "#c9a44a" },
      merchant: { jacket: "#8a2a2a", pants: "#3a3030", boots: "#1a1418", hat: "tophat", capColor: "#1a1a20", skin: "#f0c8a0", moustache: "#5a3418", buttons: "#e8c44a", build: "stout" },
      grub: { jacket: "#5a3a2a", pants: "#4a3a5a", boots: "#2a1a14", hat: "cap", cap: "#6a3a8a", skin: "#86b86a", build: "kid" },
      you: { jacket: "#3f6fb5", pants: "#3b3f52", boots: "#e8e8e8", hat: "hair", hair: "#5a3a24", skin: "#f5c9a0" },
      m1: { jacket: "#3a4a6a", pants: "#2a2a34", boots: "#1a1418", hat: "tophat", capColor: "#1a1a20", skin: "#f0c8a0", moustache: "#3a2418" },
      m2: { jacket: "#5a3a2a", pants: "#3a3030", boots: "#1a1418", hat: "tricorn", capColor: "#2a2a30", skin: "#e8b48a", buttons: "#e8c44a" },
      m3: { jacket: "#4a5a3a", pants: "#2a2a34", boots: "#1a1418", hat: "wig", hair: "#c8a060", skin: "#f3cfae" },
      m4: { jacket: "#6a2a3a", pants: "#2a2a34", boots: "#1a1418", hat: "tophat", capColor: "#2a2a30", skin: "#c99067", moustache: "#2a1a14" },
    },
    sets: {
      // the goblin's cave (metaphor): a glowing hoard, a pedestal where the treasure keeps changing shape
      cave: (B) => {
        B.set.stage({ floor: "#3a3048", back: "#1a1430" });
        for (let i = 0; i < 9; i++) B.prop.rock({ x: -5 + i * 1.25, z: -3.2 - (i % 2) * 0.8, r: 1.0 + (i % 3) * 0.35, col: "#4a4058", seed: i });
        for (const sx of [-1, 1]) for (let i = 0; i < 3; i++) B.prop.rock({ x: sx * (3.4 + i * 0.6), z: -1 + i * 1.2, r: 0.9, col: "#3a3048", seed: 20 + i });
        H.hoard = B.dyn(B.grp(-1.6, 0, -1.3, 0, 1));
        for (let i = 0; i < 26; i++) B.cyl(0.16, 0.16, 0.04, "#f2c14e", (Math.sin(i * 2.3)) * 0.9, 0.02 + (i % 5) * 0.05, Math.cos(i * 1.7) * 0.5, { in: H.hoard, rx: 0.3 * Math.sin(i), seg: 16 });
        B.ball(0.6, "#e8b83a", 0, 0, 0, { in: H.hoard, sy: 0.5 });
        for (let i = 0; i < 4; i++) B.ball(0.1, "#d0304a", -0.5 + i * 0.35, 0.28, 0.3, { in: H.hoard });
        B.box(0.9, 0.55, 0.55, "planks:#6a3a24", 0.9, 0, -0.2, { in: H.hoard }); B.box(0.95, 0.08, 0.6, "#c9a44a", 0.9, 0.55, -0.2, { in: H.hoard });
        H.coin = B.dyn(B.cyl(0.2, 0.2, 0.05, "#f2c14e", -1.2, 0.5, -0.8, { rx: PI / 2, seg: 20 }));
        B.prop.pedestal({ x: 1.0, z: -0.4, r: 0.45, h: 0.9, col: "#5a4a6a", trim: "#c9a44a" });
        H.gem = {};
        const top = [1.0, 0.95, -0.4];
        H.gem.red = B.dyn(B.grp(...top, 0, 1)); B.ball(0.2, "#e0304a", 0, 0.2, 0, { in: H.gem.red, sy: 0.85 }); B.ball(0.09, "#ff8a9a", -0.06, 0.28, 0.12, { in: H.gem.red });
        H.gem.coal = B.dyn(B.grp(...top, 0, 1)); B.prop.rock({ x: 0, z: 0, r: 0.24, col: "#24222a", seed: 5, in: H.gem.coal });
        B.ball(0.21, "#24222a", 0, 0.16, 0, { in: H.gem.coal, sy: 0.75 });
        H.gem.diamond = B.dyn(B.grp(...top, 0, 1)); B.cone(0.24, 0.26, "#bff4ff", 0, 0.02, 0, { in: H.gem.diamond, seg: 8 }).rotation.x = PI; B.cone(0.24, 0.12, "#e8fcff", 0, 0.28, 0, { in: H.gem.diamond, seg: 8 });
        H.gem.pebbles = B.dyn(B.grp(...top, 0, 1)); for (let i = 0; i < 4; i++) B.ball(0.08 + 0.02 * (i % 2), "#8a8a90", -0.15 + i * 0.1, 0.07, 0.06 * Math.sin(i * 2), { in: H.gem.pebbles, sy: 0.7 });
        H.gem.dew = B.dyn(B.grp(...top, 0, 1)); for (let i = 0; i < 3; i++) B.ball(0.07, "#9adcff", -0.1 + i * 0.1, 0.07, 0, { in: H.gem.dew, sy: 0.8 });
        H.gem.tears = B.dyn(B.grp(...top, 0, 1)); B.ball(0.1, "#6ab8f0", 0, 0.06, 0, { in: H.gem.tears, sx: 2.2, sy: 0.25, sz: 2.2 });
        for (const g of GEMS) H.gem[g].visible = false;
        H.glass = B.dyn(B.grp(-0.6, 0, 0.3, 0, 1)); B.prop.hourglass({ x: 0, z: 0, size: 1.6, in: H.glass }); H.glass.visible = false;
        H.ptag = B.dyn(B.plate(1.3, 0.32, tx(B, "PATIENCE", "#f4efe2", "#2a3a5a", 1024, 252), -0.6, 1.85, 0.4, { d: 0.03, edge: "#c9a44a" })); H.ptag.visible = false;
        H.bag = B.dyn(B.grp(0.9, 0, 0.3, 0, 1)); B.prop.moneyBag({ x: 0, z: 0, size: 1.5, in: H.bag }); H.bag.visible = false;
        H.mtag = B.dyn(B.plate(1.1, 0.32, tx(B, "MONEY", "#f4efe2", "#2f6a3a", 1024, 298), 0.9, 1.75, 0.5, { d: 0.03, edge: "#c9a44a" })); H.mtag.visible = false;
        H.chest = B.dyn(B.grp(0.1, 0, 0.6, 0, 1)); B.box(0.9, 0.5, 0.5, "planks:#6a3a24", 0, 0, 0, { in: H.chest }); B.box(0.95, 0.07, 0.55, "#c9a44a", 0, 0.5, 0, { in: H.chest }); H.chest.visible = false;
        B.lamp(-1.6, 1.6, -0.6, "#ffcf60", 6, 7); B.lamp(1.0, 2.4, 0.6, "#c8a8ff", 4, 7);
      },
      // Amsterdam 1688: a canal of stepped-gable houses, a bridge, ships, the colonnaded exchange at the end
      canal: (B) => {
        B.box(80, 0.1, 6, "cobble", 0, 0, 1.5);
        B.box(80, 0.6, 0.3, "brick:#7a3a30", 0, -0.5, -1.55);
        B.box(80, 0.05, 7, "water", 0, -0.55, -5.0);
        B.box(80, 0.1, 4, "cobble", 0, 0, -10.5);
        const cols = ["#8a3a2a", "#6a3a30", "#a5503a", "#5a4a44", "#9a5a3a", "#7a4a3a", "#4a3a3a", "#b8683a"];
        let x = -16; let i = 0; while (x < 16) { const w = 2.0 + ((i * 7) % 3) * 0.4; canalHouse(B, x + w / 2, -9.2, w, 6.5 + ((i * 5) % 4) * 0.9, cols[i % cols.length], i); x += w + 0.05; i++; }
        for (const tx0 of [-7, -2.5, 2.5, 7]) B.prop.tree({ x: tx0, z: -8.5, kind: "oak" });
        // hump bridge
        for (let k = 0; k < 9; k++) { const a = (k - 4) / 4; B.box(0.85, 0.25, 2.4, "brick:#8a4a3a", 9 + (k - 4) * 0.8, 0.6 * (1 - a * a) - 0.1, -5.0, {}); }
        // the exchange: colonnade and tower at the far end
        H.beurs = B.grp(-12.5, 0, -5.6, PI / 2, 1);
        B.box(9, 4.2, 4, "brick:#a5503a", 0, 0, -2.4, { in: H.beurs }); for (let k = 0; k < 7; k++) B.cyl(0.18, 0.18, 3.2, "marble", -3.6 + k * 1.2, 0, -0.2, { in: H.beurs, seg: 12 });
        B.box(9, 0.5, 0.6, "#e8e0d0", 0, 3.2, -0.2, { in: H.beurs }); B.box(1.6, 3.2, 1.6, "brick:#a5503a", 0, 4.2, -2.4, { in: H.beurs }); B.cone(1.1, 1.8, "#3a5a6a", 0, 7.4, -2.4, { in: H.beurs, seg: 8 });
        B.plate(2.4, 0.5, tx(B, "BEURS", "#2a3a4a", "#f2c14e", 1024, 213), 0, 3.0, 0.15, { in: H.beurs, d: 0.04 });
        H.ship = B.dyn(B.grp(3.0, -0.5, -5.2, 0, 0.42)); B.prop.ship({ x: 0, z: 0, flag: "EAST INDIA", in: H.ship });
        B.prop.lampPost({ x: -4.5, z: -1.0 }); B.prop.lampPost({ x: 4.5, z: -1.0 });
        B.prop.barrel({ x: 3.4, z: 2.4 }); B.prop.crate({ x: -3.5, z: 2.6, label: "SPICE" });
        H.sign = B.prop.sign({ x: -0.2, y: 0.4, z: -1.2, w: 2.2, h: 0.5, text: "EAST INDIA COMPANY", bg: "#f4efe2", fg: "#2a3a5a", post: true });
      },
      // de la Vega's study at night: candle, quill, the manuscript
      study: (B) => {
        B.set.room({ style: "library", w: 7, d: 6, h: 3.6, windows: [2.0], door: false });
        B.prop.desk({ x: 0, z: -1.3, w: 2.0 });
        B.prop.lamp({ x: -0.75, y: 0.78, z: -1.4, col: "#ffcf70" });
        H.book = B.dyn(B.grp(0.15, 0.81, -1.15, 0, 1));
        B.box(0.5, 0.05, 0.62, "#f4efe2", -0.26, 0, 0, { in: H.book, rz: 0.06 }); B.box(0.5, 0.05, 0.62, "#f4efe2", 0.26, 0, 0, { in: H.book, rz: -0.06 }); B.box(1.08, 0.03, 0.66, "#6a2a2a", 0, -0.02, 0, { in: H.book });
        for (let r = 0; r < 5; r++) B.box(0.36, 0.005, 0.02, "#3a2a20", 0.26, 0.06, -0.2 + r * 0.1, { in: H.book });
        H.page = B.dyn(B.grp(-0.26, 0.06, 0, 0, 1, H.book)); B.box(0.48, 0.01, 0.6, "#ece2c8", 0, 0, 0, { in: H.page });
        H.quill = B.dyn(B.grp(0.5, 0.9, -1.0, 0, 1)); B.cone(0.05, 0.5, "#f4efe2", 0, 0, 0, { in: H.quill }).rotation.z = -0.5;
        H.cover = B.dyn(B.grp(0, 0, 0, 0, 1)); B.box(0.7, 0.08, 0.95, "#6a2a2a", 0, 0.82, -1.15, { in: H.cover });
        B.plate(0.6, 0.16, tx(B, "CONFUSION", "#6a2a2a", "#f2c14e", 1024, 273), 0, 0.91, -1.37, { in: H.cover, rx: -PI / 2, d: 0.005 }); B.plate(0.6, 0.12, tx(B, "DE CONFUSIONES", "#6a2a2a", "#f2c14e", 1024, 205), 0, 0.91, -1.21, { in: H.cover, rx: -PI / 2, d: 0.005 }); B.plate(0.3, 0.1, tx(B, "1688", "#6a2a2a", "#f4efe2", 512, 170), 0, 0.91, -0.95, { in: H.cover, rx: -PI / 2, d: 0.005 }); H.cover.visible = false;
        H.rule = {}; for (const n of [1, 2, 3, 4]) { H.rule[n] = B.dyn(B.plate(0.42, 0.2, tx(B, "RULE " + n, "#ece2c8", "#6a2a2a", 512, 244), 0.26, 0.88, -1.12, { rx: -PI / 2 + 0.05, d: 0.003 })); H.rule[n].visible = false; }
        B.prop.shelf({ x: -2.3, z: -2.75, w: 1.8 }); B.prop.globe({ x: 2.6, z: -2.2 }); B.prop.rug({ x: 0, z: 0, w: 3, d: 2, col: "#6a2a3a" });
        B.prop.poster({ x: 0.9, y: 1.6, z: -2.95, w: 1.2, h: 0.8, text: "1688", bg: "#e8d8b0", fg: "#5a2a1a" });
      },
      // metaphor: a gold stage where a stack of shares lifts you up to a crown, then topples
      summit: (B) => {
        B.set.stage({ floor: "#e8d8a8", back: "#3a6a8a" });
        H.stack = []; for (let i = 0; i < 14; i++) H.stack.push(B.dyn(cert(B, 0.04 * Math.sin(i * 2.1), 0.03 + i * 0.12, 0.03 * Math.cos(i * 1.7), 1, undefined)));
        H.crown = B.dyn(B.grp(0, 3, 0, 0, 1)); B.cyl(0.2, 0.2, 0.14, "#f2c14e", 0, 0, 0, { in: H.crown, seg: 20 }); for (let k = 0; k < 5; k++) B.cone(0.05, 0.14, "#f2c14e", 0.17 * Math.sin(k * 1.257), 0.14, 0.17 * Math.cos(k * 1.257), { in: H.crown });
        B.ball(0.04, "#e0304a", 0, 0.08, 0.2, { in: H.crown }); H.crown.visible = false;
        for (const sx of [-2.6, 2.6]) B.prop.pedestal({ x: sx, z: -1.8, r: 0.4, h: 1.2, col: "#f4efe2" });
        B.lamp(0, 4, 2, "#fff0c8", 6, 9);
      },
      // today: a modern kitchen at night, the phone on the table
      kitchen: (B) => {
        B.set.room({ style: "kitchen", w: 7, d: 6, h: 3.2, windows: [-2.2], door: false });
        B.prop.table({ x: 0, z: -0.6, w: 1.4, d: 0.9 });
        B.prop.clock({ x: 1.6, y: 2.4, z: -2.95, r: 0.32 }); B.prop.plant({ x: 2.6, z: -2.2 });
        H.mug = B.cyl(0.07, 0.06, 0.14, "#e8e8e8", -0.45, 0.78, -0.6, {});
        H.phone = B.grp(0.15, 0.79, -0.55, 0, 1); B.box(0.34, 0.025, 0.62, "#1a1a20", 0, 0, 0, { in: H.phone });
        H.nums = [["+12%", "#3fbf6a"], ["−9%", "#e04a4a"], ["+4%", "#3fbf6a"], ["−15%", "#e04a4a"], ["+8%", "#3fbf6a"], ["−6%", "#e04a4a"]].map(([s, c]) => {
          const p = B.dyn(B.plate(0.28, 0.15, tx(B, s, "#f4f6fa", c, 1024, 548), 0, 0.034, 0.02, { in: H.phone, rx: -PI / 2, d: 0.002 })); p.visible = false; return p; });
        B.plate(0.3, 0.56, "#f4f6fa", 0, 0.028, 0, { in: H.phone, rx: -PI / 2, d: 0.002 }); B.plate(0.26, 0.06, tx(B, "MY SHARES", "#f4f6fa", "#2a3a5a", 1024, 236), 0, 0.034, -0.17, { in: H.phone, rx: -PI / 2, d: 0.002 });
        B.lamp(0.15, 1.2, -0.3, "#bfe0ff", 3, 3);
      },
    },
    shots: [
      // 0 · hook: a goblin's hand snatches a gold coin off the hoard on frame 0
      { set: "cave", f: 0, light: K.backdrop("#2a1f3a"), cam: CAM.fit([-1.2, 0.9, -0.6], { w: 2.4, a0: -24, a1: -6, elev: 8, push: 0.2 }),
        act: (S, u, f) => { const k = E.back(E.prog(f, 0, 14)); H.coin.position.set(E.lerp(-1.2, -0.55, k), 0.5 + 0.5 * k, -0.8 + 0.6 * k); H.coin.rotation.z = f * 0.4;
          S.actor("grub", { x: -0.4, z: -0.1, expr: "grin", prop: "up" }); S.pop("sparks", 2, 16, { x: -0.6, y: 1.05, z: -0.1, w: 0.7, h: 0.7 }); S.pop("coin", 6, 18, { x: -1.0, y: 1.2, z: -0.4, w: 0.3, h: 0.3, rise: 0.5 }); } },
      // 1 · the first book about the stock market slams onto the desk
      { set: "study", word: [0, "market"], trans: "whip", light: "lamp", steady: true, cam: CAM.fit([0, 0.9, -1.15], { w: 1.3, a0: 0, a1: 0, elev: 60, push: 0.1 }), coc: 9,
        act: (S, u, f) => { H.cover.visible = true; H.book.visible = false; const t = W(0, "market") + 3; H.cover.position.y = 0.4 * (1 - E.easeIn(E.prog(f, S.a, t))); S.kick(t, 0.05); S.pop("puff", t, 14, { x: 0.5, y: 0.95, z: -1.0, w: 0.5, h: 0.4 }); } },
      // 2 · your profits are goblin treasure: the goblin hugs the hoard
      { set: "cave", word: [0, "profits"], trans: "zoom", light: K.backdrop("#2a1f3a"), cam: CAM.fit([-1.0, 0.8, -0.4], { w: 2.6, a0: 18, a1: 8, elev: 6 }),
        act: (S, u, f) => { S.actor("grub", { x: -0.9, z: -0.1, expr: "laugh", prop: "hold", tilt: 5 * Math.sin(f * 0.4) }); S.say("Mine!", W(0, "goblin") - 2, 34, { x: -0.6, y: 1.65, z: 0.0, w: 0.7, h: 0.36 });
          S.pop("glow", W(0, "treasure."), 30, { x: -1.6, y: 0.5, z: -1.0, w: 1.8, h: 1.0, pop: false }); } },
      // 3 · Amsterdam, sixteen eighty-eight: the canal in morning light
      { set: "canal", beat: 1, trans: "whip", light: "golden", cam: CAM.fit([0, 3.0, -6], { w: 14, a0: -12, a1: 4, elev: 8, push: 0.08 }),
        act: (S, u, f) => { H.ship.position.x = 3.0 - (f - S.a) * 0.012; mob(S, f, ["grin", "neutral", "smile", "stern"], ["point", "hold", "chin", "shrug"]);
          S.fx("label", { x: 0, y: 5.2, z: -3.0, w: 6.0, h: 1.1, text: "AMSTERDAM · 1688", bg: "#f4efe2" }); } },
      // 4 · Joseph de la Vega writes by candlelight
      { set: "study", word: [1, "Joseph"], lead: 3, trans: "dissolve", light: "lamp", cam: CAM.fit([0.0, 1.3, -1.6], { w: 2.0, a0: 20, a1: 8, elev: 5, push: 0.1 }),
        act: (S, u, f) => { S.actor("vega", { x: 0.0, z: -2.05, expr: "smile_closed", prop: "paper", headTilt: 4 * Math.sin(f * 0.1) });
          H.quill.position.set(0.3 + 0.05 * Math.sin(f * 0.5), 0.9, -1.1); S.fx("label", { x: 0.0, y: 2.25, z: -1.5, w: 1.5, h: 0.3, text: "JOSEPH DE LA VEGA", bg: "#f4efe2" }); } },
      // 5 · a conversation: philosopher, merchant, shareholder argue on the quay
      { set: "canal", word: [1, "conversation"], lead: 3, trans: "whip", light: "golden", cam: CAM.fit([0, 1.4, 0.6], { w: 3.4, a0: -10, a1: 4, elev: 4 }),
        act: (S, u, f) => { S.actor("philo", { x: -1.1, z: 0.6, expr: "stern", prop: "chin" }); S.actor("merchant", { x: 0.05, z: 0.3, expr: "grin", prop: "point" }); S.actor("piet", { x: 1.15, z: 0.6, expr: "nervous", prop: "hold", flip: true });
          [["PHILOSOPHER", -1.1], ["MERCHANT", 0.05], ["SHAREHOLDER", 1.15]].forEach(([s, x], i) => S.pop("label", S.a + 3 + i * 6, 60, { x, y: 2.35, z: 0.7, w: 0.95, h: 0.22, text: s, bg: "#f4efe2", hold: true })); } },
      // 6 · about East India Company shares: the ship and the share certificate
      { set: "canal", word: [1, "East"], lead: 3, trans: "whip", light: "golden", cam: CAM.fit([0.8, 1.4, -1.8], { w: 3.8, a0: 16, a1: 8, elev: 5, push: 0.12 }),
        act: (S, u, f) => { H.ship.position.x = 2.4 - (f - S.a) * 0.01; S.actor("merchant", { x: 0.2, z: -0.6, expr: "grin", prop: "hold" });
          S.pop("paper", W(1, "shares.") - 4, 40, { x: 0.6, y: 1.5, z: -0.3, w: 0.8, h: 0.55, hold: true }); } },
      // 7 · imagine you're the shareholder
      { set: "canal", beat: 2, trans: "dissolve", light: "golden", cam: CAM.fit([1.0, AH - 0.2, 1.4], { h: 1.6, a0: -8, a1: 2, elev: 1, push: 0.14 }), coc: 10,
        act: (S, u, f) => { S.actor("piet", { x: 1.0, z: 1.4, expr: "smile", prop: "hold" }); S.pop("label", W(2, "shareholder:") - 4, 50, { x: 1.0, y: AH + 0.36, z: 1.5, w: 0.5, h: 0.2, text: "YOU", bg: "#ffd84a", hold: true });
          S.pop("arrow", W(2, "shareholder:"), 40, { x: 1.45, y: AH + 0.1, z: 1.5, w: 0.25, h: 0.35, dir: "down", col: "#ffd84a", hold: true }); } },
      // 8 · shares climb, you're a king: the stack of shares lifts you, a crown lands
      { set: "summit", word: [2, "shares"], trans: "whip", light: K.backdrop("#3a6a8a"), cam: CAM.fit([0, 1.9, 0], { w: 3.0, a0: -12, a1: 6, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const n = Math.round(E.lerp(3, 14, E.ss(E.prog(f, S.a, W(2, "king;"))))); H.stack.forEach((c, i) => { c.visible = i < n; }); const top = 0.09 + n * 0.12;
          S.actor("piet", { y: top, x: 0, z: 0, expr: f >= W(2, "king;") ? "laugh" : "grin", prop: "up" });
          const t = W(2, "king;"); H.crown.visible = f >= t - 6; H.crown.position.set(0, top + 1.95 + 0.6 * (1 - E.back(E.prog(f, t - 6, t))), 0.0); S.pop("stars", t, 18, { x: 0, y: top + 2.0, z: 0.2, w: 0.8, h: 0.6 });
          S.pop("arrow", S.a + 4, 40, { x: 1.0, y: 1.8, z: 0.3, w: 0.4, h: 0.7, dir: "up", hold: true }); } },
      // 9 · they fall, you're ruined: the stack topples
      { set: "summit", word: [2, "they"], trans: "smash", light: K.light("danger"), cam: CAM.fit([0, 1.2, 0], { w: 3.4, a0: 8, a1: -2, elev: 6 }),
        act: (S, u, f) => { const k = E.easeIn(E.prog(f, S.a, S.a + 14)); H.stack.forEach((c, i) => { c.position.x += k * (i - 7) * 0.12; c.position.y = Math.max(0.03 + (i % 3) * 0.07, c.position.y * (1 - k)); c.rotation.z = k * 0.4 * Math.sin(i * 3); });
          const r = W(2, "ruined."); S.actor("piet", { x: 0.1, z: 0.4, y: Math.max(0, 1.8 * (1 - k)), expr: f < r ? "shock" : "dazed", mode: f < r ? "stand" : "fall" });
          H.crown.visible = true; H.crown.position.set(0.9, Math.max(0.1, 2.5 - 3 * k), 0.6); S.kick(r, 0.07); S.pop("impact", r, 18, { x: 0, y: 1.3, z: 0.6, w: 1.1, h: 0.9, text: "RUINED" });
          S.pop("arrow", S.a + 2, 40, { x: -1.0, y: 1.8, z: 0.3, w: 0.4, h: 0.7, dir: "down", hold: true }); } },
      // 10 · so what advice does the book give? the manuscript opens, a page turns
      { set: "study", beat: 3, trans: "dissolve", light: "lamp", steady: true, cam: CAM.fit([0.15, 0.85, -1.15], { w: 1.4, a0: -10, a1: 6, elev: 50, push: 0.1 }), coc: 10,
        act: (S, u, f) => { H.page.rotation.z = -PI * E.ss(E.prog(f, S.a + 6, S.a + 30)); S.pop("question", W(3, "give?"), 30, { x: 0.5, y: 1.25, z: -0.9, w: 0.3, h: 0.4, hold: true }); } },
      // 11 · rule one: the merchant whispers a tip to Piet
      { set: "canal", beat: 4, trans: "whip", light: "day", cam: CAM.fit([0.4, 1.45, 0.8], { w: 2.4, a0: -16, a1: -6, elev: 3 }),
        act: (S, u, f) => { S.actor("merchant", { x: -0.25, z: 0.7, expr: "grin", prop: "point", headTilt: 8 }); S.actor("piet", { x: 0.95, z: 0.9, expr: "neutral", prop: "hold", flip: true });
          S.pop("label", S.a + 2, 60, { x: 0.35, y: 2.45, z: 0.9, w: 0.9, h: 0.3, text: "RULE 1", bg: "#ffd84a", hold: true }); S.say("Buy now!", S.a + 14, 30, { x: 0.1, y: AH + 0.75, z: 0.8, w: 0.9, h: 0.38 }); } },
      // 12 · never give anyone advice: the philosopher wags a finger, the merchant freezes
      { set: "canal", word: [4, "advice"], lead: 4, light: "day", cam: CAM.fit([-0.4, 1.45, 0.8], { w: 2.4, a0: 14, a1: 4, elev: 3, push: 0.1 }),
        act: (S, u, f) => { S.actor("philo", { x: -1.0, z: 0.8, expr: "stern", prop: "point" }); S.actor("merchant", { x: 0.15, z: 0.6, expr: "nervous", prop: "shrug", flip: true });
          S.say("Never.", S.a + 2, 36, { x: -1.0, y: AH + 0.7, z: 0.9, w: 0.8, h: 0.38 }); S.pop("exclaim", W(4, "sell."), 20, { x: 0.4, y: AH + 0.45, z: 0.7, w: 0.25, h: 0.35 }); } },
      // 13 · rule two: take your gain — coins into Piet's hands
      { set: "canal", beat: 5, trans: "whip", light: "golden", cam: CAM.fit([0.8, 1.4, 0.6], { w: 2.0, a0: 12, a1: 2, elev: 3 }),
        act: (S, u, f) => { S.actor("piet", { x: 0.8, z: 0.6, expr: "grin", prop: "hold" }); S.pop("label", S.a + 2, 60, { x: 0.8, y: 2.45, z: 0.7, w: 0.9, h: 0.3, text: "RULE 2", bg: "#ffd84a", hold: true });
          for (let q = 0; q < 3; q++) S.pop("coin", W(5, "gain,") - 2 + q * 4, 22, { x: 0.65 + q * 0.15, y: 1.35, z: 0.9, w: 0.25, h: 0.25, rise: -0.3 }); } },
      // 14 · don't mourn the profit you missed: the ship sails off behind, Piet shrugs and walks on
      { set: "canal", word: [5, "don't"], lead: 3, trans: "dissolve", light: "golden", cam: CAM.fit([0.8, 1.7, -2.0], { w: 4.6, a0: -18, a1: -8, elev: 5 }),
        act: (S, u, f) => { H.ship.position.x = 3.0 - (f - S.a) * 0.05; S.actor("piet", { x: E.lerp(0.4, 1.5, u), z: 0.2, expr: "smile_closed", mode: "stroll", phase: f * 0.06, prop: "shrug" });
          S.pop("arrow", W(5, "profit"), 40, { x: H.ship.position.x, y: 3.2, z: -5.0, w: 0.5, h: 0.9, dir: "up", hold: true }); S.say("Bye!", W(5, "missed.") - 2, 26, { x: 1.2, y: AH + 0.7, z: 0.3, w: 0.6, h: 0.34 }); } },
      // 15 · rule three: de la Vega writes it down
      { set: "study", beat: 6, trans: "whip", light: "lamp", cam: CAM.fit([0.1, 1.2, -1.5], { w: 1.6, a0: -14, a1: -4, elev: 14, push: 0.12 }), coc: 9,
        act: (S, u, f) => { S.actor("vega", { x: 0.0, z: -2.05, expr: "grin", prop: "paper" }); H.rule[3].visible = true; H.quill.position.set(0.35 + 0.04 * Math.sin(f * 0.6), 0.92, -1.05); } },
      // 16 · profits on the exchange are goblin treasure: push through into the cave
      { set: "cave", word: [6, "exchange"], trans: "zoom", light: K.backdrop("#2a1f3a"), cam: CAM.fit([-0.2, 1.0, -0.3], { w: 3.0, a0: -10, a1: 10, elev: 10, push: 0.15 }),
        act: (S, u, f) => { S.actor("grub", { x: -0.9, z: 0.1, expr: "laugh", prop: "up" }); gem("red"); S.pop("glow", W(6, "treasure."), 30, { x: 1.0, y: 1.2, z: -0.3, w: 0.8, h: 0.8, pop: false });
          S.pop("coin", S.a + 6, 22, { x: -1.4, y: 1.2, z: -0.6, w: 0.3, h: 0.3, rise: 0.4, spin: 3 }); } },
      // 17 · red jewels
      { set: "cave", beat: 7, light: K.backdrop("#2a1f3a"), steady: true, cam: CAM.fit([1.0, 1.15, -0.4], { w: 0.9, a0: -14, a1: -6, elev: 8, push: 0.1 }), coc: 11,
        act: (S, u, f) => { gem("red"); H.gem.red.rotation.y = f * 0.05; S.pop("sparks", S.a + 2, 16, { x: 1.0, y: 1.25, z: -0.1, w: 0.5, h: 0.5 }); } },
      // 18 · then coal: the goblin gasps
      { set: "cave", word: [7, "coal,"], lead: 3, light: K.backdrop("#221a30"), cam: CAM.fit([0.4, 1.0, -0.2], { w: 1.9, a0: 20, a1: 12, elev: 6 }),
        act: (S, u, f) => { gem("coal"); S.actor("grub", { x: 0.0, z: 0.2, expr: "shock", prop: "up", flip: true }); S.pop("puff", S.a + 2, 14, { x: 1.0, y: 1.15, z: -0.2, w: 0.5, h: 0.4 }); } },
      // 19 · diamonds, then pebbles
      { set: "cave", word: [7, "diamonds,"], lead: 3, light: K.backdrop("#2a1f3a"), steady: true, cam: CAM.fit([1.0, 1.15, -0.4], { w: 0.9, a0: 10, a1: 2, elev: 8 }), coc: 11,
        act: (S, u, f) => { const p = W(7, "pebbles,"); gem(f < p - 2 ? "diamond" : "pebbles"); H.gem.diamond.rotation.y = f * 0.08; S.pop("stars", S.a + 2, 16, { x: 1.0, y: 1.35, z: -0.1, w: 0.5, h: 0.4 }); S.pop("puff", p - 2, 12, { x: 1.0, y: 1.1, z: -0.1, w: 0.4, h: 0.3 }); } },
      // 20 · morning dew
      { set: "cave", word: [7, "morning"], lead: 3, trans: "dissolve", light: K.backdrop("#3a4a7a"), cam: CAM.fit([0.6, 1.0, -0.3], { w: 1.6, a0: -16, a1: -8, elev: 10 }), coc: 9,
        act: (S, u, f) => { gem("dew"); S.actor("grub", { x: 0.0, z: 0.2, expr: "nervous", prop: "hold", flip: true }); S.pop("glow", S.a + 2, 30, { x: 1.0, y: 1.05, z: -0.3, w: 0.6, h: 0.5, pop: false }); } },
      // 21 · then tears
      { set: "cave", word: [7, "then", 1], lead: 2, light: K.backdrop("#1a1a3a"), cam: CAM.fit([0.55, 0.9, -0.4], { w: 2.2, a0: 6, a1: -2, elev: 3, push: 0.1 }), coc: 10,
        act: (S, u, f) => { gem("tears"); S.actor("grub", { x: 0.0, z: -0.45, expr: "pained", headTilt: 6 * Math.sin(f * 0.2) });
          for (let q = 0; q < 4; q++) S.pop("sweat", S.a + 4 + q * 7, 16, { x: (q % 2 ? 0.16 : -0.16), y: 1.0 - 0.1 * q, z: -0.25, w: 0.16, h: 0.2, rise: -0.4, pop: false }); } },
      // 22 · you see: checking your bank app — whip to a kitchen today
      { set: "kitchen", beat: 8, trans: "whip", light: "night", cam: CAM.fit([0.1, 1.2, -0.2], { w: 2.0, a0: -18, a1: -8, elev: 6 }),
        act: (S, u, f) => { phoneNum(Math.floor((f - S.a) / 10) % 6); S.actor("you", { x: 0.0, z: 0.25, expr: ["nervous", "grin", "shock", "smile", "pained"][Math.floor((f - S.a) / 10) % 5], prop: "chin", look: 0.2 });
          S.pop("label", W(8, "ten"), 40, { x: 0.9, y: 2.2, z: -0.4, w: 0.9, h: 0.3, text: "10× A DAY", bg: "#ffd84a", hold: true }); } },
      // 23 · nothing you own changed, only the number did: the phone in close-up, the number flipping
      { set: "kitchen", word: [8, "nothing"], lead: 3, light: "night", steady: true, cam: CAM.fit([0.15, 0.8, -0.55], { w: 0.8, a0: 0, a1: 0, elev: 80, push: 0.08 }), coc: 10,
        act: (S, u, f) => { phoneNum(Math.floor((f - S.a) / 7) % 6); S.pop("word", W(8, "number"), 26, { x: 0.15, y: 1.05, z: -0.3, w: 0.5, h: 0.22, text: "?!", col: "#ffd84a", hold: true }); } },
      // 24 · and while he was still writing: the candle burns low
      { set: "study", beat: 9, trans: "whip", light: "lamp", cam: CAM.fit([0.0, 1.35, -1.6], { w: 1.8, a0: -18, a1: -8, elev: 4 }),
        act: (S, u, f) => { S.actor("vega", { x: 0.0, z: -2.05, expr: "neutral", prop: "paper" }); H.quill.position.set(0.3 + 0.05 * Math.sin(f * 0.7), 0.9, -1.1);
          S.pop("exclaim", W(9, "market") - 2, 20, { x: 0.45, y: AH + 0.55, z: -1.9, w: 0.25, h: 0.35 }); } },
      // 25 · the market crashed: storm over the canal, merchants panic
      { set: "canal", word: [9, "market"], lead: 1, trans: "smash", light: "storm", cam: CAM.fit([0, 1.6, 0.0], { w: 5.6, a0: 12, a1: 4, elev: 6, push: 0.1 }),
        act: (S, u, f) => { mob(S, f, ["shock", "pained"], ["up", "fists"]); S.actor("piet", { x: 0.2, z: 1.0, expr: "shock", prop: "up" }); const t = W(9, "crashed.");
          S.kick(t, 0.08); S.pop("impact", t, 20, { x: 0, y: 2.4, z: 0.8, w: 2.0, h: 1.5, text: "CRASH!" }); for (let q = 0; q < 3; q++) S.pop("page", S.a + 4 + q * 6, 30, { x: -1.5 + q * 1.4, y: 2.2, z: 0.5, w: 0.45, h: 0.45, pop: false, spin: 4 }); } },
      // 26 · rule four: calm again in the cave, Piet on a chest, the goblin juggling
      { set: "cave", beat: 10, trans: "dissolve", light: K.backdrop("#2a2a4a"), cam: CAM.fit([0.1, 1.2, 0.4], { w: 2.8, a0: -14, a1: -4, elev: 5 }),
        act: (S, u, f) => { H.chest.visible = true; S.actor("piet", { x: 0.1, z: 0.6, y: 0.5, expr: "stern", mode: "sit" }); S.actor("grub", { x: -0.85, z: 0.0, expr: "grin", prop: "up" });
          H.coin.position.set(-0.85, 1.45 + 0.3 * Math.abs(Math.sin(f * 0.15)), 0.1); S.pop("label", S.a + 2, 60, { x: 0.1, y: 2.45, z: 0.7, w: 0.9, h: 0.3, text: "RULE 4", bg: "#ffd84a", hold: true }); } },
      // 27 · you need two things: Piet holds up two fingers
      { set: "cave", word: [10, "two"], lead: 3, light: K.backdrop("#2a2a4a"), cam: CAM.fit([0.1, 1.5, 0.6], { h: 1.5, a0: 6, a1: 0, elev: 1, push: 0.12 }), coc: 10,
        act: (S, u, f) => { H.chest.visible = true; S.actor("piet", { x: 0.1, z: 0.6, y: 0.5, expr: "smile", mode: "sit", prop: "up" }); S.pop("word", W(10, "two"), 30, { x: 0.35, y: 1.85, z: 0.75, w: 0.35, h: 0.35, text: "2", col: "#ffd84a", hold: true }); } },
      // 28 · patience: a giant hourglass thumps down beside him
      { set: "cave", beat: 11, trans: "cut", light: K.backdrop("#2a2a4a"), cam: CAM.fit([0.2, 1.1, 0.4], { w: 2.8, a0: 10, a1: 2, elev: 5 }),
        act: (S, u, f) => { H.chest.visible = true; const t = W(11, "Patience.") + 3; H.glass.visible = true; H.glass.position.y = 1.6 * (1 - E.easeIn(E.prog(f, S.a, t))); H.ptag.visible = f >= t;
          S.actor("piet", { x: 0.1, z: 0.6, y: 0.5, expr: "smile_closed", mode: "sit" }); S.actor("grub", { x: 1.4, z: 0.0, expr: "nervous", prop: "hold", flip: true }); S.kick(t, 0.05); S.pop("puff", t, 14, { x: -0.6, y: 0.2, z: 0.5, w: 0.7, h: 0.4 }); } },
      // 29 · and money: the money bag slams down, the goblin flattened — finale on the last word
      { set: "cave", word: [11, "money."], lead: 6, light: K.backdrop("#2a2a4a"), cam: CAM.fit([0.3, 1.1, 0.4], { w: 3.0, a0: -4, a1: 4, elev: 6, push: 0.15 }),
        act: (S, u, f) => { H.chest.visible = true; H.glass.visible = true; H.glass.position.y = 0; H.ptag.visible = true; const t = W(11, "money.");
          H.bag.visible = true; H.bag.position.y = 2.2 * (1 - E.easeIn(E.prog(f, S.a, t))); H.mtag.visible = f >= t;
          S.actor("piet", { x: 0.1, z: 0.6, y: 0.5, expr: f < t ? "smile" : "laugh", mode: "sit" }); S.actor("grub", { x: 1.45, z: 0.1, expr: f < t ? "shock" : "dazed", mode: f < t ? "stand" : "fall", flip: true });
          S.kick(t, 0.1); S.pop("impact", t, 22, { x: 0.9, y: 1.45, z: 1.2, w: 1.0, h: 0.9, text: "THUD!" }); S.pop("stars", t + 2, 26, { x: 1.45, y: 0.6, z: 0.4, w: 0.7, h: 0.5 }); } },
    ],
  };
};
