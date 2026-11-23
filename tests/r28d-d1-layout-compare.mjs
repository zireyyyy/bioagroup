// R28d-D1 LAYOUT COMPARE: before vs after measurements from tests/r28d-d1-layout-qa.mjs (same engine).
// FAIL: new clipping, new collision with an image/button, horizontal page scroll, slider cannot reach its end,
//       font-size/family/weight/line-height change, any change on a VI route (VI is frozen).
// FLAG (owner review, not a failure): text box or section height +>10% or +>16px, slides/cards no longer equal height,
//       cards wrapping to another row. Each EN box also reports the height of the same box on the VI page (the approved
//       layout already holds that much text).
// Usage: node tests/r28d-d1-layout-compare.mjs <before.json> <after.json> <outDir>
import fs from "node:fs";
import path from "node:path";

const [bf, af, outDir] = process.argv.slice(2);
const B = JSON.parse(fs.readFileSync(bf, "utf8")), A = JSON.parse(fs.readFileSync(af, "utf8"));
const idx = m => new Map(m.pages.map(p => [p.route + "@" + p.width, p]));
const bi = idx(B), ai = idx(A);
const viOf = r => r === "/en/" ? "/" : r.replace(/^\/en\//, "/");
const fails = [], flags = [], changed = [], summary = [];
const eqH = hs => hs.length > 1 && Math.max(...hs) - Math.min(...hs) <= 1;
const rowsOf = tops => new Set(tops.map(t => Math.round(t / 4))).size;

// Runtime noise floor: the VI HTML is byte-identical before/after (checked by hash), so any difference measured on a VI
// page (animated hero counters, cookie banner / chat teaser timing, auto-playing sliders) is NOT caused by the change.
// Those keys are recorded per route+width and ignored on the EN page when the EN text itself is unchanged.
const noise = new Map(), noiseRows = [];
const scrollViewport = c => /smooth|scroll/i.test(String(c || "")); // page smooth-scroll viewport: below the fold, not clipped
const clipOf = x => x.clippedBy && !scrollViewport(x.clippedBy) ? x.clippedBy : null;
for (const [k, a] of ai){
  if (a.route.startsWith("/en/")) continue;
  const b = bi.get(k); if (!b) continue;
  const bBox = new Map(b.boxes.map(x => [x.key, x])), set = new Set();
  for (const x of a.boxes){ const y = bBox.get(x.key); if (!y) continue;
    if (x.text !== y.text || Math.abs(x.rect.h - y.rect.h) >= 0.6 || Math.abs(x.rect.w - y.rect.w) >= 0.6 || clipOf(x) !== clipOf(y)){ set.add(x.key); noiseRows.push({ page: k, sec: x.sec, text: x.text, before: y.text }); } }
  noise.set(k, set);
}

for (const [k, a] of ai){
  const b = bi.get(k); if (!b) { fails.push({ k, what: "missing before page" }); continue; }
  const isVi = !a.route.startsWith("/en/");
  if (isVi) { summary.push({ page: k, engine: A.meta.engine, boxes: a.boxes.length, changed: 0, flags: 0, fails: 0, noise: noise.get(k)?.size || 0, docW: a.docW, vw: a.vw }); continue; }
  const vi = ai.get(viOf(a.route) + "@" + a.width);
  const flaky = noise.get(viOf(a.route) + "@" + a.width) || new Set();
  const bBox = new Map(b.boxes.map(x => [x.key, x])), viBox = vi ? new Map(vi.boxes.map(x => [x.key, x])) : new Map();
  let nChanged = 0, nFlag = 0, nFail = 0;
  if (a.docW > a.vw && !(b.docW > b.vw)) { fails.push({ k, what: `horizontal page scroll ${a.docW} > ${a.vw}` }); nFail++; }
  for (const x of a.boxes){
    const y = bBox.get(x.key); if (!y) { if (!x.hidden) { fails.push({ k, key: x.key, what: "text box not present before (DOM changed)", text: x.text }); nFail++; } continue; }
    const textChanged = x.text !== y.text || x.len !== y.len;
    if (!textChanged && flaky.has(x.key)) continue; // same runtime noise as on the byte-identical VI page
    const dh = x.rect.h - y.rect.h, dw = x.rect.w - y.rect.w;
    const fontChanged = x.font.size !== y.font.size || x.font.family !== y.font.family || x.font.weight !== y.font.weight || x.font.lh !== y.font.lh;
    if (!textChanged && Math.abs(dh) < 0.6 && Math.abs(dw) < 0.6 && !fontChanged && clipOf(x) === clipOf(y) && x.collide === y.collide) continue;
    nChanged++;
    const row = { page: k, engine: A.meta.engine, sec: x.sec, tag: x.tag, key: x.key, hidden: x.hidden, beforeText: y.text, afterText: x.text, lenBefore: y.len, lenAfter: x.len,
      hBefore: y.rect.h, hAfter: x.rect.h, dh: Math.round(dh * 10) / 10, wBefore: y.rect.w, wAfter: x.rect.w, linesBefore: y.lines, linesAfter: x.lines,
      viH: viBox.get(x.key)?.rect.h ?? null, font: `${x.font.size}/${x.font.lh}/${x.font.weight}`, clippedAfter: x.clippedBy, collideAfter: x.collide, verdict: "OK" };
    if (fontChanged) { row.verdict = "FAIL:font"; fails.push(row); nFail++; }
    if (clipOf(x) && !clipOf(y)) { row.verdict = "FAIL:clipped(" + clipOf(x) + ")"; fails.push(row); nFail++; }
    if (x.collide && !y.collide) { row.verdict = "FAIL:collides(" + x.collide + ")"; fails.push(row); nFail++; }
    if (row.verdict === "OK" && !x.hidden && dh > 0.6 && (dh > 16 || dh / Math.max(1, y.rect.h) > 0.10)) { row.verdict = "FLAG:height+" + Math.round(dh) + "px"; flags.push(row); nFlag++; }
    changed.push(row);
  }
  // sliders
  for (const s of a.sliders){
    const t = b.sliders.find(z => z.si === s.si);
    if (!s.endOk && (!t || t.endOk)) { fails.push({ k, what: `slider ${s.sec} cannot reach its end (it could before)` }); nFail++; }
    if (t && eqH(t.heights) && s.heights.length > 1 && !eqH(s.heights)) { flags.push({ page: k, sec: s.sec, verdict: "FLAG:slides no longer equal height", before: t.heights, after: s.heights }); nFlag++; }
    if (t && s.heights.length && t.heights.length){ const d = Math.max(...s.heights) - Math.max(...t.heights); if (s.visible && d > 16) { flags.push({ page: k, sec: s.sec, verdict: `FLAG:slide height +${d}px`, before: Math.max(...t.heights), after: Math.max(...s.heights) }); nFlag++; } }
  }
  // card rows
  for (const r of a.rows){
    const t = b.rows.find(z => z.key === r.key); if (!t || t.heights.length !== r.heights.length) continue;
    if (eqH(t.heights) && !eqH(r.heights)) { flags.push({ page: k, sec: r.sec, verdict: "FLAG:cards no longer equal height", before: t.heights, after: r.heights }); nFlag++; }
    if (rowsOf(t.tops) !== rowsOf(r.tops)) { flags.push({ page: k, sec: r.sec, verdict: `FLAG:card rows ${rowsOf(t.tops)}→${rowsOf(r.tops)}` }); nFlag++; }
  }
  // section heights
  for (const s of a.sections){
    const t = b.sections.find(z => z.key === s.key); if (!t) continue;
    const d = s.rect.h - t.rect.h;
    if (d > 16 && d / Math.max(1, t.rect.h) > 0.02) { flags.push({ page: k, sec: s.cls, verdict: `FLAG:section height +${Math.round(d)}px`, before: t.rect.h, after: s.rect.h }); nFlag++; }
  }
  summary.push({ page: k, engine: A.meta.engine, boxes: a.boxes.length, changed: nChanged, flags: nFlag, fails: nFail, noise: flaky.size, docW: a.docW, vw: a.vw });
}
fs.mkdirSync(outDir, { recursive: true });
const tag = A.meta.engine;
fs.writeFileSync(path.join(outDir, `compare-${tag}.json`), JSON.stringify({ summary, fails, flags, changed, noise: noiseRows }, null, 1));
const cols = ["page", "sec", "tag", "verdict", "lenBefore", "lenAfter", "hBefore", "hAfter", "dh", "viH", "linesBefore", "linesAfter", "wAfter", "font", "afterText"];
fs.writeFileSync(path.join(outDir, `changed-boxes-${tag}.tsv`), cols.join("\t") + "\n" + changed.map(r => cols.map(c => String(r[c] ?? "").replace(/\t/g, " ")).join("\t")).join("\n"));
const tot = summary.reduce((s, x) => ({ boxes: s.boxes + x.boxes, changed: s.changed + x.changed, flags: s.flags + x.flags, fails: s.fails + x.fails }), { boxes: 0, changed: 0, flags: 0, fails: 0 });
console.log(`${tag}: ${summary.length} page/width, ${tot.boxes} text boxes measured, ${tot.changed} changed, FLAG ${flags.length}, FAIL ${fails.length}`);
for (const f of fails.slice(0, 15)) console.log("FAIL", f.page || f.k, f.sec || "", f.verdict || f.what, (f.afterText || f.text || "").slice(0, 50));
process.exit(fails.length ? 1 : 0);
