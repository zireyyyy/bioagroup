# R28d-D1 — Rollback

| State | What exists | How to roll back |
|---|---|---|
| **Now: APPROVAL PENDING** | Branch `r28d/d1-en-parity`: `9e889fd` EN copy + registry, `4d79ce1` gates and layout tools, plus docs; its own Cloudflare branch preview. `cms-preview` / `r28/blog-icon-cms` stay at `bbf21b3`. Sanity: **0 writes**. `main`: unchanged | Nothing live changed. Delete or ignore the branch: `git push origin --delete r28d/d1-en-parity`, only on the Owner's request |
| After approval, code fast-forwarded to `cms-preview` | CMS Preview shows the new EN | `git revert 4d79ce1 9e889fd` on `r28/blog-icon-cms`, fast-forward `cms-preview`. **If the Sanity sync already ran, do the Sanity step below first** |
| After approval, Sanity synced | `page-home` / `page-about` / `page-cosmetics` hold the new slot ids | **Sanity first:** after reverting the code, `node tools/cms-sync-slots.mjs --from <D1 head> --apply` (re-adds the old slots with the old text, removes the unedited new slots, pinned `ifRevisionID`). Last resort: restore the 3 documents from `_private/sanity/backups/r28d-d1-before-*.json` |

**Production:**
- `main` `9d044a7` is never touched in D1.
- No pinned CMS release is created.
