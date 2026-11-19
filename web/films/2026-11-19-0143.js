// "The Cow That Kept Giving Milk" (the 1929 '25 years to break even' myth vs dividends and deflation) — film module.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const AH = 1.58;
  const H = {};
  const STORM = K.light("storm", { sat: 0.75 });
  const YX = (yr) => -6 + (yr - 1929) * 0.48; // x of a year on the time-track stage
  const UP = (x) => 0.12 + 0.78 * x * x;
  const CRASH = (x) => (x < 0.25 ? 0.3 + 2.4 * x : Math.max(0.06, 0.9 - 1.6 * (x - 0.25)));

  // a cartoon dairy cow built from primitives, facing +x; returns its group
  const cow = (B, x, z) => {
    const g = B.dyn(B.grp(x, 0, z, 0, 1));
    B.box(1.7, 0.85, 0.8, "#f6f2ea", 0, 0.75, 0, { in: g });
    [[-0.4, 1.35, 0.41, 0.28], [0.35, 1.05, 0.41, 0.22], [-0.1, 1.2, -0.41, 0.3], [0.5, 1.4, -0.41, 0.2]].forEach(([sx, sy, sz, r]) => B.ball(r, "#2a2620", sx, sy, sz, { in: g, sz: 0.15 }));
    for (const lx of [-0.65, 0.6]) for (const lz of [-0.28, 0.28]) B.cyl(0.09, 0.08, 0.78, "#f6f2ea", lx, 0, lz, { in: g });
    for (const lx of [-0.65, 0.6]) for (const lz of [-0.28, 0.28]) B.cyl(0.1, 0.1, 0.1, "#3a2a1a", lx, 0, lz, { in: g });
    B.ball(0.2, "#f4a3b8", -0.25, 0.68, 0, { in: g, sy: 0.7 });
    const head = B.grp(1.0, 1.45, 0, 0, 1, g);
    B.box(0.5, 0.5, 0.5, "#f6f2ea", 0, -0.25, 0, { in: head }); B.box(0.36, 0.28, 0.46, "#f4b8c4", 0.3, -0.4, 0, { in: head });
    for (const sz of [-1, 1]) { B.ball(0.06, "#1a1418", 0.26, 0.05, sz * 0.15, { in: head }); B.cone(0.05, 0.22, "#e8dcc0", 0, 0.24, sz * 0.2, { in: head }); B.box(0.1, 0.08, 0.26, "#f6f2ea", -0.05, 0.12, sz * 0.36, { in: head }); }
    B.cyl(0.03, 0.03, 0.7, "#2a2620", -0.88, 0.75, 0, { in: g, rz: 0.4 });
    return g;
  };

  return {
    cast: {
      walter: { jacket: "#4f5f7a", pants: "#3a3d48", boots: "#2a1a14", hat: "hair", hair: "#3a2a1a", skin: "#f5c9a0", moustache: "#3a2a1a", buttons: "#c9a44a" },
      n1: { jacket: "#8a3b2a", pants: "#2a2d38", boots: "#1a1418", hat: "bowler", skin: "#f0c8a0" },
      n2: { jacket: "#2e6a5a", pants: "#2a2d38", boots: "#1a1418", hat: "cap", cap: "#5a4a3a", capColor: "#5a4a3a", skin: "#c88a60" },
      grocer: { jacket: "#f0ece2", pants: "#3a3d48", boots: "#1a1418", hat: "hair", hair: "#8a8a8a", skin: "#f8d2b4", moustache: "#8a8a8a" },
    },
    sets: {
      // Walter's Brooklyn tailor shop, 1929: violet wallpaper, cutting table with cloth bolts, a dress form, the calendar
      tailor: (B) => {
        B.set.room({ style: "home", wall: "wallpaper:#5a4a7a", floor: "floor:#9a6b42", w: 7, d: 6, h: 3.2, windows: [0.4], door: false });
        B.prop.table({ x: 0, z: -1.2, w: 2.0, d: 0.9, col: "floor:#a87a4a" });
        [["#c0353a", -0.6], ["#2f5fb5", -0.35], ["#e8c070", -0.1]].forEach(([c, x]) => B.cyl(0.11, 0.11, 0.7, c, x + 0.1, 0.55, -1.0, { rz: Math.PI / 2 }));
        B.box(0.42, 0.22, 0.24, "#241726", 0.55, 0.78, -1.25); B.box(0.1, 0.3, 0.2, "#241726", 0.35, 0.9, -1.25); B.box(0.36, 0.08, 0.2, "#241726", 0.5, 1.12, -1.25); B.cyl(0.05, 0.05, 0.03, "#c9a44a", 0.72, 1.0, -1.12, { rx: Math.PI / 2 });
        H.tape = B.dyn(B.box(0.9, 0.02, 0.06, "#e8c070", 0.0, 0.79, -0.95));
        // dress form
        B.cyl(0.03, 0.03, 1.0, "#3a2a1a", 2.7, 0, -0.4); B.ball(0.3, "#c8a878", 2.7, 1.3, -0.4, { sy: 1.35 }); B.cyl(0.25, 0.25, 0.03, "#3a2a1a", 2.7, 0, -0.4);
        // calendar + framed certificate on the back wall
        B.plate(0.8, 0.95, B.textTex("", "#f4efe2", "#f4efe2", 256, 304), -2.2, 1.75, -2.96, { d: 0.02 });
        B.plate(0.72, 0.28, B.textTex("SEPT", "#c0353a", "#f4efe2", 512, 200), -2.2, 2.05, -2.94, { d: 0.02 });
        B.plate(0.72, 0.5, B.textTex("3", "#f4efe2", "#241726", 512, 356), -2.2, 1.7, -2.94, { d: 0.02 });
        B.plate(0.72, 0.18, B.textTex("1929", "#f4efe2", "#5a4a7a", 512, 128), -2.2, 1.38, -2.94, { d: 0.02 });
        B.plate(0.9, 0.6, B.textTex("STOCK", "#f4ead0", "#2a4a3a", 512, 341), 2.1, 1.75, -2.95, { d: 0.03, edge: "#c9a44a" });
        B.prop.sign({ x: 0.4, y: 2.55, z: -2.95, w: 2.2, h: 0.4, text: "W. TAILORING", bg: "#241726", fg: "#e8c070" });
        B.prop.lamp({ kind: "hang", x: 0, y: 3.2, z: -1.2, cord: 0.9, glow: "#ffe39a" });
        B.prop.rug({ x: 0, z: 0.3, w: 3, d: 2, col: "#7a3a4a" });
      },
      // Wall Street, 1929: stone fronts, a big quote board on a stand, a street sign
      wallst: (B) => {
        B.ground("cobble", 200, 200, { tile: 4 }); B.ground("concrete:#c8c2b8", 30, 3, { z: -4.6, y: 0.01 });
        B.facade({ style: "victorian", w: 6.2, x: -6.4, z: -6.2, seed: 5, col: "#b8aa94", floors: 4, sign: "BROKERS" });
        B.facade({ style: "brick", w: 6.2, x: 0, z: -6.2, seed: 9, col: "#8a7a6a", floors: 5, sign: "STOCK EXCHANGE" });
        B.facade({ style: "victorian", w: 6.2, x: 6.4, z: -6.2, seed: 12, col: "#a89a84", floors: 4, sign: "BANK" });
        H.board = B.prop.screen({ x: 0, z: -5.0, w: 3.0, h: 1.8, y0: 1.1, stand: true, curve: UP, label: "DOW", ticker: "1929" });
        B.prop.sign({ x: -3.6, z: -4.4, w: 1.3, h: 0.36, text: "WALL ST", bg: "#2a4a3a", fg: "#f4efe2", post: true });
        B.prop.lampPost({ x: 3.4, z: -4.4 });
        H.paper = B.dyn(B.grp(0, 0, 0, 0, 1)); B.plate(0.9, 1.2, B.textTex("STOCKS CRASH!", "#f2ede0", "#241726", 512, 680), 0, 0, 0, { in: H.paper, d: 0.01 }); H.paper.visible = false;
        for (let i = 0; i < 6; i++) B.plate(0.5, 0.65, B.textTex("SELL", "#f2ede0", "#c0353a", 256, 332), -4 + i * 1.7, 0.02, -2.5 + (i % 3) * 0.7, { d: 0.005, rx: -Math.PI / 2, ry: i * 0.7 });
      },
      // the county fair: striped tent, a pen, the cow, an auction price board and a milk pail
      fair: (B) => {
        B.set.landscape({ kind: "meadow", count: 14, clear: 14, seed: 9 });
        for (const [x, z, c] of [[-5, -7, "stripes:#c0353a:#f4efe2"], [5.5, -8, "stripes:#2f5fb5:#f4efe2"]]) { B.cyl(2.2, 2.2, 1.8, c, x, 0, z, { seg: 20 }); B.cone(2.5, 1.6, c, x, 1.8, z, { seg: 20 }); }
        B.prop.fence({ x: 0, z: -2.4, len: 6 });
        H.cow = cow(B, -0.4, -1.2);
        // auction board with two prices
        B.box(0.08, 2.2, 0.08, "#5a3a24", 1.9, 0, -2.1); B.box(0.08, 2.2, 0.08, "#5a3a24", 3.3, 0, -2.1);
        B.plate(1.6, 0.36, B.textTex("COW FOR SALE", "#f4efe2", "#5a3a24", 1024, 230), 2.6, 2.2, -2.05, { d: 0.04 });
        H.p381 = B.dyn(B.plate(1.5, 0.6, B.textTex("$381", "#f4efe2", "#2a6a2a", 1024, 410), 2.6, 1.7, -2.02, { d: 0.04 }));
        H.p41 = B.dyn(B.plate(1.5, 0.6, B.textTex("$41", "#f4efe2", "#c0353a", 1024, 410), 2.6, 1.7, -2.0, { d: 0.04 })); H.p41.visible = false;
        // milk pail
        B.cyl(0.24, 0.2, 0.42, "metal:#b8bec6", 0.6, 0, -0.5, { open: true, seg: 20 }); B.cyl(0.2, 0.2, 0.02, "metal:#8d949c", 0.6, 0.0, -0.5);
        H.milk = B.dyn(B.cyl(0.22, 0.2, 0.4, "#fbfbf6", 0.6, 0.01, -0.5, { seg: 20 }));
        H.crate = B.prop.crate({ x: -2.4, z: -0.4, size: 0.7, label: "SHARES" });
        B.prop.sign({ x: -3.4, z: -3.4, w: 1.5, h: 0.4, text: "COUNTY FAIR", bg: "#f2c14e", fg: "#5a2a1a", post: true });
      },
      // a 1936 corner grocery: counter, shelves, price board with falling arrows
      grocer: (B) => {
        B.set.room({ style: "kitchen", wall: "wallpaper:#2f6a7a", w: 7, d: 6, h: 3.2, windows: [], door: false });
        B.prop.counter({ x: 0, z: -1.6, w: 3.2, h: 1.0 });
        B.prop.shelf({ x: -2.3, z: -2.75, w: 1.8, h: 2.4, fill: "bottles" }); B.prop.shelf({ x: 2.3, z: -2.75, w: 1.8, h: 2.4, fill: "bottles" });
        for (let k = 0; k < 5; k++) B.ball(0.14, "#c8873a", -1.2 + k * 0.32, 1.12, -1.6, { sx: 1.6, sy: 0.8 });
        [["#c0353a", 0.7], ["#2f5fb5", 0.95], ["#e8c070", 1.2]].forEach(([c, x]) => B.box(0.22, 0.12, 0.5, c, x, 1.0, -1.6));
        B.prop.sign({ x: 0, y: 1.6, z: -2.95, w: 2.6, h: 0.9, text: "PRICES", bg: "#241726", fg: "#f4efe2" });
        B.prop.sign({ x: 0, y: 2.6, z: -2.95, w: 1.2, h: 0.35, text: "1936", bg: "#f4efe2", fg: "#2f6a7a" });
        B.prop.lamp({ kind: "hang", x: 0, y: 3.2, z: -1.0, cord: 0.9, glow: "#ffe39a" });
      },
      // metaphor: a time track of years 1929-1954 on a navy stage; the DOW marker crawls along it
      track: (B) => {
        B.set.stage({ floor: "#efe6d2", back: "#1e2a4a" });
        for (let y = 1929; y <= 1954; y++) B.box(0.44, 0.22 + (y % 5 === 4 ? 0.06 : 0), 0.9, y === 1936 ? "#4fd18b" : y % 2 ? "#e8dcc8" : "#d8ccb4", YX(y), 0, 0);
        for (const y of [1929, 1932, 1936, 1945, 1954]) B.plate(1.1, 0.42, B.textTex(String(y), y === 1936 ? "#4fd18b" : "#f4efe2", "#1e2a4a", 512, 196), YX(y), 0.75, 0.6, { d: 0.03 });
        H.dow = B.dyn(B.grp(YX(1929), 0.22, -0.1, 0, 1)); B.ball(0.32, "#c0353a", 0, 0.32, 0, { in: H.dow }); B.plate(0.7, 0.26, B.textTex("DOW", "#c0353a", "#f4efe2", 512, 190), 0, 0.95, 0, { in: H.dow, d: 0.02 });
      },
    },
    shots: [
      // 0 · frame 0: a STOCKS CRASH! front page tumbles down Wall Street at the lens
      { set: "wallst", f: 0, light: STORM, cam: CAM.fit([0, 1.8, -3.0], { w: 5.0, a0: -10, a1: 2, e0: 8, e1: 3, push: 0.16 }),
        act: (S, u, f) => { H.paper.visible = true; H.paper.position.set(-2.6 + 0.05 * f, 3.2 - 0.03 * f + 0.2 * Math.sin(f * 0.2), -5 + 0.07 * f); H.paper.rotation.set(0.3 * Math.sin(f * 0.15), 0.6 + 0.04 * f, 0.25 * Math.sin(f * 0.1));
          S.pop("label", W(0, "famous") - 2, 50, { x: 1.4, y: 3.4, z: -4.0, w: 1.1, h: 0.42, text: "1929", col: "#3a3a40", hold: true }); } },
      // 1 · didn't cost you twenty-five years: smash to the time track, the long road to 1954
      { set: "track", word: [0, "didn't"], trans: "smash", light: K.backdrop("#1e2a4a"), cam: CAM.still([YX(1929) - 1.6, 1.0, 2.0], [YX(1945), 0.3, -0.4], 45, 0.15),
        act: (S, u, f) => { S.pop("impact", W(0, "twenty-five") - 1, 40, { x: YX(1947), y: 1.5, z: -1.4, w: 1.7, h: 0.8, text: "25 YEARS?", hold: true }); S.kick(W(0, "twenty-five"), 0.05); } },
      // 2 · September third 1929: whip to the calendar in the tailor shop
      { set: "tailor", beat: 1, trans: "whip", light: "lamp", steady: true, cam: CAM.fit([-2.2, 1.72, -2.95], { w: 1.25, a0: 10, a1: -2, elev: 2, push: 0.14 }), coc: 10,
        act: (S, u, f) => { S.pop("label", W(1, "twenty-nine.") - 2, 30, { x: -2.2, y: 2.4, z: -2.8, w: 0.9, h: 0.22, text: "THE PEAK", col: "#c0353a" }); } },
      // 3 · you're Walter, a Brooklyn tailor
      { set: "tailor", word: [1, "You're"], lead: 3, trans: "dissolve", light: "lamp", cam: CAM.fit([0, 1.25, -1.5], { w: 2.5, a0: -14, a1: -3, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("walter", { x: -0.1, z: -1.95, expr: "smile", prop: "hold" }); H.tape.rotation.y = 0.2 * Math.sin(f * 0.1);
          S.pop("label", W(1, "Walter,") - 2, 40, { x: -0.1, y: AH + 0.45, z: -1.7, w: 0.9, h: 0.28, text: "WALTER", col: "#4f5f7a", hold: true });
          S.pop("label", W(1, "tailor,") - 2, 30, { x: 0.95, y: AH + 0.1, z: -1.5, w: 0.8, h: 0.26, text: "TAILOR", col: "#5a4a7a" }); } },
      // 4 · buying at the very top: whip to golden Wall Street, Walter marches to the brokers
      { set: "wallst", word: [1, "buying"], lead: 3, trans: "whip", light: "golden", cam: CAM.fit([-3.6, 1.4, -4.0], { w: 3.6, a0: 16, a1: 6, elev: 4, push: 0.12 }),
        act: (S, u, f) => { S.actor("walter", { x: -2.6 - 1.2 * u, z: -4.3, mode: "march", side: true, flip: true, phase: f * 0.06, expr: "grin" });
          S.pop("label", W(1, "top.") - 2, 34, { x: -4.4, y: 2.7, z: -5.0, w: 1.3, h: 0.34, text: "THE TOP", col: "#2a6a2a" }); S.pop("arrow", W(1, "very") - 2, 30, { x: -3.0, y: 2.6, z: -4.6, w: 0.3, h: 0.45, dir: "up", rise: 0.4 }); } },
      // 5 · the Dow closes at 381: the quote board climbs
      { set: "wallst", beat: 2, light: "golden", steady: true, cam: CAM.fit([0, 2.0, -5.0], { w: 3.6, a0: -6, a1: 4, elev: 4, push: 0.14 }), coc: 9,
        act: (S, u, f) => { H.board.draw({ curve: UP, t: E.prog(f, S.a, W(2, "eighty-one.")), label: "DOW", ticker: "SEPT 3, 1929" });
          S.pop("impact", W(2, "eighty-one.") - 2, 30, { x: 0.9, y: 3.3, z: -4.6, w: 1.1, h: 0.6, text: "381" }); } },
      // 6 · then October hits: smash into the storm, the line dives, papers fly
      { set: "wallst", word: [2, "Then"], lead: 1, trans: "smash", light: STORM, cam: CAM.fit([0, 1.9, -4.4], { w: 4.6, a0: 8, a1: -4, elev: 2, push: 0.16 }),
        act: (S, u, f) => { H.board.draw({ curve: CRASH, t: E.prog(f, S.a, S.a + 30), label: "DOW", down: true, ticker: "OCT 1929" }); S.kick(W(2, "October"), 0.09);
          S.pop("label", W(2, "October") - 2, 40, { x: -1.4, y: 3.4, z: -4.2, w: 1.3, h: 0.36, text: "OCTOBER", col: "#c0353a", hold: true }); for (let q = 0; q < 4; q++) S.pop("paper", S.a + 3 + q * 4, 30, { x: -1.6 + q, y: 2.4, z: -3.6, w: 0.4, h: 0.5, rise: -1.2, spin: 2, pop: q === 0 }); } },
      // 7 · by July 1932, it's 41: insert on the board
      { set: "wallst", beat: 3, trans: "whip", light: K.light("storm", { sat: 0.55 }), steady: true, cam: CAM.fit([0, 2.0, -5.0], { w: 3.4, a0: 6, a1: -4, elev: 2, push: 0.16 }), coc: 10,
        act: (S, u, f) => { H.board.draw({ curve: CRASH, t: 1, label: "DOW", down: true, ticker: "JULY 1932" });
          S.pop("impact", W(3, "forty-one.") - 1, 40, { x: 0.8, y: 1.5, z: -4.6, w: 1.0, h: 0.6, text: "41" }); S.kick(W(3, "forty-one."), 0.05); } },
      // 8 · eighty-nine percent, gone: wide of the empty storm street, -89% slams down
      { set: "wallst", word: [3, "Eighty-nine"], lead: 2, trans: "cut", light: K.light("storm", { sat: 0.5 }), cam: CAM.fit([0, 2.4, -4.4], { w: 8, a0: -6, a1: 4, e0: 14, e1: 8, push: 0.1 }),
        act: (S, u, f) => { H.board.draw({ curve: CRASH, t: 1, label: "DOW", down: true, ticker: "JULY 1932" });
          S.pop("impact", S.a + 2, 46, { x: 0, y: 3.2, z: -2.4, w: 3.0, h: 1.4, text: "−89%", hold: true }); S.pop("arrow", W(3, "gone.") - 2, 30, { x: 2.2, y: 3.6, z: -3.6, w: 0.5, h: 0.7, dir: "down", rise: -0.6 }); } },
      // 9 · your neighbors panic and sell: two neighbours run past, shouting
      { set: "wallst", beat: 4, trans: "whip", light: STORM, cam: CAM.fit([0.4, 1.4, -3.6], { w: 3.4, a0: 14, a1: 4, elev: 4, push: 0.12 }),
        act: (S, u, f) => { const t = f - S.a; S.actor("n1", { x: -0.6 + t * 0.03, z: -3.6, mode: "march", side: true, phase: f * 0.13, expr: "shock" }); S.actor("n2", { x: 0.6 + t * 0.03, z: -4.1, mode: "march", side: true, phase: f * 0.13 + 1, expr: "nervous" });
          S.fx("sweat", { x: 0.9 + t * 0.03, y: AH + 0.2, z: -3.6, w: 0.2, h: 0.2 }); S.say("SELL IT ALL!", W(4, "panic") - 4, 36, { x: -0.4, y: AH + 0.7, z: -3.4, w: 1.2, h: 0.5, tail: "left" }); } },
      // 10 · you just keep sewing: whip back to the shop, Walter calm at the table
      { set: "tailor", word: [4, "You"], lead: 3, trans: "whip", light: "lamp", cam: CAM.fit([0, 1.15, -1.5], { w: 2.3, a0: 12, a1: 2, elev: 8, push: 0.12 }),
        act: (S, u, f) => { S.actor("walter", { x: -0.1, z: -1.95, expr: "whistle", prop: "hold" }); H.tape.position.x = 0.1 * Math.sin(f * 0.3);
          S.pop("label", W(4, "sewing.") - 2, 30, { x: 0.9, y: AH + 0.3, z: -1.5, w: 0.8, h: 0.28, text: "HOLD", col: "#2a6a2a" }); } },
      // 11 · the Dow won't see 381 again: dissolve to the time track, the DOW marker crawls
      { set: "track", beat: 5, trans: "dissolve", light: K.backdrop("#1e2a4a"), cam: CAM.still([YX(1929) - 2.6, 1.4, 3.2], [YX(1934), 0.4, -0.3], 40, 0.12),
        act: (S, u, f) => { H.dow.position.x = YX(1929) + 2.5 * u; S.fx("zz", { x: YX(1929) + 2.5 * u + 0.4, y: 1.4, z: 0, w: 0.3, h: 0.3, t: (f % 40) / 40 });
          S.pop("label", W(5, "three") - 2, 34, { x: YX(1931), y: 1.55, z: 0.3, w: 0.8, h: 0.3, text: "381?", col: "#c0353a" }); } },
      // 12 · until 1954: swing down the track to the far end
      { set: "track", word: [5, "until"], lead: 2, light: K.backdrop("#1e2a4a"), cam: CAM.fit([YX(1953), 0.7, 0], { w: 3.0, a0: 10, a1: -2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.dow.position.x = YX(1951) + 1.4 * u;
          S.pop("impact", W(5, "fifty-four.") - 2, 34, { x: YX(1954) - 0.2, y: 1.6, z: 0.6, w: 1.1, h: 0.5, text: "1954" }); S.pop("bulb", W(5, "fifty-four.") + 4, 20, { x: YX(1954) - 0.9, y: 1.6, z: 0.6, w: 0.3, h: 0.4 }); } },
      // 13 · so how are you back to even by 1936? night shop, Walter puzzled
      { set: "tailor", beat: 6, trans: "whip", light: K.light("night", { hemi: 1.4 }), cam: CAM.fit([0, 1.3, -1.6], { w: 2.1, a0: -10, a1: 0, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("walter", { x: -0.1, z: -1.95, expr: "nervous", prop: "shrug" });
          S.pop("question", W(6, "how") - 2, 40, { x: 0.65, y: AH + 0.4, z: -1.7, w: 0.3, h: 0.45, hold: true }); S.pop("label", W(6, "thirty-six?") - 4, 30, { x: -0.8, y: AH + 0.5, z: -1.7, w: 0.8, h: 0.28, text: "1936?", col: "#2a3a5a" }); } },
      // 14 · you see, a stock is a cow: push-through into the county fair
      { set: "fair", beat: 7, trans: "zoom", light: "spring", cam: CAM.fit([0.4, 1.3, -1.2], { w: 4.6, a0: -12, a1: -2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.cow.children[H.cow.children.length - 2].rotation.z = 0.1 * Math.sin(f * 0.2);
          S.pop("label", W(7, "cow.") - 4, 34, { x: -0.3, y: 2.35, z: -1.0, w: 1.5, h: 0.4, text: "THE STOCK", col: "#2a6a2a", hold: true }); } },
      // 15 · its price crashes at the fair: the auction board flips 381 → 41
      { set: "fair", word: [7, "price"], lead: 3, trans: "whip", light: "spring", steady: true, cam: CAM.fit([2.6, 1.85, -2.0], { w: 2.4, a0: 8, a1: -4, elev: 2, push: 0.16 }), coc: 10,
        act: (S, u, f) => { const down = f >= W(7, "crashes"); H.p381.visible = !down; H.p41.visible = down; S.kick(W(7, "crashes"), 0.07);
          S.pop("arrow", W(7, "crashes") + 1, 30, { x: 3.15, y: 1.95, z: -1.8, w: 0.3, h: 0.5, dir: "down", rise: -0.5 }); } },
      // 16 · but it still gives milk: insert on the pail filling
      { set: "fair", word: [7, "still"], lead: 3, trans: "cut", light: "spring", steady: true, cam: CAM.fit([0.6, 0.45, -0.5], { w: 1.2, a0: -6, a1: 6, elev: 22, push: 0.14 }), coc: 12,
        act: (S, u, f) => { H.milk.scale.y = 0.2 + 0.6 * E.prog(f, S.a, S.b ?? S.a + 40);
          S.pop("label", W(7, "milk.") - 2, 30, { x: 0.6, y: 1.0, z: -0.4, w: 0.6, h: 0.22, text: "MILK", col: "#2f5fb5" }); S.pop("puff", W(7, "milk.") , 20, { x: 0.6, y: 0.6, z: -0.4, w: 0.4, h: 0.3 }); } },
      // 17 · at the bottom, dividends paid almost 14%: Walter with the pail, label slams
      { set: "fair", beat: 8, trans: "whip", light: "golden", cam: CAM.fit([0.3, 1.3, -0.6], { w: 3.0, a0: 16, a1: 6, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.milk.scale.y = 0.8; S.actor("walter", { x: 1.2, z: -0.3, expr: "grin", prop: "point", look: -0.6 });
          S.pop("label", W(8, "dividends") - 2, 40, { x: 0.3, y: 2.4, z: -0.6, w: 1.3, h: 0.34, text: "DIVIDENDS", col: "#2f5fb5", hold: true });
          S.pop("impact", W(8, "fourteen") - 1, 40, { x: -0.6, y: 1.9, z: -0.3, w: 1.1, h: 0.6, text: "≈14%", hold: true }); } },
      // 18 · and you reinvest every check: coins flip from the pail into the SHARES crate
      { set: "fair", word: [8, "reinvest"], lead: 3, trans: "whip", light: "golden", cam: CAM.fit([-1.0, 0.9, -0.4], { w: 3.4, a0: -10, a1: 2, elev: 10, push: 0.12 }),
        act: (S, u, f) => { H.milk.scale.y = 0.8; S.actor("walter", { x: -1.2, z: 0.3, expr: "laugh", prop: "up" });
          for (let q = 0; q < 6; q++) { const k = E.prog(f, S.a + q * 5, S.a + q * 5 + 14); if (k > 0 && k < 1) S.fx("coin", { x: 0.6 - 3.0 * k, y: 0.6 + 1.2 * Math.sin(Math.PI * k), z: -0.45, w: 0.2, h: 0.2 }); }
          S.pop("label", W(8, "check.") - 2, 30, { x: -2.4, y: 1.3, z: -0.2, w: 1.1, h: 0.3, text: "+ SHARES", col: "#2a6a2a" }); } },
      // 19 · meanwhile, everything gets cheaper: whip to the 1936 grocery
      { set: "grocer", beat: 9, trans: "whip", light: "interior", cam: CAM.fit([0, 1.5, -1.6], { w: 3.4, a0: -12, a1: -2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("grocer", { x: 0.3, z: -2.2, expr: "smile", prop: "point", look: 0.4 });
          for (let q = 0; q < 3; q++) S.pop("arrow", W(9, "cheaper.") - 6 + q * 4, 34, { x: -0.8 + q * 0.8, y: 2.0, z: -2.6, w: 0.3, h: 0.45, dir: "down", rise: -0.4, pop: q === 0 }); } },
      // 20 · living costs fall over 18%: insert on the price board
      { set: "grocer", word: [9, "Living"], lead: 3, steady: true, light: "interior", cam: CAM.fit([0, 1.95, -2.9], { w: 2.4, a0: 6, a1: -4, elev: 2, push: 0.16 }), coc: 11,
        act: (S, u, f) => { S.pop("impact", W(9, "eighteen") - 1, 40, { x: 0, y: 2.0, z: -2.6, w: 1.4, h: 0.7, text: "−18%", hold: true }); S.kick(W(9, "eighteen"), 0.05); } },
      // 21 · every dollar buys more bread, more cloth, more shares: Walter at the counter
      { set: "grocer", beat: 10, trans: "dissolve", light: K.light("interior", { hemi: 1.4 }), cam: CAM.fit([-0.4, 1.35, -0.9], { w: 2.8, a0: 12, a1: 2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("walter", { x: -0.6, z: -0.8, expr: "grin", prop: "hold" }); S.actor("grocer", { x: 0.6, z: -2.2, expr: "smile", prop: "hold" });
          S.fx("dollar", { x: -0.3, y: 1.3, z: -0.6, w: 0.3, h: 0.3 });
          [["bread,", "BREAD", "#c8873a"], ["cloth,", "CLOTH", "#5a4a7a"], ["shares.", "SHARES", "#2a6a2a"]].forEach(([w, t, c], q) => S.pop("label", W(10, w) - 3, 40, { x: -1.0 + q * 0.75, y: 2.25 - q * 0.05, z: -0.7, w: 0.75, h: 0.26, text: t, col: c, hold: true })); } },
      // 22 · count the milk and the cheaper bread: time-jump flash to the track
      { set: "track", beat: 11, trans: "flash", light: K.backdrop("#1e3a4a"), cam: CAM.fit([YX(1933.5), 0.8, 0], { w: 3.6, a0: -12, a1: -2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.dow.position.x = YX(1933);
          S.pop("label", W(11, "milk") - 2, 34, { x: YX(1932), y: 1.7, z: 0.6, w: 1.0, h: 0.32, text: "+ MILK", col: "#2f5fb5", hold: true }); S.pop("label", W(11, "cheaper") - 2, 34, { x: YX(1935), y: 1.3, z: 0.6, w: 1.4, h: 0.32, text: "+ CHEAP BREAD", col: "#c8873a", hold: true }); } },
      // 23 · you're even by late 1936: Walter jumps onto the green 1936 block
      { set: "track", word: [11, "even"], lead: 3, trans: "cut", light: K.backdrop("#1e3a4a"), cam: CAM.fit([YX(1936), 1.2, 0.3], { w: 2.8, a0: 10, a1: 2, elev: 6, push: 0.14 }),
        act: (S, u, f) => { const hit = W(11, "thirty-six."); const j = E.prog(f, hit - 10, hit); S.actor("walter", { x: YX(1936) - 0.6 * (1 - j), y: 0.22 + 0.5 * Math.sin(Math.PI * j), z: 0.1, expr: f >= hit ? "laugh" : "grin", prop: "up" });
          S.pop("impact", hit, 40, { x: YX(1936) + 0.9, y: 2.3, z: 0.4, w: 1.1, h: 0.6, text: "EVEN!", hold: true }); S.pop("confetti", hit + 2, 30, { x: YX(1936), y: 2.4, z: 0.3, w: 1.6, h: 1.0 }); } },
      // 24 · the Dow took twenty-five years: dissolve to the DOW marker plodding past 1945
      { set: "track", beat: 12, trans: "whip", light: K.backdrop("#1e2a4a"), cam: CAM.still([YX(1951) + 2.6, 1.4, 3.2], [YX(1944), 0.4, -0.3], 40, 0.12),
        act: (S, u, f) => { H.dow.position.x = YX(1944) + 1.4 * u; S.fx("sweat", { x: YX(1944) + 1.4 * u + 0.4, y: 1.3, z: 0.1, w: 0.2, h: 0.2 });
          S.pop("label", W(12, "twenty-five") - 2, 36, { x: YX(1946), y: 1.7, z: 0.4, w: 1.2, h: 0.36, text: "25 YEARS", col: "#c0353a", hold: true }); } },
      // 25 · the cow never stopped giving milk: whip to the fair, the pail overflows and splashes the lens on the last word
      { set: "fair", word: [12, "The", 1], lead: 2, trans: "whip", light: K.light("golden", { sat: 1.15 }), cam: CAM.fit([0.45, 1.0, -0.6], { w: 3.3, a0: -14, a1: -4, elev: 6, push: 0.14 }),
        act: (S, u, f) => { const hit = W(12, "milk.") + 3; H.milk.scale.y = Math.min(1.08, 0.85 + 0.25 * E.prog(f, S.a, hit)); S.actor("walter", { x: 1.35, z: 0.45, expr: f >= hit ? "laugh" : "smile", prop: "chin" });
          H.cow.children[H.cow.children.length - 2].rotation.z = 0.12 * Math.sin(f * 0.25);
          S.pop("impact", hit, 30, { x: 0.6, y: 1.4, z: -0.2, w: 1.3, h: 0.75, text: "SPLASH!" }); S.kick(hit, 0.12); S.pop("puff", hit, 26, { x: 0.6, y: 0.7, z: -0.2, w: 1.2, h: 0.8 }); S.pop("stars", hit + 3, 24, { x: 0.6, y: 1.0, z: -0.3, w: 1.0, h: 0.5 }); } },
    ],
  };
};
