# BIO-A — FINAL DELIVERY CLEANUP (R24CL) — 2026-11-11

- **Owner directive:** "FINAL COMPLETION + CLEANUP + DELIVERY", one pass, no new phase. All owner PASS surfaces are frozen.
- **Commits:**
  - `36668a8`: email pill, cleanup, legal pages, CF7 JS;
  - `abfb606`: approval and gate chain;
  - `8a1c42d`: ignore report folders;
  - `ff0f915`: private-bundle build path.
- **Frozen QA candidate:** `D:\BIOA_WORKSPACE\QA_EVIDENCE\dist-delivery-r24cl`.
- **Previous candidate:** `dist-tablet-r25b` (Tablet `ed50f1e`, owner quick check OK, frozen).

## 1. EMAIL-PILL-1 — square glow behind `contact@bioagroup.vn` (owner screenshots 2026-11-11 09:21–09:24)

| | |
|---|---|
| Cause (computed CSS) | The Merywood source styles the email pill on `.header__email`, including `backdrop-filter: blur(25px)`. BIO-A Patch A8 moved the pill look (radius 14px, background, border) to the inner `<a>`. It neutralised the shell's background, border and radius, but **not** its `backdrop-filter`. Chrome therefore blurred the **rectangular** shell area behind the rounded pill, which is the square edge in the screenshots. Same at Tablet (shell radius 0, pill radius `.8333vw`). The pill is hidden on Mobile. |
| Fix (owner: Patch A8, `bioa-home-refine.mjs`, all widths) | `.header__email { backdrop-filter: none }` and the same `blur(25px)` moved onto the pill `<a>`. Size, position, colour, border and radius are unchanged. |
| Evidence | `_reports\final-delivery\pill-stripes-OLD-{1440,1024,834}.png` vs `pill-stripes-CLEANBUILD-*.png`: test-only high-contrast stripes behind the Header. OLD shows the blurred rectangle corners; the build shows a rounded glass pill only. The `pill-*-headed.png` captures over the real hero were already equal, because a soft background hides the artefact. |

## 2. CLEANUP-1 — Russian comments and Merywood traces in the output
- **BIO-A-owned repository source:** no Cyrillic at all. Every Cyrillic hit came from the Merywood source HTML and the pinned runtime `main.js`.
- **Removed:**
  - CSS/JS/HTML comments containing Cyrillic. 2,794 inline blocks on 102 pages, plus the served `assets/runtime/merywood-main.js`. The bundle hash is still verified at input; the served copy has those comments removed and gets a new `?v=` hash.
  - Leftover marker comments: "Merywood Consent Banner", "Dashly BEGIN/END", "Google Tag Manager", "Yandex.Metrika counter", "Yoast SEO plugin".
  - `<meta name="generator" content="WordPress 7.1.2">`.
- **Localized:** the CF7 form accessible name `aria-label="Контактная форма"`, which screen readers read aloud, is now "Biểu mẫu liên hệ" / "Contact form".
- **Kept on purpose:**
  - `.mw-*` / `merywood-cg-*` class names, the runtime file names `merywood-main.*`, function names and DOM. They are in use or serve provenance.
  - Neutral structure comments.
  - All non-Cyrillic comments.
- **Proof:**
  - `tests/cleanup-comment-only-proof.mjs`: 5,962 inline blocks compared. 2,794 changed by comment removal only, 102 by EMAIL-PILL-1, 0 other changes, 0 Cyrillic left.
  - Build guard: the build fails if any Cyrillic remains or a stripped script no longer compiles.
  - `main.js` code is identical after removing comments.
  - Scope gate R24CL PASS vs `dist-tablet-r25b`.
- **Visible Merywood/Estonia text after cleanup:** none (scan of text, `title`, meta, `alt`, `aria-label`, `title` attributes and JSON-LD).

## 3. LEGAL-B1 — Privacy / Cookie (VI + EN)
- **Removed:**
  - Merywood's Estonian entity ("Bio-A Group OÜ, Reg no. 16386898, Narva mnt 7-557, Tallinn, Estonia");
  - Estonian laws and the Estonian DPA;
  - English text on the VI pages.
- **New body (`bioa-legal-pages.mjs`)**, built only from verified code and `bioa-business.mjs`:
  - brand, trade name, tax code 0318126597, address, e-mail and hotline;
  - the exact form fields;
  - the IP hash (never the raw IP);
  - Cloudflare D1 + Turnstile, optional Google Sheets / Resend;
  - browser storage keys;
  - the third parties loaded;
  - the chat being local-only;
  - a rights request contact.
- **Not invented:** no legal entity type, registration number, law, authority or retention period.
- The external host of some images/theme files (merywood.com) is described generically on the page. It disappears once those files are self-hosted or replaced (OD-5).
- **Still required:** owner/legal approval of the wording before Production (OD-1/OD-2).

## 4. CF7 — what is still used
| Part | Status | Evidence |
|---|---|---|
| BIO-A form path | `bioa-leads.js` handles submit (`preventDefault`) → `POST /api/lead` → D1 → optional Sheets/Resend. Unchanged | lead-form probe |
| CF7 JS (`contact-form-7/includes/js/index.js`, `swv/js/index.js`, live from merywood.com) | **Removed (CF7-JS-1).** Not needed by the BIO-A path. Its schema fetch to the invalid host "Bio-A Group.com" caused the T2 page error on every page | `tests/cf7-js-removal-proof.mjs` on `dist-tablet-r25b`: with only these scripts blocked the modal rendered byte-identically in 9/12 route×width cases. The other 3 differ by screenshot timing: the same "with CF7" case gave 3 different hashes in 3 runs, one equal to the "without" capture. Same form message, no non-GET request, T2 error gone |
| CF7 CSS (`styles.css`, live) | **Kept.** It hides `.screen-reader-response` and styles the response output. Removing it changes the owner-PASS modal height (+13–19 px) | same proof, first variant |
| Inline CF7 helpers (`#contact-form-7-js-before/-after`) | Kept unchanged (referrer hidden field, `wpcf7` config read by other Merywood scripts) | — |
| `/api/lead`, D1, Turnstile, Sheets, Resend, consent, error handling | Untouched | `test:turnstile`, lead probe 36/36 |

## 5. Private source bundle → Cloudflare Preview (prepared, NOT wired)
- `tools/pack-source-bundle.mjs` (owner runs it once; output stays outside the public repo).
- `tools/fetch-source-bundle.mjs` (https + read-only token, per-file SHA-256, fail closed).
- `.source-bundle/` default in `bundleDir()`.
- CI workflow fetch step + recovery branch trigger.
- Test: `tests/fetch-source-bundle.test.mjs`.
- Nothing pushed. The remaining owner actions are listed in `docs/OWNER_DECISIONS.md` (OD-5, OD-7, OD-8).

## 6. Final QA — one round on the frozen `dist-delivery-r24cl` (logs `D:\BIOA_WORKSPACE\_reports\final-delivery\qa\summary.txt`)
| Check | Result |
|---|---|
| `test:candidate`, `test:responsive` 15/15, `test:p0a` (fidelity 104/104, cumulative scope incl. R24CL, determinism), `test:404`, `test:turnstile`, `test:chat`, maintenance-host | exit 0 |
| Scope gate R24CL vs `dist-tablet-r25b` | PASS |
| Cleanup proof (comment-only) | 5,962 blocks, 0 problems |
| Visible-text proof R21 → delivery (guard routes × VI/EN × 4 widths) | 64/64 (Footer/About labels only) |
| Desktop/Mobile identity vs Tablet-frozen `r25b` (7 groups × VI/EN × 390/768/1201/1440/1920) | 70/70 identical |
| D11 | 32 redirects to 200, 0 dead, 22/22 stay unlinked |
| CF7 JS proof (on `r25b`) | same message, no non-GET, T2 gone; modal identical except capture timing noise |
| P1/P2 | PASS |
| Roadmap Home / Cosmetics (static + resized) | 36/36 · 36/36 |
| How It Works | 28/28 |
| Home sections incl. 768/769, 1200/1201, zoom 125% | 20/20 |
| Route smoke 102 routes × 1440/390 | 204/204, **T2 page error 0/204** (was 204/204) |
| Chat UI | 60/60 |
| Lead form (3 routes × 3 widths × 4 server answers) | 36/36, nothing sent |
| Baseline Tablet suites (browser smoke, services Swiper, Blog TOC, Contacts/404, full route audit) | PASS (system-Chrome shim, tests unchanged) |
| Deep guard vs approved Preview (reference runtime pinned), 64 cases | **all differences inside declared scopes** |

**Honest log:**
- 4 Blog-index guard cases failed on `net::ERR_CERT_AUTHORITY_INVALID` while connecting to the reference host. One more case loaded without its third-party scripts at the same time.
- The certificate was valid when rechecked (`Verify return code: 0`). The 8 Blog-index cases were rerun:
  - the first rerun was invalid (Git Bash rewrote `GUARD_PATHS=/blog/` into a Windows path);
  - the second rerun was clean.
- The merged result (`guard-merged.json`) was then classified.
- The new CF7-JS-1 effects (`.wpcf7` keeps `no-js`, no `js` swap, no hidden CF7 spinner) are classified only by exact-count rules.
- During the round I rebuilt `dist` once (byte-identical output). No step was reading `dist` at that moment (the timeline is in `summary.txt`).
