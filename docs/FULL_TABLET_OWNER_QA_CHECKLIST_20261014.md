# BIO-A GROUP — FULL TABLET PHASE 2: FINAL OWNER QA / SIGNOFF

**Verified checkpoint (2026-10-15):** PR #10 branch `candidate/full-tablet-regression-phase2-20261014`, source HEAD `39d79b4e3cbdc611aa3456b3a307abdfa93f6ff7`. Production `main` remains `cb4e92f73c1ef800f7507db2330347664fc323d4` (private maintenance). **GitHub Actions CI:** run `38681924922` SUCCESS on exactly `39d79b4`. Cloudflare Pages PR comment reports SUCCESS for the same commit; immutable code-preview URL **https://e1dda8a2.bioagroup.pages.dev**, branch alias `https://candidate-full-tablet-regres.bioagroup.pages.dev`.

**STATUS:** named components owner-PASS; final **FULL TABLET PASS has not been explicitly declared by owner**. This document is the sole up-to-date route-level acceptance gate; older run IDs and earlier Preview hash URLs, when listed in Historical evidence below, are past evidence ONLY.

## Recently accepted changes — do NOT retest each patch in isolation
- Blog detail Sticky TOC source layout and safe scroll-fixer behavior: owner explicitly **PASS**. Blog TOC CTA text legibility: owner explicitly **PASS**.
- Other Services: reused Home Bio-A canonical icon class and artwork for slide/process; owner explicitly **PASS**. Original slider/card/process layout remains locked.
- Cookie title and three action labels Manrope 500, sitewide page title 400 (About authority), canonical CTA 550, WhatsApp original artwork, shared Header/Footer/Home Hero Stats: **owner accepted on respective components**.
- Last technical CI all green at current code SHA; **CI is not visual owner PASS**. Do not open a new styling round without a specific new failure.

## Final single-pass gate
The owner has already reviewed multiple sections and screenshots. Do **not** request another full patch-by-patch cycle. For the CURRENT immutable Preview above, owner only needs to confirm whether the overall VI/EN Tablet site at CSS widths 834px / 1024px has **any remaining issue** after the accepted fixes. If none, ask for the one explicit statement **`FULL TABLET PASS`**. If a fault is present, get exact route/locale/width/screenshot and reopen **only** that component. Avoid speculative fixes.

## Source and immutable owner-approved behavior
- Original **Merywood** layout, DOM, source motion, responsive media modes and controls are design/runtime source of truth. BIO-A replaces requested brand content/artwork, does not redraw source icons.
- Owner-approved and **FROZEN:** WhatsApp original icon, Zalo asset, responsive Header/main nav, Manrope major page/section title 400 (About visual authority), Header/other CTA 550, Hero Stats numbers/labels 300/400, Footer, Cookie title and three actions 500 (owner PASS), First Paint, 404 Desktop/Tablet/Mobile **visual** (prior owner PASS). Shared component owner is mandatory: `AGENTS.md §7A` and `docs/WORKFLOW.md §1B`.
- Cloudflare Preview is static GET/HEAD only; `/api/*` and `/_bioa-access` forbidden, noindex; root production remains private behind 503. Do NOT switch site to public or send test leads.

## Owner checks — perform at 100% browser zoom

Use the **verified exact-commit Preview** URL above, not the branch alias. Do not judge the candidate against an old 8d3e281 snapshot. At minimum, check Tablet 834px and 1024px, both **VI and EN**; 768px boundary, 820px and 1180px are useful if a fault occurs. Quick regression at Desktop 1440px and Mobile 390px. Real iPad Safari check is preferable where available.

| # | Surface / route (test VI + matching /en/) | What constitutes owner PASS |
|---|---|---|
| 1 | Shared shell on Home `/` | Header/logo/menu/actions no overlap; approved nav weight/size; Footer columns and email/social remain legible; Cookie 500 behaves and does not jolt on route change; WhatsApp/Zalo source icons remain correct |
| 2 | About `/about/` | About Hero Stats and six artwork categories match owner PASS, no clipped icons or card/text collisions; 400 title weights are canonical |
| 3 | Cosmetics hub `/contract-manufacturing-cosmetics/` | Original source Swiper forward/back buttons and swipe work; cards, packaging slider and product formats remain visible; no sideways body scrolling |
| 4 | Other Services `/dich-vu-khac/` | Source image-led slider responds to arrow and swipe; no duplicate static grid; process/cards/CTA readable without truncation |
| 5 | Blog index `/blog/` | Page hero and featured/card titles use approved About 400 (not original inline 600); shared CTAs 550; next-page links/cards open correctly |
| 6 | Blog detail sample `/blog/gia-cong-kem-tri-tham-nhu-hoa-giai-phap-lam-hong-vung-nhay-cam-chuyen-sau/` | Left Sticky TOC visually follows Merywood source; first/last TOC item actually brings its matching article heading into view (VI/EN). Check scroll rail and article after long scroll, not only href/hash; note one historical Desktop EN automated sample had misaligned last-item scroll, so verify on real device |
| 7 | Contacts `/contacts/` | All five FAQ questions expand/collapse visibly, map renders, email/phone/Zalo and Google Maps destinations are correct, contact area remains readable. **Do not submit real form/lead** in this final visual pass |
| 8 | 404 (e.g. `/bioa-qa-unknown/` and `/en/bioa-qa-unknown/`) | Previously approved original PNG, title/text/CTA order remain unchanged; CTA returns Home. Report observed response code separately if DevTools Network available: preview should be 404/noindex; signed owner production expected 404, guest production must remain private 503. Do not infer live HTTP from CI middleware mock |

**Cookie functional regression:** To view first-visit Cookie without overwriting an already consented session, open a *fresh incognito Preview*; click **Từ chối / Reject** or other choice only for that isolated test. Check heading + all 3 button weights match approved 500 and the dialog remains stable on route navigation.

## Historical technical evidence (prior builds)
- Run `38535428373`: Blog detail 8 VI/EN route/viewport checks with five valid anchored TOC entries. Last TOC click moved scroll on Tablet. A Desktop EN sample moved but did not settle adjacent to target, thus it remains an owner QA focus rather than verified source defect.
- Run `38537525917`: 16/16 VI/EN Cosmetics+Other Services cases, source Swiper initialized and enabled Next advanced, no page-root overflow.
- Run `38540541536`: **SUCCESS**, 8/8 Contacts FAQ click-open cases at 390/834/1024/1440, map and address links present. Mock Cloudflare Preview forwards upstream 404; unauthed production 503. This does NOT certify live Cloudflare unknown URL responses.
- Existing Phase 2 64-route Chromium matrix verifies VI/EN structural rendering, no body overflow/nav wrap, captured screenshots. Inspect `bioa-full-tablet-regression-phase2` GitHub Actions artifact for evidence.

## Owner decision / handoff
Reply **FULL TABLET PASS** only after inspecting the actual Tablet surfaces. If any issue is found, send:
`Trang/route — VI/EN — thiết bị hoặc viewport — mô tả lỗi — ảnh/video — đối chiếu Merywood (nếu có)`.
One specific failing surface remains ACTIVE, others stay PASS/FROZEN. Fix the actual source component owner only, then rerun Desktop/Tablet/Mobile and VI/EN.

After **explicit owner FULL TABLET PASS**, proceed to **mandatory Phase 2B cross-device source convergence**: inventory the canonical components and duplicated source-owned CSS/JS, remove only proven dead/conflicting overrides with measured before/after parity and owner QA. Do not open Phase 3 SEO or Production/public deployment before those gates.

**BẠN CẦN TEST GÌ FOR THIS DOC-ONLY COMMIT:** No new website behavior, so no special runtime test for the documentation patch itself. Use the single matrix above as the remaining final owner acceptance gate. Do not claim Full Tablet PASS on documentation/CI alone.
