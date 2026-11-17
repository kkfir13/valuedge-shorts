// "The Marshmallow Test Was Never About Willpower" — film module (sets + shots), timed to the narration.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);           // frame a word is spoken
  const KH = 1.05, AH = 1.62;                         // head heights: kid, adult
  const H = {};                                       // handles filled by the sets

  const marsh = (B, x, y, z, s = 1) => {             // a marshmallow with hidden googly eyes
    const g = B.grp(x, y, z, 0, s); B.cyl(0.09, 0.09, 0.12, "#fbf8f0", 0, 0, 0, { in: g, seg: 20 }); B.cyl(0.085, 0.09, 0.01, "#efe6d6", 0, 0.12, 0, { in: g, seg: 20 });
    const eyes = B.grp(0, 0, 0, 0, 1, g); for (const sx of [-0.035, 0.035]) { B.ball(0.022, "#ffffff", sx, 0.08, 0.085, { in: eyes }); B.ball(0.011, "#241726", sx, 0.08, 0.104, { in: eyes }); }
    eyes.visible = false; B.dyn(eyes); return { g: B.dyn(g), eyes };
  };

  return {
    cast: {
      milo: { jacket: "#3f8fe0", pants: "#2f4a7a", boots: "#f4f1ea", hat: "cap", cap: "#e2453c", skin: "#f5c9a0", build: "kid" },
      ava: { jacket: "#f08a2c", pants: "#3b3f52", boots: "#5a3b2a", hat: "hair", hair: "#2a201a", dress: "#c25a7a", skin: "#c99067", build: "kid" },
      sam: { jacket: "#5d7a3a", pants: "#3b3f52", boots: "#4a3426", hat: "beanie", cap: "#f2c14e", pom: "#e2453c", skin: "#ecd0b6", build: "kid" },
      reed: { jacket: "#f4f4f0", pants: "#3b4a6a", boots: "#2a2d38", hat: "hair", hair: "#7a3a24", dress: "#5a8fc2", skin: "#ffe2c2", buttons: "#9aa3ad" },
    },
    sets: {
      lab: (B) => {
        B.set.room({ style: "home", wall: "wallpaper:#e0a24a", floor: "floor:#b8865a", w: 8, d: 7, h: 3.6, windows: [-2.3], door: false });
        H.door = B.prop.door({ x: 2.3, z: -3.44, col: "planks:#3f6fb5" });
        B.prop.table({ x: 0, z: 0, w: 1.1, d: 0.7, h: 0.55, col: "#f2c14e" });
        B.cyl(0.2, 0.17, 0.025, "#f4f6fa", 0, 0.55, 0.1, { seg: 24 });
        H.mm = marsh(B, 0, 0.575, 0.1);
        H.clock = B.prop.clock({ x: -0.9, y: 2.5, z: -3.42, r: 0.45 });
        B.prop.shelf({ x: -3.2, z: -3.0, w: 1.4, h: 1.6 }); B.prop.rug({ x: 0, z: 0.4, w: 3.4, d: 2.4, col: "#3f8fe0" });
        B.prop.poster({ x: 0.75, y: 1.3, z: -3.45, w: 0.9, h: 1.1, text: "ABC", bg: "#fbf3dc", fg: "#e2453c" });
        B.prop.plant({ x: 3.3, z: -2.9 }); B.prop.crate({ x: -3.3, z: -1.6, size: 0.6, col: "#e2453c" });
        H.box = B.prop.crate({ x: 0, y: -5, z: 0, size: 0.42, label: "ART", col: "planks:#d9a441" });
        H.dropM = marsh(B, 0, 3, 0.1); H.dropM.g.visible = false;
      },
      candy: (B) => {
        B.set.stage({ floor: "#fbe8f0", back: "#ff8fb8" }); B.prop.pedestal({ x: 0, z: 0, r: 1.4, h: 0.5, col: "#ffffff", trim: "#f2c14e" });
        H.big1 = marsh(B, -0.05, 0.5, 0, 7); H.big2 = marsh(B, 1.0, 0.5, -0.1, 7); H.big2.g.visible = false; H.big2.g.userData.base.v = false;
      },
      bars: (B) => { B.set.stage({ floor: "#e8f0fb", back: "#3f8fe0" }); H.bars = B.prop.bars3d({ x: 0, z: 0, vals: [0.25, 1], cols: ["#ff5a5a", "#4fd18b"], bw: 0.9, gap: 0.6, h: 2.6 }); },
      school: (B) => {
        B.set.room({ style: "home", wall: "wallpaper:#5a7a9a", floor: "floor:#9a6b42", w: 9, d: 7, h: 3.8, windows: [-3, 3] });
        H.board = B.prop.screen({ x: 0, z: -3.3, w: 3.4, h: 1.7, y0: 1.05, bg: "#2f4a3a", line: "#f4efe2", label: "GRADES", curve: (x) => 0.1 + 0.8 * x ** 1.5, frame: "#7a4a2c" });
        for (const x of [-1.6, 0, 1.6]) B.prop.table({ x, z: -0.2, w: 1.0, d: 0.6, h: 0.6, col: "#c8925a" });
      },
      mind: (B) => {
        const m = B.set.mind({ left: "EAT IT", right: "WAIT", eye: "#f4c890" }); H.levers = m.levers;
        H.trust = B.prop.screen({ x: 0, z: -3.2, w: 1.6, h: 0.9, y0: 2.95, label: "TRUST", curve: (x) => 0.15 + 0.7 * x, bg: "#1a2a30" });
      },
    },
    shots: [
      // 0 · hook: a giant marshmallow slams onto a pedestal on frame 0
      { set: "candy", f: 0, light: K.backdrop("#ff8fb8"), cam: CAM.fit([0, 1.3, 0], { w: 3.4, a0: -25, a1: 8, e0: -8, e1: 3, push: 0.18 }),
        act: (S, u, f) => { const k = E.prog(f, 0, 7); H.big1.g.position.y = 0.5 + 2.6 * (1 - E.easeIn(k)); H.big1.g.scale.y = 7 * (f >= 7 && f < 12 ? 0.8 + 0.04 * (f - 7) : 1);
          S.kick(7, 0.09); S.pop("puff", 7, 14, { x: 0, y: 0.7, z: 0.9, w: 2.4, h: 1.2 }); } },
      // 1 · could predict a child's future
      { set: "lab", word: [0, "could"], light: "interior", cam: CAM.fit([0, 0.85, 0], { w: 1.5, a0: 20, a1: -10, elev: 6, push: 0.15 }),
        act: (S, u, f) => { S.actor("milo", { x: 0, z: -0.42, expr: "smile", look: 0.3 }); S.fx("glow", { x: 0, y: 0.68, z: 0.15, w: 0.9, h: 0.9 });
          S.pop("question", W(0, "future.") - 4, 30, { x: 0.35, y: KH + 0.55, z: -0.3, w: 0.45, h: 0.55, hold: true }); } },
      // 2 · the test: the adult leaves the kid alone
      { set: "lab", beat: 1, trans: "whip", light: "interior", cam: CAM.move({ p: [-2.6, 2.9, 3.6], t: [0.6, 0.8, -1] }, { p: [-1.2, 1.7, 3.4], t: [0.5, 0.9, -0.8] }),
        act: (S, u, f) => { const k = E.ss(E.prog(f, S.a, S.a + 50)); S.actor("milo", { x: 0, z: -0.42, expr: "neutral", look: 0.6 * k });
          S.actor("reed", { x: E.lerp(0.9, 2.3, k), z: E.lerp(-0.6, -2.9, k), mode: k < 1 ? "stroll" : "stand", phase: f * 0.05, expr: "smile", scale: 1 });
          H.door.leaf.rotation.y = 1.3 * E.ss(E.prog(f, S.a + 30, S.a + 45)); } },
      // 3 · insert: one marshmallow
      { set: "lab", word: [1, "marshmallow."], trans: "cut", light: "interior", steady: true, cam: CAM.orbit([0, 0.64, 0.1], 0.75, 0.12, -35, -10, 38), coc: 10 },
      // 4 · eat it now, or wait
      { set: "lab", beat: 2, light: "interior", cam: CAM.fit([1.9, AH - 0.1, -2.7], { w: 1.7, a0: -15, a1: -5, elev: 3 }),
        act: (S, u, f) => { H.door.leaf.rotation.y = 1.3; S.actor("reed", { x: 1.9, z: -2.75, expr: "grin", prop: "point" }); S.say("Wait, and you get TWO!", S.a + 6, 52, { x: 2.05, y: AH + 0.75, z: -2.6, w: 1.5, h: 0.5 }); } },
      // 5 · ... and get two: a second giant marshmallow pops in
      { set: "candy", word: [2, "two."], lead: 3, trans: "smash", light: K.backdrop("#ff8fb8"), cam: CAM.fit([0.45, 1.3, 0], { w: 4.2, a0: 10, a1: -6, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const k = E.back(E.prog(f, S.a, S.a + 7)); H.big2.g.visible = true; H.big2.g.scale.setScalar(Math.max(0.01, 7 * k));
          S.pop("word", S.a + 2, 22, { x: 0.5, y: 2.75, z: 0.6, w: 1.6, h: 0.75, text: "x2" }); S.pop("sparks", S.a, 12, { x: 0.9, y: 1.2, z: 0.6, w: 2.2, h: 2.2 }); } },
      // 6 · imagine you're four (push through into the kid's face)
      { set: "lab", beat: 3, trans: "zoom", light: "interior", cam: CAM.fit([0, KH, -0.42], { h: 0.85, a0: 6, a1: -4, elev: 2, push: 0.12 }), coc: 9,
        act: (S, u, f) => { S.actor("milo", { x: 0, z: -0.42, expr: "nervous", look: -0.2 }); } },
      // 7 · the clock ticks
      { set: "lab", word: [3, "clock"], lead: 3, light: "interior", steady: true, cam: CAM.fit([-0.9, 2.5, -3.4], { w: 1.25, a0: 8, a1: 2, elev: -6, push: 0.1 }),
        act: (S, u, f) => { const tick = Math.floor((f - S.a) / 8); H.clock.time(10.1 + tick / 60); for (let q = 0; q < 4; q++) S.kick(S.a + q * 8, 0.015); } },
      // 8 · that marshmallow is staring at you
      { set: "lab", word: [3, "That"], lead: 2, light: (u) => K.mixLight(K.light("interior"), K.light("danger"), E.ss(u) * 0.7), steady: true,
        cam: CAM.fit([0, 0.66, 0.1], { w: 0.38, a0: 0, a1: 0, elev: 3, push: 0.25 }), coc: 12,
        act: (S, u, f) => { H.mm.eyes.visible = true; S.pop("exclaim", W(3, "staring"), 20, { x: 0.13, y: 0.86, z: 0.15, w: 0.14, h: 0.2 }); } },
      // 9 · some kids cover their eyes
      { set: "lab", beat: 4, trans: "dissolve", light: "interior", cam: CAM.fit([0, 0.95, -0.2], { w: 1.4, a0: -25, a1: -15, elev: 6 }),
        act: (S, u, f) => { S.actor("milo", { x: 0, z: -0.42, expr: "pained", prop: "fists" }); S.pop("sweat", S.a + 10, 40, { x: 0.3, y: KH + 0.3, z: -0.3, w: 0.3, h: 0.3, pop: false }); } },
      // 10 · some sing
      { set: "lab", word: [4, "sing."], lead: 6, light: "interior", cam: CAM.fit([0, 0.95, -0.2], { w: 1.5, a0: 28, a1: 20, elev: 4 }),
        act: (S, u, f) => { S.actor("ava", { x: 0, z: -0.42, expr: "whistle", headTilt: 8 * Math.sin(f * 0.35), tilt: 4 * Math.sin(f * 0.35) }); S.say("La la la!", S.a + 3, 28, { x: -0.35, y: KH + 0.55, z: -0.3, w: 0.8, h: 0.42, tail: "right" }); } },
      // 11 · some just stare
      { set: "lab", word: [4, "Some", 2], lead: 1, light: "interior", steady: true, cam: CAM.fit([0, KH - 0.05, -0.42], { h: 0.6, a0: 0, a1: 0, elev: -2, push: 0.2 }), coc: 12,
        act: (S) => { S.actor("sam", { x: 0, z: -0.42, expr: "shock", blink: 0 }); } },
      // 12 · years later: school (flash = time jump)
      { set: "school", beat: 5, trans: "flash", light: "office", cam: CAM.fit([0, 1.2, -1.0], { w: 4.4, a0: -12, a1: 6, elev: 8, push: 0.12 }),
        act: (S, u, f) => { H.board.draw({ t: E.prog(f, S.a, S.a + 60) }); S.actor("milo", { x: 0, z: -0.65, expr: "grin" }); S.actor("ava", { x: -1.6, z: -0.65, expr: "smile" }); S.actor("sam", { x: 1.6, z: -0.65, expr: "smile_closed" }); } },
      // 13 · do better at school: the board
      { set: "school", word: [5, "better"], lead: 4, light: "office", cam: CAM.fit([0, 1.9, -3.3], { w: 3.8, a0: 4, a1: -4, elev: -4 }),
        act: (S, u, f) => { H.board.draw({ t: 1 }); S.pop("word", W(5, "school."), 22, { x: 1.2, y: 2.4, z: -3.0, w: 0.8, h: 0.55, text: "A+", col: "#4fd18b" }); } },
      // 14 · so it was all willpower? inside the head
      { set: "mind", beat: 6, trans: "whip", light: "mind", cam: CAM.fit([0.6, 1.2, -1.5], { w: 3.0, a0: 18, a1: 8, elev: 6 }),
        act: (S, u, f) => { const k = 0.6 + 0.15 * Math.sin(f * 0.6); H.levers[4].rotation.x = -k; S.actor("milo", { key: "op", x: 1.6, z: -1.0, expr: "pained", prop: "up", tilt: -6 });
          S.pop("word", W(6, "willpower,"), 30, { x: 0.2, y: 2.2, z: -0.8, w: 2.2, h: 0.6, text: "WILLPOWER?", col: "#ffd84a" }); } },
      // 15 · then researchers changed one thing
      { set: "lab", word: [6, "Then,"], lead: 3, trans: "whip", light: "office", cam: CAM.fit([1.0, AH - 0.2, -1.2], { w: 1.8, a0: -12, a1: 0, elev: 2, push: 0.12 }),
        act: (S, u, f) => { S.actor("reed", { x: 1.0, z: -1.2, expr: "smile", prop: "hold" }); S.fx("label", { x: 1.0, y: 1.05, z: -1.0, w: 0.75, h: 0.32, text: "2012", bg: "#fbf3dc", cw: 256, ch: 110 });
          S.pop("bulb", W(6, "changed") - 2, 30, { x: 1.45, y: AH + 0.55, z: -1.1, w: 0.5, h: 0.6 }); } },
      // 16 · she promised fancy art supplies
      { set: "lab", beat: 7, light: "interior", cam: CAM.fit([0.55, 1.05, -0.5], { w: 2.1, a0: -18, a1: -8, elev: 4 }),
        act: (S, u, f) => { S.actor("milo", { x: 0, z: -0.42, expr: f >= W(7, "fancy") ? "grin" : "smile", look: 0.6 }); S.actor("reed", { x: 1.15, z: -0.75, expr: "grin", prop: "hold" });
          H.box.position.set(1.15, 0.55, -0.5); S.say("I'll bring the good stuff!", S.a + 8, 55, { x: 1.25, y: AH + 0.75, z: -0.6, w: 1.6, h: 0.5 });
          S.pop("stars", W(7, "fancy"), 20, { x: 0, y: KH + 0.4, z: -0.3, w: 0.8, h: 0.8 }); } },
      // 17 · half the kids: she came back with them
      { set: "lab", beat: 8, trans: "dissolve", light: "golden", cam: CAM.fit([1.2, 1.1, -1.8], { w: 2.6, a0: -30, a1: -22, elev: 5 }),
        act: (S, u, f) => { const k = E.ss(E.prog(f, S.a, S.a + 14)); H.door.leaf.rotation.y = 1.4 * k; S.actor("reed", { x: 2.0, z: -2.6, expr: "laugh", prop: "hold" }); H.box.position.set(2.0, 0.55, -2.35);
          S.actor("milo", { x: 0, z: -0.42, expr: "laugh", prop: "up" }); S.pop("confetti", W(8, "them."), 30, { x: 1.0, y: 1.9, z: -1.2, w: 3.2, h: 2.4, pop: false }); } },
      // 18 · the other half: empty-handed, sorry
      { set: "lab", beat: 9, trans: "whip", light: "storm", cam: CAM.fit([1.2, 1.1, -1.8], { w: 2.6, a0: 22, a1: 14, elev: 5 }),
        act: (S, u, f) => { H.door.leaf.rotation.y = 1.4 * E.ss(E.prog(f, S.a, S.a + 14)); S.actor("reed", { x: 2.0, z: -2.6, expr: "nervous", prop: "shrug" });
          S.actor("ava", { x: 0, z: -0.42, expr: f > W(9, "empty-handed") ? "stern" : "smile" }); S.say("Sorry!", W(9, "sorry.") - 4, 30, { x: 2.15, y: AH + 0.7, z: -2.5, w: 0.8, h: 0.42 }); } },
      // 19 · then came the marshmallow (drops onto the plate)
      { set: "lab", beat: 10, light: "interior", cam: CAM.follow((u) => [0, 0.62 + 1.6 * (1 - E.easeIn(E.clamp(u / 0.45))), 0.1], [0.05, 0.08, 0.9], [0, 0, 0], 40),
        act: (S, u, f) => { H.mm.g.visible = false; H.dropM.g.visible = true; const k = E.prog(f, S.a, S.a + 18); H.dropM.g.position.y = 0.575 + 2.4 * (1 - E.easeIn(k)); S.kick(S.a + 18, 0.05); } },
      // 20 · let down: about three minutes, then gulp
      { set: "lab", beat: 11, trans: "smash", light: "storm", cam: CAM.move({ p: [0.5, 0.95, 2.1], t: [-0.45, 1.55, -1.6], fov: 44 }, { p: [0.35, 0.95, 1.8], t: [-0.45, 1.55, -1.6], fov: 44 }),
        act: (S, u, f) => { const eat = W(11, "minutes.") - 2; H.clock.time(10 + 0.05 * E.prog(f, S.a, eat)); H.mm.g.visible = f < eat;
          S.actor("ava", { x: 0, z: -0.42, expr: f < eat ? "nervous" : "laugh" }); S.pop("label", W(11, "three"), 40, { x: -0.9, y: 1.85, z: -3.2, w: 0.9, h: 0.38, text: "3 MIN", col: "#e2453c", hold: true });
          S.pop("impact", eat, 16, { x: 0.25, y: KH + 0.1, z: -0.2, w: 0.9, h: 0.9, text: "GULP!" }); } },
      // 21 · kept promise: about twelve, calm
      { set: "lab", beat: 12, trans: "whip", light: "golden", cam: CAM.move({ p: [-0.5, 0.95, 2.1], t: [-0.45, 1.55, -1.6], fov: 44 }, { p: [-0.35, 0.95, 1.8], t: [-0.45, 1.55, -1.6], fov: 44 }),
        act: (S, u, f) => { H.clock.time(10 + 0.2 * E.prog(f, S.a, W(12, "twelve.") + 6)); S.actor("milo", { x: 0, z: -0.42, expr: "smile_closed" });
          S.fx("glow", { x: 0, y: 1.05, z: -0.5, w: 1.6, h: 1.6 }); S.pop("stars", S.a + 20, 18, { x: 0.3, y: 1.4, z: -0.3, w: 0.6, h: 0.6 }); S.pop("label", W(12, "twelve."), 40, { x: -0.9, y: 1.85, z: -3.2, w: 0.95, h: 0.38, text: "12 MIN", col: "#2f8a4a", hold: true }); } },
      // 22 · four times the patience
      { set: "bars", beat: 13, trans: "flash", light: K.backdrop("#3f8fe0"), cam: CAM.fit([0, 1.4, 0], { w: 3.6, a0: -20, a1: 15, elev: 6, push: 0.1 }),
        act: (S, u, f) => { const k = E.ss(E.prog(f, S.a + 4, W(13, "Four"))); H.bars.grow([E.ss(E.prog(f, S.a + 4, S.a + 20)), k]);
          S.pop("label", S.a + 10, 120, { x: -0.75, y: 1.0, z: 0.6, w: 0.9, h: 0.36, text: "3 MIN", hold: true }); S.pop("label", W(13, "Four") - 4, 80, { x: 0.75, y: 2.95, z: 0.6, w: 1.0, h: 0.36, text: "12 MIN", hold: true });
          S.pop("word", W(13, "Four"), 40, { x: 0, y: 3.5, z: 0.4, w: 1.5, h: 0.8, text: "x4", hold: true }); S.pop("sparks", W(13, "Four"), 14, { x: 0.75, y: 2.7, z: 0.5, w: 2, h: 2 }); S.kick(W(13, "Four"), 0.05); } },
      // 23 · you see, waiting isn't just willpower (back inside the head)
      { set: "mind", beat: 14, trans: "zoom", light: "mind", cam: CAM.fit([-0.2, 1.8, -2.2], { w: 2.8, a0: -10, a1: 6, elev: 0, push: 0.1 }),
        act: (S, u, f) => { H.trust.draw({ t: E.prog(f, S.a, S.b) }); S.actor("milo", { key: "op", x: -0.65, z: -1.1, expr: "smile", prop: "point" }); } },
      // 24 · whether you believe the second marshmallow is really coming
      { set: "candy", beat: 15, trans: "dissolve", light: K.backdrop("#d88ab0"), cam: CAM.fit([0.45, 1.3, 0], { w: 4.0, a0: 12, a1: 2, elev: 4, push: 0.12 }),
        act: (S, u, f) => { const on = Math.sin(f * 0.5) > -0.2; H.big2.g.visible = on; H.big2.g.scale.setScalar(7 * (0.92 + 0.06 * Math.sin(f * 0.3)));
          S.pop("question", W(15, "believe"), 60, { x: 1.0, y: 2.7, z: 0.4, w: 0.7, h: 0.85, hold: true }); } },
      // 25 · and nobody waits for a promise they don't believe: chomp
      { set: "lab", beat: 16, trans: "whip", light: "storm", cam: CAM.fit([0, 0.95, -0.2], { w: 1.25, a0: -8, a1: 4, elev: 3, push: 0.15 }),
        act: (S, u, f) => { const eat = W(16, "believe."); H.mm.g.visible = f < eat; S.actor("ava", { x: 0, z: -0.42, expr: f < eat ? "stern" : "laugh", prop: f < eat ? "shrug" : null });
          S.pop("impact", eat, 18, { x: 0.2, y: KH + 0.05, z: -0.2, w: 1.0, h: 1.0, text: "CHOMP!" }); S.kick(eat, 0.06); } },
    ],
  };
};
