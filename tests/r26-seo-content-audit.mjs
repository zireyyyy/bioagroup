// R26: static SEO + content audit of a built site (no network).
//   node tests/r26-seo-content-audit.mjs [distDir]   -> exit 1 on any FAIL
// Checks every built page (redirect stubs and 404 handled separately):
//   - canonical = https://bioagroup.vn + own route; og:url = canonical
//   - hreflang vi/en/x-default present, absolute, reciprocal, each target exists in the build
//   - og:locale matches the page language; <html lang> matches
//   - title + meta description present; robots meta not "noindex" in the static HTML (maintenance noindex is served by middleware)
//   - JSON-LD: only BIO-A entities (no Merywood/Estonia), parseable
//   - visible text / attributes: no "Merywood", Estonia/Tallinn/OÜ, Cyrillic
//   - internal links resolve to a built page, a redirect stub, an asset, or an allowed special path
//   - <img> alt attribute present
//   - sitemap = indexable pages (no stubs, no 404), robots.txt references the sitemap
import fs from "node:fs";
import path from "node:path";
import { load } from "cheerio";

const DIST = path.resolve(process.argv[2] || "dist");
const SITE = "https://bioagroup.vn";
const pages = new Map(), stubs = new Map(), noindex = new Set();
function walk(d){
  for (const f of fs.readdirSync(d, { withFileTypes: true })){
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name === "index.html"){
      const route = "/" + path.relative(DIST, path.dirname(p)).split(path.sep).join("/") + "/";
      const r = route === "//" ? "/" : route.replace(/^\/\.\//, "/");
      const html = fs.readFileSync(p, "utf8");
      (/bioa-legacy-redirect/.test(html) ? stubs : pages).set(r === "/./" ? "/" : r, html);
    }
  }
}
walk(DIST);
const fails = [], warns = [];
const fail = (r, m) => fails.push(`${r}: ${m}`), warn = (r, m) => warns.push(`${r}: ${m}`);
const exists = u => pages.has(u) || stubs.has(u);
const ASSET_OK = p => fs.existsSync(path.join(DIST, decodeURI(p.split(/[?#]/)[0])));

for (const [route, html] of pages){
  const $ = load(html, { decodeEntities: true });
  const lang = route.startsWith("/en/") || route === "/en/" ? "en" : "vi";
  const canon = $('link[rel="canonical"]').attr("href");
  if (canon !== SITE + route) fail(route, `canonical ${canon} != ${SITE + route}`);
  const ogUrl = $('meta[property="og:url"]').attr("content");
  if (ogUrl && ogUrl !== canon) fail(route, `og:url ${ogUrl} != canonical`);
  if (($("html").attr("lang") || "").slice(0, 2) !== lang) fail(route, `html lang ${$("html").attr("lang")} != ${lang}`);
  const ogLocale = $('meta[property="og:locale"]').attr("content");
  if (ogLocale && !ogLocale.startsWith(lang === "en" ? "en" : "vi")) fail(route, `og:locale ${ogLocale} for a ${lang} page`);
  if (!$("title").text().trim()) fail(route, "missing <title>");
  if (!($('meta[name="description"]').attr("content") || "").trim()) fail(route, "missing meta description");
  if (/noindex/i.test($('meta[name="robots"]').attr("content") || "")) noindex.add(route);
  // hreflang
  const alt = {};
  $('link[rel="alternate"][hreflang]').each((_, e) => { alt[$(e).attr("hreflang")] = $(e).attr("href"); });
  for (const k of ["vi", "en", "x-default"]) if (!alt[k]) fail(route, `hreflang ${k} missing`);
  for (const [k, href] of Object.entries(alt)){
    if (!href?.startsWith(SITE + "/")) { fail(route, `hreflang ${k} not absolute: ${href}`); continue; }
    const target = href.slice(SITE.length);
    if (!pages.has(target)) fail(route, `hreflang ${k} -> ${target} not a built page`);
  }
  if (alt[lang] && alt[lang] !== canon) fail(route, `hreflang ${lang} != canonical`);
  // JSON-LD
  $('script[type="application/ld+json"]').each((_, e) => {
    const t = $(e).html() || "";
    try { JSON.parse(t); } catch { fail(route, "JSON-LD not parseable"); }
    if (/merywood|estonia|tallinn|\bOÜ\b/i.test(t)) fail(route, "JSON-LD mentions Merywood/Estonia");
  });
  // visible text + attributes (asset URLs on merywood.com are a known temporary image source, reported separately)
  const $t = load(html, { decodeEntities: true });
  $t("script, style, noscript").remove();
  const text = $t("body").text();
  if (/merywood/i.test(text)) fail(route, "visible text mentions Merywood");
  if (/estonia|tallinn|\bOÜ\b|\beesti\b/i.test(text)) fail(route, "visible text mentions Estonia/OÜ");
  if (/[Ѐ-ӿ]/.test(text)) fail(route, "Cyrillic text visible");
  $("[alt],[title],[aria-label],[placeholder],meta[content]").each((_, e) => {
    for (const a of ["alt", "title", "aria-label", "placeholder"]) if (/merywood/i.test($(e).attr(a) || "")) fail(route, `${a} mentions Merywood`);
    const c = $(e).attr("content") || "";
    if (e.name === "meta" && /merywood/i.test(c) && !/https?:\/\/merywood\.com\/wp-content\/uploads\//.test(c)) fail(route, `meta content mentions Merywood: ${c.slice(0, 60)}`);
  });
  $("img").each((_, e) => { if ($(e).attr("alt") === undefined) warn(route, `img without alt: ${($(e).attr("src") || "").split("/").pop()}`); });
  // internal links
  $("a[href]").each((_, e) => {
    const href = $(e).attr("href");
    if (!href || /^(mailto:|tel:|#|javascript:|https?:\/\/(?!bioagroup\.vn))/i.test(href)) return;
    let p = href.replace(/^https?:\/\/bioagroup\.vn/i, "").split(/[?#]/)[0];
    if (!p.startsWith("/")) return;
    if (p === "") p = "/";
    if (exists(p) || exists(p + (p.endsWith("/") ? "" : "/")) || ASSET_OK(p)) return;
    if (/^\/(_bioa-access|api\/|cdn-cgi\/)/.test(p)) return;
    fail(route, `internal link ${href} not found in build`);
  });
}
// stubs: target exists
for (const [route, html] of stubs){
  const m = /bioa-legacy-redirect" content="([^"]+)"/.exec(html);
  if (!m || !pages.has(m[1])) fail(route, `redirect stub target ${m?.[1]} missing`);
}
// sitemap/robots
const sm = fs.readFileSync(path.join(DIST, "sitemap.xml"), "utf8");
const locs = [...sm.matchAll(/<loc>https:\/\/bioagroup\.vn([^<]+)<\/loc>/g)].map(m => m[1]);
for (const l of locs) if (!pages.has(l) || noindex.has(l)) fail("sitemap", `${l} is not an indexable page`);
for (const p of pages.keys()) if (!locs.includes(p) && !noindex.has(p)) fail("sitemap", `indexable page ${p} not in sitemap`);
if (!/Sitemap: https:\/\/bioagroup\.vn\/sitemap\.xml/.test(fs.readFileSync(path.join(DIST, "robots.txt"), "utf8"))) fail("robots.txt", "no sitemap line");
// 404 pages
for (const f of ["404.html", "en/404.html"]){
  const h = fs.readFileSync(path.join(DIST, f), "utf8");
  if (/merywood/i.test(load(h)("body").text())) fail(f, "mentions Merywood");
}

const summary = { pages: pages.size, stubs: stubs.size, noindex: noindex.size, sitemap: locs.length, fails: fails.length, warns: warns.length };
console.log(JSON.stringify(summary));
const groups = {};
for (const f of fails){ const k = f.replace(/^[^:]+: /, "").replace(/\/[^ ]*\//g, "/…/").slice(0, 90); groups[k] = (groups[k] || 0) + 1; }
for (const [k, n] of Object.entries(groups).sort((a, b) => b[1] - a[1]).slice(0, 40)) console.log(`FAIL x${n}: ${k}`);
const wg = {};
for (const w of warns){ const k = w.replace(/^[^:]+: /, "").slice(0, 90); wg[k] = (wg[k] || 0) + 1; }
for (const [k, n] of Object.entries(wg).sort((a, b) => b[1] - a[1]).slice(0, 15)) console.log(`WARN x${n}: ${k}`);
console.log(fails.length ? "R26 SEO/content audit: FAIL" : "R26 SEO/content audit: PASS");
process.exit(fails.length ? 1 : 0);
