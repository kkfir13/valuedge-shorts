// "Who Needs Cash Tonight" (Panic of 1907: call money at 100%, Morgan's ten minutes for $25 million to keep the
// Stock Exchange open, the library lock-in before dawn) — film module.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const H = {};
  const PI = Math.PI;
  const AH = 1.62;
  const tt = (B, s, bg, fg, pw, ph) => B.textTex(s, bg, fg, 1024, Math.round((1024 * ph) / pw));
  const hide = (o) => { o.visible = false; if (o.userData && o.userData.base) o.userData.base.v = false; return o; };
  const STAGE = K.backdrop("#1f5a6a");
  const GOLD = "#d8a93a";

  // an upright piano (dark wood, white keys with black keys on top)
  const piano = (B, x, y, z, s = 1, parent) => { const g = B.grp(x, y, z, 0, s, parent);
    B.box(1.5, 1.3, 0.55, "planks:#4a2a1a", 0, 0, 0, { in: g }); B.box(1.56, 0.06, 0.6, "#2e1a10", 0, 1.3, 0, { in: g });
    B.box(1.46, 0.08, 0.34, "#3a2010", 0, 0.66, 0.4, { in: g }); B.box(1.38, 0.05, 0.22, "#f4f2ea", 0, 0.74, 0.43, { in: g });
    for (let i = 0; i < 10; i++) if (i % 7 !== 2 && i % 7 !== 6) B.box(0.05, 0.04, 0.12, "#1a1418", -0.62 + i * 0.137, 0.78, 0.39, { in: g });
    for (const sx of [-0.66, 0.66]) B.box(0.08, 0.66, 0.08, "#2e1a10", sx, 0, 0.5, { in: g });
    B.box(0.5, 0.36, 0.03, "#f2ede0", 0, 0.92, 0.3, { in: g }); B.ball(0.06, GOLD, -0.55, 1.05, 0.29, { in: g }); B.ball(0.06, GOLD, 0.55, 1.05, 0.29, { in: g });
    return B.dyn(g); };
  // a big brass key (bow faces +z, the bit points into the door)
  const keyObj = (B, x, y, z, s = 1) => { const g = B.grp(x, y, z, 0, s);
    B.cyl(0.11, 0.11, 0.035, GOLD, 0, 0, 0.06, { in: g, rx: PI / 2, seg: 24 }); B.ball(0.04, "#3a2418", 0, 0, 0.09, { in: g });
    B.cyl(0.025, 0.025, 0.2, GOLD, 0, 0, -0.14, { in: g, rx: PI / 2, seg: 10 }); return B.dyn(g); };
  // a money bag with $ (inside any group)
  const bag = (B, x, y, z, s, parent) => { const g = B.grp(x, y, z, 0, s, parent);
    B.ball(0.3, "#c8a878", 0, 0.28, 0, { in: g }); B.cone(0.13, 0.2, "#c8a878", 0, 0.5, 0, { in: g }); B.cyl(0.09, 0.09, 0.05, "#7a5232", 0, 0.52, 0, { in: g });
    B.plate(0.24, 0.24, tt(B, "$", "#c8a878", "#2f5a2a", 0.24, 0.24), 0, 0.3, 0.3, { in: g, d: 0.01 }); return B.dyn(g); };

  return {
    cast: {
      you: { jacket: "#7a5a34", pants: "#4a3a2a", boots: "#2a1a12", hat: "bowler", skin: "#f2c9a4", buttons: "#c9a44a" },
      lou: { jacket: "#2f6a4a", pants: "#3a3a40", boots: "#1a1418", hat: "bowler", moustache: "#5a3a24", skin: "#e8b48a", buttons: "#f2c14e", pins: "#f2c14e" },
      morgan: { jacket: "#1e1e26", pants: "#33333c", boots: "#121216", hat: "hair", hair: "#d8d8d8", moustache: "#ececec", skin: "#f0c4a2", buttons: "#c9a44a", build: "stout" },
      thomas: { jacket: "#3a3f5a", pants: "#2a2a34", boots: "#141418", hat: "hair", hair: "#b8b0a0", moustache: "#b8b0a0", skin: "#f0caa8", buttons: "#c9c9c9" },
      bk1: { jacket: "#2a2a30", pants: "#2a2a30", boots: "#101014", hat: "tophat", moustache: "#2a1a12", skin: "#f0c8a8" },
      bk2: { jacket: "#4a3a5a", pants: "#2a2a30", boots: "#101014", hat: "tophat", moustache: "#d0d0d0", skin: "#e8b890", build: "stout" },
      bk3: { jacket: "#3a4a3a", pants: "#2a2a30", boots: "#101014", hat: "tophat", skin: "#d9a27a" },
      dep1: { jacket: "#8a3a4a", pants: "#3a2a30", boots: "#2a1a12", hat: "bonnet", dress: "#8a3a4a", skin: "#f5d6b8" },
      dep2: { jacket: "#5a6a7a", pants: "#3a3a40", boots: "#2a1a12", hat: "cap", cap: "#4a4a50", skin: "#c99067" },
      landlord: { jacket: "#6a6a4a", pants: "#3a3a30", boots: "#2a1a12", hat: "cap", cap: "#3a3a30", moustache: "#3a2a1a", skin: "#e8b890", build: "stout" },
      buyer: { jacket: "#a87a3a", pants: "#4a3a2a", boots: "#2a1a12", hat: "bowler", skin: "#f0c4a2", moustache: "#7a4a2a" },
    },
    sets: {
      // J. P. Morgan's library at night: red damask walls, a fire, a tapestry, a heavy oak door with a brass key
      lib: (B) => {
        B.set.room({ style: "home", wall: "stripes:#6a1018:#7e1c24", floor: "carpet:#2a3a5a", w: 9, d: 7, h: 4.2, windows: [3.4], door: false });
        // fireplace + tapestry
        B.box(2.0, 1.7, 0.4, "marble:#d8cfc0", -2.2, 0, -3.3); B.box(1.2, 0.95, 0.12, "#1a0f0a", -2.2, 0.1, -3.08);
        B.box(2.2, 0.12, 0.5, "marble:#c8bca8", -2.2, 1.7, -3.25);
        H.fire = B.dyn(B.grp(-2.2, 0.12, -3.0, 0, 1)); B.cone(0.26, 0.6, "#ff7a2a", -0.18, 0, 0, { in: H.fire }); B.cone(0.3, 0.75, "#ffb03a", 0.1, 0, 0, { in: H.fire }); B.cone(0.15, 0.45, "#ffe27a", 0.05, 0, 0.05, { in: H.fire });
        B.lamp(-2.2, 0.7, -2.4, "#ff9a4a", 5, 7);
        B.plate(1.8, 1.4, "stripes:#6a5a3a:#8a7044", -2.2, 2.85, -3.44, { d: 0.03, edge: GOLD });
        // bookcases
        B.prop.shelf({ x: 4.2, z: -1.6, w: 1.6, h: 3.0, ry: -PI / 2 }); B.prop.shelf({ x: -4.2, z: -1.2, w: 1.6, h: 3.0, ry: PI / 2 });
        B.prop.shelf({ x: 3.6, z: -3.2, w: 1.2, h: 3.0 });
        // the door, the key, the clock
        H.door = B.prop.door({ x: 1.8, z: -3.44, w: 1.4, h: 2.8, col: "planks:#4a2a18", frame: "#2e1a10" });
        H.key = keyObj(B, 2.38, 1.05, -3.28, 1.6);
        H.clock = B.prop.clock({ x: 0.05, y: 2.75, z: -3.42, r: 0.36, col: "#5a3a24" });
        // the table with the pledge, Morgan's armchair
        B.prop.table({ x: 0, z: -0.9, w: 1.7, d: 1.0, h: 0.78, col: "floor:#5a3420" });
        H.pledge = B.dyn(B.grp(0, 0.79, -0.75, 0, 1)); B.box(0.62, 0.01, 0.44, "#fbf8ee", 0, 0, 0, { in: H.pledge });
        B.plate(0.56, 0.36, tt(B, "PLEDGE $25,000,000", "#fbf8ee", "#3a1a10", 0.56, 0.36), 0, 0.012, 0, { in: H.pledge, d: 0.002, rx: -PI / 2 });
        H.card = hide(B.dyn(B.plate(1.9, 0.34, tt(B, "PLEDGE: $25,000,000", "#fbf8ee", "#7a1a22", 1.9, 0.34), 0, 2.45, -1.2, { d: 0.02, edge: GOLD })));
        B.cyl(0.012, 0.004, 0.32, "#f4f2ea", 0.38, 0.8, -0.7, { rz: -0.6 });
        B.prop.chair({ x: -1.25, z: -1.9, ry: 0.5, col: "#6a1a22" });
        B.prop.rug({ x: 0, z: -0.6, w: 4, d: 3, col: "#7a2a2a" });
        B.prop.lamp({ x: 0.5, y: 0.79, z: -1.2, kind: "desk" });
        B.lamp(0.5, 3.2, 1.0, "#ffd8a0", 3, 9);
      },
      // the New York Stock Exchange floor, 1907: marble hall, trading posts, the call-money board
      floor: (B) => {
        B.set.room({ style: "bank", floor: "floor:#9a7a52", w: 14, d: 10, h: 6.5, door: false });
        for (const x of [-5.6, -3.2, 3.2, 5.6]) { B.cyl(0.38, 0.42, 6.5, "marble:#efe8da", x, 0, -4.4, { seg: 20 }); B.box(1.0, 0.3, 1.0, "marble:#d8cfc0", x, 0, -4.4); }
        const post = (x, z, name) => { B.cyl(0.55, 0.6, 2.3, "panel:#6a4a2e", x, 0, z, { seg: 8 }); B.cyl(0.75, 0.75, 0.12, "#3a2418", x, 2.3, z, { seg: 8 });
          B.plate(1.0, 0.3, tt(B, name, "#f4efe2", "#241726", 1.0, 0.3), x, 2.65, z + 0.2, { d: 0.02, edge: "#3a2418" }); };
        post(-4.4, -1.6, "COPPER"); post(4.4, -1.6, "STEEL"); post(-2.2, -3.2, "RAILS"); post(2.2, -3.2, "SUGAR");
        // the call-money board
        B.box(4.4, 2.6, 0.12, "#3a2418", 0, 1.9, -4.92);
        B.plate(4.0, 0.7, tt(B, "CALL MONEY", "#2f4a3a", "#f4efe2", 4.0, 0.7), 0, 4.0, -4.84, { d: 0.02 });
        H.r6 = B.dyn(B.plate(4.0, 1.5, tt(B, "6 %", "#2f4a3a", "#f4efe2", 4.0, 1.5), 0, 2.85, -4.84, { d: 0.02 }));
        H.r100 = hide(B.dyn(B.plate(4.0, 1.5, tt(B, "100 %", "#2f4a3a", "#ff5a4a", 4.0, 1.5), 0, 2.85, -4.83, { d: 0.03 })));
        B.plate(5.4, 0.6, tt(B, "NEW YORK STOCK EXCHANGE", "#e9e2d4", "#5a3a24", 5.4, 0.6), 0, 5.6, -4.9, { d: 0.02 });
        for (let i = 0; i < 14; i++) B.box(0.2, 0.005, 0.26, "#f4efe2", -3 + (i * 2.37) % 6.2, 0.01, -1.6 + (i * 1.73) % 3.6, { ry: i * 0.7 });
        // lender's cash on a little stand
        H.cash = hide(B.dyn(B.grp(0.55, 0.9, 0.35, 0, 1))); B.box(0.3, 0.12, 0.16, "#7fb86a", 0, 0, 0, { in: H.cash }); B.box(0.06, 0.125, 0.165, "#e8e0c4", 0, 0, 0, { in: H.cash });
        B.lamp(0, 5.5, 1.5, "#fff0d0", 5, 14); B.lamp(-4, 4, -2, "#ffe0b0", 3, 9);
      },
      // Fifth Avenue morning: a column-fronted trust company and its stampede
      street: (B) => {
        B.set.street({ style: ["victorian", "brick"], signs: ["BAKERY", "TAILOR", "HATS", "CIGARS", "BOOKS"], seed: 17 });
        B.box(8.4, 0.6, 2.4, "marble:#e9e2d4", 0, 0, -9.2);
        B.box(7.6, 4.8, 0.4, "marble:#d8d0c0", 0, 0, -10.4);
        for (const x of [-2.7, -1.0, 1.0, 2.7]) B.cyl(0.3, 0.34, 3.6, "marble:#f4efe2", x, 0.6, -9.6, { seg: 18 });
        B.box(7.4, 0.7, 1.4, "marble:#efe8da", 0, 4.2, -9.85);
        B.box(5.8, 0.6, 1.2, "marble:#e9e2d4", 0, 4.9, -9.95); B.box(3.6, 0.5, 1.0, "marble:#e9e2d4", 0, 5.5, -10.05);
        B.plate(6.4, 0.5, tt(B, "KNICKERBOCKER TRUST", "#efe8da", "#3a2a1a", 6.4, 0.5), 0, 4.55, -9.13, { d: 0.02 });
        B.box(1.5, 2.6, 0.12, "#2a1a12", 0, 0.6, -10.15);
        H.closed = B.dyn(B.plate(1.6, 0.55, tt(B, "CLOSED", "#c0353a", "#ffffff", 1.6, 0.55), 0, 2.1, -9.95, { d: 0.04, edge: "#3a1a10" }));
        for (const x of [-3.8, 3.8]) B.prop.lampPost({ x, z: -7.5 });
      },
      // J. P. Morgan & Co., October 24: panelled office, a desk, a wall clock
      office: (B) => {
        B.set.room({ style: "office", wall: "panel:#6a4a2e", floor: "carpet:#3a5a3a", w: 7, d: 6, h: 3.6, windows: [-2.4], door: false });
        H.odoor = B.prop.door({ x: 2.2, z: -2.94, w: 1.1, h: 2.3, col: "planks:#5a3420" });
        B.plate(2.4, 0.36, tt(B, "J. P. MORGAN & CO.", "#2e1a10", "#e8c86a", 2.4, 0.36), -0.6, 3.1, -2.93, { d: 0.02, edge: GOLD });
        H.oclock = B.prop.clock({ x: -0.6, y: 2.35, z: -2.92, r: 0.36 });
        B.prop.desk({ x: -0.6, z: -1.3, w: 2.0, col: "floor:#4a2a18" }); B.prop.chair({ x: -0.6, z: -2.0, col: "#3a1a14" });
        B.prop.lamp({ x: -1.35, y: 0.81, z: -1.4, kind: "desk" }); B.prop.phone({ x: 0.1, y: 0.81, z: -1.45 });
        H.bags = [-1.1, -0.65, -0.2, 0.25].map((x, i) => hide(bag(B, x, 0.81, -1.05 - (i % 2) * 0.12, 0.75)));
        B.prop.shelf({ x: -3.0, z: -2.6, w: 1.0, h: 2.4 });
        B.lamp(0, 3.0, 1.0, "#fff0d0", 4, 9);
      },
      // the analogy: a rented attic room at midnight, an upright piano
      attic: (B) => {
        B.set.room({ style: "cabin", wall: "planks:#8a6a44", floor: "floor:#6a4630", w: 6, d: 5, h: 3.0, windows: [-1.9], door: false });
        H.adoor = B.prop.door({ x: 1.9, z: -2.44, w: 1.0, h: 2.1, col: "planks:#5a3a24" });
        H.piano = piano(B, -0.3, 0, -1.9, 1); B.prop.stool({ x: -0.3, z: -0.95, col: "#6a2a2a" });
        H.aclock = B.prop.clock({ x: 0.9, y: 2.25, z: -2.42, r: 0.3 });
        B.ball(0.04, "#ffd84a", 0.2, 1.48, -1.75); B.cyl(0.03, 0.03, 0.16, "#f4efe2", 0.2, 1.31, -1.75);
        B.prop.poster({ x: -2.0, y: 0.9, z: -2.45, w: 0.8, h: 0.6, text: "HOME", bg: "#f2e6c8", fg: "#6a3a24" });
        H.rent = hide(B.dyn(B.plate(1.0, 0.36, tt(B, "RENT DUE", "#fbf3dc", "#c0353a", 1.0, 0.36), 1.9, 2.4, -2.3, { d: 0.02, edge: "#3a1a10" })));
        B.lamp(0.2, 1.8, -1.2, "#ffc878", 4, 6);
      },
      // the metaphor stage: a copper bar, a money tap, the piano on a pedestal, a big scale
      stage: (B) => {
        B.set.stage({ floor: "#d8d0c0", back: "#1f5a6a" });
        // copper bar
        B.prop.pedestal({ x: -6, z: 0, r: 1.1, h: 0.6, col: "#f4efe2", trim: GOLD });
        H.copper = B.dyn(B.grp(-6, 0.6, 0, 0, 1)); B.box(1.7, 0.55, 0.75, "metal:#c87a3a", 0, 0, 0, { in: H.copper }); B.box(1.5, 0.12, 0.6, "metal:#e0985a", 0, 0.55, 0, { in: H.copper });
        B.plate(1.5, 0.3, tt(B, "UNITED COPPER", "#2a1a12", "#f2b072", 1.5, 0.3), -6, 0.3, 1.13, { d: 0.02, edge: GOLD });
        // the money tap
        B.cyl(0.16, 0.16, 2.2, "metal:#c9a44a", -2, 3.0, -0.3, { seg: 16 }); B.box(0.9, 0.24, 0.24, "metal:#c9a44a", -1.65, 3.0, -0.3);
        B.cyl(0.14, 0.1, 0.3, "metal:#c9a44a", -1.25, 2.75, -0.3, { seg: 16 }); B.box(0.5, 0.08, 0.08, "metal:#9a7a2a", -2, 3.4, -0.3);
        B.plate(0.9, 0.3, tt(B, "MONEY", "#1f3a30", "#ffd84a", 0.9, 0.3), -2, 4.2, -0.12, { d: 0.02, edge: GOLD });
        B.cyl(0.42, 0.32, 0.55, "metal:#9aa3ad", -1.25, 0, -0.3, { seg: 20 });
        H.drop = B.dyn(B.box(0.16, 0.06, 0.1, "#7fb86a", -1.25, 2.6, -0.3));
        // the piano on a pedestal with a price tag
        B.prop.pedestal({ x: 2, z: 0, r: 1.2, h: 0.5, col: "#f4efe2", trim: GOLD });
        H.spiano = piano(B, 2, 0.5, -0.2, 1.1);
        H.tag20 = B.dyn(B.plate(0.8, 0.4, tt(B, "$20", "#ffd84a", "#241726", 0.8, 0.4), 2.8, 1.8, 0.5, { d: 0.02, edge: "#7a5a2a" }));
        H.xmark = hide(B.dyn(B.grp(2.8, 1.8, 0.56, 0, 1))); B.box(0.95, 0.09, 0.03, "#e2252c", 0, 0, 0, { in: H.xmark, rz: 0.45 }); B.box(0.95, 0.09, 0.03, "#e2252c", 0, 0, 0, { in: H.xmark, rz: -0.45 });
        // the scale: STOCKS vs CASH
        H.scale = B.prop.scale({ x: 6, z: 0, s: 2 });
        const [pl, pr] = H.scale.pans;
        B.box(0.36, 0.3, 0.3, "planks:#c8925a", 0, -0.52, 0, { in: pl }); B.plate(0.34, 0.1, tt(B, "STOCKS", "#e8dcc0", "#3a2418", 0.34, 0.1), 0, -0.4, 0.16, { in: pl, d: 0.005 });
        H.cashBag = hide(bag(B, 0, -0.52, 0, 0.55, pr));
        B.plate(0.5, 0.14, tt(B, "CASH", "#2f5a2a", "#ffffff", 0.5, 0.14), 0, 0.12, 0.2, { in: H.cashBag, d: 0.005 });
        B.lamp(0, 5, 3, "#fff0c8", 6, 14); B.lamp(5, 4, 2, "#ffe0b0", 3, 9);
      },
    },
    shots: [
      // 0 · frame 0: the heavy library door slams, the brass key turns
      { set: "lib", f: 0, light: "lamp", cam: CAM.fit([2.1, 1.25, -3.3], { w: 1.9, a0: -18, a1: -6, elev: 3, push: 0.18 }),
        act: (S, u, f) => { H.door.leaf.rotation.y = 1.3 * (1 - E.easeIn(E.prog(f, 0, 6))); H.key.visible = f >= 6; H.key.rotation.z = (PI / 2) * E.ss(E.prog(f, 14, 24));
          S.kick(6, 0.1); S.pop("impact", 6, 22, { x: 1.7, y: 1.9, z: -3.0, w: 0.8, h: 0.55, text: "SLAM!" }); S.pop("sparks", 20, 14, { x: 2.38, y: 1.05, z: -3.1, w: 0.5, h: 0.5 });
          S.pop("label", 4, 40, { x: 2.0, y: 0.45, z: -3.0, w: 1.4, h: 0.3, text: "NEW YORK, 1907", bg: "#f4efe2", hold: true }); } },
      // 1 · a banker: Morgan by the fire, the key in his hand
      { set: "lib", word: [0, "banker"], lead: 3, light: "lamp", cam: CAM.fit([-1.4, 1.3, -1.6], { w: 2.6, a0: 16, a1: 6, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.key.rotation.z = PI / 2; H.fire.scale.y = 1 + 0.12 * Math.sin(f * 0.7);
          S.actor("morgan", { x: -0.85, z: -1.5, expr: "grin", prop: "hold" }); S.fx("glow", { x: -2.2, y: 0.5, z: -2.8, w: 1.6, h: 1.2 });
          S.pop("label", W(0, "banker") + 2, 40, { x: -0.85, y: 2.25, z: -1.4, w: 1.3, h: 0.28, text: "J. P. MORGAN, 70", bg: "#f4efe2", hold: true }); } },
      // 2 · New York's bankers: whip to the bankers at the locked door, tugging
      { set: "lib", word: [0, "bankers"], lead: 3, trans: "whip", dir: 1, light: "lamp", cam: CAM.fit([1.4, 1.25, -2.4], { w: 3.2, a0: 22, a1: 12, elev: 4, push: 0.08 }),
        act: (S, u, f) => { H.key.rotation.z = PI / 2;
          S.actor("bk1", { x: 1.75, z: -2.8, expr: "shock", prop: "up", tilt: 4 * Math.sin(f * 0.8) }); S.actor("bk2", { x: 0.75, z: -2.4, expr: "nervous" }); S.actor("bk3", { x: 2.6, z: -2.2, expr: "shock", prop: "shrug" });
          S.pop("exclaim", W(0, "library") - 4, 24, { x: 1.75, y: 2.4, z: -2.6, w: 0.3, h: 0.45 }); S.pop("sweat", W(0, "library"), 24, { x: 0.95, y: 2.0, z: -2.2, w: 0.25, h: 0.3 }); } },
      // 3 · and kept the key: close on Morgan, the key slides into his waistcoat pocket
      { set: "lib", word: [0, "kept"], lead: 3, steady: true, coc: 10, light: "lamp", cam: CAM.fit([-0.85, 1.3, -1.5], { h: 1.5, a0: 8, a1: 0, elev: 2, push: 0.12 }),
        act: (S, u, f) => { const k = E.ss(E.prog(f, S.a + 2, W(0, "key.")));
          S.actor("morgan", { x: -0.85, z: -1.5, expr: f < W(0, "key.") ? "grin" : "smile_closed" });
          H.key.visible = true; H.key.position.set(-0.65, 1.5 - 0.45 * k, -1.2); H.key.rotation.z = 0.4; H.key.scale.setScalar(1.0 * (1 - 0.6 * E.prog(f, W(0, "key."), W(0, "key.") + 6)));
          S.pop("stars", W(0, "key.") + 2, 22, { x: -0.55, y: 1.15, z: -1.1, w: 0.45, h: 0.35 }); } },
      // 4 · imagine you're a young broker: whip to the 1907 Stock Exchange floor
      { set: "floor", beat: 1, trans: "whip", dir: -1, light: "interior", cam: CAM.keys([[0, { p: [-2.8, 3.4, 7.2], t: [0, 2.2, -2.5], fov: 44 }], [1, { p: [1.8, 3.0, 6.6], t: [0, 2.0, -2.5], fov: 44 }]]),
        act: (S, u, f) => { S.actor("you", { x: 0, z: 0.6, expr: "grin" }); S.actor("lou", { x: -1.4, z: -0.6, expr: "smile", prop: "paper" }); S.actor("bk2", { x: 1.6, z: -0.9, expr: "neutral" });
          S.actor("bk3", { key: "b3b", x: -3.2, z: -1.0, expr: "grin", prop: "point" }); S.actor("dep2", { key: "clerk", x: 3.0, z: -2.0, expr: "neutral", prop: "paper" });
          S.pop("label", S.a + 4, 50, { x: 0, y: 2.35, z: 1.2, w: 2.2, h: 0.36, text: "STOCK EXCHANGE, 1907", bg: "#f4efe2", hold: true }); } },
      // 5 · broker: close on YOU, stock certificates in hand
      { set: "floor", word: [1, "broker,"], lead: 4, light: "interior", cam: CAM.fit([0.1, 1.35, 0.6], { w: 1.6, a0: -10, a1: -2, elev: 3, push: 0.1 }), coc: 9,
        act: (S, u, f) => { S.actor("you", { x: 0, z: 0.6, expr: "grin", prop: "paper" });
          S.pop("label", S.a + 2, 30, { x: 0, y: 2.2, z: 0.7, w: 0.6, h: 0.26, text: "YOU", bg: "#ffd84a", hold: true }); S.pop("page", W(1, "stocks"), 20, { x: 0.35, y: 1.6, z: 0.9, w: 0.3, h: 0.35 }); } },
      // 6 · with money borrowed by the day: the lender hands over cash, ONE DAY tag
      { set: "floor", word: [1, "money"], lead: 4, trans: "dissolve", light: "interior", cam: CAM.fit([0.5, 1.3, 0.3], { w: 2.3, a0: 14, a1: 6, elev: 4, push: 0.08 }),
        act: (S, u, f) => { H.cash.visible = true; H.cash.position.x = 0.95 - 0.6 * E.ss(E.prog(f, S.a, S.a + 14));
          S.actor("you", { x: 0, z: 0.6, expr: "smile", prop: "hold" }); S.actor("bk2", { x: 1.1, z: 0.2, expr: "smile", prop: "hold" });
          S.pop("label", W(1, "by") - 2, 36, { x: 0.55, y: 2.3, z: 0.4, w: 1.4, h: 0.3, text: "LOAN: 1 DAY", bg: "#f4efe2", hold: true }); S.pop("coin", W(1, "day.") - 2, 20, { x: 0.4, y: 1.2, z: 0.8, w: 0.25, h: 0.25 }); } },
      // 7 · a copper gamble blows up: whip to the stage, the copper bar explodes
      { set: "stage", beat: 2, trans: "whip", dir: 1, light: STAGE, cam: CAM.fit([-6, 1.2, 0], { w: 3.0, a0: -14, a1: -4, elev: 6, push: 0.12 }),
        act: (S, u, f) => { const t = W(2, "blows"); const k = E.prog(f, t, t + 6); H.copper.scale.set(1 + 0.25 * k, f >= t + 6 ? 0.001 : 1 + 0.3 * k, 1 + 0.25 * k); H.copper.visible = f < t + 6;
          S.pop("burst", t + 4, 16, { x: -6, y: 1.0, z: 0.6, w: 2.6, h: 2.2, pop: false }); S.kick(t + 4, 0.14);
          S.pop("impact", t + 4, 26, { x: -6, y: 1.8, z: 0.8, w: 1.4, h: 0.9, text: "BOOM!" }); S.pop("smoke", t + 8, 26, { x: -6, y: 0.9, z: 0.6, w: 2.4, h: 1.4, pop: false });
          for (let q = 0; q < 4; q++) S.pop("coin", t + 6 + q * 2, 18, { x: -6.8 + q * 0.5, y: 1.6 + 0.3 * (q % 2), z: 0.9, w: 0.25, h: 0.25, rise: 0.6 }); } },
      // 8 · depositors stampede: smash onto the avenue, the crowd runs at the trust company
      { set: "street", word: [2, "depositors"], lead: 3, trans: "smash", light: "cold", cam: CAM.fit([0, 1.6, -6.0], { w: 7.0, a0: -8, a1: 2, e0: 6, e1: 9, push: 0.08 }),
        act: (S, u, f) => { H.closed.visible = false; const run = (f - S.a) * 0.05;
          S.actor("dep1", { x: -1.2, z: -3.0 - run, expr: "shock", mode: "stroll", phase: f * 0.12 }); S.actor("dep2", { x: 0.8, z: -2.3 - run, expr: "shock", mode: "stroll", phase: f * 0.12 + 1, prop: "up" });
          S.actor("dep1", { key: "d3", x: 2.2, z: -1.8 - run, expr: "nervous", mode: "stroll", phase: f * 0.12 + 2 }); S.actor("dep2", { key: "d4", x: -2.4, z: -1.6 - run, expr: "shock", mode: "stroll", phase: f * 0.12 + 3 });
          S.actor("landlord", { key: "d5", x: 0.0, z: -1.0 - run, expr: "nervous", mode: "stroll", phase: f * 0.12 + 4 });
          S.kick(W(2, "stampede"), 0.06); S.pop("puff", W(2, "stampede"), 20, { x: 0, y: 0.3, z: -2.0 - run, w: 4.0, h: 0.8, pop: false }); } },
      // 9 · a trust company: closer on the columns, the CLOSED sign slams down
      { set: "street", word: [2, "trust"], lead: 3, light: "cold", cam: CAM.fit([0, 2.6, -9.4], { w: 4.2, a0: 6, a1: 0, elev: -6, push: 0.1 }),
        act: (S, u, f) => { const t = W(2, "company."); H.closed.position.y = 2.1 + 2.0 * (1 - E.easeIn(E.prog(f, t - 8, t)));
          S.actor("dep1", { x: -0.6, z: -8.6, expr: f < t ? "nervous" : "shock", prop: f < t ? null : "up" }); S.actor("dep2", { x: 0.7, z: -8.5, expr: f < t ? "nervous" : "shock" });
          S.kick(t, 0.08); S.pop("impact", t, 24, { x: 0, y: 3.2, z: -9.0, w: 1.1, h: 0.6, text: "SHUT!" }); } },
      // 10 · nobody will lend: back on the floor, the lender folds his arms
      { set: "floor", beat: 3, trans: "whip", dir: -1, light: "interior", cam: CAM.fit([0.55, 1.35, 0.3], { w: 2.3, a0: -12, a1: -4, elev: 3, push: 0.1 }),
        act: (S, u, f) => { S.actor("you", { x: 0, z: 0.6, expr: "nervous", prop: "point" }); S.actor("bk2", { x: 1.1, z: 0.2, expr: "stern", prop: f < W(3, "lend.") ? null : "shrug" });
          S.say("No!", W(3, "lend.") - 2, 22, { x: 1.35, y: 2.3, z: 0.3, w: 0.55, h: 0.36 }); } },
      // 11 · one-day money costs a hundred percent: insert on the board, 6% flips to 100%
      { set: "floor", word: [3, "One-day"], lead: 3, steady: true, light: (u) => K.mixLight(K.light("interior"), K.light("danger"), E.ss(E.clamp(u * 2.4 - 1.0)) * 0.8),
        cam: CAM.fit([0, 3.2, -4.8], { w: 4.6, a0: 0, a1: 0, elev: -4, push: 0.14 }),
        act: (S, u, f) => { const t = W(3, "hundred"); H.r6.visible = f < t; H.r100.visible = f >= t; S.kick(t, 0.1);
          S.pop("burst", t, 12, { x: 0, y: 2.9, z: -4.6, w: 3.4, h: 1.8, pop: false }); S.pop("arrow", t + 4, 30, { x: 2.0, y: 3.0, z: -4.6, w: 0.5, h: 0.8, dir: "up", hold: true });
          S.pop("label", W(3, "year.") - 2, 24, { x: 0, y: 1.6, z: -4.6, w: 1.6, h: 0.3, text: "A YEAR", bg: "#f4efe2", hold: true }); } },
      // 12 · Lucky Lou dumps his best stocks at any price
      { set: "floor", beat: 4, trans: "whip", dir: 1, light: "interior", cam: CAM.fit([-1.4, 1.35, -0.2], { w: 2.4, a0: 12, a1: 2, elev: 4, push: 0.1 }),
        act: (S, u, f) => { S.actor("lou", { x: -1.4, z: -0.2, expr: f < W(4, "dumps") ? "nervous" : "shock", prop: "up", tilt: 5 * Math.sin(f * 0.6) });
          S.pop("label", S.a + 2, 30, { x: -1.4, y: 2.35, z: -0.1, w: 1.2, h: 0.28, text: "LUCKY LOU", bg: "#ffd84a", hold: true });
          for (let q = 0; q < 5; q++) S.pop("paper", W(4, "dumps") + q * 4, 26, { x: -1.9 + q * 0.25, y: 2.0 + 0.2 * (q % 2), z: 0.1, w: 0.3, h: 0.35, rise: 0.5, spin: 1 });
          S.kick(W(4, "price."), 0.06); S.pop("impact", W(4, "price."), 22, { x: -0.6, y: 1.6, z: 0.2, w: 0.9, h: 0.55, text: "SELL!" }); S.pop("arrow", W(4, "any"), 26, { x: -0.6, y: 2.4, z: 0.1, w: 0.3, h: 0.5, dir: "down", hold: true }); } },
      // 13 · the exchange president bursts into Morgan's office
      { set: "office", beat: 5, trans: "whip", dir: -1, light: "office", cam: CAM.fit([0.6, 1.3, -1.6], { w: 3.6, a0: -16, a1: -6, elev: 5, push: 0.08 }),
        act: (S, u, f) => { const k = E.ss(E.prog(f, S.a, S.a + 8)); H.odoor.leaf.rotation.y = 1.4 * k; const w = E.ss(E.prog(f, S.a + 6, W(5, "Morgan:")));
          S.actor("thomas", { x: E.lerp(2.2, 1.0, w), z: E.lerp(-2.6, -0.8, w), expr: "shock", mode: w < 1 ? "stroll" : "stand", phase: f * 0.1 });
          S.actor("morgan", { x: -0.6, z: -1.95, expr: "neutral" }); S.kick(S.a + 6, 0.05);
          S.pop("label", W(5, "president") - 2, 36, { x: 1.4, y: 2.45, z: -1.0, w: 1.9, h: 0.28, text: "EXCHANGE PRESIDENT", bg: "#f4efe2", hold: true }); } },
      // 14 · we have to close!
      { set: "office", word: [5, "we"], lead: 3, light: "office", cam: CAM.fit([1.0, 1.4, -0.8], { w: 1.5, a0: 10, a1: 2, elev: 2, push: 0.1 }), coc: 9,
        act: (S, u, f) => { H.odoor.leaf.rotation.y = 1.4; S.actor("thomas", { x: 1.0, z: -0.8, expr: "shock", prop: "up" });
          S.say("We have to close!", S.a + 2, 34, { x: 0.8, y: 2.3, z: -0.7, w: 1.2, h: 0.42, tail: "right" }); S.pop("sweat", S.a + 6, 26, { x: 1.25, y: 1.9, z: -0.6, w: 0.2, h: 0.26 }); } },
      // 15 · Morgan gives the banks ten minutes
      { set: "office", beat: 6, trans: "whip", dir: 1, light: "office", cam: CAM.fit([-0.6, 1.5, -1.9], { w: 1.8, a0: -6, a1: 2, elev: 3, push: 0.12 }),
        act: (S, u, f) => { H.odoor.leaf.rotation.y = 1.4; S.actor("morgan", { x: -0.6, z: -1.95, expr: "stern", prop: "point" });
          S.say("Ten minutes.", S.a + 4, 28, { x: -0.25, y: 2.35, z: -1.8, w: 0.95, h: 0.38 }); } },
      // 16 · ten minutes: insert on the wall clock, the minute hand races
      { set: "office", word: [6, "ten"], lead: 2, steady: true, coc: 11, light: "office", cam: CAM.fit([-0.6, 2.35, -2.9], { w: 1.2, a0: 4, a1: -2, elev: -3, push: 0.15 }),
        act: (S, u, f) => { H.oclock.time(2.0 + 0.17 * E.prog(f, S.a, S.a + 26)); S.pop("label", S.a + 4, 24, { x: -0.6, y: 1.75, z: -2.8, w: 0.9, h: 0.26, text: "10 MIN", bg: "#ff6a5a", hold: true }); } },
      // 17 · to find twenty-five million: bankers drop money bags on the desk
      { set: "office", word: [6, "find"], lead: 3, trans: "dissolve", light: "office", cam: CAM.fit([-0.55, 1.25, -1.2], { w: 2.6, a0: 18, a1: 8, elev: 8, push: 0.08 }),
        act: (S, u, f) => { H.odoor.leaf.rotation.y = 1.4; const t0 = S.a + 2, t1 = W(6, "million.");
          H.bags.forEach((b, i) => { const ti = E.lerp(t0, t1, i / 3); b.visible = f >= ti; b.position.y = 0.81 + 0.6 * (1 - E.easeIn(E.prog(f, ti, ti + 5))); });
          for (let i = 0; i < 4; i++) S.kick(E.lerp(t0, t1, i / 3) + 5, 0.02);
          S.actor("morgan", { x: -0.6, z: -1.95, expr: "stern" }); S.actor("bk1", { x: 0.55, z: -0.6, expr: "nervous", prop: "hold" }); S.actor("bk2", { x: -1.7, z: -0.6, expr: "pained", prop: "hold" });
          S.pop("label", W(6, "twenty-five") - 2, 34, { x: -0.55, y: 2.05, z: -1.0, w: 1.7, h: 0.3, text: "$25,000,000", bg: "#4fd18b", hold: true }); } },
      // 18 · they do: the floor roars, hats and paper in the air
      { set: "floor", word: [6, "They"], lead: 4, trans: "whip", dir: -1, light: "interior", cam: CAM.fit([-0.3, 1.5, 0.1], { w: 3.4, a0: -6, a1: 4, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.r6.visible = false; H.r100.visible = true;
          S.actor("you", { x: 0, z: 0.6, expr: "laugh", prop: "up" }); S.actor("lou", { x: -1.4, z: -0.2, expr: "laugh", prop: "up" }); S.actor("bk3", { key: "b3b", x: 1.2, z: -0.5, expr: "laugh", prop: "up" });
          S.pop("confetti", W(6, "do.") - 2, 30, { x: -0.3, y: 2.2, z: 0, w: 3.6, h: 2.4, pop: false }); S.kick(W(6, "do."), 0.05);
          S.pop("impact", W(6, "do."), 22, { x: 0.8, y: 2.5, z: 0.3, w: 1.1, h: 0.6, text: "HURRAY!" }); } },
      // 19 · so why would anyone sell good stocks so cheap? the floor at dusk, YOU on a stool among papers
      { set: "floor", beat: 7, trans: "dissolve", light: "lamp", cam: CAM.fit([0.2, 1.1, 0.4], { w: 2.6, a0: 12, a1: 4, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.r6.visible = false; H.r100.visible = true; S.actor("you", { x: 0.2, z: 0.5, expr: "nervous", prop: "chin" });
          S.actor("lou", { x: -1.3, z: -0.8, expr: "dazed" });
          S.pop("question", S.a + 6, 40, { x: 0.55, y: 1.9, z: 0.6, w: 0.3, h: 0.45, hold: true });
          S.pop("label", W(7, "good") - 2, 36, { x: 0.2, y: 2.2, z: 0.7, w: 1.5, h: 0.3, text: "GOOD STOCKS?", bg: "#f4efe2", hold: true }); } },
      // 20 · you see: push through into a rented attic at midnight, YOU at your piano, the landlord at the door
      { set: "attic", beat: 8, trans: "zoom", light: "lamp", cam: CAM.fit([0.5, 1.25, -1.6], { w: 3.4, a0: -10, a1: -2, elev: 5, push: 0.1 }),
        act: (S, u, f) => { H.adoor.leaf.rotation.y = 1.2; H.rent.visible = f >= W(8, "rent") - 2; H.aclock.time(11.9);
          S.actor("you", { x: -0.3, z: -0.95, mode: "sit", expr: "nervous", flip: true }); S.actor("landlord", { x: 1.85, z: -2.1, expr: "stern", prop: "point" }); } },
      // 21 · by midnight: insert on the clock, 11:59 ticks to twelve
      { set: "attic", word: [8, "midnight."], lead: 6, steady: true, coc: 11, light: "lamp", cam: CAM.fit([0.9, 2.25, -2.4], { w: 0.95, a0: 6, a1: 0, elev: -2, push: 0.15 }),
        act: (S, u, f) => { const t = W(8, "midnight.") + 4; H.aclock.time(f < t ? 11 + 59 / 60 : 12); S.kick(t, 0.04); S.pop("exclaim", t, 18, { x: 1.25, y: 2.55, z: -2.3, w: 0.2, h: 0.3 }); } },
      // 22 · you'd sell your piano for twenty bucks: the buyer pays, the piano rolls out
      { set: "attic", word: [8, "You'd"], lead: 3, trans: "whip", dir: 1, light: "lamp", cam: CAM.fit([0.1, 1.2, -1.1], { w: 3.8, a0: 8, a1: 2, elev: 5, push: 0.08 }),
        act: (S, u, f) => { H.adoor.leaf.rotation.y = 1.2; H.aclock.time(12); H.rent.visible = true; const k = E.ss(E.prog(f, W(8, "piano"), W(8, "bucks.") + 10));
          H.piano.position.x = -0.3 + 1.3 * k; H.piano.position.z = -1.9 + 0.3 * k;
          S.actor("you", { x: -1.0, z: -0.4, expr: "pained", prop: "hold" }); S.actor("buyer", { x: 1.4, z: -0.6, expr: "grin", prop: "hold" });
          S.pop("bill", W(8, "twenty") - 2, 30, { x: -0.6, y: 1.5, z: -0.3, w: 0.4, h: 0.25, hold: true });
          S.pop("label", W(8, "twenty"), 34, { x: 0.1, y: 2.3, z: -0.6, w: 0.6, h: 0.32, text: "$20", bg: "#ffd84a", hold: true }); } },
      // 23 · not because it's worth twenty: the piano on a pedestal, the $20 tag crossed out
      { set: "stage", beat: 9, trans: "whip", dir: -1, light: STAGE, cam: CAM.fit([2.2, 1.3, 0], { w: 2.9, a0: -12, a1: -4, elev: 5, push: 0.1 }),
        act: (S, u, f) => { const t = W(9, "worth"); H.xmark.visible = f >= t; S.fx("glow", { x: 2, y: 1.2, z: -0.1, w: 2.4, h: 2.0 }); S.kick(t, 0.05);
          S.pop("stars", t + 4, 22, { x: 2.0, y: 2.1, z: 0.3, w: 1.4, h: 0.5 }); } },
      // 24 · nine days later: flash to the library at night, bankers round the table
      { set: "lib", beat: 10, trans: "flash", light: "lamp", cam: CAM.fit([0, 1.3, -1.3], { w: 4.2, a0: -16, a1: -6, elev: 7, push: 0.08 }),
        act: (S, u, f) => { H.fire.scale.y = 1 + 0.12 * Math.sin(f * 0.7); H.clock.time(2.9);
          S.actor("morgan", { x: -0.85, z: -1.6, expr: "neutral" }); S.actor("bk1", { x: 0.9, z: -1.5, expr: "neutral" }); S.actor("bk2", { x: 0.2, z: -1.8, expr: "neutral" }); S.actor("bk3", { x: 1.6, z: -0.9, expr: "smile" });
          S.pop("label", S.a + 4, 40, { x: 0, y: 2.6, z: -1.2, w: 2.2, h: 0.32, text: "NINE DAYS LATER", bg: "#f4efe2", hold: true }); } },
      // 25 · Morgan locks the trust bosses in: the door slams again, the key turns, he pockets it
      { set: "lib", word: [10, "locks"], lead: 3, trans: "whip", dir: 1, light: "lamp", cam: CAM.fit([1.5, 1.3, -2.6], { w: 2.6, a0: -24, a1: -14, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.door.leaf.rotation.y = 1.3 * (1 - E.easeIn(E.prog(f, S.a, S.a + 6))); H.key.visible = f >= S.a + 6; H.key.rotation.z = (PI / 2) * E.ss(E.prog(f, S.a + 10, S.a + 18));
          S.actor("morgan", { x: 1.15, z: -2.7, expr: "grin", prop: "point" }); S.actor("bk1", { x: 0.2, z: -1.8, expr: "shock" }); S.actor("bk3", { x: 2.6, z: -1.6, expr: "shock", prop: "up" });
          S.kick(S.a + 6, 0.08); S.pop("impact", S.a + 6, 20, { x: 2.0, y: 2.2, z: -3.0, w: 0.8, h: 0.5, text: "CLICK!" });
          S.pop("label", W(10, "trust") - 2, 34, { x: 0.9, y: 2.55, z: -1.6, w: 1.6, h: 0.28, text: "TRUST BOSSES", bg: "#f4efe2", hold: true }); } },
      // 26 · until they pledge twenty-five million: the pledge pops up over the table, the bosses squirm
      { set: "lib", word: [10, "until"], lead: 3, trans: "dissolve", light: "lamp", cam: CAM.fit([0, 1.35, -1.0], { w: 2.8, a0: 8, a1: 0, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.key.rotation.z = PI / 2; H.clock.time(3.6); H.card.visible = f >= W(10, "pledge") - 2; H.card.scale.setScalar(Math.max(0.01, E.back(E.prog(f, W(10, "pledge") - 2, W(10, "pledge") + 6))));
          S.actor("bk1", { x: -0.95, z: -1.5, expr: "pained", prop: "fists" }); S.actor("bk2", { x: 0.95, z: -1.5, expr: "nervous", prop: "shrug" });
          S.pop("sweat", W(10, "pledge"), 26, { x: -0.7, y: 2.0, z: -1.3, w: 0.22, h: 0.28 }); S.pop("sweat", W(10, "twenty-five"), 24, { x: 1.2, y: 2.05, z: -1.3, w: 0.22, h: 0.28 }); } },
      // 27 · twist — they sign before dawn: the window brightens, a quill scratches, SIGNED
      { set: "lib", beat: 11, trans: "dissolve", light: (u) => K.mixLight(K.light("lamp"), K.light("golden"), E.ss(u) * 0.75), cam: CAM.fit([0.3, 1.2, -1.1], { w: 2.2, a0: -6, a1: 2, elev: 8, push: 0.16, roll: 2 }),
        act: (S, u, f) => { H.key.rotation.z = PI / 2; H.clock.time(4.75); S.actor("bk1", { x: -0.2, z: -1.55, expr: "relief", prop: "point" }); S.actor("morgan", { x: 1.1, z: -1.8, expr: "smile_closed" });
          S.pop("label", W(11, "sign") , 30, { x: 0.1, y: 1.15, z: -0.6, w: 1.0, h: 0.3, text: "SIGNED", bg: "#4fd18b", hold: true });
          S.pop("label", W(11, "dawn.") - 6, 24, { x: 0.05, y: 2.2, z: -3.2, w: 0.7, h: 0.24, text: "4:45 A.M.", bg: "#f4efe2", hold: true }); S.pop("sparks", W(11, "sign"), 16, { x: 0.2, y: 0.95, z: -0.6, w: 0.5, h: 0.3 }); } },
      // 28 · in a panic, prices don't tell you what stocks are worth: the money tap runs dry
      { set: "stage", beat: 12, trans: "whip", dir: 1, light: STAGE, cam: CAM.fit([-1.6, 1.7, -0.2], { w: 3.2, a0: -14, a1: -4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const k = E.prog(f, S.a + 2, S.a + 16); H.drop.position.y = 2.6 - 2.1 * E.easeIn(k); H.drop.visible = k < 1;
          S.actor("you", { x: -0.6, z: 0.4, expr: "nervous", prop: "up" }); S.actor("lou", { x: -2.7, z: 0.3, expr: "dazed", prop: "shrug" });
          S.pop("label", S.a + 2, 34, { x: -1.6, y: 3.3, z: 0.2, w: 1.2, h: 0.32, text: "PANIC", bg: "#ff6a5a", hold: true });
          S.pop("question", W(12, "worth."), 24, { x: -0.3, y: 2.3, z: 0.5, w: 0.3, h: 0.45 }); } },
      // 29 · only who needs cash: the CASH bag slams onto the scale and flings the STOCKS side up
      { set: "stage", word: [12, "Only"], lead: 4, trans: "whip", dir: 1, light: STAGE, cam: CAM.fit([6.4, 1.8, 0], { w: 4.6, a0: 0, a1: 4, elev: 5, push: 0.12 }),
        act: (S, u, f) => { const t = W(12, "cash."); const k = E.prog(f, t, t + 10);
          H.scale.tilt(f < t ? 0.18 : 0.18 - 0.55 * Math.min(1, E.back(k)));
          H.cashBag.visible = true; H.cashBag.position.y = -0.52 + 1.8 * (1 - E.easeIn(E.prog(f, t - 9, t)));
          S.actor("you", { x: 4.9, z: 1.2, expr: f < t ? "nervous" : "shock", prop: f < t ? null : "up" });
          S.kick(t, 0.14); S.pop("impact", t, 30, { x: 6.9, y: 2.9, z: 0.6, w: 1.2, h: 0.8, text: "THUD!" }); S.pop("puff", t + 1, 16, { x: 7.56, y: 1.3, z: 0.4, w: 1.4, h: 0.5, pop: false }); } },
    ],
  };
};
