// "Why You Sell Your Winners" (Odean 1998: 10,000 discount-broker accounts, 1987-1993, the disposition effect) — film module.
// Gary is a fictional illustrative investor; the economist is never shown.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const AH = 1.6;
  const H = {};
  const tx = (B, s, bg, fg, w = 1024, h = 256) => B.textTex(s, bg, fg, w, h);
  const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  // a sunflower (the winner) and a wilted weed in a pot (the loser)
  const sunflower = (B, x, z, s = 1) => {
    const g = B.dyn(B.grp(x, 0, z, 0, s));
    B.cyl(0.05, 0.06, 1.9, "#4f8a3a", 0, 0, 0, { in: g, seg: 8 });
    for (const [lx, ly, r] of [[-0.22, 0.8, 0.6], [0.22, 1.2, -0.6]]) B.box(0.36, 0.04, 0.18, "#5aa04a", lx, ly, 0, { in: g, rz: r });
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; B.ball(0.14, "#f2c14e", Math.cos(a) * 0.36, 2.0 + Math.sin(a) * 0.36, 0.02, { in: g, sy: 0.6 }); }
    B.cyl(0.26, 0.26, 0.1, "#6a3a1c", 0, 2.0, 0.02, { in: g, rx: Math.PI / 2, seg: 24 });
    B.plate(0.5, 0.24, tx(B, "UP", "#2f8a4a", "#f4efe2", 512, 246), 0.35, 1.0, 0.08, { in: g, d: 0.02, edge: "#f4efe2" });
    return g;
  };
  const weed = (B, x, y, z, s = 1) => {
    const g = B.dyn(B.grp(x, y, z, 0, s));
    B.cyl(0.18, 0.13, 0.3, "#b8643a", 0, 0, 0, { in: g, seg: 14 });
    B.cyl(0.02, 0.02, 0.45, "#7a6a3a", 0, 0.3, 0, { in: g, rz: 0.5 });
    B.ball(0.08, "#6a5a3a", -0.2, 0.68, 0, { in: g });
    B.box(0.18, 0.03, 0.08, "#7a6a3a", -0.05, 0.5, 0.02, { in: g, rz: -0.9 });
    B.plate(0.32, 0.15, tx(B, "DOWN", "#c0353a", "#f4efe2", 512, 240), 0, 0.15, 0.19, { in: g, d: 0.01 });
    return g;
  };
  const rocket = (B, x, z) => {
    const g = B.dyn(B.grp(x, 0, z, 0, 1));
    B.cyl(0.42, 0.42, 2.6, "#f4efe2", 0, 0.5, 0, { in: g, seg: 20 });
    for (const y of [1.1, 2.3]) B.cyl(0.43, 0.43, 0.16, "#c0353a", 0, y, 0, { in: g, seg: 20 });
    B.cone(0.42, 1.0, "#c0353a", 0, 3.1, 0, { in: g, seg: 20 });
    for (let i = 0; i < 3; i++) { const a = (i / 3) * Math.PI * 2 + 0.5; B.box(0.06, 0.8, 0.5, "#c0353a", Math.sin(a) * 0.45, 0.4, Math.cos(a) * 0.45, { in: g, ry: a }); }
    B.ball(0.16, "#7ac8ff", 0, 2.7, 0.36, { in: g });
    B.plate(0.8, 0.28, tx(B, "WINNER", "#2f8a4a", "#f4efe2", 768, 269), 0, 1.6, 0.44, { in: g, d: 0.02 });
    return g;
  };

  return {
    cast: {
      gary: { jacket: "#2a9d8f", pants: "#3b3f52", boots: "#2a1a14", hat: "cap", cap: "#e76f51", capColor: "#e76f51", skin: "#f3c9a4", buttons: "#f2c14e" },
      garyCoat: { jacket: "#7a4a8a", pants: "#3b3f52", boots: "#2a1a14", hat: "beanie", cap: "#e76f51", pom: "#f4efe2", skin: "#f3c9a4", buttons: "#f2c14e" },
      taxman: { jacket: "#4a4e58", pants: "#3a3d46", boots: "#1a1418", hat: "bowler", capColor: "#1f1a18", skin: "#efc8a6", moustache: "#5a4a3a", buttons: "#c9a44a" },
      clerk1: { jacket: "#f4efe2", pants: "#2e3240", boots: "#1a1418", hat: "hair", hair: "#3a2418", skin: "#c99067", buttons: "#2f5a8a" },
      clerk2: { jacket: "#d88aa8", pants: "#2e3240", boots: "#1a1418", hat: "hair", hair: "#d8a84a", dress: "#d88aa8", skin: "#f5c9a0" },
      rider: { jacket: "#c8a03a", pants: "#3a3a44", boots: "#2a1a14", hat: "hair", hair: "#2a201a", skin: "#e8b48a" },
    },
    sets: {
      // Gary's back garden on a summer morning: picket fence, a sunflower labelled UP, a wilted weed labelled DOWN
      garden: (B) => {
        B.ground("grass", 200, 200);
        B.facade({ style: "village", w: 7, x: 0, z: -9, seed: 4, col: "#e8d8b0", sign: "" });
        B.prop.fence({ x: 0, z: -4.2, len: 9 });
        B.box(3.2, 0.12, 1.4, "dirt", 0, 0.0, -1.6);
        H.flower = sunflower(B, -0.7, -1.6);
        H.weed = weed(B, 0.75, 0.0, -1.5);
        H.can = B.dyn(B.grp(0.75, 0, -1.0, 0, 1)); B.cyl(0.14, 0.14, 0.28, "metal:#5a8ac0", 0, 0, 0, { in: H.can, seg: 14 }); B.cyl(0.025, 0.025, 0.35, "metal:#5a8ac0", 0.2, 0.2, 0, { in: H.can, rz: -1.0 });
        H.compost = B.dyn(B.grp(-2.4, 0, -2.4, 0, 1)); B.box(1.0, 0.5, 0.7, "planks:#7a5a3a", 0, 0, 0, { in: H.compost }); B.plate(0.8, 0.22, tx(B, "COMPOST", "#3a2a1a", "#f4efe2", 768, 211), 0, 0.3, 0.36, { in: H.compost, d: 0.01 });
        for (const [x, z] of [[-4, -6], [4.5, -6.5], [-5.5, -2]]) B.prop.tree({ x, z, kind: "oak" });
        B.prop.bush({ x: 3.0, z: -3.4 });
      },
      // 1990s discount brokerage branch: blue carpet, beige monitors, a tower of trade records
      office: (B) => {
        B.set.room({ style: "office", wall: "plaster:#c8d4dc", floor: "carpet:#3f5a8a", w: 9, d: 7, h: 3.4, windows: [-3.0], door: false });
        B.prop.sign({ x: 0, y: 2.55, z: -3.42, text: "DISCOUNT BROKER", bg: "#1f3a6a", fg: "#f4efe2", w: 3.0, h: 0.55, edge: "#c9a44a" });
        for (const x of [-2.6, 2.6]) { B.prop.desk({ x, z: -2.2, w: 1.6, col: "#d8d0c0" }); B.box(0.55, 0.45, 0.45, "#e8e2d2", x, 0.78, -2.3); B.plate(0.42, 0.32, "glass:#2a6a5a:lit", x, 1.02, -2.07, { d: 0.01 }); B.prop.chair({ x, z: -1.6 }); }
        H.tower = B.dyn(B.grp(0, 0, -2.0, 0, 1));
        for (let i = 0; i < 10; i++) B.box(1.1 - (i % 2) * 0.06, 0.22, 0.8, i % 3 === 0 ? "#efe8d6" : "#f8f4ea", (i % 2) * 0.03, i * 0.23, 0, { in: H.tower, ry: (i % 3 - 1) * 0.06 });
        B.plate(1.0, 0.3, tx(B, "TRADES", "#f4efe2", "#241726", 1024, 307), 0, 1.15, 0.42, { in: H.tower, d: 0.01 });
        for (const x of [-3.9, 3.9]) for (let j = 0; j < 4; j++) B.box(0.7, 0.36, 0.6, "metal:#8a929a", x, j * 0.38, -3.1);
        H.bars = B.prop.bars3d({ x: 0, z: -0.6, vals: [1.0, 0.66], cols: ["#4fd18b", "#ff5a5a"], bw: 0.7, gap: 0.5, h: 1.9 });
        H.barTags = B.dyn(B.grp(0, 0, -0.18, 0, 1));
        B.plate(0.85, 0.26, tx(B, "WINNERS", "#2f8a4a", "#f4efe2", 768, 235), -0.6, 0.12, 0, { in: H.barTags, d: 0.01 });
        B.plate(0.85, 0.26, tx(B, "LOSERS", "#c0353a", "#f4efe2", 768, 235), 0.6, 0.12, 0, { in: H.barTags, d: 0.01 });
        B.prop.lamp({ kind: "hang", x: 0, y: 3.4, z: -1.6, glow: "#fff2d0" });
      },
      // Gary's living room, 1990s: mustard wallpaper, chunky TV, two little monitors on the table and a pile of bills
      home: (B) => {
        B.set.room({ style: "home", wall: "wallpaper:#c8a04a", floor: "carpet:#8a4a3a", w: 7, d: 6, h: 3.2, windows: [2.2], door: false });
        B.prop.table({ x: 0, z: -1.6, w: 1.9, d: 0.9 });
        H.up = B.prop.screen({ x: -0.48, y: 0.78, z: -1.85, w: 0.72, h: 0.5, y0: 0.06, stand: true, label: "ROCKET", line: "#4fd18b", curve: (x) => 0.12 + 0.8 * x * x });
        H.dn = B.prop.screen({ x: 0.48, y: 0.78, z: -1.85, w: 0.72, h: 0.5, y0: 0.06, stand: true, label: "DUD", line: "#ff5a5a", down: true, curve: (x) => 0.85 - 0.7 * x });
        B.box(1.0, 0.75, 0.6, "#3a3a40", -2.4, 0, -2.6); B.plate(0.8, 0.55, "glass:#5a8a9a:lit", -2.4, 0.42, -2.29, { d: 0.01 });
        H.bills = [];
        for (let i = 0; i < 6; i++) H.bills.push(B.dyn(B.plate(0.34, 0.24, tx(B, i % 2 ? "BILL" : "RENT", "#f4efe2", "#c0353a", 512, 361), -0.75 + (i % 3) * 0.12, 0.8 + i * 0.01, -1.3 + (i % 2) * 0.05, { d: 0.005, rx: -Math.PI / 2 })));
        B.prop.lamp({ kind: "floor", x: 2.6, z: -2.4, glow: "#ffd890" });
        B.prop.plant({ x: -3.0, z: -1.2 });
      },
      // a desert launch pad at golden hour: the WINNER rocket and a grey LOSER lump
      launch: (B) => {
        B.set.landscape({ kind: "desert", road: false, hills: true, seed: 11 });
        B.cyl(1.6, 1.7, 0.2, "concrete:#b8b0a0", 0.8, 0, -3.0, { seg: 24 });
        H.rocket = rocket(B, 0.8, -3.0);
        B.box(0.12, 4.2, 0.12, "metal:#8a5a3a", -0.5, 0, -3.6); B.box(1.0, 0.1, 0.1, "metal:#8a5a3a", -0.1, 3.0, -3.6);
        H.dud = B.dyn(B.grp(-1.7, 0, -1.8, 0, 1)); B.ball(0.5, "concrete:#8a8a90", 0, 0.3, 0, { in: H.dud, sy: 0.6 });
        B.plate(0.66, 0.24, tx(B, "LOSER", "#c0353a", "#f4efe2", 768, 279), 0, 0.42, 0.46, { in: H.dud, d: 0.01 });
        H.stamp = B.dyn(B.plate(0.9, 0.36, tx(B, "SOLD", "#f4efe2", "#c0353a", 768, 307), 0.8, 1.9, -2.5, { d: 0.02, edge: "#c0353a" }));
        for (const [x, z] of [[4, -6], [-4, -5]]) B.prop.tree({ x, z, kind: "cactus" });
      },
      // a rainy bus stop at night: brick street, lamp post, BUS STOP sign with a clock, empty road
      bus: (B) => {
        B.set.street({ style: "brick", signs: ["DINER", "LAUNDRY", "BOOKS", "PAWN"], lit: true, seed: 8 });
        B.prop.bench({ x: 0, z: -1.4 });
        B.prop.sign({ x: 1.2, z: -1.6, text: "BUS STOP", bg: "#f2c14e", fg: "#241726", w: 1.0, h: 0.45, post: true });
        B.box(0.08, 2.0, 0.08, "#3a3a40", 1.2, 0, -1.62);
        H.clock = B.prop.clock({ x: -1.0, y: 2.5, z: -1.6, r: 0.32 });
        B.box(0.08, 2.5, 0.08, "#3a3a40", -1.0, 0, -1.65);
        B.prop.lampPost({ x: -2.2, z: -1.2 });
        B.box(2.4, 0.06, 1.2, "#3a4a5a", 0, 2.3, -1.6);
      },
      // inside Gary's head: the pride control room
      mind: (B) => {
        const m = B.set.mind({ left: "I WAS WRONG", right: "I WAS RIGHT", eye: "#9ad8ff" }); H.levers = m.levers;
        H.bellL = B.dyn(B.plate(1.4, 0.34, tx(B, "SELL LOSER", "#c0353a", "#f4efe2", 1024, 249), -0.7, 1.5, -1.75, { d: 0.02 }));
        H.bellR = B.dyn(B.plate(1.5, 0.34, tx(B, "SELL WINNER", "#2f8a4a", "#f4efe2", 1024, 232), 0.9, 1.5, -1.75, { d: 0.02 }));
      },
      // a snowy December street: a giant wall calendar, the TAX OFFICE, a LOSSES bin
      dec: (B) => {
        B.ground("snow", 200, 200);
        B.facade({ style: "brick", w: 6, x: -1.5, z: -5, seed: 3, sign: "TAX OFFICE" });
        B.facade({ style: "shop", w: 5, x: 4.5, z: -5.5, seed: 6, sign: "TOYS" });
        H.cal = MONTHS.map((m, i) => B.dyn(B.plate(1.5, 1.2, tx(B, m, i === 11 ? "#c0353a" : "#f4efe2", i === 11 ? "#f4efe2" : "#241726", 768, 614), 1.9, 2.3, -2.4 + i * 0.002, { d: 0.03, edge: "#241726" })));
        B.box(0.1, 1.8, 0.1, "#3a3a40", 1.9, 0, -2.45);
        H.bin = B.dyn(B.grp(-0.6, 0, -1.6, 0, 1)); B.cyl(0.34, 0.28, 0.75, "metal:#5a6a72", 0, 0, 0, { in: H.bin, seg: 16 });
        B.plate(0.6, 0.2, tx(B, "LOSSES", "#241726", "#f4efe2", 768, 256), 0, 0.45, 0.33, { in: H.bin, d: 0.01 });
        H.dud = B.dyn(B.grp(0.3, 0, -1.2, 0, 0.5)); B.ball(0.5, "concrete:#8a8a90", 0, 0.3, 0, { in: H.dud, sy: 0.6 });
        H.taxbill = B.dyn(B.plate(1.3, 0.5, tx(B, "TAX BILL", "#f4efe2", "#241726", 1024, 394), 0, 1.6, -0.9, { d: 0.01, edge: "#c0353a" }));
        B.prop.tree({ x: -4, z: -3, kind: "pine" }); B.prop.lampPost({ x: 3.4, z: -1.8 });
      },
    },
    shots: [
      // 0 · frame 0: Gary yanks the blooming sunflower out of the ground
      { set: "garden", f: 0, light: "golden", cam: CAM.keys([[0, { p: [-0.9, 1.6, 2.6], t: [-0.7, 1.9, -1.6], fov: 44 }], [1, { p: [0.2, 1.3, 3.4], t: [-0.1, 1.3, -1.6], fov: 44 }]]),
        act: (S, u, f) => { const s = W(0, "sell"), k = E.back(E.prog(f, s - 4, s + 10)); H.flower.position.y = 0.9 * k; H.flower.rotation.z = 0.5 * k; H.flower.position.x = -0.7 - 0.5 * k;
          S.actor("gary", { x: -0.15, z: -1.0, expr: f < s ? "grin" : "laugh", prop: "up", tilt: -8 * k }); S.pop("puff", s, 18, { x: -0.7, y: 0.2, z: -1.4, w: 1.0, h: 0.6 }); S.pop("impact", s + 2, 14, { x: -1.6, y: 2.4, z: -1.4, w: 0.8, h: 0.8, text: "YANK!" }); } },
      // 1 · …and keep your worst: watering the wilted weed with love
      { set: "garden", word: [0, "keep"], lead: 3, trans: "dissolve", light: "golden", cam: CAM.fit([0.25, 1.05, -1.3], { w: 1.8, a0: 14, a1: 4, elev: 6, push: 0.12 }), coc: 9,
        act: (S, u, f) => { H.flower.visible = false; H.can.position.set(0.5, 0.85, -1.15); H.can.rotation.z = 0.5; S.actor("gary", { x: -0.15, z: -1.2, expr: "smile_closed", prop: "hold" });
          S.pop("heart", S.a + 6, 26, { x: 0.8, y: 1.15, z: -1.3, w: 0.3, h: 0.3 }); S.pop("label", W(0, "worst,"), 40, { x: 0.9, y: 0.75, z: -1.2, w: 0.6, h: 0.22, text: "WORST", col: "#c0353a" }); } },
      // 2 · …and feel smart doing it
      { set: "garden", word: [0, "feel"], lead: 2, trans: "whip", light: "golden", cam: CAM.fit([0, 1.4, -1.2], { w: 1.4, a0: -10, a1: 0, elev: 3, push: 0.1 }),
        act: (S, u, f) => { H.flower.visible = false; S.actor("gary", { x: 0, z: -1.2, expr: "grin", prop: "point" }); S.pop("stars", W(0, "smart"), 22, { x: 0.2, y: AH + 0.5, z: -1.1, w: 0.8, h: 0.5 });
          S.pop("word", W(0, "smart"), 26, { x: 0, y: AH + 0.75, z: -1.1, w: 0.9, h: 0.3, text: "GENIUS!", col: "#f2c14e" }); } },
      // 3 · the nineties: a discount brokerage branch
      { set: "office", beat: 1, trans: "whip", light: "office", cam: CAM.keys([[0, { p: [2.6, 2.6, 4.2], t: [0, 1.6, -2.6], fov: 46 }], [1, { p: [1.0, 1.9, 3.2], t: [0, 1.5, -2.6], fov: 46 }]]),
        act: (S, u, f) => { H.bars.grow(0); H.barTags.visible = false; S.actor("clerk1", { x: -2.6, z: -1.6, mode: "sit", expr: "neutral" }); S.actor("clerk2", { x: 2.6, z: -1.6, mode: "sit", expr: "smile" });
          S.pop("label", W(1, "seven"), 60, { x: 0, y: 3.05, z: -3.0, w: 1.2, h: 0.3, text: "1987-1993", hold: true }); } },
      // 4 · ten thousand accounts: the tower of paper grows
      { set: "office", word: [1, "ten"], lead: 4, light: "office", cam: CAM.fit([0, 1.5, -2.0], { h: 3.0, a0: -8, a1: 6, elev: 0, push: 0.1 }),
        act: (S, u, f) => { H.bars.grow(0); H.barTags.visible = false; H.tower.scale.y = 0.4 + 0.6 * E.back(E.prog(f, S.a, S.a + 20));
          S.pop("word", W(1, "ten"), 50, { x: 0, y: 2.45, z: -1.2, w: 1.4, h: 0.34, text: "10,000 ACCOUNTS", col: "#f2c14e", hold: true }); S.pop("paper", W(1, "broker.") - 4, 24, { x: 0, y: 2.0, z: -1.4, w: 1.6, h: 1.6 }); } },
      // 5 · meet Gary
      { set: "home", beat: 2, trans: "dissolve", light: "interior", cam: CAM.fit([0.4, 1.3, -1.8], { w: 2.7, a0: -16, a1: -6, elev: 5 }),
        act: (S, u, f) => { H.up.draw({ t: 1 }); H.dn.draw({ t: 1 }); S.actor("gary", { x: 0.9, z: -1.3, expr: "grin", wave: 0.5 + 0.5 * Math.sin(f * 0.3), prop: "wave" });
          S.pop("label", W(2, "Gary."), 40, { x: 0.3, y: AH + 0.45, z: -1.3, w: 0.6, h: 0.24, text: "GARY" }); } },
      // 6 · a rocket that's up and a dud that's down
      { set: "home", word: [2, "rocket"], lead: 4, light: "interior", steady: true, cam: CAM.fit([0, 1.1, -1.85], { w: 1.4, a0: 4, a1: -4, elev: 4, push: 0.1 }), coc: 10,
        act: (S, u, f) => { H.up.draw({ t: E.prog(f, W(2, "rocket"), W(2, "rocket") + 14) }); H.dn.draw({ t: E.prog(f, W(2, "dud"), W(2, "dud") + 14) });
          S.pop("arrow", W(2, "up"), 30, { x: -0.48, y: 1.55, z: -1.7, w: 0.3, h: 0.3, dir: "up" }); S.pop("arrow", W(2, "down."), 26, { x: 0.48, y: 1.55, z: -1.7, w: 0.3, h: 0.3, dir: "down" }); } },
      // 7 · Gary needs cash: bills rain on the table
      { set: "home", beat: 3, trans: "whip", light: "interior", cam: CAM.fit([0.35, 1.3, -1.6], { w: 2.3, a0: 16, a1: 8, elev: 5, push: 0.08 }),
        act: (S, u, f) => { H.up.draw({ t: 1 }); H.dn.draw({ t: 1 }); S.actor("gary", { x: 1.0, z: -1.3, expr: "nervous", prop: "shrug" });
          S.pop("bill", W(3, "cash."), 30, { x: -0.3, y: 1.5, z: -1.5, w: 0.9, h: 0.9 }); S.say("Need cash!", W(3, "needs") - 4, 26, { x: 0.2, y: AH + 0.55, z: -1.3, w: 1.0, h: 0.38, tail: "right" });
          S.pop("question", W(3, "goes?") - 2, 22, { x: 1.4, y: AH + 0.5, z: -1.3, w: 0.35, h: 0.45 }); S.pop("sweat", S.a + 6, 30, { x: 1.25, y: AH + 0.25, z: -1.2, w: 0.2, h: 0.2, pop: false }); } },
      // 8 · The rocket. SOLD stamp slams onto the winner
      { set: "launch", beat: 4, trans: "smash", light: "desert", cam: CAM.fit([0.4, 1.6, -2.6], { h: 3.6, a0: -12, a1: -4, elev: 4 }),
        act: (S, u, f) => { const r = W(4, "rocket."), k = E.back(E.prog(f, r, r + 6)); H.stamp.scale.setScalar(Math.max(0.01, k)); H.stamp.visible = f >= r;
          S.actor("gary", { x: -0.25, z: -1.4, expr: "grin", prop: "point" }); S.pop("impact", r + 3, 14, { x: 1.4, y: 2.6, z: -2.4, w: 0.8, h: 0.8, text: "SOLD!" }); S.kick(r + 3, 0.05); } },
      // 9 · winners were sold about one and a half times as often: the bars rise
      { set: "office", beat: 5, trans: "whip", light: "office", cam: CAM.fit([0, 1.05, -0.6], { w: 2.6, a0: -12, a1: 4, elev: 8, push: 0.08 }),
        act: (S, u, f) => { H.bars.grow([E.ss(E.prog(f, W(5, "up"), W(5, "fifty"))), E.ss(E.prog(f, S.a + 4, S.a + 30))]); H.tower.visible = false;
          S.pop("word", W(5, "fifty"), 50, { x: -0.6, y: 2.35, z: -0.4, w: 1.1, h: 0.4, text: "+50%", col: "#4fd18b", hold: true }); S.pop("sparks", W(5, "fifty"), 14, { x: -0.6, y: 2.0, z: -0.4, w: 1.2, h: 1.2 }); } },
      // 10 · the mystery: hugging the loser by the compost heap at dusk
      { set: "garden", beat: 6, trans: "dissolve", light: "sunset", cam: CAM.fit([-1.0, 1.2, -1.6], { w: 3.1, a0: 18, a1: 8, elev: 5 }),
        act: (S, u, f) => { H.flower.position.set(-2.4, 0.5, -2.4); H.flower.rotation.z = 1.4; H.weed.position.set(0.12, 0.6, -1.0); H.can.visible = false;
          S.actor("gary", { x: 0, z: -1.4, expr: "smile_closed", prop: "hold" }); S.pop("question", W(6, "loser?") - 4, 28, { x: 0.45, y: AH + 0.55, z: -1.4, w: 0.4, h: 0.5, hold: true });
          S.pop("label", W(6, "winner"), 30, { x: -2.4, y: 1.3, z: -2.2, w: 0.7, h: 0.24, text: "DUMPED", col: "#c0353a" }); S.pop("heart", W(6, "hug") , 24, { x: 0.3, y: 1.3, z: -1.1, w: 0.3, h: 0.3 }); } },
      // 11 · worse: the rocket he sold blasts off without him
      { set: "launch", beat: 7, trans: "whip", light: "sunset", cam: CAM.keys([[0, { p: [0.4, 1.8, 4.2], t: [0.6, 2.0, -3.0], fov: 48 }], [1, { p: [0.4, 3.2, 5.0], t: [0.7, 4.6, -3.0], fov: 48 }]]),
        act: (S, u, f) => { const b = W(7, "beating"), k = E.easeIn(E.prog(f, b - 12, b + 30)); H.rocket.position.y = 6 * k; H.stamp.visible = false;
          S.pop("smoke", b - 10, 40, { x: 0.8, y: 0.3, z: -2.6, w: 2.4, h: 1.2, pop: false }); S.pop("burst", b - 8, 30, { x: 0.8, y: 0.2 + 6 * k, z: -2.6, w: 1.0, h: 1.0, pop: false });
          S.actor("gary", { x: -0.35, z: -0.9, expr: "shock", look: 1 }); S.pop("arrow", W(7, "losers") , 24, { x: -1.7, y: 1.2, z: -1.6, w: 0.35, h: 0.35, dir: "down" }); } },
      // 12 · …than the losers they kept: Gary next to his grey lump, sweating
      { set: "launch", word: [7, "kept."], lead: 6, trans: "cut", light: "sunset", cam: CAM.fit([-1.3, 1.25, -1.5], { w: 1.6, a0: -10, a1: -2, elev: 4, push: 0.12 }), coc: 9,
        act: (S, u, f) => { H.rocket.visible = false; H.stamp.visible = false; S.actor("gary", { x: -0.9, z: -1.3, expr: "pained", prop: "fists" });
          S.pop("sweat", S.a + 2, 30, { x: -0.7, y: AH + 0.25, z: -1.2, w: 0.22, h: 0.22, pop: false }); } },
      // 13 · You see: waiting at a rainy bus stop at night
      { set: "bus", beat: 8, trans: "whip", light: "night", snow: 0.35, cam: CAM.fit([0, 1.4, -1.4], { w: 3.0, a0: -14, a1: -6, elev: 4 }),
        act: (S, u, f) => { H.clock.time(21 + u * 0.3); S.actor("garyCoat", { x: 0.1, y: 0.0, z: -1.25, mode: "sit", expr: "neutral" }); } },
      // 14 · the longer you wait: the clock spins
      { set: "bus", word: [8, "longer"], lead: 3, trans: "cut", light: "night", snow: 0.35, steady: true, cam: CAM.fit([-1.0, 2.4, -1.6], { w: 1.2, a0: 6, a1: -4, elev: -6, push: 0.1 }), coc: 10,
        act: (S, u, f) => { H.clock.time(21.3 + 3 * E.prog(f, S.a, S.a + 30)); S.pop("zz", S.a + 4, 26, { x: -0.6, y: 2.9, z: -1.5, w: 0.3, h: 0.3 }); } },
      // 15 · …the harder it is to leave: he stands, steps away, sits right back down
      { set: "bus", word: [8, "harder"], lead: 3, trans: "dissolve", light: "night", snow: 0.35, cam: CAM.fit([0.3, 1.3, -1.3], { w: 2.6, a0: 12, a1: 4, elev: 4 }),
        act: (S, u, f) => { const k = Math.sin(Math.PI * E.prog(f, S.a + 2, W(8, "leave.") + 4)); const up = k > 0.15;
          S.actor("garyCoat", { x: 0.1 + 0.9 * k, z: -1.25 + 0.3 * k, mode: up ? "stroll" : "sit", phase: f * 0.06, expr: up ? "pained" : "nervous", look: -1 });
          S.say("Any minute now...", S.a + 4, 34, { x: 0.3, y: AH + 0.75, z: -1.1, w: 1.1, h: 0.38, tail: "right" }); } },
      // 16 · push through into Gary's head: selling the winner rings the I WAS RIGHT bell
      { set: "mind", beat: 9, trans: "zoom", light: "mind", cam: CAM.fit([1.3, 1.5, -1.5], { w: 3.0, a0: 10, a1: 2, elev: 6, push: 0.08 }),
        act: (S, u, f) => { const r = W(9, "right."); H.levers[3].rotation.x = -0.8 * E.ss(E.prog(f, W(9, "winner") - 4, W(9, "winner") + 4)); H.bellL.visible = false;
          S.actor("gary", { x: 2.0, z: -0.9, expr: f < r ? "grin" : "laugh", prop: "up" }); S.pop("confetti", r - 2, 30, { x: 1.4, y: 2.5, z: -1.2, w: 2.0, h: 1.6 });
          S.pop("word", W(9, "proves"), 40, { x: 1.2, y: 2.7, z: -1.3, w: 1.4, h: 0.4, text: "I WAS RIGHT!", col: "#4fd18b" }); } },
      // 17 · selling the loser: alarm, red light, the lever jams
      { set: "mind", word: [9, "Selling", 1], lead: 3, trans: "whip", dir: -1, light: (u) => K.mixLight(K.light("mind"), K.light("danger"), 0.4 + 0.3 * Math.abs(Math.sin(u * 12))), cam: CAM.fit([-1.3, 1.5, -1.5], { w: 3.0, a0: -10, a1: -2, elev: 6, push: 0.1 }),
        act: (S, u, f) => { const m = W(9, "real."), k = 0.15 + 0.1 * Math.sin(f * 0.9); H.levers[0].rotation.x = -k; H.bellR.visible = false;
          S.actor("gary", { x: -2.0, z: -0.8, expr: f < m ? "nervous" : "shock", prop: "fists", tilt: -6 }); S.pop("exclaim", S.a + 4, 24, { x: -1.6, y: AH + 0.5, z: -0.9, w: 0.3, h: 0.4 });
          S.pop("impact", m, 16, { x: -1.2, y: 2.6, z: -1.3, w: 0.9, h: 0.9, text: "OUCH!" }); S.kick(m, 0.05); } },
      // 18 · only one month flipped it: December (time jump)
      { set: "dec", beat: 10, trans: "flash", light: "cold", snow: 0.6, cam: CAM.fit([1.6, 2.0, -2.3], { w: 2.8, a0: 12, a1: 4, elev: 2, push: 0.1 }),
        act: (S, u, f) => { const d = W(10, "December."); const i = f < d ? Math.min(10, Math.floor(E.prog(f, S.a, d) * 11)) : 11; H.cal.forEach((p, j) => p.visible = j === i); H.taxbill.visible = false;
          S.actor("garyCoat", { x: 0.85, z: -1.2, expr: f < d ? "neutral" : "shock", look: 1 }); S.pop("sparks", d, 16, { x: 1.9, y: 2.3, z: -2.2, w: 1.6, h: 1.6 }); } },
      // 19 · suddenly losers went first: Gary hurls the dud into the LOSSES bin
      { set: "dec", beat: 11, trans: "whip", light: "cold", snow: 0.6, cam: CAM.fit([-0.1, 1.2, -1.5], { w: 2.6, a0: -16, a1: -8, elev: 6 }),
        act: (S, u, f) => { H.cal.forEach((p, j) => p.visible = j === 11); H.taxbill.visible = false; const t0 = W(11, "losers"), k = E.prog(f, t0, t0 + 14);
          H.dud.position.set(E.lerp(0.4, -0.6, k), 1.1 + 0.6 * Math.sin(Math.PI * k) - (k >= 1 ? 0.6 : 0), E.lerp(-1.2, -1.6, k));
          S.actor("garyCoat", { x: 0.55, z: -1.3, expr: "stern", prop: f < t0 + 4 ? "hold" : "point" }); S.pop("impact", t0 + 14, 14, { x: -0.6, y: 1.1, z: -1.4, w: 0.7, h: 0.7, text: "CLANG!" }); S.kick(t0 + 14, 0.04); } },
      // 20 · because: the taxman points at the calendar
      { set: "dec", word: [11, "because"], lead: 3, light: "cold", snow: 0.6, cam: CAM.fit([1.25, 1.6, -1.9], { w: 2.4, a0: 10, a1: 2, elev: 3, push: 0.1 }),
        act: (S, u, f) => { H.cal.forEach((p, j) => p.visible = j === 11); H.taxbill.visible = false; H.dud.visible = false;
          S.actor("taxman", { x: 0.6, z: -1.6, expr: "stern", prop: "point", look: 1 }); S.say("Before New Year!", W(11, "before") - 4, 30, { x: 0.0, y: AH + 0.55, z: -1.4, w: 1.2, h: 0.4, tail: "right" }); } },
      // 21 · …can cut your tax bill: the bill shrinks
      { set: "dec", word: [11, "cut"], lead: 3, light: "cold", snow: 0.6, steady: true, cam: CAM.fit([0, 1.6, -0.9], { w: 2.0, a0: 4, a1: -4, elev: 2, push: 0.12 }), coc: 10,
        act: (S, u, f) => { H.dud.visible = false; const k = E.ss(E.prog(f, W(11, "tax"), W(11, "bill.") + 8)); H.taxbill.scale.setScalar(1 - 0.45 * k);
          S.pop("arrow", W(11, "tax"), 30, { x: 0.6, y: 1.5, z: -0.8, w: 0.3, h: 0.3, dir: "down" }); } },
      // 22 · eleven months of pride: the calendar flips JAN..NOV while Gary hugs his dud
      { set: "dec", beat: 12, trans: "whip", light: "golden", cam: CAM.fit([0.7, 1.6, -2.0], { w: 3.0, a0: -10, a1: 2, elev: 3 }),
        act: (S, u, f) => { const p = W(12, "pride."); const i = Math.min(10, Math.floor(E.prog(f, S.a, p + 2) * 11)); H.cal.forEach((c, j) => c.visible = j === i); H.taxbill.visible = false;
          H.dud.position.set(0.1, 1.0, -1.05); S.actor("gary", { x: 0, z: -1.4, expr: "smile_closed", prop: "hold" }); S.pop("word", p - 4, 26, { x: -0.5, y: AH + 0.6, z: -1.3, w: 0.8, h: 0.3, text: "PRIDE", col: "#f2c14e" }); } },
      // 23 · it took the taxman…
      { set: "dec", word: [12, "taxman"], lead: 3, light: "cold", snow: 0.6, cam: CAM.fit([0.3, 1.45, -1.5], { w: 2.2, a0: 12, a1: 4, elev: 3, push: 0.1 }),
        act: (S, u, f) => { H.cal.forEach((c, j) => c.visible = j === 11); H.taxbill.visible = false; H.dud.position.set(-0.45, 0.72, -1.15);
          S.actor("garyCoat", { x: -0.55, z: -1.5, expr: "nervous", prop: "hold" }); S.actor("taxman", { x: 0.65, z: -1.5, expr: "stern", prop: "point", look: -1 }); } },
      // 24 · …to make them admit it: the dud SLAMS into the LOSSES bin
      { set: "dec", word: [12, "admit"], lead: 6, trans: "whip", light: "cold", snow: 0.6, cam: CAM.fit([-0.35, 1.1, -1.5], { w: 2.0, a0: -8, a1: 0, elev: 6, push: 0.12 }),
        act: (S, u, f) => { const e = W(12, "it.", 1), k = E.easeIn(E.prog(f, S.a, e)); H.cal.forEach((c, j) => c.visible = j === 11); H.taxbill.visible = false;
          H.dud.position.set(E.lerp(0.2, -0.6, k), E.lerp(1.0, 0.55, k) + 0.4 * Math.sin(Math.PI * k), E.lerp(-1.1, -1.6, k));
          S.actor("garyCoat", { x: 0.45, z: -1.4, expr: f < e ? "pained" : "relief_open", prop: f < e ? "hold" : "shrug" });
          S.pop("impact", e, 18, { x: -0.6, y: 1.2, z: -1.3, w: 0.9, h: 0.9, text: "SLAM!" }); S.pop("puff", e, 20, { x: -0.6, y: 0.8, z: -1.4, w: 1.2, h: 0.6 }); S.kick(e, 0.08); } },
    ],
  };
};
