// Proof that a Tablet patch cannot change Desktop (>=1201) or Mobile (<=768): every byte that differs between two
// dists must lie inside the "@media (min-width:769px) and (max-width:1200px) {" block of sourceComponentCss.
// Usage: node tests/tablet-only-diff-proof.mjs <beforeDist> <afterDist>
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
const [A, B] = process.argv.slice(2);
const list = d => { const o = []; (function w(x){ for (const f of readdirSync(x)){ const p = join(x, f); statSync(p).isDirectory() ? w(p) : o.push(relative(d, p)); } })(d); return o.sort(); };
const MARK = "@media (min-width:769px) and (max-width:1200px) {";
// cut every occurrence of the Tablet block (balanced braces) out of a file
const cut = t => { let out = "", i = 0; for (;;){ const s = t.indexOf(MARK, i); if (s < 0){ out += t.slice(i); return out; } out += t.slice(i, s) + "<<TABLET>>"; let d = 0, k = s + MARK.length - 1; for (; k < t.length; k++){ if (t[k] === "{") d++; else if (t[k] === "}" && --d === 0) break; } i = k + 1; } };
const fa = list(A), fb = list(B); let changed = 0, bad = [];
if (fa.join() !== fb.join()) bad.push("file set differs");
for (const f of fa){ const x = readFileSync(join(A, f)), y = readFileSync(join(B, f)); if (x.equals(y)) continue; changed++;
  if (!/\.html$/.test(f)){ bad.push(f + " (non-HTML changed)"); continue; }
  if (cut(x.toString("utf8")) !== cut(y.toString("utf8"))) bad.push(f + " (changed outside the 769-1200 block)"); }
for (const b of bad) console.log("FAIL", b);
console.log(`Tablet-only diff proof: ${changed} files changed, ${bad.length ? bad.length + " outside the Tablet block" : "all changes inside @media (min-width:769px) and (max-width:1200px)"}`);
process.exit(bad.length ? 1 : 0);
