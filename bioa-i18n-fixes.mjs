// i18n — VI pages kept some Merywood English strings inside the packaging product cards
// (Home, Cosmetics): the source lists have more items than the BIO-A copy arrays, so the
// extra items were never translated. Exact-match text replacement only (no DOM/CSS change);
// EN pages are untouched.
const VI = {
  "Capsules": "Viên nang",
  "Tablets": "Viên nén",
  "Travel-size products": "Sản phẩm cỡ du lịch",
  "(supplements or cosmetics)": "(thực phẩm bổ sung hoặc mỹ phẩm)",
  "Bulk powders": "Bột đóng gói",
  "Sports nutrition blends": "Hỗn hợp dinh dưỡng thể thao",
  "Wellness drink mixes": "Hỗn hợp đồ uống chăm sóc sức khỏe",
  "Rich moisturizers": "Kem dưỡng ẩm đặc",
  "Tamper-evident, secure unit-dose format.": "Định dạng liều đơn kín, có dấu hiệu chống mở.",
  "Ensures accurate, controlled intake.": "Đảm bảo liều dùng chính xác, có kiểm soát.",
  "Maintains product safety and extends shelf life.": "Giữ an toàn sản phẩm và kéo dài hạn sử dụng.",
  "Lightweight, compact, and cost-efficient for shipping.": "Nhẹ, gọn và tiết kiệm chi phí vận chuyển.",
  "Easy to distribute and ship.": "Dễ phân phối và vận chuyển.",
  "Excellent for online retail and direct-to-consumer brands.": "Phù hợp bán lẻ trực tuyến và thương hiệu bán trực tiếp.",
  "Offers a hygienic and premium user experience.": "Mang lại trải nghiệm vệ sinh và cao cấp.",
  "Perfect for skincare lines and private label beauty brands.": "Phù hợp dòng chăm sóc da và thương hiệu mỹ phẩm gia công."
};

export function applyViLeftoverTranslations($, lang){
  if (lang !== "vi") return;
  $(".product").find("*").contents().each((_, n) => {
    if (n.type !== "text") return;
    const raw = n.data, t = raw.replace(/\s+/g, " ").trim();
    if (!VI[t]) return;
    n.data = raw.replace(raw.trim(), VI[t]);
  });
}
