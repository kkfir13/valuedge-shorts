// node render.mjs <outdir> "0-10,40,90"   (RESUME=1 skips existing frames)
import fs from "node:fs";
import { serve, browser } from "./tools/serve.mjs";
const [out, spec] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const frames = [];
for (const part of spec.split(",")) { const [a, b] = part.split("-").map(Number); for (let f = a; f <= (b ?? a); f++) frames.push(f); }
const srv = await serve(), br = await browser();
const pg = await br.newPage({ viewport: { width: Math.round(1080 * (+process.env.SCALE || 1) / 2) * 2, height: Math.round(1920 * (+process.env.SCALE || 1) / 2) * 2 } });
pg.on("pageerror", (e) => console.log("[err]", e.message));
pg.on("console", (m) => { if (m.type() === "error") console.log("[console]", m.text()); });
const qs = new URLSearchParams({ s: process.env.SCALE || "1", ...(process.env.BOARD ? { board: process.env.BOARD } : {}) });
await pg.goto(`http://localhost:${srv.address().port}/index.html?${qs}`);
await pg.waitForFunction(() => window.ready, null, { timeout: 180000 });
const t0 = Date.now(); let n = 0;
for (const f of frames) {
  const file = `${out}/f${String(f).padStart(4, "0")}.jpg`;
  if (process.env.RESUME && fs.existsSync(file)) continue;
  const url = await pg.evaluate((f) => { window.renderFrame(f); return document.querySelector("canvas").toDataURL("image/jpeg", 0.95); }, f);
  fs.writeFileSync(file, Buffer.from(url.split(",")[1], "base64"));
  n++; if (n % 20 === 0) console.log(`frame ${f} (${n}/${frames.length}) ${((Date.now() - t0) / n / 1000).toFixed(2)} s/frame`);
}
console.log("done", n); await br.close(); srv.close();
