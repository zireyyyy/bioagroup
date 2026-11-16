// R27 static gate on a built dist: F03 (no sample testimonials), content cleanup (no sample/placeholder labels, no
// Merywood MOQ figures, honest careers status, no simulated chat composer, honest image alts), Blog pending-rewrite
// controls (noindex, out of list/sitemap/nav, retired index pages redirect) and SEO uniqueness of indexable pages.
// Usage: node tests/r27-content-audit.mjs [dist]
import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";

const dist = process.argv[2] || "dist";
const fails = [];
const fail = (where, msg) => fails.push(where + " :: " + msg);
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : e.name === "index.html" ? [path.join(d, e.name)] : []);
const routeOf = f => "/" + path.relative(dist, f).split(path.sep).join("/").replace(/index\.html$/, "");
const pages = walk(dist).map(f => ({ f, route: routeOf(f), html: fs.readFileSync(f, "utf8") }));
const real = pages.filter(p => !/bioa-legacy-redirect/.test(p.html));
const sitemap = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");

const BANNED_TEXT = [/sample testimonial/i, /to be updated/i, /nội dung mẫu/i, /giải pháp mẫu/i, /sample solution/i, /sample scenario/i,
  /chi tiết đang cập nhật/i, /details to be confirmed/i, /\b2500 (sản phẩm|units)\b/i, /\b5000 (sản phẩm|units)\b/i, /khách hàng bio-a group/i, /bio-a group client/i,
  /serum đặc trị/i];
const BAD_ALTS = new Set(["icon", "talk", "hands", "blank", "cert", "whiteboxes", "nhà máy và năng lực bio-a group", "đội ngũ bio-a group", "bio-a group team", "bio-a group manufacturing capabilities"]);

for (const p of real) {
  const $ = cheerio.load(p.html);
  const robots = $('meta[name="robots"]').attr("content") || "";
  $("script,style,noscript").remove();
  const text = $("body").text().replace(/\s+/g, " ");
  for (const re of BANNED_TEXT) { const m = text.match(re); if (m && !(/serum đặc trị/i.test(m[0]) && /noindex/.test(robots))) fail(p.route, "banned text: " + m[0]); }
  if (p.route === "/" || p.route === "/en/") if ($(".block-reviews").length) fail(p.route, "Home still renders a reviews/testimonial block");
  $("img[alt]").each((_, e) => { const a = ($(e).attr("alt") || "").trim().toLowerCase(); if (BAD_ALTS.has(a)) fail(p.route, "misleading or file-name alt: " + a); });
  if ($(".bioa-chat__input,form.bioa-chat__composer").length) fail(p.route, "chat still shows a message box that sends nothing");
  if ($("#bioa-contact-fab").length && $(".bioa-chat__cta").length !== 2) fail(p.route, "chat contact CTAs missing");
}
// No fabricated ratings in structured data.
for (const p of real) if (/"@type"\s*:\s*"(Review|AggregateRating|Rating)"|aggregateRating|ratingValue/.test(p.html)) fail(p.route, "Review/AggregateRating structured data");

// Careers: honest status on list and details.
for (const r of ["/tuyen-dung/", "/en/careers/"]) {
  const p = real.find(x => x.route === r); if (!p) { fail(r, "missing"); continue; }
  const $ = cheerio.load(p.html);
  const want = r.startsWith("/en") ? "Not currently hiring" : "Chưa mở tuyển";
  const pills = $(".mwc-card__loc").map((_, e) => $(e).text().trim()).get();
  if (!pills.length || pills.some(t => t !== want)) fail(r, "career status pills: " + JSON.stringify(pills));
}

// Blog pending-rewrite controls.
const blogSrc = fs.readFileSync(new URL("../bioa-blog-refine.mjs", import.meta.url), "utf8");
const pending = [...blogSrc.matchAll(/'([a-z0-9-]+)'/g)].map(m => m[1]).filter(s => blogSrc.indexOf("BLOG_PENDING_REWRITE=new Set([") < blogSrc.indexOf("'" + s + "'") && blogSrc.indexOf("'" + s + "'") < blogSrc.indexOf("]);", blogSrc.indexOf("BLOG_PENDING_REWRITE=new Set([")));
if (pending.length !== 29) fail("blog", "pending list size " + pending.length);
for (const slug of pending) for (const pre of ["", "/en"]) {
  const r = pre + "/blog/" + slug + "/";
  const p = real.find(x => x.route === r); if (!p) { fail(r, "pending article route missing (URL must keep working)"); continue; }
  if (!/<meta name="robots" content="noindex, follow">/.test(p.html)) fail(r, "pending article not noindex,follow");
  if (sitemap.includes("https://bioagroup.vn" + r + "<")) fail(r, "pending article in sitemap");
}
const listedLinks = new Set();
for (const p of real.filter(x => /^(\/en)?\/blog\/(page\/\d+\/)?$/.test(x.route) || (/^(\/en)?\/blog\/[a-z0-9-]+\/$/.test(x.route) && !/noindex/.test(x.html)))) {
  const $ = cheerio.load(p.html);
  $("a[href]").each((_, a) => listedLinks.add($(a).attr("href")));
}
for (const slug of pending) for (const pre of ["", "/en"]) if (listedLinks.has(pre + "/blog/" + slug + "/")) fail(pre + "/blog/" + slug + "/", "pending article linked from a listed Blog page");
for (const pre of ["", "/en"]) for (const n of [3, 4, 5, 6]) {
  const f = path.join(dist, pre.slice(1), "blog", "page", String(n), "index.html");
  if (!fs.existsSync(f) || !fs.readFileSync(f, "utf8").includes('bioa-legacy-redirect" content="' + pre + '/blog/"')) fail(pre + "/blog/page/" + n + "/", "retired Blog index page does not redirect to the Blog home");
}

// SEO uniqueness on indexable pages (one visible H1 per breakpoint is source structure; duplicate desktop/mobile H1 is reported, not failed).
const titles = new Map(), descs = new Map();
let indexable = 0;
for (const p of real) {
  const $ = cheerio.load(p.html);
  if (/noindex/.test($('meta[name="robots"]').attr("content") || "")) continue;
  indexable++;
  const t = $("title").text().trim(), d = ($('meta[name="description"]').attr("content") || "").trim();
  if (!t) fail(p.route, "missing title"); if (!d) fail(p.route, "missing description");
  titles.set(t, [...(titles.get(t) || []), p.route]); descs.set(d, [...(descs.get(d) || []), p.route]);
  if ($('link[rel="canonical"]').attr("href") !== "https://bioagroup.vn" + p.route) fail(p.route, "canonical not self on apex");
  if (!$("h1").length) fail(p.route, "no H1");
  const h1 = new Set($("h1").map((_, e) => $(e).text().replace(/\s+/g, " ").trim()).get());
  if (h1.size > 1) fail(p.route, "different H1 texts: " + [...h1].join(" / "));
}
for (const [t, r] of titles) if (r.length > 1) fail(r.join(","), "duplicate title: " + t);
for (const [d, r] of descs) if (r.length > 1) fail(r.join(","), "duplicate description: " + d.slice(0, 60));

console.log(JSON.stringify({ pages: real.length, indexable, pendingBlog: pending.length, sitemapUrls: (sitemap.match(/<url>/g) || []).length, fails: fails.length }));
for (const f of fails) console.log("FAIL " + f);
console.log(fails.length ? "R27 content audit: FAIL" : "R27 content audit: PASS");
process.exit(fails.length ? 1 : 0);
