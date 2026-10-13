## 2026-10-13 — A3 audit evidence and diagnostic repair (latest)

Owner baseline `c320f2868a46aafd141a7178c03337a1d07b3a82` on `main` remains untouched. Historical SCALE9 Tablet changes are not an accepted source. In PR #3 audit branch: initial automatic build/style probe run `38339149965` reported FAILURE on audit-script Invalid URL (remote Merywood URL), **not a BIO-A site regression**; build/responsive and browser geometry steps PASSED. Generated evidence: 106 HTML files, 32 assets including leads JS, all 6 About icons referenced, apparent missing `/assets/img/logo-bg.svg` (requires computed evidence). Fixed measurement harness to guard invalid URLs, scan inline style attributes, and normalize root `/` instead of `//`.

Scope **AUDIT-INSTRUMENTATION ONLY**, no production/UI CSS/JS/images/components touched. Next consume new CI computed JSON after workflow completes and identify verified cascade winner + desired Merywood behavior BEFORE component edits. Desktop/Mobile LOCKED, Tablet PENDING; no visual PASS promoted.

---

# BIO-A — NEW CHAT CONTINUATION (authoritative 2026-10-13)
Repository: https://github.com/zireyyyy/bioagroup
Owner-approved rollback and production baseline: `c320f2868a46aafd141a7178c03337a1d07b3a82` (`main` confirmed 2026-10-13).

READ FIRST: `START_HERE.md` -> `AGENTS.md` -> `FULL_HANDOFF.md` -> `docs/WORKFLOW.md` -> `docs/SOURCE_MAP.md` -> `docs/RESPONSIVE_SOURCE_PARITY_CONTRACT.md`.
For current owner requested Source Difference/asset audit use:
- `docs/MERYWOOD_BIOA_OWNERSHIP_AUDIT_20261013.md`
- `docs/BIOA_ASSET_SOURCE_REGISTER_20261013.md`
- Prior chat Library: `BIOA_MERYWOOD_SOURCE_AUDIT_c320f28.md`; `BIOA_ASSET_REPLACEMENT_REGISTER_c320f28.csv` (source audit and 31-asset register).

IMPORTANT: older SCALE9 heading in historical handoff is a **rejected/non-authoritative Tablet patch history**. The owner directed rollback to c320f28. Maintain this baseline. No source UI code was edited by audit branch `audit/merywood-bioa-ownership-20261013`. Home Desktop/Mobile confirmed behavior and all owner-confirmed PASS surfaces are locked; Tablet remains incomplete and must not be declared globally PASS.

Source-of-truth is original Merywood DOM/layout/motion/hover/interaction and owner-provided original CSS `main.txt`, adapted ONLY for approved BIO-A content/assets/branding/functionality. The ZIP and `main.txt` were inventoried in previous chat but are not bundled here as a pinned Merywood snapshot. `build.mjs` currently re-fetches remote Merywood per build; generated HTML and computed cascade must be checked before making any cleanup patches. Assets are NOT to be regenerated or deleted without proof/authorization.

Immediate next job (Phase A2/A3): establish source-version and build-output comparator; map actual DOM and winning CSS/JS rules + image network for shared Header/Footer/Chat/Cookie across VI/EN Home/subpages and CSS viewport widths 390, 768, 769, 834, 1024, 1180, 1440. Record evidence and the only correct component owner before narrow code changes. Keep D1/Sheets/Resend/Turnstile, 14-day maintenance/noindex, Sanity future-only and 404 PNG frozen.

After every push report exact commit SHA, branch, what changed, BUILD/OWNER statuses separately, and explicit owner-facing BẠN CẦN TEST GÌ. Do NOT label visual PASS based on build or code inspection.
