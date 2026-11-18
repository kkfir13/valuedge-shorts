// "The Busiest Traders Earned the Least" (Barber & Odean, 66,465 discount-broker households, 1991-1996) — timed to Jackson.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const AH = 1.58;
  const H = {};
  const lerp = (a, b, k) => a + (b - a) * k;
  const PHONE = [1.25, 1.35, -2.9];            // wall phone cradle in the kitchen
  const EAR = [1.32, 1.47, -2.15];             // receiver held at Dave's ear (Dave at x 1.05, z -2.3)
  const BOOTHS = [-8, -20, -32, -44];           // toll booth z positions on the highway
  const BARV = [17.9, 11.4, 18.5].map((v) => v / 20);

  // a toll booth on the right shoulder with a striped barrier arm across the road
  const booth = (B, z) => {
    const g = B.grp(4.0, 0, z, 0, 1);
    B.box(1.5, 2.4, 1.5, "plaster:#f2c14e", 0, 0, 0, { in: g }); B.box(1.9, 0.2, 1.9, "#c0353a", 0, 2.4, 0, { in: g });
    B.plate(1.0, 0.6, "#9cc4e8", -0.76, 1.5, 0, { in: g, ry: -Math.PI / 2, d: 0.02 });
    B.plate(1.3, 0.38, B.textTex("TOLL", "#c0353a", "#ffffff", 512, 150), 0, 2.85, 0.0, { in: g, d: 0.05 });
    const arm = B.dyn(B.grp(3.0, 1.0, z, 0, 1)); B.box(6.2, 0.14, 0.14, "stripes:#e2453c:#f4efe2", -3.1, -0.07, 0, { in: arm });
    B.box(0.3, 1.0, 0.3, "#3a3a40", 3.0, 0, z);
    return arm;
  };

  return {
    cast: {
      dave: { jacket: "#7a3aa8", pants: "#2a3550", boots: "#f4f4f0", hat: "hair", hair: "#3a2a1a", skin: "#f5c9a0", buttons: "#4fd1c8" },
      pat: { jacket: "#5a8a6a", pants: "#6a5a4a", boots: "#5a3a24", hat: "hair", hair: "#dcdcdc", dress: "#7aa86a", skin: "#f0c8a0" },
    },
    sets: {
      // Dave's early-90s kitchen: tiled walls, a beige wall phone with a coiled cord, a calendar, a table with a piggy bank
      kitchen: (B) => {
        B.set.room({ style: "kitchen", w: 8, d: 6, h: 3.2, windows: [-2.4], door: false });
        B.prop.counter({ x: -1.4, z: -2.6, w: 3.4, h: 0.95, col: "planks:#c8a070", top: "#e8e0d0" });
        B.box(0.9, 1.9, 0.7, "#e8f0f0", -3.4, 0, -2.6); B.box(0.05, 0.5, 0.05, "#8a8a90", -3.0, 1.2, -2.24);
        B.box(0.26, 0.42, 0.08, "#e8dcc0", PHONE[0], PHONE[1] - 0.2, -2.98); B.box(0.1, 0.1, 0.04, "#c0b8a0", PHONE[0], PHONE[1] - 0.05, -2.92);
        H.recv = B.dyn(B.grp(PHONE[0], PHONE[1] + 0.12, -2.88, 0, 1));
        B.box(0.36, 0.06, 0.07, "#e8dcc0", 0, -0.03, 0, { in: H.recv }); for (const sx of [-1, 1]) B.box(0.1, 0.1, 0.11, "#e8dcc0", sx * 0.16, -0.06, 0.01, { in: H.recv });
        // calendar with a header and a day grid
        B.plate(0.9, 1.0, B.textTex("", "#ffffff", "#ffffff", 400, 444), 2.4, 1.75, -2.97, { d: 0.02 });
        B.plate(0.86, 0.22, B.textTex("MAY 1992", "#c0353a", "#ffffff", 512, 131), 2.4, 2.12, -2.95, { d: 0.02 });
        for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) B.box(0.12, 0.1, 0.01, "#d8d4cc", 2.08 + c * 0.16, 1.35 + r * 0.18, -2.95);
        B.prop.table({ x: -0.6, z: -0.6, w: 1.4, d: 0.9, col: "#e8e0d0" });
        H.piggy = B.prop.piggy({ x: -0.9, y: 0.78, z: -0.6, size: 0.36, ry: 0.4 });
        B.prop.newspaper({ x: -0.25, y: 0.79, z: -0.6, flat: true, text: "STOCKS" });
        B.prop.chair({ x: -0.6, z: -1.3 });
        B.prop.lamp({ kind: "hang", x: -0.6, y: 3.1, z: -0.6, glow: "#ffe2b0", intensity: 4, dist: 7, col: "#c84a3a" });
        B.prop.plant({ x: 3.4, z: -2.5 });
      },
      // a quiet suburban street: Dave's and Pat's houses side by side, mailboxes with their names
      suburb: (B) => {
        B.set.landscape({ kind: "meadow", count: 16, clear: 10, seed: 12 });
        B.box(40, 0.02, 4, "asphalt", 0, 0, 2.5);
        B.facade({ style: "village", w: 6, x: -3.8, z: -6, seed: 21, col: "#e8b8a0" });
        B.facade({ style: "village", w: 6, x: 3.8, z: -6, seed: 44, col: "#b8d8e8" });
        B.prop.fence({ x: -3.8, z: -1.0, len: 5.4, col: "#f4f0e6" }); B.prop.fence({ x: 3.8, z: -1.0, len: 5.4, col: "#f4f0e6" });
        B.prop.sign({ x: -1.6, z: -0.6, w: 0.9, h: 0.32, text: "DAVE", bg: "#7a3aa8", fg: "#ffffff", post: true, edge: "#3a3a40" });
        B.prop.sign({ x: 1.6, z: -0.6, w: 0.9, h: 0.32, text: "PAT", bg: "#5a8a6a", fg: "#ffffff", post: true, edge: "#3a3a40" });
        B.prop.tree({ x: 8.5, z: -3 }); B.prop.tree({ x: -9, z: -4 }); B.prop.bush({ x: 1.0, z: -1.6 }); B.prop.bush({ x: -6.4, z: -1.6 });
      },
      // Pat's backyard: picket fence, an oak, a bench, and an untouched phone on a side table
      garden: (B) => {
        B.set.landscape({ kind: "meadow", count: 14, clear: 9, seed: 7 });
        B.prop.fence({ x: 0, z: -3.2, len: 9, col: "#f4f0e6" });
        B.prop.tree({ x: -2.6, z: -4.6 }); B.prop.bush({ x: 2.8, z: -3.8 }); B.prop.bush({ x: -4.4, z: -2.8 });
        B.prop.bench({ x: 0, z: -1.2 });
        B.prop.table({ x: 1.45, z: -1.0, w: 0.6, d: 0.5, h: 0.6, col: "planks:#a87a4a" });
        B.box(0.34, 0.12, 0.24, "#c8beac", 1.45, 0.6, -1.0); H.prec = B.dyn(B.grp(1.45, 0.78, -1.0, 0, 1)); B.box(0.32, 0.06, 0.07, "#c8beac", 0, -0.03, 0, { in: H.prec });
        H.web = B.dyn(B.grp(1.66, 0.6, -0.8, 0.3, 1)); B.plate(0.12, 0.12, B.textTex("✳", "#c8beac", "#f4f4f4", 256, 256), 0, 0.06, 0, { in: H.web, d: 0.002 });
        for (let i = 0; i < 5; i++) B.ball(0.12, ["#e2453c", "#f2c14e", "#e88ab8", "#ffffff", "#f2c14e"][i], -3.6 + i * 0.4, 0.15, -2.9, { sy: 0.8 });
      },
      // the research room: two empty desks under green lamps, mountains of printouts, a banner with the sample size
      archive: (B) => {
        B.set.room({ style: "library", w: 9, d: 7, h: 3.6, door: false, windows: [] });
        B.prop.sign({ x: 0, y: 2.55, z: -3.4, w: 3.8, h: 0.6, text: "66,465 HOUSEHOLDS", bg: "#1a2a3a", fg: "#f2c14e" });
        for (const sx of [-1.4, 1.4]) { B.prop.desk({ x: sx, z: -1.6, w: 1.8 }); B.prop.chair({ x: sx, z: -0.9, ry: Math.PI }); B.prop.lamp({ x: sx + 0.6, y: 0.78, z: -1.8, glow: "#ffe39a", intensity: 3 }); }
        H.stacks = [];
        for (let i = 0; i < 8; i++) { const x = -3.4 + i * 0.95 + (i > 3 ? 0.2 : -0.2), z = -2.7 + (i % 2) * 0.3; const g = B.dyn(B.grp(x, 0, z, 0, 1)); B.box(0.55, 1, 0.42, "#f6f6ee", 0, 0, 0, { in: g }); B.box(0.56, 0.02, 0.43, "#9ab8d8", 0, 0.5, 0, { in: g }); H.stacks.push(g); }
        for (const sx of [-1.4, 1.4]) B.box(0.5, 0.3, 0.38, "#f6f6ee", sx - 0.3, 0.78, -1.7);
      },
      // metaphor stage: three bars on a warm brown stage — the market, busy Dave, patient Pat
      bars: (B) => {
        B.set.stage({ floor: "#f4ead8", back: "#7a3a1a" });
        H.bars = B.prop.bars3d({ x: 0, z: 0, vals: BARV, cols: ["#f2c14e", "#e2453c", "#4fd18b"], bw: 1.0, gap: 0.5, h: 3.2 });
        [["MARKET", "#8a6a10"], ["BUSY DAVE", "#c0353a"], ["PAT", "#2a7a4a"]].forEach(([t, c], i) => B.plate(1.2, 0.3, B.textTex(t, "#ffffff", c, 512, 128), (i - 1) * 1.5, 0.2, 0.6, { d: 0.02 }));
      },
      // the trading highway: desert road, a gantry sign, toll booths at every exit, Dave's red car and the gold market car
      highway: (B) => {
        B.set.landscape({ kind: "desert", road: 6, count: 12, clear: 16, seed: 9 });
        B.prop.sign({ x: 0, z: -2.5, w: 4.0, h: 0.7, text: "TRADING HWY", bg: "#2a7a4a", fg: "#ffffff", post: true, edge: "#5a5e66" });
        H.arms = BOOTHS.map((z) => booth(B, z));
        H.car = B.prop.car({ x: -1.3, z: 6, ry: Math.PI / 2, col: "#e2453c" });
        H.gold = B.prop.car({ x: 1.4, z: 6, ry: Math.PI / 2, col: "#f2c14e" });
        H.till = B.prop.coinStack({ x: 3.2, y: 1.05, z: BOOTHS[0] + 0.9, r: 0.12, n: 10 });
        B.box(0.6, 1.05, 0.5, "#c8a03a", 3.2, 0, BOOTHS[0] + 0.9);
      },
    },
    shots: [
      // 0 · frame 0: the kitchen wall phone rings, receiver hopping on its cradle
      { set: "kitchen", f: 0, light: "interior", steady: true, cam: CAM.fit([PHONE[0], PHONE[1] + 0.05, -2.9], { w: 0.9, a0: -18, a1: -4, elev: 4, push: 0.22 }), coc: 11,
        act: (S, u, f) => { H.recv.position.y += 0.03 * Math.abs(Math.sin(f * 1.4)); H.recv.rotation.z = 0.12 * Math.sin(f * 1.4);
          S.pop("impact", 2, 26, { x: PHONE[0] + 0.02, y: PHONE[1] + 0.42, z: -2.7, w: 0.5, h: 0.36, text: "RING!" }); S.kick(3, 0.04); } },
      // 1 · the investors who worked hardest: Dave on the phone, sweating, papers flying
      { set: "kitchen", word: [0, "worked"], trans: "whip", light: "interior", cam: CAM.fit([1.05, 1.25, -2.3], { w: 2.2, a0: -14, a1: -2, elev: 6, push: 0.14 }),
        act: (S, u, f) => { S.actor("dave", { x: 1.05, z: -2.3, expr: "grin", prop: "point" }); H.recv.position.set(...EAR); H.recv.rotation.set(0, 0, 1.35);
          for (let q = 0; q < 4; q++) S.pop("paper", S.a + 4 + q * 6, 24, { x: 0.3 + q * 0.4, y: 1.9, z: -2.0, w: 0.26, h: 0.32, rise: -0.6, spin: q % 2 ? 2 : -2, pop: q === 0 });
          S.pop("sweat", W(0, "hardest") , 30, { x: 1.3, y: AH + 0.15, z: -2.2, w: 0.2, h: 0.2 }); S.pop("label", W(0, "hardest") - 2, 34, { x: 0.95, y: 2.3, z: -2.0, w: 1.0, h: 0.32, text: "BUY! SELL!", col: "#7a3aa8" }); } },
      // 2 · earned the least: one tiny coin drops into the piggy bank
      { set: "kitchen", word: [0, "earned"], lead: 3, steady: true, light: "interior", cam: CAM.fit([-0.9, 0.95, -0.6], { w: 0.9, a0: 10, a1: 2, elev: 14, push: 0.16 }), coc: 11,
        act: (S, u, f) => { const k = E.easeIn(E.prog(f, S.a, W(0, "least.") + 2)); S.fx("coin", { x: -0.9, y: 1.7 - 0.55 * k, z: -0.6, w: 0.08, h: 0.08 });
          S.pop("label", W(0, "least.") , 30, { x: -0.9, y: 1.4, z: -0.5, w: 0.5, h: 0.16, text: "THE LEAST", col: "#c0353a", hold: true }); S.sfx("ting", W(0, "least.") + 2); } },
      // 3 · imagine it's the early nineties: whip to the sunny suburb, two houses side by side
      { set: "suburb", beat: 1, trans: "whip", light: "golden", cam: CAM.fit([0, 2.4, -3.0], { w: 9.0, a0: -10, a1: 6, e0: 14, e1: 6, push: 0.1 }),
        act: (S, u, f) => { S.actor("dave", { x: -2.4, z: -0.2, expr: "grin", mode: "stroll", phase: f * 0.05 });
          S.pop("label", W(1, "early") - 2, 40, { x: 0, y: 4.2, z: -1.0, w: 1.8, h: 0.5, text: "EARLY '90s", col: "#c0602a", hold: true }); } },
      // 4 · you're Dave, calling your broker: Dave at the wall phone, speech bubble
      { set: "kitchen", word: [1, "You're"], lead: 3, trans: "whip", light: "interior", cam: CAM.fit([1.05, 1.3, -2.3], { w: 1.9, a0: 12, a1: 4, elev: 4, push: 0.12 }), coc: 9,
        act: (S, u, f) => { S.actor("dave", { x: 1.05, z: -2.3, expr: "smile", prop: "hold" }); H.recv.position.set(...EAR); H.recv.rotation.set(0, 0, 1.35);
          S.pop("label", W(1, "Dave,") - 2, 30, { x: 0.55, y: AH + 0.35, z: -2.1, w: 0.6, h: 0.26, text: "DAVE", col: "#7a3aa8" });
          S.say("It's Dave again!", W(1, "calling") - 2, 32, { x: 0.45, y: AH + 0.55, z: -2.0, w: 1.3, h: 0.42, tail: "right" }); } },
      // 5 · every week: insert on the calendar, red rings land on every week
      { set: "kitchen", word: [1, "every"], lead: 3, steady: true, light: "interior", cam: CAM.fit([2.4, 1.72, -2.95], { w: 1.15, a0: -8, a1: 4, elev: 2, push: 0.12 }), coc: 10,
        act: (S, u, f) => { for (let r = 0; r < 4; r++) S.pop("ring", W(1, "every") + r * 4, 60, { x: 2.24 + (r % 2) * 0.32, y: 1.9 - r * 0.18, z: -2.92, w: 0.17, h: 0.15, hold: true, col: "#e2453c", pop: r === 0 }); } },
      // 6 · buy this, sell that: Dave shouts into the phone, certificates pop in and out
      { set: "kitchen", beat: 2, trans: "smash", light: K.light("interior", { sat: 1.15 }), cam: CAM.fit([0.9, 1.35, -2.2], { w: 2.4, a0: -10, a1: 2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { const sold = f >= W(2, "sell") - 2; S.actor("dave", { x: 1.05, z: -2.3, expr: sold ? "shock" : "laugh", prop: sold ? "fists" : "up" }); H.recv.position.set(...EAR); H.recv.rotation.set(0, 0, 1.35);
          S.say("BUY!", W(2, "Buy") - 2, 20, { x: 0.3, y: AH + 0.6, z: -2.0, w: 0.8, h: 0.42 }); S.say("SELL!", W(2, "sell") - 2, 22, { x: 0.3, y: AH + 0.6, z: -2.0, w: 0.8, h: 0.42 });
          S.pop("arrow", W(2, "Buy") , 18, { x: 1.55, y: 1.85, z: -2.0, w: 0.3, h: 0.45, dir: "up" }); S.pop("arrow", W(2, "sell") , 18, { x: 1.55, y: 1.85, z: -2.0, w: 0.3, h: 0.45, dir: "down" }); } },
      // 7 · your portfolio turns over more than twice a year: certificates spin round the table like a carousel
      { set: "kitchen", word: [2, "portfolio"], lead: 3, trans: "whip", light: "interior", cam: CAM.fit([-0.6, 1.05, -0.6], { w: 1.8, a0: -20, a1: 10, elev: 24, push: 0.1 }), coc: 9,
        act: (S, u, f) => { const t = (f - S.a) * 0.12; for (let q = 0; q < 6; q++) { const a = t + (q * Math.PI) / 3; S.fx("paper", { x: -0.6 + 0.55 * Math.cos(a), y: 1.15 + 0.08 * Math.sin(a * 2), z: -0.6 + 0.35 * Math.sin(a), w: 0.22, h: 0.28, rot: a }); }
          S.pop("label", W(2, "twice") - 2, 40, { x: -0.6, y: 1.65, z: -0.4, w: 0.9, h: 0.26, text: "250% A YEAR", col: "#7a3aa8", hold: true }); } },
      // 8 · your neighbor Pat: whip to the backyard, Pat relaxing on the bench
      { set: "garden", beat: 3, trans: "whip", light: "spring", cam: CAM.fit([0.3, 1.0, -1.1], { w: 2.8, a0: -16, a1: -4, elev: 8, push: 0.12 }),
        act: (S, u, f) => { S.actor("pat", { x: -0.2, z: -1.2, mode: "sit", expr: "smile_closed" });
          S.pop("label", W(3, "Pat") - 2, 34, { x: -0.2, y: 1.75, z: -1.0, w: 0.55, h: 0.26, text: "PAT", col: "#2a7a4a" }); S.pop("zz", W(3, "barely") , 40, { x: 0.15, y: 1.55, z: -1.1, w: 0.2, h: 0.2, rise: 0.2 }); } },
      // 9 · barely touches the phone: insert on the dusty phone, a cobweb glints
      { set: "garden", word: [3, "touches"], lead: 3, steady: true, light: "spring", cam: CAM.fit([1.45, 0.75, -1.0], { w: 0.75, a0: 14, a1: 4, elev: 18, push: 0.14 }), coc: 12,
        act: (S, u, f) => { S.pop("puff", W(3, "phone.") - 2, 26, { x: 1.45, y: 0.85, z: -0.9, w: 0.4, h: 0.2 }); S.pop("label", W(3, "phone.") + 2, 30, { x: 1.45, y: 1.05, z: -0.85, w: 0.42, h: 0.13, text: "UNTOUCHED", col: "#5a6a5a", hold: true }); } },
      // 10 · two professors studied: whip into the research room, printouts fly off two empty desks
      { set: "archive", beat: 4, trans: "whip", light: "lamp", cam: CAM.fit([0, 1.6, -2.2], { w: 5.0, a0: -12, a1: 4, e0: 10, e1: 4, push: 0.12 }),
        act: (S, u, f) => { H.stacks.forEach((s, i) => (s.scale.y = 0.4 + 1.4 * E.back(E.prog(f, S.a + i * 3, S.a + i * 3 + 14))));
          for (let q = 0; q < 5; q++) S.pop("paper", S.a + 3 + q * 5, 26, { x: -1.4 + (q % 2) * 2.8, y: 1.1, z: -1.5, w: 0.26, h: 0.32, rise: 0.9, spin: q % 2 ? 2 : -2, pop: q === 0 });
          S.pop("label", W(4, "sixty-six") - 2, 40, { x: 0, y: 2.05, z: -2.9, w: 1.6, h: 0.32, text: "1991 – 1996", col: "#1a2a3a", hold: true }); } },
      // 11 · households like yours: the printout towers grow, each with a little house stamp
      { set: "archive", word: [4, "households"], lead: 3, light: "lamp", cam: CAM.fit([0, 1.3, -2.6], { w: 3.2, a0: 10, a1: -4, elev: 14, push: 0.14 }), coc: 9,
        act: (S, u, f) => { H.stacks.forEach((s, i) => (s.scale.y = 1.8 + 0.25 * Math.sin((f + i * 7) * 0.2)));
          for (let q = 0; q < 6; q++) S.pop("label", S.a + 2 + q * 3, 40, { x: -2.4 + q * 0.95, y: 2.1, z: -2.4, w: 0.36, h: 0.2, text: "⌂", col: "#2a7a4a", pop: q === 0, hold: true }); } },
      // 12 · the market returned 17.9%: whip to the stage, the gold market bar rises
      { set: "bars", beat: 5, trans: "whip", light: K.backdrop("#7a3a1a"), cam: CAM.fit([0, 1.6, 0], { w: 5.4, a0: -16, a1: -4, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.bars.grow([E.back(E.prog(f, W(5, "returned"), W(5, "nine") + 4)), 0, 0]);
          S.pop("label", W(5, "seventeen") - 2, 50, { x: -1.5, y: 3.35, z: 0.6, w: 1.1, h: 0.4, text: "17.9%", col: "#8a6a10", hold: true }); } },
      // 13 · the busiest traders? Dave's red bar starts up, Dave points proudly
      { set: "bars", beat: 6, light: K.backdrop("#7a3a1a"), cam: CAM.fit([0.2, 1.4, 0.6], { w: 4.2, a0: 14, a1: 6, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.bars.grow([1, 0.6 * E.prog(f, S.a, W(6, "Eleven")), 0]); S.actor("dave", { x: 0.9, z: 1.3, expr: "grin", prop: "point", look: -0.4 });
          S.pop("question", W(6, "traders?") , 24, { x: 0.0, y: 2.6, z: 0.8, w: 0.4, h: 0.55 }); } },
      // 14 · eleven point four: smash, the red bar stalls short, Dave's face drops
      { set: "bars", word: [6, "Eleven"], lead: 2, trans: "smash", light: K.backdrop("#6a2a14"), cam: CAM.fit([0, 1.5, 0.8], { w: 3.4, a0: -6, a1: 2, elev: 4, push: 0.14 }),
        act: (S, u, f) => { H.bars.grow([1, 0.6 + 0.4 * E.back(E.prog(f, S.a, S.a + 8)), 0]); S.actor("dave", { x: 0.9, z: 1.3, expr: "shock", prop: "up", look: -0.4 }); S.kick(S.a + 6, 0.07);
          S.pop("impact", S.a + 4, 40, { x: 0, y: 2.35, z: 0.7, w: 1.2, h: 0.75, text: "11.4%", hold: true }); S.pop("sweat", W(6, "four.") , 26, { x: 1.15, y: AH + 0.15, z: 1.4, w: 0.2, h: 0.2 }); } },
      // 15 · so where did the money go? Dave shrugs between the bars, question marks
      { set: "bars", beat: 7, trans: "dissolve", light: K.backdrop("#3a1a0a"), cam: CAM.fit([0.4, 1.3, 1.0], { w: 2.6, a0: 18, a1: 8, elev: 4, push: 0.1 }), coc: 9,
        act: (S, u, f) => { H.bars.grow([1, 1, 0]); S.actor("dave", { x: 0.9, z: 1.3, expr: "nervous", prop: "shrug" });
          S.pop("question", W(7, "where") - 2, 40, { x: 0.4, y: AH + 0.5, z: 1.4, w: 0.35, h: 0.5, hold: true }); S.pop("question", W(7, "money") - 2, 30, { x: 1.4, y: AH + 0.4, z: 1.4, w: 0.3, h: 0.42, hold: true }); } },
      // 16 · you see, trading is a highway: push-through onto the desert highway, Dave's car rolls toward the toll booths
      { set: "highway", beat: 8, trans: "zoom", light: "desert", cam: CAM.follow((u) => [-1.3, 1.0, 5 - 9 * u], [-3.2, 2.6, 7.5], [0.5, 0.4, -6], 44),
        act: (S, u, f) => { H.car.position.z = 5 - 9 * u; H.car.wheels.forEach((w) => (w.rotation.y = (f - S.a) * 0.4)); H.gold.visible = false;
          S.pop("label", W(8, "highway") - 2, 34, { x: -1.3, y: 2.3, z: 3 - 9 * u, w: 0.7, h: 0.26, text: "DAVE", col: "#c0353a" }); } },
      // 17 · a toll booth at every exit: low angle down the row of booths, barrier arms down
      { set: "highway", word: [8, "toll"], lead: 3, trans: "whip", light: "desert", cam: CAM.fit([2.0, 1.3, -10], { w: 4.0, a0: -28, a1: -16, elev: 4, push: 0.12 }),
        act: (S, u, f) => { H.car.visible = false; H.gold.visible = false;
          BOOTHS.forEach((z, i) => S.pop("label", W(8, "every") + i * 3, 40, { x: 1.2, y: 2.4, z: z + 0.5, w: 0.8, h: 0.28, text: "−TOLL", col: "#c0353a", pop: i === 0, hold: true })); } },
      // 18 · each round trip cost about 4%: the car stops at the barrier, coins fly into the booth
      { set: "highway", beat: 9, trans: "whip", light: "desert", cam: CAM.fit([1.2, 1.2, -6.2], { w: 4.6, a0: 30, a1: 18, elev: 8, push: 0.12 }),
        act: (S, u, f) => { H.car.position.z = -5.4; H.gold.visible = false; const t0 = S.a + 6;
          for (let q = 0; q < 6; q++) { const t = (f - t0 - q * 6) / 14; if (t > 0 && t < 1) S.fx("coin", { x: lerp(-0.6, 3.3, t), y: 1.2 + 0.9 * Math.sin(Math.PI * t), z: lerp(-5.6, -7.2, t), w: 0.22, h: 0.22 }); }
          S.pop("impact", W(9, "four") - 2, 40, { x: 0.2, y: 2.5, z: -6.0, w: 1.0, h: 0.62, text: "−4%", hold: true }); } },
      // 19 · commissions and spreads: insert on the booth till, the coin stack grows; the arm lifts
      { set: "highway", word: [9, "commissions"], lead: 3, steady: true, light: "desert", cam: CAM.fit([3.2, 1.35, -7.1], { w: 1.4, a0: -40, a1: -30, elev: 10, push: 0.14 }), coc: 10,
        act: (S, u, f) => { const n = Math.round(10 * E.prog(f, S.a, S.b)); H.till.coins.forEach((c, i) => (c.visible = i < n)); H.arms[0].rotation.z = -1.3 * E.easeOut(E.prog(f, W(9, "spreads.") + 4, W(9, "spreads.") + 16));
          S.pop("label", W(9, "commissions") - 2, 24, { x: 2.7, y: 1.95, z: -6.7, w: 0.9, h: 0.22, text: "COMMISSIONS", col: "#c0353a" }); S.pop("label", W(9, "spreads.") - 2, 24, { x: 2.7, y: 1.95, z: -6.7, w: 0.7, h: 0.22, text: "SPREADS", col: "#c0353a" }); } },
      // 20 · before the tolls, Dave kept pace: arms up, the red car and the gold market car race side by side
      { set: "highway", beat: 10, trans: "whip", light: "golden", cam: CAM.follow((u) => [0, 0.9, 8 - 26 * u], [3.6, 1.6, -5.5], [0, 0.6, 2], 46),
        act: (S, u, f) => { H.arms.forEach((a) => (a.visible = false)); const z = 8 - 26 * u; H.car.position.z = z; H.gold.position.z = z + 0.15 * Math.sin(f * 0.2); H.car.wheels.concat(H.gold.wheels).forEach((w) => (w.rotation.y = (f - S.a) * 0.6));
          S.fx("speed", { x: 0, y: 0.9, z: z + 2.5, w: 4, h: 1.4, t: ((f - S.a) % 15) / 15 });
          S.pop("label", W(10, "Dave") - 2, 50, { x: -1.3, y: 2.0, z: z - 0.3, w: 0.7, h: 0.24, text: "DAVE", col: "#c0353a", hold: true }); S.pop("label", W(10, "market.") - 4, 30, { x: 1.4, y: 2.0, z: z - 0.3, w: 0.9, h: 0.24, text: "MARKET", col: "#8a6a10", hold: true }); } },
      // 21 · overconfidence: night kitchen, Dave flexes in a glowing aura
      { set: "kitchen", beat: 11, trans: "whip", light: K.light("night", { hemi: 1.5 }), cam: CAM.fit([0.9, 1.3, -2.2], { w: 2.2, a0: 16, a1: 4, elev: 2, push: 0.14 }),
        act: (S, u, f) => { const o = W(11, "overconfidence.") - 2; S.actor("dave", { x: 1.05, z: -2.3, expr: f >= o ? "laugh" : "grin", prop: f >= o ? "fists" : "chin" });
          if (f >= o) S.fx("aura", { x: 1.05, y: 1.0, z: -2.4, w: 1.6, h: 2.2, t: (f - o) / 30 });
          S.say("I know better!", W(11, "explanation:") - 2, 30, { x: 0.7, y: AH + 0.6, z: -2.0, w: 1.3, h: 0.42, tail: "right" });
          S.pop("word", o, 30, { x: 1.05, y: 2.45, z: -2.1, w: 1.7, h: 0.4, text: "OVERCONFIDENCE", col: "#f2c14e" }); } },
      // 22 · and Pat, who barely traded? golden backyard, Pat dozing in the sun (dissolve)
      { set: "garden", beat: 12, trans: "dissolve", light: "golden", cam: CAM.fit([0.1, 1.0, -1.2], { w: 2.8, a0: 8, a1: -4, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("pat", { x: -0.2, z: -1.2, mode: "sit", expr: "smile_closed" }); S.pop("zz", W(12, "barely") - 2, 40, { x: 0.15, y: 1.55, z: -1.1, w: 0.22, h: 0.22, rise: 0.25 }); } },
      // 23 · eighteen and a half percent: smash to the stage, Pat's green bar shoots past the market, confetti
      { set: "bars", word: [12, "Eighteen"], lead: 3, trans: "smash", light: K.backdrop("#2a5a3a"), cam: CAM.fit([0.7, 1.7, 0.3], { w: 5.0, a0: 16, a1: 6, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.bars.grow([1, 1, E.back(E.prog(f, S.a, S.a + 14))]); S.actor("pat", { x: 2.35, z: 1.6, expr: "smile", prop: "wave", wave: (f * 0.05) % 1 });
          S.fx("confetti", { x: 1.5, y: 3.4, z: 0.6, w: 3, h: 2, t: (f - S.a) / 40 }); S.kick(S.a + 12, 0.05);
          S.pop("label", W(12, "half") - 2, 40, { x: 1.5, y: 3.5, z: 0.6, w: 1.1, h: 0.4, text: "18.5%", col: "#2a7a4a", hold: true }); } },
      // 24 · the market never beat Dave: kitchen, Dave puffs up by the phone
      { set: "kitchen", beat: 13, trans: "whip", light: "interior", cam: CAM.fit([0.7, 1.3, -2.3], { w: 2.4, a0: -12, a1: -2, elev: 4, push: 0.12 }),
        act: (S, u, f) => { S.actor("dave", { x: 0.55, z: -2.3, expr: "grin", prop: "chin" });
          S.pop("label", W(13, "never") - 2, 34, { x: 0.6, y: 2.3, z: -2.1, w: 1.4, h: 0.3, text: "MARKET: NOT GUILTY", col: "#8a6a10", hold: true }); } },
      // 25 · his phone did: the receiver leaps off the wall and bonks Dave flat on the last word
      { set: "kitchen", word: [13, "His"], lead: 3, trans: "smash", light: K.light("interior", { sat: 1.2 }), cam: CAM.fit([0.85, 1.2, -2.4], { w: 2.3, a0: 8, a1: 0, elev: 6, push: 0.14 }),
        act: (S, u, f) => { const hit = W(13, "did.") + 1, k = E.easeIn(E.prog(f, hit - 7, hit)), down = f >= hit;
          S.actor("dave", { x: 0.55, z: -2.3, mode: down ? "fall" : "stand", expr: down ? "dazed" : "shock", prop: down ? null : "up" });
          if (!down) { H.recv.position.set(lerp(PHONE[0], 0.65, k), lerp(PHONE[1] + 0.12, 1.55, k) + 0.25 * Math.sin(Math.PI * k), lerp(-2.88, -2.15, k)); H.recv.rotation.z = 6 * k; }
          else { H.recv.position.set(0.95, 0.12, -2.0); H.recv.rotation.z = 0.3; }
          S.pop("impact", S.a + 2, 20, { x: 1.5, y: 1.9, z: -2.6, w: 0.7, h: 0.5, text: "RING!" }); S.pop("impact", hit, 26, { x: 0.6, y: 1.9, z: -2.0, w: 1.0, h: 0.7, text: "BONK!" }); S.kick(hit, 0.12);
          S.pop("stars", hit + 3, 26, { x: 0.55, y: 0.75, z: -2.1, w: 0.8, h: 0.5 }); } },
    ],
  };
};
