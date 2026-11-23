// "The Coffee Can" (Robert Kirby's Coffee Can Portfolio story, 1950s; Journal of Portfolio Management 1984) — film module.
export default (K, T) => {
  const { CAM, E } = K;
  const W = (i, w, n) => T.word(i, w, n);
  const AH = 1.55;
  const H = {};
  const PI = Math.PI;
  const tx = (B, s, bg, fg, w = 1024, h = 256) => B.textTex(s, bg, fg, w, h);
  const DESK = 0.81; // desk-top height in the office

  // a share certificate lying flat (cream, gold border, optional text)
  const cert = (B, x, y, z, s, parent, label = "STOCK") => { const g = B.grp(x, y, z, 0, s, parent);
    B.box(0.6, 0.02, 0.4, "#f4e6c8", 0, 0, 0, { in: g }); B.box(0.54, 0.022, 0.025, "#c9a44a", 0, 0, 0.16, { in: g }); B.box(0.54, 0.022, 0.025, "#c9a44a", 0, 0, -0.16, { in: g });
    if (label) B.plate(0.46, 0.14, tx(B, label, "#f4e6c8", "#2f5a3a", 1024, 312), 0, 0.025, 0, { in: g, rx: -PI / 2, d: 0.002 });
    return g; };
  // a coffee can: red tin with a cream band
  const can = (B, x, y, z, s, parent, word = "COFFEE") => { const g = B.grp(x, y, z, 0, s, parent);
    B.cyl(0.32, 0.32, 0.8, "#c0353a", 0, 0, 0, { in: g, seg: 24, open: true }); B.cyl(0.3, 0.3, 0.03, "#5a2a20", 0, 0.05, 0, { in: g, seg: 24 });
    B.cyl(0.33, 0.33, 0.3, "#f4e6c8", 0, 0.25, 0, { in: g, seg: 24, open: true });
    for (const y of [0.02, 0.77]) B.cyl(0.335, 0.335, 0.035, "metal:#9aa3ad", 0, y, 0, { in: g, seg: 24 });
    if (word) B.plate(0.46, 0.2, tx(B, word, "#f4e6c8", "#7a1a1a", 1024, 445), 0, 0.4, 0.335, { in: g, d: 0.004 });
    return g; };

  return {
    cast: {
      you: { jacket: "#4a5568", pants: "#3a4250", boots: "#1a1418", hat: "hair", hair: "#3a2a1a", skin: "#f2c9a4", buttons: "#e8e0d0" },
      client: { jacket: "#2a7a8a", pants: "#2a3a40", boots: "#1a1418", hat: "hair", hair: "#e8e4dc", dress: "#2a7a8a", skin: "#f5d6b8", buttons: "#f8f8f8" },
      husband: { jacket: "#7a5a3a", pants: "#4a4038", boots: "#2a1a14", hat: "hair", hair: "#cfcfcf", moustache: "#cfcfcf", skin: "#f0c4a0", buttons: "#e8c44a", build: "stout" },
      prospector: { jacket: "#8a5a34", pants: "#4a5a7a", boots: "#3a2418", hat: "cowboy", capColor: "#6a4a2a", skin: "#e8b48a", moustache: "#6a4a2a" },
      tech: { jacket: "#f4f4f0", pants: "#3a4a5a", boots: "#2a2d38", hat: "hair", hair: "#2a1a14", skin: "#f0c8a0", buttons: "#9aa3ad" },
    },
    sets: {
      // 1950s investment-counsel office: teal wallpaper, big desk, stamps, the ledger tower, a brass scale
      office: (B) => {
        B.set.room({ style: "office", wall: "wallpaper:#2f6a6a", floor: "carpet:#7a4a3a", w: 7, d: 6, h: 3.2, windows: [-2.2, 2.2], door: false });
        B.prop.desk({ x: 0, z: -0.8, w: 1.9, col: "floor:#5a3a24" });
        B.prop.chair({ x: 0, z: -1.6, col: "#3a2418" }); B.prop.chair({ x: -2.0, z: 0.2, ry: -0.5, col: "#7a3a3a" });
        B.prop.lamp({ x: 0.8, y: DESK, z: -1.05, col: "#2f7a4a" }); B.prop.phone({ x: 0.6, y: DESK, z: -1.1 });
        B.prop.clock({ x: 0, y: 2.6, z: -2.95, r: 0.28 });
        B.prop.poster({ x: -0.8, y: 1.35, z: -2.96, w: 0.75, h: 0.95, text: "BUY", bg: "#f4e6c8", fg: "#2f5a3a" });
        B.prop.poster({ x: 0.8, y: 1.35, z: -2.96, w: 0.75, h: 0.95, text: "SELL", bg: "#f4e6c8", fg: "#b8423a" });
        B.prop.shelf({ x: -3.1, z: -2.2, w: 1.2, h: 2.0 }); B.prop.plant({ x: 3.0, z: -2.4 });
        B.prop.rug({ x: 0, z: 0.2, w: 3.4, d: 2.4, col: "#3a5a6a" });
        // the ledger tower (your managed portfolio)
        H.ledgers = []; for (let i = 0; i < 6; i++) H.ledgers.push(B.dyn(B.box(0.42, 0.11, 0.3, ["#2f5a8a", "#8a3a3a", "#2f6a4a"][i % 3], -0.7, DESK + i * 0.115, -0.75, { ry: 0.08 * Math.sin(i * 2.3) })));
        H.ltag = B.dyn(B.plate(0.9, 0.22, tx(B, "YOUR PORTFOLIO", "#ffd84a", "#241726", 1024, 250), -0.7, DESK + 0.95, -0.6, { d: 0.02 })); H.ltag.visible = false;
        // stamps on the desk
        H.stampBuy = B.dyn(B.grp(-0.05, DESK, -0.55, 0, 1)); B.cyl(0.07, 0.07, 0.08, "#2f6a4a", 0, 0, 0, { in: H.stampBuy }); B.cyl(0.03, 0.03, 0.14, "#3a2418", 0, 0.08, 0, { in: H.stampBuy }); B.ball(0.05, "#3a2418", 0, 0.24, 0, { in: H.stampBuy });
        H.stampSell = B.dyn(B.grp(0.25, DESK, -0.55, 0, 1)); B.cyl(0.07, 0.07, 0.08, "#b8423a", 0, 0, 0, { in: H.stampSell }); B.cyl(0.03, 0.03, 0.14, "#3a2418", 0, 0.08, 0, { in: H.stampSell }); B.ball(0.05, "#3a2418", 0, 0.24, 0, { in: H.stampSell });
        B.box(0.5, 0.01, 0.36, "#f4efe2", 0.1, DESK, -0.45);
        // the husband's long safe-deposit box (hidden until it lands)
        H.sdbox = B.dyn(B.grp(0.3, DESK, -0.6, 0, 1)); B.box(0.8, 0.16, 0.3, "metal:#8d949c", 0, 0, 0, { in: H.sdbox });
        H.lid = B.dyn(B.grp(0, 0.16, -0.15, 0, 1, H.sdbox)); B.box(0.8, 0.02, 0.3, "metal:#a0a8b0", 0, 0, 0.15, { in: H.lid }); B.ball(0.03, "#c9a44a", 0, 0.02, 0.28, { in: H.lid }); H.sdbox.visible = false;
        H.spill = []; for (let i = 0; i < 6; i++) { const c = B.dyn(cert(B, 0.3 + (i - 2.5) * 0.12, DESK + 0.17 + i * 0.01, -0.6 + 0.05 * Math.sin(i), 0.55)); c.visible = false; H.spill.push(c); }
        // the brass scale at the end
        H.scale = B.prop.scale({ x: 0.45, y: DESK, z: -0.7, s: 0.65 });
        H.cPan = cert(B, 0, -0.5, 0, 0.55, H.scale.pans[0], "XEROX");
        H.bPan = B.dyn(B.grp(0, -0.48, 0, 0, 1, H.scale.pans[1])); for (let i = 0; i < 3; i++) B.box(0.36, 0.08, 0.26, ["#2f5a8a", "#8a3a3a", "#2f6a4a"][i], 0, i * 0.085, 0, { in: H.bPan });
        H.scale.visible = false;
        H.fly = B.dyn(B.grp(0, 0, 0, 0, 1)); for (let i = 0; i < 3; i++) B.box(0.36, 0.08, 0.26, ["#2f5a8a", "#8a3a3a", "#2f6a4a"][i], 0, i * 0.085, 0, { in: H.fly }); H.fly.visible = false;
        H.flyCert = B.dyn(cert(B, 0, 0, 0, 0.9, undefined, "STOCK")); H.flyCert.visible = false;
      },
      // the bank's safe-deposit room: a wall of small brass drawers, one of them his
      vault: (B) => {
        B.set.room({ style: "vault", w: 6, d: 5, h: 3.2, door: false });
        for (let r = 0; r < 7; r++) for (let c = 0; c < 9; c++) { const x = -2.4 + c * 0.6, y = 0.2 + r * 0.4; if (r === 3 && c === 4) continue;
          B.box(0.56, 0.36, 0.06, (r + c) % 2 ? "#c9a44a" : "#b8923a", x, y, -2.44); B.ball(0.03, "#3a2a1a", x, y + 0.18, -2.4); }
        H.drawer = B.dyn(B.grp(0, 1.4, -2.44, 0, 1)); B.box(0.56, 0.36, 0.06, "#e8c45a", 0, 0, 0.0, { in: H.drawer }); B.box(0.5, 0.3, 0.7, "metal:#8d949c", 0, 0.03, -0.38, { in: H.drawer }); B.ball(0.03, "#3a2a1a", 0, 0.18, 0.04, { in: H.drawer });
        H.dcert = B.dyn(cert(B, 0, 1.75, -2.2, 0.5)); H.dcert.visible = false;
        H.glowCert = B.dyn(cert(B, 0, 1.6, -2.3, 0.8, undefined, "FORGOTTEN")); H.glowCert.visible = false;
        B.prop.table({ x: 1.6, z: -0.6, w: 1.2, d: 0.6, col: "#5a626a" }); B.prop.lamp({ x: -2.3, z: -1.8, kind: "floor", glow: "#d8ffd0" });
        B.lamp(0, 2.8, -0.5, "#e8fff0", 4, 8);
      },
      // the husband's 1950s den: armchair, radio, side table, the mail
      den: (B) => {
        B.set.room({ style: "home", wall: "wallpaper:#7a8a5a", floor: "floor:#8a5a3a", w: 7, d: 6, h: 3.2, windows: [1.8], door: false });
        const ch = B.grp(0, 0, -1.4, 0, 1); B.box(1.1, 0.45, 0.9, "#8a3a3a", 0, 0, 0, { in: ch }); B.box(1.1, 0.9, 0.25, "#8a3a3a", 0, 0.45, -0.33, { in: ch });
        for (const sx of [-0.5, 0.5]) B.box(0.18, 0.35, 0.9, "#7a2e2e", sx, 0.45, 0, { in: ch });
        H.hat = B.dyn(B.grp(0, 0.47, -1.2, 0, 1)); B.cyl(0.22, 0.22, 0.02, "#5a4a3a", 0, 0, 0, { in: H.hat, seg: 20 }); B.cyl(0.13, 0.14, 0.14, "#5a4a3a", 0, 0.02, 0, { in: H.hat, seg: 18 }); B.cyl(0.142, 0.142, 0.03, "#2a2a30", 0, 0.03, 0, { in: H.hat, seg: 18 });
        H.hat.visible = false;
        B.prop.table({ x: 1.05, z: -1.3, w: 0.6, d: 0.5, h: 0.6, col: "floor:#5a3a24" });
        const rad = B.grp(1.05, 0.6, -1.35, -0.3, 1); B.box(0.45, 0.32, 0.25, "#8a5a34", 0, 0, 0, { in: rad }); B.ball(0.1, "#e8d8b0", 0.08, 0.16, 0.13, { in: rad, sy: 1 });
        B.prop.lamp({ x: -1.0, z: -1.6, kind: "floor" }); B.prop.rug({ x: 0, z: -0.3, w: 2.8, d: 2.0, col: "#a06a3a" });
        B.prop.poster({ x: -1.6, y: 1.4, z: -2.96, w: 0.8, h: 0.6, text: "", bg: "#3a5a7a" });
        H.memo = B.dyn(B.grp(0, 0, 0, 0, 1)); B.plate(0.5, 0.36, tx(B, "BUY", "#f4efe2", "#2f6a4a", 1024, 737), 0, 0, 0, { in: H.memo, d: 0.01 }); H.memo.visible = false;
        H.cash = B.prop.cash({ x: 1.05, y: 0.6, z: -1.05, n: 4, s: 0.6 }); H.cash.visible = false;
        H.letters = []; for (let i = 0; i < 9; i++) { const L = B.dyn(B.plate(0.42, 0.3, tx(B, "SELL", "#f4efe2", "#b8423a", 1024, 731), 0, 0, 0, { d: 0.01 })); L.visible = false; H.letters.push(L); }
      },
      // metaphor: an Old West cabin, the coffee can under the mattress
      cabin: (B) => {
        B.set.room({ style: "cabin", w: 6, d: 5, h: 3.0, windows: [1.5], door: false });
        const bed = B.grp(-0.3, 0, -1.4, 0, 1); B.box(1.9, 0.35, 1.0, "planks:#6a4a2a", 0, 0, 0, { in: bed }); B.box(0.12, 0.9, 1.0, "planks:#5a3a24", -0.95, 0, 0, { in: bed });
        H.mattress = B.dyn(B.grp(-0.3, 0.35, -1.4, 0, 1)); B.box(1.8, 0.2, 0.92, "#e8dcc0", 0, 0, 0, { in: H.mattress }); B.box(1.6, 0.06, 0.8, "#a04a3a", 0.05, 0.2, 0, { in: H.mattress }); B.box(0.4, 0.12, 0.5, "#f4efe2", -0.65, 0.22, 0, { in: H.mattress });
        H.can = B.dyn(can(B, 0.3, 0.0, -0.4, 0.45)); H.coins = []; for (let i = 0; i < 4; i++) { const c = B.dyn(B.cyl(0.06, 0.06, 0.02, "#f2c14e", 0.3, 0.38, -0.4, { seg: 14 })); c.visible = false; H.coins.push(c); }
        B.prop.lamp({ x: 1.5, y: 0.6, z: -1.6, col: "#c9a44a", glow: "#ffc870" }); B.prop.table({ x: 1.5, z: -1.6, w: 0.7, d: 0.5, h: 0.6, col: "planks:#6a4a2a" });
        B.prop.barrel({ x: -2.3, z: -1.8 }); B.prop.sign({ x: -1.2, y: 1.6, z: -2.4, w: 1.4, h: 0.4, text: "OLD WEST", bg: "#e8d8b0", fg: "#5a2a1a" });
        B.lamp(0.5, 2.2, 0.5, "#ffb860", 4, 8);
      },
      // metaphor: a row of coffee cans on a blue stage, each holding one $5,000 bet
      cans: (B) => {
        B.set.stage({ floor: "#e8d8b0", back: "#2a4a7a" });
        H.cans = []; H.stacks = [];
        [-2.0, -1.0, 0, 1.0, 2.0].forEach((x, i) => { B.prop.pedestal({ x, z: -0.6, r: 0.42, h: 0.35, col: "#f4efe2", trim: "#c9a44a" });
          H.cans.push(B.dyn(can(B, x, 0.35, -0.6, 1, undefined, "$5,000")));
          const st = B.dyn(B.grp(x, 1.15, -0.6, 0, 1)); for (let k = 0; k < 8; k++) B.box(0.44, 0.1, 0.32, k % 2 ? "#f4e6c8" : "#e8d8b0", 0, k * 0.1, 0, { in: st }); st.scale.y = 0.25; H.stacks.push(st); });
        H.ceil = []; for (let k = 0; k < 4; k++) H.ceil.push(B.dyn(B.box(0.9, 0.25, 1.4, "planks:#8a6a4a", 1.0 + (k - 1.5) * 0.9, 4.2, -0.6)));
        H.dud = B.dyn(can(B, -1.0, 0, 1.0, 1, undefined, "DUD")); H.dud.visible = false;
        H.dcoins = []; for (let i = 0; i < 4; i++) { const c = B.dyn(B.cyl(0.08, 0.08, 0.025, "#f2c14e", -1.0, 0.4, 1.0, { seg: 14 })); c.visible = false; H.dcoins.push(c); }
        B.lamp(0, 4, 2.5, "#fff0c8", 6, 10);
      },
      // a 1950s photocopy lab: the Haloid machine and its sign
      lab: (B) => {
        B.set.room({ style: "modern", wall: "tiles:#e8f0e8:#cfe0d8", floor: "tiles:#e8e6e2:#7a8a9a", w: 7, d: 6, h: 3.4, windows: [-2.4], door: false });
        const m = B.grp(0, 0, -1.4, 0, 1); B.box(1.6, 0.95, 0.9, "#7a9a8a", 0, 0, 0, { in: m }); B.box(1.65, 0.08, 0.95, "#3a4a4a", 0, 0.95, 0, { in: m });
        B.plate(1.0, 0.04, "#cfe8f4", 0, 1.04, 0, { in: m, rx: -PI / 2, d: 0.6 }); B.box(0.5, 0.04, 0.5, "#c8d0d0", 0.95, 0.55, 0.05, { in: m });
        for (const x of [-0.5, 0, 0.5]) B.ball(0.05, x ? "#e04a4a" : "#4fd18b", x, 0.75, 0.46, { in: m });
        H.glass = B.dyn(B.plate(0.98, 0.6, "#ffffff", 0, 1.07, -1.4, { rx: -PI / 2, d: 0.01 })); H.glass.visible = false;
        H.pages = []; for (let i = 0; i < 6; i++) { const p = B.dyn(B.box(0.36, 0.01, 0.26, "#fbf8f0", 0.95, 0.6, -1.35)); p.visible = false; H.pages.push(p); }
        H.signH = B.dyn(B.plate(2.4, 0.6, tx(B, "HALOID", "#2a3a5a", "#f4efe2", 1024, 256), 0, 2.4, -2.95, { d: 0.06, edge: "#c9a44a" }));
        H.signX = B.dyn(B.plate(2.4, 0.6, tx(B, "XEROX", "#c0353a", "#f4efe2", 1024, 256), 0, 2.4, -2.94, { d: 0.06, edge: "#c9a44a" })); H.signX.visible = false;
        H.coin = B.dyn(B.cyl(0.09, 0.09, 0.025, "#f2c14e", -0.4, 1.1, -1.2, { seg: 16, rx: PI / 2 })); H.coin.visible = false;
        B.prop.shelf({ x: 2.6, z: -2.4, w: 1.2, h: 1.8 }); B.lamp(0, 3, 0.5, "#f0fff8", 5, 9);
      },
    },
    shots: [
      // 0 · hook, frame 0: a forgotten drawer bursts open and a glowing certificate rises out of the dust
      { set: "vault", f: 0, light: "vault", cam: CAM.fit([0, 1.6, -2.2], { w: 2.6, a0: -16, a1: 8, elev: 4, push: 0.25 }),
        act: (S, u, f) => { H.drawer.position.z = -2.44 + 0.55 * E.back(E.prog(f, 0, 10));
          H.glowCert.visible = true; H.glowCert.position.set(0, 1.55 + 0.9 * E.ss(E.prog(f, 4, 36)), -1.9 + 0.3 * E.prog(f, 4, 36)); H.glowCert.rotation.x = 1.2 * E.ss(E.prog(f, 4, 36)); H.glowCert.rotation.y = 0.2 * Math.sin(f * 0.15);
          S.pop("puff", 2, 18, { x: 0, y: 1.55, z: -1.8, w: 1.4, h: 0.7 }); S.fx("glow", { x: 0, y: 2.3, z: -2.1, w: 0.9, h: 0.9 }); S.pop("sparks", 14, 20, { x: 0, y: 2.3, z: -1.4, w: 1.0, h: 0.8 }); } },
      // 1 · …beat your whole managed portfolio: it flies into your office and topples the ledger tower
      { set: "office", word: [0, "beat"], lead: 4, trans: "smash", light: "office", cam: CAM.fit([-0.25, 1.35, -1.0], { w: 2.2, a0: -10, a1: 2, elev: 6 }),
        act: (S, u, f) => { const t = W(0, "beat") + 4; H.flyCert.visible = f < t + 3; H.flyCert.position.set(-1.6 + 1.2 * E.prog(f, S.a, t), 1.9 - 0.5 * E.prog(f, S.a, t), -0.6); H.flyCert.rotation.z = f * 0.3;
          const k = E.easeIn(E.prog(f, t, t + 14)); H.ledgers.forEach((b, i) => { b.position.x = -0.7 + k * (0.15 + i * 0.12); b.rotation.z = -k * (0.4 + i * 0.25); b.position.y = Math.max(DESK + 0.05 * (i % 2), b.position.y - k * i * 0.09); });
          S.actor("you", { x: 0.2, z: -1.55, expr: f < t ? "smile_closed" : "shock", prop: f < t ? "hold" : "up" });
          S.kick(t, 0.06); S.pop("impact", t, 18, { x: -0.3, y: 1.4, z: -0.5, w: 0.8, h: 0.6, text: "BONK" });
          H.ltag.visible = f >= W(0, "managed") - 2; } },
      // 2 · nineteen fifties: wide office, the clock and the posters
      { set: "office", beat: 1, trans: "whip", light: "office", cam: CAM.fit([0, 1.4, -1.6], { w: 3.4, a0: 14, a1: 4, elev: 4 }),
        act: (S, u, f) => { S.actor("you", { x: 0.0, z: -1.55, expr: "smile", prop: "chin" });
          S.pop("label", W(1, "Nineteen") - 2, 48, { x: 0, y: 2.25, z: -1.4, w: 1.6, h: 0.42, text: "THE 1950s", bg: "#ffd84a", hold: true }); S.pop("label", W(1, "Nineteen") + 6, 40, { x: 0.05, y: 2.0, z: -1.3, w: 0.5, h: 0.2, text: "YOU", bg: "#f4efe2", hold: true }); } },
      // 3 · you manage a wealthy woman's money: the client in pearls
      { set: "office", word: [1, "You"], lead: 3, trans: "dissolve", light: "office", cam: CAM.fit([-0.6, 1.3, -0.8], { w: 2.8, a0: -24, a1: -14, elev: 4, push: 0.1 }),
        act: (S, u, f) => { S.actor("you", { x: 0.1, z: -1.55, expr: "smile", prop: "point" }); S.actor("client", { x: -1.1, z: 0.1, expr: "smile_closed", prop: "hold", flip: true });
          S.pop("label", W(1, "wealthy") - 2, 50, { x: -1.2, y: 2.15, z: 0.1, w: 1.1, h: 0.26, text: "YOUR CLIENT", bg: "#f4efe2", hold: true }); S.pop("coin", W(1, "money.") - 2, 22, { x: -0.8, y: 1.6, z: 0.1, w: 0.25, h: 0.25, rise: 0.4 }); } },
      // 4 · buy, sell: the stamps come down
      { set: "office", beat: 2, trans: "whip", light: "office", steady: true, coc: 11, cam: CAM.fit([0.1, DESK + 0.15, -0.5], { w: 1.0, a0: 0, a1: 6, elev: 38, push: 0.08 }),
        act: (S, u, f) => { const b = W(2, "buy,"), s = W(2, "sell,");
          H.stampBuy.position.y = DESK + 0.25 * (1 - E.easeIn(E.prog(f, b - 6, b))) * (f < b ? 1 : 0) + (f >= b + 6 ? 0.2 : 0);
          H.stampSell.position.y = DESK + (f < s - 6 ? 0.2 : 0.2 * (1 - E.easeIn(E.prog(f, s - 6, s))));
          S.kick(b, 0.04); S.pop("label", b, 30, { x: -0.05, y: DESK + 0.05, z: -0.3, w: 0.36, h: 0.14, text: "BUY", bg: "#4fd18b", hold: true });
          S.kick(s, 0.04); S.pop("label", s, 30, { x: 0.28, y: DESK + 0.05, z: -0.28, w: 0.4, h: 0.14, text: "SELL", bg: "#ff6a5a", hold: true }); } },
      // 5 · trim, rebalance: you juggle papers and sweat
      { set: "office", word: [2, "trim,"], lead: 3, light: "office", cam: CAM.fit([0.0, 1.35, -1.2], { w: 1.9, a0: 12, a1: -4, elev: 4, push: 0.12 }),
        act: (S, u, f) => { S.actor("you", { x: 0.0, z: -1.55, expr: "nervous", prop: "up", tilt: 5 * Math.sin(f * 0.6) });
          S.pop("label", W(2, "trim,"), 20, { x: -0.6, y: 2.2, z: -1.3, w: 0.6, h: 0.2, text: "TRIM", bg: "#f4efe2", hold: true });
          S.pop("label", W(2, "rebalance."), 30, { x: 0.6, y: 2.3, z: -1.3, w: 0.95, h: 0.2, text: "REBALANCE", bg: "#f4efe2", hold: true });
          for (let q = 0; q < 4; q++) S.pop("paper", S.a + q * 8, 20, { x: -0.4 + q * 0.25, y: 2.0, z: -1.2, w: 0.3, h: 0.3, rise: 0.3, spin: 1 });
          S.pop("sweat", W(2, "rebalance.") + 4, 20, { x: 0.25, y: 2.05, z: -1.3, w: 0.18, h: 0.22, rise: -0.3 }); } },
      // 6 · then her husband dies: his empty armchair, his hat on the seat, at dusk
      { set: "den", beat: 3, trans: "dissolve", light: "dusk", cam: CAM.fit([0, 0.9, -1.3], { w: 2.2, a0: -10, a1: 4, elev: 8, push: 0.12 }),
        act: (S, u, f) => { H.hat.visible = true; } },
      // 7 · …his stocks land on your desk: the long box slams down
      { set: "office", word: [3, "his"], lead: 3, trans: "whip", light: "office", cam: CAM.fit([0.15, 1.2, -0.9], { w: 2.0, a0: 10, a1: 2, elev: 14 }),
        act: (S, u, f) => { const t = W(3, "desk."); H.sdbox.visible = true; H.sdbox.position.y = DESK + 1.2 * (1 - E.easeIn(E.prog(f, S.a, t)));
          S.actor("you", { x: -0.2, z: -1.55, expr: f < t ? "neutral" : "shock" });
          S.kick(t, 0.07); S.pop("puff", t, 14, { x: 0.3, y: DESK + 0.1, z: -0.4, w: 1.0, h: 0.35 }); S.pop("label", t + 2, 30, { x: 0.3, y: DESK + 0.45, z: -0.45, w: 0.85, h: 0.18, text: "HIS STOCKS", bg: "#f4efe2", hold: true }); } },
      // 8 · he'd been copying you: the lid opens, certificates spill out
      { set: "office", beat: 4, light: "office", steady: true, cam: CAM.fit([0.1, 1.25, -1.0], { w: 1.6, a0: -6, a1: 4, elev: 10, push: 0.12 }), coc: 9,
        act: (S, u, f) => { H.sdbox.visible = true; H.lid.rotation.x = -1.6 * E.back(E.prog(f, S.a, S.a + 10));
          H.spill.forEach((c, i) => { c.visible = f > S.a + 6 + i * 2; c.position.y = DESK + 0.17 + 0.3 * E.ss(E.prog(f, S.a + 6 + i * 2, S.a + 16 + i * 2)) * Math.sin(E.prog(f, S.a + 6 + i * 2, S.a + 22 + i * 2) * PI) + i * 0.01; c.rotation.z = 0.3 * Math.sin(i * 1.7); });
          S.actor("you", { x: -0.25, z: -1.55, expr: "shock", prop: "point" }); S.pop("exclaim", W(4, "copying"), 26, { x: -0.25, y: 2.25, z: -1.4, w: 0.25, h: 0.4, hold: true }); } },
      // 9 · half of you: BUY checked, SELL crossed out
      { set: "office", word: [4, "Half"], lead: 3, trans: "whip", light: "office", cam: CAM.fit([0, 1.5, -2.9], { w: 2.6, a0: 0, a1: 0, elev: 2, push: 0.1 }),
        act: (S, u, f) => { S.pop("label", W(4, "Half"), 40, { x: -0.8, y: 2.1, z: -2.8, w: 0.7, h: 0.3, text: "COPIED", bg: "#4fd18b", hold: true });
          S.pop("impact", W(4, "you.", 1) - 2, 24, { x: 0.8, y: 1.9, z: -2.75, w: 1.0, h: 0.75, text: "IGNORED" }); S.kick(W(4, "you.", 1), 0.04); } },
      // 10 · flashback: whenever you said buy, he read your memo in his armchair
      { set: "den", beat: 5, trans: "whip", light: "flashback", cam: CAM.fit([0.3, 1.2, -1.2], { w: 2.4, a0: 12, a1: 4, elev: 4, push: 0.1 }),
        act: (S, u, f) => { S.actor("husband", { x: 0, z: -1.25, expr: "smile", prop: "paper", mode: "sit" }); S.fx("label", { x: -0.1, y: 1.75, z: -0.9, w: 1.1, h: 0.22, text: "THE COPYCAT", bg: "#f4efe2" });
          H.memo.visible = f >= W(5, "buy,") - 6; H.memo.position.set(0.55, 1.35 + 0.6 * (1 - E.back(E.prog(f, W(5, "buy,") - 6, W(5, "buy,") + 2))), -0.8); H.memo.rotation.z = 0.15 * Math.sin(f * 0.2);
          S.say("Buy? Buying.", W(5, "buy,") + 4, 30, { x: 0.15, y: 2.2, z: -0.9, w: 1.3, h: 0.42 }); } },
      // 11 · about five thousand dollars: the cash on the side table
      { set: "den", word: [5, "five"], lead: 4, light: "flashback", steady: true, coc: 11, cam: CAM.fit([1.05, 0.75, -1.1], { w: 1.0, a0: 8, a1: 0, elev: 20, push: 0.1 }),
        act: (S, u, f) => { H.cash.visible = true; H.cash.stacks.forEach((s, i) => { s.visible = f >= S.a + i * 3; });
          S.pop("label", W(5, "five"), 34, { x: 1.05, y: 1.2, z: -0.95, w: 0.7, h: 0.22, text: "$5,000", bg: "#ffd84a", hold: true }); S.pop("coin", W(5, "dollars,"), 18, { x: 1.3, y: 1.0, z: -0.9, w: 0.2, h: 0.2, rise: 0.3 }); } },
      // 12 · into the safe-deposit box: the certificate drops in, the drawer slams
      { set: "vault", beat: 6, trans: "whip", light: "vault", cam: CAM.fit([-0.3, 1.45, -1.9], { w: 1.9, a0: -14, a1: -4, elev: 4 }),
        act: (S, u, f) => { const t = W(6, "box,"); H.drawer.position.z = -2.44 + 0.55 * (1 - E.easeIn(E.prog(f, t - 6, t)));
          H.dcert.visible = f < t - 4; H.dcert.position.y = 1.85 - 0.3 * E.easeIn(E.prog(f, W(6, "certificate") - 4, W(6, "certificate") + 6)); H.dcert.position.z = -2.0;
          S.actor("husband", { x: -0.75, z: -1.75, expr: "smile_closed", prop: "point" }); S.kick(t, 0.05); S.pop("impact", t, 16, { x: 0.1, y: 1.6, z: -1.8, w: 0.6, h: 0.45, text: "CLUNK" }); } },
      // 13 · …and forgot it: he strolls off whistling, dust settles on the drawer
      { set: "vault", word: [6, "and"], lead: 3, light: "vault", cam: CAM.fit([0.2, 1.3, -1.8], { w: 3.2, a0: 10, a1: 16, elev: 4 }),
        act: (S, u, f) => { S.actor("husband", { x: 0.2 + 0.03 * (f - S.a), z: -1.4, expr: "whistle", mode: "stroll", phase: f * 0.06 });
          S.pop("puff", W(6, "forgot") - 2, 20, { x: 0, y: 1.5, z: -2.3, w: 0.8, h: 0.4, pop: false }); S.pop("zz", W(6, "forgot"), 24, { x: -0.1, y: 1.8, z: -2.3, w: 0.35, h: 0.35, rise: 0.3 }); } },
      // 14 · whenever you said sell? the SELL letters fly into his den
      { set: "den", beat: 7, trans: "whip", light: "flashback", cam: CAM.fit([0, 1.2, -1.2], { w: 2.6, a0: -12, a1: -4, elev: 5 }),
        act: (S, u, f) => { S.actor("husband", { x: 0, z: -1.25, expr: "smile_closed", mode: "sit", headTilt: 6 });
          H.letters.forEach((L, i) => { const t0 = W(7, "sell?") - 10 + i * 3; L.visible = f >= t0; const k = E.ss(E.prog(f, t0, t0 + 10)); L.position.set(-1.6 + 2.0 * k + 0.15 * Math.sin(i * 2.1), 2.4 - 1.5 * k + 0.12 * (i % 3), -0.6 + 0.05 * i); L.rotation.z = (1 - k) * 2 + 0.3 * Math.sin(i * 1.3); }); } },
      // 15 · nothing: he snoozes; the letters pile up at his feet
      { set: "den", word: [7, "Nothing."], lead: 3, light: K.light("flashback", { sat: 0.8 }), steady: true, cam: CAM.fit([0, 1.0, -1.2], { w: 1.9, a0: 6, a1: 2, elev: 6, push: 0.08 }),
        act: (S, u, f) => { S.actor("husband", { x: 0, z: -1.25, expr: "smile_closed", mode: "sit", headTilt: 10, blink: 0 });
          H.letters.forEach((L, i) => { L.visible = true; L.position.set(-0.3 + (i % 3) * 0.3, 0.05 + Math.floor(i / 3) * 0.04, -0.55 + 0.05 * (i % 2)); L.rotation.set(-PI / 2, 0, 0.4 * Math.sin(i * 2)); });
          for (let q = 0; q < 3; q++) S.pop("zz", S.a + 4 + q * 9, 18, { x: 0.3, y: 1.9 + q * 0.1, z: -1.0, w: 0.3, h: 0.3, rise: 0.4, pop: false }); } },
      // 16 · so how did your lazy copycat do? you stare at the box, questions bloom
      { set: "office", beat: 8, trans: "whip", light: K.light("office", { sat: 0.95 }), cam: CAM.fit([0.0, 1.45, -1.3], { w: 1.6, a0: -4, a1: 4, elev: 4, push: 0.2 }),
        act: (S, u, f) => { H.sdbox.visible = true; S.actor("you", { x: 0.0, z: -1.55, expr: "nervous", prop: "chin" });
          S.pop("question", W(8, "how") - 2, 40, { x: 0.45, y: 2.2, z: -1.4, w: 0.3, h: 0.42, hold: true }); S.pop("question", W(8, "copycat"), 30, { x: -0.4, y: 2.3, z: -1.4, w: 0.25, h: 0.35, hold: true }); } },
      // 17 · some shrank below two thousand: three cans' stacks sink
      { set: "cans", beat: 9, trans: "whip", light: K.backdrop("#2a4a7a"), cam: CAM.fit([-0.5, 1.4, -0.6], { w: 3.8, a0: -12, a1: -4, elev: 6 }),
        act: (S, u, f) => { const k = E.ss(E.prog(f, W(9, "shrank") - 4, W(9, "dollars.") + 4));
          H.stacks.forEach((s, i) => { s.scale.y = [0, 2, 4].includes(i) ? 0.25 - 0.2 * k : 0.25; });
          for (const [i, x] of [[0, -2.0], [2, 0], [4, 2.0]]) { S.pop("arrow", W(9, "shrank") + i, 40, { x, y: 2.0, z: -0.4, w: 0.3, h: 0.55, dir: "down", hold: true }); }
          S.pop("label", W(9, "two") - 2, 40, { x: -1.0, y: 2.6, z: -0.3, w: 1.5, h: 0.3, text: "UNDER $2,000", bg: "#ff8a7a", hold: true }); } },
      // 18 · several grew past a hundred thousand: two stacks rise out of their cans
      { set: "cans", word: [9, "Several"], lead: 3, trans: "dissolve", light: K.backdrop("#2a4a7a"), cam: CAM.fit([0, 1.8, -0.6], { w: 4.6, a0: 8, a1: 14, elev: 6 }),
        act: (S, u, f) => { const k = E.back(E.prog(f, W(9, "grew") - 2, W(9, "thousand.") + 2));
          H.stacks.forEach((s, i) => { s.scale.y = [1, 3].includes(i) ? 0.25 + 1.6 * k : 0.05; });
          for (const x of [-1.0, 1.0]) { S.pop("label", W(9, "hundred") + (x > 0 ? 3 : 0), 40, { x, y: 3.0, z: -0.3, w: 0.95, h: 0.28, text: "$100,000+", bg: "#4fd18b", hold: true }); S.pop("arrow", W(9, "grew"), 30, { x: x + 0.45, y: 2.3, z: -0.3, w: 0.3, h: 0.5, dir: "up", hold: true }); } } },
      // 19 · you see — push through into the Old West cabin: a prospector with his coffee can
      { set: "cabin", beat: 10, trans: "zoom", light: "lamp", cam: CAM.fit([0.0, 1.2, -0.9], { w: 2.6, a0: -16, a1: -6, elev: 5, push: 0.12 }),
        act: (S, u, f) => { S.actor("prospector", { x: 0.75, z: -0.7, expr: "grin", prop: "hold", flip: true });
          H.can.position.set(0.3, 0.9, -0.35); S.pop("glow", W(10, "coffee") - 2, 40, { x: 0.3, y: 1.15, z: -0.2, w: 0.7, h: 0.7, hold: true });
          S.pop("label", W(10, "Old") - 2, 50, { x: -0.6, y: 2.25, z: -0.7, w: 1.25, h: 0.28, text: "COFFEE CAN", bg: "#f4e6c8", hold: true }); } },
      // 20 · …under the mattress: the can slides in, the mattress flops down
      { set: "cabin", word: [10, "under"], lead: 4, light: "lamp", steady: true, coc: 10, cam: CAM.fit([-0.1, 0.55, -1.2], { w: 1.8, a0: 18, a1: 10, elev: 14, push: 0.1 }),
        act: (S, u, f) => { const t = W(10, "mattress."); const k = E.ss(E.prog(f, S.a, t - 6)); H.can.position.set(0.5 - 0.8 * k, 0.0, -1.4 + 0.0 * k); H.can.scale.setScalar(0.3);
          H.mattress.rotation.z = f < t - 6 ? 0.25 * E.ss(E.prog(f, S.a, S.a + 6)) : 0.25 * (1 - E.easeIn(E.prog(f, t - 6, t)));
          H.mattress.position.x = -0.3 - 0.05 * Math.sin(H.mattress.rotation.z);
          S.kick(t, 0.04); S.pop("puff", t, 14, { x: -0.3, y: 0.55, z: -0.9, w: 1.4, h: 0.4 }); } },
      // 21 · a dud can only lose what's inside: one can tips over, a few coins roll out
      { set: "cans", beat: 11, trans: "whip", light: K.backdrop("#2a4a7a"), cam: CAM.fit([-1.0, 0.9, 0.9], { w: 1.8, a0: -10, a1: 0, elev: 8, push: 0.1 }),
        act: (S, u, f) => { H.dud.visible = true; const t = W(11, "dud") + 4; const k = E.easeIn(E.prog(f, t, t + 8)); H.dud.rotation.z = k * PI / 2; H.dud.position.x = -1.0 - 0.32 * k; H.dud.position.y = 0.32 * k;
          H.stacks.forEach((s) => (s.scale.y = 0.05));
          H.dcoins.forEach((c, i) => { c.visible = f > t + 6; const q = E.prog(f, t + 6 + i * 2, t + 22 + i * 2); c.position.set(-1.45 - 0.5 * q - i * 0.12, 0.4 - 0.36 * Math.min(1, q * 2), 1.0 + (i - 1.5) * 0.15); c.rotation.x = q * 6; });
          S.kick(t + 8, 0.03); S.pop("label", W(11, "inside."), 40, { x: -1.0, y: 1.55, z: 1.1, w: 1.25, h: 0.26, text: "MAX LOSS: $5,000", bg: "#ff8a7a", hold: true }); } },
      // 22 · a winner has no ceiling: one stack rockets up and smashes through the ceiling
      { set: "cans", word: [11, "A", 1], lead: 3, trans: "cut", light: K.backdrop("#2a4a7a"), cam: CAM.fit([1.0, 2.4, -0.6], { w: 3.6, a0: 8, a1: 2, e0: -4, e1: 6 }),
        act: (S, u, f) => { const t = W(11, "ceiling."); H.stacks.forEach((s, i) => { s.scale.y = i === 3 ? 1.85 + 2.4 * E.easeIn(E.prog(f, S.a + 6, t)) : i === 1 ? 1.85 : 0.05; });
          const k = E.prog(f, t, t + 16); H.ceil.forEach((c, i) => { if (f >= t) { c.position.y = 4.2 + 1.5 * k + (i - 1.5) * 0.3 * k; c.position.x += (i - 1.5) * 0.8 * k; c.rotation.z = (i - 1.5) * k; } });
          S.kick(t, 0.1); S.pop("impact", t, 22, { x: 1.0, y: 3.8, z: -0.3, w: 1.3, h: 1.0, text: "CRASH!" }); S.pop("sparks", t, 18, { x: 1.0, y: 4.0, z: -0.3, w: 1.0, h: 0.8 });
          S.pop("label", W(11, "winner") - 2, 50, { x: 1.0, y: 1.9, z: 0.0, w: 0.9, h: 0.26, text: "WINNER", bg: "#4fd18b", hold: true }); } },
      // 23 · one small bet in a company called Haloid: a coin onto the copier, the sign
      { set: "lab", beat: 12, trans: "whip", light: "office", cam: CAM.fit([0, 1.6, -1.6], { w: 3.0, a0: -10, a1: -2, elev: 8, push: 0.1 }),
        act: (S, u, f) => { H.coin.visible = true; H.coin.position.y = 1.1 + 1.0 * (1 - E.easeIn(E.prog(f, W(12, "small") - 6, W(12, "bet")))); H.coin.rotation.z = f * 0.4;
          S.actor("tech", { x: 0.95, z: -0.6, expr: "smile", prop: "point", flip: true }); S.pop("label", W(12, "bet") , 34, { x: -0.4, y: 1.55, z: -1.0, w: 0.7, h: 0.22, text: "$5,000", bg: "#ffd84a", hold: true });
          S.pop("stars", W(12, "Haloid") , 22, { x: 0, y: 2.8, z: -2.6, w: 1.4, h: 0.6 }); } },
      // 24 · …grew past eight hundred thousand dollars: the machine flashes and spits pages, the number climbs
      { set: "lab", word: [12, "grew"], lead: 3, light: "office", cam: CAM.fit([0.3, 1.3, -1.2], { w: 2.4, a0: 12, a1: 4, elev: 6, push: 0.15 }),
        act: (S, u, f) => { H.glass.visible = (f >> 2) % 2 === 0; H.pages.forEach((p, i) => { const t0 = S.a + 4 + i * 6; p.visible = f >= t0; const q = E.prog(f, t0, t0 + 10); p.position.set(0.95 + 0.55 * q, 0.6 + 0.02 * i - 0.1 * q, -1.35 + 0.3 * q); p.rotation.z = -0.4 * q; });
          S.actor("tech", { x: -0.75, z: -0.6, expr: "shock", prop: "up" });
          const n = Math.round(5 + 795 * E.easeIn(E.prog(f, S.a, W(12, "dollars.") - 2))); S.fx("label", { x: 0.2, y: 2.35, z: -1.0, w: 1.4, h: 0.36, text: "$" + n.toLocaleString("en-US") + ",000", bg: n >= 800 ? "#4fd18b" : "#f4efe2" });
          S.pop("sparks", W(12, "dollars."), 18, { x: 0.2, y: 2.35, z: -0.9, w: 1.4, h: 0.6 }); } },
      // 25 · Haloid became Xerox: the sign flips
      { set: "lab", beat: 13, trans: "smash", light: "office", cam: CAM.fit([0, 2.3, -2.6], { w: 3.2, a0: -6, a1: 6, elev: 2, push: 0.1 }),
        act: (S, u, f) => { const t = W(13, "became") + 2; const k = E.prog(f, t, t + 8); H.signH.rotation.x = k * PI / 2; H.signH.visible = k < 1;
          H.signX.visible = f >= t + 8; H.signX.rotation.x = -PI / 2 * (1 - E.back(E.prog(f, t + 8, t + 16)));
          S.kick(W(13, "Xerox."), 0.05); S.pop("burst", W(13, "Xerox."), 20, { x: 0, y: 2.7, z: -2.4, w: 2.4, h: 1.2 }); } },
      // 26 · that one stock: the brass scale on your desk, one certificate against your whole portfolio
      { set: "office", word: [13, "That"], lead: 3, trans: "whip", light: "office", cam: CAM.fit([0.45, 1.25, -0.75], { w: 1.6, a0: -12, a1: -4, elev: 6, push: 0.08 }),
        act: (S, u, f) => { H.scale.visible = true; H.ledgers.forEach((b) => (b.visible = false)); H.scale.tilt(0.25 * Math.sin(f * 0.12) * (1 - E.prog(f, S.a, W(13, "outgrew"))) + 0.15 * E.ss(E.prog(f, W(13, "outgrew"), W(13, "whole"))));
          S.pop("label", W(13, "one") - 2, 50, { x: 0.05, y: 1.95, z: -0.6, w: 0.6, h: 0.18, text: "ONE STOCK", bg: "#ffd84a", hold: true });
          S.pop("label", W(13, "wife's") - 2, 40, { x: 0.85, y: 1.95, z: -0.6, w: 0.75, h: 0.18, text: "HER PORTFOLIO", bg: "#f4efe2", hold: true }); } },
      // 27 · …whole portfolio: you lean in, nervous
      { set: "office", word: [13, "whole"], lead: 3, light: "office", cam: CAM.fit([-0.05, 1.4, -1.0], { w: 2.4, a0: 14, a1: 8, elev: 5, push: 0.1 }),
        act: (S, u, f) => { H.scale.visible = true; H.ledgers.forEach((b) => (b.visible = false)); H.scale.tilt(0.15 + 0.05 * Math.sin(f * 0.3));
          S.actor("you", { x: -0.7, z: -1.55, expr: "nervous", prop: "chin" }); S.pop("sweat", S.a + 8, 20, { x: -0.45, y: 2.05, z: -1.4, w: 0.18, h: 0.22, rise: -0.3 }); } },
      // 28 · YOURS: the scale slams, your portfolio flies off the pan and bonks you
      { set: "office", word: [13, "Yours."], lead: 6, trans: "cut", light: "office", cam: CAM.fit([-0.05, 1.35, -1.0], { w: 2.6, a0: 6, a1: 0, elev: 5 }),
        act: (S, u, f) => { H.scale.visible = true; H.ledgers.forEach((b) => (b.visible = false)); const t = W(13, "Yours."); const k = E.easeIn(E.prog(f, S.a, t));
          H.scale.tilt(0.15 + 0.45 * k); H.bPan.visible = f < t;
          H.fly.visible = f >= t; const q = E.prog(f, t, t + 5); H.fly.position.set(0.95 - 1.7 * q, DESK + 0.9 + 1.0 * Math.sin(q * PI * 0.9), -0.75 - 0.6 * q); H.fly.rotation.z = q * 4;
          const hit = t + 5; S.actor("you", { x: -0.7, z: -1.55, expr: f < hit ? "shock" : "dazed", mode: f < hit + 4 ? "stand" : "fall", prop: f < hit ? "up" : null });
          S.kick(t, 0.06); S.kick(hit, 0.1); S.pop("impact", hit, 26, { x: -0.7, y: 2.0, z: -1.2, w: 1.0, h: 0.8, text: "BONK!" }); S.pop("stars", hit + 2, 26, { x: -0.7, y: 1.7, z: -1.2, w: 0.8, h: 0.5 }); } },
    ],
  };
};
