// "The Cash Filed Under Boring" (Benjamin Graham and Northern Pipe Line, 1926-28) — film module timed to Jackson's narration.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const AH = 1.58;
  const H = {};

  // a stack of bond certificates (flat sheets with a printed top)
  const bonds = (B, x, y, z, n, o = {}) => {
    const g = B.grp(x, y, z, o.ry ?? 0, o.s ?? 1, o.in);
    for (let i = 0; i < n; i++) B.box(0.34, 0.012, 0.24, i % 2 ? "#efe4c4" : "#f6eed6", (E.hash(i + (o.seed ?? 0)) - 0.5) * 0.02, i * 0.013, (E.hash(i + 7) - 0.5) * 0.02, { in: g, cast: false });
    B.plate(0.32, 0.22, B.textTex(o.text ?? "BOND", "#f6eed6", "#2a5a3a", 512, 352), 0, n * 0.013 + 0.002, 0, { in: g, rx: -Math.PI / 2, d: 0.004 });
    return B.dyn(g);
  };
  // a desk seen from the front with a drawer that slides toward the camera (+z), stuffed with bonds
  const deskDrawer = (B, x, z, o = {}) => {
    const c = o.col ?? "floor:#6a4630", w = o.w ?? 2.2;
    B.box(w, 0.08, 0.95, c, x, 0.76, z); B.box(w, 0.72, 0.06, c, x, 0.04, z + 0.45); for (const sx of [-1, 1]) B.box(0.06, 0.76, 0.95, c, x + sx * (w / 2 - 0.03), 0, z);
    const dr = B.grp(x, 0.42, z + 0.2, 0, 1); B.box(0.9, 0.06, 0.62, c, 0, 0, 0, { in: dr }); B.box(0.9, 0.3, 0.06, c, 0, 0, 0.3, { in: dr });
    for (const sx of [-1, 1]) B.box(0.05, 0.28, 0.62, c, sx * 0.43, 0, 0, { in: dr }); B.ball(0.04, "#c9a44a", 0, 0.16, 0.34, { in: dr });
    const stuff = []; for (let i = 0; i < 4; i++) stuff.push(bonds(B, -0.2 + (i % 2) * 0.4, 0.06, -0.15 + Math.floor(i / 2) * 0.3, 10 + i * 2, { in: dr, seed: i * 3 }));
    return { dr: B.dyn(dr), stuff };
  };
  // a steel filing cabinet; top drawer slides out (+z) and its front reads o.label
  const cabinet = (B, x, z, o = {}) => {
    const s = o.s ?? 1, col = o.col ?? "metal:#7a8a7a", g = B.grp(x, 0, z, o.ry ?? 0, s);
    B.box(0.9, 1.5, 0.7, col, 0, 0, 0, { in: g });
    for (const y of [0.12, 0.6]) { B.box(0.8, 0.4, 0.03, col, 0, y, 0.36, { in: g }); B.box(0.2, 0.04, 0.04, "#c9c9c9", 0, y + 0.25, 0.39, { in: g }); }
    const top = B.grp(0, 1.06, 0.0, 0, 1, g); B.box(0.8, 0.38, 0.66, col, 0, 0, 0.02, { in: top }); B.plate(0.5, 0.16, B.textTex(o.label ?? "BORING", "#f4efe2", "#241726", 512, 164), 0, 0.2, 0.36, { in: top, d: 0.01 });
    B.box(0.2, 0.04, 0.04, "#c9c9c9", 0, 0.08, 0.37, { in: top }); const cash = B.grp(0, 0.38, 0, 0, 1, top); B.prop.cash({ x: -0.05, y: 0, z: 0.05, n: 4, in: cash }); cash.visible = false;
    return { g: B.dyn(g), top: B.dyn(top), cash: B.dyn(cash) };
  };
  // swinging price tag on a string
  const tag = (B, x, y, z, text, o = {}) => {
    const g = B.grp(x, y, z, 0, o.s ?? 1); B.cyl(0.006, 0.006, 0.5, "#3a2a20", 0, -0.5, 0, { in: g, cast: false });
    B.plate(0.6, 0.34, B.textTex(text, o.bg ?? "#f4e6b8", o.fg ?? "#8a2a1a", 512, 290), 0, -0.68, 0, { in: g, d: 0.02, edge: "#8a6a3a" });
    return B.dyn(g);
  };
  // a lattice oil derrick
  const derrick = (B, x, z, h = 7) => {
    const g = B.grp(x, 0, z, 0.3, 1);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) { const l = B.box(0.12, h, 0.12, "planks:#7a5a3a", sx * 0.9, 0, sz * 0.9, { in: g }); l.rotation.z = -sx * 0.11; l.rotation.x = sz * 0.11; }
    for (let k = 1; k < 5; k++) { const y = (h * k) / 5, r = 1.0 - (0.75 * k) / 5; for (const sz of [-1, 1]) B.box(2 * r, 0.08, 0.08, "planks:#6a4a2a", 0, y, sz * r, { in: g }); for (const sx of [-1, 1]) B.box(0.08, 0.08, 2 * r, "planks:#6a4a2a", sx * r, y, 0, { in: g }); }
    B.box(0.5, 0.3, 0.5, "#3a3a40", 0, h, 0, { in: g });
    return g;
  };

  return {
    cast: {
      ben: { jacket: "#2e3a52", pants: "#2a2d38", boots: "#1a1418", hat: "hair", hair: "#3a2a20", skin: "#f2c8a0", buttons: "#c9a44a" },
      prez: { jacket: "#5a5e6a", pants: "#3a3d48", boots: "#1a1418", hat: "hair", hair: "#d8d8d8", moustache: "#e0e0e0", skin: "#f5c9a0", buttons: "#c9a44a", build: "stout" },
      counsel: { jacket: "#4a3a2e", pants: "#2f2a26", boots: "#1a1418", hat: "hair", hair: "#9a9a9a", moustache: "#7a6a5a", skin: "#f0c8a0" },
      broker: { jacket: "#7a2e2e", pants: "#2a2d38", boots: "#1a1418", hat: "bowler", skin: "#f0c8a0", moustache: "#5a3a24" },
      broker2: { jacket: "#2e5a4a", pants: "#2a2d38", boots: "#1a1418", hat: "tophat", skin: "#e8b88a" },
      clerk: { jacket: "#5a6a4a", pants: "#3a3d48", boots: "#3a2418", hat: "hair", hair: "#cfcfcf", skin: "#f5d2b0", buttons: "#9aa3ad" },
      pete: { jacket: "#c46a2a", pants: "#3b4a6a", boots: "#4a3426", hat: "cap", cap: "#3f6fb5", skin: "#e8b88a", moustache: "#5a3a24" },
      gus: { jacket: "#e8b84a", pants: "#4a5a3a", boots: "#5a3b2a", hat: "cap", cap: "#c0353a", skin: "#f5c9a0", moustache: "#7a4a2a", build: "stout" },
      ida: { jacket: "#7a4a8a", pants: "#3b3f52", boots: "#3a2a20", hat: "bonnet", dress: "#b58ac8", skin: "#ffe2c2" },
      otto: { jacket: "#6a5a3a", pants: "#3a3d48", boots: "#1a1418", hat: "bowler", skin: "#f5c9a0", moustache: "#cfcfcf" },
    },
    sets: {
      // metaphor stage: a giant strongbox with a drawer and a price tag, under a spotlight
      stage: (B) => {
        B.set.stage({ floor: "#f1e6d0", back: "#2f6f7a" });
        B.prop.pedestal({ x: 0, z: 0, r: 1.5, h: 0.4, col: "#ffffff", trim: "#f2c14e" });
        H.box = B.grp(0, 0.4, 0, 0, 1);
        B.box(2.0, 1.3, 1.3, "planks:#9a6a3e", 0, 0, 0, { in: H.box }); B.plate(1.85, 0.26, B.textTex("NORTHERN PIPE LINE", "#2a3a5a", "#f4e6b8", 1024, 144), 0, 1.0, 0.66, { in: H.box, d: 0.02 });
        H.pipe = B.grp(0, 1.3, 0, 0, 1, H.box); B.cyl(0.22, 0.22, 2.4, "metal:#8a929a", 0, 0.22 - 1.2, 0, { in: H.pipe, rz: Math.PI / 2 }); for (const sx of [-1, 1]) B.cyl(0.27, 0.27, 0.12, "metal:#6a727a", sx * 1.15, 0.22 - 0.06, 0, { in: H.pipe, rz: Math.PI / 2 }); B.dyn(H.pipe);
        H.sdr = B.grp(0, 0.2, 0.0, 0, 1, H.box); B.box(1.3, 0.08, 1.1, "planks:#7a5232", 0, 0, 0, { in: H.sdr }); B.box(1.3, 0.5, 0.08, "planks:#7a5232", 0, 0, 0.62, { in: H.sdr }); B.ball(0.06, "#c9a44a", 0, 0.28, 0.68, { in: H.sdr });
        B.prop.cash({ x: -0.2, y: 0.08, z: 0.1, n: 6, in: H.sdr }); B.prop.cash({ x: 0.35, y: 0.08, z: 0.15, n: 4, in: H.sdr }); B.dyn(H.sdr);
        B.dyn(H.box);
        H.tag = tag(B, 1.0, 3.3, 0.9, "$65");
      },
      // the ICC reading room in Washington, 1926: long tables, green lamps, report stacks, a filing cabinet
      icc: (B) => {
        B.set.room({ style: "library", w: 10, d: 8, h: 4.2, door: false, windows: [] });
        B.prop.sign({ x: 0, y: 3.1, z: -3.9, text: "INTERSTATE COMMERCE COMMISSION", w: 5.6, h: 0.48, bg: "#2a3a2a", fg: "#f4e6b8" });
        B.prop.table({ x: 0, z: 0, w: 2.6, d: 1.0, h: 0.78, col: "floor:#7a5232" }); B.prop.chair({ x: 0, z: -0.75, col: "#5a3a24" });
        B.prop.lamp({ kind: "desk", x: -0.85, y: 0.78, z: -0.2, glow: "#ffe39a", intensity: 4, dist: 6 });
        for (const [x, n] of [[-1.05, 14], [-0.7, 9], [0.95, 18], [0.6, 11]]) bonds(B, x, 0.78, 0.1, n, { text: "ICC", seed: n });
        H.report = B.grp(0, 0.79, 0.25, 0, 1); B.plate(0.5, 0.16, B.textTex("PIPELINES", "#f6eed6", "#241726", 512, 164), 0, 0, 0, { in: H.report, rx: -1.35, d: 0.01 }); B.dyn(H.report);
        H.np = B.grp(0, 2.15, -0.75, 0, 1); B.plate(1.2, 0.17, B.textTex("NORTHERN PIPE LINE", "#fff6c8", "#8a2a1a", 1024, 145), 0, 0, 0, { in: H.np, d: 0.01 }); H.np.visible = false; B.dyn(H.np);
        B.prop.table({ x: 2.6, z: -2.2, w: 2.0, d: 0.9, col: "floor:#7a5232" }); B.prop.lamp({ kind: "desk", x: 2.6, y: 0.78, z: -2.2, glow: "#ffe39a", intensity: 3, dist: 5 });
        B.prop.chair({ x: 2.6, z: -2.9, col: "#5a3a24" });
        B.prop.clock({ x: -2.6, y: 3.0, z: -3.88, r: 0.4, time: 2.6 });
        H.cab = cabinet(B, -3.0, -2.6, { label: "BORING" }); cabinet(B, -2.05, -2.6, { label: "TARIFFS" });
      },
      // Wall Street, 1920s: stone and brick fronts, brokers rushing past a dusty report on a bench
      wallst: (B) => {
        B.set.street({ style: ["brick", "victorian"], length: 50, road: 8, ground: "cobble", seed: 21, signs: ["BROKERS", "TICKER NEWS", "BANK", "BONDS & STOCKS", "CAFÉ", "TRUST CO."] });
        B.prop.sign({ x: -3.2, z: -2, text: "WALL ST", w: 1.3, h: 0.32, bg: "#1f4a2a", fg: "#ffffff", post: true });
        B.prop.bench({ x: 3.6, z: 0, ry: -Math.PI / 2 }); bonds(B, 3.55, 0.48, 0.2, 9, { text: "ICC", ry: 0.3 });
        for (let z = 14; z > -22; z -= 9) for (const sx of [-1, 1]) B.prop.lampPost({ x: sx * 4.6, z: z + (sx > 0 ? 4 : 0) });
        B.prop.car({ x: -1.6, z: -7, ry: Math.PI / 2, col: "#2a2d36" });
      },
      // Pennsylvania oil country: a derrick, a pump house and the pipeline across the hills
      oil: (B) => {
        B.set.landscape({ kind: "meadow", hills: true, seed: 8 });
        derrick(B, -4.5, -9, 8); derrick(B, 6, -16, 7);
        B.facade({ style: "village", w: 5, x: 3.2, z: -5, ry: -0.3, col: "#b8584a" });
        B.prop.sign({ x: 3.0, y: 3.2, z: -3.4, ry: -0.3, text: "NORTHERN PIPE LINE CO.", w: 3.6, h: 0.42, bg: "#2a3a5a", fg: "#f4e6b8" });
        B.cyl(0.25, 0.25, 40, "metal:#8a929a", 0, 0.55 - 20, -1.0, { rz: Math.PI / 2 });
        for (let x = -16; x <= 16; x += 2.5) B.box(0.12, 0.4, 0.5, "#4a3a2a", x, 0, -1.0);
        H.valve = B.grp(-0.6, 0.85, -1.0, 0, 1); B.cyl(0.03, 0.03, 0.3, "#c0353a", 0, 0, 0, { in: H.valve }); const wl = B.grp(0, 0.3, 0, 0, 1, H.valve); B.cyl(0.18, 0.18, 0.04, "#c0353a", 0, 0, 0, { in: wl, seg: 12 }); H.wheel = B.dyn(wl); B.dyn(H.valve);
        for (const [x, z] of [[-9, -5], [12, -8], [-12, -14]]) B.prop.tree({ x, z, kind: "pine" });
      },
      // company office: the president's desk with the drawer full of railroad bonds
      office: (B) => {
        B.set.room({ style: "office", w: 8, d: 6, h: 3.6, windows: [-2.4], door: false });
        H.dd = deskDrawer(B, 0, -1.0);
        B.prop.lamp({ kind: "desk", x: 0.75, y: 0.84, z: -1.1, glow: "#ffe39a", intensity: 3, dist: 6 });
        B.prop.poster({ x: 1.6, y: 1.5, z: -2.9, w: 1.4, h: 1.0, text: "PIPELINE MAP", bg: "#e8dcb8", fg: "#2a3a5a" });
        B.prop.sign({ x: 0, y: 2.75, z: -2.9, text: "PRESIDENT", w: 1.6, h: 0.32, bg: "#4a2e1c", fg: "#f4e6b8" });
        B.prop.safe({ x: -2.6, z: -2.4, size: 0.9 }); B.prop.plant({ x: 3.2, z: -2.4 });
        H.door = B.prop.door({ x: 3.0, z: -2.94, col: "planks:#5a3a24" });
      },
      // Oil City annual meeting hall: rows of chairs, a podium and a banner
      hall: (B) => {
        B.set.room({ style: "home", wall: "wallpaper:#7a5a8a", floor: "floor:#8a5a34", w: 11, d: 9, h: 4.4, windows: [-3.6, 3.6], door: false });
        B.prop.sign({ x: 0, y: 3.2, z: -4.35, text: "ANNUAL MEETING · OIL CITY, PA", w: 5.0, h: 0.55, bg: "#7a2a2a", fg: "#f4e6b8" });
        B.box(6, 0.4, 2.2, "planks:#6a4026", 0, 0, -3.3); B.prop.table({ x: 0, y: 0.4, z: -3.3, w: 3.4, d: 0.8, col: "#2f5a3a" });
        H.boardChairs = []; for (const x of [-1.2, -0.4, 0.4, 1.2]) H.boardChairs.push(B.prop.chair({ x, y: 0.4, z: -3.85, col: "#7a2a2a" }));
        for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) B.prop.chair({ x: -2.5 + c * 1.0, z: 0.2 + r * 1.2, ry: Math.PI, col: "#6a4026" });
        H.gavel = B.grp(0.9, 1.22, -3.1, 0, 1); B.cyl(0.05, 0.05, 0.18, "#4a2e1c", 0, 0, 0, { in: H.gavel, rz: Math.PI / 2 }); B.cyl(0.012, 0.012, 0.25, "#6a4026", 0, -0.12, 0, { in: H.gavel }); B.dyn(H.gavel);
        H.proxies = []; for (let i = 0; i < 6; i++) H.proxies.push(bonds(B, -0.9 + (i % 3) * 0.36, 1.2, -3.15 + Math.floor(i / 3) * 0.26, 6 + i * 3, { text: "PROXY", seed: i }));
        H.proxies.forEach((p) => (p.visible = false));
      },
      // a sunny yard sale: folding tables with junk, a wallet with a $65 tag
      yard: (B) => {
        B.set.landscape({ kind: "meadow", hills: false, seed: 3 });
        B.facade({ style: "village", w: 7, x: 0, z: -6, col: "#e8d8b0" }); B.prop.fence({ x: -4, z: -3.5, len: 4 }); B.prop.fence({ x: 4, z: -3.5, len: 4 });
        B.prop.sign({ x: -2.6, z: -2.0, text: "GUS'S YARD SALE", w: 1.8, h: 0.5, bg: "#fff1a8", fg: "#c0353a", post: true });
        B.prop.table({ x: 0, z: -0.6, w: 2.4, d: 0.9, h: 0.75, col: "#e8e4dc" });
        B.prop.lamp({ kind: "floor", x: 1.9, z: -0.9, light: false }); B.prop.globe({ x: -0.8, y: 0.75, z: -0.7 }); B.prop.clock({ x: 1.05, y: 0.95, z: -0.85, r: 0.2 });
        H.wallet = B.grp(0.05, 0.76, -0.45, 0, 1); B.box(0.36, 0.04, 0.24, "#6a3a24", 0, 0, 0, { in: H.wallet });
        H.flap = B.grp(0, 0.04, -0.12, 0, 1, H.wallet); B.box(0.36, 0.03, 0.24, "#7a4a2c", 0, 0, 0.12, { in: H.flap }); B.dyn(H.flap);
        H.walletCash = B.grp(0, 0.04, 0, 0, 1, H.wallet); for (let i = 0; i < 3; i++) B.box(0.3, 0.012, 0.18, "#7fb86a", 0, i * 0.014, 0, { in: H.walletCash }); H.walletCash.visible = false; B.dyn(H.walletCash);
        B.plate(0.22, 0.13, B.textTex("$65", "#fff6c8", "#c0353a", 256, 150), 0.24, 0.06, 0.1, { in: H.wallet, rx: -0.6, d: 0.004 });
        B.dyn(H.wallet);
        B.prop.tree({ x: 5, z: -4 }); B.prop.tree({ x: -6, z: -5 });
      },
    },
    shots: [
      // 0 · frame 0: the giant strongbox crashes onto the pedestal, price tag swinging
      { set: "stage", f: 0, light: K.backdrop("#2f6f7a"), cam: CAM.fit([0, 1.5, 0], { w: 4.2, a0: -24, a1: -8, e0: -6, e1: 4, push: 0.15 }),
        act: (S, u, f) => { const k = E.prog(f, 0, 8); H.box.position.y = 0.4 + 3.2 * (1 - E.easeIn(k)); H.box.scale.y = f >= 8 && f < 13 ? 0.88 + 0.024 * (f - 8) : 1;
          H.tag.rotation.z = 0.35 * Math.sin(f * 0.18) * Math.exp(-f * 0.01); H.tag.visible = f > 10;
          S.kick(8, 0.09); S.pop("puff", 8, 14, { x: 0, y: 0.5, z: 1.4, w: 3.0, h: 1.2 }); S.pop("label", W(0, "nineteen") - 2, 60, { x: -1.0, y: 3.0, z: 0.8, w: 1.1, h: 0.4, text: "1926", col: "#2a3a5a", hold: true }); } },
      // 1 · sold for sixty-five dollars: the tag swings into close-up
      { set: "stage", word: [0, "sold"], light: K.backdrop("#2f6f7a"), cam: CAM.fit([0.8, 2.4, 0.6], { w: 2.0, a0: 18, a1: 6, elev: 2, push: 0.12 }), coc: 9,
        act: (S, u, f) => { H.tag.rotation.z = 0.25 * Math.sin(f * 0.18); S.pop("word", W(0, "sixty-five") - 2, 36, { x: 0.75, y: 3.2, z: 0.9, w: 1.4, h: 0.55, text: "$65", col: "#ff5a5a" }); } },
      // 2 · ninety-five inside: the drawer bursts open, cash flies
      { set: "stage", word: [0, "with"], trans: "smash", light: K.backdrop("#2f6f7a"), cam: CAM.fit([0, 1.1, 0.6], { w: 2.8, a0: -6, a1: 6, elev: 8, push: 0.18 }),
        act: (S, u, f) => { const o = W(0, "ninety-five") - 2, k = E.back(E.prog(f, o, o + 8)); H.sdr.position.z = 0.9 * k; H.tag.rotation.z = 0.2 * Math.sin(f * 0.18);
          S.pop("word", o + 4, 40, { x: 0, y: 2.55, z: 1.2, w: 1.6, h: 0.65, text: "$95 INSIDE", col: "#4fd18b", hold: true }); S.kick(o + 2, 0.06);
          for (let q = 0; q < 5; q++) S.pop("bill", o + 3 + q * 4, 22, { x: -0.6 + q * 0.3, y: 1.0, z: 1.4, w: 0.3, h: 0.2, rise: 1.0, spin: (q % 2 ? 2 : -2), pop: q === 0 }); } },
      // 3 · imagine you're Ben Graham in the ICC reading room (crane down)
      { set: "icc", beat: 1, trans: "whip", light: "lamp", cam: CAM.crane([0, 1.2, -0.5], 4.2, 3.6, 1.7, 10),
        act: (S, u, f) => { S.actor("ben", { x: 0, z: -0.72, mode: "sit", expr: "neutral", look: 0.1 }); S.actor("clerk", { x: 2.6, z: -2.85, mode: "sit", expr: "smile_closed" });
          S.pop("label", W(1, "Washington.") - 2, 50, { x: 0, y: 2.6, z: -0.5, w: 1.6, h: 0.42, text: "WASHINGTON", col: "#2a3a2a", hold: true }); } },
      // 4 · reading dull pipeline reports (insert on Ben and the report)
      { set: "icc", word: [1, "reading"], light: "lamp", cam: CAM.fit([0, 1.15, -0.4], { w: 1.5, a0: -14, a1: -4, elev: 16, push: 0.12 }), coc: 10,
        act: (S, u, f) => { S.actor("ben", { x: 0, z: -0.72, mode: "sit", expr: "nervous", look: -0.2 }); S.pop("zz", W(1, "dull") , 40, { x: 2.0, y: 1.5, z: -2.6, w: 0.4, h: 0.4, rise: 0.3 }); } },
      // 5 · Wall Street never opens these: brokers rush past the report on a bench
      { set: "wallst", beat: 2, trans: "whip", light: "golden", cam: CAM.fit([2.4, 1.1, 0.4], { w: 4.2, a0: -30, a1: -18, elev: 6, push: 0.1 }),
        act: (S, u, f) => { const t = f - S.a; S.actor("broker", { x: 2.2, z: 2.5 - 0.06 * t, mode: "march", phase: f * 0.06, expr: "stern", prop: "paper" }); S.actor("broker2", { x: 1.2, z: -2.4 + 0.05 * t, mode: "march", phase: f * 0.06 + 1, expr: "grin" });
          S.pop("label", W(2, "never") - 2, 34, { x: 3.0, y: 1.3, z: 0.3, w: 0.95, h: 0.3, text: "UNREAD", col: "#8a2a1a", hold: true }); } },
      // 6 · too boring: a broker yawns at the report
      { set: "wallst", word: [2, "Too"], light: "golden", cam: CAM.fit([3.0, 1.45, 0.4], { w: 1.8, a0: -45, a1: -38, elev: 2, push: 0.1 }), coc: 9,
        act: (S, u, f) => { S.actor("broker", { x: 2.8, z: 0.6, expr: "smile_closed", prop: "chin", look: 0.5 }); S.pop("zz", W(2, "boring.") - 4, 30, { x: 3.1, y: AH + 0.45, z: 0.6, w: 0.45, h: 0.45, rise: 0.3 }); S.say("Yawn.", W(2, "Too"), 22, { x: 2.5, y: AH + 0.7, z: 0.7, w: 0.9, h: 0.45 }); } },
      // 7 · then you spot Northern Pipe Line
      { set: "icc", beat: 3, trans: "dissolve", light: "lamp", cam: CAM.fit([0, 1.15, -0.2], { w: 1.6, a0: 10, a1: 2, elev: 4, push: 0.15 }), coc: 9,
        act: (S, u, f) => { const sp = W(3, "spot"); S.actor("ben", { x: 0, z: -0.72, mode: "sit", expr: f < sp ? "neutral" : "shock", prop: f < sp ? null : "up" });
          H.np.visible = f >= W(3, "Northern") - 3; H.np.scale.setScalar(E.back(E.prog(f, W(3, "Northern") - 3, W(3, "Northern") + 5)));
          S.pop("exclaim", sp, 26, { x: 0.35, y: AH + 0.05, z: -0.6, w: 0.3, h: 0.45 }); S.kick(sp, 0.03); } },
      // 8 · a Standard Oil spin-off: whip to the oil fields
      { set: "oil", word: [3, "Standard"], lead: 3, trans: "whip", light: "noon", cam: CAM.fit([-0.5, 1.7, -1.2], { w: 4.6, a0: -26, a1: -12, elev: 6, push: 0.1 }),
        act: (S, u, f) => { S.actor("pete", { x: -0.9, z: -0.4, expr: "smile", prop: "wave", wave: (f * 0.1) % 1 });
          S.pop("label", W(3, "Standard") - 2, 40, { x: -0.6, y: 3.0, z: 0, w: 2.6, h: 0.5, text: "STANDARD OIL SPIN-OFF", col: "#2a3a5a", hold: true }); } },
      // 9 · its pipes earn peanuts: Pete turns the valve, one tiny coin dribbles out
      { set: "oil", beat: 4, light: "noon", cam: CAM.fit([-0.6, 1.2, -0.9], { w: 2.2, a0: 16, a1: 6, elev: 4, push: 0.12 }), coc: 9,
        act: (S, u, f) => { H.wheel.rotation.y = (f - S.a) * 0.12; S.actor("pete", { x: -1.1, z: -0.4, expr: f < W(4, "peanuts.") ? "smile" : "nervous", prop: "fists" });
          S.pop("coin", W(4, "earn"), 26, { x: -0.25, y: 0.75, z: -0.6, w: 0.12, h: 0.12, rise: -0.3 }); S.pop("label", W(4, "peanuts.") - 2, 30, { x: -0.5, y: 2.3, z: -0.9, w: 1.1, h: 0.36, text: "PEANUTS", col: "#a0662a", hold: true }); } },
      // 10 · its drawer: push through into the president's office, the drawer slides out
      { set: "office", word: [4, "Its", 1], trans: "zoom", light: "office", cam: CAM.fit([0, 0.9, -0.6], { w: 2.6, a0: 0, a1: 4, elev: 14, push: 0.2 }),
        act: (S, u, f) => { const o = W(4, "drawer"), k = E.back(E.prog(f, o, o + 10)); H.dd.dr.position.z = -0.8 + 0.6 * k;
          S.actor("prez", { x: 0.1, z: -2.0, expr: "grin", prop: "hold" }); S.pop("stars", W(4, "stuffed") - 2, 24, { x: 0, y: 0.95, z: 0.4, w: 0.8, h: 0.6 }); } },
      // 11 · railroad bonds (insert)
      { set: "office", word: [4, "railroad"], lead: 3, light: "office", steady: true, cam: CAM.fit([0, 0.55, -0.05], { w: 1.25, a0: 8, a1: -6, elev: 28, push: 0.1 }), coc: 11,
        act: (S, u, f) => { H.dd.dr.position.z = -0.15; H.dd.stuff.forEach((b, i) => { b.position.y = 0.06 + 0.04 * Math.abs(Math.sin(f * 0.25 + i)); });
          S.pop("label", W(4, "bonds.") - 2, 34, { x: 0, y: 1.02, z: -0.2, w: 1.0, h: 0.26, text: "RAILROAD BONDS", col: "#2a5a3a", hold: true }); } },
      // 12 · why would anyone sell money at a discount? (night, Ben thinks)
      { set: "icc", beat: 5, trans: "whip", light: K.light("night", { hemi: 0.9 }), cam: CAM.fit([0, 1.1, -0.6], { w: 1.4, a0: -8, a1: 6, elev: 16, push: 0.12 }), coc: 9,
        act: (S, u, f) => { S.actor("ben", { x: 0, z: -0.72, mode: "sit", expr: "nervous", prop: "chin" });
          S.pop("question", W(5, "why") , 60, { x: 0.38, y: AH + 0.2, z: -0.6, w: 0.32, h: 0.42, hold: true }); S.pop("question", W(5, "discount?") - 4, 26, { x: -0.35, y: AH + 0.3, z: -0.6, w: 0.28, h: 0.38, hold: true }); } },
      // 13 · you buy shares and visit the bosses: Ben walks into the office
      { set: "office", beat: 6, trans: "whip", light: "office", cam: CAM.fit([0.6, 1.3, -1.0], { w: 3.6, a0: 14, a1: 4, elev: 6, push: 0.08 }),
        act: (S, u, f) => { const k = E.ss(E.prog(f, S.a, S.a + 45)); S.actor("ben", { x: 2.6 - 1.4 * k, z: -0.2 + 0.2 * k, mode: k < 1 ? "stroll" : "stand", phase: f * 0.06, expr: "smile", look: -0.6 });
          S.actor("prez", { x: -0.3, z: -2.0, expr: "stern" }); S.actor("counsel", { x: 0.6, z: -2.1, expr: "neutral" }); H.door.leaf && (H.door.leaf.rotation.y = -1.2 * (1 - k));
          S.pop("label", W(6, "shares") - 2, 30, { x: 1.3, y: 2.3, z: -0.2, w: 1.0, h: 0.32, text: "5% STAKE", col: "#2a3a5a" }); } },
      // 14 · pipelines are complex, they say
      { set: "office", beat: 7, light: "office", cam: CAM.fit([-0.1, AH - 0.1, -1.9], { w: 2.0, a0: -10, a1: -2, elev: 2, push: 0.1 }), coc: 9,
        act: (S, u, f) => { S.actor("prez", { x: -0.3, z: -2.0, expr: "grin", prop: "point" }); S.actor("counsel", { x: 0.6, z: -2.1, expr: "smile_closed" });
          S.say("It's complex!", S.a + 4, 34, { x: -0.15, y: AH + 0.75, z: -1.8, w: 1.3, h: 0.48 }); } },
      // 15 · don't like it? sell your shares — pointing at the door; Ben's reaction
      { set: "office", word: [7, "Don't"], lead: 3, light: "office", cam: CAM.fit([1.0, 1.45, -1.2], { w: 3.0, a0: -18, a1: -8, elev: 4, push: 0.12 }),
        act: (S, u, f) => { S.actor("counsel", { x: 0.6, z: -2.1, expr: "stern", prop: "point", look: 0.8 }); S.actor("prez", { x: -0.3, z: -2.0, expr: "grin" }); S.actor("ben", { x: 1.6, z: -0.2, expr: "shock", look: -0.5 });
          S.say("Sell your shares.", W(7, "Sell") - 2, 34, { x: 0.9, y: AH + 0.75, z: -1.9, w: 1.55, h: 0.48, tail: "right" }); S.pop("sweat", W(7, "shares.") , 30, { x: 1.85, y: AH + 0.25, z: -0.15, w: 0.22, h: 0.22 }); } },
      // 16 · the meeting in Oil City (whip in, Ben stands with his hand up)
      { set: "hall", beat: 8, trans: "whip", light: "interior", cam: CAM.fit([0, 1.4, -1.2], { w: 6.0, a0: 10, a1: -4, elev: 12, push: 0.1 }),
        act: (S, u, f) => { S.actor("prez", { x: -0.4, y: 0.4, z: -3.9, expr: "stern" }); S.actor("counsel", { x: 0.4, y: 0.4, z: -3.9, expr: "neutral" });
          S.actor("ben", { x: -0.5, z: 1.0, expr: "smile", prop: "up", flip: false }); S.actor("otto", { x: 1.5, z: 2.2, expr: "smile_closed" }); S.actor("ida", { x: -2.0, z: 2.2, expr: "neutral" }); } },
      // 17 · nobody even seconds your motion: silence, Ben sweats
      { set: "hall", word: [8, "nobody"], lead: 3, light: "interior", cam: CAM.fit([-0.5, AH - 0.1, 1.0], { w: 2.4, a0: 165, a1: 175, elev: 4, push: 0.1 }), coc: 9,
        act: (S, u, f) => { S.actor("ben", { x: -0.5, z: 1.0, expr: "nervous", prop: "up" }); S.actor("otto", { x: 1.5, z: 2.2, expr: "smile_closed", look: 0.8 }); S.actor("ida", { x: -2.0, z: 2.2, expr: "neutral", look: -0.8 });
          S.pop("sweat", S.a + 6, 40, { x: -0.25, y: AH + 0.25, z: 0.9, w: 0.24, h: 0.24 }); S.pop("label", W(8, "seconds") - 2, 40, { x: -0.5, y: AH + 0.75, z: 0.9, w: 1.3, h: 0.38, text: "NO SECOND", col: "#8a2a1a", hold: true }); } },
      // 18 · you collect proxies (time jump flash): proxy forms pile up
      { set: "wallst", beat: 9, trans: "flash", light: "dusk", cam: CAM.follow((u) => [0.5, 1.0, 4 - 3 * u], [1.6, 0.5, 2.4], [0, 0.4, 0], 42),
        act: (S, u, f) => { S.actor("ben", { x: 0.5, z: 4 - 3 * u, mode: "march", phase: f * 0.06, expr: "grin", prop: "hold" });
          for (let q = 0; q < 5; q++) S.pop("paper", S.a + 4 + q * 6, 18, { x: -0.2 + q * 0.15, y: 1.95, z: 4.2 - 3 * u, w: 0.3, h: 0.3, rise: -0.8, pop: q === 0 });
          S.pop("label", W(9, "proxies,") - 2, 30, { x: 0.5, y: 2.45, z: 3.6 - 3 * u, w: 1.1, h: 0.36, text: "PROXIES", col: "#2a3a5a" }); } },
      // 19 · by 1928: the proxy stacks on the board table
      { set: "hall", word: [9, "nineteen"], lead: 3, trans: "whip", light: "interior", cam: CAM.fit([0, 1.4, -3.2], { w: 3.2, a0: -10, a1: 4, elev: 10, push: 0.12 }),
        act: (S, u, f) => { H.proxies.forEach((p, i) => { p.visible = f >= S.a + i * 3; }); S.actor("ben", { x: 0.85, y: 0.4, z: -3.6, expr: "grin", prop: "point", look: -0.5 }); S.actor("prez", { x: -0.85, y: 0.4, z: -3.9, expr: "shock" });
          S.pop("label", W(9, "nineteen") - 2, 40, { x: -0.8, y: 2.6, z: -3.2, w: 1.0, h: 0.38, text: "1928", col: "#7a2a2a", hold: true }); S.pop("word", W(9, "twenty-eight") + 6, 22, { x: 0.6, y: 2.6, z: -3.0, w: 1.0, h: 0.45, text: "38%", col: "#f2c14e", hold: true }); } },
      // 20 · two board seats: Ben takes a seat; elected!
      { set: "hall", word: [9, "two"], lead: 3, trans: "smash", light: K.light("interior", { sat: 1.15 }), cam: CAM.fit([0.4, 1.4, -3.6], { w: 2.5, a0: 8, a1: 0, elev: 6 }),
        act: (S, u, f) => { H.proxies.forEach((p) => (p.visible = true)); S.actor("ben", { x: 0.4, y: 0.4, z: -3.75, expr: "laugh", prop: "fists" }); S.actor("otto", { x: 1.2, y: 0.4, z: -3.75, expr: "grin" }); S.actor("prez", { x: -0.9, y: 0.4, z: -3.85, expr: "pained" });
          S.pop("impact", S.a + 3, 22, { x: 0.8, y: 2.6, z: -3.4, w: 1.4, h: 0.9, text: "2 SEATS!" }); S.kick(S.a + 3, 0.06); } },
      // 21 · you see: push through into a sunny yard sale
      { set: "yard", beat: 10, trans: "zoom", light: "golden", cam: CAM.fit([0, 1.2, -0.7], { w: 3.4, a0: -12, a1: 0, elev: 8, push: 0.12 }),
        act: (S, u, f) => { S.actor("gus", { x: 0.2, z: -1.5, expr: "grin", prop: "point", look: -0.4 });
          S.pop("label", W(10, "wallet:") - 2, 40, { x: 0.05, y: 1.25, z: -0.35, w: 1.0, h: 0.34, text: "WALLET $65", col: "#c0353a", hold: true }); } },
      // 22 · ninety-five inside: the wallet flips open (insert)
      { set: "yard", word: [10, "sixty-five"], lead: 3, light: "golden", steady: true, cam: CAM.fit([0.05, 0.8, -0.4], { w: 0.75, a0: 6, a1: -4, elev: 34, push: 0.12 }), coc: 12,
        act: (S, u, f) => { const o = W(10, "ninety-five") - 3, k = E.back(E.prog(f, o, o + 8)); H.flap.rotation.x = -2.6 * k; H.walletCash.visible = f >= o;
          S.pop("word", o + 3, 30, { x: 0.05, y: 1.15, z: -0.35, w: 0.75, h: 0.3, text: "$95!", col: "#4fd18b", hold: true }); } },
      // 23 · nobody opens it: shoppers walk past, Gus shrugs
      { set: "yard", word: [10, "Nobody"], lead: 3, light: "golden", cam: CAM.fit([0.2, 1.3, -0.5], { w: 3.6, a0: 14, a1: 6, elev: 6, push: 0.1 }),
        act: (S, u, f) => { const t = f - S.a; S.actor("ida", { x: -2.2 + 0.05 * t, z: 0.6, mode: "stroll", phase: f * 0.05, expr: "smile", look: 0.7 }); S.actor("otto", { x: 1.5, z: -0.2, expr: "grin", prop: "hold" });
          S.actor("gus", { x: 0.2, z: -1.5, expr: "nervous", prop: "shrug" }); S.pop("question", W(10, "opens") , 30, { x: 0.2, y: AH + 0.55, z: -1.4, w: 0.3, h: 0.4 }); } },
      // 24 · the market priced the sleepy pipes, not the drawer (back to the strongbox, night)
      { set: "stage", beat: 11, trans: "whip", light: K.backdrop("#22404a"), cam: CAM.fit([0, 1.7, 0], { w: 3.4, a0: 20, a1: 6, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.tag.rotation.z = 0.1 * Math.sin(f * 0.15); S.pop("zz", W(11, "sleepy") - 2, 34, { x: 0.9, y: 2.4, z: 0.4, w: 0.45, h: 0.45, rise: 0.3 });
          S.pop("label", W(11, "priced") - 2, 34, { x: -0.6, y: 2.8, z: 0.4, w: 1.3, h: 0.4, text: "MR. MARKET", col: "#2a3a5a" });
          S.pop("arrow", W(11, "drawer.") - 2, 30, { x: 0, y: 1.25, z: 1.1, w: 0.4, h: 0.5, dir: "down", hold: true }); S.pop("question", W(11, "drawer.") , 26, { x: 0.6, y: 1.3, z: 1.0, w: 0.3, h: 0.4 }); } },
      // 25 · suddenly the company agrees to pay out: the president hands over
      { set: "hall", beat: 12, trans: "whip", light: "interior", cam: CAM.fit([0, AH - 0.1, -3.3], { w: 2.6, a0: -10, a1: 2, elev: 4, push: 0.12 }),
        act: (S, u, f) => { H.proxies.forEach((p) => (p.visible = true)); S.actor("prez", { x: -0.4, y: 0.4, z: -3.85, expr: "pained", prop: "hold" }); S.actor("ben", { x: 0.6, y: 0.4, z: -3.75, expr: "smile" });
          const g = W(12, "agrees"); H.gavel.rotation.z = f < g ? -0.6 * E.ss(E.prog(f, g - 8, g)) : -0.6 + 0.6 * E.easeIn(E.prog(f, g, g + 3)); S.pop("impact", g + 3, 16, { x: 0.9, y: 1.5, z: -3.0, w: 0.6, h: 0.6, text: "BANG" }); S.kick(g + 3, 0.04); } },
      // 26 · seventy dollars a share: money rains on the shareholders
      { set: "hall", word: [12, "seventy"], lead: 3, trans: "smash", light: K.light("interior", { sat: 1.25 }), cam: CAM.fit([0, 1.4, 1.2], { w: 4.2, a0: -10, a1: 4, elev: 8, push: 0.1 }),
        act: (S, u, f) => { S.actor("ida", { x: -1.2, z: 1.4, expr: "laugh", prop: "up" }); S.actor("otto", { x: 1.1, z: 1.4, expr: "laugh", prop: "up" }); S.actor("ben", { x: 0, z: 0.7, expr: "grin", prop: "fists" });
          S.fx("confetti", { x: 0, y: 2.6, z: 1.2, w: 4, h: 2, t: (f - S.a) / 40 }); for (let q = 0; q < 8; q++) S.pop("dollar", S.a + q * 4, 24, { x: -1.6 + q * 0.45, y: 3.0, z: 1.3, w: 0.35, h: 0.35, rise: -1.4, pop: q === 0 });
          S.pop("word", W(12, "seventy") + 1, 40, { x: 0, y: 2.7, z: 1.0, w: 2.0, h: 0.65, text: "$70 A SHARE", col: "#f2c14e", hold: true }); } },
      // 27 · the money was never hidden: back in the quiet reading room, the BORING cabinet
      { set: "icc", beat: 13, trans: "dissolve", light: "lamp", cam: CAM.fit([-3.1, 1.2, -2.4], { w: 2.4, a0: 18, a1: 8, elev: 4, push: 0.14 }),
        act: (S, u, f) => { H.cab.top.position.z = 0.55; H.cab.cash.visible = true; S.actor("clerk", { x: -3.7, z: -1.7, expr: "smile_closed", look: 0.4 }); S.pop("zz", S.a + 4, 40, { x: -3.45, y: AH + 0.5, z: -1.6, w: 0.4, h: 0.4, rise: 0.3 });
          S.pop("glow", W(13, "hidden.") - 4, 30, { x: -3.0, y: 1.55, z: -2.0, w: 0.9, h: 0.6 }); } },
      // 28 · just filed under boring: the drawer SLAMS shut on the last word
      { set: "icc", word: [13, "filed"], lead: 3, light: "lamp", steady: true, cam: CAM.fit([-3.0, 1.25, -2.2], { w: 1.4, a0: 8, a1: 2, elev: 6, push: 0.12 }), coc: 11,
        act: (S, u, f) => { const sl = W(13, "boring.") - 1, k = E.easeIn(E.prog(f, sl - 5, sl)); H.cab.top.position.z = 0.55 * (1 - k); H.cab.cash.visible = k < 0.9;
          S.pop("impact", sl, 22, { x: -3.0, y: 1.9, z: -1.7, w: 0.9, h: 0.75, text: "SLAM!" }); S.kick(sl, 0.1); S.pop("puff", sl, 14, { x: -3.0, y: 1.2, z: -1.8, w: 1.0, h: 0.5 }); } },
    ],
  };
};
