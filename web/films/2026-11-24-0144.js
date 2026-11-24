// "The Man in the Closet" (Walter Schloss, 1955–1984; Buffett's 1984 coin-flip talk) — film module.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const H = {};
  const PI = Math.PI;
  const tx = (B, s, bg, fg, w = 1024, h = 256) => B.textTex(s, bg, fg, w, h);
  const GOLD = "#f2c14e";
  // a big standing coin facing the camera: a group you can roll (rotation.z) — face says "$1"
  const bigCoin = (B, x, y, z, r, face = "$1") => { const g = B.grp(x, y, z, 0, 1);
    B.cyl(r, r, r * 0.2, GOLD, 0, 0, 0, { in: g, rx: PI / 2, seg: 32 }); B.cyl(r * 1.02, r * 1.02, r * 0.16, "#c99a2a", 0, 0, 0, { in: g, rx: PI / 2, seg: 32 });
    B.plate(r * 1.15, r * 1.15, tx(B, face, GOLD, "#8a5a10", 512, 512), 0, 0, r * 0.11, { in: g, d: 0.004 });
    B.plate(r * 1.15, r * 1.15, tx(B, face, GOLD, "#8a5a10", 512, 512), 0, 0, -r * 0.11, { in: g, d: 0.004, ry: PI });
    return B.dyn(g); };
  // a share certificate pinned on a wall (cream, gold band)
  const cert = (B, x, y, z, ry, label) => { const g = B.grp(x, y, z, ry, 1);
    B.plate(0.3, 0.2, tx(B, label, "#f4e6c8", "#2f5a3a", 512, 340), 0, 0, 0, { in: g, d: 0.006, edge: "#c9a44a" }); return B.dyn(g); };

  return {
    cast: {
      walter: { jacket: "#5a6270", pants: "#454b56", boots: "#1e1a1c", hat: "hair", hair: "#3a2a1a", skin: "#f2c9a4", buttons: "#e8e0d0" },
      graham: { jacket: "#2f3446", pants: "#2a2e3a", boots: "#1a1418", hat: "hair", hair: "#d8d8d8", skin: "#f0c8a8", buttons: "#c9a44a" },
      skeptic: { jacket: "#8a6a3a", pants: "#4a3a2a", boots: "#2a1a14", hat: "bowler", capColor: "#2a2a2a", skin: "#f0c4a0", moustache: "#5a3a24", buttons: "#c9a44a" },
      lady: { jacket: "#c0353a", pants: "#3a2028", boots: "#2a1418", hat: "hair", hair: "#e8c86a", dress: "#c0353a", skin: "#f5d6b8", buttons: "#f8f8f8" },
      gent: { jacket: "#2a2a3a", pants: "#22222c", boots: "#141418", hat: "hair", hair: "#6a4a2a", skin: "#e8b48a", moustache: "#6a4a2a", buttons: "#e8e0d0" },
      flipA: { jacket: "#3f8fe0", pants: "#2f4a7a", boots: "#2a2d38", hat: "cap", cap: "#e2453c", skin: "#f5c9a0" },
      flipB: { jacket: "#f08a2c", pants: "#3b3f52", boots: "#5a3b2a", hat: "hair", hair: "#2a201a", dress: "#c25a7a", skin: "#c99067" },
      flipC: { jacket: "#5d7a3a", pants: "#3b3f52", boots: "#4a3426", hat: "beanie", cap: "#f2c14e", pom: "#e2453c", skin: "#ecd0b6" },
      flipD: { jacket: "#8a4ab8", pants: "#2a2a3a", boots: "#1a1a20", hat: "hair", hair: "#b8642a", skin: "#f2c9a4", moustache: "#b8642a" },
    },
    sets: {
      // Wall Street, 1955: stone and brick facades, brokers' signs, a lamp post; the rolling coin; the two coin towers
      wallst: (B) => {
        B.set.street({ style: ["victorian", "brick", "shop"], signs: ["BROKERS", "BANK", "STOCKS & BONDS", "TRUST CO.", "EXCHANGE", "INVESTMENTS"], ground: "cobble", seed: 21 });
        B.prop.lampPost({ x: -3.2, z: 1.0 }); B.prop.sign({ x: -3.2, y: 1.2, z: 1.05, w: 1.4, h: 0.38, text: "WALL ST", bg: "#2f6a4a", fg: "#f4efe2", edge: "#1a3a2a" });
        B.prop.car({ x: 3.0, z: -6, ry: PI / 2, col: "#3a7a8a" }); B.prop.car({ x: -2.6, z: -14, ry: -PI / 2, col: "#b8423a" });
        H.coin = bigCoin(B, -3, 0.6, 2.2, 0.6);
        H.college = B.prop.sign({ x: 1.6, y: 0, z: 0.6, w: 1.6, h: 0.5, text: "COLLEGE", bg: "#7a2a3a", fg: "#f4efe2", post: true }); H.college.visible = false;
        H.stW = B.prop.coinStack({ x: -0.9, z: 0.2, r: 0.42, n: 40 }); H.stM = B.prop.coinStack({ x: 0.9, z: 0.2, r: 0.42, n: 40 });
        H.stW.visible = false; H.stM.visible = false;
      },
      // the closet at the brokerage: one desk, shelves of manuals, a hanging bulb, a broom — and a front wall with a door
      closet: (B) => {
        B.set.room({ style: "office", wall: "plaster:#cdbb98", floor: "floor:#6a4a32", w: 2.8, d: 2.4, h: 2.8, door: false, trim: false });
        B.prop.desk({ x: 0.15, z: -0.35, w: 1.3, col: "floor:#6a4630" }); B.prop.chair({ x: 0.2, z: -0.95, col: "#3a2418" });
        B.prop.shelf({ x: -1.0, z: -1.0, w: 0.75, h: 2.5 });
        B.prop.lamp({ x: 0.25, y: 2.8, z: -0.4, kind: "hang", cord: 0.55, col: "#2f5f3a", intensity: 4 });
        H.phone = B.prop.phone({ x: 0.6, y: 0.81, z: -0.3 });
        H.manuals = B.dyn(B.grp(-0.25, 0.81, -0.35, 0.1, 1)); for (let i = 0; i < 4; i++) B.box(0.42, 0.11, 0.3, ["#2f5a8a", "#8a3a3a", "#2f6a4a", "#8a6a2a"][i], 0, i * 0.112, 0, { in: H.manuals });
        B.plate(0.42, 0.13, tx(B, "MANUALS", "#f4e6c8", "#241726", 1024, 317), -0.25, 1.32, -0.18, { d: 0.01 });
        const broom = B.grp(1.2, 0, -0.9, 0, 1); B.cyl(0.02, 0.02, 1.5, "#a07a4a", 0, 0.25, 0, { in: broom, rz: 0.15 }); B.box(0.3, 0.3, 0.08, "#c8a84a", 0.04, 0, 0, { in: broom });
        B.prop.poster({ x: 0.55, y: 1.45, z: -1.18, w: 0.55, h: 0.7, text: "PRICE < VALUE", bg: "#f4e6c8", fg: "#2f5a3a" });
        H.certs = []; const spots = [];
        for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) spots.push([-0.45 + c * 0.36, 1.95 + r * 0.24, -1.17, 0]);
        for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) spots.push([1.37, 0.95 + r * 0.38, -0.85 + c * 0.4, -PI / 2]);
        spots.forEach(([x, y, z, ry], i) => { const g = cert(B, x, y, z, ry, ["STOCK", "SHARES", "CHEAP", "DULL"][i % 4]); g.visible = false; H.certs.push(g); });
        H.tip = B.dyn(B.plate(0.42, 0.3, tx(B, "HOT TIP!", "#ffd84a", "#b8231a", 1024, 731), 0, 0, 0, { d: 0.01 })); H.tip.visible = false;
        // front wall with the door (hidden for interior shots)
        H.front = B.dyn(B.grp(0, 0, 1.2, 0, 1));
        B.box(0.95, 2.8, 0.14, "panel:#5a3a26", -0.95, 0, 0, { in: H.front }); B.box(0.95, 2.8, 0.14, "panel:#5a3a26", 0.95, 0, 0, { in: H.front }); B.box(1.0, 0.6, 0.14, "panel:#5a3a26", 0, 2.2, 0, { in: H.front });
        B.plate(0.8, 0.24, tx(B, "CLOSET", "#f4efe2", "#3a2418", 1024, 307), 0, 2.45, 0.08, { in: H.front, d: 0.01, edge: "#c9a44a" });
        H.leaf = B.dyn(B.grp(-0.5, 0, 0.02, 0, 1, H.front)); B.box(1.0, 2.2, 0.06, "planks:#8a5a3a", 0.5, 0, 0, { in: H.leaf }); B.ball(0.04, "#c9a44a", 0.88, 1.05, 0.05, { in: H.leaf });
        B.plate(0.4, 0.14, tx(B, "W.J.S.", "#c9a44a", "#241726", 1024, 358), 0.5, 1.6, 0.04, { in: H.leaf, d: 0.004 });
      },
      // the lecture room: night class in the 1950s, and Columbia in 1984 (blackboard + village map)
      hall: (B) => {
        B.set.room({ style: "library", wall: "panel:#7a5a3e", floor: "floor:#7a5232", w: 8, d: 7, h: 3.6, windows: [-3.2], door: false });
        B.box(3.4, 1.6, 0.08, "#5a3a24", -0.7, 1.0, -3.46); B.plate(3.2, 1.4, "#2f4a3a", -0.7, 1.8, -3.41, { d: 0.01 }); H.bA = B.dyn(B.plate(3.0, 0.55, tx(B, "VALUE > PRICE", "#2f4a3a", "#f4efe2", 1024, 188), -0.7, 1.85, -3.4, { d: 0.01, edge: "#2f4a3a" }));
        H.bB = B.dyn(B.plate(3.0, 1.2, tx(B, "LUCK?", "#2f4a3a", "#f4efe2", 1024, 410), -0.7, 1.85, -3.39, { d: 0.01, edge: "#2f4a3a" })); H.bB.visible = false;
        H.bC = B.dyn(B.plate(3.0, 1.2, tx(B, "1984", "#2f4a3a", "#f4efe2", 1024, 410), -0.7, 1.85, -3.38, { d: 0.01, edge: "#2f4a3a" })); H.bC.visible = false;
        // the map with one village
        B.box(1.9, 1.6, 0.06, "#5a3a24", 2.4, 1.0, -3.46); B.plate(1.75, 1.45, tx(B, "", "#e8dcb0", "#e8dcb0", 512, 424), 2.4, 1.8, -3.41, { d: 0.01 });
        H.village = B.dyn(B.plate(1.5, 0.205, tx(B, "GRAHAM-AND-DODDSVILLE", "#f4efe2", "#7a1a1a", 1024, 140), 2.4, 1.4, -3.39, { d: 0.01 }));
        for (const [x, y] of [[1.85, 2.3], [2.9, 2.35], [1.8, 1.25], [3.1, 1.9]]) B.ball(0.035, "#8a8a8a", x, y, -3.37);
        H.pins = []; for (let i = 0; i < 9; i++) { const p = B.dyn(B.ball(0.045, "#d23a3a", 2.45 + 0.12 * Math.cos(i * 2.4) * (1 + (i % 3) * 0.4), 1.75 + 0.1 * Math.sin(i * 2.4) * (1 + (i % 3) * 0.4), -3.36)); p.visible = false; H.pins.push(p); }
        H.lectern = B.grp(1.2, 0, -2.4, -0.2, 1); B.box(0.6, 1.1, 0.45, "panel:#5a3a24", 0, 0, 0, { in: H.lectern }); B.box(0.7, 0.05, 0.55, "#3a2418", 0, 1.1, 0.03, { in: H.lectern, rx: -0.25 });
        B.cyl(0.012, 0.012, 0.35, "#3a3a40", 0.1, 1.15, 0.05, { in: H.lectern }); B.ball(0.04, "#2a2a30", 0.1, 1.52, 0.05, { in: H.lectern });
        H.chairs = B.dyn(B.grp(0, 0, 0, 0, 1)); for (const z of [-0.6, 0.6]) for (let c = -3; c <= 3; c++) B.prop.chair({ x: c * 0.8, z, ry: PI, col: "#5a3a24", in: H.chairs });
        B.lamp(0, 3.2, -1.5, "#fff0d0", 4, 9);
      },
      // a 1955 cocktail party: purple wallpaper, lit city windows, cocktails
      party: (B) => {
        B.set.room({ style: "home", wall: "wallpaper:#5a2a5a", floor: "carpet:#3a2a4a", w: 7, d: 6, h: 3.2, windows: [-2.2, 2.2], lit: true, door: false });
        B.prop.roundTable({ x: 1.7, z: -1.6, r: 0.5, felt: "#f4efe2", col: "#3a2418" }); for (let i = 0; i < 3; i++) B.prop.bottle({ x: 1.55 + i * 0.14, y: 0.76, z: -1.6, col: ["#3a6a3a", "#8a2a2a", "#c9a44a"][i] });
        B.prop.lamp({ x: -2.6, z: -2.4, kind: "floor", glow: "#ffd8a0" }); B.prop.plant({ x: 2.9, z: -2.5 }); B.prop.rug({ x: 0, z: -0.4, w: 3.4, d: 2.4, col: "#a06a3a" });
        B.prop.poster({ x: 0, y: 1.4, z: -2.97, w: 1.2, h: 0.8, text: "", bg: "#2a4a6a" }); B.lamp(0, 2.8, 0.5, "#ffc8a0", 4, 8);
      },
      // metaphor: the great coin flip, a green-felt arena
      arena: (B) => {
        B.set.stage({ floor: "#d8c89a", back: "#1f6a4a" });
        B.prop.sign({ x: 0, y: 3.1, z: -3.2, w: 4.2, h: 0.7, text: "THE GREAT COIN FLIP", bg: "#f2c14e", fg: "#241726", edge: "#8a5a10" });
        for (let i = 0; i < 7; i++) B.prop.lampPost({ x: -6.6 + i * 2.2, z: -7.5, glow: "#fff0b0" });
        B.lamp(0, 5, 3, "#fff0c8", 6, 12);
      },
      // metaphor: the bargain counter — a giant dollar coin on a pedestal, its price tag, the SALE stamp
      shop: (B) => {
        B.set.stage({ floor: "#f4e6c8", back: "#8a2a3a" });
        B.prop.pedestal({ x: 0, z: -0.6, r: 0.95, h: 0.55, col: "#f4efe2", trim: "#c9a44a" });
        H.big = bigCoin(B, 0, 1.45, -0.6, 0.85);
        H.tag1 = B.dyn(B.plate(0.95, 0.5, tx(B, "$1.00", "#f4efe2", "#241726", 1024, 539), 1.25, 1.05, -0.2, { d: 0.03, edge: "#5a3a24", rz: 0.12 }));
        H.tag2 = B.dyn(B.plate(0.95, 0.5, tx(B, "$0.40", "#ffd84a", "#b8231a", 1024, 539), 1.25, 1.05, -0.19, { d: 0.03, edge: "#5a3a24", rz: 0.12 })); H.tag2.visible = false;
        H.stamp = B.dyn(B.grp(1.25, 3.5, -0.1, 0, 1)); B.cyl(0.45, 0.45, 0.22, "#d23a3a", 0, 0, 0, { in: H.stamp, seg: 24 }); B.cyl(0.08, 0.08, 0.5, "#5a3a24", 0, 0.22, 0, { in: H.stamp }); B.ball(0.16, "#5a3a24", 0, 0.78, 0, { in: H.stamp });
        H.stamp.visible = false;
        B.lamp(0, 4, 2.5, "#fff0c8", 6, 10);
      },
    },
    shots: [
      // 0 · frame 0: a giant dollar coin rolls across Wall Street, the camera running with it
      { set: "wallst", f: 0, light: "golden", steady: true,
        cam: (u, lf, f) => { const x = -3 + 3.4 * E.ss(Math.min(1, f / 52)); return { p: [x - 0.6, 1.3, 6.4], t: [x, 0.9, 1.0], fov: 40 }; },
        act: (S, u, f) => { const x = -3 + 3.4 * E.ss(Math.min(1, f / 52)); H.coin.position.x = x; H.coin.rotation.z = -(x + 3) / 0.6; H.coin.position.y = 0.6 + 0.03 * Math.abs(Math.sin(f * 0.5));
          S.fx("speed", { x: x - 1.0, y: 0.6, z: 2.2, w: 1.0, h: 0.6 }); S.pop("puff", 4, 16, { x: x - 0.3, y: 0.15, z: 2.2, w: 0.9, h: 0.3, pop: false }); } },
      // 1 · …for twenty-eight years: crane up the street, the years fly past
      { set: "wallst", word: [0, "twenty-eight"], lead: 3, trans: "dissolve", light: "golden", cam: CAM.fit([0, 3.2, -4], { w: 9, a0: -6, a1: 6, e0: 2, e1: 12 }),
        act: (S, u, f) => { H.coin.position.set(0.4, 0.6, 2.2);
          S.pop("label", W(0, "twenty-eight"), 40, { x: 0, y: 4.6, z: -3, w: 3.4, h: 0.9, text: "28 YEARS", bg: "#ffd84a", hold: true });
          for (let q = 0; q < 6; q++) S.pop("page", S.a + q * 5, 18, { x: -2 + q * 0.8, y: 3.4, z: -2.5, w: 0.6, h: 0.6, rise: 0.6, spin: 1, pop: false }); } },
      // 2 · …from a desk in a closet: the door marked CLOSET swings open, Walter waves from his desk
      { set: "closet", word: [0, "from"], lead: 2, trans: "whip", light: "lamp", cam: CAM.fit([0, 1.4, 1.2], { w: 2.4, a0: -6, a1: 4, elev: 3, push: 0.2 }),
        act: (S, u, f) => { const t = W(0, "closet."); H.leaf.rotation.y = -1.9 * E.back(E.prog(f, t - 8, t + 4));
          S.actor("walter", { x: 0.2, z: -0.95, expr: f < t ? "neutral" : "grin", prop: "wave", wave: E.prog(f, t, t + 30) });
          S.kick(t - 4, 0.04); S.pop("label", t, 30, { x: 0, y: 3.05, z: 1.35, w: 1.1, h: 0.32, text: "A CLOSET?!", bg: "#ffd84a", hold: true }); } },
      // 3 · New York, 1955: Walter strolls down Wall Street
      { set: "wallst", beat: 1, trans: "whip", light: "golden", cam: CAM.fit([0, 1.3, 1.5], { w: 3.0, a0: 12, a1: 2, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.coin.visible = false; S.actor("walter", { x: 0.2, z: 1.0 + 0.012 * (f - S.a), expr: "smile", mode: "stroll", phase: f * 0.06 });
          S.pop("label", W(1, "New"), 60, { x: 0, y: 2.45, z: 1.5, w: 1.9, h: 0.42, text: "NEW YORK, 1955", bg: "#f4efe2", hold: true }); } },
      // 4 · Walter Schloss: close on his face
      { set: "wallst", word: [1, "Walter"], lead: 3, trans: "dissolve", light: "golden", cam: CAM.fit([0.2, 1.5, 1.8], { w: 1.3, a0: -8, a1: 0, elev: 2, push: 0.1 }),
        act: (S, u, f) => { H.coin.visible = false; S.actor("walter", { x: 0.2, z: 1.8, expr: "grin", prop: "chin" });
          S.pop("label", W(1, "Walter"), 40, { x: 0.2, y: 1.95, z: 2.0, w: 1.1, h: 0.25, text: "WALTER SCHLOSS", bg: "#ffd84a", hold: true }); } },
      // 5 · skipped college: he strolls past the COLLEGE sign and shrugs
      { set: "wallst", word: [1, "skipped"], lead: 3, light: "golden", cam: CAM.fit([0.8, 1.4, 0.8], { w: 3.4, a0: 10, a1: 4, elev: 4 }),
        act: (S, u, f) => { H.coin.visible = false; H.college.visible = true; S.actor("walter", { x: 0.0 + 0.004 * (f - S.a), z: 0.9, expr: "smile_closed", prop: "shrug" });
          S.pop("impact", W(1, "college") + 2, 22, { x: 1.6, y: 2.6, z: 0.8, w: 0.9, h: 0.6, text: "NOPE" }); } },
      // 6 · …learned from Benjamin Graham: the night class, VALUE > PRICE on the board
      { set: "hall", word: [1, "learned"], lead: 3, trans: "whip", light: "lamp", cam: CAM.fit([-0.6, 1.5, -2.5], { w: 3.0, a0: -10, a1: -2, elev: 4, push: 0.12 }),
        act: (S, u, f) => { H.chairs.visible = false; S.actor("graham", { x: 0.1, z: -3.0, expr: "smile", prop: "point", flip: true }); S.actor("walter", { x: -1.4, z: -2.0, expr: "smile", prop: "chin" });
          S.pop("label", W(1, "Benjamin") - 2, 34, { x: -0.2, y: 2.35, z: -2.9, w: 1.4, h: 0.3, text: "BENJAMIN GRAHAM", bg: "#ffd84a", hold: true }); } },
      // 7 · no tips: a HOT TIP flies in, Walter swats it away
      { set: "closet", beat: 2, trans: "whip", light: "lamp", cam: CAM.fit([0.2, 1.3, -0.6], { w: 1.9, a0: 10, a1: 2, elev: 6 }),
        act: (S, u, f) => { H.front.visible = false; const t = W(2, "tips."); H.tip.visible = f < t + 10; const k = E.prog(f, S.a, t);
          H.tip.position.set(1.2 - 1.0 * k + (f > t ? 0.15 * (f - t) : 0), 1.6 + (f > t ? 0.1 * (f - t) : 0), -0.4); H.tip.rotation.z = 0.3 * Math.sin(f * 0.4) + (f > t ? 0.3 * (f - t) : 0);
          S.actor("walter", { x: 0.2, z: -0.95, expr: f < t ? "stern" : "smile_closed", prop: f < t ? "hold" : "up" });
          S.kick(t, 0.04); S.pop("label", t, 26, { x: -0.3, y: 2.25, z: -0.6, w: 0.85, h: 0.24, text: "NO TIPS", bg: "#ff6a5a", hold: true }); } },
      // 8 · no connections: insert on the silent phone
      { set: "closet", word: [2, "connections."], lead: 3, light: "lamp", steady: true, coc: 11, cam: CAM.fit([0.6, 1.0, -0.3], { w: 0.8, a0: -10, a1: -2, elev: 12, push: 0.1 }),
        act: (S, u, f) => { H.front.visible = false; S.pop("impact", W(2, "connections.") + 3, 22, { x: 0.6, y: 1.25, z: -0.2, w: 0.55, h: 0.45, text: "X" });
          S.pop("label", W(2, "connections."), 30, { x: 0.6, y: 1.48, z: -0.25, w: 0.75, h: 0.16, text: "NO CONNECTIONS", bg: "#f4efe2", hold: true }); } },
      // 9 · just manuals: Walter reads, the manual stack on the desk
      { set: "closet", word: [2, "manuals,"], lead: 6, trans: "dissolve", light: "lamp", cam: CAM.fit([0.0, 1.3, -0.6], { w: 1.6, a0: -14, a1: -6, elev: 8, push: 0.1 }),
        act: (S, u, f) => { H.front.visible = false; S.actor("walter", { x: 0.25, z: -0.95, expr: "smile_closed", prop: "paper" });
          S.pop("bulb", W(2, "manuals,") + 4, 26, { x: 0.55, y: 2.05, z: -0.8, w: 0.3, h: 0.4 }); } },
      // 10 · …over a hundred cheap, dull stocks: certificates fill the walls
      { set: "closet", word: [2, "over"], lead: 2, light: "lamp", cam: CAM.fit([0.25, 1.5, -0.6], { w: 2.1, a0: -4, a1: 4, elev: 6 }),
        act: (S, u, f) => { H.front.visible = false; H.certs.forEach((c, i) => { c.visible = f >= S.a + 2 + i * 2; });
          S.actor("walter", { x: 0.2, z: -0.95, expr: "grin", prop: "point" });
          const n = Math.min(100, Math.round(100 * E.prog(f, S.a, W(2, "stocks.")))); S.fx("label", { x: -0.2, y: 2.55, z: -0.6, w: 0.9, h: 0.26, text: n >= 100 ? "100+ STOCKS" : n + " STOCKS", bg: n >= 100 ? "#ffd84a" : "#f4efe2" });
          S.pop("label", W(2, "dull") - 2, 30, { x: 0.8, y: 2.25, z: -0.4, w: 0.6, h: 0.2, text: "DULL", bg: "#9aa3ad", hold: true }); } },
      // 11 · so boring…: the cocktail party, Walter talks pulp and paper
      { set: "party", beat: 3, trans: "whip", light: "interior", cam: CAM.fit([0, 1.4, -0.8], { w: 3.2, a0: -10, a1: 0, elev: 4, push: 0.1 }),
        act: (S, u, f) => { S.actor("walter", { x: 0, z: -0.9, expr: "laugh", prop: "point" });
          S.actor("lady", { x: -1.0, z: -0.6, expr: f < W(3, "cocktail") ? "smile" : "dazed", prop: "hold" }); S.actor("gent", { x: 1.0, z: -0.6, expr: f < W(3, "boring") ? "neutral" : "dazed", prop: "hold" });
          S.say("Pulp and paper!", S.a + 4, 34, { x: 0.1, y: 2.35, z: -0.8, w: 1.4, h: 0.42 }); } },
      // 12 · …to sleep: the guests doze off, the gent keels over
      { set: "party", word: [3, "sleep."], lead: 14, light: "interior", cam: CAM.fit([0.2, 1.1, -0.6], { w: 3.0, a0: 6, a1: 12, elev: 6 }),
        act: (S, u, f) => { const t = W(3, "sleep."); S.actor("walter", { x: 0, z: -0.9, expr: "nervous", prop: "shrug" });
          S.actor("lady", { x: -1.0, z: -0.6, expr: "smile_closed", headTilt: 14, blink: 0 }); S.actor("gent", { x: 1.0, z: -0.6, expr: "dazed", mode: f < t ? "stand" : "fall" });
          S.kick(t + 4, 0.05); for (let q = 0; q < 3; q++) S.pop("zz", S.a + 2 + q * 9, 18, { x: -1.0 + q * 0.4, y: 2.1, z: -0.5, w: 0.3, h: 0.3, rise: 0.4, pop: false }); } },
      // 13 · yet his investors earn ~16% a year: his coin tower rises on Wall Street
      { set: "wallst", beat: 4, trans: "whip", light: "golden", cam: CAM.fit([0, 1.9, 0.2], { w: 4.0, a0: -8, a1: 4, e0: 2, e1: 10 }),
        act: (S, u, f) => { H.coin.visible = false; H.stW.visible = true; H.stM.visible = true; const k = E.ss(E.prog(f, W(4, "earn"), W(4, "year.") + 6));
          H.stW.coins.forEach((c, i) => { c.visible = i < 2 + 38 * k; }); H.stM.coins.forEach((c, i) => { c.visible = i < 2 + 4 * k; });
          S.fx("label", { x: -0.9, y: 0.35 + 3.3 * k, z: 0.7, w: 1.1, h: 0.28, text: "WALTER", bg: "#4fd18b" });
          S.pop("label", W(4, "sixteen") - 2, 40, { x: -0.9, y: 3.9, z: 0.6, w: 1.3, h: 0.36, text: "~16% A YEAR", bg: "#ffd84a", hold: true }); } },
      // 14 · the market? about eight: the skeptic peers at the short tower
      { set: "wallst", word: [4, "The"], lead: 2, light: "golden", cam: CAM.fit([0.3, 1.9, 0.4], { w: 3.8, a0: 10, a1: 4, elev: 4 }),
        act: (S, u, f) => { H.coin.visible = false; H.stW.visible = true; H.stM.visible = true; H.stW.coins.forEach((c) => (c.visible = true)); H.stM.coins.forEach((c, i) => { c.visible = i < 6; });
          S.actor("skeptic", { x: 1.85, z: 0.6, expr: f < W(4, "eight.") ? "neutral" : "shock", prop: "chin", flip: true });
          S.fx("label", { x: 0.9, y: 0.85, z: 0.7, w: 1.1, h: 0.28, text: "MARKET", bg: "#f4efe2" });
          S.pop("label", W(4, "eight.") - 2, 30, { x: 0.9, y: 1.4, z: 0.7, w: 1.1, h: 0.36, text: "~8%", bg: "#ff8a7a", hold: true }); } },
      // 15 · so how do you beat Wall Street from a closet? pull back on the tiny room
      { set: "closet", beat: 5, trans: "whip", light: "lamp", cam: CAM.keys([[0, { p: [0.25, 1.5, 0.3], t: [0.2, 1.45, -1.0], fov: 40 }], [1, { p: [0.0, 1.6, 3.6], t: [0.1, 1.3, -0.6], fov: 40 }]]),
        act: (S, u, f) => { H.leaf.rotation.y = -1.9; H.certs.forEach((c) => (c.visible = true)); S.actor("walter", { x: 0.2, z: -0.95, expr: "smile_closed", prop: "paper" });
          S.pop("question", S.a + 6, 40, { x: -0.5, y: 2.3, z: -0.3, w: 0.35, h: 0.5, hold: true }); S.pop("question", W(5, "closet?") - 2, 30, { x: 0.8, y: 2.4, z: -0.3, w: 0.3, h: 0.42, hold: true }); } },
      // 16 · easy, said the skeptics: the professor at the blackboard
      { set: "hall", beat: 6, trans: "whip", light: "office", cam: CAM.fit([-0.3, 1.5, -2.5], { w: 3.0, a0: 8, a1: 0, elev: 4 }),
        act: (S, u, f) => { H.chairs.visible = false; H.bA.visible = false; H.bB.visible = true; S.actor("skeptic", { x: 0.3, z: -2.9, expr: "grin", prop: "point" });
          S.say("Easy.", S.a + 2, 24, { x: 0.6, y: 2.35, z: -2.8, w: 0.8, h: 0.36 }); } },
      // 17 · LUCK: smash on the board, a coin spins up
      { set: "hall", word: [6, "Luck."], lead: 3, trans: "smash", light: "office", steady: true, cam: CAM.fit([-0.7, 1.8, -3.3], { w: 2.6, a0: 0, a1: 0, elev: 2, push: 0.12 }),
        act: (S, u, f) => { H.bA.visible = false; H.bB.visible = true; S.kick(W(6, "Luck."), 0.06);
          S.pop("impact", W(6, "Luck."), 24, { x: -0.7, y: 1.8, z: -3.2, w: 2.2, h: 1.2, text: "LUCK!" }); S.pop("coin", W(6, "Luck.") + 2, 24, { x: 0.4, y: 1.6, z: -3.1, w: 0.4, h: 0.4, rise: 0.6, spin: 2 }); } },
      // 18 · you see — push into the coin-flip arena: a crowd flipping coins every morning
      { set: "arena", beat: 7, trans: "zoom", light: K.backdrop("#1f6a4a"), cam: CAM.fit([0, 1.6, -0.6], { w: 6.0, a0: -10, a1: 6, elev: 6, push: 0.15 }),
        act: (S, u, f) => { const C = ["flipA", "flipB", "flipC", "flipD"];
          for (let i = 0; i < 9; i++) { const x = -2.6 + i * 0.65, z = -1.2 + (i % 2) * 0.8; S.actor(C[i % 4], { x, z, key: "a" + i, expr: i % 3 ? "smile" : "grin", prop: "up" });
            S.pop("coin", S.a + 4 + ((i * 7) % 20), 24, { x, y: 2.25, z: z + 0.2, w: 0.25, h: 0.25, rise: 0.5, spin: 2, pop: false }); }
          S.pop("label", W(7, "two") - 2, 70, { x: 0, y: 3.85, z: -2.6, w: 3.2, h: 0.5, text: "225,000,000 PEOPLE", bg: "#ffd84a", hold: true }); } },
      // 19 · flipping coins every morning: close on one flipper, coin spinning high
      { set: "arena", word: [7, "coins"], lead: 3, light: K.backdrop("#1f6a4a"), cam: CAM.fit([0.0, 1.8, -0.6], { w: 1.6, a0: 10, a1: 2, e0: -6, e1: 4 }),
        act: (S, u, f) => { S.actor("flipA", { x: 0, z: -0.8, expr: "grin", prop: "up", look: 0.4 }); const k = E.prog(f, S.a, S.a + 40);
          S.fx("coin", { x: 0.5, y: 2.0 + 0.9 * Math.sin(k * PI), z: -0.5, w: 0.3, h: 0.3 });
          S.pop("label", W(7, "every") - 2, 30, { x: -0.2, y: 2.7, z: -0.4, w: 1.3, h: 0.28, text: "EVERY MORNING", bg: "#f4efe2", hold: true }); } },
      // 20 · after twenty days: the losers fall one by one, two are still standing
      { set: "arena", beat: 8, trans: "dissolve", light: K.backdrop("#1f6a4a"), cam: CAM.fit([0, 1.5, -0.6], { w: 6.0, a0: 4, a1: -4, elev: 8 }),
        act: (S, u, f) => { const C = ["flipA", "flipB", "flipC", "flipD"];
          for (let i = 0; i < 9; i++) { const x = -2.6 + i * 0.65, z = -1.2 + (i % 2) * 0.8; const keep = i === 2 || i === 6; const tf = S.a + 6 + ((i * 11) % 9) * 6;
            S.actor(C[i % 4], { x, z, key: "a" + i, expr: keep ? "grin" : f < tf ? "nervous" : "dazed", mode: keep || f < tf ? "stand" : "fall", prop: keep ? "fists" : null }); }
          const d = Math.min(20, 1 + Math.floor(19 * E.prog(f, S.a, W(8, "days,") + 10))); S.fx("label", { x: 0, y: 3.85, z: -2.6, w: 1.8, h: 0.5, text: "DAY " + d, bg: d >= 20 ? "#ffd84a" : "#f4efe2" });
          S.pop("label", W(8, "two") - 2, 40, { x: 0, y: 3.2, z: -2.4, w: 2.4, h: 0.36, text: "~200 STILL WINNING", bg: "#4fd18b", hold: true }); } },
      // 21 · Geniuses! the two winners take a bow in confetti
      { set: "arena", word: [8, "Geniuses!"], lead: 4, trans: "smash", light: K.backdrop("#1f6a4a"), cam: CAM.fit([0, 1.5, -0.6], { w: 2.4, a0: -6, a1: 4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { S.actor("flipC", { x: -0.55, z: -0.8, key: "w1", expr: "laugh", prop: "fists" }); S.actor("flipD", { x: 0.55, z: -0.8, key: "w2", expr: "grin", prop: "up" });
          S.pop("confetti", S.a + 2, 30, { x: 0, y: 2.6, z: -0.5, w: 2.2, h: 1.4 }); S.say("Genius!", S.a + 6, 26, { x: 0.8, y: 2.45, z: -0.6, w: 0.9, h: 0.36 }); } },
      // 22 · 1984, a famous talk: Columbia lecture room, the empty lectern
      { set: "hall", beat: 9, trans: "whip", light: "office", cam: CAM.fit([-0.1, 1.6, -2.4], { w: 4.4, a0: -8, a1: 0, elev: 8, push: 0.1 }),
        act: (S, u, f) => { H.bA.visible = false; H.bC.visible = true;
          S.pop("label", W(9, "nineteen") - 2, 50, { x: 0.2, y: 3.05, z: -2.6, w: 2.0, h: 0.4, text: "COLUMBIA, 1984", bg: "#ffd84a", hold: true }); S.pop("speed", W(9, "talk") - 2, 16, { x: 1.2, y: 1.6, z: -2.2, w: 0.6, h: 0.4 }); } },
      // 23 · …so many big winners: red pins cluster in one village on the map
      { set: "hall", word: [9, "big"], lead: 3, trans: "dissolve", light: "office", steady: true, coc: 10, cam: CAM.fit([2.45, 1.8, -3.4], { w: 1.8, a0: 6, a1: 0, elev: 2, push: 0.12 }),
        act: (S, u, f) => { H.bA.visible = false; H.bC.visible = true; H.pins.forEach((p, i) => { p.visible = f >= S.a + 4 + i * 3; });
          S.pop("glow", W(9, "teacher.") - 4, 30, { x: 2.5, y: 1.6, z: -3.3, w: 1.2, h: 0.9, hold: true }); S.pop("label", W(9, "one") - 2, 30, { x: 2.45, y: 2.75, z: -3.3, w: 1.2, h: 0.24, text: "ONE TEACHER", bg: "#ffd84a", hold: true }); } },
      // 24 · Graham. — back at the night-class board, he smiles
      { set: "hall", word: [9, "Graham."], lead: 3, trans: "smash", light: "lamp", cam: CAM.fit([-0.3, 1.55, -2.8], { w: 1.6, a0: 6, a1: -2, elev: 3, push: 0.1 }),
        act: (S, u, f) => { H.chairs.visible = false; S.actor("graham", { x: -0.3, z: -3.0, expr: "smile", prop: "chin" }); S.kick(W(9, "Graham."), 0.04);
          S.pop("label", W(9, "Graham."), 30, { x: -0.3, y: 2.25, z: -2.8, w: 1.1, h: 0.26, text: "BEN GRAHAM", bg: "#ffd84a", hold: true }); S.pop("stars", W(9, "Graham.") + 2, 22, { x: -0.3, y: 2.5, z: -2.8, w: 1.2, h: 0.5 }); } },
      // 25 · Walter's method fit on a coin: worth a dollar? — the giant coin on its pedestal, $1.00 tag
      { set: "shop", beat: 10, trans: "whip", light: K.backdrop("#8a2a3a"), cam: CAM.fit([0.05, 1.6, -0.3], { w: 4.0, a0: -8, a1: 0, elev: 5, push: 0.1 }),
        act: (S, u, f) => { H.big.rotation.y = 0.25 * Math.sin(f * 0.05); S.actor("walter", { x: -1.15, z: -0.3, expr: "smile", prop: "chin" });
          S.pop("label", W(10, "worth") - 2, 40, { x: 0, y: 3.0, z: -0.4, w: 1.6, h: 0.36, text: "WORTH $1", bg: "#f4efe2", hold: true }); } },
      // 26 · buy it for forty cents: the tag flips, Walter grins and points
      { set: "shop", word: [10, "Buy"], lead: 3, light: K.backdrop("#8a2a3a"), cam: CAM.fit([0.05, 1.5, -0.3], { w: 3.6, a0: 8, a1: 3, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const t = W(10, "forty"); H.tag1.visible = f < t; H.tag2.visible = f >= t; S.kick(t, 0.04);
          S.actor("walter", { x: -1.15, z: -0.3, expr: f < t ? "smile" : "grin", prop: "point" }); S.pop("coin", t + 2, 22, { x: 1.2, y: 1.6, z: 0, w: 0.3, h: 0.3, rise: 0.4 }); } },
      // 27 · the coin-flippers needed luck: the last flipper's coin comes down on his head
      { set: "arena", beat: 11, trans: "whip", light: K.backdrop("#1f6a4a"), cam: CAM.fit([0, 1.4, -0.6], { w: 2.2, a0: 8, a1: 0, elev: 4 }),
        act: (S, u, f) => { const t = W(11, "luck."); S.actor("flipD", { x: 0, z: -0.8, expr: f < t ? "nervous" : "dazed", prop: f < t ? "up" : null, mode: f < t + 6 ? "stand" : "fall" });
          const k = E.prog(f, S.a, t); S.fx("coin", { x: 0.05, y: 1.9 + 1.4 * Math.sin(k * PI) - (f >= t ? 0.3 : 0), z: -0.5, w: 0.3, h: 0.3 });
          S.kick(t, 0.05); S.pop("impact", t, 20, { x: 0, y: 2.0, z: -0.5, w: 0.8, h: 0.6, text: "BONK" }); S.pop("stars", t + 3, 20, { x: 0, y: 1.6, z: -0.5, w: 0.7, h: 0.4 }); } },
      // 28 · Walter just needed a discount: the SALE stamp slams onto the tag
      { set: "shop", word: [11, "Walter"], lead: 3, trans: "whip", light: K.backdrop("#8a2a3a"), cam: CAM.fit([0.05, 1.7, -0.3], { w: 3.8, a0: -6, a1: 2, elev: 5, push: 0.1 }),
        act: (S, u, f) => { const t = W(11, "discount."); H.tag1.visible = false; H.tag2.visible = true; H.stamp.visible = true;
          H.stamp.position.y = 1.5 + 2.0 * (1 - E.easeIn(E.prog(f, t - 8, t))) + (f > t + 10 ? 0.4 * E.ss(E.prog(f, t + 10, t + 18)) : 0);
          S.actor("walter", { x: -1.15, z: -0.3, expr: f < t ? "smile_closed" : "laugh", prop: f < t ? "hold" : "fists" });
          S.kick(t, 0.1); S.pop("impact", t, 26, { x: 1.2, y: 1.4, z: 0.1, w: 1.3, h: 0.9, text: "SOLD!" }); S.pop("confetti", t + 2, 30, { x: 0.2, y: 2.6, z: 0, w: 2.6, h: 1.4 }); } },
    ],
  };
};
