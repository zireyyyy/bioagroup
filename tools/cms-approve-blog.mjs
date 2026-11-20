// R28c: record the owner's publication approval (2026-11-20) in Sanity for the 29 rewritten Blog articles:
//   - rewriteApproved = true (Studio "Đã viết lại — hiển thị lại");
//   - slug.current = the new slug for the 13 renamed articles (old URLs answer 301 from the site build).
// Safety: published documents only; an article with a pending draft is skipped and reported; every patch is pinned to
// the revision that was read (ifRevisionID); one transaction; nothing else is written. Dry run by default.
//
//   node tools/cms-approve-blog.mjs [--apply]
//
// Auth: the owner's Sanity CLI login (token read from the CLI config, never printed). Back up the dataset first.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { R27_PENDING, R28C_RENAMES } from "../tests/r28-rewritten-slugs.mjs";

const apply = process.argv.includes("--apply");
const PID = "hfmu7ifg", DS = "production", API = "v2025-02-19";
const token = JSON.parse(fs.readFileSync(path.join(os.homedir(), ".config", "sanity", "config.json"), "utf8")).authToken;
const H = { authorization: "Bearer " + token, "content-type": "application/json" };
const slugs = [...R27_PENDING, ...Object.values(R28C_RENAMES)];
const q = encodeURIComponent('*[_type == "blogPost" && slug.current in $s]{_id, _rev, "slug": slug.current, rewriteApproved}');
const r = await fetch(`https://${PID}.api.sanity.io/${API}/data/query/${DS}?query=${q}&$s=${encodeURIComponent(JSON.stringify(slugs))}&perspective=raw`, { headers: H });
if (!r.ok) throw new Error("query " + r.status);
const docs = (await r.json()).result;
const published = docs.filter(d => !d._id.startsWith("drafts."));
const drafts = new Set(docs.filter(d => d._id.startsWith("drafts.")).map(d => d._id.slice(7)));
const mutations = [], report = [];
for (const old of R27_PENDING) {
  const target = R28C_RENAMES[old] || old;
  const d = published.find(x => x.slug === old) || published.find(x => x.slug === target);
  if (!d) { report.push(`MISSING ${old}`); continue; }
  if (drafts.has(d._id)) { report.push(`SKIP (draft pending) ${d._id}`); continue; }
  const set = {};
  if (d.rewriteApproved !== true) set.rewriteApproved = true;
  if (d.slug !== target) set["slug.current"] = target;
  if (!Object.keys(set).length) { report.push(`OK already ${d._id} ${target}`); continue; }
  mutations.push({ patch: { id: d._id, ifRevisionID: d._rev, set } });
  report.push(`${apply ? "WRITE" : "WOULD WRITE"} ${d._id} rev ${d._rev} ${JSON.stringify(set)}`);
}
console.log(report.join("\n"));
console.log(`${published.length} published documents found, ${mutations.length} to patch, ${drafts.size} with a draft`);
if (!apply || !mutations.length) process.exit(0);
const w = await fetch(`https://${PID}.api.sanity.io/${API}/data/mutate/${DS}?returnIds=true&visibility=sync`, { method: "POST", headers: H, body: JSON.stringify({ mutations }) });
const j = await w.json();
if (!w.ok) { console.error("mutate failed", w.status, JSON.stringify(j).slice(0, 400)); process.exit(1); }
console.log("transaction", j.transactionId, "documents", (j.results || []).length);
