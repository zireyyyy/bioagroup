# R27 — Result per item

Developer technical status only. An **OWNER PASS** can be given only by the owner after UAT (`OWNER_UAT.md`).

| Item | Status | Direct evidence |
|---|---|---|
| **F01** Footer EN clipped at narrow widths | **PASS** | Reproduced on R26: the Footer "Services" column ran to x = 325 on a 312 px viewport and x = 329 on 320 px (`browser-defects-r26-negative.json`: 8 Footer failures on R26). R27: `tests/r27-browser-defects.mjs` 72/72 locally and 72/72 on the real Preview. Footer checked on 6 routes × 312@125 %, 320, 360, 375, 390, 768, 1024, 1152@125 %, 1440, 1920 |
| **F02** Quote modal does not close with Esc | **PASS** | Same test, 5 cases (390 / 834 / 1440, VI/EN, Home, Contacts, Cosmetics): Esc closes the active modal, focus starts inside the dialog, Tab stays inside (25 presses), focus returns to the opener, scroll position kept (±2 px), typed text kept on reopen, second Esc closes again, close button still works, 0 lead requests. On R26 all 5 cases fail. The Preview E2E flow now reports "ESC closes: true" |
| **F03** Sample testimonials on Home | **PASS** | Home reviews block (VI/EN, desktop and mobile, 12 cards) removed. `tests/r27-content-audit.mjs` fails if `.block-reviews` reappears on Home, if "Sample testimonial / to be updated / Khách hàng Bio-A Group" appears on any page, or if any Review/AggregateRating schema appears (none before or after). Sanity: the 9 old testimonial slots were removed (unedited orphans); an injected stale testimonial value is ignored by the build (`cms-modes.txt`). Spacing: the sections before and after keep the usual 128 px gap at 1440 (measured) |
| **F04** `www.bioagroup.vn` 522 | **PASS** | Cause: proxied `www` not registered with Pages. Fixes: (1) `www.bioagroup.vn` added as a Pages custom domain (active, valid certificate); (2) Production middleware 301 → apex with path + query. Live: http→https→apex in 2 hops, no loop, apex 503 maintenance, `/api` 503. `DEPLOY_ROLLBACK.md` §2 |
| Content cleanup (sample labels, MOQ, careers, chat, alts, serum title) | **PASS (technical)** | `CONTENT_INVENTORY.md`, `CONTENT_SEO_CHANGELOG.md`. `tests/r27-content-audit.mjs` PASS on the R27 build; on the R26 build it reports the old defects |
| Blog: templated content | **PASS (technical) / OWNER INPUT PENDING** | 29/38 articles pending rewrite: URL 200, `noindex, follow`, out of list/nav/sitemap. Retired index pages 3–6 redirect to `/blog/`. Studio switch `rewriteApproved` tested (listed again + in sitemap). Rewrite decision per article: OWNER_CONTENT_INPUTS #6 |
| SEO | **PASS (technical)** | 40 indexable pages: unique titles and descriptions, self canonical on the apex, hreflang reciprocal, sitemap = indexable pages, no rating schema, no broken internal links (R26 + R27 audits). Production stays `noindex` behind maintenance |
| Legal pages | **OWNER INPUTS PENDING** | Not changed. No legal data invented (OWNER_CONTENT_INPUTS #1) |
| Business facts (stats, GMP/HACCP) | **KEPT, provenance recorded, documents requested** | Owner-verified commit `ffb4f7b` + legacy BIO-A source. Document proof requested (#4) |
| MOQ, real testimonials, real openings, real images | **OWNER INPUTS PENDING** | Honest defaults on the site (#2, #3, #5, #7) |

**Overall:** **R27 TECH PASS CÓ ĐIỀU KIỆN / OWNER INPUTS PENDING**.
- All four defects are fixed and verified.
- Content cleanup and SEO QA pass.
- Legal text, MOQ, testimonials, openings, document proof and the Blog rewrite decision need real owner information.
- The site must not be opened to the public before those and the owner's UAT.

## Problems found during R27 and how they were solved

1. **Module-isolation gate forbids editing pre-existing tests.** The baseline test `maintenance-host-gate` expects `www` → 503 without `BIOA_DEPLOY_ENV`. The `www` redirect was therefore limited to the Production environment (`BIOA_DEPLOY_ENV=production`, the same pattern as R26). The test was not edited.
2. **CMS text slots are content hashes.** Changed sentences get new ids, and Sanity kept the old ones. `tools/cms-sync-slots.mjs` adds the new slots and removes only orphans that are still the old repository text; it reports CONFLICT otherwise. The SEO descriptions and the serum title were also updated in Sanity, because the Preview applies any differing Sanity value.
3. **Chat UI probe expected the old message box** (0/60 after the change). It was updated to the new contract (no message box, 2 real CTAs inside the panel, honest intro): 60/60.
4. **The tablet suites rewrite tracked `audit-artifacts/`.** The new files were kept as evidence and the tracked files restored (no commit noise).
5. **Bash heredocs altered backslashes** in generated source edits. All edits to source were done with exact-anchor Node scripts or the editor, and every change was re-read in `git diff`.
