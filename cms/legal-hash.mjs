// CMS-R25b: content hash of a legal page (Privacy / Cookie). The Studio "Duyệt & xuất bản" action stores it in
// approval.contentHash; the build accepts a CMS legal text only when the published content still has that hash, so any
// change after approval (Studio edit, API patch, restore of another version) needs a new approval.
// Shared by studio/actions/legalApprove.tsx (browser) and tools/cms-snapshot.mjs (Node >= 20): Web Crypto only.
export const LEGAL_FIELDS = ["titleVi", "titleEn", "updatedVi", "updatedEn", "sectionsVi", "sectionsEn"];

export function canonicalJson(v){
  if (Array.isArray(v)) return "[" + v.map(canonicalJson).join(",") + "]";
  if (v && typeof v === "object")
    return "{" + Object.keys(v).filter(k => v[k] !== undefined).sort().map(k => JSON.stringify(k) + ":" + canonicalJson(v[k])).join(",") + "}";
  return JSON.stringify(v === undefined ? null : v);
}

export async function legalContentHash(doc){
  const picked = Object.fromEntries(LEGAL_FIELDS.map(k => [k, doc?.[k] ?? null]));
  const bytes = new TextEncoder().encode(canonicalJson(picked));
  const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function legalApprovalValid(doc){
  const a = doc?.approval;
  if (!a || a.confirmed !== true || !a.approvedBy || !a.approvedAt || !/^[0-9a-f]{64}$/.test(a.contentHash || "")) return false;
  return (await legalContentHash(doc)) === a.contentHash;
}
