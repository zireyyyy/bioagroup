# BIO-A — R27 one-pass cleanup + R27b review fixes: START HERE (2026-11-19)

## Where things stand

| Item | Value |
|---|---|
| Repository / branch | `zireyyyy/bioagroup`, branch **`r27/content-cleanup`**; HEAD = the SHA in the ZIP name; code head `fb8edd8` (R27 + R27b) |
| Baseline | R26 `main` `a9333f7` |
| Commits | F04 on `main`: `530e1ec`, `a3dde53`, `9d044a7`. R27 content: `d93a0f0`, `8b601f9`, `fa4231a`, `4cb426b`, `7edb4ec`; docs `9634e25`. **R27b** (owner review 2026-11-19): `c3a3f0d`, `cc14ad3`, `fb8edd8`, then docs |
| Draft PR | `zireyyyy/bioagroup#13` (CI only, **do not merge before owner PASS**) |
| **CMS Preview (deployed R27 + R27b)** | **https://cms-preview.bioagroup.pages.dev/**: deployment `490ee5cf-fc83-484e-8a4a-dc6527f942f8`, live published Sanity content |
| Production `bioagroup.vn` | `main` `9d044a7` = R26 + the F04 `www` redirect, deployment `d187b3a4`. **Maintenance ON**, `CMS mode: off`, `/api/*` 503, `noindex`. **R27 content is NOT on Production** |
| `www.bioagroup.vn` | 301 → apex (path + query kept); no more 522 |

## Read in this order

1. `R27_RESULT.md`: F01–F04 status, direct evidence, problems and solutions; **R27b section** for the six review items.
2. `BLOG_REWRITE_PRIORITY.md`: which of the 29 pending articles to rewrite first (Vietnamese).
3. `OWNER_UAT.md`: one 10–15 minute acceptance pass (Vietnamese).
4. `OWNER_CONTENT_INPUTS.md`: only the real information the owner must supply (Vietnamese).
5. `CONTENT_INVENTORY.md`: every page/block and the 38 Blog articles: KEEP / REWRITE / HIDE / PENDING, before/after, provenance.
6. `CONTENT_SEO_CHANGELOG.md`: old → new text, head/SEO, structured data, redirects.
7. `QA_MATRIX.md`: commands, counts, viewports, zoom, logs, hashes, deploy status.
8. `DEPLOY_ROLLBACK.md`: Preview/Production state, `www` change log, Sanity writes, rollback.

R26 documents still valid: `docs/r26/` (deploy/rollback of Production, media replacement map, owner inputs R26).

## Rules that still apply

- `BIOA_SITE_MODE` stays `maintenance` until the owner orders the public launch.
- No CMS Production release pin without owner approval.
- No legal, business or hiring data is invented. Missing data stays hidden or neutral (`OWNER_CONTENT_INPUTS.md`).
- Merywood images stay until the owner replaces them in Studio (`docs/r26/MEDIA_REPLACEMENT_MAP.md`, unchanged by R27: same 41 positions).
- Only the owner gives **OWNER PASS** and orders **PUBLIC LAUNCH**.
