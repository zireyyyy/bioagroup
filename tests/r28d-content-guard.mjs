// R28d-D CONTENT-TRUTH GUARD (owner 2026-11-23) over a built dist. Conservative: the CURRENT state is the baseline
// (every known open item is listed in docs/r28d/VI_EN_PARITY_AUDIT.md by ID); the guard fails only on NEW drift:
//   1. VI/EN page pairs (hreflang) keep the same number and order of visible items (no accidental fallback/missing EN);
//   2. no Vietnamese text on an EN page beyond the proper nouns allowed below;
//   3. high-risk factory claims (GMP, HACCP, ISO, figures, "leading", export, certified, 100%, Pharmaceutical...)
//      never appear on a page or in a count not already listed in CLAIMS (= OWNER_FACTORY_FACT_CHECK.md items);
//   4. a VI/EN item whose numbers differ is either listed in NUMBERS (known: dates, digits written as words, phone)
//      or fails.
// When the owner approves a correction, update the baseline in the SAME commit that changes the copy.
// Usage: node tests/r28d-content-guard.mjs [dist] [--print-baseline]
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import * as cheerio from "cheerio";

const dist = path.resolve(process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : "dist");
const PRINT = process.argv.includes("--print-baseline");
const SITE = "https://bioagroup.vn";
const VI_DIA = /[ăâđêôơưàảãáạằẳẵắặầẩẫấậèẻẽéẹềểễếệìỉĩíịòỏõóọồổỗốộờởỡớợùủũúụừửữứựỳỷỹýỵ]/i;
// Proper nouns that legitimately stay Vietnamese on EN pages (address, the chat advisor's name, the native language name).
const EN_ALLOW = [/Dương Quảng Hàm/, /Khánh Như/, /Tiếng Việt/];
const CLAIM_TERMS = {
  GMP: /\bc?gmp\b/i, HACCP: /\bhaccp\b/i, ISO: /\biso\s?\d*\b/i, "2000+": /\b2[.,]000\+/, "5+years": /^5\+$|5\+\s?(năm|years)/i,
  "10M/year": /10[.,]000[.,]000/, "1000m2": /1[.,]000\s?m²/, leading: /hàng đầu|\bleading\b|lớn nhất|largest|\btop\s?\d/i,
  export: /xuất khẩu|\bexport/i, certified: /đạt chuẩn|\bcertified\b|chứng nhận|certificat/i, "100%": /100\s?%/,
  pharmaceutical: /pharmaceutical|dược phẩm/i, foodSafety: /an toàn thực phẩm|food[- ]safety/i,
};
const SKIP = "script,style,noscript,svg,template,iframe";

function items(html){
  const $ = cheerio.load(html);
  $(SKIP).remove();
  const out = [];
  const walk = el => {
    for (const n of el.children || []){
      if (n.type === "text"){ const t = n.data.replace(/\s+/g, " ").trim(); if (t && el.type === "tag") out.push({ k: "text", t }); } // tag names may differ (e.g. EN <h1><p>); copy must not
      else if (n.type === "tag"){
        for (const a of ["alt", "aria-label", "placeholder", "title"]){ const v = ($(n).attr(a) || "").trim(); if (v) out.push({ k: "@" + a, t: v }); }
        walk(n);
      }
    }
  };
  walk($("body")[0]);
  const head = [$("title").text().trim(), $('meta[name="description"]').attr("content") || ""].filter(Boolean).map(t => ({ k: "head", t }));
  return [...head, ...out];
}
const nums = s => (String(s).match(/\d[\d.,]*/g) || []).map(x => x.replace(/[.,](?=\d{3}\b)/g, "").replace(/[.,]$/, "")).sort().join(" ");
const h8 = s => crypto.createHash("sha1").update(s).digest("hex").slice(0, 8);

const walkFiles = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walkFiles(path.join(d, e.name)) : e.name === "index.html" ? [path.join(d, e.name)] : []);
const routeOf = f => "/" + path.relative(dist, f).split(path.sep).join("/").replace(/index\.html$/, "");
const pages = new Map(walkFiles(dist).map(f => [routeOf(f), fs.readFileSync(f, "utf8")]).filter(([, h]) => !/bioa-legacy-redirect/.test(h)));

const pairs = [];
for (const [route, html] of pages){
  if (route.startsWith("/en/")) continue;
  const m = html.match(/<link[^>]+hreflang="en"[^>]+href="([^"]+)"/) || html.match(/<link[^>]+href="([^"]+)"[^>]+hreflang="en"/);
  if (!m || !m[1].startsWith(SITE)) continue;
  const en = m[1].slice(SITE.length);
  if (pages.has(en) && en !== route) pairs.push([route, en]);
}

const fails = [], found = { claims: {}, numbers: [] };
for (const [vi, en] of pairs){
  const A = items(pages.get(vi)), B = items(pages.get(en));
  const isArticle = /^\/blog\/(?!page\/)[^/]+\/$/.test(vi);
  if (A.length !== B.length) fails.push(`${vi} ↔ ${en}: ${A.length} VI items vs ${B.length} EN items (missing/extra EN or fallback)`);
  const n = Math.min(A.length, B.length);
  for (let i = 0; i < n; i++){
    if (A[i].k !== B[i].k){ fails.push(`${vi} ↔ ${en}: item ${i} kind ${A[i].k} vs ${B[i].k}`); break; }
    const a = A[i].t, b = B[i].t;
    if (VI_DIA.test(b) && !EN_ALLOW.some(re => re.test(b))) fails.push(`${en}: Vietnamese text on EN page: "${b.slice(0, 80)}"`);
    if (nums(a) !== nums(b)) found.numbers.push(`${vi}|${h8(a)}`);
  }
  if (!isArticle) for (const [term, re] of Object.entries(CLAIM_TERMS)){
    const c = A.filter(x => re.test(x.t)).length + B.filter(x => re.test(x.t)).length;
    if (c) found.claims[`${vi}|${term}`] = c;
  }
}

// ---- Baseline (state of 2026-11-23, CMS Preview 6889ec9; IDs = docs/r28d/VI_EN_PARITY_AUDIT.md) ----
if (PRINT){
  console.log(JSON.stringify({ note: "R28d content guard baseline (2026-11-23, Preview 6889ec9). Open items: docs/r28d/VI_EN_PARITY_AUDIT.md; update only together with an owner-approved copy change.", claims: found.claims, numbers: [...new Set(found.numbers)].sort() }, null, 1));
  process.exit(0);
}
const CLAIMS = JSON.parse(fs.readFileSync(new URL("./r28d-content-baseline.json", import.meta.url), "utf8"));
for (const [k, c] of Object.entries(found.claims)){
  const base = CLAIMS.claims[k] || 0;
  if (c > base) fails.push(`new or increased high-risk claim "${k.split("|")[1]}" on ${k.split("|")[0]}: ${c} (baseline ${base}) — needs an OWNER_FACTORY_FACT_CHECK decision`);
}
const knownNums = new Set(CLAIMS.numbers);
for (const k of new Set(found.numbers)) if (!knownNums.has(k)) fails.push(`VI/EN numbers differ in a new item: ${k}`);

console.log(JSON.stringify({ pairs: pairs.length, claimKeys: Object.keys(found.claims).length, numberItems: new Set(found.numbers).size, fails: fails.length }));
for (const f of fails.slice(0, 40)) console.log("FAIL " + f);
if (fails.length){ console.log("R28d content guard: FAIL"); process.exit(1); }
console.log("R28d content guard: PASS");
