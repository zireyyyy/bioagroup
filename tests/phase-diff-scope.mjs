// Phase scope gate: current dist/ may differ from the previous phase's dist snapshot ONLY inside the
// declared scope. Usage: node tests/phase-diff-scope.mjs <baselineDir> <phase>[+<phase>...]
// A combined phase (e.g. P1+P2+P4) checks the union of scopes against an older snapshot.
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
  P4: [[/\.html$/, "title"], [/\.html$/, 'meta[name="description"]'], [/\.html$/, 'meta[property="og:title"]'], [/\.html$/, 'meta[name="twitter:title"]'], [/\.html$/, 'link[rel="canonical"]']],
  // R1: only new legacy-slug redirect pages (files added, see below); no existing file may change.
  R1: [],
  // R2: Blog index/pagination title tag h2 -> h1.
  R2: [[/^(en\/)?blog\/(page\/\d+\/)?index\.html$/, ".blog-hero .title"]],
  // R3: Merywood JSON-LD and WP reader-time beacon removed.
  R3: [[/\.html$/, 'script[type="application/ld+json"]'], [/\.html$/, 'script[id^="hs-reader-timer-js"]']],
  // R12: the six live OSS library tags point to /assets/vendor (files under assets/vendor/ added, see below).
  R12: ["swiper-style-css", "swiper-script-js", "smooth-scrollbar-script-js", "jquery-js", "wp-hooks-js", "wp-i18n-js"].map(id => [/\.html$/, "#" + id]),
  // R13: format toggles (label + href), their inline script (VI label), VI packaging card text, VI dropdown placeholder.
  R13: [[/\.html$/, "[data-formats-toggle]"], [/\.html$/, 'script:contains("data-formats-toggle")'], [/^(contract-manufacturing-cosmetics\/)?index\.html$/, ".product"], [/\.html$/, "#ddType .dd-label"]],
  // R15: Merywood identity: obfuscated Merywood mailboxes (Careers/Privacy/Cookie), Blog share links, head identity tags.
  R15: [[/^(en\/)?(careers|privacy-policy|cookie-policy)\/index\.html$/, "a[href^='/cdn-cgi/l/email-protection'], a[href='mailto:contact@bioagroup.vn'], .mwc-copy, .mwc-hrcard__email"],
    [/^(en\/)?blog\/[^/]+\/index\.html$/, ".btp-share__link"], [/\.html$/, 'meta[property="og:url"]'], [/\.html$/, 'meta[property="url"]'],
    [/\.html$/, 'link[href*="merywood.com/wp-json"], link[rel="shortlink"], link[rel="apple-touch-icon"], meta[name="msapplication-TileImage"]'],
    [/^(en\/)?contract-manufacturing-cosmetics\/index\.html$/, 'meta[property^="og:image"]']]
};
const [, , base, phase] = process.argv;
const phases = (phase || "").split("+"), scope = phases.flatMap(p => SCOPES[p] || []);
if (!base || !phases.every(p => SCOPES[p]) || !existsSync(base)){ console.error("usage: phase-diff-scope.mjs <baselineDir> <" + Object.keys(SCOPES).join("|") + ">"); process.exit(2); }

const list = d => { const out = []; (function w(x){ for (const f of readdirSync(x)){ const p = path.join(x, f); statSync(p).isDirectory() ? w(p) : out.push(path.relative(d, p).split(path.sep).join("/")); } })(d); return out.sort(); };
const a = list(base), b = list("dist");
const fails = [], changed = [];
for (const f of new Set([...a, ...b])){
  if (!a.includes(f) || !b.includes(f)){ const legacyStub = phases.includes("R1") && !a.includes(f) && /bioa-legacy-redirect/.test(readFileSync(path.join("dist", f), "utf8"));
    const vendorFile = phases.includes("R12") && !a.includes(f) && f.startsWith("assets/vendor/");
    if (!legacyStub && !vendorFile && !(phases.includes("P4") && f === "sitemap.xml" && !a.includes(f))) fails.push(f + ": file added/removed"); else changed.push(f + " [added]"); continue; }
  const x = readFileSync(path.join(base, f)), y = readFileSync(path.join("dist", f));
  if (x.equals(y)) continue;
  if (!f.endsWith(".html")){ fails.push(f + ": non-HTML file changed"); continue; }
  const sels = scope.filter(([re]) => re.test(f)).map(([, s]) => s);
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
