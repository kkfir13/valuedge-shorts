// "The Ones Who Stayed" — Charlie Munger's investment partnership, 1962–75 (Buffett's 1984 "Superinvestors" table):
// eight years without a losing year, then 1973 −31.9% and 1974 −31.5% (a dollar became about 47 cents), then 1975 +73.2%;
// over fourteen years 19.8% a year against the Dow's 5% — one dollar became about $12.57. Only the partners who stayed got it.
// 2009, BBC: if you can't take a 50% drop, "you deserve the mediocre result you're going to get".
// Worlds: a cobalt metaphor stage with a giant roller coaster shaped like the partnership's ride (crest, deep valley with an
// EXIT platform, a higher second peak); sunny 1962 Los Angeles (stucco shops, palms, a LAW OFFICES front, a convertible);
// Munger's 1960s partnership office (gold wallpaper, WHEELER, MUNGER & CO. door glass, desk with a ticker screen, coin stack);
// your orange 1974 den (wood-box TV with a red crash line, sofa, coffee table with a shrinking dollar, a door Hank slams);
// a mustard bar-chart stage (fourteen yearly bars, then MUNGER vs DOW); a red-velvet movie theatre (the analogy: a shadow
// monster on the screen, a green EXIT); a 2009 interview studio; payoff: a tin MEDIOCRE cup clangs onto Hank's head.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const H = {};
  const PI = Math.PI;
  const AH = 1.55;
  const GOLD = "#f2c14e", INK = "#1d1a26", CREAM = "#f4ecd6", RED = "#d23a32", GREEN = "#2f8a4a", COBALT = "#2f5fae", MUSTARD = "#d9a632";
  const STAGE = K.backdrop(COBALT);
  const BARS = K.backdrop(MUSTARD);

  const tt = (B, s, bg, fg, pw, ph, font = "Arial") => { const w = 1024, h = Math.round((1024 * ph) / pw), cv = document.createElement("canvas"); cv.width = w; cv.height = h; const g = cv.getContext("2d");
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

  // ---------- the coaster track (metaphor for the partnership's ride) ----------
  const KP = [[-13, 0.5], [-6, 2.4], [-1.2, 5.6], [0.8, 5.8], [4.6, 0.9], [6.2, 0.85], [10.6, 7.0], [14, 7.1]];
  const ty = (x) => { if (x <= KP[0][0]) return KP[0][1]; for (let i = 0; i < KP.length - 1; i++) { const [x0, y0] = KP[i], [x1, y1] = KP[i + 1]; if (x <= x1) { const k = (x - x0) / (x1 - x0); return y0 + (y1 - y0) * (1 - Math.cos(PI * k)) / 2; } } return KP[KP.length - 1][1]; };
  const ang = (x) => Math.atan((ty(x + 0.05) - ty(x - 0.05)) / 0.1);
  const RIDERS = [["munger", 0.85], ["you", 0.0], ["hank", -0.85]];
  const placeCart = (x) => { H.cart.position.set(x, ty(x) + 0.14, 0); H.cart.rotation.z = ang(x); };
  // riders in the cart: o[id] = {expr, prop, ...}; skip ids set to null
  const ride = (S, x, o = {}) => { const a = ang(x), c = Math.cos(a), s = Math.sin(a), y0 = ty(x) + 0.14;
    for (const [id, dx] of RIDERS) { if (o[id] === null) continue; S.actor(id, { x: x + dx * c - 0.0 * s, y: y0 + dx * s + 0.14 + 0.45 * Math.abs(s), z: 0.12 + 0.6 * Math.abs(s), mode: "sit", tilt: (a * 180) / PI * 0.5, expr: "neutral", ...(o[id] || {}) }); } };
  const cartCam = (fx, o) => (u, lf, f) => { const x = fx(f); return CAM.fit([x + (o.dx ?? 0), ty(x) + (o.dy ?? 1.0), 0], o)(u, lf, f); };

  // ---------- painters ----------
  const monsterPaint = (c, w, h, q) => { c.fillStyle = q.boo ? "#3a2a5a" : "#1a2238"; c.fillRect(0, 0, w, h);
    c.fillStyle = "#2a3a5a"; for (let i = 0; i < 6; i++) c.fillRect(i * w / 6 + 10, h * 0.72, w / 6 - 30, h * 0.28); // a dark street
    const k = q.k ?? 0; c.fillStyle = "#0c0a14"; c.beginPath(); c.ellipse(w * 0.5, h * (0.95 - 0.35 * k), w * (0.18 + 0.12 * k), h * (0.3 + 0.35 * k), 0, PI, 0); c.fill();
    if (k > 0.2) { c.fillStyle = "#ffe14a"; for (const sx of [-1, 1]) { c.beginPath(); c.ellipse(w * (0.5 + sx * 0.07 * (1 + k)), h * (0.78 - 0.32 * k), w * 0.03 * (1 + k), h * 0.05 * (1 + k), 0, 0, PI * 2); c.fill(); } } };
  const ticketPaint = (c, w, h, q) => { c.fillStyle = "#f4d88a"; c.fillRect(0, 0, w, h); c.strokeStyle = "#8a3a2a"; c.setLineDash([18, 12]); c.lineWidth = 8; c.strokeRect(24, 24, w - 48, h - 48); c.setLineDash([]);
    c.fillStyle = "#8a3a2a"; c.textAlign = "center"; c.textBaseline = "middle"; c.font = `bold ${Math.round(h * 0.2)}px Arial`; c.fillText("ADMIT ONE", w / 2, h * 0.3); c.font = `bold ${Math.round(h * 0.14)}px Arial`; c.fillText("WHOLE FILM: 2 HRS", w / 2, h * 0.52);
    if (q.s) { c.save(); c.translate(w / 2, h * 0.74); c.rotate(-0.08); c.fillStyle = RED; c.fillRect(-w * 0.42, -h * 0.12, w * 0.84, h * 0.24); c.fillStyle = "#fff"; c.font = `bold ${Math.round(h * 0.11)}px Arial`; c.fillText("YOU SAW: WORST 20 MIN", 0, 4); c.restore(); } };
  const dollarPaint = (c, w, h, q) => { c.fillStyle = "#cfe3c0"; c.fillRect(0, 0, w, h); c.strokeStyle = "#2f6a3a"; c.lineWidth = 14; c.strokeRect(14, 14, w - 28, h - 28);
    c.fillStyle = "#2f6a3a"; c.textAlign = "center"; c.textBaseline = "middle"; c.font = `bold ${Math.round(h * 0.5)}px Georgia`; c.fillText("$1", w / 2, h * 0.54);
    c.beginPath(); c.arc(w * 0.16, h * 0.5, h * 0.2, 0, PI * 2); c.stroke(); c.beginPath(); c.arc(w * 0.84, h * 0.5, h * 0.2, 0, PI * 2); c.stroke(); };

  // cumulative value of $1 in the partnership, end of 1962..1975 (from the yearly results)
  const CUM = [1.301, 2.234, 3.344, 3.625, 4.075, 6.365, 8.936, 11.465, 11.454, 14.363, 15.555, 10.593, 7.256, 12.568];
  const BCOL = CUM.map((_, i) => (i === 11 || i === 12 ? RED : i === 13 ? GOLD : GREEN));

  return {
    cast: {
      munger: { jacket: "#3d434f", pants: "#3d434f", boots: "#1a1a1e", hat: "hair", hair: "#2e2620", skin: "#f0cfb0", buttons: "#e8e8ee" },
      mungerOld: { jacket: "#2a2d36", pants: "#2a2d36", boots: "#1a1a1e", hat: "hair", hair: "#efece6", skin: "#f2d4ba", buttons: "#e8e8ee" },
      you: { jacket: "#2f7a6a", pants: "#5a4a3a", boots: "#3a2418", hat: "hair", hair: "#6a4a2a", skin: "#f2c8a0", buttons: "#f4efe2" },
      hank: { jacket: "#9a5a2a", pants: "#3a4a6a", boots: "#2a1a14", hat: "hair", hair: "#7a3a1a", moustache: "#7a3a1a", skin: "#e8b890", build: "stout" },
    },
    sets: {
      // cobalt metaphor stage: a giant roller coaster — climb, crest, deep valley with an EXIT platform, higher second peak
      coaster: (B) => {
        B.set.stage({ floor: "#dfe6f2", back: COBALT });
        const STEP = 0.4;
        for (let x = -13; x < 14; x += STEP) { const y0 = ty(x), y1 = ty(x + STEP), L = Math.hypot(STEP, y1 - y0), a = Math.atan2(y1 - y0, STEP), cx = x + STEP / 2, cy = (y0 + y1) / 2;
          for (const z of [-0.5, 0.5]) { const r = B.box(L + 0.02, 0.09, 0.1, "metal:#e8443a", cx, cy - 0.045, z); r.rotation.z = a; }
          const tie = B.box(0.12, 0.06, 1.1, "planks:#7a5a3a", cx, cy - 0.11, 0); tie.rotation.z = a; }
        for (let x = -12.5; x < 14; x += 1.25) { const y = ty(x); for (const z of [-0.5, 0.5]) B.cyl(0.07, 0.07, Math.max(0.1, y - 0.12), "metal:#f4efe2", x, 0, z, { seg: 8 }); if (y > 2.5) B.box(0.06, 0.06, 1.1, "metal:#f4efe2", x, y * 0.5, 0); }
        // year flags along the ride
        for (const [x, t, bg, dy] of [[-11.5, "1962", GREEN, 1.6], [0, "1972", GREEN, 1.4], [5.4, "1974", RED, 2.6], [11.6, "1975", GOLD, 1.4]]) B.plate(1.1, 0.42, tt(B, t, bg, "#ffffff", 1.1, 0.42), x, ty(x) + dy, -0.7, { d: 0.03, edge: INK });
        // the EXIT platform at the bottom of the valley
        B.box(2.6, 0.25, 1.4, "planks:#b08a5a", 5.4, 0, 1.6); B.prop.sign({ x: 6.5, z: 1.2, w: 1.0, h: 0.42, text: "EXIT", bg: "#2f9a5a", fg: "#ffffff", post: true });
        // the cart
        H.cart = B.dyn(B.grp(0, 0, 0, 0, 1)); B.box(2.7, 0.5, 1.15, "metal:#d23a32", 0, 0, 0, { in: H.cart }); B.box(0.3, 0.75, 1.15, "metal:#f2c14e", 1.35, 0, 0, { in: H.cart });
        B.box(2.72, 0.08, 1.17, "#f4efe2", 0, 0.5, 0, { in: H.cart }); for (const x of [-1.0, 1.0]) for (const z of [-0.5, 0.5]) B.cyl(0.13, 0.13, 0.08, "#2a2d36", x, -0.05, z, { in: H.cart, rx: PI / 2, seg: 12 });
        // the tin cup (payoff), hidden up high
        H.cup = B.dyn(B.grp(5.2, 6, 1.6, 0, 1)); B.cyl(0.28, 0.2, 0.42, "metal:#a8acb4", 0, 0, 0, { in: H.cup, seg: 18 }); B.cyl(0.1, 0.12, 0.22, "metal:#8a8e96", 0, -0.22, 0, { in: H.cup, seg: 12 });
        for (const sx of [-1, 1]) B.box(0.08, 0.22, 0.05, "metal:#a8acb4", sx * 0.3, 0.12, 0, { in: H.cup });
        B.plate(0.7, 0.2, tt(B, "MEDIOCRE", "#ffffff", INK, 0.7, 0.2), 0, 0.14, 0.27, { in: H.cup, d: 0.01, edge: INK }); hide(H.cup);
        B.lamp(0, 9, 6, "#fff4e0", 7, 26); B.lamp(8, 6, 4, "#dfe8ff", 4, 16);
      },
      // sunny 1962 Los Angeles: stucco shop fronts, palms, a LAW OFFICES front, a convertible on the road
      la: (B) => {
        B.box(80, 0.04, 40, "asphalt", 0, 0, 2, { cast: false }); B.box(80, 0.12, 3.2, "concrete:#d8d0c0", 0, 0, -2.6, { cast: false });
        B.facade({ style: "shop", w: 6, x: -6.5, z: -4.4, seed: 3, col: "#e8c89a", sign: "DINER", floors: 2 });
        B.facade({ style: "shop", w: 6.2, x: 0, z: -4.4, seed: 5, col: "#f0e2c8", sign: "LAW OFFICES", floors: 3 });
        B.facade({ style: "shop", w: 6, x: 6.6, z: -4.4, seed: 8, col: "#c8e0d8", sign: "MOTEL", floors: 2 });
        for (const x of [-9.5, -3.3, 3.3, 9.6]) B.prop.tree({ x, z: -2.3, kind: "palm" });
        B.prop.lampPost({ x: -1.6, z: -1.4 }); B.prop.sign({ x: 2.4, z: -1.6, w: 1.6, h: 0.5, text: "LOS ANGELES", bg: "#2f6aa8", fg: "#ffffff", post: true });
        H.car = B.prop.car({ x: -12, z: 1.2, col: "#e07a8a" });
        for (const [x, z] of [[-40, -30], [30, -34]]) B.prop.mountain({ x, z, h: 12, w: 30 });
        B.lamp(0, 6, 3, "#fff2d0", 3, 16);
      },
      // Munger's 1960s partnership office: gold wallpaper, door glass WHEELER, MUNGER & CO., desk with a ticker screen
      office: (B) => {
        B.set.room({ style: "office", w: 8, d: 6.5, h: 3.6, door: false, wall: "wallpaper:#b8964a", floor: "carpet:#5a4a3a", windows: [2.6] });
        B.plate(1.3, 2.2, tt(B, "WHEELER,\nMUNGER\n& CO.", "#cfe0e8", "#1a2a3a", 1.3, 2.2, "Georgia"), -2.4, 1.1, -3.2, { d: 0.05, edge: "#4a3226" });
        B.prop.desk({ x: 0.2, z: -1.4, w: 2.2, col: "floor:#5a3a24" }); B.prop.chair({ x: 0.2, z: -2.1, ry: 0, col: "#3a2a20" });
        H.scr = B.prop.screen({ x: 0.75, y0: 0.81, z: -1.5, w: 0.95, h: 0.62, curve: (x) => 0.15 + 0.7 * x, t: 0, line: "#4fd18b" });
        H.stack = B.prop.coinStack({ x: -0.35, y: 0.81, z: -1.2, r: 0.13, n: 13 });
        H.bag = B.dyn(B.grp(-0.6, 0.81, -1.3, 0, 1)); B.prop.moneyBag({ x: 0, z: 0, size: 0.4, in: H.bag }); hide(H.bag);
        B.prop.plant({ x: 3.2, z: -2.7 }); B.prop.lamp({ kind: "desk", x: -0.7, y: 0.81, z: -1.6, glow: "#ffe2a0", intensity: 2 });
        B.lamp(0, 3.0, 1.2, "#fff0d8", 4, 10);
      },
      // your orange 1974 den: wood-box TV, sofa, coffee table with a dollar, a front door
      den: (B) => {
        B.set.room({ style: "home", w: 8, d: 6.5, h: 3.4, door: false, wall: "wallpaper:#c8782a", floor: "carpet:#7a6a2a", windows: [-2.8] });
        B.prop.rug({ x: 0, z: -0.4, w: 3.6, d: 2.4, col: "#4a7a3a" });
        H.sofa = B.grp(-0.4, 0, -2.3, 0, 1); B.box(2.4, 0.45, 0.9, "carpet:#8a5a2a", 0, 0, 0, { in: H.sofa }); B.box(2.4, 0.95, 0.25, "carpet:#7a4a22", 0, 0, -0.35, { in: H.sofa }); for (const x of [-1.2, 1.2]) B.box(0.22, 0.65, 0.9, "carpet:#7a4a22", x, 0, 0, { in: H.sofa });
        B.prop.table({ x: -0.4, z: -1.1, w: 1.3, d: 0.6, h: 0.42, col: "floor:#6a4426" });
        H.dollar = live(B, 0.62, 0.28, -0.4, 0.43, -1.05, dollarPaint, { frame: "#2f6a3a", rx: -PI / 2 + 0.25 });
        B.box(0.9, 0.85, 0.7, "westwood:#7a4a2a", 1.8, 0, -2.7); H.tv = B.prop.screen({ x: 1.8, y0: 0.88, z: -2.33, w: 0.75, h: 0.55, curve: (x) => 0.85 - 0.62 * x, t: 0, line: "#ff5a4a", frame: "#3a2418" });
        H.door = B.prop.door({ x: 3.1, z: -3.18 });
        B.prop.lamp({ kind: "floor", x: -2.4, z: -2.6, glow: "#ffd8a0", intensity: 4 });
        B.lamp(0, 3.0, 1.0, "#ffe2b8", 4, 10);
      },
      // mustard bar-chart stage: fourteen yearly bars (value of $1), then MUNGER vs DOW
      bars: (B) => {
        B.set.stage({ floor: "#f4e6c0", back: MUSTARD });
        H.yb = B.prop.bars3d({ x: 0, z: 0, vals: CUM.map((v) => v / 15.6), cols: BCOL, bw: 0.42, gap: 0.12, h: 4.2 });
        CUM.forEach((_, i) => B.plate(0.4, 0.22, tt(B, "'" + (62 + i), "#ffffff", INK, 0.4, 0.22), (i - 6.5) * 0.54, 0.15, 0.32, { d: 0.01, edge: INK }));
        H.cmp = B.prop.bars3d({ x: 9, z: 0, vals: [1, 0.25], cols: [GOLD, "#8a96aa"], bw: 1.0, gap: 0.7, h: 3.6 });
        B.plate(1.2, 0.34, tt(B, "MUNGER", "#ffffff", INK, 1.2, 0.34), 8.15, 0.2, 0.62, { d: 0.02, edge: INK }); B.plate(1.0, 0.34, tt(B, "DOW", "#ffffff", INK, 1.0, 0.34), 9.85, 0.2, 0.62, { d: 0.02, edge: INK });
        B.lamp(0, 7, 5, "#fff4e0", 6, 18); B.lamp(9, 6, 4, "#fff4e0", 4, 14);
      },
      // a red-velvet movie theatre: rows of seats, a big screen, a green EXIT over a side door
      cinema: (B) => {
        B.set.room({ style: "modern", w: 10, d: 10, h: 5, door: false, wall: "carpet:#5a1626", floor: "carpet:#3a1a22" });
        H.film = live(B, 6.0, 3.0, 0, 1.9, -4.85, monsterPaint, { frame: "#111" });
        for (const z of [-0.6, 1.0, 2.6]) for (let i = -4; i <= 4; i++) { const x = i * 0.75; B.box(0.62, 0.42, 0.55, "carpet:#a8222e", x, 0, z); B.box(0.62, 0.62, 0.12, "carpet:#8a1a26", x, 0.4, z + 0.3); }
        B.prop.door({ x: 4.9, z: 1.6, ry: -PI / 2 }); B.prop.bulbSign({ x: 4.92, y: 2.55, z: 1.6, w: 1.1, h: 0.42, text: "EXIT", bg: "#0e3a1e", fg: "#6aff9a", ry: -PI / 2 });
        H.pop = B.grp(0.25, 0.42, 1.0, 0, 1); B.cyl(0.11, 0.08, 0.24, "stripes:#d23a32:#ffffff", 0, 0, 0, { in: H.pop, seg: 12 }); B.ball(0.12, "#fff2b8", 0, 0.25, 0, { in: H.pop, sy: 0.6 });
        H.ticket = live(B, 0.9, 0.45, 0.0, 1.25, 1.75, ticketPaint, { frame: "#8a3a2a" }); hide(H.ticket.p);
        B.lamp(0, 2.5, -3.5, "#9ab0ff", 4, 12); B.lamp(4.2, 2.6, 1.6, "#6aff9a", 1.5, 5);
      },
      // a 2009 interview studio: dark blue panels, two armchairs, a key light
      studio: (B) => {
        B.set.room({ style: "office", w: 8, d: 6, h: 3.6, door: false, wall: "panel:#2a3a5a", floor: "carpet:#3a3a4a" });
        for (const [x, ry] of [[-0.6, 0.3], [1.4, -0.4]]) { const g = B.grp(x, 0, -1.6, ry, 1); B.box(0.95, 0.48, 0.85, "carpet:#6a4a3a", 0, 0, 0, { in: g }); B.box(0.95, 1.05, 0.2, "carpet:#5a3a2a", 0, 0.4, -0.35, { in: g }); }
        B.prop.lamp({ kind: "floor", x: -2.2, z: -2.4, glow: "#ffe2b0", intensity: 4 }); B.prop.plant({ x: 2.8, z: -2.4 });
        B.cyl(0.03, 0.03, 1.4, "#2a2d36", 0.5, 0, -0.9, { seg: 8 }); B.ball(0.07, "#2a2d36", 0.5, 1.42, -0.9);
        B.plate(1.1, 0.4, tt(B, "2009", "#ffffff", INK, 1.1, 0.4), 1.7, 2.6, -2.95, { d: 0.02, edge: INK });
        B.lamp(1.5, 2.8, 1.5, "#fff0dc", 5, 10);
      },
    },
    shots: [
      // 0 · frame 0: the cart is already clanking up the lift hill — you clutch your savings bag, Munger calm in front
      { set: "coaster", f: 0, light: STAGE, cam: cartCam((f) => E.lerp(-2.6, -1.2, E.prog(f, 0, 62)), { w: 3.4, a0: 18, a1: 8, e0: 4, e1: 8, push: 0.1, dy: 1.0 }),
        act: (S, u, f) => { const x = E.lerp(-2.6, -1.2, E.prog(f, 0, 62)); placeCart(x); H.cart.position.y += 0.015 * Math.sin(f * 1.3);
          ride(S, x, { munger: { expr: "smile_closed", look: 0.3 }, you: { expr: f > W(0, "savings") ? "nervous" : "smile", prop: "hold" }, hank: { expr: "grin" } });
          S.pop("label", W(0, "Imagine") + 2, 44, { x: x, y: ty(x) + 2.1, z: 0.3, w: 0.8, h: 0.3, text: "YOU", bg: "#ffffff", col: INK });
          S.pop("label", W(0, "savings") - 2, 30, { x: x + 0.1, y: ty(x) + 1.55, z: 0.6, w: 1.1, h: 0.3, text: "YOUR SAVINGS", bg: GOLD, col: INK }); } },
      // 1 · …a man about to lose more than half of it: Munger at the crest — the drop yawns below; cart tips over on "it."
      { set: "coaster", word: [0, "man"], lead: 2, light: STAGE, cam: cartCam((f) => Math.min(1.6, E.lerp(-0.6, 0.7, E.prog(f, W(0, "man"), W(0, "it.")))), { w: 3.0, a0: -24, a1: -34, e0: 10, e1: 22, push: 0.08, dy: 0.9, dx: 0.4 }),
        act: (S, u, f) => { const t = W(0, "it."), x = f < t ? E.lerp(-0.6, 0.7, E.prog(f, W(0, "man"), t)) : 0.7 + 1.2 * E.easeIn(E.prog(f, t, t + 26)); placeCart(x);
          ride(S, x, { munger: { expr: "smile_closed", look: -0.2 }, you: { expr: f > t ? "shock" : "nervous", prop: "hold" }, hank: { expr: f > W(0, "lose") ? "shock" : "nervous" } });
          S.say("Hold on.", W(0, "man") + 2, 28, { x: x + 1.3, y: ty(x) + 1.9, z: 0.3, w: 1.0, h: 0.42, tail: "left" });
          S.pop("label", W(0, "more") - 2, 40, { x: x + 0.9, y: ty(x) + 2.3, z: 0.6, w: 1.6, h: 0.36, text: "MORE THAN HALF", bg: RED, col: "#ffffff", hold: true });
          S.pop("arrow", W(0, "half") - 1, 30, { x: 2.4, y: ty(x) - 0.2, z: 0.6, w: 0.5, h: 0.8, dir: "down" }); } },
      // 2 · Nineteen sixty-two: whip to sunny 1962 Los Angeles — palms, stucco fronts, a pink convertible cruises past
      { set: "la", beat: 1, trans: "whip", dir: 1, light: "desert", cam: CAM.fit([0, 2.6, -2.4], { w: 9.0, a0: -10, a1: 0, e0: 4, e1: 8, push: 0.06 }),
        act: (S, u, f) => { H.car.position.x = E.lerp(-12, 12, E.prog(f, S.a, S.a + 80)); if (H.car.wheels) H.car.wheels.forEach((w) => { w.rotation.y = -f * 0.4; });
          S.pop("label", W(1, "Nineteen") - 2, 60, { x: 0, y: 5.6, z: -2.0, w: 1.4, h: 0.5, text: "1962", bg: "#ffffff", col: INK, hold: true }); } },
      // 3 · Los Angeles lawyer Charlie Munger…: medium on Munger in front of LAW OFFICES, briefcase-style pose
      { set: "la", word: [1, "lawyer"], lead: 3, light: "desert", cam: CAM.fit([0.2, 1.6, -2.5], { w: 2.6, a0: 12, a1: 4, elev: 4, push: 0.12 }),
        act: (S, u, f) => { S.actor("munger", { x: 0.2, z: -2.6, expr: "smile_closed", prop: "point", look: 0.2 });
          S.pop("label", W(1, "Charlie") - 3, 46, { x: 0.2, y: 2.45, z: -2.4, w: 1.9, h: 0.36, text: "CHARLIE MUNGER", bg: GOLD, col: INK, hold: true }); } },
      // 4 · …starts an investment partnership: whip into his new office — you hand over your money bag
      { set: "office", word: [1, "starts"], lead: 3, trans: "whip", dir: -1, light: "office", cam: CAM.fit([-0.4, 1.4, -1.6], { w: 3.4, a0: 14, a1: 6, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const t = W(1, "investment"); H.bag.visible = f >= t + 8; S.actor("munger", { x: 0.2, z: -2.1, expr: "smile", look: -0.4, prop: f > t + 8 ? "hold" : "point" });
          S.actor("you", { x: -1.4, z: -0.8, expr: "smile", prop: f < t + 8 ? "hold" : "wave", wave: 0.5, look: 0.5 });
          S.pop("label", W(1, "partnership.") - 3, 40, { x: -0.4, y: 2.6, z: -1.4, w: 2.0, h: 0.36, text: "INVESTMENT PARTNERSHIP", bg: "#ffffff", col: INK }); } },
      // 5 · Eight years…: dissolve to the mustard bar stage — eight green bars grow, one after another
      { set: "bars", beat: 2, trans: "dissolve", light: BARS, cam: CAM.fit([-2.4, 0.7, 0], { w: 2.6, a0: -14, a1: -4, e0: 10, e1: 6, push: 0.08 }),
        act: (S, u, f) => { const k = CUM.map((_, i) => (i < 8 ? E.back(E.prog(f, S.a + 2 + i * 5, S.a + 10 + i * 5)) : 0)); H.yb.grow(k); H.cmp.grow(0);
          S.pop("label", W(2, "Eight") - 2, 50, { x: -2.4, y: 1.55, z: 0.4, w: 1.4, h: 0.36, text: "1962–1969", bg: "#ffffff", col: INK, hold: true }); } },
      // 6 · …not one losing year: office — the ticker line climbs, Munger points at it; 0 LOSING YEARS
      { set: "office", word: [2, "not"], lead: 3, light: "office", cam: CAM.fit([0.45, 1.35, -1.6], { w: 2.0, a0: -10, a1: -2, elev: 6, push: 0.14 }),
        act: (S, u, f) => { H.scr.draw({ t: Math.round(E.ss(E.prog(f, S.a, S.b)) * 30) / 30, label: "+" }); S.actor("munger", { x: 0.1, z: -2.1, expr: "smile_closed", prop: "point", look: 0.5 });
          S.pop("label", W(2, "losing") - 2, 34, { x: 0.6, y: 2.35, z: -1.3, w: 1.6, h: 0.36, text: "0 LOSING YEARS", bg: GREEN, col: "#ffffff", hold: true }); } },
      // 7 · Then nineteen seventy-three: push THROUGH the ticker screen into the coaster — the cart plunges
      { set: "coaster", beat: 3, trans: "zoom", light: STAGE, cam: cartCam((f) => E.lerp(1.0, 2.6, E.easeIn(E.prog(f, W(3, "Then"), W(3, "down")))), { w: 4.6, a0: 20, a1: 10, e0: 6, e1: 2, push: 0.06, dy: 0.6 }),
        act: (S, u, f) => { const x = E.lerp(1.0, 2.6, E.easeIn(E.prog(f, W(3, "Then"), W(3, "down")))); placeCart(x);
          ride(S, x, { munger: { expr: "neutral" }, you: { expr: "shock", prop: "up" }, hank: { expr: "shock", prop: "up" } });
          S.pop("label", W(3, "nineteen") - 2, 50, { x: x + 0.4, y: ty(x) + 2.2, z: 0.4, w: 1.2, h: 0.42, text: "1973", bg: "#ffffff", col: INK, hold: true }); S.pop("speed", W(3, "seventy-three:"), 26, { x: x - 1.2, y: ty(x) + 1.2, z: 0.3, w: 1.6, h: 1.0 }); } },
      // 8 · …down almost thirty-two percent: low close on the screaming riders — −32%
      { set: "coaster", word: [3, "down"], lead: 2, trans: "smash", light: STAGE, coc: 10, cam: cartCam((f) => E.lerp(2.6, 3.4, E.prog(f, W(3, "down"), W(4, "Nineteen"))), { w: 4.0, a0: -16, a1: -8, elev: 12, push: 0.1, dy: 1.0 }),
        act: (S, u, f) => { const x = E.lerp(2.6, 3.4, E.prog(f, W(3, "down"), W(4, "Nineteen"))); placeCart(x);
          ride(S, x, { munger: { expr: "smile_closed" }, you: { expr: "shock", prop: "up" }, hank: { expr: "pained", prop: "up" } });
          S.pop("label", W(3, "thirty-two") - 2, 40, { x: x, y: ty(x) + 2.0, z: 0.5, w: 1.1, h: 0.46, text: "−32%", bg: RED, col: "#ffffff", hold: true }); S.pop("sweat", W(3, "percent.") - 4, 20, { x: x - 0.8, y: ty(x) + 1.5, z: 0.4, w: 0.3, h: 0.3 }); } },
      // 9 · Nineteen seventy-four: whip to your orange den — the TV line dives red, you jolt on the sofa
      { set: "den", beat: 4, trans: "whip", dir: 1, light: "interior", cam: CAM.fit([0.8, 1.3, -1.6], { w: 4.2, a0: 12, a1: 4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.tv.draw({ t: Math.round(E.ss(E.prog(f, S.a, W(4, "more."))) * 30) / 30, down: true, label: "-31%" });
          S.actor("you", { x: -0.4, z: -2.15, mode: "sit", expr: f > W(4, "down") ? "shock" : "nervous", look: 0.7 });
          S.pop("label", W(4, "Nineteen") - 2, 50, { x: 0.8, y: 2.6, z: -1.6, w: 1.2, h: 0.42, text: "1974", bg: "#ffffff", col: INK, hold: true }); } },
      // 10 · …down thirty-one more: insert on the TV — the red line hits the floor; −31%
      { set: "den", word: [4, "thirty-one"], lead: 4, steady: true, coc: 11, light: "interior", cam: CAM.fit([1.8, 1.15, -2.3], { w: 1.2, a0: -14, a1: -6, elev: 4, push: 0.12 }),
        act: (S, u, f) => { H.tv.draw({ t: 1, down: true, label: "-31%" }); S.kick(W(4, "more."), 0.06);
          S.pop("label", W(4, "thirty-one") - 2, 40, { x: 1.8, y: 1.75, z: -2.1, w: 0.75, h: 0.34, text: "−31%", bg: RED, col: "#ffffff", hold: true }); } },
      // 11 · Your dollar is now worth forty-seven cents: top insert on the coffee-table dollar — it shrinks to 47¢
      { set: "den", beat: 5, light: "interior", coc: 11, cam: CAM.fit([-0.4, 0.5, -1.05], { w: 1.3, a0: 6, a1: -4, e0: 46, e1: 40, push: 0.1 }),
        act: (S, u, f) => { const k = E.ss(E.prog(f, W(5, "worth") - 4, W(5, "cents.") - 2)); H.dollar.p.scale.x = 1 - 0.53 * k; H.dollar.p.position.x = -0.4 - 0.15 * k;
          S.pop("label", W(5, "forty-seven") - 2, 40, { x: -0.2, y: 0.8, z: -0.95, w: 0.5, h: 0.26, text: "47¢", bg: GOLD, col: INK, hold: true }); S.pop("puff", W(5, "worth"), 14, { x: 0.0, y: 0.5, z: -1.0, w: 0.5, h: 0.3 }); } },
      // 12 · Your buddy Hank cashes out: Hank grabs his bag off the sofa and marches for the door
      { set: "den", beat: 6, light: "interior", cam: CAM.fit([1.0, 1.4, -1.8], { w: 4.0, a0: -10, a1: -2, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const d = E.ss(E.prog(f, S.a + 6, W(6, "out.") + 8)); S.actor("you", { x: -0.8, z: -2.15, mode: "sit", expr: "nervous", look: 0.6 });
          S.actor("hank", { x: E.lerp(0.2, 2.6, d), z: E.lerp(-1.6, -2.6, d), expr: "stern", mode: d > 0 && d < 1 ? "march" : "stand", phase: f * 0.05, prop: "hold" });
          S.pop("label", W(6, "Hank") - 3, 40, { x: 0.8, y: 2.4, z: -1.6, w: 0.9, h: 0.32, text: "HANK", bg: "#ffffff", col: INK }); S.pop("dollar", W(6, "cashes"), 18, { x: 1.4, y: 1.9, z: -1.8, w: 0.36, h: 0.36 }); } },
      // 13 · Told you so!: close on Hank at the door — speech bubble, door SLAM
      { set: "den", word: [6, "Told"], lead: 3, light: "interior", cam: CAM.fit([2.7, 1.5, -2.6], { w: 2.2, a0: 16, a1: 8, elev: 4, push: 0.12 }),
        act: (S, u, f) => { S.actor("hank", { x: 2.6, z: -2.55, expr: "grin", prop: "point", look: -0.6 }); S.say("Told you so!", W(6, "Told") - 2, 30, { x: 2.75, y: AH + 0.9, z: -2.3, w: 1.25, h: 0.44, tail: "right" });
          if (H.door.leaf) H.door.leaf.rotation.y = -1.2 * E.ss(E.prog(f, W(6, "so!"), W(6, "so!") + 8)); } },
      // 14 · So who's the fool, Hank or Munger?: coaster valley at night — Hank on the EXIT platform, Munger still in the cart
      { set: "coaster", beat: 7, trans: "dissolve", light: (u) => K.mixLight(STAGE, K.light("night"), 0.45), cam: CAM.fit([5.4, 1.3, 0.8], { w: 4.0, a0: -10, a1: 2, e0: 6, e1: 4, push: 0.1 }),
        act: (S, u, f) => { const x = 5.2; placeCart(x); ride(S, x, { munger: { expr: "smile_closed", look: 0.3 }, you: { expr: "nervous", look: 0.4 }, hank: null });
          S.actor("hank", { x: 4.5, y: 0.25, z: 1.7, expr: "grin", prop: "hold", look: 0.4 });
          S.pop("question", W(7, "fool,") - 4, 60, { x: 5.4, y: 2.6, z: 1.0, w: 0.5, h: 0.6, hold: true });
          S.pop("label", W(7, "Hank") - 2, 30, { x: 4.5, y: 2.3, z: 1.7, w: 0.8, h: 0.3, text: "HANK?", bg: "#ffffff", col: INK }); S.pop("label", W(7, "Munger?") - 2, 30, { x: 6.1, y: 2.6, z: 0.4, w: 1.1, h: 0.3, text: "MUNGER?", bg: GOLD, col: INK }); } },
      // 15 · Nineteen seventy-five: up seventy-three percent: whip — the cart ROCKETS up the second hill; Hank gapes
      { set: "coaster", beat: 8, trans: "whip", dir: 1, light: STAGE, cam: cartCam((f) => E.lerp(5.6, 10.2, E.ss(E.prog(f, W(8, "Nineteen"), W(8, "percent.")))), { w: 4.4, a0: 22, a1: 14, e0: 10, e1: 6, push: 0.06, dy: 0.9, dx: -0.4 }),
        act: (S, u, f) => { const x = E.lerp(5.6, 10.2, E.ss(E.prog(f, W(8, "Nineteen"), W(8, "percent.")))); placeCart(x);
          ride(S, x, { munger: { expr: "grin", prop: "up" }, you: { expr: "laugh", prop: "up" }, hank: null });
          S.pop("label", W(8, "Nineteen") - 2, 46, { x: x + 0.5, y: ty(x) + 2.2, z: 0.4, w: 1.2, h: 0.42, text: "1975", bg: GOLD, col: INK, hold: true });
          S.pop("label", W(8, "seventy-three") - 2, 40, { x: x + 0.4, y: ty(x) + 1.6, z: 0.6, w: 1.2, h: 0.46, text: "+73%", bg: GREEN, col: "#ffffff", hold: true }); S.pop("speed", W(8, "up") - 2, 30, { x: x - 1.4, y: ty(x) + 1.0, z: 0.3, w: 1.6, h: 1.0 });
          S.pop("confetti", W(8, "percent.") - 2, 28, { x: x, y: ty(x) + 2.2, z: 0.4, w: 2.6, h: 1.4 }); } },
      // 16 · Fourteen years: cut to the bar stage — all fourteen bars rise, two red dips, the gold 1975
      { set: "bars", beat: 9, light: BARS, cam: CAM.fit([0, 1.6, 0], { w: 7.2, a0: 10, a1: 2, e0: 6, e1: 10, push: 0.06 }),
        act: (S, u, f) => { H.yb.grow(CUM.map((_, i) => E.back(E.prog(f, S.a + i * 2.4, S.a + 8 + i * 2.4)))); H.cmp.grow(0);
          S.pop("label", W(9, "Fourteen") - 2, 40, { x: 0, y: 4.9, z: 0.4, w: 1.9, h: 0.44, text: "14 YEARS", bg: "#ffffff", col: INK, hold: true }); } },
      // 17 · …almost twenty percent a year: dolly in on the tall end of the chart; ≈20% A YEAR
      { set: "bars", word: [9, "almost"], lead: 3, light: BARS, cam: CAM.fit([1.9, 2.4, 0], { w: 4.6, a0: -16, a1: -8, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.yb.grow(1); H.cmp.grow(0); S.pop("label", W(9, "twenty") - 2, 50, { x: 1.6, y: 4.9, z: 0.5, w: 2.2, h: 0.46, text: "≈20% A YEAR", bg: GOLD, col: INK, hold: true }); S.pop("sparks", W(9, "year.") - 2, 16, { x: 3.5, y: 3.9, z: 0.4, w: 1.2, h: 0.6 }); } },
      // 18 · The Dow, five: whip to MUNGER vs DOW — the Dow bar stays a stub
      { set: "bars", word: [9, "The"], lead: 3, trans: "whip", dir: 1, light: BARS, cam: CAM.fit([9, 1.9, 0], { w: 3.8, a0: 12, a1: 4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.yb.grow(1); H.cmp.grow([E.back(E.prog(f, S.a, S.a + 10)), E.back(E.prog(f, W(9, "five.") - 6, W(9, "five.") + 4))]);
          S.pop("label", W(9, "five.") - 2, 30, { x: 9.85, y: 1.6, z: 0.6, w: 0.7, h: 0.34, text: "5%", bg: "#ffffff", col: INK, hold: true }); S.pop("label", W(9, "Dow,") - 2, 40, { x: 8.15, y: 4.1, z: 0.6, w: 0.95, h: 0.38, text: "19.8%", bg: GOLD, col: INK, hold: true }); } },
      // 19 · A dollar becomes twelve and a half: office desk — the coin stack shoots up from one coin to twelve and a half
      { set: "office", beat: 10, trans: "whip", dir: -1, light: "office", coc: 10, cam: CAM.fit([-0.2, 1.3, -1.3], { w: 2.0, a0: 10, a1: 2, elev: 8, push: 0.12 }),
        act: (S, u, f) => { const n = Math.round(1 + 12 * E.ss(E.prog(f, W(10, "becomes") - 4, W(10, "half.")))); H.stack.coins.forEach((c, i) => { c.visible = i < n; if (i === 12) c.scale.set(1, 0.5, 1); });
          S.actor("munger", { x: 0.4, z: -2.1, expr: "smile_closed", look: -0.4 }); S.pop("label", W(10, "twelve") - 2, 40, { x: -0.35, y: 2.15, z: -1.1, w: 1.3, h: 0.34, text: "$1 → $12.57", bg: GOLD, col: INK, hold: true });
          S.pop("coin", W(10, "half.") - 2, 20, { x: -0.1, y: 1.8, z: -1.1, w: 0.3, h: 0.3, rise: 0.4 }); } },
      // 20 · You see, it's like leaving a movie: whip to a red-velvet theatre — you with popcorn, a dark film on the screen
      { set: "cinema", beat: 11, trans: "whip", dir: 1, light: K.mixLight(K.light("night"), K.light("lamp"), 0.5), cam: CAM.fit([0, 1.5, 0.0], { w: 4.0, a0: 22, a1: 14, e0: 8, e1: 6, push: 0.08 }),
        act: (S, u, f) => { H.film.draw({ k: 0 }); S.actor("you", { x: 0, y: 0.42, z: 1.0, mode: "sit", expr: "smile", prop: "hold", look: -0.2 }); } },
      // 21 · …at the scary part: the shadow monster rears up on screen — you jump out of your seat
      { set: "cinema", word: [11, "scary"], lead: 4, light: "night", cam: CAM.fit([0, 1.6, 0.4], { w: 3.0, a0: -10, a1: -4, elev: 2, push: 0.12 }),
        act: (S, u, f) => { const t = W(11, "scary"), k = E.back(E.prog(f, t - 2, t + 8)); H.film.draw({ k: Math.round(k * 10) / 10, boo: f > t }); S.kick(t, 0.1);
          S.actor("you", { x: 0, y: f > t + 4 ? 0.12 : 0.42, z: 1.0, mode: f > t + 4 ? "stand" : "sit", expr: f > t ? "shock" : "nervous", prop: f > t ? "up" : "hold" });
          S.pop("impact", t, 18, { x: 0, y: 3.2, z: -3.0, w: 1.2, h: 0.55, text: "BOO!" }); } },
      // 22 · You paid for the whole film…: you shuffle out under the green EXIT sign
      { set: "cinema", beat: 12, light: "night", cam: CAM.fit([3.4, 1.6, 1.6], { w: 3.4, a0: -40, a1: -48, elev: 4, push: 0.08 }),
        act: (S, u, f) => { H.film.draw({ k: 1, boo: true }); const d = E.ss(E.prog(f, S.a, W(12, "kept"))); S.actor("you", { x: E.lerp(1.6, 4.2, d), z: 1.6, expr: "nervous", mode: d < 1 ? "stroll" : "stand", phase: f * 0.05, look: 0.6 });
          S.pop("glow", W(12, "whole") - 2, 24, { x: 4.85, y: 2.55, z: 1.6, w: 1.3, h: 0.6 }); } },
      // 23 · …and kept the worst twenty minutes: insert on your ticket — a red stamp: YOU SAW: WORST 20 MIN
      { set: "cinema", word: [12, "kept"], lead: 3, steady: true, coc: 12, light: "night", cam: CAM.fit([0, 1.25, 1.75], { w: 1.25, a0: -6, a1: 2, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.ticket.p.visible = true; H.ticket.draw({ s: f >= W(12, "worst") - 1 }); if (f >= W(12, "worst") - 1) S.kick(W(12, "worst") - 1, 0.05); } },
      // 24 · Hank kept forty-seven cents: whip back to the coaster valley — Hank alone on the EXIT platform with a single coin
      { set: "coaster", beat: 13, trans: "whip", dir: -1, light: (u) => K.mixLight(STAGE, K.light("night"), 0.35), cam: CAM.fit([5.6, 1.3, 1.6], { w: 2.6, a0: 10, a1: 2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { placeCart(11.8); S.actor("hank", { x: 5.6, y: 0.25, z: 1.7, expr: "nervous", prop: "hold", look: 0.3 });
          S.pop("coin", W(13, "forty-seven") - 3, 40, { x: 5.95, y: 1.45, z: 1.9, w: 0.28, h: 0.28, hold: true }); S.pop("label", W(13, "forty-seven") - 2, 40, { x: 5.6, y: 2.4, z: 1.7, w: 0.6, h: 0.3, text: "47¢", bg: "#ffffff", col: INK, hold: true }); } },
      // 25 · Those who stayed got the whole ride: crane up to the top of the second peak — you and Munger cheer in confetti
      { set: "coaster", word: [13, "Those"], lead: 3, light: STAGE, cam: CAM.fit([11.4, 8.0, 0], { w: 3.8, a0: -14, a1: -4, e0: -2, e1: 10, push: 0.08 }),
        act: (S, u, f) => { const x = 11.4; placeCart(x); ride(S, x, { munger: { expr: "smile", prop: "up" }, you: { expr: "laugh", prop: "up" }, hank: null });
          S.pop("confetti", W(13, "stayed") - 2, 40, { x, y: ty(x) + 2.4, z: 0.4, w: 3.0, h: 1.6 }); S.pop("label", W(13, "whole") - 3, 34, { x, y: ty(x) + 2.5, z: 0.6, w: 2.0, h: 0.42, text: "THE WHOLE RIDE", bg: GOLD, col: INK, hold: true }); } },
      // 26 · Later, Munger put it bluntly (music stops): dissolve to the 2009 interview studio — white-haired Munger in an armchair
      { set: "studio", beat: 14, trans: "dissolve", light: "interior", cam: CAM.fit([-0.4, 1.3, -1.6], { w: 2.6, a0: 14, a1: 6, elev: 4, push: 0.12 }),
        act: (S, u, f) => { S.actor("mungerOld", { x: -0.6, y: 0.46, z: -1.3, mode: "sit", expr: f > W(14, "bluntly:") ? "stern" : "smile_closed", prop: f > W(14, "can't") ? "point" : undefined, look: 0.5 });
          S.pop("label", W(14, "Munger") - 2, 40, { x: -0.6, y: 2.35, z: -1.4, w: 1.9, h: 0.36, text: "CHARLIE MUNGER", bg: GOLD, col: INK }); } },
      // 27 · …a fifty percent drop: the coaster from the valley floor — the track dives; Hank cowers on the platform; −50%
      { set: "coaster", word: [14, "fifty"], lead: 3, trans: "whip", dir: 1, light: (u) => K.mixLight(STAGE, K.light("night"), 0.35), cam: CAM.fit([4.4, 2.6, 1.0], { w: 5.2, a0: 20, a1: 12, e0: -6, e1: -2, push: 0.08 }),
        act: (S, u, f) => { placeCart(11.8); S.actor("hank", { x: 5.6, y: 0.25, z: 1.7, expr: "shock", look: -0.4 }); S.pop("sweat", W(14, "drop,") - 2, 20, { x: 5.2, y: 1.9, z: 1.8, w: 0.3, h: 0.3 });
          S.pop("label", W(14, "fifty") - 2, 34, { x: 3.0, y: 3.6, z: 0.6, w: 1.1, h: 0.46, text: "−50%", bg: RED, col: "#ffffff", hold: true }); } },
      // 28 · you deserve the mediocre result you're going to get.: close on Hank — the tin MEDIOCRE cup drops — CLANG on "get."
      { set: "coaster", beat: 15, light: (u) => K.mixLight(STAGE, K.light("night"), 0.3), cam: CAM.fit([5.6, 1.6, 1.7], { w: 2.4, a0: -8, a1: 0, elev: 4, push: 0.12 }),
        act: (S, u, f) => { placeCart(11.8); const t = W(15, "get."), k = E.easeIn(E.prog(f, W(15, "mediocre") - 6, t)); H.cup.visible = true; H.cup.position.set(5.6, f < t ? E.lerp(4.8, 2.0, k) : 2.0, 1.7); H.cup.rotation.z = f < t ? 0.4 * (1 - k) : 0.08 * Math.sin((f - t) * 0.9) * Math.exp(-(f - t) * 0.1);
          S.actor("hank", { x: 5.6, y: 0.25, z: 1.7, expr: f >= t ? "dazed" : "nervous", look: f < t ? -0.2 : 0, prop: f < t ? "hold" : undefined });
          S.pop("label", W(15, "mediocre") - 2, 30, { x: 6.4, y: 1.5, z: 1.9, w: 1.2, h: 0.34, text: "MEDIOCRE", bg: "#ffffff", col: INK });
          S.kick(t, 0.22); S.pop("impact", t, 24, { x: 5.6, y: 3.05, z: 1.9, w: 1.2, h: 0.55, text: "CLANG!" }); S.pop("stars", t + 2, 24, { x: 5.6, y: 2.75, z: 1.9, w: 0.9, h: 0.4 }); } },
    ],
  };
};
