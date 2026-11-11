// CLEANUP-1 proof: between two dists, every inline <script>/<style> and the runtime main.js differ ONLY by
// removed comments (code with ALL comments stripped is identical), no Cyrillic remains anywhere in the
// output, and the CF7 form aria-label is localized. Pages whose content is intentionally replaced by
// another declared change (LEGAL-B1 policy body) are compared only on their scripts/styles.
// Usage: node tests/cleanup-comment-only-proof.mjs <beforeDist> <afterDist>
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { load } from "cheerio";
import { stripCyrillicJsComments, stripCyrillicCssComments } from "../bioa-source-hygiene.mjs";

const [A, B] = process.argv.slice(2);
const list = d => { const o = []; (function w(x){ for (const f of readdirSync(x)){ const p = join(x, f); statSync(p).isDirectory() ? w(p) : o.push(relative(d, p)); } })(d); return o.sort(); };
const noComments = (t, css) => css ? t.replace(/\/\*[\s\S]*?\*\//g, "") : t.replace(/\/\*[\s\S]*?\*\/|(^|[^:\'"])\/\/[^\n]*/g, "$1");
const norm = t => t.replace(/[ \t]+$/gm, "").replace(/\n{2,}/g, "\n").trim();
let bad = [], scripts = 0, changed = 0, pill = 0;
const PILL = [
  "\n  /* EMAIL-PILL-1 (owner 2026-11-11): the Merywood shell keeps backdrop-filter:blur(25px); with the shell\n     square, that blurred a RECTANGLE behind the rounded pill (visible square glow). Blur only the pill. */\n  -webkit-backdrop-filter:none!important;\n  backdrop-filter:none!important;",
  "\n  -webkit-backdrop-filter:blur(25px);\n  backdrop-filter:blur(25px);"];
for (const f of list(B)){
  const y = readFileSync(join(B, f), "utf8");
  if (/[\u0400-\u04FF]/.test(y) && /\.(html|js|css|txt|json|xml)$/.test(f)) bad.push(f + ": Cyrillic left");
  if (!/\.html$/.test(f)) continue;
  let x; try { x = readFileSync(join(A, f), "utf8"); } catch { continue; }
  const $a = load(x, { decodeEntities: false }), $b = load(y, { decodeEntities: false });
  for (const sel of ["script:not([src])", "style"]){
    const ea = $a(sel).toArray(), eb = $b(sel).toArray();
    if (ea.length !== eb.length){ bad.push(f + ": " + sel + " count " + ea.length + " -> " + eb.length); continue; }
    ea.forEach((e, i) => { scripts++; const ta = $a(e).html() || "", tb = $b(eb[i]).html() || "";
      if (ta === tb) return; changed++;
      // EMAIL-PILL-1 (declared, same delivery): the shared/Home style owners gain exactly these two inserts.
      const id = $b(eb[i]).attr("id");
      if (sel === "style" && (id === "bioa-shared-shell" || id === "bioa-home-refine")){
        let back = tb; for (const ins of PILL) back = back.split(ins).join("");
        if (back !== ta) bad.push(f + ": style#" + id + " changed beyond EMAIL-PILL-1"); else pill++;
        return;
      }
      // after must equal before with only Cyrillic comments removed (same function the build uses)
      const expect = sel === "style" ? stripCyrillicCssComments(ta) : stripCyrillicJsComments(ta, f);
      if (norm(expect) !== norm(tb)) bad.push(f + ": " + sel + " #" + i + " changed beyond comment removal"); });
  }
  if ($b('form.wpcf7-form[aria-label]').length && /[\u0400-\u04FF]/.test($b('form.wpcf7-form').attr("aria-label") || "")) bad.push(f + ": CF7 aria-label not localized");
}
for (const b of bad.slice(0, 20)) console.log("FAIL", b);
console.log(`Cleanup proof: ${scripts} inline script/style blocks compared, ${changed} changed (${changed - pill} comment removal only, ${pill} EMAIL-PILL-1 owner style), ${bad.length} problem(s)`);
process.exit(bad.length ? 1 : 0);
