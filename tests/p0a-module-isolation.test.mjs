// P0A — BIO-A custom modules and other protected paths stay byte-identical to the baseline, except for
// changes made by an approved roadmap phase commit that touched only its declared files.
// Adding a phase: append { sha, phase, files } below and record the phase in FULL_HANDOFF.
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

const BASELINE = "d59f50d3884e66e6ae19c3b2b105bc0c4e368535";
const PROTECTED = [
  "bioa-404.mjs", "bioa-about-refine.mjs", "bioa-blog-refine.mjs", "bioa-contacts-refine.mjs",
  "bioa-cosmetics-refine.mjs", "bioa-home-refine.mjs", "bioa-services-refine.mjs",
  "bioa-source-components.mjs", "bioa-transform.mjs", "assets", "functions", "migrations"
];
// Approved phase commits allowed to modify protected paths (scope proven by tests/phase-diff-scope.mjs).
const APPROVED = [
  // Recovery branch (baseline d59f50d): P1/P2/P4 ported with cherry-pick -x, then R2/R3.
  { sha: "e2c78c67828fd2a3571a8a24e1af4107b5f6e445", phase: "P1", files: ["bioa-home-refine.mjs"] },
  { sha: "22ccdf4e2cbf1f38b80cff491844fe2554456672", phase: "P2", files: ["bioa-source-components.mjs", "bioa-transform.mjs"] },
  { sha: "0d1fc5e06223464b1bc950019770a4e6d41b4d41", phase: "P4", files: ["bioa-transform.mjs"] },
  { sha: "bbc11df238c0349bad7dad6d90c8af8a81c2679e", phase: "R2", files: ["bioa-blog-refine.mjs"] },
  { sha: "929039c255ea22be8f3a834bb7e09c4e53f84647", phase: "R3", files: ["bioa-transform.mjs"] },
  // FINAL COMPLETION (2026-11-10): R13 VI dropdown label, R14 canonical business config (byte-identical dist), R15 identity/share fixes.
  { sha: "40268200a58cf6e31d7d04f9c8fc6d834da72c1f", phase: "R13", files: ["bioa-transform.mjs"] },
  { sha: "e1f84a593e8efc406342ecf3a5cc9c5de21be2af", phase: "R14", files: ["bioa-blog-refine.mjs", "bioa-contacts-refine.mjs", "bioa-home-refine.mjs", "bioa-transform.mjs"] },
  { sha: "15d2960318b040804a82e582f60176c7e8912e30", phase: "R15", files: ["bioa-blog-refine.mjs"] },
  { sha: "226fcc034c4106752f381ccea203b0cc91bf6495", phase: "R14c", files: ["bioa-transform.mjs"] },
  // R16: new isolated Pages Function (chat gateway); functions/api/lead.js untouched.
  { sha: "7960b6dd2739a9664280df3faf77c135e715a776", phase: "R16", files: ["functions/api/chat.js"] },
  // R21: chat preview reply copy only (no false "request recorded" claim).
  { sha: "223200c8bfa53f478e6d0e3a166cb38188287025", phase: "R21", files: ["bioa-home-refine.mjs"] },
  // R24 (owner Home FAIL 2026-11-10): ROADMAP-R5 resize re-sync (Home owner, reused by Cosmetics), HOWWORKS-T1 Tablet CSS,
  // CONTENT-C1 Footer/About Careers+Shipping decision.
  { sha: "497467ab1efa3b802e7baf99f8bc48bae7bedf2b", phase: "R24", files: ["bioa-about-refine.mjs", "bioa-cosmetics-refine.mjs", "bioa-home-refine.mjs", "bioa-source-components.mjs"] },
  // R24d: same ROADMAP-R5 owner script, re-sync on the card transitionend (final-QA timing FAIL fixed at the cause).
  { sha: "f265a293329e619a4544288007cb2d736b3a60f6", phase: "R24", files: ["bioa-home-refine.mjs"] },
  // R24g (owner Tablet FAIL on eabcd48): TABLET-TYPE-SOURCE2 + HOWWORKS-T2 inside the canonical 769-1200 owner only.
  { sha: "cbda5263b35ee389d46e982bb05ce8cc93867072", phase: "R24", files: ["bioa-source-components.mjs"] },
  // R24j (owner delivery 2026-11-11): EMAIL-PILL-1 in Patch A8 (Header email pill backdrop) only.
  { sha: "36668a8c0e2d1612a24649488434ad7fa95f843a", phase: "R24CL", files: ["bioa-home-refine.mjs"] }
];
const git = (...a) => spawnSync("git", a, { encoding: "utf8" });

test("protected BIO-A modules change only through approved phase commits", () => {
  assert.equal(git("cat-file", "-e", BASELINE + "^{commit}").status, 0, "baseline commit must be available (fetch-depth 0)");
  const dirty = git("diff", "--name-only", "HEAD", "--", ...PROTECTED);
  assert.equal(dirty.stdout.trim(), "", "uncommitted changes to protected files:\n" + dirty.stdout);
  const log = git("log", "--format=%H", BASELINE + "..HEAD", "--", ...PROTECTED);
  assert.equal(log.status, 0, log.stderr);
  for (const sha of log.stdout.split("\n").filter(Boolean)){
    const ok = APPROVED.find(a => a.sha === sha);
    assert.ok(ok, "unapproved commit touches protected paths: " + sha);
    const touched = git("show", "--name-only", "--format=", sha, "--", ...PROTECTED).stdout.split("\n").filter(Boolean);
    assert.deepEqual(touched.filter(f => !ok.files.includes(f)), [], ok.phase + " touched undeclared protected files");
  }
});

test("pre-existing tests unchanged", () => {
  const r = git("diff", "--name-only", "--diff-filter=MD", BASELINE, "--", "tests");
  assert.equal(r.stdout.trim(), "", "modified/deleted existing tests:\n" + r.stdout);
});
