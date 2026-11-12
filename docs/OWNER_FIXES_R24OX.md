# BIO-A — OWNER-REPORTED FIXES (R24OX) — 2026-11-12

- **Owner input:** 8 screenshots on the deployed build `600f16d2` (`main` `96c2b13`): icons/arrows differ from Merywood (1–4), Careers article ending (5–6), Careers titles look too large, Cookie Policy shows technical names (7), form shows "Chưa gửi được yêu cầu" and a `Send` button (8).
- **Commits:** `e0618e6` (code), `8dddeb0` (approval + tests), docs commit. Frozen QA build: `D:\BIOA_WORKSPACE\QA_EVIDENCE\dist-final-ox`; before: `dist-before-ox` (= `96c2b13`).

## A + C. Icons/arrows and title size — ONE root cause: the site was not rendering Manrope
| | |
|---|---|
| Evidence | CDP `CSS.getPlatformFontsForNode` on the same elements at 1440: Merywood renders **Manrope** everywhere; BIO-A rendered **Arial** for every 400/500/600/700 text (Careers title, body, `‹ Back`, `See the roles ↓`, pills, Privacy). Only weight-550 text (buttons, nav) was Manrope. Whole-page glyph tally before → after: Home 51% → 0% Arial, About 98% → 0%, Contacts 98% → 0%, Careers 97% → 0%, Privacy 99% → 0% (+ Segoe UI in the cookie banner/chat → Manrope). `D:\BIOA_WORKSPACE\_reports\owner-fix-ox\font-glyph-tally.txt` |
| Root cause | The pinned Merywood `main.css` declares six static `@font-face "Manrope"` (300–800) pointing at merywood.com. That host sends **no `Access-Control-Allow-Origin`** (checked with `Origin: https://bioagroup.vn`), so browsers block those fonts on every other origin — including production. Because the faces match weights 400/500/600/700 exactly, the browser chose them, failed, and fell back to Arial. The Google Manrope Variable stylesheet (owner font policy, 200–800, includes the `vietnamese` subset) was only used for non-matching weights. |
| Fix (FONT-SOURCE-1, `tools/source-bundle.mjs`) | The served `/assets/runtime/merywood-main.css` drops exactly those six faces (fail-closed: build stops if the set changes). The input bundle and its hash check are unchanged. No CSS size/weight/theme rule changed. |
| Icons/arrows | Merywood itself uses the text characters `↓` and `‹` and the same inline SVG arrow in `.btn__icon.arrow`; with Manrope they now render as on Merywood. `bioa-careers.mjs` keeps the source DOM (text replaced on the same elements). |
| Title "too large" | Computed sizes were already identical to Merywood (H1 45px, intro H2 52px/500, body 18px, list 12px desktop-fluid). The visual difference was Arial (wider, larger x-height) vs Manrope. No font-size was changed. |
| Side effect checked | Text reflows slightly narrower everywhere. Full scan of every non-article page × 1440/1024/834/390 for "Bio-A" split after the hyphen: before 8, after 8 (body-text reflow only); one new break in a heading (About CTA VI title "…Cùng Bio-" / "A Group?") fixed with an invisible word joiner in the About owner (`bioa-about-refine.mjs`), text unchanged. |

## B. Careers article ending (CAREERS-ENDING-1, `bioa-careers.mjs`)
- Root cause: R24FD removed the Merywood `.mwc-talk` block and the final e-mail row and added a non-source button without the source arrow SVG.
- Fix: source structure restored — final section (title, text, e-mail row) followed by `.mwc-talk` (title, text, `.mwc-wts` card with list + note). BIO-A text; only `.mwc-hrgrid` (Merywood staff photos, names, LinkedIn) removed. Copy says applications are **not** open yet and the contact is not a formal application. `data-owner-approval="required"` on the final + talk blocks.

## D. Cookie Policy wording (COOKIE-WORDING-1, `bioa-legal-pages.mjs`)
- Storage described in plain words (cookie choice; first page + source of the visit), with purpose, where it lives, retention ("until you clear browser data" / "cleared when you close the tab") and that it is not sent to the server. No variable or API names on the page (code comments keep them for maintainers). Third-party recipients unchanged. "Last updated" 12/11/2026.

## E. Form / API Lead
| Check | Result | How |
|---|---|---|
| Owner screenshot 8 ("Chưa gửi được yêu cầu" on `600f16d2.bioagroup.pages.dev`) | **Expected by design**: the middleware locks `/api/*` on every `*.bioagroup.pages.dev` preview host (POST → 503); production `bioagroup.vn/api/lead` is behind maintenance (503 without the owner cookie). Not changed. | `curl -X POST` (empty body) |
| FORM-LABEL-1 | VI `Gửi yêu cầu`, EN `Send` | build + browser |
| **FORM UI PASS** | validation message, loading text, success only on `ok:true`, modal closes, 429 message, error message | real Chrome against local staging |
| **API CONTRACT PASS** | GET 405 · cross-origin 403 · missing consent 400 · honeypot 200 (not stored) · valid 200 · same id retry 200 (idempotent, no duplicate) · 6th in an hour 429 · Turnstile enforced (test keys rejected: action/hostname must match) | local `wrangler pages dev` (Pages Functions from this repo) |
| **D1 PERSISTENCE PASS — local staging D1 only** | rows stored with name, contact, locale, page, consent time, 43-char IP hash (no raw IP); `sheet_status`/`email_status` = `not_configured` | miniflare D1 with `migrations/0001_bioa_leads.sql`, fake data only |
| Production D1 persistence | **NOT VERIFIED** — needs the owner's explicit permission for one fake test row (and the owner preview cookie) | — |
| Google Sheets delivery | **NOT VERIFIED** — no separate staging sheet/service account; never sent test data to the production sheet | — |
| Form E2E on production | **NOT VERIFIED** (maintenance + no permission) | — |

## Not changed
Header, Footer, Chat, Home/About/Cosmetics/Services/Blog/Contacts layout and CSS, Tablet desktop-fluid block, `/api/lead`, D1, Turnstile, Sheets, Resend, middleware/maintenance, secrets.

## OWNER confirmation needed
1. **Visual QA of the real font sitewide** (biggest visible change: every page now renders Manrope as Merywood does). Before/after screenshots: `D:\BIOA_WORKSPACE\_reports\owner-fix-ox\before|after\`.
2. Careers ending wording (`Tìm hiểu thêm về vị trí`, what to include when contacting).
3. Permission (or not) for ONE fake lead on production D1/Sheets to close the E2E gap.
