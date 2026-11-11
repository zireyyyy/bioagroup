// Cloudflare Pages / CI build step: download the private source bundle and verify it, fail closed.
//   BIOA_SOURCE_URL   https URL of the archive written by tools/pack-source-bundle.mjs (private R2 object behind
//                     a token, or a private GitHub release asset API URL)
//   BIOA_SOURCE_TOKEN read-only token, sent as "Authorization: Bearer <token>" (never printed)
// Extracts to .source-bundle/ (git-ignored) and checks every file against source-manifest.json (size + SHA-256)
// via verifyBundle(); build.mjs then reads .source-bundle/ when BIOA_SOURCE_DIR is not set.
// Build command: node tools/fetch-source-bundle.mjs && npm run build
// If BIOA_SOURCE_DIR is already set (local machine), nothing is downloaded.
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join, resolve, dirname, sep, normalize } from "node:path";
import { gunzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import { verifyBundle } from "./source-bundle.mjs";

const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const target = process.env.BIOA_SOURCE_FETCH_DIR || join(repo, ".source-bundle");
if (process.env.BIOA_SOURCE_DIR){ console.log("fetch-source-bundle: BIOA_SOURCE_DIR is set, nothing to download"); process.exit(0); }
const url = process.env.BIOA_SOURCE_URL, token = process.env.BIOA_SOURCE_TOKEN;
const fail = m => { console.error("SOURCE BUNDLE FETCH: " + m + " (fail closed, no live fallback)"); process.exit(1); };
if (!url || !token) fail("BIOA_SOURCE_URL and BIOA_SOURCE_TOKEN must both be set");
let u; try { u = new URL(url); } catch { fail("BIOA_SOURCE_URL is not a URL"); }
const localTest = process.env.BIOA_SOURCE_ALLOW_LOCAL === "1" && u.protocol === "http:" && u.hostname === "127.0.0.1";
if (u.protocol !== "https:" && !localTest) fail("BIOA_SOURCE_URL must be https");
const res = await fetch(url, { headers: { Authorization: "Bearer " + token, Accept: "application/octet-stream" }, redirect: "follow" }).catch(e => fail("download error " + e.message));
if (!res.ok) fail("download HTTP " + res.status);
let data; try { data = JSON.parse(gunzipSync(Buffer.from(await res.arrayBuffer())).toString("utf8")); } catch { fail("archive is not a bioa-source-bundle"); }
if (data.format !== "bioa-source-bundle/1" || !data.files) fail("unknown archive format");
rmSync(target, { recursive: true, force: true });
for (const [rel, b64] of Object.entries(data.files)){
  const p = normalize(join(target, rel));
  if (!p.startsWith(normalize(target) + sep)) fail("unsafe path in archive: " + rel);
  mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, Buffer.from(b64, "base64"));
}
try { const n = verifyBundle(target); console.log("fetch-source-bundle: " + n + " verified files in " + target); }
catch (e){ rmSync(target, { recursive: true, force: true }); fail(e.message); }
