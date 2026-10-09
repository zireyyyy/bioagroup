# BIO-A GROUP ACTIVE TABLET-READABILITY-EMAIL4

## CURRENT CHECKPOINT 2026-10-09 — TABLET-READABILITY-EMAIL4 — CODE CANDIDATE
Owner screenshots at Tablet desktop-like width show tiny Footer, Home Hero descriptions, BIO-A product format text, Zalo CTA label, and mis-sized Header/Footer email pills. These are source responsive extension regressions, not requests to redesign.
EXACT CODE CHANGE:
- bioa-home-refine.mjs: existing shared A7 custom social/CTA/lang minimum readable container sizes for 769–1200px; REMOVE conflicting Header email sizing from A7; existing later A8 becomes the ONE authority for email pill's width-auto, height and readable font.
- Existing D5 Footer Tablet owner retains four Desktop-style columns, but has a single fluid email parent plus inner pill instead of inherited fixed 208px outer shell; readable type floors for headings/category links/company details/email. D6 copyright text floor.
- Existing Zalo CTA custom-icon owner enforces readable label alongside artwork, and existing B4 Home Hero owner ensures longer BIO-A paragraph remains legible at Desktop-fluid 769–1200.
- bioa-transform.mjs: BIO-A-added product format chooser (tabs, items, CTA title) gains legible text sizing only in 769–1200. This is NOT a global source Merywood typography override.
- tests/tablet-*.test.mjs updated + new tests/tablet-type-email-regression.test.mjs, npm run test:responsive updated.
No route/DOM/mobile <=768/Desktop >=1201/404/brand/artwork changes. Frozen Home cold-load, footer link counts, forms, D1/Sheets/Resend/Turnstile, Cloudflare maintenance signed14d/noindex, Sanity future only. Original Merywood main.txt is source reference. Static tests not yet executed by GitHub tooling; Cloudflare actual runtime requires owner.
OWNER QA once Cloudflare deploys: Home VI/EN at widths 834,1024,1180: Header email pill has one correctly sized rounded shell and legible address, Zalo/CTA/lang fit; Footer 4 columns and contained email, text legible; Hero text, product-formats tabs and CTA Zalo text legible. Verify desktop 1366/1440 and mobile 390/768 no regression. On FAIL provide screenshot+route+viewport. Build and owner runtime PENDING; FULL TABLET not promoted. Rollback gated `3702f1307b2099d5a14ca4601b16eff099b912ea`.
