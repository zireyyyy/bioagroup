# R26 — Changelog and R24RC2 parity

**Frozen baseline:** R24RC2 owner PASS = `main` `a062d59`.
- Frozen build: `D:\BIOA_WORKSPACE\QA_EVIDENCE\dist-final-rc2`, 195 files.
- Last Production deployment before R26: `3045c564`.

**Delivered head:** see `START_HERE.md` (the commit merged to `main`).

## Commits since R24RC2 (oldest last)

| Commit | Purpose | Website output vs R24RC2 |
|---|---|---|
| `06e0bb0` | R26: approve the middleware commit in the module-isolation gate | none (test registry) |
| `4d72437` | R26: SEO-HEAD-1 (hreflang vi/en/x-default, og:locale by language, sitemap without the noindex policy pages); PROD-HASH-GATE middleware; CI runs CMS + SEO audit; `sync-cms-preview` workflow | **head only**, proven by scope gate R26 (below) |
| `7943197` | docs R25b Preview verification | none |
| `b92c910` | R25b: Linux prebuild main-module fix; build refuses a missing expected CMS snapshot | none (CMS off) |
| `b36c2ee` | docs R25b | none |
| `cc1f821` | R25b: pinned Production release, per-position image slots, canonical + legal-hash gates | none (CMS off) |
| `2aefbea`, `7dd9bc7`, `a9a8625` | docs R25 | none |
| `b28a150` | R25: module-isolation approval | none |
| `be097b4` | R25: Sanity CMS integration (Studio, registry, build-time snapshot, fail-closed fetch) | none (CMS off) |

The R26 merge also includes docs commits (this folder, handoff).

## Files changed by R26 (code)

| File | Change | Why |
|---|---|---|
| `build.mjs` | `applyLanguageAlternates()`: 3 `<link rel="alternate" hreflang>` after the canonical; `og:locale` = `vi_VN`/`en_US`; sitemap excludes pages with robots noindex | The bilingual site had no hreflang (110/110 pages). VI pages declared `og:locale en_US`. The 4 noindex policy pages were listed in the sitemap |
| `functions/_middleware.js` | With `BIOA_DEPLOY_ENV=production`, `<hash>.bioagroup.pages.dev` URLs of **Production** deployments get the same maintenance gate as `bioagroup.vn` | A Production deployment's hash URL served the whole site to anyone while in maintenance. Preview deployments unchanged; without the variable the behaviour is exactly the baseline |
| `.github/workflows/validate-source-component-rebuild.yml` | Adds `npm run test:cms`, the SEO/content audit and the hash-gate test | CI coverage for the CMS layer and SEO |
| `.github/workflows/sync-cms-preview.yml` | New: fast-forwards branch `cms-preview` to `main` on every push to `main` | The Sanity webhook rebuilds `cms-preview`, so editors preview with Production code |
| `tests/r26-*.mjs`, `tests/phase-diff-scope.mjs` (R26 scope), `tests/p0a-final-gate.mjs` (+R26), `tests/p0a-module-isolation.test.mjs` (approval) | Gates | — |
| `tools/media-replacement-map.mjs` | Owner media map generator | — |

**Cloudflare configuration (R26):**
- `fail_open` `true` → `false` (Production + Preview; Cloudflare requires both to be equal).
- Production env + `BIOA_DEPLOY_ENV=production` (plain text).
- No secret, binding, build command or DNS changed. `BIOA_SITE_MODE=maintenance` unchanged.

## Parity proof

| Check | Result |
|---|---|
| CMS disabled, R25/R25b code only (before R26 head change) vs R24RC2 | byte-identical (`diff -r`, 195 files) |
| R26 build vs R24RC2: scope gate `node tests/phase-diff-scope.mjs dist-final-rc2 R26` | **PASS**: every changed HTML file differs only in `link[rel=alternate][hreflang]` and `meta[property=og:locale]`; sitemap only lost the 4 noindex policy URLs; no other file changed |
| Cumulative gate P0B1 snapshot → R26 (`tests/p0a-final-gate.mjs`, all phases P1…R26) | PASS (in `test:p0a`) |
| Preview (live CMS, content = repository) vs local R26 build | 10/10 representative pages byte-identical after the CMS QA rollback |
| Visual/geometry parity vs R24RC2 (12 families × VI/EN × 3 widths) | see `FINAL_QA.md` |

Nothing visible on the pages changed: no design, layout, typography, icon, CTA, Header/Footer, chat or form change.
