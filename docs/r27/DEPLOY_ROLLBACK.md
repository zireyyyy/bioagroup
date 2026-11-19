# R27 — Deploy, Production gate and rollback

All times are UTC, 2026-11-16. Evidence is under `evidence/r27/` in the ZIP.

## 1. Where each piece runs

| Surface | Commit | Deployment | State |
|---|---|---|---|
| **CMS Preview** https://cms-preview.bioagroup.pages.dev/ | **`7edb4ec`** (final R27 code, fast-forward `9d044a7..fa4231a..7edb4ec`) | **`899bcf3c-cda8-45bb-be30-2432e2961656`** | first R27 deploy `460c9e5f` (`fa4231a`): build log `CMS mode: live (preview branch "cms-preview")`, 15/15 sampled files byte-identical to the local build (`preview-deploy.txt`). Final deploy `899bcf3c`, then the webhook QA: a published Sanity edit was rebuilt and visible; after restore, 8/8 pages byte-identical to the local final build (`qa-webhook-r27.txt`) |
| Branch preview https://r27-content-cleanup.bioagroup.pages.dev/ | `7edb4ec` | created automatically by the branch push | same code; public static, `/api` locked |
| **Production** `bioagroup.vn` | `main` = `9d044a7` = R26 + **F04 middleware only** | `d187b3a4` | `BIOA_SITE_MODE=maintenance`, `CMS mode: off`, `/api/*` 503, `noindex`. **R27 content is not on Production** |
| GitHub | branch `r27/content-cleanup`; draft PR `zireyyyy/bioagroup#13` (CI only, **not merged**) | — | — |

**Why F04 went to `main` alone.** The `www` fix needs the Production middleware, so it went to `main` as 3 small commits:
- `530e1ec` middleware;
- `a3dde53` module-isolation approval;
- `9d044a7` CI step.

Before the push, `dist` was proven byte-identical to the R26 build. After the push, deployment `d187b3a4` was checked:
- `bioagroup.vn`, the hash URL and `/api` all 503;
- `CMS mode: off`;
- `secret in log: false`.

All R27 content stays off `main` until the owner accepts it.

## 2. F04 `www.bioagroup.vn` (Cloudflare 522)

**Read-only audit before any change** (`f04-www-audit-before.txt`):
- Zone `bioagroup.vn` is active on Cloudflare nameservers.
- `www` resolves to the Cloudflare proxy, but the Pages project `bioagroup` had only `bioagroup.vn` as a custom domain.
- `http(s)://www.bioagroup.vn/` returned **522**.
- This is the case Cloudflare documents: a proxied `www` record not registered with Pages gives 522.
- The developer token **cannot read or change** DNS, rulesets, Page Rules, certificates or Bulk Redirects (403). No DNS, nameserver, WAF, apex record or old deployment was touched.

**Change** (`f04-www-change.txt`):
1. Pages API: add `www.bioagroup.vn` as a custom domain of project `bioagroup`.
   - The only write made.
   - The domain went from pending to **active** in about 80 s.
   - Certificate issued: Google Trust Services, SAN `www.bioagroup.vn`.
2. Middleware, Production environment only: every `www` request → **301** `https://bioagroup.vn` + same path + query, before any other handling. `www` therefore never serves pages and cannot bypass the maintenance gate.

**Result (live):**

| Request | Response |
|---|---|
| `http://www.bioagroup.vn/` | 301 → `https://www.bioagroup.vn/` (zone *Always HTTPS*) |
| `https://www.bioagroup.vn/en/about/?a=1&b=2` | 301 → `https://bioagroup.vn/en/about/?a=1&b=2` |
| `https://www.bioagroup.vn/api/lead`, `/_bioa-access`, `/robots.txt` | 301 → the apex |
| followed redirects `http://www.bioagroup.vn/blog/?page=2` | 2 hops → `https://bioagroup.vn/blog/?page=2` → 503 maintenance; no loop |

The canonical stays on the apex on every page (R26/R27 audits).

**Rollback for F04:**
- Domain: Cloudflare dashboard → Workers & Pages → `bioagroup` → Custom domains → `www.bioagroup.vn` → Remove. `www` then returns to its previous state (522).
- Middleware: `git revert 530e1ec`. Without it, `www` shows the maintenance page like the apex instead of redirecting.

## 3. Sanity (CMS)

**Backup before any write:** `D:\BIOA_WORKSPACE\_private\sanity\backups\r27-before-2026-11-16T041505351Z.json` (99 documents, 0 drafts). The backup stays private and is not in the ZIP.

**Writes, each pinned to the revision that was read (`ifRevisionID`):**
- `tools/cms-sync-slots.mjs --from HEAD --apply`: 4 page documents. +7 new slots (current website text); −15 orphan slots that were still exactly the old repository text; 0 conflicts.
- `seo-cosmetics`, `seo-services`: descriptions.
- `blog-dia-chi-gia-cong-cac-loai-serum-dac-tri-dat-chuan`: `titleVi`, `seoTitleVi`.

Each field was changed only if Sanity still held the old website value.

**Studio:** redeployed with the new Blog field `rewriteApproved` ("Đã viết lại — hiển thị lại trên danh sách Blog").

**No Production release pin was created.** Production never reads Sanity live.

**Rollback:** restore the needed documents from the backup file (Studio → History → Restore, or the Sanity mutate API with the backup content). Code rollback alone does not need a Sanity change: an R26 build ignores the new slot ids.

## 4. Rollback of the R27 Preview

| What | How |
|---|---|
| Show the R26 code on CMS Preview | On a branch from the R27 head: `git revert --no-edit 9d044a7..HEAD` (reverts every R27 content/docs commit newest first; the F04 commits stay). Then fast-forward `cms-preview` to the revert commit. No force push. The Sanity webhook keeps rebuilding `cms-preview` |
| Look at the previous Preview | Deployment `554f7e36` (R26 `cms-preview`) remains in the Pages project's deployment list (hash URL; owner access) |
| Production | untouched by R27 content. Rollback of Production stays as documented in R26 (`docs/r26/DEPLOY_AND_ROLLBACK.md`) |

**Sync caveat:** branch `cms-preview` is now **ahead** of `main`. The GitHub Action that fast-forwards `cms-preview` on every push to `main` succeeds once `main` contains R27 (owner "push main"). If `main` received an unrelated push first, the action fails without overwriting anything, and `cms-preview` keeps R27.

## 5. Promotion after owner PASS (not done)

1. Fast-forward `main` to the R27 head (`r27/content-cleanup`); no force.
2. Watch the Production deployment. Verify:
   - `CMS mode: off`;
   - `BIOA_SITE_MODE=maintenance`;
   - `bioagroup.vn` and the hash URL 503, `/api` 503;
   - `www` 301.
3. Rollback after promotion: use the Cloudflare rollback to `d187b3a4`, as rehearsed in R26.

## 6. R27b update (2026-11-19)

| Item | Value |
|---|---|
| Code | `c3a3f0d` (content + REDIRECT-301) + `cc14ad3` (module-isolation approval) + `fb8edd8` (CMS test) on `r27/content-cleanup` |
| CMS Preview | `cms-preview` fast-forwarded `7edb4ec..cc14ad3` (deployment `ff6b8a2e`, 13/13 files byte-identical, `r27b-preview-deploy.txt`), then `..fb8edd8` (test-only) → **final deployment `490ee5cf-fc83-484e-8a4a-dc6527f942f8`**, `CMS mode: live`, 8/8 files byte-identical (`r27b-preview-deploy-final.txt`) |
| Production | unchanged: `main` `9d044a7`, deployment `d187b3a4`, maintenance ON |
| Real 301 on the Preview | `/blog/page/3/` → `/blog/`, `/en/blog/page/5` → `/en/blog/`, `/lien-he/` → `/contacts/`, `/careers/b2b-sales-executive/` → `/tuyen-dung/nhan-vien-kinh-doanh-b2b/` (query kept) |
| Sanity | backup `D:\BIOA_WORKSPACE\_private\sanity\backups\r27b-before-2026-11-19T043656739Z.json`. Text slots synced (`page-home`, `page-cosmetics`, `page-services`; 0 conflicts). `seo-services` EN description. Image slots: 5 empty documents of the old packaging pairs deleted, 5 new ones seeded (`tools/cms-seed.mjs`, create-if-missing). 41 positions |

**Rollback of R27b only:**
- Code: `git revert --no-edit cc14ad3 c3a3f0d` on the branch, then fast-forward `cms-preview`.
- Sanity: restore `page-home`, `page-cosmetics`, `page-services`, `seo-services` and the five old `imageSlot-home_*` documents from the backup file.
- Without `/_bioa-redirects.json` (or the middleware change) the meta-refresh pages still redirect as before.
