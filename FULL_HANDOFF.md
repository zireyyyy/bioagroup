## 2026-10-10 — BIOA-TABLET-DESKTOP-SHELL-SCALE9 — Candidate for owner QA

OWNER BUG EVIDENCE: owner screenshot Tablet still has oversized Header BIO-A logo, Footer differs from owner-confirmed Desktop, floating chat avatar and WhatsApp/Zalo presentation too large/inconsistent. Other page sections already stabilized and must be frozen. Source comparator: owner-supplied original Merywood main.txt maintains desktop structure on 769–1920 CSS px (mobile <=768). Critically current approved BIO-A Desktop >=1201 (in patchFooterInfo1Css) is now grid: left company+logo / central 4 category columns / right contacts, whereas previous Tablet owner forced flex. Thus source-first means preserve original breakpoint and scaled *owner-approved* BIO-A desktop composition, NOT blindly use Merywood old three-list flex. The baseline Tablet 834 had Header image 48x56px independent of viewport (same as 1440), Footer contact/email/social fixed 46px height despite text scaling; approved Desktop 1440 Footer logo 92x109.1, left width320, menu779, right208, four categories, chat avatar fixed68.

ACTUAL PATCH (single owner bioa-source-components.mjs, only 769–1200):
- Header logo shell and image: use 58/1440 = 4.0278vw, artwork48/1440=3.3333vw wide and 56/1440=3.8889vw high; keep original source DOM/brand asset.
- Footer: match owner-accepted BIO-A Desktop three-region grid, 4-column inner grid, company typography, email and social sizing proportional to approved Desktop 1440. Keep four BIO-A category contents unchanged. Unlike Merywood default flex, source Desktop BIO-A is approved grid due to expanded content; scaling this approved grid is the required source-preserving adaptation.
- Footer Zalo: match 30/1440px =2.0833vw artwork with flex-basis; same social-box scale 46/1440=3.1944vw for all four social boxes. All other icons use source-scaled dimensions.
- Floating BIO-A chat button/avatar: previously fixed 68px in custom BIO-A widget, now 4.7222vw and teaser ratios on Tablet only; preserve Chat interactions, positions, Desktop+Mobile separate PASS.
- Unrelated Homepage sections, Hero, CTA project section and product tabs remain unchanged.

Verification: npm source tests/build, Chromium browser checks pending until Actions confirms. Do not claim owner-approved Tablet PASS based on automation. Test Tablet 769,834,1024,1180 header Logo, four Footer sections and icons, contact email/Zalo, floating Avatar/chat teaser. Validate VI/EN all shared routes and Desktop 1440 and Mobile 390/768 regression. Production rollback 01c2731abb68ac1feb487b00ae60dfd0cfab27ef. Cloudflare deploy not controlled or confirmed from GitHub tool. Keep all backend D1/Sheets/Resend/Turnstile, maintenance access/noindex, 404 and Sanity FUTURE unchanged.

---
## 2026-10-10 — MERYWOOD TABLET CTA SCALE AUDIT — CANDIDATE FOR OWNER QA

Owner rejected repeated contradictory Tablet fixes. This patch targets only the empirically non-proportional BIO-A custom project CTA, based on Chromium geometry at 390, 768, 769, 820, 834, 1024, 1180, 1280, 1440 CSS px. User supplied original Merywood CSS `main.txt` verified: source fluid Desktop 769–1920 uses vw; <=768 Mobile distinct. Base candidate already restores source scaling by removing widget-level clamp floors; this narrow follow-up normalizes the BIO-A-only CTA to the already-accepted actual Desktop 1440 geometry. No whole-page transform scaling, no extra breakpoint.
OBSERVED before fix: 1440 Desktop CTA outer 146px tall, CTA title 30px, CTA button 66px tall / 340px wide. At 834 Tablet CTA outer 63.4px and title 13.03px (under-scaled vs Desktop ratio). After fix: at 834 outer 98.4px, title 17.37px, button 38.2px. Direct target at ratio 834/1440 would be CTA outer 84.6px, title 17.38px and button 38.23px. Outer has extra height because longer BIO-A copy needs lines; keeping visible copy rather than clipping is intentional. CTA outer ratio is ~16.4% taller than ideal; no global font enlargement or other section changes. 769/820/1024/1180 have analogous title and button ratios ~1.0x relative to 1440. Header Email and CTA match component heights within 2px throughout the same viewport matrix. Full document scrollWidth equals viewport at tested widths (no document-level horizontal overflow); offscreen carousel slide bounding rectangles must not be mistaken for overflow.
ACTUAL FILES: bioa-source-components.mjs CTA only to derive title/description/button/padding from approved Desktop 1440 reference via vw. tests/tablet-browser-smoke.mjs now measures geometry in Chromium and fails if component proportions drift by >20%, while accepting text-wrap height difference. Keeps earlier candidate targeted fixes: Header email minimum 42px conflict resolved with min-height 0; Footer Zalo forced 30px flex basis resolved at original vw, no layout redesign. bioa-transform.mjs product format existing owner has removed bad independent clamp floors. Shared shell applies across VI/EN Home/About/Cosmetics/Services/Blog/Contact.
VERIFICATION: npm test:responsive, Node build and Chromium geometry browser job all SUCCESS on code commit `4600ca14e92cfe0c08b81fa25ebed358d5c5f972`. This verifies proportions against BIO-A approved Desktop geometry, not direct pixel-by-pixel live Merywood comparison. Owner Tablet runtime still NOT PASS; other route visuals not all automatically tested. Do not claim full cross-device UI PASS. Approved Mobile<=768, Desktop>=1201, 404, brand assets, all other pages/sections, D1/Sheets/Resend/Turnstile and maintenance access modules untouched. Production base/rollback `e0a9c53969088fe87a69cb8eb58f24cd37973637` currently unapproved Tablet.
OWNER QA (after production Cloudflare deploy): Home VI/EN at 834/1024/1180px compare Header, hero, CTA bottom and Footer to Desktop 1440; CTA title/button fully visible, positions remain desktop row. Test Cosmetics formats (tabs and CTA), Header/Footer on About, Services, Blog, Contact; mobile390/768 and desktop1366/1440 unchanged. Confirm Zalo, email, navbar, dropdown, Chat functionality. Send screenshot+viewport+route for FAIL.

---
## 2026-10-10 — MERYWOOD-DESKTOP-SCALE-RESTORE — candidate only

Owner rejected production e0a9c53 because independently imposed clamp(px,vw,px) minimums changed the Desktop-co-shrinking-into-Tablet system. EXACT Merywood owner-supplied main.txt reviewed: 769–1920px uses html/body font-size:.8333vw, header/email/button height 2.4479vw, footer Merywood Flex and viewport spacing. Owner requires 769px+ preserve Desktop-like structure, <=768 Mobile frozen; no whole-page transform:scale. This **candidate** removes the independently introduced 769–1200 clamp floors in bioa-source-components.mjs and bioa-transform.mjs; retains only two targeted cascade fixes: legacy BIO-A Header email min-height 42px is countered with min-height:0 while retaining Merywood height 2.4479vw; Zalo footer 30px forced artwork flex-basis is countered by a specific rule setting image dimensions and basis to 1.5625vw. No new breakpoint, no change to layout/DOM outside these source components.

Do not state Full Tablet PASS without actual cross-viewport visual parity. The previous pixel-minimum Chromium assertions were inappropriate for the user's parity requirement and disabled in candidate CI, pending ratio-driven browser regression. Other owner PASS surfaces (Desktop >=1201, Mobile <=768, 404, lead pipeline, Cloudflare security, Sanity FUTURE) are untouched. Main remains e0a9c53969088fe87a69cb8eb58f24cd37973637 until explicit owner approval after preview. Rollback/candidate base: e0a9c53. QA: compare Tablet 834/1024/1180 against Merywood Desktop-co-shrink for Header, Footer, CTA and product formats; check VI/EN Home and shared shell routes; verify link interactions; also Desktop 1366/1440 and Mobile 390/768 frozen. This candidate is deliberately a return to Desktop co-scale, not an attempt to make Tablet text separately bigger.

---
## 2026-10-10 — BIOA-TABLET-SOURCE-RECOVERY2 (candidate, screenshot follow-up)

Owner sent four actual tablet runtime screenshots after the production Source Component Rebuild commit `bf5b6c6`. They show: (1) Header email visibly taller than adjacent Zalo/language/CTA and small nav labels; (2) project CTA overly short with unreadable title/description/label (no longer blank); (3) BIO-A product formats tabs, list, description and heading remain too small; (4) footer Zalo artwork is much larger than its adjacent WhatsApp/Facebook/Telegram icons, with microtype across four BIO-A columns and company details. The source screenshot also shows horizontal page scrolling; investigate any remaining excess width using browser measurements rather than globally suppressing scrolling. Other Home sections, 404, Mobile and Desktop PASS frozen.

**Verified cascade root causes:** `patchA7Css` still assigns Header email link `min-height:42px!important` outside media queries. The new source owner overrode `height` but not `min-height`, so browser honors the stale 42px minimum. `patchZaloIconCss` sets Footer Zalo to `30px` `flex-basis:30px!important` at a higher CSS specificity than the generic source owner. These are proven rule conflicts. BIO-A-added project CTA and formats are using 1920-derived `vw` typography without a content-length floor, despite having more text than Merywood.

**Actual patch:**
- `bioa-source-components.mjs`: in its **existing and only 769–1200** media block, set Header email `min-height:0` and align email/social/lang/consult to shared accessible hit heights, while retaining source Header flex/DOM; protect CTA title/body/link readability with min-height ~165px and line-height/font floors; make Footer Zalo more specific with artwork, width, height **and flex-basis** bound to the same source icon slot. Improve Footer four-column/company text floors without changing columns or order.
- `bioa-transform.mjs`: in the already-existing added-product-formats 769–1200 owner only, set type/size floors on BIO-A tabs, items and description; no markup or interaction change.
- Add `tests/tablet-regression-screenshot-20261010.test.mjs` static checks and `tests/tablet-browser-smoke.mjs` that starts a local built-site server and uses actual Playwright Chromium computed layout at viewport widths 834,1024,1180. CI workflow runs responsive tests, build and browser checks. Real browser checks are a separate gate and must not be reported PASS until GitHub Actions confirms.

**Deployment workflow:** validate new candidate on branch `candidate/tablet-source-recovery-20261010` before fast-forwarding `main` with owner-requested fix. Preserve main `bf5b6c6` as rollback until owner runtime PASS. GitHub CI does not prove Cloudflare finished deployment. Full Tablet still FAIL/PENDING until owner checks source parity after deployment.

**Protected surfaces:** Merywood breakpoint 769+ Desktop-like, <=768 Mobile unchanged; >=1201 Desktop CSS unchanged; 404 PASS; Hero five accepted stats; shared VI/EN; Footer company identity and all four BIO-A columns preserved; forms and lead pipeline D1/Sheets/Resend, Turnstile, maintenance 14d/noindex middleware untouched; Sanity Free future only.

**Owner QA:** after confirmed production deployment compare at 834/1024/1180 CSS px: Home Header equal-height email/Zalo/lang/CTA and readable nav; project CTA full title, description and Zalo button on first load and after scroll; product-format tabs and list readable; Footer four columns+email/socials with same-size Zalo and no overflow. Check VI/EN shared header/footer on About, Cosmetics, Other Services, Blog, Contact. Regression at 390/768 Mobile and 1366/1440 Desktop must remain unchanged. Report each FAIL with screenshot/route/viewport.

---
## 2026-10-10 — Candidate 1 redeploy request (branch-only)

The owner reports setting the site public and explicitly requests a new push/redeploy to inspect Source Component Rebuild Candidate 1. This commit retriggers the connected GitHub-to-Cloudflare Pages Preview deployment (if configured). NO production merge, no content/layout/middleware/CRM changes, and no change to BIOA_SITE_MODE, 14d protection code, noindex logic, D1/Sheets/Resend/Turnstile. Candidate 1 source remains the same as `81e6b6c`. Full runtime Tablet/desktop/mobile acceptance still pending.

A validation GitHub Actions workflow now checks Node 22 installation, responsive source tests, and build on candidate pushes/PRs. Build verification remains PENDING until the workflow actually runs and reports a result. Cloudflare Preview deployment and custom-domain publication are managed independently by Cloudflare, not inferred from the GitHub push. Rollback: main `b5c83ad` remains unmodified.

Owner test after a confirmed Preview build: VI/EN Home Header+CTA+Footer at 834/1024/1180px, compare frozen Desktop 1366/1440 and Mobile 390/768; verify other route shared shell and Zalo interactions. Do not claim Full Tablet PASS before that.

---
# BIO-A — SOURCE COMPONENT REBUILD candidate (2026-10-10)

**Authority:** current protected main b5c83ad628960456db68a1c7adc68a17e2f61a1a. This is a separate review branch; main unchanged pending verification. Merywood owner's main.txt supplies Header/Footer DOM responsive rules (769–1920px viewport-fluid, <=768px Mobile). Merywood main.txt does NOT include source CSS for the BIO-A custom project CTA, so preserve BIO-A CTA DOM and make visibility reliable at 769–1200 rather than falsely claiming exact source parity.

**Code delta (only 3 components):** New bioa-source-components.mjs is single owned 769–1200px stylesheet for Merywood-derived Header and Footer and BIO-A custom project CTA. Original class/DOM retained, brand, 5 nav links, four footer category groups and company information preserved. Removed old 769–1200 overrides from patchA7Css, patchA8Css, patchD5FooterTabletCss, patchZaloIconCss; removed duplicate CTA compact Tablet rules from bioa-transform.mjs, leaving independent product format components untouched. Both Home and applySharedShell use same owner style. CTA content has a visible fallback when data-bioa-aos reveal and Smooth Scrollbar do not synchronize.

**PROTECTION:** Desktop >=1201px and Mobile <=768px owner PASS unchanged, all other sections locked. 404 owner PASS, maintenance signed 14 days / noindex, D1/Sheets/Resend/Turnstile, consent/lead/chat behavior preserved. No Sanity integration.

**VERIFICATION HONESTY:** JS candidate and test sources parsed successfully. GitHub connector cannot run build; no successful npm test/build or real browser visual regression has been measured yet. Do NOT promote to main or label Tablet PASS until candidate is built and reviewed. There may still be earlier fixed-pixel desktop rules; the new scoped owner is last in shared and Home style chains.

**OWNER QA / NEXT:** On a preview build test VI+EN Home, About, Cosmetics, Services, Blog, Contacts at 834/1024/1180: Header one row; email and icons contained; Footer logo/company + four columns + socials in same Desktop-style row; CTA text, Zalo icon and link visible on first load and after scroll. Check 390/768 Mobile and 1366/1440 Desktop against frozen screenshots. Then address only evidenced failures, update handoff, promote on owner PASS. Rollback candidate by staying on main b5c83ad.

---
## 2026-10-10 — BIOA-TABLET-CTA-REVEAL8 — RECOVERY CANDIDATE
Owner posted two screenshots after `a2801ce`: tablet Home remains visually too small, and the bottom full-width green-tinted "Trao đổi về dự án" CTA appears completely empty (only watermark/background visible). Footer email/icons also remain unapproved. Immediate action is regression recovery rather than another unmeasured round of proportional shrink.
Source audit: previous owner-provided Merywood CSS uses fluid desktop from 769+; BIO-A source also adds UNILA `data-bioa-aos` opacity:0 until IntersectionObserver fires. On Merywood smooth scrolling, the CTA can be within the viewport before IntersectionObserver callback. Both `addHomeReveal` and `addSharedPageReveal` have separate reveal scripts; owner screenshot supports a reveal failure possibility, not proof of computed opacity. Candidate addresses both script owners by making `.whatsapp__content` visible immediately on 769–1200 while retaining approved animation elsewhere. No opacity-global override and no new third Tablet layout.
Actual code:
- `bioa-home-refine.mjs`: restore existing compact Header A7, email A8, Footer D5/D6, Zalo owners from secure prior `834cb7b` (previous source values had additional minimum typography; restore source Flex Footer, not a grid). Keep `a2801ce` Hero 5-card proportional geometry but add minimum readability to the Hero paragraph/stat labels within 769–1200. In both Home and shared reveal scripts, CTA's `.whatsapp__content` is explicitly shown in the existing observer initialization for viewport 769–1200.
- `bioa-transform.mjs`: keep rest of the new fluid product forms/CTA geometry but impose text size floors only for longer BIO-A title, description, CTA label and CTA hit area in the existing band (no separate layout).
- Update 2 stale source assertions, retain other responsive tests, and add `tests/tablet-cta-reveal-and-layout.test.mjs` to npm test:responsive. JS parses; Node unit, Cloudflare build and live runtime PENDING.
**Freeze:** 404 owner PASS, Mobile <=768, Desktop >=1201, brand, Hero approved 5-stat content, source-swiper/cards, footer 4 approved categories, cookie/chat/lead CRM, D1/Sheets/Resend/Turnstile and Cloudflare 14-day signed maintenance/noindex; Sanity Free FUTURE only. Shared shell effects affect VI/EN all routes. Rollback secured `a2801ce76724d0afe082c86f03d9cab5123bcf9c`.
**Owner QA once Cloudflare deploys:** Home VI/EN viewport 834/1024/1180: bottom project CTA must show full title/description/button, not blank on cold load AND after scroll; email/Zalo/lang/Header proportional, Footer four groups readable with contained icons/email. Quick Header/Footer/CTA inspection in About, Cosmetics, Services, Blog, Contacts. Mobile 390/768 and Desktop 1366/1440 must remain PASS. Confirm CTA links launch Zalo, popup open manually. Screenshot+URL+CSS viewport for FAIL. FULL TABLET NOT PASS until owner; runtime not verified by assistant.

---
## 2026-10-10 — BIOA-MERYWOOD-FLUID-DESKTOP7 — CODE CANDIDATE / OWNER RUNTIME PENDING

Owner requested architecture: Desktop Merywood fluid down to 769 CSS px across whole site, Mobile <=768 frozen. Not CSS transform-scale, not an iPad-only third layout. Compared owner-supplied original Merywood `main.txt` source: Merywood 769–1920 uses viewport fluid typography (html/body .8333vw), Header .header__email, .header__btn and .socials__link height 2.4479vw, Footer Merywood flex and spacing. Previous BIO-A self-written Tablet clamp(px,min,max) values independently imposed different minimums and made controls and footer inconsistent.

ACTUAL CODE:
- Shared `bioa-home-refine.mjs`: replace existing *specific* 769–1200 A7 custom Header sizing band with source vw values, preserve same DOM/VI/EN, custom BIO-A contacts, and original responsive break. In existing A8, email pill scales in Merywood units. In existing B4, owner-confirmed five Hero metrics remain but fixed 390–425px minimum is disabled only in fluid range and row widths/numbers converted to source-relative vw. In existing D5 Merywood-flex Footer, convert BIO-A-approved four-group link typography, company identity, socials and email from conflicting px-clamp to a consistent 1920-relative vw scale; keep four columns, company/contact contents and footer. In existing D6 copyright and Zalo CTA use corresponding source fluid text.
- `bioa-transform.mjs`: BIO-A-only `whatsapp` large CTA and product formats tabs, panels and CTA had fixed desktop px values that did not scale when original Merywood desktop shrank. Replace the *existing* 769–1200 owner band with source-derived vw ratios; keep brand, content, layout direction, JS/form links and Mobile original.
- ALL routes consume the shared shell, not independent Tablet headers/footers. No `transform:scale()`, no new alternate markup, no global loading of another stylesheet.
- Replace obsolete responsive test assertions that explicitly forced the previous clamp hacks. Revised 6 test files (13 Node test cases) guard source ownership, single flex Footer, shared shells, content and Mobile/404/cold-load protections. JavaScript syntax parsed; Node test suite/full build and Cloudflare runtime have NOT been executed via GitHub tools. Static assertions do not prove visual parity.

PASS LOCKS: Mobile <=768 CSS unchanged. Desktop >=1201 CSS unchanged. Original 404 owner PASS, Home first-load owner PASS, approved BIO-A copy/VI+EN/assets/branding/chat/cookie/CRM, 14-day signed maintenance/noindex, D1/Sheets/Resend/Turnstile and Sanity FUTURE only all untouched. Any new visual discrepancy must be grounded in source before next small patch.

OWNER QA AFTER CLOUDFLARE DEPLOY: VI/EN Home 769/820/834/1024/1180 CSS px (portrait/landscape) Header aligned single-row, five Bio-A Hero stats proportional, Zalo CTA and product chooser scaled in proportion, Footer four groups company/contact in a Desktop flex row; links and interactions work. Check common Header/Footer on About, Cosmetics, Services, Blog index/detail, Contacts. Compare Mobile 390 and 768 and Desktop 1366/1440/1920 with previous PASS; do not retest backend. On FAIL supply route + CSS width + screenshot. DO NOT promote Full Tablet PASS yet. Rollback base `834cb7b6a2dd74ba4cdba69626ac01d026c3133a` is private maintenance-gated.

---
## 2026-10-10 — TABLET-MERYWOOD-FLEX6 — SOURCE LAYOUT RESTORATION CANDIDATE
Owner rejected multiple previous Tablet custom grids and typography patches for their unstable results. Source Merywood `main.txt` (owner-supplied) confirms Desktop 769–1920 uses fluid viewport values, and its canonical Footer is `.footer-top__wrapper{display:flex}`, `.footer-top__menu{display:flex}`, `.footer-top__nav{width:auto}`. In BIO-A current shared module, `patchFooterInfo1Css` forced the desktop company info OFF at <=1200, and subsequent D5 grid tried to force it back ON. This explicit conflicting cascade and 4 equal/weighted artificial CSS tracks repeatedly squashed the longer BIO-A categories.
**Real code fix** `bioa-home-refine.mjs`: shift company-info mobile-only switch to <=768 (from <=1200), remove the custom Tablet Footer CSS grid entirely, restore source-owned flex outer Footer and flex category menu at 769–1200, while preserving four BIO-A groups via content-weighted flex proportions and the existing mobile-independent logo/company/contact/social assets and email pill. This is one shared owner, used by Home and all other VI/EN routes. Absolutely no change to approved 404, mobile<=768, desktop>=1201, chat backend, D1/Sheets/Resend, 14-day signed maintenance/noindex or Sanity Future. Prior auto-chat Footer teaser guard remains. Existing tests that enforced the obsolete grid are corrected, plus a regression guard `tests/tablet-footer-merywood-flex.test.mjs`; `npm run test:responsive` includes it. JS test source syntax parsed but actual Node unit run, Cloudflare build and viewport runtime QA remain PENDING (not a PASS claim).
**Owner QA scope** after deployment: Tablet 820/834/1024/1180, Home VI/EN and Header/Footer across About, Cosmetics, Other Services, Blog, Contacts. Footer should keep logo+company, four original group columns and contact/socials as one Desktop-like flex row; no category text midword break or email overflow. Mobile 390 and 768 and Desktop 1366/1440 should not change. Check modal/teaser and links. Rollback `d83b18b99e00621109352dbc691309c1dc33d786` gated, not an unsecured baseline. Do not promote full Tablet until owner approves.

---
## 2026-10-09 — TABLET-SHARED-COMPACT5 — CODE CANDIDATE / OWNER QA PENDING
Owner latest four screenshots show: Header first row cramped but now visible; BIO-A product-format CTA label "Chia sẻ ý tưởng" still disproportionately tiny; Footer four columns have poor line-break distribution; proactive Chat teaser covers Footer content. Owner explicitly requests fixing these issues sitewide (shared shell), not a Home-only patch.
ACTUAL ROOT: Shared Header/Footer and Chat all owned by `bioa-home-refine.mjs` and rendered by `applySharedShell()` on every non-Home route and `applyHomeRefinement()` at Home; BIO-A-added formats CTA is owned by `bioa-transform.mjs` across source-based pages. Existing D5 Tablet footer grid used four equal columns despite unequal BIO-A lists, causing line wraps; teaser was always shown on timer or scroll regardless of footer intersection.
ACTUAL CODE PATCH:
- Shared Header existing 769–1200 rules give only BIO-A longer nav labels a small legible minimum, preserve source desktop one-row DOM, all contacts and other already fixed email pill owner.
- Shared Footer 769–1200 row uses four content-weighted BIO-A group tracks 1.3fr/1.45fr/.82fr/.83fr, slightly rebalance left/right outer rails; natural word wrapping with no midword splits. Keep same 4 group categories, logo, company details, email/socials, original Desktop >=1201 and Mobile <=768.
- Shared `addContactLauncher()`: automatic teaser won't show if Tablet Footer is visible; IntersectionObserver hides a teaser that was already shown when Footer appears; manual avatar/panel stays active. No submit backend or chat contents altered.
- `bioa-transform.mjs`: actual BIO-A product-format green "Chia sẻ ý tưởng" button gains readable explicit label/icon, hitbox and spacing only at 769–1200; maintains original source form tabs, products, interaction/URLs.
- Static regression tests changed to weighted footer tracking; fix malformed historic test string and add `tests/tablet-cross-route-regression.test.mjs` proving shared owner across routes; npm `test:responsive` includes all 5 files.
NO production API, D1/Sheets/CRM/Resend/Turnstile, 14d maintenance/noindex, Sanity CMS, 404, Mobile <=768, Desktop >=1201 changes. Other accepted section motion/layout preserved. Rollback to gated `1cba6c5b73367b076818b6277caddcf22370d693`.
**Owner QA** after Cloudflare deploy: (A) 834/1024/1180 CSS px Home Header/email/nav and Footer 4 single-row groups with no awkward wrapping; popup teaser hides when Footer enters viewport while avatar can still manually open; (B) Cosmetics Hub product formats tabs/products and "Chia sẻ ý tưởng" CTA at same widths, click tab and CTA; (C) VI/EN shared Header/Footer on About, Other Services, Blog, Contacts; (D) 390/768 Mobile and 1366/1440 Desktop no regression, 404 unchanged. If FAIL, send URL + viewport CSS px + screenshot. Static test/build/Cloudflare runtime not independently verified; owner full Tablet PASS PENDING.

---
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

---
## CURRENT CHECKPOINT — 2026-10-09 — TABLET PASS-RECOVERY3 — CANDIDATE

Owner shows four Tablet screenshots with regressions in previously approved components: footer label microtypography, Zalo in green contact CTA enlarged versus tiny button text, custom Why Choose card artwork not shrinking consistently, and Hero size differences still to be verified.

Source: owner Merywood main.txt uses html/body font-size:.8333vw at 769–1920px; original CTA/Why Choose/footer also use viewport geometry.

ACTUAL code in bioa-home-refine.mjs: removed second forced font reduction for 769–1200 Footer category/company/email/copyright text, inheriting source root; source Footer remains four BIO-A groups in a desktop-like row. In the existing 769–1200 Zalo component rule, synchronizes the original owner Zalo image and icon slot to 1.25vw, with source-style gap .5208vw. In existing Why Choose artwork rule, scales only custom BIO-A icon artwork to 1.1458vw × 1.4063vw inside the Merywood-sized slot. No markup/route/brand redesign.

Test coverage: new tests/tablet-source-regression.test.mjs, test:responsive package script now includes all 3 regression files. Actual Node build/tests and Cloudflare live check still not executed in this environment.

FROZEN/UNCHANGED: Mobile <=768, Desktop >=1201, approved 404, Home 13-inch first-load, text, full shared shell except these scoped custom parts, footer link groups, D1/Sheets/Resend/Turnstile, private signed maintenance 14d/noindex; Sanity Free future only.

OWNER REQUIRED TEST: VI/EN Home at 834/1024/1180 — 4 footer groups on one row and source-sized legible labels, Zalo icon inside CTA and adjacent readable text, custom Why Choose icon fits tile, Hero remains aligned. Check 390/768 Mobile and 1366/1440 Desktop unchanged. Check CTA link opens Zalo. Send route+CSS viewport+screenshot if FAIL. Do not claim Full Tablet PASS yet.

ROLLBACK gated SHA: c450e7217abd53597b4808dd249187e099312878. Next targeted section fixes only after screenshot evidence; then whole-site tablet acceptance and compact Phase2B.

---
## 2026-10-09 — BIOA-TABLET-DESKTOP-FLUID2 — CANDIDATE
Owner videos: Merywood Video1 31.8s, BIO-A Video2 66.6s. At Tablet Desktop-mode viewport >=769, Merywood keeps desktop footer and uniformly scales header/controls via vw. BIO-A still had a two-column Tablet footer and an unscaled 28px Zalo image inside a 2.4479vw (~20px at 834px) control plus 42px fixed email pill. ROOT CAUSE traced to `bioa-home-refine.mjs` patchA7 + patchD5FooterTabletCss, not to need for a separate Tablet layout. **Code candidate:** in existing patchA7 responsive rule, match email pill and BIO-A social Zalo/SVG icon box/internal image to Merywood 2.4479vw / 1.4583vw units; keep CTA/lang centered. In existing patchD5 owner, replace Tablet 2-column menu with four BIO-A category columns on one desktop-style row; responsive left identity/desktop company text and right contact controls use vw at 769–1200. In Footer-bottom D6, scale copyright similarly. Desktop >=1201 and Mobile <=768 CSS untouched; 404 and previous Home cold-load PASS remain frozen. No changes to lead backend, security, D1/Sheets/Resend, Sanity future. New test `tests/tablet-desktop-fluid.test.mjs` static source assertions; production build/runtime NOT independently verified. Full tablet PASS awaits owner VI/EN Home, other routes, mobile/desktop regression. Rollback to `93170c3038000135779a34d797e805eaba95dc06` (signed maintenance/noindex preserved). 
**Owner QA:** private Home VI/EN 834,1024,1180 CSS px: header Zalo icon centered inside own button with no CTA collision, email/lang/CTA compact as a single row; footer company+4 categories+socials in one Desktop-like horizontal row (no 2x2 Tablet grid). Verify 768 Mobile and 390 phone existing footer/menu unchanged, 1366/1440 Desktop unchanged. Quick shared shell on About/Cosmetics/Services/Blog/Contacts. For failures supply URL, width, screenshot.

---
## CURRENT CHECKPOINT — 2026-10-09 — MERYWOOD RESPONSIVE OWNER REBASE CANDIDATE
The owner explicitly rejected piecemeal iPad-specific patches and mandates original Merywood responsive across ALL routes while preserving all BIO-A-approved changes. Original 11,358-line CSS `main.txt` was examined: Merywood <=768 Mobile, 769–1920 fluid Desktop with exact vw units; physical iPad inches are not media queries. The original Merywood stylesheet already belongs to the fetched page; do not duplicate it. PRODUCTION changes are shared header ownership cleanup: remove old 1100/1200 overrides to original source DOM/nav/forced email, remove non-source 1023 Cosmetics card sizing, replace previously invented clamp-based Tablet control metrics with exact original Merywood vw units for **only BIO-A-created** language/social/CTA controls. Blog article grid already aligns <=768 Mobile. No rewrite of whole page/JS or indiscriminate removal of all Bio-A changes. Protected owner-pass: Home cold-load, approved Desktop/Mobile, 404 Desktop/Tablet/Mobile, Footer Tablet D5, chat, cookie, CRM, D1/Sheets/Resend/Turnstile, 14d Cloudflare maintenance/noindex, Sanity future. `tests/tablet-header-compact.test.mjs` aligned with new source ownership. Source/static review done; actual build and full runtime not independently available. Request whole-site VI/EN cross-viewport regression before owner promotion. Rollback `6f984c7f41352976dad17af42aef7bdd2634458b` maintenance-gated. NEXT active: remediate only remaining source-evidenced FAIL across routes, finish full Tablet, then mandatory Phase 2B compact QA, SEO, final package.
---
## 2026-10-09 — BIOA-RESPONSIVE-SOURCE-768-CORE1 — CODE CANDIDATE
OWNER SOURCE: `main.txt` (Merywood 11,358 CSS lines), verified `@media (max-width:768px)` mobile branch, `@media (min-width:769px) and (max-width:1920px)` viewport-scaled Desktop branch; the single `max-width:767px` rule is a narrow menu-specific rule, not global layout cutoff. Tablet 9.7/10.2-inch distinction is explained by **CSS pixel viewport and orientation**, not hardware diagonal.
CURRENT PATCH: shared Header owner `bioa-home-refine.mjs` uses fluid 769–1200px font and compact existing BIO-A email/lang/social/consultation actions. Fixed 15/16px hard-coded conflicting nav rules were already addressed in the prior candidate and are now scaled to source desktop geometry. Blog article `bioa-blog-refine.mjs` two/three-column content no longer forcibly collapses at 1024px; only at <=768px. Cosmetics custom category grid single-column mobile cutoff aligned 767→768. Existing `tests/tablet-header-compact.test.mjs` rewritten to guard source-like responsive behavior and `npm run test:responsive` added. No generic override added at end of CSS, no alternate page layout or component duplication.
PROTECTED: source stylesheet is NOT replaced, owner PASS Desktop>=1201 and Mobile<=768 surfaces remain unchanged by those targeted rules; previously owner PASS 404 Desktop/Tablet/Mobile, Home laptop first-load, Footer Tablet, forms/Chat/cookie, 14d signed maintenance/noindex, D1/Sheets/CRM/Resend/Turnstile stay untouched. Sanity Free FUTURE only. `main.txt` was used for comparison, not copied wholesale to a public repository (do not publicly redistribute full third-party theme CSS without appropriate rights).
NOT CLAIMED: No claim entire all-routes Tablet parity already PASS; source rule exists as a common contract, remaining BIO-A-specific Tablet CSS exceptions may require separate scoped fixes after owner QA. Build/runtime not independently verified. Rollback `9070d1e5390c1f3870f3f5baa9f1d9b52e87d4a9` is gated and valid.
OWNER TEST: 834px iPad portrait Home / + /en/: nav one line, CTA/lang/social cluster fits and links work; 1024/1180 landscape Header and Home cards/roadmap; 768px iPad Mobile menu and touch, 390px phone; Blog article 834px multi-column and 768px single-column; cosmetics categories 768px single column; Desktop 1366/1440/1920 header/content/footer unchanged. Check shared shell on About, Services, Contacts and VI/EN; screenshots+route+viewport for FAIL. No need to retest lead delivery/security because backend unchanged.

---
## 2026-10-09 — TABLET-HEADER-COMPACT1 — ACTUAL CODE PATCH / OWNER RUNTIME PENDING
Owner video confirmed at iPad 834px BIO-A nav wraps, Merywood original stays one row. Root cause candidate from BIO-A cascade: base @max1100 header nav 12px/gap13 was overridden by later @max1200 rules setting 15–16px/gap20. **REAL CODE CHANGE:** in `bioa-home-refine.mjs`, adjust only three existing declarations at existing <=1200px rules to 12px and gap13. No extra CSS, JS, responsive breakpoint, markup, Footer or 404 edit. Use existing single header owner across all pages. Must owner-test 820/834/1024/1180 Tablet, Desktop >=1440, Mobile <=768, VI/EN; cannot claim PASS yet. Exact original Merywood CSS `main.css` is NOT included in `BIOA-Website.zip` (verified) and direct web retrieval failed; for ALL-SITE Tablet parity owner needs to provide just this `main.css`, saved directly via Chrome from `https://merywood.com/wp-content/themes/mery-wood/assets/css/main.css?ver=1790811557`. Videos/ZIP/JS already available. This source file is needed for section-wide source exact CSS parity; please do not replace entire site or write more docs-only patches. Frozen Desktop/Mobile/404 PASS and 14d private maintenance/noindex preserved. Rollback `1d8ad6a9e9293b952d807956d4cecaeadc8f481d`.
---
## 2026-10-09 — TABLET VIDEO SOURCE PARITY AUDIT T2 (DOCS ONLY; NO UI PATCH)
Owner confirms Home cold-load and 404 responsive visuals PASS. Videos provide iPad 834px reference: BIO-A header nav wraps to two lines, Merywood original stays in one line; multiple suspected section/spacing/motion differences require precise validation. Archive Merywood HTML+main.js available but exact original main.css linked remotely, not preserved; missing source prevents honest site-wide responsive parity claim. Current CSS cascade includes <=1100 nav 12px overridden by later <=1200 nav 15px !important, probable reason for wrapping BIO-A longer labels. **NO site-wide Merywood responsive port has been done**, and no runtime CSS/JS is edited here. New docs/TABLET_VIDEO_PARITY_AUDIT.md records evidence, PENDING/FAIL classifications, source blocker and safe first patch target shared Header Tablet after original CSS retrieved. Owner PASS Desktop/Mobile, 404, 14d maintenance/noindex, D1/Sheets/Resend/Turnstile all protected. Rollback base `b12e4ff681fe4bdce22620ea69d9d29732f25116`. Full Tablet remains FAIL/PENDING; then Phase2B, Phase3, Phase4.
---
## CURRENT CHECKPOINT — 2026-10-09 — HOME-ROADMAP-COLDLOAD1 — CANDIDATE / OWNER FIRST-VISIT QA PENDING

Owner explicitly confirmed **404 Desktop/Tablet/Mobile visual PASS** after latest iPhone/iPad screenshots on `cc1143ff059512223a66012a952da430387b25fc`; 404 now FROZEN (no further edits), while HTTP live traces not independently checked. New issue: Home 13-inch laptop first cold load Roadmap panel and Footer appear to overlap; a browser reload restores expected composition. The owner's Merywood archive `pages/index/assets/js/main.js` was examined: source `swiperAutoHeight(swiperRoadmap)` sets wrapper height by max slide at load and resize; Merywood Smooth Scrollbar holds main+footer scroll geometry with a load/resize listener. Strongest hypothesis is late image/font-driven height/scroll measurement drift at cold load.
**Minimal Home only** `bioa-home-refine.mjs:addHomeRoadmapColdLoadSync($)`: after source load + all roadmap image loads/errors + document.fonts.ready, trigger original jQuery resize (source slider and Scrollbar handlers) once; then call Scrollbar.get(page).update() to reconcile content extent. No CSS, DOM, breakpoints, route architecture, footer style, chat/CRM/security, or 404 edits. New static Node test verifies narrow wiring, documented in SOURCE_MAP. **Runtime PENDING, do not assert production PASS or measured root cause.** Owner must test fresh cold load before reload on 13-inch Chrome, ensure slider/card+CTA precede footer without overlap, then reload comparison; EN Home + Tablet 820/1024 + Mobile 390 regression. Rollback `cc1143ff059512223a66012a952da430387b25fc` remains maintenance-protected and 404 PASS. Next Phase2 Tablet then Phase2B compact audit, Phase3/4 cleanup/package.
---
## CURRENT CHECKPOINT 2026-10-09 — BIOA-404-RESPONSIVE-SOURCEFLOW1 — CANDIDATE / OWNER QA PENDING
Owner confirms Desktop 404 PASS/FROZEN, mobile+tablet FAIL. Compared supplied Merywood iPhone screenshot and current Bio-A iPhone/iPad: correct source-like order is `Ooops!` → description → contained centered artwork → lower CTA; BIO-A current absolute full-viewport `object-fit:cover` crop and CTA before background art are root causes. `bioa-404.mjs` only: <=1200px compact CSS grid positions existing DOM nodes in 4 rows with `display:contents` (no duplication); art relative / `height:auto;object-fit:contain`; <=768px text size/spacing and CTA 100% width. Desktop >1200px underlying CSS exactly unchanged. Original Merywood 404 stylesheet not archived, owner screenshot is visual authority not exact CSS match. PNG source unchanged; Merywood SVG CTA unchanged. Tests/docs/handoff updated. **Desktop post-patch regression PENDING; Tablet 820/1024/1180 PENDING; Mobile 390/430/768 PENDING; VI/EN routes need owner runtime.** Owner acceptance checklist in docs/404_PAGE_CONTRACT.md. Rollback `d3999a7f350a1bc465892321d20c09950396bbd4` stays maintenance gated. Do not patch other PASS surfaces or launch public. Phase2 Tablet continues then Phase2B cross-device audit, SEO/cleanup, package. Sanity Free future only.
---
## 2026-10-09 — OWNER QA CHECKLIST REPORTING GATE (DOCS ONLY)
Owner requests that **EVERY update** include a concise exact-scope "BẠN CẦN TEST GÌ" checklist with relevant page/device/locale/actions/expected PASS/FAIL and evidence to report. Added permanent AGENTS.md §16 and docs/WORKFLOW.md. DOCS-only updates require no website runtime test. Do not request broad retest of frozen unrelated areas or claim Cloudflare visual PASS without user verification. No production files changed; Tablet source audit remains active and not owner full PASS. Rollback base `eaec56c31bb98265b599a7828ca19f81096eb72e`, maintenance remains intact.
---
## CURRENT CHECKPOINT — 2026-10-09 — OWNER RESPONSIVE SOURCE-FIRST / COMPACT DEVICE CONTRACT

New owner instruction: Merywood responsive/Desktop/Tablet/Mobile source must be **the implementation authority**, not just visual inspiration. Reuse exact source DOM/CSS/media queries/JS where correct; only add owner-requested absent behavior following Merywood conventions. **Compact** means one component owner/source structure, original source-derived responsive variants, reduced contradictory CSS/JS overrides, rather than separate per-device correction loops. No forced identical device layouts, no speculative CSS redraw.

A permanent `docs/RESPONSIVE_SOURCE_PARITY_CONTRACT.md` is now binding; `AGENTS.md`, `docs/WORKFLOW.md`, `docs/TABLET_REGRESSION.md` updated. `TABLET-T1` is only diagnostic preparation, not a parity fix or owner Full Tablet PASS. Source `BIOA-Website.zip` includes source HTML/JS but original theme `main.css` was NOT preserved. Obtain verified per-component style/media-query source before changing Tablet CSS, or record a source evidence blocker. Desktop/Mobile and prior Tablet PASS components remain LOCKED.

Mandatory roadmap now **Phase 2 Tablet PASS → Phase 2B whole-site Desktop/Tablet/Mobile convergence audit → Phase 3 SEO/cleanup → Phase 4 final build/package**. Phase 2B performs component-by-component CSS cascade/breakpoint/ownership/redundancy checks across VI/EN and intermediate widths; any compaction of locked areas requires explicit impact approval, small reversible patch, and three-surface runtime owner acceptance. No production code or layout modified by this documentation contract update. Turnstile owner PASS. 404 original PNG Git PASS; image/404 HTTP + responsive runtime remain PENDING. Maintenance 14d/noindex and D1/Sheets/Resend PASS locked. Sanity Free future only. Rollback of documentation checkpoint to `cf0644bcf5f9a714b743a7011597b0c4731752db` is security-gated.
---
## CHECKPOINT — 2026-10-09 — TABLET-T1 AUDIT TOOLING
Audit-only docs/TABLET_REGRESSION.md and tools/tablet-regression-audit.js added to gather Tablet layout evidence at 768/820/1024/1180. NO production CSS/DOM/JS touched. Merywood archive source HTML verified; theme main.css remotely linked and not archived. Tablet overall PENDING, selected previously owner PASS components locked. Turnstile owner PASS; 404 original PNG Git PASS but Cloudflare/Tablet still PENDING. Signed maintenance 14d/noindex remains LOCKED. Next: owner Tablet screenshots/audit results, minimal evidence-driven component patches; then cleanup/SEO/final package.
---
## CURRENT CHECKPOINT — TABLET PHASE 2
2026-10-09: Owner confirmed Turnstile negative test PASS; Phase 2 Full Tablet Regression active. Owner removed AVIF in commit 1749da1; this patch removes dangling 404 fallback and obsolete test. PNG exact original remains. 404 live runtime and Tablet independently PENDING. Maintenance 14d/noindex preserved, all locked UI/CRM/Resend untouched. Sanity Free future only.

---
## CURRENT CHECKPOINT 2026-10-09 — OWNER ORIGINAL 404 PNG VERIFIED; TURNSTILE NEGATIVE QA NEXT

**Main asset commit:** `4b0864736cf1233116df826019b942a5f6591e56`, created by owner after replacing wrong-sized prior upload. **404 PNG in Git PASS:** `assets/bioa-404-original.png`, 2,404,033 bytes, 1808×870, Git blob `adc8d907c01c8bd8f6fcbfbf9416f4ad94e4f05b` identical to verified owner original SHA256 `00a6939ecab5ddbb6964a26c24d72ee56c8bf8c574f80bef07cce477cd13c076`. A new 404 test guards these exact bytes. **Cloudflare runtime/image 200 still unverified; do not mark 404 responsive FULL PASS.** Owner stated other 404 visual parts PASS and asked to proceed; no CTA/layout/source edits. Fallback AVIF retained for separate owner-approved cleanup.
**NEXT ACTIVE:** LEAD-TURNSTILE-NEGATIVE-LIVE1. Existing production code has siteverify with action+hostname verification; `tests/lead-turnstile.test.mjs` has local missing/invalid-token tests but does not prove live enforcement. Owner's authenticated Cloudflare preview session is needed for one synthetic invalid-token POST. Require 403 + `turnstile_failed`, D1 zero matching rows, Sheets/Resend zero sends. See safe console test in `docs/LEAD_SECURITY_NOTIFY_SETUP.md`. Do not ask for preview token or turn public; no frozen backend refactoring until a documented failure.
**LOCKED:** 14d signed maintenance and noindex, Home/shared UI, D1/Sheets/CRM, Resend delivery/forwarding, other already accepted 404 visuals. **PENDING:** production 404 HTTP checks and independent Desktop/Tablet/Mobile verification; Turnstile live negative; full Tablet; cleanup/sitemap/offline package. **Rollback:** only maintenance-gated commits. Sanity Free future CMS decision remains advisory, not installed.
---
## CURRENT CHECKPOINT 2026-10-09 — BIOA-404-SOURCE-DOM3 — CANDIDATE / IMAGE BLOCKER
Owner selected **Sanity Free** as FUTURE CMS. No CMS installed; keep current Cloudflare Pages + D1/Sheets/Resend and secure maintenance. Owner rejected prior 404 because button self-styled/Unicode arrow and AVIF extremely overcompressed.
Merywood supplied archive `BIOA-Website.zip/pages/index/index.html` provides exact reusable CTA `btn > i.icon.btn__icon.arrow > svg [d=M13.75...] + span.btn__text`; 404 rebuilt with that source DOM/icon, typography geometry from original screenshot (exact 404 theme CSS unavailable; do not falsely claim exact parity). Route scope only.
**IMAGE FILE NOT YET COMMITTED**: user original 1808×870 PNG 2,404,033 bytes SHA256 00a6939ecab5ddbb6964a26c24d72ee56c8bf8c574f80bef07cce477cd13c076. Code now prefers /assets/bioa-404-original.png, retains fallback /assets/bioa-404-art.avif until exact original uploaded. GitHub connector cannot directly import raw user file bytes in this environment. Owner-visible artifact /mnt/data/bioa-404-original.png prepared. No image quality PASS until raw file uploaded + live test. All three surfaces Desktop/Tablet/Mobile still PENDING. 404 English copy identical on VI/EN as owner requested.
PASS/FROZEN Maintenance 14d + Bio-A logo, D1, Google Sheets, Resend inbox+forwarding, site routes and Merywood shared shell. PENDING Turnstile negative test, Full Tablet, cleanup, final package, future Sanity. Security noindex/maintenance untouched. Rollback `d6c938bf914514384aab6442dc19cc29b1ae22f4` previous candidate (still source-locked, but 404 imperfect). Old 404 candidates non-PASS.
---
## CURRENT CHECKPOINT 2026-10-09 — BIOA-404-SOURCE-PARITY2 (CANDIDATE; IMAGE QUALITY PENDING)

Owner rejected first 404 candidate because content differs from Merywood, the CTA is not faithful, overlay causes fading, and the 18,520-byte AVIF strongly degrades owner's 1808×870 custom PNG. Owner now demands original Merywood English text for BOTH VI and EN 404.
**Patched 404 route only:** English source copy for both URLs: "Ooops!", "We can’t find the page you’re looking for", "← Back home" to /. Removed custom gradient fading; restored muted Merywood-like CTA dimensions and styling using same `btn`, `btn__icon`, `btn__text` DOM convention; no new third-party icon. `dist/404.html` and `dist/en/404.html` remain for true HTTP 404. Noindex retained; global maintenance 503 gate untouched.
**NOT FIXED / NOT PASS: IMAGE BINARY.** Existing repo image `assets/bioa-404-art.avif` is still only 18,520 bytes and lower visual quality. The actual supplied PNG (2,404,033 bytes) or an equivalent high-quality q98 WebP (1808×870) MUST still replace the binary in GitHub and be verified in Cloudflare. Do not falsely mark image quality PASS because CSS overlays were removed.
**Source limitation:** User linked Merywood's original `404.webp` illustration and screenshot, but exact original 404 CTA source markup/CSS was not available from source archive; dimensions/colors were matched from screenshot only. Do not claim source-code exact parity without a verified original source extract.
**CMS advisory only:** owner is already familiar with WordPress and Rank Math. A future WordPress *headless* CMS + Rank Math REST head metadata can feed unchanged Bio-A Cloudflare Pages; Sanity is alternative. No CMS installed, no architecture migration authorized during 404 patch.
**STATUS:** candidate awaiting image asset replacement plus owner Desktop/Tablet/Mobile runtime checks, with Turnstile negative live QA separately pending. Four-phase plan unchanged. Maintenance/noindex locked. Prior `5528f9975fa6b725faee3e55df070d21f0878c35` 404 candidate is superseded. Pre-404 rollback `c7d29cbdbd901849fc0e664222059873fa21bfef`.

---
## CURRENT CHECKPOINT — 2026-10-09 — BIOA-404-VI-EN1 (CANDIDATE / PENDING OWNER TEST)

Owner provided final Bio-A 404 illustration, 1808×870, after earlier handoff said artwork pending. This supersedes ALL earlier '404 artwork pending' notices. Patch scope: optimized AVIF asset `assets/bioa-404-art.avif` (Git SHA `a6e4f83b921200194133662bede0ee2103cdad98`), isolated `bioa-404.mjs` page with exact approved bilingual copy and a single Merywood-derived CTA (`btn`, `btn__icon`, `btn__text`); `build.mjs` writes `dist/404.html` VI + `dist/en/404.html` EN for Cloudflare Pages closest 404, expected true HTTP 404. Tiny `test:404` coverage plus `docs/404_PAGE_CONTRACT.md`.

**Status:** source patch candidate; Cloudflare live 404 response and Desktop/Tablet/Mobile rendering **PENDING OWNER TEST**. Original homepage/other routes, Merywood global shared shell, D1/Sheets/Resend/Turnstile and maintenance middleware remain UNTOUCHED. PUBLIC SITE STILL LOCKED: maintenance default 503 for unauthorized; `BIOA_SITE_MODE` NOT changed; existing pages.dev security still required. Both 404 pages meta noindex/nofollow/noarchive; sitemap/robots production review still Phase 3–4.

**Next:** deploy candidate, owner private session visit `/khong-ton-tai-404-qa/` and `/en/non-existent-404-qa/`, inspect HTTP 404, correct VI/EN, CTA route, artwork and three independent responsive surfaces. Incognito 503 maintenance remains. After owner 404 PASS, resume Turnstile one controlled server-negative test and remaining small patches; then FULL TABLET PASS etc. **Rollback:** previous protected source `c7d29cbdbd901849fc0e664222059873fa21bfef`. No failed candidate newly recorded.

---
## CURRENT CHECKPOINT 2026-10-09 — TURNSTILE-RUNTIME-NEGATIVE-QA1 — TEST CANDIDATE

**Production-confirmed PASS FROZEN:** maintenance Bio-A original logo/14-day owner private preview, D1→Sheets→Resend→company inbox→personal forward, popup auto-close, CRM statuses, all previously owner-approved Merywood UI. Owner explicitly restated four-phase closeout plan: (1) remaining small patches, (2) FULL TABLET PASS, (3) cleanup/hardening, (4) clean production dist/package, launch only with owner explicit approval.

**Current QA scope:** no production code changes. Node native mock test suite `tests/lead-turnstile.test.mjs`, npm command `test:turnstile`, covers missing/empty/invalid tokens, wrong Turnstile action/hostname, valid response, misconfigured env; records no D1 inserts/Sheets/Resend on invalid token. Production Turnstile negative live test remains PENDING OWNER TEST. Run one authenticated test and verify 403 + D1 no ID + no Google Sheets/Resend effects; details docs/TURNSTILE_RUNTIME_QA.md. Positive lead/Resend owner confirmed earlier. Rate-limited 429 is not proof of Turnstile enforcement. Existing duplicate ID idempotency returns OK before Turnstile and causes NO new effects; use fresh ID for negative test.

**Next:** owner Turnstile negative test, then only after Phase1 close move to full-site Tablet independent QA. Some Tablet status PASS component-wise; overall Tablet still PENDING. Explicit 404 screenshot is only reference, owner will supply NEW ARTWORK — **NO 404 IMPLEMENTATION until image arrives**. Sitemap/robots cleanup belongs to Phase 3/4. CMS Sanity discussed conceptually, NOT installed or current scope.

**Rollback** from new docs/test-only commit to `74ac3533113db8b4d4a9a19ce677733afde16240`; no production UI/API altered. Do not roll back to public/no-gate build. Continue updates to START_HERE and NEW_CHAT_CONTINUATION_PROMPT based on active version, not legacy PMX handoff.

---
## CURRENT CHECKPOINT — 2026-10-09 — RESEND-ACTIVATION1 OWNER-CONFIRMED PASS / LOCKED

**Production-confirmed by owner (not inferred):** Resend sending DNS configured; one real test lead showed Cloudflare D1 `sheet_status = sent` and `email_status = sent`, notification email actually received at company `contact@bioagroup.vn` **and** forwarded to owner's personal mailbox. Thus the end-to-end pipeline **form → D1 → Google Sheets → Resend → company inbox → personal forward** is PASS/LOCKED. Code/config already deployed in production; no application code changes are needed for this promotion.

**Maintenance remains OWNER PASS/LOCKED** (official Bio-A logo and 14-day signed owner preview, earlier source checkpoint `0c0f3b8f55b6675701a79f01fb979e85759a71ed`); custom domain `bioagroup.vn` MUST stay in maintenance until owner explicitly approves public. Preserve Pages `Fail closed`, `BIOA_PREVIEW_SECRET` secrecy, and current `BIOA_SITE_MODE` maintenance (or omitted); only owner-authorized `public` may release.

**Frozen functional owners:** `functions/api/lead.js` (server-side D1 canonical lead save, Sheets and Resend side effects), `assets/js/bioa-leads.js` (client/auto-close), CRM sheet H/I/K, source-authored popup, Resend DNS/Cloudflare environment configuration, `functions/_middleware.js` global private access; existing Merywood-derived Home/Blog/Contact/shared shell. Never change these for unrelated work.

**Next active block (PENDING):** `TURNSTILE-RUNTIME-NEGATIVE-QA1` — confirm server rejects missing/invalid Turnstile tokens on the lead POST without creating a D1/Sheets/Resend record, while legitimate authenticated submission works. Prior `/api/lead/config` response `enabled:true, misconfigured:false` confirms configuration only, not full anti-bot effectiveness. Perform a controlled low-volume test; preserve rate limits and do not spam test leads. Then final prelaunch QA across Desktop/Tablet/Mobile, VI/EN, maintenance guest/API/assets lock, public launch only with explicit approval. Automated Resend retries are not implemented; defer unless owner requests.

**Current code baseline:** main at `c869d3cda1cee5c1dd56bf23dfda2e32fefe96d7` before this docs-only promotion. **This is a documentation-only PASS update**, no new runtime candidate. Rollback source: latest owner-confirmed maintenance + production lead functionality on main; rollback of email config only if needed, NEVER to pre-maintenance unsecured code. No FAIL/PARTIAL new candidate.

---
## CURRENT CHECKPOINT — 2026-10-08 — RESEND-ACTIVATION1 (CONFIGURATION PENDING)
Owner confirmed MAINTENANCE-LOGO-SESSION14D1 PASS: official Bio-A logo on maintenance screen + 14-day signed owner session deployed at commit 0c0f3b8f55b6675701a79f01fb979e85759a71ed. Production still in maintenance; do not publish.
New milestone is NOT a rewrite: functions/api/lead.js already posts new lead notification to Resend and stores email_status, after durable D1 insert; sends concurrently with Google Sheets. User has not yet verified sending subdomain notify.bioagroup.vn nor configured RESEND_API_KEY/LEAD_FROM/LEAD_NOTIFY_TO. These Cloudflare Production resources must be created by owner privately.
Critical boundaries: preserve iNET/OneMail email records at root; only add required Resend sending-subdomain DNS, no Receiving; no changes to lead popup, D1, CRM, Sheets, Merywood layout, maintenance security. email_status sent confirms API acceptance, not inbox delivery. Single synthetic lead + Resend events + corporate inbox is final test.
Turnstile enabled-config returned true previously, negative no-token test still pending. Owner private preview secret appeared in screenshot: rotate privately and do not reveal it.
New docs/LEAD_SECURITY_NOTIFY_SETUP.md is source of truth for exact activation. Next owner action: provide Resend domain DNS verification screen / add records. No application code candidate is pending in this stage; status CONFIG-READY, RUNTIME EMAIL PENDING.
Rollback: remove only Resend Production vars, keep site private. Owner PASS source 0c0f3b8 is safe recovery baseline. Never roll back to a pre-gate public deployment.
---

CURRENT CHECKPOINT 2026-10-08 — MAINTENANCE-LOGO-SESSION14D1 (PENDING OWNER TEST).
Previous owner-observed maintenance baseline commit 6e047643b66308263d92ef73f4173fb575ef5678.
Patch only replaces placeholder B with exact inlined SVG from assets/bioa-full.svg and increases preview HMAC session and HttpOnly Secure cookie age to 14 days (1209600 seconds). Inline is necessary because /assets remain blocked for anonymous visitors.
Owner's earlier screenshot exposed the private access URL. Advise rotation of BIOA_PREVIEW_SECRET through Cloudflare Production and redeploy. Never disclose the secret. Previously issued 8-hour cookies do not automatically extend.
BIOA_SITE_MODE maintenance (or unset) keeps guest site locked; only public may release, explicitly authorized by owner. Cloudflare Pages Functions Fail closed mandatory.
Protected: all Home/Shared Header/Menu/Footer/Cookie/Chat, Blog, Contact, D1, Sheets, CRM, popup, Turnstile. Resend email pending; Turnstile no-token server test pending.
Next: deploy candidate, owner private login redirect, official logo visible on desktop/tablet/mobile guest maintenance, 14-day cookie and pages.dev/API protection verified. Rollback 6e047643 is still private; never rollback to pre-gate 0446f80c.
---

## CURRENT STATE — 2026-10-08 — MAINTENANCE-PRIVATE1 (PENDING OWNER TEST)
Owner website custom-domain/HTTPS & live D1/Sheets lead tests PASS; popup auto-close, ID/CRM PASS. New global Cloudflare Pages middleware default-maintenance gate across all hosts/routes/assets/API, dist/_routes.json include all. Secret URL server verified via BIOA_PREVIEW_SECRET; 8h signed owner cookie; only BIOA_SITE_MODE=public unlocks public after explicit approval. Mandatory Pages Runtime Fail closed or quota exhaustion leaks static assets. User must provision secret and redeploy. Refer docs/MAINTENANCE_ACCESS.md. Turnstile config PASS, live bot test PENDING; Resend PENDING. Frozen Home/Blog/Contact/Merywood shared visual and lead APIs. Rollback pre-patch 0446f80c, unsafe without alternate access control.

---
## CURRENT STATE — 2026-10-08 — LEAD-TURNSTILE-READY1

**Owner-confirmed PASS:** auto-close popup, short ID, D1, Google Sheets, CRM dropdown/colors, VI/EN. LOCK all.
Candidate LEAD-TURNSTILE-READY1: invisible Cloudflare Turnstile client token and server Siteverify enabled only with both Production keys; fail closed if one key missing. Resend sending code pre-exists; setup guidance only. No form DOM/CSS/source behavior changes when Turnstile unconfigured. New config endpoint `functions/api/lead/config.js`, API `functions/api/lead.js`, client `assets/js/bioa-leads.js`.
**PENDING:** Cloudflare build + owner test, Turnstile domain/keys/privacy approval, Resend domain/keys, E2E inbox.
Setup `docs/LEAD_SECURITY_NOTIFY_SETUP.md`. Rollback `88a3a65`.

---
## CURRENT STATE — 2026-10-08 — CRM-LEAD-RATE-CLOSE1

**Owner-confirmed PASS/LOCKED:** compact `bioa_` lead IDs, Cloudflare D1 persistence, Google Sheets sync, H/I/K dropdown and highlighted rows, Vietnamese success message. **Do not reopen these.**

**Current candidate: CRM-LEAD-RATE-CLOSE1 — PENDING CLOUDFLARE BUILD / OWNER TEST.**
Owner screenshot: repeated lead submits now show Vietnamese "Chưa gửi được yêu cầu" rather than closing popup. Root cause identified in `functions/api/lead.js`: `created_at` is ISO UTC `2026-10-08T...Z`, but one-hour rate counter compares lexically with `datetime('now','-1 hour')` (space delimiter), so previous same-day leads can erroneously count as still inside last hour. Fixed to ISO UTC `strftime('%Y-%m-%dT%H:%M:%fZ','now','-1 hour')`; security threshold remains **5/IP/rolling hour**, no bypass added. Accurate limit could still be reached during repeated owner tests; the form now distinguishes HTTP 429 with localized retry guidance.

Another fix: after confirmed `/api/lead` success, Merywood `.modal__close.click()` now occurs **outside API try/catch** so any modal listener exception cannot cause false "send failed" text. Merywood animation, source form DOM, consent and visuals stay untouched. No changes to D1 schema, Sheets mapping or Resend.

**Next:** Cloudflare deployment of this commit, wait for valid rate window or check API network status; submit one safe synthetic lead, verify auto-close and newly stored D1/Sheets ID. Verify Desktop/Tablet/Mobile VI/EN. If HTTP 429 continues, do not repeatedly submit; collect HTTP status and check time of last 5 submitted leads using owner D1 Console without copying PII.

**PENDING:** Resend email configuration, stronger Cloudflare Turnstile with server verification. Rollback if necessary: `d24f753fbfcf45f5fa3e8bdf72712d27b125aa12` (owner PASS for D1/Sheets, popup remained open; rate time bug predates it). `e56b11f` is superseded, NOT rollback.

---
## CURRENT STATE — 2026-10-08 — CRM-POPUP-CLOSE-SOURCE1

**PASS/LOCKED (owner tested):** short `bioa_` lead IDs; D1 lead persistence; Google Sheets sync and H/I/K dropdown/color for new leads; VI form success message. Do not reopen those systems.

**Current candidate:** CRM-POPUP-CLOSE-SOURCE1 — **PENDING CLOUDFLARE BUILD / OWNER TEST**. Owner reported consultation popup stays visible after successful Send. Exact Merywood modal runtime was inspected from the user-supplied `what-affects-moq-in-supplement-manufacturing-export.zip`, file `js/modal.js`: handler listens for `.modal__close` and calls `Modal.close(modal.id)`, removing `.open` and hiding after its 500ms transition. Previous code searched for unrelated close class names and dispatched an Escape key event, neither supported by that Merywood modal implementation.

**Fix:** client-only in `assets/js/bioa-leads.js`, after confirmed `/api/lead` `ok:true`, click `#get-a-quote .modal__close`. Let Merywood manage close effect. No CSS, DOM, timing, D1, Sheets, form, VI/EN copy, or login changes.

**Next test:** deploy, submit a new synthetic lead, confirm success closes source modal automatically; test VI/EN Desktop/Tablet/Mobile. Verify D1/Sheets remains good. Resend/Turnstile remains pending independently.

---
## CURRENT STATE — CRM-LEAD-UX2 — 2026-10-08

Candidate **PENDING CLOUDFLARE BUILD / OWNER TEST**. Current real owner screenshot shows two UUID IDs; implementation of `bioa_` generator in main was not observed deployed. Cache-bust `/assets/js/bioa-leads.js?v=crm2` to force new code retrieval; D1 accepts both formats, past UUIDs stay unchanged.

On successful `/api/lead` response client invokes original modal close control (or Escape event fallback), no automatic close on failure. No change to Merywood popup DOM/Consent/visuals.

Google Sheets backend already writes H=`Mới`, K=`Chưa liên hệ`. After append, now applies H/I/K dropdown validation and highlights new H/K cells. I dropdown defaults to `Chưa phân công`, and can be populated with real staff names later via Cloudflare Text variable `LEAD_STAFF_NAMES` (comma-delimited); no fabricated names. Row formatting failures are logged and do not fail durable D1/Sheets lead capture. Existing rows are not modified.

Security review: server checks origin if supplied, content type/size, consent, honeypot, HMAC IP hashing, max 5 leads/IP/hour, D1 idempotency. **Not bot-proof:** requests without Origin are accepted, honeypot is client-bypassed, IP rate limit is bypassable by distributed bots. Cloudflare Turnstile server token verification and edge WAF rate limits are recommended before public launch. Do not claim hardened anti-bot PASS.

PASS/FROZEN: existing Form layout/Consent; D1+Google Sheets new lead append. Pending: new ID, auto-close, row validations/colors live owner test, Resend and Turnstile setup. Protect Header/Mobile Menu/Chat/Cookie/Blog/Contacts/Home.

---
## CURRENT PROJECT STATE — 2026-10-08 — LEAD-ID-SHORT1

**Owner-confirmed live results:** Consultation lead stored in Cloudflare D1 **PASS**; a subsequent test lead appeared in Google Sheets `Leads` with all 11 mapped columns **PASS**. Google Sheets sync is now OWNER-CONFIRMED. **Resend email remains NOT CONFIGURED / PENDING.**

**Current candidate:** LEAD-ID-SHORT1 — **PENDING CLOUDFLARE BUILD / OWNER NEW-LEAD TEST**. The owner requested a shorter ID in D1/Google Sheets: `bioa_` + 12 cryptographically random Base64URL characters (72 bits). Client creates it with Web Crypto `getRandomValues`; server accepts both new IDs and existing UUIDs for backward compatibility. Database primary key remains unique; no migration/backfill; previous leads retain immutable original IDs.

**Source owners:** `assets/js/bioa-leads.js > newSubmissionId()`; `functions/api/lead.js > submission_id validation`. No change to form design, validation requirements, D1/Sheets/Resend delivery, Contact/Blog/Home or header/menu/chat/cookie. The `Trạng thái`, `Nhân viên`, and `CSKH` columns are USER-OWNED in Google Sheets: owner plans dropdowns later, so DO NOT modify their spreadsheet validations or backend mapping as part of this patch.

**Next test:** Cloudflare build then one new synthetic consultation lead; compare the exact new short ID in the D1 record and the new Google Sheets row. Old rows must not be rewritten. Email remains pending Resend setup. Do not mark ID format PASS until owner checks live.

---
## CURRENT STATE — 2026-10-08 — LEAD-STATUS-I18N1

**Owner observed real lead-submit success message in English on Vietnamese page.** D1 submission was reported successful by frontend; **database record not yet independently verified**. Owner currently completing Cloudflare D1 setup and will query Console.

**Candidate LEAD-STATUS-I18N1 — PENDING CLOUDFLARE BUILD / OWNER TEST.**
Root cause: `assets/js/bioa-leads.js` trusted `document.documentElement.lang`, which can be overwritten by legacy Merywood JS at runtime. The actual VI/EN site routing is `/` (VI) and `/en/` (EN). The only runtime change derives lang from `location.pathname` via `/^\\/en(?:\\/|$)/i`. This changes both submit status messages and `locale` metadata in D1. Original copy, form mechanics and data capture unchanged.

**Consent:** owner requested auto-checked personal-data consent. Kept source **unchecked** because consent should be voluntary, explicit, and actively indicated under current privacy requirements. No pre-check code or changed legal copy. Owner can revisit the lawful basis/consent design after legal review. UI / checkbox / validation remain PASS.

**Owner PASS/FROZEN:** Consent Merywood layout; popup form geometry/short fields/Send; shared Mobile Menu+Header; Cookie, Chat, disabled bottom bar; Blog, Contacts, Home. Main pending block is D1 save verification, then Google Sheets / Resend configuration.

**Next:** Cloudflare build; send one test lead from VI path and confirm Vietnamese status, then from /en/ and confirm English; verify D1 Console `SELECT created_at,name,contact,interest,sheet_status,email_status FROM bioa_leads ORDER BY created_at DESC LIMIT 10;`. Avoid sharing personal data in screenshots. No claim of Google Sheets or email delivery without configured credentials and real test.

---
# CURRENT STATE — 2026-10-08 — CONSULT-TITLE-COPY1

**Current code candidate:** CONSULT-TITLE-COPY1 — PENDING CLOUDFLARE BUILD + OWNER VISUAL TEST.

Owner approved source-style popup/Consent but rejected the stiff heading "Nhận Tư Vấn Từ Bio-A Group". Text-only replacement:
- VI: **Để lại thông tin, đội ngũ Bio-A sẽ liên hệ tư vấn cho bạn.**
- EN: **Leave your details and the Bio-A team will contact you.**

Owner of copy: `bioa-transform.mjs > simplifyConsultationModal()`, exact two text-write paths; no typography, styling, form DOM, Consent, source Merywood layout or submit behavior changed.

**Lead backend state:** `LEAD-BACKEND1` code exists on `main`, but D1/Sheets/Resend resources, secrets and live E2E delivery are still **PENDING CONFIGURATION**. Follow `docs/LEAD_BACKEND_SETUP.md`.

**Domain launch:** use Pages Custom domains to attach `bioagroup.vn`, validate Cloudflare DNS/MX/TXT and mail continuity; choose canonical apex or www, redirect other host, verify SEO URLs, robots/sitemap, all asset/API paths, and that `/api/lead` works on custom domain. **Do not cut over production before lead E2E + full responsive test**.

**FROZEN:** Mobile Header/Menu, Cookie, Chat, bottom bar paused; Blog/Contacts/Home; Consent/checks/Send and consultation popup geometry. Owner-confirmed visual PASS for Consent at `61d2e8b`.

---
# CURRENT STATE — 2026-10-08 — LEAD-BACKEND1

**Owner confirmed popup Consent PASS** at `61d2e8b04c2534ad7a178fdb1313fa918637a3ab`. Protected visual runtime/source Merywood.

**New candidate: LEAD-BACKEND1 — PENDING CLOUDFARE BUILD / D1 BINDING / GOOGLE & RESEND SECRET CONFIG / OWNER E2E TEST.**

- Text-only popup heading: VI `Nhận Tư Vấn Từ Bio-A Group`; EN `Consult Bio-A Group`.
- Form visuals/fields/checks/Consent/Send remain unchanged.
- Old Merywood lead capture disabled for this modal; new JS submit handler posts same-origin to `/api/lead`.
- Pages Function writes D1 first, then best-effort Google Sheets + Resend email notification.
- Code and SQL migration committed, but **resources, credentials, live storage and external delivery have not been provisioned**. Do not claim data currently being collected.
- Setup guide: `docs/LEAD_BACKEND_SETUP.md` (required).
- Relevant owners: `bioa-transform.mjs`, `assets/js/bioa-leads.js`, `functions/api/lead.js`, `migrations/0001_bioa_leads.sql`.
- PASS/FROZEN: Home, Blog, Contacts, Cookie, Chat, Mobile Header/Menu and disabled bottom bar.
- Next: confirm Cloudflare build; provision D1 & binding, run migration, add secrets, verify Google and Resend, run a synthetic test lead (VI/EN) and inspect all 3 destinations.
- Rollback if frontend regression: `61d2e8b` previous owner-confirmed state. Do not deploy new form to production domain before D1 configuration / successful E2E test.

---
## CURRENT STATE — 2026-10-08 — CONSULT-CONSENT-SOURCE1

Candidate: **CONSULT-CONSENT-SOURCE1 — PENDING CLOUDFLARE BUILD / OWNER TEST**.

Owner confirmed shared Mobile Menu + Trang Chủ/Home PASS, FROZEN. Popup consent visuals on 4d3e3da still FAIL on Mobile/Tablet/desktop.

Compared exact original markup in owner ZIP `merywood-export 210-3.zip` / `merywood/pages/index/index.html`: `label.label-check` directly contains source checkbox span, a plain text node with a trailing space, and inline Privacy Policy link. No new layout markup should be introduced.

Correction in `bioa-transform.mjs`:
- Delete the 3 Bio-A-only Consent layout selector overrides (absolute checkbox position and padded layout). Return visual authority to Merywood's original CSS.
- Restore the source trailing whitespace in VI localization before Privacy Policy anchor.

No new CSS or DOM, no change to legal wording, privacy URL, acceptance checkbox behavior, lead form fields, dropdown, capture or Send. All Header/Menu/Cookie/Chat/Blog/Contacts and PAUSED bottom-bar behavior protected.

Historical 4d3e3da did not PASS Consent; do not rollback to it as a visual PASS checkpoint. Next test: Cloudflare build, compare Mobile/Tablet/Desktop Consent with Merywood, then test lead submission/capture separately. **Do not mark PASS before owner verifies.**

---

## CURRENT CANDIDATE — 2026-10-08: CONSULT-CHOICES-MOBILE-HOME1

**PENDING CLOUDFLARE BUILD / OWNER TEST.**
Restores Merywood exclusive checkbox DOM and full original Consent/Privacy Policy agreement in the short consultation form. Bio-A product/service options remain optional and the longer dropdown scrolls internally (max 242px/38dvh). Form keeps required Name, Phone/Zalo/Telegram, consent and existing Send/capture path.

Adds one shared Mobile Menu item Trang Chủ (VI /) or Home (EN /en/) before the five existing entries; preserves source arrow style and all menu runtime. Does not reopen Cookie, Chat, Mobile Header, bottom bar (PAUSED), Blog, Contacts, or Home sections.

Parent 5e56e37 is a candidate after a Cheerio build hotfix, not owner-confirmed PASS. Next: Cloudflare build + Desktop/Tablet/Mobile UI/interaction + real lead submission check.

---
## CURRENT STATE — 2026-10-08, LEAD-FORM-SHORT1-HF1

- Prior candidate `9e30c7c` **BUILD FAIL** (`detach is not a function` from Cheerio).
- Current candidate: **LEAD-FORM-SHORT1-HF1** replaces only Consent node `.detach()` with supported `.clone()`.
- Runtime result **PENDING CLOUDFLARE BUILD / OWNER TEST**. Do not mark PASS until build and lead-form tests succeed.
- Form: Name + Phone/Zalo/Telegram required; Product/Service optional; Consent retained; Send source style. Shared PASS sections frozen.

---

# CURRENT STATE SNAPSHOT — READ THIS BEFORE HISTORICAL PATCH LOG

Updated: 2026-10-08

Current candidate:
**LEAD-FORM-SHORT1 — PENDING OWNER TEST**.

Consultation popup:
- Bio-A green background;
- Name required;
- Phone / Zalo / Telegram required;
- Product / Service optional;
- compact consent;
- Email / Quantity / Request removed from visible UI;
- capture changed to Name + Contact + Consent;
- source-like Send button restored.

Protected:
Mobile Header/Menu, Cookie, Chat, paused bottom bar, Blog, Contacts, accepted Home.

Next:
owner tests short lead form -> remaining small fixes -> FULL Tablet -> cleanup -> deploy.

---





# BIO-A GROUP WEBSITE — FULL HANDOFF

Updated: 2026-10-07
Repository: https://github.com/zireyyyy/bioagroup

This file is the current-state authority.
Permanent rules are in AGENTS.md.
Detailed implementation workflow is in docs/WORKFLOW.md.
Merywood ↔ BIO-A component mappings are in docs/SOURCE_MAP.md.

## 1. AUTHORITATIVE BASELINE

Owner-declared authoritative rollback baseline:

083a7e890b2627c9456c4c0ef98890b3749698fb

This baseline overrides current/main/HEAD/newer commits unless the owner explicitly changes authority.

The baseline commit is documentation-only:

docs: record Patch C3 chat shell baseline

Functional parent:

54a0248514d920fc1b2cecc7deb8238b37a463ad
feat: Patch C3 simplify Merywood-style BIO-A chat shell

Repository documentation commits created after 083a7e8 may exist on main.
They do not silently replace the runtime/code authority declared above.

## 2. SOURCE OF TRUTH — LOCKED

The original Merywood source supplied by the owner is the visual/runtime reference.

Required behavior:
- preserve Merywood DOM/layout/positioning/hover/animation/responsive mechanics wherever already correct;
- apply only exact requested BIO-A changes;
- prefer original Merywood selector/font/DOM/interaction behavior over new custom code;
- do not rewrite a component to fix a small defect;
- do not touch a PASS/LOCKED component unless technically unavoidable;
- desktop, tablet and mobile are three separate first-class regression surfaces;
- every patch must be small, scoped and rollback-friendly.

Default responsive authority:

DESKTOP + TABLET + MOBILE

All three are first-class regression surfaces.

For responsive work:
MERYWOOD DESKTOP ↔ BIO-A DESKTOP
MERYWOOD TABLET ↔ BIO-A TABLET
MERYWOOD MOBILE ↔ BIO-A MOBILE

Do not invent breakpoints before inspecting source breakpoint mechanics.

Default engineering strategy:

FIND → COMPARE → PORT → VERIFY

## 3. BRAND / CONTACT AUTHORITY

Domain:
bioagroup.vn

Email:
contact@bioagroup.vn

Phone:
0779 399 379

WhatsApp:
+84 779 399 379

Telegram:
https://t.me/bioagroup

Facebook:
https://www.facebook.com/nhamaysanxuatduocmypham.BioA

Zalo:
+84 779 399 379

Header navigation:
- Về BIOA Group
- Gia Công Mỹ Phẩm
- Dịch Vụ Khác
- Kiến Thức
- Liên Hệ

Brand rule:
- replace Merywood brand traces such as logo, watermark/background logo, brand accent and Merywood contact identity;
- do not replace ordinary product images, neutral icons or normal decorative artwork without an explicit request;
- keep BIO-A logo uncropped and in original proportions;
- use light BIO-A logo on dark backgrounds.

## 4. OWNER-CONFIRMED / PROTECTED STATE CARRIED FROM THE EXISTING HANDOFF

Protected checkpoint before Patch C:

3c88798b52222aa2e6c4baa1ab4a8b827c169279

Mandatory status interpretation from 2026-10-05 onward:
- Desktop, Tablet and Mobile are independent PASS surfaces.
- Any legacy PASS that did not explicitly test Tablet does NOT imply Tablet PASS.
- Use FULL RESPONSIVE PASS only when all three surfaces are owner-confirmed PASS.

### We Produce
- Desktop: PASS / LOCKED
- Tablet: PENDING
- Mobile: PASS / LOCKED
- FULL RESPONSIVE PASS: NO

### Header
- Desktop: PASS / LOCKED for accepted spacing/transparency/logo
- Tablet: PENDING
- Mobile: PROTECTED previous accepted visual state
- FULL RESPONSIVE PASS: NO

### Hero / Stats
- Desktop: PROTECTED previous approved state
- Tablet: PENDING
- Mobile: PROTECTED previous approved state where applicable
- FULL RESPONSIVE PASS: NO

### Footer legacy accepted pieces
- Desktop: previous email/background behavior had accepted state, but current D3 color work has reopened Footer visual treatment
- Tablet: PENDING
- Mobile: PENDING for current Footer patch chain
- FULL RESPONSIVE PASS: NO

Do not opportunistically modify a surface already PASS/LOCKED while fixing another surface.

## 5. PATCH C3 CURRENT BASELINE STATE

Current functional parent:
54a0248514d920fc1b2cecc7deb8238b37a463ad

Patch C3 baseline behavior:
- compact Merywood-style BIO-A chat shell;
- upper Message/Zalo primary action row removed;
- History heading/cards removed;
- extra BIO-A Group · bioagroup.vn provider line removed;
- exactly one BIO-A avatar in chat header;
- header title BIO-A Group;
- one compact contact row: WhatsApp, Facebook, Telegram, Zalo;
- composer and current preview-message behavior preserved;
- floating launcher hidden while panel is open and restored when collapsed/closed.

Regression rule:
- do not reintroduce CSKH/R&D avatar pills;
- do not reintroduce duplicated action cards;
- do not reintroduce History cards;
- do not reintroduce extra provider line;
- future chat work must continue from this baseline rather than redesigning the widget.

This documentation bootstrap does not newly promote Patch C3 or any later chat candidate to runtime PASS.

## 6. NON-AUTHORITATIVE POST-BASELINE COMMITS

The following commits were found after 083a7e8 on the previous main and are intentionally NOT authoritative for the current restart:

33d12c91c89cf05f1409da50915af49bdb047a55
refine: Patch C4 chat motion and composer

c4fd393078bac10428489a21fb88672e06e9788d
docs: record Patch C4 chat shell finishing

b4e6f084836e1c5ef41500f6b6eb641ff868d93e
hotfix: use true Merywood-style light hero stats type

6250046a4c1a04a4ebda94f0cf12da1b78d26819
hotfix: isolate watermark layer and restore slider pointer controls

Do not restore, cherry-pick or copy behavior from these commits unless the owner explicitly asks for it after source comparison.

They remain available in Git history as rejected/non-authoritative candidates.

## 7. ARCHITECTURE / BUILD

Runtime project:
- Node.js >= 20
- build command: npm run build
- output directory: dist

Main repository roles:
- build.mjs — build pipeline
- bioa-transform.mjs — general BIO-A transformation logic
- bioa-home-refine.mjs — home-specific BIO-A visual/content/runtime refinements
- assets/ — BIO-A project assets

The original Merywood export supplied by the owner is an external source reference and is not assumed to be fully committed into this repository.

## 8. AUTHORITY FILES

Required:
- AGENTS.md
- FULL_HANDOFF.md
- docs/WORKFLOW.md
- docs/SOURCE_MAP.md
- docs/BRAND_PALETTE.md

Session boot order:
1. identify owner-declared baseline;
2. read AGENTS.md;
3. read FULL_HANDOFF.md;
4. read docs/WORKFLOW.md;
5. read docs/SOURCE_MAP.md;
6. read docs/BRAND_PALETTE.md when color/branding is involved;
7. identify target component;
8. inspect relevant Merywood Desktop / Tablet / Mobile behavior and the BIO-A counterpart.

## 9. FOOTER PATCH STATUS

### FOOTER-D2 — OWNER CONFIRMED PASS

Accepted behavior:
- footer navigation abnormal heavy/bold text is corrected;
- category heading weight remains moderate;
- child links use regular weight.

Responsive status:
- Desktop: PASS / LOCKED for FOOTER-D2 typography.
- Tablet: PENDING — not independently verified.
- Mobile: PENDING — not independently verified.
- FULL RESPONSIVE PASS: NO.
- Do not alter the verified D2 typography surface while revising D1 categories or D3 colors unless owner explicitly reopens it.

### FOOTER-D4 — SURFACE-SPECIFIC OWNER RESULT

Accepted commit:
36f09db2188df97c901cab7b10e710a48612f53a

Owner runtime result:
- Desktop: PASS — 4-column footer layout/color accepted.
- Tablet: FAIL — intermediate-width footer is too compressed and link text becomes too small.
- Mobile: PASS — footer layout/color accepted.
- FULL RESPONSIVE PASS: NO.

Protected while fixing Tablet:
- Desktop footer layout/color.
- Mobile footer layout/color.
- D2 typography weight.
- Chat C4 geometry/motion.

### FOOTER-D1-REV — ACTIVE CANDIDATE

Reason for revision:
- original D1 used proposed categories;
- owner required categories to come from the legacy BIO-A source ZIP/database.

Source-derived product groups:
- Sản Phẩm Trang Điểm
- Sản Phẩm Chăm Sóc Tóc
- Sản Phẩm Chăm Sóc Body
- Sản Phẩm Chăm Sóc Da Mặt
- Sản Phẩm Cá Nhân
- Sản Phẩm Mẹ & Bé

Source-derived service groups:
- Sản Xuất & Gia Công Dược Mỹ Phẩm
- Đóng Gói & Sang Chiết Mỹ Phẩm
- Đăng Ký Thương Hiệu & Công Bố
- Chai Lọ Mỹ Phẩm
- Thiết Kế Bao Bì Mỹ Phẩm

### FOOTER-D3-REV — ACTIVE CANDIDATE

Owner rejected the prior cream-background D3 treatment because footer content appeared visually submerged.

Current candidate:
- footer background: #116F47 (exact current BIO-A logo fill);
- footer text/icons: #FDFEF5 (email-surface cream);
- footer logo: light BIO-A asset;
- D2 typography remains PASS/LOCKED;
- D1 source categories remain unchanged.

The dedicated authority file is docs/BRAND_PALETTE.md.

## 10. CURRENT ACTIVE WORK

### CHAT-C4 — OWNER CONFIRMED PASS

Accepted commit:

b4c5e94f966ee6283a8b63c82e9ceb3c543e1214

Accepted patch chain:
- 782c1cb1597278849ae9582a1ba469ea67401f6d — tighten panel corner radius
- e3a48b23af132be2610acf601dd76b7dbb110a20 — integrated one-piece composer with DNA-green send button
- b4c5e94f966ee6283a8b63c82e9ceb3c543e1214 — bottom-right launcher-anchored panel motion

Owner-confirmed behavior:
- chat shell corner radius is accepted;
- composer is one continuous input/send shell;
- send button is inset at the right edge and uses BIO-A DNA green;
- open/close motion originates from the bottom-right launcher;
- prior C3 content/structure remains preserved.

Responsive status:
- Desktop: PASS / LOCKED based on owner-confirmed tested behavior.
- Tablet: PENDING — not independently verified.
- Mobile: PENDING unless separately owner-confirmed later.
- FULL RESPONSIVE PASS: NO.
- Do not modify the verified Chat C4 behavior while working on Footer or Hub unless the owner explicitly reopens it.

### FOOTER — FULL RESPONSIVE PASS

Accepted checkpoint:
c3ad6b129502973e89ec321211e9d911a919544c

Owner runtime confirmation:
- Desktop: PASS / LOCKED
- Tablet: PASS / LOCKED
- Mobile: PASS / LOCKED
- FULL RESPONSIVE PASS — OWNER CONFIRMED

Accepted footer state includes:
- 4 BIO-A source-derived navigation groups;
- D2 font-weight hierarchy;
- logo-green footer palette + cream foreground;
- Tablet 2×2 content-safe navigation arrangement;
- policy links moved into the Policies/Chính Sách column;
- centered copyright: © Bio-A Group | All rights reserved;
- dark #093D26 copyright accent strip.

Do not reopen Footer during HOME patches unless explicitly requested.

### NEXT PRODUCT PATCH

HOME refinement before PATCH E — OWNER CONFIRMED PASS

Accepted chain:
- fe6df7fc6f2cbce731c3ac527164b897470e21e1 — H1 localize remaining Get started CTAs
- f97d72227dc740920cec9f7fbf2b704e1d7f69e9 — H2 synchronize slider controls/review-card palette
- 5ab0ddccf3c78c361ff7093faf76bf3399dabd33 — H3 mobile contact watermark + Zalo CTA
- 28eff3e4f32c7aac6e2d2bb8d912e5b34862609b — H4 packaging-airless BIO-A watermark layer only

Owner runtime result:
- Desktop: PASS / LOCKED
- Tablet: PASS / LOCKED
- Mobile: PASS / LOCKED
- FULL RESPONSIVE PASS — OWNER CONFIRMED

Newly reopened visual only:
- Zalo icon artwork across Home/Footer/Chat/subpage footer.
- Previous recolored SVG candidate at f7e59c8a0cc425b95ec5ede0c50edd1c52aad011 was rejected visually.
- First framed-cream PNG candidate at b8b94be153b611ffb9443be8bb0d0b9cf7a37284 was also rejected: icon appeared too small inside the social container.
- Candidate 06a9dddff06ec6ec047b43456afcd6b010eb8db2 still failed visually: icon remained undersized and generic hover inverted the Zalo control to full cream.
- Candidate 34b81b12d4bfed6e54243c56915740f7befe7776 still needed visual balancing: Zalo remained undersized in social/CTA contexts and Telegram was optically off-center.
- Current candidate uses context-specific Zalo fitting (Footer 42px, Tablet 39px, Mobile 32px, Chat 34px, CTA 30px) and shifts Telegram glyph left 1px without changing any container.
- Keep all H1–H4 layout/content/link behavior protected.

## 11. VERIFICATION / PASS AUTHORITY

BUILD PASS does not equal runtime PASS.

Only the owner can confirm PASS for each responsive surface:

- Desktop: PASS / FAIL / PENDING / PROTECTED
- Tablet: PASS / FAIL / PENDING / PROTECTED
- Mobile: PASS / FAIL / PENDING / PROTECTED

Only when all three are PASS may the component be marked:
FULL RESPONSIVE PASS — OWNER CONFIRMED

VISUAL / RUNTIME / PRODUCTION PASS must not be written ambiguously without surface scope.

Do not update this file with a new visual/runtime PASS until the owner explicitly confirms it.

When owner confirms PASS:
1. record accepted commit SHA;
2. record Desktop / Tablet / Mobile status independently;
3. mark only verified surfaces PASS/LOCKED;
4. mark FULL RESPONSIVE PASS only when all three surfaces are PASS;
5. record rollback checkpoint;
6. record remaining work;
7. record rejected candidates when relevant;
8. update SOURCE_MAP only for newly investigated components/responsive ownership.

## 12. ROLLBACK REFERENCES

Latest owner-confirmed FULL RESPONSIVE PASS checkpoint:
c3ad6b129502973e89ec321211e9d911a919544c

Primary owner-declared rollback baseline:
083a7e890b2627c9456c4c0ef98890b3749698fb

Functional parent for Patch C3:
54a0248514d920fc1b2cecc7deb8238b37a463ad

Protected pre-Patch-C checkpoint:
3c88798b52222aa2e6c4baa1ab4a8b827c169279

The four commits listed in section 6 are not rollback targets for the restarted project unless the owner explicitly promotes one later.

## 13. SESSION CONTINUITY

Before ending an important development session verify:
- authoritative baseline is clear;
- latest accepted PASS/LOCKED state is clear;
- active/next patch is clear;
- rollback references exist;
- SOURCE_MAP contains any newly confirmed mapping;
- another AI can continue from repository files without relying on the previous chat.

### ZALO CIRCLE ICON — ACTIVE CANDIDATE

Owner rejected the framed Zalo treatments through 7f2a5b15219a471fb6d728d7638b6b52fcf4f210.

Current candidate:
- returns to the owner-supplied circular Zalo style;
- circle recolored to BIO-A cream #FDFEF5;
- Zalo wordmark recolored to BIO-A logo green #116F47;
- transparent outside the circle;
- keeps existing social/contact containers, links and hover mechanics;
- keeps Telegram optical centering correction.

Responsive status:
- Desktop: PENDING
- Tablet: PENDING
- Mobile: PENDING

### HOME MOBILE ZALO CTA ALIGNMENT — ACTIVE CANDIDATE

Root cause:
- Merywood mobile CTA reserves an 18x18px .btn__icon slot.
- BIO-A circular Zalo artwork renders at 24x24px.
- Child artwork exceeded the source icon slot, causing visible misalignment/compression.

Current correction:
- Mobile only (max-width:768px).
- Preserve source CTA width/height/padding/radius.
- Synchronize .btn__icon slot to 24x24px.
- Center icon + text with the existing button flex layout.
- Desktop and Tablet remain protected.

Responsive status:
- Desktop: PROTECTED
- Tablet: PROTECTED
- Mobile: PENDING runtime test


## HOME COMPLETION PHASE — DESKTOP + MOBILE FIRST

Owner direction:
- Finish Home Desktop + Mobile before Tablet.
- Home Tablet is explicitly DEFERRED / PENDING and must not block Desktop/Mobile completion.
- PATCH E — Gia Công Mỹ Phẩm hub remains PENDING until Home is complete.
- Header + Footer are accepted and should be reused on subpages before individual subpage content work begins.

Current candidate chain:
- 61986489fad6b952951a4377fcdfc997df5e93b3 — H5A brand naming, browser title, favicon/identity
- 54f603d8371d2a668d4cb26d6727ab7aa37a60d5 — H5B paired VI/EN Home content mapping
- ec49ef9fc619a38a17f7bf7af2080392ac09dc04 — H5C mobile MOQ units + nowrap
- 8e3a38d0942a019bc87046180a96e7e095235b00 — S1 shared accepted Header/Footer shell across routes
- 787a3185753730883cd712871e83fd70c08ce27a — residual VI interface localization

Brand/content authority:
- Brand display name: Bio-A Group.
- Company descriptor: Nhà Máy Sản Xuất Dược Mỹ Phẩm Bio-A Group.
- Legacy BIO-A ZIP is the first content authority.
- Where the legacy source has no equivalent dynamic copy, use short sample content sized to the Merywood component.
- VI and EN content must be maintained as paired mappings.

Responsive status for this phase:
- Home Desktop: ACTIVE CANDIDATE
- Home Tablet: DEFERRED / PENDING by owner direction
- Home Mobile: ACTIVE CANDIDATE
- Header: PASS / LOCKED; shared shell candidate on subpages
- Footer: PASS / LOCKED; shared shell candidate on subpages
- PATCH E: PENDING

Protected:
- Header/Footer accepted geometry and visual treatment.
- Home Tablet layout is not to be repaired in this phase.
- Existing Home section mechanics remain source-owned; content patches must not rewrite components.


### SHARED SHELL ROUTE SCOPE

To avoid restoring the previously problematic full Merywood catalog build, the shared Header/Footer rollout is intentionally limited to the current BIO-A core routes:
- /
- /about/
- /contacts/
- /careers/
- /cookie-policy/
- /privacy-policy/
- /contract-manufacturing-cosmetics/
- /blog/
- /dich-vu-khac/ remains supplied by withExtraRoutes() from the existing hotel/spa source mapping.

Do not re-enable the old vitamin/supplement/archive route catalog unless the owner explicitly needs those pages.


## HOME DESKTOP/MOBILE REGRESSION — ACTIVE FIX CANDIDATE

Owner runtime feedback after d7b336033aad0f5b8b412b58f98aefb15f53ab52:
- Desktop: FAIL in "Danh mục sản xuất" content/card behavior.
- Mobile: FAIL — several sections were not synchronized with Desktop; Why Choose remained English and Packaging MOQ still showed "units".
- Tablet: remains DEFERRED / PENDING by owner direction.
- Header: PASS / LOCKED.
- Footer: PASS / LOCKED.
- PATCH E: PENDING.

Verified root causes against owner-supplied Merywood source:
1. Why Choose has separate Desktop (.grid .item) and Mobile (.mobile .item) DOM trees. Previous mapping only targeted Desktop.
2. Mobile Packaging MOQ uses .info__item-text-1 / .info__item-text-2. Previous H5C targeted non-existent mobile .big-labels nodes.
3. H5B replaced We Produce .item__title/.item__text with .text(), removing original <p> wrappers and breaking source-parity markup.
4. replaceMobileProduceSection carried an older hardcoded Supplements/Cosmetics content set, so Mobile diverged from Desktop.

Current candidate:
- 11e373e43edd398a48ff104ef892e7219d1d9206
- synchronize Why Choose Desktop + Mobile;
- localize actual Mobile MOQ nodes and subcopy;
- restore original We Produce <p> wrappers and shorten copy to fit the source card;
- synchronize Mobile Produce content with Desktop;
- correct H5C CSS selector to Merywood's real mobile MOQ node.

Acceptance target:
- Desktop: We Produce source layout/overlay restored; no content pushed outside the source card.
- Mobile: Why Choose fully VI/EN paired; Produce matches Desktop content; 2500/5000 + localized unit stays on one line.
- Tablet: NO CHANGE EXPECTED / deferred.


## EMERGENCY WE PRODUCE ROLLBACK — PASS AUTHORITY RESTORED

Owner reported severe Desktop We Produce regression after later Home content work.

Backup:
- branch backup-bad-produce-2026-10-05 preserves rejected main 8f8c58243fba75dab32b88d8279d0781d2ffba86.

Immediate site rollback:
- main was first restored to b7a95464d18a02a800cfbbc31383a0bb78791b3b.

PASS authority found in this handoff:
- 3c88798b52222aa2e6c4baa1ab4a8b827c169279
- We Produce Desktop: PASS / LOCKED
- We Produce Mobile: PASS / LOCKED
- Tablet: PENDING

Root-cause comparison:
- at 3c887... bioa-transform.mjs had NO setProduceCopy() mutation;
- later H5B introduced setProduceCopy() and called it from finalizeHomeCopy();
- We Produce CSS/runtime component code remained essentially the same;
- therefore the safe rollback is to stop mutating the Desktop/source We Produce DOM/content.

Current emergency fix:
- finalizeHomeCopy() no longer calls setProduceCopy().
- Desktop returns to source-owned Merywood We Produce DOM/text/layout behavior.
- Mobile custom Bio-A Produce replacement remains untouched.
- Header/Footer remain on their current owner-confirmed PASS state and are NOT rolled back.

Do not reintroduce Desktop We Produce content mutation until a source-safe text-only mapping is proven without changing layout/runtime behavior.


## HOME VI / COOKIE / MOTION / CHAT — ACTIVE CANDIDATE CHAIN

Owner direction after We Produce recovery:
- Keep Header/Footer PASS / LOCKED.
- Localize the recovered Desktop We Produce in the next version without reopening its layout.
- Replace the Merywood brand logo in the cookie banner with Bio-A.
- Reuse a suitable scroll reveal mechanism from the supplied SKL source.
- Recreate Merywood's proactive chat behavior inside the BIO-A-owned widget.
- Use the owner-supplied sales employee photo as the chat avatar.
- Mobile chat popup must remain compact.

Candidate chain:
- 703d44e392b6ad38fb1acaaffe463a3877d1cc29 — HOME-VI1: text-only We Produce localization.
- 3d93746a0b0ef1f126473caeab6ccc51277294f1 — COOKIE-B1: Bio-A cookie-brand logo.
- 35bfe24451e61f8ae5eb5af99e90c91016e08be5 — MOTION-M1: restrained SKL-style reveal.
- d601805687380ff02ea7605fe8a9c6cb39953397 — CHAT-C6: proactive BIO-A sales teaser + employee avatar.

HOME-VI1:
- Desktop We Produce layout remains source-owned and locked.
- Localization targets only:
  - .block-we-produce > .container > .title-wrapper > .title
  - .item__title > p
  - .item__text > p
- No wrapper/class/position/style changes are introduced by localization.
- VI labels: Danh mục sản xuất / Dược mỹ phẩm / Mỹ phẩm.
- EN paired copy remains available.

COOKIE-B1:
- Only .mw-brand .mw-logo is changed to /assets/bioa-monogram.svg.
- Cookie icon / gear remains the original neutral functional cookie icon.
- Consent mechanics are untouched.

MOTION-M1:
- Inspired by the supplied SKL IntersectionObserver reveal pattern.
- BIO-A uses only a restrained fade-up + stagger variant.
- We Produce, Header, Footer, Cookie, Chat, and swiper slide transform owners are excluded.
- One-time reveal; prefers-reduced-motion is respected.
- Home only.

CHAT-C6:
- Merywood source uses an external Dashly widget. Its account/credentials are NOT reused.
- BIO-A recreates only the proactive UX pattern in the existing owned chat component.
- Adds a compact teaser after 4.2 seconds or after meaningful scroll.
- Teaser opens the existing full BIO-A chat.
- Sales avatar asset: /assets/bioa-sales-avatar.webp.
- Desktop panel: 390x540 max viewport-safe.
- Mobile panel: max 330px wide / max 470px high and viewport-safe.
- Mobile teaser is smaller and line-clamped.
- Copy is partnership-oriented: formula, MOQ, packaging and production timeline.
- Existing WhatsApp/Facebook/Telegram/Zalo channels remain.
- External Dashly/Carrot nodes continue to be purged.
- Chat is available through the shared shell on BIO-A core subpages as well as Home.

Responsive status:
- Home Desktop: ACTIVE CANDIDATE
- Home Tablet: PENDING / DEFERRED for page-body layout; chat/motion regression check still required
- Home Mobile: ACTIVE CANDIDATE
- Header: PASS / LOCKED
- Footer: PASS / LOCKED
- Cookie: PENDING OWNER TEST
- Motion: PENDING OWNER TEST
- Chat C6: PENDING OWNER TEST

Do not record runtime PASS for these four patches until owner confirmation.


## OWNER RUNTIME FEEDBACK — HOME-VI1 / COOKIE-B1 / MOTION / CHAT

Owner confirmation:
- HOME-VI1: PASS / LOCKED.
- COOKIE-B1: PASS / LOCKED.
- MOTION-M1: FAIL — reveal was too subtle to be clearly perceived.
- CHAT-C6: PARTIAL FAIL — behavior/panel accepted direction, but employee avatar was visually zoomed/cropped too aggressively.

Content-length rule added:
- docs/CONTENT_GUIDE.md is now the Home copy budget authority.
- Sample VI copy is written close to the original Merywood text load, generally 80–100% of source character count.
- Character count is a guardrail, not a substitute for Desktop + Tablet + Mobile runtime checks.
- Do not shrink font/change layout merely to fit future long copy.

MOTION-M2 candidate:
- use the same reveal targets as M1;
- increase movement to 36px;
- duration to .9s;
- stagger delays .10/.22/.34s;
- threshold .12 and bottom rootMargin -72px so reveal happens later and is easier to see;
- mobile uses 24px / .78s;
- We Produce, Header, Footer, Cookie, Chat and swiper transforms remain excluded.

CHAT-C6A candidate:
- keep all existing chat/avatar frame dimensions unchanged;
- replace the avatar asset with a natural-composition version derived from the owner-supplied sales image;
- do not face-crop/zoom;
- use object-fit: contain and centered positioning inside launcher/header/message/teaser frames.

Responsive status:
- HOME-VI1 Desktop: PASS / LOCKED
- HOME-VI1 Mobile: PASS / LOCKED per owner feedback
- HOME-VI1 Tablet: still PENDING / DEFERRED with page-body Tablet work
- COOKIE-B1: PASS / LOCKED
- MOTION-M2: Desktop PENDING / Tablet PENDING / Mobile PENDING
- CHAT-C6A: Desktop PENDING / Tablet PENDING / Mobile PENDING


## OWNER FEEDBACK — ROADMAP / MOTION / CHAT AVATAR

Owner runtime feedback on 10ff5f2bc6e2b0f4dd3ca89e2c4d63bb47690cc2:
- employee avatar still incorrect because the asset had been recomposed and the BIO-A logo was removed;
- MOTION-M2 still acted mostly on smaller internal content instead of visibly revealing whole sections;
- "Từ ý tưởng đến thành phẩm — quy trình đồng hành trọn gói" regressed and must return to the state from 1ce91e97e479fda03e116e637e4b1ddb449a26ce.

ROADMAP-R1:
- rollback ONLY .block-roadmap copy payload to 1ce91e97...;
- retain all other longer Home sample copy;
- no roadmap DOM/CSS/layout changes.

MOTION-M3:
- section-level reveal now targets whole source containers for Why Choose, How It Works, Packaging, Product Formats, Reviews, Right Choice, Roadmap and contact CTA;
- We Produce remains excluded / LOCKED;
- no swiper-slide transform owner is targeted;
- 44px / .95s Desktop and 28px / .82s Mobile.

CHAT-C6B:
- use the complete owner-supplied 2000x2000 employee artwork, including the BIO-A logo panel;
- only technical image resize/compression is allowed;
- no crop, no composition redesign, no logo removal;
- existing avatar/chat frame dimensions remain unchanged;
- object-fit:contain remains authority.

Status:
- ROADMAP-R1: PENDING owner runtime test
- MOTION-M3: PENDING Desktop / Tablet / Mobile
- CHAT-C6B: PENDING Desktop / Tablet / Mobile
- HOME-VI1: PASS / LOCKED
- COOKIE-B1: PASS / LOCKED


## OWNER FEEDBACK — CHAT-C7 / MOTION-M4 / ROADMAP-R2

Owner feedback after e5af1990efaf85769a4ed817f5efa574d7a3581e:
- CHAT avatar: PASS; keep current full-artwork asset, frame size and contain fitting.
- Chat agent name should be Khánh Như Bio-A.
- MOTION-M3 is still too subtle; owner wants a visible opening/reveal effect across all Home sections.
- Owner explicitly approves applying the Home reveal to We Produce for visual consistency.
- Roadmap layout is PASS again, but the sample text is too sparse versus the agreed content-density rule.

CHAT-C7:
- display name "Khánh Như Bio-A" in teaser, panel title, intro author and generated reply author;
- avatar/frame/behavior unchanged.

MOTION-M4:
- whole-section reveal combines opacity + translateY + subtle scale + clip-path opening + saturation recovery;
- We Produce is included by owner request via .block-we-produce > .container only;
- internal cards, images, text and source slider mechanics are untouched;
- same section-level reveal pattern is used across the major Home sections;
- reduced-motion fallback remains.

ROADMAP-R2:
- keep PASS Roadmap DOM/CSS/layout;
- roadmapSteps remains separate from How It Works steps;
- expand only the Roadmap text to a guarded medium density rather than immediately returning to the prior near-source-length payload that caused a regression;
- no layout/CSS compensation is allowed for longer copy.

Responsive status:
- CHAT-C7: Desktop PENDING / Tablet PENDING / Mobile PENDING
- MOTION-M4: Desktop PENDING / Tablet PENDING / Mobile PENDING
- ROADMAP-R2: Desktop PENDING / Tablet DEFERRED / Mobile PENDING
- HOME-VI1: PASS / LOCKED
- COOKIE-B1: PASS / LOCKED
- Header/Footer: PASS / LOCKED


## OWNER FEEDBACK — MOTION-M5 / ROADMAP-R3

Owner runtime feedback on d05d6bc4db00d231b39bdc881bc64702dab677f1:
- CHAT-C7: PASS / LOCKED.
- MOTION-M4: FAIL — clip/scale opening feels worse than the supplied SKL reference.
- ROADMAP-R2: FAIL on Desktop after increasing copy density; owner identified missing source-style manual line breaks.

Verified source findings:
- SKL reveal authority uses:
  - fade-up: translateY(36px);
  - slide-left: translateX(-56px);
  - slide-right: translateX(56px);
  - .9s cubic-bezier(.16,1,.3,1);
  - IntersectionObserver threshold .07 and rootMargin bottom -40px.
- Original Merywood Roadmap body copy contains explicit <br> line breaks inside the paragraph, generally 4–6 visual lines per slide.

MOTION-M5:
- remove M4 clip-path / scale / saturation effects;
- combine horizontal entry with upward lift using one outer-wrapper transform;
- alternate major Home sections left/right for visual rhythm;
- final contact CTA uses up-only motion;
- We Produce remains included by owner approval, outer container only;
- internal card/slider/image transforms remain untouched.

ROADMAP-R3:
- keep R2 content intent and PASS layout;
- restore source-style explicit <br> line segmentation;
- each Roadmap body is stored as a line array and rendered into the existing source <p>;
- do not add CSS/height/font fixes.

Status:
- CHAT-C7: PASS / LOCKED
- MOTION-M5: Desktop PENDING / Tablet PENDING / Mobile PENDING
- ROADMAP-R3: Desktop PENDING / Tablet DEFERRED / Mobile PENDING


## HOME CLOSEOUT MICRO-PATCH — HERO-NUM1 / FOOTER-HOVER1

Owner direction:
- Home is temporarily acceptable; make two small interaction improvements before moving to subpages.
- Hero statistics should count up on entry.
- Footer category links should feel less static and respond more like Header navigation.

HERO-NUM1:
- runtime-only count-up on existing hero statistic number nodes;
- no typography, size, spacing, DOM geometry or stat labels changed;
- supported localized formats: 2.000+, 5+, 10.000.000, 1.000 m²;
- OEM/ODM remains static because it is not numeric;
- each visible stat animates once when reaching the viewport threshold;
- quartic ease-out;
- the final text is restored exactly to the localized source string.

FOOTER-HOVER1:
- Desktop >1200px:
  - +5px horizontal motion;
  - underline reveal;
  - cream emphasis;
- Tablet/Mobile layout stays unchanged; focus/active feedback only.
- Footer grid, typography and spacing remain PASS-owned.

Responsive status:
- HERO-NUM1 Desktop: PENDING
- HERO-NUM1 Tablet: PENDING
- HERO-NUM1 Mobile: PENDING
- FOOTER-HOVER1 Desktop: PENDING
- FOOTER-HOVER1 Tablet: REGRESSION CHECK — NO LAYOUT CHANGE EXPECTED
- FOOTER-HOVER1 Mobile: REGRESSION CHECK — NO LAYOUT CHANGE EXPECTED
- CHAT-C7: PASS / LOCKED
- Header/Footer base layout: PASS / LOCKED


## FOOTER-INFO1 / MOTION-U1 — ACTIVE CANDIDATE

Owner direction:
- add official Bio-A company/factory information to Footer;
- Desktop: information sits under the Bio-A logo;
- Mobile: information must sit after logo + email/social row and before the category columns, centered;
- improve Home motion by learning directly from the supplied UNILA motion extraction.

Official Footer information:
- Nhà Máy Sản Xuất Dược Mỹ Phẩm Bio-A Group
- Địa chỉ: 496/63/10H Dương Quảng Hàm, An Nhơn, Hồ Chí Minh, Việt Nam
- Hotline: +84 779 399 379
- Mã số thuế doanh nghiệp: 0318126597

FOOTER-INFO1:
- Desktop >1200px:
  - info block appended below .footer-top__left / logo;
  - accepted menu/right-contact layout unchanged.
- Tablet 769–1200:
  - desktop-under-logo block hidden because the accepted Tablet logo column is only 88px;
  - responsive info block becomes a centered full-width row before menu columns.
- Mobile <=768:
  - exact order: mobile logo/contact row -> centered company info -> footer categories;
  - existing mobile footer contact clone remains owner.
- no category labels, footer meta strip, email/social controls or existing Footer colors are changed.

UNILA source analysis:
- motion stack in supplied ZIP:
  - AOS-style fade-up / fade-left / fade-right;
  - dominant per-element duration: 700ms;
  - delays: 300ms / 600ms, one 1300ms emphasis;
  - original transforms: fade-up 100px, horizontal ±100px;
  - global once=true, offset=150;
  - CountUp + Waypoint around 50% viewport;
  - desktop Atropos initializer exists but no active Atropos node was present in exported homepage.
- key visual characteristic:
  - UNILA animates internal elements in sequence, not entire sections as one block.

MOTION-U1:
- replaces MOTION-M5.
- element-level motion map:
  - We Produce title fade-up; left/right cards converge;
  - Why Choose title first, cards stagger upward;
  - How It Works title first, steps stagger upward;
  - Packaging title then slider container upward (never .swiper-wrapper);
  - Product Formats title then content block;
  - Reviews title then left/up/right review rhythm;
  - Right Choice uses left/right convergence where .client nodes exist;
  - Roadmap title then step stagger;
  - final CTA fade-up.
- Desktop:
  - UNILA-like 100px vertical / ±100px horizontal;
  - 700ms ease.
- Tablet:
  - reduced 72px motion.
- Mobile:
  - reduced 54px vertical / ±34px horizontal+18px lift;
  - 620ms;
  - layout remains unchanged.
- observer uses once-only reveal and -150px bottom root margin to reflect UNILA offset behavior.
- reduced-motion safe.
- Swiper translate-owning .swiper-wrapper is never targeted.

Protected:
- CHAT-C7 PASS / LOCKED;
- Roadmap R3 DOM/text ownership;
- Header/Footer existing layout/color authority except new company info block;
- Hero count-up HERO-NUM1;
- slider navigation/runtime.

Responsive status:
- FOOTER-INFO1 Desktop: PENDING
- FOOTER-INFO1 Tablet: PENDING
- FOOTER-INFO1 Mobile: PENDING
- MOTION-U1 Desktop: PENDING
- MOTION-U1 Tablet: PENDING
- MOTION-U1 Mobile: PENDING

## OWNER EXECUTION DIRECTIVE — ACTIVE PROJECT MODE

Owner directive recorded 2026-10-06:
- current continuation checkpoint supplied by owner: 36f6fa124525f87dc3e6aa588638cdd5a3c30380;
- in an active BIO-A project chat, owner requests to fix/change repository code are execution instructions by default;
- the agent must inspect the authoritative baseline, follow AGENTS.md + docs/WORKFLOW.md, implement the minimal patch, build/regression-check, push to the repository, and return the exact commit SHA;
- do NOT stop at explanation, a plan, or a prompt for another coding AI unless the owner explicitly asks for those outputs;
- do NOT create or edit images unless the owner explicitly requests image work;
- do NOT ask for redundant implementation confirmation when the requested code change is sufficiently specified;
- Merywood remains the visual/runtime source-of-truth and all PASS/LOCKED protections remain in force.

This directive is a workflow authority for future continuation sessions and is intended to prevent project chats from responding with a handoff prompt instead of implementing the requested repository change.

## OWNER RESULT / ACTIVE FIX — MOTION-U1 PASS + FOOTER-INFO1A / ROADMAP-R4

Owner runtime feedback on 2026-10-06:
- MOTION-U1 overall Home motion: PASS / LOCKED.
- FOOTER-INFO1 needs hierarchy refinement:
  - Desktop company/factory name larger and bold;
  - Desktop footer logo may be reduced slightly to give company text more emphasis;
  - Mobile company/factory name larger/bolder;
  - Mobile company-info text left aligned;
  - Mobile spacing above/below the company-info block must be visually balanced.
- Roadmap / "Từ ý tưởng đến thành phẩm — quy trình đồng hành trọn gói" regressed again after MOTION-U1:
  - Desktop slider/card geometry is broken;
  - Mobile card leaves excessive blank space below the text and lengthens the page.

Verified code-level conflict:
- MOTION-U1 targeted every .block-roadmap .step with a transform.
- Roadmap is a source-owned slider/card runtime surface and must not share transform ownership with the reveal system.
- The safe correction is to keep only the Roadmap title reveal and remove MOTION-U1 attributes/transforms from repeated Roadmap .step nodes.

FOOTER-INFO1A candidate:
- Desktop company title increased to 15px / 700;
- Desktop body copy increased to 12.25px;
- Desktop left logo reduced to 92px only above 1200px;
- Tablet company-info remains centered and existing footer grid remains untouched;
- Mobile company block becomes left-aligned with 13.5px / 700 title and 11px body;
- Mobile vertical spacing is rebalanced without changing the accepted block order.

ROADMAP-R4 candidate:
- remove element-level MOTION-U1 targeting from .block-roadmap .step;
- keep Roadmap title fade-up only;
- source Roadmap slider/card runtime regains sole transform/layout ownership;
- no Roadmap DOM/text/CSS geometry rewrite.

Protected:
- MOTION-U1 on all other Home sections: PASS / LOCKED;
- CHAT-C7: PASS / LOCKED;
- Header/Footer accepted grid/color/navigation authority;
- Roadmap R3 text/line-break ownership;
- Hero counters;
- Packaging/Reviews/We Produce slider runtime.

Responsive status:
- MOTION-U1 overall: PASS / LOCKED per owner.
- FOOTER-INFO1A Desktop: PENDING OWNER TEST.
- FOOTER-INFO1A Tablet: REGRESSION CHECK — NO STRUCTURAL CHANGE EXPECTED.
- FOOTER-INFO1A Mobile: PENDING OWNER TEST.
- ROADMAP-R4 Desktop: PENDING OWNER TEST.
- ROADMAP-R4 Tablet: REGRESSION CHECK / PENDING.
- ROADMAP-R4 Mobile: PENDING OWNER TEST.

## FOOTER-INFO1B — ACTIVE CANDIDATE

Owner feedback after FOOTER-INFO1A:
- Desktop company information is still visually too small/submerged because the four category columns consume too much horizontal spacing.
- Company/factory name should remain on one line on normal Desktop widths.
- Rebalance the composition from the logo/identity column through the Policies column rather than shrinking the new information block.
- Copyright needs a small legibility increase.
- Mobile company text should return to centered alignment, increase in size, gain more breathing room above/below, and replace the literal labels "Địa chỉ:", "Hotline:", and "Mã số thuế doanh nghiệp:" with compact icons.

FOOTER-INFO1B:
- Desktop >1200px:
  - footer wrapper uses a three-zone grid: identity / four navigation groups / contact;
  - identity width is clamp(320px,19vw,360px);
  - navigation gap is tightened while preserving all four groups;
  - company title uses responsive 14–16px / 700 and nowrap;
  - body copy uses 12.5px;
  - logo remains 92px;
  - contact column remains 208px.
- Mobile <=768px:
  - company block returns to centered alignment;
  - title 14.5px / 700, body 12px;
  - top/bottom spacing increased;
  - address / phone / tax labels are hidden and replaced with compact inline icons;
  - values remain the official Bio-A data.
- Copyright increases to 14px Desktop / 13px Mobile.
- Tablet D5B grid remains protected.

Responsive status:
- FOOTER-INFO1B Desktop: PENDING OWNER TEST.
- FOOTER-INFO1B Tablet: REGRESSION CHECK — NO STRUCTURAL CHANGE EXPECTED.
- FOOTER-INFO1B Mobile: PENDING OWNER TEST.

## MOTION-U1M — MOBILE TIMING REFINEMENT

Owner feedback:
- MOTION-U1 Desktop: PASS / LOCKED.
- Mobile motion is directionally correct but feels delayed.

Root cause:
- Mobile inherited the same 300–600ms stagger variables used for the Desktop UNILA rhythm.
- Mobile duration was still 620ms and observer bottom offset remained -150px, making the reveal feel late on the shorter viewport.

MOTION-U1M:
- Desktop and Tablet values remain unchanged.
- Mobile <=768px only:
  - duration 500ms;
  - stagger delay multiplied by 0.55;
  - fade-up distance reduced 54px -> 42px;
  - horizontal distance reduced 34px -> 28px with 12px lift;
  - observer bottom root margin changes from -150px to -80px;
  - initial ready line changes from viewport -40px to viewport -20px.
- Roadmap repeated .step nodes remain excluded per ROADMAP-R4.
- no swiper-wrapper transform ownership is changed.

Responsive status:
- MOTION-U1 Desktop: PASS / LOCKED.
- MOTION-U1 Tablet: PENDING / unchanged.
- MOTION-U1M Mobile: PENDING OWNER TEST.

## ROADMAP-R4 — OWNER RESULT

Owner runtime result after commit 2ef68c246a12f6f80893eccde4c0d5269e0a3c63:
- Desktop: PASS / LOCKED — Roadmap slider/card geometry returned to normal after removing MOTION-U1 from repeated .step nodes.
- Mobile: source-owned card still contains visible unused vertical space below the current short text.
- Owner prefers to keep the current Mobile source geometry unchanged for now because longer final content is expected later and compressing the card could break source parity or future copy fit.
- Therefore no Mobile Roadmap height/padding override is introduced in the current patch chain.

Protected:
- Roadmap R3 text/line-break ownership.
- Roadmap source card/slider geometry.
- Desktop ROADMAP-R4 PASS / LOCKED.

Responsive status:
- ROADMAP-R4 Desktop: PASS / LOCKED.
- ROADMAP-R4 Tablet: PENDING.
- ROADMAP-R4 Mobile: ACCEPTED DEFERRED — source geometry retained; revisit only if owner requests after final content is available.

## FOOTER-INFO1C / MOBILE-NAV-ARROW1 — ACTIVE CANDIDATE

Owner runtime result:
- FOOTER-INFO1B Desktop: PASS / LOCKED.
- Mobile: owner requests removal of the company/factory information block entirely; visitors can use the Contact page for full details.
- Mobile nav arrows render as an iOS emoji-style square because the implementation used the Unicode character ↗.

FOOTER-INFO1C:
- Desktop FOOTER-INFO1B remains unchanged and PASS / LOCKED.
- Tablet remains unchanged.
- Mobile <=768 hides .bioa-footer-company-info--responsive completely.
- Existing mobile order returns to logo/contact controls -> category columns, with no company-info block.

MOBILE-NAV-ARROW1:
- remove the Unicode ::after arrow from mobile nav links;
- clone the exact .header__btn .btn__icon source vector used by the "Nhận tư vấn" CTA into every mobile nav item;
- fallback SVG is used only if the source icon node is absent;
- vector is styled with currentColor so iOS cannot substitute an emoji glyph.

Responsive status:
- Footer Desktop: PASS / LOCKED.
- Footer Tablet: PROTECTED / unchanged.
- Footer Mobile rollback: PENDING OWNER TEST.
- Header Desktop/Tablet: PROTECTED / unchanged.
- Mobile nav arrow parity: PENDING OWNER TEST.

## WHY-ICON1 / PACKAGING PAGINATION DECISION

Owner request:
- Why Choose icons 02 and 04 must use the same positional artwork on Desktop and Mobile.
- Icon 04 must become the light Bio-A monogram.
- Light artwork inside icons 01–03 should use the accepted cream family.
- Packaging desktop 3 swiper positions vs mobile 5 positions was reviewed for maintainability.

Verified Merywood source behavior:
- Desktop Why Choose artwork order: source icon 01 / 02 / 03 / 04.
- Mobile Why Choose source intentionally reorders artwork to 01 / 04 / 03 / 02.
- Current Bio-A owner direction overrides that visual reorder: Desktop positional order becomes authority.
- Packaging contains five product payloads. Desktop presents products in paired composition, producing three swiper positions for five products; Mobile presents one product per position, producing five positions.

WHY-ICON1:
- Mobile positions 01–03 copy the corresponding Desktop artwork source.
- Existing source artwork 01–03 is visually normalized toward Bio-A cream without changing the icon box.
- Position 04 on Desktop and Mobile uses /assets/bioa-monogram-cream.svg.
- New cream asset is geometry-identical to the authoritative Bio-A monogram; only fill changes #116F47 -> #FDFEF5.

PACKAGING DECISION:
- Keep Merywood responsive pagination mechanics: Desktop three positions / Mobile five positions.
- Do NOT convert Desktop to five single-product positions merely for content editing.
- The five product payloads remain individually addressable in setPackagingCopy; future product images/text can be replaced per product without changing the source slider composition.

Responsive status:
- WHY-ICON1 Desktop: PENDING OWNER TEST.
- WHY-ICON1 Tablet: REGRESSION CHECK / PENDING.
- WHY-ICON1 Mobile: PENDING OWNER TEST.
- Packaging layout/runtime: NO CHANGE / existing PASS authority protected.

## SLIDER-END1 — NON-LOOP ENDPOINT FEEDBACK

Owner request:
- non-loop Home sliders should visually signal when the current direction cannot move further;
- use the Merywood-style transparent/quiet disabled button instead of leaving both controls equally strong.

Scope:
- How It Works / Quy trình hợp tác;
- Packaging Desktop + Mobile;
- Roadmap;
- only .swiper-button-disabled or aria-disabled=true states.

Implementation:
- disabled direction background becomes transparent;
- arrow/border becomes low-emphasis Bio-A green;
- disabled control has no shadow and no pointer interaction;
- opposite available direction remains unchanged and active;
- no Swiper configuration, loop behavior, slide count or transform ownership is changed.

Responsive status:
- Desktop: PENDING OWNER TEST.
- Tablet: PENDING / regression check.
- Mobile: PENDING OWNER TEST.

## MOBILE-NAV-ARROW2 / WHY-ICON1A / SLIDER-END2 — ACTIVE HOTFIX

Owner runtime feedback after daf2eaa:
- FOOTER-INFO1B/1C: PASS.
- Mobile nav vector still looks heavier than the CTA arrow.
- Why Choose icon 03 lost its inner check/detail.
- Disabled prev/next visual does not match Merywood source.

Root causes:
- MOBILE-NAV-ARROW1 cloned the CTA icon correctly, but BIO-A CSS then forced stroke:currentColor on the cloned SVG path; filled source paths became visually heavier.
- WHY-ICON1 applied a whole-image cream filter to source icon 03; the certification/check artwork is multi-detail and flattening it removes the visible check.
- SLIDER-END1 recreated disabled styling instead of allowing Merywood's own .swiper-button-disabled CSS to render; additionally HOME-H2 globally overrode every .swiper-button with Bio-A green.

Fix:
- Mobile nav: remove all path/line/polyline stroke overrides; cloned .header__btn .btn__icon now renders with its original source SVG attributes.
- Why Choose: positions 01/02 keep accepted cream treatment; position 03 preserves original source artwork without the flattening filter; position 04 remains Bio-A cream monogram.
- Slider: remove patchSliderEndpointCss completely; HOME-H2 Bio-A palette now applies only to buttons that are NOT disabled. Merywood is again sole visual owner of .swiper-button-disabled / aria-disabled=true.

Protected:
- Footer Desktop/Mobile PASS.
- Why Choose text/card geometry and icon 04.
- Slider mechanics, loop settings, navigation events and wrapper transforms.

## COOKIE-C2 — PROFESSIONAL CONSENT COPY / SOURCE STATE PRESERVED

Owner feedback:
- current cookie notice feels too short / not professional enough;
- owner also noticed the consent popup no longer asks again on entry.

Verified source behavior:
- Merywood consent UI includes Accept all / Reject all / View preferences plus Functional, Statistics (Analytics/GA4), and Marketing categories.
- Source consent state is expected to persist after a visitor chooses, so the popup should not be forced on every visit.
- Existing BIO-A cleanup removes third-party tracking scripts from the current preview build, so the consent UI currently controls preference state but no active GA4/Ads payload is intentionally being sent by BIO-A yet.

COOKIE-C2:
- expand VI consent explanation to describe necessary, statistics and marketing cookies;
- clarify that users can accept all, use necessary-only, or customize;
- rename Reject all -> "Chỉ cookie cần thiết";
- rename Save preferences -> "Lưu lựa chọn";
- localize preference labels more clearly;
- add a persistent explanatory note linking to /cookie-policy/;
- add modest width/typography polish without replacing the Merywood consent runtime/state.

Important:
- do NOT force the popup to reappear after a saved choice.
- for testing the first-visit state, use a private/incognito window or clear this site's stored cookie/site data.

## SLIDER-END3 — ROOT AUTHORITY FIX / MERRYWOOD DISABLED STATE

Owner runtime result after SLIDER-END2:
- disabled Prev/Next still appeared BIO-A green instead of Merywood's source disabled appearance.

Root cause confirmed:
- bioa-transform.mjs base CSS still had a global !important rule:
  .socials__link,.swiper-button { background-color: var(--bioa-dark)!important; color:#fff!important }
- this rule executes on every route and sits below Home-level logic, so it continued to color disabled Swiper controls even after the Home override was removed.
- Merywood source main.js uses standard Swiper navigation with no loop; Swiper itself adds swiper-button-disabled, disabled and aria-disabled=true at endpoints.
- source button markup/path remains unchanged.

SLIDER-END3:
- base BIO-A palette now targets enabled Swiper buttons only:
  .swiper-button:not(.swiper-button-disabled):not([aria-disabled="true"])
- no BIO-A disabled-state replacement CSS is added.
- disabled-state appearance is returned to Merywood/Swiper source authority.

Protected:
- enabled BIO-A green Prev/Next controls;
- Swiper config/navigation/slide count;
- Menu Mobile PASS / LOCKED;
- Why Choose PASS / LOCKED.

## I18N-A1 / COOKIE-C2A — SHARED BILINGUAL AUTHORITY

Owner found mixed-language Cookie UI on /en/ and asked for the current VI/EN mechanism to be normalized before continuing to subpages.

Verified current architecture before this patch:
- build.mjs builds every route twice from the same Merywood source HTML:
  - VI -> original route
  - EN -> /en/... route
- applyFinalFixes($, route, lang) is the shared transformation entry point.
- Header/menu/title helpers already branch on lang.
- Home then has explicit paired content owners resetHomeVI() / resetHomeEN() and paired component maps.
- Legacy broad translator code inside build.mjs is not part of the active build path; buildOne() calls applyFinalFixes() directly.
- COOKIE-C2 accidentally hardcoded Vietnamese inside brandCookieBanner(), which runs on both languages.

I18N-A1 rule from now on:
1. Shared UI authority:
   Header, Footer, Cookie, language switch, common CTA labels, common accessibility labels must branch directly on lang in shared transform functions.
2. Page-content authority:
   Each route/component must have paired VI + EN content maps/functions before that page is promoted PASS.
3. No generic "translate every English sentence to a fallback phrase" runtime pass is allowed on production pages because it can destroy meaning and source structure.
4. A page is not complete until visible content, buttons, forms, metadata and accessibility labels have been checked in both VI and EN.
5. Future subpage work should reuse shared translated UI; only page-specific content needs new paired maps.

COOKIE-C2A:
- brandCookieBanner($, lang) now owns complete VI and EN copy.
- /en/ Cookie title/body/buttons/preferences/note/policy link are fully English.
- / Cookie remains fully Vietnamese.
- policy link follows localPath(), so EN links to /en/cookie-policy/.
- consent persistence/runtime itself remains Merywood-owned and unchanged.

SLIDER-END3 also shipped immediately before this commit:
- root global .swiper-button !important palette was found in bioa-transform.mjs and restricted to enabled controls only.
- disabled controls are now fully returned to Merywood/Swiper source authority.

Owner PASS locks:
- Mobile Menu: PASS / LOCKED.
- Why Choose: PASS / LOCKED.
- FOOTER-INFO1B/1C: PASS / LOCKED.

## OWNER RESULTS + COOKIE-C2B / MOTION-U1D2

Owner runtime results on 2026-10-06:
- Prev/Next endpoint state: PASS / LOCKED after SLIDER-END3.
- VI ↔ EN shared UI / Cookie language switching: PASS / LOCKED after I18N-A1.
- Mobile Menu: PASS / LOCKED.
- Why Choose: PASS / LOCKED.

COOKIE-C2B:
- owner wants the original Merywood consent explanation to remain the default semantic copy.
- EN banner title/body now use:
  - "Manage Consent"
  - original Merywood paragraph beginning "To provide the best experiences..."
- VI uses a faithful Vietnamese translation of that same paragraph.
- Bio-A note is preserved:
  - VI: users can change/withdraw choices at any time + Chính sách cookie link.
  - EN: equivalent English note + Cookie Policy link.
- preference buttons/categories and persistence remain unchanged.

MOTION-U1D2:
- owner re-tested Desktop and found slider-section reveals slightly delayed / slow.
- Desktop static-section UNILA rhythm remains 700ms and unchanged.
- Desktop slider-associated motion only:
  - How It Works step duration: 560ms via scoped CSS; delays 160ms + 70ms stagger.
  - Packaging Desktop swiper duration: 560ms; delay 160ms.
  - Reviews duration: 560ms; center delay 160ms; side cards 240ms.
- Mobile MOTION-U1M remains unchanged.
- Tablet remains unchanged.
- Roadmap slide/card motion remains excluded and source-owned per ROADMAP-R4.

Responsive status:
- Desktop slider motion: PENDING OWNER TEST.
- Desktop non-slider motion: PROTECTED / unchanged.
- Tablet motion: PROTECTED / unchanged.
- Mobile motion: PROTECTED / unchanged.

## OWNER RESULT + TITLE-CASE1 / MOBILE-MENU-DISMISS1

Owner runtime result:
- MOTION-U1D2: PASS / LOCKED.
- Prev/Next: PASS / LOCKED.
- VI ↔ EN: PASS / LOCKED.
- Mobile Menu visual/icon parity remains PASS; interaction receives one usability refinement below.

TITLE-CASE1:
- owner requests visible Vietnamese title/UI-heading styling in Aa Bb form rather than Aa aa bb.
- Cookie VI title/labels are normalized, including:
  - Quản Lý Cookie
  - Tùy Chọn Cookie
  - Cookie Cần Thiết
  - Thống Kê & Phân Tích
  - Tiếp Thị
  - Quảng Cáo & Remarketing
  - Chính Sách Cookie
- buttons use the same presentation convention where appropriate.
- a scoped normalizeViTitleCase($,lang) pass now runs only on heading/title selectors, never normal paragraph/body copy.
- protected acronyms/brands include Bio-A, R&D, OEM/ODM, MOQ, SKU, VI/EN and channel names.

MOBILE-MENU-DISMISS1:
- root cause of the awkward interaction was patchB8 locking html/body overflow while the mobile nav was open and making the fixed nav occupy the full remaining viewport.
- page scroll is no longer hard-locked while the menu is open.
- only .bioa-mobile-nav-drop is interactive; the rest of the viewport remains a natural outside area.
- tapping/pointer-down outside the actual menu panel closes it.
- scrolling the page outside the menu closes it immediately.
- scrolling inside the menu panel remains available when its contents exceed the viewport.
- Escape closes the menu for keyboard accessibility.
- menu links and burger toggle behavior remain unchanged.

Responsive status:
- TITLE-CASE1 Desktop/Tablet/Mobile: PENDING OWNER TEST.
- MOBILE-MENU-DISMISS1 Mobile: PENDING OWNER TEST.
- Desktop/Tablet menu: PROTECTED / unchanged.

## COOKIE-TITLE2 / ZALO-ICON2 — ACTIVE CANDIDATE

Owner feedback after TITLE-CASE1:
- visible VI Cookie title still appeared as "Quản lý cookie" in runtime; owner requires Aa Bb presentation.
- Zalo in the Mobile Menu still used a text-only "Zalo" renderer and therefore did not match the shared Home/social treatment.
- previous Zalo artwork also had a malformed-looking Z and special hover overrides that did not behave like sibling social controls.
- owner supplied a replacement Zalo artwork.

COOKIE-TITLE2:
- all visible VI consent references now use "Quản Lý Cookie" / Aa Bb labels.
- a small runtime finalizer runs after Merywood consent initialization and re-syncs title/body/buttons/preference labels from the active VI/EN copy object.
- this protects against source runtime text winning after the build-time Cheerio transformation.
- consent state/persistence is unchanged.

ZALO-ICON2:
- new owner-supplied artwork stored as /assets/zalo-bioa-owner.png.
- source image was only normalized to a compact 96x96 web asset; artwork itself was not redrawn.
- icons.zalo now uses this asset everywhere.
- Mobile Menu no longer renders text("Zalo"); it renders the same shared Zalo image as Home/Footer/Chat.
- old Zalo-specific hover color overrides are removed.
- Zalo now inherits the same parent hover behavior as sibling social icons.
- Mobile Menu social controls receive one shared hover/focus/active interaction rule for WhatsApp/Telegram/Facebook/Zalo.

Protected:
- MOTION-U1D2: PASS / LOCKED.
- Prev/Next: PASS / LOCKED.
- VI ↔ EN: PASS / LOCKED.
- Mobile Menu dismiss behavior / arrow visual: protected.
- Why Choose and Footer structure: PASS / LOCKED.

Responsive status:
- COOKIE-TITLE2 VI: PENDING OWNER TEST.
- ZALO-ICON2 Desktop/Footer/Chat: REGRESSION CHECK.
- ZALO-ICON2 Mobile Menu: PENDING OWNER TEST.

## CHAT-C8 — REMOVE TEASER AVATAR STATUS DOT

Owner runtime result:
- Cookie title fix: PASS.
- Zalo shared icon fix: PASS.
- owner requests removal of the green online/status dot from the avatar inside the compact teaser popup.

CHAT-C8:
- disable .bioa-chat__teaser-avatar:after only.
- keep the floating launcher .bioa-contact-fab__toggle:after status dot unchanged.
- no chat geometry, teaser timing, avatar image, text, close behavior or contact actions are changed.

Responsive status:
- Desktop teaser popup: PENDING OWNER TEST.
- Tablet/Mobile teaser popup: same selector / expected parity.

## ABOUT-A1 — BIO-A ABOUT PAGE INITIAL CUTOVER

Owner direction:
- Home is stable enough to move on.
- Next target: /about/.
- Keep Merywood About visual/runtime structure as source-of-truth.
- Use the owner-supplied Bio-A ZIP as the first content authority.
- Apply all shared Home components that are now PASS/LOCKED across routes.
- Owner will runtime-test this first About cutover and then request visual/content refinements.

Verified content authority:
- Library file: BIOA-Website.zip.
- Legacy Bio-A source: cms/pages/about.php.
- It contains:
  - company introduction;
  - Vision;
  - Mission;
  - GMP;
  - HACCP.
- Existing owner-confirmed Home/company facts are reused for About stats and service taxonomy.
- Where the legacy Bio-A source has no direct equivalent to a Merywood About block, short Bio-A sample copy is used while preserving the Merywood component.

Implementation:
- new page owner: bioa-about-refine.mjs.
- build.mjs invokes applyAboutRefinement() only for /about/, after shared transform and before applySharedShell().
- shared shell remains responsible for the already stabilized:
  - Header Desktop/Tablet/Mobile;
  - mobile menu arrow + outside/scroll dismissal;
  - Footer;
  - VI/EN switch;
  - Cookie consent;
  - Zalo artwork;
  - Bio-A chat teaser/launcher;
  - title capitalization rules.
- About page copy is explicit VI/EN paired content from the first cutover.
- No About layout/grid/slider geometry is rebuilt.

ABOUT-A1 content mapping:
- Hero: About Bio-A + Home-confirmed Bio-A stats.
- Story: company introduction + Vision + Mission from legacy Bio-A content.
- Values: six Bio-A-aligned values; GMP/HACCP context is carried in Safety/Compliance.
- Team: R&D/manufacturing/consulting collaboration.
- Merywood exhibition slider is retained visually but localized as Industry Activity & Connections; labels become R&D / Manufacturing / Market Insights to avoid inventing Bio-A event attendance claims.
- Product catalogue becomes the six Bio-A cosmetic manufacturing categories already used by the approved Footer.
- How It Works becomes the five Bio-A project stages aligned with Home.
- CTA is localized and brand-specific.

Protected:
- Home: PASS / LOCKED; no Home page content/layout changes in ABOUT-A1.
- shared Header/Footer/Cookie/Chat/Mobile Menu/Zalo: PASS / LOCKED.
- Merywood About section geometry and slider mechanics.

Responsive status:
- About Desktop: PENDING OWNER TEST.
- About Tablet: PENDING OWNER TEST.
- About Mobile: PENDING OWNER TEST.
- About VI ↔ EN: PAIRED / PENDING OWNER TEST.

## SHARED-UX1 — HOME-APPROVED EXPERIENCE PROMOTED TO ALL ROUTES

Owner runtime observation after ABOUT-A1:
- About content localization is acceptable as an initial pass.
- Header/Footer/Cookie/Chat and other stable Home pieces must not behave/look like separate re-implementations on subpages.
- Every page must inherit the Home-approved experience: motion, icons, menu/mobile behavior, hero interaction and section effects.

Root cause:
- applySharedShell() reused the same Header/Footer functions, but sharedShellCss omitted the Home base css plus the accepted control/motion layers.
- Home also ran replaceBrandWatermarks(), counters and MOTION-U1 reveal runtime; subpages did not.
- Result: same logical component owners but different final cascade/runtime, creating visible parity drift.

SHARED-UX1 architecture:
- sharedShellCss is now the single cross-route visual authority for stable global experience and includes:
  - base Home-approved Bio-A css;
  - Header/Desktop/Tablet/Mobile patches;
  - Mobile Menu outside/scroll dismissal;
  - Footer hierarchy/company info/hover/meta;
  - Cookie presentation;
  - Chat/contact launcher;
  - Zalo shared artwork;
  - enabled/disabled Swiper control palette;
  - Mobile contact CTA treatment;
  - MOTION-U1 framework with accepted Desktop/Tablet/Mobile timing.
- applySharedShell() now also runs:
  - setLogo();
  - replaceBrandWatermarks();
  - fixLang();
  - header/mobile-menu normalization;
  - shared contact CTA normalization;
  - Footer owners;
  - Home-style hero counters when a compatible stat block exists;
  - addSharedPageReveal(route);
  - Chat launcher;
  - VI title casing.

About motion map:
- Hero title/lead/CTA/stats/media enter in staged Home-like rhythm.
- Story, Values, Team, Product catalogue and How It Works use element-level UNILA motion.
- Activity slider animates only the slider shell; never .swiper-wrapper or slides.
- Header/Footer/Cookie/Chat are intentionally excluded from reveal transforms.

Important architectural rule:
- route modules such as bioa-about-refine.mjs own PAGE CONTENT only.
- global Header/Footer/Cookie/Chat/Menu/Zalo/Motion framework/control-state code must not be duplicated in route modules.
- future subpages must receive applySharedShell() and define only their route-specific content + optional safe reveal selector map.

Static navigation note:
- the project is currently a multi-page static site, so moving between /about/, /contacts/, etc. is still a normal browser document navigation.
- SHARED-UX1 guarantees identical built shared components/cascade on every page; converting navigation to an SPA is not part of this patch and is not required for component parity.

Protected / PASS:
- Home visual/layout/runtime: PASS / LOCKED.
- MOTION-U1D2: PASS / LOCKED.
- Header/Footer/Cookie/Chat/Zalo/Mobile Menu: PASS / LOCKED.
- Prev/Next disabled authority: PASS / LOCKED.

Status:
- Shared shell parity on About Desktop/Tablet/Mobile: PENDING OWNER TEST.
- About page content/layout remains ABOUT-A1 candidate and is not otherwise redesigned by SHARED-UX1.

## ABOUT-HERO1 — HOME HERO COMPONENT PARITY

Owner requires About Hero to use the Home Hero component already PASS/LOCKED rather than maintain a second .mwa-hero layout.

Implementation:
- bioa-about-refine.mjs replaces .mwa-hero with the exact Home/Merywood structure:
  - .block-title
  - background media/shadow
  - content column
  - .info.desctop statistic list
  - .block-title-continue.mobile statistic list.
- About keeps its own title, lead, source image, VI/EN copy and Bio-A stats.
- sharedShellCss now includes the Home-approved hero stat cascade: patchBCss, patchB2Css, patchHeroStatsSourceCss, patchHeroStatsOriginalTypeCss and patchHeroStatsFinalSourceCss.
- addHeroCounters() provides the same numeric counter runtime.
- old .mwa-hero reveal mapping is removed because Home Hero is not AOS-transformed.

Protected:
- Home Hero itself is unchanged and remains PASS / LOCKED.
- Header/Footer/Cookie/Chat/Mobile Menu remain PASS / LOCKED.
- About content below Hero is unchanged.

Responsive:
- About Hero Desktop/Tablet/Mobile: PENDING OWNER TEST.

## ABOUT-HERO1B — ROLLBACK COMPONENT REPLACEMENT / STATS-ONLY PARITY

Owner correction:
- ABOUT-HERO1 changed the About hero position/composition, which was not requested.
- desired scope is: keep the original Merywood About hero position and image composition, but make its stat cards use the same font, number/label sizing and usable number-column width as the Home hero so long Bio-A values do not clip.

Rollback:
- bioa-about-refine.mjs is restored to the pre-ABOUT-HERO1 implementation from SHARED-UX1 baseline.
- original .mwa-hero / .mwa-hero__grid / .mwa-hero__media positioning is restored.
- original About reveal mapping is restored.

Verified Merywood source:
- .mwa-stats already uses max-width:27.625rem and gap:1.125rem.
- .mwa-stat already uses gap:1.5625rem and padding:1.5625rem 2rem, matching the Home source rhythm.
- clipping came from .mwa-stat__n max-width:7.9375rem.
- Home PASS uses a widened number column of 13.125rem for Bio-A's longer values.

ABOUT-HERO1B:
- Desktop >1024: number column 13.125rem, number 2.5rem/300, label 1rem/400.
- Tablet 769–1024: number column 12rem, number 2.25rem, label .9375rem.
- Mobile <=768: preserve source one-column hero; number column 8.5rem, number 1.75rem, label .8125rem.
- remove the source text-gradient from stat numbers and use the same #505050 treatment as Home PASS.
- no .mwa-hero grid/media/content positioning is changed.

Protected:
- Home Hero: PASS / LOCKED and untouched.
- About original Merywood Hero composition: restored / protected.
- Header/Footer/Cookie/Chat/Mobile Menu/Motion shared authority: unchanged.

Status:
- About Hero Desktop: PENDING OWNER TEST.
- About Hero Tablet: PENDING OWNER TEST.
- About Hero Mobile: PENDING OWNER TEST.

## ABOUT-PRODUCT-ICON1 — CATEGORY-SPECIFIC ICON SET

Owner result:
- About Hero stats parity: PASS.
- Next scope is "Danh Mục Gia Công": source Merywood icons do not accurately represent the six Bio-A cosmetic manufacturing categories.

Verified Merywood visual authority:
- icon container: .mwa-isq
- icon canvas: 24x24 SVG, rendered at 22x22
- stroke: white, 1.7px, round caps/joins
- green 44x44 rounded square and number badge are already correct and remain source-owned.

ABOUT-PRODUCT-ICON1:
- no card/grid/text/link geometry is changed.
- source category SVGs are replaced with six custom inline SVGs using the exact Merywood icon system:
  01 Makeup Products -> lipstick
  02 Hair Care -> comb
  03 Body Care -> pump lotion bottle
  04 Facial Skin Care -> serum/dropper bottle
  05 Personal Care -> soap/hygiene
  06 Mother & Baby -> baby face
- icon artwork is language-neutral, so VI and EN share the same visual mapping.
- all six use only outline paths/shapes; existing .mwa-isq svg CSS remains sole size/color/stroke authority.

Responsive status:
- About Product Categories Desktop: PENDING OWNER TEST.
- Tablet/Mobile: same source icon geometry / PENDING regression check.

## ABOUT-PRODUCT-ICON2 — REFERENCE-ALIGNED COSMETICS ICONS

Owner feedback:
- ABOUT-PRODUCT-ICON1 rendered poorly and did not match the visual language of the supplied beauty/cosmetics reference sheet.
- owner explicitly asked to use the supplied reference image as the visual guide.

ABOUT-PRODUCT-ICON2:
- replaces only the six inline SVG artworks inside aboutProductIcons.
- keeps the approved Merywood .mwa-isq container, green square, number badge, card geometry, typography, links and motion untouched.
- icon family is rebuilt as one consistent 24x24 outline system with 1.65px rounded strokes, inspired by the supplied cosmetics reference without copying its stock artwork verbatim.
- mapping:
  01 Makeup -> lipstick tube
  02 Hair Care -> conditioner bottle
  03 Body Care -> body lotion pump bottle
  04 Facial Skin Care -> face serum/dropper bottle
  05 Personal Care -> hand cream tube
  06 Mother & Baby -> baby bottle

Status:
- Desktop / Tablet / Mobile: PENDING OWNER VISUAL TEST.

## ABOUT-CTA-LOGO1 — REPLACE MERYWOOD CTA MARK

Owner request:
- while waiting for the final manufacturing-category icon assets, replace the Merywood logo in the final About CTA with the original green Bio-A logo.
- do not change CTA layout, spacing, text, background or media box dimensions.

Implementation:
- .mwa-cta__media keeps the Merywood source geometry.
- only background-image changes from the Merywood M artwork to /assets/bioa-full.svg.
- /assets/bioa-full.svg is the existing original Bio-A green logo asset (#116F47).
- adds localized aria-label to the decorative media block.
- no change to the pending About category icon work.

Status:
- About CTA Desktop/Tablet/Mobile: PENDING OWNER VISUAL TEST.

## ABOUT-PRODUCT-ICON3 — OWNER-SUPPLIED ICON ARTWORK

Owner supplied six final PNG artworks and explicitly requires artwork-only replacement.

Mapping:
- 01 Sản Phẩm Trang Điểm -> Trang Điểm.png
- 02 Sản Phẩm Chăm Sóc Tóc -> Chăm Sóc Tóc.png
- 03 Sản Phẩm Chăm Sóc Body -> Chăm Sóc Body.png
- 04 Sản Phẩm Chăm Sóc Da Mặt -> Chăm Sóc Da Mặt.png
- 05 Sản Phẩm Cá Nhân -> Cá Nhân.png
- 06 Sản Phẩm Mẹ & Bé -> Mẹ & Bé.png

Implementation:
- owner images are trimmed/centered only to remove transparent dead space and normalized to lightweight 72x72 PNG assets.
- no artwork is redrawn.
- .mwa-isq green square, 01–06 badge, product-card geometry, padding, spacing, typography, links, motion and responsive layout are unchanged.
- artwork now renders inside a 100% centered wrapper while the outer .mwa-isq green square remains source-owned and unchanged.
- base image box is 36x36px; icon 02 is 38x38px and icon 05 is 34x34px for optical balance only.
- object-fit/object-position remain contain/center on all six PNGs.
- icon 06 is re-exported from the exact owner-supplied Mẹ & Bé.png because the previous normalized repository blob was corrupt and did not decode.
- prior custom inline SVG icon attempts are retired.

Status:
- About category icon artwork: PENDING OWNER VISUAL TEST.



## ABOUT-PRODUCT-ICON4 — OPTICAL CENTERING CANDIDATE

Owner runtime feedback after 80e22e52353d9f98947042e385722ba545057dae:
- icon size is accepted;
- visible artwork is optically off-center inside the existing green .mwa-isq squares.

Root cause:
- the wrapper centers each PNG canvas, but the visible non-transparent artwork inside the PNGs has asymmetric transparent margins.

Correction:
- preserve current icon sizes and all outer/card geometry;
- apply artwork-only optical offsets:
  - 01: -4px X / +2px Y
  - 02: 0px X / -2px Y
  - 03: +2px X / +2px Y
  - 04: -3px X / 0px Y
  - 05: +3px X / -1px Y
  - 06: -4px X / +1px Y
- no card, grid, spacing, badge, text, button, motion, shared shell or responsive structure changes.

Status:
- Desktop: PENDING OWNER TEST
- Tablet: PENDING OWNER TEST
- Mobile: PENDING OWNER TEST


## ABOUT-A2 — OWNER CONFIRMED FULL RESPONSIVE PASS

Accepted checkpoint:
- 20420850dafc7d05fe9cb442209621bd3b130298 — optical centering of owner-supplied manufacturing category artwork.

Owner runtime confirmation on 2026-10-07:
- /about/ Desktop: PASS / LOCKED
- /about/ Tablet: PASS / LOCKED
- /about/ Mobile: PASS / LOCKED
- FULL RESPONSIVE PASS — OWNER CONFIRMED

Protected About state:
- Merywood About layout/runtime;
- About hero geometry with shared stats typography/width treatment;
- localized Bio-A content;
- shared Header / Tablet Header / Mobile Header / Mobile Menu;
- Footer;
- Cookie VI ↔ EN;
- Chat;
- MOTION-U1D2/shared reveal behavior;
- CTA Bio-A green logo;
- six owner-supplied manufacturing category PNGs with accepted sizes and optical offsets.

Do not reopen /about/ while implementing PATCH E unless the owner explicitly reports a regression.


## PATCH-E1 — GIA CÔNG MỸ PHẨM HUB CONTENT OWNERSHIP

Route:
- /contract-manufacturing-cosmetics/
- /en/contract-manufacturing-cosmetics/

Visual/runtime source-of-truth:
- Merywood /contract-manufacturing-cosmetics/ DOM, layout, artwork, breakpoints and source interactions.

BIO-A route owner:
- bioa-cosmetics-refine.mjs
- applyCosmeticsHubRefinement($,route,lang)
- build.mjs invokes the route owner before applySharedShell().

E1 content mapping:
- hero -> Gia Công Mỹ Phẩm Trọn Gói / Full-Service Cosmetic Manufacturing;
- 7 source feature cards -> 6 legacy BIO-A manufacturing categories + R&D/formula development;
- packaging block -> cosmetic packaging terminology while preserving source layout/artwork;
- How It Works -> ready-formula and custom-formula manufacturing workflow;
- source testimonial cards -> explicitly labeled sample collaboration scenarios, not fabricated customer claims;
- source EU/supplement certification copy -> Bio-A manufacturing/quality-control language using confirmed GMP/HACCP authority only;
- testing/QC -> microbiology, heavy metals, product-specific safety parameters, stability/sensory review and stage-by-stage QC;
- Full-Cycle Support -> consultation, R&D, packaging/brand, documentation/production/delivery;
- VI and EN are paired in the same route module.

Protected / not changed:
- /about/ FULL RESPONSIVE PASS from 20420850dafc7d05fe9cb442209621bd3b130298;
- Home;
- shared Header Desktop/Tablet/Mobile;
- Mobile Menu behavior;
- Footer;
- Cookie;
- Chat;
- shared Zalo treatment;
- MOTION-U1D2/shared reveal;
- Merywood route geometry, product imagery, source responsive mechanics and slider transform owners.

Verification:
- route module is content-only and scoped to .page-main;
- no new global CSS or shared component duplicate is introduced;
- full network build/runtime requires owner deployment because the build source is fetched from live Merywood.

Status:
- Desktop: PENDING OWNER TEST
- Tablet: PENDING OWNER TEST
- Mobile: PENDING OWNER TEST
- FULL RESPONSIVE PASS: NO


## PATCH-E2 — SHARED PARITY FIXES FOR GIA CÔNG MỸ PHẨM

Owner runtime feedback on PATCH-E1:
- motion FAIL: only titles visibly revealed;
- category artwork FAIL: Merywood icons remained;
- watermark FAIL: Merywood product-composition watermark remained visible.

Root causes:
- addSharedPageReveal() had a dedicated About branch but the cosmetics hub used the generic title-only fallback;
- E1 changed category copy only and left source Merywood artwork untouched;
- Home H4 watermark CSS was Home-scoped and was not included in sharedShellCss.

Corrections:
- /contract-manufacturing-cosmetics/ now receives a route-specific MOTION-U1 mapping using the same safe principles already PASS on Home/About:
  - title/supporting content first;
  - category cards stagger;
  - packaging swiper shell only;
  - How It Works steps;
  - review convergence;
  - safe outer content units for certification/testing/QC;
  - never transform .swiper-wrapper / .swiper-slide;
  - Roadmap repeated .step nodes remain source-transform-owned.
- manufacturing category cards 01–06 reuse the exact owner PNG assets, render sizes and optical offsets accepted on /about/;
- card 07 R&D retains its source artwork;
- SHARED-WATERMARK1 promotes the accepted Home H4 Bio-A monogram treatment to subpages using .product__composition-bg-logo.

### GLOBAL SUBPAGE INHERITANCE RULE — LOCKED

For every new route/page after Home and About:
1. first inherit all compatible PASS/LOCKED shared logic from earlier pages;
2. do not recreate or leave source-Merywood variants of a component when a Bio-A PASS equivalent already exists;
3. reuse shared Header, Tablet/Mobile Header, Mobile Menu behavior, Footer, Cookie, Chat, Zalo, language switching, title rules, motion framework and Bio-A watermark logic;
4. where the same Bio-A taxonomy/artwork is reused, use the already approved asset/mapping before inventing route-local artwork;
5. route modules own page content and genuinely page-specific mappings only;
6. owner testing on a new page should normally be limited to page-specific defects, not repeated reimplementation of already PASS shared behavior.

Protected:
- /about/ FULL RESPONSIVE PASS;
- Home PASS/LOCKED behavior;
- shared component geometry and interactions;
- PATCH-E1 content/layout;
- Merywood slider/runtime transform owners.

Status PATCH-E2:
- Desktop: PENDING OWNER TEST
- Tablet: PENDING OWNER TEST
- Mobile: PENDING OWNER TEST


## PATCH-E3 — HERO BRAND WATERMARK + FULL VI CONTENT PASS

Owner runtime feedback after PATCH-E2:
- hero composition still lacked an explicit Bio-A faded logo treatment;
- multiple deep component strings remained English;
- sample content should use BIOA-Website.zip as the first content authority.

Legacy BIOA source re-read:
- cms/pages/home.php:
  - Nhà Máy Sản Xuất Dược Mỹ Phẩm OEM/ODM Tại Việt Nam
  - BIOA Group - Đạt chuẩn GMP Bộ Y Tế
  - Bio-A đồng hành trọn gói từ ý tưởng đến sản phẩm
- cms/pages/about.php:
  - Bio-A Group is an OEM/ODM cosmetic/cosmeceutical manufacturer
  - GMP Bộ Y Tế Việt Nam
  - HACCP / hệ thống quản lý an toàn thực phẩm
  - vision/mission centered on quality products and end-to-end support

PATCH-E3 corrections:
- hero Desktop + Mobile receive a faded /assets/bioa-monogram.svg overlay without changing source hero geometry/image;
- hero copy is synchronized on both source DOM trees;
- Packaging Desktop + Mobile are mapped by component selectors, including product names, use cases, feature labels and feature text;
- Product Formats is fully localized;
- How It Works / ready-formula / custom-formula columns are fully rewritten with Bio-A sample workflow copy;
- Certification section uses only Bio-A-supported GMP Bộ Y Tế + HACCP + quality-control language;
- Testing/QC section is fully localized with project-appropriate sample copy;
- Roadmap/CTA remain on the PATCH-E1 Bio-A mapping;
- VI/EN remain paired.

Protected:
- source Merywood component/layout geometry;
- hero source product image;
- swiper runtime and transform owners;
- PATCH-E2 icons/motion/shared watermark;
- Home and /about/ PASS/LOCKED shared behavior.

Status:
- Desktop: PENDING OWNER TEST
- Tablet: PENDING OWNER TEST
- Mobile: PENDING OWNER TEST


## PATCH-E4 — HERO SOURCE-LAYER + WHY CHOOSE RESTORE

Owner feedback after PATCH-E3:
- FAIL: hero showed the original baked Merywood watermark plus a second Bio-A overlay on top of the products;
- semantic concern: repurposing the original "Why Choose Merywood" block as another manufacturing-category catalogue duplicated /about/ and changed the intent of the source component.

Root cause:
- Merywood hero watermark is baked into the source hero raster; E3 added a new DOM/CSS Bio-A layer instead of replacing the artwork source.
- E1 reused the Why Choose container for product taxonomy even though /about/ already owns the approved manufacturing category catalogue.

E4 correction:
- retire the E3 hero pseudo-element;
- hero Desktop/Mobile use /assets/cosmetics-hero-bioa.webp, derived from the exact Merywood hero composition with the Merywood watermark removed and Bio-A watermark placed in the original background treatment while preserving the product composition;
- restore the section semantic to "Tại Sao Nên Chọn Bio-A Group?" / "Why Choose Bio-A Group?";
- restore the original Merywood Why Choose source icons because this section is no longer a product-category catalogue;
- 7 cards now communicate Bio-A capabilities: OEM/ODM, R&D, GMP Bộ Y Tế, HACCP/QC, diverse product capability, packaging/finishing, and transparent/flexible partnership;
- /about/ remains the authority for the 6 owner-supplied product-category icons and category catalogue.

Protected:
- PATCH-E3 deep VI/EN mapping for Packaging / Formats / Process / Certification / QC;
- PATCH-E2 motion/shared watermark;
- Home and /about/ PASS/LOCKED shared behavior;
- hero geometry and responsive source layout.

Status:
- Desktop: PENDING OWNER TEST
- Tablet: PENDING OWNER TEST
- Mobile: PENDING OWNER TEST


## PATCH-E5 — WHY CHOOSE ICON/CONTENT SEMANTIC ALIGNMENT

Owner-confirmed:
- PATCH-E4 hero: PASS.
- Why Choose copy direction is approved, but multiple card subjects did not match the original Merywood icon semantics.

Root cause:
- E4 restored the Merywood Why Choose artwork while retaining an independently ordered capability list.
- Cards 02–07 therefore described concepts that did not visually match their icons.

Locked card/icon mapping:
- 01 factory -> Năng Lực OEM/ODM Trọn Gói;
- 02 handshake -> Hỗ Trợ Toàn Diện;
- 03 microscope -> R&D Công Thức & Làm Mẫu;
- 04 category/network -> Danh Mục Sản Phẩm Đa Dạng;
- 05 package -> Bao Bì & Hoàn Thiện Đồng Bộ;
- 06 connection/flexible -> Linh Hoạt Theo Dự Án;
- 07 certificate/document -> Hồ Sơ Trọn Gói & Minh Bạch.

Card 06 uses flexibility rather than sustainability because current Bio-A authority supports flexible project execution; no unsupported sustainability claim is introduced.

Cross-section terminology alignment:
- Roadmap step 01 -> Tư Vấn & Hỗ Trợ Toàn Diện;
- Roadmap packaging step -> Bao Bì & Hoàn Thiện Đồng Bộ;
- Roadmap final step coordinates product information, labels, documentation and approval milestones;
- Product Formats -> Dạng Sản Phẩm Gia Công Đa Dạng;
- Process -> Quy Trình Gia Công Linh Hoạt;
- manufacturing/certification block -> Năng Lực Sản Xuất & Kiểm Soát Chất Lượng;
- QC copy explicitly keeps documentation/control milestones clear.

Protected:
- PATCH-E4 hero asset/geometry — OWNER PASS / LOCKED;
- Why Choose source icons, card geometry and responsive behavior;
- all route motion/layout mechanics;
- Packaging artwork/swiper;
- Home and /about/ PASS/LOCKED shared behavior.

Status:
- Hero Desktop: PASS / LOCKED
- Why Choose + copy alignment Desktop: PENDING OWNER TEST
- Tablet: PENDING OWNER TEST
- Mobile: PENDING OWNER TEST


## PATCH-E6/E7 — HERO BLEND CLEANUP + MANUFACTURING CATEGORY HUB

Owner status before this candidate:
- PATCH-E5 Why Choose/content: temporarily accepted.
- E4 Hero layout/content was accepted, then a later close visual review found a rectangular raster compositing artifact behind the tube.

E6:
- replace only assets/cosmetics-hero-bioa.webp with one flattened seamless composition;
- preserve product objects, source hero DOM/geometry and cover/center behavior;
- no second watermark layer.

E7:
- add #bioa-cosmetics-categories after #why-choose-us and before Packaging;
- use the approved six /about/ taxonomy groups, PNGs, sizes and optical offsets;
- large rounded 2-column cards on Desktop/Tablet; 1-column Mobile;
- faint Bio-A monogram treatment inside cards;
- no invented links before product subpage authority is finalized.

Shared UX/Motion:
- bioa-home-refine.mjs / addSharedPageReveal() remains motion authority;
- section heading fade-up; cards staggered fade-up;
- no new motion engine, no swiper transform changes.

Protected:
- Why Choose E5;
- Packaging / Process / Certification / QC;
- Header/Footer/Cookie/Chat/Mobile Menu/Zalo/language switching;
- Home and /about/ PASS/LOCKED.

Status:
- E6 Desktop/Tablet/Mobile: PENDING OWNER TEST
- E7 Desktop/Tablet/Mobile: PENDING OWNER TEST


## PATCH-E8 — HERO LAYER REBUILD + CATEGORY HOVER + MOTION-U1D3

Owner feedback after E6/E7:
- Hero still showed an unnatural repaired/background shape behind the tube/product composition.
- Manufacturing Categories layout is accepted, but the small top-left eyebrow must be removed.
- Bio-A watermark inside category cards should inherit the accepted Home hover behavior.
- Reveal motion across pages/devices feels too delayed; content should appear sooner and complete faster without changing the established motion language.

Root cause:
- E6 reused a previously repaired raster. The Merywood watermark had been painted over/replaced in-place, so faint source/repair geometry could still read as a rectangular/ghost layer.
- MOTION-U1 still used 700ms base duration plus full per-item delays and late IntersectionObserver root margins (-150px Desktop / -80px Mobile).

E8 Hero correction:
- rebuild assets/cosmetics-hero-bioa.webp from explicit layers:
  1. clean neutral hero background,
  2. one subtle Bio-A monogram watermark,
  3. original product/stone/plant foreground above it;
- no Merywood watermark remains;
- Bio-A watermark is physically behind the foreground rather than painted across products;
- preserve source product composition, hero geometry, cover/center behavior and responsive DOM.

E8 category refinement:
- remove only the small "GIA CÔNG MỸ PHẨM" / English eyebrow from #bioa-cosmetics-categories;
- keep title, intro, cards, spacing, taxonomy and responsive grid unchanged;
- category watermark now reuses Home watermark interaction grammar:
  - normal scale 1 / opacity .075;
  - pointer-hover scale 1.07 / opacity .105;
  - .35s ease;
  - no sticky touch hover behavior.

MOTION-U1D3 global tuning:
- same fade-up / fade-left / fade-right language and transform ownership rules;
- Desktop base duration: 700ms -> 580ms;
- Desktop slider special duration: 560ms -> 500ms;
- Tablet duration: 520ms with reduced delay factor;
- Mobile duration: 500ms -> 410ms;
- base delay factor: 1.00 -> .68;
- Tablet delay factor: .60;
- Mobile delay factor: .40;
- travel distance reduced for smoother entry;
- observer reveal line moved earlier:
  - Desktop root margin -150px -> -64px;
  - Mobile root margin -80px -> -28px;
- initial in-view threshold also moved closer to the viewport edge;
- applied to both Home reveal and shared subpage reveal, so all current/future routes inherit the same faster cadence.

Protected:
- Why Choose E5;
- E7 Manufacturing Category geometry/content/icons;
- Packaging / Process / Certification / QC;
- Header/Footer/Cookie/Chat/Mobile Menu/Zalo/language switching;
- Swiper transform owners;
- reduced-motion accessibility behavior.

Status:
- Hero Desktop/Tablet/Mobile: PENDING OWNER TEST
- Category eyebrow/hover: PENDING OWNER TEST
- MOTION-U1D3 all routes/devices: PENDING OWNER TEST


## PATCH-E9 — HEADER TOP PARITY + SECTION RHYTHM + HERO WATERMARK OPTICAL CENTER

Owner feedback after PATCH-E8:
- header at the top of the page still showed a separate tinted shell instead of visually merging with the hero like Merywood;
- #bioa-cosmetics-categories had too much vertical space above/below compared with the source section rhythm;
- hero watermark artwork is accepted, but its optical placement needs centering.

Root causes:
- early shared CSS still forced a translucent ivory header background at scroll-top;
- E7 introduced 110px / 88px / 72px outer section padding, which is larger than neighboring source-owned blocks;
- E8 watermark bounds were left-biased inside the hero raster even though the layer itself was clean.

E9 corrections:
- shared Header top-state authority:
  - <=8px scroll: header shell transparent, no shadow;
  - after leaving top: light ivory readable sticky surface;
  - mobile menu open always restores the readable surface;
  - same logic applies Home + subpages + all breakpoints;
- Manufacturing Categories outer padding only:
  - Desktop 110px -> 76px;
  - Tablet 88px -> 64px;
  - Mobile 72px -> 52px;
  - card/grid/title/content geometry unchanged;
- hero asset:
  - preserve clean E8 layer construction;
  - shift only Bio-A watermark optical center to the composition center;
  - foreground products/stone/plants and hero DOM/cover geometry unchanged.

Protected:
- MOTION-U1D3 timing;
- E7 card hover/watermark behavior;
- Why Choose / Packaging / Process / Certification / QC;
- Header nav/action geometry, mobile menu behavior, language, Zalo;
- Home and /about/ PASS content/layout.

Status:
- Header top parity all routes/devices: PENDING OWNER TEST
- E7 spacing all devices: PENDING OWNER TEST
- Hero watermark position: PENDING OWNER TEST


## PATCH-E10 — HOME HEADER WIRING + E8 HERO RESTORE + SOURCE RHYTHM

Owner feedback after E9:
- Home header still showed a tinted top band.
- E9 hero watermark positioning was worse than E8.
- E7 Manufacturing Categories still had visibly more vertical breathing room than surrounding source sections.

Root cause:
- HEADER-TOP1 CSS existed and runtime classes were active, but applyHomeRefinement() did not include patchHeaderTopParityCss in the Home-only stylesheet chain. Shared subpages did include it.
- E9 unnecessarily shifted the already accepted E8 watermark layer.
- E9 category padding remained larger than the source section rhythm.

E10:
- wire patchHeaderTopParityCss into the Home stylesheet chain; no header architecture/position changes;
- keep addHeaderTopParity() runtime owner unchanged;
- restore assets/cosmetics-hero-bioa.webp exactly to PATCH-E8 blob;
- reduce only #bioa-cosmetics-categories outer padding:
  - Desktop 44px;
  - Tablet 36px;
  - Mobile 30px;
- card geometry, grid, icon treatment, hover, copy and MOTION-U1D3 unchanged.

Protected:
- Header geometry/actions/menu behavior;
- MOTION-U1D3;
- Why Choose / Packaging / Process / Certification / QC;
- E7 card internals;
- Home and /about/ locked shared components.

Status:
- Home top header: PENDING OWNER TEST
- Hero watermark: restored to E8 baseline / PENDING OWNER TEST
- Category section rhythm: PENDING OWNER TEST


## PATCH-E11 — COSMETICS ICON/COPY FINAL ALIGNMENT — PASS

Final owner review:
- /contract-manufacturing-cosmetics/ visual/layout/motion/header/hero/category hub: PASS.
- final semantic audit compared visible source icons against the rendered VI/EN copy.

Two final copy/order corrections:
1. Ready Formula step 04:
   - source icon reads as documentation/certificate;
   - title changed from "Chuẩn Bị Bao Bì & Sản Xuất" to "Hoàn Thiện Hồ Sơ & Bao Bì";
   - copy now explicitly covers product information, required documentation, containers, labels and packing specifications before production.
2. Product Quality Testing check-card order:
   - 01 Zn/metal icon -> Kiểm Tra Kim Loại Nặng;
   - 02 strength/stability icon -> Độ Ổn Định & Cảm Quan;
   - 03 leaf icon -> Chỉ Tiêu An Toàn Theo Sản Phẩm;
   - 04 health/medical icon -> Kiểm Tra Vi Sinh.
   - English order updated identically.

Confirmed aligned without further changes:
- Custom Formula: direction / R&D / sample approval / production completion;
- Stage-by-Stage QC: incoming material / in-process / finished-goods inspection;
- Why Choose E5 icon/content mapping;
- E7 manufacturing category PNG/content mapping;
- Packaging content and product-format relationships.

LOCKED / PASS:
- /contract-manufacturing-cosmetics/ Desktop baseline;
- shared Header transparent-top behavior;
- Hero E8 watermark baseline;
- Manufacturing Categories layout/hover;
- MOTION-U1D3;
- Why Choose / Packaging / Process / Certification / QC geometry;
- VI/EN content mapping.

Next project page:
- move to "Dịch Vụ Khác" only after this commit.


## PATCH-F1 — OTHER SERVICES INITIAL BUILD

Route:
- /dich-vu-khac/
- EN pair: /en/dich-vu-khac/
- visual/runtime source: Merywood /hotel-spa-cosmetics/
- content source: owner-supplied BIOA-Website.zip plus concise sample copy where the legacy source has no one-to-one section.

New owner:
- bioa-services-refine.mjs
- build.mjs calls applyOtherServicesRefinement() before applySharedShell().

Initial VI/EN mapping:
- Hero -> Bio-A brand-support services.
- Why Choose source grid -> integrated support services:
  1. professional project support,
  2. consultation/planning,
  3. documentation/product notification,
  4. flexible project solutions,
  5. pre-production completion support.
- How It Works source block -> 6-step support process:
  consultation, R&D/sampling, ingredients/specifications, sample approval, packaging/labels, documentation/product notification.
- Reviews source slider -> three project-use scenarios, not fictional testimonials.
- Product Range source slider -> example product groups that can use the support services.

Content authority used from legacy BIOA source:
- formula/ingredient/product-format/sample R&D consultation;
- packaging/container/label/brand-presentation support;
- documentation/product-notification guidance before mass production;
- flexible support by project scale/stage.

PASS inheritance:
- shared Header/Desktop/Tablet/Mobile;
- transparent top-header behavior;
- Footer + hover/meta;
- Cookie VI/EN;
- Chat/Zalo;
- Mobile Menu outside/scroll dismiss;
- MOTION-U1D3;
- shared responsive behavior;
- title capitalization;
- Bio-A watermark treatment.
No new motion engine or duplicated shared component was introduced.

Temporary visual decision:
- Hero reuses the already clean PASS Bio-A cosmetics hero asset instead of the Merywood hotel/spa raster, avoiding reintroduction of the baked Merywood watermark.
- owner may replace this with a dedicated Other Services hero artwork in a later small patch.

Status:
- Desktop: PENDING OWNER TEST
- Tablet: PENDING OWNER TEST
- Mobile: PENDING OWNER TEST


## PATCH-F2 — OTHER SERVICES BIO-A TAXONOMY + ICON + MOTION ALIGNMENT

Owner feedback:
- most Other Services sections had no reveal motion;
- service icons did not match the copy;
- product-range card icon should use the accepted Bio-A monogram treatment;
- F1 service taxonomy was too generic compared with Bio-A's actual service list;
- source-page suitability was reopened.

Source-page decision:
- KEEP Merywood /hotel-spa-cosmetics/ as the visual/runtime source.
- Reason: it maps cleanly to this route with 5 service pillars + 6-step How It Works + product-range slider.
- /private-label-cosmetics/ and /white-label-cosmetics/ add Packaging/Product Formats/Right Choice/Roadmap blocks that duplicate the already PASS Cosmetics route and would require broader restructuring.

Bio-A service taxonomy authority:
1. Sản Xuất & Gia Công Dược Mỹ Phẩm
2. Đóng Gói & Sang Chiết Mỹ Phẩm
3. Đăng Ký Thương Hiệu & Công Bố
4. Chai Lọ Mỹ Phẩm
5. Thiết Kế Bao Bì Mỹ Phẩm

Service icon authority:
- use exact icon artwork from the supplied Merywood export; no redrawing:
  1. factory/manufacturing;
  2. packed units;
  3. document/compliance;
  4. cosmetic jar/container;
  5. label/design.
- Desktop and Mobile use the same positional mapping.

How It Works content is re-aligned to the original source icons:
1. consultation;
2. formula/product direction;
3. packaging & label design;
4. sample/spec approval;
5. manufacturing/filling/packing;
6. documentation/product notification.

Product Range:
- all repeated product icons now use /assets/bioa-monogram-cream.svg, matching the accepted Bio-A shared artwork language.

MOTION-U1D3:
- explicit /dich-vu-khac/ branch added to addSharedPageReveal();
- Hero, service pillars, workflow clients, scenarios and product-range steps now receive source-safe reveal targets;
- Swiper wrappers/slides remain transform owners and are not marked.

Protected:
- Header/Footer/Cookie/Chat/Zalo/Mobile Menu/VI-EN;
- Home/About/Cosmetics PASS;
- global MOTION-U1D3 timing values;
- source swiper mechanics and responsive geometry.

Status:
- Desktop: PENDING OWNER TEST
- Tablet: PENDING OWNER TEST
- Mobile: PENDING OWNER TEST


## PATCH-F3 — BIO-A MONOGRAM + EXPANDED RANGE + VI AUDIT

Owner feedback:
- service-pillar icons should use the same Bio-A monogram treatment already PASS on Home rather than category-specific Merywood icons;
- Product Range should be broader than the original seven Hotel/SPA formats;
- several English source strings remained visible on the VI route, notably the shared CTA title.

F3 icon authority:
- all five #why-choose-us service-pillar artwork slots -> /assets/bioa-monogram-cream.svg;
- Product Range step icon remains /assets/bioa-monogram-cream.svg;
- source green icon-box geometry is preserved.

Expanded Product Range:
- 7 -> 12 groups:
  Shower Gel, Shampoo, Conditioner, Facial Cleanser, Serums & Essences,
  Face Cream, Face Masks, Body Scrub, Body Cream & Lotion,
  Makeup Products, Personal Care Products, Mother & Baby Products.
- VI/EN copy pairs supplied for all 12.
- source .step nodes are cloned before runtime until the data count is reached;
- step numbering is normalized 01–12;
- original seven source product visuals stay untouched;
- cloned groups use the clean Bio-A cosmetics composition instead of repeating a semantically incorrect Hotel/SPA bottle image;
- Swiper ownership/runtime remains source-owned.

VI audit:
- shared CTA owner now localizes BOTH title and description/button:
  VI title = "Trao Đổi Về Dự Án Của Bạn";
  EN title = "Let’s Discuss Your Project".
- exact Hotel/SPA source headings are also sanitized on the VI route after route content mapping to prevent any source-text leakage.

Protected:
- /dich-vu-khac/ F2 motion mapping;
- Hotel/SPA source geometry and swiper mechanics;
- Header/Footer/Cookie/Chat/Zalo/Mobile Menu;
- Home/About/Cosmetics PASS.

Status:
- Desktop: PENDING OWNER TEST
- Tablet: PENDING OWNER TEST
- Mobile: PENDING OWNER TEST


## PATCH-F4 — ICON SCOPE ROLLBACK + PRODUCT RANGE SWIPER REPAIR

Owner feedback after F3:
- F3 overreached by replacing all service-pillar icons with Bio-A monograms.
- Original request applied only to the Merywood brand-mark icon inside "Quy Trình Triển Khai Dịch Vụ".
- Product Range layout was broken after expansion to 12 groups.

Root causes:
1. Icon scope:
   - #why-choose-us had already-correct semantic icons in F2.
   - F3 replaced all five unnecessarily.
2. Product Range:
   - source hierarchy is .swiper-wrapper > .swiper-slide > .step.
   - F3 cloned .step children into the first .swiper-slide, stacking products vertically inside one slide.

F4 corrections:
- restore the F2 five semantic service icons for "Dịch Vụ Bio-A Group";
- in .block-right-choice only process item 03 (Packaging & Label Design) replaces the source Merywood brand-mark artwork with /assets/bioa-monogram-cream.svg;
- process items 01, 02, 04, 05, 06 retain their original source icons;
- Product Range keeps all 12 VI/EN groups from F3 but expansion now clones complete .swiper-slide nodes into .swiper-wrapper;
- apply to both source Desktop and Mobile blocks;
- normalize 01–12 numbering;
- preserve source Swiper navigation and card geometry;
- Product Range icons remain Bio-A monogram as specifically approved by owner.

Protected:
- F2/F3 content taxonomy;
- MOTION-U1D3;
- shared CTA localization;
- Header/Footer/Cookie/Chat/Zalo/Mobile Menu;
- Home/About/Cosmetics PASS.

Status:
- service icons: PENDING OWNER TEST
- process icon 03: PENDING OWNER TEST
- 12-item Product Range Desktop/Tablet/Mobile: PENDING OWNER TEST


## PATCH-F5 — PRODUCT RANGE SOURCE-PARITY RESET

Owner feedback after F4:
- Product Range was structurally fixed but semantically wrong.
- Expanded 12-group taxonomy duplicated the manufacturing-category role already owned by /contract-manufacturing-cosmetics/.
- Owner asked whether the section title should return closer to Merywood /hotel-spa-cosmetics/.

Source audit:
- Merywood section title: "Our Product Range".
- Exact seven source product formats:
  1. Shower Gel
  2. Shampoo
  3. Conditioner
  4. Soap
  5. Body Cream
  6. Lotion
  7. Scrub
- Each source slide has a dedicated product image matching that concrete format.

F5 decision:
- VI title -> "Danh Mục Sản Phẩm".
- EN title -> "Product Range".
- Restore exactly seven concrete product formats matching source semantics.
- Remove all 12-group manufacturing taxonomy additions.
- Remove slide-cloning logic entirely.
- Preserve the seven original source product images and source Swiper geometry/runtime.
- Replace only the small Merywood logo artwork in each product card with Bio-A monogram, as owner previously approved.

Semantic separation locked:
- /contract-manufacturing-cosmetics/ owns broad manufacturing categories.
- /dich-vu-khac/ Product Range shows concrete example product formats only.
- Do not merge or duplicate those roles.

Protected:
- F4 service icon rollback;
- only workflow step 03 Bio-A icon replacement;
- F2/F3 motion and VI localization;
- Header/Footer/Cookie/Chat/Zalo/Mobile Menu;
- Home/About/Cosmetics PASS.

Status:
- Product Range Desktop/Tablet/Mobile: PENDING OWNER TEST


## PATCH-F6 — SINGLE SERVICE SHOWCASE / REMOVE DUPLICATION

Owner decision:
- keeping both the static "Dịch Vụ Bio-A Group" five-card grid and a second image-led service section would duplicate the same semantic role;
- the image-led Merywood slider is visually stronger and should replace the static grid.

F6 structure:
1. Hero
2. Dịch Vụ Bio-A Group — image-led source Swiper
3. Quy Trình Triển Khai Dịch Vụ
4. Giải Pháp Theo Từng Nhu Cầu
5. CTA
6. Footer

Removed:
- #why-choose-us static five-card service grid on /dich-vu-khac/ only.

Promoted source block:
- .block-how-works is moved immediately after the Hero.
- source Swiper/card geometry remains Merywood-owned.
- source has seven product slides; F6 keeps the first five image-led cards only and maps the five actual Bio-A services:
  1. Sản Xuất & Gia Công Dược Mỹ Phẩm
  2. Đóng Gói & Sang Chiết Mỹ Phẩm
  3. Đăng Ký Thương Hiệu & Công Bố
  4. Chai Lọ Mỹ Phẩm
  5. Thiết Kế Bao Bì Mỹ Phẩm
- VI title: "Dịch Vụ Bio-A Group".
- EN title: "Bio-A Group Services".
- source product imagery is temporarily retained as the visual carrier; no new generated artwork.
- small Merywood mark in each card remains replaced with Bio-A monogram.

Protected:
- F4 workflow icon scope (only process item 03 uses Bio-A mark);
- F2 MOTION-U1D3;
- Hero/shared Header/Footer/Cookie/Chat/Zalo/Mobile Menu;
- Home/About/Cosmetics PASS.

Status:
- Desktop: PENDING OWNER TEST
- Tablet: PENDING OWNER TEST
- Mobile: PENDING OWNER TEST


## PATCH-G1 — BLOG INITIAL BIO-A ARCHIVE BUILD

Owner direction:
- đổi nhãn "Kiến Thức" thành "Blog";
- lấy bài viết cũ của website Bio-A làm content source;
- giữ Merywood Blog làm visual/runtime source;
- kế thừa toàn bộ shared PASS phù hợp.

Content:
- dùng 7 bài `kien-thuc` mới nhất trong backup website Bio-A cũ;
- VI giữ title, excerpt và nội dung bài gốc;
- ảnh thumbnail gốc được tối ưu WebP và đưa vào /assets/blog/;
- EN dùng title/excerpt biên tập tương ứng, trang chi tiết EN dùng bản archive overview ngắn để không rò tiếng Việt.

Blog index:
- source visual: Merywood /blog/;
- Hero: Blog Bio-A Group;
- 1 bài feature + 6 card grid;
- bỏ pagination Merywood ở candidate đầu;
- toàn bộ card link tới route bài viết thật.

Article detail:
- source visual/runtime: Merywood /blog/cosmetic-manufacturing-process/;
- Bio-A owner thay title/date/read time/author/hero/body/TOC/prev-next;
- author = Bio-A Group;
- nội dung cũ được sanitize nhưng giữ heading, paragraph, list, emphasis;
- bỏ green-card sales claim của Merywood;
- shared Bio-A CTA/chat/footer vẫn dùng owner chung.

Shared PASS:
- Header Desktop/Tablet/Mobile + transparent top;
- Mobile Menu outside/scroll dismiss;
- Footer/hover/meta;
- Cookie VI/EN;
- Chat/Zalo;
- responsive;
- MOTION-U1D3.

Status:
- /blog/: PENDING OWNER TEST
- 7 detail routes: PENDING OWNER TEST


## PATCH-G2 — BLOG SEO REWRITE + HERO WATERMARK BALANCE

Owner feedback:
- Blog hero Bio-A monogram was visually pulled too far upward.
- Raw legacy article bodies exposed editorial markers and duplicated promotional/contact copy.
- All seven articles already promoted in G1 must be rewritten as clean Bio-A editorial content while retaining the Merywood article shell.

Root cause:
- G1 intentionally preserved legacy `bodyVi` almost verbatim.
- That payload contained authoring markers such as `CTA Section` / `Section nội dung chính`, duplicated CTA/contact blocks and unsupported legacy marketing claims.
- G1 replaced Merywood article typography with additional route CSS instead of letting the source text-block styles remain primary.
- The tall Bio-A monogram needed a small optical shift inside the source hero image box.

G2 implementation:
- `bioa-blog-refine.mjs` now stores seven clean structured article records rather than raw archive HTML.
- VI and EN are full paired editorial mappings.
- Article HTML is generated only from known headings, paragraphs and bullet lists; legacy raw HTML is no longer rendered.
- TOC is generated from the same H2 data as article content, preventing stale/mismatched anchors.
- Removed raw archive CTA labels, duplicate contact/address/email blocks, competitor top-list filler and unsupported treatment/penetration claims.
- Restored Merywood text-block typography as presentation authority; only small Blog-specific utility styling remains.
- Added article-specific SEO title/description, OG/Twitter image metadata and BlogPosting JSON-LD.
- Existing seven slugs and image assets remain stable.
- Blog hero monogram keeps the same source element and is optically shifted down via object-position only:
  Desktop 58%, Tablet 56%, Mobile 54%.

Protected / unchanged:
- shared Header Desktop/Tablet/Mobile;
- Mobile Menu behavior;
- Footer;
- Cookie VI/EN;
- Chat/Zalo;
- Home/About/Cosmetics/Other Services;
- shared MOTION-U1D3;
- Merywood Blog DOM/runtime shell and prev/next mechanics.

Status:
- CODE/SYNTAX CHECK: PASS.
- Desktop: PENDING OWNER TEST.
- Tablet: PENDING OWNER TEST.
- Mobile: PENDING OWNER TEST.


## PATCH-G3 — BLOG MERYWOOD RICH ARTICLE PARITY + FIXED WATERMARK

Owner runtime result for G2:
- content cleanup/SEO direction retained;
- Blog index watermark still sat too high and did not remain visible while scrolling;
- detail pages were visually too flat because G2 rendered the article into one text block;
- owner supplied `what-affects-moq-in-supplement-manufacturing-export.zip` as the exact article-layout reference.

Verified root cause:
- G2 used `/blog/cosmetic-manufacturing-process/` only as a shell and replaced `.bb-content-col` with one flat section.
- The supplied source article uses a richer sequence: text blocks, wide image, 2/3-card grids, mid-article green CTA, flexible table/checklist, conclusion green CTA and source prev/next navigation.
- The Blog index watermark remained an image owned by the hero box, so it could not stay fixed through page scroll.

G3 implementation:
- Blog detail visual/runtime source is now Merywood `/blog/what-affects-moq-in-supplement-manufacturing/`.
- Seven Bio-A article routes retain their rewritten G2 VI/EN editorial content and SEO metadata.
- Content is projected into source Merywood modules rather than flattened:
  - numbered H2 text blocks;
  - source wide image block;
  - source 2/3-card grids;
  - source mid-article green CTA;
  - source flexible checklist table;
  - source conclusion green CTA;
  - source prev/next card mechanics.
- TOC headings use the same numbered H2 data as visible content.
- all visible Merywood CTA/media payloads in those modules are replaced by Bio-A content/assets.
- Blog detail MOTION-U1D3 now marks the added source-safe modules without touching slider/translate owners.

Blog index watermark:
- source hero watermark image is visually retired;
- `body.bioa-blog-index` owns the same Bio-A monogram as a fixed page background;
- Desktop: centered at 58vh, max width 650px;
- Tablet: 56vh, max width 590px;
- Mobile: 52vh, max width 520px;
- background attachment is fixed, so the monogram remains visible as the owner scrolls.

Protected:
- Home/About/Cosmetics/Other Services;
- shared Header/Footer/Cookie/Chat/Zalo/Mobile Menu;
- shared language behavior;
- article slugs, thumbnails and G2 SEO metadata.

Verification:
- exact supplied Merywood source structure inspected from ZIP;
- expected source selectors confirmed: text-block, image-block, merywood-cg-wrap, block-green-card, block-flex-table, bb-post-nav-wrap;
- JS syntax check PASS.
- Desktop/Tablet/Mobile runtime: PENDING OWNER TEST.


## PATCH-G4 — BLOG WATERMARK + RICH MODULE GEOMETRY HOTFIX

Owner runtime feedback on G3:
- Blog watermark was technically fixed but visually wrong: full green artwork was too strong and not centered like the site's other watermark treatments.
- rich article card modules appeared as protruding/plain text instead of stable source-style cards;
- flexible-table header type was too heavy and looked compressed in the Bio-A font stack.

Root cause:
- G3 used the original green SVG directly as a fixed body background with no independent opacity treatment.
- rich modules still depended on duplicated inline source component CSS; after the Bio-A transform/shared-shell path this was not deterministic enough for the cloned card grids.
- the source flex-table explicitly uses font-weight 800 for header cells, which is too aggressive for Bio-A's current Manrope treatment.

G4 implementation:
- watermark remains fixed to viewport but is now centered at 50%/50%;
- an ivory 94% veil is layered above the same Bio-A SVG, leaving a ~6% visual watermark comparable to other site watermark treatments;
- no new artwork generated and the shared monogram asset is unchanged;
- rich article modules are clamped to the real bb-content-col width;
- Merywood 1/2/3-column card modules receive deterministic route-scoped grid/card geometry and source colors;
- Desktop 2/3-column modules stay 2/3 columns; <=1024 collapses safely to one column;
- green cards/images remain inside the same article content rail;
- flex table remains the Merywood table pattern but header weight is normalized 800 -> 600 and desktop type size is reduced;
- mobile table keeps horizontal scrolling rather than crushing three columns.

Protected:
- seven G2/G3 article content records and SEO;
- source route /blog/what-affects-moq-in-supplement-manufacturing/;
- shared Header/Footer/Cookie/Chat/Zalo/Mobile Menu;
- Home/About/Cosmetics/Other Services;
- MOTION-U1D3 ownership.

Status:
- JS syntax PASS.
- Desktop/Tablet/Mobile: PENDING OWNER TEST.


## PATCH-G5 — BLOG CTA CONTRAST + PREVIOUS ARROW DIRECTION

Owner test after G4:
- watermark PASS and is now LOCKED;
- green-card CTA label became visually submerged because the Bio-A anchor inherited the source white text but no longer inherited the original source button surface;
- previous-article control used the same right-facing SVG geometry as next article.

G5:
- restore white Merywood-style CTA surface inside Bio-A green cards;
- Bio-A green text/icon on white CTA, with soft ivory hover;
- previous article arrow is mirrored 180deg; next article remains unchanged;
- no changes to article content, rich-layout geometry, watermark, shared shell or motion.

Status:
- code/syntax PASS;
- owner runtime test pending.


## PATCH-G5 — OWNER PASS / BLOG VISUAL LOCK

Owner confirmed PATCH-G5 PASS.
Locked Blog surfaces now include:
- fixed centered low-contrast Blog watermark;
- rich Merywood article modules and responsive geometry;
- flex-table typography normalization;
- white CTA on green cards;
- Previous arrow left / Next arrow right.

## PATCH-G6 — LEGACY BLOG ARCHIVE COMPLETION + CONTENT CONTRACT

Scope:
- migrated the remaining 31 published legacy `kien-thuc` topics, bringing Blog authority to 38 structured articles total;
- preserved all legacy slugs;
- rewrote legacy topics instead of rendering old HTML;
- stale ranking/list content is reframed as durable verification/checklist content;
- health/DIY/SPF/oral/intimate-area topics use conservative, non-treatment claims and professional-care/testing notes where appropriate;
- Blog index expands by cloning the existing Merywood card template so all 38 records are represented;
- created `docs/BLOG_CONTENT_CONTRACT.md` as the mandatory locked authority for future AI SEO/content work;
- `AGENTS.md`, workflow and content guide now point to that contract.

Protected / no redesign:
- PATCH-G5 Blog visual runtime remains LOCKED;
- shared Header/Footer/Cookie/Chat/Zalo/Mobile Menu remain untouched;
- Home/About/Cosmetics/Other Services remain untouched.

Verification before push:
- structured article count: 38;
- legacy remaining article count migrated: 31;
- duplicate IDs/slugs: none expected;
- JS parse/syntax validation: PASS.

Runtime status:
- owner final test: PENDING.


## PATCH-G7 — BLOG ARCHIVE PAGINATION SOURCE PARITY

Owner rejected G6 index density:
- all 38 articles were rendered on one page;
- Merywood source uses one featured + six cards = seven articles per archive page.

G7:
- restores source pagination behavior;
- BLOG_PAGE_SIZE is locked to 7;
- each page maps 1 featured + up to 6 standard Merywood cards;
- routes: /blog/ then /blog/page/2/ ... /blog/page/6/;
- current 38 articles resolve to 6 pages: 7/7/7/7/7/3;
- source .posts-grid-pagination and page-numbers markup retained;
- previous/next pagination controls use « / » source behavior;
- EN mirrors pagination under /en/blog/page/N/;
- page-specific canonical/title added.

Protected:
- all 38 article records;
- article detail G5 visual/runtime PASS;
- Blog watermark PASS/LOCKED;
- shared Header/Footer/Cookie/Chat/Zalo/Mobile Menu;
- Home/About/Cosmetics/Other Services.

Status:
- code/syntax PASS;
- owner runtime test pending.


## PATCH-G8 — BLOG PAGINATION VISUAL PARITY + SHARED TOC CTA

Owner feedback after G7:
- pagination logic/count is correct but visual treatment is too button-like compared with Merywood;
- TOC contact CTA must reuse the already-PASS shared contact treatment used across the site.

G8:
- keeps G7 pagination routing and 7-post/page logic unchanged;
- pagination is visually normalized to Merywood: compact centered numbers, transparent inactive pages, only current page filled, simple prev/next glyphs;
- current-page fill uses Bio-A primary green while retaining Merywood geometry;
- TOC CTA keeps its source geometry and Zalo destination but now uses the shared PASS Bio-A Zalo artwork asset and shared contact label:
  VI: "Liên Hệ Với Chúng Tôi";
  EN: "Contact us";
- no article-content, SEO, route, watermark, rich-detail layout, Header/Footer/Chat/Cookie changes.

Status:
- syntax PASS;
- owner runtime test pending.


## BLOG PHASE — OWNER CONFIRMED PASS / LOCKED

Accepted Blog checkpoint:
`ed5fc8f86042a08b2ca8d34b7cfa95f92e26d5bd` — PATCH-G8

Owner confirmation:
- Blog phase: PASS;
- archive pagination: 7 articles/page with source-like pagination;
- TOC CTA shared treatment: PASS;
- article rich layout, watermark, green-card CTA and previous/next behavior remain LOCKED;
- `docs/BLOG_CONTENT_CONTRACT.md` remains mandatory authority for future Blog SEO/content work.

Do not reopen Blog while implementing Contacts unless explicitly requested.

## CONTACT-C1 — BIO-A CONTACT DATA + FULL VI LOCALIZATION

Scope:
- create dedicated `bioa-contacts-refine.mjs`;
- preserve Merywood `/contacts/` DOM/layout/runtime;
- replace all Merywood contact identity and visible contact-page English on the VI route;
- keep paired EN content for `/en/contacts/`;
- install exact owner-supplied Google Maps iframe.

BIO-A contact payload:
- company: Nhà Máy Sản Xuất Dược Mỹ Phẩm Bio-A Group;
- email: contact@bioagroup.vn;
- Hotline/Zalo: 0779 399 379;
- MST: 0318126597;
- address: 496/63/10H Dương Quảng Hàm, An Nhơn, Hồ Chí Minh, Việt Nam;
- working hours: Thứ 2–Thứ 7, 08:30–17:30.

FAQ policy:
- remove Merywood-specific EU/Estonia/shipping/certification statements;
- avoid hard-coded unsupported MOQ and lead-time promises;
- replace with Bio-A project-specific FAQ about MOQ, timeline, R&D samples, packaging/document support and brief preparation.

Protected:
- shared Header/Footer/Cookie/Chat/Zalo/Mobile Menu;
- Blog PASS/LOCKED;
- Home/About/Cosmetics/Other Services;
- Merywood contact-page geometry and FAQ interaction.

Verification:
- dedicated module syntax: PASS;
- source selectors confirmed against owner-supplied Merywood export;
- full build cannot be executed in the isolated container because the build fetches live Merywood source and network/DNS is unavailable;
- Desktop/Tablet/Mobile runtime: PENDING OWNER TEST.


## CONTACT-C1 — OWNER CONFIRMED PASS

Accepted checkpoint:
`2279111d232cefe7c0d40fba7ee8da4b81927e7a`

Contact page content/company/map localization is owner-confirmed PASS before shared-mobile closeout changes.

## SHARED-MOBILE1 — COOKIE COMPLETION + MOBILE BOTTOM NAV + DIRECTIONAL CHROME

Owner request:
- after cookie choice confirmation, hide the floating cookie gear site-wide on all devices;
- preserve the existing consent popup/state runtime;
- add Mobile quick navigation;
- lift Cookie/Chat above the Mobile bar;
- Mobile scroll down hides Header + bottom bar; scroll up restores both.

Implemented:
- Merywood remains cookie-consent authority;
- Bio-A adds only a presentation completion flag `bioa_cookie_decided_v1`;
- confirmed Accept / Necessary / Save / Accept-all actions set that flag;
- previously stored source consent is detected conservatively for returning users;
- `html.bioa-cookie-decided #mw-gear` is hidden on Desktop/Tablet/Mobile;
- Mobile bottom navigation:
  Trang Chủ · Gia Công · Dịch Vụ · Blog · Liên Hệ;
- EN has paired labels/routes;
- active route receives `aria-current="page"`;
- Chat, Cookie gear and visible consent card are offset above the Mobile bar;
- scroll-direction state: `body.bioa-mobile-chrome-hidden`;
- down-scroll hides Header + bottom nav; up-scroll restores;
- top zone and open Mobile Menu force Header visible;
- when the bottom bar auto-hides, floating controls reclaim the bottom edge.

Responsive:
- Desktop: cookie completion behavior only.
- Tablet: cookie completion behavior only.
- Mobile: new bottom bar + directional chrome + floating offsets.

Protected:
- shared Header/menu content and menu runtime;
- Footer;
- cookie consent choices/state/modal logic;
- accepted Chat shell/content/open-close behavior;
- Blog PASS/LOCKED;
- Contacts PASS;
- route page layouts.

Status:
- CODE/SYNTAX PASS;
- RUNTIME: PENDING OWNER TEST.


## SHARED-MOBILE1A — MOBILE BOTTOM NAV COLLISION + VISUAL POLISH

Owner runtime feedback on SHARED-MOBILE1:
- Chat launcher overlapped the Contact bottom-nav item.
- Cookie gear required the same collision audit.
- nav icons felt visually weak/inconsistent with site icon DNA.
- labels appeared soft/clipped at the lower edge.

Root cause:
- legacy Chat PATCH C2 is concatenated after the initial bottom-nav CSS and reasserted `bottom:12px!important` on Mobile.

Fix:
- add final-order `patchMobileBottomNavHotfixCss` after all legacy shared/Home CSS;
- mobile bar height: 72px;
- Chat final bottom position clears bar + 14px gap;
- Cookie gear is explicitly source-left at 12px and clears bar + 14px gap;
- consent card clears bar;
- when directional chrome hides, Chat/Cookie return to 12px bottom;
- icon artwork gets a consistent 30px green/cream rounded tile treatment;
- active icon uses Bio-A green fill-surface + cream stroke;
- labels use 11px / 1.25 line height, anti-aliased rendering and extra bottom room so descenders are not clipped;
- route/navigation/scroll logic is unchanged.

Protected:
- Cookie state/consent runtime;
- Chat runtime and panel content;
- Mobile Header directional behavior;
- Desktop/Tablet;
- all page layouts.

Status:
- CODE/SYNTAX PASS;
- RUNTIME: PENDING OWNER TEST.


## SHARED-MOBILE1B — COOKIE OUTSIDE DISMISS + MOBILE MENU REGRESSION FIX

Owner runtime feedback:
- Cookie banner required an explicit choice before disappearing; desired behavior is tap-outside dismiss without recording a choice.
- Mobile menu regressed after SHARED-MOBILE1: tap could freeze and menu failed to appear.
- Bottom-nav icon artwork is intentionally NOT changed in this patch; owner will provide replacement icon design later.

Root causes:
- source Merywood cookie banner has no outside-dismiss handler;
- SHARED-MOBILE1 added a body-class MutationObserver only to restore Header chrome when Mobile Menu opens. This duplicated menu ownership and could re-enter body class updates.

Fix:
- Cookie:
  - pointer/tap outside visible `#mw-card` dismisses the banner visually;
  - no consent choice is written;
  - cookie gear becomes visible again while undecided;
  - preferences modal keeps source backdrop/close behavior;
  - after a real Accept / Necessary / Save / Accept-all decision, gear remains hidden per COOKIE-C3.
- Mobile Menu:
  - remove bottom-nav MutationObserver from body-class ownership;
  - `syncMobileHeader() > set(open)` directly clears `bioa-mobile-chrome-hidden` when opening;
  - outside-tap, scroll-dismiss and Escape close remain source/shared behavior.

Protected:
- current five bottom-nav icons/treatment frozen pending owner artwork;
- SHARED-MOBILE1A Chat/Cookie collision spacing;
- bottom-bar route logic;
- directional scroll behavior;
- page layouts and Desktop/Tablet.

Status:
- CODE/SYNTAX PASS;
- RUNTIME: PENDING OWNER TEST.


## SHARED-MOBILE1C — FIRST-TAP MENU + FULL BOTTOM-BAR HIDE

Owner runtime feedback after SHARED-MOBILE1B:
- Mobile Menu works again but occasionally needs two taps to register.
- Directional bottom bar still leaves a visible strip on iPhone when hidden.
- Current five bottom-nav icons remain frozen pending owner artwork.

Root cause / hardening:
- auto-hidden Header can still be in a transform transition when the burger receives the first touch gesture;
- percentage-only bottom-nav translation is not sufficient across iOS safe-area / dynamic viewport combinations.

Fix:
- burger gets a pointerdown visibility guard:
  - same touch immediately removes `bioa-mobile-chrome-hidden`;
  - existing click handler remains the single toggle, so no double-toggle is introduced;
  - `touch-action:manipulation` and final z-index/pointer authority are applied.
- bottom bar hidden state:
  - translate down by `100% + 48px + safe-area`;
  - opacity 0;
  - visibility hidden after transition;
  - pointer-events none;
  - same full-hide rule applies while Mobile Menu is open.
- visible state explicitly restores transform/opacity/visibility/pointer events.

Protected:
- five bottom-nav icons and labels: unchanged;
- Cookie outside-dismiss / confirmed-choice logic;
- Chat positioning;
- menu content/layout/outside-scroll-Escape close;
- route logic and Desktop/Tablet.

Status:
- CODE/SYNTAX PASS;
- RUNTIME: PENDING OWNER TEST.


## HANDOFF-HARDEN1 — CONTINUATION CONTRACT

Added current-state continuation authority:
- `START_HERE.md`;
- `NEW_CHAT_CONTINUATION_PROMPT.md`;
- `docs/FINAL_DEPLOY_CHECKLIST.md`.

Rule:
- continuation prompt must be rewritten from the actual current repo/owner-confirmed state at every handoff;
- stale historical version/status text must not become current authority;
- new chats use current snapshot + owner contracts, not patch archaeology.

Current runtime baseline remains:
`76bab2b472b252f804c6022147209631cb691c81` — owner PASS.

Next intended runtime work:
- pending owner confirmation of supplied Mobile bottom-nav icon artwork;
- if confirmed, artwork-only patch;
- then Tablet -> cleanup -> production package/domain.


## MOBILE-NAV-ICON1 — OWNER-SUPPLIED BOTTOM NAV ARTWORK

Parent runtime baseline:
`76bab2b472b252f804c6022147209631cb691c81` — OWNER PASS.

Scope:
- replaced only five inline bottom-nav icon artworks;
- source shapes come from owner-supplied 5-icon artwork sheet;
- silhouettes were vector-traced into inline SVG paths for crisp mobile rendering;
- mapping:
  Home = house;
  Manufacturing = factory + cosmetic bottle;
  Services = lab flask + leaf;
  Blog = document;
  Contact = headset/support person.

Preserved:
- 5 labels;
- all routes;
- bar geometry;
- active/inactive tile treatment;
- directional hide/show;
- first-tap menu behavior;
- Cookie behavior;
- Chat/Cookie clearance;
- Desktop/Tablet;
- all route content.

Candidate status:
**PENDING OWNER TEST**.

Rollback:
`76bab2b472b252f804c6022147209631cb691c81`.

Handoff correction:
Bio-A continuation files must contain only real Bio-A architecture. Do not copy or translate PMX Shop-specific Woo/Suite/Child/PMX Shell/Product Card concepts into this project.


## MOBILE-NAV-PAUSE1 — TEMPORARY BOTTOM-BAR REMOVAL

Owner postponed Mobile bottom navigation.

Runtime patch:
- removes all bottom-nav generation and CSS;
- removes bottom-nav safe-area body padding;
- removes Chat/Cookie offsets that existed only to clear the bar;
- preserves directional Mobile Header behavior via `addMobileHeaderScroll($)`;
- preserves first-tap Mobile Menu protections;
- preserves Cookie C3/C4 runtime in `bioa-transform.mjs`.

5-icon artwork is not active and must not be re-enabled without owner request.

Status: PENDING OWNER TEST.


## MOBILE-MENU-CONTRAST1 — SCROLLED MENU VISIBILITY

Root cause:
- top Header has darker hero/backdrop context, so the cream menu control is visible;
- scrolled Header switches to a near-white sticky surface;
- the same cream control loses contrast and visually sinks into the Header.

Fix:
- only `html.bioa-header-scrolled .bioa-mobile-menu-button-clean`;
- background: very-light Bio-A green;
- icon: Bio-A primary green;
- subtle green inset border.

Protected:
- button geometry;
- Mobile Menu JS;
- Header scroll runtime;
- Cookie / Chat;
- paused bottom bar;
- page layouts.

Status: PENDING OWNER TEST.


## MOBILE-HEADER-SOURCE1 — MERYWOOD MOBILE HEADER GEOMETRY PARITY

Commit:
`65152e5fad8799fea36bcf3e03c9a9acf7f600ce`

Scope:
- Mobile Header/wrapper: 62px;
- logo shell: 46×48px;
- Bio-A logo: 38×44px;
- CTA: 40px height, 15px horizontal padding, radius 14, 13px type;
- menu trigger: 40×40px, radius 14;
- hamburger artwork: 2 bars to match Merywood source trigger structure.

Protected:
- inner mobile menu visual/content/layout;
- menu first-tap / outside / scroll / Escape runtime;
- mobile Header down-hide/up-show;
- scrolled menu contrast from MOBILE-MENU-CONTRAST1;
- Cookie / Chat;
- paused bottom bar;
- Desktop / Tablet.

Status: PENDING OWNER TEST.


## CONSULT-POPUP-COLOR1 — BIO-A GREEN BACKGROUND

Owner confirmed MOBILE-HEADER-SOURCE1 PASS.

Change:
- `#get-a-quote .cf-modal` background is now `var(--bioa)` (#106E45).

No field/capture behavior changed.

Lead UX audit:
- current source first-contact form asks too much information;
- current lead-capture script waits for name/email/phone/product/request;
- capture endpoint already points to Bio-A admin-ajax;
- future simplification must change UI + capture condition together.

Recommended next:
LEAD-FORM-SHORT1 = Name + Phone required, Product Type optional, privacy consent retained; remove Email/Quantity/Request from first-step UI.

Status: PENDING OWNER TEST.


## LEAD-FORM-SHORT1 — SHORT CONSULTATION LEAD FORM

Visible:
Name required; Phone/Zalo/Telegram required; Product/Service optional; compact Consent.

Removed:
Email, Quantity and Request from the first-contact UI.

Product/service options:
six Bio-A manufacturing categories plus Formula R&D, Filling & Packing, Containers, Packaging Design, Documentation/Product Notification and Bio-A Advice.

Capture:
old 5-field/email gate replaced by Name + Contact + Consent.

Send:
source-like light grey/green styling restored and isolated from global .btn styling.

Status: PENDING OWNER TEST.


## LEAD-FORM-SHORT1-HF1 — Cheerio Build Hotfix (2026-10-08)

- Deployment of `9e30c7c6b27fe567132ff026a999a5cdacb84ace` FAILED at `npm run build`.
- Root cause: `cheerio@1.0.0` does not provide `.detach()` in `simplifyConsultationModal()`, causing a TypeError while generating pages.
- Hotfix: use `.clone()` to retain the Consent checkbox node when replacing the text; no change to markup structure, field requirements, capture conditions, or Send button presentation.
- Status: **PENDING CLOUDFLARE BUILD / OWNER TEST** until a new Cloudflare build succeeds and short-form behavior is checked.
- Previous failed commit is **NOT A ROLLBACK TARGET**. Keep all approved Mobile Header/Menu, Cookie, Chat, Blog and Contact components locked.

## CONSULT-CHOICES-MOBILE-HOME1 — 2026-10-08

Source: Merywood home exported markup #get-a-quote, #ddType (.wpcf7-checkbox.wpcf7-exclusive-checkbox, input[type=checkbox]), label.label-check with full Privacy Policy terms.
Previous short-form candidate used native radio markup and overwrote legal consent text. Reverted only those divergences and constrained dropdown scrolling. Bio-A optional product/service options preserved.
Shared Mobile Menu owner: bioa-home-refine.mjs > syncMobileHeader. Added Trang Chủ / Home ahead of current five items; no changes to menu mechanics.
Status: PENDING BUILD / OWNER TEST.

## CONSULT-CONSENT-FLOW1 — Consent inline-flow / responsive layout (2026-10-08)

Owner requirement: merge the legal agreement text and its Privacy Policy link into one continuous inline paragraph at Mobile and Tablet widths, without altering actual legal copy or consent checkbox behavior.

Root cause: the global Bio-A popup override made `label.label-check` a flex container, so the source text node and the Privacy Policy anchor became separate flex items with narrow competing columns.

Change: CSS only at `#get-a-quote .label-check`. Use normal block text flow with reserved left padding and an absolutely positioned checkbox wrapper; the Privacy Policy anchor remains `display:inline`. All lines align with the legal text and the hyperlink flows naturally. No DOM or JS/capture changes. Effective on Desktop/Tablet/Mobile.

Mobile Menu with Trang Chủ/Home: owner-confirmed PASS; frozen.

Status: PENDING CLOUDFLARE BUILD / OWNER TEST. No other UI/runtime owner modified.

## CONSULT-CONSENT-SOURCE1 (2026-10-08)

Merywood authority (verified owner ZIP): `merywood/pages/index/index.html`, `#get-a-quote label.label-check` with nested `span.wpcf7-form-control-wrap`, direct legal text node (trailing space), followed by `a[href="/privacy-policy"]`. Retain original DOM and original CSS.

Root cause: Bio-A custom Consent CSS in `bioa-transform.mjs` overrode source layout with block/absolute position/padding; VI localization removed original separating space.

Only runtime modifications: delete three scoped Consent CSS selectors plus their comment; restore VI text node's terminal space. No replacement CSS/wrapper/component created, and no other markup/behavior changed.

Owner PASS/FROZEN: shared Mobile Menu including Home; popup short-form fields/selection/Send; Header, Cookie, Chat, Blog, Contacts and paused bottom bar.

Status: PENDING Cloudflare Build / Owner Runtime Test.


# CURRENT STATE — 2026-10-08 — LEAD-BACKEND1

**Owner confirmed popup Consent PASS** at `61d2e8b04c2534ad7a178fdb1313fa918637a3ab`. Protected visual runtime/source Merywood.

**New candidate: LEAD-BACKEND1 — PENDING CLOUDFARE BUILD / D1 BINDING / GOOGLE & RESEND SECRET CONFIG / OWNER E2E TEST.**

- Text-only popup heading: VI `Nhận Tư Vấn Từ Bio-A Group`; EN `Consult Bio-A Group`.
- Form visuals/fields/checks/Consent/Send remain unchanged.
- Old Merywood lead capture disabled for this modal; new JS submit handler posts same-origin to `/api/lead`.
- Pages Function writes D1 first, then best-effort Google Sheets + Resend email notification.
- Code and SQL migration committed, but **resources, credentials, live storage and external delivery have not been provisioned**. Do not claim data currently being collected.
- Setup guide: `docs/LEAD_BACKEND_SETUP.md` (required).
- Relevant owners: `bioa-transform.mjs`, `assets/js/bioa-leads.js`, `functions/api/lead.js`, `migrations/0001_bioa_leads.sql`.
- PASS/FROZEN: Home, Blog, Contacts, Cookie, Chat, Mobile Header/Menu and disabled bottom bar.
- Next: confirm Cloudflare build; provision D1 & binding, run migration, add secrets, verify Google and Resend, run a synthetic test lead (VI/EN) and inspect all 3 destinations.
- Rollback if frontend regression: `61d2e8b` previous owner-confirmed state. Do not deploy new form to production domain before D1 configuration / successful E2E test.

---


## CONSULT-TITLE-COPY1
Text-only popup title softened; no component layout touched. PENDING OWNER TEST. D1/Sheets/email provisioning and final domain cutover are separate and pending.

## LEAD-STATUS-I18N1 — Locale source correction, 2026-10-08

- Owner confirmed popup visual PASS, but VI submit-success message appeared in EN.
- Root cause: `document.documentElement.lang` is not a reliable runtime owner because source scripts may mutate it after build.
- Fixed solely in `assets/js/bioa-leads.js`: locale is derived from URL routing `/en/` for EN, all other current Bio-A routes for VI. All wait/success/error messages and persisted locale now follow route.
- Checked original Consent/acceptance behavior retained. No default consent selection: site must continue requiring an affirmative user act. No changes to form DOM/style or server validation.
- Status PENDING Cloudflare Build / Owner VI/EN runtime test. D1 lead still must be independently checked in Console.


## LEAD-ID-SHORT1 — Short, stable lead identifier (2026-10-08)

Owner confirmed Cloudflare D1 saved a live test lead and Google Sheets now received a new lead in the `Leads` worksheet: **D1 PASS / Google Sheets PASS**.

Small owner-requested patch: change *only* how new lead IDs are generated/validated. The browser now uses 9 cryptographically random bytes (72 bits), Base64URL-encodes them to 12 safe characters, and prefixes `bioa_`. New ID example format: `bioa_A1b2C3d4E5f6`. API also accepts the original UUID format to support old cached deployments and preserve existing records. D1 `id TEXT PRIMARY KEY` is the uniqueness guard; a random ID is not encryption of personal data.

Previously stored UUIDs must remain unchanged (both D1 and Sheets); do not backfill or modify any existing row IDs. No D1 SQL migration; all 11 sheet-column positions and delivery code remain identical.

Google Sheets columns H (`Trạng thái`), I (`Nhân viên`) and K (`CSKH`) will be assigned owner-built dropdowns later; do not add or alter dropdown rules or fields here. Resend delivery remains not configured.

Status: PENDING CLOUDFLARE BUILD / OWNER NEW-LEAD TEST. Protected: full popup and Consent source layout, VI/EN messages, D1/Sheets dispatch, Header/Menu/Cookie/Chat, all page content.

## CRM-LEAD-UX2
- Cache versioned JS to avoid old UUID generator from cached `bioa-leads.js`; server keeps backward compatibility.
- Auto-close after confirmed D1 response via existing Merywood close trigger (Escape fallback), not on request failure.
- New Google Sheets rows: H status dropdown values, I staff dropdown default “Chưa phân công” (real names via `LEAD_STAFF_NAMES` configuration), K CSKH dropdown values, highlight H green / K amber. No historical rows changed, and no spreadsheet permissions/secrets changed.
- Anti-spam existing: validation, honeypot, simple rate limit, deduplication. Turnstile server validation not yet implemented; **NOT bot-proof**.
- PENDING runtime QA. No claim dropdowns exist on historical rows.

## CRM-POPUP-CLOSE-SOURCE1 — 2026-10-08
The correct Merywood source handler is `js/modal.js > Modal.listen()`, listening for `.modal__close` click and calling `close(id)`. The previous code targeted nonexistent custom close class names and Escape event; this explains the user-observed no-close despite successful lead capture.
Changed only success-path selector to `#get-a-quote .modal__close`; source click handler retains 500ms transition and display management. All other behavior frozen. Owner confirmed compact lead IDs, D1, Google Sheets, new row dropdowns/colors PASS. Candidate pending runtime auto-close test.

## CRM-LEAD-RATE-CLOSE1 — source and root cause (2026-10-08)
Owner PASS D1+Sheets+compact ID; recent repeated tests returned generic send failure. D1 stores UTC ISO timestamps with T delimiter. `functions/api/lead.js` previously compared that string directly against SQLite `datetime('now','-1 hour')` with space delimiter, causing wrong same-day rate counts. API now compares ISO-to-ISO via strftime without changing 5/IP/hour. `assets/js/bioa-leads.js` shows translated 429 guidance. Merywood source is `js/modal.js` from original ZIP: click `#get-a-quote .modal__close` and 500ms native close transition. Success-path click is moved outside network try/catch so a UI error can never reverse stored D1 result. No layout/CSS/DOM or product, navigation, CRM mapping changes. PENDING owner test.
