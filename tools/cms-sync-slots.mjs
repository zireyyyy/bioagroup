// R27: keep the Sanity page documents in step with cms/registry.json after a developer changed page text in code.
// Text slot ids are content hashes, so a changed sentence gets a NEW slot id. This tool
//   - adds every registry slot that the page document lacks (value = the current website text), and
//   - removes a slot that is no longer in the registry ONLY when its Sanity value is still exactly the text the
//     previous registry had (nobody edited it). An edited orphan is reported as CONFLICT and left untouched.
// Dry run by default; --apply writes one transaction per page document, pinned to the revision that was read.
//
//   node tools/cms-sync-slots.mjs --from <git-ref-of-previous-registry> [--apply]
//
// Auth: the owner's Sanity CLI login (token read from the CLI config, never printed). Back up the dataset first.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const arg = n => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : null; };
const from = arg("--from"), apply = process.argv.includes("--apply");
if (!from) { console.error("usage: node tools/cms-sync-slots.mjs --from <git-ref> [--apply]"); process.exit(2); }
const PID = "hfmu7ifg", DS = "production", API = "v2025-02-19";
const token = JSON.parse(fs.readFileSync(path.join(os.homedir(), ".config", "sanity", "config.json"), "utf8")).authToken;
const H = { authorization: "Bearer " + token, "content-type": "application/json" };
const oldReg = JSON.parse(execFileSync("git", ["show", from + ":cms/registry.json"], { encoding: "utf8", maxBuffer: 64 << 20 }));
const newReg = JSON.parse(fs.readFileSync("cms/registry.json", "utf8"));

async function doc(id){
  const r = await fetch(`https://${PID}.api.sanity.io/${API}/data/doc/${DS}/${id}`, { headers: H });
  const j = await r.json(); if (!r.ok) throw new Error(id + " " + r.status);
  return j.documents?.[0] || null;
}
let conflicts = 0, writes = 0;
for (const [page, def] of Object.entries(newReg.pages)){
  if (!def.texts.length && !(oldReg.pages[page]?.texts || []).length) continue;
  const id = "page-" + page;
  const d = await doc(id);
  if (!d){ console.log(id, "missing — run tools/cms-seed.mjs first"); continue; }
  if (await doc("drafts." + id)) { console.log(id, "has an unpublished draft — skipped (publish or discard it first)"); conflicts++; continue; }
  const nowIds = new Set(def.texts.map(t => t.id));
  const set = {}, unset = [];
  for (const t of def.texts) if (!d[t.id]) set[t.id] = { _type: "object", vi: t.vi, en: t.en };
  for (const t of oldReg.pages[page]?.texts || []){
    if (nowIds.has(t.id) || !d[t.id]) continue;
    if (d[t.id].vi === t.vi && d[t.id].en === t.en) unset.push(t.id);
    else { conflicts++; console.log(`CONFLICT ${id}.${t.id}: edited in Sanity, kept — "${String(d[t.id].vi).slice(0, 60)}"`); }
  }
  console.log(`${id}: +${Object.keys(set).length} slot(s), -${unset.length} unedited orphan(s)`);
  for (const k of Object.keys(set)) console.log("   + " + set[k].vi.slice(0, 80));
  for (const k of unset) console.log("   - " + d[k].vi.slice(0, 80));
  if (!apply || (!unset.length && !Object.keys(set).length)) continue;
  const patch = { id, ifRevisionID: d._rev };
  if (Object.keys(set).length) patch.set = set;
  if (unset.length) patch.unset = unset;
  const r = await fetch(`https://${PID}.api.sanity.io/${API}/data/mutate/${DS}?returnIds=true&visibility=sync`, { method: "POST", headers: H, body: JSON.stringify({ mutations: [{ patch }] }) });
  const j = await r.json(); if (!r.ok) throw new Error(id + " " + r.status + " " + JSON.stringify(j).slice(0, 200));
  writes++; console.log("   applied, transaction " + j.transactionId);
}
console.log(apply ? `applied ${writes} document(s), ${conflicts} conflict(s)` : `dry run: ${conflicts} conflict(s); add --apply to write`);
process.exit(conflicts ? 1 : 0);
