// BIO-A permanent single-ZIP handoff (AGENTS.md "Single-ZIP review handoff").
// Builds exactly ONE review ZIP for the ChatGPT Technical Reviewer:
//   <out>/BIOA_<PHASE>_<HEAD>_REVIEW.zip
// Contents: README (status), git commit log + diffstat + full diff + per-commit patches (base..HEAD),
// handoff/ledger/checklist/rollback docs, RUNTIME_HANDOFF, test + browser evidence (logs/JSON),
// representative screenshots, secret/source scan report, SHA256SUMS.txt.
// Never included: dist/, source bundles, Merywood HTML/CSS/JS/images, preview HTML dumps, node_modules,
// env files. Fails closed on a dirty tree, a secret hit, or a Merywood-source hit. Verifies the written
// ZIP by reading every entry back and checking it against the manifest.
//
// Usage (from the repo root):
//   node tools/make-handoff-zip.mjs --phase FINAL-TECH-CLOSURE --status "OWNER QA READY" \
//     --evidence D:/BIOA_WORKSPACE/_reports/final [--evidence <dir> ...] [--base d59f50d] \
//     [--include <file> ...] [--runtime-handoff D:/BIOA_WORKSPACE/RUNTIME_HANDOFF.md] [--out D:/BIOA_WORKSPACE/_handoffs]
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from "node:fs";
import { join, relative, sep, basename, extname } from "node:path";
import { createHash } from "node:crypto";
import { deflateRawSync } from "node:zlib";
import { readZipEntries } from "./source-bundle.mjs";

// ---------- args ----------
const args = { evidence: [], include: [] };
for (let i = 2; i < process.argv.length; i += 2){
  const k = process.argv[i].replace(/^--/, ""), v = process.argv[i + 1];
  if (k === "evidence" || k === "include") args[k].push(v); else args[k] = v;
}
if (!args.phase || !args.status){ console.error("required: --phase <NAME> --status <\"OWNER QA READY\" | \"BLOCKED: ...\" | \"FAIL: ...\">"); process.exit(2); }
const PHASE = args.phase.toUpperCase().replace(/[^A-Z0-9-]+/g, "-");
const BASE = args.base || "d59f50d3884e66e6ae19c3b2b105bc0c4e368535";
const OUT = args.out || "D:/BIOA_WORKSPACE/_handoffs";
const RUNTIME = args["runtime-handoff"] || "D:/BIOA_WORKSPACE/RUNTIME_HANDOFF.md";
const git = (...a) => execFileSync("git", a, { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });

if (git("status", "--porcelain").trim() && args["allow-dirty"] !== "yes"){ console.error("REFUSED: working tree not clean; commit first so the ZIP matches HEAD"); process.exit(1); }
const HEAD = git("rev-parse", "HEAD").trim(), HEAD7 = HEAD.slice(0, 7);
const BRANCH = git("rev-parse", "--abbrev-ref", "HEAD").trim();
const ROOT = `BIOA_${PHASE}_${HEAD7}_REVIEW`;
const entries = new Map();   // zip path -> Buffer
const add = (p, data) => entries.set(ROOT + "/" + p.split(sep).join("/"), Buffer.isBuffer(data) ? data : Buffer.from(data, "utf8"));

// ---------- git ----------
add("git/commit-log.txt", git("log", "--format=commit %H%nDate:   %aI%n%n%B%n----", BASE + "..HEAD"));
add("git/diffstat.txt", git("diff", "--stat", BASE, "HEAD"));
add("git/full.diff", git("diff", BASE, "HEAD"));
const shas = git("rev-list", "--reverse", BASE + "..HEAD").trim().split("\n").filter(Boolean);
shas.forEach((sha, i) => add(`git/patches/${String(i + 1).padStart(4, "0")}-${sha.slice(0, 7)}.patch`, git("format-patch", "-1", "--stdout", sha)));

// ---------- docs ----------
const DOCS = ["AGENTS.md", "FULL_HANDOFF.md", "START_HERE.md", "NEW_CHAT_CONTINUATION_PROMPT.md", "docs/OWNER_ISSUE_LEDGER.md", "docs/OWNER_QA_CHECKLIST.md",
  "docs/RELEASE_ROLLBACK_PLAN.md", "docs/LEGAL_CONTENT_BLOCKERS.md", "docs/RUNTIME_DEPENDENCIES.md", "docs/P0A_SOURCE_PIN.md", "docs/P0B1_RUNTIME_PIN.md",
  "docs/BUSINESS_IDENTITY.md", "docs/CHAT_AI_INTEGRATION.md"];
for (const d of DOCS) if (existsSync(d)) add("docs/" + basename(d), readFileSync(d));
if (existsSync(RUNTIME)) add("docs/RUNTIME_HANDOFF.md", readFileSync(RUNTIME)); else console.warn("WARN: runtime handoff not found:", RUNTIME);

// ---------- evidence ----------
const EXCLUDE_DIR = /(^|[\\/])(dist[^\\/]*|_source_bundle|source_bundle|runtime-libs|preview-[^\\/]*-html|node_modules|negctl-dist|BIOA_SOURCE_ORIGINAL)([\\/]|$)/i;
// Representative screenshots: key route families at Mobile / Tablet / Desktop (VI + EN Home), and every
// screenshot pair the deep guard kept because it differed (so a reviewer sees each flagged diff).
const REP = /^(_|_en_|_about_|_contract-manufacturing-cosmetics_|_dich-vu-khac_|_blog_|_contacts_|_khong-co-trang-nay_|_careers_|_privacy-policy_)-(390|834|1440)\.png$/;
const MAX_TEXT = 4 * 1024 * 1024, MAX_PNG = 1.5 * 1024 * 1024;
const evidenceLog = [];
for (const dir of args.evidence){
  if (!existsSync(dir)){ console.error("REFUSED: evidence dir missing " + dir); process.exit(1); }
  const label = basename(dir);
  (function walk(d){
    for (const f of readdirSync(d)){
      const p = join(d, f), rel = relative(dir, p);
      if (EXCLUDE_DIR.test(rel)) continue;
      const st = statSync(p);
      if (st.isDirectory()){ walk(p); continue; }
      const ext = extname(f).toLowerCase();
      let take = false;
      if ([".log", ".txt", ".json"].includes(ext) && st.size <= MAX_TEXT) take = true;
      if (ext === ".png" && st.size <= MAX_PNG && (REP.test(f) || /^guard/.test(rel.split(sep)[0]) && /-(local|ref)\.png$/.test(f))) take = true;
      if (take){ add(`evidence/${label}/${rel}`, readFileSync(p)); evidenceLog.push(`${label}/${rel}`); }
    }
  })(dir);
}

// Single extra evidence files (--include <file>, repeatable): same type rules as evidence dirs.
for (const f of [].concat(args.include || [])){
  if (!existsSync(f)){ console.error("REFUSED: include missing " + f); process.exit(1); }
  if (EXCLUDE_DIR.test(f)){ console.error("REFUSED: include path is excluded " + f); process.exit(1); }
  add("evidence/extra/" + basename(f), readFileSync(f)); evidenceLog.push("extra/" + basename(f));
}

// ---------- scans (fail closed) ----------
const SECRET = [
  [/ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}/, "GitHub token"],
  [/\bsk-[A-Za-z0-9_-]{20,}/, "API secret key"],
  [/AKIA[0-9A-Z]{16}/, "AWS key"],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, "private key"],
  // Written so that this source line (shipped inside the diff) does not match itself.
  [/X-Amz-Signatur[e]=[0-9a-f]{16,}|[?&](sig|signature|token)=[A-Za-z0-9%._-]{24,}/i, "signed URL"],
  [/\b(api[_-]?key|secret|client[_-]?secret|password|passwd|auth[_-]?token|access[_-]?token|bearer)\b\s*["']?\s*[:=]\s*["'][^"'\s]{12,}["']/i, "credential assignment"],
  [/\bBearer\s+[A-Za-z0-9._-]{24,}/, "bearer token"],
  [/(CLOUDFLARE_API_TOKEN|RESEND_API_KEY|TURNSTILE_SECRET(_KEY)?|SHEETS?_[A-Z_]*KEY)\s*[=:]\s*["']?[A-Za-z0-9._-]{16,}/, "deployment secret value"]
];
// Cloudflare's published Turnstile TEST keys are public documentation values.
const PUBLIC_OK = /^(1x0000000000000000000000000000000AA|2x0000000000000000000000000000000AA|1x00000000000000000000AA|2x00000000000000000000AB|3x00000000000000000000FF)$/;
const MERYWOOD_SOURCE = /<html[\s>][\s\S]{0,4000}wp-content\/themes\/mery-wood|@font-face[\s\S]{0,400}mery-wood|\/\*![^*]*Swiper[\s\S]{0,200}\*\//i;
const scan = [], emails = new Set();
for (const [name, buf] of entries){
  const ext = extname(name).toLowerCase();
  if ([".html", ".htm", ".css", ".js", ".mjs", ".webp", ".jpg", ".jpeg", ".svg", ".ttf", ".woff", ".woff2", ".zip", ".txt.gz"].includes(ext)) scan.push(["BLOCK", name, "file type not allowed in review ZIP"]);
  if (ext === ".png") continue;
  const text = buf.toString("utf8");
  for (const [re, what] of SECRET){ const m = text.match(re); if (m && !PUBLIC_OK.test(m[0].replace(/^.*[=:]\s*["']?/, "").replace(/["']$/, ""))) scan.push(["BLOCK", name, what + ": " + m[0].slice(0, 12) + "…"]); }
  if (!/\.(patch|diff)$/.test(name) && MERYWOOD_SOURCE.test(text)) scan.push(["BLOCK", name, "looks like Merywood source content"]);
  for (const m of text.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g)) emails.add(m[0].toLowerCase());
}
const KNOWN_EMAILS = /^(zireyyyy@gmail\.com|noreply@anthropic\.com|contact@bioagroup\.vn|info@merywood\.ee|info@aki\.ee)$/;
const unknownEmails = [...emails].filter(e => !KNOWN_EMAILS.test(e) && !/@(example\.(com|org)|test|localhost)$/.test(e) && !/\.(png|svg|webp|js|css)$/.test(e));
for (const e of unknownEmails) scan.push(["REVIEW", "(all)", "email address present: " + e]);
const blocks = scan.filter(s => s[0] === "BLOCK");
if (blocks.length){ for (const b of blocks) console.error(b.join(" | ")); console.error("REFUSED: " + blocks.length + " blocking scan hit(s); nothing written"); process.exit(1); }

// ---------- README + manifest ----------
const now = new Date().toISOString();
const readme = `# ${ROOT}

| Field | Value |
|---|---|
| Phase | ${PHASE} |
| **Status** | **${args.status}** |
| Repository | zireyyyy/bioagroup (local only, not pushed) |
| Branch | ${BRANCH} |
| HEAD | ${HEAD} |
| Base | ${BASE} |
| Commits in range | ${shas.length} |
| Generated | ${now} |

Status is the developer's technical status. OWNER VISUAL PASS and release are never declared here.

## Contents
- \`docs/\` — FULL_HANDOFF (current snapshot), RUNTIME_HANDOFF (resume file), OWNER_ISSUE_LEDGER, OWNER_QA_CHECKLIST, RELEASE_ROLLBACK_PLAN, LEGAL_CONTENT_BLOCKERS, RUNTIME_DEPENDENCIES, AGENTS and source-pin notes.
- \`git/\` — commit-log.txt, diffstat.txt, full.diff (${BASE.slice(0, 7)}..${HEAD7}), patches/ (one per commit, \`git am\`-able).
- \`evidence/\` — test and browser logs/JSON (${evidenceLog.filter(x => !x.endsWith(".png")).length} files) and ${evidenceLog.filter(x => x.endsWith(".png")).length} screenshots (representative route families at 390/834/1440 + every deep-guard local/ref pair that differed).
- \`SCAN.txt\` — secret / Merywood-source / personal-data scan result.
- \`SHA256SUMS.txt\` — SHA-256 of every file in this ZIP (verify: \`sha256sum -c SHA256SUMS.txt\` inside the extracted folder).

## Deliberately excluded
Built site (\`dist/\`), private Merywood source bundle, Merywood HTML/CSS/JS/fonts/images, approved-Preview HTML dumps, downloaded third-party libraries, node_modules, environment files, tokens/secrets.
`;
add("README.md", readme);
add("SCAN.txt", `Secret / Merywood-source scan over ${entries.size} files: ${blocks.length} blocking hits.\n` +
  `Emails present (expected: owner git identity, AI co-author, BIO-A contact, the Merywood/Estonian addresses quoted as LEGAL-1 evidence):\n` +
  [...emails].sort().map(e => "  " + e).join("\n") + "\n" + (scan.length ? scan.map(s => s.join(" | ")).join("\n") + "\n" : "No review items.\n"));
const sums = [...entries].sort(([a], [b]) => a.localeCompare(b)).map(([n, b]) => createHash("sha256").update(b).digest("hex") + "  " + n.slice(ROOT.length + 1)).join("\n") + "\n";
add("SHA256SUMS.txt", sums);

// ---------- ZIP writer (deflate, UTF-8 names) ----------
const CRC = new Int32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c; });
const crc32 = b => { let c = -1; for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; };
const d = new Date(), dosTime = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1), dosDate = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
const locals = [], centrals = []; let offset = 0;
for (const [name, data] of entries){
  const nameBuf = Buffer.from(name, "utf8"), comp = deflateRawSync(data, { level: 9 }), crc = crc32(data);
  const lh = Buffer.alloc(30); lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0x0800, 6); lh.writeUInt16LE(8, 8);
  lh.writeUInt16LE(dosTime, 10); lh.writeUInt16LE(dosDate, 12); lh.writeUInt32LE(crc, 14); lh.writeUInt32LE(comp.length, 18); lh.writeUInt32LE(data.length, 22); lh.writeUInt16LE(nameBuf.length, 26);
  const ch = Buffer.alloc(46); ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(0x0800, 8); ch.writeUInt16LE(8, 10);
  ch.writeUInt16LE(dosTime, 12); ch.writeUInt16LE(dosDate, 14); ch.writeUInt32LE(crc, 16); ch.writeUInt32LE(comp.length, 20); ch.writeUInt32LE(data.length, 24); ch.writeUInt16LE(nameBuf.length, 28); ch.writeUInt32LE(offset, 42);
  locals.push(lh, nameBuf, comp); centrals.push(ch, nameBuf); offset += 30 + nameBuf.length + comp.length;
}
const cd = Buffer.concat(centrals), eocd = Buffer.alloc(22);
eocd.writeUInt32LE(0x06054b50, 0); eocd.writeUInt16LE(entries.size, 8); eocd.writeUInt16LE(entries.size, 10); eocd.writeUInt32LE(cd.length, 12); eocd.writeUInt32LE(offset, 16);
const zip = Buffer.concat([...locals, cd, eocd]);
if (zip.length > 0xffffffff || entries.size > 0xffff){ console.error("REFUSED: ZIP64 not supported; reduce evidence"); process.exit(1); }
mkdirSync(OUT, { recursive: true });
const zipPath = join(OUT, ROOT + ".zip");
writeFileSync(zipPath, zip);

// ---------- verify by reading back ----------
const back = readZipEntries(readFileSync(zipPath), new Set(entries.keys()));
let bad = 0;
for (const [n, b] of entries) if (!back.has(n) || !back.get(n).equals(b)) bad++;
const manifestOk = sums.trim().split("\n").every(l => { const [h, ...rest] = l.split("  "); const n = ROOT + "/" + rest.join("  "); return back.has(n) && createHash("sha256").update(back.get(n)).digest("hex") === h; });
if (bad || !manifestOk){ console.error("VERIFY FAILED: " + bad + " entries differ; manifest ok=" + manifestOk); process.exit(1); }
const zipSha = createHash("sha256").update(zip).digest("hex");
console.log(`ZIP written: ${zipPath}`);
console.log(`entries ${entries.size} · size ${(zip.length / 1048576).toFixed(2)} MB · read-back ${entries.size}/${entries.size} OK · SHA256SUMS OK`);
console.log(`ZIP SHA-256: ${zipSha}`);
console.log(`scan: 0 blocking, ${scan.length} review item(s); emails: ${[...emails].sort().join(", ")}`);
