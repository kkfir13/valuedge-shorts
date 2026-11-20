// "The Man Who Tried to Prove Stocks Were a Bad Investment" (Edgar Lawrence Smith, 1924) — film module.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const AH = 1.58;
  const RY = 0.6; // ring floor height
  const H = {};
  const NAVY = "#1d2540";

  return {
    cast: {
      smith: { jacket: "#5a5248", pants: "#3a3630", boots: "#1a1418", hat: "hair", hair: "#3a2a1c", skin: "#f5c9a0", buttons: "#c9a44a" },
      keynes: { jacket: "#6a5a3a", pants: "#4a4232", boots: "#2a1a14", hat: "hair", hair: "#5a4030", skin: "#f3cfae", moustache: "#5a4030" },
      stocks: { jacket: "#2f9a52", pants: "#f4efe2", boots: "#c0353a", hat: "cap", cap: "#2f9a52", capColor: "#2f9a52", skin: "#e8b48a" },
      bonds: { jacket: "#2f5fb5", pants: "#f4efe2", boots: "#2a2d38", hat: "cap", cap: "#2f5fb5", capColor: "#2f5fb5", skin: "#f5d0b0", build: "stout" },
      farmer: { jacket: "#b8784a", pants: "#3a5a8a", boots: "#4a2e1c", hat: "cowboy", skin: "#e0a878", moustache: "#7a5a3a" },
      owner: { jacket: "#7a3a6a", pants: "#2a2d38", boots: "#1a1418", hat: "bowler", skin: "#f0c8a0" },
      auct: { jacket: "#efe9dc", pants: "#2a2d38", boots: "#1a1418", hat: "tophat", skin: "#f0c8a0", moustache: "#2a1a14" },
      flap: { jacket: "#c84a7a", pants: "#2a2d38", boots: "#1a1418", hat: "bonnet", skin: "#f8d2b4", dress: "#c84a7a" },
      sheik: { jacket: "#2a2d38", pants: "#2a2d38", boots: "#1a1418", hat: "bowler", skin: "#c88a60" },
    },
    sets: {
      // 1924: Smith's office at night — navy wallpaper, desk, typewriter, towers of ledgers, a city window
      study: (B) => {
        B.set.room({ style: "office", wall: "wallpaper:#2a3a6a", floor: "carpet:#5a2a2a", w: 8, d: 6, h: 3.4, windows: [2.2], lit: true, door: false });
        B.prop.desk({ x: 0, z: -1.2, w: 2.2 });
        // typewriter
        B.box(0.62, 0.16, 0.42, "metal:#2a2d36", 0.1, 0.81, -1.05); B.box(0.62, 0.14, 0.18, "metal:#3a3e46", 0.1, 0.97, -1.18);
        B.cyl(0.05, 0.05, 0.8, "#1a1a1a", 0.1, 0.62, -1.2, { rz: Math.PI / 2 });
        H.keys = [];
        for (let k = 0; k < 8; k++) H.keys.push(B.dyn(B.cyl(0.03, 0.03, 0.03, "#e8e4dc", -0.14 + k * 0.07, 0.97, -0.9)));
        H.page = B.dyn(B.grp(0.1, 1.32, -1.24, 0, 1)); H.page.rotation.x = -0.15; B.plate(0.5, 0.56, "#f8f4ea", 0, 0, 0, { in: H.page, d: 0.005, edge: "#d8d4ca" });
        ["BONDS", "BEAT", "STOCKS"].forEach((t, i) => B.plate(0.44, 0.13, B.textTex(t, "#f8f4ea", i === 1 ? "#c0353a" : "#241726", 512, 152), 0, 0.15 - i * 0.15, 0.006, { in: H.page, d: 0.002, edge: "#f8f4ea" }));
        // ledgers stacks
        H.ledgers = [];
        const lc = ["#7a2a2a", "#2a4a3a", "#5a3a1a", "#2a3a5a"];
        for (let s = 0; s < 3; s++) for (let k = 0; k < 6; k++) H.ledgers.push(B.dyn(B.box(0.42, 0.1, 0.32, lc[(s + k) % 4], -0.75 + s * 0.02 + (s === 2 ? 1.65 : 0), 0.81 + k * 0.105, -1.15 + (s === 1 ? 0.35 : 0))));
        H.year = B.dyn(B.plate(0.9, 0.36, B.textTex("1866 – 1922", "#f2c14e", "#241726", 640, 256), -0.6, 2.4, -2.93, { d: 0.02 })); H.year.visible = false;
        B.plate(1.0, 0.36, B.textTex("NEW YORK · 1924", "#efe2c4", "#2a3a6a", 768, 276), -2.4, 2.3, -2.93, { d: 0.02, edge: "#c9a44a" });
        B.prop.lamp({ kind: "desk", x: -0.5, y: 0.81, z: -1.5, glow: "#bfffb0", col: "#2f7a4a" });
        B.prop.shelf({ x: -3.0, z: -2.6, w: 1.6 });
      },
      // the boxing ring: STOCKS (green corner) vs BONDS (blue corner), a spotlight, the round card
      ring: (B) => {
        B.set.stage({ floor: "#3a2a3a", back: "#1a1426" });
        B.box(4.4, RY, 4.4, "#e8e2d4", 0, 0, -1.0); B.box(4.6, 0.12, 4.6, "#c0353a", 0, RY - 0.12, -1.0);
        const posts = [[-2.1, -3.1, "#2f9a52"], [2.1, -3.1, "#2f5fb5"], [-2.1, 1.1, "#f4efe2"], [2.1, 1.1, "#f4efe2"]];
        for (const [x, z, c] of posts) B.cyl(0.07, 0.07, 1.3, c, x, RY, z);
        for (let r = 0; r < 3; r++) { const y = RY + 0.45 + r * 0.32; B.box(4.2, 0.04, 0.04, "#f4efe2", 0, y, -3.1); B.box(0.04, 0.04, 4.2, "#f4efe2", -2.1, y, -1.0); B.box(0.04, 0.04, 4.2, "#f4efe2", 2.1, y, -1.0); }
        B.plate(4.0, 0.7, B.textTex("STOCKS  vs  BONDS", "#241726", "#f2c14e", 1536, 268), 0, 3.6, -3.4, { d: 0.05, edge: "#c9a44a" });
        B.plate(2.4, 0.4, B.textTex("1866 – 1922", "#f2c14e", "#241726", 1024, 170), 0, 3.0, -3.4, { d: 0.03 });
        H.boost = B.dyn(B.prop.crate({ x: 0.8, y: RY, z: -1.3, size: 0.5, label: "EXTRA" }));
        // scoreboard: 10 green ticks and 1 blue
        H.ticks = [];
        for (let i = 0; i < 11; i++) { const t = B.dyn(B.box(0.22, 0.22, 0.05, i === 6 ? "#2f5fb5" : "#4fd18b", -1.4 + i * 0.28, 2.2, -3.35)); t.visible = false; H.ticks.push(t); }
        H.score = B.dyn(B.plate(1.8, 0.6, B.textTex("10 – 1", "#241726", "#4fd18b", 768, 256), 0, 1.75 + RY, -3.38, { d: 0.03 })); H.score.visible = false;
        B.lamp(0, 5, 0, "#fff2c8", 9, 14);
      },
      // a 1920s market square: the farmer's stall, a sack of seed, the soil plot that becomes a field
      market: (B) => {
        B.ground("cobble", 200, 200, { tile: 3 });
        B.facade({ style: "village", w: 6, x: -3.5, z: -7.5, seed: 12, col: "#c8a46a", floors: 2, sign: "" });
        B.facade({ style: "village", w: 6, x: 3.2, z: -7.8, seed: 31, col: "#8a5a6a", floors: 2, sign: "" });
        B.prop.table({ x: -1.6, z: -1.6, w: 2.0, d: 0.9, col: "planks:#a87a4a" });
        for (let i = 0; i < 3; i++) B.prop.crate({ x: -2.2 + i * 0.6, y: 0.78, z: -1.7, size: 0.5, label: ["CORN", "CORN", "WHEAT"][i], col: "planks:#c09a5a" });
        // striped awning
        B.box(2.4, 0.06, 1.4, "stripes:#c0353a:#f4efe2", -1.6, 2.4, -1.6); for (const x of [-2.7, -0.5]) B.cyl(0.04, 0.04, 2.4, "#5a3a24", x, 0, -1.0);
        H.sack = B.dyn(B.grp(-0.3, 0, -1.2, 0, 1));
        B.ball(0.34, "#d8c08a", 0, 0.32, 0, { in: H.sack, sx: 1, sy: 1.0 }); B.cone(0.12, 0.2, "#c8b07a", 0, 0.6, 0, { in: H.sack });
        B.plate(0.4, 0.18, B.textTex("SEED", "#f4efe2", "#5a3a1a", 512, 230), 0, 0.36, 0.33, { in: H.sack, d: 0.01 });
        // soil plot and the sprouts that grow into a field
        B.box(5.0, 0.06, 3.2, "dirt", 2.6, 0, -2.2);
        H.sprouts = [];
        for (let i = 0; i < 40; i++) { const x = 0.4 + (i % 8) * 0.6, z = -3.5 + Math.floor(i / 8) * 0.62;
          const g = B.dyn(B.grp(x, 0.06, z, 0, 1)); B.cone(0.12, 0.7, "leaves:#6ab84a", 0, 0, 0, { in: g, seg: 6 }); B.ball(0.07, "#f2c14e", 0, 0.68, 0, { in: g }); g.scale.setScalar(0.01); H.sprouts.push(g); }
        H.tag = B.dyn(B.grp(2.6, 3.6, -2.0, 0, 1));
        B.plate(1.9, 1.0, B.textTex("$$$$$", "#f2c14e", "#7a1a1a", 768, 404), 0, 0, 0, { in: H.tag, d: 0.08, edge: "#7a1a1a" });
        B.cyl(0.015, 0.015, 3, "#3a3a40", 0, 0.5, 0, { in: H.tag }); H.tag.visible = false;
        B.prop.tree({ x: 6.5, z: -5, kind: "oak" }); B.prop.fence({ x: 2.6, z: -0.5, w: 5 });
      },
      // metaphor stage: the company as a building — profits drop in, some go out as dividends, the rest builds new floors
      tower: (B) => {
        B.set.stage({ floor: "#e9e0cc", back: "#1f3a4a" });
        B.box(2.0, 0.9, 1.6, "brick:#a5503a", 0, 0, -1.6); B.box(1.9, 0.9, 1.5, "brick:#b8604a", 0, 0.9, -1.6);
        B.plate(1.6, 0.36, B.textTex("COMPANY", "#f4efe2", "#2a3a4a", 768, 172), 0, 0.5, -0.78, { d: 0.02 });
        H.floors = [];
        for (let i = 0; i < 5; i++) { const fl = B.dyn(B.box(1.9 - i * 0.08, 0.9, 1.5 - i * 0.06, i % 2 ? "brick:#a5503a" : "brick:#b8604a", 0, 1.8 + i * 0.9, -1.6)); fl.visible = false; H.floors.push(fl); }
        for (let i = 0; i < 2; i++) for (let k = 0; k < 3; k++) B.plate(0.3, 0.3, "glass:#ffe39a:lit", -0.55 + k * 0.55, 0.45 + i * 0.9, -0.84, { d: 0.02 });
        // hopper (KEEP) on the left, chute (DIVIDENDS) on the right
        B.cone(0.6, 0.8, "metal:#c9a44a", -1.7, 1.2, -1.4, { seg: 14 }).rotation.x = Math.PI;
        B.plate(1.3, 0.42, B.textTex("KEEP", "#2a6a2a", "#f4efe2", 512, 165), -1.7, 2.4, -1.2, { d: 0.02 });
        B.box(1.4, 0.1, 0.4, "metal:#8a8e96", 1.6, 1.4, -1.3, { ry: 0 }).rotation.z = -0.35;
        B.plate(1.4, 0.42, B.textTex("PAY OUT", "#2f5fb5", "#f4efe2", 640, 192), 1.7, 2.3, -1.2, { d: 0.02 });
        H.label = B.dyn(B.plate(2.0, 0.42, B.textTex("COMPOUNDING", "#f2c14e", "#241726", 1280, 269), 0, 6.6, -0.5, { d: 0.04 })); H.label.visible = false;
      },
      // Cambridge, England: Keynes's book-lined study, a reading chair, the blue book
      library: (B) => {
        B.set.room({ style: "library", w: 7, d: 6, h: 3.6, windows: [], door: false });
        B.prop.rug({ x: 0, z: -1.2, w: 3.2, d: 2.4, col: "#6a2a3a" });
        B.prop.table({ x: 0.9, z: -1.6, w: 0.9, d: 0.7 });
        H.book = B.dyn(B.grp(0.9, 0.79, -1.5, 0, 1)); B.box(0.36, 0.06, 0.5, "#2a4a8a", 0, 0, 0, { in: H.book });
        B.prop.lamp({ kind: "desk", x: 1.2, y: 0.78, z: -1.8, glow: "#ffe39a", col: "#8a2a2a" });
        B.plate(1.3, 0.4, B.textTex("CAMBRIDGE · 1925", "#efe2c4", "#4a2e1c", 768, 236), -1.8, 2.7, -2.92, { d: 0.02, edge: "#c9a44a" });
        B.prop.chair({ x: -0.3, z: -1.7, col: "#6a2a3a" });
        B.prop.globe({ x: -2.5, z: -2.2 });
      },
      // a jazz-age ballroom turned auction: chandelier, podium, the STOCKS certificate and its swelling price tag
      ballroom: (B) => {
        B.set.room({ style: "bank", wall: "wallpaper:#5a1e3a", floor: "tiles:#1a1a1a:#e8dcc0", w: 10, d: 7, h: 4.4, windows: [], door: false });
        H.chand = B.dyn(B.grp(0, 3.6, -1.0, 0, 1));
        B.cyl(0.01, 0.01, 0.8, "#c9a44a", 0, 0, 0, { in: H.chand }); B.cyl(0.7, 0.3, 0.3, "metal:#c9a44a", 0, -0.3, 0, { in: H.chand, open: true });
        for (let k = 0; k < 8; k++) B.ball(0.07, "#fff2c8", Math.cos(k * 0.785) * 0.65, -0.05, Math.sin(k * 0.785) * 0.65, { in: H.chand, cast: false });
        B.lamp(0, 3.3, -1.0, "#ffe3a0", 6, 10);
        // easel with certificate
        B.cyl(0.04, 0.04, 2.0, "#4a2e1c", 1.3, 0, -2.6); B.cyl(0.04, 0.04, 2.0, "#4a2e1c", 2.3, 0, -2.6);
        B.plate(1.4, 1.0, B.textTex("STOCKS", "#efe2c4", "#2a6a2a", 1280, 914), 1.8, 1.9, -2.5, { d: 0.04, edge: "#c9a44a" });
        H.tags = ["$", "$$", "$$$", "$$$$"].map((t, i) => { const p = B.dyn(B.plate(0.4 + i * 0.2, 0.4, B.textTex(t, "#f2c14e", "#7a1a1a", 256 + i * 128, 256), 1.8, 1.15, -2.42, { d: 0.03 })); p.visible = false; return p; });
        // podium
        B.box(0.9, 1.1, 0.6, "floor:#6a4630", -1.2, 0, -2.2); B.plate(0.7, 0.24, B.textTex("AUCTION", "#c9a44a", "#241726", 512, 176), -1.2, 0.8, -1.89, { d: 0.02 });
        H.gavel = B.dyn(B.grp(-1.0, 1.25, -2.0, 0, 1)); B.cyl(0.07, 0.07, 0.22, "#5a3a24", 0, 0, 0, { in: H.gavel, rz: Math.PI / 2 }); B.cyl(0.015, 0.015, 0.3, "#5a3a24", 0, -0.3, 0, { in: H.gavel });
        B.plate(1.8, 0.4, B.textTex("NEW YORK · 1929", "#c9a44a", "#241726", 1024, 228), -3.2, 3.1, -3.42, { d: 0.02 });
        H.books = [];
        for (let k = 0; k < 2; k++) { const bk = B.dyn(B.box(0.24, 0.32, 0.05, "#2a4a8a", 0, 0, 0)); bk.visible = false; H.books.push(bk); }
      },
    },
    shots: [
      // 0 · frame 0: typewriter keys hammering, the page rises — camera rushes in
      { set: "study", f: 0, light: "lamp", cam: CAM.fit([0.1, 1.2, -1.1], { w: 1.5, a0: -24, a1: 6, e0: 30, e1: 12, push: 0.3 }), coc: 11,
        act: (S, u, f) => { H.keys.forEach((k, i) => { k.position.y = 0.97 - 0.03 * (Math.sin(f * 1.9 + i * 2.1) > 0.4 ? 1 : 0); });
          H.page.position.y = 1.18 + 0.14 * E.prog(f, 0, 60);
          for (let q = 0; q < 3; q++) S.pop("label", 3 + q * 14, 16, { x: -0.35 + q * 0.4, y: 1.7, z: -0.9, w: 0.5, h: 0.2, text: "CLACK", col: "#3a3a40", pop: q === 0 });
          S.pop("label", W(0, "bad") - 2, 50, { x: 0.1, y: 1.85, z: -1.0, w: 1.0, h: 0.26, text: "STOCKS = BAD?", col: "#c0353a", hold: true }); } },
      // 1 · end up fuelling the Roaring Twenties: whip to the glittering ballroom party
      { set: "ballroom", word: [0, "end"], lead: 3, trans: "whip", light: K.light("interior", { sat: 1.2 }), cam: CAM.fit([0, 1.6, -1.0], { w: 5.4, a0: 14, a1: -2, elev: 6, push: 0.14 }),
        act: (S, u, f) => { H.chand.rotation.y = f * 0.02;
          S.actor("flap", { x: -1.2, z: -0.6, expr: "laugh", prop: "up", phase: f * 0.08 }); S.actor("sheik", { x: 0.4, z: -0.9, expr: "grin", prop: "wave", wave: (f % 20) / 20 }); S.actor("owner", { x: 1.6, z: -0.4, expr: "laugh", prop: "fists" });
          S.pop("confetti", W(0, "Roaring") - 4, 40, { x: 0, y: 3.0, z: -0.6, w: 4, h: 2 }); S.pop("label", W(0, "Roaring") - 2, 40, { x: 0, y: 3.0, z: -0.4, w: 2.0, h: 0.4, text: "ROARING 20s", col: "#c9a44a", hold: true }); } },
      // 2 · it's 1924: dissolve back to the office wide, Smith at the desk
      { set: "study", beat: 1, trans: "dissolve", light: "lamp", cam: CAM.fit([0.4, 1.3, -1.1], { w: 3.6, a0: -16, a1: -4, elev: 8, push: 0.12 }),
        act: (S, u, f) => { S.actor("smith", { x: 1.45, z: -0.7, expr: "smile", prop: "chin" });
          S.pop("impact", W(1, "nineteen") - 2, 40, { x: -0.5, y: 2.3, z: -0.8, w: 0.9, h: 0.45, text: "1924" }); } },
      // 3 · you're Edgar Lawrence Smith: closer, name card
      { set: "study", word: [1, "You're"], lead: 3, trans: "cut", light: "lamp", cam: CAM.fit([1.4, 1.5, -0.7], { w: 1.7, a0: 18, a1: 8, elev: 2, push: 0.12 }), coc: 9,
        act: (S, u, f) => { S.actor("smith", { x: 1.45, z: -0.7, expr: "stern", prop: "point", look: -0.5 });
          S.pop("label", W(1, "Edgar") - 2, 50, { x: 0.1, y: AH + 0.5, z: -0.2, w: 1.5, h: 0.28, text: "EDGAR LAWRENCE SMITH", col: "#5a5248", hold: true, x: 1.45, z: -0.5 }); } },
      // 4 · a pamphlet: bonds beat stocks — insert on the typewriter page
      { set: "study", word: [1, "pamphlet:"], lead: 3, trans: "cut", light: "lamp", steady: true, cam: CAM.fit([0.1, 1.3, -1.2], { w: 0.8, a0: -4, a1: 4, elev: 4, push: 0.12 }), coc: 12,
        act: (S, u, f) => { H.page.position.y = 1.32; S.pop("impact", W(1, "bonds") - 1, 34, { x: 0.1, y: 1.75, z: -1.0, w: 0.5, h: 0.24, text: "BONDS WIN!" }); } },
      // 5 · you test half a century of real prices: ledgers pile up, 1866–1922
      { set: "study", beat: 2, trans: "dissolve", light: K.light("lamp", { hemi: 1.3 }), cam: CAM.fit([-0.3, 1.25, -1.1], { w: 2.4, a0: 12, a1: 0, elev: 10, push: 0.12 }),
        act: (S, u, f) => { H.ledgers.forEach((l, i) => { l.visible = f >= S.a + i * 1.6; });
          H.year.visible = f >= W(2, "half") - 2; S.actor("smith", { x: 0.35, z: -0.3, expr: "nervous", prop: "paper" });
          S.pop("label", W(2, "century") - 2, 30, { x: -0.6, y: 2.0, z: -0.9, w: 1.0, h: 0.3, text: "50+ YEARS", col: "#2a3a6a" }); } },
      // 6 · stacking every test in favour of bonds: whip to the ring, BONDS stands on the EXTRA crate
      { set: "ring", word: [2, "stacking"], lead: 3, trans: "whip", light: K.backdrop("#1a1426"), cam: CAM.fit([0, RY + 1.1, -1.2], { w: 3.6, a0: -10, a1: 2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { const up = E.prog(f, W(2, "favour") - 6, W(2, "favour"));
          S.actor("stocks", { x: -0.8, y: RY, z: -1.2, expr: "stern", prop: "fists", look: 0.5 }); S.actor("bonds", { x: 0.8, y: RY + 0.5 * up, z: -1.3, expr: "grin", prop: "fists", look: -0.5 });
          S.fx("label", { x: -0.8, y: RY + 2.25, z: -1.0, w: 0.9, h: 0.24, text: "STOCKS", col: "#2f9a52" }); S.fx("label", { x: 0.8, y: RY + 2.25 + 0.5 * up, z: -1.0, w: 0.9, h: 0.24, text: "BONDS", col: "#2f5fb5" });
          S.pop("arrow", W(2, "bonds.") - 4, 30, { x: 1.4, y: RY + 1.4, z: -1.0, w: 0.3, h: 0.5, dir: "up" }); } },
      // 7 · stocks win: smash — the punch, bonds falls
      { set: "ring", beat: 3, trans: "smash", light: K.light("danger", { sat: 0.9 }), cam: CAM.fit([0.2, RY + 1.0, -1.2], { w: 3.0, a0: 10, a1: 4, elev: 4, push: 0.14 }),
        act: (S, u, f) => { const hit = W(3, "win.") - 2, down = f >= hit;
          S.actor("stocks", { x: -0.5 + 0.2 * E.prog(f, hit - 6, hit), y: RY, z: -1.2, expr: "grin", prop: down ? "up" : "fists", look: 0.5 });
          S.actor("bonds", { x: 0.9, y: RY + (down ? 0 : 0.5), z: -1.3, expr: down ? "dazed" : "shock", mode: down ? "fall" : "stand" });
          S.pop("impact", hit, 26, { x: 0.6, y: RY + 1.9, z: -1.0, w: 1.2, h: 0.6, text: "POW!" }); S.kick(hit, 0.08); S.pop("stars", hit + 4, 26, { x: 0.9, y: RY + 0.8, z: -1.0, w: 0.8, h: 0.4 }); } },
      // 8 · then they win again: round card TEST 2, another knockdown
      { set: "ring", word: [3, "Then"], lead: 2, trans: "whip", dir: -1, light: K.backdrop("#1a1426"), cam: CAM.fit([0, RY + 1.0, -1.2], { w: 3.4, a0: -14, a1: -6, elev: 8, push: 0.12 }),
        act: (S, u, f) => { const hit = W(3, "again.") - 2, down = f >= hit;
          S.actor("stocks", { x: -0.6, y: RY, z: -1.2, expr: "grin", prop: "fists", look: 0.5 }); S.actor("bonds", { x: 0.8, y: RY, z: -1.3, expr: down ? "dazed" : "stern", mode: down ? "fall" : "stand" });
          S.pop("label", S.a + 2, 30, { x: 0, y: RY + 2.4, z: -0.8, w: 1.0, h: 0.32, text: "TEST 2", col: "#c0353a" }); S.pop("impact", hit, 22, { x: 0.6, y: RY + 1.6, z: -1.0, w: 1.0, h: 0.5, text: "BAM!" }); S.kick(hit, 0.06); } },
      // 9 · eleven tests, and bonds take one: the scoreboard fills, 10–1
      { set: "ring", word: [3, "Eleven"], lead: 2, trans: "cut", light: K.backdrop("#1a1426"), steady: true, cam: CAM.fit([0, 2.4, -3.0], { w: 3.6, a0: 4, a1: -4, elev: 4, push: 0.1 }), coc: 9,
        act: (S, u, f) => { H.ticks.forEach((t, i) => { t.visible = f >= W(3, "Eleven") + i * 2; }); H.score.visible = f >= W(3, "one.") - 2;
          S.pop("label", W(3, "one.") - 2, 30, { x: 1.4, y: 2.9, z: -2.8, w: 0.9, h: 0.3, text: "BONDS: 1", col: "#2f5fb5" }); } },
      // 10 · how do ordinary shares beat the safest investment? Smith at night, puzzled
      { set: "study", beat: 4, trans: "whip", light: K.light("night", { hemi: 1.45 }), cam: CAM.fit([1.3, 1.4, -0.8], { w: 2.0, a0: -12, a1: 0, elev: 4, push: 0.14 }),
        act: (S, u, f) => { S.actor("smith", { x: 1.45, z: -0.7, expr: "nervous", prop: "shrug" });
          S.pop("question", W(4, "How") - 2, 60, { x: 2.0, y: AH + 0.45, z: -0.2, w: 0.3, h: 0.45, hold: true }); S.pop("question", W(4, "safest") - 2, 30, { x: 0.85, y: AH + 0.35, z: -0.2, w: 0.26, h: 0.4 }); } },
      // 11 · you see, a farmer sells his crop: push-through into the market square
      { set: "market", beat: 5, trans: "zoom", light: K.light("golden", { sat: 1.15 }), cam: CAM.fit([-1.4, 1.4, -1.4], { w: 3.4, a0: 16, a1: 4, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("farmer", { x: -1.6, z: -2.4, expr: "grin", prop: "hold" }); S.actor("owner", { x: -0.4, z: -0.3, expr: "smile", prop: "point", look: -0.6, key: "buyer" });
          S.pop("coin", W(5, "sells") - 2, 24, { x: -1.0, y: 1.6, z: -1.2, w: 0.25, h: 0.25, rise: 0.4 }); S.pop("coin", W(5, "crop,") - 2, 24, { x: -0.7, y: 1.5, z: -1.2, w: 0.22, h: 0.22, rise: 0.4, pop: false }); } },
      // 12 · but keeps back a sack of seed: insert, the sack slides aside
      { set: "market", word: [5, "keeps"], lead: 3, trans: "cut", light: K.light("golden", { sat: 1.15 }), steady: true, cam: CAM.fit([-0.4, 0.55, -1.1], { w: 1.4, a0: 8, a1: -2, elev: 14, push: 0.12 }), coc: 11,
        act: (S, u, f) => { H.sack.position.x = -0.3 + 0.35 * E.prog(f, W(5, "back"), W(5, "seed.")); S.pop("label", W(5, "seed.") - 2, 30, { x: 0.05, y: 1.2, z: -1.0, w: 0.6, h: 0.24, text: "KEEP", col: "#2a6a2a" }); } },
      // 13 · next year, that seed grows a bigger field: dissolve, the plot sprouts row by row
      { set: "market", beat: 6, trans: "dissolve", light: K.light("sunset", { sat: 1.1 }), cam: CAM.fit([1.5, 1.0, -1.6], { w: 4.8, a0: -18, a1: -6, elev: 14, push: 0.12 }),
        act: (S, u, f) => { H.sprouts.forEach((g, i) => { g.scale.setScalar(0.01 + 0.99 * E.prog(f, S.a + 4 + i * 1.0, S.a + 12 + i * 1.0)); });
          S.actor("farmer", { x: 0.0, z: 0.2, expr: "laugh", prop: "up" });
          S.pop("label", W(6, "Next") - 1, 40, { x: 2.0, y: 2.3, z: -1.0, w: 1.8, h: 0.45, text: "NEXT YEAR", col: "#5a3a1a", hold: true }); } },
      // 14 · good companies do the same: whip to the company building on the stage, profits fall in
      { set: "tower", beat: 7, trans: "whip", light: K.backdrop("#1f3a4a"), cam: CAM.fit([0, 1.7, -1.4], { w: 4.6, a0: 12, a1: 2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { const k = E.prog(f, W(7, "back"), W(7, "business.") + 4); H.floors[0].visible = k > 0; H.floors[0].scale.y = Math.max(0.01, k);
          for (let q = 0; q < 5; q++) S.pop("coin", S.a + 2 + q * 6, 24, { x: -1.7 + (q % 2) * 0.3, y: 3.2, z: -1.2, w: 0.25, h: 0.25, rise: -1.2, pop: q === 0 });
          S.pop("coin", W(7, "part") - 2, 24, { x: 2.0, y: 1.7, z: -1.0, w: 0.25, h: 0.25, rise: -0.6 });
          S.pop("label", W(7, "ploughing") - 2, 50, { x: -1.2, y: 3.2, z: -1.0, w: 1.7, h: 0.42, text: "REINVEST", col: "#2a6a2a", hold: true }); } },
      // 15 · back into the business: insert, the new floor rises; the owner grins
      { set: "tower", word: [7, "back"], lead: 2, trans: "cut", light: K.backdrop("#1f3a4a"), cam: CAM.fit([0.6, 1.9, -1.0], { w: 3.0, a0: -14, a1: -4, elev: 8, push: 0.12 }),
        act: (S, u, f) => { const k = E.prog(f, W(7, "back"), W(7, "business.") + 4); H.floors[0].visible = true; H.floors[0].scale.y = Math.max(0.01, k);
          S.actor("owner", { x: 1.6, z: -0.2, expr: "grin", prop: "point", look: -0.6 }); S.pop("sparks", W(7, "business.") - 2, 24, { x: 0, y: 2.6, z: -0.8, w: 1.2, h: 0.5 }); } },
      // 16 · Keynes calls it: whip to Cambridge, Keynes reading the blue book
      { set: "library", beat: 8, trans: "whip", light: "lamp", cam: CAM.fit([0.2, 1.3, -1.4], { w: 2.6, a0: 14, a1: 4, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("keynes", { x: 0.1, z: -1.2, expr: "stern", prop: "paper" });
          S.pop("label", W(8, "Keynes") - 2, 50, { x: 0.1, y: AH + 0.5, z: -1.0, w: 1.3, h: 0.28, text: "J. M. KEYNES", col: "#6a5a3a", hold: true }); } },
      // 17 · the book's most important point: closer, the bubble
      { set: "library", word: [8, "most"], lead: 3, trans: "cut", light: "lamp", cam: CAM.fit([0.1, 1.5, -1.2], { w: 1.4, a0: -10, a1: -2, elev: 2, push: 0.12 }), coc: 9,
        act: (S, u, f) => { S.actor("keynes", { x: 0.1, z: -1.2, expr: "shock", prop: "up" });
          S.say("MOST IMPORTANT POINT!", W(8, "most") - 2, 40, { x: 0.15, y: AH + 0.62, z: -0.9, w: 1.25, h: 0.5 }); S.pop("bulb", W(8, "important") - 2, 30, { x: -0.5, y: AH + 0.35, z: -0.9, w: 0.3, h: 0.35 }); } },
      // 18 · compound interest, working for the shareholder: the tower shoots up floor by floor
      { set: "tower", word: [8, "compound"], lead: 3, trans: "whip", light: K.light("golden", { sat: 1.1 }), cam: CAM.fit([0.2, 2.8, -1.2], { w: 5.4, a0: 10, a1: -2, e0: 4, e1: 14, push: 0.12 }),
        act: (S, u, f) => { H.floors.forEach((fl, i) => { const k = E.prog(f, S.a + i * 7, S.a + i * 7 + 6); fl.visible = k > 0 || i === 0; fl.scale.y = i === 0 ? 1 : Math.max(0.01, k); });
          H.label.visible = f >= W(8, "interest,") - 2; H.label.position.y = 2.6 + 3.0 * E.prog(f, S.a, S.a + 34);
          S.actor("owner", { x: 1.7, z: -0.2, expr: "laugh", prop: "up" }); S.pop("label", W(8, "shareholder.") - 2, 30, { x: 1.7, y: AH + 0.5, z: 0.0, w: 1.3, h: 0.28, text: "SHAREHOLDER", col: "#7a3a6a" }); } },
      // 19 · then Wall Street reads it: whip to the 1929 ballroom, everyone waving the blue book
      { set: "ballroom", beat: 9, trans: "whip", light: K.light("interior", { sat: 1.15 }), cam: CAM.fit([0, 1.5, -0.8], { w: 4.6, a0: -12, a1: 0, elev: 6, push: 0.12 }),
        act: (S, u, f) => { S.actor("flap", { x: -0.4, z: -0.5, expr: "grin", prop: "hold" }); S.actor("sheik", { x: 0.7, z: -0.8, expr: "laugh", prop: "hold" }); S.actor("auct", { x: -1.2, z: -2.6, expr: "grin", prop: "point" });
          H.books.forEach((b) => (b.visible = true)); H.books[0].position.set(-0.4, 1.15 + 0.04 * Math.sin(f * 0.5), -0.2); H.books[1].position.set(0.7, 1.15 + 0.04 * Math.sin(f * 0.5 + 1), -0.5);
          S.pop("label", W(9, "reads") - 2, 40, { x: 0, y: 2.9, z: -0.6, w: 1.6, h: 0.3, text: "THE BOOK", col: "#2a4a8a" }); } },
      // 20 · and hears only: stocks always win — bidder's bubble
      { set: "ballroom", word: [9, "hears"], lead: 3, trans: "cut", light: K.light("interior", { sat: 1.15 }), cam: CAM.fit([0.3, 1.55, -0.8], { w: 1.6, a0: 14, a1: 6, elev: 2, push: 0.12 }), coc: 9,
        act: (S, u, f) => { S.actor("sheik", { x: 0.3, z: -0.8, expr: "laugh", prop: "fists" });
          S.say("STOCKS ALWAYS WIN!", W(9, "stocks") - 3, 36, { x: 0.35, y: AH + 0.6, z: -0.5, w: 1.2, h: 0.5 }); } },
      // 21 · at any price: the auction — gavel, the price tag swells $ → $$$$
      { set: "ballroom", word: [9, "at"], lead: 2, trans: "whip", light: K.light("interior", { sat: 1.2 }), cam: CAM.fit([0.3, 1.5, -2.0], { w: 4.4, a0: -10, a1: 0, elev: 4, push: 0.14 }),
        act: (S, u, f) => { const t0 = S.a; H.tags.forEach((t, i) => { t.visible = f >= t0 + i * 5 && f < t0 + (i + 1) * 5 || (i === 3 && f >= t0 + 15); });
          H.gavel.rotation.z = 0.5 * Math.abs(Math.sin(f * 0.6)); S.actor("auct", { x: -1.2, z: -2.6, expr: "laugh", prop: "up" });
          S.pop("impact", W(9, "price.") - 1, 30, { x: 1.3, y: 2.9, z: -1.8, w: 1.1, h: 0.5, text: "SOLD!" }); S.kick(W(9, "price."), 0.04); } },
      // 22 · then comes October 1929: the lights die, the chandelier sways, tags fall, shock
      { set: "ballroom", beat: 10, trans: "flash", light: K.light("storm", { sat: 0.7 }), cam: CAM.fit([0.2, 1.6, -1.4], { w: 4.2, a0: 6, a1: -4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.chand.rotation.z = 0.25 * Math.sin((f - S.a) * 0.25) * (1 - u * 0.5); H.tags[3].visible = true; H.tags[3].position.y = 1.15 - 1.0 * E.prog(f, W(10, "twenty-nine.") - 4, W(10, "twenty-nine.") + 6); H.tags[3].rotation.z = 0.8 * E.prog(f, W(10, "twenty-nine.") - 4, W(10, "twenty-nine.") + 6);
          S.actor("flap", { x: -1.0, z: -0.5, expr: "shock", prop: "up" }); S.actor("sheik", { x: 0.4, z: -0.8, expr: "dazed", prop: "shrug" });
          S.pop("impact", W(10, "October,") - 2, 50, { x: 0, y: 2.5, z: 0.0, w: 1.8, h: 0.6, text: "OCT 1929", hold: true }); S.kick(W(10, "October,"), 0.07);
          for (let q = 0; q < 4; q++) S.pop("paper", W(10, "nineteen") + q * 4, 30, { x: -1.5 + q, y: 3.0, z: -0.6, w: 0.35, h: 0.45, rise: -1.5, spin: 2, pop: q === 0 }); } },
      // 23 · the seed was real: dissolve to the field at sunset, full and glowing
      { set: "market", beat: 11, trans: "dissolve", light: K.light("sunset", { sat: 1.2 }), cam: CAM.fit([1.6, 1.2, -1.4], { w: 4.6, a0: 14, a1: 6, elev: 10, push: 0.1 }),
        act: (S, u, f) => { H.sprouts.forEach((g) => g.scale.setScalar(1)); S.actor("farmer", { x: 0.5, z: 0.3, expr: "smile", prop: "chin" });
          S.pop("glow", W(11, "real.") - 4, 30, { x: 2.6, y: 0.8, z: -2.0, w: 4.2, h: 1.6 }); } },
      // 24 · the price of the field: the giant $$$$$ tag swings above it
      { set: "market", word: [11, "price"], lead: 3, trans: "cut", light: K.light("sunset", { sat: 1.2 }), cam: CAM.fit([2.0, 2.0, -1.4], { w: 3.6, a0: -10, a1: -2, e0: 4, e1: 12, push: 0.08 }),
        act: (S, u, f) => { H.sprouts.forEach((g) => g.scale.setScalar(1)); const hit = W(11, "wasn't.") + 1;
          H.tag.visible = true; const k = E.prog(f, hit - 3, hit + 3); H.tag.position.y = 3.6 - 3.0 * k; H.tag.rotation.z = 0.08 * Math.sin(f * 0.3) * (1 - k) - 0.35 * k;
          S.actor("farmer", { x: 1.3, z: 0.3, expr: f >= hit ? "shock" : "stern", prop: f >= hit ? "up" : "chin", look: 0.6 });
          S.pop("impact", hit, 40, { x: 2.0, y: 2.1, z: 0.2, w: 1.5, h: 0.7, text: "CRASH!", hold: true }); S.kick(hit, 0.14); S.pop("puff", hit, 30, { x: 2.6, y: 0.5, z: -1.6, w: 2.4, h: 1.0 }); } },
    ],
  };
};
