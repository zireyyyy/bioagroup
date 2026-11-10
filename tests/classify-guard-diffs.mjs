// Classifies FAIL lines of tests/p0a-custom-pass-guard.mjs logs against the declared recovery scopes.
// Every difference must be explained by exactly the intended change; anything else is UNEXPLAINED
// (= potential regression of an OWNER PASS surface) and makes this script exit 1.
// Usage: node tests/classify-guard-diffs.mjs <BIOA_REPORTS>/p0a-custom-pass-guard.json ...
import { readFileSync } from "node:fs";

const tablet = w => w >= 769 && w <= 1200;
const home = r => r === "/" || r === "/en/";
const tabletP2Route = r => home(r) || /contract-manufacturing-cosmetics/.test(r);
const RULES = [
  ["R3 Merywood JSON-LD removed", (p) => /^dom-classes: yoast-schema-graph 0\/1$/.test(p)],
  ["R3 WP reader beacon removed", (p) => /^non-GET attempts differ: .*hs_reader_ping/.test(p)],
  ["R2 Blog title h2->h1 (same computed style)", (p, r) => /^\/(en\/)?blog\/(page\/\d+\/)?$/.test(r) && /^computed: /.test(p) && sameExceptTag(p)],
  ["P1 Home icon 04 canonical size", (p, r, w) => home(r) && !tablet(w) && /^geometry: IMG\.icon bioa-why-icon-bioa [^;]*$/.test(p)],
  ["P1 Home icon 04 area screenshot", (p, r, w) => home(r) && !tablet(w) && /^screenshot y=\d+ diff /.test(p)],
  ["P2 Tablet formats lede 12px", (p, r, w) => tablet(w) && tabletP2Route(r) && /^computed: .*formats__lede/.test(p) && !/; [+-]local (?!P\|text-large description formats__lede)/.test(p.replace(/^computed: /, "; "))],
  ["P2 Tablet steps/formats height + downstream offsets", (p, r, w) => tablet(w) && tabletP2Route(r) && /^geometry: /.test(p)],
  ["P2 Tablet screenshot", (p, r, w) => tablet(w) && tabletP2Route(r) && /^screenshot y=\d+ diff /.test(p)],
  // R13: VI-only visible text of the product cards / format toggles. tests/phase-diff-scope.mjs (R13 scope) proves the
  // HTML of these two VI pages is byte-identical outside .product, [data-formats-toggle] and #ddType .dd-label.
  ["R13 VI translated product/toggle text (scope-proven)", (p, r) => (r === "/" || r === "/contract-manufacturing-cosmetics/") && p === "text differs"]
];
function sameExceptTag(p){
  const items = p.replace(/^computed: /, "").split(" ; ");
  const plus = items.filter(x => x.startsWith("+local ")).map(x => x.slice(7)), minus = items.filter(x => x.startsWith("-local ")).map(x => x.slice(7));
  if (!plus.length || plus.length !== minus.length) return false;
  return plus.every((x, i) => /^H1\|/.test(x) && /^H2\|/.test(minus[i]) && x.slice(2) === minus[i].slice(2));
}

const counts = {}, unexplained = [];
let lines = 0;
// Input: the guard's JSON report (complete fail lists). Logs truncate each line at 600 chars.
const cases = process.argv.slice(2).flatMap(f => JSON.parse(readFileSync(f, "utf8")).results).filter(r => r.fail.length);
for (const { route, width: w, fail } of cases){
  lines++;
  for (const part of fail){
    const rule = RULES.find(([, fn]) => fn(part.trim(), route, w));
    if (rule) counts[rule[0]] = (counts[rule[0]] || 0) + 1;
    else unexplained.push(route + " @" + w + " :: " + part.slice(0, 300));
  }
}
console.log("FAIL lines:", lines);
for (const [k, v] of Object.entries(counts)) console.log("  expected  ", v, "×", k);
for (const u of unexplained) console.log("UNEXPLAINED", u);
console.log(unexplained.length ? `Guard classification: ${unexplained.length} UNEXPLAINED difference(s)` : "Guard classification: all differences inside declared scopes");
if (unexplained.length) process.exit(1);
