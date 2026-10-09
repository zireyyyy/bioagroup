# BIO-A CURRENT — TABLET PASS-RECOVERY3

## CURRENT CHECKPOINT — 2026-10-09 — TABLET PASS-RECOVERY3 — CANDIDATE

Owner shows four Tablet screenshots with regressions in previously approved components: footer label microtypography, Zalo in green contact CTA enlarged versus tiny button text, custom Why Choose card artwork not shrinking consistently, and Hero size differences still to be verified.

Source: owner Merywood main.txt uses html/body font-size:.8333vw at 769–1920px; original CTA/Why Choose/footer also use viewport geometry.

ACTUAL code in bioa-home-refine.mjs: removed second forced font reduction for 769–1200 Footer category/company/email/copyright text, inheriting source root; source Footer remains four BIO-A groups in a desktop-like row. In the existing 769–1200 Zalo component rule, synchronizes the original owner Zalo image and icon slot to 1.25vw, with source-style gap .5208vw. In existing Why Choose artwork rule, scales only custom BIO-A icon artwork to 1.1458vw × 1.4063vw inside the Merywood-sized slot. No markup/route/brand redesign.

Test coverage: new tests/tablet-source-regression.test.mjs, test:responsive package script now includes all 3 regression files. Actual Node build/tests and Cloudflare live check still not executed in this environment.

FROZEN/UNCHANGED: Mobile <=768, Desktop >=1201, approved 404, Home 13-inch first-load, text, full shared shell except these scoped custom parts, footer link groups, D1/Sheets/Resend/Turnstile, private signed maintenance 14d/noindex; Sanity Free future only.

OWNER REQUIRED TEST: VI/EN Home at 834/1024/1180 — 4 footer groups on one row and source-sized legible labels, Zalo icon inside CTA and adjacent readable text, custom Why Choose icon fits tile, Hero remains aligned. Check 390/768 Mobile and 1366/1440 Desktop unchanged. Check CTA link opens Zalo. Send route+CSS viewport+screenshot if FAIL. Do not claim Full Tablet PASS yet.

ROLLBACK gated SHA: c450e7217abd53597b4808dd249187e099312878. Next targeted section fixes only after screenshot evidence; then whole-site tablet acceptance and compact Phase2B.
