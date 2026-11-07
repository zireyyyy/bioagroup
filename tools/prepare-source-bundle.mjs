// P0A — build the minimal source bundle from the owner-supplied Merywood export.
// Usage: node tools/prepare-source-bundle.mjs --zip <merywood-export.zip> --main-css <main.txt> --out <bundle dir outside repo>
// Reads the ZIP only; verifies the ZIP and every extracted file against source-manifest.json.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { manifest, sha256, readZipEntries } from "./source-bundle.mjs";

const arg = k => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const zipPath = arg("--zip"), outDir = arg("--out"), mainCss = arg("--main-css");
if (!zipPath || !outDir || !mainCss){ console.error("usage: --zip <file> --main-css <main.txt> --out <dir>"); process.exit(2); }

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")), "..");
if (path.resolve(outDir).toLowerCase().startsWith(repoRoot.toLowerCase())){
  console.error("refusing to write the Merywood source bundle inside the repository"); process.exit(2);
}

const zip = readFileSync(zipPath);
if (zip.length !== manifest.archive.bytes || sha256(zip) !== manifest.archive.sha256){
  console.error("ZIP SHA-256/size mismatch — not the verified owner export"); process.exit(1);
}
const wanted = new Map(Object.values(manifest.files).map(f => [manifest.archive.prefix + f.path, f]));
wanted.set(manifest.runtime.js.zipEntry, manifest.runtime.js);
const entries = readZipEntries(zip, new Set(wanted.keys()));
for (const [name, f] of wanted){
  const buf = entries.get(name);
  if (!buf) { console.error("missing in ZIP: " + name); process.exit(1); }
  if (buf.length !== f.bytes || sha256(buf) !== f.sha256){ console.error("hash mismatch: " + name); process.exit(1); }
  const target = path.join(outDir, f.path);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, buf);
}
// P0B1 runtime stylesheet: owner-supplied main.txt, copied byte-for-byte.
const css = readFileSync(mainCss), c = manifest.runtime.css;
if (css.length !== c.bytes || sha256(css) !== c.sha256){ console.error("main.txt SHA-256/size mismatch"); process.exit(1); }
mkdirSync(path.dirname(path.join(outDir, c.path)), { recursive: true });
writeFileSync(path.join(outDir, c.path), css);
console.log("bundle prepared:", wanted.size + 1, "files ->", outDir);
