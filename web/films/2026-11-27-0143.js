// "Same Number, Thirty-Four Years Later" — the Nikkei 225 closed at a record 38,915.87 on 29 Dec 1989 (the last trading
// day of 1989), fell to 7,054.98 by March 2009 and only closed above the record on 22 Feb 2024 (39,098.68). In 1989 the
// market cost about 60x earnings; in 2024 about 16x. Film module: Tokyo exchange hall 1989, a Ginza night street with a
// giant quote board (1989 neon / 2009 rain / 2024 day), a country-club golf green, a red rising-sun metaphor stage
// (world pie, gold price tower with a trapdoor, the price-vs-profit scale), a waiting bench in a tunnel of calendar
// pages, and a suburban lemonade stand (the analogy). Everyman: Kenji, a 1989 salaryman — "you".
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const H = {};
  const PI = Math.PI;
  const AH = 1.55, KH = 1.05;
  const RED = "#d23a2e", GOLD = "#f2c14e", INK = "#1d1a26", CREAM = "#f6efe0", GREEN = "#38c172", AMBER = "#ffb53a";
  const SUN = K.backdrop("#c8352e");
  const TUN = K.backdrop("#25305a");

  // canvas text helper (fitted, bordered)
  const tt = (B, s, bg, fg, pw, ph, font = "Arial") => { const w = 1024, h = Math.round((1024 * ph) / pw), cv = document.createElement("canvas"); cv.width = w; cv.height = h; const g = cv.getContext("2d");
    g.fillStyle = bg; g.fillRect(0, 0, w, h); g.strokeStyle = fg; g.lineWidth = Math.max(6, Math.min(16, h * 0.06)); g.strokeRect(10, 10, w - 20, h - 20);
    const lines = s.split("\n"); let fs = Math.round((h * 0.56) / lines.length); g.font = `bold ${fs}px ${font}`;
    const mw = Math.max(...lines.map((l) => g.measureText(l).width)); if (mw > w * 0.86) fs = Math.floor((fs * w * 0.86) / mw);
    g.font = `bold ${fs}px ${font}`; g.fillStyle = fg; g.textAlign = "center"; g.textBaseline = "middle";
    lines.forEach((l, i) => g.fillText(l, w / 2, h / 2 + (i - (lines.length - 1) / 2) * fs * 1.12 + 4));
    const t = new B.THREE.CanvasTexture(cv); t.colorSpace = B.THREE.SRGBColorSpace; return t; };
  const hide = (o) => { o.visible = false; if (o.userData && o.userData.base) o.userData.base.v = false; return o; };
  const pop = (o, f, t0, d = 7, s = 1) => { const k = Math.max(0.01, E.back(E.prog(f, t0, t0 + d))); o.scale.setScalar(k * s); };
  const label = (B, s, bg, fg, w, h, x, y, z, o = {}) => B.dyn(B.plate(w, h, tt(B, s, bg, fg, w, h), x, y, z, { d: 0.02, edge: o.edge ?? fg, ...o }));
  // a live canvas plate: draw(state) re-paints only when state changes
  const live = (B, w, h, x, y, z, paint, o = {}) => { const cv = document.createElement("canvas"); cv.width = 768; cv.height = Math.round((768 * h) / w);
    const tex = new B.THREE.CanvasTexture(cv); tex.colorSpace = B.THREE.SRGBColorSpace; const p = B.dyn(B.plate(w, h, tex, x, y, z, { d: 0.06, edge: o.frame ?? "#1a1a22", ...o }));
    let key = ""; const draw = (q = {}) => { const k = JSON.stringify(q); if (k === key) return; key = k; paint(cv.getContext("2d"), cv.width, cv.height, q); tex.needsUpdate = true; };
    draw(o.init ?? {}); return { p, draw }; };
  // amber LED quote board: NIKKEI 225 + big number + sub line
  const boardPaint = (c, w, h, q) => { const s = { num: "38,915.87", sub: "", col: AMBER, ...q }; c.fillStyle = "#0b0d12"; c.fillRect(0, 0, w, h);
    c.fillStyle = "rgba(255,181,58,0.06)"; for (let y = 0; y < h; y += 9) for (let x = 0; x < w; x += 9) c.fillRect(x, y, 5, 5);
    c.textAlign = "center"; c.textBaseline = "middle"; c.fillStyle = "#ffffff"; c.font = `bold ${Math.round(h * 0.16)}px Arial`; c.fillText("NIKKEI 225", w / 2, h * 0.17);
    c.fillStyle = s.col; c.shadowColor = s.col; c.shadowBlur = 18; let fs = Math.round(h * 0.36); c.font = `bold ${fs}px Courier New, monospace`; const mw = c.measureText(s.num).width; if (mw > w * 0.92) { fs = Math.floor((fs * w * 0.92) / mw); c.font = `bold ${fs}px Courier New, monospace`; }
    c.fillText(s.num, w / 2, h * 0.52); c.shadowBlur = 0; if (s.sub) { c.fillStyle = s.subCol ?? "#ffffff"; c.font = `bold ${Math.round(h * 0.15)}px Arial`; c.fillText(s.sub, w / 2, h * 0.84); } };
  const fmt = (v) => v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  // world stock market pie: Japan slice share k (0..0.45)
  const piePaint = (c, w, h, q) => { const k = q.k ?? 0; c.fillStyle = "#fbf3e4"; c.fillRect(0, 0, w, h); const cx = w / 2, cy = h * 0.47, r = Math.min(w, h) * 0.36;
    const seg = (a0, a1, col) => { c.beginPath(); c.moveTo(cx, cy); c.arc(cx, cy, r, a0, a1); c.closePath(); c.fillStyle = col; c.fill(); c.lineWidth = 6; c.strokeStyle = "#fbf3e4"; c.stroke(); };
    const st = -PI / 2; seg(st + k * 2 * PI, st + 2 * PI, "#b9b4c4"); if (k > 0.001) seg(st, st + k * 2 * PI, RED);
    c.fillStyle = "#ffffff"; c.font = `bold ${Math.round(h * 0.09)}px Arial`; c.textAlign = "center"; c.textBaseline = "middle";
    if (k > 0.05) c.fillText("JAPAN", cx + r * 0.5 * Math.cos(st + k * PI), cy + r * 0.5 * Math.sin(st + k * PI));
    c.fillStyle = INK; c.font = `bold ${Math.round(h * 0.08)}px Arial`; c.fillText("THE WORLD'S STOCKS", cx, h * 0.92); };
  // calendar page
  const calPaint = (c, w, h, q) => { c.fillStyle = "#ffffff"; c.fillRect(0, 0, w, h); c.fillStyle = RED; c.fillRect(0, 0, w, h * 0.26); c.textAlign = "center"; c.textBaseline = "middle";
    c.fillStyle = "#ffffff"; c.font = `bold ${Math.round(h * 0.15)}px Arial`; c.fillText(q.top ?? "DEC", w / 2, h * 0.13);
    c.fillStyle = INK; let fs = Math.round(h * 0.46); c.font = `bold ${fs}px Arial`; const mw = c.measureText(q.big ?? "29").width; if (mw > w * 0.9) { fs = Math.floor((fs * w * 0.9) / mw); c.font = `bold ${fs}px Arial`; }
    c.fillText(q.big ?? "29", w / 2, h * 0.58); c.font = `bold ${Math.round(h * 0.11)}px Arial`; c.fillStyle = "#5a5a66"; c.fillText(q.bot ?? "1989", w / 2, h * 0.88); };
  // a gold bar block (origin at its bottom centre)
  const block = (B, x, y, z, w, h, d, col, parent) => { const g = B.grp(x, y, z, 0, 1, parent); B.box(w, h, d, col, 0, 0, 0, { in: g }); B.box(w + 0.02, 0.05, d + 0.02, "#b8862a", 0, h - 0.05, 0, { in: g }); return B.dyn(g); };
  const club = (B, parent) => { const g = B.grp(0, 0, 0, 0, 1, parent); B.cyl(0.015, 0.015, 1.0, "#c9c9d0", 0, 0, 0, { in: g }); B.box(0.12, 0.06, 0.05, "#3a3a40", 0.04, 0, 0, { in: g }); B.cyl(0.025, 0.025, 0.25, "#241726", 0, 0.78, 0, { in: g }); return B.dyn(g); };

  return {
    cast: {
      kenji: { jacket: "#23304f", pants: "#23283a", boots: "#141418", hat: "hair", hair: "#141414", skin: "#f0c8a0", buttons: "#c9c9d0" },
      kenjiOld: { jacket: "#23304f", pants: "#23283a", boots: "#141418", hat: "hair", hair: "#d8d8dc", skin: "#e8bf98", buttons: "#c9c9d0", moustache: "#d8d8dc" },
      boss: { jacket: "#3a3a44", pants: "#2a2a32", boots: "#141418", hat: "hair", hair: "#9a9aa2", skin: "#e8bc94", moustache: "#5a5a62", build: "stout" },
      aiko: { jacket: "#a8324a", pants: "#2a2a32", boots: "#3a2420", hat: "hair", hair: "#1a1416", dress: "#a8324a", skin: "#f3d2b4" },
      trader: { jacket: "#2a5a9a", pants: "#23283a", boots: "#141418", hat: "hair", hair: "#201814", skin: "#e8c09c" },
      kid: { jacket: "#3f8fe0", pants: "#2f4a7a", boots: "#f4f1ea", hat: "cap", cap: "#ffd84a", skin: "#c99067", build: "kid" },
    },
    sets: {
      // 1989 exchange hall: marble, a wall of amber quote boards, trading desks with phones, a 3 o'clock clock
      hall: (B) => {
        B.set.room({ style: "bank", wall: "marble:#d8d0c0", floor: "tiles:#c8c0b0:#3a3e48", w: 12, d: 9, h: 5, door: false });
        H.hallBoard = live(B, 6.4, 2.2, 0, 3.4, -4.44, boardPaint, { init: { num: "38,915.87", sub: "DEC 29, 1989" } });
        for (const x of [-4.6, 4.6]) for (let r = 0; r < 3; r++) live(B, 1.6, 0.5, x, 2.6 + r * 0.62, -4.44, (c, w, h) => { c.fillStyle = "#0b0d12"; c.fillRect(0, 0, w, h); c.fillStyle = r % 2 ? GREEN : AMBER; c.font = `bold ${Math.round(h * 0.55)}px Courier New`; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(["+12.40", "+3.10", "+48.00", "+7.25", "+0.90", "+22.60"][r + (x > 0 ? 3 : 0)], w / 2, h / 2); }, { frame: "#2a2d36" });
        H.clock = B.prop.clock({ x: 0, y: 1.6, z: -4.4, r: 0.4, time: 3.0 });
        for (const x of [-2.2, 0, 2.2]) { B.prop.desk({ x, z: -1.6, w: 1.8, col: "floor:#6a4630" }); B.prop.phone({ x: x + 0.5, y: 0.8, z: -1.5 }); }
        H.cal = live(B, 0.9, 1.1, -3.6, 1.4, -4.4, calPaint, { init: { top: "DEC", big: "29", bot: "1989" }, frame: "#8a8a92" });
        H.ticket = B.dyn(B.grp(0, 0.82, -1.2, 0, 1)); B.plate(0.5, 0.32, tt(B, "BUY", "#ffffff", RED, 0.5, 0.32), 0, 0.01, 0, { in: H.ticket, d: 0.005, edge: RED, rx: -PI / 2 });
        B.lamp(0, 4.2, 0, "#fff0d8", 5, 14); B.lamp(0, 3.4, -3.6, "#ffcf80", 3, 6);
      },
      // a Ginza-style night street: lit modern facades, a giant quote board on a tower facing you
      ginza: (B) => {
        B.set.street({ style: "modern", lit: true, length: 40, road: 8, seed: 21, signs: ["SECURITIES", "BANK", "CAFE", "KARAOKE", "TAXI"], end: false });
        const tw = B.grp(0, 0, -11, 0, 1); B.box(9, 11, 2, "concrete:#5a6270", 0, 0, 0, { in: tw });
        H.street = live(B, 6.6, 2.4, 0, 6.4, -9.9, boardPaint, { init: { num: "38,915.87", sub: "RECORD HIGH" } });
        H.neon = []; for (const [x, y, col] of [[-3.6, 3.5, "#ff4a8a"], [3.6, 3.5, "#4ad8ff"], [-3.6, 9.8, "#ffd84a"], [3.6, 9.8, "#7aff8a"]]) H.neon.push(B.dyn(B.box(1.4, 0.3, 0.1, col, x, y, -9.95)));
        for (const z of [-2, -6]) for (const x of [-3.6, 3.6]) B.prop.lampPost({ x, z });
        H.umb = B.dyn(B.grp(0, 0, 0, 0, 1)); B.cone(0.7, 0.3, "#2a2d36", 0, 2.05, 0, { in: H.umb }); B.cyl(0.015, 0.015, 0.9, "#2a2d36", 0, 1.2, 0, { in: H.umb }); hide(H.umb);
        B.lamp(0, 5, 2, "#ffb0d8", 4, 16); B.lamp(0, 6, -8, "#ffd8a0", 5, 10);
      },
      // a country club: green fairway, a flag on the green, clubhouse, a giant gold membership card
      golf: (B) => {
        B.set.landscape({ kind: "meadow", seed: 4, count: 16, clear: 9, hills: true });
        B.cyl(1.6, 1.6, 0.02, "#5ac85a", 2.2, 0.01, -4.5, { seg: 32 }); B.cyl(0.06, 0.06, 0.03, "#141414", 2.2, 0.02, -4.5);
        B.cyl(0.02, 0.02, 2.0, "#f4f4f0", 2.2, 0, -4.5); H.flag = B.dyn(B.box(0.5, 0.32, 0.02, RED, 2.45, 1.8, -4.5));
        B.facade({ style: "modern", w: 6, x: -3.4, z: -7, ry: 0.2, sign: "COUNTRY CLUB" });
        H.card = B.dyn(B.grp(-0.9, 1.9, -1.6, 0.12, 1)); B.plate(1.6, 1.0, tt(B, "GOLF MEMBERSHIP\nPRICE: MILLIONS", "#e8b83a", INK, 1.6, 1.0), 0, 0, 0, { in: H.card, d: 0.04, edge: "#a87a1a" });
        H.club1 = club(B); H.club2 = club(B); H.ball = B.dyn(B.ball(0.05, "#ffffff", 0.6, 0.05, -0.4));
        B.lamp(0, 6, 4, "#fff4d0", 4, 16);
      },
      // the metaphor stage: red rising-sun backdrop; world pie; a five-bar gold price tower with a trapdoor; a big scale
      sun: (B) => {
        B.set.stage({ floor: "#f4e9d8", back: "#c8352e" });
        B.cyl(5, 5, 0.1, "#f4e2c8", 0, 8, -13, { rx: PI / 2, seg: 48, cast: false });
        H.pie = live(B, 3.2, 3.2, -0.2, 2.2, -1.8, piePaint, { init: { k: 0 }, frame: "#fbf3e4" }); hide(H.pie.p);
        H.tower = B.dyn(B.grp(1.3, 0, -0.6, 0, 1)); H.trap = B.dyn(B.grp(0, 0.4, 0, 0, 1, H.tower));
        B.cyl(0.75, 0.8, 0.4, CREAM, 0, 0, 0, { in: H.tower, seg: 28 });
        H.bars = []; for (let i = 0; i < 5; i++) H.bars.push(block(B, 0, 0.4 + i * 0.62, 0, 1.0, 0.6, 0.7, "#f2c14e", H.tower));
        H.tLab = label(B, "38,915", INK, GOLD, 1.3, 0.4, 0, 4.0, 0.36, { in: H.tower, edge: GOLD });
        H.lowLab = hide(label(B, "7,054", INK, "#ff8a7a", 1.1, 0.36, 0, 1.4, 0.36, { in: H.tower, edge: "#ff8a7a" }));
        // the scale: price pan (tall gold stack) vs earnings pan (coins)
        H.scale = B.dyn(B.grp(-1.0, 0, 0.6, 0, 1)); const sc = B.prop.scale({ x: 0, z: 0, s: 2.0 }); H.scale.add(sc.group ?? sc); H.sc = sc; hide(H.scale);
        H.priceStack = []; for (let i = 0; i < 6; i++) H.priceStack.push(B.dyn(B.cyl(0.26, 0.26, 0.12, "#e8b83a", 0, 0.08 + i * 0.13, 0, { in: sc.pans[0], seg: 20 })));
        H.earnStack = []; for (let i = 0; i < 6; i++) H.earnStack.push(B.dyn(B.cyl(0.26, 0.26, 0.12, GREEN, 0, 0.08 + i * 0.13, 0, { in: sc.pans[1], seg: 20 })));
        H.profits = hide(B.dyn(B.grp(1.3, 0, -1.7, 0, 1))); B.box(1.9, 3.4, 0.9, GREEN, 0, 0, 0, { in: H.profits }); B.plate(1.6, 0.5, tt(B, "PROFITS", GREEN, "#ffffff", 1.6, 0.5), 0, 2.6, 0.46, { in: H.profits, d: 0.02, edge: "#ffffff" });
        B.lamp(0, 6, 3, "#fff0e0", 7, 16); B.lamp(-3, 3, 1, "#ffd0b0", 3, 10);
      },
      // the waiting tunnel: a bench, an hourglass, a big calendar flipping through the years
      tunnel: (B) => {
        B.set.stage({ floor: "#3a4670", back: "#25305a" });
        B.prop.bench({ x: 0, z: 0 }); H.hour = B.prop.hourglass({ x: 1.3, y: 0, z: 0.2, size: 0.9 });
        H.year = live(B, 1.6, 1.9, 0, 2.6, -1.6, calPaint, { init: { top: "YEAR", big: "1990", bot: "WAITING..." }, frame: "#c9c9d0" });
        H.pages = []; for (let i = 0; i < 14; i++) H.pages.push(B.dyn(B.box(0.42, 0.5, 0.01, i % 2 ? "#ffffff" : "#f4e2e0", 0, -3, 0)));
        B.lamp(0, 5, 3, "#c8d8ff", 6, 14); B.lamp(0, 2.6, 0, "#ffffff", 2, 5);
      },
      // a suburban sidewalk lemonade stand on a sunny afternoon
      lemon: (B) => {
        B.set.landscape({ kind: "meadow", seed: 9, count: 14, clear: 8 });
        B.facade({ style: "village", w: 7, x: 0, z: -7, sign: "" }); B.prop.fence({ x: 0, z: -3.2, len: 9, col: "#f4f4f0" });
        B.box(30, 0.04, 2.4, "concrete:#d8d4cc", 0, 0, 0.6, { cast: false });
        const st = B.grp(0, 0, -1.2, 0, 1); B.box(1.6, 0.9, 0.6, "planks:#f2d27a", 0, 0, 0, { in: st });
        for (const x of [-0.75, 0.75]) B.box(0.06, 1.0, 0.06, "#c8a060", x, 0.9, -0.25, { in: st });
        B.box(1.8, 0.08, 0.8, "stripes:#ffd84a:#ffffff", 0, 1.9, -0.1, { in: st });
        B.plate(1.3, 0.34, tt(B, "LEMONADE", "#ffd84a", "#3a6a2a", 1.3, 0.34), 0, 1.6, -0.24, { in: st, d: 0.02, edge: "#3a6a2a" });
        B.cyl(0.14, 0.14, 0.32, "#fff8a0", -0.4, 0.9, 0.05, { in: st, seg: 16 }); for (const x of [0.15, 0.4]) B.cyl(0.06, 0.05, 0.14, "#fff3b0", x, 0.9, 0.08, { in: st, seg: 12 });
        H.jar = B.grp(0.55, 0.9, -1.0, 0, 1); B.cyl(0.11, 0.11, 0.24, new B.THREE.MeshToonMaterial({ color: "#cfe8ff", transparent: true, opacity: 0.45 }), 0, 0, 0, { in: H.jar, seg: 16, cast: false });
        H.dollar = B.dyn(B.cyl(0.06, 0.06, 0.015, GOLD, 0.55, 0.92, -1.0, { seg: 16 }));
        H.tag = B.dyn(B.grp(-0.55, 1.05, -0.88, 0, 1)); B.plate(0.5, 0.3, tt(B, "$60", "#ffffff", RED, 0.5, 0.3), 0, 0, 0, { in: H.tag, d: 0.02, edge: RED }); hide(H.tag);
        H.bills = []; for (let i = 0; i < 6; i++) H.bills.push(hide(B.dyn(B.box(0.24, 0.01, 0.12, "#7fb86a", -0.3, -2, 0))));
        B.lamp(0, 6, 4, "#fff4d0", 4, 16);
      },
    },
    shots: [
      // 0 · frame 0: a red BUY ticket is STAMPED on the desk — paper streamers burst, the quote board blazes
      { set: "hall", f: 0, light: "interior", cam: CAM.fit([0, 1.2, -1.4], { w: 2.4, a0: -18, a1: -6, e0: 14, e1: 8, push: 0.14 }),
        act: (S, u, f) => { const k = E.prog(f, 0, 6); H.ticket.position.y = 0.82 + 1.2 * (1 - E.easeIn(k)); H.ticket.rotation.z = 0.6 * (1 - k); S.kick(6, 0.09);
          S.actor("kenji", { x: 0, z: -2.1, expr: "grin", prop: "point", look: 0.1 }); S.pop("impact", 6, 16, { x: 0.3, y: 1.15, z: -1.0, w: 0.8, h: 0.42, text: "BUY!" });
          S.pop("confetti", 8, 60, { x: 0, y: 2.6, z: -1.6, w: 3.4, h: 2.4, pop: false }); } },
      // 1 · …on the last trading day of 1989: the big board and the wall calendar, DEC 29
      { set: "hall", word: [0, "last"], lead: 3, trans: "whip", dir: 1, light: "interior", cam: CAM.fit([-1.6, 2.6, -3.6], { w: 5.0, a0: 14, a1: 4, elev: 2, push: 0.1 }),
        act: (S, u, f) => { H.clock.time(3.0); S.actor("trader", { x: -2.2, z: -2.2, expr: "laugh", prop: "up" }); S.actor("aiko", { x: -0.8, z: -2.3, expr: "smile", prop: "wave", wave: 0.5 + 0.5 * Math.sin(f * 0.5) });
          S.pop("label", W(0, "trading") , 40, { x: -3.6, y: 2.25, z: -4.2, w: 1.6, h: 0.3, text: "LAST TRADING DAY", bg: RED, col: "#fff", hold: true }); S.pop("confetti", S.a, 50, { x: -1.2, y: 3.0, z: -2.6, w: 4, h: 2.4, pop: false }); } },
      // 2 · then you wait thirty-four years: whip into the tunnel — Kenji on a bench, the years flip, pages fly
      { set: "tunnel", beat: 1, trans: "whip", dir: -1, light: TUN, cam: CAM.fit([0, 1.6, -0.6], { w: 3.4, a0: -10, a1: 6, elev: 5, push: 0.1 }),
        act: (S, u, f) => { const yr = Math.min(2024, 1990 + Math.floor(E.prog(f, S.a, W(1, "back.")) * 34)); H.year.draw({ top: "YEAR", big: String(yr), bot: "WAITING..." }); H.hour.level(E.prog(f, S.a, S.a + 110));
          H.pages.forEach((p, i) => { const t0 = S.a + i * 6, k = ((f - t0) / 40) % 1; p.visible = f >= t0; p.position.set(-2.2 + 4.4 * k, 3.6 - 3.0 * k + 0.4 * Math.sin(i), -1.0 + 0.6 * Math.sin(i * 2)); p.rotation.set(f * 0.1 + i, f * 0.13, i); });
          S.actor("kenji", { x: 0, z: 0.05, mode: "sit", expr: f > W(1, "years") ? "dazed" : "neutral", headTilt: 0.15 * Math.sin(f * 0.05) });
          S.pop("label", W(1, "thirty-four"), 50, { x: 0, y: 3.85, z: -1.4, w: 1.5, h: 0.34, text: "34 YEARS", bg: GOLD, hold: true }); } },
      // 3 · …for the price to come back: a sleepy Kenji, zz, the hourglass drains
      { set: "tunnel", word: [1, "price"], lead: 3, steady: true, coc: 10, light: TUN, cam: CAM.fit([0.5, 1.2, 0.1], { w: 2.0, a0: 18, a1: 8, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.year.draw({ top: "YEAR", big: "2023", bot: "STILL WAITING" }); H.hour.level(0.92); S.actor("kenji", { x: 0, z: 0.05, mode: "sit", expr: "dazed", headTilt: 0.25 });
          S.pop("zz", S.a + 4, 40, { x: -0.2, y: 1.55, z: 0.2, w: 0.5, h: 0.5, hold: true }); } },
      // 4 · that Friday: whip to the night street — the giant board counts up toward the record
      { set: "ginza", beat: 2, trans: "whip", dir: 1, light: "neon", cam: CAM.fit([0, 3.6, -6.5], { w: 7.0, a0: -6, a1: 4, e0: 8, e1: 4, push: 0.08 }),
        act: (S, u, f) => { const v = E.lerp(38200, 38915.87, E.ss(E.prog(f, S.a, W(2, "thousand,") + 6))); H.street.draw({ num: fmt(Math.floor(v * 100) / 100), sub: "FRI · DEC 29, 1989" });
          H.neon.forEach((n, i) => (n.visible = Math.floor(f / 6 + i) % 3 !== 0)); S.actor("kenji", { x: -0.6, z: -3.2, expr: "grin", look: -0.8 }); S.actor("aiko", { x: 0.6, z: -3.1, expr: "smile", look: -0.8 }); } },
      // 5 · …a record: SMASH — RECORD on the board, the crowd cheers, confetti
      { set: "ginza", word: [2, "record."], lead: 4, trans: "smash", light: "neon", cam: CAM.fit([0.4, 1.8, 1.0], { w: 3.8, a0: 16, a1: 6, elev: 8, push: 0.1 }),
        act: (S, u, f) => { H.street.draw({ num: "38,915.87", sub: "RECORD HIGH", subCol: GOLD }); S.actor("kenji", { x: -0.4, z: 1.2, expr: "laugh", prop: "up" }); S.actor("aiko", { x: 0.6, z: 1.3, expr: "laugh", prop: "up" }); S.actor("trader", { x: 1.6, z: 0.6, expr: "grin", prop: "fists" });
          S.pop("confetti", S.a + 2, 50, { x: 0.4, y: 2.8, z: 0.8, w: 3.6, h: 2.2, pop: false }); S.pop("word", W(2, "record.") + 1, 30, { x: 0.4, y: 2.75, z: 1.0, w: 1.6, h: 0.5, text: "RECORD!", col: GOLD }); } },
      // 6 · Japan is over forty percent: push THROUGH into the red sun stage — the world pie fills to 45%
      { set: "sun", beat: 3, trans: "zoom", light: SUN, cam: CAM.fit([-0.2, 2.2, -1.8], { w: 3.8, a0: -8, a1: 4, elev: 2, push: 0.1 }),
        act: (S, u, f) => { H.pie.p.visible = true; H.tower.visible = false; H.pie.draw({ k: +(0.45 * E.ss(E.prog(f, W(3, "over") - 2, W(3, "percent") + 8))).toFixed(3) });
          S.pop("label", W(3, "forty"), 40, { x: -0.2, y: 4.05, z: -1.6, w: 1.6, h: 0.42, text: "OVER 40%", bg: RED, col: "#fff", hold: true }); } },
      // 7 · …of the world's stock market: Kenji in front of the pie, shocked and proud
      { set: "sun", word: [3, "world's"], lead: 3, light: SUN, cam: CAM.fit([-0.4, 1.8, 0.0], { w: 3.4, a0: 14, a1: 6, elev: 4, push: 0.08 }),
        act: (S, u, f) => { H.pie.p.visible = true; H.tower.visible = false; H.pie.draw({ k: 0.45 }); S.actor("kenji", { x: -1.4, z: 0.6, expr: "shock", prop: "point", look: 0.5 });
          S.pop("sparks", W(3, "market.") - 2, 16, { x: 0.4, y: 3.0, z: -1.5, w: 1.4, h: 1.2 }); } },
      // 8 · your whole office wants a golf membership: whip to the country club — the gold card spins in
      { set: "golf", beat: 4, trans: "whip", dir: 1, light: "golden", cam: CAM.fit([-0.4, 1.5, -1.2], { w: 4.0, a0: -14, a1: -4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const t = W(4, "membership"); pop(H.card, f, t - 4, 8); H.card.rotation.y = 0.12 + 0.3 * Math.sin(f * 0.08); H.club1.visible = false; H.club2.visible = false;
          S.actor("boss", { x: -1.6, z: -0.6, expr: "grin", prop: "point", look: 0.4 }); S.actor("kenji", { x: 0.2, z: -0.4, expr: "smile", look: -0.4 }); S.actor("aiko", { x: 1.3, z: -0.6, expr: "grin", look: -0.5 });
          S.pop("sparks", t + 4, 16, { x: -0.9, y: 2.2, z: -1.4, w: 1.6, h: 1.0 }); } },
      // 9 · …and nobody even plays: the boss holds his club upside down, Kenji whiffs — "Which end?"
      { set: "golf", word: [4, "nobody"], lead: 4, trans: "cut", light: "golden", cam: CAM.fit([0.2, 1.1, -0.4], { w: 3.2, a0: 22, a1: 12, elev: 6, push: 0.1 }),
        act: (S, u, f) => { const t = W(4, "plays."); H.card.visible = false;
          H.club1.position.set(-1.1, 1.75, -0.45); H.club1.rotation.z = PI; S.actor("boss", { x: -1.3, z: -0.6, expr: "nervous", prop: "hold" });
          const sw = E.prog(f, t - 10, t + 2); H.club2.position.set(0.55, 0.95, -0.3); H.club2.rotation.z = 1.2 - 2.6 * E.easeIn(sw) + (f > t + 2 ? 0.3 * Math.sin(f) : 0);
          S.actor("kenji", { x: 0.3, z: -0.4, expr: f > t ? "pained" : "stern", prop: "hold", look: 0.3 }); S.say("Which end?", W(4, "nobody") + 2, 34, { x: -1.0, y: AH + 0.8, z: -0.5, w: 1.1, h: 0.42, tail: "right" });
          S.pop("puff", t + 2, 16, { x: 0.6, y: 0.25, z: -0.2, w: 0.8, h: 0.5 }); S.pop("label", t + 3, 26, { x: 0.6, y: 0.7, z: -0.1, w: 0.9, h: 0.3, text: "MISS", bg: "#ffffff", hold: true }); } },
      // 10 · then the floor gives way: Kenji atop the gold tower — the trapdoor opens, he drops
      { set: "sun", beat: 5, trans: "whip", dir: -1, light: SUN, cam: CAM.fit([1.3, 2.6, -0.6], { w: 3.6, a0: -12, a1: -4, elev: 4, push: 0.06 }),
        act: (S, u, f) => { const t = W(5, "floor"); const k = E.prog(f, t, t + 14); const top = 0.4 + 5 * 0.62;
          H.bars.forEach((b, i) => { b.position.y = 0.4 + i * 0.62 - (f > t ? 3.4 * E.easeIn(E.prog(f, t + i * 1.5, t + 10 + i * 1.5)) * (i >= 1 ? 1 : 0) : 0); b.visible = b.position.y > -0.2 || i === 0; });
          H.tLab.position.y = f > t ? 4.0 - 3.4 * E.easeIn(k) : 4.0; S.kick(t + 2, 0.12);
          S.actor("kenji", { x: 1.3, y: top - 3.2 * E.easeIn(k), z: -0.6, expr: f > t ? "shock" : "grin", mode: f > t + 6 ? "fall" : "stand", prop: f > t ? "up" : "fists" });
          S.pop("impact", t + 2, 18, { x: 2.2, y: 3.4, z: -0.2, w: 1.0, h: 0.5, text: "CRACK!" }); } },
      // 11 · by 2009 it's near seven thousand: whip to the street in cold rain — the board reads 7,054.98
      { set: "ginza", beat: 6, trans: "whip", dir: 1, light: "cold", snow: 0, cam: CAM.fit([0, 3.6, -6.5], { w: 7.0, a0: 4, a1: -4, elev: 6, push: 0.08 }),
        act: (S, u, f) => { const v = E.lerp(9000, 7054.98, E.ss(E.prog(f, S.a, W(6, "thousand.", 2) + 4))); H.street.draw({ num: fmt(Math.floor(v * 100) / 100), sub: "MARCH 2009", col: "#ff6a5a" });
          H.neon.forEach((n) => (n.visible = false)); H.umb.visible = true; H.umb.position.set(-0.4, 0.0, -3.2);
          S.actor("kenji", { x: -0.4, z: -3.2, expr: "pained", look: -0.8, prop: "hold" }); S.pop("arrow", W(6, "seven") - 2, 30, { x: 2.6, y: 6.4, z: -9.6, w: 0.6, h: 0.9, dir: "down" }); } },
      // 12 · over four fifths, gone: the tower — four of five gold bars vanish in puffs
      { set: "sun", word: [6, "Over"], lead: 3, trans: "cut", light: (u) => K.mixLight(SUN, K.light("storm"), 0.45), cam: CAM.fit([0.9, 1.4, -0.3], { w: 3.6, a0: 12, a1: 4, elev: 6, push: 0.1 }),
        act: (S, u, f) => { const t = W(6, "fifths,"); H.tLab.visible = false; H.lowLab.visible = true; H.lowLab.position.y = 1.3;
          H.bars.forEach((b, i) => { if (i === 0) return; const ti = t - 10 + i * 4; b.visible = f < ti; if (f >= ti && f < ti + 12) S.pop("puff", ti, 14, { x: 1.3, y: 0.7 + i * 0.62, z: -0.2, w: 1.2, h: 0.7 }); });
          S.actor("kenji", { x: 0.0, z: 0.5, expr: "dazed", mode: "sit", look: 0.5 }); S.pop("stars", S.a + 2, 30, { x: 0.0, y: 1.25, z: 0.5, w: 0.6, h: 0.5 });
          S.pop("label", W(6, "gone.") - 2, 40, { x: 1.3, y: 2.4, z: -0.2, w: 1.5, h: 0.4, text: "-82%", bg: RED, col: "#fff", hold: true }); } },
      // 13 · so how does a rich country's market stay down: dissolve to the empty exchange hall, dim, Kenji alone
      { set: "hall", beat: 7, trans: "dissolve", light: "night", cam: CAM.fit([0, 2.0, -2.6], { w: 5.4, a0: -10, a1: 2, elev: 4, push: 0.08 }),
        act: (S, u, f) => { H.hallBoard.draw({ num: "8,109.53", sub: "2003", col: "#ff6a5a" }); H.cal.draw({ top: "YEAR", big: "2003", bot: "STILL DOWN" }); H.ticket.visible = false;
          S.actor("kenji", { x: 0.3, z: -0.6, expr: "nervous", prop: "chin", look: -0.3 }); S.pop("question", W(7, "rich") - 2, 50, { x: 0.65, y: AH + 0.6, z: -0.6, w: 0.45, h: 0.55, hold: true }); } },
      // 14 · …for decades?: close on Kenji — question marks multiply
      { set: "hall", word: [7, "decades?"], lead: 6, steady: true, coc: 11, light: "night", cam: CAM.fit([0.3, AH - 0.05, -0.6], { w: 1.3, a0: 8, a1: 2, elev: 2, push: 0.12 }),
        act: (S, u, f) => { H.ticket.visible = false; S.actor("kenji", { x: 0.3, z: -0.6, expr: "shock", prop: "chin", look: 0.2 });
          S.pop("question", S.a + 2, 30, { x: 0.75, y: AH + 0.42, z: -0.5, w: 0.3, h: 0.4, hold: true }); S.pop("question", S.a + 8, 30, { x: -0.15, y: AH + 0.48, z: -0.5, w: 0.26, h: 0.36, hold: true }); } },
      // 15 · you see: whip to a sunny sidewalk — a kid's lemonade stand, Kenji walks up
      { set: "lemon", beat: 8, trans: "whip", dir: -1, light: "golden", cam: CAM.fit([-0.2, 1.1, -0.9], { w: 3.4, a0: -16, a1: -6, elev: 5, push: 0.1 }),
        act: (S, u, f) => { S.actor("kid", { x: 0, z: -1.75, expr: "grin", prop: "wave", wave: 0.5 + 0.5 * Math.sin(f * 0.5) }); S.actor("kenji", { x: -1.9 + 0.9 * E.ss(u), z: -0.2, mode: "stroll", phase: f * 0.05, look: 0.6, expr: "smile" }); } },
      // 16 · …sixty dollars for a lemonade stand: the $60 tag SLAPS on; Kenji hands over the bills
      { set: "lemon", word: [8, "sixty"], lead: 3, light: "golden", cam: CAM.fit([-0.3, 1.2, -0.9], { w: 2.6, a0: 18, a1: 8, elev: 5, push: 0.1 }),
        act: (S, u, f) => { const t = W(8, "sixty"); H.tag.visible = f >= t; pop(H.tag, f, t, 7); S.kick(t + 2, 0.05);
          H.bills.forEach((b, i) => { const t0 = W(8, "dollars") + i * 3; b.visible = f >= t0; b.position.set(-0.55 + 0.1 * i, 0.92 + 0.012 * i, -0.95 + 0.04 * Math.sin(i)); b.rotation.y = 0.3 * i; });
          S.actor("kid", { x: 0, z: -1.75, expr: "laugh" }); S.actor("kenji", { x: -1.0, z: -0.3, expr: "smile", prop: "hold", look: 0.7 }); } },
      // 17 · …earning one dollar a year: insert — a single coin drops into the jar, "$1 A YEAR"
      { set: "lemon", word: [8, "earning"], lead: 3, steady: true, coc: 11, light: "golden", cam: CAM.fit([0.55, 1.0, -1.0], { w: 1.0, a0: 6, a1: 0, elev: 12, push: 0.14 }),
        act: (S, u, f) => { const t = W(8, "one"); H.tag.visible = true; const k = E.prog(f, t - 4, t + 4); H.dollar.position.y = 0.92 + 0.6 * (1 - E.easeIn(k)); H.dollar.rotation.x = 4 * (1 - k);
          S.pop("label", W(8, "dollar") , 40, { x: 0.55, y: 1.36, z: -0.9, w: 0.8, h: 0.24, text: "$1 A YEAR", bg: "#ffffff", col: "#3a6a2a", hold: true }); S.pop("sparks", t + 4, 12, { x: 0.55, y: 1.0, z: -0.9, w: 0.4, h: 0.4 }); } },
      // 18 · great stand. terrible price.: the kid beams, Kenji's face falls as the tag flashes red
      { set: "lemon", beat: 9, trans: "dissolve", light: "golden", cam: CAM.fit([-0.4, 1.3, -1.1], { w: 2.8, a0: -10, a1: -2, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const t = W(9, "Terrible"); H.tag.visible = true; H.tag.scale.setScalar(f >= t ? 1.4 + 0.08 * Math.sin(f * 0.8) : 1);
          S.actor("kid", { x: 0, z: -1.75, expr: "grin", prop: "up" }); S.actor("kenji", { x: -1.0, z: -0.3, expr: f >= t ? "pained" : "smile", prop: f >= t ? "chin" : "hold", look: 0.6 });
          S.pop("label", W(9, "Great"), 22, { x: 0.45, y: 2.25, z: -1.2, w: 1.1, h: 0.3, text: "GREAT STAND", bg: GREEN, col: "#fff" }); S.pop("label", t, 40, { x: -0.55, y: 1.45, z: -0.8, w: 1.2, h: 0.3, text: "TERRIBLE PRICE", bg: RED, col: "#fff", hold: true }); S.kick(t, 0.04); } },
      // 19 · in eighty-nine, Tokyo cost sixty times earnings: push through into the scale — a tall price stack vs one coin
      { set: "sun", beat: 10, trans: "zoom", light: SUN, cam: CAM.fit([-1.0, 2.3, 0.6], { w: 4.8, a0: -8, a1: 4, elev: 3, push: 0.1 }),
        act: (S, u, f) => { H.tower.visible = false; H.scale.visible = true; H.sc.tilt(0.3); H.earnStack.forEach((c, i) => (c.visible = i === 0));
          S.pop("label", W(10, "sixty"), 50, { x: -1.0, y: 4.2, z: 0.7, w: 1.3, h: 0.5, text: "60x", bg: RED, col: "#fff", hold: true });
          S.pop("label", W(10, "Tokyo"), 50, { x: -2.6, y: 1.5, z: 0.9, w: 0.9, h: 0.26, text: "PRICE", bg: GOLD, hold: true }); S.pop("label", W(10, "earnings."), 40, { x: 0.6, y: 2.6, z: 0.9, w: 1.1, h: 0.26, text: "EARNINGS", bg: GREEN, col: "#fff", hold: true }); } },
      // 20 · profits needed decades to catch up: the green earnings stack grows coin by coin, the beam slowly levels
      { set: "sun", beat: 11, trans: "dissolve", light: SUN, cam: CAM.fit([-1.0, 2.3, 0.6], { w: 4.8, a0: 6, a1: -2, elev: 2, push: 0.06 }),
        act: (S, u, f) => { H.tower.visible = false; H.scale.visible = true; const k = E.ss(E.prog(f, S.a, S.b)); H.sc.tilt(0.3 - 0.22 * k); H.earnStack.forEach((c, i) => (c.visible = i < 1 + Math.floor(k * 4)));
          S.pop("label", S.a + 4, 60, { x: -1.0, y: 4.2, z: 0.7, w: 1.6, h: 0.4, text: "DECADES...", bg: INK, col: GOLD, hold: true }); } },
      // 21 · in February 2024, the Nikkei finally beats it: whip to the street by day — old Kenji, the board climbs
      { set: "ginza", beat: 12, trans: "whip", dir: 1, light: "office", cam: CAM.fit([0, 3.6, -6.5], { w: 7.0, a0: 6, a1: -2, e0: 8, e1: 4, push: 0.08 }),
        act: (S, u, f) => { const v = E.lerp(38262.16, 39098.68, E.ss(E.prog(f, W(12, "Nikkei") - 4, W(12, "beats") + 2))); H.street.draw({ num: fmt(v), sub: "FEB 22, 2024" });
          S.actor("kenjiOld", { x: -0.3, z: -3.2, expr: "nervous", look: -0.8 }); } },
      // 22 · …beats it: SMASH — NEW RECORD, old Kenji throws his arms up, confetti
      { set: "ginza", word: [12, "beats"], lead: 3, trans: "smash", light: "office", cam: CAM.fit([-0.3, 2.0, 0.6], { w: 3.0, a0: -16, a1: -8, elev: 8, push: 0.1 }),
        act: (S, u, f) => { H.street.draw({ num: "39,098.68", sub: "NEW RECORD", subCol: GOLD }); S.actor("kenjiOld", { x: -0.3, z: 1.2, expr: "laugh", prop: "up", tilt: 4 * Math.sin(f * 0.5) });
          S.pop("confetti", S.a + 2, 40, { x: -0.3, y: 2.8, z: 1.0, w: 3.2, h: 2.2, pop: false }); S.say("Finally!", S.a + 6, 30, { x: 0.45, y: AH + 0.75, z: 1.2, w: 0.9, h: 0.42, tail: "left" }); } },
      // 23 · by then it costs about sixteen times earnings (music stops): the scale, now nearly level — 16x
      { set: "sun", beat: 13, trans: "flash", light: (u) => K.mixLight(SUN, K.light("cold"), 0.35), cam: CAM.fit([-0.6, 2.2, 0.8], { w: 4.8, a0: -6, a1: 2, elev: 3, push: 0.12, roll: 1.5 }),
        act: (S, u, f) => { H.tower.visible = false; H.scale.visible = true; H.sc.tilt(0.03); H.priceStack.forEach((c, i) => (c.visible = true)); H.earnStack.forEach((c) => (c.visible = true));
          const t = W(13, "sixteen"); S.pop("label", t - 2, 60, { x: -1.0, y: 4.2, z: 0.7, w: 1.3, h: 0.5, text: "16x", bg: GREEN, col: "#fff", hold: true }); S.kick(t, 0.05);
          S.actor("kenjiOld", { x: 0.9, z: 1.4, expr: "shock", look: -0.6 }); } },
      // 24 · same number: the board splits — 1989 and 2024, the same digits
      { set: "ginza", beat: 14, trans: "whip", dir: -1, light: "office", cam: CAM.fit([0, 6.4, -9.9], { w: 7.4, a0: -4, a1: 2, elev: 0, push: 0.08 }),
        act: (S, u, f) => { H.street.draw({ num: "38,915 ≈ 39,098", sub: "1989   ·   2024" }); S.pop("label", W(14, "number.") - 2, 30, { x: 0, y: 8.3, z: -9.7, w: 3.0, h: 0.6, text: "SAME NUMBER", bg: GOLD, hold: true }); } },
      // 25 · this time, the profits are actually behind it: the gold price tower — on "it." a huge PROFITS block SLAMS down behind it
      { set: "sun", word: [14, "This"], lead: 3, trans: "zoom", light: SUN, cam: CAM.fit([1.3, 2.0, -0.6], { w: 4.2, a0: -14, a1: -6, elev: 5, push: 0.06 }),
        act: (S, u, f) => { const t = W(14, "it."); H.scale.visible = false; H.pie.p.visible = false; H.tLab.visible = true;
          H.profits.visible = f >= t - 7; const k = E.prog(f, t - 7, t); H.profits.position.y = 6 * (1 - E.easeIn(k)); H.profits.scale.set(1, f >= t && f < t + 5 ? 0.86 : 1, 1);
          S.kick(t, 0.16); S.pop("impact", t, 22, { x: 2.5, y: 2.6, z: 0.0, w: 1.2, h: 0.6, text: "SLAM!" }); S.pop("puff", t, 18, { x: 1.3, y: 0.4, z: -0.6, w: 3.4, h: 1.0 });
          S.actor("kenjiOld", { x: -0.3, z: 0.6, expr: f >= t ? "laugh" : "smile", prop: f >= t ? "up" : "point", look: 0.5 }); } },
    ],
  };
};
