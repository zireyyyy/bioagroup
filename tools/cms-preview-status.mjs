// R28: is the CMS Preview showing the latest PUBLISHED Sanity content?
// Compares the newest published change of the document types the "BIO-A Preview rebuild" webhook watches with the
// content stamp of the deployed Preview (/_bioa-cms.json, written by build.mjs). Also lists unpublished drafts, which
// the Preview never shows (the webhook and the build read published content only).
//
//   node tools/cms-preview-status.mjs [previewUrl]        (default https://cms-preview.bioagroup.pages.dev)
//
// Exit 0 = up to date (or a rebuild is still within the normal window), 1 = stale, 2 = could not check.
// Auth: the owner's Sanity CLI login (read-only queries; token never printed). Prints no document content.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const PREVIEW = (process.argv[2] || "https://cms-preview.bioagroup.pages.dev").replace(/\/$/, "");
const PID = "hfmu7ifg", DS = "production", API = "v2025-02-19";
const WINDOW_MIN = 10; // a webhook-triggered Pages build normally finishes within a few minutes
const FILTER = '(_type in ["imageSlot","blogPost","career","seoPage","legalPage"] || _type match "page_*" || _id match "page-*")';
let token = "";
try { token = JSON.parse(fs.readFileSync(path.join(os.homedir(), ".config", "sanity", "config.json"), "utf8")).authToken; } catch {}
const H = token ? { authorization: "Bearer " + token } : {};
const q = async (groq, perspective) => {
  const r = await fetch(`https://${PID}.api.sanity.io/${API}/data/query/${DS}?query=${encodeURIComponent(groq)}&perspective=${perspective}`, { headers: H });
  if (!r.ok) throw new Error("Sanity query " + r.status);
  return (await r.json()).result;
};
try {
  const stampRes = await fetch(PREVIEW + "/_bioa-cms.json", { cache: "no-store" });
  const stamp = stampRes.ok ? await stampRes.json() : null;
  const latest = await q(`*[${FILTER} && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0...5]{_id,_type,_updatedAt}`, "published");
  const drafts = await q(`*[_id in path("drafts.**")]{_id,_updatedAt}`, "raw");
  const now = Date.now();
  console.log("Preview:", PREVIEW);
  if (!stamp) { console.log("STATUS: CANNOT CHECK — the Preview has no /_bioa-cms.json (deployment older than R28?)"); process.exit(2); }
  console.log(`Preview build: mode ${stamp.mode}, Sanity read at ${stamp.fetchedAt || "-"}, snapshot ${stamp.snapshotSha || "-"}, commit ${stamp.commit || "-"}`);
  // R28d-D manual VI/EN: items whose EN is missing or still the old text (held out, or not releasable to Production).
  const waiting = Array.isArray(stamp.waitingEn) ? stamp.waitingEn : [];
  console.log(waiting.length ? `EN not updated yet (${waiting.length}) — fix in the Studio before a Production release:` : "EN not updated yet: 0");
  for (const w of waiting) console.log("  " + w);
  const newer = latest.filter(d => !stamp.fetchedAt || d._updatedAt > stamp.fetchedAt);
  console.log("Latest published changes:");
  for (const d of latest) console.log(`  ${d._updatedAt}  ${d._id}${newer.includes(d) ? "   <- NOT in the Preview yet" : ""}`);
  console.log(drafts.length ? `Unpublished drafts (never shown on the Preview until Publish): ${drafts.length}` : "Unpublished drafts: 0");
  for (const d of drafts) console.log(`  ${d._updatedAt}  ${d._id}`);
  if (stamp.mode !== "live") { console.log("STATUS: STALE — this deployment was built without Sanity content"); process.exit(1); }
  if (!newer.length) { console.log("STATUS: UP TO DATE — the Preview contains every published change"); process.exit(0); }
  const ageMin = (now - Date.parse(newer[newer.length - 1]._updatedAt)) / 60000;
  if (ageMin <= WINDOW_MIN) { console.log(`STATUS: REBUILDING — last Publish ${ageMin.toFixed(1)} min ago; check again in a few minutes`); process.exit(0); }
  console.log(`STATUS: STALE — published ${ageMin.toFixed(0)} min ago but not in the Preview. Check the webhook "BIO-A Preview rebuild" (Sanity → API → Webhooks → attempts) and the latest cms-preview deployment in Cloudflare Pages.`);
  process.exit(1);
} catch (e) {
  console.log("STATUS: CANNOT CHECK — " + e.message);
  process.exit(2);
}
