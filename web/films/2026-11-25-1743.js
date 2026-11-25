// "The Darts Never Got a Fan Club" (the Wall Street Journal Investment Dartboard, 1988-2002: pros vs darts thrown at
// stock tables on the office wall, 87 wins of 142, the publicity effect of printing the pros' picks) — film module.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const H = {};
  const PI = Math.PI;
  const tt = (B, s, bg, fg, pw, ph) => B.textTex(s, bg, fg, 1024, Math.round((1024 * ph) / pw));
  const hide = (o) => { o.visible = false; if (o.userData && o.userData.base) o.userData.base.v = false; return o; };
  const ARENA = K.backdrop("#22305a");
  const GOLD = "#d8a93a";

  // a dart pointing along -z (tip at z≈-0.14), origin at the barrel's front end
  const dart = (B, x, y, z, s = 1, parent, col = "#c0353a") => {
    const g = B.grp(x, y, z, 0, s, parent);
    B.cyl(0.04, 0.04, 0.4, "metal:#c9ccd2", 0, -0.2, 0.2, { in: g, rx: PI / 2, seg: 10 });
    B.cyl(0.015, 0.015, 0.3, "#2a2d36", 0, -0.15, 0.52, { in: g, rx: PI / 2, seg: 6 });
    const tip = B.cone(0.035, 0.16, "#8a8f96", 0, 0, 0, { in: g, seg: 8 }); tip.position.set(0, 0, -0.06); tip.rotation.x = -PI / 2;
    B.box(0.3, 0.02, 0.22, col, 0, -0.01, 0.66, { in: g }); B.box(0.02, 0.3, 0.22, col, 0, -0.15, 0.66, { in: g });
    return B.dyn(g);
  };
  // a dartboard facing +z, origin at the floor between its legs; board centre at local y = 1.5
  const board = (B, x, y, z, ry = 0, s = 1) => {
    const g = B.grp(x, y, z, ry, s);
    for (const sx of [-0.35, 0.35]) B.box(0.08, 1.5, 0.08, "#3a3a40", sx, 0, -0.12, { in: g });
    B.cyl(0.82, 0.82, 0.12, "#2a1a14", 0, 1.5 - 0.06, 0, { in: g, rx: PI / 2, seg: 32 });
    [["#1e1e22", 0.74], ["#efe3c4", 0.62], ["#c0353a", 0.5], ["#efe3c4", 0.38], ["#2f8a4a", 0.26], ["#efe3c4", 0.16], ["#c0353a", 0.07]].forEach(([c, r], i) =>
      B.cyl(r, r, 0.02, c, 0, 1.5 - 0.01, 0.065 + i * 0.006, { in: g, rx: PI / 2, seg: 32 }));
    return B.dyn(g);
  };
  // a blindfolded cartoon monkey (origin at its feet); returns {g, arm}
  const monkey = (B, x, z, s = 1) => {
    const g = B.grp(x, 0, z, 0, s); const fur = "#7a4a2a", skin = "#e8c8a0";
    for (const sx of [-0.13, 0.13]) B.cyl(0.07, 0.08, 0.38, fur, sx, 0, 0, { in: g });
    B.ball(0.3, fur, 0, 0.62, 0, { in: g, sy: 1.15 }); B.ball(0.19, "#d8b088", 0, 0.6, 0.15, { in: g, sy: 1.1 });
    B.ball(0.27, fur, 0, 1.12, 0, { in: g }); B.ball(0.18, skin, 0, 1.06, 0.16, { in: g, sy: 0.85 });
    for (const sx of [-1, 1]) { B.ball(0.1, fur, sx * 0.28, 1.17, 0, { in: g }); B.ball(0.06, skin, sx * 0.3, 1.17, 0.04, { in: g }); }
    B.cyl(0.285, 0.285, 0.1, "#c0353a", 0, 1.13, 0, { in: g, seg: 20 });
    B.box(0.12, 0.08, 0.04, "#c0353a", 0.1, 1.12, -0.29, { in: g }); B.box(0.12, 0.08, 0.04, "#c0353a", -0.1, 1.12, -0.29, { in: g });
    B.box(0.12, 0.025, 0.02, "#3a1a10", 0, 0.99, 0.32, { in: g });
    B.cyl(0.05, 0.05, 0.42, fur, -0.33, 0.42, 0.02, { in: g }).rotation.z = -0.35;
    const arm = B.dyn(B.grp(0.3, 0.85, 0.02, 0, 1, g)); B.cyl(0.05, 0.05, 0.42, fur, 0, 0, 0, { in: arm }); B.ball(0.07, fur, 0, 0.44, 0, { in: arm });
    H.mdart = dart(B, 0, 0.48, 0.05, 0.7, arm); H.mdart.rotation.x = -PI / 2; H.mdart.userData.base.r.copy(H.mdart.rotation);
    return { g: B.dyn(g), arm };
  };
  // a newspaper stock-table page (canvas texture, deterministic)
  const stockTex = (B, seed) => {
    const cv = document.createElement("canvas"); cv.width = 512; cv.height = 700; const c = cv.getContext("2d");
    c.fillStyle = "#f2ede0"; c.fillRect(0, 0, 512, 700); c.fillStyle = "#241726"; c.font = "bold 54px sans-serif"; c.fillText("STOCKS", 26, 66);
    c.fillRect(20, 84, 472, 5); c.font = "22px monospace"; let r = seed * 9301 + 49297;
    const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
    for (let row = 0; row < 22; row++) for (let col = 0; col < 2; col++) {
      let tk = ""; for (let k = 0; k < 3 + Math.floor(rnd() * 2); k++) tk += String.fromCharCode(65 + Math.floor(rnd() * 26));
      const px = (10 + rnd() * 80).toFixed(1); c.fillStyle = "#3a3a44"; c.fillText(tk.padEnd(5, " ") + px.padStart(5, " "), 24 + col * 244, 122 + row * 26);
    }
    const t = new B.THREE.CanvasTexture(cv); t.colorSpace = B.THREE.SRGBColorSpace; return t;
  };
  const showStuck = (on) => H.stuck && H.stuck.forEach((d, i) => (d.visible = on > i));

  return {
    cast: {
      you: { jacket: "#24345e", pants: "#24283a", boots: "#1a1418", hat: "hair", hair: "#3a2a1a", skin: "#f2c9a4", buttons: "#f4efe2" },
      dot: { jacket: "#c84a6a", pants: "#3a3a48", boots: "#2a1a12", hat: "hair", hair: "#a8452a", skin: "#e8b48a", dress: "#c84a6a" },
      ed: { jacket: "#e8e4dc", pants: "#4a4a52", boots: "#2a1a12", hat: "hair", hair: "#9a9a9a", moustache: "#8a8a8a", skin: "#f0c4a2", build: "stout" },
      critic: { jacket: "#5a2a4a", pants: "#2a2a30", boots: "#121216", hat: "bowler", moustache: "#3a2a1a", skin: "#d9a27a", buttons: GOLD },
      r1: { jacket: "#3f7fc0", pants: "#2a3a5a", boots: "#f4f4f4", hat: "cap", cap: "#e2453c", skin: "#c98a5a" },
      r2: { jacket: "#4f9a5a", pants: "#3a3a40", boots: "#2a1a12", hat: "hair", hair: "#1a1a1a", dress: "#4f9a5a", skin: "#f5d6b8" },
      r3: { jacket: "#d08a2a", pants: "#3a3a30", boots: "#2a1a12", hat: "beanie", cap: "#2f4a7a", skin: "#8a5a3a" },
      r4: { jacket: "#7a6a9a", pants: "#2a2a30", boots: "#1a1418", hat: "hair", hair: "#d8c8a0", skin: "#f2c9a4" },
    },
    sets: {
      // a boxing ring in a dark arena: the pro in one corner, a giant dartboard in the other, a scoreboard above
      ring: (B) => {
        B.set.stage({ floor: "#2a2440", back: "#22305a" });
        B.box(6, 0.6, 6, "#e8e4dc", 0, 0, -1); B.box(6.2, 0.45, 6.2, "#c0353a", 0, 0, -1);
        for (const [x, z, c] of [[-2.9, -3.9, "#c0353a"], [2.9, -3.9, "#2f5fb5"], [-2.9, 1.9, "#e8e4dc"], [2.9, 1.9, "#e8e4dc"]]) {
          B.cyl(0.08, 0.08, 1.7, "metal:#c9ccd2", x, 0.6, z); B.box(0.3, 0.9, 0.3, c, x, 1.0, z); }
        for (const [i, c] of [[0, "#c0353a"], [1, "#f4efe2"], [2, "#2f5fb5"]]) { const y = 1.15 + i * 0.4;
          B.cyl(0.03, 0.03, 5.8, c, 0, y - 2.9, -3.9, { rz: PI / 2, seg: 6 });
          for (const sx of [-2.9, 2.9]) B.cyl(0.03, 0.03, 5.8, c, sx, y - 2.9, -1, { rx: PI / 2, seg: 6 }); }
        H.board = board(B, 1.3, 0.6, -2.1, -0.25);
        H.bdart = hide(dart(B, 0, 0, 0, 1.6));
        // scoreboard
        B.box(4.8, 2.0, 0.3, "#1a1a22", 0, 3.5, -6.6); B.plate(3.2, 0.45, tt(B, "CONTESTS", "#1a1a22", "#ffd84a", 3.2, 0.45), 0, 5.1, -6.42, { d: 0.02, edge: "#1a1a22" });
        H.nums = ["1", "36", "71", "107", "142"].map((n) => hide(B.dyn(B.plate(1.8, 0.95, tt(B, n, "#1a1a22", "#f4efe2", 1.8, 0.95), 0, 4.3, -6.4, { d: 0.02, edge: "#1a1a22" }))));
        H.won = hide(B.dyn(B.plate(4.4, 0.95, tt(B, "PROS WON 87", "#1a1a22", "#4fd18b", 4.4, 0.95), 0, 4.3, -6.38, { d: 0.02, edge: "#1a1a22" })));
        for (let i = 0; i < 12; i++) B.ball(0.06, "#fff2b0", -2.3 + i * 0.42, 4.55, -6.44, { cast: false });
        // the result bars
        H.bars = B.prop.bars3d({ x: 0, y: 0.6, z: -0.9, vals: [1, 0.343], cols: ["#4fd18b", "#ff6a5a"], bw: 0.9, gap: 1.0, h: 2.6 }); hide(H.bars);
        H.boost = hide(B.dyn(B.box(0.96, 0.55, 0.96, "#ffd84a", -0.95, 0.6 + 2.05, -0.9)));
        B.lamp(0, 6, 3, "#fff0d8", 7, 16); B.lamp(-3, 4, 1, "#c8d8ff", 3, 10); B.lamp(0, 5, -5, "#ffd84a", 3, 9);
      },
      // a jungle clearing: the old book's joke — a blindfolded monkey, a dart, a stock page nailed to a palm
      jungle: (B) => {
        B.set.landscape({ kind: "forest", seed: 41, clear: 7, count: 30 });
        for (const [x, z] of [[-3.2, -3.4], [3.4, -4.2], [-5, -1.5], [5.5, -1.0]]) B.prop.tree({ x, z, kind: "palm" });
        B.prop.tree({ x: 1.5, z: -2.6, kind: "palm" });
        H.page = B.plate(0.7, 0.95, stockTex(B, 3), 1.5, 1.6, -2.38, { d: 0.02, edge: "#c8b890" });
        for (const [x, z] of [[-1.8, -2.2], [2.6, -1.2]]) B.prop.bush({ x, z, col: "#3f8a3a" });
        B.cyl(0.42, 0.48, 0.55, "bark", -1.6, 0, -1.4, { seg: 12 }); B.cyl(0.38, 0.38, 0.02, "#c8a070", -1.6, 0.55, -1.4, { seg: 12 });
        H.book = B.dyn(B.grp(-1.6, 0.57, -1.4, 0.3, 1)); B.box(0.7, 0.12, 0.5, "#8a2030", 0, 0, 0, { in: H.book }); B.box(0.64, 0.03, 0.46, "#fbf3dc", 0, 0.12, 0, { in: H.book });
        B.plate(0.5, 0.16, tt(B, "1973", "#fbf3dc", "#8a2030", 0.5, 0.16), 0, 0.16, 0, { in: H.book, d: 0.005, rx: -PI / 2 });
        H.mk = monkey(B, -0.4, -1.0, 1.1);
        H.jdart = hide(dart(B, 0, 0, 0, 0.9));
        B.lamp(0, 4, 3, "#fff0c8", 4, 12);
      },
      // the newsroom, New York 1988: desks with beige monitors, stock tables pinned to the back wall
      newsroom: (B) => {
        B.set.room({ style: "office", wall: "plaster:#d8dcd0", floor: "carpet:#5a6a7a", w: 10, d: 8, h: 3.4, windows: [-3.6], door: false });
        H.pages = [-1.4, 0, 1.4].map((x, i) => B.plate(1.15, 1.55, stockTex(B, 7 + i), x, 1.75, -3.97, { d: 0.02, edge: "#c8b890" }));
        B.prop.sign({ x: 0, y: 2.62, z: -3.95, text: "DARTBOARD CONTEST", w: 3.4, h: 0.42, bg: "#241726", fg: "#ffd84a", edge: "#241726" });
        H.stuck = [[-0.15, 2.0], [-1.5, 1.4], [1.25, 2.1], [0.3, 1.2]].map(([x, y]) => hide(dart(B, x, y, -3.78, 0.8)));
        H.fly = hide(dart(B, 0, 0, 0, 0.9));
        for (const [x, z] of [[-3.0, -1.6], [3.0, -1.6], [-3.0, 0.6]]) { B.prop.desk({ x, z, w: 1.8, col: "#b8b0a0" });
          B.box(0.5, 0.42, 0.45, "#d8d0b8", x + 0.3, 0.81, z - 0.1); B.plate(0.38, 0.28, "#2f5a44", x + 0.3, 1.03, z + 0.13, { d: 0.01, edge: "#d8d0b8" });
          B.box(0.42, 0.12, 0.3, "#4a4a52", x - 0.4, 0.81, z + 0.1); B.prop.chair({ x, z: z + 0.8, col: "#3a3a48" }); }
        H.paper = B.dyn(B.grp(-3.2, 0.82, -1.35, 0, 1)); B.plate(0.6, 0.42, tt(B, "DARTS vs PROS", "#f2ede0", "#241726", 0.6, 0.42), 0, 0.01, 0, { in: H.paper, d: 0.01, rx: -PI / 2 });
        B.prop.clock({ x: -2.6, y: 2.75, z: -3.92, r: 0.3, time: 10.2 });
        H.cal1 = B.dyn(B.plate(1.4, 0.6, tt(B, "1 MONTH", "#f4f6fa", "#c0353a", 1.4, 0.6), 3.3, 1.9, -3.94, { d: 0.02, edge: "#2a2d36" }));
        H.cal6 = hide(B.dyn(B.plate(1.4, 0.6, tt(B, "6 MONTHS", "#f4f6fa", "#2f6a3a", 1.4, 0.6), 3.3, 1.9, -3.92, { d: 0.02, edge: "#2a2d36" })));
        for (const x of [-2.5, 0, 2.5]) B.prop.lamp({ x, y: 3.4, z: -1.0, kind: "hang", cord: 0.5, col: "#3a4a3a", intensity: 3 });
        B.prop.plant({ x: 4.4, z: -3.4 });
        B.lamp(0, 2.8, 1.5, "#fff4e0", 4, 10);
      },
      // the pro's office at night: city windows, green banker's lamp, piles of annual reports, a price screen
      office: (B) => {
        B.set.room({ style: "office", wall: "wallpaper:#2f4a5a", floor: "carpet:#4a2f3a", w: 8, d: 6, h: 3.2, windows: [-2.2, 2.2], lit: true, door: false });
        B.prop.desk({ x: 0, z: -1.3, w: 2.4, col: "floor:#4a2a18" }); B.prop.lamp({ x: -0.9, y: 0.81, z: -1.5, kind: "desk", intensity: 5 });
        H.scr = B.prop.screen({ x: 0.65, y: 0.81, z: -1.55, w: 0.8, h: 0.5, y0: 0.06, label: "RESEARCH" });
        H.piles = [];
        for (let p = 0; p < 3; p++) for (let i = 0; i < 4 + p; i++) H.piles.push(B.box(0.42, 0.07, 0.3, ["#f4efe2", "#e8dcc0", "#dfe8f0"][(p + i) % 3], -0.35 + p * 0.0 - 0.1 + (p - 1) * 0.0, 0.81 + i * 0.075 + p * 0, -1.15 - p * 0.0));
        B.plate(0.36, 0.12, tt(B, "ANNUAL REPORT", "#f4efe2", "#241726", 0.36, 0.12), -0.1, 1.2, -0.99, { d: 0.005 });
        B.cyl(0.06, 0.05, 0.12, "#f4efe2", 0.25, 0.81, -1.0);
        B.prop.chair({ x: 0, z: -2.2, col: "#3a2418" }); B.prop.shelf({ x: -3.0, z: -2.75, w: 1.6, h: 2.4 }); B.prop.plant({ x: 3.2, z: -2.5 });
        B.lamp(0, 2.6, 1.2, "#ffe0b0", 3, 8);
      },
      // a city street with a tiny diner between brick buildings (analogy + finale newsstand)
      diner: (B) => {
        B.box(40, 0.1, 30, "asphalt", 0, -0.1, 6); B.box(40, 0.14, 3.6, "concrete:#c8c2b8", 0, 0, -1.4);
        B.facade({ style: "shop", w: 5, x: 0, z: -3.2, sign: "TINY DINER", seed: 4, floors: 2 });
        B.facade({ style: "brick", w: 6, x: -5.6, z: -3.2, sign: "", seed: 9, floors: 3 }); B.facade({ style: "brick", w: 6, x: 5.6, z: -3.2, sign: "", seed: 12, floors: 3 });
        for (const x of [-3.2, 3.2]) B.prop.lampPost({ x, z: 0.2, light: true });
        B.prop.table({ x: 1.9, z: -0.3, w: 0.8, d: 0.7, h: 0.76, col: "#e8e4dc" }); B.cyl(0.22, 0.22, 0.02, "#f4f4f4", 1.9, 0.77, -0.3, { seg: 20 });
        H.burger = B.dyn(B.grp(1.9, 0.79, -0.3, 0, 1)); B.ball(0.14, "#d8a050", 0, 0.03, 0, { in: H.burger, sy: 0.45 }); B.cyl(0.15, 0.15, 0.05, "#5a3020", 0, 0.05, 0, { in: H.burger });
        B.cyl(0.16, 0.16, 0.015, "#6ab04a", 0, 0.1, 0, { in: H.burger }); B.ball(0.145, "#e0a858", 0, 0.14, 0, { in: H.burger, sy: 0.6 });
        // the finale newsstand
        H.stand = hide(B.dyn(B.grp(-0.4, 0, 0.4, 0, 1)));
        B.box(2.4, 0.95, 0.8, "planks:#2f5a44", 0, 0, 0, { in: H.stand }); B.box(2.6, 0.08, 0.9, "#1e3a2c", 0, 0.95, 0, { in: H.stand });
        B.plate(1.0, 0.3, tt(B, "PROS' PICKS", "#f4efe2", "#241726", 1.0, 0.3), -0.6, 0.55, 0.42, { in: H.stand, d: 0.01 });
        B.plate(1.0, 0.3, tt(B, "DART PICKS", "#f4efe2", "#c0353a", 1.0, 0.3), 0.6, 0.55, 0.42, { in: H.stand, d: 0.01 });
        B.box(0.75, 0.6, 0.55, "#f2ede0", 0.6, 1.03, 0, { in: H.stand }); B.plate(0.7, 0.5, tt(B, "DART PICKS", "#f2ede0", "#c0353a", 0.7, 0.5), 0.6, 1.64, 0, { in: H.stand, d: 0.01, rx: -PI / 2 });
        H.soldout = B.plate(0.9, 0.36, tt(B, "SOLD OUT", "#ff6a5a", "#ffffff", 0.9, 0.36), -0.6, 1.25, 0.05, { in: H.stand, d: 0.02, edge: "#c0353a" });
        H.bigdart = hide(dart(B, 0, 0, 0, 2.0));
        B.lamp(0, 4, 3, "#fff0d8", 4, 12);
      },
      // the printing press: rollers, a sheet of the pros' picks running through, a price screen, a broker's window
      press: (B) => {
        B.set.room({ style: "factory", w: 10, d: 8, h: 4.2, door: false });
        H.rollers = [0, 1, 2].map((i) => B.dyn(B.cyl(0.32, 0.32, 4.4, "metal:#8a8f96", 0, 0.9 + i * 0.68 - 2.2, -2.4, { rz: PI / 2, seg: 18 })));
        B.box(0.5, 2.5, 1.4, "metal:#4a4e56", -2.45, 0, -2.4); B.box(0.5, 2.5, 1.4, "metal:#4a4e56", 2.45, 0, -2.4);
        H.sheet = B.dyn(B.plate(3.6, 1.6, tt(B, "PROS' PICKS", "#f2ede0", "#241726", 3.6, 1.6), 0, 2.1, -1.9, { d: 0.01, edge: "#d8d0c0" })); H.sheet.rotation.x = -0.5; H.sheet.userData.base.r.copy(H.sheet.rotation);
        for (let i = 0; i < 3; i++) { B.box(0.8, 0.5 + i * 0.12, 0.55, "#f2ede0", -1.2 + i * 1.2, 0, -0.6); B.plate(0.7, 0.45, tt(B, "PROS' PICKS", "#f2ede0", "#241726", 0.7, 0.45), -1.2 + i * 1.2, 0.51 + i * 0.12, -0.6, { d: 0.005, rx: -PI / 2 }); }
        H.pscr = B.prop.screen({ x: -3.9, y: 1.5, z: -3.85, w: 2.0, h: 1.2, label: "PROS' PICKS", curve: (x) => 0.3 });
        B.prop.counter({ x: 3.0, z: -1.2, w: 2.2, h: 1.1, col: "panel:#5a3a24" }); B.prop.sign({ x: 3.0, y: 2.3, z: -1.25, text: "BROKER: BUY", w: 2.0, h: 0.5, bg: "#4fd18b", fg: "#123", edge: "#2f6a3a" });
        for (const x of [-3, 0, 3]) B.prop.lamp({ x, y: 4.2, z: -0.5, kind: "hang", cord: 0.6, col: "#5a5e66", intensity: 3 });
        B.lamp(0, 3, 2, "#fff0d8", 4, 10);
      },
    },
    shots: [
      // 0 · frame 0: a giant dart slams into the dartboard in the ring — THUNK
      { set: "ring", f: 0, light: ARENA, cam: CAM.fit([1.1, 2.05, -2.0], { w: 2.4, a0: -18, a1: -8, elev: 4, push: 0.18 }), coc: 9,
        act: (S, u, f) => { const k = E.easeIn(E.prog(f, 0, 7)); H.bdart.visible = true;
          H.bdart.position.set(-0.6 + 1.82 * k, 2.4 - 0.3 * k, 3.0 - 4.9 * k); H.bdart.rotation.y = 0.35;
          S.kick(7, 0.12); S.pop("impact", 7, 24, { x: 1.85, y: 2.65, z: -1.6, w: 0.8, h: 0.5, text: "THUNK!" });
          S.pop("label", W(0, "fourteen") - 2, 40, { x: 0.6, y: 1.0, z: -1.6, w: 1.2, h: 0.3, text: "14 YEARS", bg: "#ffd84a", hold: true }); } },
      // 1 · Wall Street's best stock pickers: wide ring, the pro in his corner facing the dartboard
      { set: "ring", word: [0, "Wall"], lead: 3, trans: "whip", dir: -1, light: ARENA, cam: CAM.fit([-0.2, 1.8, -1.8], { w: 3.4, a0: 10, a1: 2, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.bdart.visible = true; H.bdart.position.set(1.22, 2.1, -1.9); H.bdart.rotation.y = 0.35;
          S.actor("you", { x: -1.4, y: 0.6, z: -1.6, expr: "stern", prop: "fists" });
          S.pop("label", W(0, "Street's"), 50, { x: -1.4, y: 2.6, z: -1.5, w: 1.3, h: 0.3, text: "THE PROS", bg: "#4fd18b", hold: true }); } },
      // 2 · battled a dartboard: close on the pro, fists up — FIGHT!
      { set: "ring", word: [0, "battled"], lead: 3, steady: true, coc: 10, light: ARENA, cam: CAM.fit([-0.7, 1.95, -1.7], { w: 2.2, a0: -6, a1: 2, elev: 2, push: 0.16, roll: 2 }),
        act: (S, u, f) => { H.bdart.visible = true; H.bdart.position.set(1.22, 2.1, -1.9); H.bdart.rotation.y = 0.35; const t = W(0, "dartboard.");
          S.actor("you", { x: -1.4, y: 0.6, z: -1.6, expr: f < t ? "stern" : "grin", prop: "fists" });
          S.kick(t, 0.08); S.pop("impact", t, 26, { x: -0.3, y: 2.6, z: -1.2, w: 0.9, h: 0.5, text: "FIGHT!" }); S.sfx("ring", t); } },
      // 3 · an old book joked: whip to a jungle clearing, an old 1973 book on a stump, a monkey beside it
      { set: "jungle", beat: 1, trans: "whip", dir: 1, light: "golden", cam: CAM.fit([-0.9, 1.0, -1.2], { w: 3.2, a0: -14, a1: -4, elev: 10, push: 0.1 }),
        act: (S, u, f) => { H.book.rotation.y = 0.3;
          S.pop("label", W(1, "book") - 2, 40, { x: -1.6, y: 1.25, z: -1.0, w: 1.2, h: 0.28, text: "OLD BOOK", bg: "#f4efe2", hold: true });
          S.pop("label", W(1, "joked") - 2, 34, { x: -0.4, y: 2.0, z: -0.8, w: 1.0, h: 0.3, text: "A JOKE", bg: "#ffd84a", hold: true }); } },
      // 4 · a blindfolded monkey could match the experts: close on the monkey, it flings the dart at the stock page
      { set: "jungle", word: [1, "blindfolded"], lead: 3, trans: "dissolve", light: "golden", cam: CAM.fit([0.5, 1.4, -1.6], { w: 3.0, a0: 18, a1: 8, elev: 4, push: 0.12 }),
        act: (S, u, f) => { const t0 = W(1, "match") - 6, t1 = t0 + 8, k = E.easeIn(E.prog(f, t0, t1));
          H.mk.arm.rotation.z = 0.6 - 1.6 * E.back(E.prog(f, t0 - 6, t0)); H.mdart.visible = f < t0;
          H.jdart.visible = f >= t0; H.jdart.position.set(-0.05 + 1.5 * k, 1.75 - 0.1 * k, -0.9 - 1.35 * k); H.jdart.rotation.y = -0.85;
          S.kick(t1, 0.06); S.pop("impact", t1, 22, { x: 1.7, y: 2.2, z: -2.0, w: 0.7, h: 0.45, text: "THUNK!" });
          S.pop("label", W(1, "experts.") - 2, 40, { x: 0.9, y: 2.75, z: -1.6, w: 1.4, h: 0.32, text: "= THE EXPERTS?", bg: "#4fd18b", hold: true }); } },
      // 5 · so in 1988: flash to the newsroom, staffers at their desks
      { set: "newsroom", beat: 2, trans: "flash", light: "office", cam: CAM.keys([[0, { p: [2.6, 2.4, 4.6], t: [-0.4, 1.4, -2.0], fov: 46 }], [1, { p: [1.6, 2.1, 4.0], t: [-0.6, 1.4, -2.2], fov: 46 }]]),
        act: (S, u, f) => { S.actor("dot", { x: 0.8, z: -0.6, expr: "smile" }); S.actor("ed", { x: -3.0, z: -2.4, expr: "neutral" }); S.actor("r4", { x: 3.0, z: -2.4, expr: "neutral" });
          S.pop("label", W(2, "nineteen") - 2, 50, { x: 0.6, y: 2.35, z: -0.3, w: 2.0, h: 0.34, text: "NEW YORK, 1988", bg: "#f4efe2", hold: true }); } },
      // 6 · the Wall Street Journal tried it: the editor slaps the paper down — "Get the darts!"
      { set: "newsroom", word: [2, "Journal"], lead: 3, light: "office", cam: CAM.fit([-3.0, 1.35, -1.9], { w: 2.4, a0: -14, a1: -4, elev: 8, push: 0.12 }),
        act: (S, u, f) => { const t = W(2, "tried"); H.paper.position.y = 0.82 + 0.5 * (1 - E.easeIn(E.prog(f, t - 8, t)));
          S.actor("ed", { x: -3.0, z: -2.4, expr: f < t ? "neutral" : "grin", prop: f < t ? "paper" : "point" });
          S.kick(t, 0.06); S.say("Get the darts!", t, 40, { x: -2.3, y: 2.55, z: -2.0, w: 1.2, h: 0.42 }); } },
      // 7 · no monkey: smash back to the jungle — POOF, the monkey is gone
      { set: "jungle", word: [3, "No"], lead: 2, trans: "smash", light: "golden", cam: CAM.fit([-0.4, 1.2, -1.0], { w: 2.4, a0: 6, a1: -2, elev: 6, push: 0.1 }),
        act: (S, u, f) => { const t = W(3, "monkey."); H.mk.g.visible = f < t;
          S.pop("puff", t, 22, { x: -0.4, y: 0.9, z: -0.7, w: 1.6, h: 1.4, pop: false });
          S.pop("label", t + 2, 30, { x: -0.4, y: 2.1, z: -0.7, w: 1.4, h: 0.36, text: "NO MONKEY", bg: "#ff6a5a", hold: true }); } },
      // 8 · just staffers: whip to the newsroom, Dot winds up with a dart in front of the stock tables
      { set: "newsroom", word: [3, "Just"], lead: 3, trans: "whip", dir: -1, light: "office", cam: CAM.fit([0.4, 1.6, -1.6], { w: 3.6, a0: 22, a1: 12, elev: 6, push: 0.1 }),
        act: (S, u, f) => { S.actor("dot", { x: 1.3, z: 0.2, expr: "grin", prop: "up" });
          S.pop("label", W(3, "staffers,") - 2, 40, { x: 1.3, y: 2.4, z: 0.3, w: 1.2, h: 0.3, text: "STAFFER", bg: "#ffd84a", hold: true }); } },
      // 9 · throwing darts at stock tables on the wall: follow the dart into the page — THUNK
      { set: "newsroom", word: [3, "throwing"], lead: 2, light: "office", cam: CAM.keys([[0, { p: [2.2, 1.9, 2.2], t: [0.9, 1.6, -0.2], fov: 44 }], [0.55, { p: [1.0, 2.0, 0.2], t: [-0.1, 1.9, -3.6], fov: 42 }], [1, { p: [0.6, 1.95, -1.2], t: [-0.15, 1.95, -3.9], fov: 40 }]]),
        act: (S, u, f) => { const t0 = W(3, "throwing"), t1 = W(3, "wall.") - 1, k = E.ss(E.prog(f, t0, t1));
          H.fly.visible = true; H.fly.position.set(1.0 - 1.15 * k, 1.6 + 0.4 * k - 0.15 * Math.sin(k * PI) * -1, 0.2 - 3.98 * k); H.fly.rotation.y = 0.26;
          S.actor("dot", { x: 1.3, z: 0.2, expr: "grin", prop: "point" });
          S.kick(t1, 0.08); S.pop("impact", t1, 24, { x: 0.5, y: 2.4, z: -3.5, w: 0.8, h: 0.5, text: "THUNK!" }); S.pop("sparks", t1, 14, { x: -0.15, y: 2.0, z: -3.6, w: 0.4, h: 0.4 }); } },
      // 10 · imagine you're the pro: whip to the night office, YOU at the desk
      { set: "office", beat: 4, trans: "whip", dir: 1, light: "lamp", cam: CAM.fit([0, 1.35, -1.6], { w: 2.8, a0: -10, a1: -2, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.scr.draw({ curve: (x) => 0.4 + 0.15 * Math.sin(x * 9), t: Math.min(1, 0.3 + u), label: "RESEARCH" });
          S.actor("you", { x: -0.15, z: -2.05, expr: "stern", prop: "chin" });
          S.pop("label", W(4, "you're") - 2, 50, { x: -0.15, y: 2.4, z: -1.9, w: 0.7, h: 0.3, text: "YOU", bg: "#ffd84a", hold: true }); } },
      // 11 · weeks of research: insert on the piles of reports, pages flying, the clock spinning
      { set: "office", word: [4, "Weeks"], lead: 3, steady: true, coc: 11, light: "lamp", cam: CAM.fit([0.1, 1.05, -1.2], { w: 1.5, a0: 8, a1: -2, elev: 18, push: 0.14 }),
        act: (S, u, f) => { H.scr.draw({ curve: (x) => 0.4 + 0.15 * Math.sin(x * 9), t: 1, label: "RESEARCH" });
          for (let q = 0; q < 5; q++) S.pop("page", W(4, "Weeks") + q * 4, 22, { x: -0.3 + q * 0.12, y: 1.3, z: -1.0, w: 0.24, h: 0.3, rise: 0.6, spin: 1.2 });
          S.pop("label", W(4, "research,") - 2, 30, { x: 0.2, y: 1.55, z: -0.9, w: 0.8, h: 0.22, text: "WEEKS...", bg: "#f4efe2", hold: true }); } },
      // 12 · against one dart: whip to Dot, holding up a single dart
      { set: "newsroom", word: [4, "against"], lead: 3, trans: "whip", dir: -1, light: "office", cam: CAM.fit([1.3, 1.6, 0.2], { w: 1.9, a0: 10, a1: 2, elev: 4, push: 0.14 }),
        act: (S, u, f) => { showStuck(1); S.actor("dot", { x: 1.3, z: 0.2, expr: "whistle", prop: "up" });
          S.pop("label", W(4, "one") - 2, 40, { x: 1.3, y: 2.45, z: 0.35, w: 1.0, h: 0.32, text: "1 DART", bg: "#ff6a5a", hold: true }); S.pop("stars", W(4, "dart."), 16, { x: 1.6, y: 2.1, z: 0.4, w: 0.5, h: 0.4 }); } },
      // 13 · after 142 contests: push through into the arena scoreboard, the count runs up
      { set: "ring", beat: 5, trans: "zoom", light: ARENA, cam: CAM.fit([0, 4.5, -6.4], { w: 5.4, a0: 0, a1: 0, e0: -14, e1: -8, push: 0.1 }),
        act: (S, u, f) => { const t0 = W(5, "After"), t1 = W(5, "contests,"); const n = Math.min(4, Math.floor((f - t0) / Math.max(1, (t1 - t0) / 4)));
          H.nums.forEach((p, i) => (p.visible = i === Math.max(0, n)));
          S.pop("label", t1, 40, { x: 0, y: 3.1, z: -6.2, w: 2.6, h: 0.4, text: "142 CONTESTS", bg: "#ffd84a", hold: true }); } },
      // 14 · the pros had won eighty-seven: PROS WON 87 lights up, the pro raises both fists, confetti
      { set: "ring", word: [5, "pros"], lead: 3, trans: "dissolve", light: ARENA, cam: CAM.keys([[0, { p: [0, 3.2, 3.6], t: [0, 3.6, -6.0], fov: 46 }], [1, { p: [-0.6, 2.4, 3.0], t: [-0.6, 2.6, -3.0], fov: 46 }]]),
        act: (S, u, f) => { const t = W(5, "eighty-seven."); H.nums[4].visible = f < t - 2; H.won.visible = f >= t - 2;
          H.bdart.visible = true; H.bdart.position.set(1.22, 2.1, -1.9); H.bdart.rotation.y = 0.35;
          S.actor("you", { x: -1.0, y: 0.6, z: -1.6, expr: f < t ? "grin" : "laugh", prop: f < t ? "fists" : "up" });
          S.pop("confetti", t, 34, { x: -0.6, y: 3.2, z: -1.4, w: 3.0, h: 2.2, pop: false }); S.kick(t, 0.05); } },
      // 15 · ten percent a contest: dissolve to the result bars, the green pros' bar shoots up
      { set: "ring", beat: 6, trans: "dissolve", light: ARENA, cam: CAM.fit([-0.5, 2.0, -0.9], { w: 3.8, a0: -8, a1: 0, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.bars.visible = true; H.bars.grow([E.back(E.prog(f, W(6, "Ten") - 2, W(6, "Ten") + 12)), 0.01]);
          S.actor("you", { x: -1.95, y: 0.6, z: -1.1, expr: "grin", prop: "point" });
          S.pop("label", W(6, "percent"), 44, { x: -0.95, y: 3.65, z: -0.6, w: 1.3, h: 0.36, text: "+10.2%", bg: "#4fd18b", hold: true }); } },
      // 16 · the darts? three and a half: pan to the stubby red bar, Dot shrugs beside it
      { set: "ring", word: [6, "darts?"], lead: 3, light: ARENA, cam: CAM.fit([1.1, 1.7, -0.9], { w: 3.2, a0: 10, a1: 2, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.bars.visible = true; H.bars.grow([1, E.back(E.prog(f, W(6, "Three") - 2, W(6, "Three") + 10))]);
          S.actor("dot", { x: 1.8, y: 0.6, z: -1.0, expr: f < W(6, "half.") ? "nervous" : "smile_closed", prop: "shrug" });
          S.pop("label", W(6, "Three"), 40, { x: 0.95, y: 1.95, z: -0.6, w: 1.1, h: 0.32, text: "+3.5%", bg: "#ff6a5a", hold: true }); } },
      // 17 · so why did the paper stretch every contest: whip to the newsroom, the editor scratches his chin
      { set: "newsroom", beat: 7, trans: "whip", dir: 1, light: "office", cam: CAM.fit([2.4, 1.6, -2.6], { w: 2.8, a0: 16, a1: 6, elev: 4, push: 0.1 }),
        act: (S, u, f) => { showStuck(4); S.actor("ed", { x: 1.9, z: -2.6, expr: "nervous", prop: "chin" });
          S.pop("question", W(7, "why"), 60, { x: 2.3, y: 2.45, z: -2.4, w: 0.3, h: 0.45, hold: true }); } },
      // 18 · from one month to six: insert on the calendar, 1 MONTH flips to 6 MONTHS
      { set: "newsroom", word: [7, "one"], lead: 4, steady: true, coc: 10, light: "office", cam: CAM.fit([3.3, 1.9, -3.9], { w: 2.1, a0: 8, a1: -2, elev: 2, push: 0.16 }),
        act: (S, u, f) => { const t = W(7, "six?") - 2; H.cal1.visible = f < t; H.cal6.visible = f >= t; H.cal6.scale.setScalar(Math.max(0.01, E.back(E.prog(f, t, t + 7))));
          S.kick(t, 0.04); S.pop("page", t, 18, { x: 3.4, y: 2.2, z: -3.6, w: 0.4, h: 0.45, rise: 0.6, spin: 1 }); } },
      // 19 · you see, a famous critic praises a tiny diner: push through into a street, the critic raves
      { set: "diner", beat: 8, trans: "zoom", light: "golden", cam: CAM.fit([-1.0, 1.6, -1.3], { w: 3.0, a0: -10, a1: -2, elev: 6, push: 0.1 }),
        act: (S, u, f) => { S.actor("critic", { x: -1.4, z: -1.1, expr: f < W(8, "praises") ? "neutral" : "grin", prop: f < W(8, "praises") ? "paper" : "up" });
          S.pop("label", W(8, "critic") - 2, 40, { x: -1.4, y: 2.45, z: -1.0, w: 1.4, h: 0.3, text: "FAMOUS CRITIC", bg: "#f4efe2", hold: true });
          S.say("Best in town!", W(8, "praises"), 34, { x: -0.6, y: 2.6, z: -0.9, w: 1.2, h: 0.42 });
          S.pop("stars", W(8, "diner,"), 20, { x: 0, y: 3.5, z: -3.0, w: 1.6, h: 0.6 }); } },
      // 20 · there's a line: a queue pops in along the sidewalk
      { set: "diner", word: [8, "there's"], lead: 3, trans: "dissolve", light: "golden", cam: CAM.fit([0.9, 1.5, -1.2], { w: 4.2, a0: 14, a1: 6, elev: 6, push: 0.08 }),
        act: (S, u, f) => { ["r1", "r2", "r3", "r4"].forEach((id, i) => { const t = W(8, "there's") + i * 3; if (f >= t) S.actor(id, { x: 0.1 + i * 0.75, z: -1.3 + (i % 2) * 0.15, expr: "smile", scale: Math.min(1, E.back(E.prog(f, t, t + 6))) }); });
          S.pop("label", W(8, "line."), 40, { x: 1.2, y: 2.5, z: -1.0, w: 1.2, h: 0.32, text: "A LINE!", bg: "#ffd84a", hold: true }); } },
      // 21 · same food: insert on the same plain burger
      { set: "diner", word: [8, "Same"], lead: 3, steady: true, coc: 11, light: "golden", cam: CAM.fit([1.9, 0.95, -0.3], { w: 1.0, a0: 8, a1: 0, elev: 16, push: 0.14 }),
        act: (S, u, f) => { H.burger.rotation.y = 0.02 * (f - S.a);
          S.pop("label", W(8, "food.") - 4, 40, { x: 1.9, y: 1.32, z: -0.1, w: 0.8, h: 0.22, text: "SAME FOOD", bg: "#f4efe2", hold: true }); } },
      // 22 · the pros' picks were printed: whip to the printing press, the sheet of picks rolls through
      { set: "press", beat: 9, trans: "whip", dir: -1, light: "interior", cam: CAM.fit([0, 2.0, -1.9], { w: 4.6, a0: -8, a1: 2, elev: 10, push: 0.1 }),
        act: (S, u, f) => { H.rollers.forEach((r, i) => (r.rotation.x = (f - S.a) * 0.25 * (i % 2 ? -1 : 1))); H.sheet.position.y = 2.1 + 0.08 * Math.sin(f * 0.4);
          S.pop("label", W(9, "printed") - 2, 40, { x: 0, y: 3.35, z: -1.8, w: 1.4, h: 0.34, text: "PRINTED", bg: "#ffd84a", hold: true });
          S.fx("speed", { x: 0, y: 1.6, z: -1.6, w: 3.0, h: 0.6 }); } },
      // 23 · for every reader to see: readers each open the paper
      { set: "press", word: [9, "every"], lead: 3, trans: "dissolve", light: "interior", cam: CAM.fit([-0.4, 1.4, -0.4], { w: 3.6, a0: 8, a1: -2, elev: 4, push: 0.1 }),
        act: (S, u, f) => { ["r1", "r2", "r3"].forEach((id, i) => S.actor(id, { x: -1.6 + i * 1.2, z: 0.0 + (i % 2) * 0.2, expr: i === 1 ? "grin" : "smile", prop: "paper" }));
          S.pop("label", W(9, "reader"), 36, { x: -0.4, y: 2.5, z: 0.2, w: 1.7, h: 0.3, text: "EVERY READER", bg: "#f4efe2", hold: true }); } },
      // 24 · for two days, those stocks jumped: the price screen line leaps up
      { set: "press", beat: 10, trans: "whip", dir: 1, light: "interior", cam: CAM.fit([-3.9, 2.1, -3.8], { w: 2.6, a0: -6, a1: 2, elev: 2, push: 0.14 }),
        act: (S, u, f) => { const t = W(10, "jumped"); const k = E.prog(f, S.a, t + 8);
          H.pscr.draw({ curve: (x) => 0.25 + (x > 0.55 ? 0.5 * Math.min(1, (x - 0.55) * 5) : 0), ck: "jump", t: 0.3 + 0.7 * k, label: "PROS' PICKS" });
          S.pop("label", W(10, "two") - 2, 40, { x: -3.9, y: 3.0, z: -3.6, w: 1.0, h: 0.3, text: "2 DAYS", bg: "#ffd84a", hold: true });
          S.pop("arrow", t, 26, { x: -3.1, y: 2.5, z: -3.5, w: 0.45, h: 0.6, dir: "up" }); S.kick(t, 0.05); } },
      // 25 · as readers rushed to buy: readers sprint to the broker's window
      { set: "press", word: [10, "readers"], lead: 3, trans: "whip", dir: -1, light: "interior", cam: CAM.fit([0.9, 1.4, -0.4], { w: 4.0, a0: 14, a1: 4, elev: 4, push: 0.08 }),
        act: (S, u, f) => { const d = (f - S.a) * 0.075;
          ["r1", "r2", "r3", "r4"].forEach((id, i) => S.actor(id, { x: Math.min(2.0 - i * 0.6, -2.4 + i * 0.5 + d), z: -0.1 + (i % 2) * 0.35, side: true, mode: "march", phase: f * 0.07 + i, expr: "grin" }));
          S.say("Buy!", W(10, "buy.") - 4, 30, { x: 2.4, y: 2.6, z: -0.5, w: 0.7, h: 0.38 }); S.fx("speed", { x: 0.6, y: 1.0, z: -0.1, w: 2.0, h: 0.5 }); } },
      // 26 · twist — part of the experts' win came from their own readers: smash to the ring, readers push the pros' bar up
      { set: "ring", beat: 11, trans: "smash", light: (u) => K.mixLight(ARENA, K.light("danger"), 0.35), cam: CAM.fit([-1.2, 2.0, -0.8], { w: 3.4, a0: -6, a1: 4, elev: 6, push: 0.1, roll: 3 }),
        act: (S, u, f) => { H.bars.visible = true; H.bars.grow([1, 1]); H.boost.visible = true; const t = W(11, "readers.");
          ["r1", "r3"].forEach((id, i) => S.actor(id, { x: -1.75 + i * 1.6, y: 0.6, z: -0.25, expr: "grin", prop: "up" }));
          S.actor("you", { x: -2.6, y: 0.6, z: -1.2, expr: f < W(11, "win") ? "grin" : "nervous", prop: f < W(11, "win") ? "point" : "shrug" });
          S.pop("label", W(11, "own") - 2, 44, { x: -0.95, y: 3.7, z: -0.4, w: 1.5, h: 0.34, text: "READERS BUYING", bg: "#ffd84a", hold: true });
          S.pop("sweat", t, 22, { x: -2.35, y: 2.2, z: -1.0, w: 0.2, h: 0.26 }); } },
      // 27 · finale — nobody rushed to buy the dart's picks: the newsstand, pros' picks sold out, a giant dart lands — THUNK
      { set: "diner", beat: 12, trans: "whip", dir: 1, light: "sunset", cam: CAM.fit([0.1, 1.4, 0.4], { w: 3.2, a0: -8, a1: 2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.stand.visible = true; const t = W(12, "picks."); const k = E.easeIn(E.prog(f, t - 9, t));
          H.bigdart.visible = f >= t - 9; H.bigdart.position.set(0.2, 6.5 - 4.6 * k, 0.4); H.bigdart.rotation.set(-PI / 2, 0, 0.15);
          S.actor("dot", { x: 1.15, z: 0.7, expr: f < W(12, "dart's") ? "nervous" : "dazed", prop: "shrug" });
          S.pop("label", W(12, "Nobody") - 2, 60, { x: 0.1, y: 2.35, z: 1.0, w: 1.1, h: 0.28, text: "NOBODY", bg: "#ff6a5a", hold: true });
          S.kick(t, 0.16); S.pop("impact", t, 30, { x: -0.6, y: 2.2, z: 0.8, w: 0.9, h: 0.55, text: "THUNK!" }); S.pop("puff", t, 18, { x: 0.2, y: 1.6, z: 0.6, w: 1.6, h: 0.6, pop: false });
          for (let q = 0; q < 4; q++) S.pop("paper", t + 1 + q * 2, 22, { x: -0.1 + q * 0.2, y: 1.7, z: 0.7, w: 0.22, h: 0.26, rise: 0.6, spin: 1.5 }); } },
    ],
  };
};
