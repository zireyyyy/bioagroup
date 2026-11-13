// CMS-R25b: pre-build step (npm "prebuild"). Decides which CMS content a build may use and writes it to .cms/.
//
//   PRODUCTION (Cloudflare branch = main, or no Cloudflare branch at all: CI, local)
//     -> the PINNED content release only: cms/release/current.json names an archive in cms/release/ and its sha256.
//        No network, no Sanity. Without a pin the build uses repository content (byte-identical to the pre-CMS site).
//        A Production deploy (git push, retry, manual rebuild or deploy hook) therefore always rebuilds the content
//        pinned in that commit; new CMS content reaches Production only through an owner-approved release commit.
//   PREVIEW (Cloudflare branch != main, SANITY_PROJECT_ID + SANITY_READ_TOKEN set)
//     -> LIVE published Sanity content (drafts never), validated, so editors can check it before a release.
//   BIOA_CMS=off -> CMS disabled everywhere. BIOA_CMS_MODE=live -> local live check (refused on main).
//
// Fail closed: any HTTP error, invalid document, oversized text or archive hash mismatch stops the build (exit 1).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { liveSnapshot, extractRelease, summary, CmsError } from "./cms-snapshot.mjs";

const OUT = ".cms";
const PIN = "cms/release/current.json";
const PRODUCTION_BRANCH = process.env.BIOA_PRODUCTION_BRANCH || "main";

export function decideMode(env, pinExists){
  const branch = env.CF_PAGES_BRANCH || "";
  if (env.BIOA_CMS === "off" || env.BIOA_CMS_MODE === "off") return { mode: "off", why: "BIOA_CMS=off" };
  const onProduction = branch === PRODUCTION_BRANCH;
  if (env.BIOA_CMS_MODE === "live" && onProduction) return { mode: "error", why: `live CMS mode is not allowed on the production branch "${PRODUCTION_BRANCH}"` };
  const liveRequested = Boolean(env.SANITY_PROJECT_ID) && (env.BIOA_CMS_MODE === "live" || (branch && !onProduction));
  if (liveRequested && !onProduction) return { mode: "live", why: branch ? `preview branch "${branch}"` : "BIOA_CMS_MODE=live (local)" };
  if (pinExists) return { mode: "release", why: onProduction ? "production branch: pinned release only" : "pinned release (no live preview configured)" };
  return { mode: "off", why: onProduction ? "production branch without a pinned release" : "SANITY_PROJECT_ID not set and no pinned release" };
}

async function main(){
  fs.rmSync(OUT, { recursive: true, force: true });
  const { mode, why } = decideMode(process.env, fs.existsSync(PIN));
  console.log(`CMS mode: ${mode} (${why})`);
  if (mode === "error") throw new CmsError(why);
  if (mode === "off"){ console.log("CMS disabled: the build uses repository content only."); return; }
  if (mode === "release"){
    const pin = JSON.parse(fs.readFileSync(PIN, "utf8"));
    if (!/^[0-9a-f]{64}$/.test(pin.sha256 || "") || !/^cms\/release\/[a-z0-9-]+\.json\.gz$/.test(pin.archive || "")) throw new CmsError("invalid pin " + PIN);
    const s = extractRelease(pin.archive, pin.sha256, OUT);
    console.log(`CMS release ${pin.releaseId} (approved by ${pin.approvedBy}, ${pin.createdAt}) sha256 ${pin.sha256.slice(0, 16)}: ${summary(s)}`);
    return;
  }
  const registry = JSON.parse(fs.readFileSync("cms/registry.json", "utf8"));
  const s = await liveSnapshot({ pid: process.env.SANITY_PROJECT_ID, ds: process.env.SANITY_DATASET || "production", token: process.env.SANITY_READ_TOKEN, outDir: OUT, registry });
  console.log(`CMS live snapshot ${s.sha}: ${summary(s)}`);
}

// Run when executed directly. pathToFileURL is correct on Windows AND on the Linux build image (the previous
// "file:///" + path concatenation produced "file:////opt/..." on Linux, so the step silently did nothing there).
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href){
  main().catch(e => { console.error("CMS FETCH FAILED: " + (e instanceof CmsError ? e.message : e.stack || e.message)); fs.rmSync(OUT, { recursive: true, force: true }); process.exit(1); });
}
