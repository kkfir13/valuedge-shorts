// "Paid in Engine Parts" — Dodge v. Ford. 1903: Henry Ford can't pay the Dodge brothers' machine-shop bill, so their
// $10,000 of parts buys 10% of Ford Motor Company. The Model T takes off and dividends pour in; in 1916 Henry stops the
// big dividends to build cheaper cars; the brothers sue; in 1919 Michigan's Supreme Court says a company exists mainly for
// its stockholders' profit and Ford pays a $19M dividend. Then Henry plans a new company with a cheaper car, buys every
// minority share, and the Dodges' stake comes out as $25M. Worlds: a teal stock-certificate stage (metaphor: a 10-slice
// certificate, a gold dividend pipe with a valve, a giant stamp), the Dodge machine shop at night, a 1903/1910s Detroit
// brick street with Model Ts, Henry's factory with an assembly line and blueprint easel, a wood-panelled courtroom, and
// "John & Sal's" pizzeria (the analogy). "You" = John Dodge (with brother Horace).
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const H = {};
  const PI = Math.PI;
  const AH = 1.55;
  const GOLD = "#f2c14e", INK = "#1d1a26", CREAM = "#f6efe0", GREEN = "#2f7a4a", RED = "#c8352e", BLUE = "#2f5fb5", TEAL = "#1d5e63";
  const STAGE = K.backdrop(TEAL);

  const tt = (B, s, bg, fg, pw, ph, font = "Georgia") => { const w = 1024, h = Math.round((1024 * ph) / pw), cv = document.createElement("canvas"); cv.width = w; cv.height = h; const g = cv.getContext("2d");
    g.fillStyle = bg; g.fillRect(0, 0, w, h); g.strokeStyle = fg; g.lineWidth = Math.max(6, Math.min(16, h * 0.06)); g.strokeRect(10, 10, w - 20, h - 20);
    const lines = s.split("\n"); let fs = Math.round((h * 0.56) / lines.length); g.font = `bold ${fs}px ${font}`;
    const mw = Math.max(...lines.map((l) => g.measureText(l).width)); if (mw > w * 0.86) fs = Math.floor((fs * w * 0.86) / mw);
    g.font = `bold ${fs}px ${font}`; g.fillStyle = fg; g.textAlign = "center"; g.textBaseline = "middle";
    lines.forEach((l, i) => g.fillText(l, w / 2, h / 2 + (i - (lines.length - 1) / 2) * fs * 1.12 + 4));
    const t = new B.THREE.CanvasTexture(cv); t.colorSpace = B.THREE.SRGBColorSpace; return t; };
  const hide = (o) => { o.visible = false; if (o.userData && o.userData.base) o.userData.base.v = false; return o; };
  const pop = (o, f, t0, d = 7, s = 1) => { const k = Math.max(0.01, E.back(E.prog(f, t0, t0 + d))); o.scale.setScalar(k * s); };
  const live = (B, w, h, x, y, z, paint, o = {}) => { const cv = document.createElement("canvas"); cv.width = 768; cv.height = Math.round((768 * h) / w);
    const tex = new B.THREE.CanvasTexture(cv); tex.colorSpace = B.THREE.SRGBColorSpace; const p = B.dyn(B.plate(w, h, tex, x, y, z, { d: 0.05, edge: o.frame ?? "#1a1a22", ...o }));
    let key = ""; const draw = (q = {}) => { const k = JSON.stringify(q); if (k === key) return; key = k; paint(cv.getContext("2d"), cv.width, cv.height, q); tex.needsUpdate = true; };
    draw(o.init ?? {}); return { p, draw }; };

  // the stock certificate: 10 columns; q.out = Dodge column cut out, q.gold = Dodge column gold, q.ford = # of FORD-blue columns, q.stamp
  const certPaint = (c, w, h, q) => { c.fillStyle = "#f4ecd6"; c.fillRect(0, 0, w, h); c.strokeStyle = GREEN; c.lineWidth = 16; c.strokeRect(14, 14, w - 28, h - 28); c.lineWidth = 4; c.strokeRect(34, 34, w - 68, h - 68);
    const x0 = 50, x1 = w - 50, y0 = h * 0.3, y1 = h * 0.9, cw = (x1 - x0) / 10;
    for (let i = 0; i < 10; i++) { const x = x0 + i * cw; let col = null;
      if (i === 0 && q.gold) col = GOLD; if (i < (q.ford ?? 0)) col = "#8fb0e8"; if (col) { c.fillStyle = col; c.fillRect(x + 3, y0, cw - 6, y1 - y0); }
      if (i === 0 && q.out) { c.fillStyle = TEAL; c.fillRect(x, y0 - 4, cw, y1 - y0 + 8); }
      c.strokeStyle = "rgba(47,122,74,0.55)"; c.setLineDash([10, 8]); c.lineWidth = 3; c.beginPath(); c.moveTo(x, y0); c.lineTo(x, y1); c.stroke(); c.setLineDash([]); }
    c.textAlign = "center"; c.textBaseline = "middle"; c.fillStyle = GREEN; c.font = `bold ${Math.round(h * 0.1)}px Georgia`; c.fillText("FORD MOTOR COMPANY", w / 2, h * 0.13);
    c.font = `italic ${Math.round(h * 0.065)}px Georgia`; c.fillStyle = "#3a5a3a"; c.fillText("Certificate of Stock · 1903", w / 2, h * 0.22);
    if ((q.ford ?? 0) >= 10 && !q.stamp) { c.fillStyle = BLUE; c.font = `bold ${Math.round(h * 0.2)}px Georgia`; c.fillText("FORD", w / 2, h * 0.6); }
    if (q.stamp) { c.save(); c.translate(w / 2, h * 0.6); c.rotate(-0.18); c.strokeStyle = RED; c.lineWidth = 14; c.strokeRect(-w * 0.36, -h * 0.17, w * 0.72, h * 0.34); c.fillStyle = RED; c.font = `bold ${Math.round(h * 0.18)}px Arial`; c.fillText("100% FORD", 0, 4); c.restore(); } };
  const planPaint = (c, w, h, q) => { c.fillStyle = "#2a5fa8"; c.fillRect(0, 0, w, h); c.strokeStyle = "rgba(255,255,255,0.18)"; c.lineWidth = 2; for (let x = 0; x < w; x += 32) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke(); } for (let y = 0; y < h; y += 32) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); }
    c.strokeStyle = "#ffffff"; c.lineWidth = 6; c.strokeRect(w * 0.18, h * 0.52, w * 0.5, h * 0.18); c.strokeRect(w * 0.3, h * 0.38, w * 0.22, h * 0.14); for (const x of [0.28, 0.6]) { c.beginPath(); c.arc(w * x, h * 0.74, h * 0.07, 0, 2 * PI); c.stroke(); }
    c.fillStyle = "#ffffff"; c.textAlign = "center"; c.textBaseline = "middle"; const L = (q.text ?? "MORE FACTORIES\nCHEAPER CARS").split("\n"); c.font = `bold ${Math.round(h * 0.12)}px Arial`;
    L.forEach((l, i) => c.fillText(l, w / 2, h * 0.13 + i * h * 0.14)); };
  const calPaint = (c, w, h, q) => { c.fillStyle = "#ffffff"; c.fillRect(0, 0, w, h); c.fillStyle = RED; c.fillRect(0, 0, w, h * 0.28); c.textAlign = "center"; c.textBaseline = "middle";
    c.fillStyle = "#ffffff"; c.font = `bold ${Math.round(h * 0.16)}px Arial`; c.fillText(q.top ?? "YEAR", w / 2, h * 0.14); c.fillStyle = INK; c.font = `bold ${Math.round(h * 0.4)}px Arial`; c.fillText(q.big ?? "1916", w / 2, h * 0.62); };
  const rulePaint = (c, w, h) => { c.fillStyle = "#f6ecd2"; c.fillRect(0, 0, w, h); c.fillStyle = "#c9b48a"; c.fillRect(0, 0, w, h * 0.07); c.fillRect(0, h * 0.93, w, h * 0.07); c.fillStyle = INK; c.textAlign = "center"; c.textBaseline = "middle";
    c.font = `bold ${Math.round(h * 0.09)}px Georgia`; c.fillText("DODGE v. FORD · 1919", w / 2, h * 0.2); c.font = `italic bold ${Math.round(h * 0.11)}px Georgia`;
    ["“For the profit", "of the stockholders.”"].forEach((l, i) => c.fillText(l, w / 2, h * 0.5 + i * h * 0.17)); };
  const newsPaint = (c, w, h) => { c.fillStyle = "#efe8d8"; c.fillRect(0, 0, w, h); c.fillStyle = INK; c.textAlign = "center"; c.textBaseline = "middle"; c.font = `bold ${Math.round(h * 0.08)}px Georgia`; c.fillText("THE DETROIT DAILY", w / 2, h * 0.08);
    c.fillRect(30, h * 0.14, w - 60, 6); c.font = `bold ${Math.round(h * 0.1)}px Georgia`; ["FORD PLANS", "NEW COMPANY,", "CHEAPER CAR"].forEach((l, i) => c.fillText(l, w / 2, h * 0.27 + i * h * 0.12));
    c.fillStyle = "#8a8478"; for (let r = 0; r < 7; r++) c.fillRect(40, h * 0.66 + r * h * 0.045, w - 80 - (r % 3) * 60, h * 0.022); };

  const engine = (B, x, y, z, s = 1, parent) => { const g = B.grp(x, y, z, 0, s, parent); B.box(0.8, 0.45, 0.5, "metal:#6a7078", 0, 0, 0, { in: g });
    for (let i = 0; i < 4; i++) B.cyl(0.08, 0.08, 0.2, "metal:#8a9098", -0.27 + i * 0.18, 0.45, 0, { in: g, seg: 12 });
    B.box(0.86, 0.06, 0.2, "#3a3e46", 0, 0.62, 0, { in: g }); B.cyl(0.24, 0.24, 0.08, "#3a3e46", 0.44, 0.22, 0, { in: g, rz: PI / 2, seg: 18 });
    for (const sx of [-0.3, 0.3]) B.ball(0.03, GOLD, sx, 0.25, 0.26, { in: g }); return B.dyn(g); };
  const modelT = (B, x, z, ry = 0, s = 1, col = "#17171c") => { const g = B.grp(x, 0, z, ry, s); B.box(2.3, 0.22, 1.0, col, 0, 0.42, 0, { in: g }); B.box(0.7, 0.42, 0.78, col, 0.8, 0.64, 0, { in: g });
    B.box(0.06, 0.5, 0.8, "#9cc4e8", 0.42, 1.06, 0, { in: g }); B.box(0.8, 0.5, 0.95, col, -0.5, 0.64, 0, { in: g }); B.box(0.18, 0.5, 0.9, "#3a2418", -0.82, 1.1, 0, { in: g });
    for (const px of [0.42, -0.9]) for (const pz of [-0.45, 0.45]) B.box(0.04, 0.7, 0.04, col, px, 1.1, pz, { in: g }); B.box(1.45, 0.05, 1.0, col, -0.24, 1.8, 0, { in: g });
    for (const sx of [-0.75, 0.8]) for (const sz of [-0.56, 0.56]) { B.cyl(0.36, 0.36, 0.1, "#1a1a1e", sx, 0.36 - 0.05, sz, { in: g, rx: PI / 2, seg: 18 }); B.cyl(0.13, 0.13, 0.12, "#c9a44a", sx, 0.36 - 0.06, sz, { in: g, rx: PI / 2, seg: 10 }); }
    for (const sz of [-0.3, 0.3]) B.ball(0.09, "#fff4c0", 1.18, 0.82, sz, { in: g, cast: false }); return B.dyn(g); };

  return {
    cast: {
      john: { jacket: "#6a4028", pants: "#2f3442", boots: "#2a1e18", hat: "hair", hair: "#2a1e18", moustache: "#2a1e18", skin: "#f0c8a0", buttons: "#c9a44a" },
      horace: { jacket: "#3a5068", pants: "#2a2e3a", boots: "#2a1e18", hat: "bowler", skin: "#f2cca6", moustache: "#5a3a24", buttons: "#c9c9d0" },
      henry: { jacket: "#7a7e88", pants: "#4a4e58", boots: "#1a1a20", hat: "hair", hair: "#c4c4cc", skin: "#f2cfae", buttons: "#2a2a32" },
      judge: { jacket: "#141418", pants: "#141418", boots: "#141418", dress: "#141418", hat: "hair", hair: "#e4e4e8", skin: "#e8bf98", build: "stout" },
      sal: { jacket: "#f4f4f0", pants: "#2a2a32", boots: "#3a2420", hat: "cap", cap: "#f4f4f0", moustache: "#1a1416", skin: "#d8a878", build: "stout", buttons: RED },
      holder1: { jacket: "#2a3a5a", pants: "#23283a", boots: "#141418", hat: "tophat", skin: "#eec6a0", moustache: "#7a7a80" },
      holder2: { jacket: "#5a2a3a", pants: "#2a2a32", boots: "#141418", hat: "bowler", skin: "#e2b48c" },
    },
    sets: {
      // metaphor stage: teal void, a giant 10-slice stock certificate, a gold dividend pipe with a red valve, a money bag, a giant stamp
      cert: (B) => {
        B.set.stage({ floor: "#ece4cf", back: TEAL });
        H.cert = live(B, 3.0, 1.9, 0.5, 2.4, -2.4, certPaint, { init: {}, frame: "#c9a44a" });
        H.slice = B.dyn(B.grp(0.5 - 1.5 + 0.17, 2.32, -2.3, 0, 1)); B.plate(0.27, 1.14, tt(B, "10%", GOLD, INK, 0.27, 1.14, "Arial"), 0, 0, 0, { in: H.slice, d: 0.03, edge: INK }); hide(H.slice);
        H.ped = B.prop.pedestal({ x: 0, z: 0.4, r: 0.8, h: 0.55 }); H.engine = engine(B, 0, 0.55, 0.4, 1.1);
        H.mini = B.dyn(B.grp(0, 1.4, 0.4, 0, 1)); B.plate(0.6, 0.38, tt(B, "STOCK", "#f4ecd6", GREEN, 0.6, 0.38), 0, 0, 0, { in: H.mini, d: 0.01, edge: GREEN }); hide(H.mini);
        // pipe from the left wing, spout down at x=-1.5
        H.pipe = B.dyn(B.grp(0, 0, 0, 0, 1)); B.cyl(0.13, 0.13, 3.0, "metal:#d8a83a", -3.0, 3.1, -0.4, { in: H.pipe, rz: PI / 2, seg: 16 }); B.cyl(0.13, 0.13, 0.7, "metal:#d8a83a", -1.5, 2.45, -0.4, { in: H.pipe, seg: 16 });
        B.cyl(0.2, 0.16, 0.16, "metal:#b8862a", -1.5, 2.32, -0.4, { in: H.pipe, seg: 16 });
        H.valve = B.dyn(B.grp(-2.2, 3.1, -0.22, 0, 1, H.pipe)); B.cyl(0.3, 0.3, 0.04, RED, 0, 0, 0, { in: H.valve, rx: PI / 2, seg: 20 }); for (let i = 0; i < 3; i++) B.box(0.56, 0.05, 0.05, "#8a1a1a", 0, -0.025, 0.03, { in: H.valve, rz: (i * PI) / 3 });
        H.pipeLab = B.plate(1.2, 0.3, tt(B, "DIVIDENDS", GOLD, INK, 1.2, 0.3, "Arial"), -2.6, 3.5, -0.4, { in: H.pipe, d: 0.02, edge: INK });
        H.bag = B.dyn(B.grp(-1.5, 0, -0.4, 0, 1)); B.prop.moneyBag({ x: 0, z: 0, size: 0.9, in: H.bag }); const bg = H.bag; bg.add && 0;
        H.coins = []; for (let i = 0; i < 18; i++) H.coins.push(hide(B.dyn(B.cyl(0.09, 0.09, 0.025, GOLD, -1.5, 2.2, -0.4, { seg: 14 }))));
        H.stamp = B.dyn(B.grp(0.5, 6, -1.9, 0, 1)); B.box(1.6, 0.35, 0.7, "#7a2a22", 0, 0, 0, { in: H.stamp }); B.cyl(0.12, 0.12, 0.9, "#5a3a24", 0, 0.35, 0, { in: H.stamp, seg: 12 }); B.ball(0.26, "#5a3a24", 0, 1.35, 0, { in: H.stamp }); hide(H.stamp);
        B.lamp(0, 6, 3, "#fff6e0", 7, 16); B.lamp(-3, 3, 1, "#d8fff4", 3, 10);
      },
      // the Dodge Brothers machine shop at night: brick, a belt wheel, a workbench of engines, the shop sign
      shop: (B) => {
        B.set.room({ style: "factory", w: 12, d: 9, h: 4.6, door: false });
        B.plate(4.4, 1.0, tt(B, "DODGE BROTHERS\nMACHINE SHOP", "#2a1a12", GOLD, 4.4, 1.0), 0, 3.4, -4.42, { d: 0.05, edge: GOLD });
        H.belt = B.dyn(B.grp(-4.0, 2.6, -4.3, 0, 1)); B.cyl(0.9, 0.9, 0.12, "metal:#5a5e66", 0, 0, 0, { in: H.belt, rx: PI / 2, seg: 24 }); for (let i = 0; i < 3; i++) B.box(1.7, 0.08, 0.06, "#2a2d36", 0, -0.04, 0.08, { in: H.belt, rz: (i * PI) / 3 });
        B.box(0.12, 2.6, 0.04, "#1a1a1e", -4.0 + 0.85, 0.2, -4.25); B.box(0.12, 2.6, 0.04, "#1a1a1e", -4.0 - 0.85, 0.2, -4.25);
        B.prop.table({ x: 0, z: -1.6, w: 3.2, d: 1.0, h: 0.9, col: "planks:#7a5232" });
        H.parts = B.dyn(B.grp(0, 0.9, -1.6, 0, 1)); engine(B, -0.8, 0, 0, 0.8, H.parts); engine(B, 0.15, 0, 0.1, 0.8, H.parts); B.cyl(0.05, 0.05, 1.4, "metal:#8a9098", 0.9, 0.08, -0.15, { in: H.parts, rz: PI / 2 });
        for (const sx of [0.4, 1.4]) B.cyl(0.18, 0.18, 0.07, "#3a3e46", sx, 0.12, -0.15, { in: H.parts, rz: PI / 2, seg: 14 }); for (let i = 0; i < 4; i++) B.cyl(0.12, 0.12, 0.05, "metal:#a8a8b0", 1.1, 0.02 + i * 0.05, 0.3, { in: H.parts, seg: 12 });
        H.money = hide(B.dyn(B.grp(0, 0.9, -1.6, 0, 1))); B.prop.goldBars({ x: -0.6, z: 0, n: 6, in: H.money }); B.prop.cash({ x: 0.5, z: 0.05, n: 6, in: H.money }); B.prop.coinStack({ x: 1.1, z: 0.2, n: 9, in: H.money }); B.prop.moneyBag({ x: -1.2, z: 0.1, size: 0.6, in: H.money });
        H.bill = B.dyn(B.grp(0, 0, 0, 0, 1)); B.plate(0.5, 0.66, tt(B, "BILL\n$ $ $", "#ffffff", INK, 0.5, 0.66), 0, 0, 0, { in: H.bill, d: 0.01, edge: INK }); hide(H.bill);
        B.prop.lamp({ kind: "hang", x: 0, y: 4.4, z: -1.6 }); B.prop.lamp({ kind: "hang", x: -3, y: 4.4, z: -2.5 }); B.prop.crate({ x: 3.8, z: -3.6, label: "AXLES" }); B.prop.crate({ x: 4.4, z: -2.6, size: 0.6, label: "GEARS" });
        B.lamp(0, 3.2, 0.5, "#ffd9a0", 4, 10);
      },
      // Detroit brick street (1903 / 1910s): shops, gas lamps, Model Ts
      detroit: (B) => {
        B.set.street({ style: ["brick", "victorian", "shop"], length: 44, road: 8, seed: 31, ground: "cobble", signs: ["DODGE BROTHERS", "HARDWARE", "BANK", "HOTEL", "TAILOR", "DRUGS"], end: true });
        for (const z of [-3, -9, -15]) for (const x of [-3.7, 3.7]) B.prop.lampPost({ x, z });
        H.cars = [modelT(B, 1.6, -6, -PI / 2), modelT(B, -1.6, -14, PI / 2, 1, "#24242c"), modelT(B, 1.6, -20, -PI / 2, 1, "#101014")];
        H.banner = B.plate(3.2, 0.6, tt(B, "DETROIT", "#f4efe2", RED, 3.2, 0.6), 0, 5.2, -12, { d: 0.05, edge: RED });
        B.lamp(0, 5, 2, "#ffe4b0", 4, 16);
      },
      // Henry's factory: assembly line of black car bodies, blueprint easel, desk, wall calendar
      plant: (B) => {
        B.set.room({ style: "factory", w: 14, d: 10, h: 5.5, door: false, wall: "brick:#7a4436" });
        B.box(12, 0.5, 1.3, "metal:#4a4e56", 0, 0, -3.4); H.line = []; for (let i = 0; i < 5; i++) H.line.push(modelT(B, -6 + i * 3, -3.4, 0, 0.8));
        for (const x of [-5, -1.5, 2, 5.5]) B.prop.lamp({ kind: "hang", x, y: 5.3, z: -3.0 });
        B.plate(4.6, 0.8, tt(B, "FORD MOTOR CO.", "#1f2a44", "#ffffff", 4.6, 0.8), 0, 4.3, -4.92, { d: 0.05, edge: "#ffffff" });
        H.cal = live(B, 0.8, 1.0, -4.0, 2.8, -4.92, calPaint, { init: { top: "YEAR", big: "1916" }, frame: "#8a8a92" });
        H.easel = B.dyn(B.grp(1.5, 0, -0.8, -0.25, 1)); for (const sx of [-0.7, 0.7]) B.box(0.06, 2.1, 0.06, "#5a3a24", sx, 0, 0, { in: H.easel }); H.plan = live(B, 1.7, 1.15, 0, 1.75, 0.05, planPaint, { in: H.easel, init: {}, frame: "#ffffff" });
        B.prop.desk({ x: -1.4, z: 0.3, w: 1.8, col: "floor:#5a3a24" }); H.suit = B.dyn(B.grp(-1.4, 0.82, 0.3, 0, 1)); B.plate(0.5, 0.66, tt(B, "LAWSUIT\nDODGE v.\nFORD", "#ffffff", INK, 0.5, 0.66), 0, 0, 0, { in: H.suit, d: 0.01, edge: INK, rx: -PI / 2 }); hide(H.suit);
        H.news = live(B, 1.1, 1.5, 0, 1.7, 0.6, newsPaint, { init: {}, frame: "#8a8478" }); hide(H.news.p);
        B.lamp(0, 4, 1, "#ffe8c0", 5, 14);
      },
      // the courtroom: panelled walls, raised bench, scales, two counsel tables, the ruling scroll and a gavel
      court: (B) => {
        B.set.room({ style: "library", w: 12, d: 9, h: 5.4, door: false, wall: "panel:#6a4630" });
        B.box(4.6, 0.55, 1.4, "westwood:#4a2c1a", 0, 0, -3.7); B.box(4.2, 1.35, 0.5, "westwood:#5a3420", 0, 0, -2.85); B.box(4.4, 0.08, 0.7, "#3a2418", 0, 1.35, -2.95);
        B.plate(4.8, 0.7, tt(B, "MICHIGAN SUPREME COURT", "#2a1a12", GOLD, 4.8, 0.7), 0, 4.2, -4.42, { d: 0.05, edge: GOLD });
        const sc = B.prop.scale({ x: 1.6, y: 1.42, z: -2.95, s: 0.5 }); if (sc.tilt) sc.tilt(0);
        for (const x of [-1.9, 1.9]) B.prop.table({ x, z: -0.3, w: 1.5, d: 0.8, h: 0.78, col: "floor:#6a4630" });
        H.cbag = B.dyn(B.grp(1.9, 0.78, -0.25, 0, 1)); B.prop.moneyBag({ x: 0, z: 0, size: 0.55, in: H.cbag });
        H.rule = live(B, 1.7, 0.95, 0, 3.35, -3.5, rulePaint, { init: {}, frame: "#c9b48a" }); hide(H.rule.p);
        H.gavel = B.dyn(B.grp(-0.9, 1.45, -2.75, 0, 1)); B.box(0.06, 0.5, 0.06, "#5a3420", 0, 0, 0, { in: H.gavel }); B.cyl(0.09, 0.09, 0.34, "#3a2418", 0, 0.5, 0, { in: H.gavel, rz: PI / 2, seg: 14 });
        H.lost = B.dyn(B.grp(1.9, 1.5, -0.2, 0, 1)); B.plate(1.2, 0.36, tt(B, "CASE: LOST", "#ffffff", RED, 1.2, 0.36, "Arial"), 0, 0, 0, { in: H.lost, d: 0.02, edge: RED }); hide(H.lost);
        B.prop.lamp({ kind: "hang", x: 0, y: 5.2, z: -1 }); B.lamp(0, 3.5, 1, "#ffe0b0", 5, 12);
      },
      // John & Sal's pizzeria: tiled walls, counter, a pizza of six slices, a brick oven that grows
      pizza: (B) => {
        B.set.room({ style: "kitchen", w: 10, d: 8, h: 4.2, door: false, wall: "tiles:#f4f0e6:#d8e8d0" });
        B.plate(4.0, 0.8, tt(B, "JOHN & SAL'S PIZZERIA", "#2f7a4a", "#ffffff", 4.0, 0.8, "Arial"), 0, 3.2, -3.95, { d: 0.05, edge: RED });
        B.prop.counter({ x: -0.5, z: -1.2, w: 3.6, h: 1.0, col: "westwood:#8a5a34" });
        H.oven = B.dyn(B.grp(2.3, 0, -2.6, -0.35, 1)); B.box(1.9, 0.9, 1.6, "brick:#a5503a", 0, 0, 0, { in: H.oven }); B.ball(0.9, "brick:#b5603a", 0, 0.9, 0, { in: H.oven, sy: 0.75 });
        B.box(0.8, 0.5, 0.05, "#ff8a2a", 0, 1.0, 0.83, { in: H.oven, cast: false }); B.cyl(0.18, 0.18, 1.2, "brick:#8a4030", 0, 1.4, -0.2, { in: H.oven, seg: 12 });
        H.slices = []; for (let i = 0; i < 6; i++) { const a = (i * PI) / 3, g = B.dyn(B.grp(-0.6 + 0.2 * Math.cos(a), 1.0, -1.15 + 0.2 * Math.sin(a), -a, 1)); B.box(0.36, 0.04, 0.22, "#f2c77a", 0, 0, 0, { in: g }); B.box(0.3, 0.02, 0.17, "#d84a2e", -0.02, 0.04, 0, { in: g }); B.ball(0.035, "#8a1a1a", 0.04, 0.065, 0.03, { in: g }); H.slices.push(g); }
        B.prop.shelf({ x: -3.4, z: -3.7, w: 1.6, h: 1.8, fill: "bottles" }); B.prop.lamp({ kind: "hang", x: -0.5, y: 4.0, z: -1.2 });
        B.lamp(0, 3, 1.5, "#ffe0b8", 4, 10);
      },
    },
    shots: [
      // 0 · frame 0: an engine block DROPS onto the gold pedestal — THUD — beneath a giant stock certificate
      { set: "cert", f: 0, light: STAGE, cam: CAM.fit([0.2, 1.4, 0.0], { w: 3.6, a0: -16, a1: -6, e0: 12, e1: 6, push: 0.12 }),
        act: (S, u, f) => { H.cert.draw({}); const k = E.prog(f, 0, 7); H.engine.position.y = 0.55 + 2.6 * (1 - E.easeIn(k)); H.engine.rotation.z = 0.5 * (1 - k); S.kick(7, 0.12); H.pipe.visible = false; H.bag.visible = false;
          S.pop("impact", 7, 16, { x: 0.9, y: 1.4, z: 0.6, w: 0.9, h: 0.45, text: "THUD!" }); S.pop("puff", 7, 16, { x: 0, y: 0.6, z: 0.6, w: 2.0, h: 0.6 });
          S.pop("label", W(0, "deal") - 2, 60, { x: 0.5, y: 3.65, z: -2.2, w: 1.9, h: 0.36, text: "BEST STOCK DEAL?", bg: GOLD, hold: true }); } },
      // 1 · …paid in engine parts: close — a little STOCK certificate flutters down onto the engine
      { set: "cert", word: [0, "paid"], lead: 3, steady: true, coc: 10, light: STAGE, cam: CAM.fit([0, 1.0, 0.4], { w: 1.8, a0: 14, a1: 6, elev: 10, push: 0.12 }),
        act: (S, u, f) => { H.cert.draw({}); H.pipe.visible = false; H.bag.visible = false; H.mini.visible = true; const k = E.ss(E.prog(f, S.a, W(0, "parts.") + 4)); H.mini.position.set(0.1 * Math.sin(f * 0.2) * (1 - k), 1.9 - 0.85 * k, 0.45); H.mini.rotation.set(-1.2 * k, 0, 0.5 * Math.sin(f * 0.15) * (1 - k));
          S.pop("label", W(0, "engine"), 40, { x: 0, y: 1.75, z: 0.6, w: 1.2, h: 0.3, text: "ENGINE PARTS", bg: "#ffffff", col: INK, hold: true }); S.pop("sparks", W(0, "parts.") + 4, 14, { x: 0, y: 1.15, z: 0.6, w: 0.8, h: 0.5 }); } },
      // 2 · Detroit, 1903: whip to the brick street — the two brothers outside their shop, one early car parked
      { set: "detroit", beat: 1, trans: "whip", dir: 1, light: "golden", cam: CAM.fit([0, 1.6, -3.0], { w: 4.6, a0: -10, a1: 2, e0: 8, e1: 4, push: 0.1 }),
        act: (S, u, f) => { H.cars[0].position.set(2.0, 0, -5.5); H.cars[1].visible = false; H.cars[2].visible = false;
          S.actor("john", { x: -0.6, z: -2.6, expr: "smile", look: 0.3 }); S.actor("horace", { x: 0.5, z: -2.7, expr: "grin", look: -0.3, prop: "wave", wave: 0.5 + 0.5 * Math.sin(f * 0.45) });
          S.pop("label", W(1, "nineteen") - 2, 50, { x: 0, y: 3.2, z: -2.8, w: 1.7, h: 0.38, text: "DETROIT · 1903", bg: "#f4efe2", col: RED, hold: true }); } },
      // 3 · Henry Ford can't pay your bill: in the shop — Henry shrugs, empty-handed; John holds out the BILL
      { set: "shop", word: [1, "Henry"], lead: 3, trans: "cut", light: "lamp", cam: CAM.fit([0, 1.35, -0.2], { w: 3.0, a0: 16, a1: 6, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.bill.visible = true; H.bill.position.set(-0.55, 1.25 + 0.03 * Math.sin(f * 0.3), 0.15);
          S.actor("john", { x: -0.9, z: 0.0, expr: f > W(1, "bill.") ? "stern" : "neutral", prop: "hold", look: 0.6 }); S.actor("henry", { x: 0.7, z: -0.1, expr: "nervous", prop: "shrug", look: -0.6 });
          S.say("Take shares instead?", W(1, "can't"), 44, { x: 0.45, y: AH + 0.8, z: 0.0, w: 1.2, h: 0.46, tail: "right" }); S.pop("sweat", W(1, "pay"), 30, { x: 0.95, y: AH + 0.15, z: 0.1, w: 0.25, h: 0.3 }); } },
      // 4 · so your $10,000 of parts: dissolve to the workbench insert — engines, axles, gears, the price tag
      { set: "shop", beat: 2, trans: "dissolve", steady: true, coc: 11, light: "lamp", cam: CAM.fit([0.2, 1.15, -1.6], { w: 2.4, a0: -18, a1: -8, elev: 16, push: 0.12 }),
        act: (S, u, f) => { H.belt.rotation.z = f * 0.08; S.pop("label", W(2, "ten") - 2, 50, { x: 0.2, y: 1.95, z: -1.4, w: 1.7, h: 0.34, text: "$10,000 OF PARTS", bg: GOLD, hold: true }); S.pop("sparks", W(2, "parts"), 14, { x: -0.6, y: 1.45, z: -1.3, w: 0.6, h: 0.5 }); } },
      // 5 · …buys ten percent of his company: PUSH THROUGH to the certificate — one gold slice slides out to the brothers
      { set: "cert", word: [2, "buys"], lead: 3, trans: "zoom", light: STAGE, cam: CAM.fit([0.2, 2.0, -1.2], { w: 4.2, a0: -6, a1: 4, elev: 3, push: 0.08 }),
        act: (S, u, f) => { const t = W(2, "ten", 1); H.pipe.visible = false; H.bag.visible = false; H.engine.visible = false; H.ped.visible = false;
          const k = E.ss(E.prog(f, t, t + 22)); H.cert.draw({ gold: true, out: f >= t }); H.slice.visible = f >= t; H.slice.position.set(-0.83 - 0.35 * k, 2.32 - 0.45 * k, -2.3 + 1.9 * k); H.slice.rotation.z = 0.25 * k;
          S.actor("john", { x: -1.05, z: 0.6, expr: f > t + 10 ? "grin" : "smile", prop: f > t + 10 ? "up" : "point", look: 0.5 }); S.actor("horace", { x: -0.2, z: 0.9, expr: "grin", look: -0.3 });
          S.pop("label", W(2, "percent"), 40, { x: 0.5, y: 3.6, z: -2.2, w: 1.4, h: 0.36, text: "10% OF FORD", bg: GOLD, hold: true }); } },
      // 6 · the Model T takes off: whip to the street — black Model Ts roll past, the brothers point and cheer
      { set: "detroit", beat: 3, trans: "whip", dir: -1, light: "office", cam: CAM.fit([0.4, 1.2, 1.0], { w: 4.4, a0: 22, a1: 10, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const d = (f - S.a) * 0.11; H.cars[0].position.set(1.2, 0, -8 + d); H.cars[1].position.set(1.2, 0, -15 + d); H.cars[2].position.set(1.2, 0, -22 + d); for (const c of H.cars) c.rotation.y = -PI / 2; for (const c of H.cars) c.position.y = 0.02 * Math.sin(f * 0.9);
          S.actor("john", { x: -0.9, z: 1.3, expr: "laugh", prop: "point", look: 0.4 }); S.actor("horace", { x: -0.1, z: 1.6, expr: "grin", prop: "up" });
          S.pop("label", W(3, "Model") - 2, 40, { x: 0.6, y: 2.7, z: -1.0, w: 1.3, h: 0.4, text: "MODEL T", bg: "#17171c", col: "#ffffff", hold: true }); S.pop("speed", W(3, "takes"), 20, { x: 1.6, y: 0.9, z: -2.0, w: 1.6, h: 0.8 }); } },
      // 7 · dividends pour in by the million: the gold pipe gushes coins into the brothers' money bag
      { set: "cert", word: [3, "Dividends"], lead: 3, trans: "whip", dir: 1, light: STAGE, cam: CAM.fit([-1.4, 1.6, -0.2], { w: 3.6, a0: 14, a1: 4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.engine.visible = false; H.ped.visible = false; H.cert.draw({ gold: true });
          H.coins.forEach((c, i) => { const ph = ((f + i * 3.3) % 20) / 20; c.visible = true; c.position.set(-1.5 + 0.12 * Math.sin(i * 2.1), 2.2 - 1.6 * ph * ph, -0.4 + 0.1 * Math.cos(i)); c.rotation.set(f * 0.3 + i, 0, i); });
          const sw = 1 + 0.05 * Math.sin(f * 0.6); H.bag.scale.set(sw, sw, sw);
          S.actor("john", { x: -2.4, z: 0.2, expr: "laugh", prop: "up" }); S.actor("horace", { x: -0.5, z: 0.3, expr: "laugh", prop: "fists" });
          S.pop("label", W(3, "million.") - 2, 30, { x: -1.4, y: 3.85, z: -0.3, w: 1.5, h: 0.4, text: "$ MILLIONS", bg: GREEN, col: "#fff", hold: true }); S.pop("coin", W(3, "million."), 20, { x: -1.0, y: 1.6, z: 0.2, w: 0.5, h: 0.5 }); } },
      // 8 · in 1916, Henry…: whip to the factory — the assembly line runs, Henry at his blueprint, 1916 on the wall
      { set: "plant", beat: 4, trans: "whip", dir: -1, light: "interior", cam: CAM.fit([0.6, 1.8, -1.2], { w: 4.6, a0: -18, a1: -6, elev: 5, push: 0.1 }),
        act: (S, u, f) => { H.plan.draw({}); H.line.forEach((c, i) => (c.position.x = -6 + ((i * 3 + f * 0.03) % 15))); S.pop("label", W(4, "sixteen,") - 2, 30, { x: -4.0, y: 3.6, z: -4.7, w: 1.0, h: 0.3, text: "1916", bg: RED, col: "#fff" });
          S.actor("henry", { x: 0.2, z: -0.4, expr: "grin", prop: "point", look: 0.7 }); } },
      // 9 · …stops the big dividends to build cheaper cars: Henry cranks the red valve shut — the coin stream stops
      { set: "cert", word: [4, "stops"], lead: 3, trans: "whip", dir: 1, light: STAGE, cam: CAM.fit([-1.6, 2.0, 0.0], { w: 3.8, a0: -12, a1: -2, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const t = W(4, "dividends"); H.engine.visible = false; H.ped.visible = false; H.valve.rotation.z = -3 * E.ss(E.prog(f, S.a, t + 4));
          H.coins.forEach((c, i) => { const ph = ((f + i * 3.3) % 20) / 20, born = f - ph * 20; c.visible = born < t; c.position.set(-1.5 + 0.12 * Math.sin(i * 2.1), 2.2 - 1.6 * ph * ph, -0.4); c.rotation.set(f * 0.3 + i, 0, i); });
          S.actor("henry", { x: -2.4, z: 0.1, expr: "stern", prop: "fists", look: 0.4 }); S.actor("john", { x: -0.6, z: 0.4, expr: f > t ? "shock" : "smile", prop: f > t ? "shrug" : "hold", look: -0.5 });
          S.pop("impact", t + 2, 18, { x: -1.5, y: 2.0, z: -0.1, w: 0.9, h: 0.42, text: "STOP!" }); S.pop("label", W(4, "cheaper"), 30, { x: -2.4, y: 3.85, z: 0.0, w: 1.7, h: 0.34, text: "FOR CHEAPER CARS", bg: "#ffffff", col: INK, hold: true }); } },
      // 10 · so you sue him: SMASH — the brothers slap a LAWSUIT on Henry's desk
      { set: "plant", beat: 5, trans: "smash", light: "interior", cam: CAM.fit([-1.4, 1.3, 0.4], { w: 3.0, a0: 20, a1: 12, elev: 8, push: 0.12, roll: -2 }),
        act: (S, u, f) => { H.plan.draw({}); const t = W(5, "sue"); H.suit.visible = f >= t - 4; const k = E.prog(f, t - 4, t + 1); H.suit.position.y = 0.82 + 0.9 * (1 - E.easeIn(k)); S.kick(t + 1, 0.1);
          S.actor("henry", { x: -1.4, z: -0.4, expr: f > t ? "shock" : "neutral", look: 0.4 }); S.actor("john", { x: -2.4, z: 0.9, expr: "stern", prop: "point", look: 0.5 }); S.actor("horace", { x: -0.3, z: 1.0, expr: "stern", prop: "fists", look: -0.5 });
          S.pop("impact", t + 1, 20, { x: -1.4, y: 1.4, z: 0.6, w: 0.9, h: 0.45, text: "SUED!" }); } },
      // 11 · can a boss just keep the owners' profits?: dissolve to the courtroom — both sides at their tables
      { set: "court", beat: 6, trans: "dissolve", light: "interior", cam: CAM.fit([0, 1.6, -1.4], { w: 5.2, a0: -8, a1: 4, elev: 6, push: 0.08 }),
        act: (S, u, f) => { S.actor("judge", { x: 0, y: 0.55, z: -3.8, expr: "stern" }); S.actor("john", { x: -2.3, z: 0.2, expr: "nervous", look: 0.3 }); S.actor("horace", { x: -1.5, z: 0.3, expr: "stern", look: 0.3 }); S.actor("henry", { x: 1.6, z: 0.3, expr: "smile", look: -0.3 });
          S.pop("question", W(6, "keep") - 2, 40, { x: 0, y: 2.3, z: -0.6, w: 0.5, h: 0.6, hold: true }); } },
      // 12 · …profits?: close on Henry hugging the money bag, a sly grin
      { set: "court", word: [6, "profits?"], lead: 5, steady: true, coc: 11, light: "interior", cam: CAM.fit([1.75, 1.3, 0.1], { w: 1.6, a0: -10, a1: -4, elev: 4, push: 0.12 }),
        act: (S, u, f) => { H.cbag.position.set(1.55, 0.78, 0.0); S.actor("henry", { x: 1.75, z: -0.05, expr: "grin", prop: "hold", look: -0.2 }); S.pop("question", S.a + 3, 24, { x: 2.3, y: AH + 0.4, z: 0.0, w: 0.3, h: 0.4, hold: true }); } },
      // 13 · you see, you co-own a pizzeria: whip to John & Sal's — John and Sal behind the counter, a fresh pizza
      { set: "pizza", beat: 7, trans: "whip", dir: 1, light: "interior", cam: CAM.fit([-0.4, 1.4, -1.6], { w: 3.4, a0: -14, a1: -4, elev: 6, push: 0.1 }),
        act: (S, u, f) => { S.actor("john", { x: -1.3, z: -2.1, expr: "smile", look: 0.4 }); S.actor("sal", { x: 0.4, z: -2.1, expr: "grin", look: -0.4, prop: "wave", wave: 0.5 + 0.5 * Math.sin(f * 0.4) });
          S.pop("label", W(7, "co-own") - 2, 40, { x: -0.4, y: 2.65, z: -1.8, w: 1.3, h: 0.32, text: "CO-OWNERS", bg: GREEN, col: "#fff", hold: true }); S.pop("heart", W(7, "pizzeria,"), 18, { x: -0.6, y: 1.5, z: -1.0, w: 0.35, h: 0.35 }); } },
      // 14 · …your partner keeps every slice for a bigger oven: Sal sweeps the slices into the oven, which swells
      { set: "pizza", word: [7, "partner"], lead: 4, light: "interior", cam: CAM.fit([0.6, 1.3, -1.6], { w: 3.8, a0: 14, a1: 6, elev: 6, push: 0.1 }),
        act: (S, u, f) => { const t0 = W(7, "every"), tb = W(7, "bigger");
          H.slices.forEach((g, i) => { const k = E.ss(E.prog(f, t0 + i * 3, t0 + i * 3 + 14)), a = (i * PI) / 3; g.position.set(E.lerp(-0.6 + 0.2 * Math.cos(a), 2.2, k), 1.0 + 0.5 * Math.sin(PI * k), E.lerp(-1.15 + 0.2 * Math.sin(a), -1.9, k)); g.visible = k < 0.98; });
          const ov = 1 + 0.45 * E.back(E.prog(f, tb, tb + 10)); H.oven.scale.setScalar(ov);
          S.actor("sal", { x: 1.0, z: -1.9, expr: "laugh", prop: "fists", look: 0.5 }); S.actor("john", { x: -0.85, z: -2.0, expr: f > t0 + 6 ? "shock" : "smile", prop: f > t0 + 6 ? "shrug" : "hold", look: 0.6 });
          S.say("For the oven!", W(7, "keeps"), 40, { x: 0.3, y: AH + 0.8, z: -1.8, w: 1.1, h: 0.42, tail: "right" }); S.pop("label", W(7, "oven."), 24, { x: 2.3, y: 2.8, z: -2.4, w: 1.3, h: 0.32, text: "BIGGER OVEN", bg: RED, col: "#fff", hold: true }); } },
      // 15 · in 1919, Michigan's top court: whip to the courtroom wide — the bench, the sign, 1919
      { set: "court", beat: 8, trans: "whip", dir: -1, light: "interior", cam: CAM.fit([0, 2.6, -3.2], { w: 5.6, a0: 6, a1: -4, elev: 2, push: 0.08 }),
        act: (S, u, f) => { S.actor("judge", { x: 0, y: 0.55, z: -3.8, expr: "stern" }); S.pop("label", W(8, "nineteen,") - 2, 50, { x: 0, y: 3.55, z: -4.3, w: 1.0, h: 0.34, text: "1919", bg: GOLD, hold: true }); } },
      // 16 · …says a company exists: closer on the judge — the ruling scroll unrolls behind the bench
      { set: "court", word: [8, "says"], lead: 3, light: "interior", cam: CAM.fit([0, 2.2, -3.2], { w: 2.8, a0: -10, a1: -2, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.rule.p.visible = true; const k = E.back(E.prog(f, W(8, "exists") - 4, W(8, "exists") + 6)); H.rule.p.scale.set(1, Math.max(0.01, k), 1);
          H.gavel.rotation.z = 0.6 * E.ss(E.prog(f, S.a, S.a + 10)); S.actor("judge", { x: 0.3, y: 0.55, z: -3.8, expr: "stern", prop: "point", look: -0.3 }); } },
      // 17 · …mainly for its stockholders' profit: the gavel BANGS on "profit"
      { set: "court", word: [8, "mainly"], lead: 3, steady: true, coc: 9, light: "interior", cam: CAM.fit([-0.3, 2.0, -2.8], { w: 2.4, a0: 10, a1: 4, elev: 10, push: 0.12 }),
        act: (S, u, f) => { const t = W(8, "profit."); H.rule.p.visible = true; H.gavel.rotation.z = f < t - 6 ? 0.6 + 0.4 * E.ss(E.prog(f, S.a, t - 6)) : 1.0 - 1.0 * E.easeIn(E.prog(f, t - 6, t)); S.kick(t, 0.1);
          S.actor("judge", { x: 0.35, y: 0.55, z: -3.8, expr: f >= t ? "grin" : "stern" }); S.pop("impact", t, 18, { x: -0.9, y: 1.8, z: -2.6, w: 0.8, h: 0.4, text: "BANG!" }); S.pop("label", W(8, "stockholders'") - 3, 40, { x: -0.2, y: 1.75, z: -2.4, w: 1.7, h: 0.32, text: "STOCKHOLDERS WIN", bg: GREEN, col: "#fff", hold: true }); } },
      // 18 · Ford pays out $19 million: whip to the stage — the pipe bursts back open, coins flood, confetti
      { set: "cert", beat: 9, trans: "whip", dir: 1, light: STAGE, cam: CAM.fit([-1.3, 1.7, 0.0], { w: 4.0, a0: 12, a1: 2, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.engine.visible = false; H.ped.visible = false; H.valve.rotation.z = -3 + 3 * E.ss(E.prog(f, S.a, S.a + 12)); H.cert.draw({ gold: true });
          H.coins.forEach((c, i) => { const ph = ((f + i * 2.1) % 13) / 13; c.visible = f > S.a + 6; c.position.set(-1.5 + 0.35 * Math.sin(i * 2.1) * ph, 2.2 - 1.7 * ph * ph, -0.4 + 0.3 * Math.cos(i) * ph); c.rotation.set(f * 0.3 + i, 0, i); });
          const sw = 1.15 + 0.08 * Math.sin(f * 0.7); H.bag.scale.set(sw, sw, sw); S.actor("john", { x: -2.4, z: 0.4, expr: "laugh", prop: "up", tilt: 6 * Math.sin(f * 0.4) }); S.actor("horace", { x: -0.4, z: 0.5, expr: "laugh", prop: "up", tilt: -6 * Math.sin(f * 0.4) });
          S.pop("label", W(9, "nineteen") - 2, 50, { x: -1.4, y: 3.85, z: -0.2, w: 1.6, h: 0.42, text: "$19 MILLION", bg: GOLD, hold: true }); S.pop("confetti", W(9, "million"), 40, { x: -1.4, y: 3.0, z: 0, w: 3.4, h: 2.2, pop: false }); } },
      // 19 · so Henry plans a new company: whip to the factory — Henry flips his blueprint: NEW COMPANY · CHEAPER CAR
      { set: "plant", beat: 10, trans: "whip", dir: -1, light: "interior", cam: CAM.fit([1.0, 1.7, -0.6], { w: 3.4, a0: 16, a1: 8, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const t = W(10, "plans"); H.plan.draw({ text: f >= t ? "NEW COMPANY\nCHEAPER CAR" : "MORE FACTORIES\nCHEAPER CARS" }); H.line.forEach((c, i) => (c.position.x = -6 + ((i * 3 + f * 0.03) % 15)));
          S.actor("henry", { x: 0.0, z: -0.3, expr: f >= t ? "grin" : "neutral", prop: "point", look: 0.7 }); S.pop("sparks", t + 2, 16, { x: 1.5, y: 2.0, z: -0.6, w: 1.4, h: 0.9 }); } },
      // 20 · …with a cheaper car: the newspaper spins in — FORD PLANS NEW COMPANY, CHEAPER CAR
      { set: "plant", word: [10, "company"], lead: 3, steady: true, coc: 9, light: "interior", cam: CAM.fit([0, 1.7, 0.6], { w: 1.7, a0: 0, a1: 4, elev: 2, push: 0.1 }),
        act: (S, u, f) => { H.news.p.visible = true; const k = E.easeOut(E.prog(f, S.a, S.a + 16)); H.news.p.rotation.z = 4 * PI * (1 - k); H.news.p.scale.setScalar(0.2 + 0.8 * k); H.easel.visible = false; } },
      // 21 · everyone else sells: dissolve to the stage — shareholders hand over their slices, the certificate turns FORD-blue
      { set: "cert", beat: 11, trans: "dissolve", light: STAGE, cam: CAM.fit([0.4, 2.0, -1.0], { w: 4.4, a0: -8, a1: 2, elev: 3, push: 0.08 }),
        act: (S, u, f) => { H.engine.visible = false; H.ped.visible = false; H.pipe.visible = false; H.bag.visible = false; const n = Math.min(9, Math.floor(E.prog(f, S.a, W(11, "buys") + 2) * 9)); H.cert.draw({ gold: true, ford: n });
          S.actor("holder1", { x: -0.9, z: 0.7, expr: "nervous", prop: "hold", look: 0.6 }); S.actor("holder2", { x: -0.1, z: 1.0, expr: "nervous", prop: "hold", look: 0.6 }); S.actor("henry", { x: 1.9, z: 0.4, expr: "grin", prop: "fists", look: -0.6 });
          S.pop("label", W(11, "sells,") - 2, 30, { x: -0.5, y: 2.45, z: 0.8, w: 0.9, h: 0.3, text: "SOLD!", bg: RED, col: "#fff" }); } },
      // 22 · …and Henry buys every last share: the last slice turns blue — FORD · 100%
      { set: "cert", word: [11, "buys"], lead: 3, light: STAGE, cam: CAM.fit([0.8, 1.9, -0.8], { w: 3.6, a0: 12, a1: 4, elev: 3, push: 0.1 }),
        act: (S, u, f) => { const t = W(11, "share."); H.engine.visible = false; H.ped.visible = false; H.pipe.visible = false; H.bag.visible = false; H.cert.draw({ ford: f >= t ? 10 : 9, gold: f < t });
          S.actor("henry", { x: 1.6, z: 0.5, expr: f >= t ? "laugh" : "grin", prop: f >= t ? "up" : "point", look: -0.4 }); S.pop("label", t - 2, 30, { x: 0.5, y: 3.65, z: -2.2, w: 1.0, h: 0.4, text: "100%", bg: BLUE, col: "#fff", hold: true }); S.pop("sparks", t, 16, { x: -0.6, y: 2.4, z: -2.1, w: 0.8, h: 1.2 }); } },
      // 23 · your $10,000 of parts (music stops): dissolve back to the quiet shop bench — the brothers look at the parts
      { set: "shop", beat: 12, trans: "dissolve", light: (u) => K.mixLight(K.light("lamp"), K.light("cold"), 0.3), cam: CAM.fit([0, 1.3, -1.0], { w: 3.4, a0: -6, a1: 2, elev: 6, push: 0.1, roll: 1 }),
        act: (S, u, f) => { H.belt.rotation.z = f * 0.02; S.actor("john", { x: -1.0, z: -0.6, expr: "neutral", look: 0.4 }); S.actor("horace", { x: 1.0, z: -0.6, expr: "neutral", look: -0.4 });
          S.pop("label", W(12, "ten") - 2, 36, { x: 0, y: 2.2, z: -1.4, w: 1.1, h: 0.36, text: "$10,000", bg: "#ffffff", col: INK, hold: true }); } },
      // 24 · …becomes twenty-five million: the parts heap turns into a mountain of gold, cash and coins
      { set: "shop", word: [12, "becomes"], lead: 3, light: (u) => K.mixLight(K.light("lamp"), K.light("golden"), 0.4), cam: CAM.fit([0, 1.25, -1.1], { w: 3.0, a0: 10, a1: 4, elev: 8, push: 0.12 }),
        act: (S, u, f) => { const t = W(12, "twenty-five"); H.parts.visible = f < t - 2; H.money.visible = f >= t - 2; pop(H.money, f, t - 2, 9, 1.15); S.kick(t, 0.06);
          S.actor("john", { x: -0.8, z: -0.4, expr: f > t ? "shock" : "neutral", prop: f > t ? "up" : "hold", look: 0.4 }); S.actor("horace", { x: 0.8, z: -0.4, expr: f > t ? "laugh" : "neutral", prop: f > t ? "fists" : "hold", look: -0.4 });
          S.pop("label", t - 1, 50, { x: 0, y: 2.25, z: -1.3, w: 1.6, h: 0.4, text: "$25,000,000", bg: GOLD, hold: true }); S.pop("coin", t + 2, 24, { x: 0.5, y: 1.7, z: -1.0, w: 0.5, h: 0.5 }); } },
      // 25 · Henry lost the case: whip to the courtroom — CASE: LOST slaps up beside Henry, who just shrugs and smiles
      { set: "court", beat: 13, trans: "whip", dir: 1, light: "interior", cam: CAM.fit([1.8, 1.5, -0.2], { w: 2.6, a0: -14, a1: -6, elev: 5, push: 0.1 }),
        act: (S, u, f) => { const t = W(13, "case,"); H.lost.visible = f >= t - 2; pop(H.lost, f, t - 2, 6); H.lost.position.set(2.35, 2.25, -0.2); S.kick(t, 0.05);
          S.actor("henry", { x: 1.6, z: 0.3, expr: f > t + 4 ? "smile_closed" : "nervous", prop: f > t + 4 ? "shrug" : "hold", look: 0.2 }); } },
      // 26 · …and won the whole company: PUSH THROUGH to the certificate — the giant stamp SLAMS: 100% FORD
      { set: "cert", word: [13, "won"], lead: 4, trans: "zoom", light: STAGE, cam: CAM.fit([0.3, 2.0, -0.8], { w: 3.6, a0: -6, a1: 2, elev: 4, push: 0.08 }),
        act: (S, u, f) => { const t = W(13, "company."); H.engine.visible = false; H.ped.visible = false; H.pipe.visible = false; H.bag.visible = false;
          H.stamp.visible = true; const k = E.prog(f, t - 8, t), r = E.ss(E.prog(f, t + 3, t + 14)); H.stamp.rotation.set(PI / 2, 0, 0); H.stamp.scale.setScalar(0.8); if (f < t) H.stamp.position.set(0.5, 2.3 + 1.6 * (1 - k), 0.6 - 2.95 * E.easeIn(k)); else H.stamp.position.set(0.5, 2.3 + 3.5 * r, -2.35 + 1.2 * r);
          H.cert.draw({ ford: 10, stamp: f >= t }); S.kick(t, 0.18); S.pop("impact", t, 24, { x: 1.9, y: 3.4, z: -1.2, w: 1.1, h: 0.55, text: "SLAM!" }); S.pop("puff", t, 18, { x: 0.5, y: 2.4, z: -1.6, w: 3.2, h: 1.0 });
          S.actor("henry", { x: -0.55, z: 0.9, expr: f >= t ? "laugh" : "grin", prop: f >= t ? "up" : "point", look: 0.5 }); } },
    ],
  };
};
