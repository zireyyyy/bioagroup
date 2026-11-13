// CMS-R25b: CMS snapshot library (no side effects on import).
//   liveSnapshot()  — PUBLISHED Sanity content -> <outDir>/snapshot.json + <outDir>/assets/ (validated, fail closed)
//   packRelease()   — <dir> -> deterministic gzip archive (snapshot + assets) for a pinned Production content release
//   extractRelease()— verified archive (sha256 must equal the pin) -> <outDir>
// Used by tools/fetch-cms.mjs (prebuild) and tools/cms-release.mjs (owner-approved releases).
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import crypto from "node:crypto";
import { legalApprovalValid } from "../cms/legal-hash.mjs";

export class CmsError extends Error {}
const fail = msg => { throw new CmsError(msg); };
export const sha256 = buf => crypto.createHash("sha256").update(buf).digest("hex");
const API = "v2025-02-19";
export const SITE = "https://bioagroup.vn";

// SEO singletons -> approved routes (canonical = SITE + route; checked by the fetch AND by the build).
export const SEO_PAGE_ROUTES = {
  home: { vi: "/", en: "/en/" }, about: { vi: "/about/", en: "/en/about/" },
  cosmetics: { vi: "/contract-manufacturing-cosmetics/", en: "/en/contract-manufacturing-cosmetics/" },
  services: { vi: "/dich-vu-khac/", en: "/en/dich-vu-khac/" }, contacts: { vi: "/contacts/", en: "/en/contacts/" },
  careers: { vi: "/tuyen-dung/", en: "/en/careers/" }, blog: { vi: "/blog/", en: "/en/blog/" },
  privacy: { vi: "/privacy-policy/", en: "/en/privacy-policy/" }, cookie: { vi: "/cookie-policy/", en: "/en/cookie-policy/" }
};

async function http(url, init = {}, tries = 3){
  for (let i = 1; ; i++){
    try{
      const res = await fetch(url, { ...init, signal: AbortSignal.timeout(30000) });
      if (res.ok) return res;
      if (res.status < 500 && res.status !== 429) throw new CmsError(`HTTP ${res.status} for ${url.split("?")[0]}`);
      if (i >= tries) throw new CmsError(`HTTP ${res.status} for ${url.split("?")[0]} after ${tries} tries`);
    }catch(e){
      if (i >= tries || /HTTP 4/.test(e.message)) throw new CmsError(e.message);
    }
    await new Promise(r => setTimeout(r, 1000 * i * i));
  }
}

const IMG = `{crop, hotspot, "asset": asset->{_id, url, mimeType, "dim": metadata.dimensions}}`;
const QUERY = `{
  "images": *[_type == "imageSlot" && defined(image.asset)] | order(_id) {_id, slotId, altVi, altEn, "img": image${IMG}},
  "pages": *[_type match "page_*"] | order(_id),
  "blog": *[_type == "blogPost"] | order(_id) {..., "img": image${IMG}},
  "careers": *[_type == "career"] | order(_id) {..., "img": image${IMG}},
  "seo": *[_type == "seoPage"] | order(_id) {key, "vi": vi{title, description, canonical, "img": ogImage${IMG}}, "en": en{title, description, canonical, "img": ogImage${IMG}}},
  "legal": *[_type == "legalPage"] | order(_id) {key, _updatedAt, titleVi, titleEn, updatedVi, updatedEn, sectionsVi, sectionsEn, approval}
}`;

const hasHtml = v => /[<>]/.test(JSON.stringify(v ?? ""));
const isStr = v => typeof v === "string";
const strArr = v => Array.isArray(v) && v.every(isStr);
const slugOk = v => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v || "");
const RASTER = new Set(["image/jpeg", "image/png", "image/webp"]);

// Rectangle (pixels) with the target ratio, inside the editor's crop, centred on the hotspot.
export function rectFor(img, ratio){
  const W = img.asset.dim.width, H = img.asset.dim.height;
  const c = { top: 0, bottom: 0, left: 0, right: 0, ...(img.crop || {}) };
  const hs = { x: 0.5, y: 0.5, ...(img.hotspot || {}) };
  const x0 = c.left * W, x1 = (1 - c.right) * W, y0 = c.top * H, y1 = (1 - c.bottom) * H;
  let w = x1 - x0, h = y1 - y0;
  if (ratio){ if (w / h > ratio) w = h * ratio; else h = w / ratio; }
  const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
  const x = clamp(hs.x * W - w / 2, x0, x1 - w), y = clamp(hs.y * H - h / 2, y0, y1 - h);
  return { x: Math.round(x), y: Math.round(y), w: Math.max(1, Math.round(w)), h: Math.max(1, Math.round(h)) };
}

// Size of the file written for one target: 2x its largest frame (cap 2400, never above the source crop); targets whose
// rendering depends on intrinsic size (object-fit fill/none or background-size auto) get exactly the original size.
export function targetSize(target){
  const nat = target.natural;
  if (!nat) fail("registry target without natural size: " + target.key);
  const frames = Object.values(target.frames || {});
  const intrinsic = frames.some(f => (f.fit && !["cover", "contain"].includes(f.fit)) || (f.bgSize && /auto/.test(f.bgSize)));
  const maxFrame = Math.max(0, ...frames.map(f => f.w));
  return { ratio: nat.w / nat.h, width: Math.min(2400, Math.max(nat.w, Math.ceil(maxFrame * 2))), exact: intrinsic ? nat : null };
}

export async function liveSnapshot({ pid, ds = "production", token, outDir, registry }){
  if (!/^[a-z0-9]{6,12}$/.test(pid || "")) fail("invalid SANITY_PROJECT_ID");
  if (!/^[a-z0-9_-]{1,64}$/.test(ds)) fail("invalid SANITY_DATASET");
  if (!token) fail("SANITY_READ_TOKEN is not set (the dataset is private)");
  const ASSETS = path.join(outDir, "assets");
  fs.mkdirSync(ASSETS, { recursive: true });

  const res = await http(`https://${pid}.api.sanity.io/${API}/data/query/${ds}?perspective=published`, {
    method: "POST", headers: { "content-type": "application/json", authorization: "Bearer " + token }, body: JSON.stringify({ query: QUERY })
  });
  const data = (await res.json()).result;
  if (!data) fail("empty query result");

  const written = new Map();
  async function saveImage(img, base, { ratio = null, width, exact = null }){
    if (!img?.asset?.url || !img.asset.dim) fail("image without asset metadata: " + base);
    // Only raster formats are accepted: an uploaded SVG could carry script and would be served from the site origin.
    if (!RASTER.has(img.asset.mimeType)) fail(`image format ${img.asset.mimeType} not accepted (JPEG/PNG/WebP only): ${base}`);
    const id = img.asset._id.replace(/^image-/, "");
    const r = rectFor(img, ratio);
    let W, H;
    if (exact){ W = exact.w; H = exact.h; }
    else { W = Math.min(width, r.w); H = Math.max(1, Math.round(W / (ratio || r.w / r.h))); }
    const q = `rect=${r.x},${r.y},${r.w},${r.h}&w=${W}&h=${H}&fit=scale&fm=webp&q=82`;
    const file = `${base}-${sha256(id + "?" + q).slice(0, 10)}-${W}x${H}.webp`;
    if (!written.has(file)){
      const body = Buffer.from(await (await http(img.asset.url + "?" + q)).arrayBuffer());
      if (body.length < 100 || body.toString("latin1", 8, 12) !== "WEBP") fail("image download is not a WebP file: " + base);
      fs.writeFileSync(path.join(ASSETS, file), body);
      written.set(file, true);
    }
    return { file: "/assets/cms/" + file, w: W, h: H, type: "image/webp" };
  }

  const snapshot = { version: 2, projectId: pid, dataset: ds, fetchedAt: new Date().toISOString(), images: {}, texts: {}, seo: {}, blog: [], careers: [], legal: {} };

  // ---- Image slots: one upload, one file per target, each cut to the ratio that target shows today. ----
  const slots = new Map(Object.values(registry.pages).flatMap(p => p.images).map(s => [s.id, s]));
  for (const d of data.images){
    const slot = slots.get(d.slotId);
    if (!slot){ console.warn("CMS: image slot not in registry (ignored):", d.slotId); continue; }
    if (hasHtml([d.altVi, d.altEn])) fail("alt text with < or > in " + slot.id);
    if (!String(d.altVi || "").trim() || !String(d.altEn || "").trim()) fail("alt text VI/EN required for " + slot.id);
    const files = {};
    for (const t of slot.targets) files[t.key] = (await saveImage(d.img, slot.id, targetSize(t))).file;
    snapshot.images[slot.id] = { files, altVi: d.altVi.trim(), altEn: d.altEn.trim() };
  }

  // ---- Page texts ----
  for (const doc of data.pages){
    const key = doc._type.replace(/^page_/, "");
    const page = registry.pages[key];
    if (!page){ console.warn("CMS: page type not in registry (ignored):", doc._type); continue; }
    const values = {};
    for (const slot of page.texts){
      const v = doc[slot.id];
      if (!v) continue;
      const entry = {};
      for (const [lang, max] of [["vi", slot.maxVi], ["en", slot.maxEn]]){
        if (v[lang] == null) continue;
        if (!isStr(v[lang])) fail(`text ${key}.${slot.id}.${lang} is not a string`);
        const t = v[lang].replace(/\r\n?/g, "\n").split("\n").map(s => s.replace(/[ \t]+/g, " ").trim()).join("\n").trim();
        if (t.length > max) fail(`text ${key}.${slot.id}.${lang} longer than its approved envelope (${t.length} > ${max})`);
        if (/[<>]/.test(t)) fail(`text ${key}.${slot.id}.${lang} contains < or >`);
        if (!slot.multiline && t.includes("\n")) fail(`text ${key}.${slot.id}.${lang} has a line break in a single-line slot`);
        entry[lang] = t;
      }
      values[slot.id] = entry;
    }
    snapshot.texts[key] = values;
  }

  // ---- SEO: canonical may only be the approved canonical of that page and language ----
  for (const d of data.seo){
    const routes = SEO_PAGE_ROUTES[d.key];
    if (!routes) continue;
    const entry = {};
    for (const lang of ["vi", "en"]){
      const s = d[lang];
      if (!s) continue;
      if (hasHtml([s.title, s.description])) fail(`SEO ${d.key}.${lang} contains < or >`);
      if (s.title && s.title.length > 120) fail(`SEO title too long: ${d.key}.${lang}`);
      if (s.description && s.description.length > 300) fail(`SEO description too long: ${d.key}.${lang}`);
      const expected = SITE + routes[lang];
      if (s.canonical && s.canonical !== expected) fail(`SEO canonical of ${d.key}.${lang} must be ${expected} (got ${s.canonical})`);
      entry[lang] = { title: s.title || "", description: s.description || "", canonical: s.canonical || "", ogImage: s.img?.asset ? await saveImage(s.img, `og-${d.key}-${lang}`, { ratio: 1200 / 630, width: 1200 }) : null };
    }
    snapshot.seo[d.key] = entry;
  }

  // ---- Blog (repository post shape, see bioa-blog-refine.mjs) ----
  const slugify = s => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "muc";
  const dmy = iso => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ""); if (!m) fail("invalid blog date " + iso); return `${m[3]}.${m[2]}.${m[1]}`; };
  const slugsSeen = new Set();
  for (const d of data.blog){
    const slug = d.slug?.current;
    if (!slugOk(slug) || slug === "page") fail("invalid blog slug: " + slug);
    if (slugsSeen.has(slug)) fail("duplicate blog slug: " + slug);
    slugsSeen.add(slug);
    if (hasHtml([d.titleVi, d.titleEn, d.seoTitleVi, d.seoTitleEn, d.excerptVi, d.excerptEn, d.introVi, d.introEn, d.sections, d.noteVi, d.noteEn])) fail("blog post with < or >: " + slug);
    for (const k of ["titleVi", "titleEn", "excerptVi", "excerptEn"]) if (!isStr(d[k]) || !d[k].trim()) fail(`blog ${slug}: ${k} missing`);
    if (!strArr(d.introVi) || !strArr(d.introEn) || !d.introVi.length || !d.introEn.length) fail(`blog ${slug}: intro missing`);
    if (!Array.isArray(d.sections) || d.sections.length < 1) fail(`blog ${slug}: sections missing`);
    if (!Number.isInteger(d.readMin) || d.readMin < 1) fail(`blog ${slug}: readMin invalid`);
    const ids = new Set();
    const sections = d.sections.map(s => {
      if (!isStr(s.headingVi) || !isStr(s.headingEn) || !strArr(s.paragraphsVi) || !strArr(s.paragraphsEn)) fail(`blog ${slug}: incomplete section`);
      let id = s.anchor || slugify(s.headingVi), n = 2;
      while (ids.has(id) || id === "tim-hieu-them") id = (s.anchor || slugify(s.headingVi)) + "-" + n++;
      ids.add(id);
      const out = { id, headingVi: s.headingVi, headingEn: s.headingEn, paragraphsVi: s.paragraphsVi, paragraphsEn: s.paragraphsEn };
      if (s.bulletsVi?.length) out.bulletsVi = s.bulletsVi;
      if (s.bulletsEn?.length) out.bulletsEn = s.bulletsEn;
      return out;
    });
    let image = d.legacyImage || "";
    if (d.img?.asset) image = (await saveImage(d.img, "blog-" + slug, { width: 1600 })).file;
    if (!image) fail(`blog ${slug}: image missing`);
    snapshot.blog.push({
      id: d.legacyId ?? Number.parseInt(sha256(slug).slice(0, 7), 16),
      slug, titleVi: d.titleVi, titleEn: d.titleEn, seoTitleVi: d.seoTitleVi || d.titleVi, seoTitleEn: d.seoTitleEn || d.titleEn,
      excerptVi: d.excerptVi, excerptEn: d.excerptEn, date: dmy(d.date), readMin: d.readMin, image,
      introVi: d.introVi, introEn: d.introEn, sections, noteVi: d.noteVi || "", noteEn: d.noteEn || ""
    });
  }

  // ---- Careers (repository job shape, see bioa-careers.mjs) ----
  const routesSeen = new Set();
  for (const d of data.careers){
    const st = d.status;
    if (!["draft", "sample", "open", "closed"].includes(st)) fail("invalid career status: " + st);
    if (!["sales", "rd", "production"].includes(d.category)) fail("invalid career category: " + d.category);
    const en = d.slugEn?.current, vi = d.slugVi?.current;
    if (!slugOk(en) || !slugOk(vi)) fail("invalid career slug");
    const route = "/careers/" + en + "/";
    if (d.legacyRoute && d.legacyRoute !== route) fail("career route changed for " + d.legacyRoute);
    if (routesSeen.has(route)) fail("duplicate career route " + route);
    routesSeen.add(route);
    if (hasHtml(d)) fail("career with < or >: " + route);
    const t = {};
    for (const [lang, L] of [["vi", "VI"], ["en", "EN"]]){
      const x = { title: d["title" + L], desc: d["desc" + L], intro: d["intro" + L], duties: d["duties" + L], reqs: d["reqs" + L],
        badge: d["badge" + L] || "", benefits: d["benefits" + L] || "", place: d["place" + L] || "", apply: d["apply" + L] || "" };
      if (!isStr(x.title) || !isStr(x.desc) || !strArr(x.intro) || !strArr(x.duties) || !strArr(x.reqs)) fail(`career ${route}: ${L} content incomplete`);
      if (st === "open" && (!x.badge || !x.benefits || !x.place || !x.apply)) fail(`career ${route}: "open" requires the official ${L} details`);
      t[lang] = x;
    }
    let image = d.legacyImage || "";
    if (d.img?.asset) image = (await saveImage(d.img, "career-" + en, { ratio: 1024 / 683, width: 1024 })).file;
    if (!image && st !== "draft") fail(`career ${route}: image missing`);
    snapshot.careers.push({ route, vi: "/tuyen-dung/" + vi + "/", cat: d.category, image, status: st, order: d.order ?? 10, t });
  }

  // ---- Legal: only content whose approval stamp hash matches the published content ----
  const escHtml = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const HREF = /^(mailto:[^\s<>"]+|tel:\+?[0-9 .-]+|\/(?:[a-z0-9-]+\/)*)$/;
  const blocksToHtml = (blocks, where) => (blocks || []).map(b => {
    if (b._type !== "block" || (b.style && b.style !== "normal") || b.listItem) fail("unsupported legal block in " + where);
    const links = new Map((b.markDefs || []).map(m => [m._key, m]));
    return (b.children || []).map(c => {
      if (c._type !== "span") fail("unsupported legal inline content in " + where);
      let html = escHtml(c.text || "");
      for (const mk of c.marks || []){
        const m = links.get(mk);
        if (!m || m._type !== "link" || !HREF.test(m.href || "")) fail("invalid legal link in " + where);
        html = `<a href="${escHtml(m.href)}">${html}</a>`;
      }
      return html;
    }).join("");
  }).filter(p => p.trim());
  for (const d of data.legal){
    if (!["privacy", "cookie"].includes(d.key)) continue;
    if (!(await legalApprovalValid(d))){ console.warn(`CMS: legal page "${d.key}" has no valid approval for its current content — repository text kept`); continue; }
    const out = {};
    for (const [lang, L] of [["vi", "Vi"], ["en", "En"]]){
      const secs = d["sections" + L];
      if (!isStr(d["title" + L]) || !isStr(d["updated" + L]) || !Array.isArray(secs) || !secs.length) fail(`legal ${d.key}: ${lang} incomplete`);
      if (hasHtml([d["title" + L], d["updated" + L], secs.map(s => s.heading)])) fail(`legal ${d.key}: < or > in title/heading`);
      out[lang] = { title: d["title" + L], lead: d["updated" + L], sections: secs.map(s => [s.heading, blocksToHtml(s.body, `${d.key}.${lang}`)]) };
    }
    out.approvedBy = d.approval.approvedBy; out.approvedAt = d.approval.approvedAt; out.contentHash = d.approval.contentHash;
    snapshot.legal[d.key] = out;
  }

  const body = JSON.stringify({ ...snapshot, fetchedAt: undefined });
  snapshot.sha = sha256(body).slice(0, 16);
  fs.writeFileSync(path.join(outDir, "snapshot.json"), JSON.stringify(snapshot, null, 1) + "\n");
  return snapshot;
}

export const summary = s => `${Object.keys(s.images).length} image slots, ${Object.keys(s.texts).length} pages, ${s.blog.length} blog posts, ${s.careers.length} careers, ${Object.keys(s.seo).length} SEO pages, ${Object.keys(s.legal).length} approved legal pages`;

// ---- Pinned releases ----
export function packRelease(dir){
  const snapshot = fs.readFileSync(path.join(dir, "snapshot.json"), "utf8");
  const adir = path.join(dir, "assets");
  const assets = fs.existsSync(adir) ? fs.readdirSync(adir).sort().map(f => [f, fs.readFileSync(path.join(adir, f)).toString("base64")]) : [];
  const json = JSON.stringify({ format: "bioa-cms-release/1", snapshot: JSON.parse(snapshot), assets: Object.fromEntries(assets) });
  return zlib.gzipSync(Buffer.from(json, "utf8"), { level: 9, mtime: 0 });
}

export function extractRelease(archivePath, expectedSha, outDir){
  if (!fs.existsSync(archivePath)) fail("pinned CMS release archive missing: " + archivePath);
  const buf = fs.readFileSync(archivePath);
  const got = sha256(buf);
  if (got !== expectedSha) fail(`pinned CMS release sha256 mismatch for ${archivePath}: ${got} != ${expectedSha}`);
  const rel = JSON.parse(zlib.gunzipSync(buf).toString("utf8"));
  if (rel.format !== "bioa-cms-release/1" || !rel.snapshot) fail("invalid CMS release archive format");
  fs.mkdirSync(path.join(outDir, "assets"), { recursive: true });
  for (const [f, b64] of Object.entries(rel.assets || {})){
    if (!/^[a-z0-9_.-]+\.webp$/i.test(f)) fail("invalid asset name in release: " + f);
    fs.writeFileSync(path.join(outDir, "assets", f), Buffer.from(b64, "base64"));
  }
  fs.writeFileSync(path.join(outDir, "snapshot.json"), JSON.stringify(rel.snapshot, null, 1) + "\n");
  return rel.snapshot;
}
