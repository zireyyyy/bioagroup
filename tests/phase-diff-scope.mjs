// Phase scope gate: current dist/ may differ from the previous phase's dist snapshot ONLY inside the
// declared scope. Usage: node tests/phase-diff-scope.mjs <baselineDir> <phase>[+<phase>...]
// A combined phase (e.g. P1+P2+P4) checks the union of scopes against an older snapshot.
// Each scope lists [route regex, element selector] pairs whose outerHTML may change; everything else
// (all other elements, all other files) must stay byte-identical.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { load } from "cheerio";
import { stripCyrillicJsComments, removeTraceMarkup } from "../bioa-source-hygiene.mjs";

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
    [/^(en\/)?contract-manufacturing-cosmetics\/index\.html$/, 'meta[property^="og:image"]']],
  // R21: chat preview reply copy inside the chat script (design/markup unchanged).
  R21: [[/\.html$/, "script#bioa-contact-fab-js"]],
  // R24: ROADMAP-R5 sync script (Home, and now Cosmetics), HOWWORKS-T1 Tablet CSS in both shells,
  // CONTENT-C1 Footer columns (recruitment + Shipping links removed, hidden surplus items unlinked) and About team CTA.
  // Careers + legacy recruitment slugs become redirect stubs, sitemap drops Careers (file-level rules below).
  R24: [[/^(en\/)?(contract-manufacturing-cosmetics\/)?index\.html$/, "script#bioa-roadmap-coldload-sync"],
    [/\.html$/, "style#bioa-home-refine"], [/\.html$/, "style#bioa-shared-shell"],
    [/\.html$/, ".footer-top__menu"], [/^(en\/)?about\/index\.html$/, ".mwa-team__btn"]],
  // R24CL (owner 2026-11-11, delivery cleanup): Cyrillic comments removed from inline style/script (proven
  // comment-only by tests/cleanup-comment-only-proof.mjs), EMAIL-PILL-1 in the shared/Home style owners, the two
  // CF7 scripts removed (CF7-JS-1), the Privacy/Cookie policy body (LEGAL-B1). File-level rules below cover the
  // CF7 form aria-label, Cyrillic HTML comments and the served main.js.
  R24CL: [[/\.html$/, "style"], [/\.html$/, "script:not([src])"], [/\.html$/, "script#contact-form-7-js, script#swv-js"], [/\.html$/, "script#main-js"],
    [/^(en\/)?(privacy-policy|cookie-policy)\/index\.html$/, "section.policy-wrapper"]]
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
  if (phases.includes("R24") && f === "sitemap.xml"){ // only the two Careers URLs may disappear
    const urls = s => new Set([...s.toString("utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));
    const ua = urls(x), ub = urls(y), gone = [...ua].filter(u => !ub.has(u)), added = [...ub].filter(u => !ua.has(u));
    if (added.length || gone.some(u => !/\/careers\/$/.test(u))) fails.push(f + ": sitemap changed beyond Careers removal"); else changed.push(f + " [-" + gone.length + " careers]");
    continue; }
  if (phases.includes("R24") && f.endsWith(".html") && /bioa-legacy-redirect" content="(\/en)?\/contacts\/"/.test(y.toString("utf8"))
      && /^(en\/)?(careers|tuyen-dung-rd|tuyen-dung-nv-sales)\/index\.html$/.test(f)){ changed.push(f + " [redirect stub -> contacts]"); continue; }
  if (phases.includes("R24CL") && f === "assets/runtime/merywood-main.js"){ // CLEANUP-1: comment removal only
    if (stripCyrillicJsComments(x.toString("utf8")) === y.toString("utf8")) changed.push(f + " [Cyrillic comments removed]"); else fails.push(f + ": changed beyond comment removal");
    continue; }
  if (!f.endsWith(".html")){ fails.push(f + ": non-HTML file changed"); continue; }
  const sels = scope.filter(([re]) => re.test(f)).map(([, s]) => s);
  if (!sels.length){ fails.push(f + ": changed outside scope"); continue; }
  const strip = buf => { const $ = load(buf.toString("utf8"), { decodeEntities: false });
    if (phases.includes("R24CL")){ $("form.wpcf7-form[aria-label]").attr("aria-label", "(cf7)"); removeTraceMarkup($); }
    const parts = sels.map(s => $(s).map((_, e) => $.html(e)).get().join("\n")); sels.forEach(s => $(s).remove()); /* remove, not placeholder: newly inserted scoped tags also pass */ return { rest: $.html(), parts }; };
  const X = strip(x), Y = strip(y);
  if (X.rest !== Y.rest){ fails.push(f + ": changed outside " + sels.join(", ")); continue; }
  changed.push(f + " [" + sels.filter((s, i) => X.parts[i] !== Y.parts[i]).join(", ") + "]");
}
console.log(phase, "changed within scope:", changed.length);
for (const c of changed.slice(0, 12)) console.log("  ", c);
for (const f of fails) console.log("FAIL", f);
if (fails.length) process.exit(1);
console.log(phase, "scope gate PASS");
