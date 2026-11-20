// "The Worst Stocks in America" (John Templeton, September 1939: 100 shares of every NYSE stock under $1) — film module.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const AH = 1.58;
  const H = {};
  const RAIN = K.light("storm", { sat: 0.8 });
  const CHALK = "#e8ecd8";

  // an open umbrella (canopy + shaft) facing up, optional tilt
  const umbrella = (B, x, y, z, col, s = 1, parent) => {
    const g = B.grp(x, y, z, 0, s, parent);
    B.cone(0.55, 0.32, col, 0, 0.9, 0, { in: g, seg: 10 });
    B.cyl(0.02, 0.02, 0.95, "#3a2418", 0, 0, 0, { in: g });
    B.ball(0.03, "#3a2418", 0, 1.24, 0, { in: g });
    return g;
  };
  // a factory machine with a wheel that spins when busy
  const machine = (B, x, z, col) => {
    B.box(1.4, 1.2, 1.0, "metal:" + col, x, 0, z);
    B.box(0.5, 0.5, 0.5, "metal:#5a5e66", x + 0.3, 1.2, z);
    B.cyl(0.12, 0.12, 0.9, "metal:#4a4e56", x - 0.4, 1.2, z);
    const w = B.dyn(B.grp(x - 0.75, 0.75, z + 0.1, 0, 1));
    B.cyl(0.42, 0.42, 0.08, "metal:#c9a44a", 0, -0.04, 0, { in: w, rz: Math.PI / 2, seg: 10 });
    for (let k = 0; k < 3; k++) { const sp = B.box(0.06, 0.8, 0.06, "#3a3a40", 0, -0.4, 0, { in: w }); sp.rotation.x = (k * Math.PI) / 3; sp.position.y = 0; }
    return w;
  };

  return {
    cast: {
      john: { jacket: "#34446a", pants: "#2e3650", boots: "#1a1418", hat: "hair", hair: "#4a2e1c", skin: "#f5c9a0", buttons: "#c9a44a" },
      broker: { jacket: "#efe9dc", pants: "#3a3d48", boots: "#1a1418", hat: "cap", cap: "#2f7a4a", capColor: "#2f7a4a", skin: "#f0c8a0", moustache: "#5a3a24" },
      c1: { jacket: "#8a3b2a", pants: "#2a2d38", boots: "#1a1418", hat: "bowler", skin: "#f0c8a0" },
      c2: { jacket: "#5a5a3a", pants: "#2a2d38", boots: "#1a1418", hat: "tophat", skin: "#c88a60", moustache: "#2a1a14" },
      shop: { jacket: "#7a3a5a", pants: "#3a3d48", boots: "#2a1a14", hat: "bowler", skin: "#f8d2b4", moustache: "#8a8a8a", build: "stout" },
    },
    sets: {
      // 1939 brokerage board room: a huge green chalk price board, the broker's desk with the phone and a radio
      board: (B) => {
        B.set.room({ style: "bank", w: 9, d: 7, h: 4.2, windows: [], door: false });
        B.box(6.4, 2.4, 0.08, "#1f3a2e", 0, 1.3, -3.42); B.box(6.6, 0.1, 0.2, "#6a4630", 0, 1.22, -3.38);
        B.plate(6.0, 0.4, B.textTex("NEW YORK EXCHANGE · SEPT 1939", "#1f3a2e", CHALK, 1536, 102), 0, 3.42, -3.36, { d: 0.01, edge: "#1f3a2e" });
        const q = ["1/2", "3/8", "7/8", "5/8", "1/4", "3/4", "1/8", "1/2", "7/8", "3/8", "5/8", "1/4"];
        for (let i = 0; i < 12; i++) B.plate(0.9, 0.42, B.textTex(q[i], "#1f3a2e", CHALK, 256, 120), -2.4 + (i % 6) * 0.96, 2.9 - Math.floor(i / 6) * 0.62, -3.36, { d: 0.01, edge: "#1f3a2e" });
        H.under = B.dyn(B.plate(2.8, 0.55, B.textTex("ALL UNDER $1", "#c0353a", "#f4efe2", 1024, 200), 0, 1.75, -3.3, { d: 0.03 })); H.under.visible = false;
        B.prop.desk({ x: 0, z: -0.9, w: 2.0 });
        H.phone = B.prop.phone({ x: 0.55, y: 0.81, z: -0.75 });
        // radio: wooden cabinet with a glowing dial
        B.box(0.5, 0.4, 0.28, "floor:#8a5a34", -0.55, 0.81, -1.0); B.plate(0.3, 0.12, "#ffd27a", -0.55, 1.08, -0.85, { d: 0.01 }); B.cyl(0.05, 0.05, 0.04, "#241726", -0.42, 0.9, -0.85, { rx: Math.PI / 2 });
        H.list = B.dyn(B.grp(0.0, 0.82, -0.6, 0, 1)); B.box(0.5, 0.01, 0.7, "#f4efe2", 0, 0, 0, { in: H.list }); B.plate(0.44, 0.12, B.textTex("BUY 100 EACH", "#f4efe2", "#c0353a", 512, 140), 0, 0.02, -0.27, { in: H.list, d: 0.004, rx: -Math.PI / 2 }); for (let l = 0; l < 9; l++) B.box(0.3 + (l % 3) * 0.04, 0.006, 0.018, "#3a3a48", -0.04, 0.012, -0.17 + l * 0.05, { in: H.list });
        // ticker machine on a stand
        B.cyl(0.06, 0.12, 1.0, "#3a2a1a", 2.6, 0, -2.4); B.cyl(0.22, 0.22, 0.12, "metal:#c9a44a", 2.6, 1.0, -2.4); B.ball(0.2, "glass:#cfe6f5", 2.6, 1.3, -2.4);
        B.prop.lamp({ kind: "hang", x: 0, y: 4.2, z: -0.9, cord: 1.2, glow: "#ffe39a" });
        B.prop.chair({ x: -0.2, z: -1.7 });
      },
      // John's rented room: brick-red wallpaper, a green felt poker table with chips and cards, a TENNESSEE pennant
      den: (B) => {
        B.set.room({ style: "home", wall: "wallpaper:#7a3a3a", floor: "floor:#8a5a34", w: 7, d: 6, h: 3.2, windows: [-1.8], door: false });
        B.cyl(0.9, 0.9, 0.06, "#2f6a3a", 0.3, 0.72, -1.0, { seg: 28 }); B.cyl(0.12, 0.2, 0.72, "#4a2e1c", 0.3, 0, -1.0);
        B.prop.chips({ x: 0.05, y: 0.78, z: -0.8, n: 3 }); B.prop.chips({ x: 0.7, y: 0.78, z: -1.2, n: 2, cols: ["#f2c14e", "#d23a3a"] });
        H.cards = [];
        for (let k = 0; k < 4; k++) H.cards.push(B.dyn(B.plate(0.14, 0.2, B.textTex(["A", "K", "A", "Q"][k], "#f4efe2", k % 2 ? "#241726" : "#c0353a", 128, 182), 0.2 + k * 0.1, 0.79, -0.6, { d: 0.005, rx: -Math.PI / 2, ry: (k - 1.5) * 0.15 })));
        B.plate(1.3, 0.45, B.textTex("TENNESSEE", "#f2c14e", "#5a1a1a", 768, 266), 1.8, 2.3, -2.95, { d: 0.02, edge: "#5a1a1a" });
        B.plate(0.9, 0.36, B.textTex("YALE '34", "#24346a", "#f4efe2", 512, 205), 1.8, 1.75, -2.95, { d: 0.02 });
        B.box(0.6, 0.7, 0.5, "floor:#6a4630", -2.3, 0, -2.4); H.dphone = B.prop.phone({ x: -2.3, y: 0.7, z: -2.3 });
        H.bag = B.prop.moneyBag({ x: -1.1, z: -0.6, size: 0.8 }); H.bag.visible = false;
        H.bagTag = B.dyn(B.plate(0.9, 0.3, B.textTex("BORROWED", "#f4efe2", "#c0353a", 512, 170), -1.1, 1.05, -0.3, { d: 0.02 })); H.bagTag.visible = false;
        B.prop.lamp({ kind: "hang", x: 0.3, y: 3.2, z: -1.0, cord: 0.9, glow: "#ffe39a" });
        B.prop.rug({ x: 0.3, z: -0.6, w: 3, d: 2.4, col: "#5a3a5a" });
      },
      // the junkyard of the worst stocks: a desert lot piled with labelled crates under an EVERYTHING UNDER $1 sign
      junk: (B) => {
        B.set.landscape({ kind: "desert", count: 10, clear: 14, seed: 4 });
        const names = ["RAILROAD", "STEEL", "MOTORS", "MINING", "RUBBER", "OIL", "SHIPPING", "TEXTILE", "TRACTORS", "COPPER", "RADIO", "SUGAR", "LUMBER", "GLASS"];
        H.crates = [];
        for (let i = 0; i < 14; i++) { const row = i < 6 ? 0 : i < 11 ? 1 : 2, col = row === 0 ? i : row === 1 ? i - 6 : i - 11, n = [6, 5, 3][row];
          const x = (col - (n - 1) / 2) * 0.92, y = row * 0.85, z = -2.0 + row * 0.05;
          H.crates.push(B.dyn(B.prop.crate({ x, y, z, size: 0.85, label: names[i], col: ["planks:#a87a4a", "planks:#8a6a4a", "planks:#b8905a"][i % 3] }))); }
        H.stamps = [];
        for (let i = 0; i < 14; i++) { const c = H.crates[i].position; H.stamps.push(B.dyn(B.plate(0.7, 0.24, B.textTex("BANKRUPT", "#c0353a", "#f4efe2", 512, 176), c.x, c.y + 0.3, c.z + 0.45, { d: 0.01, ry: 0 }))); H.stamps[i].rotation.z = (i % 2 ? -0.18 : 0.15); H.stamps[i].visible = false; }
        B.prop.sign({ x: -2.8, z: -3.2, w: 2.0, h: 0.62, text: "EVERYTHING UNDER $1", bg: "#f2c14e", fg: "#5a1a1a", post: true });
        B.prop.barrel({ x: 2.9, z: -1.4 }); B.prop.barrel({ x: 3.3, z: -2.1 }); B.prop.tree({ x: 4.6, z: -5, kind: "bare" });
      },
      // umbrella shop on a dusty main street: drought first, then rain
      shop: (B) => {
        B.ground("dirt", 200, 200, { tile: 4 });
        B.facade({ style: "shop", w: 6, x: 0, z: -5.2, seed: 21, col: "#2f4a7a", floors: 2, sign: "UMBRELLAS" });
        B.facade({ style: "shop", w: 5.6, x: -6.0, z: -5.6, seed: 4, col: "#c0803a", floors: 2, sign: "" });
        B.facade({ style: "shop", w: 5.6, x: 6.0, z: -5.6, seed: 8, col: "#7a3a4a", floors: 3, sign: "" });
        H.umbs = [["stripes:#c0353a:#f4efe2", -1.6], ["#2f5fb5", -0.8], ["stripes:#2f6a4a:#f2c14e", 0.9], ["#f2c14e", 1.7]].map(([c, x]) => B.dyn(umbrella(B, x, 0, -4.4, c, 1)));
        H.tag = B.dyn(B.plate(0.9, 0.5, B.textTex("1¢", "#f4efe2", "#c0353a", 512, 284), 0.05, 0.9, -4.3, { d: 0.03 }));
        H.tag2 = B.dyn(B.plate(0.9, 0.5, B.textTex("$5", "#f4efe2", "#2a6a2a", 512, 284), 0.05, 0.9, -4.28, { d: 0.03 })); H.tag2.visible = false;
        B.cyl(0.03, 0.03, 0.9, "#3a2418", 0.05, 0, -4.3);
        H.weed = B.dyn(B.ball(0.35, "#b8925a", -3, 0.35, -2, { sx: 1, sy: 0.9 }));
        H.drops = []; for (let i = 0; i < 70; i++) { const d = B.dyn(B.box(0.035, 0.5, 0.035, "#e2eefa", 0, 0, 0, { cast: false })); d.visible = false; H.drops.push(d); }
      },
      // the factory: idle and dark, then roaring with orders
      factory: (B) => {
        B.set.room({ style: "factory", w: 11, d: 8, h: 5, windows: [-3, 0, 3], door: false });
        H.wheels = [machine(B, -2.6, -2.2, "#5a7a8a"), machine(B, 0.2, -2.6, "#8a6a3a"), machine(B, 2.9, -2.2, "#6a5a7a")];
        B.box(7, 0.3, 0.8, "metal:#3a3e46", 0, 0.6, -0.6); for (let i = 0; i < 6; i++) B.box(0.1, 0.6, 0.1, "#2a2d36", -3.2 + i * 1.3, 0, -0.6);
        H.belt = []; for (let i = 0; i < 6; i++) H.belt.push(B.dyn(B.box(0.45, 0.35, 0.45, "planks:#a87a4a", -3 + i * 1.2, 0.9, -0.6)));
        B.prop.sign({ x: 0, y: 3.9, z: -3.9, w: 2.6, h: 0.55, text: "IDLE", bg: "#5a5e66", fg: "#e8e4dc" });
        H.open = B.dyn(B.plate(2.6, 0.55, B.textTex("ORDERS IN!", "#2a6a2a", "#f4efe2", 1024, 216), 0, 4.17, -3.8, { d: 0.06 })); H.open.visible = false;
        for (const x of [-3, 0, 3]) B.prop.lamp({ kind: "hang", x, y: 5, z: -1.4, cord: 1.4, glow: "#ffe39a" });
      },
      // metaphor stage: the market mood dial from OPTIMISM to MAXIMUM PESSIMISM, plus the growing bars
      dial: (B) => {
        B.set.stage({ floor: "#efe6d2", back: "#2a1e3a" });
        const cols = ["#4fd18b", "#a8d84f", "#f2c14e", "#f08a3a", "#e0443a"];
        for (let i = 0; i < 5; i++) { const a = Math.PI * (0.9 - i * 0.2); const s = B.box(0.9, 0.5, 0.14, cols[i], Math.cos(a) * 1.7, 1.0 + Math.sin(a) * 1.7 - 0.25, -1.2); s.rotation.z = a - Math.PI / 2; }
        B.plate(1.4, 0.4, B.textTex("OPTIMISM", "#4fd18b", "#1a2a1a", 640, 182), -2.0, 0.6, -1.0, { d: 0.03 });
        B.plate(1.6, 0.36, B.textTex("MAXIMUM", "#e0443a", "#f4efe2", 1024, 230), 2.1, 0.82, -1.0, { d: 0.03 }); B.plate(1.6, 0.36, B.textTex("PESSIMISM", "#e0443a", "#f4efe2", 1024, 230), 2.1, 0.44, -1.0, { d: 0.03 });
        B.cyl(0.18, 0.18, 0.12, "#241726", 0, 1.0, -1.1, { rx: Math.PI / 2 });
        H.needle = B.dyn(B.grp(0, 1.0, -1.0, 0, 1)); B.box(0.08, 1.6, 0.06, "#241726", 0, 0, 0, { in: H.needle });
        B.box(0.9, 1.0, 0.9, "#3a2e4a", 0, 0, -1.2);
        H.bars = B.prop.bars3d({ x: 4.6, z: -1.6, vals: [0.22, 1.0], cols: ["#c8b8a0", "#4fd18b"], bw: 0.8, gap: 0.35, h: 3.0 });
        B.plate(0.9, 0.3, B.textTex("1939", "#f4efe2", "#2a1e3a", 512, 170), 4.0, 0.25, -1.1, { d: 0.02 });
        B.plate(0.9, 0.3, B.textTex("~1943", "#f4efe2", "#2a6a2a", 512, 170), 5.15, 0.25, -1.1, { d: 0.02 });
        H.rocket = B.dyn(B.box(0.8, 3.0, 0.8, "#4fd18b", -4.4, 0, -1.6)); H.rocket.visible = false;
        H.sold = B.dyn(B.prop.crate({ x: -3.2, z: -0.6, size: 0.6, label: "SOLD" })); H.sold.visible = false;
      },
    },
    shots: [
      // 0 · frame 0: the desk phone rattles, the camera rushes in over the radio
      { set: "board", f: 0, light: "interior", cam: CAM.fit([0.3, 1.0, -0.8], { w: 1.4, a0: -22, a1: 4, e0: 26, e1: 10, push: 0.25 }), coc: 11,
        act: (S, u, f) => { H.phone.position.y = 0.81 + 0.03 * Math.abs(Math.sin(f * 1.3)); H.phone.rotation.z = 0.12 * Math.sin(f * 1.7);
          S.pop("label", 4, 40, { x: 0.55, y: 1.45, z: -0.6, w: 0.6, h: 0.22, text: "RING!", col: "#c0353a" });
          S.pop("label", W(0, "war") - 2, 50, { x: -0.55, y: 1.55, z: -0.9, w: 0.9, h: 0.26, text: "WAR IN EUROPE", col: "#3a3a40", hold: true }); } },
      // 1 · a young man ordered: whip to John at his phone in the den, the bubble
      { set: "den", word: [0, "young"], lead: 4, trans: "whip", light: "lamp", cam: CAM.fit([-2.0, 1.25, -2.2], { w: 2.4, a0: 14, a1: 4, elev: 4, push: 0.12 }),
        act: (S, u, f) => { S.actor("john", { x: -1.7, z: -1.9, expr: "grin", prop: "point", look: -0.5 });
          S.say("BUY THE WORST!", W(0, "ordered") - 2, 40, { x: -1.75, y: AH + 0.8, z: -1.6, w: 1.1, h: 0.48 }); } },
      // 2 · the worst stocks in America: smash to the junkyard of crates
      { set: "junk", word: [0, "worst"], lead: 2, trans: "smash", light: "desert", cam: CAM.fit([0, 1.4, -2.0], { w: 6.2, a0: -10, a1: 4, elev: 8, push: 0.12 }),
        act: (S, u, f) => { S.pop("impact", W(0, "America.") - 2, 30, { x: 0, y: 3.2, z: -1.6, w: 2.4, h: 0.8, text: "THE WORST" }); } },
      // 3 · every stock on the New York exchange under one dollar: the chalk board, ALL UNDER $1 slams on
      { set: "board", beat: 1, trans: "whip", light: "interior", steady: true, cam: CAM.fit([0, 2.3, -3.4], { w: 4.4, a0: 8, a1: -4, elev: 0, push: 0.12 }), coc: 9,
        act: (S, u, f) => { H.under.visible = f >= W(1, "under") - 1; S.kick(W(1, "under"), 0.05);
          S.pop("label", W(1, "New") - 2, 40, { x: -1.6, y: 3.8, z: -3.0, w: 1.2, h: 0.32, text: "NYSE", col: "#2a4a3a" }); } },
      // 4 · a hundred shares of each: the broker stamps order after order, OF EACH?!
      { set: "board", word: [1, "A"], lead: 3, trans: "cut", light: "interior", cam: CAM.fit([0, 1.2, -1.1], { w: 2.2, a0: -14, a1: -4, elev: 8, push: 0.12 }),
        act: (S, u, f) => { S.actor("broker", { x: -0.1, z: -1.55, expr: f >= W(1, "each.") ? "shock" : "nervous", prop: "hold" }); H.list.position.y = 0.82 + 0.02 * Math.sin(f * 0.6);
          for (let q = 0; q < 4; q++) S.pop("label", W(1, "hundred") + q * 6, 30, { x: -0.8 + q * 0.5, y: 2.3 + (q % 2) * 0.2, z: -1.3, w: 0.5, h: 0.24, text: "×100", col: "#2f5fb5", pop: q === 0 });
          S.say("OF EACH?!", W(1, "each.") - 2, 28, { x: 0.8, y: AH + 0.55, z: -1.3, w: 0.9, h: 0.42, tail: "left" }); } },
      // 5 · imagine you're his broker, reading that list: close on the broker
      { set: "board", beat: 2, trans: "dissolve", light: K.light("interior", { hemi: 1.5 }), cam: CAM.fit([-0.1, 1.45, -1.55], { w: 1.3, a0: 10, a1: 2, elev: 4, push: 0.14 }), coc: 10,
        act: (S, u, f) => { S.actor("broker", { x: -0.1, z: -1.55, expr: "nervous", prop: "paper" });
          S.pop("label", W(2, "you're") - 2, 40, { x: -0.65, y: AH + 0.45, z: -1.3, w: 0.6, h: 0.26, text: "YOU", col: "#2f7a4a", hold: true }); S.fx("sweat", { x: 0.2, y: AH + 0.1, z: -1.3, w: 0.18, h: 0.18 }); } },
      // 6 · a hundred and four companies: insert on the order slip, the count
      { set: "board", beat: 3, trans: "cut", light: "interior", steady: true, cam: CAM.fit([0, 0.85, -0.6], { w: 1.0, a0: -4, a1: 6, elev: 60, push: 0.14 }), coc: 12,
        act: (S, u, f) => { S.pop("impact", W(3, "four") - 1, 34, { x: 0, y: 1.05, z: -0.6, w: 0.8, h: 0.45, text: "104" }); } },
      // 7 · thirty-four already bankrupt: whip to the crates, BANKRUPT stamps slam one by one
      { set: "junk", word: [3, "Thirty-four"], lead: 3, trans: "whip", light: K.light("desert", { sat: 0.95 }), cam: CAM.fit([0, 1.1, -2.0], { w: 4.6, a0: 12, a1: 2, elev: 6, push: 0.14 }),
        act: (S, u, f) => { const t0 = W(3, "Thirty-four"); H.stamps.forEach((s, i) => { s.visible = f >= t0 + i * 3; }); for (let q = 0; q < 3; q++) S.kick(t0 + q * 12, 0.04);
          S.pop("impact", W(3, "bankrupt.") - 1, 30, { x: 0, y: 3.0, z: -1.6, w: 2.2, h: 0.8, text: "34 BANKRUPT" }); } },
      // 8 · the buyer is John Templeton: dissolve to the den, name card
      { set: "den", beat: 4, trans: "dissolve", light: "lamp", cam: CAM.fit([0.3, 1.25, -1.2], { w: 2.6, a0: -12, a1: -2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("john", { x: -0.3, z: -1.95, expr: "smile", prop: "chin" });
          S.pop("label", W(4, "John") - 2, 46, { x: -0.3, y: AH + 0.45, z: -1.6, w: 1.4, h: 0.3, text: "JOHN TEMPLETON", col: "#34446a", hold: true });
          S.pop("label", W(4, "Tennessean") - 2, 30, { x: 0.9, y: AH + 0.05, z: -1.5, w: 1.0, h: 0.28, text: "AGE 26", col: "#8a5a34" }); } },
      // 9 · paid for college with poker winnings: insert on the felt, aces flip, chips
      { set: "den", word: [4, "paid"], lead: 3, trans: "whip", light: "lamp", steady: true, cam: CAM.fit([0.4, 0.8, -0.8], { w: 1.4, a0: 10, a1: -4, elev: 40, push: 0.14 }), coc: 12,
        act: (S, u, f) => { H.cards.forEach((c, i) => { c.position.y = 0.79 + 0.05 * E.prog(f, S.a + i * 4, S.a + i * 4 + 6) * (1 - E.prog(f, S.a + i * 4 + 6, S.a + i * 4 + 12)); });
          S.pop("label", W(4, "college") - 2, 30, { x: 1.0, y: 1.25, z: -1.0, w: 0.8, h: 0.24, text: "YALE", col: "#24346a" }); S.pop("coin", W(4, "winnings.") - 2, 24, { x: 0.3, y: 1.1, z: -0.8, w: 0.25, h: 0.25, rise: 0.4 }); } },
      // 10 · and he's buying with borrowed money: John hefts the BORROWED bag
      { set: "den", beat: 5, trans: "cut", light: "lamp", cam: CAM.fit([-0.7, 1.2, -1.0], { w: 2.6, a0: 12, a1: 2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.bag.visible = true; H.bagTag.visible = f >= W(5, "borrowed") - 2; S.actor("john", { x: -0.2, z: -1.4, expr: "stern", prop: "fists" });
          S.pop("dollar", W(5, "money,") - 2, 24, { x: -1.1, y: 1.4, z: -0.5, w: 0.3, h: 0.3, rise: 0.5 }); } },
      // 11 · while everyone else sells: whip to the board room, clerks running out with SELL
      { set: "board", word: [5, "while"], lead: 3, trans: "whip", light: K.light("storm", { sat: 0.85 }), cam: CAM.fit([-0.2, 1.4, -0.1], { w: 3.0, a0: -14, a1: -4, elev: 4, push: 0.12 }),
        act: (S, u, f) => { const t = f - S.a; S.actor("c1", { x: -1.6 + t * 0.04, z: 0.2, mode: "march", side: true, phase: f * 0.13, expr: "shock" }); S.actor("c2", { x: -0.6 + t * 0.04, z: -0.2, mode: "march", side: true, phase: f * 0.13 + 1, expr: "nervous" });
          S.say("SELL!", W(5, "sells.") - 4, 30, { x: -0.6, y: AH + 0.7, z: 0, w: 0.8, h: 0.42, tail: "left" }); for (let q = 0; q < 3; q++) S.pop("paper", S.a + 4 + q * 5, 26, { x: -1 + q, y: 2.4, z: 0.2, w: 0.35, h: 0.45, rise: -1.0, spin: 2, pop: q === 0 }); } },
      // 12 · so why buy bankrupt companies in a war? the broker at night, question marks
      { set: "board", beat: 6, trans: "whip", light: K.light("night", { hemi: 1.45 }), cam: CAM.fit([-0.1, 1.35, -1.55], { w: 1.8, a0: -10, a1: 2, elev: 4, push: 0.14 }),
        act: (S, u, f) => { S.actor("broker", { x: -0.1, z: -1.55, expr: "nervous", prop: "shrug" });
          S.pop("question", W(6, "why") - 2, 50, { x: 0.55, y: AH + 0.45, z: -1.3, w: 0.3, h: 0.45, hold: true }); S.pop("question", W(6, "war?") - 4, 30, { x: -0.75, y: AH + 0.35, z: -1.3, w: 0.26, h: 0.4 }); } },
      // 13 · you see, an umbrella shop in a drought: push-through into the dusty street
      { set: "shop", beat: 7, trans: "zoom", light: K.light("desert", { sat: 1.25 }), cam: CAM.fit([0.3, 1.6, -4.2], { w: 5.6, a0: 10, a1: 0, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("shop", { x: 2.1, z: -3.5, expr: "dazed", prop: "chin" }); H.weed.position.x = -3 + 0.05 * (f - S.a); H.weed.rotation.z = -0.1 * (f - S.a);
          S.pop("label", W(7, "drought") - 2, 40, { x: -1.4, y: 3.9, z: -4.0, w: 1.3, h: 0.34, text: "DROUGHT", col: "#c8784a", hold: true }); } },
      // 14 · sells for pennies: insert on the 1¢ tag
      { set: "shop", word: [7, "sells"], lead: 3, trans: "cut", light: K.light("desert", { sat: 1.25 }), steady: true, cam: CAM.fit([0.05, 1.0, -4.3], { w: 1.4, a0: -6, a1: 6, elev: 4, push: 0.14 }), coc: 11,
        act: (S, u, f) => { S.pop("coin", W(7, "pennies.") - 2, 26, { x: -0.3, y: 1.2, z: -4.0, w: 0.25, h: 0.25, rise: 0.4 }); S.pop("coin", W(7, "pennies.") + 3, 26, { x: 0.4, y: 1.1, z: -4.0, w: 0.22, h: 0.22, rise: 0.4, pop: false }); } },
      // 15 · nobody wants it: the shopkeeper asleep, zz
      { set: "shop", beat: 8, trans: "dissolve", light: K.light("desert", { sat: 1.1 }), cam: CAM.fit([2.2, 1.3, -4.0], { w: 2.2, a0: 14, a1: 4, elev: 4, push: 0.12 }),
        act: (S, u, f) => { S.actor("shop", { x: 2.4, z: -4.0, expr: "dazed", prop: "chin", headTilt: 0.2 }); S.fx("zz", { x: 2.9, y: AH + 0.5, z: -3.8, w: 0.3, h: 0.3, t: (f % 40) / 40 }); } },
      // 16 · then it rains: smash to the storm, rain falls, the price jumps
      { set: "shop", word: [8, "Then"], lead: 1, trans: "smash", light: RAIN, cam: CAM.fit([0.9, 1.5, -3.8], { w: 4.0, a0: -10, a1: 2, elev: 6, push: 0.14 }),
        act: (S, u, f) => { H.drops.forEach((d, i) => { d.visible = true; const ph = ((f * 0.9 + i * 13.7) % 30) / 30; d.position.set(-3 + ((i * 37) % 70) / 70 * 7, 5 - ph * 5, -5.5 + ((i * 53) % 70) / 70 * 4); });
          const up = f >= W(8, "rains.") - 1; H.tag.visible = !up; H.tag2.visible = up; S.actor("shop", { x: 2.0, z: -3.4, expr: up ? "laugh" : "shock", prop: "up" });
          S.pop("impact", W(8, "rains.") - 1, 30, { x: -0.6, y: 2.6, z: -3.6, w: 1.4, h: 0.7, text: "SOLD OUT!" }); S.kick(W(8, "rains."), 0.06); } },
      // 17 · the war was the rain: whip to the dark idle factory
      { set: "factory", beat: 9, trans: "whip", light: K.light("night", { hemi: 1.3 }), cam: CAM.fit([0, 1.8, -1.8], { w: 7.0, a0: -10, a1: 0, elev: 8, push: 0.12 }),
        act: (S, u, f) => { S.pop("label", W(9, "war") - 2, 40, { x: -2.2, y: 3.4, z: -2.0, w: 1.2, h: 0.36, text: "1939", col: "#3a3a40", hold: true }); } },
      // 18 · idle factories filled with orders: lights up, wheels spin, orders rain in
      { set: "factory", word: [9, "Idle"], lead: 2, trans: "cut", light: (u) => K.mixLight(K.light("night", { hemi: 1.3 }), K.light("interior"), E.prog(u, 0.25, 0.55)), cam: CAM.fit([0, 1.6, -1.4], { w: 5.2, a0: 12, a1: 2, elev: 6, push: 0.14 }),
        act: (S, u, f) => { const on = E.prog(f, W(9, "filled") - 6, W(9, "filled") + 4); H.wheels.forEach((w, i) => { w.rotation.x = on * (f * 0.3 + i); }); H.belt.forEach((b, i) => { b.position.x = -3 + i * 1.2 + on * ((f * 0.04) % 1.2); });
          H.open.visible = f >= W(9, "orders.") - 2; for (let q = 0; q < 5; q++) S.pop("page", W(9, "orders.") - 4 + q * 3, 30, { x: -2 + q, y: 3.2, z: -1.0, w: 0.4, h: 0.5, rise: -1.4, spin: 1.5, pop: q === 0 });
          S.pop("smoke", W(9, "filled"), 40, { x: 0.2, y: 2.2, z: -2.6, w: 1.2, h: 1.0 }); } },
      // 19 · within about four years: the junkyard at golden hour, the crates gleam
      { set: "junk", beat: 10, trans: "flash", light: K.light("golden", { sat: 1.25 }), cam: CAM.fit([0, 1.4, -2.0], { w: 5.0, a0: 12, a1: 2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.stamps.forEach((s) => (s.visible = false)); S.pop("label", W(10, "four") - 2, 40, { x: -1.5, y: 3.2, z: -1.6, w: 1.2, h: 0.36, text: "4 YEARS", col: "#2a6a2a", hold: true });
          S.pop("glow", W(10, "junk") - 2, 40, { x: 0, y: 1.3, z: -1.5, w: 4, h: 2.4 }); } },
      // 20 · up roughly four hundred percent: the stage bars grow, +400%
      { set: "dial", word: [10, "up"], lead: 3, trans: "whip", light: K.backdrop("#2a1e3a"), cam: CAM.fit([4.6, 1.6, -1.6], { w: 3.4, a0: -10, a1: 2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.bars.grow([1, E.prog(f, S.a, W(10, "percent.")) ]); S.pop("impact", W(10, "percent.") - 1, 34, { x: 5.1, y: 3.6, z: -1.2, w: 1.3, h: 0.6, text: "≈+400%", hold: true }); S.kick(W(10, "percent."), 0.05); } },
      // 21 · only four of those companies ended up worthless: back at the pile, four crates crumble
      { set: "junk", beat: 11, trans: "whip", light: K.light("golden", { sat: 1.15 }), cam: CAM.fit([0, 1.2, -2.0], { w: 4.8, a0: -12, a1: -2, elev: 8, push: 0.12 }),
        act: (S, u, f) => { const hit = W(11, "worthless.") - 2; [0, 5, 9, 13].forEach((i, q) => { const k = E.prog(f, hit + q * 2, hit + q * 2 + 8); H.crates[i].scale.y = 1 - 0.85 * k; if (k > 0) S.pop("puff", hit + q * 2, 20, { x: H.crates[i].position.x, y: H.crates[i].position.y + 0.3, z: -1.4, w: 0.7, h: 0.5, pop: q === 0 }); });
          S.pop("impact", W(11, "four") - 1, 40, { x: 0, y: 3.3, z: -1.6, w: 1.6, h: 0.7, text: "ONLY 4" }); } },
      // 22 · he called it buying at the point of maximum pessimism: the mood dial, John points
      { set: "dial", beat: 12, trans: "dissolve", light: K.backdrop("#2a1e3a"), cam: CAM.fit([0.4, 1.4, -0.8], { w: 4.8, a0: -10, a1: 2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.needle.rotation.z = 1.2 - 2.4 * E.prog(f, W(12, "point") - 6, W(12, "maximum")); S.actor("john", { x: -0.9, z: 1.0, expr: "grin", prop: "point", look: 0.6 }); } },
      // 23 · pessimism: insert on the red end of the dial, BUY slams
      { set: "dial", word: [12, "maximum"], lead: 2, trans: "cut", light: K.backdrop("#3a1e2a"), steady: true, cam: CAM.fit([2.0, 0.95, -1.0], { w: 3.6, a0: 4, a1: -2, elev: 2, push: 0.06 }), coc: 10,
        act: (S, u, f) => { H.needle.rotation.z = -1.2 + 0.03 * Math.sin(f * 1.4); S.pop("impact", W(12, "pessimism.") + 2, 34, { x: 2.0, y: 1.7, z: -0.8, w: 1.0, h: 0.55, text: "BUY" }); S.kick(W(12, "pessimism.") + 2, 0.05); } },
      // 24 · and years later, his one regret? John alone in the lamplit den, thinking
      { set: "den", beat: 13, trans: "dissolve", light: K.light("lamp", { sat: 0.85 }), cam: CAM.fit([-0.2, 1.45, -1.95], { w: 2.0, a0: 12, a1: 2, elev: 4, push: 0.12 }),
        act: (S, u, f) => { S.actor("john", { x: -0.3, z: -1.95, expr: "nervous", prop: "chin" });
          S.pop("label", W(13, "years") - 2, 40, { x: 0.2, y: AH + 0.55, z: -1.7, w: 0.95, h: 0.26, text: "YEARS LATER", col: "#5a3a5a", hold: true }); S.pop("question", W(13, "regret?") - 2, 30, { x: -0.95, y: AH + 0.4, z: -1.7, w: 0.26, h: 0.4 }); } },
      // 25 · he sold too soon: on the stage John hands off the SOLD crate, the bar rockets past him on the last word
      { set: "dial", beat: 14, trans: "whip", light: K.light("golden", { sat: 1.1 }), cam: CAM.fit([-3.8, 1.6, -0.9], { w: 3.4, a0: -12, a1: -4, e0: 6, e1: 14, push: 0.12 }),
        act: (S, u, f) => { const hit = W(14, "soon.") + 1; H.sold.visible = true; H.sold.position.x = -2.5 + 0.6 * E.prog(f, S.a, hit - 8); H.sold.position.z = 0.4; H.rocket.visible = true;
          const k = E.prog(f, hit - 4, hit + 14); H.rocket.scale.y = 0.15 + 3.0 * k; H.rocket.position.y = 0;
          S.actor("john", { x: -3.2, z: 0.6, expr: f >= hit ? "shock" : "smile", prop: f >= hit ? "up" : "hold", look: -0.5 });
          S.pop("impact", hit, 36, { x: -4.3, y: 3.2, z: -1.0, w: 1.6, h: 0.8, text: "TOO SOON!" }); S.kick(hit, 0.12); S.pop("stars", hit + 3, 24, { x: -4.4, y: 2.4, z: -1.0, w: 1.2, h: 0.6 }); } },
    ],
  };
};
