// Phase scope gate: current dist/ may differ from the previous phase's dist snapshot ONLY inside the
// declared scope. Usage: node tests/phase-diff-scope.mjs <baselineDir> <phase>
// Each scope lists [route regex, element selector] pairs whose outerHTML may change; everything else
// (all other elements, all other files) must stay byte-identical.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { load } from "cheerio";

const SCOPES = {
  // P1: Home bundle gains the canonical icon CSS (style#bioa-home-refine) — Home only.
  P1: [[/^(en\/)?index\.html$/, "style#bioa-home-refine"]],
  // P2: Tablet-only CSS inside the existing owners (sourceComponentCss in both shells; modal CSS in bioa-v3).
  P2: [[/\.html$/, "style#bioa-home-refine"], [/\.html$/, "style#bioa-shared-shell"], [/\.html$/, "style#bioa-v3"]],
  // P4: head metadata only.
  P4: [[/\.html$/, "title"], [/\.html$/, 'meta[name="description"]'], [/\.html$/, 'meta[property="og:title"]'], [/\.html$/, 'meta[name="twitter:title"]'], [/\.html$/, 'link[rel="canonical"]']]
};
const [, , base, phase] = process.argv;
if (!base || !SCOPES[phase] || !existsSync(base)){ console.error("usage: phase-diff-scope.mjs <baselineDir> <" + Object.keys(SCOPES).join("|") + ">"); process.exit(2); }

const list = d => { const out = []; (function w(x){ for (const f of readdirSync(x)){ const p = path.join(x, f); statSync(p).isDirectory() ? w(p) : out.push(path.relative(d, p).split(path.sep).join("/")); } })(d); return out.sort(); };
const a = list(base), b = list("dist");
const fails = [], changed = [];
for (const f of new Set([...a, ...b])){
  if (!a.includes(f) || !b.includes(f)){ if (!(phase === "P4" && f === "sitemap.xml" && !a.includes(f))) fails.push(f + ": file added/removed"); else changed.push(f + " [added]"); continue; }
  const x = readFileSync(path.join(base, f)), y = readFileSync(path.join("dist", f));
  if (x.equals(y)) continue;
  if (!f.endsWith(".html")){ fails.push(f + ": non-HTML file changed"); continue; }
  const sels = SCOPES[phase].filter(([re]) => re.test(f)).map(([, s]) => s);
  if (!sels.length){ fails.push(f + ": changed outside scope"); continue; }
  const strip = buf => { const $ = load(buf.toString("utf8"), { decodeEntities: false }); const parts = sels.map(s => $(s).map((_, e) => $.html(e)).get().join("\n")); sels.forEach(s => $(s).remove()); /* remove, not placeholder: newly inserted scoped tags also pass */ return { rest: $.html(), parts }; };
  const X = strip(x), Y = strip(y);
  if (X.rest !== Y.rest){ fails.push(f + ": changed outside " + sels.join(", ")); continue; }
  changed.push(f + " [" + sels.filter((s, i) => X.parts[i] !== Y.parts[i]).join(", ") + "]");
}
console.log(phase, "changed within scope:", changed.length);
for (const c of changed.slice(0, 12)) console.log("  ", c);
for (const f of fails) console.log("FAIL", f);
if (fails.length) process.exit(1);
console.log(phase, "scope gate PASS");
