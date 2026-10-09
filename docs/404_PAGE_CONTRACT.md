# Bio-A 404 — SOURCE DOM / ORIGINAL ASSET handoff (2026-10-09)
Status: CANDIDATE, NOT PASS. Owner specifically rejected custom button and blurred background; do not claim success before actual original PNG is committed and visually checked.

## Source confirmation
Original owner-supplied Merywood export `BIOA-Website.zip`, path `pages/index/index.html`, has actual Merywood button pattern `<a class="btn ..."><i class="icon btn__icon arrow"><svg width="20" height="20" ...><path d="M13.75 12.25H12.25V8.81055L6.53027 14.5303L5.46973 13.4697L11.1895 7.75H7.75V6.25H13.75V12.25Z"/></svg></i><span class="btn__text">...</span></a>`. BIO-A 404 reuses this SVG/path and DOM; the SVG is rotated in narrowly scoped 404 CSS to present a left arrow, not a newly drawn arrow or Unicode. Actual source `404.php` and CSS `main.css` are NOT in supplied export, so exact pixel/code parity of original 404 page is **unverified**. Recheck source once available. Do not conflate screenshot-matched dimensions with original CSS.

## Current minimal patch
- ROUTE `bioa-404.mjs`: CTA typography 14px/weight500 and geometry 142×47, source `<i class=icon btn__icon arrow>` SVG DOM; title/description English from original Merywood kept for both `/` and `/en/`; no overlay.
- ROUTE IMAGE: markup now PREFERS `/assets/bioa-404-original.png`, the untouched **2,404,033-byte 1808×870 owner original**, hash `00a6939ecab5ddbb6964a26c24d72ee56c8bf8c574f80bef07cce477cd13c076`. However GitHub connector in this session cannot transfer uploaded raw binary from local container into GitHub. **PNG is NOT in git at this checkpoint**. Existing 18,520-byte AVIF remains a temporary onerror fallback; user needs to upload the byte-identical original to `assets/bioa-404-original.png`. Do not claim image-quality fix deployed before file exists. Remove fallback in final cleanup only AFTER runtime PASS and image artifact is in git.
- No changes to `build.mjs`, `functions/_middleware.js`, D1, CRM, global/shared layout, SEO or other pages.
- Missing route should return true 404 when signed in, guest still 503, noindex remains on 404. Do not public website.

## Next gate
1. Upload exact original PNG as GitHub asset with file path above; verify binary matches hash and Git commit.
2. Check Cloudflare production deploy and image network status 200 with `image/png`, original dimensions.
3. Source CTA parity, Desktop/Tablet/Mobile separately; all PENDING until owner acceptance.
4. Keep 4-phase roadmap: remaining 404/Turnstile; full Tablet; cleanup; package. Sanity Free chosen by owner as future CMS, not yet integrated.
Rollback before this patch is `d6c938bf914514384aab6442dc19cc29b1ae22f4` (guest-lock intact). Both `BIOA-404-VIEN1` and `BIOA-404-SOURCE-PARITY2` superseded / unaccepted candidates.
