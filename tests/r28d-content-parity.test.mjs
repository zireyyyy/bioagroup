// R28d-D MANUAL VI/EN (owner 2026-11-23: no auto-translation; both languages edited by hand).
// A page text whose Vietnamese changed while its English is still the original must be flagged (waitingEn) and must
// block a Production release; English-only fixes and complete VI+EN edits pass. Offline: Sanity HTTP is faked.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { liveSnapshot, staleEnTexts } from "../tools/cms-snapshot.mjs";

const registry = { pages: { home: { images: [], texts: [
  { id: "t_a", vi: "Bio-A Group đồng hành cùng thương hiệu", en: "Bio-A Group supports brands", maxVi: 200, maxEn: 200, multiline: false },
  { id: "t_b", vi: "Quy trình hợp tác", en: "How we work", maxVi: 200, maxEn: 200, multiline: false },
  { id: "t_c", vi: "Kiểm soát chất lượng", en: "Quality control", maxVi: 200, maxEn: 200, multiline: false },
  { id: "t_d", vi: "Mỹ phẩm", en: "Cosmetics", maxVi: 200, maxEn: 200, multiline: false },
  { id: "t_e", vi: "Hồ sơ", en: "Documentation", maxVi: 200, maxEn: 200, multiline: false },
] } } };

async function snap(pageDoc){
  const data = { images: [], pages: [pageDoc], blog: [], careers: [], seo: [], legal: [] };
  const real = globalThis.fetch, warn = console.warn;
  const warnings = [];
  globalThis.fetch = async () => new Response(JSON.stringify({ result: data }), { status: 200 });
  console.warn = (...a) => warnings.push(a.join(" "));
  const out = fs.mkdtempSync(path.join(os.tmpdir(), "bioa-r28d-parity-"));
  try { return { s: await liveSnapshot({ pid: "hfmu7ifg", token: "t", outDir: out, registry }), warnings }; }
  finally { globalThis.fetch = real; console.warn = warn; fs.rmSync(out, { recursive: true, force: true }); }
}

test("VI changed + EN still original (or empty) is flagged and not releasable; complete or EN-only edits pass", async () => {
  const { s, warnings } = await snap({ _type: "page_home",
    t_a: { vi: "Bio-A Group đồng hành cùng thương hiệu từ R&D đến thành phẩm", en: "Bio-A Group supports brands" }, // VI edited, EN stale
    t_b: { vi: "Quy trình hợp tác trọn gói", en: "Full-cycle partnership" },                                      // both edited
    t_c: { vi: "Kiểm soát chất lượng", en: "Quality control at every stage" },                                     // EN-only parity fix
    t_d: { vi: "Mỹ phẩm", en: "Cosmetics" },                                                                       // unchanged
    t_e: { vi: "Hồ sơ sản phẩm" },                                                                                 // VI edited, EN missing
  });
  assert.deepEqual(s.waitingEn.sort(), ["text:home.t_a", "text:home.t_e"]);
  assert.deepEqual(staleEnTexts(s).sort(), ["text:home.t_a", "text:home.t_e"]);
  assert.equal(warnings.filter((w) => /English not updated/.test(w)).length, 2);
  // The Preview still renders what was published (editors review there); only the release is blocked.
  assert.equal(s.texts.home.t_a.vi, "Bio-A Group đồng hành cùng thương hiệu từ R&D đến thành phẩm");
});

test("whitespace-only VI differences are not treated as a change", async () => {
  const { s } = await snap({ _type: "page_home", t_a: { vi: "  Bio-A Group   đồng hành cùng thương hiệu ", en: "Bio-A Group supports brands" } });
  assert.deepEqual(staleEnTexts(s), []);
});

test("non-text waiting items (blog/career/image held out) do not count as stale page texts", () => {
  assert.deepEqual(staleEnTexts({ waitingEn: ["blog:x", "career:/y/", "image:z", "text:home.t_a"] }), ["text:home.t_a"]);
  assert.deepEqual(staleEnTexts({}), []);
});

test("cms-release refuses a release while a page text is stale (source wiring)", () => {
  const src = fs.readFileSync("tools/cms-release.mjs", "utf8");
  assert.match(src, /staleEnTexts\(s\)/);
  assert.match(src, /release refused: Vietnamese changed but English not updated/);
  assert.ok(src.indexOf("staleEnTexts(s)") < src.indexOf("packRelease(tmp)"), "the check runs before the archive is written");
});
