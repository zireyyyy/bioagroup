// CMS-R25: offline tests of the Sanity data layer (bioa-cms.mjs) against the BUILT pages in dist/ — no network.
// Each case runs bioa-cms.mjs in a child process whose cwd holds cms/registry.json and a fixture
// .cms/snapshot.json, exactly as the build sees them after tools/fetch-cms.mjs.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const REG = JSON.parse(fs.readFileSync("cms/registry.json", "utf8"));
const CMS_MOD = pathToFileURL(path.join(ROOT, "bioa-cms.mjs")).href;
const CHEERIO = pathToFileURL(path.join(ROOT, "node_modules", "cheerio", "dist", "esm", "index.js")).href;

function run(snapshot, script){
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bioa-cms-"));
  fs.mkdirSync(path.join(dir, "cms")); fs.mkdirSync(path.join(dir, ".cms"));
  fs.copyFileSync("cms/registry.json", path.join(dir, "cms", "registry.json"));
  if (snapshot) fs.writeFileSync(path.join(dir, ".cms", "snapshot.json"), JSON.stringify({ version: 1, dataset: "test", fetchedAt: "x", sha: "test", images: {}, texts: {}, seo: {}, blog: [], careers: [], legal: {}, ...snapshot }));
  const code = `import { load } from ${JSON.stringify(CHEERIO)}; import * as cms from ${JSON.stringify(CMS_MOD)}; import fs from "node:fs";
    const page = (r) => load(fs.readFileSync(${JSON.stringify(path.join(ROOT, "dist"))} + r + "index.html", "utf8"), { decodeEntities: false });
    const out = await (async () => { ${script} })(); console.log("RESULT" + JSON.stringify(out));`;
  const r = spawnSync(process.execPath, ["--input-type=module", "-e", code], { cwd: dir, encoding: "utf8" });
  fs.rmSync(dir, { recursive: true, force: true });
  const m = /RESULT(.*)$/m.exec(r.stdout);
  return { ok: r.status === 0, value: m ? JSON.parse(m[1]) : null, err: r.stderr };
}

test("no snapshot: applyCms and the merges change nothing", () => {
  const r = run(null, `const $ = page("/"); const before = $.html(); cms.applyCms($, "/", "vi");
    return { same: before === $.html(), cms: cms.CMS, blog: cms.mergeCmsBlogPosts([{ slug: "a" }]).length, jobs: cms.mergeCmsCareers([{ route: "/careers/x/" }]).length };`);
  assert.ok(r.ok, r.err);
  assert.deepEqual(r.value, { same: true, cms: null, blog: 1, jobs: 1 });
});

test("image slot: <img> and background slots replaced on their page only; frame attributes untouched", () => {
  const img = REG.pages.home.images.find(s => s.kinds.includes("img") && s.original.endsWith("image-1-9.webp"));
  const bg = REG.pages.about.images.find(s => s.kinds.includes("bg"));
  const r = run({ images: { [img.id]: { file: "/assets/cms/a.webp", altVi: "A vi", altEn: "A en" }, [bg.id]: { file: "/assets/cms/b.webp", altVi: "", altEn: "" } } }, `
    const home = page("/"); cms.applyCms(home, "/", "vi");
    const en = page("/en/"); cms.applyCms(en, "/en/", "en");
    const about = page("/about/"); cms.applyCms(about, "/about/", "vi");
    const cos = page("/contract-manufacturing-cosmetics/"); const cosBefore = cos.html(); cms.applyCms(cos, "/contract-manufacturing-cosmetics/", "vi");
    const h = home("main img[src='/assets/cms/a.webp']");
    return { home: h.length, alt: h.attr("alt"), srcset: h.attr("srcset") || null, oldLeft: home.html().includes(${JSON.stringify(img.original)}),
      enAlt: en("main img[src='/assets/cms/a.webp']").attr("alt"), about: about("[style*='/assets/cms/b.webp']").length, cosmeticsUnchanged: cosBefore === cos.html() };`);
  assert.ok(r.ok, r.err);
  assert.equal(r.value.home >= 1, true);
  assert.equal(r.value.alt, "A vi");
  assert.equal(r.value.enAlt, "A en");
  assert.equal(r.value.srcset, null);
  assert.equal(r.value.oldLeft, false);
  assert.equal(r.value.about >= 1, true);
  assert.equal(r.value.cosmeticsUnchanged, true, "the same source image on another page is a different slot");
});

test("text slot: only the matching element changes; line breaks become <br>; HTML is escaped", () => {
  const h1 = REG.pages.home.texts.find(t => t.tags.includes("h1"));
  const r = run({ texts: { home: { [h1.id]: { vi: "Tiêu đề <b>mới</b>", en: h1.en } } } }, `
    const $ = page("/"); const before = $("body").text(); cms.applyCms($, "/", "vi");
    const en = page("/en/"); const enBefore = en.html(); cms.applyCms(en, "/en/", "en");
    return { h1: $("main h1").html(), enSame: enBefore === en.html() };`);
  assert.ok(r.ok, r.err);
  assert.equal(r.value.h1, "Tiêu đề &lt;b&gt;mới&lt;/b&gt;");
  assert.equal(r.value.enSame, true, "an unchanged EN value is not rewritten");
});

test("fail closed: a text slot whose registered original is not on the page stops the build", () => {
  const t = REG.pages.home.texts[0];
  const reg = structuredClone(REG); reg.pages.home.texts[0].vi = "ZZZ-not-on-page";
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bioa-cms-drift-"));
  fs.mkdirSync(path.join(dir, "cms")); fs.mkdirSync(path.join(dir, ".cms"));
  fs.writeFileSync(path.join(dir, "cms", "registry.json"), JSON.stringify(reg));
  fs.writeFileSync(path.join(dir, ".cms", "snapshot.json"), JSON.stringify({ version: 1, images: {}, texts: { home: { [t.id]: { vi: "Mới" } } }, seo: {}, blog: [], careers: [], legal: {} }));
  const code = `import { load } from ${JSON.stringify(CHEERIO)}; import * as cms from ${JSON.stringify(CMS_MOD)}; import fs from "node:fs";
    const $ = load(fs.readFileSync(${JSON.stringify(path.join(ROOT, "dist", "index.html"))}, "utf8"), { decodeEntities: false }); cms.applyCms($, "/", "vi");`;
  const r = spawnSync(process.execPath, ["--input-type=module", "-e", code], { cwd: dir, encoding: "utf8" });
  fs.rmSync(dir, { recursive: true, force: true });
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /registry out of date/);
});

test("SEO: only changed values are written; og/twitter follow; canonical restricted by the fetch step", () => {
  const r = run({ seo: { about: { vi: { title: "Tiêu đề SEO mới", description: "", canonical: "", ogImage: { file: "/assets/cms/og.webp", w: 1200, h: 630, type: "image/webp" } } } } }, `
    const $ = page("/about/"); const desc = $('meta[name="description"]').attr("content"); cms.applyCms($, "/about/", "vi");
    return { title: $("title").text(), og: $('meta[property="og:title"]').attr("content"), desc: $('meta[name="description"]').attr("content") === desc,
      img: $('meta[property="og:image"]').attr("content") };`);
  assert.ok(r.ok, r.err);
  assert.deepEqual(r.value, { title: "Tiêu đề SEO mới", og: "Tiêu đề SEO mới", desc: true, img: "https://bioagroup.vn/assets/cms/og.webp" });
});

test("Careers merge: CMS replaces a repository role, draft hides it, new roles follow the CMS order", () => {
  const job = (route, status, order) => ({ route, vi: "/tuyen-dung/x/", cat: "sales", image: "/i.webp", status, order, t: {} });
  const r = run({ careers: [job("/careers/a/", "open", 5), job("/careers/b/", "draft", 1), job("/careers/new/", "sample", 0)] }, `
    return cms.mergeCmsCareers([{ route: "/careers/a/" }, { route: "/careers/b/" }, { route: "/careers/c/" }]).map(j => j.route + ":" + (j.status || "repo"));`);
  assert.ok(r.ok, r.err);
  assert.deepEqual(r.value, ["/careers/new/:sample", "/careers/c/:repo", "/careers/a/:open"]);
});

test("Blog merge: same slug replaced in place; new posts inserted by date (newest first)", () => {
  const p = (slug, date) => ({ slug, date });
  const r = run({ blog: [p("b", "01.05.2026"), p("new1", "10.05.2026"), p("new0", "01.01.2020")] }, `
    return cms.mergeCmsBlogPosts([p("a","19.05.2026"), p("b","05.05.2026"), p("c","13.04.2026")]).map(x => x.slug + "@" + x.date);
    function p(slug, date){ return { slug, date }; }`);
  assert.ok(r.ok, r.err);
  assert.deepEqual(r.value, ["a@19.05.2026", "new1@10.05.2026", "b@01.05.2026", "c@13.04.2026", "new0@01.01.2020"]);
});

test("Legal: only an approved CMS text is returned", () => {
  const r = run({ legal: { privacy: { vi: { title: "T", lead: "L", sections: [] } } } }, `return [cms.cmsLegal("privacy","vi")?.title, cms.cmsLegal("cookie","vi")];`);
  assert.ok(r.ok, r.err);
  assert.deepEqual(r.value, ["T", null]);
});
