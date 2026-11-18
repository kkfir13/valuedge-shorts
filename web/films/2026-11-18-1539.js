// "Bogle's Folly" (the first index fund, August 31, 1976) — film module timed to Jackson's narration.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const AH = 1.58;
  const H = {};
  const R = 2.5, SLICES = 8, DT = (Math.PI * 2) / SLICES;
  const mid = (i) => (i + 0.5) * DT;
  const at = (i, r, y = 0) => [Math.sin(mid(i)) * r, y, Math.cos(mid(i)) * r];

  // one pizza slice: crust wedge + cheese + two pepperoni, radius r (fraction of R kept from the tip)
  const slice = (B, g, i, r) => {
    const T3 = B.THREE, t0 = i * DT;
    const crust = new T3.Mesh(new T3.CylinderGeometry(r, r, 0.16, 10, 1, false, t0, DT), B.mat("#d8994a")); crust.position.y = 0.08; crust.castShadow = true; crust.receiveShadow = true; g.add(crust);
    const ch = new T3.Mesh(new T3.CylinderGeometry(r * 0.92, r * 0.92, 0.04, 10, 1, false, t0 + 0.02, DT - 0.04), B.mat("#f6c84a")); ch.position.y = 0.18; ch.receiveShadow = true; g.add(ch);
    for (const k of [0.38, 0.68]) if (k * R < r * 0.85) { const [x, , z] = at(i, k * R); B.cyl(0.17, 0.17, 0.03, "#b8352a", x, 0.19, z, { in: g, seg: 18 }); }
  };
  const pizza = (B, y) => {
    const out = [];
    for (let i = 0; i < SLICES; i++) {
      const full = B.dyn(B.grp(0, y, 0, 0, 1)); slice(B, full, i, R);
      const bit = B.dyn(B.grp(0, y, 0, 0, 1)); slice(B, bit, i, R * 0.58); bit.visible = false;
      out.push({ full, bit });
    }
    return out;
  };
  const spread = (k) => H.sl.forEach((s, i) => { const d = 0.28 * k; for (const g of [s.full, s.bit]) { g.position.x = Math.sin(mid(i)) * d; g.position.z = Math.cos(mid(i)) * d; } });
  const bite = (i, state) => { H.sl[i].full.visible = state === 0; H.sl[i].bit.visible = state === 1; };

  return {
    cast: {
      bogle: { jacket: "#34466a", pants: "#3a3d48", boots: "#2a1a14", hat: "hair", hair: "#7a6a5a", skin: "#f2c8a0", buttons: "#c9a44a" },
      b1: { jacket: "#2a2d36", pants: "#2a2d36", boots: "#1a1418", hat: "hair", hair: "#c8a060", moustache: "#a07840", skin: "#f5d2b0", buttons: "#9aa3ad" },
      b2: { jacket: "#5a4632", pants: "#3a3028", boots: "#1a1418", hat: "hair", hair: "#2a1a10", skin: "#e8b88a" },
      vendor: { jacket: "#7a5a2a", pants: "#3a3d48", boots: "#2a1a14", hat: "cap", cap: "#2a6a4a", skin: "#c88a60", moustache: "#2a1a10" },
      p1: { jacket: "#c0353a", pants: "#2a2d38", boots: "#1a1418", hat: "tophat", skin: "#f5c9a0", moustache: "#3a2a20", buttons: "#f2c14e" },
      p2: { jacket: "#7a3aa0", pants: "#2a2d38", boots: "#1a1418", hat: "bowler", skin: "#f0c8a0", buttons: "#f2c14e" },
      p3: { jacket: "#e8a020", pants: "#2a2d38", boots: "#1a1418", hat: "cap", cap: "#c0353a", skin: "#c88a60" },
      ix: { jacket: "#3fbf7a", pants: "#2a3a5a", boots: "#f4f1ea", hat: "cap", cap: "#2a6a4a", skin: "#f5c9a0" },
      i1: { jacket: "#3a7ac0", pants: "#3b3f52", boots: "#3a2a20", hat: "hair", hair: "#e8c070", dress: "#5a8fc2", skin: "#ffe2c2" },
      i2: { jacket: "#4a9a5a", pants: "#3b3f52", boots: "#3a2a20", hat: "beanie", cap: "#f2c14e", skin: "#c88a60" },
      i3: { jacket: "#d86a3a", pants: "#3b3f52", boots: "#3a2a20", hat: "hair", hair: "#3a2a20", skin: "#f2c8a0", moustache: "#3a2a20" },
      i4: { jacket: "#8a5aa0", pants: "#3b3f52", boots: "#3a2a20", hat: "hair", hair: "#1a1a1a", skin: "#e8b88a" },
    },
    sets: {
      // 1976 underwriting office: navy wallpaper, a fund-raising thermometer, a desk with the fund's certificate
      office: (B) => {
        B.set.room({ style: "office", wall: "wallpaper:#2f4a6a", floor: "carpet:#2a5a4a", w: 9, d: 7, h: 3.8, windows: [-3.0], door: false });
        B.prop.desk({ x: 0, z: -1.15, w: 1.9, col: "floor:#6a4630" });
        B.prop.lamp({ kind: "desk", x: -0.7, y: 0.81, z: -1.3, glow: "#ffe0a0", intensity: 2, dist: 4 });
        B.prop.sign({ x: -0.9, y: 2.75, z: -3.3, w: 3.6, h: 0.34, text: "FIRST INDEX INVESTMENT TRUST", bg: "#f4ecd0", fg: "#2a3a5a" });
        B.prop.sign({ x: -0.9, y: 2.3, z: -3.3, w: 1.2, h: 0.32, text: "AUG 31 1976", bg: "#2a3a5a", fg: "#f4ecd0" });
        B.plate(0.7, 0.48, B.textTex("INDEX FUND", "#f4ecd0", "#2a5a3a", 1024, 260), 0, 0.82, -1.0, { rx: -Math.PI / 2, d: 0.01, edge: "#c9a44a" });
        H.mark = B.dyn(B.plate(0.5, 0.15, B.textTex("AVERAGE", "#fbe8e0", "#c0353a", 512, 154), 0.03, 0.83, -0.98, { rx: -Math.PI / 2, d: 0.004, edge: "#c0353a" })); H.mark.visible = false;
        H.stamp = B.dyn(B.grp(0.03, 1.6, -0.98, 0, 1)); B.box(0.5, 0.08, 0.2, "#2a2d36", 0, 0, 0, { in: H.stamp }); B.cyl(0.05, 0.05, 0.25, "#7a4a2c", 0, 0.08, 0, { in: H.stamp }); B.ball(0.09, "#c0353a", 0, 0.38, 0, { in: H.stamp }); H.stamp.visible = false;
        // the thermometer: white board, red fill grows from the bulb, GOAL $150M at the top
        const tx = 2.6, tz = -2.9;
        B.box(0.7, 3.2, 0.08, "#f4efe2", tx, 0.1, tz - 0.08); B.ball(0.24, "#e0353a", tx, 0.45, tz + 0.06);
        for (let k = 1; k <= 10; k++) B.box(0.18, 0.025, 0.02, "#2a2d36", tx - 0.22, 0.6 + k * 0.25, tz);
        H.fill = B.dyn(B.grp(tx, 0.55, tz + 0.06, 0, 1)); B.cyl(0.09, 0.09, 2.5, "#e0353a", 0, 0, 0, { in: H.fill });
        B.prop.sign({ x: tx, y: 3.35, z: tz, w: 1.1, h: 0.36, text: "GOAL", bg: "#2a3a5a", fg: "#f4ecd0" });
        B.prop.sign({ x: tx, y: 2.62, z: tz + 0.12, w: 0.62, h: 0.26, text: "$150M", bg: "#f4ecd0", fg: "#2a5a3a" });
        H.bag = B.prop.moneyBag({ x: 1.6, y: 0.8, z: -1.6, size: 0.4 });
        B.prop.plant({ x: -3.6, z: -2.9 }); B.prop.shelf({ x: -2.6, z: -3.1, w: 1.2, h: 1.8 });
      },
      // a Manhattan newsstand at night, 1976: the "un-American" poster and the Bogle's Folly headline
      news: (B) => {
        B.set.street({ style: ["modern", "shop"], lit: true, seed: 6, signs: ["DELI", "BOOKS", "CAFE"] });
        const g = B.grp(-5.2, 0, 0, Math.PI / 2, 1);
        B.box(2.4, 1.0, 0.8, "planks:#2a5a3a", 0, 0, 0.1, { in: g }); B.box(2.6, 2.7, 0.12, "#2a5a3a", 0, 0, -0.5, { in: g }); B.box(2.9, 0.14, 1.5, "#c0353a", 0, 2.7, 0.1, { in: g });
        B.plate(1.15, 0.36, B.textTex("HELP STAMP OUT", "#fff4d0", "#c0353a", 1024, 180), -0.62, 2.45, -0.42, { in: g, d: 0.02 });
        B.plate(1.15, 0.36, B.textTex("INDEX FUNDS!", "#fff4d0", "#241726", 1024, 180), -0.62, 2.13, -0.42, { in: g, d: 0.02 });
        B.plate(1.15, 0.36, B.textTex("UN-AMERICAN!", "#c0353a", "#fff4d0", 1024, 180), -0.62, 1.81, -0.42, { in: g, d: 0.02 });
        B.plate(1.1, 0.75, B.textTex("NEWS", "#f2ede0", "#241726", 512, 350), 0.62, 1.55, -0.42, { in: g, d: 0.02 });
        H.headline = B.dyn(B.plate(1.1, 0.5, B.textTex("BOGLE'S FOLLY", "#f2ede0", "#c0353a", 1024, 200), 0.62, 2.2, -0.38, { in: g, d: 0.02 })); H.headline.visible = false;
        for (let i = 0; i < 4; i++) B.plate(0.42, 0.3, B.textTex("NEWS", "#f2ede0", "#241726", 256, 183), -0.9 + i * 0.6, 1.02, 0.25, { in: g, rx: -Math.PI / 2.6, d: 0.01 });
        B.lamp(-4.2, 2.4, 0, "#ffe0a0", 5, 7); B.prop.lampPost({ x: -4.2, z: 2.4 }); B.prop.lampPost({ x: -4.2, z: -4.5 });
      },
      // a 1970s pizzeria: brick walls, checkered tablecloth, a neon PIZZA sign
      pizzeria: (B) => {
        B.set.room({ style: "kitchen", wall: "brick:#a8503a", floor: "tiles:#2a2a2a:#f4efe2", w: 8, d: 6, h: 3.4, windows: [2.4], door: false });
        B.box(1.6, 0.74, 1.0, "#5a3a24", 0, 0, -0.8); B.box(1.75, 0.03, 1.15, "tiles:#f4efe2:#c0353a", 0, 0.74, -0.8);
        H.small = B.dyn(B.grp(0, 0.78, -0.8, 0, 0.15)); { const T3 = B.THREE; B.cyl(R * 1.05, R * 1.05, 0.06, "#f4f4f0", 0, -0.06, 0, { in: H.small, seg: 32 }); for (let i = 0; i < SLICES; i++) { const gg = B.grp(0, 0, 0, 0, 1, H.small); slice(B, gg, i, R); } }
        B.prop.sign({ x: -1.6, y: 2.4, z: -2.9, w: 1.8, h: 0.5, text: "PIZZA", bg: "#2a1a2a", fg: "#ff5a6a" });
        B.prop.lamp({ kind: "hang", x: 0, y: 3.3, z: -0.8, glow: "#ffd9a0", intensity: 3, dist: 5, cord: 0.9 });
        for (const [x, z] of [[-0.45, -1.55], [0.45, -1.55], [-1.15, -0.8], [1.15, -0.8]]) B.prop.stool({ x, z, col: "#c0353a" });
      },
      // the metaphor: a giant tabletop with one giant pizza = the whole market, investors standing round it
      table: (B) => {
        B.set.stage({ floor: "#f4efe2", back: "#e9b872", r: 16 });
        B.box(22, 0.02, 22, "tiles:#f4efe2:#c0353a", 0, 0, 0, { cast: false, tile: 2 });
        B.cyl(R * 1.12, R * 1.06, 0.08, "#ffffff", 0, 0, 0, { seg: 48 });
        H.sl = pizza(B, 0.08);
        H.crumb = B.dyn(B.ball(0.07, "#d8994a", 0, 0.3, 0)); H.crumb.visible = false;
        B.prop.sign({ x: 0, y: 3.4, z: -4.5, w: 3.2, h: 0.6, text: "THE MARKET", bg: "#c0353a", fg: "#fff4d0" });
        B.prop.bottle && B.prop.bottle({ x: -4.5, z: -3.0, s: 3 });
      },
      // a cinder race track at golden hour: four lanes, fences, a START banner
      track: (B) => {
        B.set.landscape({ kind: "meadow", count: 16, clear: 14, seed: 9 });
        B.box(6, 0.02, 90, "dirt", 0, 0, -20, { cast: false });
        for (const x of [-2.4, -1.2, 0, 1.2, 2.4]) B.box(0.06, 0.025, 90, "#f4f4f0", x, 0, -20, { cast: false });
        for (const sx of [-1, 1]) for (let z = -40; z < 20; z += 6) B.prop.fence({ x: sx * 3.6, z, len: 6, ry: Math.PI / 2 });
        for (const sx of [-1, 1]) B.box(0.12, 2.9, 0.12, "#f4f4f0", sx * 2.9, 0, -3.5);
        B.prop.sign({ x: 0, y: 2.4, z: -3.5, w: 5.6, h: 0.55, text: "START  ·  1976", bg: "#2a3a5a", fg: "#f2c14e" });
        H.packs = [0, 1, 2].map(() => { const p = B.dyn(B.grp(0, 0, 0, 0, 1)); B.box(0.42, 0.55, 0.26, "#7a5a3a", 0, 0, 0, { in: p }); B.plate(0.36, 0.17, B.textTex("FEES", "#f4e6c8", "#c0353a", 256, 121), 0, 0.33, 0.14, { in: p, d: 0.01 }); p.visible = false; return p; });
      },
    },
    shots: [
      // 0 · frame 0: a rubber stamp slams AVERAGE onto the fund's certificate
      { set: "office", f: 0, light: K.light("office", { hemi: 1.4 }), steady: true, cam: CAM.fit([0, 0.84, -1.0], { w: 1.0, a0: -14, a1: 4, e0: 58, e1: 46, push: 0.2 }), coc: 10,
        act: (S, u, f) => { const k = E.easeIn(E.prog(f, 0, 8)), up = E.prog(f, 12, 26); H.stamp.visible = up < 1; H.stamp.position.y = 1.6 - 0.77 * k + 0.6 * up; H.mark.visible = f >= 8;
          S.kick(8, 0.09); S.pop("puff", 8, 12, { x: 0, y: 0.9, z: -0.9, w: 0.8, h: 0.3 }); } },
      // 1 · a man launched a fund: Bogle behind his desk, proud
      { set: "office", word: [0, "man"], light: "office", cam: CAM.fit([0, 1.3, -1.6], { w: 2.4, a0: 14, a1: 3, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("bogle", { x: 0, z: -1.75, expr: "grin", prop: "paper" }); S.pop("label", S.a + 2, 30, { x: 0.7, y: 1.15, z: -1.2, w: 0.6, h: 0.22, text: "1976", col: "#2a3a5a", hold: true }); S.pop("label", W(0, "fund") - 2, 40, { x: 0, y: AH + 0.42, z: -1.6, w: 0.9, h: 0.26, text: "JACK BOGLE", col: "#34466a", hold: true }); } },
      // 2 · built to be average: the stamp on the certificate glows
      { set: "office", word: [0, "average."], lead: 3, steady: true, light: K.light("office", { hemi: 1.4 }), cam: CAM.fit([0.03, 0.83, -0.98], { w: 0.75, a0: 10, a1: -6, elev: 62, push: 0.15 }), coc: 11,
        act: (S, u, f) => { H.mark.visible = true; H.stamp.position.y = 2.5; S.pop("word", S.a + 4, 30, { x: 0.03, y: 0.95, z: -1.28, w: 0.5, h: 0.16, text: "= MARKET", col: "#2a5a3a" }); } },
      // 3 · Wall Street called it un-American: whip to the night newsstand poster
      { set: "news", beat: 1, trans: "whip", light: "night", cam: CAM.fit([-5.4, 1.6, 0.2], { w: 3.6, a0: 66, a1: 82, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("vendor", { x: -5.45, z: -0.25, expr: "stern", prop: "point", look: 0.4 });
          S.pop("impact", W(1, "unamerican") + 2, 28, { x: -4.9, y: 2.6, z: 0.4, w: 1.4, h: 0.9, text: "UN-AMERICAN!" }); S.kick(W(1, "unamerican") + 2, 0.05); } },
      // 4 · insert on the poster
      { set: "news", word: [1, "called"], lead: 3, steady: true, light: "night", cam: CAM.fit([-5.6, 1.9, 0.62], { w: 1.5, a0: 82, a1: 94, elev: 2, push: 0.14 }), coc: 10,
        act: (S, u, f) => { S.pop("exclaim", W(1, "unamerican"), 30, { x: -5.3, y: 2.35, z: 0.0, w: 0.25, h: 0.4 }); } },
      // 5 · imagine you're Jack Bogle: whip back to the office, Bogle by the thermometer
      { set: "office", beat: 2, trans: "whip", light: "office", cam: CAM.fit([1.4, 1.5, -2.2], { w: 3.6, a0: -16, a1: -4, elev: 8, push: 0.1 }),
        act: (S, u, f) => { S.actor("bogle", { x: 1.6, z: -2.2, expr: "smile", look: 0.6 }); H.fill.scale.y = 0.02;
          S.pop("label", W(2, "jack") - 2, 40, { x: 1.6, y: AH + 0.42, z: -2.1, w: 0.9, h: 0.26, text: "YOU = BOGLE", col: "#34466a", hold: true }); } },
      // 6 · you hoped to raise $150 million: tilt up the thermometer to the GOAL
      { set: "office", word: [2, "hoped"], lead: 3, light: "office", cam: CAM.fit([2.5, 2.0, -2.9], { h: 3.0, a0: -8, a1: 6, e0: -12, e1: 8, push: 0.1 }),
        act: (S, u, f) => { S.actor("bogle", { x: 2.15, z: -2.2, expr: "grin", prop: "up", look: 0.8 }); H.fill.scale.y = 0.02;
          S.pop("glow", W(2, "hundred") - 2, 60, { x: 2.6, y: 3.0, z: -2.75, w: 0.8, h: 0.8, hold: true }); S.pop("word", W(2, "fifty") - 2, 40, { x: 3.0, y: 3.25, z: -2.7, w: 0.8, h: 0.3, text: "$150M?", col: "#2a5a3a", hold: true }); } },
      // 7 · the bankers bring in…: two bankers with one small bag, the fill crawls up
      { set: "office", beat: 3, light: "office", cam: CAM.fit([1.3, 1.35, -1.9], { w: 3.8, a0: 12, a1: 5, elev: 8, push: 0.1 }),
        act: (S, u, f) => { S.actor("b1", { x: 1.2, z: -1.7, expr: "nervous", prop: "hold" }); S.actor("b2", { x: 0.3, z: -1.9, expr: "nervous" }); S.actor("bogle", { x: 2.0, z: -2.3, expr: "smile", look: -0.5 });
          H.bag.position.set(1.25, 0.82, -1.55); H.fill.scale.y = 0.02 + 0.053 * E.easeOut(E.prog(f, W(3, "about"), W(3, "million."))); } },
      // 8 · about eleven million: smash on the nearly empty thermometer
      { set: "office", word: [3, "eleven"], lead: 3, trans: "smash", steady: true, light: "office", cam: CAM.fit([2.6, 0.95, -2.85], { w: 1.3, a0: -6, a1: 4, elev: 4, push: 0.14 }), coc: 10,
        act: (S, u, f) => { H.fill.scale.y = 0.073; S.pop("label", S.a + 3, 40, { x: 2.95, y: 0.75, z: -2.7, w: 0.5, h: 0.2, text: "$11M", col: "#c0353a", hold: true }); S.pop("arrow", S.a + 8, 30, { x: 2.15, y: 1.2, z: -2.7, w: 0.22, h: 0.32, dir: "down" }); } },
      // 9 · you call it an abject failure
      { set: "office", beat: 4, light: K.light("lamp", { hemi: 1.4 }), cam: CAM.fit([0, 1.45, -1.75], { w: 1.6, a0: -10, a1: 2, elev: 4, push: 0.12 }),
        act: (S, u, f) => { S.actor("bogle", { x: 0, z: -1.75, expr: "pained", prop: "chin" }); S.say("Abject failure.", W(4, "abject") - 4, 34, { x: -0.35, y: AH + 0.55, z: -1.6, w: 1.1, h: 0.4, tail: "right" });
          S.pop("sweat", W(4, "failure.") , 24, { x: 0.2, y: AH + 0.15, z: -1.7, w: 0.18, h: 0.18 }); } },
      // 10 · the bankers offer to scrap it
      { set: "office", beat: 5, trans: "whip", light: "office", cam: CAM.fit([0.5, 1.4, -1.8], { w: 2.8, a0: -22, a1: -12, elev: 6, push: 0.1 }),
        act: (S, u, f) => { S.actor("b1", { x: 1.05, z: -1.6, expr: "smile", prop: "paper", look: -0.6 }); S.actor("bogle", { x: -0.1, z: -1.8, expr: "neutral", look: 0.6 });
          S.say("Scrap it?", W(5, "offer") - 4, 40, { x: 1.35, y: AH + 0.6, z: -1.5, w: 0.8, h: 0.38 }); S.pop("label", W(5, "scrap") - 2, 30, { x: 1.2, y: 1.2, z: -1.4, w: 0.6, h: 0.18, text: "CANCEL", col: "#c0353a" }); } },
      // 11 · you say no: smash on Bogle's NO
      { set: "office", word: [5, "you"], lead: 3, trans: "smash", light: K.light("office", { sat: 1.15 }), cam: CAM.fit([0.35, 1.45, -1.75], { w: 2.2, a0: 6, a1: -2, elev: 4, push: 0.16 }),
        act: (S, u, f) => { S.actor("bogle", { x: 0, z: -1.8, expr: "stern", prop: "fists" }); S.actor("b1", { x: 0.85, z: -1.5, expr: f >= W(5, "no.") ? "shock" : "neutral", look: -0.6 });
          S.say("NO.", W(5, "say") - 2, 34, { x: -0.45, y: AH + 0.55, z: -1.6, w: 0.6, h: 0.38, tail: "right" }); S.kick(W(5, "no."), 0.08); S.pop("impact", W(5, "no."), 22, { x: -0.1, y: 2.25, z: -1.4, w: 0.9, h: 0.6, text: "NO!" }); } },
      // 12 · critics call it Bogle's Folly: whip to the newsstand headline
      { set: "news", beat: 6, trans: "whip", light: "night", cam: CAM.fit([-5.55, 1.6, -0.55], { w: 2.2, a0: 86, a1: 98, elev: 4, push: 0.12 }),
        act: (S, u, f) => { H.headline.visible = f >= W(6, "bogle's") - 3; S.actor("vendor", { x: -5.45, z: -0.25, expr: "laugh", prop: "point", look: -0.4 });
          S.pop("impact", W(6, "folly."), 24, { x: -5.0, y: 2.25, z: -0.9, w: 1.0, h: 0.7, text: "FOLLY!" }); S.kick(W(6, "folly."), 0.05); } },
      // 13 · rivals say nobody settles for average: two flashy stock pickers laugh on the sidewalk
      { set: "news", word: [6, "rivals"], lead: 3, trans: "dissolve", light: "night", cam: CAM.fit([-3.7, 1.45, 0], { w: 2.8, a0: 78, a1: 90, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.headline.visible = true; S.actor("p1", { x: -3.7, z: 0.55, expr: "laugh", look: -0.5 }); S.actor("p2", { x: -3.7, z: -0.6, expr: "grin", prop: "point", look: 0.5 });
          S.say("Average? Ha!", W(6, "nobody") - 4, 50, { x: -3.6, y: AH + 0.7, z: 0.75, w: 1.1, h: 0.42 }); } },
      // 14 · so why buy a fund that can't win? whip to the race track, the INDEX runner at the start
      { set: "track", beat: 7, trans: "whip", light: "golden", cam: CAM.fit([0, 1.25, -2.6], { w: 4.6, a0: -12, a1: 6, elev: 8, push: 0.1 }),
        act: (S, u, f) => { [["p3", -1.8], ["p1", -0.6], ["ix", 0.6], ["p2", 1.8]].forEach(([c, x]) => S.actor(c, { x, z: -2.6, expr: c === "ix" ? "smile" : "grin", prop: c === "p1" ? "fists" : null }));
          S.pop("label", S.a + 6, 60, { x: 0.6, y: AH + 0.42, z: -2.5, w: 0.7, h: 0.24, text: "INDEX", col: "#2a6a4a", hold: true }); S.pop("question", W(7, "win?") - 2, 28, { x: 0.6, y: AH + 0.9, z: -2.5, w: 0.35, h: 0.5 }); } },
      // 15 · you see: everyday analogy in a pizzeria, four friends share one pizza
      { set: "pizzeria", beat: 8, trans: "dissolve", light: K.light("interior", { hemi: 1.4 }), cam: CAM.fit([0, 1.05, -0.9], { w: 3.4, a0: -8, a1: 6, elev: 14, push: 0.12 }),
        act: (S, u, f) => { [["i1", -0.45, -1.55], ["i2", 0.45, -1.55], ["i3", -1.15, -0.8], ["i4", 1.15, -0.8]].forEach(([c, x, z], i) => S.actor(c, { x, z, mode: "sit", expr: i % 2 ? "grin" : "smile" }));
          S.pop("label", W(8, "market") - 2, 34, { x: 0, y: 1.25, z: -0.6, w: 0.8, h: 0.22, text: "THE MARKET", col: "#c0353a", hold: true }); } },
      // 16 · one giant pizza: push through into the giant tabletop, tiny investors round it
      { set: "table", word: [8, "giant"], lead: 3, trans: "zoom", light: K.backdrop("#e9b872"), cam: CAM.fit([0, 0.6, 0.4], { w: 7.4, a0: -14, a1: 6, e0: 38, e1: 24, push: 0.12 }),
        act: (S, u, f) => { spread(0); [["i1", -2.2, 2.4], ["i2", 2.2, 2.4], ["i3", -3.2, 0.2], ["i4", 3.2, 0.2], ["p1", -1.0, 3.2], ["bogle", 1.0, 3.2]].forEach(([c, x, z], i) => S.actor(c, { x, z, expr: i % 2 ? "shock" : "grin", prop: i === 0 ? "up" : null }));
          S.pop("word", W(8, "every") - 2, 40, { x: 0, y: 1.9, z: 0.5, w: 2.6, h: 0.65, text: "ALL STOCKS", col: "#c0353a", hold: true }); } },
      // 17 · before fees, the slices split evenly
      { set: "table", beat: 9, light: K.backdrop("#e9b872"), cam: CAM.fit([0, 0.3, 0.6], { w: 6.6, a0: 8, a1: -4, e0: 50, e1: 44, push: 0.1 }),
        act: (S, u, f) => { spread(E.back(E.prog(f, S.a + 2, S.a + 20))); [["i1", -2.2, 2.6], ["i2", 2.2, 2.6], ["p1", -1.0, 3.3], ["bogle", 1.0, 3.3]].forEach(([c, x, z]) => S.actor(c, { x, z, expr: "smile" }));
          S.pop("label", W(9, "before") - 2, 50, { x: 0, y: 1.0, z: 0.6, w: 1.6, h: 0.42, text: "BEFORE FEES", col: "#2a5a3a", hold: true }); } },
      // 18 · the average slice is exactly the market. That's arithmetic.
      { set: "table", word: [9, "exactly"], lead: 3, steady: true, light: K.backdrop("#e9b872"), cam: CAM.fit(at(0, 1.5, 0.2), { w: 2.4, a0: 20, a1: 8, elev: 40, push: 0.14 }), coc: 10,
        act: (S, u, f) => { spread(1); const [x, , z] = at(0, 1.6); S.pop("word", S.a + 4, 40, { x, y: 0.75, z: z + 0.3, w: 1.2, h: 0.35, text: "= MARKET", col: "#2a5a3a", hold: true });
          S.pop("label", W(9, "arithmetic.") - 2, 30, { x, y: 1.25, z: z + 0.3, w: 1.3, h: 0.32, text: "1/8 = 1/8", col: "#241726" }); } },
      // 19 · but stock pickers take a bite first: CHOMP, the picker's slice loses its crust end
      { set: "table", beat: 10, trans: "whip", light: K.backdrop("#e9b872"), cam: CAM.fit(at(7, 2.3, 0.7), { w: 3.0, a0: -14, a1: -4, elev: 22, push: 0.12 }),
        act: (S, u, f) => { spread(1); const b = W(10, "bite"); bite(7, f >= b ? 1 : 0); const [x, , z] = at(7, 3.1); S.actor("p1", { x, z, expr: f >= b ? "shock" : "grin", prop: f >= b ? "up" : "point" });
          S.kick(b, 0.07); S.pop("impact", b, 22, { x: x + 0.3, y: 1.0, z: z - 0.8, w: 1.0, h: 0.7, text: "CHOMP!" }); S.pop("puff", b, 14, { x: x + 0.4, y: 0.4, z: z - 0.9, w: 1.0, h: 0.4 }); } },
      // 20 · salaries, research, trading: insert on the bitten slice, one bill per bite
      { set: "table", word: [10, "salaries"], lead: 3, steady: true, light: K.backdrop("#e9b872"), cam: CAM.fit(at(7, 1.9, 0.25), { w: 2.0, a0: -6, a1: 6, elev: 38, push: 0.14 }), coc: 10,
        act: (S, u, f) => { spread(1); bite(7, 1); const [x, , z] = at(7, 1.9);
          [["salaries", "SALARIES"], ["research", "RESEARCH"], ["trading.", "TRADING"]].forEach(([w, t], q) => S.pop("label", W(10, w) - 2, 60, { x: x - 0.1, y: 0.95 - q * 0.0 + q * 0.32, z: z + 0.2, w: 1.0, h: 0.26, text: t, col: "#c0353a", hold: true })); } },
      // 21 · your fund takes a crumb: Bogle beside the nearly whole slice, one crumb flies
      { set: "table", beat: 11, trans: "whip", light: K.backdrop("#e9b872"), cam: CAM.fit(at(0, 2.3, 0.75), { w: 2.8, a0: 14, a1: 4, elev: 18, push: 0.12 }),
        act: (S, u, f) => { spread(1); bite(7, 1); const [x, , z] = at(0, 3.0); S.actor("bogle", { x, z, expr: "smile_closed", prop: "point", look: -0.4 });
          const c = W(11, "crumb"), k = E.prog(f, c - 2, c + 18), [cx, , cz] = at(0, R + 0.25); H.crumb.visible = f >= c - 2; H.crumb.position.set(cx + 0.6 * k, 0.3 + 1.0 * Math.sin(k * Math.PI), cz + 0.4 * k);
          S.pop("label", W(11, "under") - 2, 50, { x: x - 0.2, y: AH + 0.45, z: z + 0.1, w: 0.9, h: 0.28, text: "0.43%", col: "#2a5a3a", hold: true }); } },
      // 22 · the twist: on the track, the pickers carry FEES sacks and fall behind the MARKET runner
      { set: "track", beat: 12, trans: "whip", light: "golden", cam: CAM.follow((u) => [0, 1.1, -2 + 7 * u], [3.0, 0.9, 5.4], [0, 0.3, -1.4], 42),
        act: (S, u, f) => { const zc = -2 + 7 * u; const run = [["p3", -1.8, zc - 1.2 - 0.6 * u, 0], ["p1", -0.6, zc - 0.9 - 0.8 * u, 1], ["ix", 0.6, zc + 0.6, -1], ["p2", 1.8, zc - 1.4 - 0.5 * u, 2]];
          run.forEach(([c, x, z, p]) => { S.actor(c, { x, z, mode: "march", phase: f * 0.16 + x, expr: c === "ix" ? "smile" : "nervous" }); if (p >= 0) { H.packs[p].visible = true; H.packs[p].position.set(x + 0.36, 0.55, z - 0.05); } });
          S.pop("label", W(12, "market") - 2, 50, { x: 0.6, y: AH + 0.42, z: zc + 0.7, w: 0.8, h: 0.24, text: "MARKET", col: "#2a6a4a", hold: true }); } },
      // 23 · must trail it: smash on the pickers panting behind, sweat and a down arrow
      { set: "track", word: [12, "trail"], lead: 3, trans: "smash", light: K.light("golden", { tint: [1.08, 0.94, 0.9] }), cam: CAM.fit([-0.9, 1.2, 3.2], { w: 3.0, a0: 18, a1: 8, elev: 4, push: 0.14 }),
        act: (S, u, f) => { const t = f - S.a; 
          [["p3", -1.8, 3.0, 0], ["p1", -0.6, 3.3, 1]].forEach(([c, x, z, p]) => { S.actor(c, { x, z: z + 0.02 * t, mode: "march", phase: f * 0.1 + x, expr: "pained" }); H.packs[p].visible = true; H.packs[p].position.set(x + 0.36, 0.55, z + 0.02 * t - 0.05); });
          S.pop("sweat", S.a + 4, 24, { x: -0.4, y: AH + 0.2, z: 3.4, w: 0.2, h: 0.2 }); S.pop("arrow", W(12, "it.") - 2, 26, { x: -1.2, y: 2.2, z: 3.2, w: 0.3, h: 0.45, dir: "down" }); } },
      // 24 · the folly was never being average: Bogle calm with the AVERAGE certificate
      { set: "office", beat: 13, trans: "dissolve", light: K.light("lamp", { hemi: 1.5 }), cam: CAM.fit([0, 1.35, -1.7], { w: 2.0, a0: 10, a1: 2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.mark.visible = true; H.stamp.position.y = 2.5; S.actor("bogle", { x: 0, z: -1.75, expr: "smile_closed", prop: "paper" });
          S.pop("label", W(13, "average.") - 2, 30, { x: 0, y: AH + 0.45, z: -1.6, w: 0.9, h: 0.26, text: "AVERAGE", col: "#c0353a", hold: true }); } },
      // 25 · it was paying to try: the picker's slice is devoured on the last word, he faceplants
      { set: "table", word: [13, "it"], lead: 3, trans: "smash", light: K.backdrop("#e9b872"), cam: CAM.fit(at(7, 2.4, 0.7), { w: 2.8, a0: -10, a1: 0, elev: 18, push: 0.16 }),
        act: (S, u, f) => { spread(1); const tr = W(13, "try.") - 1; bite(7, f >= tr ? 2 : 1); const [x, , z] = at(7, 3.1);
          S.actor("p1", { x, z, mode: f >= tr ? "fall" : "stand", expr: f >= tr ? "dazed" : "nervous", prop: f >= tr ? null : "fists" });
          S.pop("label", W(13, "paying") - 2, 30, { x: x + 0.5, y: AH + 0.4, z: z - 0.2, w: 0.8, h: 0.26, text: "FEES", col: "#c0353a" });
          S.kick(tr, 0.12); S.pop("impact", tr, 26, { x: x + 0.5, y: 1.1, z: z - 0.9, w: 1.2, h: 0.8, text: "CHOMP!" }); S.pop("puff", tr, 16, { x: x + 0.6, y: 0.4, z: z - 1.0, w: 1.2, h: 0.5 }); S.pop("stars", tr + 3, 26, { x, y: 0.7, z: z + 0.1, w: 0.8, h: 0.5 }); } },
    ],
  };
};
