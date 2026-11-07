// P0A — two clean builds (network blocked) must produce a byte-identical dist tree.
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

function treeHash(dir){
  const files = [];
  (function walk(d){ for (const f of readdirSync(d).sort()){ const p = path.join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(p); } })(dir);
  const h = createHash("sha256");
  for (const f of files) h.update(path.relative(dir, f).split(path.sep).join("/") + "\0" + createHash("sha256").update(readFileSync(f)).digest("hex") + "\n");
  return { hash: h.digest("hex"), files: files.length };
}

const runs = [];
for (let i = 0; i < 2; i++){
  const r = spawnSync(process.execPath, ["--import", "./tools/net-guard.mjs", "build.mjs"], { encoding: "utf8" });
  if (r.status !== 0){ console.error(r.stderr || r.stdout); process.exit(1); }
  runs.push(treeHash("dist"));
}
console.log("build 1:", runs[0].files, runs[0].hash);
console.log("build 2:", runs[1].files, runs[1].hash);
if (runs[0].hash !== runs[1].hash){ console.error("P0A determinism FAIL"); process.exit(1); }
console.log("P0A determinism PASS");
