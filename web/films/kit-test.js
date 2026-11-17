// kit smoke test: one shot per set
export default (K, T) => {
  const { CAM, E } = K;
  let clock, screen, wheel;
  return {
    cast: {
      eddie: { jacket: "#8a3b2a", pants: "#3b3f52", boots: "#3a2418", hat: "cowboy", capColor: "#a8743c", skin: "#f5c9a0", moustache: "#5a3a24" },
      vera: { jacket: "#2f5f6a", pants: "#2a2d38", boots: "#241726", hat: "hair", hair: "#7a3a24", dress: "#c25a7a", skin: "#ecd0b6" },
      worker: { jacket: "#d08a2a", pants: "#3b4a6a", boots: "#3a2a20", hat: "hardhat", skin: "#c99067" },
    },
    sets: {
      west: (B) => { B.set.street({ style: "western", signs: ["SALOON", "BANK", "HOTEL", "ASSAY", "STORE", "BARBER"], seed: 4 }); B.prop.barrel({ x: 3, z: 3 }); B.prop.barrel({ x: 3.6, z: 2.3 }); },
      saloon: (B) => { B.set.room({ style: "saloon", w: 12, d: 9, h: 4.5, windows: [-3, 3] }); B.prop.roundTable({ x: 0, z: 0 }); B.prop.chips({ x: 0.2, y: 0.76, z: 0.1 });
        B.prop.counter({ x: 0, z: -3.6, w: 7 }); B.prop.shelf({ x: -3, z: -4.3, w: 3, h: 2.2, fill: "bottles" }); B.prop.lamp({ kind: "hang", x: 0, y: 4.3, z: 0, intensity: 7 });
        clock = B.prop.clock({ x: 3, y: 3, z: -4.4, r: 0.45 }); },
      mind: (B) => { B.set.mind({ eye: "#f4d6a0" }); },
      stage: (B) => { B.set.stage({ floor: "#f4efe2", back: "#3f8fe0" }); B.prop.pedestal({ x: 0, z: 0 }); B.prop.coinStack({ x: -0.5, y: 0.5, n: 12 }); B.prop.goldBars({ x: 0.5, y: 0.5, n: 6 }); B.prop.arrow({ x: 2.2, z: -1, dir: "up", size: 1.4 }); },
      city: (B) => { B.set.city({ seed: 3 }); B.prop.bench({ x: 2, z: 1 }); B.prop.lampPost({ x: -2, z: 1 }); B.prop.car({ x: 0, z: -4, ry: Math.PI / 2, col: "#c0353a" }); },
      desert: (B) => { B.set.landscape({ kind: "desert", seed: 9, road: 6 }); },
      office: (B) => { B.set.room({ style: "office", w: 9, d: 7, windows: [-2, 2] }); B.prop.desk({ x: 0, z: -1 }); B.prop.lamp({ kind: "desk", x: -0.6, y: 0.78, z: -1.1 }); screen = B.prop.screen({ x: 2.6, z: -3.3, w: 2.6, h: 1.5, y0: 1.2, label: "STOCK" }); B.prop.plant({ x: -3.5, z: -2.8 }); B.prop.piggy({ x: 0.5, y: 0.78, z: -1, s: 0.4 }); },
      vault: (B) => { B.set.room({ style: "vault", w: 9, d: 7, door: false }); const v = B.prop.vaultDoor({ x: 0, z: -3.3 }); wheel = v.wheel; B.prop.cash({ x: -2.6, z: -2, n: 6 }); B.prop.goldBars({ x: 2.6, z: -2, n: 6 }); B.prop.moneyBag({ x: 1.5, z: -0.5 }); },
      harbor: (B) => { B.set.harbor({ crates: ["TEA", "SPICE", "SILK", "TEA"] }); },
      meadow: (B) => { B.set.landscape({ kind: "farm", seed: 2, hills: true }); B.prop.fence({ x: 0, z: -3, len: 8 }); B.prop.tree({ x: -3, z: -5 }); },
    },
    shots: [
      { set: "west", beat: 0, light: "desert", cam: CAM.move({ p: [1.2, 1.4, 7], t: [0, 1.4, 0] }, { p: [0.8, 1.6, 5], t: [0, 1.5, 0] }),
        act: (S, u, f) => { S.actor("eddie", { x: 0, z: 0, expr: "stern", prop: "fists" }); S.actor("vera", { key: "v2", o: "vera", x: -2, z: -3, expr: "shock", prop: "up" }); S.pop("impact", T.word(0, "bang"), 12, { x: 0.8, y: 1.9, z: 0.3, w: 1.2, h: 1.2, text: "BANG!" }); } },
      { set: "saloon", beat: 1, light: "interior", trans: "dissolve", cam: CAM.orbit([0, 1.2, 0], 4.2, 0.6, -25, 15, 42),
        act: (S, u, f) => { clock.time(10 + u * 3); S.actor("eddie", { x: -1.1, z: 0.4, mode: "sit", expr: "smile" }); S.actor("vera", { x: 1.1, z: 0.4, expr: "grin", prop: "point" }); S.say("After you.", T.word(1, "bang"), 14, { x: 1.3, y: 2.6, z: 0.6 }); S.pop("aura", f - 1, 3, { x: -1.1, y: 1.1, z: 0.35, w: 1.7, h: 2.6, pop: false, col: "#ff6a2a" }); } },
      { set: "mind", beat: 2, light: "mind", trans: "zoom", cam: CAM.move({ p: [0, 1.7, 4.5], t: [0, 1.6, -2] }, { p: [0, 1.5, 3.2], t: [0, 1.4, -2] }),
        act: (S, u, f) => { S.actor("worker", { x: -1, z: -0.4, expr: "nervous", prop: "point" }); S.actor("eddie", { key: "e2", x: 1, z: -0.4, expr: "dazed", side: true, flip: true, mode: "march", phase: f * 0.05 }); S.pop("sweat", f - 2, 4, { x: -0.6, y: 2.1, z: -0.2, w: 0.5, h: 0.5, pop: false }); } },
      { set: "stage", beat: 3, light: K.backdrop("#3f8fe0"), trans: "whip", cam: CAM.orbit([0, 1.1, 0], 5, 0.8, 20, -20, 40),
        act: (S, u, f) => { S.pop("word", T.word(3, "bang"), 14, { x: 0, y: 2.6, z: 0.5, w: 2.2, h: 0.8, text: "COMPOUND!" }); S.pop("sparks", T.word(3, "bang"), 12, { x: 0.5, y: 1.3, z: 0.3, w: 1.6, h: 1.6 }); } },
      { set: "city", beat: 4, light: "golden", trans: "whip", cam: CAM.crane([0, 2, -4], 9, 1.2, 6, 0, 45), act: (S) => { S.actor("vera", { x: 0.5, z: 1, mode: "stroll", phase: S.f * 0.04, expr: "smile" }); } },
      { set: "desert", beat: 5, light: "sunset", trans: "flash", cam: CAM.still([3, 1.5, 9], [0, 1.4, 0], 38), act: (S, u, f) => { S.actor("eddie", { x: 0, z: 0, side: true, mode: "march", phase: f * 0.05 }); S.fx("speed", { t: u, x: -0.8, y: 1.2, z: 0.1, w: 1.5, h: 1.2 }); } },
      { set: "office", beat: 6, light: "office", trans: "smash", cam: CAM.move({ p: [-1, 1.5, 4.2], t: [0.8, 1.4, -1.5] }, { p: [0, 1.45, 3.4], t: [1.2, 1.5, -2] }),
        act: (S, u, f) => { screen.draw({ curve: (x) => 0.2 + 0.7 * x * x, t: u, label: "PATIENCE" }); S.actor("worker", { x: -0.3, z: -0.2, expr: "relief", prop: "chin" }); } },
      { set: "vault", beat: 7, light: "vault", trans: "dip", cam: CAM.move({ p: [0, 1.6, 5.5], t: [0, 1.6, -3] }, { p: [0, 1.7, 4], t: [0, 1.6, -3] }), act: (S, u) => { wheel.rotation.z = u * 3; S.actor("vera", { x: 1.2, z: -0.5, expr: "laugh", prop: "up" }); S.pop("confetti", S.a + 5, 25, { x: 0, y: 2, z: 0.5, w: 4, h: 3, pop: false }); } },
      { set: "harbor", beat: 8, light: "day", trans: "dissolve", cam: CAM.orbit([0, 1.5, 2], 7, 1.5, 30, 50, 45), act: (S) => { S.actor("worker", { x: 0, y: 0.8, z: 4, expr: "smile", prop: "hold" }); } },
      { set: "meadow", beat: 9, light: "spring", trans: "cut", cam: CAM.still([1, 1.6, 7], [0, 1.4, 0]), act: (S) => { S.actor("eddie", { x: 0, z: 0, expr: "grin", wave: Math.sin(S.f * 0.4) * 0.5 + 0.5 }); S.pop("arrow", S.a + 4, 25, { x: 0.9, y: 2.4, z: 0.2, w: 0.6, h: 0.8, dir: "up", hold: true }); } },
    ],
  };
};
