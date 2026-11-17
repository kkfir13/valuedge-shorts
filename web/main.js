// Engine: toon world + ink (depth/normal edges) + cartoon cards + DOF + grade. window.renderFrame(f) draws frame f.
import * as THREE from "three";
import * as P from "./paint.js";
import { world, cards, grad } from "./core.js";
import { drawActor, drawFx, CW, CH } from "./cast.js";
const Q = new URLSearchParams(location.search);
const SCALE = parseFloat(Q.get("s") || "1");
const BOARD = Q.get("board") ? await (await fetch(Q.get("board"))).json() : null;
window.BOARD = BOARD;
const FILM = Q.get("film");
const S = FILM ? await import("./film.js") : BOARD ? await import("./board.js") : await import("./story.js");

const W = Math.round(1080 * SCALE / 2) * 2, H = Math.round(1920 * SCALE / 2) * 2;
const SU = 0.00225, CARD_W = 600 * SU, CARD_H = 1000 * SU;
const renderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true });
renderer.setSize(W, H); renderer.setPixelRatio(1);
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.add(world, cards);
const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 900);
scene.fog = new THREE.Fog(0xdfeaf5, 60, 320);


// ---------- world content ----------
let R = {};
if (FILM) R = await S.buildFilm(FILM, Q.get("timing") || FILM.replace(/\.js$/, ".timing.json"));
else { const { buildLegacy } = await import("./legacy.js"); R = buildLegacy(BOARD); }

// ---------- lights ----------
const hemi = new THREE.HemisphereLight(0xcfe2ff, 0xb8c4d8, 1.0); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffffff, 2.0); sun.castShadow = true;
sun.shadow.mapSize.set(SCALE < 1 ? 1536 : 2048, SCALE < 1 ? 1536 : 2048); Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, near: 1, far: 160 });
sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.03; scene.add(sun, sun.target);

// ---------- cards ----------
const cardGeo = new THREE.PlaneGeometry(CARD_W, CARD_H); cardGeo.translate(0, (975 - 500) * SU, 0);
const cardPool = new Map();
function cardFor(id, w = CW, h = CH) {
  if (cardPool.has(id)) return cardPool.get(id);
  const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  const mat = new THREE.MeshBasicMaterial({ map: tex, alphaTest: 0.5, side: THREE.DoubleSide, fog: true });
  const mesh = new THREE.Mesh(id.startsWith("fx") ? new THREE.PlaneGeometry(1, 1) : cardGeo, mat);
  const c = { cv, g: cv.getContext("2d"), tex, mat, mesh, key: "" }; cards.add(mesh); cardPool.set(id, c); return c;
}
const blobTex = (() => { const cv = document.createElement("canvas"); cv.width = cv.height = 128; drawFx(cv.getContext("2d"), "blob", 0, 128, 128); const t = new THREE.CanvasTexture(cv); return t; })();
const blobs = [];
function blobAt(i) {
  if (!blobs[i]) { const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: blobTex, transparent: true, depthWrite: false })); m.rotation.x = -Math.PI / 2; cards.add(m); blobs[i] = m; }
  return blobs[i];
}
const clouds = [];
{ const R = P.rng(31); for (let i = 0; i < 9; i++) { const m = new THREE.Mesh(new THREE.PlaneGeometry(90, 45), new THREE.MeshBasicMaterial({ map: P.cloud(), transparent: true, depthWrite: false, fog: false }));
  m.position.set(-300 + i * 75 + R() * 30, 70 + R() * 50, -330 - R() * 40); cards.add(m); clouds.push(m); } }

// ---------- passes ----------
const mkRT = (samples, depth) => { const rt = new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType, samples });
  if (depth) { rt.depthTexture = new THREE.DepthTexture(W, H); rt.depthTexture.type = THREE.UnsignedIntType; } return rt; };
const rtCol = mkRT(4, false), rtNrm = mkRT(0, true), rtCard = mkRT(4, true), rtComp = mkRT(0, false);
const normalMat = new THREE.MeshNormalMaterial();
const depthOnly = new THREE.MeshBasicMaterial({ colorWrite: false });
const fsq = (frag, uniforms) => { const m = new THREE.ShaderMaterial({ uniforms, vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.,1.); }", fragmentShader: frag, depthTest: false, depthWrite: false });
  const s = new THREE.Scene(); s.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), m)); return { m, s }; };
const ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const COMMON = `
uniform float near, far; uniform vec2 res;
float lin(float d){ float z = d * 2.0 - 1.0; return 2.0 * near * far / (far + near - z * (far - near)); }`;
const inkP = fsq(`
varying vec2 vUv; uniform sampler2D tCol, tNrm, tD, tCard; uniform vec3 ink, skyTop, skyHor; uniform float inkW;
${COMMON}
void main(){
  vec3 col = texture2D(tCol, vUv).rgb; float d0 = texture2D(tD, vUv).r;
  if (d0 >= 0.99999) { float t = smoothstep(0.25, 1.0, vUv.y); col = mix(skyHor, skyTop, t); }
  else {
    float l0 = lin(d0); vec3 n0 = texture2D(tNrm, vUv).rgb * 2.0 - 1.0; float e = 0.0;
    vec2 px = inkW / res;
    for (int i = 0; i < 8; i++) {
      float a = float(i) * 0.785398; vec2 o = vec2(cos(a), sin(a)) * px;
      float dn = texture2D(tD, vUv + o).r; float ln = dn >= 0.99999 ? far : lin(dn);
      if (ln - l0 > 0.035 * l0 + 0.04) e = 1.0;
      vec3 nn = texture2D(tNrm, vUv + o).rgb * 2.0 - 1.0;
      if (abs(ln - l0) < 0.08 * l0 && dot(n0, nn) < 0.72) e = max(e, 0.85);
    }
    float fade = 1.0 - smoothstep(140.0, 520.0, l0);
    col = mix(col, ink, e * fade);
  }
  vec4 c = texture2D(tCard, vUv);
  col = col * (1.0 - c.a) + c.rgb;
  gl_FragColor = vec4(col, 1.0);
}`, { tCol: { value: rtCol.texture }, tNrm: { value: rtNrm.texture }, tD: { value: rtNrm.depthTexture }, tCard: { value: rtCard.texture },
  ink: { value: new THREE.Color(0x241726).convertSRGBToLinear() }, skyTop: { value: new THREE.Color() }, skyHor: { value: new THREE.Color() }, inkW: { value: 2.5 * SCALE },
  near: { value: 0.1 }, far: { value: 900 }, res: { value: new THREE.Vector2(W, H) } });
const finP = fsq(`
varying vec2 vUv; uniform sampler2D tC, tD; uniform float focus, coc, sat, flash, vign, time, snowAmt, fadeK; uniform vec3 tint, lift, flashCol;
${COMMON}
float h1(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void main(){
  float d = texture2D(tD, vUv).r; float l = d >= 0.99999 ? far : lin(d);
  float c0 = clamp(abs(l - focus) / max(l, 0.01) * coc, 0.0, 14.0);
  vec3 acc = texture2D(tC, vUv).rgb; float wsum = 1.0;
  if (c0 > 0.6) {
    for (int i = 1; i < 32; i++) {
      float r = sqrt(float(i) / 32.0) * c0; float a = float(i) * 2.39996;
      vec2 o = vec2(cos(a), sin(a)) * r / res; float ds = texture2D(tD, vUv + o).r; float ls = ds >= 0.99999 ? far : lin(ds);
      float cs = clamp(abs(ls - focus) / max(ls, 0.01) * coc, 0.0, 14.0);
      float w = (ls < l - 0.3) ? smoothstep(r - 1.0, r + 1.0, cs) : 1.0;
      acc += texture2D(tC, vUv + o).rgb * w; wsum += w;
    }
  }
  vec3 col = acc / wsum;
  // snow (screen-space, 3 depth layers)
  if (snowAmt > 0.0) for (int k = 0; k < 3; k++) {
    float sc = 14.0 + float(k) * 10.0; vec2 p = vUv * vec2(sc * 0.5625, sc);
    p.y += time * (0.9 - float(k) * 0.2); p.x += sin(time * 0.7 + float(k)) * 0.3;
    vec2 cell = floor(p), f = fract(p); float r = h1(cell + float(k) * 7.0);
    vec2 c = vec2(0.2 + 0.6 * h1(cell + 3.1), 0.2 + 0.6 * r);
    float s = smoothstep(0.09 - float(k) * 0.02, 0.0, length(f - c)) * step(0.45, r);
    col = mix(col, vec3(1.0), s * snowAmt * (0.95 - float(k) * 0.2));
  }
  float Y = dot(col, vec3(0.2126, 0.7152, 0.0722)); col = mix(vec3(Y), col, sat);
  col = col * tint + lift;
  vec2 q = vUv - 0.5; col *= 1.0 - vign * smoothstep(0.35, 0.85, length(q * vec2(1.0, 0.75)));
  col = mix(col, flashCol, flash); col *= fadeK;
  gl_FragColor = linearToOutputTexel(vec4(col, 1.0));
}`, { tC: { value: rtComp.texture }, tD: { value: rtCard.depthTexture }, focus: { value: 5 }, coc: { value: 8 }, sat: { value: 1.1 }, flash: { value: 0 }, vign: { value: 0.25 },
  time: { value: 0 }, snowAmt: { value: 0 }, fadeK: { value: 1 }, tint: { value: new THREE.Vector3(1, 1, 1) }, lift: { value: new THREE.Vector3() }, flashCol: { value: new THREE.Vector3(1, 1, 1) },
  near: { value: 0.1 }, far: { value: 900 }, res: { value: new THREE.Vector2(W, H) } });

const rtL = [mkRT(0, false), mkRT(0, false)];
const presP = fsq(`
varying vec2 vUv; uniform sampler2D tA, tB; uniform float mixK, zb; uniform vec2 blur;
void main(){
  vec3 a = vec3(0.0), b = vec3(0.0);
  if (length(blur) > 0.0005 || zb > 0.001) {
    for (int i = 0; i < 16; i++) { float k = float(i) / 15.0 - 0.5; vec2 o = blur * k + (vUv - 0.5) * zb * (k + 0.5);
      a += texture2D(tA, vUv - o).rgb; b += texture2D(tB, vUv - o).rgb; }
    a /= 16.0; b /= 16.0;
  } else { a = texture2D(tA, vUv).rgb; b = texture2D(tB, vUv).rgb; }
  gl_FragColor = linearToOutputTexel(vec4(mix(a, b, mixK), 1.0));
}`, { tA: { value: rtL[0].texture }, tB: { value: rtL[1].texture }, mixK: { value: 0 }, zb: { value: 0 }, blur: { value: new THREE.Vector2() } });

// ---------- per-frame ----------
const tmpV = new THREE.Vector3();
function applyLight(L, target) {
  hemi.color.set(L.hemiSky); hemi.groundColor.set(L.hemiGround); hemi.intensity = L.hemi;
  sun.color.set(L.sun); sun.intensity = L.sunI;
  const az = L.az * Math.PI / 180, el = L.el * Math.PI / 180;
  sun.position.set(target.x + Math.cos(el) * Math.sin(az) * 60, target.y + Math.sin(el) * 60, target.z + Math.cos(el) * Math.cos(az) * 60);
  sun.target.position.copy(target); sun.target.updateMatrixWorld();
  scene.fog.color.set(L.fog); scene.fog.near = L.fogNear; scene.fog.far = L.fogFar;
  inkP.m.uniforms.skyTop.value.set(L.skyTop); inkP.m.uniforms.skyHor.value.set(L.skyHor);
  const U = finP.m.uniforms; U.sat.value = L.sat; U.tint.value.set(...L.tint); U.lift.value.set(...L.lift); U.vign.value = L.vign;
}

let st = null;
function placeActors(list, cam) {
  const used = new Set(); let bi = 0;
  for (const a of list) {
    const c = cardFor(a.id); used.add(a.id);
    const key = JSON.stringify([a.o, a.expr, a.mode, a.prop, a.wave, a.tilt, a.headTilt, a.blink, a.look, a.facing, a.phase, a.seed].map((v) => typeof v === "number" ? Math.round(v * 100) / 100 : v));
    if (key !== c.key) { drawActor(c.g, a); c.tex.needsUpdate = true; c.key = key; }
    const s = a.scale ?? 1; c.mesh.visible = true; c.mesh.position.set(a.x, a.y ?? 0, a.z); c.mesh.scale.set(s * (a.sx ?? 1), s * (a.sy ?? 1), 1);
    c.mesh.rotation.set(0, Math.atan2(cam.position.x - a.x, cam.position.z - a.z), a.roll ?? 0);
    c.mat.color.set(st.cardTint);
    if (a.blob !== false) { const b = blobAt(bi++); b.visible = true; b.position.set(a.x, (a.y ?? 0) + 0.02, a.z); b.scale.set(1.1 * s, 0.6 * s, 1); }
  }
  for (let i = bi; i < blobs.length; i++) blobs[i].visible = false;
  return used;
}
function placeFx(list, cam, used) {
  list.forEach((e, i) => {
    const ar = e.w && e.h ? e.h / e.w : 1, w = e.cw ?? (ar < 0.8 ? 512 : 256), h = e.ch ?? (ar < 0.8 ? Math.max(64, Math.round(512 * ar / 16) * 16) : 256), id = "fx_" + e.kind + "_" + i + "_" + w + "x" + h;
    const c = cardFor(id, w, h); used.add(id);
    const key = e.kind + Math.round((e.t ?? 0) * 20) + (e.text ?? "") + (e.col ?? "") + (e.dir ?? "") + (e.tail ?? "") + (e.bg ?? "");
    if (c.key !== key) { drawFx(c.g, e.kind, e.t ?? 0, w, h, e); c.tex.needsUpdate = true; c.key = key; }
    c.mesh.visible = true; c.mesh.position.set(e.x, e.y, e.z); c.mesh.scale.set(e.w, e.h, 1);
    if (e.flat) c.mesh.rotation.set(-Math.PI / 2, 0, e.rot ?? 0);
    else c.mesh.rotation.set(0, Math.atan2(cam.position.x - e.x, cam.position.z - e.z), e.rot ?? 0);
    c.mat.color.set(e.tint ?? st.cardTint);
  });
}

window.renderFrame = (f) => {
  const r = S.frameState(f, R), layers = r.layers || [() => r];
  layers.forEach((fn, i) => renderLayer(fn(), f, rtL[i]));
  const PU = presP.m.uniforms; PU.mixK.value = layers.length > 1 ? r.mix ?? 0 : 0; PU.zb.value = r.zoomBlur ?? 0; PU.blur.value.set(...(r.blur || [0, 0]));
  renderer.setRenderTarget(null); renderer.render(presP.s, ortho);
  return true;
};
function renderLayer(state, f, target) {
  st = state;
  const cm = st.cam;
  camera.position.set(...cm.p); camera.fov = cm.fov; camera.up.set(Math.sin(cm.roll || 0), Math.cos(cm.roll || 0), 0);
  camera.lookAt(tmpV.set(...cm.t)); camera.updateProjectionMatrix();
  if (cm.roll) camera.rotateZ(cm.roll);
  applyLight(st.light, new THREE.Vector3(...cm.t));
  for (const c of cardPool.values()) c.mesh.visible = false;
  const used = placeActors(st.actors, camera); placeFx(st.fx, camera, used);
  for (const c of clouds) { c.lookAt(camera.position); c.visible = st.clouds !== false; }

  // 1 colour (world only)
  cards.visible = false; world.visible = true;
  renderer.setRenderTarget(rtCol); renderer.setClearColor(0x000000, 1); renderer.clear(); renderer.render(scene, camera);
  // 2 normals + depth (world only)
  const sm = renderer.shadowMap.enabled; renderer.shadowMap.enabled = false; scene.overrideMaterial = normalMat; const fog = scene.fog; scene.fog = null;
  renderer.setRenderTarget(rtNrm); renderer.setClearColor(0x8080ff, 1); renderer.clear(); renderer.render(scene, camera);
  // 3 cards over a world depth prepass
  scene.overrideMaterial = depthOnly; renderer.setRenderTarget(rtCard); renderer.setClearColor(0x000000, 0); renderer.clear(); renderer.render(scene, camera);
  scene.overrideMaterial = null; scene.fog = fog; world.visible = false; cards.visible = true;
  renderer.autoClear = false; renderer.render(scene, camera); renderer.autoClear = true;
  world.visible = true; renderer.shadowMap.enabled = sm;
  // 4 ink + composite
  inkP.m.uniforms.near.value = finP.m.uniforms.near.value = camera.near; inkP.m.uniforms.far.value = finP.m.uniforms.far.value = camera.far;
  renderer.setRenderTarget(rtComp); renderer.render(inkP.s, ortho);
  // 5 DOF + grade
  const U = finP.m.uniforms; U.focus.value = st.focus; U.coc.value = st.coc * SCALE; U.flash.value = st.flash; U.time.value = f / 30; U.snowAmt.value = st.snow; U.fadeK.value = st.fade ?? 1;
  U.flashCol.value.set(...(st.flashCol || [1, 1, 1]));
  renderer.setRenderTarget(target); renderer.render(finP.s, ortho);
}
window.ready = true;
