// CMS-R25: pre-build step (npm "prebuild") that turns PUBLISHED Sanity content into .cms/snapshot.json + .cms/assets/.
//
//   SANITY_PROJECT_ID not set (or BIOA_CMS=off)  -> CMS disabled: .cms/ removed, the build uses repository content
//                                                   (Production today; local tests and CI).
//   SANITY_PROJECT_ID + SANITY_READ_TOKEN set     -> fetch published documents only (perspective=published: drafts never
//                                                   reach a build), validate them, download the cropped images.
//
// Fail closed: any HTTP error, invalid document or oversized text stops the build (exit 1), so Cloudflare keeps the
// last good deployment. The read token is a viewer token used only here; it never enters dist/ or the browser.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const OUT = ".cms";
const ASSETS = path.join(OUT, "assets");
const API = "v2025-02-19";
const PID = process.env.SANITY_PROJECT_ID || "";
const DS = process.env.SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_READ_TOKEN || "";

const fail = msg => { console.error("CMS FETCH FAILED: " + msg); process.exit(1); };

fs.rmSync(OUT, { recursive: true, force: true });
if (!PID || process.env.BIOA_CMS === "off"){
  console.log("CMS disabled (SANITY_PROJECT_ID not set): the build uses repository content only.");
  process.exit(0);
}
if (!/^[a-z0-9]{6,12}$/.test(PID)) fail("invalid SANITY_PROJECT_ID");
if (!/^[a-z0-9_-]{1,64}$/.test(DS)) fail("invalid SANITY_DATASET");
if (!TOKEN) fail("SANITY_READ_TOKEN is not set (the dataset is private)");

const REGISTRY = JSON.parse(fs.readFileSync("cms/registry.json", "utf8"));

async function http(url, init = {}, tries = 3){
  for (let i = 1; ; i++){
    try{
      const res = await fetch(url, { ...init, signal: AbortSignal.timeout(30000) });
      if (res.ok) return res;
      if (res.status < 500 && res.status !== 429) throw new Error(`HTTP ${res.status} for ${url.split("?")[0]}`);
      if (i >= tries) throw new Error(`HTTP ${res.status} for ${url.split("?")[0]} after ${tries} tries`);
    }catch(e){
      if (i >= tries || /HTTP 4/.test(e.message)) throw e;
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

const res = await http(`https://${PID}.api.sanity.io/${API}/data/query/${DS}?perspective=published`, {
  method: "POST",
  headers: { "content-type": "application/json", authorization: "Bearer " + TOKEN },
  body: JSON.stringify({ query: QUERY })
}).catch(e => fail(e.message));
const data = (await res.json()).result;
if (!data) fail("empty query result");

const hasHtml = v => /[<>]/.test(JSON.stringify(v ?? ""));
const isStr = v => typeof v === "string";
const strArr = v => Array.isArray(v) && v.every(isStr);
const slugOk = v => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v || "");
fs.mkdirSync(ASSETS, { recursive: true });

// Rectangle (pixels) with the target ratio, inside the editor's crop, centred on the hotspot.
function rectFor(img, ratio){
  const W = img.asset.dim.width, H = img.asset.dim.height;
  const c = { top: 0, bottom: 0, left: 0, right: 0, ...(img.crop || {}) };
  const hs = { x: 0.5, y: 0.5, ...(img.hotspot || {}) };
  const x0 = c.left * W, x1 = (1 - c.right) * W, y0 = c.top * H, y1 = (1 - c.bottom) * H;
  let w = x1 - x0, h = y1 - y0;
  if (ratio){
    if (w / h > ratio) w = h * ratio; else h = w / ratio;
  }
  const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
  const x = clamp(hs.x * W - w / 2, x0, x1 - w), y = clamp(hs.y * H - h / 2, y0, y1 - h);
  return { x: Math.round(x), y: Math.round(y), w: Math.max(1, Math.round(w)), h: Math.max(1, Math.round(h)) };
}

async function saveImage(img, base, { ratio = null, width, exact = null }){
  if (!img?.asset?.url || !img.asset.dim) fail("image without asset metadata: " + base);
  const id = img.asset._id.replace(/^image-/, "");
  if (img.asset.mimeType === "image/svg+xml"){
    const file = `${base}-${crypto.createHash("sha1").update(id).digest("hex").slice(0, 10)}.svg`;
    const body = Buffer.from(await (await http(img.asset.url)).arrayBuffer());
    if (/<script|on[a-z]+\s*=|javascript:/i.test(body.toString("utf8"))) fail("SVG with script content rejected: " + base);
    fs.writeFileSync(path.join(ASSETS, file), body);
    return { file: "/assets/cms/" + file, w: img.asset.dim.width, h: img.asset.dim.height, type: "image/svg+xml" };
  }
  const r = rectFor(img, ratio);
  let W, H;
  if (exact){ W = exact.w; H = exact.h; }
  else { W = Math.min(width, r.w); H = Math.max(1, Math.round(W / (ratio || r.w / r.h))); }
  const q = `rect=${r.x},${r.y},${r.w},${r.h}&w=${W}&h=${H}&fit=scale&fm=webp&q=82`;
  const file = `${base}-${crypto.createHash("sha1").update(id + "?" + q).digest("hex").slice(0, 10)}-${W}x${H}.webp`;
  const body = Buffer.from(await (await http(img.asset.url + "?" + q)).arrayBuffer());
  if (body.length < 100) fail("image download too small: " + base);
  fs.writeFileSync(path.join(ASSETS, file), body);
  return { file: "/assets/cms/" + file, w: W, h: H, type: "image/webp" };
}

const snapshot = { version: 1, projectId: PID, dataset: DS, fetchedAt: new Date().toISOString(), images: {}, texts: {}, seo: {}, blog: [], careers: [], legal: {} };

// ---- Image slots: the new image is cut to the ratio of the image the slot shows today (layout unchanged). ----
const slots = new Map(Object.values(REGISTRY.pages).flatMap(p => p.images).map(s => [s.id, s]));
for (const d of data.images){
  const slot = slots.get(d.slotId);
  if (!slot) { console.warn("CMS: image slot not in registry (ignored):", d.slotId); continue; }
  if (!slot.natural) fail("registry slot without natural size: " + slot.id);
  if (hasHtml([d.altVi, d.altEn])) fail("alt text with < or > in " + slot.id);
  const frames = Object.values(slot.frames || {});
  const intrinsic = frames.some(f => (f.fit && !["cover", "contain"].includes(f.fit)) || (f.bgSize && /auto/.test(f.bgSize)));
  const maxFrame = Math.max(0, ...frames.map(f => f.w));
  const out = await saveImage(d.img, slot.id, {
    ratio: slot.natural.w / slot.natural.h,
    width: Math.min(2400, Math.max(slot.natural.w, Math.ceil(maxFrame * 2))),
    exact: intrinsic ? slot.natural : null
  });
  snapshot.images[slot.id] = { ...out, altVi: (d.altVi || "").trim(), altEn: (d.altEn || "").trim() };
}

// ---- Page texts ----
for (const doc of data.pages){
  const key = doc._type.replace(/^page_/, "");
  const page = REGISTRY.pages[key];
  if (!page) { console.warn("CMS: page type not in registry (ignored):", doc._type); continue; }
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

// ---- SEO ----
const SEO_KEYS = new Set(["home", "about", "cosmetics", "services", "contacts", "careers", "blog", "privacy", "cookie"]);
for (const d of data.seo){
  if (!SEO_KEYS.has(d.key)) continue;
  const entry = {};
  for (const lang of ["vi", "en"]){
    const s = d[lang];
    if (!s) continue;
    if (hasHtml([s.title, s.description])) fail(`SEO ${d.key}.${lang} contains < or >`);
    if (s.title && s.title.length > 120) fail(`SEO title too long: ${d.key}.${lang}`);
    if (s.description && s.description.length > 300) fail(`SEO description too long: ${d.key}.${lang}`);
    if (s.canonical && !/^https:\/\/bioagroup\.vn\/(?:[a-z0-9-]+\/)*$/.test(s.canonical)) fail(`SEO canonical outside bioagroup.vn: ${d.key}.${lang}`);
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
    id: d.legacyId ?? Number.parseInt(crypto.createHash("sha1").update(slug).digest("hex").slice(0, 7), 16),
    slug, titleVi: d.titleVi, titleEn: d.titleEn,
    seoTitleVi: d.seoTitleVi || d.titleVi, seoTitleEn: d.seoTitleEn || d.titleEn,
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

// ---- Legal: only documents published through "Duyệt & xuất bản" (approval stamp at publish time) ----
const escHtml = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const HREF = /^(mailto:[^\s<>"]+|tel:\+?[0-9 .-]+|\/(?:[a-z0-9-]+\/)*)$/;
function blocksToHtml(blocks, where){
  return (blocks || []).map(b => {
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
}
for (const d of data.legal){
  if (!["privacy", "cookie"].includes(d.key)) continue;
  const a = d.approval || {};
  const stamped = a.confirmed === true && a.approvedBy && a.approvedAt && Math.abs(Date.parse(d._updatedAt) - Date.parse(a.approvedAt)) <= 10 * 60 * 1000;
  if (!stamped){ console.warn(`CMS: legal page "${d.key}" has no valid approval stamp — repository text kept`); continue; }
  const out = {};
  for (const [lang, L] of [["vi", "Vi"], ["en", "En"]]){
    const secs = d["sections" + L];
    if (!isStr(d["title" + L]) || !isStr(d["updated" + L]) || !Array.isArray(secs) || !secs.length) fail(`legal ${d.key}: ${lang} incomplete`);
    if (hasHtml([d["title" + L], d["updated" + L], secs.map(s => s.heading)])) fail(`legal ${d.key}: < or > in title/heading`);
    out[lang] = { title: d["title" + L], lead: d["updated" + L], sections: secs.map(s => [s.heading, blocksToHtml(s.body, `${d.key}.${lang}`)]) };
  }
  out.approvedBy = a.approvedBy; out.approvedAt = a.approvedAt;
  snapshot.legal[d.key] = out;
}

const body = JSON.stringify(snapshot, null, 1);
snapshot.sha = crypto.createHash("sha256").update(body.replace(/"fetchedAt": "[^"]*"/, "")).digest("hex").slice(0, 16);
fs.writeFileSync(path.join(OUT, "snapshot.json"), JSON.stringify(snapshot, null, 1) + "\n");
console.log(`CMS snapshot ${snapshot.sha}: ${Object.keys(snapshot.images).length} images, ${Object.keys(snapshot.texts).length} pages, ${snapshot.blog.length} blog posts, ${snapshot.careers.length} careers, ${Object.keys(snapshot.seo).length} SEO pages, ${Object.keys(snapshot.legal).length} approved legal pages`);
