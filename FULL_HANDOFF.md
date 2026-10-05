# BIO-A GROUP WEBSITE — FULL HANDOFF

Updated: 2026-10-05
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
