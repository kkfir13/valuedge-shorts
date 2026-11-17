// "The City That Paid for Rat Tails" (Hanoi, 1902) — film module: sets, cast and shots timed to Roger's narration.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const AH = 1.58, KH = 1.05;
  const H = {};

  // a cartoon rat facing +z; tail sticks out the back (-z)
  const rat = (B, x, y, z, o = {}) => {
    const col = o.col ?? "#8f8078", g = B.grp(x, y, z, o.ry ?? 0, o.s ?? 1, o.in);
    B.ball(0.13, col, 0, 0.13, 0, { in: g, sy: 0.85, sz: 1.45 });
    B.ball(0.085, col, 0, 0.16, 0.19, { in: g, sz: 1.25 });
    B.ball(0.026, "#e88a9a", 0, 0.15, 0.3, { in: g });
    for (const sx of [-1, 1]) {
      B.ball(0.048, "#f0a8b4", sx * 0.065, 0.25, 0.15, { in: g, sz: 0.45 });
      B.ball(0.022, "#ffffff", sx * 0.042, 0.19, 0.265, { in: g });
      B.ball(0.012, "#1a1418", sx * 0.042, 0.19, 0.284, { in: g });
      for (const sz of [-1, 1]) B.ball(0.026, "#e8a0a8", sx * 0.075, 0.02, sz * 0.1, { in: g });
    }
    const tail = B.grp(0, 0.11, -0.17, 0, 1, g); B.cyl(0.02, 0.006, 0.46, "#e8a0a0", 0, 0, 0, { in: tail }); tail.rotation.x = -1.25;
    if (o.noTail) tail.visible = false; B.dyn(tail);
    if (o.crown) { B.cone(0.06, 0.09, "#f2c14e", 0, 0.27, 0.19, { in: g }); }
    if (o.hidden) g.visible = false;
    return { g: B.dyn(g), tail };
  };
  const place = (r, x, z, ry, f, run = 0, y = 0) => { r.g.position.set(x, y + run * Math.abs(Math.sin(f * 0.9)) * 0.05, z); r.g.rotation.y = ry; r.g.rotation.z = run * 0.08 * Math.sin(f * 0.9); };
  const showN = (arr, n) => arr.forEach((o, i) => { o.visible = i < n; });

  return {
    cast: {
      tuan: { jacket: "#3f5a7a", pants: "#2f3442", boots: "#5a3b2a", hat: "conical", capColor: "#e8cf8a", skin: "#e0b080" },
      hoa: { jacket: "#7a4a3a", pants: "#3b3f52", boots: "#4a3426", hat: "conical", capColor: "#d8be7a", skin: "#d9a878" },
      long: { jacket: "#5d7a3a", pants: "#3b3f52", boots: "#4a3426", hat: "conical", capColor: "#ecd59a", skin: "#e8b88a" },
      pichon: { jacket: "#f2efe6", pants: "#e2ddd0", boots: "#3a2a20", hat: "bowler", skin: "#f5c9a0", moustache: "#4a3020", buttons: "#c9a44a", build: "stout" },
      madame: { jacket: "#c25a7a", pants: "#3b3f52", boots: "#3a2a20", hat: "bonnet", dress: "#e89ab0", skin: "#ffe2c2" },
      girard: { jacket: "#2e3448", pants: "#2a2d38", boots: "#1a1418", hat: "bowler", skin: "#f0c8a0", moustache: "#8a5a3a" },
      farmer: { jacket: "#8a6a3a", pants: "#4a4e5a", boots: "#3a2a20", hat: "conical", capColor: "#c8a868", skin: "#d9a070" },
      lily: { jacket: "#f2c14e", pants: "#3b5a8a", boots: "#5a3b2a", hat: "hair", hair: "#2a201a", dress: "#4fa0d8", skin: "#f5c9a0", build: "kid" },
    },
    sets: {
      // Hanoi 1902: plaster shopfronts, trees, a sewer grate, city hall at the end of the road
      street: (B) => {
        B.set.street({ style: ["shop", "village"], length: 60, road: 9, ground: "cobble", seed: 11, end: false, signs: ["CAFÉ", "PHARMACIE", "BOULANGERIE", "TAILLEUR", "HÔTEL", "LIBRAIRIE"] });
        B.facade({ style: "village", w: 15, x: 0, z: -31, col: "#f0cf6a", h: 7 });
        B.prop.sign({ x: 0, y: 4.4, z: -30.9, text: "CITY HALL", w: 4.2, h: 0.8, bg: "#7a2a2a", fg: "#f4e6b8" });
        for (let z = 18; z > -28; z -= 8) for (const sx of [-1, 1]) { B.prop.tree({ x: sx * 4.1, z: z + (sx > 0 ? 3 : 0), kind: "oak" }); B.prop.lampPost({ x: sx * 3.9, z: z - 4 }); }
        B.box(1.0, 0.03, 0.7, "#2a2a2e", 1.6, 0, 6, { cast: false });
        for (let i = 0; i < 5; i++) B.box(0.06, 0.04, 0.7, "#6a6e76", 1.2 + i * 0.2, 0, 6, { cast: false });
        H.grateRat = rat(B, 1.6, 0, 6, { s: 1.6 });
        H.runner = rat(B, 0, 0, 0, { s: 1.5, noTail: true });
        H.swarm = []; for (let i = 0; i < 26; i++) H.swarm.push(rat(B, 0, 0, 0, { s: 1.2 + E.hash(i) * 0.4, hidden: true, noTail: false }));
        H.bald = []; for (let i = 0; i < 10; i++) H.bald.push(rat(B, 0, 0, 0, { s: 1.4, hidden: true, noTail: true }));
      },
      // the brand-new sewer: brick arches, a murky channel, walkways, hanging lamps
      sewer: (B) => {
        B.set.room({ style: "factory", wall: "brick:#8a7a6a", floor: "concrete:#7a766c", w: 4.4, d: 18, h: 3, door: false, trim: false, ceil: "brick:#6a5a4a" });
        H.muck = B.box(1.6, 0.4, 24, "#5d6b3c", 0, 0, 0, { cast: false });
        for (const sx of [-1, 1]) B.box(1.3, 0.5, 24, "concrete:#9a958a", sx * 1.55, 0, 0, { cast: false });
        for (let z = 6; z > -10; z -= 2.5) { for (const sx of [-1, 1]) B.box(0.25, 3, 0.3, "brick:#6a5a4a", sx * 2.05, 0, z, { cast: false }); B.box(4.4, 0.3, 0.3, "brick:#6a5a4a", 0, 2.7, z, { cast: false }); }
        B.cyl(0.12, 0.12, 24, "metal:#9aa0a8", 1.85, 2.3 - 12, 0, { rx: Math.PI / 2 });
        B.prop.lamp({ kind: "hang", x: 0, y: 2.9, z: -0.5, glow: "#ffd08a", intensity: 7, dist: 10, cord: 0.3 });
        B.prop.lamp({ kind: "hang", x: 0, y: 2.9, z: -6.5, glow: "#ffd08a", intensity: 6, dist: 10, cord: 0.3 });
        B.box(0.5, 0.12, 0.4, "#c0353a", -1.5, 0.5, 2.0); // the rat's cushion
        H.king = rat(B, -1.5, 0.62, 2.0, { s: 1.5, crown: true, ry: 0.5 });
        H.fam = []; for (let i = 0; i < 6; i++) H.fam.push(rat(B, -1.2 - (i % 3) * 0.35, 0.5, 1.2 - Math.floor(i / 3) * 0.6 + 0.5 * E.hash(i), { s: 0.9, ry: 0.3 + E.hash(i + 3) }));
        H.eyes = B.grp(0, 0, 0); for (let i = 0; i < 40; i++) { const x = (E.hash(i) - 0.5) * 3.6, y = 0.5 + E.hash(i + 50) * 1.4, z = -2 - E.hash(i + 99) * 7; for (const s of [-0.05, 0.05]) B.ball(0.03, "#fff27a", x + s, y, z, { in: H.eyes, cast: false }); }
        H.eyes.visible = false; B.dyn(H.eyes);
      },
      // a French villa bathroom
      bath: (B) => {
        B.set.room({ style: "kitchen", wall: "tiles:#f4f0e6:#9fc4d8", floor: "tiles:#f4efe2:#2a5a7a", w: 5, d: 5, h: 3.2, windows: [1.5], door: false });
        B.cyl(0.24, 0.18, 0.42, "#f8f6f0", -0.6, 0, -1.95); B.cyl(0.27, 0.27, 0.05, "#7a4a2c", -0.6, 0.42, -1.95); B.cyl(0.19, 0.19, 0.01, "#4a7a90", -0.6, 0.47, -1.95, { cast: false });
        B.box(0.55, 0.36, 0.22, "#f8f6f0", -0.6, 1.9, -2.36); B.cyl(0.03, 0.03, 1.45, "#c9a44a", -0.6, 0.45, -2.3); B.cyl(0.008, 0.008, 0.6, "#c9a44a", -0.3, 1.3, -2.25); B.ball(0.04, "#f8f6f0", -0.3, 1.28, -2.25);
        B.box(1.5, 0.55, 0.75, "#f8f6f0", 1.4, 0.12, -1.9); for (const sx of [-1, 1]) for (const sz of [-1, 1]) B.ball(0.07, "#c9a44a", 1.4 + sx * 0.65, 0.07, -1.9 + sz * 0.28);
        B.plate(0.8, 1.0, "#cfe0ea", 0.35, 1.65, -2.47, { edge: "#c9a44a" });
        H.toiletRat = rat(B, -0.6, 0.3, -1.95, { s: 1.4 });
      },
      // the bounty counter at city hall
      hall: (B) => {
        B.set.room({ style: "bank", w: 9, d: 7, h: 4, windows: [-3.2, 3.2], door: false });
        B.prop.counter({ x: 0, z: -1.2, w: 4, h: 1.1, col: "westwood:#7a4a2c" });
        H.poster = B.prop.poster({ x: 0, y: 2.05, z: -3.44, w: 2.3, h: 0.55, text: "1¢ PER RAT", bg: "#f4e6c8", fg: "#8a2a1a" });
        B.prop.sign({ x: 0, y: 2.85, z: -3.45, text: "BOUNTY OFFICE", w: 1.9, h: 0.38, bg: "#2a3a5a", fg: "#f4e6b8" });
        B.prop.shelf({ x: 3.2, z: -3.1, w: 1.4, h: 2.0 });
        H.coins = B.prop.coinStack({ x: -1.4, y: 1.1, z: -1.15, n: 9, r: 0.09 });
        H.tails = []; for (let i = 0; i < 90; i++) { const L = Math.floor(i / 18), r = 0.42 - L * 0.08, a = i * 2.4;
          const t = B.cyl(0.014, 0.005, 0.36, "#d89090", 0.55 + Math.cos(a) * r * E.hash(i), 1.1 + L * 0.05 - 0.17, -1.15 + Math.sin(a) * r * 0.6 * E.hash(i + 7), { rx: 1.2 + E.hash(i + 3), rz: E.hash(i + 11) * 6 }); t.rotation.y = a; t.visible = false; H.tails.push(B.dyn(t)); }
        H.heap = B.grp(0.55, 1.1, -1.15); B.cone(0.6, 1.2, "#d49088", 0, 0, 0, { in: H.heap, seg: 10 });
        for (let i = 0; i < 26; i++) { const a = i * 1.9, h = E.hash(i) * 1.2; B.cyl(0.016, 0.005, 0.42, "#e8a0a0", Math.cos(a) * 0.62 * (1 - h / 1.5), h, Math.sin(a) * 0.62 * (1 - h / 1.5), { in: H.heap, rx: 1.0 + E.hash(i + 2), rz: a }); }
        H.heap.visible = false; B.dyn(H.heap);
        H.dead = B.grp(0.6, 1.1, -1.2); for (let i = 0; i < 22; i++) { const L = Math.floor(i / 8), a = i * 2.2, r = 0.55 - L * 0.18; rat(B, Math.cos(a) * r, L * 0.18, Math.sin(a) * r * 0.6, { in: H.dead, s: 1.1, ry: a, col: "#7d7470" }); }
        H.dead.visible = false; B.dyn(H.dead);
        H.crates = B.grp(0, 0, 0); for (let i = 0; i < 9; i++) B.prop.crate({ x: -3.2 + (i % 3) * 0.75, y: Math.floor(i / 3) * 0.7, z: -2.6, size: 0.68, label: "RATS", in: H.crates });
        H.crates.visible = false; B.dyn(H.crates);
        H.handTail = B.cyl(0.02, 0.007, 0.42, "#e8a0a0", 0, 0, 0); H.handTail.visible = false; B.dyn(H.handTail);
      },
      // rat farm on the outskirts: paddies, a barn, pens and cages
      farm: (B) => {
        B.set.landscape({ kind: "farm", seed: 4, hills: true });
        for (const [x, z] of [[-7, -12], [0, -16], [7, -12], [-9, -4], [9, -5]]) B.box(5.5, 0.04, 3.5, "water", x, 0, z, { cast: false });
        B.facade({ style: "village", w: 6, x: 4.5, z: -7.5, ry: -0.35, col: "#c8a878" });
        B.prop.fence({ x: 0, z: -4.4, len: 4.2 }); B.prop.fence({ x: 0, z: -0.6, len: 4.2 });
        B.prop.fence({ x: -2.1, z: -2.5, len: 3.6, ry: Math.PI / 2 }); B.prop.fence({ x: 2.1, z: -2.5, len: 3.6, ry: Math.PI / 2 });
        for (let i = 0; i < 6; i++) B.prop.crate({ x: 3.0 + (i % 2) * 0.75, y: Math.floor(i / 2) * 0.7, z: -2.2, size: 0.68, label: "RATS" });
        H.pen = []; for (let i = 0; i < 22; i++) H.pen.push(rat(B, 0, 0, 0, { s: 1.9, hidden: i >= 12 }));
        H.coinsF = B.prop.coinStack({ x: 3.0, y: 2.1, z: -2.2, n: 12, r: 0.1 });
      },
      // the analogy: a reading nook with a coin jar
      reading: (B) => {
        B.set.room({ style: "library", w: 6, d: 5, h: 3.2, door: false, windows: [] });
        B.prop.chair({ x: 0, z: -1.25, col: "#c0353a" }); B.prop.rug({ x: 0, z: -0.5, w: 3, d: 2, col: "#3f6fb5" });
        B.prop.table({ x: 1.1, z: -1.0, w: 0.6, d: 0.5, h: 0.65, col: "#c8925a" });
        B.cyl(0.13, 0.13, 0.3, "#cfe8f4", 1.1, 0.65, -1.0); H.jar = B.prop.coinStack({ x: 1.1, y: 0.66, z: -1.0, n: 6, r: 0.08 });
        H.book = B.grp(0, 0.5, -0.5); const pg = (sx, txt) => B.plate(0.4, 0.46, B.textTex ? B.textTex(txt, "#fbf6e8", "#241726", 512, 640) : "#fbf6e8", sx * 0.2, 0, 0, { in: H.book, ry: -sx * 0.25, rx: -0.5, d: 0.02 });
        H.pageL = pg(-1, "A"); H.pageR = pg(1, "B");
        H.flip = B.grp(0, 0, 0.02, 0, 1, H.book); B.plate(0.4, 0.46, B.textTex("C", "#fbf6e8", "#241726", 512, 640), 0.2, 0, 0, { in: H.flip, rx: -0.5, d: 0.02 }); B.dyn(H.flip);
        B.dyn(H.book);
      },
      // metaphor stage: two pedestals, one coin vs a growing family
      stage: (B) => {
        B.set.stage({ floor: "#f4efe2", back: "#4fb07a" });
        B.prop.pedestal({ x: -1.4, z: 0, r: 0.8, h: 0.6, col: "#ffffff", trim: "#f2c14e" }); B.prop.pedestal({ x: 1.4, z: 0, r: 0.8, h: 0.6, col: "#ffffff", trim: "#f2c14e" });
        H.ratL = rat(B, -1.4, 0.6, 0.1, { s: 2.6 }); H.coinL = B.prop.coin({ x: -1.4, y: 0.6, z: 0.6, r: 0.22 });
        H.ratR = rat(B, 1.4, 0.6, 0.1, { s: 2.6 });
        H.cut = B.cyl(0.05, 0.016, 1.2, "#e8a0a0", 0, 0, 0); H.cut.visible = false; B.dyn(H.cut);
        H.sc = B.grp(1.4, 1.05, -0.45, 0, 1); H.bl = []; for (const s of [-1, 1]) { const b = B.grp(0, 0, 0, 0, 1, H.sc); B.box(0.9, 0.08, 0.03, "#c9ccd2", 0.35, 0, 0, { in: b }); B.cyl(0.12, 0.12, 0.04, "#e2453c", -0.2, 0, 0, { in: b, rx: Math.PI / 2 }); H.bl.push(B.dyn(b)); }
        H.sc.visible = false; B.dyn(H.sc);
        H.babies = []; for (let i = 0; i < 10; i++) { const a = -0.3 + i * 0.6; H.babies.push(rat(B, 1.4 + Math.cos(a) * (1.1 + 0.3 * (i % 2)), 0, 0.9 + Math.sin(a) * 0.6, { s: 1.1, ry: E.hash(i) * 2 - 1, hidden: true })); }
      },
    },
    shots: [
      // 0 · frame 0: a rat bursts out of a street grate at the lens
      { set: "street", f: 0, light: "golden", cam: CAM.move({ p: [1.75, 0.38, 7.9], t: [1.6, 0.32, 5.6], fov: 44 }, { p: [1.8, 0.5, 8.5], t: [1.6, 0.4, 5.6], fov: 44 }),
        act: (S, u, f) => { const k = E.back(E.prog(f, 0, 8)); place(H.grateRat, 1.6, 6 + 1.4 * E.ss(E.prog(f, 10, 38)), 0, f, f > 10 ? 1 : 0, -0.35 + 0.35 * k);
          S.pop("puff", 3, 14, { x: 1.6, y: 0.2, z: 6.2, w: 0.9, h: 0.6 }); S.kick(4, 0.04); } },
      // 1 · a city paid people: the clerk drops a coin into Tuan's hand
      { set: "hall", word: [0, "paid"], light: "office", cam: CAM.fit([0, 1.4, -1.0], { w: 3.0, a0: -14, a1: 6, elev: 4, push: 0.1 }),
        act: (S, u, f) => { S.actor("pichon", { x: 0.6, z: -2.0, expr: "smile", prop: "hold" }); S.actor("tuan", { x: -0.45, z: -0.25, expr: "grin", prop: "up" });
          showN(H.tails, 0); S.pop("coin", W(0, "people") - 2, 26, { x: -0.25, y: 1.95, z: 0.1, w: 0.3, h: 0.3, rise: -0.3 }); S.pop("label", W(0, "kill"), 30, { x: 0.3, y: 3.3, z: -1.6, w: 1.5, h: 0.4, text: "KILL RATS", col: "#c0353a" }); } },
      // 2 · and made the problem worse: rats flood the street
      { set: "street", word: [0, "made"], trans: "smash", light: "golden", cam: CAM.fit([0, 0.8, 0], { w: 7.5, a0: -8, a1: 6, elev: 14, push: 0.12 }),
        act: (S, u, f) => { H.grateRat.g.visible = false; H.swarm.forEach((r, i) => { const t = f - S.a, dir = i % 2 ? 1 : -1, x = dir * (-5 + ((t * (0.07 + 0.03 * E.hash(i)) + E.hash(i + 5) * 10) % 10)), z = -6 + E.hash(i + 9) * 9;
            r.g.visible = true; place(r, x, z, dir * Math.PI / 2, f + i * 3, 1); });
          S.actor("madame", { x: -1.6, z: -2.5, expr: "shock", prop: "up" }); S.actor("pichon", { x: 1.8, z: -3.5, expr: "shock", prop: "fists" });
          S.pop("exclaim", S.a + 4, 30, { x: -1.4, y: 2.4, z: -2.3, w: 0.4, h: 0.55 }); S.pop("word", W(0, "worse."), 22, { x: 0, y: 3.0, z: 0, w: 2.4, h: 0.8, text: "WORSE!", col: "#ff5a5a" }); } },
      // 3 · imagine you're in Hanoi: crane down the colonial street to Tuan
      { set: "street", beat: 1, trans: "whip", light: "noon", cam: CAM.crane([-0.4, 1.4, -1.5], 6.5, 6.5, 1.9, -8),
        act: (S, u, f) => { H.grateRat.g.visible = false; S.actor("tuan", { x: -0.6 + 0.4 * u, z: -1.5, mode: "stroll", phase: f * 0.05, expr: "smile" }); S.actor("madame", { key: "m2", x: 2.4, z: -8, expr: "smile" });
          S.pop("label", W(1, "Hanoi.") - 2, 48, { x: -0.4, y: 2.9, z: -1.5, w: 1.5, h: 0.45, text: "HANOI 1902", col: "#7a2a2a", hold: true }); } },
      // 4 · the French just built shiny new sewers
      { set: "sewer", word: [1, "built"], trans: "dissolve", light: "lamp", cam: CAM.move({ p: [0.2, 1.5, 6], t: [0, 1.2, -4] }, { p: [0.1, 1.4, 3.6], t: [0, 1.2, -6] }),
        act: (S, u, f) => { H.king.g.visible = false; H.fam.forEach((r) => (r.g.visible = false)); S.pop("stars", W(1, "shiny"), 26, { x: 1.2, y: 2.2, z: 0.5, w: 0.8, h: 0.8 }); S.pop("stars", W(1, "sewers.") - 2, 24, { x: -1.3, y: 1.9, z: -1.5, w: 0.7, h: 0.7 }); } },
      // 5 · to a rat, a cozy palace with no cats
      { set: "sewer", beat: 2, light: "lamp", cam: CAM.fit([-1.45, 0.8, 1.7], { w: 1.6, a0: 18, a1: 6, elev: 6, push: 0.15 }), coc: 10,
        act: (S, u, f) => { H.king.g.rotation.z = 0.06 * Math.sin(f * 0.2); S.pop("heart", W(2, "cozy"), 30, { x: -1.2, y: 1.35, z: 2.1, w: 0.3, h: 0.3, rise: 0.2 });
          S.pop("label", W(2, "no") - 2, 40, { x: -1.0, y: 1.55, z: 1.8, w: 0.95, h: 0.32, text: "NO CATS", col: "#2f8a4a", hold: true }); } },
      // 6 · rats pop out of fancy toilets
      { set: "bath", beat: 3, trans: "whip", light: "interior", cam: CAM.fit([-0.1, 1.05, -1.5], { w: 2.5, a0: 14, a1: 4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const p = W(3, "popping"), k = E.back(E.prog(f, p - 2, p + 6)); place(H.toiletRat, -0.6, -1.95, 0.3, f, 0, 0.18 + 0.32 * k);
          S.actor("madame", { x: 0.6, z: -1.0, expr: f < p ? "smile" : "shock", prop: f < p ? null : "up", look: -0.5 }); S.pop("impact", p, 18, { x: -0.6, y: 0.95, z: -1.7, w: 0.75, h: 0.75, text: "SQUEAK!" }); S.kick(p, 0.04);
          S.pop("sweat", p + 8, 40, { x: 0.85, y: AH + 0.25, z: -0.9, w: 0.25, h: 0.25, pop: false }); } },
      // 7 · so the city hires catchers
      { set: "hall", beat: 4, light: "office", cam: CAM.fit([0, 1.3, -1.0], { w: 3.6, a0: 10, a1: -6, elev: 5 }),
        act: (S, u, f) => { showN(H.tails, 0); S.actor("pichon", { x: 0.3, z: -2.0, expr: "grin", prop: "point" }); S.actor("tuan", { x: -1.1, z: -0.2, expr: "smile" }); S.actor("hoa", { x: 0.1, z: 0.1, expr: "neutral" }); S.actor("long", { x: 1.3, z: -0.2, expr: "smile_closed" });
          S.say("You're hired!", S.a + 6, 34, { x: 0.6, y: AH + 0.95, z: -1.8, w: 1.4, h: 0.48 }); } },
      // 8 · to crawl into the muck
      { set: "sewer", word: [4, "crawl"], lead: 3, trans: "whip", light: "lamp", cam: CAM.fit([0, 1.1, -1.2], { w: 2.4, a0: -10, a1: 6, elev: 4, push: 0.12 }),
        act: (S, u, f) => { H.king.g.visible = false; H.fam.forEach((r) => (r.g.visible = false)); S.actor("tuan", { x: -0.1, z: -1.2 - 0.4 * u, y: -0.25, expr: "pained", prop: "fists" });
          S.pop("smoke", W(4, "muck.") - 4, 26, { x: 0.4, y: 1.7, z: -1.0, w: 0.7, h: 0.7, col: "#8ab04a" }); S.pop("sweat", S.a + 6, 30, { x: 0.25, y: 1.55, z: -1.1, w: 0.25, h: 0.25 }); } },
      // 9 · one June day: over twenty thousand
      { set: "hall", beat: 5, trans: "flash", light: "office", cam: CAM.fit([-1.2, 1.3, -2.0], { w: 4.0, a0: -12, a1: 4, elev: 6, push: 0.12 }),
        act: (S, u, f) => { showN(H.tails, 0); H.crates.visible = true; S.actor("pichon", { x: 0.3, z: -2.0, expr: "shock", prop: "paper" }); S.actor("tuan", { x: -0.5, z: -0.3, expr: "grin", prop: "up" });
          S.pop("label", W(5, "June") - 2, 60, { x: -1.5, y: 2.75, z: -2.2, w: 1.2, h: 0.4, text: "JUNE 1902", hold: true }); S.pop("word", W(5, "twenty") - 2, 34, { x: -0.6, y: 2.75, z: -1.0, w: 2.2, h: 0.8, text: "20,000+", col: "#f2c14e", hold: true }); S.kick(W(5, "twenty"), 0.04); } },
      // 10 · barely a dent: the dark is full of eyes
      { set: "sewer", beat: 6, trans: "whip", light: K.light("night", { hemi: 0.6 }), cam: CAM.move({ p: [0, 1.2, 4.5], t: [0, 1.1, -5] }, { p: [0, 1.15, 3.6], t: [0, 1.1, -5] }),
        act: (S, u, f) => { H.king.g.visible = false; H.fam.forEach((r) => (r.g.visible = false)); H.eyes.visible = Math.sin(f * 0.7) > -0.85; S.lamp(0, 0.15); S.lamp(1, 0.1); } },
      // 11 · one cent per rat (push through to the poster)
      { set: "hall", beat: 7, trans: "zoom", light: "office", steady: true, cam: CAM.fit([0, 2.25, -3.4], { w: 2.9, a0: 0, a1: 0, elev: 0, push: 0.25 }),
        act: (S, u, f) => { showN(H.tails, 0); S.pop("coin", W(7, "cent") - 2, 30, { x: 0.55, y: 1.55, z: -3.0, w: 0.4, h: 0.4, spin: 6 }); } },
      // 12 · just bring a tail
      { set: "hall", word: [7, "Just"], light: "office", cam: CAM.fit([-0.05, 1.45, -1.1], { w: 2.5, a0: 14, a1: 6, elev: 2, push: 0.1 }), coc: 9,
        act: (S, u, f) => { showN(H.tails, 0); S.actor("tuan", { x: -0.45, z: -0.35, expr: "grin", prop: "up" }); S.actor("pichon", { x: 0.45, z: -2.0, expr: "neutral", prop: "hold" });
          H.handTail.visible = f >= W(7, "tail") - 3; H.handTail.position.set(-0.15, 1.75, 0.05); H.handTail.rotation.set(0, 0, 0.2 + 0.1 * Math.sin(f * 0.4));
          S.pop("label", W(7, "tail") , 40, { x: 0.2, y: 2.35, z: -0.6, w: 1.1, h: 0.36, text: "TAIL = 1¢", col: "#8a2a1a", hold: true }); } },
      // 13 · to city hall: the queue outside
      { set: "street", word: [7, "to"], trans: "whip", light: "noon", cam: CAM.fit([0, 2.6, -29], { w: 8.5, a0: -10, a1: 4, elev: 8, push: 0.08 }),
        act: (S, u, f) => { H.grateRat.g.visible = false; S.actor("tuan", { x: -1.0, z: -27.5, expr: "smile" }); S.actor("hoa", { x: 0.2, z: -26.5, expr: "grin" }); S.actor("long", { x: 1.4, z: -25.5, expr: "smile" }); S.actor("madame", { x: -2.6, z: -25, expr: "smile_closed" }); } },
      // 14 · nobody wants a mountain of dead rats at the office
      { set: "hall", beat: 8, trans: "whip", light: K.light("office", { sat: 0.85 }), cam: CAM.fit([0.15, 1.5, -1.6], { w: 2.7, a0: -12, a1: -4, elev: 6 }),
        act: (S, u, f) => { showN(H.tails, 0); H.dead.visible = true; S.actor("pichon", { x: -0.55, z: -2.0, expr: "pained", prop: "up" });
          S.say("Non, merci!", W(8, "mountain"), 40, { x: -0.45, y: AH + 0.85, z: -1.8, w: 1.25, h: 0.48, tail: "right" }); S.pop("sweat", S.a + 6, 40, { x: -0.3, y: AH + 0.25, z: -1.9, w: 0.25, h: 0.25, pop: false }); } },
      // 15 · tails pour in
      { set: "hall", beat: 9, light: "office", cam: CAM.fit([0.3, 1.35, -1.2], { w: 2.4, a0: 14, a1: 4, elev: 8, push: 0.15 }),
        act: (S, u, f) => { showN(H.tails, Math.floor(90 * E.easeOut(E.prog(f, S.a, S.b)))); S.actor("pichon", { x: -0.6, z: -2.0, expr: "shock", prop: "paper" });
          for (let q = 0; q < 4; q++) S.pop("coin", S.a + q * 8, 16, { x: 0.9 + q * 0.12, y: 1.5, z: -0.9, w: 0.22, h: 0.22, rise: 0.4, pop: q === 0 }); } },
      // 16 · then, something strange (dusk street)
      { set: "street", word: [9, "something"], lead: 4, trans: "dissolve", light: "dusk", cam: CAM.fit([0, 1.2, 2], { w: 4.5, a0: 6, a1: -4, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.grateRat.g.visible = false; S.actor("tuan", { x: -0.6, z: 1.8, expr: "nervous", look: 0.6 }); S.pop("question", W(9, "strange.") - 6, 30, { x: -0.2, y: 2.35, z: 1.9, w: 0.45, h: 0.55, hold: true }); } },
      // 17 · rats running around town, alive and healthy (follow a runner)
      { set: "street", beat: 10, trans: "whip", light: "golden", cam: CAM.follow((u) => [-2.5 + 5.5 * u, 0.25, 3], [0.6, 0.45, 2.4], [0, 0.05, 0], 46),
        act: (S, u, f) => { H.grateRat.g.visible = false; place(H.runner, -2.5 + 5.5 * u, 3, Math.PI / 2, f, 1);
          H.bald.forEach((r, i) => { r.g.visible = true; place(r, -3 + ((f - S.a) * 0.05 + i * 1.3) % 8, 1.0 - i * 0.5, Math.PI / 2, f + i * 5, 1); });
          S.actor("madame", { x: 2.2, z: 0.5, expr: f > W(10, "alive,") ? "shock" : "neutral" }); } },
      // 18 · ...and without tails
      { set: "street", word: [10, "without"], light: "golden", steady: true, cam: CAM.fit([0, 0.32, 2.6], { w: 1.0, a0: 135, a1: 125, elev: 6, push: 0.2 }), coc: 11,
        act: (S, u, f) => { H.grateRat.g.visible = false; place(H.runner, 0, 2.6, 0.3 * Math.sin(f * 0.3), f, 0);
          S.pop("exclaim", W(10, "tails."), 24, { x: 0.38, y: 0.75, z: 2.3, w: 0.2, h: 0.3 }); S.pop("label", W(10, "tails.") - 2, 30, { x: 0, y: 0.95, z: 2.4, w: 0.65, h: 0.22, text: "NO TAIL", col: "#c0353a", hold: true }); } },
      // 19 · how is that possible?
      { set: "hall", beat: 11, light: "office", cam: CAM.fit([0.3, AH, -2.0], { w: 1.4, a0: -6, a1: 6, elev: 2, push: 0.15 }), coc: 9,
        act: (S, u, f) => { showN(H.tails, 30); S.actor("pichon", { x: 0.3, z: -2.0, expr: "nervous", prop: "chin" });
          S.pop("question", W(11, "How") , 40, { x: 0.75, y: AH + 0.5, z: -1.9, w: 0.35, h: 0.45, hold: true }); S.pop("question", W(11, "possible?") - 4, 30, { x: -0.15, y: AH + 0.6, z: -1.9, w: 0.3, h: 0.4, hold: true }); } },
      // 20 · inspectors outside town find rat farms
      { set: "farm", word: [11, "Inspectors"], trans: "whip", light: "golden", cam: CAM.fit([0, 0.9, -1.6], { w: 4.8, a0: -14, a1: 6, elev: 12, push: 0.1 }),
        act: (S, u, f) => { H.pen.forEach((r, i) => { if (i >= 12) { r.g.visible = false; return; } const a = (f - S.a) * 0.04 + i * 0.52; place(r, Math.cos(a) * (1.0 + 0.35 * (i % 3)), -2.5 + Math.sin(a) * 1.1, a + Math.PI, f + i * 4, 1); });
          const fa = W(11, "farms."); S.actor("girard", { x: -2.1 + 0.5 * E.ss(E.prog(f, S.a, fa)), z: -0.2, mode: f < fa ? "stroll" : "stand", phase: f * 0.05, expr: f < fa ? "neutral" : "shock", prop: f < fa ? null : "up" });
          S.actor("farmer", { x: 1.7, z: -0.3, expr: "grin", prop: "shrug" }); S.pop("impact", fa, 20, { x: 0, y: 1.9, z: -2.3, w: 1.6, h: 1.0, text: "RAT FARM!" }); S.kick(fa, 0.05);
          S.say("Mon Dieu!", fa + 4, 26, { x: -1.4, y: AH + 0.9, z: -0.1, w: 1.15, h: 0.48, tail: "right" }); } },
      // 21 · you see: paying a kid per page (push through into the analogy)
      { set: "reading", beat: 12, trans: "zoom", light: "lamp", cam: CAM.fit([0.4, 0.95, -1.0], { w: 2.4, a0: -10, a1: 4, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("lily", { x: 0, z: -1.15, mode: "sit", expr: "smile", look: 0.3 }); H.book.visible = false;
          S.pop("label", W(12, "paying"), 60, { x: 1.1, y: 1.45, z: -0.9, w: 1.2, h: 0.36, text: "1¢ PER PAGE", col: "#2f8a4a", hold: true }); S.pop("coin", W(12, "page"), 20, { x: 1.1, y: 1.15, z: -0.8, w: 0.25, h: 0.25, rise: -0.25 }); } },
      // 22 · suddenly they love huge letters
      { set: "reading", word: [12, "Suddenly"], light: "lamp", cam: CAM.fit([0, 0.85, -0.9], { w: 1.5, a0: 4, a1: -4, elev: 14, push: 0.1 }),
        act: (S, u, f) => { S.actor("lily", { x: 0, z: -1.15, mode: "sit", expr: "laugh" }); H.flip.rotation.y = -Math.PI * E.ss(((f - S.a) % 14) / 14);
          for (let q = 0; q < 4; q++) S.pop("coin", S.a + 4 + q * 12, 14, { x: 0.75, y: 1.0 + q * 0.05, z: -0.8, w: 0.18, h: 0.18, rise: 0.3, pop: q === 0 }); } },
      // 23 · kill a rat: one cent, once
      { set: "stage", beat: 13, trans: "whip", light: K.backdrop("#4fb07a"), cam: CAM.fit([-1.4, 1.1, 0], { w: 2.2, a0: -14, a1: 0, elev: 6 }),
        act: (S, u, f) => { const o = W(13, "once."); H.ratL.g.visible = f < W(13, "one") - 2; S.pop("coin", W(13, "one") - 2, 40, { x: -1.4, y: 1.0, z: 0.3, w: 0.4, h: 0.4, spin: 4, hold: true }); S.pop("puff", W(13, "one") - 3, 14, { x: -1.4, y: 0.85, z: 0.2, w: 0.9, h: 0.7 });
          S.pop("label", o - 2, 30, { x: -1.4, y: 1.75, z: 0.3, w: 1.05, h: 0.36, text: "1¢ ONCE", col: "#c0353a", hold: true }); } },
      // 24 · snip the tail, let it go: a cent today
      { set: "stage", word: [13, "Snip"], light: K.backdrop("#4fb07a"), cam: CAM.fit([1.4, 1.1, 0], { w: 2.4, a0: 12, a1: 2, elev: 6 }),
        act: (S, u, f) => { const sn = W(13, "Snip"), go = W(13, "go:"); H.sc.visible = f < sn + 22; const k = E.ss(E.prog(f, sn, sn + 5)); H.bl[0].rotation.z = 0.5 - 0.5 * k; H.bl[1].rotation.z = -0.5 + 0.5 * k;
          H.ratR.tail.visible = f < sn + 4; H.cut.visible = f >= sn + 4; H.cut.position.set(1.4, Math.max(0.6, 0.9 - 0.02 * (f - sn - 4) ** 1.3), -0.5); H.cut.rotation.set(-1.25, 0, 0);
          const run = E.ss(E.prog(f, go - 4, go + 16)); place(H.ratR, 1.4 + 1.6 * run, 0.1 + 0.5 * run, 0.9 * run, f, run > 0 && run < 1 ? 1 : 0, 0.6 * (1 - run) + E.clamp(Math.sin(run * Math.PI)) * 0.4);
          S.pop("impact", sn + 3, 14, { x: 1.4, y: 1.0, z: -0.2, w: 0.6, h: 0.6, text: "SNIP!" }); S.pop("coin", W(13, "cent", 2) - 2, 26, { x: 1.1, y: 1.6, z: 0.3, w: 0.35, h: 0.35, spin: 5 }); } },
      // 25 · and baby rats tomorrow
      { set: "stage", word: [13, "baby"], lead: 3, trans: "dissolve", light: K.backdrop("#4fb07a"), cam: CAM.fit([1.4, 0.9, 0.5], { w: 3.4, a0: -8, a1: 6, elev: 10, push: 0.1 }),
        act: (S, u, f) => { H.ratR.g.visible = false; H.babies.forEach((r, i) => { const t0 = S.a + i * 3; r.g.visible = f >= t0; r.g.scale.setScalar(1.1 * E.back(E.prog(f, t0, t0 + 6))); r.g.position.y = 0.04 * Math.abs(Math.sin((f + i * 7) * 0.5)); });
          for (let q = 0; q < 6; q++) S.pop("coin", S.a + q * 6, 18, { x: 0.6 + q * 0.3, y: 2.1, z: 0.6, w: 0.2, h: 0.2, rise: -0.9, pop: q === 0 }); } },
      // 26 · the bounty didn't kill rats. It farmed them.
      { set: "farm", beat: 14, trans: "dissolve", light: "sunset", cam: CAM.fit([0.4, 0.9, -1.8], { w: 5.0, a0: 18, a1: 8, elev: 14, push: 0.1 }),
        act: (S, u, f) => { H.pen.forEach((r, i) => { r.g.visible = true; const a = (f - S.a) * 0.05 + i * 0.29; place(r, Math.cos(a) * (0.6 + 0.4 * (i % 4)), -2.5 + Math.sin(a) * 1.25, a + Math.PI, f + i * 4, 1); });
          S.actor("farmer", { x: 1.9, z: -0.3, expr: "laugh", prop: "hold" }); S.pop("word", W(14, "farmed"), 30, { x: 0.2, y: 2.4, z: -2.0, w: 2.6, h: 0.85, text: "FARMED", col: "#f2c14e", hold: true }); } },
      // 27 · they weren't paying for fewer rats
      { set: "hall", beat: 15, trans: "whip", light: "office", cam: CAM.fit([0, 1.5, -1.6], { w: 2.8, a0: 10, a1: 0, elev: 4, push: 0.12 }),
        act: (S, u, f) => { showN(H.tails, 90); S.actor("pichon", { x: -0.6, z: -2.0, expr: "grin", prop: "point" }); } },
      // 28 · they were paying for tails: the heap topples onto the clerk
      { set: "hall", word: [15, "tails."], lead: 2, trans: "smash", light: K.light("office", { sat: 1.2 }), cam: CAM.fit([-0.1, 1.5, -1.6], { w: 2.4, a0: -6, a1: 4, elev: 4 }),
        act: (S, u, f) => { showN(H.tails, 0); H.heap.visible = true; const k = E.easeIn(E.prog(f, S.a, S.a + 6)); H.heap.rotation.z = 0.85 * k; H.heap.position.x = 0.55 - 0.1 * k;
          S.actor("pichon", { x: -0.75, z: -2.0, expr: f < S.a + 5 ? "shock" : "dazed", prop: f < S.a + 5 ? "up" : null, tilt: f < S.a + 5 ? 0 : 8 });
          S.pop("impact", S.a + 5, 22, { x: -0.3, y: 2.0, z: -1.4, w: 1.1, h: 1.1, text: "THUD!" }); S.kick(S.a + 5, 0.09); S.pop("stars", S.a + 9, 26, { x: -0.6, y: AH + 0.5, z: -1.9, w: 0.6, h: 0.6 }); } },
    ],
  };
};
