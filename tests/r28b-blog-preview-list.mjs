// R28b BLOG-PREVIEW-LIST — the 29 articles pending rewrite are listed on the CMS Preview build only.
// Static check of a built dist (no server):
//   --mode preview     (built with CF_PAGES_BRANCH=cms-preview or BIOA_BLOG_PREVIEW_PENDING=1)
//     * /blog/ + /blog/page/N/ (VI) and /en/ list every article exactly once: the approved ones first in their
//       existing order, then every pending one; each card links to an existing detail page whose H1 = card title.
//     * pending detail pages and every list page that shows one carry robots noindex,follow and are not in sitemap.xml;
//       /blog/ page 1 (approved articles only) stays indexable.
//   --mode production  (default build, branch main): only approved articles listed, pages 3-6 redirect, no pending
//       article in sitemap.xml — i.e. R27/R28 behaviour unchanged.
//   --compare <otherDist>  every blog article <head> (title, description, canonical, hreflang, robots, JSON-LD) is
//       identical between the two builds: listing the articles changes no article SEO.
// Usage: node tests/r28b-blog-preview-list.mjs <distDir> --mode preview|production [--compare <distDir>]
import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";
const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const dist = path.resolve(args[0] || "dist");
const mode = opt("--mode") || "production";
const compare = opt("--compare");
const fails = []; let checks = 0;
const ok = (c, m) => { checks++; if (!c) fails.push(m); };
const read = (d, route) => { const f = path.join(d, route, "index.html"); return fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null; };
const norm = (s) => (s || "").replace(/\s+/g, " ").trim().toLowerCase();
const robots = ($) => $('meta[name="robots"]').attr("content") || "";
const sitemap = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
const inSitemap = (route) => sitemap.includes("<loc>https://bioagroup.vn" + route + "</loc>");

for (const pre of ["", "/en"]) {
  const L = pre || "/vi";
  const articles = fs.readdirSync(path.join(dist, pre.slice(1), "blog"), { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== "page").map((d) => d.name);
  const pending = new Set(), approved = new Set();
  for (const slug of articles) {
    const $ = cheerio.load(read(dist, pre + "/blog/" + slug + "/"));
    (/noindex/.test(robots($)) ? pending : approved).add(slug);
  }
  ok(articles.length === 38 && pending.size === 29 && approved.size === 9, `${L} articles ${articles.length} (pending ${pending.size}, approved ${approved.size}); expected 38 = 29 + 9`);

  // Walk the list pages in order.
  const listed = []; const titles = new Map();
  for (let n = 1; n <= 10; n++) {
    const route = pre + (n === 1 ? "/blog/" : "/blog/page/" + n + "/");
    const html = read(dist, route); if (!html) break;
    const $ = cheerio.load(html);
    if ($('meta[http-equiv="refresh"]').length || !$(".post-card, .post-feature__card").length) break; // retired page -> redirect stub
    $("header, footer, .header, .footer, .bb-post-nav").remove();
    const pageSlugs = [];
    $("a[href]").each((_, a) => {
      const m = ($(a).attr("href") || "").match(/^(?:\/en)?\/blog\/([a-z0-9-]+)\/$/);
      if (!m || m[1] === "page") return;
      if (!pageSlugs.includes(m[1])) pageSlugs.push(m[1]);
      const t = $(a).text().trim(); if (t && !$(a).hasClass("btn") && !titles.has(m[1])) titles.set(m[1], t);
    });
    listed.push(...pageSlugs);
    const shows = pageSlugs.some((s) => pending.has(s));
    ok(!shows || (/noindex/.test(robots($)) && !inSitemap(route)), `${route} lists pending articles but is indexable or in sitemap.xml`);
    if (mode === "production") ok(!shows, `${route} lists a pending article in Production mode`);
  }
  const dupes = listed.filter((s, i) => listed.indexOf(s) !== i);
  ok(dupes.length === 0, `${L} articles listed twice: ${[...new Set(dupes)].join(", ")}`);
  if (mode === "preview") {
    ok(listed.length === 38 && articles.every((s) => listed.includes(s)), `${L} list shows ${listed.length}/38; missing: ${articles.filter((s) => !listed.includes(s)).join(", ")}`);
    ok(listed.slice(0, approved.size).every((s) => approved.has(s)), `${L} approved articles are not listed first`);
    ok(listed.slice(approved.size).every((s) => pending.has(s)), `${L} pending articles mixed into the approved block`);
    const $1 = cheerio.load(read(dist, pre + "/blog/"));
    ok(!/noindex/.test(robots($1)) && inSitemap(pre + "/blog/"), `${pre}/blog/ page 1 must stay indexable`);
  } else {
    ok(listed.length === approved.size && listed.every((s) => approved.has(s)), `${L} Production list shows ${listed.length} (expected the ${approved.size} approved only)`);
    for (const n of [3, 4, 5, 6]) {
      const html = read(dist, pre + "/blog/page/" + n + "/");
      ok(html && /http-equiv="refresh"|location\.replace/i.test(html), `${pre}/blog/page/${n}/ should stay a redirect to the Blog home in Production`);
    }
  }
  // Every listed card leads to its detail page; detail H1 = card title.
  for (const slug of listed) {
    const html = read(dist, pre + "/blog/" + slug + "/");
    ok(!!html, `${L} card ${slug} -> missing detail page`);
    if (!html) continue;
    const $ = cheerio.load(html);
    ok(norm($("h1").first().text()) === norm(titles.get(slug)), `${L} ${slug}: card title "${titles.get(slug)}" != H1 "${$("h1").first().text().trim()}"`);
  }
  for (const slug of pending) ok(!inSitemap(pre + "/blog/" + slug + "/"), `${L} pending ${slug} in sitemap.xml`);
  for (const slug of approved) ok(inSitemap(pre + "/blog/" + slug + "/"), `${L} approved ${slug} missing from sitemap.xml`);

  if (compare) {
    for (const slug of articles) {
      const a = cheerio.load(read(dist, pre + "/blog/" + slug + "/")), b = cheerio.load(read(path.resolve(compare), pre + "/blog/" + slug + "/") || "");
      const head = ($) => [$("title").text(), $('meta[name="description"]').attr("content"), robots($), $('link[rel="canonical"]').attr("href"),
        $('link[rel="alternate"]').map((_, e) => $(e).attr("hreflang") + "=" + $(e).attr("href")).get().join("|"), $('script[type="application/ld+json"]').map((_, e) => $(e).html()).get().join("|"),
        $("h1").text(), $("main, .bb-article, article").first().find("h2").map((_, e) => $(e).text()).get().join("|")].join("\n");
      ok(head(a) === head(b), `${L} ${slug}: SEO head / headings differ from ${compare}`);
    }
  }
}

console.log(`r28b-blog-preview-list (${mode}${compare ? ", compare" : ""}): ${checks - fails.length}/${checks} PASS`);
if (fails.length) { console.log(fails.slice(0, 40).join("\n")); process.exit(1); }
