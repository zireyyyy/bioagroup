// CMS-R25 (owner 2026-11-13, "SANITY CMS INTEGRATION"): developer tool that derives the CMS slot registry
// (cms/registry.json) from a BUILT site, so every editable image/text slot is exactly something the current
// owner-PASS pages already render. Nothing here runs in the website build.
//
//   node tools/cms-registry.mjs <distDir>                       -> static scan (images + texts, VI/EN pairs)
//   node --import ./tools/pw-system-chrome.mjs tools/cms-registry.mjs <distDir> --measure
//                                                                -> + natural image size and rendered frames
//                                                                   at 1440 / 834 / 390 (needs network for
//                                                                   the images still hosted on merywood.com)
//
// Slot ids are content hashes (page + original URL / original VI text): when a developer later changes the
// source text or image, the old CMS value no longer matches any slot and is NOT applied (no stale override).
import fs from "node:fs";
import path from "node:path";
import { load } from "cheerio";
import { BUSINESS } from "../bioa-business.mjs";
import { hash, normText, ownText, contentRoot, TEXT_EXCLUDE, imageTargets } from "../bioa-cms.mjs";

export const CMS_PAGES = [
  { key: "home", labelVi: "Trang chủ", labelEn: "Home", vi: "/", en: "/en/" },
  { key: "about", labelVi: "Về chúng tôi", labelEn: "About", vi: "/about/", en: "/en/about/" },
  { key: "cosmetics", labelVi: "Gia Công Mỹ Phẩm", labelEn: "Cosmetic Manufacturing", vi: "/contract-manufacturing-cosmetics/", en: "/en/contract-manufacturing-cosmetics/" },
  { key: "services", labelVi: "Dịch Vụ Khác", labelEn: "Other Services", vi: "/dich-vu-khac/", en: "/en/dich-vu-khac/" },
  { key: "contacts", labelVi: "Liên hệ", labelEn: "Contacts", vi: "/contacts/", en: "/en/contacts/" },
  { key: "careers", labelVi: "Tuyển dụng (trang danh sách)", labelEn: "Careers (list page)", vi: "/tuyen-dung/", en: "/en/careers/" }
];

// BIO-A brand assets are protected (logos keep their proportions; AGENTS.md §3), the Zalo mark is a channel icon.
export const PROTECTED_IMAGE = /^\/assets\/(bioa-full|bioa-monogram|bioa-logo|zalo-)/;
// Text exclusions (Careers-managed, owner-PASS CTA/forms/nav) are shared with the build: TEXT_EXCLUDE in bioa-cms.mjs.
const TEXT_TAGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "div", "li", "blockquote", "td", "th", "dt", "dd", "strong", "b", "em", "label", "figcaption", "small"]);

function sectionLabel($, sec){
  const h = $(sec).find("h1,h2,h3").first();
  const t = normText(h.text()).replace(/⁠/g, "");
  return t ? t.slice(0, 70) : "(Phần không có tiêu đề)";
}

function topSection($, root, el){
  let cur = el;
  while (cur && cur.parent && cur.parent !== root[0]) cur = cur.parent;
  return cur;
}

const read = (dist, route) => load(fs.readFileSync(path.join(dist, route, "index.html"), "utf8"), { decodeEntities: false });

function walkPairs($v, $e, a, b, out, sec, secLabel){
  const ca = a.children.filter(n => n.type === "tag"), cb = b.children.filter(n => n.type === "tag");
  if (ca.length !== cb.length) return;
  for (let i = 0; i < ca.length; i++){
    const x = ca[i], y = cb[i];
    if (x.name !== y.name) continue;
    if ($v(x).is(TEXT_EXCLUDE)) continue;
    const s = sec ?? x, sl = secLabel ?? sectionLabel($v, x);
    const tv = ownText($v, x), te = ownText($e, y);
    if (tv !== null && te !== null){
      if (TEXT_TAGS.has(x.name) && /\p{L}/u.test(tv) && /\p{L}/u.test(te) && tv.length >= 2) out.push({ tag: x.name, vi: tv, en: te, section: sl });
      continue;
    }
    walkPairs($v, $e, x, y, out, s, sl);
  }
}

const identity = [BUSINESS.email, BUSINESS.phone, BUSINESS.taxId].filter(Boolean);

function pageTexts($v, $e, pageKey){
  const rv = contentRoot($v), re = contentRoot($e);
  const raw = [];
  walkPairs($v, $e, rv[0], re[0], raw, null, null);
  const by = new Map();
  for (const t of raw){
    if (identity.some(x => t.vi.includes(x) || t.en.includes(x))) continue;
    const key = t.vi + "\u0000" + t.en;
    const cur = by.get(key) || { id: "t_" + hash(pageKey + "\u0000" + t.vi + "\u0000" + t.en), page: pageKey, tags: new Set(), sections: new Set(), vi: t.vi, en: t.en, occurrences: 0 };
    cur.tags.add(t.tag); cur.sections.add(t.section); cur.occurrences++;
    by.set(key, cur);
  }
  // A VI text that maps to two different EN texts (or vice versa) cannot be edited safely as one slot.
  const viCount = new Map(), enCount = new Map();
  for (const x of by.values()){ viCount.set(x.vi, (viCount.get(x.vi) || 0) + 1); enCount.set(x.en, (enCount.get(x.en) || 0) + 1); }
  return [...by.values()].filter(x => viCount.get(x.vi) === 1 && enCount.get(x.en) === 1).map(x => ({
    ...x, tags: [...x.tags], sections: [...x.sections], multiline: x.vi.includes("\n") || x.en.includes("\n"),
    // Content envelope: a little room over the PASS text, never unlimited (docs/CMS_CONTENT_RESPONSIVE_CONTRACT.md).
    maxVi: Math.max(Math.ceil(x.vi.length * 1.25), x.vi.length + 12), maxEn: Math.max(Math.ceil(x.en.length * 1.25), x.en.length + 12)
  }));
}

// ---- Image slots (CMS-R25b: one slot per POSITION, targets per element) ----
// Locked (never a CMS slot, listed with the reason): BIO-A brand assets, owner-PASS icons (SVG or raster <= 128 px),
// Careers job-card images (Careers documents), everything outside <main> (Header/Footer/cookie banner/chat).
const ICON_MAX = 128;
function cardTitle($, el, top){
  for (let cur = el.parent; cur && cur !== top.parent; cur = cur.parent){
    const t = $(cur).find('[class*="title"], h2, h3, h4').filter((_, x) => !$(x).find("img,picture").length).first();
    const txt = normText(t.text()).replace(/⁠/g, "");
    if (txt && txt.length <= 90) return txt;
  }
  return "";
}

function pageImageTargets($, root, pageKey){
  return imageTargets($, root).map(t => {
    const top = root.children().get(t.topIndex);
    const pic = t.el.parent?.name === "picture" ? t.el.parent : null;
    return { key: t.key, kind: t.kind, url: t.url, picture: pic ? ($(pic).find("img").attr("src") || null) : null,
      section: sectionLabel($, top), card: cardTitle($, t.el, top), alt: t.kind === "img" ? ($(t.el).attr("alt") || "") : "",
      careerCard: $(t.el).closest("#mwc-grid").length > 0, page: pageKey };
  });
}

export function lockReason(t){
  if (PROTECTED_IMAGE.test(t.url)) return "Logo/biểu tượng thương hiệu BIO-A hoặc Zalo (bảo vệ, AGENTS.md §3)";
  if (t.careerCard) return "Ảnh thẻ việc làm — quản lý trong mục Tuyển dụng (từng vị trí)";
  if (/\.svg(\?|$)/i.test(t.url)) return "Biểu tượng SVG owner-PASS (khóa; không nhận SVG tải lên)";
  if (t.natural && t.natural.w <= ICON_MAX && t.natural.h <= ICON_MAX) return "Biểu tượng nhỏ owner-PASS (khóa)";
  const fr = Object.values(t.frames || {});
  if (fr.length && fr.every(f => f.w <= 96 && f.h <= 96)) return "Đồ họa cỡ biểu tượng (≤ 96 px, ví dụ dấu chứng nhận GMP/HACCP) — owner-PASS, khóa; mở khóa cần OWNER duyệt";
  return null;
}

// Desktop/mobile variants of ONE position are merged only through the reviewed mapping in cms/slot-groups.json.
function buildSlots(pageKey, targets, groups){
  const locked = [], free = [];
  for (const t of targets){
    const r = lockReason(t);
    if (r) locked.push({ key: t.key, kind: t.kind, url: t.url, reason: r, natural: t.natural || null }); else free.push(t);
  }
  const byKey = new Map(free.map(t => [t.key, t]));
  const owner = new Map();
  for (const g of groups || []){
    for (const k of g.targets) if (!byKey.has(k)) throw new Error(`slot-groups: ${pageKey} target not found or locked: ${k}`);
    for (const k of g.targets) if (owner.has(k)) throw new Error(`slot-groups: ${pageKey} target in two groups: ${k}`);
    const copy = { ...g, targets: [...g.targets] };
    for (const k of copy.targets) owner.set(k, copy);
  }
  // A <picture> <source> always belongs to the <img> of the same <picture> (same section, img src = picture img).
  for (const t of free) if (t.kind === "source" && !owner.has(t.key)){
    const sec = t.key.split("|")[0];
    const img = free.find(x => x.kind === "img" && x.key.split("|")[0] === sec && x.url === t.picture);
    if (!img) continue;
    const g = owner.get(img.key) || { targets: [img.key], note: "" };
    g.targets.push(t.key);
    g.note = (g.note ? g.note + "; " : "") + "ảnh <picture> có bản riêng cho điện thoại";
    owner.set(img.key, g); owner.set(t.key, g);
  }
  const slots = [], done = new Set();
  for (const t of free){
    if (done.has(t.key)) continue;
    const g = owner.get(t.key);
    const members = (g ? g.targets : [t.key]).map(k => byKey.get(k));
    members.forEach(m => done.add(m.key));
    const lead = members.find(m => m.kind === "img") || members[0];
    slots.push({
      id: pageKey + "_" + hash(members.map(m => m.key).sort().join("\n")), page: pageKey,
      label: lead.card || "", sections: [...new Set(members.map(m => m.section))], pairNote: g?.note || "",
      altVi: lead.alt || "", altEn: lead.altEn || "",
      targets: members.map(m => ({ key: m.key, kind: m.kind, url: m.url, natural: m.natural || null, frames: m.frames || {} }))
    });
  }
  return { slots, locked };
}

export function scan(dist){
  const pages = {};
  for (const p of CMS_PAGES){
    const $v = read(dist, p.vi), $e = read(dist, p.en);
    const tv = pageImageTargets($v, contentRoot($v), p.key), te = pageImageTargets($e, contentRoot($e), p.key);
    const enAlt = new Map(te.map(t => [t.key, t.alt]));
    for (const t of tv) t.altEn = enAlt.get(t.key) ?? "";
    pages[p.key] = { labelVi: p.labelVi, labelEn: p.labelEn, routes: { vi: p.vi, en: p.en }, targets: tv, texts: pageTexts($v, $e, p.key) };
  }
  return pages;
}

function shellLocked(dist){
  const $ = read(dist, "/privacy-policy/"), seen = new Map();
  $("body").find("img, source[srcset], [style*='url(']").each((_, el) => {
    if ($(el).closest("main").length) return;
    const x = $(el);
    const url = x.is("img") ? x.attr("src") : x.is("source") ? (x.attr("srcset") || "").split(/[\s,]+/)[0] : ((x.attr("style") || "").match(/url\(\s*['"]?([^'")]+)/) || [])[1];
    if (!url || url.startsWith("data:") || seen.has(url)) return;
    const where = x.closest(".bioa-contact-fab").length ? "Khung chat (owner-PASS, khóa)" : x.closest("header").length ? "Header (owner-PASS, khóa)"
      : x.closest(".footer, footer, .footer-top").length ? "Footer (owner-PASS, khóa)" : x.closest(".bioa-consent, button").length ? "Banner/biểu tượng cookie (owner-PASS, khóa)" : "Khung dùng chung (owner-PASS, khóa)";
    seen.set(url, { url, kind: x.is("img") ? "img" : x.is("source") ? "source" : "bg", reason: PROTECTED_IMAGE.test(url) ? "Logo BIO-A / Zalo (bảo vệ)" : where });
  });
  return [...seen.values()];
}

// Serves the dist with every content image target tagged (data-cms-t-<n>) so the browser measures exactly that
// element, even after sliders re-order or clone slides.
async function measure(dist, pages){
  const http = await import("node:http");
  const { chromium } = await import("playwright");
  const { createDistServer } = await import("./serve-dist.mjs");
  const files = createDistServer(dist);
  const tagged = new Map();
  for (const p of Object.values(pages)){
    const $ = read(dist, p.routes.vi), root = contentRoot($);
    imageTargets($, root).forEach((t, i) => $(t.el).attr("data-cms-t-" + i, t.kind));
    tagged.set(p.routes.vi, $.html());
  }
  const server = http.createServer((req, res) => {
    const u = new URL(req.url, "http://x");
    if (tagged.has(u.pathname)){ res.writeHead(200, { "content-type": "text/html; charset=utf-8" }); res.end(tagged.get(u.pathname)); return; }
    files.emit("request", req, res);
  });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const base = "http://127.0.0.1:" + server.address().port;
  const browser = await chromium.launch(process.env.BIOA_CHROME_PATH ? { executablePath: process.env.BIOA_CHROME_PATH } : {});
  try{
    for (const [key, p] of Object.entries(pages)){
      const n = p.targets.length;
      const res = p.targets.map(() => ({ natural: null, frames: {} }));
      for (const width of [1440, 834, 390]){
        const ctx = await browser.newContext({ viewport: { width, height: 900 } });
        const tab = await ctx.newPage();
        await tab.goto(base + p.routes.vi, { waitUntil: "load", timeout: 60000 });
        await tab.waitForTimeout(800);
        const r = await tab.evaluate(async ({ n, urls }) => {
          const out = [];
          for (let i = 0; i < n; i++){
            const abs = new URL(urls[i], location.href).href;
            const nat = await new Promise(res => { const im = new Image(); im.onload = () => res({ w: im.naturalWidth, h: im.naturalHeight }); im.onerror = () => res(null); im.src = abs; });
            let frame = null;
            for (const el of document.querySelectorAll(`[data-cms-t-${i}]`)){
              const kind = el.getAttribute(`data-cms-t-${i}`);
              const shown = kind === "source" ? el.parentElement.querySelector("img") : el;
              if (!shown) continue;
              if (kind === "source" && shown.currentSrc !== abs) continue;
              if (kind === "img" && shown.closest("picture") && shown.currentSrc && shown.currentSrc !== abs) continue;
              const rc = shown.getBoundingClientRect(), cs = getComputedStyle(shown);
              if (rc.width < 2 || rc.height < 2 || cs.display === "none" || cs.visibility === "hidden") continue;
              frame = { w: Math.round(rc.width), h: Math.round(rc.height), fit: kind === "bg" ? null : cs.objectFit, bgSize: kind === "bg" ? cs.backgroundSize : null };
              break;
            }
            out.push({ nat, frame });
          }
          return out;
        }, { n, urls: p.targets.map(t => t.url) });
        r.forEach((v, i) => { if (v.nat && !res[i].natural) res[i].natural = v.nat; if (v.frame) res[i].frames[width] = v.frame; });
        await ctx.close();
      }
      p.targets.forEach((t, i) => { t.natural = res[i].natural; t.frames = res[i].frames; });
      console.log("measured", key, n, "targets");
    }
  } finally { await browser.close(); server.close(); }
}

if (import.meta.url === new URL("file:///" + path.resolve(process.argv[1]).replace(/\\/g, "/")).href){
  const dist = process.argv[2];
  if (!dist || !process.argv.includes("--measure")){ console.error("usage: node tools/cms-registry.mjs <distDir> --measure [--targets]   (natural sizes are required to lock icons)"); process.exit(2); }
  const pages = scan(dist);
  await measure(dist, pages);
  const unknown = Object.values(pages).flatMap(p => p.targets).filter(t => !t.natural && !PROTECTED_IMAGE.test(t.url) && !t.careerCard);
  if (unknown.length){ console.error("CMS registry: natural size unknown for", unknown.map(t => t.key)); process.exit(1); }
  const groups = fs.existsSync("cms/slot-groups.json") ? JSON.parse(fs.readFileSync("cms/slot-groups.json", "utf8")) : {};
  const outPages = {};
  for (const [key, p] of Object.entries(pages)){
    const { slots, locked } = buildSlots(key, p.targets, groups[key]);
    outPages[key] = { labelVi: p.labelVi, labelEn: p.labelEn, routes: p.routes, images: slots, locked, texts: p.texts };
  }
  outPages.shell = { labelVi: "Dùng chung toàn site", labelEn: "Site-wide", routes: { vi: "*", en: "*" }, images: [], locked: shellLocked(dist), texts: [] };
  if (process.argv.includes("--targets")){
    for (const [key, p] of Object.entries(pages)) for (const t of p.targets) if (!lockReason(t))
      console.log(key, "|", t.key, "|", t.card, "|", t.natural ? t.natural.w + "x" + t.natural.h : "?", JSON.stringify(Object.fromEntries(Object.entries(t.frames).map(([w, f]) => [w, f.w + "x" + f.h]))));
  }
  const out = { version: 2, note: "Generated by tools/cms-registry.mjs from a built site (+ reviewed cms/slot-groups.json). Do not edit by hand.", pages: outPages };
  fs.mkdirSync("cms", { recursive: true });
  fs.writeFileSync("cms/registry.json", JSON.stringify(out, null, 1) + "\n");
  for (const [k, p] of Object.entries(outPages)) console.log(k, "slots", p.images.length, "targets", p.images.reduce((a, s) => a + s.targets.length, 0), "locked", p.locked.length, "texts", p.texts.length);
}
