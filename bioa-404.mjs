// ROUTE owner: Bio-A not-found page. Owner-provided 404 artwork and Merywood/Bio-A CTA DOM pattern.
// Cloudflare Pages serves the nearest 404.html for a missing URL; do not turn it into a 200 redirect.
const I18N={
  "vi": {
    "title": "Không tìm thấy trang",
    "description": "Đường dẫn có thể đã thay đổi hoặc trang không còn tồn tại. Vui lòng quay về trang chủ để tiếp tục khám phá Bio-A Group.",
    "button": "Về trang chủ",
    "home": "/",
    "pageTitle": "Không tìm thấy trang | Bio-A Group"
  },
  "en": {
    "title": "Page not found",
    "description": "The page may have moved or is no longer available. Return to the homepage to continue exploring Bio-A Group.",
    "button": "Back home",
    "home": "/en/",
    "pageTitle": "Page not found | Bio-A Group"
  }
};
const TEMPLATE="<!doctype html>\n<html lang=\"@@LANG@@\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n  <meta name=\"robots\" content=\"noindex,nofollow,noarchive\">\n  <meta name=\"theme-color\" content=\"#edf0f2\">\n  <title>@@PAGE_TITLE@@</title>\n  <link rel=\"icon\" type=\"image/svg+xml\" href=\"/assets/bioa-monogram.svg\">\n  <style>\n    :root{color-scheme:light;--bioa-green:#106E45;--bioa-deep:#093D26}\n    *{box-sizing:border-box}\n    html,body{margin:0;min-height:100%;width:100%}\n    body{font-family:Manrope,Arial,Helvetica,sans-serif;color:#111;background:#edf0f2}\n    .bioa-404{position:relative;isolation:isolate;display:flex;flex-direction:column;align-items:center;min-height:100vh;min-height:100svh;overflow:hidden;background:#edf0f2}\n    .bioa-404__art{position:absolute;inset:0;z-index:-2;overflow:hidden;pointer-events:none}\n    .bioa-404__art img{display:block;width:100%;height:100%;object-fit:cover;object-position:center center}\n    .bioa-404:before{content:\"\";position:absolute;inset:0 0 auto;height:48%;background:linear-gradient(180deg,rgba(246,247,249,.72) 0%,rgba(246,247,249,.38) 58%,transparent);z-index:-1;pointer-events:none}\n    .bioa-404__content{display:flex;flex-direction:column;align-items:center;text-align:center;max-width:740px;width:100%;padding:clamp(76px,11vh,126px) 24px 42px}\n    .bioa-404__title{font-weight:400;letter-spacing:-.047em;font-size:clamp(36px,4.2vw,60px);line-height:1.14;margin:0;color:#101413}\n    .bioa-404__description{font-weight:400;font-size:clamp(15px,1.25vw,19px);line-height:1.55;max-width:650px;margin:22px 0 21px;color:#222b27}\n    /* Reuse Merywood/Bio-A anchor-button DOM classes (btn / btn__icon / btn__text). */\n    .bioa-404__cta.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:50px;padding:0 23px;border:0;border-radius:14px;background:var(--bioa-green);color:#fff;text-decoration:none;font-size:15px;font-weight:650;line-height:1.2;transition:background .2s ease,transform .2s ease}\n    .bioa-404__cta.btn:hover,.bioa-404__cta.btn:focus-visible{background:var(--bioa-deep)}\n    .bioa-404__cta.btn:focus-visible{outline:2px solid #fff;outline-offset:3px}\n    .bioa-404__cta.btn .btn__icon{display:inline-flex;align-items:center;justify-content:center;flex:none;line-height:1;font-size:18px}\n    .bioa-404__cta.btn .btn__text{display:block;white-space:nowrap}\n    @media(max-width:767px){\n      .bioa-404__content{padding:clamp(62px,11vh,98px) 20px 40px}\n      .bioa-404__title{font-size:clamp(34px,9vw,46px)}\n      .bioa-404__description{font-size:15px;margin:16px 0 23px}\n      .bioa-404__art img{object-position:center center}\n      .bioa-404:before{height:52%;background:linear-gradient(180deg,rgba(246,247,249,.88) 0%,rgba(246,247,249,.57) 60%,transparent)}\n    }\n    @media(prefers-reduced-motion:reduce){.bioa-404__cta.btn{transition:none}}\n  </style>\n</head>\n<body>\n  <main class=\"bioa-404\">\n    <div class=\"bioa-404__art\" aria-hidden=\"true\">\n      <img src=\"/assets/bioa-404-art.avif\" width=\"1808\" height=\"870\" alt=\"\" fetchpriority=\"high\">\n    </div>\n    <section class=\"bioa-404__content\" aria-labelledby=\"bioa-404-title\">\n      <h1 class=\"bioa-404__title\" id=\"bioa-404-title\">@@TITLE@@</h1>\n      <p class=\"bioa-404__description\">@@DESCRIPTION@@</p>\n      <a class=\"btn bioa-404__cta\" href=\"@@HOME@@\" aria-label=\"@@BUTTON@@\">\n        <span class=\"btn__icon\" aria-hidden=\"true\">←</span>\n        <span class=\"btn__text\">@@BUTTON@@</span>\n      </a>\n    </section>\n  </main>\n</body>\n</html>";
export function renderNotFound(lang='vi'){
  const locale=lang==='en'?'en':'vi';
  const copy=I18N[locale];
  return TEMPLATE.replaceAll('@@LANG@@',locale)
    .replaceAll('@@TITLE@@',copy.title)
    .replaceAll('@@DESCRIPTION@@',copy.description)
    .replaceAll('@@BUTTON@@',copy.button)
    .replaceAll('@@HOME@@',copy.home)
    .replaceAll('@@PAGE_TITLE@@',copy.pageTitle);
}
