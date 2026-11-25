// "The Crash That Ruined Nobody" (tulip mania, Haarlem 1636-37: bids in a tavern, the failed sale of 3 February,
// Mackay's beggars and the onion legend, the near-empty archive drawer, the bulbs still underground) — film module.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const H = {};
  const PI = Math.PI;
  const tt = (B, s, bg, fg, pw, ph) => B.textTex(s, bg, fg, 1024, Math.round((1024 * ph) / pw));
  const hide = (o) => { o.visible = false; if (o.userData && o.userData.base) o.userData.base.v = false; return o; };
  const BOOK = K.backdrop("#4a3566");
  const SOIL = K.backdrop("#2f4f7a");
  const GOLD = "#d8a93a";

  // a striped tulip in a clay pot (group origin at the pot's foot); returns {g, head, stem}
  const tulip = (B, x, y, z, s = 1, parent, col = "stripes:#d8283a:#f6efe0", pot = true) => {
    const g = B.grp(x, y, z, 0, s, parent);
    if (pot) { B.cyl(0.13, 0.1, 0.22, "#b8643a", 0, 0, 0, { in: g, seg: 16 }); B.cyl(0.14, 0.14, 0.04, "#9a4e2a", 0, 0.21, 0, { in: g, seg: 16 }); }
    const stem = B.dyn(B.grp(0, pot ? 0.24 : 0, 0, 0, 1, g));
    B.cyl(0.015, 0.015, 0.42, "#3f8a3a", 0, 0, 0, { in: stem, seg: 6 });
    B.box(0.05, 0.26, 0.012, "#4f9a3a", 0.05, 0.02, 0, { in: stem }).rotation.z = -0.4;
    B.box(0.05, 0.22, 0.012, "#4f9a3a", -0.05, 0.02, 0.01, { in: stem }).rotation.z = 0.45;
    const head = B.dyn(B.grp(0, 0.42, 0, 0, 1, stem));
    B.cyl(0.085, 0.045, 0.16, col, 0, 0, 0, { in: head, seg: 14 });
    for (let i = 0; i < 3; i++) B.cone(0.04, 0.07, col, Math.cos(i * 2.1) * 0.05, 0.14, Math.sin(i * 2.1) * 0.05, { in: head, seg: 6 });
    return { g: B.dyn(g), head, stem };
  };
  // a tulip bulb (onion-like), origin at its centre
  const bulb = (B, x, y, z, s = 1, parent) => { const g = B.grp(x, y, z, 0, s, parent);
    B.ball(0.12, "#c89a6a", 0, 0, 0, { in: g, sy: 0.85 }); B.cone(0.05, 0.1, "#b8865a", 0, 0.07, 0, { in: g, seg: 8 });
    for (let i = 0; i < 4; i++) B.cyl(0.006, 0.006, 0.06, "#e8d8b0", -0.04 + i * 0.027, -0.15, 0, { in: g, seg: 4 });
    return B.dyn(g); };
  // a toy house (for "the price of a house")
  const house = (B, x, y, z, s = 1, parent) => { const g = B.grp(x, y, z, 0, s, parent);
    B.box(0.4, 0.3, 0.3, "brick:#a5503a", 0, 0, 0, { in: g }); const r = B.cone(0.33, 0.22, "#5a3a2a", 0, 0.3, 0, { in: g, seg: 4 }); r.rotation.y = PI / 4;
    B.box(0.08, 0.14, 0.01, "#4a2e1c", 0, 0, 0.152, { in: g }); B.box(0.08, 0.08, 0.01, "#ffe39a", 0.12, 0.14, 0.152, { in: g }); B.box(0.08, 0.08, 0.01, "#ffe39a", -0.12, 0.14, 0.152, { in: g });
    return B.dyn(g); };
  // a paper promise note
  const note = (B, x, y, z, s, parent, text = "I PROMISE") => B.dyn(B.plate(0.5 * s, 0.32 * s, tt(B, text, "#fbf3dc", "#3a1a10", 0.5, 0.32), x, y, z, { in: parent, d: 0.01, edge: "#c8b890" }));

  return {
    cast: {
      you: { jacket: "#c8642a", pants: "#3a3a40", boots: "#2a1a12", hat: "tophat", skin: "#f2c9a4", buttons: "#f4efe2" },
      henk: { jacket: "#1e1e26", pants: "#2a2a30", boots: "#121216", hat: "tophat", moustache: "#c8b8a0", skin: "#f0c4a2", buttons: "#f4efe2", build: "stout" },
      bid1: { jacket: "#3a5a3a", pants: "#3a3a40", boots: "#2a1a12", hat: "cap", cap: "#7a2a2a", moustache: "#5a3a24", skin: "#e8b48a" },
      bid2: { jacket: "#5a3a6a", pants: "#2a2a30", boots: "#1a1418", hat: "bonnet", dress: "#5a3a6a", skin: "#f5d6b8" },
      bid3: { jacket: "#7a6a3a", pants: "#3a3a30", boots: "#2a1a12", hat: "hair", hair: "#d8c8a0", skin: "#d9a27a" },
      crier: { jacket: "#2f3f6a", pants: "#2a2a34", boots: "#141418", hat: "tophat", moustache: "#8a6a4a", skin: "#f0caa8", buttons: GOLD },
      beggar: { jacket: "#6a6a6a", pants: "#4a4a4a", boots: "#2a1a12", hat: "tophat", moustache: "#9a9a9a", skin: "#e8c0a0", patch: "#8a5a3a", pins: true, build: "stout" },
      sailor: { jacket: "#2f4a7a", pants: "#e8e4dc", boots: "#1a1418", hat: "beanie", cap: "#c0353a", skin: "#e8b48a", moustache: "#5a3a24" },
      modern: { jacket: "#3f7fc0", pants: "#2a3a5a", boots: "#f4f4f4", hat: "cap", cap: "#2a2a30", skin: "#f2c9a4" },
    },
    sets: {
      // a smoky Haarlem tavern, winter 1636: beams, fire, a long bidding table, a slate of bids, snow at the window
      tavern: (B) => {
        B.set.room({ style: "cabin", wall: "plaster:#d8c8a0", floor: "floor:#5a3a24", w: 9, d: 7, h: 3.6, windows: [2.6], door: false });
        for (const x of [-3, -1, 1, 3]) B.box(0.22, 0.22, 7, "planks:#4a2e1c", x, 3.3, -0.5);
        B.box(9, 0.9, 0.06, "panel:#5a3a24", 0, 0, -3.47);
        // fireplace
        B.box(1.9, 1.6, 0.45, "brick:#8a4a3a", -2.6, 0, -3.3); B.box(1.1, 0.9, 0.1, "#1a0f0a", -2.6, 0.1, -3.06); B.box(2.1, 0.12, 0.55, "planks:#4a2e1c", -2.6, 1.6, -3.25);
        H.fire = B.dyn(B.grp(-2.6, 0.12, -3.0, 0, 1)); B.cone(0.24, 0.55, "#ff7a2a", -0.16, 0, 0, { in: H.fire }); B.cone(0.28, 0.7, "#ffb03a", 0.1, 0, 0, { in: H.fire }); B.cone(0.14, 0.4, "#ffe27a", 0.04, 0, 0.05, { in: H.fire });
        B.lamp(-2.6, 0.7, -2.3, "#ff9a4a", 5, 7);
        // the slate of bids + a tulip painting
        B.box(1.7, 1.1, 0.06, "#2e2a28", 0.2, 1.55, -3.44);
        B.plate(1.5, 0.3, tt(B, "BIDS TONIGHT", "#2e2a28", "#f4efe2", 1.5, 0.3), 0.2, 2.42, -3.4, { d: 0.01, edge: "#2e2a28" });
        for (let r = 0; r < 3; r++) B.box(0.9 - r * 0.15, 0.03, 0.01, "#d8d4cc", 0.1, 1.75 + r * 0.17, -3.4);
        B.plate(0.8, 1.0, tt(B, "", "#f2e6c8", "#3a1a10", 0.8, 1.0), -0.9 - 0.4, 2.2, -3.42, { d: 0.03, edge: GOLD });
        tulip(B, -1.3, 1.78, -3.36, 1.1, undefined, "stripes:#d8283a:#f6efe0", false);
        // the long table, candles, a pot with a tulip, the bulb on its cushion, a gavel
        B.prop.table({ x: 0, z: -1.4, w: 3.2, d: 1.0, h: 0.78, col: "floor:#6a4026" });
        for (const x of [-1.2, 1.25]) { B.cyl(0.04, 0.05, 0.05, "#c9a44a", x, 0.78, -1.5); B.cyl(0.025, 0.025, 0.2, "#f4efe2", x, 0.83, -1.5); H["c" + (x < 0 ? "l" : "r")] = B.dyn(B.ball(0.035, "#ffd84a", x, 1.06, -1.5)); }
        H.pot = tulip(B, 0.75, 0.78, -1.55, 1.2);
        B.box(0.5, 0.08, 0.36, "#8a2a3a", -0.15, 0.78, -1.25); H.bulb = bulb(B, -0.15, 0.96, -1.25, 1.0);
        H.house = hide(house(B, 0.4, 0.78, -1.15, 1.1));
        H.gavel = B.dyn(B.grp(-0.65, 0.8, -1.3, 0, 1)); B.box(0.06, 0.06, 0.34, "#5a3a24", 0, 0, 0.12, { in: H.gavel }); B.cyl(0.06, 0.06, 0.18, "#4a2e1c", 0, -0.03, 0, { in: H.gavel, rz: PI / 2 });
        H.notes = [0, 1, 2].map((i) => hide(note(B, -0.9 + i * 0.32, 0.8, -1.1 + (i % 2) * 0.1, 0.9, undefined)));
        H.notes.forEach((n) => { n.rotation.x = -PI / 2; n.userData.base.r.copy(n.rotation); });
        H.purse = hide(B.prop.moneyBag({ x: -0.3, y: 0.78, z: -1.15, size: 0.55 }));
        B.prop.chair({ x: -1.0, z: -2.2, col: "#5a3420" }); B.prop.chair({ x: 1.0, z: -2.2, col: "#5a3420" });
        B.prop.barrel({ x: 3.6, z: -2.8 }); B.prop.barrel({ x: 3.6, z: -1.9 });
        B.prop.lamp({ x: 0, y: 3.2, z: -1.4, kind: "hang", cord: 0.4, col: "#6a4a2e", intensity: 4 });
        B.lamp(1.5, 2.6, 1.2, "#ffd8a0", 3, 9);
      },
      // Haarlem market square in the snow: gabled plaster houses, a lonely auction stand
      square: (B) => {
        B.set.street({ style: ["village", "brick"], signs: ["", "", "", "", "", ""], ground: "snow", seed: 23, lit: true });
        B.box(9, 0.1, 6, "snow", 0, 0, -3);
        H.stand = B.prop.table({ x: 0, z: -4.2, w: 2.0, d: 0.8, h: 0.95, col: "planks:#7a4a2a" });
        B.prop.sign({ x: 0, z: -5.0, text: "TULIP SALE", w: 2.4, h: 0.55, post: true, bg: "#f4e6c8", fg: "#8a2030" });
        H.spot = tulip(B, 0.45, 0.95, -4.2, 1.3);
        for (const z of [-2.2, -1.0, 0.2]) B.prop.bench({ x: 0, z, ry: PI, col: "planks:#6a4a30" });
        for (const z of [-2.2, -1.0, 0.2]) B.box(1.8, 0.04, 0.4, "snow", 0, 0.51, z);
        for (const x of [-3.6, 3.6]) B.prop.lampPost({ x, z: -3.2, light: true });
        H.paper = B.dyn(B.plate(0.4, 0.28, tt(B, "BID", "#fbf3dc", "#3a1a10", 0.4, 0.28), 1.5, 0.15, -1.0, { d: 0.01 }));
      },
      // the 1841 book of crowd madness: a giant open book on a purple stage, legends standing on its pages
      book: (B) => {
        B.set.stage({ floor: "#3a2a4a", back: "#4a3566" });
        B.box(6.4, 0.25, 4.2, "#6a1a22", 0, 0, -0.4); // cover underneath
        H.rightPage = B.box(3.0, 0.12, 3.9, "#fbf3dc", 1.55, 0.25, -0.4);
        H.leftCover = B.dyn(B.grp(0, 0.3, -0.4, 0, 1));
        B.box(3.0, 0.12, 3.9, "#fbf3dc", -1.55, -0.05, 0, { in: H.leftCover }); B.box(3.2, 0.06, 4.1, "#6a1a22", -1.6, -0.1, 0, { in: H.leftCover });
        B.plate(2.6, 0.3, tt(B, "MADNESS OF CROWDS", "#fbf3dc", "#5a1a22", 2.6, 0.3), -1.55, 0.08, -1.0, { in: H.leftCover, d: 0.005, rx: -PI / 2 });
        B.plate(1.6, 0.6, tt(B, "1841", "#fbf3dc", "#8a2030", 1.6, 0.6), -1.55, 0.08, 0.2, { in: H.leftCover, d: 0.005, rx: -PI / 2 });
        B.plate(2.6, 0.4, tt(B, "TULIPOMANIA", "#fbf3dc", "#3a1a10", 2.6, 0.4), 1.55, 0.38, -1.5, { d: 0.005, rx: -PI / 2 });
        // a standing page / bookmark panel behind
        B.box(0.18, 0.2, 4.0, "#3a1010", 0, 0.25, -0.4);
        H.bigBulb = hide(bulb(B, 1.9, 1.55, 0.6, 2.2));
        H.onion = hide(B.dyn(B.plate(1.2, 0.36, tt(B, "AN ONION?", "#ffd84a", "#241726", 1.2, 0.36), 2.4, 2.6, 0.4, { d: 0.02, edge: "#7a5a2a" })));
        B.lamp(0, 5, 3, "#fff0c8", 6, 14); B.lamp(-3, 3, 2, "#ffd0e8", 3, 9);
      },
      // a Dutch archive: shelves of boxes by year, a reading desk, a ledger, a magnifier, the drawer of tulip bankrupts
      archive: (B) => {
        B.set.room({ style: "library", wall: "panel:#4a3a30", floor: "floor:#6a4630", w: 9, d: 7, h: 4.0, door: false });
        for (let c = 0; c < 4; c++) { const x = -3.3 + c * 2.2; B.box(2.0, 3.4, 0.5, "#4a2e1c", x, 0, -3.2);
          for (let r = 0; r < 4; r++) for (let k = 0; k < 3; k++) { const yr = 1634 + ((c * 4 + r + k) % 6);
            B.box(0.55, 0.62, 0.42, ["#c8b08a", "#b8a07a", "#d8c09a"][(c + r + k) % 3], x - 0.62 + k * 0.62, 0.15 + r * 0.82, -3.05);
            B.plate(0.36, 0.14, tt(B, String(yr), "#f4efe2", "#3a2418", 0.36, 0.14), x - 0.62 + k * 0.62, 0.62 + r * 0.82, -2.83, { d: 0.005 }); } }
        B.prop.desk({ x: 0.2, z: -1.2, w: 2.0, col: "floor:#4a2a18" }); B.prop.lamp({ x: -0.55, y: 0.81, z: -1.35, kind: "desk", intensity: 4 });
        H.ledger = B.dyn(B.grp(0.3, 0.82, -1.15, 0, 1)); B.box(0.9, 0.04, 0.6, "#fbf3dc", 0, 0, 0, { in: H.ledger }); B.box(0.02, 0.05, 0.6, "#6a1a22", 0, 0, 0, { in: H.ledger });
        B.plate(0.8, 0.16, tt(B, "HAARLEM 1637", "#fbf3dc", "#3a2418", 0.8, 0.16), 0, 0.045, 0, { in: H.ledger, d: 0.002, rx: -PI / 2 });
        H.mag = B.dyn(B.grp(0.3, 0.95, -1.1, 0, 1)); const ring = new B.THREE.Mesh(new B.THREE.TorusGeometry(0.14, 0.022, 8, 24), B.mat(GOLD)); ring.rotation.x = -PI / 2; H.mag.add(ring);
        B.cyl(0.02, 0.02, 0.24, "#4a2e1c", 0.2, 0, 0.12, { in: H.mag, rz: PI / 2 });
        // the drawer cabinet
        B.box(1.4, 1.3, 0.8, "panel:#5a3a24", 2.5, 0, -2.3);
        H.drawer = B.dyn(B.grp(2.5, 0.75, -1.9, 0, 1)); B.box(1.2, 0.36, 0.7, "#6a4a2e", 0, 0, -0.35, { in: H.drawer }); B.box(1.1, 0.3, 0.62, "#2e1a10", 0, 0.08, -0.35, { in: H.drawer });
        B.plate(1.0, 0.24, tt(B, "TULIP RUIN", "#f4efe2", "#8a2030", 1.0, 0.24), 0, 0.18, 0.01, { in: H.drawer, d: 0.01, edge: GOLD });
        H.card = B.dyn(B.box(0.22, 0.02, 0.3, "#fbf3dc", 0.25, 0.39, -0.4, { in: H.drawer }));
        B.lamp(0.3, 3.0, 0.8, "#ffe0b0", 4, 9);
      },
      // everyday analogy: a modern living room, a laptop showing a pre-order, a calendar
      living: (B) => {
        B.set.room({ style: "modern", wall: "plaster:#e8dcc8", floor: "floor:#b88a5a", w: 8, d: 6, h: 3.2, windows: [2.4], door: false });
        B.box(2.4, 0.45, 0.9, "#4a6a8a", -0.4, 0, -2.2); B.box(2.4, 0.6, 0.25, "#4a6a8a", -0.4, 0.45, -2.6); for (const sx of [-1.55, 0.75]) B.box(0.25, 0.65, 0.9, "#3f5f7a", sx, 0, -2.2);
        B.prop.table({ x: -0.4, z: -1.1, w: 1.2, d: 0.6, h: 0.45, col: "#e8e4dc" });
        H.lap = B.dyn(B.grp(-0.4, 0.45, -1.05, 0, 1)); B.box(0.62, 0.03, 0.42, "#c9ccd2", 0, 0, 0, { in: H.lap });
        const scr = B.grp(0, 0.03, -0.2, 0, 1, H.lap); scr.rotation.x = -0.25; B.box(0.62, 0.42, 0.02, "#2a2d36", 0, 0, 0, { in: scr });
        B.plate(0.56, 0.36, "#f4f6fa", 0, 0.21, 0.011, { in: scr, d: 0.002 }); B.plate(0.5, 0.12, tt(B, "PRE-ORDER", "#f4f6fa", "#2a5ab8", 0.5, 0.12), 0, 0.24, 0.014, { in: scr, d: 0.002 });
        H.cal = B.dyn(B.plate(0.8, 1.0, tt(B, "FEB", "#f4f6fa", "#c0353a", 0.8, 1.0), 1.6, 1.9, -2.92, { d: 0.02, edge: "#2a2d36" }));
        H.june = hide(B.dyn(B.plate(0.8, 1.0, tt(B, "JUNE", "#f4f6fa", "#2f8a4a", 0.8, 1.0), 1.6, 1.9, -2.9, { d: 0.02, edge: "#2a2d36" })));
        B.prop.plant({ x: -2.6, z: -2.4 }); B.prop.lamp({ x: 1.8, z: -2.4, kind: "floor", intensity: 3 });
        B.lamp(0, 2.8, 1.0, "#fff4e0", 4, 9);
      },
      // the mechanism: a cutaway of frozen soil with sleeping bulbs, a snow lid, notes trading above, the price arrow
      soil: (B) => {
        B.set.stage({ floor: "#e8eef4", back: "#2f4f7a" });
        B.box(9, 2.6, 2.6, "dirt", 0, 0, -1.3); B.box(9.1, 0.25, 2.7, "snow", 0, 2.6, -1.3);
        B.box(9, 0.02, 0.02, "#3a2418", 0, 2.6, 0.01);
        H.bulbs = [-3, -1.5, 0, 1.5, 3].map((x, i) => { B.ball(0.42, "#3a2418", x, 1.2 + (i % 2) * 0.25, -0.2, { sy: 0.8 }); return bulb(B, x, 1.2 + (i % 2) * 0.25, 0.08, 2.1); });
        H.sprouts = [-3, -1.5, 0, 1.5, 3].map((x, i) => tulip(B, x, 2.82, -0.4, 1.8, undefined, ["stripes:#d8283a:#f6efe0", "#f2c14e", "stripes:#8a2a8a:#f6efe0", "#e2453c", "stripes:#d8283a:#f6efe0"][i], false));
        H.priceBoard = B.dyn(B.plate(2.2, 0.6, tt(B, "TULIP PRICES", "#241726", "#ffd84a", 2.2, 0.6), 0, 5.6, -1.6, { d: 0.05, edge: GOLD }));
        H.arrow = B.prop.arrow({ x: 0, y: 3.5, z: -1.0, dir: "down", size: 1.1 });
        H.junetag = hide(B.dyn(B.plate(1.8, 0.5, tt(B, "PAY IN JUNE", "#fbf3dc", "#2f6a3a", 1.8, 0.5), 0, 4.2, 0.2, { d: 0.03, edge: "#6a8a4a" })));
        B.lamp(0, 5, 3, "#f0f4ff", 6, 14); B.lamp(0, 1.4, 2.0, "#ffd8a0", 3, 6);
      },
    },
    shots: [
      // 0 · frame 0: the gavel slams on the bidding table — SOLD!
      { set: "tavern", f: 0, light: "lamp", cam: CAM.fit([-0.3, 1.1, -1.35], { w: 1.7, a0: -14, a1: -4, elev: 14, push: 0.2 }), coc: 9,
        act: (S, u, f) => { H.gavel.rotation.x = -0.9 * (1 - E.easeIn(E.prog(f, 0, 5))) + (f > 5 ? 0 : 0); H.fire.scale.y = 1 + 0.1 * Math.sin(f * 0.7);
          S.kick(5, 0.1); S.pop("impact", 5, 22, { x: -0.5, y: 1.5, z: -1.1, w: 0.75, h: 0.5, text: "SOLD!" });
          for (let q = 0; q < 3; q++) S.pop("coin", 6 + q * 3, 18, { x: -0.6 + q * 0.3, y: 1.1, z: -1.0, w: 0.16, h: 0.16, rise: 0.4 });
          S.pop("label", 2, 34, { x: -0.2, y: 0.55, z: -0.9, w: 1.1, h: 0.24, text: "TULIP AUCTION", bg: "#f4efe2", hold: true }); } },
      // 1 · the most famous market crash: smash to the snowy square, a giant red arrow plunges into the snow
      { set: "soil", word: [0, "crash"], lead: 3, trans: "smash", light: SOIL, cam: CAM.fit([0, 3.4, -1.0], { w: 5.2, a0: 6, a1: -2, elev: 8, push: 0.1 }),
        act: (S, u, f) => { const t = S.a + 10; H.arrow.position.y = 3.5 + 4.0 * (1 - E.easeIn(E.prog(f, S.a, t)));
          S.kick(t, 0.14); S.pop("impact", t, 28, { x: 1.4, y: 4.6, z: -0.6, w: 1.4, h: 0.8, text: "CRASH!" }); S.pop("puff", t, 18, { x: 0, y: 2.9, z: -0.4, w: 3.0, h: 0.8, pop: false });
          S.pop("label", W(0, "history"), 40, { x: 0, y: 6.4, z: -1.4, w: 2.6, h: 0.4, text: "TULIP MANIA", bg: "#ff6a5a", hold: true }); } },
      // 2 · ruined almost nobody: the tavern regulars shrug, unbothered
      { set: "tavern", word: [0, "ruined"], lead: 3, trans: "whip", dir: 1, light: "lamp", cam: CAM.fit([0, 1.3, -1.9], { w: 3.0, a0: 10, a1: 2, elev: 5, push: 0.1 }),
        act: (S, u, f) => { H.fire.scale.y = 1 + 0.1 * Math.sin(f * 0.7); const t = W(0, "nobody.");
          S.actor("henk", { x: 0, z: -2.1, expr: f < t ? "neutral" : "grin", prop: f < t ? null : "shrug" }); S.actor("bid1", { x: -1.25, z: -2.0, expr: f < t ? "neutral" : "smile", prop: f < t ? null : "shrug" });
          S.actor("bid3", { x: 1.25, z: -2.0, expr: f < t ? "neutral" : "laugh", prop: f < t ? null : "shrug" });
          S.pop("label", W(0, "almost") - 2, 50, { x: 0, y: 2.55, z: -1.8, w: 1.8, h: 0.3, text: "RUINED: ALMOST NOBODY", bg: "#4fd18b", hold: true }); } },
      // 3 · imagine you're in a smoky Haarlem tavern: wide crane over the room, YOU at the table, pipe smoke
      { set: "tavern", beat: 1, trans: "dissolve", light: "lamp", cam: CAM.keys([[0, { p: [1.2, 2.6, 4.2], t: [-0.6, 1.2, -1.4], fov: 46 }], [1, { p: [-0.2, 2.1, 3.6], t: [-0.7, 1.2, -1.4], fov: 46 }]]),
        act: (S, u, f) => { H.fire.scale.y = 1 + 0.1 * Math.sin(f * 0.7);
          S.actor("you", { x: -1.3, z: -0.5, expr: "grin" }); S.actor("henk", { x: 0, z: -2.1, expr: "neutral" }); S.actor("bid1", { x: -1.0, z: -2.1, expr: "neutral" }); S.actor("bid2", { x: 1.2, z: -2.1, expr: "smile" }); S.actor("bid3", { x: 2.3, z: -1.0, expr: "neutral" });
          S.fx("smoke", { x: 0.6, y: 2.9 + 0.1 * Math.sin(f * 0.05), z: -2.6, w: 1.2, h: 0.5 });
          S.pop("label", W(1, "you're"), 40, { x: -1.3, y: 2.25, z: -0.4, w: 0.6, h: 0.26, text: "YOU", bg: "#ffd84a", hold: true });
          S.pop("label", W(1, "Haarlem") - 2, 46, { x: 0, y: 2.9, z: -1.8, w: 2.0, h: 0.32, text: "HAARLEM, HOLLAND", bg: "#f4efe2", hold: true }); } },
      // 4 · winter, sixteen thirty-six: dissolve out of the window to the square under falling snow
      { set: "square", word: [1, "winter,"], lead: 4, trans: "dissolve", light: "night", snow: 1, cam: CAM.fit([0, 2.0, -3.0], { w: 7.5, a0: -8, a1: 4, e0: 10, e1: 6, push: 0.08 }),
        act: (S, u, f) => { S.snow(1); S.pop("label", W(1, "sixteen") - 4, 50, { x: 0, y: 3.3, z: -3.0, w: 2.2, h: 0.4, text: "WINTER 1636", bg: "#cfe0f0", hold: true }); } },
      // 5 · men are bidding on tulips: raised hands round the table
      { set: "tavern", beat: 2, trans: "whip", dir: -1, light: "lamp", cam: CAM.fit([-0.6, 1.3, -1.5], { w: 3.8, a0: -12, a1: -2, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.fire.scale.y = 1 + 0.1 * Math.sin(f * 0.7); const b = (i) => (Math.floor((f - S.a) / 9 + i) % 3 === 0 ? "up" : null);
          S.actor("henk", { x: 0, z: -2.15, expr: "grin", prop: "point" }); S.actor("bid1", { x: -1.2, z: -2.05, expr: "grin", prop: b(0) });
          S.actor("bid2", { x: 1.2, z: -2.05, expr: "smile", prop: b(1) }); S.actor("you", { x: -1.9, z: -0.9, expr: "grin", prop: "up" });
          S.say("I bid more!", W(2, "bidding") - 2, 36, { x: -1.2, y: 2.4, z: -0.7, w: 1.0, h: 0.4 });
          S.pop("heart", W(2, "tulips."), 22, { x: 0.75, y: 1.9, z: -1.4, w: 0.3, h: 0.3, rise: 0.3 }); } },
      // 6 · some bulbs fetch the price of a house: insert on the bulb on its cushion, a toy house pops beside it
      { set: "tavern", word: [2, "Some"], lead: 3, steady: true, coc: 11, light: "lamp", cam: CAM.fit([0.1, 1.0, -1.25], { w: 1.15, a0: 4, a1: -4, elev: 14, push: 0.16 }),
        act: (S, u, f) => { const t = W(2, "house.") - 2; H.house.visible = f >= t; H.house.scale.setScalar(1.1 * Math.max(0.01, E.back(E.prog(f, t, t + 7)))); H.bulb.rotation.y = 0.02 * (f - S.a);
          S.fx("glow", { x: -0.15, y: 1.0, z: -1.1, w: 0.5, h: 0.4 });
          S.pop("word", t + 2, 30, { x: 0.12, y: 1.25, z: -1.0, w: 0.22, h: 0.22, text: "=", col: "#241726", hold: true });
          S.pop("sparks", t, 16, { x: 0.4, y: 1.1, z: -1.0, w: 0.4, h: 0.4 }); } },
      // 7 · then, on February third: flash to the square by day, a lonely auction stand
      { set: "square", beat: 3, trans: "flash", light: "cold", cam: CAM.fit([0, 1.6, -3.4], { w: 5.4, a0: 10, a1: 2, elev: 8, push: 0.08 }),
        act: (S, u, f) => { S.snow(0.3); S.actor("crier", { x: -0.5, z: -4.6, expr: "grin", prop: "wave", wave: (f * 0.05) % 1 });
          S.pop("label", W(3, "February") - 2, 50, { x: 0, y: 3.4, z: -3.0, w: 2.2, h: 0.4, text: "3 FEBRUARY 1637", bg: "#f4efe2", hold: true }); } },
      // 8 · a Haarlem sale finds no buyers at all: close on the crier, empty benches, a paper tumbling
      { set: "square", word: [3, "sale"], lead: 3, light: "cold", cam: CAM.fit([-0.4, 1.4, -4.4], { w: 2.2, a0: -12, a1: -4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { S.snow(0.3); const t = W(3, "no"); H.paper.position.x = 1.5 - 0.02 * (f - S.a); H.paper.rotation.z = 0.1 * (f - S.a);
          S.actor("crier", { x: -0.5, z: -4.6, expr: f < t ? "grin" : "nervous", prop: f < t ? "point" : "shrug" });
          S.say("Anyone?", t - 4, 34, { x: -0.1, y: 2.4, z: -4.4, w: 0.8, h: 0.38 }); S.pop("sweat", W(3, "all."), 24, { x: -0.25, y: 2.0, z: -4.3, w: 0.2, h: 0.26 }); } },
      // 9 · within days, the tulip market is dead: whip to the empty tavern, the tulip droops
      { set: "tavern", beat: 4, trans: "whip", dir: 1, light: (u) => K.mixLight(K.light("lamp"), K.light("night"), 0.55), cam: CAM.fit([0.15, 1.15, -1.6], { w: 2.3, a0: 14, a1: 4, elev: 6, push: 0.12 }),
        act: (S, u, f) => { const t = W(4, "dead."); H.fire.visible = false; H.cl.visible = false; H.cr.visible = false;
          H.pot.stem.rotation.z = -1.1 * E.ss(E.prog(f, t - 10, t + 2));
          S.actor("you", { x: -0.45, z: -2.1, expr: f < t ? "nervous" : "dazed", prop: "chin" });
          S.kick(t + 2, 0.06); S.pop("impact", t + 2, 22, { x: 1.2, y: 1.6, z: -1.2, w: 0.7, h: 0.45, text: "FLOP" }); } },
      // 10 · books later wrote: push through to the purple stage, the giant book slams open
      { set: "book", beat: 5, trans: "zoom", light: BOOK, cam: CAM.fit([-1.1, 0.6, -0.6], { w: 4.0, a0: -6, a1: 2, e0: 50, e1: 42, push: 0.1 }),
        act: (S, u, f) => { const k = E.back(E.prog(f, S.a, S.a + 12)); H.leftCover.rotation.z = -PI * (1 - Math.min(1, k)) - 0.04 * Math.sin(k * PI);
          S.kick(S.a + 12, 0.08); S.pop("puff", S.a + 12, 18, { x: 0, y: 0.6, z: 0.6, w: 5.0, h: 0.8, pop: false }); } },
      // 11 · merchants reduced to beggary: a stout merchant in patches on the page, hat held out
      { set: "book", word: [5, "merchants"], lead: 3, trans: "dissolve", light: BOOK, cam: CAM.fit([-1.4, 1.2, 0.2], { w: 2.4, a0: -12, a1: -4, elev: 8, push: 0.1 }),
        act: (S, u, f) => { H.leftCover.rotation.z = 0;
          S.actor("beggar", { x: -1.4, y: 0.38, z: 0.2, expr: "pained", prop: "hold" });
          S.pop("label", W(5, "beggary.") - 2, 40, { x: -1.4, y: 2.6, z: 0.3, w: 1.2, h: 0.3, text: "BEGGARY", bg: "#f4efe2", hold: true });
          S.pop("question", W(5, "beggary.") + 6, 20, { x: -0.8, y: 2.1, z: 0.4, w: 0.25, h: 0.35 }); } },
      // 12 · legend says a sailor: whip across the pages, the sailor stamped LEGEND
      { set: "book", beat: 6, trans: "whip", dir: 1, light: BOOK, cam: CAM.fit([1.6, 1.3, 0.3], { w: 2.6, a0: 12, a1: 4, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.leftCover.rotation.z = 0;
          S.actor("sailor", { x: 1.5, y: 0.31, z: 0.2, expr: "grin", prop: "hold" });
          S.pop("label", W(6, "Legend") + 2, 50, { x: 1.5, y: 2.55, z: 0.3, w: 1.1, h: 0.34, text: "LEGEND", bg: "#ffd84a", hold: true }); S.kick(W(6, "Legend") + 4, 0.04); } },
      // 13 · ate a priceless bulb like an onion: close, the bulb shrinks with each bite — CHOMP
      { set: "book", word: [6, "ate"], lead: 3, steady: true, coc: 10, light: BOOK, cam: CAM.fit([1.6, 1.55, 0.3], { w: 1.4, a0: -6, a1: 2, elev: 2, push: 0.14 }),
        act: (S, u, f) => { const t = W(6, "onion."); const bites = Math.min(3, Math.max(0, Math.floor((f - W(6, "priceless")) / 8)));
          H.bigBulb.visible = f < t + 2; H.bigBulb.position.set(1.9, 1.55, 0.6); H.bigBulb.scale.setScalar(2.2 * (1 - 0.22 * bites));
          S.actor("sailor", { x: 1.5, y: 0.31, z: 0.2, expr: f < t ? "lick" : "smile_closed", prop: "hold" });
          H.onion.visible = f >= W(6, "onion.") - 4;
          S.kick(t + 2, 0.06); S.pop("impact", t + 2, 24, { x: 2.0, y: 1.9, z: 0.7, w: 0.8, h: 0.5, text: "CHOMP!" }); } },
      // 14 · but a historian searched the archives: whip to the archive, the magnifier sweeps the ledger
      { set: "archive", beat: 7, trans: "whip", dir: -1, light: "office", cam: CAM.keys([[0, { p: [-1.8, 2.4, 2.2], t: [0.2, 1.4, -2.0], fov: 44 }], [1, { p: [-0.6, 2.0, 1.6], t: [0.3, 1.0, -1.4], fov: 42 }]]),
        act: (S, u, f) => { H.mag.position.x = 0.3 + 0.25 * Math.sin((f - S.a) * 0.12); H.mag.position.z = -1.1 + 0.1 * Math.cos((f - S.a) * 0.09);
          S.pop("label", W(7, "Dutch") - 2, 40, { x: 0, y: 3.4, z: -2.6, w: 2.2, h: 0.34, text: "THE ARCHIVES", bg: "#f4efe2", hold: true });
          S.pop("page", W(7, "searched"), 20, { x: 0.4, y: 1.3, z: -1.0, w: 0.3, h: 0.35, rise: 0.4 }); } },
      // 15 · could barely find a single bankruptcy: the drawer slides out — almost empty, one lonely card
      { set: "archive", word: [7, "barely"], lead: 4, trans: "dissolve", light: (u) => K.mixLight(K.light("office"), K.light("mind"), E.ss(u) * 0.5), cam: CAM.fit([2.5, 1.0, -1.7], { w: 2.1, a0: 18, a1: 8, elev: 22, push: 0.12 }),
        act: (S, u, f) => { const k = E.ss(E.prog(f, S.a + 2, S.a + 14)); H.drawer.position.z = -1.9 + 0.55 * k; const t = W(7, "bankruptcy.");
          S.kick(S.a + 14, 0.03); S.pop("label", t - 2, 40, { x: 2.5, y: 1.55, z: -1.2, w: 1.0, h: 0.26, text: "ALMOST NONE", bg: "#4fd18b", hold: true });
          S.pop("sparks", t, 16, { x: 2.75, y: 1.2, z: -1.6, w: 0.4, h: 0.3 }); } },
      // 16 · so where did all that money go? back in the tavern, YOU scratch your chin
      { set: "tavern", beat: 8, trans: "whip", dir: 1, light: "lamp", cam: CAM.fit([-1.4, 1.3, -1.2], { w: 2.2, a0: 16, a1: 6, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.fire.scale.y = 1 + 0.1 * Math.sin(f * 0.7);
          S.actor("you", { x: -1.9, z: -0.9, expr: "nervous", prop: "chin" }); S.actor("henk", { x: -0.5, z: -2.1, expr: "neutral", prop: "shrug" });
          S.pop("question", S.a + 4, 50, { x: -1.55, y: 2.2, z: -0.7, w: 0.3, h: 0.45, hold: true }); S.pop("coin", W(8, "money"), 24, { x: -1.0, y: 1.9, z: -0.9, w: 0.2, h: 0.2, rise: 0.5, spin: 2 }); } },
      // 17 · you see, it was a preorder: push through into a modern living room, a laptop pre-order
      { set: "living", beat: 9, trans: "zoom", light: "interior", cam: CAM.fit([-0.8, 1.0, -1.6], { w: 2.6, a0: -10, a1: -2, elev: 10, push: 0.12 }),
        act: (S, u, f) => { S.actor("modern", { x: -1.35, z: -2.05, mode: "sit", expr: f < W(9, "preorder.") ? "smile" : "grin" });
          S.pop("label", W(9, "preorder.") - 2, 40, { x: -0.4, y: 1.55, z: -0.9, w: 1.1, h: 0.3, text: "PRE-ORDER", bg: "#ffd84a", hold: true });
          S.pop("sparks", W(9, "preorder."), 14, { x: -0.4, y: 0.8, z: -0.9, w: 0.5, h: 0.3 }); } },
      // 18 · the bulbs were still underground: whip to the frozen cutaway, camera sinks from the snow to the sleeping bulbs
      { set: "soil", beat: 10, trans: "whip", dir: -1, light: SOIL, cam: CAM.keys([[0, { p: [0.4, 4.4, 5.2], t: [0, 2.8, -0.6], fov: 42 }], [1, { p: [0.2, 1.8, 4.6], t: [0, 1.4, 0], fov: 42 }]]),
        act: (S, u, f) => { H.arrow.visible = false; H.sprouts.forEach((s) => (s.g.visible = false));
          S.pop("zz", W(10, "underground,") - 4, 40, { x: 0.6, y: 2.0, z: 0.6, w: 0.4, h: 0.4 }); S.pop("zz", W(10, "underground,"), 36, { x: -0.9, y: 1.8, z: 0.6, w: 0.35, h: 0.35 });
          S.pop("label", W(10, "underground,") - 2, 40, { x: 0, y: 2.25, z: 0.5, w: 1.8, h: 0.34, text: "UNDERGROUND", bg: "#f4efe2", hold: true }); } },
      // 19 · not delivered or paid for: the DELIVER + PAY: JUNE tag drops over the snow
      { set: "soil", word: [10, "not"], lead: 3, trans: "dissolve", light: SOIL, cam: CAM.fit([0, 3.0, -0.4], { w: 4.2, a0: 6, a1: -2, elev: 8, push: 0.1 }),
        act: (S, u, f) => { H.arrow.visible = false; H.sprouts.forEach((s) => (s.g.visible = false)); const t = W(10, "paid");
          H.junetag.visible = f >= t - 8; H.junetag.position.y = 4.2 + 1.5 * (1 - E.easeOut(E.prog(f, t - 8, t))); S.kick(t, 0.04);
          S.pop("puff", W(10, "delivered"), 18, { x: 0, y: 2.9, z: 0.2, w: 2.2, h: 0.5, pop: false }); } },
      // 20 · until they bloomed in June: golden light, tulips shoot up through the snow
      { set: "soil", word: [10, "until"], lead: 3, light: (u) => K.mixLight(SOIL, K.light("golden"), E.ss(u * 1.4) * 0.85), cam: CAM.fit([0, 3.2, -0.4], { w: 6.0, a0: -6, a1: 2, elev: 6, push: 0.08 }),
        act: (S, u, f) => { H.arrow.visible = false; H.junetag.visible = true; const t = W(10, "bloomed");
          H.sprouts.forEach((s, i) => { const k = E.back(E.prog(f, t - 4 + i * 3, t + 8 + i * 3)); s.g.scale.setScalar(Math.max(0.01, 1.8 * k)); });
          S.pop("label", W(10, "June.") - 2, 30, { x: 2.6, y: 5.2, z: 0.2, w: 1.0, h: 0.34, text: "JUNE", bg: "#4fd18b", hold: true }); S.pop("stars", W(10, "June."), 20, { x: 0, y: 4.3, z: 0, w: 4.0, h: 1.0 }); } },
      // 21 · so the taverns traded promises: whip to the tavern, YOU and Henk shake on a paper note
      { set: "tavern", beat: 11, trans: "whip", dir: 1, light: "lamp", cam: CAM.fit([-0.7, 1.35, -1.4], { w: 2.4, a0: -10, a1: -2, elev: 5, push: 0.1 }),
        act: (S, u, f) => { H.fire.scale.y = 1 + 0.1 * Math.sin(f * 0.7);
          S.actor("you", { x: -1.4, z: -0.9, expr: "grin", prop: "paper" }); S.actor("henk", { x: 0.1, z: -2.1, expr: "grin", prop: "point" });
          S.say("I promise!", W(11, "traded") - 2, 32, { x: -1.1, y: 2.35, z: -0.7, w: 0.95, h: 0.38 });
          for (let q = 0; q < 3; q++) S.pop("page", W(11, "promises.") + q * 4, 24, { x: -0.9 + q * 0.4, y: 1.6, z: -1.0, w: 0.28, h: 0.32, rise: 0.5, spin: 1 }); } },
      // 22 · no bulbs, no cash: insert on the table — an empty cushion, then the notes, nothing else
      { set: "tavern", word: [11, "No"], lead: 4, steady: true, coc: 11, light: "lamp", cam: CAM.fit([-0.4, 0.9, -1.2], { w: 1.4, a0: 6, a1: -2, elev: 30, push: 0.14 }),
        act: (S, u, f) => { H.bulb.visible = false; H.notes.forEach((n, i) => (n.visible = f >= W(11, "No") + i * 4));
          S.pop("label", W(11, "No") - 2, 60, { x: -0.15, y: 1.15, z: -1.1, w: 0.85, h: 0.24, text: "NO BULBS", bg: "#ff6a5a", hold: true });
          S.pop("label", W(11, "no") - 2, 30, { x: -0.6, y: 0.95, z: -0.8, w: 0.75, h: 0.24, text: "NO CASH", bg: "#ff6a5a", hold: true }); } },
      // 23 · twist — when prices collapsed: smash to the soil stage, the arrow crashes, notes shred into confetti
      { set: "soil", beat: 12, trans: "smash", light: (u) => K.mixLight(SOIL, K.light("danger"), 0.4), cam: CAM.fit([0, 3.6, -0.8], { w: 5.0, a0: -4, a1: 4, elev: 10, push: 0.1, roll: 3 }),
        act: (S, u, f) => { H.junetag.visible = false; H.sprouts.forEach((s) => (s.g.visible = false)); const t = W(12, "collapsed,");
          H.arrow.position.y = 3.5 + 3.6 * (1 - E.easeIn(E.prog(f, t - 10, t)));
          S.kick(t, 0.14); S.pop("impact", t, 26, { x: -1.4, y: 4.4, z: -0.4, w: 1.4, h: 0.8, text: "CRASH!" }); S.pop("confetti", t + 2, 30, { x: 0, y: 4.2, z: 0, w: 4.0, h: 2.4, pop: false }); } },
      // 24 · most buyers just never paid: YOU tear up your note, Henk gapes, UNPAID stamp
      { set: "tavern", word: [12, "most"], lead: 3, trans: "whip", dir: -1, light: "lamp", cam: CAM.fit([-0.9, 1.35, -1.4], { w: 2.6, a0: 10, a1: 2, elev: 5, push: 0.1, roll: -2 }),
        act: (S, u, f) => { H.fire.scale.y = 1 + 0.1 * Math.sin(f * 0.7); const t = W(12, "paid.");
          S.actor("you", { x: -1.5, z: -0.9, expr: f < t ? "whistle" : "grin", prop: f < t ? "paper" : "shrug" }); S.actor("henk", { x: 0, z: -2.1, expr: f < W(12, "never") ? "neutral" : "shock", prop: f < W(12, "never") ? null : "up" });
          for (let q = 0; q < 4; q++) S.pop("paper", W(12, "never") + q * 3, 24, { x: -1.3 + q * 0.12, y: 1.5, z: -0.6, w: 0.22, h: 0.26, rise: 0.6, spin: 1.5 });
          S.kick(t, 0.06); S.pop("label", t, 30, { x: -0.6, y: 2.5, z: -1.0, w: 1.1, h: 0.36, text: "UNPAID", bg: "#ff6a5a", hold: true }); } },
      // 25 · it's hard to lose a fortune that never left your pocket: close on YOU, the full purse thuds onto the table
      { set: "tavern", beat: 13, trans: "dissolve", light: "lamp", cam: CAM.fit([-1.0, 1.25, -1.1], { w: 2.0, a0: -8, a1: 0, elev: 8, push: 0.14 }),
        act: (S, u, f) => { H.fire.scale.y = 1 + 0.1 * Math.sin(f * 0.7); const t = W(13, "pocket."); H.bulb.visible = false;
          H.purse.visible = f >= t - 8; H.purse.position.y = 0.78 + 1.4 * (1 - E.easeIn(E.prog(f, t - 8, t)));
          S.actor("you", { x: -1.6, z: -0.9, expr: f < t ? "smile" : "laugh", prop: f < W(13, "fortune") ? "chin" : "point" });
          S.kick(t, 0.16); S.pop("impact", t, 30, { x: -0.1, y: 1.5, z: -0.9, w: 0.9, h: 0.6, text: "THUD!" });
          for (let q = 0; q < 4; q++) S.pop("coin", t + 1 + q * 2, 20, { x: -0.6 + q * 0.2, y: 1.1, z: -0.9, w: 0.16, h: 0.16, rise: 0.5 }); } },
    ],
  };
};
