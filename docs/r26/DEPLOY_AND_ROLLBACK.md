# R26 — Production deploy and rollback

All times are UTC, 2026-11-15. Evidence is in `_reports/r26/` (ZIP `evidence/`).

## 1. Pre-merge gates (all green before the push)

- Repository gates and browser suites: `FINAL_QA.md` §1. The final `npm run test:candidate` rerun ended with exit 0.
- Preview E2E on the real Cloudflare Preview, visual parity 72/72, Sanity Preview E2E, lead staging 10/10.
- Release-isolation retest on the R26 code: `qa-release-isolation.txt`, all 8 cases as expected (see §4).
- PR `zireyyyy/bioagroup#12` CI success on `36dfe57`.
- `origin/main` was verified to still be `a062d59`, an ancestor of the branch head, so the fast-forward was possible.

## 2. Cloudflare configuration (before the merge)

| Change | Before | After |
|---|---|---|
| Pages Functions `fail_open` (Production + Preview; Cloudflare requires both to be equal) | `true` | `false` |
| Production variable `BIOA_DEPLOY_ENV` | absent | `production` (plain text) |

- Nothing else changed: no secret, binding, build command, DNS or `BIOA_SITE_MODE`.
- Before/after variable names: `cloudflare-config-change.txt`.

## 3. Merge and Production deploy

1. **Merge.** `git push origin 36dfe57:refs/heads/main` at 09:35:10: fast-forward `a062d59..36dfe57`. No force push, no merge commit.
2. **Deployment.** Cloudflare Production deployment `77390256-1daf-4a46-9f5f-c4b81bff8d27`: queued → initialize → clone → build → deploy all `success`; branch `main`, alias `https://bioagroup.vn`.
3. **Build log** (`production-deploy.txt`):
   - Node 20.20.0;
   - private source bundle: 16 verified files;
   - `CMS mode: off (production branch without a pinned release)`;
   - build complete;
   - `secret in log: false`.
4. **Deployment variables.** `BIOA_SITE_MODE=maintenance` and `BIOA_DEPLOY_ENV=production`; the secrets were present (names only).
5. **Edge checks** (`production-deploy.txt`, cache-busted):

| URL | Result |
|---|---|
| `https://bioagroup.vn/`, `/en/blog/`, `/api/lead` | 503, `x-robots-tag: noindex, nofollow, noarchive` |
| `https://bioagroup.pages.dev/` | 503 |
| `https://77390256.bioagroup.pages.dev/` and `/api/lead` (new Production hash URL) | **503** (R26 PROD-HASH-GATE works) |
| `https://3045c564.bioagroup.pages.dev/` (old pre-R26 Production deployment) | 200 + `noindex`; it keeps its old variables. Owner decision #7 |

6. **CI on `main`.** "BIO-A Candidate Build Validation" success, and "Sync CMS preview branch" success.

The later commits (this folder + handoff, then the ZIP tool `--doc` option) are further fast-forwards of `main`. They rebuild Production with the same website output; the final deployment is checked the same way (`production-deploy-final.txt`).

## 4. Rollback

### Website (code), rehearsed for real on Production (`rollback-rehearsal.txt`)

| Step | Alias owner of `bioagroup.vn` | `bioagroup.vn` | `/api/lead` |
|---|---|---|---|
| before | `77390256` | 503 | 503 |
| API rollback to `3045c564` (R24RC2) | `3045c564` | 503 | 503 |
| roll forward to `77390256` | `77390256` | 503 | 503 |

Maintenance held through every step.

**How to roll back:**
- **Dashboard:** Workers & Pages → bioagroup → Deployments → pick an earlier Production deployment → ⋯ → *Rollback to this deployment*.
- **API:** `POST /accounts/<account>/pages/projects/bioagroup/deployments/<id>/rollback`.
- **Last R24RC2 owner-PASS deployment:** `3045c564`.

**Git:** do not rewrite `main`. To undo code, `git revert` the R26 commits on a branch and fast-forward `main` to it.

### CMS content (when releases exist)

- Production builds only `cms/release/current.json`.
- To roll back, re-pin an earlier release (`node tools/cms-release.mjs pin <archive> --approved-by "<owner>"`) and push it to `main`.
- Editing or publishing in Sanity never changes Production. The isolation retest (`qa-release-isolation.txt`) gave these results:

| Case | Result |
|---|---|
| no pin, `SANITY_*` present, network blocked | repository content (= R26 build) |
| pin release A, then Sanity content changed | build unchanged = A (no leak) |
| release B | B; re-pin A = A byte-identical |
| forged checksum, missing archive, build without fetch while a pin exists, live mode requested on `main` | **build refuses** (exit 1 / error) |

All QA release files were deleted and never committed.

## 5. CMS Preview after the merge

- **Branch.** `cms-preview` is fast-forwarded to `main` by `.github/workflows/sync-cms-preview.yml` on every push to `main`. Its first build `554f7e36` ran in `CMS mode: live (preview branch "cms-preview")`.
- **Deploy hooks.** Cloudflare has exactly one deploy hook, for branch `cms-preview`. The old `cms/sanity-r25` hook was deleted.
- **Webhook.** Sanity webhook `wedZ6kXvaMBn4RXM` ("BIO-A Preview rebuild", published documents only, `includeDrafts: false`) points to that hook.
- **Verification** (`qa-cms-preview-webhook.txt`):
  1. A QA edit was published → deploy-hook builds → "CMS TEST" visible on cms-preview.
  2. Restore → rebuild → 8 representative pages byte-identical to the local R26 build.
  3. Sanity was left clean: 0 drafts, 0 QA documents, 0 assets, 0 slots with images.
- **Branch `cms/sanity-r25`.** It stays as history (= `36dfe57`) and no longer has a deploy hook. It can be deleted when the owner wants.
