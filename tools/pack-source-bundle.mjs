// Pack the verified private Merywood source bundle (BIOA_SOURCE_DIR) into ONE gzip archive for private storage
// (Cloudflare R2 private bucket or a private GitHub release asset). The archive must NEVER be committed: this
// repository is public. Refuses to write inside the repository. Prints the archive SHA-256 to record.
// Usage: node tools/pack-source-bundle.mjs --out <file outside the repo, e.g. D:/BIOA_WORKSPACE/_private/bioa-source-bundle.json.gz>
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from "node:fs";
import { join, relative, resolve, dirname, sep } from "node:path";
import { gzipSync } from "node:zlib";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { verifyBundle, bundleDir } from "./source-bundle.mjs";

const i = process.argv.indexOf("--out"); const out = i > 0 ? resolve(process.argv[i + 1]) : null;
if (!out){ console.error("usage: node tools/pack-source-bundle.mjs --out <file outside the repository>"); process.exit(2); }
const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
if (out === repo || out.startsWith(repo + sep)){ console.error("REFUSED: the archive contains Merywood source and must stay outside this public repository"); process.exit(1); }
const dir = bundleDir(); verifyBundle(dir);
const files = {}; (function w(d){ for (const f of readdirSync(d).sort()){ const p = join(d, f); statSync(p).isDirectory() ? w(p) : (files[relative(dir, p).split(sep).join("/")] = readFileSync(p).toString("base64")); } })(dir);
const gz = gzipSync(Buffer.from(JSON.stringify({ format: "bioa-source-bundle/1", files })), { level: 9 });
mkdirSync(dirname(out), { recursive: true }); writeFileSync(out, gz);
console.log(`packed ${Object.keys(files).length} files -> ${out} (${gz.length} B) sha256 ${createHash("sha256").update(gz).digest("hex")}`);
