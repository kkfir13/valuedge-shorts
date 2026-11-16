// Tiny static server for web/ and node_modules/, plus a Playwright browser helper.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const TYPES = { ".js": "text/javascript", ".mjs": "text/javascript", ".html": "text/html", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg" };

export function serve(port = 0) {
  return new Promise((res) => {
    const srv = http.createServer((req, rsp) => {
      let u = decodeURIComponent(req.url.split("?")[0]);
      let f = u.startsWith("/node_modules/") ? path.join(ROOT, u) : path.join(ROOT, "web", u);
      fs.readFile(f, (e, d) => {
        if (e) { rsp.writeHead(404); rsp.end(); return; }
        rsp.writeHead(200, { "content-type": TYPES[path.extname(f)] || "application/octet-stream" }); rsp.end(d);
      });
    });
    srv.listen(port, () => res(srv));
  });
}

export async function browser() {
  return chromium.launch({
    ...(fs.existsSync("/opt/pw-browsers/chromium-1243/chrome-linux64/chrome") ? { executablePath: "/opt/pw-browsers/chromium-1243/chrome-linux64/chrome" } : {}),
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--use-gl=angle"],
  });
}
