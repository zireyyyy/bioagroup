// R28 VI-FIRST — automatic VI→EN layer, offline. A fake Sanity store with real revision semantics (ifRevisionID)
// and a fake build trigger reproduce the owner's acceptance scenarios (R28 update §9, CMS 1–9) without network.
import test from "node:test";
import assert from "node:assert/strict";
import { handleDocumentEvent, translateUnits, verifySanitySignature } from "../cms/i18n/orchestrate.mjs";
import { plan, displayStatus, units, hash, protect, restore, STATUS } from "../cms/i18n/core.mjs";
import { createProvider, TranslationError } from "../cms/i18n/providers.mjs";

function fakeStore(docs) {
  const db = new Map(docs.map((d) => [d._id, structuredClone({ ...d, _rev: d._rev || "r0" })]));
  let n = 0;
  const setPath = (obj, path, value) => {
    const parts = path.match(/[^.[\]]+|\[_key=="[^"]+"\]/g);
    let o = obj;
    parts.forEach((p, i) => {
      const last = i === parts.length - 1;
      const m = /^\[_key=="([^"]+)"\]$/.exec(p);
      if (m) { const arr = o; const it = arr.find((x) => x._key === m[1]); if (!it) throw new Error("no key " + m[1]); o = it; return; }
      if (last) o[p] = value; else { o[p] ??= /^\[/.test(parts[i + 1]) ? [] : {}; o = o[p]; }
    });
  };
  const store = {
    events: [],
    writes: 0,
    async get(id) { return db.has(id) ? structuredClone(db.get(id)) : null; },
    async patch(id, ifRev, ops) {
      const d = db.get(id);
      if (!d || d._rev !== ifRev) return { conflict: true };
      for (const [k, v] of Object.entries(ops.set || {})) setPath(d, k, structuredClone(v));
      d._rev = "r" + ++n; d._updatedAt = new Date(Date.now()).toISOString(); store.writes++;
      store.events.push(id);
      return { conflict: false, rev: d._rev };
    },
    // the owner editing in Studio and publishing
    publish(id, mutate) { const d = db.get(id); mutate(d); d._rev = "r" + ++n; d._updatedAt = new Date().toISOString(); store.events.push(id); },
    peek(id) { return db.get(id); },
  };
  return store;
}
// Drain the webhook queue like Sanity would (each published change = one delivery).
async function drain(store, provider, builds, max = 10) {
  const results = [];
  while (store.events.length && max--) {
    const id = store.events.shift();
    results.push(await handleDocumentEvent({ id, store, provider, triggerBuild: async (r) => builds.push(r) }));
  }
  return results;
}
const blog = () => ({
  _id: "blog-x", _type: "blogPost", titleVi: "Gia công kem chống nắng", titleEn: "Sunscreen manufacturing",
  excerptVi: "Mô tả", excerptEn: "Description", introVi: ["Đoạn mở 1", "Đoạn mở 2"], introEn: ["Intro 1", "Intro 2"],
  sections: [{ _key: "a1", headingVi: "Mục một", headingEn: "Part one", paragraphsVi: ["Văn bản A"], paragraphsEn: ["Text A"], bulletsVi: ["Ý 1"], bulletsEn: ["Point 1"] }],
  noteVi: "Ghi chú", noteEn: "Note",
});
const seo = () => ({ _id: "seo-home", _type: "seoPage", vi: { title: "Trang chủ BIO-A Group", description: "Mô tả SEO" }, en: { title: "BIO-A Group home", description: "SEO description" } });
const T = () => createProvider("test", { allowTest: true });

test("baseline: existing EN is recorded, never re-translated, one build", async () => {
  const s = fakeStore([blog()]), b = [], p = T();
  s.events.push("blog-x");
  const r = await drain(s, p, b);
  assert.deepEqual(r.map((x) => x.action), ["bookkeeping", "build"]);
  assert.equal(p.calls, 0); assert.equal(b.length, 1);
  assert.equal(s.peek("blog-x").titleEn, "Sunscreen manufacturing");
  assert.equal(s.peek("blog-x").i18n.status, STATUS.SYNCED);
});

test("CMS 1+3: edit VI title and a Blog section → EN updated, structure kept, build after EN saved (once)", async () => {
  const s = fakeStore([blog()]), b = [], p = T();
  s.events.push("blog-x"); await drain(s, p, b); b.length = 0;
  s.publish("blog-x", (d) => { d.titleVi = "Gia công kem chống nắng trọn gói"; d.sections[0].paragraphsVi = ["Văn bản A mới", "Văn bản B"]; });
  const r = await drain(s, p, b);
  assert.deepEqual(r.map((x) => x.action), ["translated", "build"]);
  const d = s.peek("blog-x");
  assert.match(d.titleEn, /^\[EN-TEST\] Gia công sunscreen trọn gói$/i);
  assert.equal(d.sections[0].paragraphsEn.length, 2);
  assert.equal(d.sections[0].headingEn, "Part one"); // unchanged unit untouched
  assert.equal(d.introEn[0], "Intro 1");
  assert.equal(b.length, 1, "exactly one build, after the EN was stored");
  assert.equal(p.calls, 1);
  assert.equal(d.i18n.status, STATUS.SYNCED);
});

test("CMS 2: edit VI SEO description → EN description updated only", async () => {
  const s = fakeStore([seo()]), b = [], p = T();
  s.events.push("seo-home"); await drain(s, p, b); b.length = 0;
  s.publish("seo-home", (d) => { d.vi.description = "Mô tả SEO mới cho BIO-A Group"; });
  await drain(s, p, b);
  const d = s.peek("seo-home");
  assert.equal(d.en.description, "[EN-TEST] Mô tả SEO mới cho BIO-A Group");
  assert.equal(d.en.title, "BIO-A Group home");
  assert.equal(b.length, 1);
});

test("CMS 4: publish without VI change → no translation, one build", async () => {
  const s = fakeStore([blog()]), b = [], p = T();
  s.events.push("blog-x"); await drain(s, p, b); b.length = 0;
  s.publish("blog-x", (d) => { d.readMin = 9; });
  const r = await drain(s, p, b);
  assert.deepEqual(r.map((x) => x.action), ["build"]);
  assert.equal(p.calls, 0);
});

test("CMS 5: locked EN and manually edited EN are never overwritten", async () => {
  const s = fakeStore([blog()]), b = [], p = T();
  s.events.push("blog-x"); await drain(s, p, b);
  // manual EN edit, then a VI change of the same unit
  s.publish("blog-x", (d) => { d.excerptEn = "Owner wording"; });
  await drain(s, p, b);
  s.publish("blog-x", (d) => { d.excerptVi = "Mô tả mới"; });
  await drain(s, p, b);
  assert.equal(s.peek("blog-x").excerptEn, "Owner wording");
  assert.equal(s.peek("blog-x").i18n.status, STATUS.REVIEW_REQUIRED);
  // lock the whole document
  s.publish("blog-x", (d) => { d.i18n.lock = true; d.titleVi = "Tiêu đề khác"; });
  await drain(s, p, b);
  assert.equal(s.peek("blog-x").titleEn, "Sunscreen manufacturing");
  assert.equal(s.peek("blog-x").i18n.status, STATUS.MANUAL_LOCK);
  assert.equal(p.calls, 0);
  // unlock: the VI change made while locked is translated now
  s.publish("blog-x", (d) => { d.i18n.lock = false; });
  await drain(s, p, b);
  assert.equal(s.peek("blog-x").titleEn, "[EN-TEST] Tiêu đề khác");
  assert.equal(s.peek("blog-x").excerptEn, "Owner wording", "manual unit still protected");
});

test("CMS 6: two Publish in a row — the older translation cannot overwrite the newer VI", async () => {
  const s = fakeStore([blog()]), b = [], p = T();
  s.events.push("blog-x"); await drain(s, p, b); b.length = 0;
  s.publish("blog-x", (d) => { d.titleVi = "Phiên bản 1"; });
  // the translator reads version 1, then the owner publishes version 2 before the EN patch lands
  const slow = { name: "slow", async translate(items) { s.publish("blog-x", (d) => { d.titleVi = "Phiên bản 2"; }); return items.map((x) => "EN " + x); } };
  const first = await handleDocumentEvent({ id: s.events.shift(), store: s, provider: slow, triggerBuild: async (r) => b.push(r) });
  assert.equal(first.action, "stale");
  await drain(s, p, b);
  assert.equal(s.peek("blog-x").titleEn, "[EN-TEST] Phiên bản 2");
  assert.equal(b.length, 1);
});

test("CMS 7+8: failure keeps previous EN, no retry loop; retry via resync request succeeds", async () => {
  const s = fakeStore([blog()]), b = [];
  const p = createProvider("test", { allowTest: true, failNext: 1 });
  s.events.push("blog-x"); await drain(s, p, b); b.length = 0;
  s.publish("blog-x", (d) => { d.noteVi = "Ghi chú mới"; });
  const r = await drain(s, p, b);
  assert.deepEqual(r.map((x) => x.action), ["failed", "build"], "one failure, then the build with the previous EN, no loop");
  assert.equal(s.peek("blog-x").noteEn, "Note");
  assert.equal(s.peek("blog-x").i18n.status, STATUS.FAILED);
  assert.match(s.peek("blog-x").i18n.lastError, /lỗi giả lập/);
  // the same VI is not retried automatically on the next unrelated publish
  s.publish("blog-x", (d) => { d.readMin = 3; });
  await drain(s, p, b);
  assert.equal(s.peek("blog-x").i18n.status, STATUS.FAILED);
  // Studio "Đồng bộ lại EN" = resync request + Publish
  s.publish("blog-x", (d) => { d.i18n.resyncRequest = new Date(Date.now() + 1000).toISOString(); });
  await drain(s, p, b);
  assert.equal(s.peek("blog-x").noteEn, "[EN-TEST] Ghi chú mới");
  assert.equal(s.peek("blog-x").i18n.status, STATUS.SYNCED);
});

test("provider not configured (the R28 state): FAILED with a clear message, EN kept, site still rebuilt", async () => {
  const s = fakeStore([blog()]), b = [];
  const none = createProvider("none");
  s.events.push("blog-x"); await drain(s, none, b); b.length = 0;
  s.publish("blog-x", (d) => { d.titleVi = "Tiêu đề mới"; });
  await drain(s, none, b);
  assert.equal(s.peek("blog-x").titleEn, "Sunscreen manufacturing");
  assert.match(s.peek("blog-x").i18n.lastError, /Chưa kích hoạt dịch vụ dịch/);
  assert.equal(b.length, 1);
});

test("CMS 9: state lives in the document (reload = same status); Studio computed states", async () => {
  const s = fakeStore([blog()]), b = [], p = T();
  s.events.push("blog-x"); await drain(s, p, b);
  const d = structuredClone(s.peek("blog-x"));
  assert.equal(displayStatus(d).display, STATUS.SYNCED);
  d.titleVi = "Đang sửa";
  assert.equal(displayStatus(d, { isDraft: true }).display, STATUS.PENDING);
  d._updatedAt = new Date().toISOString();
  assert.equal(displayStatus(d).display, STATUS.TRANSLATING);
  assert.equal(displayStatus(d, { autoActive: false }).display, STATUS.OUTDATED);
  d._updatedAt = new Date(Date.now() - 3600e3).toISOString();
  assert.equal(displayStatus(d).display, STATUS.OUTDATED);
});

test("drafts and legal pages never trigger translation; non-translatable types just build", async () => {
  const s = fakeStore([{ _id: "legal-privacy", _type: "legalPage", titleVi: "x" }, { _id: "slot-1", _type: "imageSlot" }]), b = [], p = T();
  assert.equal((await handleDocumentEvent({ id: "drafts.blog-x", store: s, provider: p, triggerBuild: async (r) => b.push(r) })).action, "ignored");
  s.events.push("legal-privacy", "slot-1");
  await drain(s, p, b);
  assert.equal(p.calls, 0); assert.equal(b.length, 2);
});

test("page text slots: only changed slot, empty VI slot ignored; names and links survive", async () => {
  const page = { _id: "page-home", _type: "page_home", pageLabel: "Trang chủ",
    t_a: { vi: "Nhà Máy Sản Xuất Dược Mỹ Phẩm Bio-A Group", en: "Bio-A Group Cosmetic & Cosmeceutical Manufacturing Plant" },
    t_b: { vi: "", en: "" }, t_c: { vi: "Liên hệ", en: "Contact" } };
  const s = fakeStore([page]), b = [], p = T();
  s.events.push("page-home"); await drain(s, p, b);
  s.publish("page-home", (d) => { d.t_a.vi = "Nhà Máy Sản Xuất Dược Mỹ Phẩm Bio-A Group 123"; });
  await drain(s, p, b);
  const d = s.peek("page-home");
  assert.equal(d.t_a.en, "[EN-TEST] factory Sản Xuất cosmeceutical Bio-A Group 123");
  assert.equal(d.t_c.en, "Contact");
  assert.equal(units(d).length, 2);
});

test("protect/restore keeps names, codes, links; missing placeholder is a hard failure", async () => {
  const x = protect("BIO-A Group đạt ISO 22716, xem /dich-vu-khac/ hoặc https://bioagroup.vn/contacts/");
  assert.equal(x.tokens.length, 4);
  assert.equal(restore(x.text, x.tokens).missing, 0);
  const bad = { name: "bad", async translate(items) { return items.map(() => "lost everything"); } };
  await assert.rejects(translateUnits([{ key: "k", kind: "string", vi: "BIO-A Group" }], bad), /tên riêng/);
});

test("structure validation: wrong paragraph count fails the run and keeps EN", async () => {
  const s = fakeStore([blog()]), b = [];
  const p = T(); s.events.push("blog-x"); await drain(s, p, b);
  const broken = { name: "broken", async translate(items) { return items.map((x) => (x.includes("mở 2") ? "" : "EN")); } };
  s.publish("blog-x", (d) => { d.introVi = ["Đoạn mở 1 mới", "Đoạn mở 2 mới"]; });
  const r = await drain(s, broken, b);
  assert.equal(r[0].action, "failed");
  assert.deepEqual(s.peek("blog-x").introEn, ["Intro 1", "Intro 2"]);
});

test("test provider is refused outside tests; unknown provider refused", () => {
  assert.throws(() => createProvider("test"), TranslationError);
  assert.throws(() => createProvider("magic"), TranslationError);
  assert.throws(() => createProvider("anthropic", { env: {} }), /ANTHROPIC_API_KEY/);
});

test("webhook signature check", async () => {
  const secret = "s3cret", body = '{"_id":"blog-x"}', t = Date.now();
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = Buffer.from(new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(t + "." + body)))).toString("base64url");
  assert.equal(await verifySanitySignature(`t=${t},v1=${sig}`, body, secret), true);
  assert.equal(await verifySanitySignature(`t=${t},v1=${sig}`, body + " ", secret), false);
  assert.equal(await verifySanitySignature(`t=${t - 3600e3},v1=${sig}`, body, secret), false);
});

test("hash is stable and order-sensitive", () => {
  assert.equal(hash("a"), hash("a")); assert.notEqual(hash(["a", "b"]), hash(["b", "a"])); assert.equal(hash("x").length, 16);
  assert.equal(plan({ _type: "blogPost", titleVi: "" }).units.length, 2 /* intro + excerpt always present */ - 2);
});

test("snapshot: an article without complete EN is held out (no empty EN page), VI problems still fail", async () => {
  const fs = await import("node:fs"), os = await import("node:os"), path = await import("node:path");
  const { liveSnapshot } = await import("../tools/cms-snapshot.mjs");
  const post = (slug, en = true) => ({ _id: "blog-" + slug, slug: { current: slug }, date: "2026-11-19", readMin: 4, legacyImage: "/assets/blog/x.webp",
    titleVi: "Tiêu đề", excerptVi: "Mô tả", introVi: ["Mở"], noteVi: "",
    sections: [{ _key: "a", headingVi: "Mục", paragraphsVi: ["Đoạn 1", "Đoạn 2"], ...(en ? { headingEn: "Part", paragraphsEn: ["P1", "P2"] } : { paragraphsEn: ["P1"] }) }],
    ...(en ? { titleEn: "Title", excerptEn: "Description", introEn: ["Intro"] } : {}) });
  const data = { images: [], pages: [], blog: [post("da-dich"), post("cho-dich", false)], careers: [], seo: [], legal: [] };
  const real = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ result: data }), { status: 200 });
  try {
    const out = fs.mkdtempSync(path.join(os.tmpdir(), "bioa-i18n-snap-"));
    const s = await liveSnapshot({ pid: "hfmu7ifg", token: "t", outDir: out, registry: { pages: {} } });
    assert.deepEqual(s.blog.map((b) => b.slug), ["da-dich"]);
    assert.deepEqual(s.waitingEn, ["blog:cho-dich"]);
    data.blog = [{ ...post("loi-vi"), titleVi: "" }];
    await assert.rejects(liveSnapshot({ pid: "hfmu7ifg", token: "t", outDir: out, registry: { pages: {} } }), /titleVi missing/);
    fs.rmSync(out, { recursive: true, force: true });
  } finally { globalThis.fetch = real; }
});

test("Worker glue: unsigned request refused; signed publish → translated EN stored, then one build call", async () => {
  const worker = (await import("../workers/cms-i18n/src/index.mjs")).default;
  const secret = "whsec", calls = [];
  const doc = { _id: "seo-x", _type: "seoPage", _rev: "r1", vi: { title: "Tiêu đề mới", description: "Mô tả" }, en: { title: "Old", description: "Description" },
    i18n: { units: [{ key: "title", viHash: "0", enHash: hashOf("Old") }, { key: "description", viHash: hashOf("Mô tả"), enHash: hashOf("Description") }] } };
  function hashOf(s) { return hash(s); }
  const real = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    calls.push(String(url).replace(/\?.*/, ""));
    if (String(url).includes("/data/doc/")) return new Response(JSON.stringify({ documents: [doc] }));
    if (String(url).includes("/data/mutate/")) { const m = JSON.parse(init.body).mutations[0].patch; Object.assign(doc, { _rev: "r2" }); if ("en.title" in m.set) doc.en.title = m.set["en.title"]; doc.i18n = m.set.i18n || doc.i18n; return new Response(JSON.stringify({ transactionId: "r2" })); }
    if (String(url).includes("deploy-hook")) return new Response("", { status: 200 });
    return new Response("?", { status: 404 });
  };
  try {
    const env = { SANITY_WEBHOOK_SECRET: secret, SANITY_WRITE_TOKEN: "t", PREVIEW_DEPLOY_HOOK_URL: "https://example.invalid/deploy-hook", I18N_PROVIDER: "none" };
    const pend = [], ctx = { waitUntil: (p) => pend.push(p) };
    assert.equal((await worker.fetch(new Request("https://w/", { method: "POST", body: "{}" }), env, ctx)).status, 401);
    const body = JSON.stringify({ _id: "seo-x" }), t = Date.now();
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const sig = Buffer.from(new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(t + "." + body)))).toString("base64url");
    const res = await worker.fetch(new Request("https://w/", { method: "POST", body, headers: { "sanity-webhook-signature": `t=${t},v1=${sig}` } }), env, ctx);
    assert.equal(res.status, 202);
    await Promise.all(pend);
    // provider "none" (R28 state): the run fails cleanly, EN untouched, no build from this event (the FAILED patch's own event builds)
    assert.equal(doc.en.title, "Old");
    assert.equal(doc.i18n.status, "FAILED");
    assert.match(doc.i18n.lastError, /Chưa kích hoạt/);
    assert.ok(calls.some((u) => u.includes("/data/mutate/")), "status written to Sanity");
    assert.ok(!calls.some((u) => u.includes("deploy-hook")), "no build before the status/EN write");
  } finally { globalThis.fetch = real; }
});

test("career units use the Studio field names (titleVI/titleEN) and flag official hiring terms for review", async () => {
  const job = { _id: "career-x", _type: "career", titleVI: "Nhân viên kinh doanh", titleEN: "Sales executive", descVI: "Mô tả", descEN: "Description",
    introVI: ["Giới thiệu"], introEN: ["Intro"], dutiesVI: ["Việc 1"], dutiesEN: ["Duty 1"], reqsVI: ["Yêu cầu"], reqsEN: ["Req"], benefitsVI: "Lương theo năng lực" };
  assert.deepEqual(units(job).map((u) => u.set), ["titleEN", "descEN", "introEN", "dutiesEN", "reqsEN", "benefitsEN"]);
  const s = fakeStore([job]), b = [], p = T();
  s.events.push("career-x"); await drain(s, p, b);
  assert.equal(s.peek("career-x").benefitsEN, "[EN-TEST] Lương theo năng lực");
  assert.equal(s.peek("career-x").i18n.status, STATUS.REVIEW_REQUIRED);
  assert.equal(s.peek("career-x").titleEN, "Sales executive");
});
