// R28 VI-FIRST — one handler for "a document was published" (Sanity webhook → translator → single rebuild).
//
// Ordering (no loop, one build per Publish):
//   1. Owner publishes VI.            → event A. VI changed: translate, then ONE patch (EN + i18n) pinned to the
//                                       revision that was read (ifRevisionID). No build yet.
//   2. Our own patch publishes.       → event B. Nothing left to translate → trigger the ONE Cloudflare build,
//                                       which therefore always contains the new EN.
//   3. Nothing to translate at all    → build immediately (image change, EN-only edit, lock, legal page, ...).
//   Failure: EN is untouched, i18n.status = FAILED with the VI hash that failed → event → no retry for that same
//   VI (no loop) → build: the website shows the new VI and the previous valid EN. Retry = "Đồng bộ lại EN" + Publish.
//   A newer Publish while translating: our patch is refused (revision mismatch) and dropped; the newer event
//   handles the newer VI. Duplicate deliveries of one event: the second patch is refused the same way.
import { STATUS, REVIEW_ONLY_TYPES, MAX_CHARS_PER_DOCUMENT, isTranslatable, plan, protect, restore, validateUnit, buildPatch, bookkeeping, hash } from "./core.mjs";
import { GLOSSARY } from "./glossary.mjs";

export async function translateUnits(list, provider) {
  const flat = [];
  for (const u of list) (u.kind === "array" ? u.vi : [u.vi]).forEach((text, k) => flat.push({ key: u.key, k, ...protect(text) }));
  const chars = flat.reduce((n, x) => n + x.text.length, 0);
  if (chars > MAX_CHARS_PER_DOCUMENT) throw Object.assign(new Error(`nội dung cần dịch quá dài (${chars} ký tự, giới hạn ${MAX_CHARS_PER_DOCUMENT})`), { code: "LIMIT" });
  const out = flat.length ? await provider.translate(flat.map((x) => x.text)) : [];
  const back = new Map();
  flat.forEach((x, n) => {
    const r = restore(out[n], x.tokens);
    if (r.missing) throw Object.assign(new Error("bản dịch làm mất tên riêng / đường dẫn cần giữ nguyên"), { code: "TOKENS" });
    if (!back.has(x.key)) back.set(x.key, []);
    back.get(x.key)[x.k] = r.text.trim();
  });
  return { chars, translated: list.map((u) => ({ key: u.key, en: u.kind === "array" ? back.get(u.key) || [] : back.get(u.key)?.[0] ?? "" })) };
}

export async function handleDocumentEvent({ id, store, provider, triggerBuild, now = () => new Date().toISOString(), log = () => {} }) {
  const baseId = String(id || "").replace(/^drafts\./, "");
  if (String(id).startsWith("drafts.")) return { action: "ignored", reason: "draft" }; // drafts never reach the website
  const doc = await store.get(baseId);
  const build = async (reason) => { await triggerBuild(reason); log("build", baseId, reason); return { action: "build", reason }; };
  if (!doc) return build("deleted");
  if (REVIEW_ONLY_TYPES.has(doc._type) || !isTranslatable(doc._type)) return build("not translated: " + doc._type);
  const p = plan(doc);
  if (!p.translate.length || p.status === STATUS.MANUAL_LOCK || p.status === STATUS.FAILED) {
    const next = bookkeeping(doc, p, now());
    if (next) { // record baselines / manual edits / lock first; that patch's own event will build (once)
      const r = await store.patch(baseId, doc._rev, { set: { i18n: next } });
      if (r.conflict) return { action: "stale" };
      return { action: "bookkeeping", status: next.status };
    }
    return build(p.status === STATUS.FAILED ? "translation failed earlier; previous EN kept" : "nothing to translate");
  }
  let result;
  try {
    result = await translateUnits(p.translate, provider);
  } catch (e) {
    const i18n = { ...(doc.i18n || {}), status: STATUS.FAILED, lastError: String(e.message || e).slice(0, 300), failedHash: p.viHash, failedAt: now(), resyncRequest: null };
    const r = await store.patch(baseId, doc._rev, { set: { i18n } });
    log("failed", baseId, i18n.lastError);
    return r.conflict ? { action: "stale" } : { action: "failed", error: i18n.lastError };
  }
  const hard = [], review = [];
  for (const t of result.translated) {
    const u = p.translate.find((x) => x.key === t.key);
    const v = validateUnit(u, t.en, GLOSSARY);
    hard.push(...v.hard.map((m) => t.key + ": " + m));
    review.push(...v.soft.map((m) => t.key + ": " + m));
  }
  // R28d: a machine-translated job posting is never published as final; the owner reviews the EN first.
  if (doc._type === "career") review.push("tin tuyển dụng: Owner cần xem lại bản EN");
  if (hard.length) {
    const i18n = { ...(doc.i18n || {}), status: STATUS.FAILED, lastError: "Bản dịch không đạt kiểm tra cấu trúc: " + hard.slice(0, 3).join("; "), failedHash: p.viHash, failedAt: now(), resyncRequest: null };
    const r = await store.patch(baseId, doc._rev, { set: { i18n } });
    return r.conflict ? { action: "stale" } : { action: "failed", error: i18n.lastError };
  }
  const { set, status } = buildPatch(doc, p, result.translated, { provider: provider.name, at: now(), review });
  set.i18n.usage = { chars: (doc.i18n?.usage?.chars || 0) + result.chars, runs: (doc.i18n?.usage?.runs || 0) + 1 };
  const r = await store.patch(baseId, doc._rev, { set });
  if (r.conflict) { log("stale", baseId); return { action: "stale" }; }
  log("translated", baseId, p.translate.length, "units", result.chars, "chars", status);
  return { action: "translated", units: p.translate.length, chars: result.chars, status, rev: r.rev };
}

// Sanity HTTP store (Worker and Node). The token needs write access to the dataset; it is never logged.
export function sanityStore({ projectId, dataset, token, apiVersion = "v2025-02-19", fetchImpl = globalThis.fetch }) {
  const base = `https://${projectId}.api.sanity.io/${apiVersion}/data`;
  const H = { authorization: "Bearer " + token, "content-type": "application/json" };
  return {
    async get(id) {
      const r = await fetchImpl(`${base}/doc/${dataset}/${encodeURIComponent(id)}`, { headers: H });
      if (!r.ok) throw new Error("Sanity read " + r.status);
      return (await r.json()).documents?.[0] || null;
    },
    async patch(id, ifRevisionID, ops) {
      const r = await fetchImpl(`${base}/mutate/${dataset}?returnIds=true&visibility=sync`, { method: "POST", headers: H, body: JSON.stringify({ mutations: [{ patch: { id, ifRevisionID, ...ops } }] }) });
      if (r.status === 409) return { conflict: true };
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error("Sanity write " + r.status + " " + JSON.stringify(j.error || {}).slice(0, 160));
      return { conflict: false, rev: j.transactionId };
    },
  };
}

// Sanity webhook signature (header "sanity-webhook-signature: t=<ms>,v1=<base64url HMAC-SHA256(t.body)>").
export async function verifySanitySignature(header, body, secret, { toleranceMs = 5 * 60 * 1000, now = Date.now() } = {}) {
  const m = /t=(\d+),\s*v1=([\w-]+)/.exec(header || "");
  if (!m || !secret) return false;
  if (Math.abs(now - Number(m[1])) > toleranceMs) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(m[1] + "." + body)));
  const b64 = btoa(String.fromCharCode(...sig)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return b64 === m[2];
}
export { hash };
