# BIO-A — HOME REGRESSION RECOVERY (BIOA-R24) — 2026-11-10

Owner status before this patch: **Home OWNER FAIL** (local `http://127.0.0.1:4173/`), even though the automated smoke had passed.
Owner evidence: screenshots `C:\Users\REDMI\Pictures\Screenshots\Screenshot 2026-11-10 133613.png`, `133621.png` (Desktop Roadmap), `133901.png` (BIO-A Tablet 834, How It Works), `133926.png` (Merywood Tablet 834, reference).
Commits: `497467a` (fix), `56ea8ee` (isolation approval and scope), `513d7ec` (test restructure). Nothing is pushed.

## P0 — Home Roadmap Desktop ("Từ Ý Tưởng Đến Thành Phẩm — Quy Trình Đồng Hành Trọn Gói")

### Symptom (owner screenshot)
- The card is taller than its slider: the "Nhận tư vấn" CTA and the green Footer overlap the bottom of the card.
- Slide 02 is shown with the previous card edge visible.

### Reproduction
- **Not reproducible** on a clean load at any width. Static geometry at 1440 is card 1329×636, image 631×591, and it is identical to the approved baseline d59f50d. The earlier smoke and guard only did clean loads, which is why they passed.
- **Reproducible every time after a width change of the window.** Typical causes: resize, maximize/restore, browser zoom, DevTools, the device-preview tool.
  - Headless: load at 1200 → resize to 1646 → slider 530px vs card 726px, CTA overlaps by 196px.
  - Load at 1646 → resize to 1200 → slider 726px vs card 530px, leaving a blank gap.
  - Real headed Chrome on this PC (CDP window resize 1000→1680, Windows DPR 2): slider 436px, card 637px, overlap 155px. Footer overlapping the card is the same picture as the owner screenshot. Evidence: `repro/headed-before.png`.
- The approved baseline d59f50d behaves the same: it is a Merywood source behaviour, not a new BIO-A change. ROADMAP-R4 (MOTION-U1 transforms) is **not** the cause this time:
  - 0 `.step` nodes carry a transform;
  - no reveal attributes on the steps;
  - Swiper is initialised with 1 slide per view.

### Root cause (verified)
Merywood `main.js` `swiperAutoHeight()` runs `setHeight` on `$(window).on('load resize')`. It sets the wrapper to `auto`, measures the tallest slide and fixes the wrapper height to it.
1. On a window resize this handler runs **synchronously**. Swiper 11 updates the slide widths later, from its ResizeObserver callback in the next animation frame. So `setHeight` measures slides that still have the **old width**, and with them the old aspect-ratio height (`.step__image`/`.step__info` use `aspect-ratio: 863/808`).
2. `.block-roadmap .step { transition: .5s }` animates every property, including the vw-based padding and gap. Even a measurement taken after Swiper's update is up to a few px off until that transition ends.

HOME-ROADMAP-COLDLOAD1 (b12e4ff) re-ran the source path only once, after load. Nothing re-ran it after a later width change.

### Fix (ROADMAP-R5, owner layer = Home component script `#bioa-roadmap-coldload-sync`)
- Same owner and same source path. There is no new height logic, no CSS height, no `min-height`, and no device fork.
- After Swiper emits its own `resize`, and only when `swiper.width` really changed:
  - re-run `jQuery(window).triggerHandler('resize')` (the Merywood `setHeight` for every source slider), then `Scrollbar.update()`;
  - run it again once the card's own CSS transition has ended. The duration is read from `getComputedStyle(.step)`, not hard-coded.
- The Cosmetics hub renders the same Roadmap slider and had the same failure (resize: overlap 133px at 1440; slider 2553px vs card 765px at 390). It now **imports the same exported owner** (`addHomeRoadmapColdLoadSync`). It is not a copy.
- Content, line breaks (ROADMAP-R3), motion (MOTION-U1 title reveal only), DOM and CSS are unchanged.

### Result
`tests/home-roadmap-visual.mjs`, real Chrome, VI/EN × 1920/1440/1201/1200/1024/834/769/768/390:
- Each case is settled → Next → Next → Prev.
- Two modes: static load, and resized (load at another width, then resize).
- Contracts checked: slider height = card height (±1.5px), CTA not overlapping, 1 slide per view, step offset, no transforms or reveal attributes on `.step`, image and info side by side above 768, navigation index.

| | Before (`dist-final-r21`) | After (`dist-final-r24`) |
|---|---|---|
| Home, static | 18/18 | 18/18 (geometry identical to d59f50d) |
| Home, resized | 0/2 checked (overlap 222px @1440, 319px @1920) | 18/18 |
| Cosmetics, static / resized | — / 0/6 | 18/18 / 18/18 |

## P1 — Home "Quy Trình Hợp Tác" (`.block-how-works.desctop`) on Tablet 769–1200

### Measured at 834, VI

| | Copy | Card | Info | Photo |
|---|---|---|---|---|
| Merywood | 6.95px / 8-line clamp | 243 | 217 | 217 |
| BIO-A before | 12px (TABLET-TYPE-SOURCE1), clamp off (P2, the source clamp cut VI sentences) | 363 / 361 / 345 / 327 / 345 | 337 | **217** |

- In BIO-A before, the photo kept the source height of 26.0417vw while the full VI copy made the info column taller. That left a blank band under the photo, and the two visible cards had different heights. This is what owner screenshot 2 shows.
- EN copy is short: BIO-A EN 834 was already identical to Merywood (243/217/217).

### Fix (HOWWORKS-T1, owner layer = `bioa-source-components.mjs`, Tablet media block only, next to the P2 rule it compensates)
```css
.page-main .block-how-works .swiper-slide .step { height:100% !important; }
.page-main .block-how-works .step__image       { height:auto !important; min-height:26.0417vw !important; }
```
- Each card fills the slide height that the source `swiperAutoHeight` already sets.
- The photo stretches to the same grid row height. `object-fit: cover` stays source-owned.
- Kept unchanged:
  - the 2-card desktop-fluid grid;
  - text/image order, navigation and CTA;
  - 12px copy;
  - no clamp;
  - Desktop ≥1201 and Mobile ≤768 (the rule is inside `@media (min-width:769px) and (max-width:1200px)`).
- The same canonical rule also applies to `/dich-vu-khac/`, which uses the same component.

### Result
`tests/home-howworks-tablet.mjs`, VI/EN × 769/834/1024/1200/1201/1440/1920, static and resized: **28/28**.

| Width | BIO-A VI after: card / info / photo | BIO-A EN after | Merywood |
|---|---|---|---|
| 769 | 371 / 347 / 347 | 224 / 200 / 200 | — |
| 834 | 363 / 337 / 337 | 243 / 217 / 217 | 243 / 217 / 217 |
| 1024 | 358 / 326 / 326 | 299 / 267 / 267 | 299 / 267 / 267 |
| 1201 (Desktop, unchanged) | 350 / 313 / 313 | 350 / 313 / 313 | 350 / 313 / 313 |
| 1440 (Desktop, unchanged) | 420 / 375 / 375 | 420 / 375 / 375 | 420 / 375 / 375 |

**Trade-off (owner decision, not hidden):**
- BIO-A VI Tablet cards are **about 49% taller than Merywood at 834** (363 vs 243). The full VI copy needs 11–13 lines at the readable 12px in a 143px-wide text column. Merywood fits 8 lines only because its copy is 6.95px.
- Matching the Merywood height would need one of these, none of which was done:
  - 7px copy (rejected: accessibility);
  - cutting sentences (rejected by the owner);
  - shorter VI copy (a content decision);
  - a wider text column (changes the Merywood 50/50 card proportion).
- The VI photo is therefore a taller portrait crop (`object-fit: cover`).

## CONTENT-C1 — owner-authorized content decisions
- **Careers hidden.**
  - The Merywood Careers page ("European manufacturer…", EU roles) is no longer built.
  - `/careers/` and `/en/careers/` are `noindex` redirect stubs to Contacts, removed from `sitemap.xml`.
  - The two Footer recruitment items (VI/EN) are removed.
  - The legacy slugs `/tuyen-dung-rd/` and `/tuyen-dung-nv-sales/` now redirect to Contacts.
  - The About team CTA reads "Liên Hệ Bio-A Group / Contact Bio-A Group" and links to `/contacts/`. Its paragraph is unchanged and generic.
  - No job or recruitment information was invented.
- **Shipping Policy link removed** from the Footer (VI/EN). No confirmed retail shipping policy exists.
- **Hidden surplus Footer items** (Merywood DOM slots kept for layout) no longer carry Merywood hrefs.
- **Kept:** service pages, About, Blog, Contacts, FAQ, Privacy, Cookie.
  - Privacy/Cookie text is still the Merywood Estonian policy and still **blocks release** (L1/L2).
  - Nothing legal was written or published.
- Result: D11 audit 54 targets.
  - 32 redirect to a 200 page (includes `/careers/`).
  - 0 still dead (was 14: Shipping ×2, Careers job cards ×4, hidden Footer ×8).
  - 22 targets must stay unlinked: 8 R13 toggles + 14 C1.
  - P3 static audit: 0 hard.

## Protected (not changed)
- ROADMAP-R3 text and line breaks;
- MOTION-U1 (title reveal only on Roadmap);
- Header, Hero counters, Chat (CHAT-C7, R21 reply);
- Footer FOOTER-INFO1x grid and company block (only the link lists changed);
- Desktop How It Works;
- Mobile Roadmap source geometry (ROADMAP-R4 Mobile ACCEPTED DEFERRED);
- `/api/lead`, D1, Sheets, Resend, Cloudflare settings and secrets.

The scope gate R24 vs `dist-final-r21` passes: 109 files changed, all only inside the declared selectors. The cumulative P0A gate passes.

## Owner test (Home VI/EN, local `http://127.0.0.1:4173/` after `npm run serve`)
1. **Desktop Roadmap:**
   - Open Home in a normal (not maximized) Chrome window and scroll to the Roadmap.
   - Maximize the window, restore it, change zoom (Ctrl + / Ctrl −, then Ctrl 0) and open/close DevTools (F12).
   - After about 1 second the CTA "Nhận tư vấn" must sit below the card with its normal gap, and the Footer must not touch the card.
   - Click → and ← through all 5 steps.
   - Repeat on `/contract-manufacturing-cosmetics/`.
2. **Tablet How It Works (834 and 1024, device preview):**
   - Two cards side by side, same height.
   - The photo is as tall as the text column, with no blank band.
   - All copy is readable and complete.
   - Use → to step through all 5 cards.
3. **Footer (every page, VI/EN):**
   - "Bio-A Group" column = Năng Lực Sản Xuất, Liên Hệ.
   - "Chính Sách" column = Bảo Mật, Cookie.
   - Layout is otherwise as approved.
4. **About:** the team button reads "Liên Hệ Bio-A Group" and opens Contacts. `/careers/` opens Contacts.

## Final QA — one round on the frozen candidate `dist-final-r24b` (HEAD content `f265a29`; later commits change docs/tests only)
Logs and screenshots: `D:\BIOA_WORKSPACE\_reports\home-regression\qa-final\` (`summary.txt`).

| Check | Result |
|---|---|
| `test:candidate`, `test:responsive` 15/15, `test:p0a` (fidelity 104/104 + cumulative scope incl. R24 + determinism), `test:404`, `test:turnstile`, `test:chat`, maintenance-host 6/6 | all exit 0 |
| Scope gate R24 vs `dist-final-r21` | PASS (109 files, only declared selectors) |
| D11 audit | 54 targets: 32 redirect to 200, 0 dead, 22/22 stay unlinked |
| Roadmap Home, static + resized, VI/EN × 9 widths, settled / Next / Next / Prev | **36/36** |
| Roadmap Cosmetics, same matrix | **36/36** |
| How It Works VI/EN × 7 widths, static + resized | **28/28** |
| Home sections VI/EN × 390/768/769/834/1024/1200/1201/1440/1920 + zoom 125% (header, footer, h1, no empty section, no overflow, slider = card, chat, no page error except T2) | **20/20**, 205 section screenshots |
| Headed Chrome window resize 1000→1680 + Next (owner scenario) | CTA 45px below the card (was overlapping by 155px), slider 636.5 vs card 637 |
| Route smoke 102 routes × 1440/390 | **204/204** (T2 only) |
| Chat UI 6 routes × 10 widths | 60/60 |
| Lead form 3 routes × 3 widths × 4 server answers | 36/36, nothing sent |
| Deep guard vs approved Preview, reference runtime pinned (8 families × VI/EN × 1440/1024/834/390) | 64 cases; classifier: **all differences inside declared scopes**; R24 text proven by `tests/r24-text-proof.mjs` 64/64 |
| Comparison sheets Merywood / d59f50d / R24 | `qa-final\compare\SHEET-*.png` (Roadmap 1920/1440/834/390, How It Works 834/1024, VI/EN, slide 1 + after Next) |

**Honest log of this round:**
- (1) The first final round was stopped: Home resized EN @834 gave 35/36 (slider 373 vs card 369). The cause was measured: the card transition ends about 510 ms after Swiper's resize, so the timer had no margin. It was fixed at the cause (`f265a29`, re-sync on `transitionend`). Targeted check: 54/54 over 3 runs. Then one new final round ran.
- (2) In that round, the guard first ran **without** `BIOA_REF_PIN_DIR`. That is a runner configuration error: the reference loaded the changed live Merywood `main.js`, and 0/64 cases were attributable. It was rerun with the pinned reference.
- (3) The new probes `home-section-screens` and `r24-text-proof` each had a measurement defect:
  - fixed-position Header visibility and an unblocked Turnstile;
  - reading the text while the Hero counters were still running.
  The probes were fixed and rerun. No site code was changed for (2) and (3).

**Visible side effect, by design (CONTENT-C1):**
- On Mobile (≤768) the Footer is **87px shorter** (845.7 → 758.5) because its link lists stack and hold 3 links fewer. The Footer top and every element above it are unchanged.
- Desktop and Tablet Footer height are unchanged.

**Backlog (outside R24, not changed):** ROADMAP-M1. On Mobile the Merywood source hides the Roadmap `<br>` line breaks, so words join («tưởng,nhóm», «sáchvà», «trìnhphù»). This is identical on the approved d59f50d (`compare\SHEET-roadmap-390-vi.png`). The fix is content-only (a space before each `<br>` in the ROADMAP-R3 copy) and needs Mobile owner QA.
