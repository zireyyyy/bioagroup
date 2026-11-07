// P0A — build the minimal source bundle from the owner-supplied Merywood export.
// Usage: node tools/prepare-source-bundle.mjs --zip <merywood-export.zip> --out <bundle dir outside repo>
// Reads the ZIP only; verifies the ZIP and every extracted file against source-manifest.json.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { manifest, sha256, readZipEntries } from "./source-bundle.mjs";

const arg = k => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const zipPath = arg("--zip"), outDir = arg("--out");
if (!zipPath || !outDir){ console.error("usage: --zip <file> --out <dir>"); process.exit(2); }

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")), "..");
if (path.resolve(outDir).toLowerCase().startsWith(repoRoot.toLowerCase())){
  console.error("refusing to write the Merywood source bundle inside the repository"); process.exit(2);
}

const zip = readFileSync(zipPath);
if (zip.length !== manifest.archive.bytes || sha256(zip) !== manifest.archive.sha256){
  console.error("ZIP SHA-256/size mismatch — not the verified owner export"); process.exit(1);
}
const wanted = new Map(Object.values(manifest.files).map(f => [manifest.archive.prefix + f.path, f]));
const entries = readZipEntries(zip, new Set(wanted.keys()));
for (const [name, f] of wanted){
  const buf = entries.get(name);
  if (!buf) { console.error("missing in ZIP: " + name); process.exit(1); }
  if (buf.length !== f.bytes || sha256(buf) !== f.sha256){ console.error("hash mismatch: " + name); process.exit(1); }
  const target = path.join(outDir, f.path);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, buf);
}
console.log("bundle prepared:", wanted.size, "files ->", outDir);
