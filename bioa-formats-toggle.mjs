// D11/i18n — «+N more» toggles in the product-formats block (Home, Cosmetics).
// The toggle only expands the list (inline source script calls preventDefault); its
// fallback href pointed to Merywood's /white-label-supplements/ (404 on BIO-A).
// VI pages showed the English labels "+N more" / "Show fewer".
export function applyFormatsToggle($, lang){
  const toggles = $("[data-formats-toggle]");
  if (!toggles.length) return;
  toggles.each((_, el) => {
    const a = $(el);
    a.attr("href", "#");
    if (lang === "vi") a.text(a.text().trim().replace(/^\+(\d+)\s+more$/i, "+$1 mục khác"));
  });
  if (lang !== "vi") return;
  $("script:not([src])").each((_, el) => {
    const body = $(el).html() || "";
    if (body.includes("data-formats-toggle") && body.includes("'Show fewer'"))
      $(el).html(body.replace("'Show fewer'", "'Thu gọn'"));
  });
}
