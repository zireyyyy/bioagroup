// D11 — legacy Bio-A slugs used by the OWNER PASS Footer v2 (FOOTER-D1-REV, owner-supplied legacy
// site/database) and About product cards. No page exists at these slugs, so they returned 404.
// The Footer DOM/hrefs stay untouched (frozen); instead each legacy slug gets a static redirect page
// to the existing BIO-A page with the same meaning. Only slugs with an unambiguous same-meaning target
// are mapped; everything else stays an owner decision (see docs/OWNER_ISSUE_LEDGER.md).
// Stubs are noindex, carry a canonical to the target and are never listed in sitemap.xml.
const SITE = "https://bioagroup.vn";

const MAP = {
  // Footer "Bio-A Group" column
  "lien-he": "contacts",                                  // Liên Hệ / Contact
  "nang-luc": "contract-manufacturing-cosmetics",         // section "Năng Lực Sản Xuất & Kiểm Soát Chất Lượng"
  "tuyen-dung-rd": "careers",                             // Tuyển Dụng R&D
  "tuyen-dung-nv-sales": "careers",                       // Tuyển Dụng NV Sales
  // Footer "Dịch Vụ" column: the five service cards of Dịch Vụ Khác carry these exact titles
  "san-xuat-gia-cong-duoc-my-pham": "dich-vu-khac",
  "dich-vu-dong-goi-sang-chiet-my-pham": "dich-vu-khac",
  "dang-ki-thuong-hieu-cong-bo": "dich-vu-khac",
  "chai-lo-my-pham": "dich-vu-khac",
  "thiet-ke-bao-bi-my-pham": "dich-vu-khac",
  // Footer "Gia Công Mỹ Phẩm" column + About cards: the six categories of "Danh Mục Gia Công Mỹ Phẩm"
  "gia-cong-my-pham-trang-diem": "contract-manufacturing-cosmetics",
  "gia-cong-my-pham-toc": "contract-manufacturing-cosmetics",
  "gia-cong-my-pham-cham-soc-body": "contract-manufacturing-cosmetics",
  "gia-cong-my-cham-soc-da-mat": "contract-manufacturing-cosmetics",
  "gia-cong-my-pham-ca-nhan": "contract-manufacturing-cosmetics",
  "gia-cong-san-pham-me-be": "contract-manufacturing-cosmetics"
};

const esc = s => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function stub(lang, target){
  const vi = lang === "vi";
  const href = (vi ? "/" : "/en/") + target + "/";
  return `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, follow"><meta name="bioa-legacy-redirect" content="${esc(href)}">
<title>${vi ? "Đang chuyển hướng" : "Redirecting"} | Bio-A Group</title>
<link rel="canonical" href="${SITE}${esc(href)}"><meta http-equiv="refresh" content="0; url=${esc(href)}">
<script>location.replace(${JSON.stringify(href)}+location.hash)</script>
</head><body><p><a href="${esc(href)}">${vi ? "Tiếp tục tới trang Bio-A Group" : "Continue to the Bio-A Group page"}</a></p></body></html>
`;
}

// Returns [{ out: "lien-he/index.html", body }] for VI and EN; never overwrites a real built route.
export function legacyRedirectFiles(builtRoutes){
  const real = new Set(builtRoutes);
  const files = [];
  for (const [slug, target] of Object.entries(MAP)) for (const lang of ["vi", "en"]){
    const route = (lang === "vi" ? "/" : "/en/") + slug + "/";
    if (real.has(route)) continue;
    files.push({ route, out: route.slice(1) + "index.html", body: stub(lang, target), target: (lang === "vi" ? "/" : "/en/") + target + "/" });
  }
  return files;
}
