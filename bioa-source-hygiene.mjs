// CLEANUP-1 (owner directive 2026-11-11): the Merywood source HTML and pinned main.js carry Russian
// developer comments (CSS/JS/HTML) and one Russian accessible name (CF7 form aria-label "Контактная форма").
// This pass removes ONLY comments that contain Cyrillic and localizes the aria-label. Code, selectors (.mw-*),
// DOM, licence/provenance notes and every non-Cyrillic comment are untouched. Fail-closed:
//   - every removed span is verified to be a comment (starts with // or /*);
//   - a script that compiled before must still compile after (vm.Script);
//   - no Cyrillic may remain in the output.
import vm from "node:vm";

const CYR = /[Ѐ-ӿ]/;

// Scan JS and return comment spans [start, end, text]. Handles '…', "…", `…${…}…` (nested), regex literals.
function jsComments(code){
  const out = []; let i = 0, n = code.length, lastSig = "";
  const regexAllowed = () => lastSig === "" || /[(,=:[!&|?{};+\-*%<>~^]$/.test(lastSig) || /\b(return|typeof|case|do|else|in|of|void|yield|await|delete|throw|new)$/.test(lastSig);
  const tplStack = [];
  while (i < n){
    const c = code[i], d = code[i + 1];
    if (c === "/" && d === "/"){ let j = code.indexOf("\n", i); if (j < 0) j = n; out.push([i, j, code.slice(i, j)]); i = j; continue; }
    if (c === "/" && d === "*"){ let j = code.indexOf("*/", i + 2); j = j < 0 ? n : j + 2; out.push([i, j, code.slice(i, j)]); i = j; continue; }
    if (c === "'" || c === '"'){ let j = i + 1; while (j < n && code[j] !== c){ if (code[j] === "\\") j++; if (code[j] === "\n") break; j++; } i = j + 1; lastSig = "x"; continue; }
    if (c === "`" || (c === "}" && tplStack.length && tplStack[tplStack.length - 1] === 0)){
      if (c === "}") tplStack.pop();
      let j = i + 1;
      for (;;){ if (j >= n) break; if (code[j] === "\\"){ j += 2; continue; } if (code[j] === "`"){ j++; break; } if (code[j] === "$" && code[j + 1] === "{"){ tplStack.push(0); j += 2; break; } j++; }
      i = j; lastSig = "x"; continue;
    }
    if (c === "{" && tplStack.length){ tplStack[tplStack.length - 1]++; }
    if (c === "}" && tplStack.length && tplStack[tplStack.length - 1] > 0){ tplStack[tplStack.length - 1]--; }
    if (c === "/" && regexAllowed()){
      let j = i + 1, cls = false;
      while (j < n){ const ch = code[j]; if (ch === "\\"){ j += 2; continue; } if (ch === "\n") break; if (ch === "[") cls = true; else if (ch === "]") cls = false; else if (ch === "/" && !cls) break; j++; }
      j++; while (j < n && /[a-z]/i.test(code[j])) j++;
      i = j; lastSig = "x"; continue;
    }
    if (!/\s/.test(c)){ const m = code.slice(i).match(/^[A-Za-z_$][\w$]*/); if (m){ lastSig = m[0]; i += m[0].length; continue; } lastSig = c; }
    i++;
  }
  return out;
}
const compiles = code => { try { new vm.Script(code); return true; } catch { return false; } };

export function stripCyrillicJsComments(code, label = "script"){
  if (!CYR.test(code)) return code;
  const spans = jsComments(code).filter(([, , t]) => CYR.test(t));
  let out = "", at = 0;
  for (const [s, e, t] of spans){
    if (!/^(\/\/|\/\*)/.test(t)) throw new Error("CLEANUP-1: non-comment span in " + label);
    out += code.slice(at, s) + (t.startsWith("/*") && /\n/.test(t) ? "\n" : ""); at = e;
  }
  out += code.slice(at);
  if (compiles(code) && !compiles(out)) throw new Error("CLEANUP-1: " + label + " no longer compiles after comment removal");
  return out;
}

export function stripCyrillicCssComments(css){
  if (!CYR.test(css)) return css;
  let out = "", i = 0, q = null;
  while (i < css.length){
    const c = css[i];
    if (q){ out += c; if (c === "\\"){ out += css[i + 1] || ""; i += 2; continue; } if (c === q) q = null; i++; continue; }
    if (c === '"' || c === "'"){ q = c; out += c; i++; continue; }
    if (c === "/" && css[i + 1] === "*"){ let j = css.indexOf("*/", i + 2); j = j < 0 ? css.length : j + 2; const t = css.slice(i, j); if (!CYR.test(t)) out += t; i = j; continue; }
    out += c; i++;
  }
  return out;
}

const ARIA = { "Контактная форма": { vi: "Biểu mẫu liên hệ", en: "Contact form" } };

// Leftover markers of Merywood/WordPress plugins and removed trackers: HTML comments only, no code behind them.
// Neutral structure comments (Banner, Preferences modal, smooth-scrollbar start/end, section markers) are kept.
export const isTraceComment = t => /[Ѐ-ӿ]|Merywood|Yoast|Yandex\.Metrika|Google Tag Manager|Dashly/i.test(t || "");
export function removeTraceMarkup($){
  $("*").contents().each((_, n) => { if (n.type === "comment" && isTraceComment(n.data)) $(n).remove(); });
  $('meta[name="generator"]').filter((_, e) => /wordpress/i.test($(e).attr("content") || "")).remove();
}

export function applySourceHygiene($, lang, label){
  $("style").each((_, e) => { const t = $(e).html(); if (t && CYR.test(t)) $(e).html(stripCyrillicCssComments(t)); });
  $("script").each((_, e) => {
    if ($(e).attr("src")) return;
    const type = ($(e).attr("type") || "").toLowerCase();
    if (type && !/javascript|module/.test(type)) return; // JSON-LD etc. carry no comments
    const t = $(e).html(); if (t && CYR.test(t)) $(e).html(stripCyrillicJsComments(t, label + " inline script"));
  });
  removeTraceMarkup($);
  $("[aria-label]").each((_, e) => { const v = $(e).attr("aria-label"); if (ARIA[v]) $(e).attr("aria-label", ARIA[v][lang === "en" ? "en" : "vi"]); });
  const left = $.html().match(/.{0,60}[Ѐ-ӿ].{0,60}/);
  if (left) throw new Error("CLEANUP-1: Cyrillic left in " + label + ": " + left[0]);
}

// CF7-JS-1 (owner directive 2026-11-11 "remove unused CF7 code only when proven harmless"): the BIO-A form
// (assets/js/bioa-leads.js) handles submit itself (preventDefault + POST /api/lead). The two Contact Form 7
// scripts loaded live from merywood.com were never needed for that path; their schema fetch to the invalid
// host "Bio-A Group.com" raised the T2 page error on every page. Measured before removal: with only these
// two scripts blocked the quote modal rendered identically and the form behaved identically (12 route x width
// cases; tests/cf7-js-removal-proof.mjs). CF7 CSS stays: it shapes the owner-PASS modal (removing it changes
// the modal height), and the inline helpers (#contact-form-7-js-before/-after) stay untouched.
export function removeUnusedCf7Scripts($, label){
  const hasForm = $("form.wpcf7-form").length > 0;
  if (hasForm && !$('script[src*="/assets/js/bioa-leads.js"]').length) throw new Error("CF7-JS-1: form without bioa-leads.js on " + label);
  $("script#contact-form-7-js, script#swv-js").remove();
}
