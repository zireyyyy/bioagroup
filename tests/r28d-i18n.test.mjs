// R28d VI-FIRST on Workers AI — provider cost gate, chunking, budget stop and review rules, offline (fake AI binding,
// fake budget, fake Sanity store with ifRevisionID semantics). No network.
import test from "node:test";
import assert from "node:assert/strict";
import { handleDocumentEvent } from "../cms/i18n/orchestrate.mjs";
import { hash, STATUS } from "../cms/i18n/core.mjs";
import { createProvider, chunkItems, CHUNK_CHARS, DEFAULT_I18N_MODEL } from "../cms/i18n/providers.mjs";
import { d1Budget, FLOW_MAX } from "../lib/chat/budget.js";

let networkCalls = 0;
globalThis.fetch = async () => { networkCalls++; throw new Error("network forbidden in tests"); };

const fakeAI = (shape = "response") => { const ai = { calls: [], async run(model, input) {
  ai.calls.push({ model, input });
  const arr = JSON.parse(input.messages[0].content.split("Input JSON array:\n")[1]);
  const text = JSON.stringify(arr.map((s) => "EN:" + s));
  return shape === "choices" ? { choices: [{ message: { content: text } }] } : { response: text };
} }; return ai; };
const budget = (ok = true) => { const b = { reserved: [], async reserve(n) { b.reserved.push(n); return ok; } }; return b; };
const ENV = (over = {}) => ({ AI: fakeAI(), I18N_COST_GATE: "verified", ...over });

test("fail closed: no binding / no cost gate / no budget / unknown model -> NOT_CONFIGURED", () => {
  for (const [env, opts] of [[{ I18N_COST_GATE: "verified" }, { budget: budget() }], [ENV({ I18N_COST_GATE: "" }), { budget: budget() }], [ENV(), {}], [ENV({ I18N_MODEL: "@cf/x/unknown" }), { budget: budget() }]])
    assert.throws(() => createProvider("workers-ai", { env, ...opts }), (e) => e.code === "NOT_CONFIGURED");
  assert.equal(createProvider("workers-ai", { env: ENV(), budget: budget() }).name, "workers-ai:" + DEFAULT_I18N_MODEL);
});

test("chunking keeps order, groups <= CHUNK_CHARS and one model call per group; both response shapes", async () => {
  const items = Array.from({ length: 30 }, (_, i) => "Đoạn " + i + " " + "x".repeat(400));
  const groups = chunkItems(items);
  assert.ok(groups.length > 1 && groups.every((g) => g.join("").length <= CHUNK_CHARS || g.length === 1));
  assert.deepEqual(groups.flat(), items);
  for (const shape of ["response", "choices"]) {
    const env = ENV({ AI: fakeAI(shape) }), b = budget();
    const out = await createProvider("workers-ai", { env, budget: b }).translate(items);
    assert.deepEqual(out, items.map((s) => "EN:" + s));
    assert.equal(env.AI.calls.length, groups.length); assert.equal(b.reserved.length, groups.length);
    assert.ok(env.AI.calls.every((c) => c.input.max_tokens <= 4096 && c.input.temperature === 0));
    assert.ok(b.reserved.every((n) => n > 0 && n < 400), JSON.stringify(b.reserved));
  }
});

test("budget refused -> QUOTA error before any model call", async () => {
  const env = ENV();
  await assert.rejects(createProvider("workers-ai", { env, budget: budget(false) }).translate(["Xin chào"]), (e) => e.code === "QUOTA");
  assert.equal(env.AI.calls.length, 0);
});

test("quota stop on Publish: document marked FAILED with a clear message, previous EN kept, no build loop", async () => {
  let rev = 1; const doc = { _id: "seo-x", _type: "seoPage", _rev: "r1", vi: { title: "Tiêu đề mới", description: "Mô tả" }, en: { title: "Old title", description: "Description" },
    i18n: { units: [{ key: "title", viHash: "0", enHash: hash("Old title") }, { key: "description", viHash: hash("Mô tả"), enHash: hash("Description") }] } };
  const store = { writes: [], async get() { return structuredClone(doc); }, async patch(id, ifRev, ops) { if (ifRev !== doc._rev) return { conflict: true }; store.writes.push(ops.set); Object.assign(doc, { _rev: "r" + ++rev, i18n: ops.set.i18n ?? doc.i18n }); return { conflict: false, rev: doc._rev }; } };
  const builds = [];
  const r = await handleDocumentEvent({ id: "seo-x", store, provider: createProvider("workers-ai", { env: ENV(), budget: budget(false) }), triggerBuild: async (x) => builds.push(x) });
  assert.equal(r.action, "failed"); assert.match(r.error, /giới hạn chi phí/);
  assert.equal(doc.en.title, "Old title", "EN kept"); assert.equal(doc.i18n.status, STATUS.FAILED); assert.equal(builds.length, 0);
  // stale revision (two publishes at once): the second write is refused, nothing overwritten
  const stale = await store.patch("seo-x", "r1", { set: { "en.title": "x" } }); assert.equal(stale.conflict, true);
});

test("career postings are always REVIEW_REQUIRED after machine translation; legal pages never translated", async () => {
  const job = { _id: "career-x", _type: "career", _rev: "r1", titleVI: "Nhân viên kho", titleEN: "", descVI: "Sắp xếp hàng hóa", descEN: "" };
  const store = { async get(id) { return id === "career-x" ? structuredClone(job) : { _id: "legal-1", _type: "legalPage", _rev: "r1", bodyVi: "Chính sách" }; },
    async patch(id, ifRev, ops) { if (id === "career-x") Object.assign(job, { _rev: "r2", i18n: ops.set.i18n }); return { conflict: false, rev: "r2" }; } };
  const env = ENV(), b = budget(), builds = [];
  const r = await handleDocumentEvent({ id: "career-x", store, provider: createProvider("workers-ai", { env, budget: b }), triggerBuild: async (x) => builds.push(x) });
  assert.equal(r.action, "translated"); assert.equal(job.i18n.status, STATUS.REVIEW_REQUIRED);
  assert.ok(job.i18n.review.some((m) => /tuyển dụng/.test(m)));
  const calls = env.AI.calls.length;
  const legal = await handleDocumentEvent({ id: "legal-1", store, provider: createProvider("workers-ai", { env, budget: b }), triggerBuild: async (x) => builds.push(x) });
  assert.equal(legal.action, "build"); assert.equal(env.AI.calls.length, calls, "legal page not sent to the model");
});

test("shared budget: i18n flow cap clamped to its share of the free allocation", () => {
  assert.equal(d1Budget({}, { flow: "i18n", cap: 50000 }).limit, FLOW_MAX.i18n);
  assert.ok(FLOW_MAX.i18n + FLOW_MAX.chat < 10000);
});

test("no network was used", () => assert.equal(networkCalls, 0));
