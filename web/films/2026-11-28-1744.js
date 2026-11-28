// "The Promise on the Goatskin" — Yale's 1648 perpetual water-board bond. On May 15, 1648 the Dutch water board
// Lekdijk Bovendams borrowed 1,000 Carolus guilders from Niclaes de Meijer on goatskin (vellum) at 5% forever, to pay for
// work on the dike of the river Lek. The rate was cut to 2.5% in the 17th century; payments were written on the skin until
// it was full and a paper extension was attached. Yale bought it at auction in 2003; in 2015 it collected 136.20 euros,
// twelve years of interest. Today forever pays 11.35 euros a year: every promise kept, the money melted by inflation.
// Worlds: a deep-teal "forever" stage (a giant goatskin bond that unrolls, gets stamped, scribbled full and extended;
// a row of shrinking coins; a gold coin that melts on the last word), a stormy 1648 Dutch polder (a river biting a
// grassy dike, a windmill), the water board's chamber (checker floor, leaded windows, green-cloth table, quill),
// a marble rare-book library auction (glass case, podium, gavel, bidder paddle), a modern water-authority counter, and
// grandma's pink living room (birthday cake, a card with five dollars, a "$5 buys" candy board) for the analogy.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const H = {};
  const PI = Math.PI;
  const AH = 1.55;
  const GOLD = "#f2c14e", INK = "#1d1a26", CREAM = "#f4ecd6", RED = "#c8352e", GREEN = "#2f7a4a", TEAL = "#1f6f74", SKIN = "#ead2a2";
  const STAGE = K.backdrop(TEAL);
  const cl = (x) => Math.max(0, Math.min(1, x));

  const tt = (B, s, bg, fg, pw, ph, font = "Georgia") => { const w = 1024, h = Math.round((1024 * ph) / pw), cv = document.createElement("canvas"); cv.width = w; cv.height = h; const g = cv.getContext("2d");
    g.fillStyle = bg; g.fillRect(0, 0, w, h); g.strokeStyle = fg; g.lineWidth = Math.max(6, Math.min(16, h * 0.06)); g.strokeRect(10, 10, w - 20, h - 20);
    const lines = s.split("\n"); let fs = Math.round((h * 0.56) / lines.length); g.font = `bold ${fs}px ${font}`;
    const mw = Math.max(...lines.map((l) => g.measureText(l).width)); if (mw > w * 0.86) fs = Math.floor((fs * w * 0.86) / mw);
    g.font = `bold ${fs}px ${font}`; g.fillStyle = fg; g.textAlign = "center"; g.textBaseline = "middle";
    lines.forEach((l, i) => g.fillText(l, w / 2, h / 2 + (i - (lines.length - 1) / 2) * fs * 1.12 + 4));
    const t = new B.THREE.CanvasTexture(cv); t.colorSpace = B.THREE.SRGBColorSpace; return t; };
  const hide = (o) => { o.visible = false; if (o.userData && o.userData.base) o.userData.base.v = false; return o; };
  const live = (B, w, h, x, y, z, paint, o = {}) => { const cv = document.createElement("canvas"); cv.width = 768; cv.height = Math.round((768 * h) / w);
    const tex = new B.THREE.CanvasTexture(cv); tex.colorSpace = B.THREE.SRGBColorSpace; const p = B.dyn(B.plate(w, h, tex, x, y, z, { d: 0.04, edge: o.frame ?? "#1a1a22", ...o }));
    let key = ""; const draw = (q = {}) => { const k = JSON.stringify(q); if (k === key) return; key = k; paint(cv.getContext("2d"), cv.width, cv.height, q); tex.needsUpdate = true; };
    draw(o.init ?? {}); return { p, draw }; };

  // the goatskin bond: q.half = rate halved, q.n = payment scribbles, q.kept = green KEPT stamp
  const rnd = (i) => { const s = Math.sin(i * 127.1 + 31.7) * 43758.5453; return s - Math.floor(s); };
  const skinPaint = (c, w, h, q) => { c.fillStyle = "#2a1f18"; c.fillRect(0, 0, w, h); c.fillStyle = SKIN; c.beginPath();
    for (let i = 0; i <= 40; i++) { const a = (i / 40) * PI * 2, rx = w * 0.47 * (1 + 0.04 * Math.sin(i * 2.3)), ry = h * 0.47 * (1 + 0.03 * Math.cos(i * 1.7)); const px = w / 2 + Math.sign(Math.cos(a)) * Math.min(rx, Math.abs(Math.cos(a)) * rx * 1.6), py = h / 2 + Math.sign(Math.sin(a)) * Math.min(ry, Math.abs(Math.sin(a)) * ry * 1.6); i ? c.lineTo(px, py) : c.moveTo(px, py); }
    c.closePath(); c.fill(); c.strokeStyle = "#b89a6a"; c.lineWidth = 10; c.stroke();
    c.fillStyle = "#5a3a20"; c.textAlign = "center"; c.textBaseline = "middle"; c.font = `bold ${Math.round(h * 0.06)}px Georgia`; c.fillText("BOND · ANNO 1648", w / 2, h * 0.1);
    c.font = `italic ${Math.round(h * 0.036)}px Georgia`; c.fillText("Lekdijk Bovendams", w / 2, h * 0.16);
    c.strokeStyle = "#8a6a4a"; c.lineWidth = 5; for (let i = 0; i < 5; i++) { c.beginPath(); c.moveTo(w * 0.12, h * (0.22 + i * 0.035)); c.lineTo(w * (0.85 - rnd(i) * 0.1), h * (0.22 + i * 0.035)); c.stroke(); }
    c.font = `bold ${Math.round(h * 0.055)}px Georgia`; c.fillStyle = "#3a2410"; c.fillText("1000 GUILDERS", w / 2, h * 0.43);
    c.font = `bold ${Math.round(h * 0.075)}px Georgia`; c.fillStyle = RED; c.fillText("5%", w * 0.32, h * 0.52); c.fillStyle = "#3a2410"; c.font = `italic bold ${Math.round(h * 0.05)}px Georgia`; c.fillText("FOREVER", w * 0.66, h * 0.52);
    if (q.half) { c.strokeStyle = RED; c.lineWidth = 12; c.beginPath(); c.moveTo(w * 0.2, h * 0.55); c.lineTo(w * 0.44, h * 0.49); c.stroke();
      c.save(); c.translate(w * 0.34, h * 0.63); c.rotate(-0.15); c.strokeStyle = "#a02a2a"; c.lineWidth = 10; c.strokeRect(-w * 0.17, -h * 0.04, w * 0.34, h * 0.08); c.fillStyle = "#a02a2a"; c.font = `bold ${Math.round(h * 0.06)}px Arial`; c.fillText("2½%", 0, 4); c.restore(); }
    const n = q.n ?? 0; c.strokeStyle = "#4a2e18"; c.lineWidth = 4;
    for (let i = 0; i < n; i++) { const col = i % 4, row = Math.floor(i / 4), x0 = w * (0.12 + col * 0.2), y0 = h * (0.7 + row * 0.022); if (y0 > h * 0.93) break; c.beginPath(); c.moveTo(x0, y0);
      for (let k = 1; k <= 8; k++) c.lineTo(x0 + k * w * 0.018, y0 + Math.sin(k * 1.9 + i) * h * 0.006); c.stroke(); }
    if (q.kept) { c.save(); c.translate(w * 0.62, h * 0.82); c.rotate(-0.2); c.strokeStyle = GREEN; c.lineWidth = 14; c.beginPath(); c.arc(0, 0, h * 0.1, 0, PI * 2); c.stroke(); c.fillStyle = GREEN; c.font = `bold ${Math.round(h * 0.06)}px Arial`; c.fillText("KEPT", 0, 4); c.restore(); } };
  // the candy board in grandma's room: q.n candies five dollars buys
  const candyPaint = (c, w, h, q) => { c.fillStyle = "#fff8ec"; c.fillRect(0, 0, w, h); c.fillStyle = INK; c.textAlign = "center"; c.textBaseline = "middle"; c.font = `bold ${Math.round(h * 0.16)}px Arial`; c.fillText("$5 BUYS:", w / 2, h * 0.15);
    const cols = ["#e2453c", "#3f8fe0", "#f2c14e", "#4fd18b", "#c25ac2"]; const n = q.n ?? 10;
    for (let i = 0; i < 10; i++) { const x = w * (0.14 + (i % 5) * 0.18), y = h * (0.45 + Math.floor(i / 5) * 0.3); if (i >= n) { c.strokeStyle = "#d8cbb8"; c.lineWidth = 4; c.setLineDash([10, 8]); c.beginPath(); c.arc(x, y, h * 0.1, 0, PI * 2); c.stroke(); c.setLineDash([]); continue; }
      c.fillStyle = cols[i % 5]; c.beginPath(); c.arc(x, y, h * 0.1, 0, PI * 2); c.fill(); c.fillStyle = "#ffffff"; c.beginPath(); c.arc(x - h * 0.03, y - h * 0.03, h * 0.025, 0, PI * 2); c.fill(); } };

  return {
    cast: {
      you: { jacket: "#22232c", pants: "#22232c", boots: "#141418", hat: "tophat", skin: "#f2c8a0", buttons: "#f4f1ea", moustache: "#7a4a2a" },
      nic: { jacket: "#6a2a3a", pants: "#3a2028", boots: "#2a1a14", hat: "hair", hair: "#6a4a2a", skin: "#ecc29c", buttons: GOLD, moustache: "#6a4a2a" },
      auct: { jacket: "#3a3f52", pants: "#2a2d38", boots: "#141418", hat: "hair", hair: "#d8d4cc", skin: "#e8bc94", buttons: "#c9c9d0" },
      bidder: { jacket: "#2f4a7a", pants: "#3a3f52", boots: "#3a2418", hat: "hair", hair: "#5a3b2a", dress: "#2f4a7a", skin: "#f5d2b0" },
      courier: { jacket: "#3a6a5a", pants: "#3b3f52", boots: "#3a2418", hat: "hair", hair: "#3a2a1a", skin: "#d8a878", buttons: "#f4efe2" },
      clerk: { jacket: "#f4f4f0", pants: "#3a4a6a", boots: "#2a2d38", hat: "hair", hair: "#e0b060", dress: "#4a8a9a", skin: "#ffe2c2" },
      bea: { jacket: "#c25a7a", pants: "#6a3a5a", boots: "#5a3b2a", hat: "hair", hair: "#e6e2da", dress: "#8a5aa8", skin: "#f2d2b4", build: "stout" },
      kid: { jacket: "#3a8ad8", pants: "#2f4a7a", boots: "#f4f1ea", hat: "cap", cap: "#e2453c", skin: "#f5c9a0", build: "kid" },
      grown: { jacket: "#3a8ad8", pants: "#2f4a7a", boots: "#3a2418", hat: "hair", hair: "#5a3a24", skin: "#f5c9a0" },
    },
    sets: {
      // metaphor stage: deep teal void, the giant goatskin bond, a paper extension, payment coins, a coin timeline, a gold coin on a pedestal
      forever: (B) => {
        B.set.stage({ floor: "#d8e6e0", back: TEAL });
        H.skinG = B.dyn(B.grp(0, 0.4, -1.0, 0, 1));
        H.skin = live(B, 2.4, 3.2, 0, 1.6, 0, skinPaint, { in: H.skinG, init: {}, frame: "#6a4a2a" });
        for (const y of [0.0, 3.2]) B.cyl(0.09, 0.09, 2.7, "westwood:#6a4026", 0, y, -0.06, { in: H.skinG, rz: PI / 2, seg: 12 });
        H.paper = B.dyn(B.grp(2.35, 0.4, -1.0, 0, 1)); B.plate(1.9, 2.6, tt(B, "PAYMENTS\n~~~~~~~~\n~~~~~~~~\n~~~~~~~~", "#fbfaf4", "#5a5e66", 1.9, 2.6), 0, 1.6, 0, { in: H.paper, d: 0.03, edge: "#9a9ea6" }); hide(H.paper);
        H.pc = []; for (let i = 0; i < 6; i++) H.pc.push(hide(B.prop.coin({ x: -1.0 + i * 0.4, y: 5, z: 0.3, r: 0.18 })));
        H.row = []; H.rowL = []; const YRS = ["1648", "1700", "1800", "1900", "2000", "TODAY"];
        YRS.forEach((y, i) => { const g = B.dyn(B.grp(-2.3 + i * 0.92, 0, 1.2, 0, 1)); B.prop.coin({ x: 0, y: 0.42, z: 0, r: 0.4, in: g }); H.row.push(hide(g));
          H.rowL.push(hide(B.dyn(B.plate(0.78, 0.26, tt(B, y, "#ffffff", INK, 0.78, 0.26, "Arial"), -2.3 + i * 0.92, 0.15, 1.65, { d: 0.02 })))); });
        H.arrow = hide(B.prop.arrow({ x: 2.0, y: 1.5, z: 0.0, dir: "up", col: RED, size: 0.8 }));
        H.ped = hide(B.prop.pedestal({ x: 0, z: 1.3, r: 0.9, h: 0.5, col: "#f4efe2", trim: GOLD }));
        H.bigCoin = B.dyn(B.grp(0, 0.5, 1.3, 0, 1)); B.prop.coin({ x: 0, y: 0.75, z: 0, r: 0.72, in: H.bigCoin }); hide(H.bigCoin);
        H.puddle = B.dyn(B.cyl(1.05, 1.1, 0.05, GOLD, 0, 0.5, 1.3, { seg: 32 })); hide(H.puddle);
        B.lamp(0, 6, 4, "#fff0dc", 7, 18); B.lamp(-2.5, 3, 2, "#cfe8ff", 3, 10);
      },
      // a stormy 1648 polder: a long grassy dike, the river behind it, a windmill, a wave and a chunk of dike
      river: (B) => {
        B.set.landscape({ kind: "farm", count: 0, clear: 12, seed: 21, mountains: false }); for (const [x, z] of [[-14, -38], [-4, -42], [8, -40], [18, -36], [-22, -34]]) B.prop.tree({ x, z, kind: "oak" });
        B.box(70, 1.7, 3, "dirt", 0, 0, -3); B.box(70, 0.06, 3.02, "grass", 0, 1.7, -3, { cast: false });
        H.water = B.dyn(B.box(70, 1.2, 30, "water", 0, 0, -19.5, { cast: false }));
        H.wave = B.dyn(B.ball(1.4, "water", 1.6, 1.2, -4.8, { sy: 0.55, seg: 18 }));
        H.chunk = B.dyn(B.box(1.2, 0.7, 1.1, "dirt", 1.6, 1.0, -4.1)); B.box(1.22, 0.05, 1.12, "grass", 0, 0.7, 0, { in: H.chunk, cast: false });
        // windmill
        B.cyl(1.0, 1.4, 5.0, "planks:#6a4a3a", -6.5, 0, 1.5, { seg: 10 }); B.cone(1.25, 1.6, "#3a2a24", -6.5, 5.0, 1.5, { seg: 10 });
        H.blades = B.dyn(B.grp(-6.5, 4.6, 2.75, 0, 1)); for (let i = 0; i < 4; i++) { const a = B.grp(0, 0, 0, 0, 1, H.blades); a.rotation.z = (i * PI) / 2; B.box(0.28, 3.4, 0.05, "stripes:#f4efe2:#8a6a4a", 0, 0.1, 0, { in: a }); }
        B.cyl(0.2, 0.2, 0.3, "#3a2a24", 0, 0, -0.05, { in: H.blades, rx: PI / 2, seg: 10 });
        for (const x of [7, 11]) B.prop.tree({ x, z: -0.5, kind: "bare" });
        B.prop.fence({ x: 5, z: -0.8, len: 4, col: "#e8e0d0" });
        B.lamp(0, 6, 3, "#e6eeff", 3, 18);
      },
      // the water board's 1648 chamber: checker floor, plaster walls, leaded windows, green-cloth table, a goatskin, a quill, candles
      hall: (B) => {
        B.set.room({ style: "home", w: 9, d: 7, h: 4.0, door: false, wall: "plaster:#e6dcc2", floor: "tiles:#2a2a2e:#ece6d8", windows: [-2.8, 2.8] });
        B.box(9, 0.5, 0.1, "westwood:#5a3420", 0, 3.5, -3.44); B.box(9, 1.0, 0.08, "westwood:#6a4026", 0, 0, -3.44);
        B.prop.table({ x: 0, z: -1.2, w: 2.8, d: 1.2, h: 0.8, col: "carpet:#2f5a3a" });
        B.plate(0.8, 0.55, tt(B, "BOND 1648\n1000 GUILDERS · 5%", SKIN, "#5a3a20", 0.8, 0.55), -0.15, 0.815, -1.05, { d: 0.01, edge: "#b89a6a", rx: -PI / 2 });
        H.quill = B.dyn(B.grp(0.3, 0.82, -1.0, 0, 1)); B.cone(0.05, 0.6, "#fbfaf4", 0, 0, 0, { in: H.quill, seg: 6 }); H.quill.rotation.z = -0.5;
        for (const x of [-1.1, 1.1]) { B.cyl(0.05, 0.05, 0.3, "#f4efe2", x, 0.8, -1.5, { seg: 8 }); B.ball(0.05, "#ffd84a", x, 1.14, -1.5); }
        B.lamp(0, 2.0, -1.2, "#ffd8a0", 3, 8);
        B.prop.poster({ x: -1.2, y: 1.5, z: -3.38, w: 1.6, h: 1.0, text: "DE LEK", bg: "#9ab8c8", fg: "#2a3a5a" });
        H.door = B.prop.door({ x: 3.0, z: -3.38, col: "planks:#5a3420" });
        H.bag = hide(B.dyn(B.grp(0.75, 0.8, -1.1, 0, 1))); B.prop.moneyBag({ x: 0, z: 0, size: 0.5, in: H.bag });
        B.prop.chair({ x: -0.6, z: -2.2, col: "#5a3420" });
        B.lamp(0, 3.2, 1.5, "#fff0d8", 4, 10);
      },
      // a marble rare-book library at auction: amber marble walls, book shelves, glass case, podium, gavel
      library: (B) => {
        B.set.room({ style: "library", w: 9, d: 7, h: 4.6, door: false, wall: "marble" });
        B.prop.shelf({ x: -3.4, z: -3.0, w: 1.8, h: 3.0 }); B.prop.shelf({ x: 3.4, z: -3.0, w: 1.8, h: 3.0 });
        B.box(1.2, 0.9, 0.8, "westwood:#3a2418", -1.6, 0, -2.2); B.box(1.1, 0.5, 0.7, "glass:#cfe8f0", -1.6, 0.9, -2.2);
        B.plate(0.5, 0.36, tt(B, "1648", SKIN, "#5a3a20", 0.5, 0.36), -1.6, 0.93, -2.2, { d: 0.01, rx: -PI / 2 });
        B.box(1.0, 1.15, 0.7, "westwood:#5a3420", 1.0, 0, -1.6); B.plate(0.8, 0.3, tt(B, "AUCTION", "#2a1a12", GOLD, 0.8, 0.3), 1.0, 0.8, -1.24, { d: 0.02, edge: GOLD });
        H.gavel = B.dyn(B.grp(0.8, 1.17, -1.5, 0, 1)); B.cyl(0.025, 0.025, 0.35, "#6a4026", 0, 0, 0, { in: H.gavel, rz: PI / 2 + 0.0, seg: 8 }); B.cyl(0.07, 0.07, 0.2, "#4a2a18", 0.18, -0.1, 0, { in: H.gavel, seg: 12 });
        H.paddle = B.dyn(B.grp(-0.45, 1.45, 0.15, 0, 1)); B.cyl(0.02, 0.02, 0.5, "#6a4026", 0, 0, 0, { in: H.paddle, seg: 6 }); B.plate(0.42, 0.3, tt(B, "YALE", "#ffffff", "#1f3a6a", 0.42, 0.3, "Arial"), 0, 0.6, 0, { in: H.paddle, d: 0.02, edge: "#1f3a6a" });
        B.lamp(0, 3.5, 0.5, "#ffe2b0", 5, 12); B.lamp(-1.6, 1.6, -1.8, "#fff4d8", 2, 4);
      },
      // a modern Dutch water-authority counter: pale walls, teal counter top, a sign, euro coins
      counter: (B) => {
        B.set.room({ style: "modern", w: 8, d: 6, h: 3.6, door: false, wall: "plaster:#dde6ea", windows: [-2.6] });
        B.prop.counter({ x: 0, z: -1.2, w: 3.4, h: 1.1, col: "#e8eef2", top: "#3a8a9a" });
        B.plate(2.8, 0.55, tt(B, "WATER AUTHORITY · UTRECHT", "#1f6f74", "#ffffff", 2.8, 0.55, "Arial"), 0.2, 2.75, -2.95, { d: 0.03, edge: "#1f6f74" });
        B.prop.plant({ x: 2.9, z: -2.4 }); B.prop.clock({ x: -1.6, y: 2.7, z: -2.95, r: 0.32, time: 10.5 });
        H.c136 = hide(B.dyn(B.grp(0.0, 1.1, -1.05, 0, 1))); for (let i = 0; i < 5; i++) B.prop.coin({ x: -0.24 + i * 0.12, y: 0.02 + (i % 2) * 0.02, z: (i % 3) * 0.04, r: 0.07, flat: true, in: H.c136 });
        B.box(0.36, 0.02, 0.18, "#7fb86a", 0.3, 0, 0.05, { in: H.c136 });
        H.c11 = hide(B.dyn(B.grp(0.0, 1.1, -1.05, 0, 1))); B.prop.coin({ x: 0, y: 0.02, z: 0, r: 0.07, flat: true, in: H.c11 }); B.prop.coin({ x: 0.14, y: 0.02, z: 0.03, r: 0.05, flat: true, in: H.c11 });
        B.lamp(0, 3.0, 1.0, "#ffffff", 4, 10);
      },
      // grandma's pink living room: sofa, side table with a birthday cake, a card, a candy board
      grandma: (B) => {
        B.set.room({ style: "home", w: 8, d: 6.5, h: 3.6, door: false, wall: "wallpaper:#d892a6", floor: "floor:#a87a54", windows: [2.6] });
        B.prop.rug({ x: 0, z: -0.6, w: 3.6, d: 2.4, col: "#5a7ab8" });
        B.box(2.4, 0.5, 0.9, "carpet:#6a8a5a", -0.4, 0, -2.6); B.box(2.4, 0.8, 0.25, "carpet:#5a7a4a", -0.4, 0.4, -3.0);
        B.prop.table({ x: 1.0, z: -1.2, w: 0.9, d: 0.7, h: 0.75, col: "floor:#6a4026" });
        B.cyl(0.26, 0.26, 0.22, "#fbefe4", 1.0, 0.75, -1.25, { seg: 20 }); B.cyl(0.27, 0.27, 0.05, "#f48aa8", 1.0, 0.97, -1.25, { seg: 20 });
        for (const dx of [-0.1, 0, 0.1]) { B.cyl(0.015, 0.015, 0.12, "#3f8fe0", 1.0 + dx, 1.0, -1.25, { seg: 6 }); B.ball(0.025, "#ffd84a", 1.0 + dx, 1.15, -1.25); }
        H.card = B.dyn(B.grp(0.7, 0.76, -0.95, 0, 1)); B.plate(0.4, 0.3, tt(B, "Love,\nGrandma", "#ffffff", "#c25a7a", 0.4, 0.3), 0, 0.005, 0, { in: H.card, d: 0.005, rx: -PI / 2 });
        H.cover = B.dyn(B.grp(-0.2, 0.012, 0, 0, 1, H.card)); B.plate(0.4, 0.3, tt(B, "HAPPY\nBIRTHDAY", "#f2c14e", "#c8352e", 0.4, 0.3), 0.2, 0, 0, { in: H.cover, d: 0.005, rx: -PI / 2 });
        H.bill = B.dyn(B.grp(0.7, 0.8, -0.95, 0, 1)); B.plate(0.36, 0.17, tt(B, "$5", "#9ad08a", "#1f4a2a", 0.36, 0.17, "Arial"), 0, 0, 0, { in: H.bill, d: 0.005 }); hide(H.bill);
        H.candy = live(B, 1.5, 1.0, -1.5, 2.15, -3.2, candyPaint, { init: { n: 10 }, frame: "#c25a7a" });
        B.prop.lamp({ kind: "floor", x: -2.6, z: -2.4, glow: "#ffd8a0", intensity: 4 });
        B.lamp(0, 3.0, 1.2, "#ffe8d0", 4, 10);
      },
    },
    shots: [
      // 0 · frame 0: the giant goatskin bond is already unrolling on the teal stage; 1648
      { set: "forever", f: 0, light: STAGE, cam: CAM.fit([0, 2.0, -1.0], { w: 3.6, a0: -14, a1: -4, e0: 2, e1: 6, push: 0.12 }),
        act: (S, u, f) => { const k = E.back(E.prog(f, 0, 22)); H.skinG.scale.set(1, Math.max(0.02, k), 1); H.skin.draw({});
          S.pop("label", W(0, "sixteen") - 3, 50, { x: 0, y: 4.15, z: -0.6, w: 1.3, h: 0.42, text: "1648", bg: "#f4efe2", col: INK, hold: true }); S.pop("sparks", 18, 14, { x: 0, y: 3.4, z: -0.8, w: 2.2, h: 0.6 }); } },
      // 1 · …still pays interest today: low insert, a coin pops out of the bond and clinks down; STILL PAYING
      { set: "forever", word: [0, "still"], lead: 3, light: STAGE, cam: CAM.fit([0, 1.4, -0.2], { w: 2.6, a0: 14, a1: 6, elev: 2, push: 0.1 }),
        act: (S, u, f) => { H.skin.draw({}); const t = W(0, "pays"); H.pc.forEach((c, i) => { const ti = t + i * 6, k = E.easeIn(E.prog(f, ti, ti + 8)); c.visible = f >= ti; c.position.set(-0.5 + i * 0.2, E.lerp(2.2, 0.2 + i * 0.0, k), 0.3 + (i % 2) * 0.1); });
          S.pop("coin", t, 16, { x: 0.9, y: 1.0, z: -0.3, w: 0.4, h: 0.4, rise: 0.3 });
          S.pop("label", W(0, "today.") - 3, 40, { x: 0, y: 2.65, z: 0.2, w: 1.9, h: 0.4, text: "STILL PAYING", bg: GOLD, col: INK, hold: true }); } },
      // 2 · Imagine you run a Dutch water board: whip to the stormy polder — you on the dike, windmill turning
      { set: "river", word: [1, "Imagine"], lead: 3, trans: "whip", dir: 1, light: "storm", cam: CAM.fit([0, 2.9, -3.0], { w: 4.4, a0: -16, a1: -6, e0: 6, e1: 10, push: 0.08 }),
        act: (S, u, f) => { H.blades.rotation.z = f * 0.05; H.wave.position.y = 1.0 + 0.25 * Math.sin(f * 0.25);
          S.actor("you", { x: 0, y: 1.7, z: -2.3, expr: "nervous", look: -0.3 }); S.pop("label", W(1, "you") - 2, 40, { x: 0, y: 3.95, z: -2.2, w: 0.8, h: 0.32, text: "YOU", bg: "#ffffff", col: INK });
          S.pop("label", W(1, "water") - 3, 46, { x: 0, y: 4.5, z: -2.2, w: 2.2, h: 0.38, text: "DIKE-REEVE, 1648", bg: "#f4efe2", col: INK, hold: true }); } },
      // 3 · …the river's eating your dike: low insert at the dike edge — a wave smashes, a chunk falls in; CHOMP
      { set: "river", word: [1, "river's"], lead: 3, steady: true, coc: 10, light: "storm", cam: CAM.fit([0.9, 1.9, -3.2], { w: 3.9, a0: 28, a1: 20, elev: 8, push: 0.1 }),
        act: (S, u, f) => { const t = W(1, "eating"), k = E.easeIn(E.prog(f, t, t + 10)); H.blades.rotation.z = f * 0.05;
          H.wave.position.set(1.6, E.lerp(1.1, 1.9, E.ss(E.prog(f, S.a, t))) - (f > t ? 0.6 * E.easeOut(E.prog(f, t, t + 8)) : 0), -4.8);
          H.chunk.position.set(1.6, 1.0 - 1.2 * k, -4.1 - 1.2 * k); H.chunk.rotation.x = -0.9 * k;
          S.actor("you", { x: 0.2, y: 1.7, z: -2.2, expr: f > t ? "shock" : "nervous", look: -0.6 }); S.kick(t + 2, 0.15);
          S.pop("impact", t, 22, { x: 1.6, y: 2.9, z: -3.6, w: 1.2, h: 0.55, text: "CHOMP!" }); S.pop("puff", t + 2, 20, { x: 1.6, y: 1.8, z: -4.2, w: 2.2, h: 0.9 }); } },
      // 4 · So you write a promise on goatskin: dissolve to the water board chamber — you write with a quill
      { set: "hall", word: [2, "So"], lead: 2, trans: "dissolve", light: "interior", cam: CAM.fit([0, 1.35, -1.4], { w: 2.8, a0: -12, a1: -4, elev: 10, push: 0.12 }),
        act: (S, u, f) => { H.quill.position.x = 0.1 + 0.08 * Math.sin(f * 0.6); H.quill.rotation.z = -0.5 + 0.15 * Math.sin(f * 0.9);
          S.actor("you", { x: -0.3, z: -2.1, expr: "stern", prop: "chin", look: 0.3 }); S.pop("label", W(2, "goatskin.") - 3, 40, { x: -0.1, y: 1.2, z: -0.8, w: 1.4, h: 0.32, text: "GOATSKIN", bg: SKIN, col: "#5a3a20", hold: true }); } },
      // 5 · Lend us a thousand guilders…: you stand and announce it — speech bubble, 5% A YEAR
      { set: "hall", word: [3, "Lend"], lead: 3, light: "interior", cam: CAM.fit([-0.3, 1.6, -1.6], { w: 2.6, a0: 12, a1: 4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { S.actor("you", { x: -0.3, z: -2.1, expr: "grin", prop: f > W(3, "five") - 3 ? "up" : "point", look: 0.4 });
          S.say("Lend us 1,000 guilders!", W(3, "Lend") - 2, 38, { x: 0.45, y: AH + 0.75, z: -1.9, w: 1.4, h: 0.5, tail: "left" });
          S.pop("label", W(3, "five") - 2, 40, { x: -0.3, y: 2.75, z: -1.9, w: 1.3, h: 0.36, text: "5% A YEAR", bg: GOLD, col: INK, hold: true }); } },
      // 6 · Forever.: push in close on you — FOREVER bursts in gold
      { set: "hall", word: [3, "Forever."], lead: 3, steady: true, coc: 11, light: "interior", cam: CAM.fit([-0.3, 1.55, -2.1], { w: 1.2, a0: 4, a1: 0, elev: 4, push: 0.2, roll: 3 }),
        act: (S, u, f) => { S.actor("you", { x: -0.3, z: -2.1, expr: "laugh", prop: "up", look: 0.1 }); S.kick(W(3, "Forever."), 0.08);
          S.pop("word", W(3, "Forever.") - 1, 26, { x: -0.3, y: 2.3, z: -1.8, w: 0.85, h: 0.32, text: "FOREVER", col: GOLD }); S.pop("sparks", W(3, "Forever.") + 2, 14, { x: -0.3, y: 2.0, z: -1.8, w: 1.2, h: 0.5 }); } },
      // 7 · A man named Niclaes de Meijer…: whip to the door — he strides in with a money bag
      { set: "hall", word: [4, "A"], lead: 3, trans: "whip", dir: -1, light: "interior", cam: CAM.fit([2.0, 1.5, -1.8], { w: 3.2, a0: -18, a1: -8, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const d = E.ss(E.prog(f, S.a, S.a + 30)); H.door.leaf.rotation.y = -1.3 * E.easeOut(E.prog(f, S.a, S.a + 8));
          S.actor("nic", { x: E.lerp(3.0, 1.6, d), z: E.lerp(-3.0, -1.9, d), expr: "smile", mode: d < 1 ? "stroll" : "stand", phase: f * 0.06, prop: "hold" });
          S.actor("you", { x: -0.3, z: -2.1, expr: "grin", look: 0.6 });
          S.pop("label", W(4, "Niclaes") - 3, 46, { x: 1.7, y: 2.6, z: -1.8, w: 2.2, h: 0.34, text: "NICLAES DE MEIJER", bg: "#f4efe2", col: INK, hold: true }); } },
      // 8 · …signs.: insert at the table — the bag thumps down, the quill scratches, SIGNED
      { set: "hall", word: [4, "signs."], lead: 3, steady: true, coc: 11, light: "interior", cam: CAM.fit([0.3, 1.1, -1.0], { w: 2.1, a0: 10, a1: 4, elev: 26, push: 0.1 }),
        act: (S, u, f) => { const t = W(4, "signs."); H.bag.visible = true; H.bag.position.y = 0.8 + 0.8 * (1 - E.easeIn(E.prog(f, S.a, S.a + 7)));
          H.quill.position.x = 0.1 + 0.12 * Math.sin(f * 1.2); S.kick(S.a + 7, 0.06);
          S.actor("nic", { x: 0.75, z: -0.55, expr: "smile_closed", prop: "point", look: -0.4 });
          S.pop("label", t, 30, { x: 0.2, y: 1.6, z: -1.0, w: 1.0, h: 0.32, text: "SIGNED", bg: RED, col: "#ffffff" }); S.pop("sparks", t + 1, 12, { x: 0.05, y: 0.95, z: -1.0, w: 0.5, h: 0.3 }); } },
      // 9 · Soon the rate gets halved: push through the bond onto the teal stage — 2½% stamp SMASHes down
      { set: "forever", word: [5, "Soon"], lead: 3, trans: "zoom", light: STAGE, cam: CAM.fit([0, 2.1, -1.0], { w: 2.7, a0: 8, a1: 2, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const t = W(5, "halved,"); H.skin.draw({ half: f >= t }); S.kick(t, 0.18);
          S.pop("impact", t, 22, { x: -0.4, y: 2.7, z: -0.6, w: 1.2, h: 0.5, text: "HALVED!" }); S.pop("puff", t + 1, 16, { x: -0.4, y: 2.0, z: -0.7, w: 1.4, h: 0.5 }); } },
      // 10 · …but the payments keep coming: coins rain down one by one in front of the bond
      { set: "forever", word: [5, "payments"], lead: 3, light: STAGE, cam: CAM.fit([0, 1.2, -0.3], { w: 3.2, a0: -10, a1: -2, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.skin.draw({ half: true, n: Math.floor(E.prog(f, S.a, S.a + 46) * 6) }); H.pc.forEach((c, i) => { const ti = S.a + i * 6, k = E.easeIn(E.prog(f, ti, ti + 8)); c.visible = f >= ti; c.position.set(-1.0 + i * 0.4, E.lerp(3.6, 0.2, k), 0.3); });
          S.pop("label", W(5, "keep") - 3, 40, { x: 0, y: 3.55, z: 0.1, w: 2.0, h: 0.36, text: "PAYMENTS KEEP COMING", bg: GOLD, col: INK, hold: true }); } },
      // 11 · They're scribbled on the goatskin till it's full: tilt down the bond as scribbles fill it — FULL!
      { set: "forever", word: [6, "They're"], lead: 3, steady: true, coc: 9, light: STAGE, cam: CAM.keys([[0, { p: [0.6, 3.2, 1.6], t: [0, 2.6, -1.0], fov: 40 }], [1, { p: [0.3, 1.6, 1.8], t: [0, 1.0, -1.0], fov: 40 }]]),
        act: (S, u, f) => { H.skin.draw({ half: true, n: 6 + Math.floor(E.prog(f, S.a, W(6, "full,")) * 42) }); H.pc.forEach((c) => { c.visible = false; });
          S.pop("label", W(6, "full,") - 2, 30, { x: 0.3, y: 1.6, z: -0.6, w: 0.9, h: 0.4, text: "FULL!", bg: RED, col: "#ffffff" }); S.pop("exclaim", W(6, "full,"), 16, { x: 1.1, y: 1.4, z: -0.7, w: 0.3, h: 0.5 }); } },
      // 12 · …so they attach paper: wider — a paper extension slides in beside the bond; puff + thump
      { set: "forever", word: [6, "attach"], lead: 4, light: STAGE, cam: CAM.fit([1.1, 2.0, -1.0], { w: 5.0, a0: -8, a1: 0, elev: 4, push: 0.08 }),
        act: (S, u, f) => { H.skin.draw({ half: true, n: 48 }); const t = W(6, "paper."), k = E.back(E.prog(f, S.a, t + 2)); H.paper.visible = true; H.paper.position.x = E.lerp(6.5, 2.35, k); S.kick(t + 2, 0.08);
          S.pop("puff", t + 2, 16, { x: 1.25, y: 2.0, z: -0.8, w: 0.6, h: 1.2 }); S.pop("label", t, 34, { x: 2.35, y: 4.3, z: -0.8, w: 1.4, h: 0.36, text: "+ PAPER", bg: "#ffffff", col: INK }); } },
      // 13 · In two thousand three…: flash (time jump) to the marble library auction — 2003
      { set: "library", word: [7, "In"], lead: 2, trans: "flash", light: "interior", cam: CAM.fit([0, 1.6, -1.2], { w: 4.2, a0: -10, a1: -2, elev: 6, push: 0.1 }),
        act: (S, u, f) => { S.actor("auct", { x: 1.0, z: -2.2, expr: "grin", prop: "point", look: -0.5 }); S.actor("bidder", { x: -0.9, z: 0.0, expr: "smile", prop: f > W(7, "Yale") - 3 ? "up" : undefined, look: 0.4 });
          H.paddle.position.y = 1.45 + (f > W(7, "Yale") - 3 ? 0.5 * E.back(E.prog(f, W(7, "Yale") - 3, W(7, "Yale") + 6)) : 0);
          S.pop("label", W(7, "two") - 3, 50, { x: 0, y: 3.2, z: -1.0, w: 1.2, h: 0.42, text: "2003", bg: "#f4efe2", col: INK, hold: true }); } },
      // 14 · …buys it at auction: insert on the podium — the gavel BANGs, SOLD!
      { set: "library", word: [7, "auction."], lead: 4, steady: true, coc: 10, light: "interior", cam: CAM.fit([0.9, 1.5, -1.7], { w: 1.8, a0: -16, a1: -8, elev: 8, push: 0.12 }),
        act: (S, u, f) => { const t = W(7, "auction.") + 2, k = E.prog(f, t - 6, t); H.gavel.rotation.z = f < t ? 0.9 * E.ss(k) : 0.9 * (1 - E.easeOut(E.prog(f, t, t + 3))) * 0;
          S.actor("auct", { x: 1.0, z: -2.2, expr: f > t ? "laugh" : "grin", prop: "up" }); S.kick(t, 0.14);
          S.pop("impact", t, 22, { x: 0.6, y: 2.3, z: -1.4, w: 1.0, h: 0.45, text: "SOLD!" }); } },
      // 15 · Twelve years later, it collects: whip to the modern water-authority counter — a courier with the folder; 2015
      { set: "counter", word: [8, "Twelve"], lead: 3, trans: "whip", dir: 1, light: "office", cam: CAM.fit([0, 1.5, -1.0], { w: 3.4, a0: 14, a1: 6, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const d = E.ss(E.prog(f, S.a, S.a + 26)); S.actor("courier", { x: E.lerp(-1.8, -0.6, d), z: -0.2, expr: "smile", mode: d < 1 ? "stroll" : "stand", phase: f * 0.06, prop: "paper", look: 0.4 });
          S.actor("clerk", { x: 0.5, z: -2.0, expr: "smile_closed", look: -0.4 });
          S.pop("label", W(8, "Twelve") - 2, 50, { x: 0, y: 2.75, z: -0.9, w: 1.2, h: 0.42, text: "2015", bg: "#f4efe2", col: INK, hold: true }); } },
      // 16 · One hundred thirty-six euros: insert on the counter — a few coins slide across; €136.20
      { set: "counter", word: [8, "One"], lead: 3, steady: true, coc: 11, light: "office", cam: CAM.fit([0.05, 1.2, -1.05], { w: 1.4, a0: -6, a1: 2, elev: 28, push: 0.12 }),
        act: (S, u, f) => { const k = E.easeOut(E.prog(f, S.a, S.a + 12)); H.c136.visible = true; H.c136.position.z = E.lerp(-1.4, -1.05, k);
          S.pop("label", W(8, "thirty-six") - 3, 50, { x: 0.05, y: 1.55, z: -0.9, w: 1.0, h: 0.34, text: "€136.20", bg: GOLD, col: INK, hold: true }); S.pop("coin", W(8, "euros,"), 16, { x: 0.4, y: 1.4, z: -0.9, w: 0.25, h: 0.25 }); } },
      // 17 · …for twelve years.: close on the courier — dazed, sweat; 12 YEARS
      { set: "counter", word: [8, "for"], lead: 3, light: "office", cam: CAM.fit([-0.6, 1.5, -0.2], { w: 1.6, a0: 18, a1: 10, elev: 2, push: 0.15 }),
        act: (S, u, f) => { S.actor("courier", { x: -0.6, z: -0.2, expr: "dazed", prop: "shrug", look: 0.3 }); S.say("For twelve years?!", W(8, "for") - 2, 30, { x: -0.55, y: AH + 0.6, z: -0.1, w: 1.2, h: 0.44, tail: "left" });
          S.pop("sweat", W(8, "years.") - 2, 20, { x: -0.3, y: 1.75, z: 0.0, w: 0.2, h: 0.3 }); } },
      // 18 · So where did the money go?: dissolve to the dim teal stage — the courier at the giant bond, a question mark
      { set: "forever", beat: 9, trans: "dissolve", light: (u) => K.mixLight(STAGE, K.light("night"), 0.45), cam: CAM.fit([0.2, 1.7, -0.3], { w: 3.4, a0: -16, a1: -6, e0: 8, e1: 4, push: 0.1 }),
        act: (S, u, f) => { H.skin.draw({ half: true, n: 48 }); H.paper.visible = true; S.actor("courier", { x: 0.9, z: 0.4, expr: "nervous", prop: "chin", look: -0.5 });
          S.pop("question", W(9, "where") - 2, 50, { x: 1.4, y: 2.4, z: 0.4, w: 0.45, h: 0.6, hold: true }); S.pop("label", W(9, "money") - 3, 30, { x: 0.2, y: 3.0, z: 0.2, w: 2.0, h: 0.36, text: "WHERE DID IT GO?", bg: "#ffffff", col: INK }); } },
      // 19 · You see, it's like grandma's birthday card: whip to grandma's pink living room — Grandma Bea hands over the card
      { set: "grandma", word: [10, "You"], lead: 3, trans: "whip", dir: -1, light: "interior", cam: CAM.fit([0.1, 1.2, -1.4], { w: 3.4, a0: 12, a1: 4, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.candy.draw({ n: 10 }); S.actor("bea", { x: -0.6, z: -1.7, expr: "smile", prop: "paper", look: 0.4 }); S.actor("kid", { x: 0.5, z: -0.6, expr: "grin", look: -0.4 });
          S.say("Happy birthday!", W(10, "birthday") - 2, 34, { x: -0.1, y: AH + 0.7, z: -1.6, w: 1.2, h: 0.44, tail: "left" });
          S.pop("label", W(10, "You") - 2, 44, { x: -0.6, y: 2.35, z: -1.4, w: 1.3, h: 0.3, text: "GRANDMA BEA", bg: "#ffffff", col: INK }); } },
      // 20 · …with the same five dollars, every year: insert — the card flips open, the $5 bill pops; the years tick by
      { set: "grandma", word: [10, "same"], lead: 3, steady: true, coc: 11, light: "interior", cam: CAM.fit([0.75, 0.95, -1.0], { w: 1.1, a0: -6, a1: 2, elev: 34, push: 0.12 }),
        act: (S, u, f) => { const k = E.back(E.prog(f, S.a, S.a + 10)); H.cover.rotation.z = 2.9 * k; const b = E.back(E.prog(f, W(10, "five") - 2, W(10, "five") + 6)); H.bill.visible = b > 0.01; H.bill.scale.setScalar(Math.max(0.01, b)); H.bill.position.y = 0.8 + 0.12 * b;
          ["1990", "2000", "2010", "2020"].forEach((y, i) => { const ti = W(10, "every") - 4 + i * 6; S.pop("label", ti, 7, { x: 0.75, y: 1.25, z: -0.9, w: 0.5, h: 0.22, text: y, bg: "#ffffff", col: INK, pop: false, sfx: false }); }); } },
      // 21 · The card never changes: the kid is now grown, holding the very same card
      { set: "grandma", word: [11, "The"], lead: 3, light: "interior", cam: CAM.fit([0.2, 1.5, -1.0], { w: 2.6, a0: -12, a1: -4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.candy.draw({ n: 10 }); S.actor("grown", { x: 0.4, z: -0.6, expr: "smile_closed", prop: "paper", look: -0.3 }); S.actor("bea", { x: -0.7, z: -1.7, expr: "smile", look: 0.4 });
          S.pop("label", W(11, "card") - 2, 40, { x: 0.4, y: 2.55, z: -0.5, w: 1.4, h: 0.34, text: "SAME CARD", bg: GOLD, col: INK, hold: true }); } },
      // 22 · What five dollars buys does.: insert on the candy board — the candies vanish one by one
      { set: "grandma", word: [11, "What"], lead: 3, steady: true, coc: 10, light: "interior", cam: CAM.fit([-1.5, 2.1, -3.2], { w: 1.9, a0: 6, a1: 0, elev: 2, push: 0.12 }),
        act: (S, u, f) => { H.candy.draw({ n: 10 - Math.round(E.ss(E.prog(f, W(11, "buys") - 4, W(11, "does.") + 6)) * 8) }); S.pop("puff", W(11, "does."), 14, { x: -0.9, y: 2.0, z: -3.0, w: 0.5, h: 0.4 }); } },
      // 23 · Prices rose for centuries, and every coin shrank.: push through to the teal stage — a coin timeline, PRICES arrow up, coins shrink
      { set: "forever", word: [12, "Prices"], lead: 3, trans: "zoom", light: STAGE, cam: CAM.fit([0.0, 1.3, 1.0], { w: 6.0, a0: -6, a1: 0, e0: 16, e1: 12, push: 0.06 }),
        act: (S, u, f) => { H.skin.draw({ half: true, n: 48 }); H.skinG.visible = true; H.arrow.visible = f >= W(12, "rose") - 3; H.arrow.scale.setScalar(Math.max(0.01, E.back(E.prog(f, W(12, "rose") - 3, W(12, "rose") + 6))));
          H.row.forEach((g, i) => { g.visible = true; H.rowL[i].visible = true; const s = 1 - 0.16 * i * E.back(E.prog(f, W(12, "every") - 2 + i * 3, W(12, "shrank.") + i * 3)); g.scale.setScalar(Math.max(0.05, s)); });
          S.pop("label", W(12, "Prices") - 2, 46, { x: 2.0, y: 3.0, z: 0.2, w: 1.2, h: 0.34, text: "PRICES", bg: RED, col: "#ffffff", hold: true }); S.kick(W(12, "shrank."), 0.08); } },
      // 24 · Today, forever pays eleven euros thirty-five a year.: whip to the counter — two tiny coins slide over; €11.35
      { set: "counter", word: [13, "Today,"], lead: 3, trans: "whip", dir: -1, light: "office", cam: CAM.fit([0.1, 1.35, -1.2], { w: 2.4, a0: 10, a1: 2, elev: 14, push: 0.1 }),
        act: (S, u, f) => { const k = E.easeOut(E.prog(f, S.a + 4, S.a + 16)); H.c11.visible = true; H.c11.position.z = E.lerp(-1.4, -1.05, k);
          S.actor("clerk", { x: 0.5, z: -2.0, expr: "smile_closed", prop: "shrug", look: -0.4 }); S.pop("label", W(13, "Today,") - 2, 40, { x: 0.3, y: 2.55, z: -1.8, w: 1.0, h: 0.34, text: "TODAY", bg: "#f4efe2", col: INK, hold: true }); } },
      // 25 · …eleven euros thirty-five a year: close on the courier holding the tiny coins; €11.35 A YEAR
      { set: "counter", word: [13, "eleven"], lead: 4, light: "office", cam: CAM.fit([-0.5, 1.55, -0.3], { w: 1.8, a0: -14, a1: -6, elev: 2, push: 0.15 }),
        act: (S, u, f) => { H.c11.visible = true; S.actor("courier", { x: -0.5, z: -0.3, expr: "pained", prop: "hold", look: 0.2 }); S.pop("coin", W(13, "eleven"), 22, { x: -0.25, y: 1.25, z: -0.1, w: 0.18, h: 0.18, hold: true });
          S.pop("label", W(13, "eleven") - 2, 44, { x: -0.5, y: 2.45, z: -0.2, w: 1.5, h: 0.36, text: "€11.35 A YEAR", bg: GOLD, col: INK, hold: true }); } },
      // 26 · Every promise was kept. (music stops): dissolve to the polder at sunset — the dike stands, the windmill turns; KEPT
      { set: "river", word: [14, "Every"], lead: 3, trans: "dissolve", light: "sunset", cam: CAM.fit([-0.6, 2.7, -2.6], { w: 4.6, a0: 12, a1: 4, e0: 4, e1: 8, push: 0.06 }),
        act: (S, u, f) => { H.blades.rotation.z = f * 0.02; H.wave.visible = false; H.chunk.visible = false; S.actor("you", { x: 0, y: 1.7, z: -2.3, expr: "smile_closed", prop: "wave", wave: 0.5 + 0.5 * Math.sin(f * 0.3), look: 0.2 });
          S.pop("label", W(14, "kept.") - 3, 30, { x: -0.5, y: 4.3, z: -2.2, w: 1.8, h: 0.42, text: "PROMISE KEPT", bg: GREEN, col: "#ffffff", hold: true }); } },
      // 27 · The money just melted.: whip to the teal stage — a gold coin on a pedestal squashes into a puddle on "melted."
      { set: "forever", word: [15, "The"], lead: 3, trans: "whip", dir: 1, light: STAGE, cam: CAM.fit([0, 1.2, 1.3], { w: 2.6, a0: -8, a1: -2, elev: 10, push: 0.12 }),
        act: (S, u, f) => { const t = W(15, "melted."); H.skin.draw({ half: true, n: 48, kept: true }); H.ped.visible = true;
          const wob = f < t ? 1 - 0.06 * E.prog(f, S.a, t) + 0.02 * Math.sin(f * 0.9) : 0; H.bigCoin.visible = f < t + 5; H.bigCoin.scale.set(1 + (f >= t ? 0.4 * E.prog(f, t, t + 5) : 0), f < t ? wob : Math.max(0.05, 1 - E.easeIn(E.prog(f, t, t + 5))), 1);
          const pk = E.back(E.prog(f, t + 2, t + 9)); H.puddle.visible = f >= t + 2; H.puddle.scale.set(Math.max(0.05, pk), 1, Math.max(0.05, pk));
          S.pop("sweat", t - 18, 16, { x: 0.6, y: 2.3, z: 1.4, w: 0.2, h: 0.3 }); S.kick(t + 1, 0.22);
          S.pop("impact", t + 1, 22, { x: 0, y: 2.5, z: 2.1, w: 1.0, h: 0.45, text: "SPLAT!" }); S.pop("smoke", t + 3, 24, { x: 0, y: 0.9, z: 1.4, w: 1.6, h: 1.0, rise: 0.8 }); } },
    ],
  };
};
