# BIO-A — Asset Source and Direct-Reference Register (2026-10-13)
Baseline: `c320f2868a46aafd141a7178c03337a1d07b3a82`. **STATIC REFERENCE AUDIT ONLY.** Do not delete, regenerate, recolor, recompress or silently substitute owner-approved artwork.

Legend: `REF` = filename appears literally in inspected render/refinement modules; `UNRESOLVED` = no literal reference in that module scope (NOT proof unused in built HTML or production). All 31 file paths confirmed present in baseline Git tree.

| Group | Asset path (`assets/`) | Static owner / evidence | Direct status |
|---|---|---|---|
| Brand | `bioa-full.svg` | Home/shared; About | REF |
| Brand | `bioa-full-light.svg` | Home/shared Footer | REF |
| Brand | `bioa-wordmark.svg` | no direct render-module literal | UNRESOLVED |
| Brand | `bioa-wordmark-light.svg` | no direct render-module literal | UNRESOLVED |
| Brand | `bioa-monogram.svg` | Home/shared, transform, Cosmetics, Blog, 404 | REF |
| Brand | `bioa-monogram-cream.svg` | Home/shared, Services | REF |
| Social | `zalo-bioa.svg` | no direct render-module literal | UNRESOLVED |
| Social | `zalo-bioa-owner.png` | Home/shared, transform, Blog, Contacts | REF |
| Social | `zalo-bioa-framed-cream.png` | no direct render-module literal | UNRESOLVED |
| Social | `zalo-bioa-circle-cream.svg` | no direct render-module literal | UNRESOLVED |
| Chat | `bioa-sales-avatar.webp` | Home/shared `addContactLauncher` | REF |
| About | `about-icon-01-trang-diem.png` | About/Cosmetics | REF |
| About | `about-icon-02-cham-soc-toc.png` | About/Cosmetics | REF |
| About | `about-icon-03-cham-soc-body.png` | About/Cosmetics | REF |
| About | `about-icon-04-cham-soc-da-mat.png` | About/Cosmetics | REF |
| About | `about-icon-05-ca-nhan.png` | About/Cosmetics | REF |
| About | `about-icon-06-me-be.png` | About/Cosmetics | REF |
| Services | `service-icon-01-manufacturing.svg` | Services | REF |
| Services | `service-icon-02-packing.svg` | Services | REF |
| Services | `service-icon-03-documentation.svg` | Services | REF |
| Services | `service-icon-04-containers.svg` | Services | REF |
| Services | `service-icon-05-label-design.svg` | Services | REF |
| Cosmetics | `cosmetics-hero-bioa.webp` | Cosmetics/Services | REF |
| 404 | `bioa-404-original.png` | 404 renderer | REF |
| Blog | `blog/1e9cb779b927673fd2a83de4130f69da-1150.webp` | Blog module | REF |
| Blog | `blog/3591cb7df74b41c8d5f337bf831c5708-6251.webp` | Blog module | REF |
| Blog | `blog/da997b9ffc85e19205399595afbb4ea5-1595.webp` | Blog module | REF |
| Blog | `blog/fa9a25c5c6111d27260aba7125496d39-9296.webp` | Blog module | REF |
| Blog | `blog/geminigeneratedimagec8pv19c8pv19c8pv-4025.webp` | Blog module | REF |
| Blog | `blog/kem-duong-am-thumbnail-8169.webp` | Blog module | REF |
| Blog | `blog/mo-ta-cong-viec-sale-online-1-8042.webp` | Blog module | REF |

## What remains to validate
For each file, verify exact output DOM `src/srcset` and CSS `url()`, network 200/404, intrinsic dimensions and SVG `viewBox`, transparency/padding, `object-fit`, `object-position`, perceived color/scale and click area. Capture actual screenshots at Desktop, Tablet and Mobile and both VI/EN. Do not confuse social button hitbox dimensions with the icon inside. Confirm the original 404 PNG **bytes**, not merely the same filename, before future asset work.

Build output and live Cloudflare asset network have NOT been checked by this document. Existing `main` is untouched.
