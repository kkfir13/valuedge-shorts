// "The Day the Market Forgot How to Subtract" (3Com / Palm carve-out, March 2000) — film module.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const AH = 1.58;
  const H = {};
  // Palm day one: $38 → $165 high → $95 close (y = price / 180)
  const palmCurve = (x) => (x < 0.35 ? 0.21 + 0.71 * (x / 0.35) : 0.92 - 0.39 * Math.pow((x - 0.35) / 0.65, 0.6)) + 0.015 * Math.sin(x * 40);
  // 3Com day one: $104 → $81.81
  const comCurve = (x) => 0.75 - 0.36 * x + 0.025 * Math.sin(x * 26);

  return {
    cast: {
      dan: { jacket: "#d8502a", pants: "#3a4a7a", boots: "#e8e4dc", hat: "cap", cap: "#2a5ab5", capColor: "#2a5ab5", skin: "#f0c8a0" },
      eng: { jacket: "#e8e6f0", pants: "#2a2d38", boots: "#1a1418", hat: "hair", hair: "#3a2a1c", skin: "#e0a878", buttons: "#2a5ab5" },
      boss: { jacket: "#2a2d38", pants: "#2a2d38", boots: "#1a1418", hat: "hair", hair: "#8a8a8a", skin: "#f3cfae", buttons: "#c0353a" },
      trader: { jacket: "#2f6a9a", pants: "#2a2d38", boots: "#1a1418", hat: "hair", hair: "#5a3a24", skin: "#c88a60" },
      fan: { jacket: "#8a3ab5", pants: "#2a2d38", boots: "#e8e4dc", hat: "beanie", cap: "#f2c14e", skin: "#f8d2b4", dress: "#8a3ab5" },
      clerk: { jacket: "#f2c14e", pants: "#2a2d38", boots: "#1a1418", hat: "cap", cap: "#2a4ab5", capColor: "#2a4ab5", skin: "#e8b48a", moustache: "#3a2a1c" },
    },
    sets: {
      // Times-Square-style plaza at night, March 2000: two giant price screens, a ticker strip, a newsstand
      square: (B) => {
        B.set.city({ seed: 5, lit: true });
        H.palm = B.prop.screen({ x: -1.5, z: -5, w: 2.6, h: 1.8, y0: 2.0, label: "PALM", curve: palmCurve, bg: "#0e1a2c", line: "#4fd18b", stand: false, frame: "#1a1a22" });
        H.com = B.prop.screen({ x: 1.6, z: -5, w: 2.6, h: 1.8, y0: 2.0, label: "3COM", curve: comCurve, bg: "#1a0e1c", down: true, stand: false, frame: "#1a1a22" });
        B.box(6.4, 2.0, 0.3, "metal:#2a2d36", 0, 0, -5.2); B.box(6.6, 0.5, 0.35, "#101014", 0, 4.05, -5.15);
        H.tick = B.dyn(B.plate(6.4, 0.42, B.textTex("PALM 95.06 ▲   3COM 81.81 ▼   NASDAQ ▲   PALM 95.06 ▲   3COM 81.81 ▼", "#101014", "#ffd25a", 2600, 170), 0, 4.06, -4.96, { d: 0.01 }));
        B.plate(2.0, 0.42, B.textTex("MARCH 2, 2000", "#c0353a", "#f4efe2", 900, 190), 0, 4.75, -5.1, { d: 0.03 });
        // newsstand kiosk
        B.box(1.6, 1.9, 1.0, "metal:#2f6a4a", 3.6, 0, -1.4); B.box(1.9, 0.12, 1.3, "#c0353a", 3.6, 1.95, -1.3);
        H.papers = [];
        for (let k = 0; k < 4; k++) H.papers.push(B.dyn(B.plate(0.34, 0.46, B.textTex(k % 2 ? "?!" : "< 0", "#f4efe2", "#241726", 512, 690), 3.0 + k * 0.4, 1.15, -0.88, { d: 0.01 })));
        B.plate(1.2, 0.26, B.textTex("NEWS", "#f2c14e", "#241726", 512, 110), 3.6, 1.7, -0.88, { d: 0.02 });
        B.prop.lampPost({ x: -3.2, z: -1.0 }); B.prop.lampPost({ x: 2.2, z: 1.2 });
        B.lamp(0, 3.5, -3.6, "#9ad8ff", 5, 10);
      },
      // Dan's apartment, 2000: mustard walls, beige computer with a dial-up glow, pizza box, calendar
      den: (B) => {
        B.set.room({ style: "home", wall: "plaster:#d8b85a", floor: "carpet:#3a4a7a", w: 7, d: 5.4, h: 3.0, windows: [-2.2], door: false });
        B.prop.desk({ x: 0.4, z: -1.6, w: 1.8 });
        B.box(0.62, 0.5, 0.5, "#e8e0c8", 0.4, 0.8, -1.8); // beige CRT
        H.crt = B.prop.screen({ x: 0.4, z: -1.54, w: 0.48, h: 0.34, y0: 0.88, label: "3COM", curve: comCurve, bg: "#0e1a2c", down: true, frame: "#e8e0c8" });
        B.box(0.5, 0.03, 0.18, "#e8e0c8", 0.4, 0.8, -1.25);
        B.box(0.5, 0.06, 0.5, "#e8c88a", -0.5, 0.8, -1.6); B.plate(0.42, 0.14, B.textTex("PIZZA", "#c0353a", "#f4efe2", 512, 170), -0.5, 0.87, -1.6, { d: 0.005, rx: -Math.PI / 2 });
        B.plate(0.7, 0.9, B.textTex("MARCH 2000", "#f4efe2", "#c0353a", 512, 660), 1.9, 1.8, -2.65, { d: 0.02, edge: "#2a2d36" });
        B.plate(1.0, 0.6, B.textTex("DOT COM!", "#2a5ab5", "#f2c14e", 800, 480), -1.0, 2.1, -2.65, { d: 0.02 });
        B.prop.chair({ x: 0.4, z: -0.9, col: "#3a3a40" });
        B.prop.lamp({ kind: "desk", x: 1.15, y: 0.8, z: -1.9, glow: "#ffe39a", col: "#c0353a" });
        H.cert = B.dyn(B.grp(0, 0, 0, 0, 1)); B.plate(0.5, 0.34, B.textTex("3COM · 1 SHARE", "#efe2c4", "#2a5a3a", 640, 435), 0, 0, 0, { in: H.cert, d: 0.01, edge: "#c9a44a" }); H.cert.visible = false;
      },
      // 3Com headquarters: grey carpet, server racks with blinking lights, the big 3COM crate with Palm inside
      hq: (B) => {
        B.set.room({ style: "modern", wall: "concrete:#cfd6dc", floor: "carpet:#5a6a8a", w: 11, d: 7, h: 3.4, windows: [], door: false });
        H.leds = [];
        for (let r = 0; r < 4; r++) { const x = 1.2 + r * 0.8; B.box(0.6, 2.0, 0.6, "metal:#2a2d36", x, 0, -2.9);
          for (let k = 0; k < 6; k++) { const l = B.dyn(B.box(0.06, 0.04, 0.02, k % 2 ? "#4fd18b" : "#ffd25a", x - 0.18 + (k % 3) * 0.12, 0.5 + Math.floor(k / 3) * 0.6 + r * 0.05, -2.59)); H.leds.push(l); } }
        B.plate(2.6, 0.4, B.textTex("NETWORKS", "#2a5ab5", "#f4efe2", 1024, 158), 2.4, 2.45, -3.42, { d: 0.02 });
        B.plate(2.2, 0.5, B.textTex("3COM", "#f4efe2", "#2a5ab5", 900, 205), -2.4, 2.6, -3.42, { d: 0.02, edge: "#2a5ab5" });
        // big crate, front lid hinged at the bottom
        B.box(1.6, 0.06, 1.2, "planks:#c09a5a", -2.4, 0, -2.2); B.box(1.6, 0.06, 1.2, "planks:#c09a5a", -2.4, 1.44, -2.2); B.box(1.6, 1.5, 0.06, "planks:#a07a3a", -2.4, 0, -2.77); B.box(0.06, 1.5, 1.2, "planks:#b08a4a", -3.17, 0, -2.2); B.box(0.06, 1.5, 1.2, "planks:#b08a4a", -1.63, 0, -2.2);
        H.lid = B.dyn(B.grp(-2.4, 0.02, -1.58, 0, 1));
        B.box(1.6, 1.5, 0.06, "planks:#b08a4a", 0, 0.0, 0, { in: H.lid }); B.plate(1.2, 0.4, B.textTex("3COM", "#c09a5a", "#241726", 512, 170), 0, 0.85, 0.04, { in: H.lid, d: 0.005 });
        // the handheld (Palm) on a little pedestal inside the crate
        H.hand = B.dyn(B.grp(-2.4, 0.4, -2.0, 0, 1));
        B.box(0.42, 0.66, 0.08, "metal:#8a8e96", 0, 0.33, 0, { in: H.hand }); B.plate(0.32, 0.34, "#9ad8a0", 0, 0.44, 0.045, { in: H.hand, d: 0.005 });
        B.plate(0.3, 0.1, B.textTex("PALM", "#8a8e96", "#f4efe2", 512, 170), 0, 0.17, 0.045, { in: H.hand, d: 0.005 });
        // the Palm block and its sliver (for the IPO)
        H.block = B.dyn(B.grp(0, 0, -1.2, 0, 1));
        B.box(1.5, 1.2, 0.9, "#4fa86a", 0, 0, 0, { in: H.block }); B.plate(1.2, 0.36, B.textTex("PALM 95%", "#4fa86a", "#f4efe2", 768, 230), 0, 0.75, 0.46, { in: H.block, d: 0.005 });
        H.sliver = B.dyn(B.grp(0.82, 0, -1.2, 0, 1)); B.box(0.1, 1.2, 0.9, "#7fd18b", 0, 0, 0, { in: H.sliver });
        H.block.visible = false; H.sliver.visible = false;
        H.tag = B.dyn(B.grp(2.0, 2.4, -2.2, 0, 1));
        B.plate(1.3, 0.7, B.textTex("−$63", "#c0353a", "#f4efe2", 640, 345), 0, 0, 0, { in: H.tag, d: 0.06, edge: "#7a1a1a" }); B.cyl(0.012, 0.012, 1.2, "#3a3a40", 0, 0.35, 0, { in: H.tag });
        H.tag.visible = false;
        B.prop.plant({ x: -4.6, z: -2.6 }); B.prop.lamp({ kind: "hang", x: 0, y: 3.4, z: -1.5, glow: "#e8f4ff" });
      },
      // metaphor stage: a giant wallet on a pedestal, $140 inside, a price tag reading $80
      wallet: (B) => {
        B.set.stage({ floor: "#f4e6c8", back: "#d8642a" });
        B.prop.pedestal({ x: 0, z: -1.8, r: 1.5, h: 0.5 });
        B.box(2.2, 0.9, 0.36, "#6a3a1e", 0, 0.5, -1.8); // wallet back half
        B.box(2.24, 0.03, 0.4, "#e8c88a", 0, 0.52, -1.8); B.box(0.03, 0.9, 0.4, "#e8c88a", -1.1, 0.5, -1.8); B.box(0.03, 0.9, 0.4, "#e8c88a", 1.1, 0.5, -1.8);
        H.bills = [];
        for (let k = 0; k < 3; k++) { const b = B.plate(0.9, 0.5, B.textTex(k === 1 ? "$140" : "$", "#7fb86a", "#1f4a2a", 512, 285), -0.6 + k * 0.6, 1.55 + (k % 2) * 0.1, -1.8 + 0.05 * k, { d: 0.01 }); b.rotation.z = (k - 1) * 0.2; H.bills.push(B.dyn(b)); }
        H.flap = B.dyn(B.grp(0, 1.4, -1.6, 0, 1)); // front flap hinged at top: rotation.x opens it upward/backwards
        B.box(2.2, 0.9, 0.12, "#8a4a26", 0, -0.9, 0.06, { in: H.flap }); B.box(2.0, 0.04, 0.02, "#e8c88a", 0, -0.2, 0.13, { in: H.flap }); B.cyl(0.09, 0.09, 0.04, "metal:#c9a44a", 0, -0.8, 0.14, { in: H.flap, rx: Math.PI / 2 });
        H.price = B.dyn(B.grp(1.6, 1.9, -1.0, 0, 1));
        B.plate(0.9, 0.5, B.textTex("$80", "#f2c14e", "#7a1a1a", 512, 285), 0, 0, 0, { in: H.price, d: 0.04, edge: "#7a1a1a" }); B.cyl(0.01, 0.01, 0.8, "#3a3a40", -0.3, 0.3, 0, { in: H.price, rz: 0.6 });
        H.price.visible = false;
        H.hg = B.dyn(B.prop.hourglass({ x: -2.4, z: -1.4, size: 1.2 })); H.hg.visible = false;
        B.lamp(0, 4.5, 0.5, "#fff2c8", 7, 12);
      },
      // a 2000 video-rental-style shop where you borrow shares: striped walls, counter, empty shelves
      rental: (B) => {
        B.set.room({ style: "studio", wall: "stripes:#2a4ab5:#3a5ac5", floor: "tiles:#e8e6e2:#c8c4bc", w: 8, d: 6, h: 3.2, windows: [], door: false });
        B.prop.counter({ x: 0, z: -0.9, w: 2.6 });
        B.plate(2.8, 0.5, B.textTex("BORROW PALM", "#f2c14e", "#241726", 1400, 250), 0, 2.55, -2.92, { d: 0.02, edge: "#c0353a" });
        H.shelfItems = [];
        for (let s = 0; s < 2; s++) { const x = s ? 2.4 : -2.4; B.prop.shelf({ x, z: -2.6, w: 1.6 }); B.box(1.5, 0.04, 0.3, "#5a3b2a", x, 1.0, -2.25);
          for (let k = 0; k < 4; k++) { const it = B.dyn(B.box(0.22, 0.32, 0.18, "#4fa86a", x - 0.5 + k * 0.33, 1.05, -2.25)); H.shelfItems.push(it); } }
        H.sold = B.dyn(B.grp(0, 1.9, -2.4, 0, 1)); B.plate(1.8, 0.6, B.textTex("SOLD OUT", "#c0353a", "#f4efe2", 900, 300), 0, 0, 0, { in: H.sold, d: 0.05 }); H.sold.visible = false;
        B.prop.lamp({ kind: "hang", x: 0, y: 3.2, z: -1.2, glow: "#fff2c8" });
      },
    },
    shots: [
      // 0 · frame 0: night plaza, the 3COM screen drawing its fall, camera rushing in
      { set: "square", f: 0, light: "neon", cam: CAM.fit([0.1, 3.1, -5], { w: 4.8, a0: -22, a1: 4, e0: -2, e1: 6, push: 0.35 }),
        act: (S, u, f) => { H.palm.draw({ t: 1 }); H.com.draw({ t: 0.3 + 0.7 * E.prog(f, 0, 120) }); H.tick.position.x = 1.5 - f * 0.02;
          S.pop("impact", W(0, "March") - 2, 46, { x: 0, y: 1.6, z: -4.6, w: 1.6, h: 0.6, text: "2000", hold: true });
          S.pop("arrow", W(0, "market") - 2, 40, { x: 2.8, y: 3.2, z: -4.6, w: 0.5, h: 0.8, dir: "down" }); } },
      // 1 · a profitable business below zero: the server room, the price tag slides below zero
      { set: "hq", word: [0, "profitable"], lead: 3, trans: "whip", light: "office", cam: CAM.fit([2.2, 1.6, -2.4], { w: 3.4, a0: 14, a1: 2, elev: 6, push: 0.14 }),
        act: (S, u, f) => { H.leds.forEach((l, i) => (l.visible = Math.sin(f * 0.5 + i * 1.7) > -0.2));
          S.actor("eng", { x: 1.6, z: -1.6, expr: "smile", prop: "hold" });
          S.pop("label", W(0, "profitable") - 1, 30, { x: 2.6, y: 2.3, z: -1.8, w: 1.4, h: 0.32, text: "PROFITABLE", col: "#2a6a2a" });
          S.pop("impact", W(0, "zero.") - 2, 40, { x: 2.4, y: 2.2, z: -1.4, w: 1.4, h: 0.6, text: "BELOW $0" }); S.kick(W(0, "zero."), 0.06); } },
      // 2 · imagine you own Three Com: Dan in his apartment holding the share certificate
      { set: "den", beat: 1, trans: "whip", dir: -1, light: "lamp", cam: CAM.fit([0.3, 1.3, -1.0], { w: 2.6, a0: -16, a1: -4, elev: 6, push: 0.14 }),
        act: (S, u, f) => { H.crt.draw({ t: 0.15 }); S.actor("dan", { x: 0.9, z: -0.6, expr: "grin", prop: "paper", look: -0.4 });
          S.pop("label", W(1, "Imagine") - 1, 40, { x: 0.9, y: AH + 0.55, z: -0.4, w: 0.8, h: 0.28, text: "YOU", col: "#d8502a", hold: true });
          S.pop("label", W(1, "Three") - 2, 40, { x: -0.2, y: 2.0, z: -0.8, w: 1.4, h: 0.32, text: "3COM SHARE", col: "#2a5a3a" }); } },
      // 3 · it sells computer networks: back to HQ, engineers at the racks
      { set: "hq", word: [1, "sells"], lead: 3, trans: "dissolve", light: "office", cam: CAM.fit([2.4, 1.4, -2.0], { w: 3.0, a0: -10, a1: 2, elev: 4, push: 0.12 }),
        act: (S, u, f) => { H.leds.forEach((l, i) => (l.visible = Math.sin(f * 0.6 + i * 1.3) > -0.3));
          S.actor("eng", { x: 1.6, z: -1.8, expr: "grin", prop: "point", look: 0.5 }); S.actor("eng", { key: "eng2", x: 3.2, z: -1.6, expr: "smile", prop: "hold" });
          S.pop("sparks", W(1, "networks.") - 3, 24, { x: 2.4, y: 1.6, z: -2.4, w: 1.6, h: 0.6 }); } },
      // 4 · inside it sits Palm: the crate's lid falls open, the handheld glows
      { set: "hq", beat: 2, trans: "cut", light: K.light("office", { hemi: 1.1 }), cam: CAM.fit([-2.4, 1.0, -1.8], { w: 2.2, a0: 10, a1: 0, elev: 6, push: 0.14 }),
        act: (S, u, f) => { const k = E.prog(f, W(2, "sits") - 4, W(2, "Palm,") + 2); H.lid.rotation.x = 1.45 * k;
          S.pop("glow", W(2, "Palm,") - 2, 40, { x: -2.4, y: 0.75, z: -2.6, w: 0.9, h: 0.9 });
          S.pop("label", W(2, "Palm,") - 1, 40, { x: -2.4, y: 1.95, z: -1.6, w: 0.9, h: 0.3, text: "PALM", col: "#2a6a2a", hold: true }); } },
      // 5 · the hottest handheld computer: insert, the device in a fire aura
      { set: "hq", word: [2, "hottest"], lead: 3, trans: "cut", light: K.light("office", { hemi: 1.1 }), steady: true, cam: CAM.fit([-2.4, 0.75, -1.9], { w: 1.0, a0: -6, a1: 4, elev: 4, push: 0.12 }), coc: 11,
        act: (S, u, f) => { H.lid.rotation.x = 1.45; H.hand.position.y = 0.4 + 0.05 * Math.sin(f * 0.3);
          S.pop("aura", S.a, 40, { x: -2.4, y: 0.75, z: -2.5, w: 0.75, h: 0.9, hold: true }); S.pop("impact", W(2, "hottest") + 2, 30, { x: -2.15, y: 1.25, z: -1.6, w: 0.5, h: 0.26, text: "HOT!" }); } },
      // 6 · Three Com sells a sliver of Palm to the public: the green block, the sliver slides off to the crowd
      { set: "hq", beat: 3, trans: "whip", light: "office", cam: CAM.fit([0.4, 1.1, -0.8], { w: 3.9, a0: 12, a1: 2, elev: 8, push: 0.12 }),
        act: (S, u, f) => { H.block.visible = H.sliver.visible = true; H.sliver.position.x = 0.82 + 0.9 * E.prog(f, W(3, "sliver") - 2, W(3, "public.") + 4);
          S.actor("boss", { x: -0.85, z: 0.15, expr: "grin", prop: "point", look: 0.5 }); S.actor("fan", { x: 1.9, z: -0.2, expr: "laugh", prop: "up" });
          S.pop("label", W(3, "sliver") - 1, 40, { x: 1.8, y: 1.6, z: -0.8, w: 0.6, h: 0.3, text: "~5%", col: "#c0353a" }); } },
      // 7 · Palm rockets from thirty-eight dollars: whip to the plaza, the PALM screen draws up
      { set: "square", beat: 4, trans: "whip", light: "neon", cam: CAM.fit([-1.5, 2.9, -5], { w: 3.2, a0: -8, a1: 6, elev: 4, push: 0.12 }),
        act: (S, u, f) => { H.com.draw({ t: 1 }); H.palm.draw({ t: 0.02 + 0.33 * E.prog(f, S.a, W(4, "sixty-five,")) }); H.tick.position.x = 1.5 - f * 0.02;
          S.pop("label", W(4, "thirty-eight") - 2, 30, { x: -2.3, y: 2.5, z: -4.7, w: 0.7, h: 0.3, text: "$38", col: "#2a5ab5" }); } },
      // 8 · to one sixty-five: smash — the crowd cheers, confetti, $165
      { set: "square", word: [4, "one"], lead: 2, trans: "smash", light: K.light("neon", { sat: 1.4 }), cam: CAM.fit([-0.6, 2.0, -2.6], { w: 4.2, a0: 14, a1: 4, e0: -4, e1: 6, push: 0.12 }),
        act: (S, u, f) => { H.palm.draw({ t: 0.35 }); H.com.draw({ t: 1 });
          S.actor("fan", { x: -1.4, z: -1.4, expr: "laugh", prop: "up" }); S.actor("trader", { x: 0.2, z: -1.8, expr: "grin", prop: "fists" }); S.actor("dan", { key: "dan2", x: 1.2, z: -1.2, expr: "laugh", prop: "wave", wave: (f % 16) / 16 });
          S.pop("impact", W(4, "sixty-five,") - 2, 40, { x: -1.0, y: 3.6, z: -3.0, w: 1.4, h: 0.7, text: "$165!" }); S.pop("confetti", W(4, "one") , 40, { x: 0, y: 3.6, z: -1.6, w: 4, h: 2 }); } },
      // 9 · then closes near ninety-five: the PALM line slides back to $95
      { set: "square", word: [4, "closes"], lead: 3, trans: "cut", light: "neon", steady: true, cam: CAM.fit([-1.5, 2.9, -5], { w: 3.0, a0: 4, a1: -2, elev: 2, push: 0.1 }), coc: 9,
        act: (S, u, f) => { H.com.draw({ t: 1 }); H.palm.draw({ t: 0.35 + 0.65 * E.prog(f, S.a, W(4, "ninety-five.") + 4) });
          S.pop("label", W(4, "ninety-five.") - 1, 40, { x: -0.6, y: 3.3, z: -4.6, w: 0.8, h: 0.32, text: "$95", col: "#2a6a2a", hold: true }); } },
      // 10 · each of your shares will get one and a half Palm shares: Dan's desk, certificate + 1.5 handhelds
      { set: "den", beat: 5, trans: "whip", light: "lamp", cam: CAM.fit([0.6, 1.4, -0.8], { w: 2.2, a0: 12, a1: 2, elev: 4, push: 0.12 }),
        act: (S, u, f) => { H.crt.draw({ t: 0.3 }); S.actor("dan", { x: 0.9, z: -0.6, expr: "grin", prop: "paper", look: -0.3 });
          S.pop("label", W(5, "one") - 2, 50, { x: 0.0, y: 2.0, z: -0.6, w: 1.2, h: 0.4, text: "× 1.5 PALM", col: "#2a6a2a", hold: true });
          S.pop("card", W(5, "half") - 2, 40, { x: -0.3, y: 1.5, z: -0.5, w: 0.3, h: 0.42, text: "PALM", hold: true }); S.pop("card", W(5, "Palm") - 2, 36, { x: 0.15, y: 1.5, z: -0.5, w: 0.16, h: 0.42, text: "½", hold: true, pop: false }); } },
      // 11 · over a hundred forty dollars of Palm: money rains on the desk
      { set: "den", beat: 6, trans: "cut", light: K.light("lamp", { sat: 1.2 }), cam: CAM.fit([0.6, 1.3, -1.2], { w: 2.6, a0: -12, a1: -2, elev: 10, push: 0.12 }),
        act: (S, u, f) => { H.crt.draw({ t: 0.3 }); S.actor("dan", { x: 1.0, z: -0.7, expr: "laugh", prop: "up" });
          for (let q = 0; q < 6; q++) S.pop("bill", S.a + q * 4, 30, { x: -0.6 + q * 0.3, y: 2.4, z: -1.2, w: 0.3, h: 0.16, rise: -1.2, spin: 1.5, pop: q === 0 });
          S.pop("impact", W(6, "forty") - 2, 34, { x: 0.0, y: 2.2, z: -1.0, w: 1.1, h: 0.5, text: "$140+" }); } },
      // 12 · so your stock jumps? Dan leans in to the CRT, bubble
      { set: "den", word: [6, "So"], lead: 2, trans: "cut", light: "lamp", cam: CAM.fit([0.7, 1.4, -1.0], { w: 1.6, a0: 18, a1: 10, elev: 2, push: 0.12 }), coc: 9,
        act: (S, u, f) => { H.crt.draw({ t: 0.3 }); S.actor("dan", { x: 0.9, z: -0.6, expr: "grin", prop: "fists", look: -0.5 });
          S.say("JUMP, BABY!", W(6, "So") - 1, 34, { x: 1.0, y: AH + 0.55, z: -0.3, w: 0.9, h: 0.42 }); } },
      // 13 · it falls, to eighty-one: smash on the plaza, 3COM screen plunges
      { set: "square", beat: 7, trans: "smash", light: K.light("danger", { sat: 1.0 }), cam: CAM.fit([1.6, 2.9, -5], { w: 3.0, a0: 6, a1: -4, elev: 2, push: 0.16 }),
        act: (S, u, f) => { H.palm.draw({ t: 1 }); H.com.draw({ t: 0.6 + 0.4 * E.prog(f, S.a, S.a + 20) });
          S.pop("impact", W(7, "eighty-one.") - 2, 40, { x: 1.6, y: 3.4, z: -4.6, w: 1.0, h: 0.5, text: "$81" }); S.kick(W(7, "falls,"), 0.08);
          S.pop("arrow", S.a + 2, 30, { x: 2.7, y: 3.4, z: -4.6, w: 0.4, h: 0.7, dir: "down" }); } },
      // 14 · so everything else Three Com owns: HQ wide — racks, engineers, the crate now empty
      { set: "hq", beat: 8, trans: "whip", light: "office", cam: CAM.fit([1.0, 1.4, -1.6], { w: 4.2, a0: -10, a1: 2, elev: 8, push: 0.12 }),
        act: (S, u, f) => { H.lid.rotation.x = 1.45; H.hand.visible = false; H.leds.forEach((l, i) => (l.visible = Math.sin(f * 0.5 + i) > -0.2));
          S.actor("eng", { x: 1.6, z: -1.6, expr: "smile", prop: "hold" }); S.actor("boss", { x: -0.6, z: -1.0, expr: "smile", prop: "chin" });
          S.pop("label", W(8, "everything") - 2, 50, { x: 0.8, y: 2.6, z: -1.6, w: 1.9, h: 0.34, text: "EVERYTHING ELSE", col: "#2a5ab5", hold: true }); } },
      // 15 · worth minus sixty-three a share: the −$63 tag slams down on the racks, faces drop
      { set: "hq", word: [8, "minus"], lead: 3, trans: "cut", light: K.light("office", { sat: 0.9 }), cam: CAM.fit([1.9, 1.7, -2.0], { w: 3.0, a0: 12, a1: 4, elev: 4, push: 0.12 }),
        act: (S, u, f) => { H.hand.visible = false; const hit = W(8, "sixty-three") - 1, k = E.prog(f, hit - 5, hit);
          H.tag.visible = true; H.tag.position.y = 4.2 - 1.8 * k; H.tag.rotation.z = 0.12 * Math.sin(f * 0.3);
          S.actor("eng", { x: 1.5, z: -1.4, expr: f >= hit ? "shock" : "smile", prop: f >= hit ? "up" : "hold" }); S.actor("boss", { key: "boss2", x: 2.8, z: -1.3, expr: f >= hit ? "dazed" : "smile", prop: "shrug" });
          S.kick(hit, 0.08); S.pop("sweat", hit + 2, 30, { x: 1.9, y: AH + 0.2, z: -1.2, w: 0.3, h: 0.3 }); } },
      // 16 · minus twenty-two billion dollars: the plaza screen goes red, huge number
      { set: "square", beat: 9, trans: "whip", light: K.light("neon", { sat: 1.3 }), cam: CAM.fit([0.1, 2.9, -5], { w: 5.8, a0: -6, a1: 4, e0: 6, e1: -2, push: 0.14 }),
        act: (S, u, f) => { H.palm.draw({ t: 1 }); H.com.draw({ t: 1 });
          S.pop("label", W(9, "twenty-two") - 2, 50, { x: 0.1, y: 3.0, z: -4.4, w: 3.0, h: 0.6, text: "-$22 BILLION", col: "#c0353a", hold: true }); S.kick(W(9, "billion"), 0.07); } },
      // 17 · how is a profitable business worth less than nothing? Dan at night, question marks
      { set: "den", beat: 10, trans: "dissolve", light: K.light("night", { hemi: 1.9 }), cam: CAM.fit([0.8, 1.4, -0.7], { w: 2.0, a0: -14, a1: -2, elev: 4, push: 0.14 }),
        act: (S, u, f) => { H.crt.draw({ t: 1 }); S.actor("dan", { x: 0.9, z: -0.6, expr: "nervous", prop: "shrug" });
          S.pop("question", W(10, "How") - 2, 60, { x: 1.5, y: AH + 0.45, z: -0.3, w: 0.3, h: 0.45, hold: true }); S.pop("question", W(10, "nothing?") - 4, 30, { x: 0.3, y: AH + 0.4, z: -0.3, w: 0.26, h: 0.4 }); } },
      // 18 · you see, it's a wallet holding $140: push-through into the wallet stage, flap open, bills inside
      { set: "wallet", beat: 11, trans: "zoom", light: K.backdrop("#d8642a"), cam: CAM.fit([0, 1.3, -1.8], { w: 3.4, a0: 14, a1: 2, elev: 8, push: 0.14 }),
        act: (S, u, f) => { H.flap.rotation.x = -1.2 * E.prog(f, W(11, "wallet") - 4, W(11, "holding")); H.bills.forEach((b, i) => { b.position.y = 1.55 + (i % 2) * 0.1 + 0.2 * E.prog(f, W(11, "hundred") - 3 + i * 2, W(11, "forty") + i * 2); });
          S.pop("label", W(11, "forty") - 1, 34, { x: 0, y: 2.6, z: -1.4, w: 1.2, h: 0.38, text: "INSIDE: $140", col: "#2a6a2a" }); } },
      // 19 · on sale for eighty: the $80 tag swings in, SALE
      { set: "wallet", word: [11, "sale"], lead: 3, trans: "cut", light: K.backdrop("#d8642a"), cam: CAM.fit([0.8, 1.6, -1.4], { w: 3.0, a0: -12, a1: -4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { H.flap.rotation.x = -1.2; H.bills.forEach((b, i) => (b.position.y = 1.75 + (i % 2) * 0.1));
          H.price.visible = true; const k = E.prog(f, S.a, W(11, "eighty.") + 2); H.price.position.x = 3.0 - 1.4 * k; H.price.rotation.z = 0.25 * Math.sin(f * 0.25) * (1 - k * 0.6);
          S.pop("impact", W(11, "eighty.") + 1, 30, { x: 1.4, y: 2.6, z: -0.8, w: 0.9, h: 0.4, text: "SALE!" }); } },
      // 20 · everyone saw it: the crowd around the wallet, pointing
      { set: "wallet", beat: 12, trans: "whip", light: K.backdrop("#d8642a"), cam: CAM.fit([0, 1.4, -1.2], { w: 4.6, a0: 10, a1: 0, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.flap.rotation.x = -1.2; H.bills.forEach((b, i) => (b.position.y = 1.75 + (i % 2) * 0.1)); H.price.visible = true; H.price.position.x = 1.6;
          S.actor("trader", { x: -1.9, z: -0.6, expr: "shock", prop: "point", look: 0.5 }); S.actor("fan", { x: 1.9, z: -0.4, expr: "shock", prop: "point", look: -0.5 }); S.actor("dan", { x: -0.6, z: 0.2, expr: "grin", prop: "point", look: 0.2 });
          S.pop("exclaim", W(12, "saw") - 2, 30, { x: -1.9, y: AH + 0.45, z: -0.4, w: 0.25, h: 0.4 }); S.pop("exclaim", W(12, "saw"), 30, { x: 1.9, y: AH + 0.45, z: -0.2, w: 0.25, h: 0.4, pop: false }); } },
      // 21 · newspapers wrote about it: the plaza newsstand, papers flapping
      { set: "square", word: [12, "Newspapers"], lead: 3, trans: "whip", dir: -1, light: "neon", cam: CAM.fit([3.9, 1.4, -0.9], { w: 2.6, a0: -14, a1: -4, elev: 4, push: 0.12 }),
        act: (S, u, f) => { H.papers.forEach((p, i) => { p.rotation.z = 0.06 * Math.sin(f * 0.4 + i); });
          S.actor("trader", { key: "reader", x: 4.65, z: -0.2, expr: "shock", prop: "paper" });
          for (let q = 0; q < 3; q++) S.pop("paper", S.a + 3 + q * 5, 26, { x: 3.0 + q * 0.5, y: 2.2, z: -0.6, w: 0.3, h: 0.4, rise: -1.0, spin: 2, pop: q === 0 }); } },
      // 22 · but cashing in meant betting against Palm: the share-rental shop, Dan at the counter
      { set: "rental", beat: 13, trans: "whip", light: "interior", cam: CAM.fit([0, 1.6, -1.2], { w: 3.6, a0: 12, a1: 2, elev: 6, push: 0.12 }),
        act: (S, u, f) => { const gone = E.prog(f, W(13, "against") - 2, W(13, "almost")); H.shelfItems.forEach((it, i) => (it.visible = i / 8 > gone));
          S.actor("clerk", { x: 0.3, z: -1.6, expr: "smile", prop: "hold" }); S.actor("dan", { x: -0.6, z: 0.1, expr: "grin", prop: "point", look: 0.3 });
          S.pop("arrow", W(13, "betting") - 2, 30, { x: 1.3, y: 2.0, z: -1.0, w: 0.4, h: 0.6, dir: "down" }); S.pop("label", W(13, "against") - 1, 30, { x: -1.5, y: 2.2, z: -1.0, w: 1.3, h: 0.32, text: "BET AGAINST", col: "#c0353a" }); } },
      // 23 · almost no Palm shares could be borrowed: SOLD OUT slams, empty shelves, clerk shrugs
      { set: "rental", word: [13, "almost"], lead: 3, trans: "cut", light: "interior", cam: CAM.fit([0.2, 1.8, -1.6], { w: 2.4, a0: -10, a1: -2, elev: 4, push: 0.12 }), coc: 9,
        act: (S, u, f) => { H.shelfItems.forEach((it) => (it.visible = false)); const hit = W(13, "borrowed.") - 4; H.sold.visible = f >= hit - 4; H.sold.position.y = 1.9 + 1.2 * (1 - E.prog(f, hit - 4, hit));
          S.actor("clerk", { x: 0.3, z: -1.6, expr: "nervous", prop: "shrug" }); S.say("NONE LEFT.", W(13, "almost") - 1, 48, { x: 0.9, y: AH + 0.5, z: -1.3, w: 0.8, h: 0.4, tail: "left" }); S.kick(hit, 0.06); } },
      // 24 · the crazy price lasted months: flash (time jump) — hourglass pours, calendar pages fly past the wallet
      { set: "wallet", beat: 14, trans: "flash", light: K.light("dream", { sat: 1.1 }), cam: CAM.fit([-1.0, 1.4, -1.4], { w: 4.4, a0: 8, a1: -4, elev: 6, push: 0.1 }),
        act: (S, u, f) => { H.flap.rotation.x = -1.2; H.bills.forEach((b, i) => (b.position.y = 1.75 + (i % 2) * 0.1)); H.price.visible = true; H.price.position.x = 1.6; H.hg.visible = true; H.hg.rotation.z = 0.04 * Math.sin(f * 0.3);
          for (let q = 0; q < 5; q++) S.pop("page", S.a + 2 + q * 5, 22, { x: -2.0 + q * 0.6, y: 2.6, z: -1.0, w: 0.4, h: 0.5, rise: -1.0, spin: 2, pop: q === 0 });
          S.pop("label", W(14, "months.") - 2, 30, { x: -1.0, y: 2.8, z: -1.0, w: 1.3, h: 0.36, text: "MONTHS", col: "#7a1a1a" }); } },
      // 25 · everyone could do the math: crowd with checkmarks — MATH ✓
      { set: "wallet", beat: 15, trans: "whip", light: K.backdrop("#d8642a"), cam: CAM.fit([0, 1.4, -1.0], { w: 4.4, a0: -10, a1: 0, elev: 6, push: 0.12 }),
        act: (S, u, f) => { H.flap.rotation.x = -1.2; H.bills.forEach((b, i) => (b.position.y = 1.75 + (i % 2) * 0.1)); H.price.visible = true; H.price.position.x = 1.6;
          S.actor("trader", { x: -1.9, z: -0.4, expr: "grin", prop: "chin" }); S.actor("fan", { x: 1.9, z: -0.4, expr: "grin", prop: "chin" }); S.actor("dan", { x: -0.3, z: 0.3, expr: "grin", prop: "up" });
          S.pop("label", W(15, "math.") - 3, 30, { x: 0, y: 2.7, z: -0.6, w: 1.3, h: 0.38, text: "MATH ✓", col: "#2a6a2a" }); } },
      // 26 · nobody could pick up the money: Dan lunges, the wallet SNAPS shut on the last word, he falls
      { set: "wallet", word: [15, "Nobody"], lead: 2, trans: "cut", light: K.backdrop("#d8642a"), cam: CAM.fit([0.1, 1.2, -1.3], { w: 2.8, a0: 14, a1: 6, elev: 4, push: 0.14 }),
        act: (S, u, f) => { const hit = W(15, "money.") + 2, shut = E.prog(f, hit - 3, hit);
          H.flap.rotation.x = -1.2 * (1 - shut); H.bills.forEach((b, i) => (b.position.y = 1.75 + (i % 2) * 0.1 - 0.35 * shut)); H.price.visible = true; H.price.position.x = 1.6;
          S.actor("dan", { x: -0.1 + 0.25 * E.prog(f, S.a, hit - 3), z: -0.6, expr: f >= hit ? "dazed" : "grin", prop: f >= hit ? "shrug" : "up", mode: f >= hit + 4 ? "fall" : "stand" });
          S.pop("impact", hit, 40, { x: 0.3, y: 2.4, z: -0.6, w: 1.3, h: 0.6, text: "SNAP!", hold: true }); S.kick(hit, 0.14); S.pop("stars", hit + 3, 30, { x: -0.1, y: 1.0, z: -0.3, w: 0.8, h: 0.4 }); } },
    ],
  };
};
