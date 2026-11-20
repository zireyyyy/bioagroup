// R28 BLOG-REWRITE: the 29 formerly pending Blog articles are rewritten (unique VI/EN content, own SEO head) while the
// locked Blog detail modules stay. R28c (owner 2026-11-20): all 29 approved for publication, 13 under a new slug (old
// URL 301) — they are now indexable and listed in sitemap.xml.
// Usage: node tests/r28-blog-rewrite-audit.mjs [dist] [--report <file.json>]
import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";
// The Blog module keeps its data private; read it from the source the same way the renderer does.
const blogSrc = fs.readFileSync(new URL("../bioa-blog-refine.mjs", import.meta.url), "utf8");
const blogPosts = JSON.parse(blogSrc.match(/const blogPosts\s*=\s*(\[.*?\]);\n/s)[1]);
import { R28_REWRITTEN } from "./r28-rewritten-slugs.mjs";
const BLOG_PENDING_REWRITE = new Set(R28_REWRITTEN); // the 29 rewritten articles (name kept: R28 audit scope)

const dist = path.resolve(process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : "dist");
const reportAt = process.argv.indexOf("--report");
const fails = [];
const fail = (where, msg) => fails.push(where + " :: " + msg);
const SITE = "https://bioagroup.vn";
const MODULES = [".bb-toc", ".text-block", ".image-block", ".merywood-cg-wrap", ".block-green-card", ".block-flex-table", ".bb-post-nav-wrap"];
// Claims a cosmetics B2B article must not make (quoted counter-examples are removed before the scan).
const CLAIMS = [/\btop\s?\d+\b/i, /số\s?1\b|hàng đầu|tốt nhất|uy tín nhất|rẻ nhất/i, /\b(best|number one|#1|leading)\b/i,
  /cam kết 100|đảm bảo 100|100% (an toàn|hiệu quả|thiên nhiên)|\bguarantee[sd]?\b/i, /trị dứt điểm|chữa khỏi|đặc trị|điều trị tận gốc|\bcures?\b/i,
  /\bFDA\b|chứng nhận quốc tế|công suất \d|\d+\s?(khách hàng|clients)\b/i];
const sitemap = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
const pending = blogPosts.filter((p) => BLOG_PENDING_REWRITE.has(p.slug));
if (pending.length !== 29) fail("data", "expected 29 rewritten articles, got " + pending.length);
if (blogPosts.length !== 38) fail("data", "expected 38 articles, got " + blogPosts.length);

const titles = new Map(), descs = new Map(), rows = [];
const bodies = new Map();
const shingles = (t) => { const w = t.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean); const s = new Set(); for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(" ")); return s; };

for (const post of blogPosts) {
  for (const lang of ["vi", "en"]) {
    const route = (lang === "en" ? "/en" : "") + "/blog/" + post.slug + "/";
    const file = path.join(dist, route, "index.html");
    if (!fs.existsSync(file)) { fail(route, "missing page"); continue; }
    const $ = cheerio.load(fs.readFileSync(file, "utf8"));
    const isPending = BLOG_PENDING_REWRITE.has(post.slug);
    const body = $(".text-block").map((_, e) => $(e).text()).get().join(" ").replace(/\s+/g, " ");
    bodies.set(route, body);
    if (!isPending) continue;
    const L = lang === "en" ? "En" : "Vi";
    const row = { route, words: body.split(" ").length };
    const t = $("title").text().trim(), d = ($('meta[name="description"]').attr("content") || "").trim();
    if (titles.has(t)) fail(route, "duplicate <title> with " + titles.get(t)); titles.set(t, route);
    if (descs.has(d)) fail(route, "duplicate description with " + descs.get(d)); descs.set(d, route);
    if (!t.startsWith(post["seoTitle" + L])) fail(route, "title is not the article SEO title");
    if (d !== post["excerpt" + L]) fail(route, "description is not the article excerpt");
    if (d.length < 90 || d.length > 210) fail(route, "description length " + d.length);
    if (post["seoTitle" + L].length > 66) fail(route, "SEO title length " + post["seoTitle" + L].length);
    // R28c: approved — indexable and in the sitemap.
    if (/noindex/.test($('meta[name="robots"]').attr("content") || "")) fail(route, "approved article is noindex");
    if (!sitemap.includes("<loc>" + SITE + route + "</loc>")) fail(route, "approved article missing from the sitemap");
    const h1 = $(".block-title-post__title").text().trim();
    if (h1 !== post["title" + L]) fail(route, "H1 '" + h1 + "' != title");
    if ($("h1").filter((_, e) => !/block-title-post(-mobile)?__title/.test($(e).attr("class") || "")).length) fail(route, "extra H1 outside the locked title block");
    if ($("link[rel=canonical]").attr("href") !== SITE + route) fail(route, "canonical");
    const alt = Object.fromEntries($("link[rel=alternate][hreflang]").map((_, e) => [[$(e).attr("hreflang"), $(e).attr("href")]]).get());
    if (alt.vi !== SITE + "/blog/" + post.slug + "/" || alt.en !== SITE + "/en/blog/" + post.slug + "/" || !alt["x-default"]) fail(route, "hreflang");
    const ld = $('script[type="application/ld+json"]').map((_, e) => { try { return JSON.parse($(e).html()); } catch { fail(route, "invalid JSON-LD"); return null; } }).get().find((x) => x && x["@type"] === "BlogPosting");
    if (!ld) fail(route, "BlogPosting missing"); else if (!ld.headline || !ld.datePublished || !ld.image) fail(route, "BlogPosting incomplete");
    for (const m of MODULES) if (!$(m).length) fail(route, "locked module missing " + m);
    const h2 = $(".text-block h2[id]").map((_, e) => $(e).attr("id")).get();
    const toc = $(".bb-toc a[href^='#']").map((_, e) => $(e).attr("href").slice(1)).get();
    if (h2.length !== post.sections.length || toc.join() !== h2.join()) fail(route, "TOC/H2 mismatch " + toc.length + "/" + h2.length);
    const hrefs = $(".text-block a, .block-green-card a, .block-flex-table a").map((_, e) => $(e).attr("href")).get().join(" ");
    if (!/(gia-cong-my-pham|contract-manufacturing-cosmetics)/.test(hrefs) || !/dich-vu-khac/.test(hrefs) || !/\/contacts\//.test(hrefs)) fail(route, "internal links to services/contact missing");
    $(".text-block img, .image-block img").each((_, e) => { if (!($(e).attr("alt") || "").trim()) fail(route, "content image without alt"); });
    const visible = [post["title" + L], post["seoTitle" + L], post["excerpt" + L], ...post["intro" + L], post["note" + L],
      ...post.sections.flatMap((s) => [s["heading" + L], ...s["paragraphs" + L], ...(s["bullets" + L] || [])])].join(" ").replace(/“[^”]*”/g, "");
    for (const re of CLAIMS) { const m = visible.match(re); if (m) fail(route, "unsupported claim wording: " + m[0]); }
    if (post.sections.length < 5) fail(route, "fewer than 5 sections");
    if (post.introVi.length !== post.introEn.length || post.sections.some((s) => s.paragraphsVi.length !== s.paragraphsEn.length || (s.bulletsVi || []).length !== (s.bulletsEn || []).length)) fail(route, "VI/EN structure not paired");
    rows.push(row);
  }
}
// Duplication: 5-word shingle Jaccard between every rewritten article and every other article in the same language.
const dup = [];
for (const [a, ta] of bodies) {
  if (!pending.some((p) => a.endsWith("/" + p.slug + "/"))) continue;
  const sa = shingles(ta);
  let best = { j: 0, with: "" };
  for (const [b, tb] of bodies) {
    if (a === b || a.startsWith("/en/") !== b.startsWith("/en/")) continue;
    const sb = shingles(tb); let inter = 0; for (const x of sa) if (sb.has(x)) inter++;
    const j = inter / (sa.size + sb.size - inter || 1);
    if (j > best.j) best = { j, with: b };
  }
  dup.push({ route: a, maxJaccard: +best.j.toFixed(3), with: best.with });
  if (best.j > 0.25) fail(a, "too similar to " + best.with + " (" + best.j.toFixed(3) + ")");
}
const summary = { pendingArticles: pending.length, pagesChecked: rows.length, maxJaccard: Math.max(...dup.map((d) => d.maxJaccard)), fails: fails.length };
if (reportAt > 0) fs.writeFileSync(process.argv[reportAt + 1], JSON.stringify({ summary, rows, dup }, null, 1));
console.log(JSON.stringify(summary));
for (const f of fails) console.log("FAIL " + f);
console.log("R28 Blog rewrite audit: " + (fails.length ? "FAIL" : "PASS"));
process.exit(fails.length ? 1 : 0);
