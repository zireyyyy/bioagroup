// P0A — verified, pinned Merywood source input for build.mjs.
// The bundle lives OUTSIDE this public repository; only hashes and the URL map are committed.
// Every check fails closed: there is no fallback to the live Merywood site.
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inflateRawSync } from "node:zlib";
import { load } from "cheerio";

const here = path.dirname(fileURLToPath(import.meta.url));
export const manifestPath = path.join(here, "..", "source-manifest.json");
export const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

export const sha256 = buf => createHash("sha256").update(buf).digest("hex");

export function bundleDir(){
  const dir = process.env.BIOA_SOURCE_DIR;
  if (!dir) throw new Error("SOURCE BUNDLE: BIOA_SOURCE_DIR is not set (no live fallback by design)");
  if (!existsSync(dir)) throw new Error("SOURCE BUNDLE: directory missing: " + dir);
  return dir;
}

export function fileForRoute(sourceRoute){
  const entry = manifest.files[sourceRoute];
  if (!entry) throw new Error("SOURCE BUNDLE: route not pinned in manifest: " + sourceRoute);
  return entry;
}

function readVerified(dir, entry){
  const file = path.join(dir, entry.path);
  if (!existsSync(file)) throw new Error("SOURCE BUNDLE: missing file " + entry.path);
  const buf = readFileSync(file);
  if (buf.length !== entry.bytes || sha256(buf) !== entry.sha256)
    throw new Error("SOURCE BUNDLE: SHA-256/size mismatch for " + entry.path);
  return buf;
}

export function verifyBundle(dir = bundleDir()){
  for (const entry of Object.values(manifest.files)) readVerified(dir, entry);
  return Object.keys(manifest.files).length;
}

// The crawler rewrote original URLs to page-relative "assets/<kind>/<name>".
// Put the original URL back BEFORE any BIO-A transform runs, so every BIO-A
// module receives the same markup it received from the live site.
// Only page-relative paths: never the tail of an absolute URL such as ".../mery-wood/assets/css/main.css".
const CRAWLER_REF = /(?<![\w\/.:-])assets\/(images|css|js)\/([^"'()\s,>]+)/g;

export function restoreCrawlerRefs(html, sourceRoute){
  const map = manifest.urlMap;
  const ids = manifest.scriptIdMap;
  // The crawler collapsed same-named files (e.g. icons/desktop/email.svg and
  // icons/mobile/email.svg) into one; restore those by order of appearance.
  const byOrder = manifest.occurrenceMap || {};
  const seen = {};
  let out = html.replace(/<base\b[^>]*>/gi, "");
  out = out.replace(/<script\b[^>]*>/g, tag => {
    const id = (tag.match(/\bid="([^"]+)"/) || [])[1];
    return id && ids[id] ? tag.replace(/\bsrc="[^"]*"/, 'src="' + ids[id] + '"') : tag;
  });
  out = out.replace(CRAWLER_REF, (m, kind, name) => {
    const key = decodeURIComponent(name);
    if (byOrder[key]){
      const i = seen[key] = (seen[key] ?? -1) + 1;
      if (i >= byOrder[key].length) throw new Error("SOURCE BUNDLE: unexpected extra occurrence of " + key + " in " + sourceRoute);
      return byOrder[key][i];
    }
    return map[key] || m;
  });
  return out;
}

// After all BIO-A transforms: no crawler-relative path may survive.
export function assertNoCrawlerRefs(html, label){
  const left = [...html.matchAll(/(?:src|href|srcset|content|data-src)=["'](assets\/(?:images|css|js)\/[^"']+)/g)].map(m => m[1]);
  const inCss = [...html.matchAll(/url\(["']?(assets\/(?:images|css|js)\/[^"')]+)/g)].map(m => m[1]);
  const all = [...left, ...inCss];
  if (all.length) throw new Error("SOURCE BUNDLE: unrestored crawler path(s) in " + label + ": " + [...new Set(all)].slice(0, 5).join(", "));
}

// Merywood DOM that BIO-A modules depend on. Missing markup must stop the build
// instead of letting a transform silently skip (e.g. Home icon 04, Mobile Produce).
export function assertRequiredDom(html, sourceRoute){
  const rules = manifest.requiredDom[sourceRoute] || [];
  if (!rules.length) return;
  const $ = load(html, { decodeEntities: false });
  for (const r of rules){
    const n = r.selector ? $(r.selector).length : (html.includes(r.contains) ? 1 : 0);
    if (n < (r.min ?? 1)) throw new Error("SOURCE BUNDLE: required source DOM missing for " + sourceRoute + ": " + (r.selector || r.contains) + " (found " + n + ")");
  }
}

export function loadSource(sourceRoute){
  const buf = readVerified(bundleDir(), fileForRoute(sourceRoute));
  const html = restoreCrawlerRefs(buf.toString("utf8"), sourceRoute);
  assertRequiredDom(html, sourceRoute);
  return html;
}

// Minimal ZIP reader (stored + deflate, no ZIP64) used only to prepare the bundle.
export function readZipEntries(zipBuf, wanted){
  let eocd = -1;
  for (let i = zipBuf.length - 22; i >= Math.max(0, zipBuf.length - 65557); i--)
    if (zipBuf.readUInt32LE(i) === 0x06054b50){ eocd = i; break; }
  if (eocd < 0) throw new Error("ZIP: end of central directory not found");
  const count = zipBuf.readUInt16LE(eocd + 10);
  let p = zipBuf.readUInt32LE(eocd + 16);
  const out = new Map();
  for (let n = 0; n < count; n++){
    if (zipBuf.readUInt32LE(p) !== 0x02014b50) throw new Error("ZIP: bad central directory");
    const method = zipBuf.readUInt16LE(p + 10);
    const csize = zipBuf.readUInt32LE(p + 20);
    const nlen = zipBuf.readUInt16LE(p + 28), elen = zipBuf.readUInt16LE(p + 30), clen = zipBuf.readUInt16LE(p + 32);
    const local = zipBuf.readUInt32LE(p + 42);
    const name = zipBuf.toString("utf8", p + 46, p + 46 + nlen);
    p += 46 + nlen + elen + clen;
    if (!wanted.has(name)) continue;
    const lnlen = zipBuf.readUInt16LE(local + 26), lelen = zipBuf.readUInt16LE(local + 28);
    const start = local + 30 + lnlen + lelen;
    const raw = zipBuf.subarray(start, start + csize);
    if (method === 0) out.set(name, Buffer.from(raw));
    else if (method === 8) out.set(name, inflateRawSync(raw));
    else throw new Error("ZIP: unsupported method " + method + " for " + name);
  }
  return out;
}
