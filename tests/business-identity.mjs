// Business identity gate: every built public page uses only the canonical BIO-A
// contact data (bioa-business.mjs) and exposes no Merywood mailbox, also not
// behind Cloudflare e-mail obfuscation. Run after `npm run build`.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { load } from "cheerio";
import { BUSINESS } from "../bioa-business.mjs";

const ALLOWED_MAIL = new Set([BUSINESS.email, "lead@bioagroup.vn" /* hidden CF7 compat field, never shown */,
  "info@aki.ee" /* Estonian DPA inside the Merywood policy text = owner gate LEGAL-1 */]);
const cf = h => { const k = parseInt(h.slice(0, 2), 16); let s = ""; for (let i = 2; i < h.length; i += 2) s += String.fromCharCode(parseInt(h.slice(i, i + 2), 16) ^ k); return s; };
const pages = []; (function w(d){ for (const f of readdirSync(d)){ const p = join(d, f); if (statSync(p).isDirectory()){ if (f !== "assets") w(p); } else if (f.endsWith(".html")) pages.push(p); } })("dist");
const fails = [];
for (const p of pages){
  const html = readFileSync(p, "utf8"), $ = load(html);
  const mails = [...html.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g)].map(m => m[0]).filter(m => !/\.(webp|png|svg|jpe?g|gif|css|js)$/i.test(m));
  $("[data-cfemail]").each((_, e) => mails.push(cf($(e).attr("data-cfemail"))));
  $('a[href^="/cdn-cgi/l/email-protection#"]').each((_, e) => mails.push(cf($(e).attr("href").split("#")[1])));
  for (const m of mails) if (!ALLOWED_MAIL.has(m)) fails.push(p + ": e-mail " + m);
  $('a[href^="tel:"]').each((_, e) => { if ($(e).attr("href") !== BUSINESS.phoneHref) fails.push(p + ": tel " + $(e).attr("href")); });
  $('a[href*="zalo.me"]').each((_, e) => { if (!$(e).attr("href").startsWith(BUSINESS.zalo)) fails.push(p + ": zalo " + $(e).attr("href")); });
  $("meta[content]").each((_, e) => { const c = $(e).attr("content"); if (/merywood\.com/i.test(c)) fails.push(p + ": meta " + ($(e).attr("property") || $(e).attr("name")) + " -> " + c); });
  $("link[href]").each((_, e) => { const rel = ($(e).attr("rel") || "").toLowerCase(); if (/merywood\.com/i.test($(e).attr("href")) && rel !== "stylesheet" && rel !== "preconnect" && rel !== "dns-prefetch") fails.push(p + ": link rel=" + rel + " -> " + $(e).attr("href")); });
  $('a[href*="facebook.com/sharer"]').each((_, e) => { if (/merywood/i.test($(e).attr("href"))) fails.push(p + ": share " + $(e).attr("href")); });
  $('script[type="application/ld+json"]').each((_, e) => { const t = $(e).html();
    if (/telephone/.test(t) && !t.includes(BUSINESS.phoneIntl)) fails.push(p + ": JSON-LD telephone");
    if (/taxID/.test(t) && !t.includes(BUSINESS.taxId)) fails.push(p + ": JSON-LD taxID"); });
}
const contacts = readFileSync("dist/contacts/index.html", "utf8");
for (const v of [BUSINESS.email, BUSINESS.phone, BUSINESS.taxId, BUSINESS.addressVi]) if (!contacts.includes(v)) fails.push("contacts VI missing " + v);
console.log("business identity: pages " + pages.length + ", failures " + fails.length);
for (const f of fails.slice(0, 40)) console.log("  FAIL " + f);
process.exit(fails.length ? 1 : 0);
