# BIO-A — FINAL DELIVERY + CONTENT COMPLETION (R24FD) — 2026-11-11

- **Owner directive:** "FINAL DELIVERY + CONTENT COMPLETION + PRODUCTION PUSH" — one pass, no new phase, no redesign. All owner PASS surfaces frozen. Push to `main` authorized; maintenance must stay ON; no secrets/database/security changes.
- **Commits (local):** `84c5cde` (code), `8f2675b` (approval, scope gate, D11 count, Careers flow test), then the docs commit.
- **Frozen QA build:** `D:\BIOA_WORKSPACE\QA_EVIDENCE\dist-final-fd` (built from `8f2675b`; the docs commit changes no build input). Logs: `D:\BIOA_WORKSPACE\_reports\final-fd\qa\summary.txt`.
- **Previous candidate:** `dist-delivery-r24cl` (`122a3ac`).

## 1. Changes
| ID | What | Owner file(s) | Surfaces |
|---|---|---|---|
| RUNTIME-SELFHOST-1 | `modal.js`, `input.js`, CF7 6.1.7 CSS served from `/assets/runtime/` (pinned in private bundle `p0b1-v2`, hash-verified, fail closed); same tag ids/positions | `tools/source-bundle.mjs`, `source-manifest.json` | all pages, non-visual (same bytes; `input.js` minus Cyrillic comments) |
| CAREERS-1 | Careers rebuilt on the Merywood Careers list + detail source; VI `/tuyen-dung/` + 3 roles, EN `/en/careers/` + 3 roles; local category filter; Merywood staff/LinkedIn/application box removed; CTA artwork → BIO-A monogram; owner-gated fields marked | `bioa-careers.mjs`, `build.mjs` | new pages D/T/M × VI/EN |
| CAREERS-1 links | Footer recruitment items of the owner-PASS Footer restored (R&D / NV Sales → matching role via the legacy slugs); About team CTA → Careers ("Xem Cơ Hội Nghề Nghiệp" / "Explore Careers"); VI slugs through one path authority; old/cross-language URLs redirect (noindex stubs); sitemap +8 | `bioa-home-refine.mjs`, `bioa-about-refine.mjs`, `bioa-transform.mjs`, `bioa-legacy-redirects.mjs` | Footer (all pages), About |
| TRACKER-1 | dead Merywood WP scripts calling the invalid host removed: WhatsApp click beacon, mw-guard token fetch, emoji loader | `bioa-transform.mjs` | non-visual |
| LEGAL-B2 | Privacy/Cookie rewritten from Luật 91/2025/QH15 + NĐ 356/2025/NĐ-CP (official Công báo texts) and the verified inventory; Merywood numbered-clause article pattern (source CSS unchanged) | `bioa-legal-pages.mjs` | policy pages D/T/M × VI/EN |

Not changed: Header, Home, Roadmap, How It Works, sliders, chat, modal markup/CSS, Blog, Contacts, `/api/lead`, D1, Turnstile, Sheets, Resend, middleware/maintenance, Tablet desktop-fluid block.

## 2. Policy UI parity (owner: "dài, chưa gọn, chênh lệch cỡ chữ")
Computed styles of `.policy-title / .policy-subtitle / .policy-text / section.policy-wrapper` on BIO-A and on merywood.com were measured at 1440, 834 and 390: **identical** (36/28/16 px desktop-fluid; 28/20/14 px mobile; same margins and widths). The imbalance came from the content shape (one-sentence sections under 28 px headings). LEGAL-B2 uses the Merywood article pattern instead: numbered clauses (1.1, 1.2 …) with `<br>` lists inside `p.policy-text`, ten sections (Privacy) / six (Cookie). No CSS was added, so there is no site-wide impact.

## 3. QA — one pass on the frozen build (`dist-final-fd`, tree hash `2e147645…`, 195 files; unchanged after the run)
| Check | Result |
|---|---|
| `test:candidate` (source pin, module isolation incl. R24FD approval, serve, chat gateway, roadmap cold-load/resync, determinism, P1/P2, P3 static, D11 redirects, business identity 150 pages) | exit 0 |
| `test:p0a` (historical fidelity 104/104 on the P0B1 snapshot + cumulative scope `…+R24CL+R24FD` + determinism) | exit 0 |
| `test:responsive` 15/15, `test:404`, `test:turnstile`, `test:chat`, maintenance-host gate | exit 0 |
| Scope gate R24FD vs `dist-delivery-r24cl` | PASS (runtime tags, tracker scripts, Footer menu, About CTA, policy body, Careers pages/stubs, sitemap +8 Careers URLs only) |
| D11 full audit | 60 targets: 38 redirects land on a 200 page (hash kept), 0 dead, R13 8/8 + C1 14/14 stay unlinked |
| Careers flow (VI/EN × 1440/834/390: list, filter, card → detail → back, lang switch, canonical, gated fields, no Merywood people/pay, no non-GET, no page error) | 186/186 |
| Desktop/Mobile/Tablet identity vs R24CL (7 groups × VI/EN × 390/768/834/1024/1201/1440/1920) | 0/98 identical — every case differs by exactly +4 visible elements (the 2 restored Footer items: 2 `li` + 2 `a`); see the next row |
| Identity outside Footer/About CTA (same 98 cases, footer subtree + `.mwa-team__btn` excluded; `tests/identity-outside-footer.mjs`) | **98/98 identical** — no OWNER PASS surface changed outside the requested Footer/About items |
| P1/P2 | PASS |
| Roadmap Home / Cosmetics (static + resized) | 36/36 · 36/36 |
| How It Works | 28/28 |
| Home sections incl. 768/769, 1200/1201, zoom 125% | 20/20 |
| Route smoke 110 routes × 1440/390 | 220/220 (T2 page error 0/220) |
| Chat UI | 60/60 |
| Lead form (3 routes × 3 widths × 4 server answers) | 36/36, no request left the browser |
| Baseline Tablet suites (browser smoke, services Swiper, Blog TOC, Contacts/404, full route audit) | PASS |
| Browser inventory (Home, Contacts, Careers, Privacy; modal open; WhatsApp click) | third parties = fonts.googleapis/gstatic, cdnjs, Turnstile, GeoJS, Google Maps, merywood.com images; no cookie set; localStorage empty before a choice; sessionStorage `is_first_visit`/`initial_referrer`/`landing_page`; no request to the invalid host any more |
| Screenshots (Careers list + 3 roles + Privacy/Cookie, VI/EN × 1440/1024/834/390) | `D:\BIOA_WORKSPACE\_reports\final-fd\screens\fd-*.png` (48) |

Not run this round: the deep custom-PASS guard against the old reference Preview (its reference predates R24/R24CL and needs per-phase classifier rules); the scope gates + identity proofs above cover the same "no change outside scope" question on the real build.

## 4. GitHub / Cloudflare
- History: `main` `cb4e92f` ⊂ PR #10 `ed7324c` ⊂ PR #11 `d59f50d` ⊂ recovery HEAD (all ancestors) → a fast-forward push is possible with no force and no lost owner change. `main` is not branch-protected; account has push.
- Cloudflare Pages builds every push through its GitHub app (check run "Cloudflare Pages" on `cb4e92f`). The Production build command runs `npm run build` = `verify-source-bundle && build`, which **fails closed** without the private source bundle; no storage, token or Pages variables exist yet. The CI workflow also runs on `main` and needs the same secrets.
- **Update (same day, owner authorization "COMPLETE PRIVATE BUILD SETUP"): done and pushed — see `FULL_HANDOFF.md` R24FD-PUSH. `main` = `a14aba2`, Production deployments `cf1ecfb7`/`a6e6a5d9` success, maintenance still ON.** The text below records the earlier decision.
- **Decision (before setup): NOT pushed.** A push now produces a failed Production build and a red CI run (owner rule: "không push để tạo một deployment lỗi"; IX.9 build-source blocker). The live site is unaffected: `bioagroup.vn` answers 503 "Website đang hoàn thiện" (maintenance) on `/`, `/en/`, `/tuyen-dung/`, `/privacy-policy/` (checked 2026-11-11).
- **OWNER ACTION to unblock the push** (`docs/OWNER_DECISIONS.md` "Steps to a Cloudflare build"):
  1. `node tools/pack-source-bundle.mjs --out D:\BIOA_WORKSPACE\_private\bioa-source-bundle.json.gz` (bundle `p0b1-v2`).
  2. Upload it to private storage (private R2 bucket or private GitHub release) and create a read-only token.
  3. Cloudflare Pages → Settings → Variables (Production **and** Preview, encrypted): `BIOA_SOURCE_URL`, `BIOA_SOURCE_TOKEN`; build command `node tools/fetch-source-bundle.mjs && npm run build`; `NODE_VERSION=20` (or 22, one version).
  4. GitHub → Settings → Secrets → Actions: same two names (CI fetch step).
  5. Then: `git push origin recovery/baseline-d59f50d-20261108:main` (fast-forward), watch the Cloudflare Production build, check `bioagroup.vn` still answers 503 maintenance.
- Maintenance is controlled by the Production middleware/variable and is not touched by this code.

## 5. Rollback
- Code: everything is local; `main` is unchanged. After a future push, roll back with Cloudflare Pages → Deployments → previous Production deployment → "Rollback", or `git revert` of the R24FD commits (no force-push).
- Bundle: `p0b1-v1` is kept next to `p0b1-v2`; reverting `source-manifest.json` restores the live-runtime behaviour.

## 6. Remaining release blockers
1. OD-7 private bundle storage/token/variables (blocks the push and any Cloudflare build).
2. OD-1/OD-2 legal approval + L-1…L-8 (`docs/LEGAL_POLICY_APPROVAL.md`).
3. OD-3 Careers sample content and gated fields; decide publish/hide.
4. OD-9 lead activation (D1, secrets) — the policy must match the providers enabled.
5. OD-5 images still served by merywood.com (non-blocking), to be replaced with BIO-A images.
6. Owner visual QA (`docs/OWNER_QA_CHECKLIST.md`), then a separate decision to switch maintenance off.
