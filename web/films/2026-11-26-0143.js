// "The Box Worth More Than Its Contents" (the Goldman Sachs Trading Corporation, Dec 1928: shares sold at $104 for about
// $100 of stocks, doubled within weeks; in summer 1929 it launched Shenandoah, which launched Blue Ridge, all on leverage;
// premiums vanished, the market lost ~89% by 1932, the trust's share fell to $1.75) — film module.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const H = {};
  const PI = Math.PI;
  const tt = (B, s, bg, fg, pw, ph) => B.textTex(s, bg, fg, 1024, Math.round((1024 * ph) / pw));
  const hide = (o) => { o.visible = false; if (o.userData && o.userData.base) o.userData.base.v = false; return o; };
  const GOLD = "#d8a93a", RED = "#c8323a";
  const STAGE = K.backdrop("#1d4a46");

  // a share-certificate texture (ornate border, green ink)
  const certTex = (B, title = "SHARES") => {
    const cv = document.createElement("canvas"); cv.width = 512; cv.height = 512; const c = cv.getContext("2d");
    c.fillStyle = "#f2e8c8"; c.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 3; i++) { c.strokeStyle = i === 1 ? "#c9a44a" : "#2f6a4a"; c.lineWidth = 8 - i * 2; c.strokeRect(14 + i * 14, 14 + i * 14, 484 - i * 28, 484 - i * 28); }
    c.fillStyle = "#2f6a4a"; c.font = "bold 64px serif"; c.textAlign = "center"; c.fillText(title, 256, 150);
    c.font = "30px serif"; c.fillText("CERTIFICATE OF STOCK", 256, 205);
    c.beginPath(); c.arc(256, 330, 78, 0, PI * 2); c.fillStyle = "#c9a44a"; c.fill(); c.fillStyle = "#2f6a4a"; c.font = "bold 46px serif"; c.fillText("100", 256, 346);
    c.font = "22px serif"; c.fillText("NEW YORK", 256, 450);
    const t = new B.THREE.CanvasTexture(cv); t.colorSpace = B.THREE.SRGBColorSpace; return t;
  };
  // a ribbon bow (origin at its knot), returned animatable
  const bow = (B, x, y, z, s, parent) => {
    const g = B.grp(x, y, z, 0, s, parent);
    for (const sx of [-1, 1]) { B.ball(0.16, RED, sx * 0.17, 0.06, 0, { in: g, sx: 1.25, sy: 0.75, sz: 0.55 }); B.box(0.07, 0.24, 0.04, RED, sx * 0.08, -0.22, 0.02, { in: g }).rotation.z = sx * 0.35; }
    B.ball(0.07, "#9a1f2a", 0, 0.06, 0.03, { in: g });
    return B.dyn(g);
  };
  // the trust: a wooden crate with a glass front full of certificates, a name band, a ribbon and a bow on top
  const trust = (B, x, y, z, s, label, parent) => {
    const g = B.grp(x, y, z, 0, s, parent), S = 1.6;
    B.box(S, S, S, "planks:#a87a4a", 0, 0, 0, { in: g });
    for (const sx of [-1, 1]) B.box(0.1, S, 0.1, "#5a3a24", sx * (S / 2 - 0.05), 0, S / 2 - 0.04, { in: g });
    B.plate(S * 0.74, S * 0.6, certTex(B), 0, S * 0.42, S / 2 + 0.02, { in: g, d: 0.02, edge: "#5a3a24" });
    B.plate(S * 0.9, 0.3, tt(B, label, "#241726", GOLD, S * 0.9, 0.3), 0, S - 0.2, S / 2 + 0.03, { in: g, d: 0.02, edge: "#241726" });
    B.box(S + 0.03, 0.03, 0.16, RED, 0, S, 0, { in: g }); B.box(0.16, 0.03, S + 0.03, RED, 0, S, 0, { in: g });
    const b = bow(B, 0, S + 0.08, 0.05, 1.3, g);
    return { g: B.dyn(g), bow: b };
  };
  // a wicker fruit basket (origin at its base); bowOn adds a bow on the front rim
  const basket = (B, x, y, z, s, bowOn, parent, seed = 1) => {
    const g = B.grp(x, y, z, 0, s, parent);
    B.cyl(0.36, 0.27, 0.34, "planks:#c8964a", 0, 0, 0, { in: g, seg: 18 }); B.cyl(0.38, 0.38, 0.05, "#a8763a", 0, 0.32, 0, { in: g, seg: 18 });
    const fruit = [["#d8343a", -0.14, 0.05], ["#f29a2a", 0.13, -0.06], ["#e8c83a", 0.0, 0.14], ["#7ab83a", -0.05, -0.15], ["#d8343a", 0.16, 0.12]];
    fruit.forEach(([c, fx, fz], i) => B.ball(0.12, c, fx, 0.38 + (i % 2) * 0.05, fz, { in: g }));
    const r = { g: B.dyn(g) };
    if (bowOn) r.bow = bow(B, 0, 0.26, 0.37, 0.9, g);
    return r;
  };
  const showTag = (k) => ["t104", "t2x", "t175"].forEach((n) => (H[n].visible = n === k));
  // the basket tower: p = crash progress (0..1), n = how many baskets from the top fall
  const tower = (p, n = 6) => H.tower.forEach((b, i) => { if (i === 0) return; const top = i >= H.tower.length - n; const k = top ? E.ss(E.prog(p, (H.tower.length - 1 - i) * 0.08, 0.55 + (H.tower.length - 1 - i) * 0.08)) : 0;
    const b0 = b.g.userData.base.p; b.g.position.set(b0.x + (i % 2 ? 1 : -1) * (0.35 + i * 0.22) * k, b0.y - (b0.y - 0.0) * k * k, b0.z + 0.6 * k); b.g.rotation.z = (i % 2 ? -1 : 1) * 1.6 * k; });

  return {
    cast: {
      you: { jacket: "#3e5f8a", pants: "#2a2d3a", boots: "#1a1418", hat: "bowler", skin: "#f2c9a4", moustache: "#5a3a24", buttons: GOLD },
      youw: { jacket: "#4a4a52", pants: "#2a2a30", boots: "#1a1418", hat: "beanie", cap: "#6a3a3a", skin: "#f0c4a2", moustache: "#5a3a24" },
      vance: { jacket: "#1f1f2a", pants: "#1f1f2a", boots: "#0f0f14", hat: "hair", hair: "#2a2420", moustache: "#2a2420", skin: "#f0c8a8", buttons: GOLD, build: "stout" },
      sal: { jacket: "#f4efe2", pants: "#4a4a52", boots: "#2a1a12", hat: "cap", cap: "#2f8a4a", moustache: "#2a1a12", skin: "#d9a27a", build: "stout" },
      kid: { jacket: "#c0803a", pants: "#3a3a48", boots: "#2a1a12", hat: "cap", cap: "#3a3a48", skin: "#f5d6b8", build: "kid" },
      q1: { jacket: "#8a3a5a", pants: "#2a2a30", boots: "#1a1418", hat: "hair", hair: "#1a1a1a", dress: "#8a3a5a", skin: "#f5d6b8" },
      q2: { jacket: "#5a6a3a", pants: "#2a2a30", boots: "#1a1418", hat: "tophat", skin: "#c98a5a", moustache: "#1a1a1a" },
      q3: { jacket: "#d8c8a0", pants: "#4a4030", boots: "#2a1a12", hat: "cap", cap: "#7a3a2a", skin: "#8a5a3a" },
    },
    sets: {
      // the metaphor stage: deep green void, the trust crate on a pedestal with a price tag; later the tower of trusts
      stage: (B) => {
        B.set.stage({ floor: "#24524c", back: "#1d4a46" });
        B.prop.pedestal({ x: 0, z: -1, r: 1.35, h: 0.5, col: "#f4efe2", trim: GOLD });
        H.c1 = trust(B, 0, 0.5, -1, 1.0, "THE TRUST");
        H.c2 = trust(B, 0, 0.5 + 1.75, -1, 0.72, "SHENANDOAH"); hide(H.c2.g);
        H.c3 = trust(B, 0, 0.5 + 1.75 + 1.3, -1, 0.5, "BLUE RIDGE"); hide(H.c3.g);
        // stilts of IOUs under the upper crates (borrowed money)
        H.loans = [[-0.62, 0.5 + 1.6, 0.62], [0.62, 0.5 + 1.6, 0.62], [-0.42, 0.5 + 1.75 + 1.15, 0.5], [0.42, 0.5 + 1.75 + 1.15, 0.5]].map(([x, y, w]) =>
          hide(B.dyn(B.plate(w, 0.28, tt(B, "LOAN", "#ffd84a", "#241726", w, 0.28), x, y, -0.15, { d: 0.02, edge: "#241726" }))));
        // the price tag on a string at the crate's right corner
        H.tag = B.dyn(B.grp(1.05, 2.15, -0.35, 0, 1));
        B.cyl(0.008, 0.008, 0.45, "#f4efe2", 0, -0.45, 0, { in: H.tag, seg: 4 });
        H.t104 = B.dyn(B.plate(0.9, 0.5, tt(B, "$104", "#f4efe2", "#241726", 0.9, 0.5), 0.1, -0.72, 0, { in: H.tag, d: 0.03, edge: GOLD }));
        H.t2x = hide(B.dyn(B.plate(0.9, 0.5, tt(B, "x2!", "#4fd18b", "#123", 0.9, 0.5), 0.1, -0.72, 0.01, { in: H.tag, d: 0.03, edge: GOLD })));
        H.t175 = hide(B.dyn(B.plate(0.9, 0.5, tt(B, "$1.75", "#ff6a5a", "#ffffff", 0.9, 0.5), 0.1, -0.72, 0.02, { in: H.tag, d: 0.03, edge: GOLD })));
        // what's inside: a stack of certificates on a low plinth with a $100 card
        B.box(0.9, 0.35, 0.7, "#f4efe2", -1.75, 0, -0.4); H.inside = [];
        for (let i = 0; i < 6; i++) H.inside.push(B.box(0.62, 0.05, 0.46, i % 2 ? "#f2e8c8" : "#e8dcb0", -1.75, 0.35 + i * 0.055, -0.4));
        H.c100 = B.dyn(B.plate(1.4, 0.3, tt(B, "$100 OF STOCKS", "#f4efe2", "#2f6a4a", 1.4, 0.3), -1.75, 0.95, -0.38, { d: 0.02, edge: "#2f6a4a" }));
        H.ftag = hide(B.dyn(B.grp(0, 0, 0, 0, 1))); B.plate(0.7, 0.4, tt(B, "$104", "#f4efe2", "#241726", 0.7, 0.4), 0, 0, 0, { in: H.ftag, d: 0.03, edge: GOLD });
        B.lamp(0, 6, 3, "#fff0d8", 7, 16); B.lamp(-3, 3, 1, "#a8fff0", 3, 10); B.lamp(2.5, 4, -3, GOLD, 3, 9);
      },
      // the trust office, New York, December 1928: dark marble, gold deco stripes, a brass teller grille, a bulb sign
      lobby: (B) => {
        B.set.room({ style: "bank", wall: "marble:#2c2c36", floor: "tiles:#e8dcc0:#2a2d36", w: 10, d: 8, h: 4.2, windows: [-3.6], door: false });
        for (const x of [-2.6, -2.2, 2.2, 2.6]) B.box(0.08, 4.0, 0.04, GOLD, x, 0, -3.97);
        for (let i = 0; i < 5; i++) B.box(1.2 - i * 0.2, 0.06, 0.04, GOLD, 0, 3.95 - i * 0.12, -3.96);
        B.prop.bulbSign({ x: 0, y: 2.65, z: -3.9, text: "NEW TRUST  SHARES $104", w: 4.0, h: 0.7, bg: "#241726", fg: "#ffd84a" });
        B.prop.counter({ x: 0, z: -2.1, w: 4.6, h: 1.1, col: "panel:#3a2418", top: GOLD });
        for (let i = 0; i < 13; i++) if (Math.abs(-1.8 + i * 0.3) > 0.5) B.cyl(0.02, 0.02, 0.95, GOLD, -1.8 + i * 0.3, 1.1, -2.1, { seg: 6 });
        B.box(3.9, 0.06, 0.08, GOLD, 0, 2.05, -2.1); B.box(0.9, 0.05, 0.12, GOLD, 0, 1.1, -1.95);
        H.coins = B.prop.coinStack({ x: 0.2, y: 1.1, z: -1.8, n: 6 }); hide(H.coins);
        // the price board on the right wall
        B.box(2.2, 1.7, 0.12, "#1a1a22", 3.6, 1.2, -3.94); B.plate(1.8, 0.32, tt(B, "TRUST SHARES", "#1a1a22", GOLD, 1.8, 0.32), 3.6, 2.62, -3.86, { d: 0.02, edge: "#1a1a22" });
        H.b104 = B.dyn(B.plate(1.8, 0.8, tt(B, "$104", "#1a1a22", "#f4efe2", 1.8, 0.8), 3.6, 1.95, -3.85, { d: 0.02, edge: "#1a1a22" }));
        H.bx2 = hide(B.dyn(B.plate(1.8, 0.8, tt(B, "DOUBLED!", "#1a1a22", "#4fd18b", 1.8, 0.8), 3.6, 1.95, -3.83, { d: 0.02, edge: "#1a1a22" })));
        H.cal = B.plate(1.4, 0.5, tt(B, "DEC 1928", "#f4efe2", RED, 1.4, 0.5), -1.2, 1.85, -3.9, { d: 0.02, edge: GOLD });
        B.prop.clock({ x: -3.4, y: 3.2, z: -3.92, r: 0.3, time: 10.1 });
        H.mini = trust(B, -3.4, 0, -2.6, 0.55, "THE TRUST");
        for (const x of [-2.5, 0, 2.5]) B.prop.lamp({ x, y: 4.2, z: -0.6, kind: "hang", cord: 0.6, col: GOLD, intensity: 3 });
        B.prop.plant({ x: 4.2, z: -3.4 });
        B.lamp(0, 3, 1.8, "#fff0d0", 4, 10);
      },
      // a summer boardwalk, 1929: sea, umbrellas, a newsboy's crate, billboards for the new trusts; winter 1932 later
      boardwalk: (B) => {
        B.set.landscape({ kind: "beach", seed: 7, clear: 7, count: 10, mountains: false });
        B.box(40, 0.3, 3.4, "planks:#b08a5a", 0, 0, -0.6);
        for (let i = 0; i < 16; i++) B.cyl(0.05, 0.05, 1.0, "#f4efe2", -12 + i * 1.6, 0.3, -2.25, { seg: 6 });
        B.box(26, 0.08, 0.08, "#f4efe2", 0, 1.25, -2.25);
        for (const [x, c] of [[-3.6, "#e2453c"], [3.8, "#2f6ab5"]]) { B.cyl(0.04, 0.04, 2.2, "#f4efe2", x, 0.3, -1.6, { seg: 6 }); B.cone(1.1, 0.5, `stripes:${c}:#f4efe2`, x, 2.5, -1.6, { seg: 12 }); }
        H.sh = B.dyn(B.grp(-1.6, 0.3, -1.9, 0, 1)); B.prop.sign({ x: 0, y: 0, z: 0, text: "NEW TRUST: SHENANDOAH", post: true, w: 2.4, h: 0.6, bg: "#f4efe2", fg: RED, in: H.sh });
        H.br = hide(B.dyn(B.grp(1.6, 0.3, -1.9, 0, 1))); B.prop.sign({ x: 0, y: 0, z: 0, text: "NEW TRUST: BLUE RIDGE", post: true, w: 2.4, h: 0.6, bg: "#f4efe2", fg: "#2f6ab5", in: H.br });
        B.prop.crate({ x: 0.6, y: 0.3, z: -0.4, size: 0.6, label: "EXTRA!" });
        H.board32 = hide(B.dyn(B.grp(0, 0.3, -1.9, 0, 1)));
        B.box(2.8, 1.5, 0.15, "#1a1a22", 0, 1.6, 0, { in: H.board32 }); for (const sx of [-1.2, 1.2]) B.box(0.1, 1.6, 0.1, "#3a3a40", sx, 0, 0, { in: H.board32 });
        B.plate(2.5, 0.5, tt(B, "1932", "#1a1a22", "#f4efe2", 2.5, 0.5), 0, 2.7, 0.09, { in: H.board32, d: 0.01 });
        B.plate(2.5, 0.6, tt(B, "MARKET -89%", "#1a1a22", "#ff6a5a", 2.5, 0.6), 0, 2.05, 0.09, { in: H.board32, d: 0.01 });
        H.bench = hide(B.prop.bench({ x: 0, y: 0.3, z: -0.6 }));
        for (const x of [-5, 5]) B.prop.lampPost({ x, y: 0.3, z: -1.9, light: true });
        B.lamp(0, 5, 4, "#fff4e0", 4, 14);
      },
      // a 1920s fruit market: shopfronts, a striped awning, the grocer's stall with baskets — and a tower of baskets
      market: (B) => {
        B.box(40, 0.1, 30, "cobble", 0, -0.1, 6); B.box(40, 0.14, 3.6, "concrete:#c8c2b8", 0, 0, -1.6);
        B.facade({ style: "shop", w: 5.4, x: 0, z: -3.4, sign: "FRUIT MARKET", seed: 6, floors: 2 });
        B.facade({ style: "brick", w: 6, x: -5.8, z: -3.4, sign: "", seed: 3, floors: 3 }); B.facade({ style: "victorian", w: 6, x: 5.8, z: -3.4, sign: "", seed: 8 });
        // stall + awning
        B.box(3.6, 0.85, 1.0, "planks:#7a5232", 0, 0.14, -1.7); B.box(3.8, 0.06, 1.1, "#4a2f1e", 0, 0.99, -1.7);
        for (const sx of [-1.8, 1.8]) B.box(0.08, 2.4, 0.08, "#4a2f1e", sx, 0.14, -1.2);
        const aw = B.box(4.0, 0.06, 1.4, "stripes:#2f8a4a:#f4efe2", 0, 2.5, -1.5); aw.rotation.x = -0.32;
        H.sal = true;
        for (const [x, s] of [[-1.3, 0.85], [-0.7, 0.85], [1.4, 0.85]]) basket(B, x, 1.05, -1.75, s, false);
        H.b0 = basket(B, -0.05, 1.05, -1.5, 1.0, true);
        H.apple = B.dyn(B.ball(0.12, "#d8343a", -0.05, 1.05 + 0.38, -1.5 + 0.05));
        // the tower of baskets (on the stall's right end): basket 0 is the bottom one, its fruit stays put
        H.tower = []; for (let i = 0; i < 6; i++) H.tower.push(basket(B, 0.75, 1.05 + i * 0.4, -1.55, 0.95 - i * 0.07, i === 0, undefined, i));
        H.tloans = [2, 3, 4, 5].map((i) => hide(B.dyn(B.plate(0.46, 0.18, tt(B, "LOAN", "#ffd84a", "#241726", 0.46, 0.18), 0.75, 1.05 + i * 0.4 + 0.14, -1.55 + 0.36, { d: 0.02, edge: "#241726" }))));
        H.price = B.plate(0.7, 0.36, tt(B, "BOW: EXTRA", "#f4efe2", RED, 0.7, 0.36), -1.45, 0.75, -1.18, { d: 0.02, edge: "#4a2f1e" });
        for (const x of [-3.4, 3.4]) B.prop.lampPost({ x, z: 0.0, light: true });
        B.lamp(0, 4, 3, "#fff0d8", 4, 12);
      },
    },
    shots: [
      // 0 · frame 0: the price tag swings in on its string and slaps onto the trust crate — SLAP, "1929"
      { set: "stage", f: 0, light: STAGE, cam: CAM.fit([0.45, 1.6, -0.8], { w: 2.9, a0: 14, a1: 6, elev: 4, push: 0.16 }), coc: 9,
        act: (S, u, f) => { const k = E.back(E.prog(f, 0, 9)); H.tag.rotation.z = 1.4 * (1 - k); H.tag.position.x = 2.6 - 1.55 * k;
          S.kick(9, 0.1); S.pop("impact", 9, 22, { x: 1.4, y: 2.2, z: -0.1, w: 0.7, h: 0.45, text: "SLAP!" });
          S.pop("label", W(0, "twenty-nine,") - 4, 40, { x: 0.0, y: 2.95, z: -0.4, w: 1.0, h: 0.32, text: "1929", bg: "#ffd84a", hold: true }); } },
      // 1 · Wall Street sold boxes of stocks: whip into the deco office, a queue of buyers at the brass grille
      { set: "lobby", word: [0, "Wall"], lead: 3, trans: "whip", dir: -1, light: "interior", cam: CAM.keys([[0, { p: [2.4, 2.3, 4.6], t: [-0.4, 1.5, -2.2], fov: 46 }], [1, { p: [1.5, 2.0, 3.8], t: [-0.6, 1.5, -2.4], fov: 46 }]]),
        act: (S, u, f) => { S.actor("vance", { x: 0.1, z: -2.9, expr: "grin", prop: "point" });
          ["you", "q1", "q2", "q3"].forEach((id, i) => S.actor(id, { x: -0.3 + (i % 2) * 0.5, z: -1.2 + i * 0.75, expr: i === 0 ? "grin" : "smile", look: -0.3 }));
          S.pop("label", W(0, "boxes") - 2, 44, { x: -0.2, y: 2.6, z: -0.6, w: 1.4, h: 0.32, text: "WALL STREET", bg: "#f4efe2", hold: true }); } },
      // 2 · for more than what's inside: the crate towers over its certificates, the $104 tag sways
      { set: "stage", word: [0, "more"], lead: 3, trans: "dissolve", light: STAGE, cam: CAM.fit([-0.6, 1.3, -0.7], { w: 4.0, a0: -14, a1: -4, elev: 8, push: 0.1 }),
        act: (S, u, f) => { H.tag.rotation.z = 0.08 * Math.sin(f * 0.15);
          S.pop("label", W(0, "inside.") - 2, 40, { x: -1.75, y: 1.45, z: -0.2, w: 0.9, h: 0.28, text: "INSIDE", bg: "#4fd18b", hold: true });
          S.pop("arrow", W(0, "inside."), 30, { x: -1.75, y: 1.15, z: -0.1, w: 0.3, h: 0.4, dir: "down" }); } },
      // 3 · December 1928: flash to the office, the calendar and clock; snow beyond the windows
      { set: "lobby", beat: 1, trans: "flash", light: "interior", cam: CAM.fit([-2.0, 2.0, -3.5], { w: 3.2, a0: 4, a1: -4, elev: 0, push: 0.1 }),
        act: (S, u, f) => {
          S.pop("label", W(1, "nineteen") - 2, 46, { x: -1.2, y: 1.3, z: -3.6, w: 1.1, h: 0.28, text: "NEW YORK", bg: "#ffd84a", hold: true }); } },
      // 4 · Goldman Sachs opens a trust: Mr. Vance throws his arms up under the lit bulb sign
      { set: "lobby", word: [1, "Goldman"], lead: 3, trans: "whip", dir: 1, light: "interior", cam: CAM.fit([0, 1.7, -2.6], { w: 3.0, a0: 6, a1: -2, elev: 1, push: 0.12 }),
        act: (S, u, f) => { const t = W(1, "trust,"); S.actor("vance", { x: 0.1, y: 0.35, z: -2.9, expr: f < t ? "smile" : "laugh", prop: f < t ? "point" : "up" });
          S.pop("label", W(1, "Goldman") + 2, 46, { x: -0.6, y: 2.75, z: -1.8, w: 1.5, h: 0.32, text: "GOLDMAN SACHS", bg: "#f4efe2", hold: true });
          S.pop("stars", t, 22, { x: 0, y: 3.3, z: -3.5, w: 2.4, h: 0.6 }); S.pop("label", t, 40, { x: 0.7, y: 1.35, z: -1.5, w: 1.0, h: 0.32, text: "A TRUST", bg: "#ffd84a", hold: true }); } },
      // 5 · a company that only owns other shares: certificates fly into the crate on the stage
      { set: "stage", word: [1, "company"], lead: 3, trans: "zoom", light: STAGE, cam: CAM.fit([0, 1.6, -0.6], { w: 2.6, a0: -6, a1: 4, elev: 10, push: 0.14 }),
        act: (S, u, f) => { for (let q = 0; q < 6; q++) S.pop("page", W(1, "company") + q * 4, 20, { x: -1.4 + q * 0.4, y: 2.6 - q * 0.1, z: -0.2, w: 0.3, h: 0.3, rise: -0.6, spin: 1.6 });
          S.pop("label", W(1, "shares.") - 2, 40, { x: 0, y: 2.95, z: -0.3, w: 1.6, h: 0.3, text: "OWNS SHARES", bg: "#f4efe2", hold: true }); } },
      // 6 · you pay $104: at the brass grille, coins slide across, Vance says "$104, please."
      { set: "lobby", beat: 2, trans: "whip", dir: -1, light: "interior", cam: CAM.fit([0.0, 1.55, -2.0], { w: 2.6, a0: -16, a1: -6, elev: 4, push: 0.12 }),
        act: (S, u, f) => { H.coins.visible = f >= W(2, "pay"); S.actor("vance", { x: 0.4, y: 0.35, z: -2.9, expr: "grin", prop: "hold" });
          S.actor("you", { x: -0.4, z: -1.2, expr: "smile", prop: "hold", look: 0.4 });
          S.say("$104, please.", W(2, "pay") - 2, 34, { x: 0.9, y: 2.55, z: -2.4, w: 1.2, h: 0.42 });
          for (let q = 0; q < 3; q++) S.pop("coin", W(2, "dollars") + q * 3, 16, { x: 0.1 + q * 0.1, y: 1.35, z: -1.7, w: 0.2, h: 0.2, rise: 0.3 }); } },
      // 7 · for about $100 of stocks: the stage, the certificate pile and its $100 card beside the crate
      { set: "stage", word: [2, "about"], lead: 3, trans: "dissolve", light: STAGE, cam: CAM.fit([-1.4, 0.9, -0.5], { w: 2.4, a0: 10, a1: 4, elev: 10, push: 0.12 }),
        act: (S, u, f) => { const t = W(2, "hundred", 2); H.c100.scale.setScalar(1 + 0.25 * Math.max(0, 1 - Math.abs(f - t - 4) / 8));
          S.pop("ring", t, 18, { x: -1.75, y: 0.95, z: -0.3, w: 1.0, h: 0.5 }); } },
      // 8 · within weeks your shares more than double: the price board flips to DOUBLED, you laugh, confetti
      { set: "lobby", beat: 3, trans: "whip", dir: 1, light: "interior", cam: CAM.fit([3.0, 1.7, -2.6], { w: 3.4, a0: 10, a1: 4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { const t = W(3, "double.") - 2; H.b104.visible = f < t; H.bx2.visible = f >= t; H.bx2.scale.setScalar(Math.max(0.01, E.back(E.prog(f, t, t + 7))));
          S.actor("you", { x: 2.4, z: -2.0, expr: f < t ? "smile" : "laugh", prop: f < t ? "point" : "up", look: 0.5 });
          S.pop("label", W(3, "weeks,") - 4, 34, { x: 2.4, y: 2.45, z: -1.8, w: 1.4, h: 0.3, text: "WITHIN WEEKS", bg: "#f4efe2", hold: true });
          S.pop("arrow", t, 26, { x: 4.4, y: 2.3, z: -3.6, w: 0.45, h: 0.6, dir: "up" }); S.pop("confetti", t, 30, { x: 3.2, y: 3.0, z: -2.4, w: 2.4, h: 2.0, pop: false }); S.kick(t, 0.05); } },
      // 9 · how is a box worth more than its contents? push through to the crate, the x2 tag dwarfs the $100 pile
      { set: "stage", beat: 4, trans: "zoom", light: (u) => K.mixLight(STAGE, K.light("mind"), 0.35), cam: CAM.fit([-0.2, 1.5, -0.7], { w: 4.4, a0: 6, a1: 0, elev: 6, push: 0.1 }),
        act: (S, u, f) => { showTag("t2x"); H.tag.scale.setScalar(1.3); H.tag.rotation.z = 0.06 * Math.sin(f * 0.2);
          S.pop("question", W(4, "how"), 70, { x: -0.5, y: 2.9, z: -0.3, w: 0.35, h: 0.5, hold: true });
          S.pop("label", W(4, "contents?") - 2, 30, { x: -1.75, y: 1.45, z: -0.2, w: 0.9, h: 0.28, text: "SAME $100", bg: "#f4efe2", hold: true }); } },
      // 10 · nobody asks. that summer: whip to the summer boardwalk, the crowd cheers, the newsboy waves the paper
      { set: "boardwalk", beat: 5, trans: "whip", dir: -1, light: "day", cam: CAM.fit([0, 1.5, -0.6], { w: 4.4, a0: -10, a1: 0, elev: 6, push: 0.08 }),
        act: (S, u, f) => { ["q1", "q2", "q3"].forEach((id, i) => S.actor(id, { x: -1.6 + i * 1.3, z: -0.3 + (i % 2) * 0.3, y: 0.3, expr: "laugh", prop: "up" }));
          S.actor("kid", { x: 0.6, y: 0.3, z: 0.4, expr: "grin", prop: "paper" });
          S.pop("label", W(5, "Nobody") - 2, 30, { x: -0.4, y: 2.6, z: -0.2, w: 1.4, h: 0.32, text: "NOBODY ASKS", bg: "#ff6a5a", hold: true });
          S.pop("label", W(5, "summer,") - 4, 34, { x: 0.4, y: 2.6, z: -0.2, w: 1.5, h: 0.32, text: "SUMMER 1929", bg: "#ffd84a", hold: true }); } },
      // 11 · the trust launches a trust: close on the newsboy under the SHENANDOAH billboard — "New trust!"
      { set: "boardwalk", word: [5, "trust"], lead: 4, light: "day", cam: CAM.fit([-0.6, 1.8, -0.8], { w: 2.6, a0: 12, a1: 4, elev: 4, push: 0.12 }),
        act: (S, u, f) => { S.actor("kid", { x: -0.2, y: 0.3, z: -0.3, expr: "laugh", prop: "paper" });
          S.say("New trust!", W(5, "trust") - 2, 30, { x: 0.4, y: 2.2, z: -0.2, w: 1.0, h: 0.4 }); } },
      // 12 · which launches another: smash to the stage, crate pops out of crate, twice — POP! POP!
      { set: "stage", word: [5, "which"], lead: 3, trans: "smash", light: STAGE, cam: CAM.fit([0, 2.7, -1.0], { w: 3.6, a0: -6, a1: 4, elev: 4, push: 0.08 }),
        act: (S, u, f) => { const t2 = W(5, "which") + 2, t3 = W(5, "another.") - 2; H.c2.g.visible = true; H.c2.g.scale.setScalar(0.72 * Math.max(0.01, E.back(E.prog(f, t2, t2 + 8))));
          H.c3.g.visible = f >= t3; H.c3.g.scale.setScalar(0.5 * Math.max(0.01, E.back(E.prog(f, t3, t3 + 8))));
          S.pop("impact", t2 + 2, 16, { x: -1.0, y: 2.8, z: -0.4, w: 0.6, h: 0.4, text: "POP!" }); S.pop("impact", t3 + 2, 16, { x: 0.9, y: 4.0, z: -0.4, w: 0.6, h: 0.4, text: "POP!" }); S.kick(t3 + 2, 0.05); } },
      // 13 · a trust owning a trust owning a trust: crane up the stack of crates, labels in turn
      { set: "stage", beat: 6, trans: "dissolve", light: STAGE, steady: true, cam: CAM.keys([[0, { p: [1.6, 1.4, 3.4], t: [0, 1.3, -1.0], fov: 42 }], [1, { p: [1.4, 4.2, 3.0], t: [0, 3.7, -1.0], fov: 42 }]]),
        act: (S, u, f) => { H.c2.g.visible = H.c3.g.visible = true;
          S.pop("label", W(6, "owning", 1) - 2, 30, { x: 1.3, y: 1.6, z: -0.2, w: 0.9, h: 0.26, text: "OWNS", bg: "#ffd84a", hold: true });
          S.pop("label", W(6, "owning", 2) - 2, 30, { x: 1.1, y: 3.1, z: -0.4, w: 0.9, h: 0.26, text: "OWNS", bg: "#ffd84a", hold: true }); } },
      // 14 · on borrowed money: wide, LOAN slips prop up the stack, it wobbles; you sweat at the foot
      { set: "stage", word: [6, "on"], lead: 3, trans: "whip", dir: 1, light: STAGE, cam: CAM.fit([0.3, 2.2, -0.8], { w: 4.6, a0: 18, a1: 10, elev: 6, push: 0.08 }),
        act: (S, u, f) => { H.c2.g.visible = H.c3.g.visible = true; const t = W(6, "borrowed"); const wob = 0.04 * Math.sin(f * 0.5) * E.prog(f, t, t + 10);
          H.c2.g.rotation.z = wob; H.c3.g.rotation.z = -wob * 1.6; H.loans.forEach((l, i) => (l.visible = f >= t - 4 + i * 2));
          S.actor("you", { x: 1.75, z: 0.2, expr: f < t ? "neutral" : "nervous", look: -0.6 });
          S.pop("sweat", t + 6, 24, { x: 2.0, y: 1.85, z: 0.4, w: 0.2, h: 0.26 }); S.sfx("creak", t + 2); } },
      // 15 · you see, it's a fruit basket: push through into the fruit market, Sal holds up a basket
      { set: "market", beat: 7, trans: "zoom", light: "golden", cam: CAM.fit([-0.9, 1.5, -1.3], { w: 3.4, a0: -8, a1: -2, elev: 6, push: 0.1 }),
        act: (S, u, f) => { S.actor("sal", { x: -2.1, z: -0.9, expr: "grin", prop: "point" });
          S.pop("label", W(7, "fruit") - 2, 36, { x: 0.3, y: 2.35, z: -1.2, w: 1.3, h: 0.3, text: "FRUIT BASKET", bg: "#f4efe2", hold: true }); } },
      // 16 · the bow costs extra: insert on the bow, Sal — "Bow's extra!"
      { set: "market", word: [7, "bow"], lead: 4, steady: true, coc: 11, light: "golden", cam: CAM.fit([-0.3, 1.4, -1.3], { w: 1.4, a0: 6, a1: -2, elev: 8, push: 0.14 }),
        act: (S, u, f) => { S.actor("sal", { x: -2.1, z: -0.9, expr: "laugh", prop: "up" });
          S.say("Bow's extra!", W(7, "bow") - 2, 30, { x: -0.55, y: 1.95, z: -1.3, w: 0.8, h: 0.32 }); S.pop("sparks", W(7, "extra."), 14, { x: -0.05, y: 1.4, z: -1.0, w: 0.35, h: 0.3 }); } },
      // 17 · now baskets hold baskets: dissolve to the tower of baskets on the stall
      { set: "market", beat: 8, trans: "dissolve", light: "golden", cam: CAM.fit([0.75, 2.1, -1.5], { w: 2.4, a0: 14, a1: 6, elev: 2, push: 0.08 }),
        act: (S, u, f) => { S.actor("sal", { x: -2.1, z: -0.9, expr: "smile", prop: "shrug" });
          S.pop("label", W(8, "baskets,") - 2, 30, { x: 0.75, y: 3.4, z: -1.2, w: 1.5, h: 0.3, text: "BASKETS OF BASKETS", bg: "#ffd84a", hold: true }); } },
      // 18 · some bought with a loan: LOAN tags pop onto the upper baskets
      { set: "market", word: [8, "some"], lead: 3, steady: true, coc: 10, light: "golden", cam: CAM.fit([0.75, 2.45, -1.4], { w: 1.6, a0: -8, a1: -2, elev: 2, push: 0.12 }),
        act: (S, u, f) => { H.tloans.forEach((l, i) => { const t = W(8, "loan.") - 6 + i * 2; l.visible = f >= t; l.scale.setScalar(Math.max(0.01, E.back(E.prog(f, t, t + 6)))); }); } },
      // 19 · the fruit slips a little: insert, one apple rolls off the bottom basket — a small down arrow
      { set: "market", beat: 9, trans: "whip", dir: -1, light: "golden", steady: true, coc: 11, cam: CAM.fit([0.1, 1.35, -1.4], { w: 1.6, a0: -10, a1: -4, elev: 10, push: 0.12 }),
        act: (S, u, f) => { const k = E.ss(E.prog(f, W(9, "slips") - 2, W(9, "little,") + 6)); H.apple.position.set(-0.05 + 0.4 * k, 1.43 - 0.36 * k * k, -1.45 + 0.25 * k);
          H.tloans.forEach((l) => (l.visible = true));
          S.pop("arrow", W(9, "little,"), 24, { x: 0.5, y: 1.7, z: -1.0, w: 0.25, h: 0.32, dir: "down" }); } },
      // 20 · the loan doesn't: the LOAN tags hang on, untouched
      { set: "market", word: [9, "loan"], lead: 3, light: "golden", cam: CAM.fit([0.75, 2.3, -1.4], { w: 1.9, a0: 10, a1: 4, elev: 2, push: 0.1 }),
        act: (S, u, f) => { H.tloans.forEach((l) => (l.visible = true)); H.apple.position.set(0.35, 1.07, -1.2);
          S.pop("label", W(9, "doesn't,") - 2, 30, { x: 1.35, y: 1.75, z: -0.9, w: 0.9, h: 0.28, text: "STILL OWED", bg: "#ff6a5a", hold: true }); } },
      // 21 · so the top baskets crash: wide, the top of the tower tumbles — CRASH!
      { set: "market", word: [9, "so"], lead: 2, trans: "smash", light: "golden", cam: CAM.fit([-0.2, 1.7, -1.3], { w: 4.4, a0: 6, a1: -2, elev: 6, push: 0.1, roll: 2 }),
        act: (S, u, f) => { H.tloans.forEach((l) => (l.visible = false)); H.apple.position.set(0.35, 1.07, -1.2); const t = W(9, "crash.");
          tower(E.prog(f, W(9, "top") - 2, t + 10), 3); S.actor("sal", { x: -2.1, z: -0.9, expr: f < t ? "nervous" : "shock", prop: "shrug" });
          S.kick(t, 0.12); S.pop("impact", t, 26, { x: 1.4, y: 2.0, z: -1.0, w: 0.9, h: 0.55, text: "CRASH!" }); } },
      // 22 · and the bow you paid extra for? whip to the stage, the trust's bow glints, you point at it
      { set: "stage", beat: 10, trans: "whip", dir: 1, light: STAGE, cam: CAM.fit([0.6, 1.9, -0.6], { w: 3.4, a0: -8, a1: -2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("you", { x: 1.5, z: 0.1, expr: "nervous", prop: "point", look: -0.6 });
          S.pop("glow", W(10, "bow"), 30, { x: 0, y: 2.25, z: -0.95, w: 0.9, h: 0.6 }); S.pop("label", W(10, "extra") - 2, 34, { x: -0.6, y: 2.95, z: -0.6, w: 1.3, h: 0.3, text: "THE EXTRA", bg: "#ffd84a", hold: true }); } },
      // 23 · gone first: close, the bow vanishes in a puff, you're shocked
      { set: "stage", word: [10, "Gone"], lead: 3, steady: true, coc: 10, light: STAGE, cam: CAM.fit([0, 2.25, -1.0], { w: 1.6, a0: 4, a1: -2, elev: 4, push: 0.14 }),
        act: (S, u, f) => { const t = W(10, "Gone"); H.c1.bow.visible = f < t; S.pop("puff", t, 22, { x: 0, y: 2.25, z: -0.8, w: 1.2, h: 0.9, pop: false });
          S.pop("label", t + 4, 26, { x: 0, y: 2.75, z: -0.6, w: 0.9, h: 0.3, text: "GONE", bg: "#ff6a5a", hold: true }); } },
      // 24 · twist — by 1932: flash to the boardwalk in winter, snow, an empty bench, the 1932 board
      { set: "boardwalk", beat: 11, trans: "flash", light: "cold", cam: CAM.fit([0, 1.7, -1.2], { w: 4.2, a0: 8, a1: -2, elev: 6, push: 0.08 }),
        act: (S, u, f) => { S.snow(1); H.board32.visible = true; H.sh.visible = false; H.bench.visible = true;
          S.actor("youw", { x: -0.3, y: 0.3, z: -0.6, mode: "sit", expr: "dazed" }); } },
      // 25 · nearly ninety percent: insert on the board, MARKET -89% — a heavy thud
      { set: "boardwalk", word: [11, "nearly"], lead: 3, steady: true, coc: 10, light: "cold", cam: CAM.fit([0, 2.35, -1.8], { w: 2.4, a0: -4, a1: 2, elev: 2, push: 0.16, roll: 2 }),
        act: (S, u, f) => { S.snow(1); H.board32.visible = true; H.sh.visible = false; S.kick(W(11, "percent."), 0.08);
          S.pop("arrow", W(11, "ninety"), 30, { x: 1.55, y: 2.2, z: -1.6, w: 0.4, h: 0.6, dir: "down" }); } },
      // 26 · your $104 share? the stage, the tag flips from $104 to $1.75 — THUD
      { set: "stage", beat: 12, trans: "whip", dir: -1, light: (u) => K.mixLight(STAGE, K.light("danger"), 0.3), cam: CAM.fit([0.9, 1.7, -0.5], { w: 3.0, a0: 12, a1: 6, elev: 4, push: 0.12 }),
        act: (S, u, f) => { const t = W(12, "seventy-five.") - 2; showTag(f < t ? "t104" : "t175"); H.c1.bow.visible = false;
          H.tag.rotation.z = f < t ? 0.05 * Math.sin(f * 0.2) : 0.5 * Math.exp(-(f - t) / 6) * Math.sin((f - t) * 0.9);
          S.actor("you", { x: 1.6, z: 0.3, expr: f < t ? "nervous" : "shock", prop: f < t ? "point" : "shrug", look: -0.5 });
          S.kick(t, 0.1); S.pop("impact", t, 24, { x: 1.6, y: 2.6, z: 0.0, w: 0.7, h: 0.45, text: "THUD" }); } },
      // 27 · finale — the baskets fell further than the fruit: market at sunset, the whole tower comes down — CRASH!
      { set: "market", word: [12, "The"], lead: 3, trans: "whip", dir: 1, light: "sunset", cam: CAM.fit([-0.3, 1.6, -1.3], { w: 4.2, a0: -8, a1: 2, elev: 6, push: 0.1 }),
        act: (S, u, f) => { const t = W(12, "fruit."); tower(E.prog(f, W(12, "baskets") - 2, t), 5); H.apple.position.set(0.35, 1.07, -1.2);
          S.actor("sal", { x: -2.1, z: -0.9, expr: f < t ? "nervous" : "dazed", prop: "shrug" });
          S.pop("label", W(12, "fruit.") - 14, 40, { x: 0.75, y: 1.95, z: -1.0, w: 0.9, h: 0.26, text: "FRUIT: FINE", bg: "#4fd18b", hold: true });
          S.kick(t, 0.16); S.pop("impact", t, 30, { x: 1.5, y: 2.3, z: -0.9, w: 0.9, h: 0.55, text: "CRASH!" }); S.pop("puff", t, 18, { x: 1.2, y: 1.0, z: -1.0, w: 1.6, h: 0.6, pop: false }); } },
    ],
  };
};
