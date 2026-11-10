// P0A — generated HTML must equal the owner-reviewed Preview (abdd7602, commit d59f50d)
// on all 104 routes, except for the documented allowlist below. Read-only.
// BIOA_REFERENCE_DIR: captured Preview HTML (file name = route with non-word runs replaced by "_").
import { readFileSync, readdirSync, statSync, existsSync, writeFileSync } from "node:fs";
import path from "node:path";

// FIDELITY_DIST: historical mode runs against the frozen P0B1 snapshot (see package.json test:p0a:historical).
const dist = process.env.FIDELITY_DIST || "dist";
const ref = process.env.BIOA_REFERENCE_DIR;
if (!ref || !existsSync(ref)){ console.error("BIOA_REFERENCE_DIR missing: reference capture required"); process.exit(1); }

const routes = [];
(function walk(d){
  for (const f of readdirSync(d)){
    const p = path.join(d, f);
    if (statSync(p).isDirectory()){ if (f !== "assets") walk(p); }
    else if (f === "index.html"){ const r = path.relative(dist, d).split(path.sep).join("/"); routes.push(r ? "/" + r + "/" : "/"); }
  }
})(dist);

// ALLOWLIST — each entry is evidence-backed in docs/P0A_SOURCE_PIN.md.
const ALLOW = [
  // P0B1: the two runtime tags keep id/position/attributes; only their URL points to the pinned copy.
  ["P0B1 pinned runtime main.css/main.js URL", s => s
    .replace(/(<link\b[^>]*\bid="main-css"[^>]*\bhref=")[^"]*"/g, '$1MAIN_CSS"')
    .replace(/(<script\b[^>]*\bid="main-js"[^>]*\bsrc=")[^"]*"/g, '$1MAIN_JS"')],
  ["cache-buster ?ver=", s => s.replace(/([?&](?:#038;|amp;)?ver=)[0-9a-z.]+/gi, "$1V")],
  ["WordPress generator 7.1.2/7.1.3", s => s.replace(/content="WordPress [0-9.]+"/g, 'content="WordPress V"')],
  ["emoji release ver", s => s.replace(/wp-emoji-release\.min\.js\?ver=[0-9.]+/g, "wp-emoji-release.min.js?ver=V")],
  ["mw-guard TOKEN_URL inline script (dead host, request already fails)", s => s.replace(/<script>\(function\(\)\{\s*var TOKEN_URL[\s\S]*?<\/script>/g, "<script>TOKEN</script>")],
  ["Turnstile widget instance id", s => s.replace(/cf7-\d{5,}/g, "cf7-ID")],
  ["WordPress per-request nonce", s => s.replace(/(\\?"nonce\\?"\s*:\s*\\?")[0-9a-f]{10}/g, "$1N").replace(/(name="_wpnonce" value=")[0-9a-f]{10}/g, "$1N")],
  ["Cloudflare edge email obfuscation (Preview only)", s => s
    .replace(/<script[^>]*email-decode\.min\.js[^>]*><\/script>/g, "")
    .replace(/<a href="\/cdn-cgi\/l\/email-protection#[0-9a-f]+"[^>]*>[\s\S]*?<\/a>/g, "<a>EMAIL</a>")
    .replace(/<span class="__cf_email__"[^>]*>[\s\S]*?<\/span>/g, "EMAIL")
    .replace(/data-cfemail="[0-9a-f]+"/g, "")
    .replace(/\/cdn-cgi\/l\/email-protection#[0-9a-f]+/g, "E")],
];
const CAREERS = /^\/(en\/)?careers\/$/;
const BLOG_LIST = /^\/(en\/)?blog\/(page\/\d+\/)?$/;
// Blog listing: BIO-A replaces card image/alt but keeps the source <img width/height>,
// which differ because Merywood listed other posts on 2026-10-02 than on 2026-10-13.
// Guarded by tests/p0a-custom-pass-guard.mjs (geometry + screenshots of these routes).
const blogListDims = s => s.replace(/<img width="\d+" height="\d+"( src="\/assets\/blog\/[^"]+" class="attachment-large size-large wp-post-image")/g, '<img width="W" height="H"$1');

const styles = h => Object.fromEntries([...h.matchAll(/<style[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/style>/g)].map(m => [m[1], m[2]]));
const tokens = (h, route) => {
  let s = h.replace(/<style[^>]*>[\s\S]*?<\/style>/g, "").replace(/<!--[\s\S]*?-->/g, "");
  for (const [, fn] of ALLOW) s = fn(s);
  if (BLOG_LIST.test(route)) s = blogListDims(s);
  s = s.replace(/\s+/g, " ");
  const t = s.split(/(?=<)/);
  // Careers (not an owner-PASS route): source CSS/markup whitespace drift only.
  return CAREERS.test(route) ? t.map(x => x.replace(/\s+/g, "")).filter(Boolean) : t;
};
const bag = a => { const m = new Map(); for (const x of a) m.set(x, (m.get(x) || 0) + 1); return m; };

const report = []; let failed = 0;
for (const r of routes){
  const file = path.join(ref, r.replace(/\W+/g, "_") + ".html");
  if (!existsSync(file)){ failed++; report.push({ route: r, error: "no reference" }); continue; }
  const a = readFileSync(path.join(dist, r === "/" ? "index.html" : r.slice(1) + "index.html"), "utf8");
  const b = readFileSync(file, "utf8");
  const sa = styles(a), sb = styles(b);
  const styleDiff = [...new Set([...Object.keys(sa), ...Object.keys(sb)])].filter(k => sa[k] !== sb[k] && !(CAREERS.test(r) && k === "mwc-style-inline-css"));
  const A = bag(tokens(a, r)), B = bag(tokens(b, r));
  const onlyBuild = [...A].filter(([k, n]) => n > (B.get(k) || 0)).map(([k]) => k.slice(0, 160));
  const onlyRef = [...B].filter(([k, n]) => n > (A.get(k) || 0)).map(([k]) => k.slice(0, 160));
  const ok = !styleDiff.length && !onlyBuild.length && !onlyRef.length;
  if (!ok) failed++;
  report.push({ route: r, ok, styleDiff, onlyBuild: onlyBuild.slice(0, 8), onlyRef: onlyRef.slice(0, 8) });
}
const out = process.env.BIOA_REPORTS ? path.join(process.env.BIOA_REPORTS, "p0a-fidelity-allowlist.json") : null;
if (out) writeFileSync(out, JSON.stringify({ allow: ALLOW.map(a => a[0]), routes: report.length, failed, report }, null, 2));
for (const x of report.filter(x => !x.ok).slice(0, 12)) console.log("DIFF", JSON.stringify(x).slice(0, 700));
console.log(`P0A fidelity: ${report.length - failed}/${report.length} routes match reference within allowlist`);
if (failed || report.length !== 104) process.exit(1);
