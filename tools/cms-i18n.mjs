// R28 VI-FIRST — developer runner for the VI→EN layer (the owner never needs it: in operation the translator Worker
// does this on every Publish). Auth: the developer's Sanity CLI login, token read from the CLI config, never printed.
//
//   node tools/cms-i18n.mjs status                      read-only: EN status of every translatable document
//   node tools/cms-i18n.mjs backfill [--apply]          record the current VI/EN pairs as the baseline (i18n field only,
//                                                       EN text untouched). Page text slots whose VI differs from the
//                                                       approved repository text while EN is still the repository EN
//                                                       are recorded as OUTDATED (EN behind VI), never as synced.
//   node tools/cms-i18n.mjs run <docId> --provider <p> [--apply] [--allow-test]
//                                                       one translator run for one published document (dev / E2E)
// Writes are pinned to the revision read (ifRevisionID). Back up the dataset first (see docs/r28/DEPLOY_ROLLBACK.md).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { plan, displayStatus, isTranslatable, bookkeeping, hash, STATUS } from "../cms/i18n/core.mjs";
import { handleDocumentEvent, sanityStore } from "../cms/i18n/orchestrate.mjs";
import { createProvider } from "../cms/i18n/providers.mjs";

const PID = "hfmu7ifg", DS = "production", API = "v2025-02-19";
const token = JSON.parse(fs.readFileSync(path.join(os.homedir(), ".config", "sanity", "config.json"), "utf8")).authToken;
const H = { authorization: "Bearer " + token, "content-type": "application/json" };
const [cmd, ...rest] = process.argv.slice(2);
const flag = (n) => rest.includes(n), opt = (n) => { const i = rest.indexOf(n); return i >= 0 ? rest[i + 1] : null; };
const query = async (q) => { const r = await fetch(`https://${PID}.api.sanity.io/${API}/data/query/${DS}?query=${encodeURIComponent(q)}&perspective=published`, { headers: H }); if (!r.ok) throw new Error("query " + r.status); return (await r.json()).result; };
const registry = JSON.parse(fs.readFileSync("cms/registry.json", "utf8"));
const allDocs = async () => (await query('*[!(_id in path("drafts.**")) && !(_id in path("_.**"))]')).filter((d) => isTranslatable(d._type));

if (cmd === "status") {
  const docs = await allDocs(), count = {};
  for (const d of docs) {
    const s = displayStatus(d, { autoActive: false });
    count[s.display] = (count[s.display] || 0) + 1;
    if (s.display !== STATUS.SYNCED) console.log(`${s.display.padEnd(15)} ${d._id}  (${s.translate.length} đoạn cần dịch, ${s.manual} đoạn EN sửa tay)${d.i18n?.lastError ? "  lỗi: " + d.i18n.lastError : ""}`);
  }
  console.log(`${docs.length} tài liệu có thể dịch:`, JSON.stringify(count), docs.some((d) => !d.i18n) ? `| chưa có baseline: ${docs.filter((d) => !d.i18n).length}` : "");
} else if (cmd === "backfill") {
  const docs = await allDocs(), mutations = [];
  const at = new Date().toISOString(), out = { synced: 0, outdated: 0, unchanged: 0 };
  for (const d of docs) {
    // Page slots: the approved repository pair is the reference. VI edited in Sanity with the old EN = OUTDATED.
    const reg = /^page_/.test(d._type) ? registry.pages[d._type.slice(5)] : null;
    const doc = structuredClone(d);
    const p = plan({ ...doc, i18n: { ...(doc.i18n || {}), units: doc.i18n?.units || [] } });
    let next = bookkeeping(doc, p, at) || doc.i18n;
    if (reg) {
      const units = [];
      for (const u of p.units) {
        const slot = reg.texts.find((t) => "slot:" + t.id === u.key);
        const enIsRepo = !u.en || (slot && u.en === slot.en);
        if (slot && u.vi !== slot.vi && enIsRepo) units.push({ _key: hash(u.key), key: u.key, viHash: hash(slot.vi), enHash: u.enHash }); // EN behind VI
        else units.push({ _key: hash(u.key), key: u.key, viHash: u.viHash, enHash: u.enHash });
      }
      const outdated = units.some((x, k) => x.viHash !== p.units[k].viHash);
      next = { ...(doc.i18n || {}), units, viHash: outdated ? null : p.viHash, status: outdated ? STATUS.OUTDATED : STATUS.SYNCED, checkedAt: at,
        ...(outdated ? { lastError: "Bản VI đã được sửa trong CMS nhưng bản EN chưa được dịch (dịch tự động chưa kích hoạt)" } : {}) };
    }
    if (JSON.stringify(next) === JSON.stringify(d.i18n)) { out.unchanged++; continue; }
    if (next.status === STATUS.OUTDATED) { out.outdated++; console.log("OUTDATED", d._id, "—", next.lastError); } else out.synced++;
    mutations.push({ patch: { id: d._id, ifRevisionID: d._rev, set: { i18n: next } } });
  }
  console.log(`baseline: ${mutations.length} document(s) to write (${out.synced} synced, ${out.outdated} outdated), ${out.unchanged} unchanged`);
  if (flag("--apply") && mutations.length) {
    const r = await fetch(`https://${PID}.api.sanity.io/${API}/data/mutate/${DS}?returnIds=true&visibility=sync`, { method: "POST", headers: H, body: JSON.stringify({ mutations }) });
    const j = await r.json(); if (!r.ok) throw new Error(r.status + " " + JSON.stringify(j).slice(0, 300));
    console.log("applied in transaction", j.transactionId);
  } else if (!flag("--apply")) console.log("dry run; add --apply to write");
} else if (cmd === "run") {
  const id = rest[0];
  const provider = createProvider(opt("--provider") || "none", { allowTest: flag("--allow-test"), env: process.env });
  const store = sanityStore({ projectId: PID, dataset: DS, token });
  const dry = !flag("--apply");
  const s = dry ? { get: store.get, async patch(i, rev, ops) { console.log("DRY patch", i, "rev", rev, Object.keys(ops.set || {}).join(", ")); return { conflict: false, rev: "dry" }; } } : store;
  // The existing Sanity webhook already rebuilds cms-preview on every published change: no extra build here.
  const r = await handleDocumentEvent({ id, store: s, provider, triggerBuild: async () => {}, log: (...a) => console.log(...a) });
  console.log(JSON.stringify(r));
} else {
  console.log("usage: node tools/cms-i18n.mjs status | backfill [--apply] | run <docId> --provider <none|test|workers-ai|anthropic> [--apply] [--allow-test]");
  process.exit(2);
}
