// "The Crash Inside a Winning Year" (Black Monday, October 19, 1987) — film module timed to Jackson's narration.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const AH = 1.58;
  const H = {};
  const fallCurve = (x) => 0.85 - 0.12 * x - 0.55 * Math.max(0, x - 0.55) * 2.2;
  const lowCurve = (x) => 0.7 - 0.6 * x;
  const upCurve = (x) => 0.25 + 0.6 * x;

  // a beige 1980s mainframe cabinet with two spinning tape reels
  const mainframe = (B, x, z, o = {}) => {
    const g = B.grp(x, 0, z, o.ry ?? 0, o.s ?? 1);
    B.box(0.9, 1.9, 0.6, "#d8cfb8", 0, 0, 0, { in: g }); B.box(0.92, 0.12, 0.62, "#8a8270", 0, 1.9, 0, { in: g });
    const reels = [];
    for (const y of [1.45, 1.0]) { const r = B.grp(0, y, 0.31, 0, 1, g); B.cyl(0.2, 0.2, 0.04, "#3a3a40", 0, 0, 0, { in: r, rx: Math.PI / 2, seg: 20 }); B.box(0.36, 0.05, 0.05, "#c9c9c9", 0, 0, 0.03, { in: r }); reels.push(B.dyn(r)); }
    for (let i = 0; i < 4; i++) B.box(0.05, 0.05, 0.02, i % 2 ? "#ff5a5a" : "#4fd18b", -0.25 + i * 0.17, 0.5, 0.31, { in: g, cast: false });
    return reels;
  };
  // a block of the Dow tower
  const block = (B, y, text, col) => {
    const g = B.grp(0, y, 0, 0, 1); B.box(1.7, 0.7, 1.7, col, 0, 0, 0, { in: g });
    if (text) B.plate(1.5, 0.42, B.textTex(text, "#f4efe2", "#241726", 1024, 286), 0, 0.35, 0.86, { in: g, d: 0.01 });
    return B.dyn(g);
  };

  return {
    cast: {
      ned: { jacket: "#c0602a", pants: "#3a4a6a", boots: "#3a2418", hat: "hair", hair: "#6a4022", moustache: "#6a4022", skin: "#f5c9a0", buttons: "#f4e6b8" },
      t1: { jacket: "#e8c43a", pants: "#2a2d38", boots: "#1a1418", hat: "hair", hair: "#2a1a10", skin: "#f0c8a0" },
      t2: { jacket: "#3a7ac0", pants: "#2a2d38", boots: "#1a1418", hat: "hair", hair: "#c8a060", skin: "#e8b88a", moustache: "#a07840" },
      t3: { jacket: "#c03a3a", pants: "#2a2d38", boots: "#1a1418", hat: "hair", hair: "#1a1a1a", skin: "#c88a60", build: "stout" },
      t4: { jacket: "#4a9a5a", pants: "#2a2d38", boots: "#1a1418", hat: "hair", hair: "#9a9a9a", skin: "#f5d2b0" },
      a1: { jacket: "#7a4a8a", pants: "#3b3f52", boots: "#3a2a20", hat: "hair", hair: "#e8c070", dress: "#9a6ab0", skin: "#ffe2c2" },
      a2: { jacket: "#2e5a4a", pants: "#2a2d38", boots: "#1a1418", hat: "cap", cap: "#d8a030", skin: "#e8b88a" },
      a3: { jacket: "#8a2e2e", pants: "#2a2d38", boots: "#1a1418", hat: "hair", hair: "#3a2a20", skin: "#f2c8a0", moustache: "#3a2a20" },
      a4: { jacket: "#3a5a9a", pants: "#3a3d48", boots: "#1a1418", hat: "beanie", cap: "#c0353a", skin: "#c88a60" },
      tech: { jacket: "#f4f4f0", pants: "#4a4e56", boots: "#1a1418", hat: "hair", hair: "#3a2a20", skin: "#f5c9a0", pins: "#3a7ac0" },
    },
    sets: {
      // metaphor stage: the Dow as a tower of four blocks on a pedestal
      tower: (B) => {
        B.set.stage({ floor: "#ece4f4", back: "#3a2a6a" });
        B.prop.pedestal({ x: 0, z: 0, r: 1.5, h: 0.4, col: "#ffffff", trim: "#f2c14e" });
        H.blocks = [block(B, 0.4, "DOW", "#f2c14e"), block(B, 1.1, "", "#e07a3a"), block(B, 1.8, "", "#f2c14e"), block(B, 2.5, "", "#e07a3a")];
        H.top = block(B, 3.2, "+2%", "#4fd18b"); H.top.visible = false;
        H.red = B.dyn(B.grp(0, 9, 0.2, 0, 1)); B.prop.arrow({ x: 0, y: 0, z: 0, dir: "down", size: 1.1, in: H.red });
        H.green = B.dyn(B.grp(2.3, -4, -0.6, 0, 1)); B.prop.arrow({ x: 0, y: 0, z: 0, dir: "up", size: 1.2, in: H.green });
        H.cal = B.dyn(B.grp(-1.5, 3.3, -0.2, 0.25, 0.9)); B.plate(1.3, 0.5, B.textTex("DEC 31", "#ffffff", "#c0353a", 512, 197), 0, 0.3, 0, { in: H.cal, d: 0.03, edge: "#c0353a" }); B.plate(1.3, 0.45, B.textTex("1987", "#ffffff", "#241726", 512, 177), 0, -0.2, 0, { in: H.cal, d: 0.03 }); H.cal.visible = false;
      },
      // Ned's 1987 living room: wood panelling, shag rug, a big CRT TV, a couch, a wall calendar
      den: (B) => {
        B.set.room({ style: "home", wall: "panel:#8a5a34", floor: "carpet:#c8782a", w: 8, d: 6, h: 3.4, windows: [2.4], door: false });
        B.box(2.4, 0.45, 0.9, "#6a7a3a", 0.3, 0, -2.2); B.box(2.4, 0.6, 0.25, "#5a6a32", 0.3, 0.45, -2.6); for (const sx of [-1, 1]) B.box(0.25, 0.65, 0.9, "#5a6a32", 0.3 + sx * 1.2, 0, -2.2);
        B.prop.rug({ x: 0.2, z: -0.6, w: 3.2, d: 2.0, col: "#e0a040" });
        B.box(0.9, 0.42, 0.5, "floor:#6a4630", 0.3, 0, -0.9); H.mug = B.dyn(B.grp(0.55, 0.42, -0.85, 0, 1)); B.cyl(0.07, 0.065, 0.16, "#f4efe2", 0, 0, 0, { in: H.mug, seg: 16 }); B.cyl(0.062, 0.062, 0.01, "#5a3a1a", 0, 0.14, 0, { in: H.mug, seg: 16 });
        H.skin = B.dyn(B.grp(0.55, 0.575, -0.85, 0, 1)); B.cyl(0.066, 0.066, 0.012, "#c8a070", 0, 0, 0, { in: H.skin, seg: 16 }); H.skin.visible = false;
        // the TV sits in front, facing the couch
        B.box(1.1, 0.55, 0.6, "floor:#5a3a24", -0.9, 0, 0.9, { ry: 0.25 }); B.box(1.0, 0.8, 0.7, "#3a3530", -0.9, 0.55, 0.95, { ry: 0.25 });
        H.tv = B.prop.screen({ x: -0.9 + 0.36 * Math.sin(Math.PI + 0.25), y: 0.6, z: 0.95 + 0.36 * Math.cos(Math.PI + 0.25), ry: Math.PI + 0.25, w: 0.78, h: 0.6, frame: "#2a2520", bg: "#13202b" });
        B.prop.sign({ x: -2.3, y: 1.85, z: -2.92, w: 1.1, h: 0.42, text: "OCT 19", bg: "#ffffff", fg: "#c0353a" }); B.prop.sign({ x: -2.3, y: 1.45, z: -2.92, w: 1.1, h: 0.38, text: "1987", bg: "#ffffff", fg: "#241726" });
        B.prop.lamp({ kind: "floor", x: 2.2, z: -2.4, glow: "#ffd9a0", intensity: 3, dist: 6 });
        B.prop.clock({ x: 1.6, y: 2.4, z: -2.92, r: 0.3, time: 9.5 }); H.clock = B.prop.clock({ x: 1.6, y: 2.4, z: -2.9, r: 0.3, time: 9.5 });
        B.prop.plant({ x: -3.2, z: -2.4 });
      },
      // the trading floor: tiered steps, quote boards, phones and a brass opening bell
      pit: (B) => {
        B.set.room({ style: "modern", w: 14, d: 10, h: 6, door: false, windows: [] });
        for (let i = 0; i < 3; i++) B.box(9 - i, 0.3 + i * 0.3, 0.8, "#4a5a7a", 0, 0, -1.6 - i * 0.8);
        H.board = B.prop.screen({ x: -1.8, y: 3.2, z: -4.8, w: 3.2, h: 1.6, bg: "#13202b", line: "#4fd18b", curve: (x) => 0.75 + 0.05 * Math.sin(x * 9) });
        H.board2 = B.prop.screen({ x: 2.0, y: 3.2, z: -4.8, w: 3.2, h: 1.6, bg: "#13202b", line: "#4fd18b", ticker: "DJIA  ·  OCT 19 1987", curve: (x) => 0.7 + 0.04 * Math.sin(x * 7) });
        B.prop.sign({ x: 0, y: 5.2, z: -4.9, text: "TRADING FLOOR", w: 4.2, h: 0.55, bg: "#2a2d36", fg: "#f2c14e" });
        H.bell = B.dyn(B.grp(-3.9, 1.6, -2.0, 0.6, 1)); B.box(0.5, 0.5, 0.3, "panel:#5a3a24", 0, -0.4, 0, { in: H.bell }); B.ball(0.32, "#d8a830", 0, 0.25, 0.2, { in: H.bell, sy: 0.9 }); B.ball(0.08, "#8a6a20", 0, 0.05, 0.4, { in: H.bell });
        B.box(0.12, 1.6, 0.12, "#2a2d36", -3.9, 0, -2.0);
        for (const x of [-3, 3]) B.prop.table({ x, z: 0.8, w: 1.4, d: 0.7, col: "#5a5e66" }); B.prop.phone({ x: -3.2, y: 0.78, z: 0.8 }); B.prop.phone({ x: 2.8, y: 0.78, z: 0.8 });
        for (let i = 0; i < 6; i++) B.prop.lamp({ kind: "hang", x: -5 + i * 2, y: 5.6, z: -1, glow: "#ffffff", intensity: 1.5, dist: 7, light: i % 2 === 0 });
      },
      // a packed theater: rows of seats facing a red-curtained stage, EXIT sign
      theater: (B) => {
        B.set.room({ style: "home", wall: "wallpaper:#6a1a2a", floor: "carpet:#8a2a3a", w: 12, d: 12, h: 5, door: false, windows: [] });
        B.box(10, 0.8, 2.6, "planks:#5a3a24", 0, 0, -4.7); for (let i = 0; i < 10; i++) B.box(0.9, 4.2, 0.12, i % 2 ? "#b01a2a" : "#c8283a", -4.5 + i, 0.8, -5.6);
        B.prop.sign({ x: 0, y: 4.4, z: -5.8, text: "TONIGHT ONLY", w: 3.2, h: 0.5, bg: "#2a1a2a", fg: "#ffd84a" });
        for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) B.box(0.8, 0.42, 0.45, "#a01a2a", -3 + c * 1.0, 0, -1.72 + r * 1.3);
        B.prop.sign({ x: 5.85, y: 2.6, z: 1.0, ry: -Math.PI / 2, text: "EXIT", w: 1.0, h: 0.4, bg: "#2a8a3a", fg: "#ffffff" });
        for (const x of [-4.5, 4.5]) B.prop.lamp({ kind: "hang", x, y: 4.6, z: -3.5, glow: "#ffd9a0", intensity: 2, dist: 8 });
      },
      // the computer room: beige mainframes with tape reels, a green terminal printing SELL
      machines: (B) => {
        B.set.room({ style: "modern", wall: "concrete:#4a5a6a", floor: "tiles:#c8ccd0:#a8acb0", w: 10, d: 8, h: 3.6, door: false, windows: [] });
        H.reels = []; for (let i = 0; i < 5; i++) H.reels.push(...mainframe(B, -3.6 + i * 1.8, -3.2));
        B.prop.sign({ x: 0, y: 2.85, z: -3.9, text: "PORTFOLIO INSURANCE", w: 4.4, h: 0.5, bg: "#1a2a3a", fg: "#7af0ff" });
        B.prop.desk ? B.prop.desk({ x: 0, z: -0.8, col: "#8a8a90" }) : B.prop.table({ x: 0, z: -0.8, w: 1.8, d: 0.8, col: "#8a8a90" });
        B.box(0.7, 0.55, 0.55, "#d8cfb8", 0, 0.78, -0.9);
        H.term = B.prop.screen({ x: 0, y: 0.86, z: -0.6, w: 0.52, h: 0.38, frame: "#d8cfb8", bg: "#061206", line: "#4fd18b", curve: (x) => 0.7 });
        H.paper = B.dyn(B.grp(0.75, 0.78, -0.7, 0, 1)); B.box(0.4, 0.2, 0.3, "#d8cfb8", 0, 0, 0, { in: H.paper });
        H.sheet = B.dyn(B.grp(0, 0.2, 0.05, 0, 1, H.paper)); B.plate(0.34, 0.5, B.textTex("", "#f6f6ee", "#f6f6ee", 256, 376), 0, 0.25, 0, { in: H.sheet, d: 0.002 }); for (const y of [0.1, 0.25, 0.4]) B.plate(0.3, 0.12, B.textTex("SELL", "#f6f6ee", "#c0353a", 256, 102), 0, y, 0.004, { in: H.sheet, d: 0.002 });
        B.lamp(0, 3.0, 0.5, "#cfe8ff", 1.2);
      },
      // a snowy slope: a giant snowball covered in SELL tickets, pushed by computer cabinets
      slope: (B) => {
        B.set.landscape({ kind: "snow", hills: true, seed: 4 });
        H.ball = B.dyn(B.grp(0, 0, 0, 0, 1)); B.ball(1, "#dfe6f2", 0, 0, 0, { in: H.ball, seg: 32 });
        for (let i = 0; i < 7; i++) { const a = i * 0.9, y = 0.75 * Math.sin(i * 1.7); B.plate(0.44, 0.2, B.textTex("SELL", "#f6f6ee", "#c0353a", 256, 116), Math.sin(a) * Math.sqrt(1 - y * y) * 1.01, y, Math.cos(a) * Math.sqrt(1 - y * y) * 1.01, { in: H.ball, ry: a, d: 0.003 }); }
        H.pushers = []; for (const sx of [-1, 1]) { const g = B.dyn(B.grp(sx * 0.9, 0, 0, 0, 1)); B.box(0.8, 1.4, 0.5, "#d8cfb8", 0, 0, 0, { in: g }); B.plate(0.6, 0.3, B.textTex("SELL", "#061206", "#4fd18b", 256, 128), 0, 0.9, 0.26, { in: g, d: 0.01 }); H.pushers.push(g); }
        for (const [x, z] of [[-6, -6], [7, -9], [-9, -14], [10, -4]]) B.prop.tree({ x, z, kind: "pine" });
      },
    },
    shots: [
      // 0 · frame 0: a red arrow plunges from the sky and knocks the top quarter off the Dow tower
      { set: "tower", f: 0, light: K.backdrop("#3a2a6a"), cam: CAM.fit([0, 2.0, 0], { w: 4.6, a0: -22, a1: -6, e0: 8, e1: 2, push: 0.15 }),
        act: (S, u, f) => { const k = E.prog(f, 0, 12); H.red.position.y = 9 - 5.2 * E.easeIn(k); H.red.visible = f < 20;
          const hit = 12, q = E.prog(f, hit, hit + 22); H.blocks[3].position.x = 3.2 * q; H.blocks[3].position.y = 2.5 + 1.2 * Math.sin(q * Math.PI) - 2.4 * q * q; H.blocks[3].rotation.z = -2.2 * q;
          S.kick(hit, 0.09); S.pop("impact", hit, 18, { x: 0.3, y: 3.5, z: 0.9, w: 1.2, h: 0.9, text: "CRASH" });
          S.pop("word", W(0, "quarter") - 2, 40, { x: -1.0, y: 3.4, z: 0.9, w: 1.4, h: 0.6, text: "−1/4", col: "#ff5a5a", hold: true }); } },
      // 1 · the year still ended up: a green arrow rockets up behind the broken tower
      { set: "tower", word: [0, "The", 1], trans: "whip", light: K.backdrop("#3a2a6a"), cam: CAM.fit([0.8, 2.3, 0], { w: 4.4, a0: 14, a1: 4, e0: -4, e1: 6, push: 0.12 }),
        act: (S, u, f) => { H.blocks[3].visible = false; const k = E.back(E.prog(f, W(0, "up.") - 10, W(0, "up.") + 4)); H.green.position.y = -4 + 5.5 * k;
          S.pop("question", W(0, "year") , 30, { x: -0.5, y: 3.2, z: 0.8, w: 0.4, h: 0.55 }); S.pop("word", W(0, "up.") , 26, { x: 1.4, y: 3.9, z: 0.4, w: 1.0, h: 0.55, text: "UP?!", col: "#4fd18b", hold: true }); S.kick(W(0, "up.") + 2, 0.05); } },
      // 2 · October 19, 1987: crane down Ned's wood-panelled den to the wall calendar
      { set: "den", beat: 1, trans: "whip", light: "interior", cam: CAM.fit([-1.2, 1.4, -1.8], { w: 3.4, a0: -20, a1: -6, e0: 22, e1: 8, push: 0.1 }),
        act: (S, u, f) => { S.actor("ned", { x: 0.3, z: -2.1, mode: "sit", expr: "smile_closed" }); S.pop("label", W(1, "eighty-seven.") - 2, 50, { x: -2.3, y: 2.25, z: -2.6, w: 1.6, h: 0.4, text: "BLACK MONDAY", col: "#241726", hold: true }); } },
      // 3 · you're Ned, savings all in stocks: Ned grins with his coffee, stock certificates pop
      { set: "den", word: [1, "You're"], lead: 3, trans: "dissolve", light: "interior", cam: CAM.fit([0.3, 1.25, -1.9], { w: 1.9, a0: 10, a1: 2, elev: 4, push: 0.12 }), coc: 9,
        act: (S, u, f) => { S.actor("ned", { x: 0.3, z: -2.1, mode: "sit", expr: "grin", prop: "hold" }); S.pop("label", W(1, "Ned,") - 2, 30, { x: 0.3, y: AH + 0.35, z: -1.9, w: 0.7, h: 0.3, text: "NED", col: "#c0602a" });
          for (let q = 0; q < 3; q++) S.pop("paper", W(1, "stocks.") - 4 + q * 3, 30, { x: -0.4 + q * 0.4, y: 1.7, z: -1.6, w: 0.3, h: 0.36, rise: 0.25, pop: q === 0, hold: true }); } },
      // 4 · the opening bell rings on the trading floor
      { set: "pit", beat: 2, trans: "whip", light: "office", cam: CAM.fit([-2.6, 1.6, -1.2], { w: 4.6, a0: -30, a1: -18, elev: 6, push: 0.1 }),
        act: (S, u, f) => { const b = W(2, "bell"); H.bell.rotation.z = f > b ? 0.25 * Math.sin((f - b) * 1.3) * Math.exp(-(f - b) * 0.05) : 0;
          S.actor("t1", { x: -2.4, y: 0.3, z: -1.6, expr: "grin", prop: "up" }); S.actor("t2", { x: -1.2, y: 0.6, z: -2.4, expr: "smile" }); S.actor("t4", { x: -3.4, y: 0.6, z: -2.4, expr: "neutral" });
          S.pop("impact", b + 2, 22, { x: -3.5, y: 2.4, z: -1.6, w: 1.0, h: 0.8, text: "DING!" }); } },
      // 5 · and the Dow drops: the quote board line dives
      { set: "pit", word: [2, "Dow"], lead: 3, light: "office", cam: CAM.fit([-1.8, 3.2, -4.6], { w: 3.6, a0: 6, a1: -4, elev: -6, push: 0.14 }), coc: 9,
        act: (S, u, f) => { const k = E.prog(f, S.a, W(3, "Screens") - 4); H.board.draw({ curve: fallCurve, t: 0.55 + 0.45 * k, label: "DOW", down: true, line: "#ff5a5a" });
          S.pop("arrow", W(2, "drops.") - 2, 30, { x: -0.6, y: 3.5, z: -4.4, w: 0.5, h: 0.7, dir: "down", hold: true }); } },
      // 6 · screens go red: smash, both boards red, traders panic
      { set: "pit", beat: 3, trans: "smash", light: K.light("office", { tint: [1.12, 0.92, 0.9] }), cam: CAM.fit([0, 2.0, -2.0], { w: 6.0, a0: 8, a1: -2, elev: 8, push: 0.1 }),
        act: (S, u, f) => { H.board.draw({ curve: fallCurve, t: 1, label: "DOW", bg: "#5a0a10", line: "#ffb0b0", down: true }); H.board2.draw({ curve: lowCurve, t: 1, bg: "#5a0a10", line: "#ffb0b0", ticker: "SELL · SELL · SELL", down: true });
          S.actor("t1", { x: -1.6, y: 0.3, z: -1.6, expr: "shock", prop: "up" }); S.actor("t2", { x: -0.4, y: 0.6, z: -2.4, expr: "nervous", prop: "fists" }); S.actor("t3", { x: 0.9, y: 0.3, z: -1.6, expr: "shock", prop: "point" }); S.actor("t4", { x: 2.0, y: 0.6, z: -2.4, expr: "pained" });
          S.say("SELL!", S.a + 4, 30, { x: 0.9, y: AH + 1.1, z: -1.4, w: 0.8, h: 0.45 }); S.pop("sweat", S.a + 8, 26, { x: -1.35, y: AH + 0.6, z: -1.5, w: 0.22, h: 0.22 }); } },
      // 7 · by the close: back in the den, the TV shows the damage (camera behind Ned looking at the set)
      { set: "den", beat: 4, trans: "whip", light: K.light("interior", { hemi: 1.5 }), steady: true, cam: CAM.fit([-0.82, 0.92, 0.85], { w: 1.2, a0: 166, a1: 172, elev: 4, push: 0.12 }), coc: 10,
        act: (S, u, f) => { H.tv.draw({ curve: fallCurve, t: 1, label: "DOW −508", bg: "#13202b", line: "#ff5a5a", down: true });
          S.pop("label", W(4, "close:") - 2, 40, { x: -0.85, y: 1.45, z: 0.75, w: 0.9, h: 0.26, text: "4:00 PM", col: "#241726", hold: true }); } },
      // 8 · down twenty-two point six percent: Ned's shocked face, giant number
      { set: "den", word: [4, "twenty-two"], lead: 3, trans: "smash", light: "interior", cam: CAM.fit([0.3, 1.25, -1.9], { w: 2.0, a0: -6, a1: 4, elev: 4, push: 0.14 }),
        act: (S, u, f) => { S.actor("ned", { x: 0.3, z: -2.1, mode: "sit", expr: "shock", prop: "up" }); S.kick(S.a + 2, 0.08);
          S.pop("impact", S.a + 2, 46, { x: 0.3, y: 2.2, z: -1.6, w: 1.6, h: 1.0, text: "−22.6%", hold: true }); S.pop("sweat", W(4, "percent.") , 30, { x: 0.55, y: AH + 0.05, z: -2.0, w: 0.22, h: 0.22 }); } },
      // 9 · Ned stares: frozen on the couch while the clock hands race
      { set: "den", beat: 5, trans: "dissolve", light: K.light("lamp", { hemi: 1.5 }), cam: CAM.fit([0.8, 1.6, -2.3], { w: 3.4, a0: 22, a1: 14, elev: 8, push: 0.08 }),
        act: (S, u, f) => { S.actor("ned", { x: 0.3, z: -2.1, mode: "sit", expr: "dazed" }); H.clock.time(16 + 0.08 * (f - S.a));
          S.pop("label", W(5, "stares") - 2, 30, { x: 0.3, y: AH + 0.6, z: -1.9, w: 0.9, h: 0.3, text: "STARE…", col: "#5a4a6a" }); } },
      // 10 · his coffee grows a skin (insert on the mug)
      { set: "den", word: [5, "coffee"], lead: 3, steady: true, light: K.light("lamp", { hemi: 1.6 }), cam: CAM.fit([0.55, 0.55, -0.85], { w: 0.55, a0: 4, a1: -4, elev: 30, push: 0.12 }), coc: 12,
        act: (S, u, f) => { const sk = W(5, "skin.") - 6; H.skin.visible = f >= sk; H.skin.scale.y = 1 + 0.6 * E.back(E.prog(f, sk, sk + 6));
          S.pop("zz", W(5, "grows") - 2, 30, { x: 0.75, y: 0.85, z: -0.8, w: 0.18, h: 0.18, rise: 0.15 }); S.pop("label", sk + 2, 30, { x: 0.55, y: 0.8, z: -0.75, w: 0.4, h: 0.12, text: "SKIN", col: "#8a5a2a" }); } },
      // 11 · how does a market lose a quarter of itself before dinner? (night on the broken tower)
      { set: "tower", beat: 6, trans: "whip", light: K.backdrop("#1e1840"), cam: CAM.fit([0, 1.7, 0], { w: 3.6, a0: -16, a1: 8, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.blocks[3].visible = false; S.pop("question", W(6, "How"), 80, { x: 0.0, y: 3.2, z: 0.6, w: 0.5, h: 0.7, hold: true }); S.pop("question", W(6, "quarter") - 2, 50, { x: 1.0, y: 2.6, z: 0.6, w: 0.35, h: 0.5, hold: true });
          S.pop("label", W(6, "dinner?") - 2, 30, { x: -1.0, y: 2.6, z: 0.8, w: 1.4, h: 0.38, text: "9:30 → 4:00", col: "#3a2a6a", hold: true }); } },
      // 12 · you see, it's a packed theater (push-through into the metaphor)
      { set: "theater", beat: 7, trans: "zoom", light: K.light("lamp", { hemi: 1.6 }), cam: CAM.fit([0, 1.0, -0.6], { w: 5.0, a0: -8, a1: 4, elev: 8, push: 0.12 }),
        act: (S, u, f) => { const sp = [["a1", -2, -1.6], ["a2", -1, -1.6], ["ned", 0, -0.3], ["a3", 1, -1.6], ["a4", 2, -0.3], ["t2", -2, 1.0], ["t4", 1, 1.0], ["t1", 0, 2.3]];
          sp.forEach(([c, x, z], i) => S.actor(c, { key: "th" + i, x, z, mode: "sit", expr: i % 3 ? "smile" : "smile_closed" })); } },
      // 13 · everyone's plan: if someone stands...
      { set: "theater", word: [7, "Everyone's"], lead: 3, light: K.light("lamp", { hemi: 1.6 }), cam: CAM.fit([-0.6, 1.15, -1.0], { w: 2.8, a0: -6, a1: 2, elev: 8, push: 0.12 }), coc: 9,
        act: (S, u, f) => { S.actor("a1", { key: "th0", x: -2, z: -1.6, mode: "sit", expr: "nervous", look: 0.5 }); S.actor("a2", { key: "th1", x: -1, z: -1.6, mode: "sit", expr: "stern" }); S.actor("ned", { key: "th2", x: 0, z: -0.3, mode: "sit", expr: "nervous" });
          S.say("If one stands…", W(7, "plan:") - 4, 34, { x: -1.0, y: 1.9, z: -1.4, w: 1.4, h: 0.45 }); } },
      // 14 · someone stands!
      { set: "theater", word: [7, "someone"], lead: 3, trans: "smash", light: K.light("lamp", { hemi: 1.7 }), cam: CAM.fit([1, 1.35, -1.4], { w: 3.0, a0: 6, a1: -2, elev: 8, push: 0.1 }),
        act: (S, u, f) => { S.actor("a3", { key: "th3", x: 1, z: -1.6, expr: "neutral", look: -0.3 }); S.actor("a2", { key: "th1", x: -0.0, z: -1.6, mode: "sit", expr: "shock", look: 0.6 }); S.actor("a4", { key: "th4", x: 2, z: -0.3, mode: "sit", expr: "shock", look: -0.6 });
          S.pop("exclaim", S.a + 2, 30, { x: 1, y: AH + 0.6, z: -1.5, w: 0.3, h: 0.45 }); S.kick(S.a + 2, 0.04); } },
      // 15 · run! the whole crowd stampedes for the EXIT
      { set: "theater", word: [7, "run."], lead: 4, trans: "whip", light: K.light("lamp", { hemi: 1.7, sat: 1.2 }), cam: CAM.fit([0, 1.3, -0.6], { w: 5.8, a0: 4, a1: -6, elev: 12, push: 0.06 }),
        act: (S, u, f) => { const t = f - S.a; [["a1", -2], ["a2", -1], ["ned", 0], ["a3", 1], ["a4", 2], ["t2", -1.5], ["t4", 1.5]].forEach(([c, x], i) => S.actor(c, { key: "th" + i, x: x + 0.012 * t * (i % 2 ? 1 : -1), z: -1.6 + (i > 4 ? 1.2 : 0) + 0.04 * t, mode: "march", phase: f * 0.12 + i, expr: i % 2 ? "shock" : "nervous" }));
          S.fx("speed", { x: 0, y: 1.2, z: -1.0, w: 5, h: 2, t: t / 30 }); S.pop("impact", W(7, "run."), 22, { x: 0, y: 2.5, z: -1.2, w: 1.3, h: 0.9, text: "RUN!" }); } },
      // 16 · big funds used a new portfolio insurance: whip into the computer room
      { set: "machines", beat: 8, trans: "whip", light: K.light("night", { hemi: 1.5 }), cam: CAM.fit([0, 1.5, -2.6], { w: 6.2, a0: -14, a1: 0, elev: 8, push: 0.1 }),
        act: (S, u, f) => { H.reels.forEach((r, i) => (r.rotation.z = (f - S.a) * (i % 2 ? 0.15 : -0.12))); S.actor("tech", { x: -1.6, z: -1.8, expr: "grin", prop: "point", look: 0.4 });
          S.pop("label", W(8, "funds") - 2, 36, { x: 1.8, y: 2.2, z: -2.4, w: 1.4, h: 0.4, text: "BIG FUNDS", col: "#1a2a3a" }); } },
      // 17 · computers that sell when prices fall: the terminal prints SELL
      { set: "machines", word: [8, "computers"], lead: 3, steady: true, light: K.light("night", { hemi: 1.6 }), cam: CAM.fit([0.35, 1.1, -0.7], { w: 1.5, a0: -10, a1: 2, elev: 10, push: 0.12 }), coc: 10,
        act: (S, u, f) => { const k = E.prog(f, W(8, "sell") - 2, W(8, "fall.") + 8); H.term.draw({ curve: fallCurve, t: 0.4 + 0.6 * E.prog(f, S.a, W(8, "fall.")), label: "IF ↓ THEN SELL", bg: "#061206", line: "#ff5a5a", down: true }); H.sheet.position.y = 0.2 + 0.3 * k;
          S.pop("label", W(8, "sell") - 2, 30, { x: 0.8, y: 1.55, z: -0.6, w: 0.6, h: 0.22, text: "SELL", col: "#c0353a" }); } },
      // 18 · selling pushed prices down: every machine spits SELL, the line dives
      { set: "machines", beat: 9, trans: "smash", light: K.light("night", { hemi: 1.6, tint: [1.1, 0.9, 0.92] }), cam: CAM.fit([0, 1.4, -2.0], { w: 4.2, a0: 12, a1: 2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.reels.forEach((r, i) => (r.rotation.z = (f - S.a) * (i % 2 ? 0.35 : -0.3))); H.term.draw({ curve: lowCurve, t: 1, label: "SELL", bg: "#061206", line: "#ff5a5a", down: true }); H.sheet.position.y = 0.5;
          for (let q = 0; q < 6; q++) S.pop("paper", S.a + 3 + q * 4, 26, { x: -2.2 + q * 0.9, y: 2.0, z: -2.6, w: 0.3, h: 0.36, rise: -0.8, spin: q % 2 ? 2 : -2, pop: q === 0 });
          S.pop("arrow", W(9, "down.") - 2, 26, { x: 0, y: 2.4, z: -1.4, w: 0.5, h: 0.7, dir: "down" }); } },
      // 19 · lower prices triggered more selling: insert on the terminal, faster and faster
      { set: "machines", word: [9, "Lower"], lead: 3, light: K.light("night", { hemi: 1.6, tint: [1.15, 0.88, 0.9] }), cam: CAM.fit([0, 1.05, -0.6], { w: 1.0, a0: 6, a1: -6, elev: 6, push: 0.16 }), coc: 11,
        act: (S, u, f) => { H.term.draw({ curve: (x) => 0.9 - 0.85 * x * x, t: E.prog(f, S.a, S.b), label: "MORE SELLING", bg: "#200606", line: "#ff5a5a", down: true }); S.kick(W(9, "selling.") , 0.04);
          S.pop("arrow", W(9, "triggered") - 2, 30, { x: -0.35, y: 1.3, z: -0.5, w: 0.22, h: 0.3, dir: "down" }); S.pop("arrow", W(9, "selling.") - 2, 24, { x: 0.35, y: 1.3, z: -0.5, w: 0.22, h: 0.3, dir: "down" }); } },
      // 20 · a snowball: whip to the snowy slope, the SELL snowball rolls at camera, growing
      { set: "slope", beat: 10, trans: "whip", light: "cold", cam: CAM.follow((u) => [0, 1.4, 6 - 8 * u], [2.4, 0.8, 6.5], [0, 0.4, -1.0], 44),
        act: (S, u, f) => { const s = 0.7 + 0.9 * u; H.ball.position.set(0, s, 6 - 8 * u - 0.8); H.ball.scale.setScalar(s); H.ball.rotation.x = -(f - S.a) * 0.12;
          H.pushers.forEach((p, i) => p.position.set((i ? 1 : -1) * (0.9 * s + 0.2), 0, 6 - 8 * u - 0.8 - s - 0.6));
          S.fx("puff", { x: 0, y: 0.3, z: 6 - 8 * u, w: 2 * s, h: 0.6, t: ((f - S.a) % 12) / 12 }); S.pop("label", W(10, "machines.") - 2, 26, { x: 0, y: 2.0 * s + 0.6, z: 6 - 8 * u - 1.4, w: 1.4, h: 0.4, text: "MACHINES", col: "#1a2a3a" }); } },
      // 21 · rolled by machines: the snowball flattens the camera (smash)
      { set: "slope", word: [10, "machines."], lead: -4, trans: "cut", light: "cold", steady: true, cam: CAM.fit([0, 1.6, 0], { w: 4.0, a0: 0, a1: 0, elev: 2, push: 0.3 }),
        act: (S, u, f) => { const k = E.easeIn(E.prog(f, S.a, S.a + 10)); H.ball.position.set(0, 1.7, -6 + 7 * k); H.ball.scale.setScalar(1.7); H.ball.rotation.x = -(f - S.a) * 0.2; H.pushers.forEach((p) => (p.visible = false));
          S.kick(S.a + 9, 0.1); S.pop("impact", S.a + 9, 18, { x: 0, y: 1.8, z: 2.0, w: 1.6, h: 1.0, text: "WHUMP" }); } },
      // 22 · so Ned sells everything: on the phone, yelling to his broker
      { set: "den", beat: 11, trans: "whip", light: K.light("lamp", { hemi: 1.5 }), cam: CAM.fit([0.3, 1.25, -1.9], { w: 2.2, a0: -14, a1: -4, elev: 4, push: 0.12 }),
        act: (S, u, f) => { S.actor("ned", { x: 0.3, z: -2.1, expr: "pained", prop: "fists" }); S.say("SELL IT ALL!", W(11, "sells") - 2, 36, { x: -0.2, y: AH + 0.8, z: -1.9, w: 1.4, h: 0.45, tail: "right" });
          H.tv.draw({ curve: fallCurve, t: 1, bg: "#13202b", line: "#ff5a5a", down: true }); } },
      // 23 · right at the bottom: TV insert, the arrow points to the lowest point
      { set: "den", word: [11, "at"], lead: 2, steady: true, light: K.light("lamp", { hemi: 1.6 }), cam: CAM.fit([-0.82, 0.92, 0.85], { w: 1.1, a0: 168, a1: 174, elev: 4, push: 0.1 }), coc: 10,
        act: (S, u, f) => { H.tv.draw({ curve: fallCurve, t: 1, label: "NED SOLD HERE", bg: "#13202b", line: "#ff5a5a", down: true });
          S.pop("arrow", W(11, "bottom.") - 2, 30, { x: -1.02, y: 1.25, z: 0.7, w: 0.18, h: 0.24, dir: "down", hold: true }); S.pop("label", W(11, "bottom.") , 26, { x: -0.8, y: 1.45, z: 0.7, w: 0.6, h: 0.18, text: "BOTTOM", col: "#c0353a" }); } },
      // 24 · New Year's Eve: time-jump flash, the tower rebuilt and topped with green, confetti
      { set: "tower", beat: 12, trans: "flash", light: K.backdrop("#2a5a4a"), cam: CAM.fit([0, 2.2, 0], { w: 4.8, a0: 18, a1: 4, e0: 4, e1: 10, push: 0.12 }),
        act: (S, u, f) => { const h = W(12, "higher") - 2; H.top.visible = f >= h; H.top.position.y = 3.2 + 3 * (1 - E.easeIn(E.prog(f, h, h + 6))); H.cal.visible = true;
          S.fx("confetti", { x: 0, y: 3.6, z: 0.8, w: 4, h: 2.2, t: (f - S.a) / 40 }); S.kick(h + 6, 0.05);
          S.pop("label", W(12, "January.") - 4, 34, { x: 1.6, y: 1.4, z: 1.0, w: 1.3, h: 0.36, text: "JAN 1,897", col: "#3a2a6a", hold: true }); S.pop("label", W(12, "January.") + 6, 30, { x: 1.6, y: 1.9, z: 1.0, w: 1.3, h: 0.36, text: "DEC 1,939", col: "#2a7a4a", hold: true }); } },
      // 25 · Ned lost money: Ned alone on the couch, empty pockets
      { set: "den", beat: 13, trans: "whip", light: K.light("lamp", { hemi: 1.5 }), cam: CAM.fit([0.3, 1.3, -1.9], { w: 2.6, a0: 12, a1: 4, elev: 6, push: 0.1 }),
        act: (S, u, f) => { S.actor("ned", { x: 0.3, z: -2.1, mode: "sit", expr: "nervous", prop: "shrug" }); H.tv.draw({ curve: upCurve, t: 1, label: "1987 +2%", bg: "#0e2a1a", line: "#4fd18b" });
          S.pop("label", W(13, "lost") - 2, 30, { x: 0.3, y: AH + 0.45, z: -1.9, w: 0.9, h: 0.3, text: "NED: LOSS", col: "#c0353a" }); } },
      // 26 · the market went UP: a green arrow bursts up past Ned and he faceplants on the last word
      { set: "den", word: [13, "market"], lead: 3, trans: "smash", light: K.light("interior", { sat: 1.2 }), cam: CAM.fit([0.3, 1.1, -1.6], { w: 2.6, a0: -8, a1: 0, elev: 6, push: 0.14 }),
        act: (S, u, f) => { const up = W(13, "up.") - 1; S.actor("ned", { x: 0.3, z: -1.7, mode: f >= up ? "fall" : "stand", expr: f >= up ? "dazed" : "shock", prop: f >= up ? null : "up" });
          S.pop("arrow", W(13, "went") - 2, 30, { x: -0.7, y: 1.4, z: -1.4, w: 0.6, h: 0.8, dir: "up", rise: 1.0, hold: true }); S.pop("impact", up, 24, { x: 0.95, y: 2.25, z: -1.3, w: 1.1, h: 0.8, text: "UP!" }); S.kick(up, 0.12); S.pop("stars", up + 3, 26, { x: 0.3, y: 0.8, z: -1.5, w: 0.8, h: 0.5 }); } },
    ],
  };
};
