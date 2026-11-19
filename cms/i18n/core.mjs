// R28 VI-FIRST — shared, dependency-free core of the automatic VI→EN translation layer.
// Used by the Studio (live status badge), the translator Worker (workers/cms-i18n), the dev runner
// (tools/cms-i18n.mjs) and the tests. Pure functions only: no network, no secrets.
//
// Model
//   - Vietnamese is the single source of truth. Every translatable text of a document is a UNIT
//     (title, one section heading, one paragraph list, one page text slot, ...). Its English counterpart
//     is stored in the existing EN field, so the website build keeps reading the same fields.
//   - doc.i18n keeps, per unit, the hash of the VI text that was translated (viHash) and of the EN text that was
//     written (enHash). A unit is re-translated only when its VI hash changed. If the EN text no longer matches the
//     recorded enHash, a person edited it: the unit becomes MANUAL and is never overwritten (until "Đồng bộ lại EN").
//   - doc.i18n.lock = true protects the whole document's EN (MANUAL_LOCK).
//   - Stored statuses: SYNCED, REVIEW_REQUIRED, FAILED, MANUAL_LOCK. Computed live from the document:
//     PENDING (VI changed in an unpublished draft), TRANSLATING (published moments ago, translator working),
//     OUTDATED (EN behind VI and no translation in progress).

export const STATUS = Object.freeze({
  SYNCED: "SYNCED", PENDING: "PENDING", TRANSLATING: "TRANSLATING", REVIEW_REQUIRED: "REVIEW_REQUIRED",
  FAILED: "FAILED", MANUAL_LOCK: "MANUAL_LOCK", OUTDATED: "OUTDATED",
});
export const STATUS_VI = Object.freeze({
  SYNCED: "Đã đồng bộ — bản EN khớp bản VI",
  PENDING: "Chờ xử lý — bản EN sẽ được dịch sau khi bấm Publish",
  TRANSLATING: "Đang dịch bản EN…",
  REVIEW_REQUIRED: "Cần kiểm tra — bản EN đã có nhưng nên được xem lại",
  FAILED: "Dịch thất bại — website giữ bản EN hợp lệ trước đó",
  MANUAL_LOCK: "Bản EN đã khóa — hệ thống không ghi đè",
  OUTDATED: "Bản EN chưa theo kịp bản VI",
});
// Legal texts are never machine-translated: a changed VI marks the EN for human review only.
export const REVIEW_ONLY_TYPES = new Set(["legalPage"]);
const FIXED_TYPES = new Set(["blogPost", "seoPage", "career", "imageSlot"]);
export const isTranslatable = (type) => FIXED_TYPES.has(type) || /^page_/.test(String(type || ""));
export const TRANSLATING_WINDOW_MS = 3 * 60 * 1000;
export const MAX_CHARS_PER_DOCUMENT = 40000; // cost guard per translation run

// ---- hashing (FNV-1a, two seeds = 64 bits, same result in browser, Worker and Node) ----
export function hash(value) {
  const s = typeof value === "string" ? value : JSON.stringify(value ?? null);
  let a = 0x811c9dc5, b = 0x01000193 ^ 0x5bd1e995;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    a = Math.imul(a ^ c, 0x01000193) >>> 0;
    b = Math.imul(b ^ c, 0x5bd1e995) >>> 0;
  }
  return a.toString(16).padStart(8, "0") + b.toString(16).padStart(8, "0");
}
const empty = (v) => v == null || (typeof v === "string" ? !v.trim() : Array.isArray(v) ? !v.some((x) => String(x ?? "").trim()) : false);

// ---- units per document type ----
const str = (key, vi, en, set, extra = {}) => ({ key, kind: "string", vi: vi ?? "", en: en ?? "", set, ...extra });
const arr = (key, vi, en, set, extra = {}) => ({ key, kind: "array", vi: Array.isArray(vi) ? vi : [], en: Array.isArray(en) ? en : [], set, ...extra });
const sel = (k) => `sections[_key=="${k}"]`;

export function units(doc) {
  const t = doc?._type, out = [];
  if (t === "blogPost") {
    out.push(str("title", doc.titleVi, doc.titleEn, "titleEn"));
    if (!empty(doc.seoTitleVi)) out.push(str("seoTitle", doc.seoTitleVi, doc.seoTitleEn, "seoTitleEn"));
    out.push(str("excerpt", doc.excerptVi, doc.excerptEn, "excerptEn"));
    out.push(arr("intro", doc.introVi, doc.introEn, "introEn"));
    for (const s of doc.sections || []) {
      if (!s?._key) continue;
      out.push(str("s:" + s._key + ":heading", s.headingVi, s.headingEn, sel(s._key) + ".headingEn"));
      out.push(arr("s:" + s._key + ":paragraphs", s.paragraphsVi, s.paragraphsEn, sel(s._key) + ".paragraphsEn"));
      if (!empty(s.bulletsVi) || !empty(s.bulletsEn)) out.push(arr("s:" + s._key + ":bullets", s.bulletsVi, s.bulletsEn, sel(s._key) + ".bulletsEn"));
    }
    if (!empty(doc.noteVi)) out.push(str("note", doc.noteVi, doc.noteEn, "noteEn"));
  } else if (t === "seoPage") {
    out.push(str("title", doc.vi?.title, doc.en?.title, "en.title"));
    out.push(str("description", doc.vi?.description, doc.en?.description, "en.description"));
  } else if (t === "career") {
    for (const f of ["title", "desc", "badge"]) if (!empty(doc[f + "Vi"])) out.push(str(f, doc[f + "Vi"], doc[f + "En"], f + "En"));
    for (const f of ["intro", "duties", "reqs"]) if (!empty(doc[f + "Vi"])) out.push(arr(f, doc[f + "Vi"], doc[f + "En"], f + "En"));
    // Hiring terms are official business information: translated, but always flagged for review.
    for (const f of ["benefits", "place", "apply"]) if (!empty(doc[f + "Vi"])) out.push(str(f, doc[f + "Vi"], doc[f + "En"], f + "En", { review: true }));
  } else if (t === "imageSlot") {
    if (!empty(doc.altVi)) out.push(str("alt", doc.altVi, doc.altEn, "altEn"));
  } else if (/^page_/.test(t || "")) {
    for (const [k, v] of Object.entries(doc || {})) {
      if (k.startsWith("_") || !v || typeof v !== "object" || Array.isArray(v) || !("vi" in v)) continue;
      if (empty(v.vi)) continue; // empty VI = the website keeps its original text (both languages)
      out.push(str("slot:" + k, v.vi, v.en, k + ".en"));
    }
  }
  return out.filter((u) => !empty(u.vi));
}

// ---- plan: what the translator must do for this document right now ----
export function plan(doc, { now = Date.now() } = {}) {
  const i = doc?.i18n || {};
  const stored = new Map((i.units || []).map((u) => [u.key, u]));
  const lock = i.lock === true;
  const resync = Boolean(i.resyncRequest && (!i.syncedAt || i.resyncRequest > i.syncedAt));
  const list = units(doc).map((u) => {
    const viHash = hash(u.vi), enHash = hash(u.en), s = stored.get(u.key);
    let action;
    if (lock) action = "locked";
    else if (resync) action = "translate";
    else if (!s) action = empty(u.en) ? "translate" : "baseline"; // existing EN without a record is kept as is
    else if (s.manual || s.enHash !== enHash) action = s.viHash !== viHash ? "manual-outdated" : "manual";
    else if (s.viHash !== viHash || empty(u.en)) action = "translate";
    else action = "keep";
    return { ...u, viHash, enHash, action };
  });
  const viHash = hash(list.map((u) => u.key + ":" + u.viHash).join("|"));
  const translate = list.filter((u) => u.action === "translate");
  let status;
  if (lock) status = STATUS.MANUAL_LOCK;
  else if (i.status === STATUS.FAILED && i.failedHash === viHash && !resync) status = STATUS.FAILED;
  else if (translate.length) status = STATUS.OUTDATED;
  else if (list.some((u) => u.action === "manual-outdated")) status = STATUS.REVIEW_REQUIRED;
  else if (i.status === STATUS.REVIEW_REQUIRED && i.viHash === viHash) status = STATUS.REVIEW_REQUIRED;
  else status = STATUS.SYNCED;
  return { status, units: list, translate, viHash, lock, resync, manual: list.filter((u) => u.action.startsWith("manual")).length };
}

// What the Studio shows (adds the computed PENDING / TRANSLATING states).
export function displayStatus(doc, { now = Date.now(), isDraft = false, autoActive = true } = {}) {
  const p = plan(doc, { now });
  if (p.status !== STATUS.OUTDATED) return { ...p, display: p.status };
  if (isDraft) return { ...p, display: STATUS.PENDING };
  const age = now - Date.parse(doc?._updatedAt || 0);
  if (autoActive && age >= 0 && age < TRANSLATING_WINDOW_MS) return { ...p, display: STATUS.TRANSLATING };
  return { ...p, display: STATUS.OUTDATED };
}

// ---- protected tokens: names, codes, links and numbers survive translation unchanged ----
const PROTECT = /BIO-A Group|Bio-A Group|BIO-A|Bio-A|OEM\/ODM|\bOEM\b|\bODM\b|R&D|CGMP-ASEAN|ISO \d+(?:[-:]\d+)*|https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+|\/[a-z0-9-]+(?:\/[a-z0-9-]+)*\//g;
export function protect(text) {
  const tokens = [];
  const out = String(text).replace(PROTECT, (m) => { tokens.push(m); return "⟦" + (tokens.length - 1) + "⟧"; });
  return { text: out, tokens };
}
export function restore(text, tokens) {
  let missing = 0;
  const out = String(text).replace(/⟦(\d+)⟧/g, (m, n) => tokens[+n] ?? m);
  for (let k = 0; k < tokens.length; k++) if (!out.includes(tokens[k])) missing++;
  return { text: out, missing };
}
const digits = (s) => (String(s).replace(/(\d)[.,](?=\d{3}\b)/g, "$1").match(/\d+/g) || []).sort().join(",");
const RISK = /chứng nhận|đạt chuẩn|cam kết|bảo hành|điều trị|chữa|pháp lý|hợp đồng|giấy phép|công bố/i;

// Validate one translated value against its VI source. Hard problems fail the run; soft ones ask for review.
export function validateUnit(u, en, glossary = []) {
  const hard = [], soft = [];
  const pairs = u.kind === "array" ? u.vi.map((v, k) => [v, en?.[k]]) : [[u.vi, en]];
  if (u.kind === "array" && (!Array.isArray(en) || en.length !== u.vi.length)) hard.push("số đoạn EN khác số đoạn VI");
  for (const [vi, e] of pairs) {
    if (typeof e !== "string" || !e.trim()) { hard.push("bản EN rỗng"); continue; }
    if (/[<>]/.test(e)) hard.push("bản EN chứa ký tự HTML (dấu nhọn)");
    if (/⟦\d+⟧/.test(e)) hard.push("thiếu tên riêng / đường dẫn cần giữ nguyên");
    const r = e.length / Math.max(1, vi.length);
    if (vi.length > 20 && (r < 0.35 || r > 3)) hard.push("độ dài EN bất thường so với VI");
    if (digits(vi) !== digits(e)) soft.push("số liệu trong EN khác VI");
    for (const g of glossary) if (g.strict && vi.toLowerCase().includes(g.vi.toLowerCase()) && !e.toLowerCase().includes(g.en.toLowerCase())) soft.push(`thuật ngữ "${g.vi}" chưa dịch thành "${g.en}"`);
    if (RISK.test(vi)) soft.push("nội dung có tuyên bố chuyên môn/pháp lý");
  }
  if (u.review) soft.push("thông tin chính thức cần Owner xác nhận");
  return { hard: [...new Set(hard)], soft: [...new Set(soft)] };
}

// Build the Sanity patch for a successful translation (EN fields + i18n bookkeeping).
export function buildPatch(doc, p, translated, { provider, at, review = [] }) {
  const set = {};
  const byKey = new Map(translated.map((x) => [x.key, x.en]));
  const units = p.units.map((u) => {
    if (byKey.has(u.key)) { set[u.set] = byKey.get(u.key); return { _key: hash(u.key), key: u.key, viHash: u.viHash, enHash: hash(byKey.get(u.key)) }; }
    if (u.action === "translate") return null;
    return { _key: hash(u.key), key: u.key, viHash: u.action === "manual-outdated" || u.action === "manual" ? (doc.i18n?.units || []).find((s) => s.key === u.key)?.viHash ?? u.viHash : u.viHash, enHash: u.enHash, ...(u.action.startsWith("manual") ? { manual: true } : {}) };
  }).filter(Boolean);
  const status = review.length || p.units.some((u) => u.action === "manual-outdated") ? STATUS.REVIEW_REQUIRED : STATUS.SYNCED;
  set.i18n = { ...(doc.i18n || {}), status, units, viHash: p.viHash, syncedAt: at, provider, sourceRev: doc._rev, lastError: null, failedHash: null, review: review.slice(0, 10), resyncRequest: null };
  return { set, status };
}

// Bookkeeping only (no translation): record baselines / manual flags / lock state without touching EN text.
export function bookkeeping(doc, p, at) {
  const prev = new Map((doc.i18n?.units || []).map((s) => [s.key, s]));
  const units = p.units.map((u) => {
    // A unit still waiting for translation keeps its old record (its EN belongs to the old VI), or none.
    if (u.action === "translate") return prev.get(u.key) || null;
    // Locked: keep the old record so that VI changes made while locked are translated once the lock is removed.
    if (u.action === "locked" && prev.has(u.key)) return prev.get(u.key);
    return { _key: hash(u.key), key: u.key,
      viHash: u.action.startsWith("manual") ? prev.get(u.key)?.viHash ?? u.viHash : u.viHash,
      enHash: u.enHash, ...(u.action.startsWith("manual") ? { manual: true } : {}) };
  }).filter(Boolean);
  // FAILED keeps the hash of the last synced VI (i18n.viHash = what the stored EN corresponds to).
  const next = { ...(doc.i18n || {}), status: p.status, units, viHash: p.status === STATUS.FAILED ? doc.i18n?.viHash ?? null : p.viHash, checkedAt: at };
  const same = JSON.stringify([doc.i18n?.status, doc.i18n?.units || [], doc.i18n?.viHash]) === JSON.stringify([next.status, units, next.viHash]);
  return same ? null : next;
}

// Where the EN version of a document can be previewed.
export function previewPath(doc, registryPages = {}) {
  if (doc?._type === "blogPost" && doc.slug?.current) return "/en/blog/" + doc.slug.current + "/";
  if (doc?._type === "career" && doc.slugEn?.current) return "/en/careers/" + doc.slugEn.current + "/";
  if (/^page_/.test(doc?._type || "")) return registryPages[doc._type.slice(5)]?.routes?.en || "/en/";
  return null;
}
