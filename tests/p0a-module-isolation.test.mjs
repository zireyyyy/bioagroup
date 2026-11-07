// P0A — BIO-A custom modules and other protected paths must be byte-identical to the baseline.
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

const BASELINE = "d59f50d3884e66e6ae19c3b2b105bc0c4e368535";
const PROTECTED = [
  "bioa-404.mjs", "bioa-about-refine.mjs", "bioa-blog-refine.mjs", "bioa-contacts-refine.mjs",
  "bioa-cosmetics-refine.mjs", "bioa-home-refine.mjs", "bioa-services-refine.mjs",
  "bioa-source-components.mjs", "bioa-transform.mjs", "assets", "functions", "migrations"
];

test("protected BIO-A modules unchanged since " + BASELINE.slice(0, 7), () => {
  const known = spawnSync("git", ["cat-file", "-e", BASELINE + "^{commit}"]);
  assert.equal(known.status, 0, "baseline commit must be available (fetch-depth 0)");
  const r = spawnSync("git", ["diff", "--name-only", BASELINE, "--", ...PROTECTED], { encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.stdout.trim(), "", "changed protected files:\n" + r.stdout);
});

test("pre-existing tests unchanged", () => {
  const r = spawnSync("git", ["diff", "--name-only", "--diff-filter=MD", BASELINE, "--", "tests"], { encoding: "utf8" });
  assert.equal(r.stdout.trim(), "", "modified/deleted existing tests:\n" + r.stdout);
});
