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
import { hash, normText, ownText, contentRoot, TEXT_EXCLUDE } from "../bioa-cms.mjs";

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

function imageRefs($, root){
  const refs = [];
  root.find("img").each((_, el) => {
    const src = $(el).attr("src") || "";
    if (src && !src.startsWith("data:")) refs.push({ el, url: src, kind: "img" });
  });
  root.find("[style*='url(']").each((_, el) => {
    for (const m of ($(el).attr("style") || "").matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g))
      if (!m[1].startsWith("data:")) refs.push({ el, url: m[1], kind: "bg" });
  });
  return refs;
}

const read = (dist, route) => load(fs.readFileSync(path.join(dist, route, "index.html"), "utf8"), { decodeEntities: false });

function pageImages($, root, pageKey){
  const by = new Map();
  for (const r of imageRefs($, root)){
    if (PROTECTED_IMAGE.test(r.url)) continue;
    if ($(r.el).closest("#mwc-grid").length) continue; // job card images belong to the Careers documents
    const sec = topSection($, root, r.el);
    const label = sec ? sectionLabel($, sec) : "";
    const cur = by.get(r.url) || { id: pageKey + "_" + hash(r.url), page: pageKey, original: r.url, kinds: new Set(), sections: new Set(), occurrences: 0, altVi: "" };
    cur.kinds.add(r.kind); cur.sections.add(label); cur.occurrences++;
    if (r.kind === "img" && !cur.altVi) cur.altVi = $(r.el).attr("alt") || "";
    by.set(r.url, cur);
  }
  return [...by.values()].map(x => ({ ...x, kinds: [...x.kinds], sections: [...x.sections] }));
}

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

function shellImages($){
  const by = new Map();
  $("body").find("img, [style*='url(']").each((_, el) => {
    if ($(el).closest("main").length) return;
    const x = $(el);
    const url = x.is("img") ? x.attr("src") : ((x.attr("style") || "").match(/url\(\s*['"]?([^'")]+)/) || [])[1];
    if (!url || url.startsWith("data:") || PROTECTED_IMAGE.test(url)) return;
    const cur = by.get(url) || { id: "shell_" + hash(url), page: "shell", original: url, kinds: new Set(), sections: new Set(), occurrences: 0, altVi: x.attr("alt") || "" };
    cur.kinds.add(x.is("img") ? "img" : "bg");
    cur.sections.add(x.closest(".bioa-contact-fab").length ? "Khung chat" : x.closest("button").length && /cookie/i.test(x.attr("alt") || "") ? "Biểu tượng cookie" : "Dùng chung");
    cur.occurrences++;
    by.set(url, cur);
  });
  return [...by.values()].map(x => ({ ...x, kinds: [...x.kinds], sections: [...x.sections] }));
}

export function scan(dist){
  const pages = {};
  for (const p of CMS_PAGES){
    const $v = read(dist, p.vi), $e = read(dist, p.en);
    const imgsVi = pageImages($v, contentRoot($v), p.key);
    const enAlt = new Map(pageImages($e, contentRoot($e), p.key).map(x => [x.original, x.altVi]));
    for (const im of imgsVi) im.altEn = enAlt.get(im.original) ?? "";
    pages[p.key] = { labelVi: p.labelVi, labelEn: p.labelEn, routes: { vi: p.vi, en: p.en }, images: imgsVi, texts: pageTexts($v, $e, p.key) };
  }
  const $s = read(dist, "/privacy-policy/"), $se = read(dist, "/en/privacy-policy/");
  const shell = shellImages($s);
  const enAlt = new Map(shellImages($se).map(x => [x.original, x.altVi]));
  for (const im of shell) im.altEn = enAlt.get(im.original) ?? "";
  pages.shell = { labelVi: "Dùng chung toàn site", labelEn: "Site-wide", routes: { vi: "*", en: "*" }, images: shell, texts: [] };
  return pages;
}

async function measure(dist, pages){
  const { chromium } = await import("playwright");
  const { createDistServer } = await import("./serve-dist.mjs");
  const server = createDistServer(dist);
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const base = "http://127.0.0.1:" + server.address().port;
  const browser = await chromium.launch();
  try{
    for (const [key, page] of Object.entries(pages)){
      const route = key === "shell" ? "/privacy-policy/" : page.routes.vi;
      const urls = page.images.map(x => x.original);
      const result = {};
      for (const width of [1440, 834, 390]){
        const ctx = await browser.newContext({ viewport: { width, height: 900 } });
        const tab = await ctx.newPage();
        await tab.goto(base + route, { waitUntil: "load", timeout: 60000 });
        await tab.waitForTimeout(800);
        const r = await tab.evaluate(async urls => {
          const abs = u => new URL(u, location.href).href;
          const out = {};
          for (const u of urls){
            const a = abs(u);
            const nat = await new Promise(res => { const im = new Image(); im.onload = () => res({ w: im.naturalWidth, h: im.naturalHeight }); im.onerror = () => res(null); im.src = a; });
            let box = null, fit = null, bgSize = null;
            for (const el of document.querySelectorAll("img, [style*='url(']")){
              const isImg = el.tagName === "IMG";
              if (isImg ? el.src !== a : !(el.getAttribute("style") || "").includes(u)) continue;
              const rc = el.getBoundingClientRect(), cs = getComputedStyle(el);
              if (rc.width < 2 || rc.height < 2 || cs.display === "none" || cs.visibility === "hidden") continue;
              box = { w: Math.round(rc.width), h: Math.round(rc.height) };
              fit = isImg ? cs.objectFit : null; bgSize = isImg ? null : cs.backgroundSize;
              break;
            }
            out[u] = { nat, box, fit, bgSize };
          }
          return out;
        }, urls);
        for (const [u, v] of Object.entries(r)){
          result[u] ||= { natural: v.nat, frames: {} };
          if (!result[u].natural && v.nat) result[u].natural = v.nat;
          if (v.box) result[u].frames[width] = { ...v.box, fit: v.fit, bgSize: v.bgSize };
        }
        await ctx.close();
      }
      for (const im of page.images){
        const m = result[im.original] || {};
        im.natural = m.natural || null;
        im.frames = m.frames || {};
      }
      console.log("measured", key, page.images.length, "images");
    }
  } finally {
    await browser.close();
    server.close();
  }
}

if (import.meta.url === new URL("file:///" + path.resolve(process.argv[1]).replace(/\\/g, "/")).href){
  const dist = process.argv[2];
  if (!dist) { console.error("usage: node tools/cms-registry.mjs <distDir> [--measure]"); process.exit(2); }
  const pages = scan(dist);
  if (process.argv.includes("--measure")) await measure(dist, pages);
  const missing = Object.values(pages).flatMap(p => p.images).filter(x => process.argv.includes("--measure") && !x.natural);
  if (missing.length) { console.error("CMS registry: natural size unknown for", missing.map(x => x.original)); process.exit(1); }
  const out = { version: 1, note: "Generated by tools/cms-registry.mjs from a built site. Do not edit by hand.", pages };
  fs.mkdirSync("cms", { recursive: true });
  fs.writeFileSync("cms/registry.json", JSON.stringify(out, null, 1) + "\n");
  for (const [k, p] of Object.entries(pages)) console.log(k, "images", p.images.length, "texts", p.texts.length);
}
