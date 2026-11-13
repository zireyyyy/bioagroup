// CMS-R25b: inventory of EVERY image reference in a built site and who manages it.
//   node tools/cms-image-audit.mjs <distDir>  -> docs/CMS_IMAGE_SOURCES.md (+ JSON on stdout summary)
// Sources scanned: <img src/srcset>, <picture><source srcset>, inline style url(), <style> url(), <video poster>,
// <link rel=icon/apple-touch-icon>, og:image/twitter:image, JSON-LD "image", served CSS files url(), JS string literals.
import fs from "node:fs";
import path from "node:path";
import { load } from "cheerio";
import { contentRoot, imageTargets } from "../bioa-cms.mjs";

const dist = process.argv[2];
if (!dist){ console.error("usage: node tools/cms-image-audit.mjs <distDir>"); process.exit(2); }
const REG = JSON.parse(fs.readFileSync("cms/registry.json", "utf8"));
const IMG_RE = /\.(?:webp|png|jpe?g|gif|svg|avif)(?:\?[^"'\s)]*)?$/i;

const pageByRoute = new Map();
for (const [key, p] of Object.entries(REG.pages)) if (p.routes.vi !== "*"){ pageByRoute.set(p.routes.vi, key); pageByRoute.set(p.routes.en, key); }
const slotTarget = new Map(), lockedTarget = new Map();
for (const [key, p] of Object.entries(REG.pages)){
  for (const s of p.images) for (const t of s.targets) slotTarget.set(key + "|" + t.key, s.id);
  for (const l of p.locked || []) if (l.key) lockedTarget.set(key + "|" + l.key, l.reason);
}
const shellReason = new Map((REG.pages.shell.locked || []).map(l => [l.url, l.reason]));

const rows = [];
const add = (route, source, url, owner) => rows.push({ route, source, url, owner });
function walk(d){ for (const f of fs.readdirSync(d, { withFileTypes: true })){ const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else if (f.name.endsWith(".html")) scanHtml(p); } }

function scanHtml(file){
  const html = fs.readFileSync(file, "utf8");
  if (/bioa-legacy-redirect/.test(html)) return; // redirect stubs carry no images
  const rel = "/" + path.relative(path.resolve(dist), path.resolve(file)).split(path.sep).join("/");
  const route = rel.endsWith("/index.html") ? rel.slice(0, -"index.html".length) : rel;
  const $ = load(html, { decodeEntities: false });
  const page = pageByRoute.get(route);
  const inMain = new Set();
  const main = $("main").first();
  if (main.length){
    const root = contentRoot($);
    for (const t of imageTargets($, root)){
      inMain.add(t.el);
      let owner;
      if (page){
        const id = slotTarget.get(page + "|" + t.key);
        owner = id ? "CMS: vị trí ảnh " + id : lockedTarget.get(page + "|" + t.key) ? "KHÓA: " + lockedTarget.get(page + "|" + t.key) : "CHƯA QUẢN LÝ: không có trong danh sách vị trí (cần lập lại registry)";
      } else if (/^\/(en\/)?blog\//.test(route)) owner = /\/assets\/bioa-|monogram/.test(t.url) ? "KHÓA: logo/đồ họa BIO-A" : "CMS: ảnh đại diện bài Blog (tài liệu Blog)";
      else if (/^\/(tuyen-dung|en\/careers)\/.+/.test(route)) owner = "CMS: ảnh vị trí tuyển dụng (tài liệu Tuyển dụng) / mẫu chi tiết tuyển dụng";
      else if (/^\/(en\/)?(privacy-policy|cookie-policy)\//.test(route)) owner = "Nội dung pháp lý không có ảnh trong <main>";
      else owner = "CHƯA QUẢN LÝ: trang ngoài phạm vi CMS (" + (/404\.html$/.test(route) ? "trang 404 owner-PASS" : "trang khác") + ")";
      add(route, t.kind === "img" ? "<img>" : t.kind === "source" ? "<picture><source>" : "style inline (main)", t.url, owner);
    }
  }
  $("img, source[srcset], [style*='url(']").each((_, el) => {
    if (inMain.has(el) || $(el).closest("main").length) return;
    const x = $(el);
    const urls = x.is("img") ? [x.attr("src")] : x.is("source") ? [(x.attr("srcset") || "").split(/[\s,]+/)[0]] : [...(x.attr("style") || "").matchAll(/url\(\s*['"]?([^'")]+)/g)].map(m => m[1]);
    for (const u of urls) if (u && !u.startsWith("data:")) add(route, "khung dùng chung (ngoài <main>)", u, "KHÓA: " + (shellReason.get(u) || "Header/Footer/menu/cookie/chat owner-PASS"));
  });
  $("style").each((_, el) => { for (const m of ($(el).html() || "").matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) if (!m[1].startsWith("data:") && IMG_RE.test(m[1])) add(route, "<style> CSS", m[1], "KHÓA: CSS của thành phần owner-PASS (trang trí/nền) — không phải nội dung"); });
  $("video[poster]").each((_, el) => add(route, "<video poster>", $(el).attr("poster"), "CHƯA QUẢN LÝ: video poster (chưa có slot video)"));
  $('link[rel*="icon"]').each((_, el) => add(route, "favicon", $(el).attr("href"), "KHÓA: favicon thương hiệu BIO-A"));
  $('meta[property="og:image"], meta[name="twitter:image"]').each((_, el) => add(route, "og/twitter image", $(el).attr("content"), /^\/(en\/)?blog\/./.test(route) ? "CMS: ảnh bài Blog" : "CMS: SEO trang (ảnh chia sẻ) nếu trang có tài liệu SEO; nếu không: mặc định của trang"));
  $('script[type="application/ld+json"]').each((_, el) => { for (const m of ($(el).html() || "").matchAll(/"image"\s*:\s*\[?\s*"([^"]+)"/g)) add(route, "JSON-LD image", m[1], "CMS: theo ảnh bài Blog (tự sinh)"); });
}

walk(path.resolve(dist));
// Served CSS / JS assets
function walkAssets(d){
  for (const f of fs.readdirSync(d, { withFileTypes: true })){
    const p = path.join(d, f.name);
    if (f.isDirectory()) walkAssets(p);
    else if (/\.css$/.test(f.name)) for (const m of fs.readFileSync(p, "utf8").matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)){ if (!m[1].startsWith("data:") && IMG_RE.test(m[1])) add("(file) " + path.relative(dist, p).split(path.sep).join("/"), "CSS file", m[1], "KHÓA: CSS nguồn Merywood/BIO-A (UI, trang trí) — không phải nội dung"); }
    else if (/\.m?js$/.test(f.name)) for (const m of fs.readFileSync(p, "utf8").matchAll(/["'`]([^"'`\s]{1,300}\.(?:webp|png|jpe?g|gif|svg|avif))["'`]/gi)) add("(file) " + path.relative(dist, p).split(path.sep).join("/"), "JavaScript", m[1], "KHÓA: tài nguyên do script owner-PASS dùng (không phải nội dung trang)");
  }
}
walkAssets(path.join(path.resolve(dist), "assets"));

const group = new Map();
for (const r of rows){ const k = r.source + "\u0000" + r.url + "\u0000" + r.owner; const g = group.get(k) || { ...r, routes: new Set() }; g.routes.add(r.route); group.set(k, g); }
const all = [...group.values()];
const cat = o => o.split(":")[0];
const count = {}; for (const g of all) count[cat(g.owner)] = (count[cat(g.owner)] || 0) + 1;
const out = ["# BIO-A — Nguồn ảnh trên website và người quản lý (CMS-R25b)", "",
  `Tạo tự động bởi \`node tools/cms-image-audit.mjs <dist>\` trên bản build R24RC2 PASS. Mỗi dòng là một (nguồn, URL, người quản lý) duy nhất; cột Trang gộp các route.`, "",
  "| Nhóm | Số nguồn duy nhất |", "|---|---|", ...Object.entries(count).map(([k, v]) => `| ${k} | ${v} |`), "",
  "## CHƯA QUẢN LÝ (kèm lý do)", "", "| Nguồn | URL | Lý do | Trang |", "|---|---|---|---|",
  ...all.filter(g => cat(g.owner) === "CHƯA QUẢN LÝ").map(g => `| ${g.source} | ${g.url.split("/").pop()} | ${g.owner.replace(/^CHƯA QUẢN LÝ: /, "")} | ${[...g.routes].slice(0, 4).join(", ")}${g.routes.size > 4 ? " (+" + (g.routes.size - 4) + ")" : ""} |`), "",
  "## KHÓA (không thuộc phạm vi thay ảnh)", "", "| Nguồn | URL | Lý do | Số trang |", "|---|---|---|---|",
  ...all.filter(g => cat(g.owner) === "KHÓA").map(g => `| ${g.source} | ${g.url.split("/").pop()} | ${g.owner.replace(/^KHÓA: /, "")} | ${g.routes.size} |`), "",
  "## CMS quản lý", "", "| Nguồn | URL | Tài liệu CMS | Số trang |", "|---|---|---|---|",
  ...all.filter(g => cat(g.owner) === "CMS").map(g => `| ${g.source} | ${g.url.split("/").pop()} | ${g.owner.replace(/^CMS: /, "")} | ${g.routes.size} |`), ""];
fs.writeFileSync("docs/CMS_IMAGE_SOURCES.md", out.join("\n"));
console.log("docs/CMS_IMAGE_SOURCES.md", JSON.stringify(count));
