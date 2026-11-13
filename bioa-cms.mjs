// CMS-R25 (owner 2026-11-13, "SANITY CMS INTEGRATION"): applies PUBLISHED Sanity content to the static build.
// Contract (docs/CMS_CONTENT_RESPONSIVE_CONTRACT.md, docs/CMS_SANITY_R25.md):
//   - data only: CMS values replace text, image sources, SEO tags and the data arrays of Blog/Careers/Legal;
//     DOM, classes, CSS, scripts, breakpoints and every owner-PASS component stay code-owned;
//   - the snapshot (.cms/snapshot.json + .cms/assets/) is written BEFORE the build by tools/fetch-cms.mjs; the
//     build itself never touches the network (tools/net-guard.mjs) and is deterministic for a given snapshot;
//   - no snapshot (CMS not configured, e.g. Production today) = byte-identical output to the pre-CMS site;
//   - every slot is located by its registered ORIGINAL value (cms/registry.json); a slot that no longer matches
//     the page fails the build instead of editing the wrong place (fail closed).
import fs from "node:fs";
import crypto from "node:crypto";

export const CMS_SNAPSHOT = ".cms/snapshot.json";
export const CMS_ASSET_DIR = ".cms/assets";
export const CMS_ASSET_URL = "/assets/cms/";

export const hash = s => crypto.createHash("sha1").update(s).digest("hex").slice(0, 8);
export const normText = s => String(s).replace(/[ \t\r\n\f]+/g, " ").trim();

const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const decode = s => s.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (m, e) =>
  e[0] === "#" ? String.fromCodePoint(/^#x/i.test(e) ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : ENT[e.toLowerCase()] ?? m);

// Text of an element whose children are only text nodes and <br> (lines joined with "\n"); null otherwise.
// Entities are decoded, so the value is what a visitor reads (the build parses HTML with decodeEntities:false).
export function ownText($, el){
  let out = "";
  for (const n of el.children || []){
    if (n.type === "text") out += decode(n.data);
    else if (n.type === "tag" && n.name === "br") out += "\n";
    else if (n.type === "comment") continue;
    else return null;
  }
  const lines = out.split("\n").map(normText);
  while (lines.length && !lines[0]) lines.shift();
  while (lines.length && !lines[lines.length - 1]) lines.pop();
  return lines.join("\n");
}

export function contentRoot($){
  let root = $("main").first();
  if (!root.length) throw new Error("CMS: <main> missing");
  while (root.children().length === 1 && root.children().first().is("div")) root = root.children().first();
  return root;
}

// Same exclusions as tools/cms-registry.mjs: these elements are never CMS text slots.
export const TEXT_EXCLUDE = "form, button, .btn, a.btn, nav, script, style, noscript, svg, .bioa-consent, [data-owner-approval], #mwc-grid, .mwc-filter, .swiper-pagination, .bioa-contact-fab, .cf-modal, [aria-hidden=\"true\"]";

// SEO singletons: route (as built) -> key.
export const SEO_ROUTES = {
  "/": "home", "/en/": "home",
  "/about/": "about", "/en/about/": "about",
  "/contract-manufacturing-cosmetics/": "cosmetics", "/en/contract-manufacturing-cosmetics/": "cosmetics",
  "/dich-vu-khac/": "services", "/en/dich-vu-khac/": "services",
  "/contacts/": "contacts", "/en/contacts/": "contacts",
  "/tuyen-dung/": "careers", "/en/careers/": "careers",
  "/blog/": "blog", "/en/blog/": "blog",
  "/privacy-policy/": "privacy", "/en/privacy-policy/": "privacy",
  "/cookie-policy/": "cookie", "/en/cookie-policy/": "cookie"
};

const escHtml = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const escText = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function loadJson(file){ return JSON.parse(fs.readFileSync(file, "utf8")); }

export const REGISTRY = fs.existsSync("cms/registry.json") ? loadJson("cms/registry.json") : { version: 1, pages: { shell: { images: [], texts: [] } } };
export const CMS = fs.existsSync(CMS_SNAPSHOT) ? loadJson(CMS_SNAPSHOT) : null;
if (CMS && !fs.existsSync("cms/registry.json")) throw new Error("CMS: snapshot present but cms/registry.json missing");
if (CMS && CMS.version !== 2) throw new Error("CMS: unsupported snapshot version " + CMS.version + " (expected 2: per-target image files)");
if (CMS) console.log("CMS snapshot", CMS.dataset, CMS.fetchedAt, "sha", CMS.sha);

const routeToPage = new Map();
for (const [key, p] of Object.entries(REGISTRY.pages)) if (key !== "shell"){ routeToPage.set(p.routes.vi, key); routeToPage.set(p.routes.en, key); }

// ---- Image targets (CMS-R25b) ----
// One image slot = one position on the page; it owns one or more TARGETS (desktop element, mobile element, the
// <source> of a <picture>). A target is identified by its top-level section signature + rank, kind, original URL and
// its rank among identical (kind, URL) references in that section, so two positions that share a file are distinct.
export function sectionSig($, el){
  const x = $(el);
  return el.name + (x.attr("id") ? "#" + x.attr("id") : "") + "." + (x.attr("class") || "").split(/\s+/).filter(Boolean).sort().join(".");
}
const firstSrcset = v => String(v || "").trim().split(/\s*,\s*/)[0].split(/\s+/)[0];
export function imageTargets($, root){
  const out = [], sigSeen = new Map();
  root.children().each((topIndex, top) => {
    const sig = sectionSig($, top), nth = sigSeen.get(sig) || 0;
    sigSeen.set(sig, nth + 1);
    const ranks = new Map();
    const add = (el, kind, url) => {
      if (!url || url.startsWith("data:")) return;
      const rk = kind + "|" + url, k = ranks.get(rk) || 0;
      ranks.set(rk, k + 1);
      out.push({ el, kind, url, topIndex, key: `${sig}#${nth}|${kind}|${url}#${k}` });
    };
    for (const el of [top, ...$(top).find("*").toArray()]){
      if (el.name === "img") add(el, "img", $(el).attr("src") || "");
      else if (el.name === "source" && el.parent?.name === "picture") add(el, "source", firstSrcset($(el).attr("srcset")));
      const style = $(el).attr("style") || "";
      if (style.includes("url(")) for (const m of style.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) add(el, "bg", m[1]);
    }
  });
  return out;
}

function replaceImages($, root, slots, lang, where){
  let targets = null;
  for (const slot of slots){
    const rep = CMS.images?.[slot.id];
    if (!rep) continue;
    targets ||= new Map(imageTargets($, root).map(t => [t.key, t]));
    for (const t of slot.targets){
      const hit = targets.get(t.key), file = rep.files?.[t.key];
      if (!hit) throw new Error(`CMS: image target ${t.key} of slot ${slot.id} not found on ${where} — registry out of date`);
      if (!file) throw new Error(`CMS: snapshot has no file for target ${t.key} of slot ${slot.id}`);
      const node = $(hit.el);
      if (t.kind === "img"){
        node.attr("src", file).removeAttr("srcset").removeAttr("sizes");
        const alt = lang === "en" ? rep.altEn : rep.altVi;
        if (alt) node.attr("alt", alt);
      } else if (t.kind === "source") node.attr("srcset", file);
      else node.attr("style", (node.attr("style") || "").split(t.url).join(file));
    }
  }
}

function replaceTexts($, root, page, lang, where){
  const values = CMS.texts?.[page] || {};
  for (const slot of REGISTRY.pages[page].texts){
    const v = values[slot.id]?.[lang];
    const original = lang === "en" ? slot.en : slot.vi;
    if (typeof v !== "string" || !v.trim() || v === original) continue;
    let n = 0;
    root.find(slot.tags.join(",")).each((_, el) => {
      const node = $(el);
      if (node.is(TEXT_EXCLUDE) || node.closest(TEXT_EXCLUDE).length) return;
      if (ownText($, el) !== original) return;
      node.html(v.split("\n").map(line => escText(line)).join("<br>"));
      n++;
    });
    if (!n) throw new Error(`CMS: text slot ${page}.${slot.id} not found on ${where} — registry out of date`);
  }
}

function applySeo($, route, lang){
  const key = SEO_ROUTES[route];
  const s = key && CMS.seo?.[key]?.[lang];
  if (!s) return;
  // Only values that differ from what the page already carries are written (the CMS starts as a copy of the site).
  if (s.title && s.title !== $("title").first().text().trim()){
    $("title").text(s.title);
    $('meta[property="og:title"],meta[name="twitter:title"]').attr("content", s.title);
  }
  if (s.description && s.description !== ($('meta[name="description"]').attr("content") || "").trim()) $('meta[name="description"],meta[property="og:description"],meta[name="twitter:description"]').attr("content", s.description);
  if (s.ogImage){
    const abs = "https://bioagroup.vn" + s.ogImage.file;
    if (!$('meta[property="og:image"]').length) $("head").append(`<meta property="og:image" content="${escHtml(abs)}">`);
    $('meta[property="og:image"],meta[name="twitter:image"]').attr("content", abs);
    $('meta[property="og:image:width"]').attr("content", String(s.ogImage.w));
    $('meta[property="og:image:height"]').attr("content", String(s.ogImage.h));
    $('meta[property="og:image:type"]').attr("content", s.ogImage.type);
  }
  if (s.canonical){
    // CMS-R25b: a page may only carry its own approved canonical (checked again here, after the fetch step).
    if (s.canonical !== "https://bioagroup.vn" + route) throw new Error(`CMS: canonical ${s.canonical} is not the approved canonical of ${route}`);
    $('link[rel="canonical"]').attr("href", s.canonical);
    $('meta[property="og:url"]').attr("content", s.canonical);
  }
}

// Last step of every page build: image slots (page + site-wide), text slots, SEO.
export function applyCms($, route, lang){
  if (!CMS) return;
  const page = routeToPage.get(route);
  // Images outside <main> (Header/Footer/cookie banner/chat) are owner-PASS shell components: not CMS slots.
  if (page){
    const root = contentRoot($);
    replaceImages($, root, REGISTRY.pages[page].images, lang, route);
    replaceTexts($, root, page, lang, route);
  }
  applySeo($, route, lang);
}

// ---- Data merges for the code-owned renderers (Blog, Careers, Legal) ----

export function mergeCmsBlogPosts(repoPosts){
  if (!CMS?.blog?.length) return repoPosts;
  const cms = new Map(CMS.blog.map(p => [p.slug, p]));
  const repoSlugs = new Set(repoPosts.map(p => p.slug));
  const merged = repoPosts.map(p => cms.get(p.slug) || p);
  const iso = d => String(d).split(".").reverse().join("-");
  for (const post of CMS.blog.filter(p => !repoSlugs.has(p.slug)).sort((a, b) => iso(b.date).localeCompare(iso(a.date)))){
    const at = merged.findIndex(p => iso(p.date) <= iso(post.date));
    merged.splice(at < 0 ? merged.length : at, 0, post);
  }
  return merged;
}

export function mergeCmsCareers(repoJobs){
  if (!CMS?.careers) return repoJobs;
  const byRoute = new Map(CMS.careers.map(j => [j.route, j]));
  const out = [];
  for (const [i, job] of repoJobs.entries()){
    const c = byRoute.get(job.route);
    if (!c) { out.push({ ...job, order: job.order ?? i + 1 }); continue; }
    byRoute.delete(job.route);
    if (c.status !== "draft") out.push(c);
  }
  for (const c of byRoute.values()) if (c.status !== "draft") out.push(c);
  return out.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function cmsLegal(kind, lang){
  return CMS?.legal?.[kind]?.[lang] || null;
}
