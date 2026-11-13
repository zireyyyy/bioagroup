// CMS-R25b: owner-approved Production content releases (pinned, reproducible, reversible).
//
//   node tools/cms-release.mjs create --approved-by "<owner name>" [--note "<text>"]
//        fetch the PUBLISHED Sanity content (env SANITY_PROJECT_ID, SANITY_READ_TOKEN), validate it, pack snapshot +
//        images into cms/release/<id>.json.gz and point cms/release/current.json at it (sha256). Commit both files and
//        push to main ONLY after the owner approved this release on Preview.
//   node tools/cms-release.mjs pin <cms/release/<id>.json.gz> --approved-by "<owner name>"
//        rollback / re-release an archive that is already in the repository.
//   node tools/cms-release.mjs verify
//        check the pin (archive present, sha256 matches) without building.
//
// The Production build never reads Sanity: it extracts exactly the pinned archive (tools/fetch-cms.mjs).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { liveSnapshot, packRelease, extractRelease, sha256, summary, CmsError } from "./cms-snapshot.mjs";

const PIN = "cms/release/current.json";
const arg = name => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : undefined; };
const [, , cmd, target] = process.argv;

function writePin(archive, buf, snapshot, approvedBy, note){
  const prev = fs.existsSync(PIN) ? JSON.parse(fs.readFileSync(PIN, "utf8")) : null;
  const pin = { releaseId: path.basename(archive).replace(/\.json\.gz$/, ""), archive, sha256: sha256(buf), createdAt: new Date().toISOString(),
    approvedBy, note: note || "", snapshotSha: snapshot.sha, contents: summary(snapshot), previous: prev ? { releaseId: prev.releaseId, sha256: prev.sha256 } : null };
  fs.writeFileSync(PIN, JSON.stringify(pin, null, 1) + "\n");
  return pin;
}

try{
  if (cmd === "create"){
    const approvedBy = arg("--approved-by");
    if (!approvedBy) throw new CmsError('--approved-by "<owner name>" is required: a Production release needs the owner\'s approval');
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "bioa-cms-release-"));
    const registry = JSON.parse(fs.readFileSync("cms/registry.json", "utf8"));
    const s = await liveSnapshot({ pid: process.env.SANITY_PROJECT_ID, ds: process.env.SANITY_DATASET || "production", token: process.env.SANITY_READ_TOKEN, outDir: tmp, registry });
    const buf = packRelease(tmp);
    fs.rmSync(tmp, { recursive: true, force: true });
    const stamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 12);
    const archive = `cms/release/r${stamp}-${sha256(buf).slice(0, 8)}.json.gz`;
    fs.mkdirSync("cms/release", { recursive: true });
    fs.writeFileSync(archive, buf);
    const pin = writePin(archive, buf, s, approvedBy, arg("--note"));
    console.log(`release ${pin.releaseId} (${(buf.length / 1024).toFixed(0)} KB): ${pin.contents}\npinned in ${PIN}; previous: ${pin.previous?.releaseId || "none"}`);
  } else if (cmd === "pin"){
    const approvedBy = arg("--approved-by");
    if (!target || !approvedBy) throw new CmsError('usage: pin <cms/release/<id>.json.gz> --approved-by "<owner name>"');
    const buf = fs.readFileSync(target);
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "bioa-cms-pin-"));
    const s = extractRelease(target, sha256(buf), tmp);
    fs.rmSync(tmp, { recursive: true, force: true });
    const pin = writePin(target.replace(/\\/g, "/"), buf, s, approvedBy, arg("--note") || "rollback / re-release");
    console.log(`pinned ${pin.releaseId}: ${pin.contents}`);
  } else if (cmd === "verify"){
    if (!fs.existsSync(PIN)){ console.log("no pinned CMS release: Production builds use repository content"); process.exit(0); }
    const pin = JSON.parse(fs.readFileSync(PIN, "utf8"));
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "bioa-cms-verify-"));
    const s = extractRelease(pin.archive, pin.sha256, tmp);
    fs.rmSync(tmp, { recursive: true, force: true });
    console.log(`pinned release ${pin.releaseId} OK (sha256 ${pin.sha256.slice(0, 16)}): ${summary(s)}`);
  } else {
    console.error("usage: node tools/cms-release.mjs create|pin|verify (see header)"); process.exit(2);
  }
}catch(e){
  console.error("CMS RELEASE FAILED: " + (e instanceof CmsError ? e.message : e.stack || e.message)); process.exit(1);
}
