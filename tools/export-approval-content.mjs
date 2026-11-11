// Export the owner-approval content (Privacy, Cookie, Careers list + roles; VI and EN) from a BUILT dist as
// Markdown, so the owner reviews exactly what the pages render. Read-only.
// Usage: node tools/export-approval-content.mjs <distDir> <outFile.md>
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { load } from "cheerio";
import { CAREER_JOBS, careerPath } from "../bioa-careers.mjs";

const [dist, out] = process.argv.slice(2);
if (!dist || !out){ console.error("usage: node tools/export-approval-content.mjs <distDir> <outFile.md>"); process.exit(2); }
const page = route => load(readFileSync(join(dist, route.replace(/^\//, ""), "index.html"), "utf8"));
const txt = (el, $) => $(el).text().replace(/\s+/g, " ").trim();
const md = [];

function policy(route){
  const $ = page(route);
  md.push(`\n## ${txt($(".policy-title").first(), $)} — \`${route}\`\n`);
  $("section.policy-wrapper").children().each((_, e) => {
    if (e.tagName === "h1") return;
    if (e.tagName === "h2"){ md.push(`\n### ${txt(e, $)}\n`); return; }
    const h = $(e).html().replace(/<br\s*\/?>/g, "\n").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/[ \t]+/g, " ").trim();
    md.push(h.split("\n").map(l => l.trim()).join("\n  ") + "\n");
  });
}

function careers(lang){
  const list = careerPath("/careers/", lang), $ = page(list);
  md.push(`\n## ${lang.toUpperCase()} Careers list — \`${list}\`\n`);
  md.push(`- Title: ${txt(".mwc-hero3__title", $)}\n- Intro: ${txt(".mwc-hero3__text", $)}\n- Buttons: ${txt(".mwc-hero3__actions .btn", $)} → ${$(".mwc-hero3__actions .btn").attr("href")} · ${txt(".mwc-hero3__scroll", $)}`);
  md.push(`- Roles block: ${txt(".mwc-roles__eyebrow", $)} / ${txt(".mwc-roles__title", $)} / ${txt(".mwc-roles__sub", $)}`);
  md.push(`- Filter: ${$(".mwc-filter__pill").map((_, e) => txt(e, $)).get().join(" · ")}`);
  md.push(`- CTA: ${txt(".mwc-cta__title", $)} — ${txt(".mwc-cta__text", $)} (${txt(".mwc-cta .mwc-hrcard__email", $)})\n`);
  for (const job of CAREER_JOBS){
    const r = careerPath(job.route, lang), d = page(r);
    md.push(`\n### ${txt(".mwc-single__title", d)} — \`${r}\``);
    md.push(`- Card text: ${job.t[lang].desc}`);
    md.push(`- Badges: ${txt(".mwc-pill--outline", d)} ⟵ **OWNER APPROVAL** · ${txt(".mwc-pill--solid", d)}`);
    md.push(`- ${txt(".mwc-intro__title", d)}: ${d(".mwc-intro p").map((_, e) => txt(e, d)).get().join(" ")}`);
    d(".mwc-two__card").each((_, c) => { md.push(`- **${txt(d(c).find(".mwc-two__title"), d)}**`); d(c).find("li").each((__, li) => md.push(`  - ${txt(li, d)}`)); });
    d(".mwc-single .mwc-section").each((_, s) => md.push(`- **${txt(d(s).find(".mwc-section__title"), d)}** ⟵ **OWNER APPROVAL**: ${d(s).find("p").map((__, p) => txt(p, d)).get().join(" ")}`));
    md.push(`- Back: ${txt(".mwc-back", d)} → ${d(".mwc-back").attr("href")} · CTA: ${txt(".mwc-final__btn", d)} → ${d(".mwc-final__btn").attr("href")}`);
  }
}

md.push("# BIO-A — content for OWNER approval (exported from the built pages)\n");
md.push("Fields marked **OWNER APPROVAL** are placeholders: salary, benefits, location, work type and the application channel were NOT invented.\n");
md.push("\n# 1. Privacy Policy and Cookie Policy\n");
for (const r of ["/privacy-policy/", "/en/privacy-policy/", "/cookie-policy/", "/en/cookie-policy/"]) policy(r);
md.push("\n# 2. Careers (sample roles, not confirmed openings)\n");
careers("vi"); careers("en");
writeFileSync(out, md.join("\n") + "\n");
console.log("exported", out);
