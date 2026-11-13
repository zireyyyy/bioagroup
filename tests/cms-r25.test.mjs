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
  if (snapshot) fs.writeFileSync(path.join(dir, ".cms", "snapshot.json"), JSON.stringify({ version: 2, dataset: "test", fetchedAt: "x", sha: "test", images: {}, texts: {}, seo: {}, blog: [], careers: [], legal: {}, ...snapshot }));
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

const files = slot => Object.fromEntries(slot.targets.map((t, i) => [t.key, `/assets/cms/${slot.id}-${i}.webp`]));
const slotWith = (page, pred) => REG.pages[page].images.find(pred);

test("registry v2: one slot per position — shared files split, desktop/mobile pairs and <picture> sources explicit", () => {
  const home = REG.pages.home.images;
  const uses = name => home.filter(s => s.targets.some(t => t.url.endsWith("/" + name)));
  // image-1_mobile.webp is used by two DIFFERENT products (desktop "Tuýp & chai chân không", mobile "Gói Sachet").
  assert.equal(uses("image-1_mobile.webp").length, 2);
  assert.deepEqual(uses("image-1_mobile.webp").map(s => s.label).sort(), ["Gói Sachet", "Tuýp & chai chân không"]);
  // produce-1 = one position on desktop and mobile (+ the desktop <picture> mobile source); produce-2 differs on mobile.
  assert.equal(uses("produce-1.webp").length, 1);
  assert.equal(uses("produce-1.webp")[0].targets.length, 3);
  assert.equal(uses("produce-2.webp").length, 2);
  // Hero: <img> + <picture> mobile source in one slot.
  const hero = home.find(s => s.targets.some(t => t.url.endsWith("/title-1.webp")));
  assert.deepEqual(hero.targets.map(t => t.kind).sort(), ["img", "source"]);
  // No SVG or icon-size target is a slot; every target has a measured natural size.
  for (const p of Object.values(REG.pages)) for (const sl of p.images) for (const t of sl.targets){
    assert.doesNotMatch(t.url, /\.svg(\?|$)/i);
    assert.ok(t.natural && t.natural.w > 128, t.key);
  }
  // Every target key is unique across slots of a page.
  for (const p of Object.values(REG.pages)){ const k = p.images.flatMap(s => s.targets.map(t => t.key)); assert.equal(new Set(k).size, k.length); }
});

test("image slot: every target replaced (img, <picture> source, background) on its page only", () => {
  const hero = slotWith("home", s => s.targets.some(t => t.kind === "source" && t.url.endsWith("title_mobile.webp")));
  const tube = slotWith("home", s => s.label === "Tuýp & chai chân không");
  const bg = slotWith("about", s => s.targets.some(t => t.kind === "bg"));
  const snap = { images: { [hero.id]: { files: files(hero), altVi: "Hero vi", altEn: "Hero en" }, [tube.id]: { files: files(tube), altVi: "Tuýp", altEn: "Tube" }, [bg.id]: { files: files(bg), altVi: "x", altEn: "x" } } };
  const r = run(snap, `
    const home = page("/"); cms.applyCms(home, "/", "vi");
    const en = page("/en/"); cms.applyCms(en, "/en/", "en");
    const about = page("/about/"); cms.applyCms(about, "/about/", "vi");
    const cos = page("/contract-manufacturing-cosmetics/"); const cosBefore = cos.html(); cms.applyCms(cos, "/contract-manufacturing-cosmetics/", "vi");
    const src = home("main picture source").filter((_, e) => (home(e).attr("srcset") || "").startsWith("/assets/cms/${hero.id}")).length;
    const sachet = home(".block-products-mobile .swiper-slide").first().find("img").attr("src");
    return { heroImg: home("main img[src^='/assets/cms/${hero.id}']").attr("alt"), heroSource: src,
      tube: home("main img[src^='/assets/cms/${tube.id}']").length, sachetUnchanged: /image-1_mobile\\.webp$/.test(sachet),
      enAlt: en("main img[src^='/assets/cms/${hero.id}']").attr("alt"), about: about("[style*='/assets/cms/${bg.id}']").length, cosmeticsUnchanged: cosBefore === cos.html() };`);
  assert.ok(r.ok, r.err);
  assert.equal(r.value.heroImg, "Hero vi");
  assert.equal(r.value.heroSource, 1, "the <picture> mobile source gets its own cut");
  assert.equal(r.value.tube, 2, "desktop + mobile targets of the same product");
  assert.equal(r.value.sachetUnchanged, true, "a different position sharing the old file is untouched");
  assert.equal(r.value.enAlt, "Hero en");
  assert.equal(r.value.about, 1);
  assert.equal(r.value.cosmeticsUnchanged, true, "the same source file on another page is a different slot");
});

test("fail closed: a missing target or a missing per-target file stops the build", () => {
  const hero = slotWith("home", s => s.targets.length === 2 && s.targets.some(t => t.kind === "source"));
  const partial = { [hero.targets[0].key]: "/assets/cms/x.webp" };
  const r = run({ images: { [hero.id]: { files: partial, altVi: "a", altEn: "a" } } }, `const $ = page("/"); cms.applyCms($, "/", "vi"); return 1;`);
  assert.equal(r.ok, false);
  assert.match(r.err, /no file for target/);
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
  fs.writeFileSync(path.join(dir, ".cms", "snapshot.json"), JSON.stringify({ version: 2, images: {}, texts: { home: { [t.id]: { vi: "Mới" } } }, seo: {}, blog: [], careers: [], legal: {} }));
  const code = `import { load } from ${JSON.stringify(CHEERIO)}; import * as cms from ${JSON.stringify(CMS_MOD)}; import fs from "node:fs";
    const $ = load(fs.readFileSync(${JSON.stringify(path.join(ROOT, "dist", "index.html"))}, "utf8"), { decodeEntities: false }); cms.applyCms($, "/", "vi");`;
  const r = spawnSync(process.execPath, ["--input-type=module", "-e", code], { cwd: dir, encoding: "utf8" });
  fs.rmSync(dir, { recursive: true, force: true });
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /registry out of date/);
});

test("SEO: only changed values are written; og/twitter follow", () => {
  const r = run({ seo: { about: { vi: { title: "Tiêu đề SEO mới", description: "", canonical: "", ogImage: { file: "/assets/cms/og.webp", w: 1200, h: 630, type: "image/webp" } } } } }, `
    const $ = page("/about/"); const desc = $('meta[name="description"]').attr("content"); cms.applyCms($, "/about/", "vi");
    return { title: $("title").text(), og: $('meta[property="og:title"]').attr("content"), desc: $('meta[name="description"]').attr("content") === desc,
      img: $('meta[property="og:image"]').attr("content") };`);
  assert.ok(r.ok, r.err);
  assert.deepEqual(r.value, { title: "Tiêu đề SEO mới", og: "Tiêu đề SEO mới", desc: true, img: "https://bioagroup.vn/assets/cms/og.webp" });
});

test("SEO canonical: the page's own approved canonical passes; another page's canonical stops the build", () => {
  const ok = run({ seo: { about: { en: { title: "", description: "", canonical: "https://bioagroup.vn/en/about/", ogImage: null } } } },
    `const $ = page("/en/about/"); const before = $.html(); cms.applyCms($, "/en/about/", "en"); return { same: before === $.html(), c: $('link[rel="canonical"]').attr("href") };`);
  assert.ok(ok.ok, ok.err);
  assert.deepEqual(ok.value, { same: true, c: "https://bioagroup.vn/en/about/" });
  for (const wrong of ["https://bioagroup.vn/about/", "https://bioagroup.vn/contacts/", "https://example.com/en/about/"]){
    const bad = run({ seo: { about: { en: { title: "", description: "", canonical: wrong, ogImage: null } } } }, `const $ = page("/en/about/"); cms.applyCms($, "/en/about/", "en"); return 1;`);
    assert.equal(bad.ok, false, wrong);
    assert.match(bad.err, /not the approved canonical/);
  }
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

// ---- Release isolation (tools/fetch-cms.mjs decideMode + pinned archive) ----
test("release mode: production branch never reads live Sanity, even with SANITY_* set", async () => {
  const { decideMode } = await import(pathToFileURL(path.join(ROOT, "tools", "fetch-cms.mjs")).href);
  const live = { SANITY_PROJECT_ID: "hfmu7ifg", SANITY_READ_TOKEN: "x" };
  assert.equal(decideMode({ ...live, CF_PAGES_BRANCH: "main" }, true).mode, "release");
  assert.equal(decideMode({ ...live, CF_PAGES_BRANCH: "main" }, false).mode, "off");
  assert.equal(decideMode({ ...live, CF_PAGES_BRANCH: "main", BIOA_CMS_MODE: "live" }, true).mode, "error");
  assert.equal(decideMode({ ...live, CF_PAGES_BRANCH: "cms/sanity-r25" }, true).mode, "live");
  assert.equal(decideMode({ CF_PAGES_BRANCH: "cms/sanity-r25" }, true).mode, "release");
  assert.equal(decideMode({ ...live }, false).mode, "off", "CI/local without an explicit live request");
  assert.equal(decideMode({ ...live, BIOA_CMS_MODE: "live" }, false).mode, "live", "explicit local live check");
  assert.equal(decideMode({ ...live, CF_PAGES_BRANCH: "x", BIOA_CMS: "off" }, true).mode, "off");
});

test("release archive: extract only with the pinned sha256; tampering fails; rollback = re-pin", async () => {
  const lib = await import(pathToFileURL(path.join(ROOT, "tools", "cms-snapshot.mjs")).href);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bioa-rel-"));
  const mk = (name, title) => { const d = path.join(dir, name); fs.mkdirSync(path.join(d, "assets"), { recursive: true });
    fs.writeFileSync(path.join(d, "snapshot.json"), JSON.stringify({ version: 2, title })); fs.writeFileSync(path.join(d, "assets", "a.webp"), Buffer.from("RIFF0000WEBPtest")); return d; };
  const a = lib.packRelease(mk("A", "release A")), b = lib.packRelease(mk("B", "release B"));
  assert.deepEqual(lib.packRelease(path.join(dir, "A")), a, "deterministic archive");
  fs.writeFileSync(path.join(dir, "a.json.gz"), a); fs.writeFileSync(path.join(dir, "b.json.gz"), b);
  const out = p => { const o = fs.mkdtempSync(path.join(os.tmpdir(), "bioa-rel-out-")); return o; };
  assert.equal(lib.extractRelease(path.join(dir, "a.json.gz"), lib.sha256(a), out()).title, "release A");
  assert.equal(lib.extractRelease(path.join(dir, "b.json.gz"), lib.sha256(b), out()).title, "release B");
  assert.equal(lib.extractRelease(path.join(dir, "a.json.gz"), lib.sha256(a), out()).title, "release A", "rollback by re-pinning A");
  assert.throws(() => lib.extractRelease(path.join(dir, "b.json.gz"), lib.sha256(a), out()), /sha256 mismatch/);
  const t = Buffer.from(a); t[t.length - 5] ^= 1; fs.writeFileSync(path.join(dir, "t.json.gz"), t);
  assert.throws(() => lib.extractRelease(path.join(dir, "t.json.gz"), lib.sha256(a), out()), /sha256 mismatch/);
  fs.rmSync(dir, { recursive: true, force: true });
});

// ---- Legal approval stamp (cms/legal-hash.mjs, used by the Studio action and the fetch step) ----
test("legal approval: valid only while the published content still matches the approved hash", async () => {
  const { legalContentHash, legalApprovalValid } = await import(pathToFileURL(path.join(ROOT, "cms", "legal-hash.mjs")).href);
  const doc = { titleVi: "Chính sách", titleEn: "Policy", updatedVi: "Cập nhật", updatedEn: "Updated",
    sectionsVi: [{ _key: "a", _type: "legalSection", heading: "1", body: [{ _type: "block", _key: "b", style: "normal", markDefs: [], children: [{ _type: "span", _key: "c", text: "x", marks: [] }] }] }],
    sectionsEn: [{ _key: "a", _type: "legalSection", heading: "1", body: [] }] };
  assert.equal(await legalApprovalValid(doc), false, "no stamp");
  const stamped = { ...doc, approval: { approvedBy: "Owner", approvedAt: "2026-11-13T00:00:00Z", confirmed: true, contentHash: await legalContentHash(doc) } };
  assert.equal(await legalApprovalValid(stamped), true, "approved content");
  const edited = structuredClone(stamped); edited.sectionsVi[0].body[0].children[0].text = "y";
  assert.equal(await legalApprovalValid(edited), false, "edited after approval");
  const reordered = Object.fromEntries(Object.entries(stamped).reverse());
  assert.equal(await legalApprovalValid(reordered), true, "key order does not matter");
  assert.equal(await legalApprovalValid({ ...stamped, approval: { ...stamped.approval, confirmed: false } }), false, "unconfirmed");
});
