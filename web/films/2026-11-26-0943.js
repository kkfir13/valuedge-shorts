// "The Wrong Zoom" (March 2020: investors piled into Zoom Technologies, OTC ticker ZOOM, silent since 2015, while the
// video app trades as ZM; ~$3 to over $20 in a month; SEC suspended trading March 26 for ten trading days. Tweeter 2013.
// Rashes 2001: look-alike tickers move together, deviations reverse within days) — film module.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const H = {};
  const PI = Math.PI;
  // fitted sign text: shrinks the font so the whole text fits; "\n" splits lines
  const tt = (B, s, bg, fg, pw, ph) => { const w = 1024, h = Math.round((1024 * ph) / pw), cv = document.createElement("canvas"); cv.width = w; cv.height = h; const g = cv.getContext("2d");
    g.fillStyle = bg; g.fillRect(0, 0, w, h); g.strokeStyle = fg; g.lineWidth = Math.max(6, Math.min(16, h * 0.06)); g.strokeRect(10, 10, w - 20, h - 20);
    const lines = s.split("\n"); let fs = Math.round((h * 0.56) / lines.length); g.font = `bold ${fs}px Georgia, serif`;
    const mw = Math.max(...lines.map((l) => g.measureText(l).width)); if (mw > w * 0.86) fs = Math.floor((fs * w * 0.86) / mw);
    g.font = `bold ${fs}px Georgia, serif`; g.fillStyle = fg; g.textAlign = "center"; g.textBaseline = "middle";
    lines.forEach((l, i) => g.fillText(l, w / 2, h / 2 + (i - (lines.length - 1) / 2) * fs * 1.12 + 4));
    const t = new B.THREE.CanvasTexture(cv); t.colorSpace = B.THREE.SRGBColorSpace; return t; };
  const hide = (o) => { o.visible = false; if (o.userData && o.userData.base) o.userData.base.v = false; return o; };
  const GREEN = "#38c172", RED = "#e2453c", YEL = "#ffd84a", INK = "#241726";
  const STAGE = K.backdrop("#e0663a");
  const pop = (o, f, t0, d = 7) => { const k = Math.max(0.01, E.back(E.prog(f, t0, t0 + d))); o.scale.setScalar(k); };

  // canvas helpers
  const canvasTex = (B, w, h, draw) => { const cv = document.createElement("canvas"); cv.width = w; cv.height = h; draw(cv.getContext("2d"), w, h);
    const t = new B.THREE.CanvasTexture(cv); t.colorSpace = B.THREE.SRGBColorSpace; return t; };
  // a video-call grid: 3x3 tiles, each a simple bean face
  const gridTex = (B) => canvasTex(B, 640, 420, (c, w, h) => {
    c.fillStyle = "#1c1f2a"; c.fillRect(0, 0, w, h);
    const cols = ["#5f8fd8", "#e29a5a", "#7ac27a", "#c27ab8", "#e2c25a", "#5ac2c2", "#d86a6a", "#8a8ad8", "#a8c25a"];
    const skins = ["#f2c9a4", "#c98a5a", "#f5d6b8", "#8a5a3a", "#e8b890"];
    for (let i = 0; i < 9; i++) { const x = 14 + (i % 3) * 206, y = 14 + Math.floor(i / 3) * 134; c.fillStyle = cols[i]; c.fillRect(x, y, 196, 124);
      c.fillStyle = skins[i % 5]; c.beginPath(); c.ellipse(x + 98, y + 66, 32, 38, 0, 0, PI * 2); c.fill();
      c.fillStyle = INK; c.beginPath(); c.arc(x + 86, y + 60, 4, 0, PI * 2); c.arc(x + 110, y + 60, 4, 0, PI * 2); c.fill();
      c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.arc(x + 98, y + 76, 10, 0.2, PI - 0.2); c.stroke();
      c.fillStyle = "#33384a"; c.fillRect(x + 50, y + 104, 96, 20); }
  });
  // a cobweb
  const webTex = (B) => canvasTex(B, 256, 256, (c, w, h) => { c.clearRect(0, 0, w, h); c.fillStyle = "rgba(0,0,0,0)"; c.fillRect(0, 0, w, h);
    c.strokeStyle = "#f4f0e6"; c.lineWidth = 3; for (let a = 0; a < 6; a++) { c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(a * 0.3) * 256, Math.sin(a * 0.3) * 256); c.stroke(); }
    for (let r = 50; r < 256; r += 45) { c.beginPath(); c.arc(0, 0, r, 0, PI / 2); c.stroke(); } });
  // a black suitcase (origin at its base); returns {g, lid}
  const suitcase = (B, x, y, z, s, tag, parent) => {
    const g = B.grp(x, y, z, 0, s, parent);
    B.box(0.8, 0.5, 0.28, "#1e2028", 0, 0, 0, { in: g });
    const lid = B.dyn(B.grp(0, 0.5, -0.14, 0, 1, g)); B.box(0.8, 0.08, 0.28, "#2a2d36", 0, 0, 0.14, { in: lid });
    B.box(0.3, 0.06, 0.06, "#4a4e58", 0, 0.08, 0.14, { in: lid });
    for (const sx of [-0.25, 0.25]) B.box(0.04, 0.5, 0.29, "#3a3e48", sx, 0, 0, { in: g });
    let t = null; if (tag) { t = B.dyn(B.plate(0.34, 0.2, tt(B, tag, "#f4efe2", INK, 0.34, 0.2), 0.42, 0.32, 0.16, { in: g, d: 0.01, edge: "#c9a44a" })); t.rotation.z = -0.25; }
    return { g: B.dyn(g), lid, tag: t };
  };

  return {
    cast: {
      dev: { jacket: "#e8a23a", pants: "#4a5a8a", boots: "#2a2d36", hat: "hair", hair: "#3a2a1a", skin: "#f2c9a4" },
      q1: { jacket: "#c27ab8", pants: "#5a4a6a", boots: "#2a2d36", hat: "hair", hair: "#1a1a1a", dress: "#c27ab8", skin: "#c98a5a" },
      q2: { jacket: "#5ac2c2", pants: "#3a4a5a", boots: "#2a2d36", hat: "beanie", cap: "#d86a6a", skin: "#f5d6b8" },
      q3: { jacket: "#7ac27a", pants: "#4a4030", boots: "#2a1a12", hat: "cap", cap: "#3a3a48", skin: "#8a5a3a", moustache: "#2a1a12" },
      reg: { jacket: "#2a2d3a", pants: "#2a2d3a", boots: "#0f0f14", hat: "hair", hair: "#b8b8c0", moustache: "#b8b8c0", skin: "#e8b890", buttons: "#c9a44a", build: "stout" },
    },
    sets: {
      // the app world: an orange stage with a giant phone (search box, price chart, BUY button), a price ride, balloons, ice
      app: (B) => {
        B.set.stage({ floor: "#f4d3b0", back: "#e0663a" });
        const ph = B.grp(0, 0, -1.6, 0, 1);
        B.box(2.4, 4.3, 0.3, "#1a1a22", 0, 0.05, 0, { in: ph }); B.box(2.15, 3.95, 0.02, "#f4f4f8", 0, 0.22, 0.16, { in: ph });
        B.box(0.5, 0.06, 0.02, "#3a3a44", 0, 4.05, 0.17, { in: ph });
        // search box with typed letters
        B.box(1.9, 0.42, 0.02, "#e2e4ec", 0, 3.45, 0.18, { in: ph });
        H.typed = ["Z", "ZO", "ZOO", "ZOOM"].map((s, i) => hide(B.dyn(B.plate(1.7, 0.36, tt(B, s, "#e2e4ec", INK, 1.7, 0.36), 0, 3.66, 0.2, { in: ph, d: 0.01, edge: "#e2e4ec" }))));
        H.search = B.dyn(B.plate(1.7, 0.36, tt(B, "SEARCH TICKER", "#e2e4ec", "#8a8c96", 1.7, 0.36), 0, 3.66, 0.2, { in: ph, d: 0.01, edge: "#e2e4ec" }));
        // price chart
        H.chart = B.prop.screen({ x: 0, y: 1.35, z: 0.19, w: 1.9, h: 1.85, in: ph, bg: "#13202b", label: "ZOOM", curve: (x) => 0.08 + 0.85 * x * x * x });
        H.p3 = B.dyn(B.plate(1.0, 0.36, tt(B, "$3", "#13202b", "#f4efe2", 1.0, 0.36), -0.45, 2.98, 0.25, { in: ph, d: 0.01, edge: "#13202b" }));
        H.p20 = hide(B.dyn(B.plate(1.0, 0.36, tt(B, "$20+", "#13202b", GREEN, 1.0, 0.36), 0.45, 2.98, 0.26, { in: ph, d: 0.01, edge: "#13202b" })));
        // BUY button
        H.buy = B.dyn(B.grp(0, 0.55, 0.2, 0, 1, ph)); B.box(1.5, 0.55, 0.12, GREEN, 0, 0, 0, { in: H.buy }); B.plate(1.2, 0.4, tt(B, "BUY", GREEN, "#ffffff", 1.2, 0.4), 0, 0.28, 0.07, { in: H.buy, d: 0.01, edge: GREEN });
        H.phone = B.dyn(ph);
        // the ice block (hidden until "froze")
        const ice = new B.THREE.MeshToonMaterial({ color: "#bfe8ff", transparent: true, opacity: 0.5 });
        H.ice = hide(B.dyn(B.box(2.9, 4.8, 0.9, ice, 0, 0, -1.55)));
        H.frozen = hide(B.dyn(B.plate(2.2, 0.5, tt(B, "TRADING SUSPENDED", "#2f6ab5", "#ffffff", 2.2, 0.5), 0, 1.0, -1.05, { d: 0.03, edge: "#ffffff" })));
        // the launch arrow (frame 0)
        H.arrow = hide(B.prop.arrow({ x: -1.9, y: 0, z: -0.4, size: 0.9, col: GREEN }));
        // the price ride: a green bar that grows with a seat on top
        H.bar = B.dyn(B.box(0.8, 1, 0.8, GREEN, 2.3, 0, -0.9));
        H.seat = B.dyn(B.grp(2.3, 1, -0.9, 0, 1)); B.prop.chair({ x: 0, y: 0, z: 0, col: "#e2453c", in: H.seat });
        H.belt = hide(B.dyn(B.box(0.5, 0.08, 0.05, "#2a2d36", 0, 0.75, 0.28, { in: H.seat })));
        // the twin balloons (look-alike tickers) + the journal
        H.balloons = hide(B.dyn(B.grp(0, 0, 0.6, 0, 1)));
        H.bz = B.dyn(B.grp(-0.55, 0, 0, 0, 1, H.balloons)); B.ball(0.42, RED, 0, 2.4, 0, { in: H.bz, sy: 1.2 }); B.cyl(0.01, 0.01, 1.9, "#f4efe2", 0, 0, 0, { in: H.bz, seg: 4 });
        B.plate(0.66, 0.24, tt(B, "ZOOM", "#ffffff", RED, 0.66, 0.24), 0, 2.4, 0.43, { in: H.bz, d: 0.01, edge: RED });
        H.bm = B.dyn(B.grp(0.55, 0, 0, 0, 1, H.balloons)); B.ball(0.42, "#2f6ab5", 0, 2.4, 0, { in: H.bm, sy: 1.2 }); B.cyl(0.01, 0.01, 1.9, "#f4efe2", 0, 0, 0, { in: H.bm, seg: 4 });
        B.plate(0.66, 0.24, tt(B, "ZM", "#ffffff", "#2f6ab5", 0.66, 0.24), 0, 2.4, 0.43, { in: H.bm, d: 0.01, edge: "#2f6ab5" });
        H.journal = hide(B.dyn(B.grp(-2.2, 0, 0.2, 0.3, 1)));
        B.prop.pedestal({ x: 0, z: 0, r: 0.6, h: 0.9, col: "#f4efe2", trim: "#c9a44a", in: H.journal });
        B.box(0.9, 0.16, 0.65, "#8a1f2a", 0, 0.9, 0, { in: H.journal });
        B.plate(1.3, 0.42, tt(B, "JOURNAL OF FINANCE", "#8a1f2a", "#f4efe2", 1.3, 0.42), 0, 1.55, 0.0, { in: H.journal, d: 0.02, edge: "#c9a44a" });
        B.lamp(0, 6, 3, "#fff0d8", 7, 16); B.lamp(-3, 3, 1, "#ffe0b0", 3, 10); B.lamp(3, 4, -2, "#a8d8ff", 3, 9);
      },
      // March 2020: a small apartment, mustard walls, sofa, laptop with a video-call grid, toilet-paper tower, sourdough
      home: (B) => {
        B.set.room({ style: "home", wall: "plaster:#e8c26a", floor: "floor:#9a6b42", w: 9, d: 7, h: 3.6, windows: [-2.6], door: false });
        B.box(2.6, 0.45, 0.9, "#3f8a8a", 0, 0, -2.7); B.box(2.6, 0.7, 0.25, "#357a7a", 0, 0.45, -3.1); for (const sx of [-1.25, 1.25]) B.box(0.22, 0.65, 0.9, "#357a7a", sx, 0.0, -2.7);
        B.box(1.5, 0.42, 0.7, "floor:#6a4630", 0, 0, -1.4);
        // laptop on the coffee table, screen facing the sofa (towards -z)… and a big wall TV-style grid for the camera
        const lp = B.grp(0, 0.42, -1.35, PI, 1); B.box(0.55, 0.03, 0.4, "#9aa0aa", 0, 0, 0, { in: lp }); const ls = B.box(0.55, 0.36, 0.02, "#9aa0aa", 0, 0.03, 0.19, { in: lp }); ls.rotation.x = -0.2;
        H.wall = B.plate(2.4, 1.58, gridTex(B), 1.4, 1.95, -3.44, { d: 0.05, edge: "#1c1f2a" });
        H.appTag = B.plate(0.9, 0.26, tt(B, "VIDEO APP", "#1c1f2a", "#f4efe2", 0.9, 0.26), 1.4, 2.9, -3.42, { d: 0.02, edge: "#1c1f2a" });
        H.cal = B.plate(0.9, 0.7, tt(B, "MARCH\n2020", "#f4efe2", RED, 0.9, 0.7), -1.2, 2.2, -3.44, { d: 0.02, edge: "#c9a44a" });
        // toilet-paper tower and a sourdough loaf
        for (let i = 0; i < 9; i++) B.cyl(0.11, 0.11, 0.2, "#fafaf4", -3.2 + (i % 3) * 0.23, Math.floor(i / 3) * 0.2, -2.9, { seg: 14 });
        B.ball(0.16, "#c88a4a", 0.45, 0.48, -1.35, { sx: 1.4, sy: 0.7 });
        B.prop.plant({ x: 3.6, z: -3.0 }); B.prop.lamp({ x: -1.9, z: -2.9, kind: "floor" }); B.prop.rug({ x: 0, z: -1.2, w: 3.2, d: 2.2, col: "#8c3b4a" });
        B.lamp(0, 3, 1.5, "#fff0d0", 4, 10);
      },
      // the silent company: an empty, dusty office — nameplate, a 2015 calendar, cobwebs, an empty chair, unopened mail
      dusty: (B) => {
        B.set.room({ style: "office", wall: "plaster:#b8b0a0", floor: "carpet:#5a5a62", w: 8, d: 7, h: 3.6, windows: [2.3], door: false });
        B.prop.desk({ x: -0.2, z: -2.3, w: 2.0, col: "floor:#7a6a5a" });
        B.box(0.6, 0.48, 0.5, "#d8d2c4", -0.2, 0.81, -2.4); B.plate(0.46, 0.34, "#3a4a4a", -0.2, 1.06, -2.14, { d: 0.01, edge: "#d8d2c4" });
        H.chair = B.prop.chair({ x: -0.2, z: -1.6, col: "#4a4a52", ry: PI });
        B.plate(2.6, 0.5, tt(B, "ZOOM TECHNOLOGIES", "#c8c0b0", "#5a5048", 2.6, 0.5), -0.2, 3.0, -3.4, { d: 0.04, edge: "#8a8070" });
        H.cal = B.plate(0.9, 0.7, tt(B, "2015", "#efe4b8", "#8a6a3a", 0.9, 0.7), -2.6, 1.9, -3.44, { d: 0.02, edge: "#a89868" });
        const web = webTex(B); for (const [x, y, ry] of [[-3.9, 3.55, 0], [3.9, 3.55, PI / 2]]) { const p = B.plate(1.0, 1.0, web, x + (ry ? 0 : 0.5), y - 0.5, -3.3, { d: 0.005, own: true }); p.face.transparent = true; p.face.alphaTest = 0.3; }
        for (let i = 0; i < 9; i++) { const m = B.box(0.32, 0.02, 0.22, i % 2 ? "#f4efe2" : "#e8dcc0", 1.2 + (i % 3) * 0.2, i * 0.02, -1.0 + (i % 2) * 0.1); m.rotation.y = i * 0.7; }
        H.x7 = hide(B.dyn(B.plate(0.8, 0.5, tt(B, "x7", YEL, INK, 0.8, 0.5), 0.7, 1.15, -2.0, { d: 0.03, edge: INK })));
        H.bj = hide(B.dyn(B.plate(1.3, 0.6, tt(B, "LAST ADDRESS:\nBEIJING", "#f4efe2", INK, 1.3, 0.6), 2.3, 1.45, -3.35, { d: 0.02, edge: "#a89868" })));
        B.prop.plant({ x: -3.4, z: -3.0, col: "#8a7a4a" });
        B.lamp(1.5, 3, 0, "#e0e4f0", 3, 10);
      },
      // 2013, night: a closed electronics store, boarded up, a price board on a post, a newspaper
      store: (B) => {
        B.box(40, 0.1, 30, "concrete:#8a8a90", 0, -0.1, 6);
        B.facade({ style: "modern", w: 6, x: 0, z: -3.4, sign: "TWEETER", seed: 5, floors: 2, lit: false });
        B.facade({ style: "brick", w: 6, x: -6, z: -3.4, sign: "", seed: 2, floors: 3, lit: true }); B.facade({ style: "shop", w: 6, x: 6, z: -3.4, sign: "", seed: 9, lit: true });
        for (let i = 0; i < 4; i++) { const p = B.box(3.4, 0.22, 0.06, "planks:#a87a4a", 0, 0.6 + i * 0.45, -3.1); p.rotation.z = (i % 2 ? 1 : -1) * 0.05; }
        B.prop.sign({ x: -1.6, y: 1.3, z: -3.0, text: "CLOSED", w: 1.0, h: 0.4, bg: RED, fg: "#ffffff" });
        H.stamp = hide(B.dyn(B.plate(1.9, 0.55, tt(B, "BANKRUPT", "#f4efe2", RED, 1.9, 0.55), 0.6, 1.6, -2.95, { d: 0.02, edge: RED })));
        H.board = B.prop.screen({ x: 2.6, y: 0, z: -1.6, w: 1.4, h: 1.0, y0: 1.5, stand: true, label: "TWTRQ", curve: (x) => 0.05 + 0.9 * Math.pow(x, 4) });
        H.c1 = B.dyn(B.plate(0.9, 0.3, tt(B, "1¢", "#13202b", "#f4efe2", 0.9, 0.3), 2.6, 2.75, -1.5, { d: 0.02, edge: "#13202b" }));
        H.c15 = hide(B.dyn(B.plate(0.9, 0.3, tt(B, "15¢!", "#13202b", GREEN, 0.9, 0.3), 2.6, 2.75, -1.48, { d: 0.02, edge: "#13202b" })));
        H.paper = hide(B.dyn(B.plate(0.9, 1.1, tt(B, "THE NEWS\n\nTWITTER\nFILES TO\nGO PUBLIC", "#f2ede0", INK, 0.9, 1.1), 0, 1.2, 0.6, { d: 0.01, edge: "#c8c0b0" })));
        for (const x of [-3.4, 3.8]) B.prop.lampPost({ x, z: -0.6, light: true });
        B.lamp(0, 4, 2, "#ffe8c0", 4, 12);
      },
      // the analogy: an airport baggage hall — a carousel of identical black suitcases, a BAGGAGE CLAIM sign
      airport: (B) => {
        B.set.room({ style: "modern", w: 12, d: 8, h: 4.2, windows: [-4, -2, 2, 4], lit: true, door: false });
        B.prop.bulbSign({ x: 0, y: 3.2, z: -3.9, text: "BAGGAGE CLAIM", w: 3.6, h: 0.6, bg: "#1a2a4a", fg: YEL });
        B.box(9, 0.55, 1.3, "metal:#8d949c", 0, 0, -1.8); B.box(9, 0.04, 1.1, "#2a2d36", 0, 0.55, -1.8);
        H.belt = []; for (let i = 0; i < 9; i++) H.belt.push(suitcase(B, -4 + i * 1.0, 0.59, -1.8, 0.95, i % 3 === 1 ? "ZOOM" : null).g);
        H.case = suitcase(B, 0.9, 0, -0.5, 1.2, "ZOOM"); hide(H.case.g);
        H.ducks = []; for (let i = 0; i < 6; i++) H.ducks.push(hide(B.dyn(B.ball(0.12, "#ffd84a", 0.9, 0.5, -0.5, { sx: 1.2 }))));
        H.tutu = hide(B.dyn(B.cone(0.3, 0.25, "#f49ac2", 0.9, 0.5, -0.5, { seg: 14 })));
        B.prop.plant({ x: -5.2, z: -3.4 }); B.prop.plant({ x: 5.2, z: -3.4 });
        B.lamp(0, 4, 1, "#f0f4ff", 5, 12);
      },
    },
    shots: [
      // 0 · frame 0: a green arrow blasts up off the app stage — WHOOSH; the camera tilts up with it
      { set: "app", f: 0, light: STAGE, cam: CAM.keys([[0, { p: [0.4, 1.0, 4.6], t: [-1.0, 0.9, -0.8], fov: 44 }], [1, { p: [0.4, 2.0, 4.4], t: [-1.2, 2.6, -1.0], fov: 44 }]]),
        act: (S, u, f) => { const k = E.easeOut(E.prog(f, 0, 40)); H.arrow.visible = true; H.arrow.position.y = -0.8 + 3.2 * k; H.arrow.rotation.z = 0.1 * Math.sin(f * 0.5);
          S.kick(2, 0.08); S.fx("speed", { x: -1.9, y: 0.6 + 2.6 * k, z: -0.2, w: 0.8, h: 1.2 }); S.pop("impact", 3, 20, { x: -0.6, y: 1.4, z: 0, w: 0.8, h: 0.45, text: "WHOOSH!" });
          S.pop("label", W(0, "stock") - 2, 30, { x: 0.3, y: 2.2, z: -0.2, w: 1.1, h: 0.32, text: "ONE STOCK", bg: YEL, hold: true }); } },
      // 1 · from $3 to past $20 in a month: the giant phone's chart climbs, the price flips
      { set: "app", word: [0, "three"], lead: 3, trans: "whip", dir: 1, light: STAGE, cam: CAM.fit([0, 2.2, -1.4], { w: 2.9, a0: -8, a1: 4, elev: 4, push: 0.12 }),
        act: (S, u, f) => { const t = W(0, "twenty"); H.chart.draw({ t: E.ss(E.prog(f, W(0, "three") - 4, W(0, "month.") + 6)) }); H.p20.visible = f >= t; H.p3.visible = f < t; if (f >= t) pop(H.p20, f, t);
          S.pop("arrow", t, 30, { x: 1.3, y: 2.6, z: -1.0, w: 0.4, h: 0.6, dir: "up" });
          S.pop("label", W(0, "month.") - 2, 30, { x: 0, y: 4.55, z: -1.2, w: 1.2, h: 0.3, text: "ONE MONTH", bg: "#f4efe2", hold: true }); } },
      // 2 · its company hasn't said a word: whip to the empty, dusty office — the chair is empty
      { set: "dusty", beat: 1, trans: "whip", dir: -1, light: "cold", cam: CAM.fit([-0.3, 1.5, -2.2], { w: 4.2, a0: -10, a1: 0, elev: 6, push: 0.08 }),
        act: (S, u, f) => { S.pop("label", W(1, "company") - 2, 30, { x: -0.2, y: 2.25, z: -2.0, w: 1.2, h: 0.3, text: "THE COMPANY", bg: "#f4efe2", hold: true }); } },
      // 3 · since 2015: insert on the yellowed 2015 calendar, dust puff, Zzz
      { set: "dusty", word: [1, "word"], lead: 3, steady: true, coc: 10, light: "cold", cam: CAM.fit([-2.6, 1.9, -3.2], { w: 1.6, a0: 8, a1: 2, elev: 2, push: 0.14 }),
        act: (S, u, f) => { const t = W(1, "fifteen."); H.cal.scale.setScalar(1 + 0.15 * Math.max(0, 1 - Math.abs(f - t - 3) / 8));
          S.pop("puff", W(1, "word"), 20, { x: -2.6, y: 1.9, z: -3.0, w: 1.0, h: 0.7, pop: false }); S.pop("zz", t, 40, { x: -2.1, y: 2.5, z: -3.0, w: 0.5, h: 0.5, hold: true });
          S.pop("label", t - 2, 36, { x: -2.6, y: 1.3, z: -3.0, w: 1.4, h: 0.28, text: "SILENT SINCE", bg: RED, col: "#fff", hold: true }); } },
      // 4 · March 2020: flash (time jump) into the apartment — the calendar, toilet paper, the window
      { set: "home", beat: 2, trans: "flash", light: "interior", cam: CAM.fit([-1.6, 1.8, -3.0], { w: 3.4, a0: 10, a1: 2, elev: 2, push: 0.1 }),
        act: (S, u, f) => { S.pop("ring", W(2, "twenty", 1), 18, { x: -1.2, y: 2.5, z: -3.3, w: 1.0, h: 0.8 }); } },
      // 5 · everyone's stuck at home on Zoom: Dev on the sofa in pyjamas, the call grid on the wall
      { set: "home", word: [2, "Everyone's"], lead: 3, trans: "dissolve", light: "interior", cam: CAM.fit([0.6, 1.5, -2.6], { w: 4.0, a0: -14, a1: -4, elev: 6, push: 0.08 }),
        act: (S, u, f) => { S.actor("dev", { x: -0.4, z: -2.4, mode: "sit", expr: f < W(2, "Zoom.") ? "smile" : "grin", look: 0.6 });
          S.pop("label", W(2, "Zoom.") - 2, 40, { x: 1.4, y: 3.15, z: -3.2, w: 0.9, h: 0.32, text: "ZOOM", bg: "#2f6ab5", col: "#fff", hold: true }); } },
      // 6 · so you type ZOOM: whip to the giant phone, letters appear in the search box, Dev taps
      { set: "app", beat: 3, trans: "whip", dir: 1, light: STAGE, cam: CAM.fit([0.4, 2.6, -1.0], { w: 3.0, a0: 10, a1: 2, elev: 2, push: 0.12 }),
        act: (S, u, f) => { const t = W(3, "ZOOM"); H.typed.forEach((p, i) => (p.visible = f >= t - 6 + i * 3 && (i === 3 || f < t - 6 + (i + 1) * 3))); H.search.visible = f < t - 6;
          S.actor("dev", { x: 0.95, z: -0.2, expr: "grin", prop: "point", look: -0.5 }); } },
      // 7 · and hit buy: smash onto the BUY button pressed — "Easy money!"
      { set: "app", word: [3, "hit"], lead: 3, trans: "smash", light: STAGE, cam: CAM.fit([0.5, 1.2, -1.0], { w: 2.6, a0: -12, a1: -4, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.typed.forEach((p, i) => (p.visible = i === 3)); H.search.visible = false; H.p3.visible = false; H.p20.visible = true; H.chart.draw({ t: 1 }); const t = W(3, "buy.");
          H.buy.position.z = 0.2 - 0.08 * Math.max(0, 1 - Math.abs(f - t) / 5);
          S.actor("dev", { x: 1.1, z: -0.5, expr: f < t ? "grin" : "laugh", prop: f < t ? "point" : "up", look: -0.5 });
          S.kick(t, 0.08); S.pop("impact", t, 18, { x: -0.2, y: 1.3, z: -1.0, w: 0.6, h: 0.4, text: "TAP!" });
          S.say("Easy money!", t + 2, 26, { x: 1.6, y: 2.4, z: -0.4, w: 1.0, h: 0.4 }); } },
      // 8 · so does everyone: a crowd in pyjamas jabs the BUY button, coins fly
      { set: "app", beat: 4, trans: "whip", dir: -1, light: STAGE, cam: CAM.fit([0, 1.6, -0.8], { w: 4.4, a0: 12, a1: 4, elev: 6, push: 0.08 }),
        act: (S, u, f) => { H.typed.forEach((p, i) => (p.visible = i === 3)); H.search.visible = false; H.p3.visible = false; H.p20.visible = true; H.chart.draw({ t: 1 }); H.buy.position.z = 0.2 - 0.06 * (Math.sin(f * 0.8) > 0.6 ? 1 : 0);
          ["q1", "q2", "q3", "dev"].forEach((id, i) => S.actor(id, { x: -1.5 + i * 1.0, z: -0.4 + (i % 2) * 0.35, expr: i % 2 ? "laugh" : "grin", prop: (Math.floor(f / 8) + i) % 2 ? "point" : "up", look: i < 2 ? 0.3 : -0.3 }));
          for (let q = 0; q < 5; q++) S.pop("coin", W(4, "everyone.") - 10 + q * 4, 18, { x: -1.2 + q * 0.6, y: 2.2, z: -0.6, w: 0.22, h: 0.22, rise: 0.5 }); } },
      // 9 · the price needs a seatbelt: Dev rides the green bar up, the belt clicks — CLICK!
      { set: "app", word: [4, "The"], lead: 3, trans: "dissolve", light: STAGE, cam: (u, lf, f) => { const top = 1 + 2.4 * E.ss(E.prog(f, W(4, "price") - 4, W(4, "seatbelt.") + 10));
          return { p: [0.3, top + 0.4, 3.6], t: [2.1, top + 0.4, -0.9], fov: 42 }; },
        act: (S, u, f) => { const top = 1 + 2.4 * E.ss(E.prog(f, W(4, "price") - 4, W(4, "seatbelt.") + 10)); H.bar.scale.y = top; H.bar.position.y = top / 2; H.seat.position.y = top; H.typed.forEach((p, i) => (p.visible = i === 3)); H.search.visible = false; H.p3.visible = false; H.p20.visible = true; H.chart.draw({ t: 1 });
          const t = W(4, "seatbelt."); H.belt.visible = f >= t;
          S.actor("dev", { x: 2.3, y: top, z: -0.75, mode: "sit", expr: f < t ? "shock" : "nervous" });
          S.fx("speed", { x: 2.3, y: top - 0.6, z: -0.4, w: 0.9, h: 1.0 }); S.pop("impact", t + 1, 18, { x: 1.4, y: top + 1.0, z: -0.4, w: 0.6, h: 0.38, text: "CLICK!" });} },
      // 10 · why is a silent company…? push through into the dusty office, a question mark over the empty chair
      { set: "dusty", beat: 5, trans: "zoom", light: (u) => K.mixLight(K.light("cold"), K.light("mind"), 0.3), cam: CAM.fit([-0.2, 1.3, -1.8], { w: 3.0, a0: 12, a1: 4, elev: 8, push: 0.12 }),
        act: (S, u, f) => { S.pop("question", W(5, "Why"), 60, { x: -0.2, y: 2.1, z: -1.5, w: 0.4, h: 0.6, hold: true });
          S.pop("label", W(5, "silent") - 2, 30, { x: 0.8, y: 2.3, z: -1.4, w: 0.9, h: 0.3, text: "SILENT", bg: "#f4efe2", hold: true }); } },
      // 11 · worth seven times as much: insert, an x7 tag slaps down on the dusty desk
      { set: "dusty", word: [5, "worth"], lead: 3, steady: true, coc: 10, light: "cold", cam: CAM.fit([0.4, 1.1, -2.0], { w: 1.8, a0: -10, a1: -4, elev: 10, push: 0.14 }),
        act: (S, u, f) => { const t = W(5, "seven"); H.x7.visible = f >= t - 2; pop(H.x7, f, t - 2); S.kick(t + 2, 0.06);
          S.pop("puff", t + 2, 18, { x: 0.7, y: 0.95, z: -1.9, w: 1.2, h: 0.5, pop: false }); } },
      // 12 · the app is Z M: whip back to the apartment wall grid, a big "ZM" label
      { set: "home", beat: 6, trans: "whip", dir: 1, light: "interior", cam: CAM.fit([1.4, 2.1, -3.4], { w: 2.9, a0: -6, a1: 2, elev: 2, push: 0.12 }),
        act: (S, u, f) => { S.pop("label", W(6, "Z") - 2, 50, { x: 1.4, y: 2.0, z: -3.0, w: 1.2, h: 0.5, text: "ZM", bg: "#2f6ab5", col: "#fff", hold: true });
          S.pop("label", W(6, "app") - 2, 30, { x: 1.4, y: 3.15, z: -3.2, w: 1.3, h: 0.3, text: "THE REAL APP", bg: "#4fd18b", hold: true }); } },
      // 13 · this ZOOM is a tiny firm: dissolve to the dusty office, the faded ZOOM TECHNOLOGIES nameplate
      { set: "dusty", word: [6, "This"], lead: 3, trans: "dissolve", light: "cold", cam: CAM.fit([-0.2, 2.2, -2.8], { w: 3.2, a0: 6, a1: -2, elev: 2, push: 0.1 }),
        act: (S, u, f) => { S.pop("label", W(6, "ZOOM") - 2, 30, { x: -0.2, y: 3.25, z: -3.0, w: 1.0, h: 0.32, text: "ZOOM", bg: RED, col: "#fff", hold: true });
          S.pop("label", W(6, "tiny") - 2, 30, { x: -0.2, y: 1.6, z: -2.0, w: 1.1, h: 0.3, text: "TINY FIRM", bg: "#f4efe2", hold: true }); } },
      // 14 · last heard from in Beijing: the window, a faded address card pops up
      { set: "dusty", word: [6, "last"], lead: 3, trans: "whip", dir: 1, light: "cold", cam: CAM.fit([2.1, 1.6, -3.0], { w: 2.4, a0: -10, a1: -2, elev: 2, push: 0.12 }),
        act: (S, u, f) => { const t = W(6, "Beijing."); H.bj.visible = f >= t - 4; pop(H.bj, f, t - 4); S.pop("sparks", t + 2, 16, { x: 2.3, y: 2.1, z: -3.1, w: 1.4, h: 0.4 }); } },
      // 15 · in 2013: dip to a night street, the boarded-up store
      { set: "store", beat: 7, trans: "dip", light: "night", cam: CAM.fit([0, 1.8, -2.4], { w: 4.6, a0: 8, a1: 0, elev: 6, push: 0.08 }),
        act: (S, u, f) => { S.pop("label", W(7, "thirteen,") - 4, 40, { x: -1.6, y: 3.2, z: -2.0, w: 0.9, h: 0.32, text: "2013", bg: YEL, hold: true });
          S.pop("label", W(7, "thirteen,") + 10, 40, { x: 0.0, y: 0.9, z: -1.6, w: 1.2, h: 0.3, text: "CLOSED SINCE 2007", bg: "#f4efe2", hold: true }); } },
      // 16 · a bankrupt chain called Tweeter: a BANKRUPT stamp slams onto the boards
      { set: "store", word: [7, "bankrupt"], lead: 3, trans: "smash", light: "night", cam: CAM.fit([0.3, 1.9, -2.8], { w: 2.6, a0: -6, a1: 2, elev: 2, push: 0.12 }),
        act: (S, u, f) => { const t = W(7, "bankrupt"); H.stamp.visible = f >= t; pop(H.stamp, f, t, 5); S.kick(t + 1, 0.1);
          S.pop("label", W(7, "Tweeter") - 2, 30, { x: 0, y: 3.4, z: -2.6, w: 1.2, h: 0.3, text: "TWEETER", bg: "#f4efe2", hold: true }); } },
      // 17 · jumped over tenfold: a crowd rushes the closed shop waving cash, the price board rockets 1¢ → 15¢
      { set: "store", word: [7, "jumped"], lead: 3, trans: "whip", dir: 1, light: "neon", cam: CAM.fit([0.9, 1.7, -1.6], { w: 4.6, a0: 14, a1: 6, elev: 6, push: 0.08 }),
        act: (S, u, f) => { H.stamp.visible = true; const t = W(7, "tenfold"); H.board.draw({ t: E.ss(E.prog(f, W(7, "jumped") - 2, t + 6)), label: "TWTRQ" }); H.c15.visible = f >= t; H.c1.visible = f < t; if (f >= t) pop(H.c15, f, t);
          ["q1", "q2", "q3"].forEach((id, i) => S.actor(id, { x: -1.2 + i * 0.9 + 0.3 * E.ss(E.prog(f, W(7, "jumped"), t + 10)), z: -1.0 + i * 0.3, expr: "laugh", prop: "up", mode: "stroll", phase: f * 0.05 + i }));
          S.pop("dollar", t - 4, 26, { x: 0, y: 2.6, z: -0.6, w: 1.8, h: 0.6, pop: false }); S.pop("label", t, 30, { x: 2.6, y: 3.2, z: -1.4, w: 0.9, h: 0.32, text: "x10+", bg: YEL, hold: true }); } },
      // 18 · when Twitter filed to go public: the newspaper spins in on the sidewalk
      { set: "store", word: [7, "when"], lead: 3, trans: "dissolve", light: "night", steady: true, coc: 10, cam: CAM.fit([0, 1.2, 0.6], { w: 1.6, a0: 6, a1: -2, elev: 4, push: 0.12 }),
        act: (S, u, f) => { const k = E.back(E.prog(f, W(7, "when"), W(7, "Twitter") + 8)); H.paper.visible = true; H.paper.scale.setScalar(Math.max(0.01, k)); H.paper.rotation.z = (1 - k) * 6; H.stamp.visible = true; } },
      // 19 · you see, it's like an airport: push through into the baggage hall, identical black suitcases on the belt
      { set: "airport", beat: 8, trans: "zoom", light: "office", cam: CAM.fit([0.5, 1.2, -1.4], { w: 4.4, a0: -12, a1: -4, elev: 8, push: 0.1 }),
        act: (S, u, f) => { H.belt.forEach((g, i) => (g.position.x = ((g.userData.base.p.x + 4.5 + f * 0.02) % 9) - 4.5));
          S.actor("dev", { x: 1.6, z: -0.6, expr: "neutral", look: -0.6 }); } },
      // 20 · grabbing a black suitcase: Dev grabs one off the belt — "That's mine!"
      { set: "airport", word: [8, "grabbing"], lead: 3, trans: "whip", dir: -1, light: "office", cam: CAM.fit([0.6, 1.3, -1.0], { w: 2.8, a0: 10, a1: 2, elev: 4, push: 0.12 }),
        act: (S, u, f) => { const t = W(8, "grabbing"); H.belt.forEach((g, i) => (g.position.x = ((g.userData.base.p.x + 4.5 + f * 0.02) % 9) - 4.5));
          H.case.g.visible = true; const k = E.ss(E.prog(f, t, t + 14)); H.case.g.position.set(0.3 + 0.6 * k, 0.59 * (1 - k) + 0.25 * k, -1.8 + 1.3 * k);
          S.actor("dev", { x: 1.3, z: -0.4, expr: "grin", prop: "hold", look: -0.4 });
          S.say("That's mine!", t + 6, 34, { x: 1.0, y: 2.65, z: -0.4, w: 1.0, h: 0.4 }); } },
      // 21 · because the tag looks right: insert on the ZOOM luggage tag, a green tick
      { set: "airport", word: [8, "tag"], lead: 4, steady: true, coc: 11, light: "office", cam: CAM.fit([1.35, 0.6, -0.4], { w: 1.1, a0: 8, a1: 2, elev: 6, push: 0.14 }),
        act: (S, u, f) => { H.case.g.visible = true; H.case.g.position.set(0.9, 0.25, -0.5);
          S.pop("label", W(8, "right.") - 2, 30, { x: 1.4, y: 1.0, z: -0.3, w: 0.8, h: 0.24, text: "LOOKS RIGHT", bg: "#4fd18b", hold: true }); } },
      // 22 · a Journal of Finance study: whip to the stage, the red journal on its pedestal, twin balloons
      { set: "app", beat: 9, trans: "whip", dir: 1, light: STAGE, cam: CAM.fit([-1.3, 1.7, 0.2], { w: 3.4, a0: -16, a1: -6, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.journal.visible = true; H.balloons.visible = true; H.typed.forEach((p, i) => (p.visible = i === 3)); H.search.visible = false; H.p3.visible = false; H.p20.visible = true; H.chart.draw({ t: 1 });
          S.pop("sparks", W(9, "Journal"), 16, { x: -2.2, y: 1.2, z: 0.4, w: 0.8, h: 0.4 }); } },
      // 23 · look-alike tickers move together: the ZOOM and ZM balloons float up side by side
      { set: "app", word: [9, "look-alike"], lead: 3, trans: "dissolve", light: STAGE, cam: CAM.fit([0, 2.4, 0.6], { w: 3.0, a0: 8, a1: 2, elev: 2, push: 0.08 }),
        act: (S, u, f) => { H.balloons.visible = true; const k = E.ss(E.prog(f, W(9, "move") - 6, W(9, "together.") + 20)); H.balloons.position.y = 0.9 * k;
          H.bz.rotation.z = 0.05 * Math.sin(f * 0.13); H.bm.rotation.z = 0.05 * Math.sin(f * 0.13 + 0.5); H.typed.forEach((p, i) => (p.visible = i === 3)); H.search.visible = false; H.p3.visible = false; H.p20.visible = true; H.chart.draw({ t: 1 });
          S.pop("label", W(9, "together.") - 2, 30, { x: 0, y: 1.3, z: 0.9, w: 1.4, h: 0.3, text: "MOVE TOGETHER", bg: YEL, hold: true }); } },
      // 24 · prices snap back within days: the ZOOM balloon drops back down — SNAP!
      { set: "app", beat: 10, trans: "whip", dir: -1, light: STAGE, cam: CAM.fit([0, 2.0, 0.6], { w: 3.4, a0: -8, a1: -2, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.balloons.visible = true; H.balloons.position.y = 0.9; const t = W(10, "snap"); H.bz.position.y = -1.0 * E.bounce(E.prog(f, t, t + 18)); H.typed.forEach((p, i) => (p.visible = i === 3)); H.search.visible = false; H.p3.visible = false; H.p20.visible = true; H.chart.draw({ t: 1 });
          S.kick(t + 2, 0.06); S.pop("impact", t + 2, 20, { x: -1.2, y: 2.2, z: 0.8, w: 0.6, h: 0.4, text: "SNAP!" });
          S.pop("label", W(10, "days.") - 2, 30, { x: 0.6, y: 1.2, z: 0.9, w: 1.1, h: 0.3, text: "WITHIN DAYS", bg: "#f4efe2", hold: true }); } },
      // 25 · twist — March 26, regulators: the stage darkens, an official marches in — "Hold it!"
      { set: "app", beat: 11, trans: "whip", dir: 1, light: (u) => K.mixLight(STAGE, K.light("cold"), 0.4), cam: CAM.fit([0.4, 1.8, -1.0], { w: 4.0, a0: 12, a1: 4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.typed.forEach((p, i) => (p.visible = i === 3)); H.search.visible = false; H.p3.visible = false; H.p20.visible = true; H.chart.draw({ t: 1 }); H.chart.draw({ t: 1 });
          const k = E.ss(E.prog(f, W(11, "regulators") - 14, W(11, "regulators") + 6)); S.actor("reg", { x: 2.6 - 1.0 * k, z: -0.3, expr: "stern", prop: "point", look: -0.6, mode: k < 1 ? "stroll" : "stand", phase: f * 0.05 });
          S.pop("label", W(11, "March") - 2, 30, { x: -0.6, y: 4.6, z: -1.2, w: 1.3, h: 0.32, text: "MARCH 26", bg: YEL, hold: true });
          S.say("Hold it!", W(11, "regulators") + 4, 24, { x: 2.0, y: 2.6, z: -0.1, w: 0.9, h: 0.4 }); } },
      // 26 · froze ZOOM for ten trading days: smash — an ice block drops over the phone, TRADING SUSPENDED
      { set: "app", word: [11, "froze"], lead: 2, trans: "smash", light: (u) => K.mixLight(STAGE, K.light("cold"), 0.6), cam: CAM.fit([0.2, 2.1, -1.2], { w: 3.8, a0: -6, a1: 2, elev: 4, push: 0.08 }),
        act: (S, u, f) => { H.typed.forEach((p, i) => (p.visible = i === 3)); H.search.visible = false; H.p3.visible = false; H.p20.visible = true; H.chart.draw({ t: 1 }); H.chart.draw({ t: 1 }); const t = W(11, "froze");
          H.ice.visible = true; H.ice.position.y = 3.5 * (1 - E.bounce(E.prog(f, t - 2, t + 10))); H.frozen.visible = f >= t + 8; pop(H.frozen, f, t + 8);
          S.actor("reg", { x: 1.35, z: -0.2, expr: "stern", prop: "fists", look: -0.6 }); S.kick(t + 6, 0.12); S.pop("sparks", t + 8, 16, { x: 0, y: 0.4, z: -0.9, w: 2.4, h: 0.5 });
          S.pop("label", W(11, "ten") - 2, 36, { x: 0, y: 4.9, z: -0.9, w: 1.5, h: 0.32, text: "10 TRADING DAYS", bg: "#f4efe2", hold: true }); } },
      // 27 · everyone checked the ticker: back at the airport, Dev proudly shows the ZOOM tag
      { set: "airport", beat: 12, trans: "whip", dir: -1, light: "office", cam: CAM.fit([1.1, 1.2, -0.6], { w: 2.8, a0: -10, a1: -2, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.case.g.visible = true; H.case.g.position.set(0.7, 0.25, -0.5); H.belt.forEach((g, i) => (g.position.x = ((g.userData.base.p.x + 4.5 + f * 0.02) % 9) - 4.5));
          S.actor("dev", { x: 1.6, z: -0.4, expr: "grin", prop: "point", look: -0.5 });
          S.pop("label", W(12, "ticker.") - 2, 30, { x: 0.9, y: 1.2, z: -0.2, w: 0.9, h: 0.28, text: "TICKER: OK", bg: "#4fd18b", hold: true }); } },
      // 28 · finale — nobody checked the company: the lid bursts open on the last word, rubber ducks and a pink tutu fly out — BOING!
      { set: "airport", word: [12, "Nobody"], lead: 3, steady: true, light: "office", cam: CAM.fit([1.0, 1.1, -0.5], { w: 2.4, a0: 8, a1: 2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.case.g.visible = true; H.case.g.position.set(0.7, 0.25, -0.5); const t = W(12, "company.");
          const k = E.back(E.prog(f, t, t + 6)); H.case.lid.rotation.x = -1.9 * k;
          H.ducks.forEach((d, i) => { d.visible = f >= t; const q = E.prog(f, t, t + 20); const a = i * 1.05; d.position.set(0.7 + Math.cos(a) * 0.9 * q, 0.85 + 1.4 * q - 1.2 * q * q, -0.4 + Math.sin(a) * 0.4 * q); });
          H.tutu.visible = f >= t; const q2 = E.prog(f, t, t + 18); H.tutu.position.set(0.7 - 0.3 * q2, 0.85 + 1.6 * q2 - 1.0 * q2 * q2, -0.3); H.tutu.rotation.z = q2 * 4;
          S.actor("dev", { x: 1.6, z: -0.3, expr: f < t ? "nervous" : "shock", prop: f < t ? "hold" : "shrug", look: -0.5 });
          S.kick(t + 1, 0.14); S.pop("impact", t + 1, 26, { x: 0.2, y: 1.6, z: -0.2, w: 0.7, h: 0.45, text: "BOING!" }); } },
    ],
  };
};
