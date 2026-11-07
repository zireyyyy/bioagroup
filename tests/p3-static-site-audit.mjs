// P3 — static audit of every generated route (read-only on dist/).
// Hard failures: broken internal links/assets, wrong <html lang>, missing <title>, visible Merywood
// branding text, duplicate element ids. Everything else is reported for triage (JSON in BIOA_REPORTS).
import { readFileSync, readdirSync, statSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { load } from "cheerio";

const dist = "dist";
const pages = [];
(function walk(d){ for (const f of readdirSync(d)){ const p = path.join(d, f); if (statSync(p).isDirectory()){ if (f !== "assets") walk(p); } else if (f.endsWith(".html")) pages.push(p); } })(dist);

const routeOf = f => "/" + path.relative(dist, f).split(path.sep).join("/").replace(/index\.html$/, "");
const exists = url => {
  const clean = decodeURIComponent(url.split(/[?#]/)[0]);
  const f = path.join(dist, clean);
  return existsSync(f) && (statSync(f).isFile() || existsSync(path.join(f, "index.html")));
};

const hard = [], soft = [], titles = new Map();
const knownDead = new Set(JSON.parse(readFileSync(new URL("./p3-known-dead-links.json", import.meta.url), "utf8")).targets);
const seenDead = new Set();
for (const file of pages){
  const route = routeOf(file);
  const html = readFileSync(file, "utf8");
  const $ = load(html);
  const isEn = route.startsWith("/en/") || route === "/en/404.html";
  const special = /404\.html$/.test(file);
  const lang = ($("html").attr("lang") || "").toLowerCase();
  if (!special && !lang.startsWith(isEn ? "en" : "vi")) hard.push([route, "html lang=" + lang]);
  const title = $("title").first().text().trim();
  if (!title) hard.push([route, "missing <title>"]);
  else if (!special){ titles.set(title, [...(titles.get(title) || []), route]); }
  if (!special){
    if (!$('meta[name="description"]').attr("content")) soft.push([route, "missing meta description"]);
    if (!$('link[rel="canonical"]').attr("href")) soft.push([route, "missing canonical"]);
  }
  for (const [sel, attr] of [["a[href]", "href"], ["link[href]", "href"], ["img[src]", "src"], ["script[src]", "src"], ["source[src]", "src"], ["video[src]", "src"]]){
    $(sel).each((_, e) => {
      const v = $(e).attr(attr) || "";
      if (!v.startsWith("/") || v.startsWith("//") || v.startsWith("/cdn-cgi/")) return;
      if (exists(v)) return;
      const target = v.split(/[?#]/)[0];
      if (sel === "a[href]" && knownDead.has(target)){ seenDead.add(target); return; }
      hard.push([route, "broken " + attr + " " + v]);
    });
  }
  for (const m of html.matchAll(/url\(["']?(\/assets\/[^"')]+)/g)) if (!exists(m[1])) hard.push([route, "broken css url " + m[1]]);
  const ids = new Map();
  $("[id]").each((_, e) => { const id = $(e).attr("id"); ids.set(id, (ids.get(id) || 0) + 1); });
  for (const [id, n] of ids) if (n > 1) hard.push([route, "duplicate id #" + id + " x" + n]);
  $("script,style,noscript,template").remove();
  const text = $("body").text().replace(/\s+/g, " ");
  const brand = text.match(/.{0,40}merywood.{0,40}/i);
  if (brand) hard.push([route, "visible Merywood text: " + brand[0].trim()]);
  $("img").each((_, e) => { if ($(e).attr("alt") === undefined) soft.push([route, "img without alt " + ($(e).attr("src") || "").slice(-50)]); });
}
for (const [t, rs] of titles) if (rs.length > 1) soft.push([rs.join(" , "), "duplicate title: " + t]);
soft.push(["(site)", "known dead internal link targets still present: " + seenDead.size + "/" + knownDead.size + " (owner decision D11)"]);

const out = process.env.BIOA_REPORTS || "p3-reports";
mkdirSync(out, { recursive: true });
writeFileSync(path.join(out, "p3-static-site-audit.json"), JSON.stringify({ pages: pages.length, hard, soft }, null, 2));
const group = list => Object.entries(list.reduce((a, [r, m]) => { const k = m.replace(/ (\/|http).*$/, "").replace(/#\S+ x\d+/, "#id").slice(0, 60); (a[k] = a[k] || []).push(r + " :: " + m); return a; }, {}));
console.log("pages", pages.length);
for (const [k, v] of group(hard)) console.log("HARD", v.length + "×", k, "| e.g.", v[0].slice(0, 160));
for (const [k, v] of group(soft)) console.log("soft", v.length + "×", k, "| e.g.", v[0].slice(0, 160));
console.log(`P3 static: ${hard.length} hard, ${soft.length} soft`);
if (hard.length) process.exit(1);
