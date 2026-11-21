// R28c BLOG-PUBLISH (owner 2026-11-20): the 29 rewritten articles are approved and published, 13 of them under a new
// slug with the old URL kept as a 301; the car-fragrance article stays. Static check of a built dist (or of a mirror of
// the served site with the same layout):
//   * 38 articles VI/EN, all indexable and in sitemap.xml; the 29 rewritten ones under their final slug;
//   * /blog/ + /blog/page/2-6/ (VI/EN) list every article exactly once, list pages indexable and in sitemap.xml;
//     each card opens its detail page and the detail H1 equals the card title;
//   * every old slug (VI/EN) is a redirect page to the new URL, not in sitemap.xml, and (when present)
//     _bioa-redirects.json maps it to the new URL (the middleware answers HTTP 301).
// Usage: node tests/r28c-blog-published.mjs [distDir]
import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";
import { R27_PENDING, R28C_RENAMES, R28_REWRITTEN } from "./r28-rewritten-slugs.mjs";
const dist = path.resolve(process.argv[2] || "dist");
const fails = []; let checks = 0;
const ok = (c, m) => { checks++; if (!c) fails.push(m); };
const read = (route) => { const f = path.join(dist, route, "index.html"); return fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null; };
const norm = (s) => (s || "").replace(/\s+/g, " ").trim().toLowerCase();
const robots = ($) => $('meta[name="robots"]').attr("content") || "";
const sitemap = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
const inSitemap = (route) => sitemap.includes("<loc>https://bioagroup.vn" + route + "</loc>");
const redirectsFile = path.join(dist, "_bioa-redirects.json");
const redirects = fs.existsSync(redirectsFile) ? JSON.parse(fs.readFileSync(redirectsFile, "utf8")) : null;

for (const pre of ["", "/en"]) {
  const L = pre || "/vi";
  const dirs = fs.readdirSync(path.join(dist, pre.slice(1), "blog"), { withFileTypes: true }).filter((d) => d.isDirectory() && d.name !== "page").map((d) => d.name);
  const articles = dirs.filter((s) => { const h = read(pre + "/blog/" + s + "/"); return h && !/bioa-legacy-redirect/.test(h); });
  ok(articles.length === 38, `${L} ${articles.length} article pages (expected 38)`);
  ok(R28_REWRITTEN.every((s) => articles.includes(s)), `${L} rewritten articles missing: ${R28_REWRITTEN.filter((s) => !articles.includes(s)).join(", ")}`);
  for (const s of articles) {
    const $ = cheerio.load(read(pre + "/blog/" + s + "/"));
    ok(!/noindex/.test(robots($)), `${pre}/blog/${s}/ is noindex`);
    ok(inSitemap(pre + "/blog/" + s + "/"), `${pre}/blog/${s}/ missing from sitemap.xml`);
  }
  // List pages.
  const listed = [], titles = new Map();
  for (let n = 1; n <= 10; n++) {
    const route = pre + (n === 1 ? "/blog/" : "/blog/page/" + n + "/");
    const html = read(route); if (!html || /bioa-legacy-redirect/.test(html)) break;
    const $ = cheerio.load(html);
    ok(!/noindex/.test(robots($)) && inSitemap(route), `${route} list page noindex or missing from sitemap.xml`);
    $("header, footer, .header, .footer, .bb-post-nav").remove();
    const pageSlugs = [];
    $("a[href]").each((_, a) => {
      const m = ($(a).attr("href") || "").match(/^(?:\/en)?\/blog\/([a-z0-9-]+)\/$/);
      if (!m || m[1] === "page") return;
      if (!pageSlugs.includes(m[1])) pageSlugs.push(m[1]);
      const t = $(a).text().trim(); if (t && !$(a).hasClass("btn") && !titles.has(m[1])) titles.set(m[1], t);
    });
    listed.push(...pageSlugs);
  }
  const dupes = listed.filter((s, i) => listed.indexOf(s) !== i);
  ok(dupes.length === 0, `${L} listed twice: ${[...new Set(dupes)].join(", ")}`);
  ok(listed.length === 38 && articles.every((s) => listed.includes(s)), `${L} list shows ${listed.length}/38; missing: ${articles.filter((s) => !listed.includes(s)).join(", ")}`);
  for (const s of listed) {
    const html = read(pre + "/blog/" + s + "/");
    ok(!!html && !/bioa-legacy-redirect/.test(html), `${L} card ${s} does not open an article`);
    if (html) ok(norm(cheerio.load(html)("h1").first().text()) === norm(titles.get(s)), `${L} ${s}: card title "${titles.get(s)}" != H1`);
  }
  // Old slugs -> 301.
  for (const old of R27_PENDING.filter((s) => R28C_RENAMES[s])) {
    const from = pre + "/blog/" + old + "/", to = pre + "/blog/" + R28C_RENAMES[old] + "/";
    const html = read(from);
    if (html !== null || !redirects) ok(html && html.includes('bioa-legacy-redirect" content="' + to + '"'), `${from} is not a redirect page to ${to}`);
    ok(!inSitemap(from), `${from} (old slug) in sitemap.xml`);
    if (redirects) ok(redirects[from] === to, `_bioa-redirects.json: ${from} -> ${redirects[from]} (expected ${to})`);
  }
}

console.log(`r28c-blog-published: ${checks - fails.length}/${checks} PASS`);
if (fails.length) { console.log(fails.slice(0, 40).join("\n")); process.exit(1); }
