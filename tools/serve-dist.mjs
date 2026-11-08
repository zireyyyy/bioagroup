// Local static server for OWNER QA of a built dist (no Functions, no lead API). Read-only.
// Usage: node tools/serve-dist.mjs [port] [distDir]  ->  http://127.0.0.1:<port>/
// Every request is answered independently: a missing file (e.g. Cloudflare-edge-only /cdn-cgi/ scripts)
// returns 404 and never stops the server. Forms are not wired to any backend; never use real data.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";
import { fileURLToPath } from "node:url";

const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff", ".xml": "application/xml", ".txt": "text/plain", ".json": "application/json" };

export function createDistServer(distDir){
  const root = resolve(distDir);
  return createServer(async (req, res) => {
    try{
      if (req.method !== "GET" && req.method !== "HEAD"){ res.writeHead(405).end("read-only"); return; }
      const url = new URL(req.url, "http://local");
      const p = decodeURIComponent(url.pathname);
      let f = resolve(root, "." + (p.endsWith("/") ? p + "index.html" : p));
      if (f !== root && !f.startsWith(root + sep)){ res.writeHead(403).end(); return; }
      const s = await stat(f).catch(() => null);
      if (s?.isDirectory()){ res.writeHead(301, { location: p + "/" + url.search }).end(); return; }
      const body = s ? await readFile(f) : null;
      if (body){ res.writeHead(200, { "content-type": types[extname(f).toLowerCase()] || "application/octet-stream" }).end(req.method === "HEAD" ? undefined : body); return; }
      const nf = await readFile(resolve(root, p.startsWith("/en/") ? "en/404.html" : "404.html")).catch(() => Buffer.from("404"));
      res.writeHead(404, { "content-type": types[".html"] }).end(nf);
    }catch(e){
      if (!res.headersSent) res.writeHead(500, { "content-type": "text/plain" });
      res.end("500");
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)){
  const port = Number(process.argv[2] || 4173);
  createDistServer(process.argv[3] || "dist").listen(port, "127.0.0.1", () => console.log("BIO-A local QA: http://127.0.0.1:" + port + "/"));
}
