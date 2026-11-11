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
  ["R13 VI translated product/toggle text (scope-proven)", (p, r) => (r === "/" || r === "/contract-manufacturing-cosmetics/") && p === "text differs"],
  // R24 (each rule matches ONE item; parts are split into items below):
  // CONTENT-C1 Footer: exactly 3 more hidden surplus items (2 recruitment + Shipping) and their removed link styles.
  ["R24 Footer hidden surplus items +3", p => { const m = p.match(/^dom-classes: bioa-footer-nav-unused (\d+)\/(\d+)$/); return !!m && +m[1] - +m[2] === 3; }],
  ["R24 Footer removed link style (A, no class)", p => /^computed: -local A\|\|Manrope, sans-serif\|/.test(p)],
  // Visible text: allowed only when tests/r24-text-proof.mjs proved R21 -> R24 differs by the removed Footer labels / About CTA only.
  ["R24 Footer/About text (proven by r24-text-proof)", p => p === "text differs" && process.env.R24_TEXT_PROOF === "PASS"],
  // Mobile Footer stacks its link lists: 3 fewer links -> shorter Footer and page by the same delta, Footer top unchanged.
  ["R24 Mobile Footer shorter (3 links fewer)", (p, r, w, c) => w <= 768 && c.footer && /^geometry: FOOTER\.footer /.test(p) && c.footer.dy === 0 && c.footer.dh < 0],
  ["R24 Mobile page height = Footer delta", (p, r, w, c) => w <= 768 && c.footer && /^geometry: (HTML|BODY)\.[^;]* (\S+) vs (\S+)$/.test(p) && pageDeltaIsFooter(p, c.footer.dh)],
  ["R24 Mobile screenshot of the Footer region", (p, r, w, c) => w <= 768 && c.footer && /^screenshot y=(\d+) /.test(p) && +p.match(/y=(\d+)/)[1] + 900 > c.footer.y],
  // HOWWORKS-T1 on /dich-vu-khac/ (same canonical Tablet rule as Home, which the P2 rule already covers).
  ["R24 HOWWORKS-T1 Tablet How It Works geometry (Dich Vu Khac)", (p, r, w) => tablet(w) && /^\/(en\/)?dich-vu-khac\/$/.test(r) && /^geometry: (SECTION\.block block-how-works desctop|IMG\.|HTML\.|BODY\.|FOOTER\.|SECTION\.)/.test(p)],
  // R24CL CF7-JS-1: the two CF7 scripts are no longer loaded, so CF7 does not swap .wpcf7 "no-js" -> "js" and does not
  // inject its hidden spinner. No CSS targets no-js/js; .wpcf7-spinner is visibility:hidden unless CF7 itself submits.
  // Exact counts only (proof: tests/cf7-js-removal-proof.mjs, docs/DELIVERY_CLEANUP_R24CL.md section 4).
  ["R24CL CF7 JS removed: .wpcf7 keeps no-js", p => p === "dom-classes: no-js 1/0"],
  ["R24CL CF7 JS removed: no js class swap", p => p === "dom-classes: js 0/1"],
  ["R24CL CF7 JS removed: no hidden CF7 spinner", p => p === "dom-classes: wpcf7-spinner 0/1"],
  ["R24 HOWWORKS-T1 Tablet screenshot (Dich Vu Khac)", (p, r, w) => tablet(w) && /^\/(en\/)?dich-vu-khac\/$/.test(r) && /^screenshot y=\d+ diff /.test(p)]
];
function pageDeltaIsFooter(p, dh){
  const m = p.match(/(-?[\d.]+),(-?[\d.]+),(-?[\d.]+),(-?[\d.]+) vs (-?[\d.]+),(-?[\d.]+),(-?[\d.]+),(-?[\d.]+)$/);
  return !!m && +m[1] === +m[5] && +m[2] === +m[6] && +m[3] === +m[7] && Math.abs((+m[4] - +m[8]) - dh) <= 1.01;
}
// Split a guard part into single items so each one must be explained on its own.
function items(part){
  const t = part.trim();
  let m;
  if ((m = t.match(/^dom-classes: (.*)$/))) return m[1].split(", ").map(x => "dom-classes: " + x);
  if ((m = t.match(/^computed: (.*)$/))){
    const xs = m[1].split(" ; "), foot = xs.filter(x => /^-local A\|\|/.test(x)), rest = xs.filter(x => !/^-local A\|\|/.test(x));
    return [...foot.map(x => "computed: " + x), ...(rest.length ? ["computed: " + rest.join(" ; ")] : [])];
  }
  if ((m = t.match(/^geometry: (.*)$/)) && !/^count /.test(m[1])) return m[1].split(" ; ").map(x => "geometry: " + x);
  return [t];
}
function caseCtx(fail){
  const g = fail.find(x => x.startsWith("geometry: ")) || "";
  const f = g.match(/FOOTER\.footer (-?[\d.]+),(-?[\d.]+),(-?[\d.]+),(-?[\d.]+) vs (-?[\d.]+),(-?[\d.]+),(-?[\d.]+),(-?[\d.]+)/);
  return { footer: f ? { y: +f[2], dy: +f[2] - +f[6], dh: +f[4] - +f[8] } : null };
}
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
  const ctx = caseCtx(fail);
  for (const part of fail){
    // a whole part may match an existing rule; otherwise each of its items must match one
    const whole = RULES.find(([, fn]) => fn(part.trim(), route, w, ctx));
    if (whole){ counts[whole[0]] = (counts[whole[0]] || 0) + 1; continue; }
    for (const it of items(part)){
      const rule = RULES.find(([, fn]) => fn(it, route, w, ctx));
      if (rule) counts[rule[0]] = (counts[rule[0]] || 0) + 1;
      else unexplained.push(route + " @" + w + " :: " + it.slice(0, 300));
    }
  }
}
console.log("FAIL lines:", lines);
for (const [k, v] of Object.entries(counts)) console.log("  expected  ", v, "×", k);
for (const u of unexplained) console.log("UNEXPLAINED", u);
console.log(unexplained.length ? `Guard classification: ${unexplained.length} UNEXPLAINED difference(s)` : "Guard classification: all differences inside declared scopes");
if (unexplained.length) process.exit(1);
