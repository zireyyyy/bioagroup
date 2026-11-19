// R28: copy Blog articles that a developer rewrote in code (bioa-blog-refine.mjs) into their Sanity blogPost documents.
// A CMS-live build REPLACES the repository article with the published Sanity document of the same slug, so without this
// step the Preview would keep showing the previous text. Safety rules:
//   - only articles whose content differs between <git-ref> and the working copy are considered;
//   - the Sanity document is written ONLY if its content is still exactly the <git-ref> text (nobody edited it in Studio);
//     an edited document is reported as CONFLICT and left untouched; a document with a pending draft is skipped;
//   - only content fields are set (titles, SEO titles, excerpts, reading time, intro, sections, note). Image, date,
//     order and the owner's `rewriteApproved` decision are never written;
//   - every patch is pinned to the revision that was read (ifRevisionID). Dry run by default.
//
//   node tools/cms-sync-blog.mjs --from <git-ref> [--apply]
//
// Auth: the owner's Sanity CLI login (token read from the CLI config, never printed). Back up the dataset first.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

const arg = n => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : null; };
const from = arg("--from"), apply = process.argv.includes("--apply");
if (!from) { console.error("usage: node tools/cms-sync-blog.mjs --from <git-ref> [--apply]"); process.exit(2); }
const PID = "hfmu7ifg", DS = "production", API = "v2025-02-19";
const token = JSON.parse(fs.readFileSync(path.join(os.homedir(), ".config", "sanity", "config.json"), "utf8")).authToken;
const H = { authorization: "Bearer " + token, "content-type": "application/json" };
const postsOf = src => JSON.parse(src.split("\n").find(l => l.startsWith("const blogPosts=[")).replace(/^const blogPosts=/, "").replace(/;\s*$/, ""));
const oldPosts = postsOf(execFileSync("git", ["show", from + ":bioa-blog-refine.mjs"], { encoding: "utf8", maxBuffer: 64 << 20 }));
const newPosts = postsOf(fs.readFileSync("bioa-blog-refine.mjs", "utf8"));
const TEXT = ["titleVi", "titleEn", "seoTitleVi", "seoTitleEn", "excerptVi", "excerptEn", "noteVi", "noteEn"];
const content = p => JSON.stringify([TEXT.map(f => p[f] || ""), p.readMin, p.introVi, p.introEn,
  (p.sections || []).map(s => [s.anchor ?? s.id, s.headingVi, s.headingEn, s.paragraphsVi, s.paragraphsEn, s.bulletsVi || [], s.bulletsEn || []])]);
const key = () => crypto.randomBytes(6).toString("hex");

async function doc(id){
  const r = await fetch(`https://${PID}.api.sanity.io/${API}/data/doc/${DS}/${id}`, { headers: H });
  const j = await r.json(); if (!r.ok) throw new Error(id + " " + r.status);
  return j.documents?.[0] || null;
}
const mutations = [], report = [];
let conflicts = 0;
for (const p of newPosts){
  const o = oldPosts.find(x => x.slug === p.slug);
  if (!o || content(o) === content(p)) continue;
  const id = "blog-" + p.slug;
  const d = await doc(id);
  if (!d){ report.push(`${id}: no Sanity document (the repository text is used)`); continue; }
  if (await doc("drafts." + id)){ conflicts++; report.push(`SKIP ${id}: unpublished draft in Studio`); continue; }
  if (content(d) !== content(o)){ conflicts++; report.push(`CONFLICT ${id}: edited in Studio since ${from}, kept (_updatedAt ${d._updatedAt})`); continue; }
  const set = Object.fromEntries(TEXT.map(f => [f, p[f]]));
  Object.assign(set, { readMin: p.readMin, introVi: p.introVi, introEn: p.introEn,
    sections: p.sections.map(s => ({ _key: key(), _type: "blogSection", anchor: s.id, headingVi: s.headingVi, headingEn: s.headingEn,
      paragraphsVi: s.paragraphsVi, paragraphsEn: s.paragraphsEn, ...(s.bulletsVi ? { bulletsVi: s.bulletsVi, bulletsEn: s.bulletsEn } : {}) })) });
  mutations.push({ patch: { id, ifRevisionID: d._rev, set } });
  report.push(`${id}: rev ${d._rev} -> rewrite (${p.sections.length} sections, rewriteApproved ${d.rewriteApproved === true ? "true (kept)" : "not set (kept)"})`);
}
for (const l of report) console.log(l);
console.log(`${mutations.length} document(s) to update, ${conflicts} conflict(s)/skip(s)`);
if (apply && mutations.length){
  const r = await fetch(`https://${PID}.api.sanity.io/${API}/data/mutate/${DS}?returnIds=true&visibility=sync`, { method: "POST", headers: H, body: JSON.stringify({ mutations }) });
  const j = await r.json(); if (!r.ok) throw new Error(r.status + " " + JSON.stringify(j).slice(0, 300));
  console.log(`applied in one transaction ${j.transactionId} (${j.results.length} documents)`);
} else if (!apply) console.log("dry run; add --apply to write");
process.exit(conflicts ? 1 : 0);
