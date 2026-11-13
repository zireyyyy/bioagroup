// CMS-R25: one-time (repeatable, non-destructive) import of the CURRENT website content into Sanity, so editors start
// from exactly what the owner approved. Uses createIfNotExists: a document an editor already changed is never
// overwritten. Images are NOT uploaded (owner rule): slots show the current image as a preview and keep it as fallback.
//
//   node tools/cms-seed.mjs <distDir> [--dry-run]
//
// Auth: the Sanity CLI login of the OWNER (sanity login) — the token is read from the CLI config, never printed.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { load } from "cheerio";
import { REGISTRY } from "../bioa-cms.mjs";
import { REPO_CAREER_JOBS } from "../bioa-careers.mjs";
import { LEGAL_TEXT } from "../bioa-legal-pages.mjs";

const PID = "hfmu7ifg", DS = "production", API = "v2025-02-19";
// Current production deployment (immutable hash URL) used only for Studio previews of BIO-A-hosted images.
const PREVIEW_ORIGIN = process.env.BIOA_CMS_PREVIEW_ORIGIN || "https://3045c564.bioagroup.pages.dev";
const dist = process.argv[2];
const dry = process.argv.includes("--dry-run");
if (!dist) { console.error("usage: node tools/cms-seed.mjs <distDir> [--dry-run]"); process.exit(2); }

const read = r => load(fs.readFileSync(path.join(dist, r, "index.html"), "utf8"), { decodeEntities: true });
let key = 0;
const k = () => "k" + (key++).toString(36).padStart(5, "0");
const docs = [];

// ---- Image slots ----
for (const [pageKey, page] of Object.entries(REGISTRY.pages)){
  page.images.forEach((s, i) => {
    const file = decodeURIComponent(s.original.split("/").pop());
    const icon = /\.svg$/i.test(file) || (s.natural && s.natural.w <= 128);
    const frames = s.frames || {};
    const fr = [["1440", "Máy tính"], ["834", "Tablet"], ["390", "Điện thoại"]].filter(([w]) => frames[w]).map(([w, l]) => `${l} ${frames[w].w}×${frames[w].h}`).join(" · ");
    const ratio = s.natural ? (s.natural.w / s.natural.h).toFixed(2) : "?";
    const rec = s.natural ? Math.min(2400, Math.max(s.natural.w, ...Object.values(frames).map(f => f.w * 2))) : 0;
    docs.push({
      _id: "imageSlot-" + s.id, _type: "imageSlot", slotId: s.id, page: pageKey, pageLabel: page.labelVi, order: i + 1,
      title: `${icon ? "Biểu tượng" : "Ảnh"} ${i + 1} — ${s.sections[0]} (${file})`,
      section: s.sections.join(" + "),
      currentUrl: /^https?:/.test(s.original) ? s.original : PREVIEW_ORIGIN + s.original,
      frameInfo: `Tỷ lệ khung ${ratio} : 1 (ảnh hiện tại ${s.natural?.w}×${s.natural?.h}). Hiển thị: ${fr || "chỉ hiện khi tương tác"}.` + (rec ? ` Nên tải ảnh rộng ít nhất ${rec}px.` : "") + (s.occurrences > 1 ? ` Ảnh này xuất hiện ${s.occurrences} lần trên trang.` : ""),
      altVi: s.altVi || "", altEn: s.altEn || ""
    });
  });
}

// ---- Page texts (prefilled with the current VI/EN text) ----
for (const [pageKey, page] of Object.entries(REGISTRY.pages)){
  if (!page.texts.length) continue;
  const d = { _id: "page-" + pageKey, _type: "page_" + pageKey, pageLabel: page.labelVi };
  for (const t of page.texts) d[t.id] = { _type: "object", vi: t.vi, en: t.en };
  docs.push(d);
}

// ---- Blog (the 38 repository posts, unchanged) ----
const blogSrc = fs.readFileSync("bioa-blog-refine.mjs", "utf8").split("\n").find(l => l.startsWith("const blogPosts=["));
const posts = JSON.parse(blogSrc.replace(/^const blogPosts=/, "").replace(/;\s*$/, ""));
const iso = d => d.split(".").reverse().join("-");
posts.forEach((p, i) => {
  docs.push({
    _id: "blog-" + p.slug, _type: "blogPost", legacyId: p.id, order: i + 1,
    titleVi: p.titleVi, titleEn: p.titleEn, slug: { _type: "slug", current: p.slug }, date: iso(p.date), readMin: p.readMin,
    excerptVi: p.excerptVi, excerptEn: p.excerptEn, introVi: p.introVi, introEn: p.introEn,
    sections: p.sections.map(s => ({ _key: k(), _type: "blogSection", anchor: s.id, headingVi: s.headingVi, headingEn: s.headingEn,
      paragraphsVi: s.paragraphsVi, paragraphsEn: s.paragraphsEn, ...(s.bulletsVi ? { bulletsVi: s.bulletsVi } : {}), ...(s.bulletsEn ? { bulletsEn: s.bulletsEn } : {}) })),
    noteVi: p.noteVi, noteEn: p.noteEn, seoTitleVi: p.seoTitleVi, seoTitleEn: p.seoTitleEn, legacyImage: p.image
  });
});

// ---- Careers (3 sample roles, status "sample" = what the site shows today) ----
REPO_CAREER_JOBS.forEach((j, i) => {
  const en = j.route.split("/")[2], vi = j.vi.split("/")[2];
  const d = { _id: "career-" + en, _type: "career", status: "sample", category: j.cat, order: i + 1, legacyRoute: j.route, legacyImage: j.image,
    slugEn: { _type: "slug", current: en }, slugVi: { _type: "slug", current: vi } };
  for (const [lang, L] of [["vi", "VI"], ["en", "EN"]]){
    const t = j.t[lang];
    Object.assign(d, { ["title" + L]: t.title, ["desc" + L]: t.desc, ["intro" + L]: t.intro, ["duties" + L]: t.duties, ["reqs" + L]: t.reqs });
  }
  docs.push(d);
});

// ---- SEO (values the built pages carry today) ----
const SEO = [["home", "Trang chủ", "/", "/en/"], ["about", "Về chúng tôi", "/about/", "/en/about/"], ["cosmetics", "Gia Công Mỹ Phẩm", "/contract-manufacturing-cosmetics/", "/en/contract-manufacturing-cosmetics/"],
  ["services", "Dịch Vụ Khác", "/dich-vu-khac/", "/en/dich-vu-khac/"], ["contacts", "Liên hệ", "/contacts/", "/en/contacts/"], ["careers", "Tuyển dụng", "/tuyen-dung/", "/en/careers/"],
  ["blog", "Blog (trang danh sách)", "/blog/", "/en/blog/"], ["privacy", "Chính sách bảo mật", "/privacy-policy/", "/en/privacy-policy/"], ["cookie", "Chính sách cookie", "/cookie-policy/", "/en/cookie-policy/"]];
for (const [key2, label, vi, en] of SEO){
  const head = r => { const $ = read(r); return { _type: "object", title: $("title").first().text().trim(), description: ($('meta[name="description"]').attr("content") || "").trim() }; };
  docs.push({ _id: "seo-" + key2, _type: "seoPage", key: key2, pageLabel: label, routes: `${vi} · ${en}`, vi: head(vi), en: head(en) });
}

// ---- Legal (current texts as paragraphs with links; NO approval stamp: the site keeps the repository text until
// the owner publishes through "Duyệt & xuất bản") ----
function paragraphToBlock(html){
  const $ = load("<p>" + html + "</p>", { decodeEntities: true }, false);
  const children = [], markDefs = [];
  $("p").contents().each((_, n) => {
    if (n.type === "text") children.push({ _type: "span", _key: k(), text: n.data, marks: [] });
    else if (n.type === "tag" && n.name === "a"){
      const mk = k();
      markDefs.push({ _type: "link", _key: mk, href: $(n).attr("href") });
      children.push({ _type: "span", _key: k(), text: $(n).text(), marks: [mk] });
    } else throw new Error("legal paragraph with unsupported markup: " + html);
  });
  return { _type: "block", _key: k(), style: "normal", markDefs, children };
}
for (const [kind, label] of [["privacy", "Chính sách bảo mật"], ["cookie", "Chính sách cookie"]]){
  const d = { _id: "legal-" + kind, _type: "legalPage", key: kind, pageLabel: label };
  for (const [lang, L] of [["vi", "Vi"], ["en", "En"]]){
    const t = LEGAL_TEXT[kind][lang];
    d["title" + L] = t.title; d["updated" + L] = t.lead;
    d["sections" + L] = t.sections.map(([h, ps]) => ({ _key: k(), _type: "legalSection", heading: h, body: ps.map(paragraphToBlock) }));
  }
  docs.push(d);
}

const count = docs.reduce((a, d) => (a[d._type.startsWith("page_") ? "page" : d._type] = (a[d._type.startsWith("page_") ? "page" : d._type] || 0) + 1, a), {});
console.log("documents:", JSON.stringify(count));
if (dry){ fs.writeFileSync(path.join(os.tmpdir(), "bioa-cms-seed.json"), JSON.stringify(docs, null, 1)); console.log("dry run: nothing sent"); process.exit(0); }

const cfg = path.join(os.homedir(), ".config", "sanity", "config.json");
const token = JSON.parse(fs.readFileSync(cfg, "utf8")).authToken;
if (!token) { console.error("Not logged in: run `npx sanity login` in studio/"); process.exit(1); }
for (let i = 0; i < docs.length; i += 40){
  const batch = docs.slice(i, i + 40);
  const res = await fetch(`https://${PID}.api.sanity.io/${API}/data/mutate/${DS}?returnIds=true&visibility=sync`, {
    method: "POST", headers: { "content-type": "application/json", authorization: "Bearer " + token },
    body: JSON.stringify({ mutations: batch.map(d => ({ createIfNotExists: d })) })
  });
  if (!res.ok) { console.error("Sanity mutate failed:", res.status, (await res.text()).slice(0, 300)); process.exit(1); }
  const out = await res.json();
  console.log(`batch ${i / 40 + 1}: ${out.results.filter(r => r.operation === "create").length} created, ${batch.length - out.results.filter(r => r.operation === "create").length} kept`);
}
