# BIO-A — FINAL QA & RELEASE READINESS (R24RC) — 2026-11-12

- **Base:** `main` `b79dad7` (R24OY, pushed with owner approval). **Local commits (not pushed):** `a045cf6` (code), `bb8a2bd` (approval/gate), docs commit.
- **Frozen QA build:** `D:\BIOA_WORKSPACE\QA_EVIDENCE\dist-final-rc`; evidence `D:\BIOA_WORKSPACE\_reports\release-rc\`.

## 1. CTA typography (CTA-TYPE-1)
| Width | BIO-A before (box · label · ratio) | Merywood source | After |
|---|---|---|---|
| 1440 / 1201+ | 340×66 · 12px · **0.182** (BIO-A desktop rule enlarged the box, not the label) | 255×50 · 12px · 0.242 | 340×66 · **16px** · 0.242; arrow 18 → 24px (same 66/50 scale) |
| 1024 | 242×47 · 11.4px · 0.242 | 181×35 · 8.5px · 0.243 | unchanged |
| 834 | 197×38 · 9.3px · 0.242 | 148×29 · 6.9px · 0.243 | unchanged |
| 390 | 295×54 · 16px · 0.296 | 295×54 · 16px · 0.296 | unchanged |
One rule, `@media (min-width:1201px)`, in the existing BIO-A owner of this button's desktop geometry (`bioa-transform.mjs`, `style#bioa-v3`). Shape, colour, link (Zalo), position, weight 550 and the text + arrow structure unchanged. Blog TOC CTA measured 350×54 · 12px = Merywood exactly → unchanged. Screenshots `release-rc/cta-{home,dvk,en}-{1920,1440,1201,1200,1024,834,390}.png`.

## 2. Full-site icon closure
Method: in a real browser, every visible icon signature (inline SVG path, icon images, CSS background/mask icons incl. pseudo-elements, arrow glyphs ↓↑←→‹›↗) on 12 page groups, BIO-A vs the Merywood source page, at **1440, 834 and 390** (`release-rc/icon-audit*.txt|json`).

| Group | Verified at | Result |
|---|---|---|
| Home VI/EN, About, Cosmetics, Other Services, Contacts, Blog index, Blog detail, Careers list, Careers detail, Privacy, Cookie | 1440 · 834 · 390 | All shared icons identical. Every difference is an owner-PASS BIO-A replacement: Header/Footer social icons (Facebook, Telegram, Zalo) for Merywood WhatsApp/LinkedIn/Instagram; BIO-A logo/monogram; Why-choose icon 04 → BIO-A monogram; About/Cosmetics category icons; chat avatar; BIO-A mobile menu button; Contacts "Nhắn Zalo" for the Merywood WhatsApp bubble. Merywood-only icons belong to components BIO-A does not have (dropdown ▶ and mega-menu "← Back"/service-card arrows; review quote icon removed with the BIO-A scenario cards in patch-f1). |
| Fixed this round | — | none needed (contact CTA structure was fixed in R24OY) |
| **Not verified** | — | 1024 and 1200/1201 boundaries for icons (only the CTA was measured there); EN pages other than Home EN (same markup as VI); blog pagination pages 2+, 404, redirect stubs; hover/active states. |

## 3. Lead E2E
| Level | Status | Evidence |
|---|---|---|
| MOCK PASS | lead-form probe 36/36 (3 routes × 3 widths × 4 server answers; no request leaves the browser) | `release-rc/qa/lead.log` |
| STAGING PASS (R24OX, form and endpoint code unchanged since) | real Chrome → `/api/lead` (Pages Functions from this repo, `wrangler pages dev`) → local D1: validation, consent, honeypot, idempotency, rate limit 429, Turnstile enforcement (rejects tokens without action `bioa_lead` + matching host), rows stored with IP hash only, success text only after `ok:true`; Sheets/Resend `not_configured` there | `owner-fix-ox/results/form-api-d1-results.txt` |
| **REAL E2E PASS (Production, 2026-11-12, owner-approved)** | owner submitted "QA TEST – please delete" on bioagroup.vn (owner session, maintenance ON): success message; Production D1 row `bioa_MmD16AOJ6H3Y` 09:29:19Z, consent stored, 43-char IP hash, `sheet_status=sent`, `email_status=sent`; Google Sheet row confirmed by owner screenshot; notification e-mail confirmed by owner | read-only D1 query by name; owner screenshots |
| Turnstile on Production | widget + secret configured in Production; preview hosts and maintenance lock `/api` (503 by design) | Pages config read 2026-11-11 |

## 4. Release blockers / open conditions (no change made without approval)
1. **Maintenance** — ON (`BIOA_SITE_MODE=maintenance`); switching off is a separate owner decision.
2. **Lead real E2E** — PASS (§3). Test row still in Production D1 and in the Sheet: delete after owner approval.
3. **Privacy/Cookie** — shortened text (R24OY) still needs owner/counsel approval; company items L-1 (registered legal name), L-2 (retention period), L-4 (cross-border transfer impact dossier, Law 91 Art. 20 — company obligation), L-5 (privacy contact).
4. **Careers** — 3 sample roles; pay/benefits, location/work type and application channel still "to be confirmed"; owner decides publish/hide.
5. **Domain** — `www.bioagroup.vn` returns **522**: only the apex `bioagroup.vn` is attached to the Pages project. Owner action: add `www` as a Pages custom domain or a www→apex redirect rule (DNS/Cloudflare setting, not changed here).
6. **Images** — theme/upload images and the cookie icon still load from merywood.com (next step: BIO-A images).
7. **Preview hash URLs** (`<hash>.bioagroup.pages.dev`) are public by middleware design (noindex, `/api` locked) and show the full site incl. unapproved content.
8. **Pages Functions fail open** (`fail_open: true`) — earlier recommendation was fail closed (security setting, owner decision).

## 5. Owner confirmations needed
- Visual QA of the contact CTA (desktop) and the R24OY/R24OX changes (checklist A00000/A0000).
- Approval for ONE fake lead on Production to close the real E2E gap. Proposed safe method: the owner opens `bioagroup.vn` with the owner access link (no maintenance change), submits one lead named `QA TEST – please delete`; I then read only that row from Production D1 (read-only query by name), check `sheet_status`/`email_status`, the Sheet row and the e-mail; afterwards the owner deletes the row in the Sheet and I delete it from D1 on approval.
- Push approval for `a045cf6`/`bb8a2bd` + docs.

## 6. Final regression on the frozen build (`dist-final-rc`, unchanged after the run)
| Check | Result |
|---|---|
| test:candidate, test:p0a (fidelity + cumulative scope incl. R24RC + determinism), responsive, 404, turnstile, chat gateway, maintenance-host | exit 0 |
| Scope gate R24RC vs R24OY build | PASS (only `style#bioa-v3`) |
| D11 · Careers flow · P1/P2 | PASS · 186/186 · PASS |
| Roadmap Home / Cosmetics · How It Works · Home sections | 36/36 · 36/36 · 28/28 · 20/20 |
| Route smoke 110 routes × 2 widths | 220/220 |
| Chat UI | 59/60 in the run: `/en/contacts/ @768` failed only because the embedded Google Map sent its own telemetry POST (`maps.googleapis.com/maps_api_js_slo/log`); rerun on the same build 60/60 |
| Lead form (mock) | 36/36 |
| Tablet suites (browser smoke, services Swiper, Blog TOC, Contacts/404, full route audit) | PASS |

## 7. Form submit + sitewide control text audit (FORM-BTN-TYPE-1, owner 2026-11-12)
- Owner: the "Gửi yêu cầu" label was smaller than the inputs. Measured: BIO-A 56px submit with 12px (1440), 13px (Tablet, forced by the input rule because the submit is an `input`), 15px (390); inputs 14.25 / 13 / 14px. Merywood label/box ratio 0.29 → **16px** at all widths; Tablet input rule now excludes `[type=submit]`. Verified 1440/1201/1200/1024/834/769/768/390 (`release-rc/modal-*.png`).
- Sitewide audit (`release-rc/control-text-audit.txt|json`): 345 control rows (buttons, CTAs, inputs, dropdowns, pills, pagination, modal) on 10 page groups × 1440/1024/834/390 vs the Merywood source. Flagged differences after the fix are all owner-PASS BIO-A customs, left unchanged: Header "Nhận tư vấn" 42px (canonical CTA), modal inputs and Blog TOC CTA larger text on Tablet (readability patches), Blog pagination 36px on mobile, product-format tabs 47px (ratio 0.30), chat launcher/send/copy icon buttons (no text).
