// CMS-R25: renders docs/CMS_CONTENT_MAP.md (owner-facing list of every editable image/text slot) from cms/registry.json.
// usage: node tools/cms-content-map.mjs
import fs from "node:fs";

const REG = JSON.parse(fs.readFileSync("cms/registry.json", "utf8"));
const esc = s => String(s).replace(/\|/g, "\\|").replace(/\n/g, " / ");
const cut = (s, n) => { const t = esc(s); return t.length > n ? t.slice(0, n - 1) + "…" : t; };
const out = [];
out.push("# BIO-A — Danh sách vị trí ảnh & nội dung trong Sanity CMS (CMS-R25)", "");
out.push("Tạo tự động từ `cms/registry.json` (`node tools/cms-content-map.mjs`). Mỗi dòng là một vị trí có thật trên website đã được OWNER duyệt.", "");
out.push("**Cách tìm trong Studio (https://bioagroup.sanity.studio/):** menu **Ảnh website** → chọn trang → chọn vị trí theo tên (cột *Tên trong Studio*). Chữ: menu **Nội dung trang** → chọn trang → mở mục (cột *Mục*).", "");
const pages = Object.entries(REG.pages);
out.push("| Trang | Ảnh | Đoạn chữ | Đường dẫn VI · EN |", "|---|---|---|---|");
for (const [, p] of pages) out.push(`| ${p.labelVi} | ${p.images.length} | ${p.texts.length} | ${p.routes.vi} · ${p.routes.en} |`);
out.push("", `Tổng: **${pages.reduce((a, [, p]) => a + p.images.length, 0)} vị trí ảnh**, **${pages.reduce((a, [, p]) => a + p.texts.length, 0)} đoạn chữ** (mỗi đoạn có VI + EN).`, "");
out.push("Ảnh: website tự cắt ảnh mới theo **tỷ lệ khung** dưới đây (theo điểm lấy nét bạn chọn), nên bố cục Desktop/Tablet/Mobile không đổi. Logo BIO-A, biểu tượng Zalo và ảnh thẻ việc làm không nằm ở đây (logo được bảo vệ; ảnh việc làm nằm trong mục **Tuyển dụng**; ảnh Blog nằm trong từng bài).", "");
for (const [key, p] of pages){
  if (!p.images.length && !p.texts.length) continue;
  out.push(`## ${p.labelVi}`, "");
  if (p.images.length){
    out.push("### Ảnh", "", "| # | Tên trong Studio | Mục | Tỷ lệ khung (rộng:cao) | Hiển thị Desktop · Tablet · Mobile | Khuyến nghị tải lên |", "|---|---|---|---|---|---|");
    p.images.forEach((s, i) => {
      const file = decodeURIComponent(s.original.split("/").pop());
      const icon = /\.svg$/i.test(file) || (s.natural && s.natural.w <= 128);
      const f = s.frames || {};
      const show = ["1440", "834", "390"].map(w => f[w] ? `${f[w].w}×${f[w].h}` : "—").join(" · ");
      const rec = s.natural ? Math.min(2400, Math.max(s.natural.w, ...Object.values(f).map(x => x.w * 2))) : "";
      out.push(`| ${i + 1} | ${icon ? "Biểu tượng" : "Ảnh"} ${i + 1} — ${esc(s.sections[0])} (${esc(file)}) | ${cut(s.sections.join(" + "), 50)} | ${s.natural ? (s.natural.w / s.natural.h).toFixed(2) + " : 1" : "?"} | ${show} | ${icon ? "SVG hoặc PNG nền trong" : "≥ " + rec + " px ngang"} |`);
    });
    out.push("");
  }
  if (p.texts.length){
    out.push("### Nội dung chữ", "", "| Mục | Nội dung hiện tại (VI) | Tối đa VI / EN | Số lần xuất hiện |", "|---|---|---|---|");
    for (const t of p.texts) out.push(`| ${cut(t.sections[0], 40)} | ${cut(t.vi, 80)} | ${t.maxVi} / ${t.maxEn} | ${t.occurrences} |`);
    out.push("");
  }
}
out.push("## Ngoài danh sách trên", "",
  "- **Blog:** 38 bài hiện có (giữ nguyên đường dẫn) + bài mới; menu **Blog**.",
  "- **Tuyển dụng:** 3 vị trí mẫu + vị trí mới; trạng thái Nháp / Mẫu / Đang tuyển / Ngừng tuyển; menu **Tuyển dụng**.",
  "- **SEO:** 9 trang (Trang chủ, Về chúng tôi, Gia Công Mỹ Phẩm, Dịch Vụ Khác, Liên hệ, Tuyển dụng, Blog, Chính sách bảo mật, Chính sách cookie); SEO của bài Blog nằm trong từng bài.",
  "- **Pháp lý:** Chính sách bảo mật, Chính sách cookie — chỉ lên website khi xuất bản bằng nút **Duyệt & xuất bản**.",
  "- **Không chỉnh qua CMS (giữ trong code, đã OWNER PASS):** Header, menu, Footer, nút CTA, form báo giá, khung chat, banner cookie, logo, slider/hiệu ứng, CSS và bố cục.", "");
fs.writeFileSync("docs/CMS_CONTENT_MAP.md", out.join("\n"));
console.log("docs/CMS_CONTENT_MAP.md", out.length, "lines");
