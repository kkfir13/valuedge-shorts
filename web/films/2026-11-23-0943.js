// "A Very Good Line" (the Brontë sisters' York and North Midland railway shares, 1845–1849) — film module.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const AH = 1.55;
  const H = {};
  const PI = Math.PI;
  const tx = (B, s, bg, fg, w = 1024, h = 256) => B.textTex(s, bg, fg, w, h);
  const DECK = 4.4; // viaduct deck height on the moor

  // an 1840s locomotive + tender + two little coaches, nose towards +x, standing on y=0 of its group
  const train = (B, g) => {
    B.box(3.0, 0.3, 1.5, "#2a2a30", 0.4, 0.45, 0, { in: g });
    B.cyl(0.55, 0.55, 2.4, "#2f5a3a", 0.6, 1.3 - 1.2, 0, { in: g, rz: PI / 2, seg: 22 });
    B.cyl(0.6, 0.6, 0.2, "#1a1a20", 1.85, 1.3 - 0.1, 0, { in: g, rz: PI / 2, seg: 22 });
    B.cyl(0.14, 0.24, 1.25, "#1a1a20", 1.45, 1.75, 0, { in: g });
    B.ball(0.22, "#c9a44a", 0.4, 1.95, 0, { in: g });
    B.box(0.9, 1.3, 1.4, "#2f5a3a", -0.85, 0.75, 0, { in: g }); B.box(1.1, 0.1, 1.55, "#1a1a20", -0.85, 2.05, 0, { in: g });
    B.box(0.3, 0.3, 0.3, "#ffe8a8", 2.0, 1.25, 0, { in: g });
    for (const [x, r] of [[-0.6, 0.45], [0.6, 0.62], [1.6, 0.4]]) for (const z of [-0.78, 0.78]) B.cyl(r, r, 0.08, "#b8423a", x, r - 0.04, z, { in: g, rx: PI / 2, seg: 18 });
    B.box(2.2, 1.0, 1.6, "#2f5a3a", -2.7, 0.45, 0, { in: g });
    B.plate(2.0, 0.36, tx(B, "YORK & NORTH MIDLAND", "#2f5a3a", "#f2c14e", 1024, 184), -2.7, 1.05, 0.81, { in: g, d: 0.02 });
    for (const [x, c] of [[-5.3, "#8a3a2a"], [-8.0, "#c9a44a"]]) {
      B.box(2.5, 1.3, 1.6, c, x, 0.45, 0, { in: g }); B.box(2.6, 0.12, 1.7, "#2a2a30", x, 1.75, 0, { in: g });
      for (const wx of [-0.7, 0, 0.7]) B.plate(0.45, 0.5, "#f4efe2", x + wx, 1.15, 0.81, { in: g, d: 0.01 });
      for (const wx of [-0.8, 0.8]) for (const z of [-0.78, 0.78]) B.cyl(0.32, 0.32, 0.08, "#2a2a30", x + wx, 0.28, z, { in: g, rx: PI / 2, seg: 14 });
    }
  };
  // a share certificate lying flat
  const cert = (B, x, y, z, s, parent, label = true) => { const g = B.grp(x, y, z, 0, s, parent);
    B.box(1.4, 0.05, 0.9, "#f4e6c8", 0, 0, 0, { in: g }); B.box(1.25, 0.055, 0.05, "#c9a44a", 0, 0, 0.36, { in: g }); B.box(1.25, 0.055, 0.05, "#c9a44a", 0, 0, -0.36, { in: g });
    if (label) B.plate(1.1, 0.3, tx(B, "ONE SHARE", "#f4e6c8", "#2f5a3a", 1024, 280), 0, 0.06, 0, { in: g, rx: -PI / 2, d: 0.004 });
    return g; };
  // a cartoon horse (profile, facing +x) — the vicar's horse
  const horse = (B, x, z) => {
    const g = B.dyn(B.grp(x, 0, z, 0, 1));
    B.ball(0.55, "#8a5a34", 0, 1.15, 0, { in: g, sx: 1.45, sy: 0.85, sz: 0.8 });
    for (const [lx, lz] of [[-0.5, -0.22], [-0.5, 0.22], [0.5, -0.22], [0.5, 0.22]]) B.cyl(0.08, 0.07, 0.95, "#7a4a2a", lx, 0, lz, { in: g });
    const head = B.dyn(B.grp(0.78, 1.55, 0, 0, 1, g));
    B.box(0.28, 0.6, 0.3, "#8a5a34", 0, -0.2, 0, { in: head, rz: -0.35 }); B.box(0.55, 0.28, 0.3, "#8a5a34", 0.25, 0.25, 0, { in: head });
    B.box(0.2, 0.22, 0.31, "#5a3a24", 0.5, 0.2, 0, { in: head }); B.cone(0.06, 0.18, "#7a4a2a", 0.05, 0.48, 0.08, { in: head });
    B.box(0.12, 0.45, 0.06, "#3a2418", -0.05, -0.15, 0, { in: head, rz: -0.35 });
    B.ball(0.08, "#ffffff", 0.2, 0.33, 0.16, { in: head }); const pupil = B.dyn(B.ball(0.04, "#1a1418", 0.24, 0.33, 0.21, { in: head }));
    B.box(0.06, 0.5, 0.06, "#3a2418", -0.75, 0.75, 0, { in: g, rz: 0.4 });
    return { g, head, pupil };
  };
  // the finest house on the street (a little Georgian villa)
  const villa = (B, g) => {
    B.box(2.2, 1.5, 1.4, "plaster:#f4e6c8", 0, 0, 0, { in: g });
    const roof = B.cone(1.75, 0.9, "#8a3a2a", 0, 1.5, 0, { in: g, seg: 4 }); roof.rotation.y = PI / 4; roof.scale.set(1, 1, 0.65);
    B.box(0.22, 0.6, 0.22, "brick:#8a4a3a", 0.65, 1.6, 0, { in: g });
    B.box(0.36, 0.7, 0.05, "#2f5a3a", 0, 0, 0.71, { in: g }); B.box(0.5, 0.06, 0.15, "#e8e0d0", 0, 0.72, 0.72, { in: g });
    for (const wx of [-0.7, 0.7]) for (const wy of [0.2, 0.85]) B.box(0.4, 0.42, 0.05, "#ffe9a8", wx, wy, 0.71, { in: g });
    B.box(0.42, 0.42, 0.05, "#ffe9a8", 0, 0.85, 0.71, { in: g });
  };

  return {
    cast: {
      you: { jacket: "#3a2a3a", pants: "#2a2230", boots: "#1a1418", hat: "hair", hair: "#5a3220", dress: "#3a2a3a", skin: "#f5d6b8", buttons: "#e8e0d0" },
      youOut: { jacket: "#3a2a3a", pants: "#2a2230", boots: "#1a1418", hat: "bonnet", capColor: "#2a2230", hair: "#5a3220", dress: "#3a2a3a", skin: "#f5d6b8" },
      emily: { jacket: "#4a5a6a", pants: "#2a2a34", boots: "#1a1418", hat: "hair", hair: "#2a1a14", dress: "#4a5a6a", skin: "#f3d0b0" },
      anne: { jacket: "#7a6a9a", pants: "#2a2a34", boots: "#1a1418", hat: "hair", hair: "#8a5a34", dress: "#7a6a9a", skin: "#f8dcc0" },
      vicar: { jacket: "#1a1a20", pants: "#1a1a20", boots: "#141418", hat: "tophat", capColor: "#141418", hair: "#eeeeee", skin: "#f3cfae", buttons: "#f4f4f4", build: "stout" },
      hudson: { jacket: "#6a2a3a", pants: "#2a2a34", boots: "#141418", hat: "hair", hair: "#6a4a30", skin: "#f0c0a0", moustache: "#6a4a30", buttons: "#e8c44a", build: "stout" },
      auct: { jacket: "#2a3a5a", pants: "#2a2a34", boots: "#141418", hat: "bowler", capColor: "#1a1a20", skin: "#e8b48a", moustache: "#2a1a14", buttons: "#e8c44a" },
      buyer: { jacket: "#8a6a34", pants: "#4a3a2a", boots: "#2a1a14", hat: "bowler", capColor: "#3a2a20", skin: "#f5c9a0", moustache: "#5a3418" },
      t1: { jacket: "#3a4a6a", pants: "#2a2a34", boots: "#1a1418", hat: "tophat", capColor: "#1a1a20", skin: "#f0c8a0", moustache: "#3a2418" },
      t2: { jacket: "#7a3a3a", pants: "#2a2a34", boots: "#1a1418", hat: "bonnet", capColor: "#e8d8b0", dress: "#a04a4a", skin: "#f5d6b8", hair: "#8a5a34" },
      t3: { jacket: "#4a5a3a", pants: "#3a3030", boots: "#1a1418", hat: "cap", cap: "#5a4a3a", skin: "#c99067" },
      t4: { jacket: "#5a4a6a", pants: "#2a2a34", boots: "#1a1418", hat: "bowler", capColor: "#2a2a30", skin: "#f3cfae", moustache: "#c8a060" },
    },
    sets: {
      // the Yorkshire moor: purple heather, a stone viaduct with the line on top, the parsonage on its hill
      moor: (B) => {
        B.set.landscape({ kind: "meadow", hills: true, count: 10, clear: 14, seed: 9 });
        for (let i = 0; i < 70; i++) B.ball(0.35 + (i % 4) * 0.12, i % 3 ? "#8a4a8a" : "#a05a9a", -22 + ((i * 7.3) % 44), 0.05, -3 + ((i * 3.7) % 14) - 8 * (i % 2), { sy: 0.35 });
        for (let x = -36; x <= 36; x += 4.5) { B.box(1.1, DECK, 1.8, "brick:#8a8478", x, 0, -6, {}); B.box(1.5, 0.35, 2.0, "#9a948a", x, 0, -6, {}); }
        B.box(80, 0.45, 2.2, "#9a948a", 0, DECK, -6); B.box(80, 0.35, 0.12, "#7a746a", 0, DECK + 0.45, -6.95); B.box(80, 0.35, 0.12, "#7a746a", 0, DECK + 0.45, -5.05);
        for (const z of [-6.5, -5.5]) B.box(80, 0.08, 0.07, "metal:#8a8a90", 0, DECK + 0.45, z);
        H.train = B.dyn(B.grp(0, DECK + 0.5, -6, 0, 0.62)); train(B, H.train);
        H.steam = B.dyn(B.grp(0, 0, 0, 0, 1));
        // the parsonage: grey stone, two storeys, sash windows, a bare wind-bent tree and gravestones
        const p = B.grp(-6.5, 0, 3.2, 0.35, 1);
        B.box(4.6, 4.2, 3.2, "brick:#8a8478", 0, 0, 0, { in: p }); const r = B.cone(3.4, 1.4, "#4a4a52", 0, 4.2, 0, { in: p, seg: 4 }); r.rotation.y = PI / 4; r.scale.set(1, 1, 0.7);
        for (const cx of [-2.0, 2.0]) B.box(0.5, 1.4, 0.5, "brick:#7a746a", cx, 4.0, 0, { in: p });
        for (const wx of [-1.5, 0, 1.5]) for (const wy of [0.8, 2.6]) if (!(wx === 0 && wy === 0.8)) B.box(0.7, 1.0, 0.05, "#ffe39a", wx, wy, 1.62, { in: p });
        B.box(0.8, 1.6, 0.06, "#3a2418", 0, 0, 1.62, { in: p });
        for (let i = 0; i < 7; i++) B.box(0.45, 0.7 + (i % 3) * 0.15, 0.12, "#7a7a80", -2.8 + i * 0.75, 0, 6.2 + (i % 2) * 0.8, { ry: 0.1 * Math.sin(i) });
        H.tree = B.dyn(B.grp(-1.2, 0, 4.5, 0, 1)); B.prop.tree({ x: 0, z: 0, kind: "bare", in: H.tree });
        B.prop.fence({ x: -6.5, z: 5.4, len: 6, col: "#7a746a" });
        H.gate = B.prop.sign({ x: -3.8, y: 0, z: 5.3, w: 1.5, h: 0.4, text: "HAWORTH", bg: "#e8e0d0", fg: "#3a2a3a", post: true });
      },
      // the parsonage dining room: the sisters' writing table, fire, candle
      parlour: (B) => {
        B.set.room({ style: "home", wall: "wallpaper:#8a3a3a", floor: "floor:#6a4a32", w: 7, d: 6, h: 3.3, windows: [-2.2], door: false });
        B.box(1.6, 1.2, 0.5, "#e8e0d0", 1.6, 0, -2.75); B.box(0.9, 0.75, 0.52, "#1a1418", 1.6, 0, -2.74); B.box(1.8, 0.1, 0.6, "#e8e0d0", 1.6, 1.2, -2.75);
        B.lamp(1.6, 0.4, -2.2, "#ff9a40", 3, 4); for (let i = 0; i < 3; i++) B.cone(0.12, 0.3, "#ff8a30", 1.4 + i * 0.2, 0.05, -2.6);
        B.prop.table({ x: 0, z: -0.6, w: 1.8, d: 1.0, col: "floor:#6a3a24" });
        B.prop.lamp({ x: -0.6, y: 0.78, z: -0.75, col: "#ffcf70" });
        H.paper = B.dyn(B.grp(0.2, 0.79, -0.5, 0, 1)); B.box(0.5, 0.01, 0.36, "#f4efe2", 0, 0, 0, { in: H.paper }); for (let k = 0; k < 4; k++) B.box(0.36, 0.004, 0.015, "#3a2a20", 0, 0.01, -0.12 + k * 0.07, { in: H.paper });
        H.quill = B.dyn(B.grp(0.35, 0.82, -0.45, 0, 1)); B.cone(0.04, 0.45, "#f4efe2", 0, 0, 0, { in: H.quill }).rotation.z = -0.5;
        H.cert = B.dyn(cert(B, -0.1, 0.8, -0.35, 0.42)); H.cert.visible = false;
        H.coins = []; for (let i = 0; i < 6; i++) { const c = B.dyn(B.cyl(0.06, 0.06, 0.02, "#f2c14e", -0.25 + i * 0.09, 0.8, -0.3, { seg: 14 })); c.visible = false; H.coins.push(c); }
        H.ptag = B.dyn(B.grp(0.75, 0.8, -0.3, 0, 1)); B.plate(1.0, 0.5, tx(B, "£120", "#ffd84a", "#7a1a1a", 1024, 512), 0, 0.25, 0, { in: H.ptag, rx: -0.35, d: 0.05, edge: "#7a1a1a" }); H.ptag.visible = false;
        B.prop.poster({ x: -0.4, y: 1.5, z: -2.95, w: 0.7, h: 0.9, text: "", bg: "#5a4a3a" }); B.box(0.6, 0.8, 0.02, "#a89a80", -0.4, 1.55, -2.92);
        B.prop.clock({ x: 0.9, y: 2.4, z: -2.95, r: 0.26 }); B.prop.rug({ x: 0, z: 0.2, w: 3.2, d: 2.2, col: "#5a3a4a" });
        for (const cx of [-0.9, 0.9]) B.prop.chair({ x: cx, z: 0.3, ry: PI });
      },
      // Haworth's steep cobbled main street in the mania: a share office and a price board
      village: (B) => {
        B.set.street({ style: ["village", "victorian"], length: 40, road: 6, ground: "cobble", seed: 23, signs: ["SHARE OFFICE", "DRAPER", "RAILWAY SHARES", "POST OFFICE", "APOTHECARY"] });
        B.prop.sign({ x: 0, y: 0.3, z: -7.5, w: 3.2, h: 0.6, text: "Y. & N. MIDLAND · PER SHARE", bg: "#2f5a3a", fg: "#f4efe2", post: true });
        H.price = {}; for (const [k, c] of [["£50", "#f4efe2"], ["£80", "#ffd84a"], ["£120", "#ff8a5a"]]) { H.price[k] = B.dyn(B.plate(2.6, 1.0, tx(B, k, "#1f2a24", c, 1024, 394), 0, 1.25, -7.42, { d: 0.02, edge: "#5a3a24" })); H.price[k].visible = k === "£50"; }
        B.box(2.7, 1.1, 0.1, "#3a2418", 0, 1.2, -7.55);
        H.horse = horse(B, -1.35, -0.6);
        H.vcert = B.dyn(cert(B, 0, 0, 0, 0.4)); H.vcert.rotation.x = PI / 2; H.vcert.visible = false;
        B.prop.lampPost({ x: -2.6, z: -3.5 }); B.prop.barrel({ x: 2.4, z: -1.5 });
      },
      // metaphor: an auction stage with the finest house on the street
      auction: (B) => {
        B.set.stage({ floor: "#e8d8b0", back: "#2f6a6a" });
        B.prop.pedestal({ x: 0, z: -0.8, r: 1.4, h: 0.5, col: "#f4efe2", trim: "#c9a44a" });
        H.villa = B.dyn(B.grp(0, 0.5, -0.8, 0, 1)); villa(B, H.villa);
        H.tag100 = B.dyn(B.plate(0.9, 0.5, tx(B, "£100", "#f4efe2", "#2f5a3a", 1024, 568), 1.6, 1.9, -0.5, { d: 0.04, edge: "#2a3a4a" }));
        H.tag300 = B.dyn(B.plate(1.2, 0.62, tx(B, "£300", "#ffd84a", "#c0353a", 1024, 530), 1.6, 1.9, -0.45, { d: 0.05, edge: "#7a1a1a" })); H.tag300.visible = false;
        B.box(0.02, 1.0, 0.02, "#3a2418", 1.6, 2.15, -0.5);
        B.prop.desk({ x: -1.9, z: 0.2, w: 1.0 }); B.lamp(0, 3.6, 2, "#fff0c8", 6, 9);
      },
      // metaphor: the Railway King's throne of share certificates, and the fever thermometer
      throne: (B) => {
        B.set.stage({ floor: "#c9b48a", back: "#3a2a5a" });
        H.throne = []; for (let i = 0; i < 12; i++) H.throne.push(B.dyn(cert(B, 0.03 * Math.sin(i * 2.1), 0.03 + i * 0.07, 0.3, 0.9, undefined, i === 11)));
        H.back = []; for (let i = 0; i < 9; i++) { const c = B.dyn(cert(B, 0, 0.9 + i * 0.07, -0.25, 0.9, undefined, false)); c.rotation.x = PI / 2 - 0.1; c.position.set(0, 1.15 + i * 0.13, -0.15); H.back.push(c); }
        H.crown = B.dyn(B.grp(0, 2.55, 0.3, 0, 1)); B.cyl(0.17, 0.17, 0.12, "#f2c14e", 0, 0, 0, { in: H.crown, seg: 20 }); for (let k = 0; k < 5; k++) B.cone(0.045, 0.12, "#f2c14e", 0.15 * Math.sin(k * 1.257), 0.12, 0.15 * Math.cos(k * 1.257), { in: H.crown }); B.ball(0.035, "#e0304a", 0, 0.07, 0.17, { in: H.crown });
        H.thermo = B.dyn(B.grp(-1.8, 0, -0.4, 0, 1)); B.box(0.5, 0.25, 0.5, "#5a4a3a", 0, 0, 0, { in: H.thermo }); B.cyl(0.14, 0.14, 2.6, "#ffc8c0", 0, 0.25, 0, { in: H.thermo, seg: 16 });
        B.ball(0.24, "#e0304a", 0, 0.42, 0, { in: H.thermo }); H.merc = B.dyn(B.cyl(0.09, 0.09, 2.3, "#e0304a", 0, 0.4, 0.17, { in: H.thermo, seg: 12 }));
        B.plate(1.3, 0.3, tx(B, "RAILWAY FEVER", "#f4efe2", "#c0353a", 1024, 236), -1.8, 3.15, -0.3, { d: 0.03, edge: "#c0353a" });
        B.lamp(0, 4, 2, "#fff0c8", 6, 9); B.lamp(-1.8, 2.5, 0.6, "#ff6a5a", 2, 4);
      },
      // metaphor: the price of one share — three bars
      chart: (B) => {
        B.set.stage({ floor: "#2a3040", back: "#1f2a3a" });
        H.bars = B.prop.bars3d({ x: 0, z: -0.6, vals: [50 / 120, 1, 20 / 120], cols: ["#4fd18b", "#f2c14e", "#e04a4a"], bw: 0.75, gap: 0.45, h: 2.8 });
        B.plate(3.2, 0.36, tx(B, "ONE Y. & N. MIDLAND SHARE", "#1f2a3a", "#f4efe2", 1024, 115), 0, 3.55, -0.9, { d: 0.02 });
        B.lamp(0, 4, 2.5, "#e8f0ff", 6, 9);
      },
    },
    shots: [
      // 0 · hook: the train storms across the viaduct on frame 0, the camera racing alongside
      { set: "moor", f: 0, light: "golden", cam: (u, lf, f) => { const x = -10 + f * 0.11; return { p: [x - 4.5, DECK + 1.6, 1.5], t: [x + 0.5, DECK + 1.0, -6], fov: 40, roll: 0 }; },
        act: (S, u, f) => { H.train.position.x = -9 + f * 0.11; H.tree.rotation.z = 0.08 * Math.sin(f * 0.2);
          for (let q = 0; q < 6; q++) S.pop("smoke", q * 8, 30, { x: H.train.position.x + 0.9 - 0.6 * q * 0.0, y: DECK + 2.0 + q * 0.05, z: -6, w: 0.9, h: 0.9, rise: 0.8, pop: false });
          S.pop("speed", 2, 40, { x: H.train.position.x - 2, y: DECK + 1.0, z: -5.2, w: 1.6, h: 0.8, pop: false }); } },
      // 1 · Charlotte Brontë begs her sisters
      { set: "parlour", word: [0, "Charlotte"], lead: 3, trans: "whip", light: "lamp", cam: CAM.fit([0, 1.3, -1.1], { w: 3.0, a0: -14, a1: -4, elev: 6, push: 0.1 }),
        act: (S, u, f) => { S.actor("you", { x: 0.0, z: -1.05, expr: "nervous", prop: "point", tilt: 3 * Math.sin(f * 0.4) }); S.actor("emily", { x: -1.05, z: -1.2, expr: "stern", prop: "chin" }); S.actor("anne", { x: 1.05, z: -1.2, expr: "nervous", prop: "hold", flip: true });
          S.fx("label", { x: 0.0, y: 2.35, z: -1.0, w: 1.6, h: 0.3, text: "CHARLOTTE BRONTË", bg: "#f4efe2" }); S.say("Sell!", W(0, "sell") - 4, 30, { x: 0.45, y: AH + 0.6, z: -0.9, w: 0.6, h: 0.36 }); } },
      // 2 · a very good railway: the line in full sun
      { set: "moor", word: [0, "very"], lead: 3, trans: "whip", light: "day", cam: CAM.fit([3.5, DECK + 0.6, -6], { w: 7.5, a0: 6, a1: 12, elev: 4 }),
        act: (S, u, f) => { H.train.position.x = 1 + (f - S.a) * 0.06; S.pop("label", W(0, "good") - 2, 60, { x: 3.5, y: DECK + 2.9, z: -5.4, w: 4.6, h: 0.85, text: "A VERY GOOD RAILWAY", bg: "#ffd84a", hold: true });
          S.pop("stars", W(0, "railway."), 20, { x: H.train.position.x + 1, y: DECK + 2.2, z: -5.6, w: 1.4, h: 1.0 }); } },
      // 3 · imagine you're Charlotte: at the parsonage gate in the wind
      { set: "moor", beat: 1, trans: "dissolve", light: "sunset", cam: CAM.fit([-3.6, 1.3, 5.8], { w: 2.2, a0: -22, a1: -12, elev: 3, push: 0.12 }),
        act: (S, u, f) => { H.tree.rotation.z = 0.12 * Math.sin(f * 0.25); S.actor("youOut", { x: -3.6, z: 5.8, expr: "smile_closed", prop: "hold", tilt: 4 * Math.sin(f * 0.3) });
          S.pop("label", W(1, "Charlotte,") - 2, 50, { x: -3.6, y: AH + 0.5, z: 5.9, w: 0.55, h: 0.22, text: "YOU", bg: "#ffd84a", hold: true });
          for (let q = 0; q < 3; q++) S.pop("speed", S.a + 4 + q * 12, 18, { x: -2.6, y: 1.2 + q * 0.3, z: 6.0, w: 1.0, h: 0.4, pop: false }); } },
      // 4 · a windy Yorkshire parsonage on its hill
      { set: "moor", word: [1, "windy"], lead: 3, light: "sunset", cam: CAM.fit([-6.0, 2.6, 3.5], { w: 7.5, a0: 22, a1: 10, elev: 5 }),
        act: (S, u, f) => { H.tree.rotation.z = 0.16 * Math.sin(f * 0.3); S.fx("label", { x: -6.2, y: 6.4, z: 3.8, w: 3.4, h: 0.6, text: "HAWORTH · 1846", bg: "#f4efe2" });
          for (let q = 0; q < 4; q++) S.pop("puff", S.a + 2 + q * 9, 22, { x: -9 + q * 2.2, y: 3 + q * 0.4, z: 4.5, w: 0.9, h: 0.5, pop: false, rise: 0.3 }); } },
      // 5 · quiet Emily puts the aunt's money into shares
      { set: "parlour", beat: 2, trans: "whip", light: "lamp", cam: CAM.fit([0.05, 1.2, -0.8], { w: 2.2, a0: 14, a1: 6, elev: 8, push: 0.1 }),
        act: (S, u, f) => { S.actor("emily", { x: 0.05, z: -1.15, expr: "smile_closed", prop: "hold" }); S.fx("label", { x: 0.05, y: 2.3, z: -1.1, w: 0.8, h: 0.26, text: "EMILY", bg: "#f4efe2" });
          const m = W(2, "money"); H.coins.forEach((c, i) => { c.visible = f >= m - 4 + i * 2; c.position.y = 0.8 + 0.3 * (1 - E.easeIn(E.prog(f, m - 4 + i * 2, m + 2 + i * 2))); }); S.pop("coin", m - 6, 20, { x: -0.1, y: 1.3, z: -0.4, w: 0.25, h: 0.25, rise: -0.3 }); } },
      // 6 · into the York and North Midland: the share certificate lands on the coins
      { set: "parlour", word: [2, "York"], lead: 3, light: "lamp", steady: true, cam: CAM.fit([-0.1, 0.82, -0.35], { w: 1.0, a0: 0, a1: 0, elev: 62, push: 0.1 }), coc: 11,
        act: (S, u, f) => { const t = W(2, "Railway.") + 2; H.cert.visible = true; H.cert.position.y = 0.8 + 0.5 * (1 - E.easeIn(E.prog(f, S.a, t)));
          S.kick(t, 0.03); S.pop("label", t + 2, 40, { x: -0.1, y: 0.9, z: -0.05, w: 0.95, h: 0.14, text: "YORK & NORTH MIDLAND", bg: "#2f5a3a", hold: true }); } },
      // 7 · railway fever: the steep street rushes to the share office, prices climb
      { set: "village", beat: 3, trans: "whip", light: "day", cam: CAM.fit([0, 1.7, -4.2], { w: 4.2, a0: -10, a1: 4, elev: 5, push: 0.1 }),
        act: (S, u, f) => { H.horse.g.visible = false; const k = Math.floor(E.prog(f, S.a, W(3, "fever.") + 6) * 2.99); H.price["£50"].visible = k === 0; H.price["£80"].visible = k === 1; H.price["£120"].visible = k === 2;
          [["t1", -1.8, -3.0], ["t2", -0.6, -3.6], ["t3", 0.8, -3.2], ["t4", 1.9, -3.8]].forEach(([c, x, z], i) => S.actor(c, { x, z: z - 0.03 * (f - S.a), expr: i % 2 ? "grin" : "laugh", prop: i % 2 ? "up" : "point", mode: "stroll", phase: f * 0.06 + i }));
          S.pop("word", W(3, "fever."), 30, { x: 0, y: 3.4, z: -5.5, w: 2.6, h: 0.7, text: "FEVER!", col: "#ff6a5a" }); S.pop("arrow", S.a + 6, 50, { x: 1.6, y: 2.0, z: -7.2, w: 0.45, h: 0.8, dir: "up", hold: true }); } },
      // 8 · the vicar buys shares
      { set: "village", word: [3, "vicar"], lead: 4, trans: "dissolve", light: "day", cam: CAM.fit([0.2, 1.45, 0.2], { w: 2.3, a0: 14, a1: 4, elev: 3, push: 0.1 }),
        act: (S, u, f) => { S.actor("vicar", { x: 0.35, z: 0.1, expr: "laugh", prop: "up" }); S.fx("label", { x: 0.35, y: 2.45, z: 0.2, w: 0.8, h: 0.26, text: "THE VICAR", bg: "#f4efe2" });
          H.vcert.visible = true; H.vcert.position.set(0.75, 2.0 + 0.04 * Math.sin(f * 0.4), 0.25); S.pop("sparks", W(3, "shares.") - 2, 16, { x: 0.75, y: 2.05, z: 0.4, w: 0.6, h: 0.5 }); } },
      // 9 · his horse looks worried
      { set: "village", word: [3, "His"], lead: 3, light: "day", steady: true, cam: CAM.fit([-0.6, 1.55, -0.6], { w: 1.3, a0: 18, a1: 10, elev: 2, push: 0.12 }), coc: 10,
        act: (S, u, f) => { H.horse.head.rotation.z = 0.08 * Math.sin(f * 0.5); H.horse.pupil.position.x = 0.24 - 0.06 * E.ss(E.prog(f, S.a + 8, S.a + 14));
          S.pop("sweat", W(3, "worried.") - 6, 20, { x: -0.4, y: 2.35, z: -0.5, w: 0.2, h: 0.25, rise: -0.3 }); S.pop("sweat", W(3, "worried.") + 4, 20, { x: -0.25, y: 2.3, z: -0.5, w: 0.18, h: 0.22, rise: -0.3 });
          S.pop("question", W(3, "looks"), 30, { x: -0.1, y: 2.65, z: -0.5, w: 0.25, h: 0.35, hold: true }); } },
      // 10 · "a very good line," you write
      { set: "parlour", beat: 4, trans: "whip", light: "lamp", cam: CAM.fit([0.2, 1.2, -0.8], { w: 2.0, a0: 16, a1: 6, elev: 10, push: 0.12 }),
        act: (S, u, f) => { S.actor("you", { x: 0.15, z: -1.1, expr: "stern", prop: "chin" }); H.quill.position.set(0.35 + 0.04 * Math.sin(f * 0.7), 0.83, -0.45);
          S.say("A very good line…", S.a + 2, 44, { x: 0.65, y: AH + 0.7, z: -0.9, w: 1.3, h: 0.4 }); } },
      // 11 · …but not at these premiums: the board in the street, one hundred and twenty
      { set: "village", word: [4, "but"], lead: 3, trans: "whip", light: "day", steady: true, cam: CAM.fit([0, 1.3, -7.4], { w: 3.2, a0: 0, a1: 0, elev: 2, push: 0.15 }), coc: 10,
        act: (S, u, f) => { H.price["£50"].visible = false; H.price["£120"].visible = true; const t = W(4, "premiums.");
          S.pop("label", t - 2, 40, { x: 0, y: 2.25, z: -7.2, w: 1.7, h: 0.38, text: "PREMIUM!", bg: "#ff6a5a", hold: true }); S.kick(t, 0.04); S.pop("arrow", S.a + 2, 40, { x: 1.55, y: 1.7, z: -7.2, w: 0.35, h: 0.6, dir: "up", hold: true }); } },
      // 12 · so why sell a great railway? the train on the viaduct, Charlotte on the hill
      { set: "moor", beat: 5, trans: "dissolve", light: "golden", cam: CAM.fit([-3.2, 2.4, 1.0], { w: 7.0, a0: 26, a1: 16, elev: 6 }),
        act: (S, u, f) => { H.train.position.x = -5 + (f - S.a) * 0.06; S.actor("youOut", { x: -3.3, z: 4.2, expr: "nervous", prop: "chin", flip: true });
          S.pop("question", W(5, "railway?") - 6, 30, { x: -3.0, y: 2.6, z: 4.2, w: 0.5, h: 0.7, hold: true }); } },
      // 13 · you see: push through into the auction stage — the finest house on your street
      { set: "auction", beat: 6, trans: "zoom", light: K.backdrop("#2f6a6a"), cam: CAM.fit([0, 1.4, -0.6], { w: 4.2, a0: -14, a1: 4, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.villa.rotation.y = 0.15 * Math.sin(f * 0.04); S.actor("auct", { x: -1.45, z: 0.3, expr: "grin", prop: "point" });
          S.pop("sparks", W(6, "finest"), 20, { x: 0, y: 2.3, z: -0.2, w: 1.2, h: 0.8 }); S.pop("label", W(6, "house"), 60, { x: 0, y: 3.25, z: -0.4, w: 2.2, h: 0.4, text: "FINEST ON THE STREET", bg: "#f4efe2", hold: true }); } },
      // 14 · lovely house
      { set: "auction", beat: 7, light: K.backdrop("#2f6a6a"), steady: true, cam: CAM.fit([0.3, 1.5, -0.6], { w: 2.8, a0: 18, a1: 10, elev: 8, push: 0.1 }),
        act: (S, u, f) => { S.pop("heart", S.a + 4, 26, { x: -0.4, y: 2.6, z: -0.2, w: 0.5, h: 0.5, rise: 0.4 }); S.pop("stars", W(7, "house.") - 2, 20, { x: 0.6, y: 2.2, z: 0.0, w: 0.7, h: 0.5 }); } },
      // 15 · at triple the price: the £300 tag slams over the £100
      { set: "auction", word: [7, "triple"], lead: 3, trans: "smash", light: K.backdrop("#2f6a6a"), cam: CAM.fit([1.3, 1.7, -0.5], { w: 1.8, a0: -10, a1: -4, elev: 3, push: 0.1 }), coc: 9,
        act: (S, u, f) => { const t = W(7, "price,"); H.tag300.visible = f >= t - 6; H.tag300.position.y = 1.9 + 1.2 * (1 - E.easeIn(E.prog(f, t - 6, t))); H.tag100.visible = f < t;
          S.kick(t, 0.06); S.pop("word", t, 30, { x: 1.0, y: 2.65, z: -0.3, w: 0.7, h: 0.4, text: "×3", col: "#ffd84a" }); } },
      // 16 · a terrible buy: the buyer gets the keys, his pockets inside out, the house unchanged
      { set: "auction", word: [7, "a", 1], lead: 2, light: K.backdrop("#2f6a6a"), cam: CAM.fit([0.6, 1.2, 0.2], { w: 3.0, a0: 12, a1: 4, elev: 4 }),
        act: (S, u, f) => { H.tag100.visible = false; H.tag300.visible = true; const t = W(7, "buy."); S.actor("buyer", { x: 1.1, z: 0.6, expr: f < t ? "nervous" : "dazed", mode: f < t ? "stand" : "fall", prop: "shrug", flip: true });
          S.kick(t, 0.05); S.pop("impact", t, 18, { x: 1.1, y: 1.0, z: 0.9, w: 0.9, h: 0.7, text: "OOF" }); S.pop("puff", t, 14, { x: 1.1, y: 0.2, z: 0.8, w: 0.9, h: 0.4 }); } },
      // 17 · Emily won't sell
      { set: "parlour", beat: 8, trans: "whip", light: "lamp", cam: CAM.fit([0.05, 1.35, -0.9], { w: 1.8, a0: 12, a1: 6, elev: 3, push: 0.12 }), coc: 9,
        act: (S, u, f) => { S.actor("emily", { x: 0.05, z: -1.15, expr: "stern", prop: "fists" }); S.say("No.", W(8, "won't") - 2, 30, { x: 0.45, y: AH + 0.65, z: -1.0, w: 0.55, h: 0.34 }); } },
      // 18 · so you give in
      { set: "parlour", word: [8, "so"], lead: 3, trans: "dissolve", light: "lamp", cam: CAM.fit([-0.5, 1.3, -0.9], { w: 3.1, a0: 10, a1: 2, elev: 3 }),
        act: (S, u, f) => { S.actor("you", { x: 0.45, z: -1.1, expr: "relief_open", prop: "shrug" }); S.actor("emily", { x: -0.55, z: -1.15, expr: "smile", prop: "hold" }); S.actor("anne", { x: -1.5, z: -1.3, expr: "smile_closed" });
          S.pop("puff", W(8, "give"), 16, { x: 0.65, y: AH + 0.1, z: -0.8, w: 0.4, h: 0.25 }); } },
      // 19 · then the fever breaks: the thermometer bursts
      { set: "throne", beat: 9, trans: "whip", light: K.backdrop("#3a2a5a"), cam: CAM.fit([-1.3, 1.7, -0.2], { w: 3.0, a0: -10, a1: -2, elev: 4 }),
        act: (S, u, f) => { const t = W(9, "breaks,"); H.merc.scale.y = f < t ? 0.9 + 0.1 * Math.sin(f * 0.6) : 0.15; H.merc.position.y = 0.4;
          S.actor("hudson", { x: 0.0, z: 0.35, y: 0.86, expr: f < t ? "grin" : "shock", mode: "sit" }); H.crown.position.set(0, 2.55 + 0.86 - 0.86, 0.35);
          S.kick(t, 0.07); S.pop("impact", t, 20, { x: -1.8, y: 2.6, z: 0.0, w: 1.1, h: 0.9, text: "CRACK!" }); S.pop("sparks", t, 16, { x: -1.8, y: 2.2, z: 0.0, w: 0.8, h: 0.8 }); } },
      // 20 · the Railway King, George Hudson, on his throne of shares
      { set: "throne", word: [9, "Railway"], lead: 3, trans: "cut", light: K.backdrop("#3a2a5a"), cam: CAM.fit([0, 1.9, 0.3], { w: 2.2, a0: 8, a1: 0, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.merc.scale.y = 0.15; S.actor("hudson", { x: 0.0, z: 0.35, y: 0.86, expr: "nervous", mode: "sit", headTilt: 4 * Math.sin(f * 0.3) }); H.crown.position.set(0, 2.55 + 0.86 - 0.04 * Math.sin(f * 0.3), 0.35);
          S.pop("label", W(9, "King,") - 2, 60, { x: 0, y: 3.35, z: 0.6, w: 1.9, h: 0.32, text: "THE RAILWAY KING", bg: "#f2c14e", hold: true });
          S.pop("label", W(9, "George"), 50, { x: 0, y: 0.5, z: 1.0, w: 1.5, h: 0.26, text: "GEORGE HUDSON", bg: "#f4efe2", hold: true }); } },
      // 21 · …falls: the throne of shares collapses, the crown rolls
      { set: "throne", word: [9, "falls."], lead: 6, trans: "smash", light: K.light("danger"), cam: CAM.fit([0, 1.2, 0.3], { w: 3.4, a0: -6, a1: 4, elev: 6 }),
        act: (S, u, f) => { const k = E.easeIn(E.prog(f, S.a, S.a + 12)); H.merc.scale.y = 0.15;
          H.throne.forEach((c, i) => { c.position.x += k * (i - 6) * 0.13; c.position.y = Math.max(0.03 + (i % 3) * 0.06, c.position.y * (1 - k)); c.rotation.z = k * 0.5 * Math.sin(i * 3); });
          H.back.forEach((c, i) => { c.rotation.x = PI / 2 - 0.1 - k * 1.3; c.position.y = Math.max(0.1, c.position.y * (1 - 0.8 * k)); c.position.x = k * (i - 4) * 0.15; });
          S.actor("hudson", { x: 0.2, z: 0.8, y: Math.max(0, 0.86 * (1 - k)), expr: k < 1 ? "shock" : "dazed", mode: k < 1 ? "stand" : "fall" });
          H.crown.position.set(0.9 + 0.4 * k, Math.max(0.12, 3.4 - 3.4 * k), 0.8); H.crown.rotation.z = k * 1.4; const t = S.a + 12;
          S.kick(t, 0.09); S.pop("impact", t, 20, { x: 0, y: 1.4, z: 1.0, w: 1.3, h: 1.0, text: "CRASH!" }); S.pop("stars", t + 2, 22, { x: 0.3, y: 0.7, z: 1.0, w: 0.8, h: 0.5 }); } },
      // 22 · eighteen forty-nine: a cold night, Charlotte writes again
      { set: "parlour", beat: 10, trans: "flash", light: "night", cam: CAM.fit([0.1, 1.25, -0.8], { w: 2.0, a0: -10, a1: -2, elev: 8, push: 0.1 }),
        act: (S, u, f) => { S.actor("you", { x: 0.15, z: -1.1, expr: "nervous", prop: "chin" }); H.quill.position.set(0.35 + 0.04 * Math.sin(f * 0.6), 0.83, -0.45);
          S.fx("label", { x: 0.15, y: 2.35, z: -1.0, w: 0.9, h: 0.32, text: "1849", bg: "#f4efe2" }); } },
      // 23 · issued at fifty pounds
      { set: "chart", word: [10, "issued"], lead: 3, trans: "whip", light: K.backdrop("#1f2a3a"), cam: CAM.fit([0, 1.6, -0.6], { w: 3.6, a0: -12, a1: -4, elev: 5 }),
        act: (S, u, f) => { H.bars.grow([E.back(E.prog(f, W(10, "fifty") - 4, W(10, "fifty") + 8)), 0.004, 0.004]);
          S.pop("label", W(10, "pounds,") - 2, 60, { x: -1.2, y: 1.6, z: -0.3, w: 0.8, h: 0.3, text: "£50", bg: "#f4efe2", hold: true }); } },
      // 24 · once hit one hundred and twenty
      { set: "chart", word: [10, "once"], lead: 3, light: K.backdrop("#1f2a3a"), cam: CAM.fit([0, 2.0, -0.6], { w: 3.8, a0: 4, a1: 10, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.bars.grow([1, E.back(E.prog(f, W(10, "hundred") - 6, W(10, "twenty.") + 2)), 0.004]); S.fx("label", { x: -1.2, y: 1.6, z: -0.3, w: 0.8, h: 0.3, text: "£50", bg: "#f4efe2" });
          S.pop("label", W(10, "twenty."), 40, { x: 0, y: 3.15, z: -0.3, w: 0.9, h: 0.32, text: "£120", bg: "#ffd84a", hold: true }); S.pop("stars", W(10, "twenty."), 18, { x: 0, y: 3.0, z: -0.2, w: 0.9, h: 0.6 }); } },
      // 25 · now they're down at twenty
      { set: "chart", beat: 11, trans: "smash", light: K.light("danger"), cam: CAM.fit([0.6, 1.4, -0.6], { w: 3.2, a0: 14, a1: 8, elev: 5 }),
        act: (S, u, f) => { const t = W(11, "twenty."); H.bars.grow([1, 1, f < t ? 0.004 : E.back(E.prog(f, t, t + 6))]);
          S.fx("label", { x: -1.2, y: 1.6, z: -0.3, w: 0.8, h: 0.3, text: "£50", bg: "#f4efe2" }); S.fx("label", { x: 0, y: 3.15, z: -0.3, w: 0.9, h: 0.32, text: "£120", bg: "#ffd84a" });
          S.kick(t, 0.08); S.pop("label", t, 30, { x: 1.2, y: 0.95, z: -0.2, w: 0.8, h: 0.3, text: "£20", bg: "#ff6a5a", hold: true }); S.pop("arrow", S.a + 2, 40, { x: 1.2, y: 1.8, z: -0.3, w: 0.4, h: 0.7, dir: "down", hold: true }); } },
      // 26 · same tracks: the viaduct at sunset, the line unchanged
      { set: "moor", beat: 12, trans: "whip", light: "sunset", cam: CAM.fit([-2, DECK + 0.4, -6], { w: 9, a0: 10, a1: 4, elev: 4 }),
        act: (S, u, f) => { H.train.position.x = -7 + (f - S.a) * 0.09; H.tree.rotation.z = 0.06 * Math.sin(f * 0.2);
          S.pop("label", W(12, "tracks.") - 2, 30, { x: -2, y: DECK + 2.8, z: -5.4, w: 3.6, h: 0.8, text: "SAME TRACKS", bg: "#f4efe2", hold: true }); } },
      // 27 · same trains: the engine close, steam puffing
      { set: "moor", word: [12, "Same", 1], lead: 2, light: "sunset", cam: (u, lf, f) => { const x = -6 + f * 0.0 + (f - W(12, "Same", 1)) * 0.06; return { p: [x + 4.2, DECK + 1.6, -1.2], t: [x + 1.0, DECK + 1.2, -6], fov: 40, roll: 0 }; },
        act: (S, u, f) => { H.train.position.x = -6 + (f - W(12, "Same", 1)) * 0.06; for (let q = 0; q < 3; q++) S.pop("smoke", S.a + q * 8, 26, { x: H.train.position.x + 0.9, y: DECK + 2.0, z: -6, w: 0.9, h: 0.9, rise: 0.8, pop: false });
          S.pop("label", W(12, "trains.") - 2, 26, { x: H.train.position.x + 2.6, y: DECK + 2.3, z: -5.0, w: 2.2, h: 0.5, text: "SAME TRAINS", bg: "#f4efe2", hold: true }); } },
      // 28 · a very good line: Charlotte by the window
      { set: "parlour", word: [12, "A"], lead: 3, trans: "dissolve", light: "lamp", cam: CAM.fit([-0.6, 1.35, -1.0], { w: 2.0, a0: -18, a1: -10, elev: 3, push: 0.1 }),
        act: (S, u, f) => { S.actor("you", { x: -0.7, z: -1.2, expr: "smile_closed", prop: "hold", look: -0.3 }); S.say("Very good line.", S.a + 2, 34, { x: -0.25, y: AH + 0.65, z: -1.0, w: 1.15, h: 0.36 }); } },
      // 29 · …at a very bad price: the £120 tag slams onto the table
      { set: "parlour", word: [12, "at"], lead: 3, light: "lamp", cam: CAM.fit([0, 1.1, -0.7], { w: 2.4, a0: 8, a1: 2, elev: 10, push: 0.15 }),
        act: (S, u, f) => { const t = W(12, "price."); H.ptag.visible = true; H.ptag.position.y = 0.8 + 1.8 * (1 - E.easeIn(E.prog(f, S.a, t)));
          S.actor("you", { x: -0.2, z: -1.15, expr: f < t ? "nervous" : "shock", prop: f < t ? "hold" : "up" });
          S.kick(t, 0.11); S.pop("impact", t, 24, { x: 0.6, y: 1.25, z: -0.1, w: 1.0, h: 0.8, text: "THUD!" }); S.pop("puff", t, 16, { x: 0.0, y: 0.85, z: -0.3, w: 1.2, h: 0.4 }); } },
    ],
  };
};
