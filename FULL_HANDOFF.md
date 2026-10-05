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
