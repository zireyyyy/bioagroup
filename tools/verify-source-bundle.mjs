// P0A — verify every pinned source file (size + SHA-256) before building.
import { verifyBundle, bundleDir } from "./source-bundle.mjs";

try{
  const n = verifyBundle(bundleDir());
  console.log("source bundle verified:", n, "files");
}catch(e){
  console.error(String(e.message || e));
  process.exit(1);
}
