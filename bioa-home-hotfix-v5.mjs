
const CONTACT={
  zalo:"https://zalo.me/84779399379",
  telegram:"https://t.me/bioagroup",
  phone:"0779 399 379"
};

const zaloIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.49 10.2722v-.4496h1.3467v6.3218h-.7704a.576.576 0 01-.5763-.5729l-.0006.0005a3.273 3.273 0 01-1.9372.6321c-1.8138 0-3.2844-1.4697-3.2844-3.2823 0-1.8125 1.4706-3.2822 3.2844-3.2822a3.273 3.273 0 011.9372.6321l.0006.0005zM6.9188 7.7896v.205c0 .3823-.051.6944-.2995 1.0605l-.03.0343c-.0542.0615-.1815.206-.2421.2843L2.024 14.8h4.8948v.7682a.5764.5764 0 01-.5767.5761H0v-.3622c0-.4436.1102-.6414.2495-.8476L4.8582 9.23H.1922V7.7896h6.7266zm8.5513 8.3548a.4805.4805 0 01-.4803-.4798v-7.875h1.4416v8.3548H15.47zM20.6934 9.6C22.52 9.6 24 11.0807 24 12.9044c0 1.8252-1.4801 3.306-3.3066 3.306-1.8264 0-3.3066-1.4808-3.3066-3.306 0-1.8237 1.4802-3.3044 3.3066-3.3044zm-10.1412 5.253c1.0675 0 1.9324-.8645 1.9324-1.9312 0-1.065-.865-1.9295-1.9324-1.9295s-1.9324.8644-1.9324 1.9295c0 1.0667.865 1.9312 1.9324 1.9312zm10.1412-.0033c1.0737 0 1.945-.8707 1.945-1.9453 0-1.073-.8713-1.9436-1.945-1.9436-1.0753 0-1.945.8706-1.945 1.9436 0 1.0746.8697 1.9453 1.945 1.9453z"/></svg>';

const css=`
/* HEADER V5 */
.header{background:rgba(252,254,241,.20)!important;backdrop-filter:blur(8px)!important;-webkit-backdrop-filter:blur(8px)!important;box-shadow:0 1px 0 rgba(5,47,33,.045)!important}
.header__logo{flex:0 0 54px!important;width:54px!important;height:54px!important}
.header__logo img{width:45px!important;max-width:45px!important;height:50px!important;max-height:50px!important}
.header__nav ul{gap:28px!important}.header__nav a{font-size:16.5px!important;line-height:1.2!important}
.header__contacts{gap:13px!important;align-items:center!important}
.header__email a{font-size:15px!important;white-space:nowrap!important}
.header__socials .socials__link{width:46px!important;height:46px!important}
.bioa-lang{gap:5px!important;margin-left:2px!important}.bioa-lang a{min-width:40px!important;height:40px!important;font-size:13px!important}
.header__btn{min-width:146px!important;height:48px!important}.header__btn .btn__text{font-size:15px!important}

/* FOOTER V5 */
.footer-top__logo{margin-left:26px!important;align-self:flex-start!important}
.footer-top__logo img,.footer__logo img{width:90px!important;max-width:90px!important;height:108px!important;max-height:108px!important}
.footer-top__nav li:first-child>a{font-size:18px!important;line-height:1.2!important;font-weight:600!important;color:var(--bioa-cream)!important}
.footer-top__nav li:not(:first-child)>a{font-size:15.5px!important;line-height:1.45!important;font-weight:400!important}
.footer-top__email{display:block!important;min-width:0!important;width:auto!important}
.footer-top__email a{display:inline-flex!important;width:auto!important;min-width:0!important;height:auto!important;min-height:0!important;padding:14px 22px!important;border-radius:16px!important;white-space:nowrap!important;overflow:visible!important;font-size:16px!important;font-weight:400!important;line-height:1!important;color:var(--bioa-cream)!important;background:rgba(255,255,255,.34)!important;border:0!important;box-shadow:none!important}
.footer-top__right{min-width:255px!important}
.footer-top__socials{margin-top:12px!important;gap:9px!important}
.footer-top__socials .socials__link{width:44px!important;height:44px!important}

/* HOMEPAGE STATS V5 */
.block-title .info.desctop{width:min(34vw,610px)!important;min-width:500px!important}
.block-title .info .list{width:100%!important;gap:15px!important}
.block-title .info .item{width:100%!important;min-height:108px!important;padding:20px 28px!important;display:grid!important;grid-template-columns:minmax(230px,1.35fr) minmax(145px,.65fr)!important;column-gap:26px!important;align-items:center!important;box-sizing:border-box!important;overflow:visible!important}
.block-title .info .item__number{font-size:clamp(36px,2.55vw,54px)!important;line-height:.98!important;letter-spacing:-.035em!important;white-space:nowrap!important;overflow:visible!important}
.block-title .info .item:nth-child(3) .item__number{font-size:clamp(31px,2.05vw,44px)!important;letter-spacing:-.045em!important}
.block-title .info .item:nth-child(5) .item__number{font-size:clamp(34px,2.25vw,48px)!important}
.block-title .info .item__text{font-size:clamp(15px,1vw,19px)!important;line-height:1.2!important;white-space:normal!important}
.block-title-continue .info .item{min-height:100px!important;padding:18px 20px!important;display:grid!important;grid-template-columns:minmax(0,1.15fr) minmax(112px,.85fr)!important;column-gap:16px!important;align-items:center!important}
.block-title-continue .info .item__number{font-size:38px!important;line-height:.98!important;white-space:nowrap!important;letter-spacing:-.035em!important}
.block-title-continue .info .item:nth-child(3) .item__number{font-size:30px!important}
.block-title-continue .info .item:nth-child(5) .item__number{font-size:34px!important}

/* MERYWOOD-LIKE BIO-A CHAT V5 */
.bioa-chat-v5{position:fixed;right:20px;bottom:20px;z-index:100000;font-family:inherit}
.bioa-chat-v5__launcher{position:relative;width:62px;height:62px;border:0;border-radius:50%;background:#FCFEF1;box-shadow:0 10px 34px rgba(5,47,33,.25);padding:8px;cursor:pointer}
.bioa-chat-v5__launcher img{width:100%;height:100%;object-fit:contain}.bioa-chat-v5__badge{position:absolute;top:-1px;right:-2px;min-width:22px;height:22px;border-radius:50%;background:#ff3b30;color:#fff;border:2px solid #FCFEF1;font:700 11px/18px Arial;display:flex;align-items:center;justify-content:center}
.bioa-chat-v5__panel{display:none;position:absolute;right:0;bottom:76px;width:365px;height:610px;border-radius:26px;background:#fff;box-shadow:0 18px 65px rgba(5,47,33,.25);overflow:hidden;border:1px solid rgba(5,47,33,.08)}
.bioa-chat-v5.is-open .bioa-chat-v5__panel{display:flex;flex-direction:column}
.bioa-chat-v5__home,.bioa-chat-v5__conversation{height:100%;display:flex;flex-direction:column}
.bioa-chat-v5__conversation{display:none}.bioa-chat-v5.is-conversation .bioa-chat-v5__home{display:none}.bioa-chat-v5.is-conversation .bioa-chat-v5__conversation{display:flex}
.bioa-chat-v5__head{position:relative;background:#ECEDEC;padding:22px 20px 18px;text-align:center}
.bioa-chat-v5__avatars{display:flex;justify-content:center;margin-bottom:10px}.bioa-chat-v5__avatar{width:48px;height:48px;margin-left:-7px;border-radius:50%;background:#fff;border:2px solid #fff;box-shadow:0 1px 5px rgba(0,0,0,.08);display:flex;align-items:center;justify-content:center;color:#073D29;font-size:10px;font-weight:700}.bioa-chat-v5__avatar:first-child{margin-left:0}.bioa-chat-v5__avatar img{width:78%;height:78%;object-fit:contain}
.bioa-chat-v5__title{font-size:20px;font-weight:650;color:#292929}.bioa-chat-v5__status{margin-top:4px;font-size:13px;color:#6b6e6b}
.bioa-chat-v5__collapse,.bioa-chat-v5__back{position:absolute;top:20px;width:42px;height:42px;border:0;border-radius:50%;background:rgba(255,255,255,.48);color:#303330;font-size:22px;cursor:pointer}.bioa-chat-v5__collapse{right:18px}.bioa-chat-v5__back{left:18px}
.bioa-chat-v5__actions{display:grid;grid-template-columns:1fr 1fr;gap:0;padding:18px 30px;background:#fff;border-bottom:1px solid #e3e5e3}
.bioa-chat-v5__action{border:0;background:transparent;text-decoration:none;color:#303330;display:flex;flex-direction:column;align-items:center;gap:8px;font-size:14px;font-weight:600;cursor:pointer}.bioa-chat-v5__action-icon{width:54px;height:54px;border-radius:50%;background:#EFF0EF;display:flex;align-items:center;justify-content:center;color:#2D332E}.bioa-chat-v5__action-icon svg{width:27px;height:27px;fill:currentColor}
.bioa-chat-v5__history-title{padding:10px 20px 8px;text-align:right;color:#8a8d8a;font-weight:600;font-size:14px}.bioa-chat-v5__history{padding:0 14px 14px;flex:1}.bioa-chat-v5__history-card{display:flex;align-items:center;gap:11px;padding:13px;border-radius:16px;background:#F1F2F1}.bioa-chat-v5__history-avatar{width:42px;height:42px;border-radius:50%;background:#fff;padding:7px;flex:0 0 auto}.bioa-chat-v5__history-avatar img{width:100%;height:100%;object-fit:contain}.bioa-chat-v5__history-copy{min-width:0;flex:1}.bioa-chat-v5__history-name{font-size:14px;font-weight:650;color:#333}.bioa-chat-v5__history-preview{font-size:13px;color:#686c68;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.bioa-chat-v5__history-badge{width:22px;height:22px;border-radius:50%;background:#ff3b30;color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700}
.bioa-chat-v5__powered{text-align:center;padding:12px;color:#6e726f;font-size:12px}.bioa-chat-v5__powered b{color:#073D29}
.bioa-chat-v5__conversation .bioa-chat-v5__head{padding:27px 60px 19px}.bioa-chat-v5__messages{flex:1;overflow:auto;padding:18px;background:#fff}.bioa-chat-v5__msg{display:flex;gap:8px;margin-bottom:12px;align-items:flex-end}.bioa-chat-v5__msg.user{justify-content:flex-end}.bioa-chat-v5__msg-avatar{width:28px;height:28px;border-radius:50%;background:#E7F0E8;padding:5px;flex:0 0 auto}.bioa-chat-v5__msg-avatar img{width:100%;height:100%;object-fit:contain}.bioa-chat-v5__bubble{max-width:78%;padding:10px 12px;border-radius:15px;background:#F0F1F0;color:#343834;font-size:13px;line-height:1.42}.bioa-chat-v5__msg.user .bioa-chat-v5__bubble{background:#116F47;color:#fff}
.bioa-chat-v5__input{display:flex;gap:8px;padding:12px;border-top:1px solid #e5e8e5}.bioa-chat-v5__input input{flex:1;height:42px;border:1px solid #D8DED8;border-radius:999px;padding:0 15px;font:inherit;outline:none}.bioa-chat-v5__input button{width:42px;height:42px;border:0;border-radius:50%;background:#116F47;color:#fff;font-size:18px;cursor:pointer}
@media(max-width:1450px){.block-title .info.desctop{width:34vw!important;min-width:430px!important}.block-title .info .item{grid-template-columns:minmax(190px,1.3fr) minmax(125px,.7fr)!important;padding:18px 22px!important}.block-title .info .item:nth-child(3) .item__number{font-size:34px!important}}
@media(max-width:1100px){.header__nav ul{gap:18px!important}.header__nav a{font-size:14px!important}.header__email{display:none!important}.header__contacts{gap:9px!important}.footer-top__logo{margin-left:0!important}}
@media(max-width:768px){.bioa-chat-v5{right:12px;bottom:12px}.bioa-chat-v5__panel{position:fixed;left:12px;right:12px;bottom:82px;width:auto;height:min(610px,calc(100vh - 105px))}.bioa-chat-v5__launcher{width:56px;height:56px}}
`;

function setStats($,lang){
  if(lang!=="vi")return;
  const stats=[["2.000+","Mẫu R&D"],["5+","Năm kinh nghiệm"],["10.000.000","Sản phẩm / năm"],["1.000 m²","Quy mô nhà máy"],["OEM/ODM","Gia công trọn gói"]];
  $(".block-title .info .item,.block-title-continue .info .item").each((i,e)=>{
    const x=stats[i%5]; if(!x)return;
    $(e).find(".item__number").text(x[0]);
    $(e).find(".item__text").text(x[1]);
  });
}

function viButtons($,lang){
  if(lang!=="vi")return;
  const map=new Map([
    ["Get started","Nhận tư vấn"],["Get a quote","Nhận tư vấn"],["Contact Us","Liên hệ tư vấn"],
    ["Get in touch","Liên hệ tư vấn"],["Tell us your idea","Chia sẻ ý tưởng"],["Chat on WhatsApp","Chat Zalo"],
    ["Let's discuss your idea","Trao đổi ý tưởng"],["Read more","Xem thêm"],["Show more","Xem thêm"],["Learn more","Tìm hiểu thêm"]
  ]);
  $(".btn__text,button,a").each((_,el)=>{
    const x=$(el),t=x.text().replace(/\s+/g," ").trim();
    if(map.has(t)) x.text(map.get(t));
  });
}

function chat($,lang){
  $(".bioa-chat,.bioa-chat-v5,.bioa-contact-fab").remove();
  const vi=lang==="vi";
  const hello=vi?"Xin chào! Tôi là trợ lý BIO-A. Bạn đang quan tâm gia công sản phẩm nào?":"Hi! I'm BIO-A's assistant. What product would you like to manufacture?";
  const cfg={
    lang,
    price:vi?"Chi phí phụ thuộc công thức, bao bì và số lượng. Bạn cho tôi biết loại sản phẩm và số lượng dự kiến nhé.":"Pricing depends on formula, packaging and quantity. Please tell me the product and expected quantity.",
    moq:vi?"MOQ tùy từng dòng sản phẩm. BIO-A sẽ tư vấn mức phù hợp sau khi xác định công thức và bao bì.":"MOQ varies by product. BIO-A can advise after confirming formula and packaging.",
    product:vi?"BIO-A có thể R&D công thức và gia công theo yêu cầu. Bạn muốn dùng công thức có sẵn hay phát triển công thức riêng?":"BIO-A can develop and manufacture custom formulas. Would you prefer a ready formula or a custom formulation?",
    fallback:vi?"Tôi đã ghi nhận. Bạn mô tả thêm công dụng mong muốn và số lượng dự kiến nhé. Nếu cần trao đổi nhanh, bạn có thể nhắn Zalo 0779 399 379.":"Got it. Please share the desired benefits and expected quantity. You can also contact us on Zalo at +84 779 399 379."
  };
  $("body").append(`<div class="bioa-chat-v5" id="bioa-chat-v5" data-endpoint="">
    <div class="bioa-chat-v5__panel">
      <div class="bioa-chat-v5__home">
        <div class="bioa-chat-v5__head">
          <button class="bioa-chat-v5__collapse" type="button" aria-label="${vi?"Đóng":"Close"}">⌄</button>
          <div class="bioa-chat-v5__avatars">
            <span class="bioa-chat-v5__avatar"><img src="/assets/bioa-monogram.svg" alt=""></span>
            <span class="bioa-chat-v5__avatar">CSKH</span>
            <span class="bioa-chat-v5__avatar">R&D</span>
          </div>
          <div class="bioa-chat-v5__title">BIO-A Group</div>
          <div class="bioa-chat-v5__status">${vi?"Chúng tôi sẵn sàng hỗ trợ bạn":"We're here and ready to help"}</div>
        </div>
        <div class="bioa-chat-v5__actions">
          <button class="bioa-chat-v5__action" type="button" data-open-chat><span class="bioa-chat-v5__action-icon">✎</span><span>${vi?"Nhắn tin":"Message"}</span></button>
          <a class="bioa-chat-v5__action" href="${CONTACT.zalo}" target="_blank" rel="noopener noreferrer"><span class="bioa-chat-v5__action-icon">${zaloIcon}</span><span>Zalo</span></a>
        </div>
        <div class="bioa-chat-v5__history-title">${vi?"Lịch sử":"History"}</div>
        <div class="bioa-chat-v5__history">
          <button class="bioa-chat-v5__history-card" type="button" data-open-chat>
            <span class="bioa-chat-v5__history-avatar"><img src="/assets/bioa-monogram.svg" alt=""></span>
            <span class="bioa-chat-v5__history-copy"><span class="bioa-chat-v5__history-name">BIO-A Tư vấn</span><span class="bioa-chat-v5__history-preview">${hello}</span></span>
            <span class="bioa-chat-v5__history-badge">1</span>
          </button>
        </div>
        <div class="bioa-chat-v5__powered">${vi?"Hỗ trợ bởi":"Powered by"} <b>BIO-A Group</b></div>
      </div>
      <div class="bioa-chat-v5__conversation">
        <div class="bioa-chat-v5__head">
          <button class="bioa-chat-v5__back" type="button" aria-label="${vi?"Quay lại":"Back"}">←</button>
          <button class="bioa-chat-v5__collapse" type="button" aria-label="${vi?"Đóng":"Close"}">⌄</button>
          <div class="bioa-chat-v5__title">BIO-A Tư vấn</div>
          <div class="bioa-chat-v5__status">${vi?"Đang trực tuyến":"online"}</div>
        </div>
        <div class="bioa-chat-v5__messages"><div class="bioa-chat-v5__msg"><span class="bioa-chat-v5__msg-avatar"><img src="/assets/bioa-monogram.svg" alt=""></span><div class="bioa-chat-v5__bubble">${hello}</div></div></div>
        <form class="bioa-chat-v5__input"><input type="text" autocomplete="off" placeholder="${vi?"Nhập tin nhắn...":"Type a message..."}"><button type="submit">➜</button></form>
      </div>
    </div>
    <button class="bioa-chat-v5__launcher" type="button" aria-label="${vi?"Mở tư vấn":"Open support"}"><img src="/assets/bioa-monogram.svg" alt=""><span class="bioa-chat-v5__badge">1</span></button>
  </div>`);
  $("body").append('<script id="bioa-chat-v5-js">(function(){var C='+JSON.stringify(cfg)+',r=document.getElementById("bioa-chat-v5");if(!r)return;var launch=r.querySelector(".bioa-chat-v5__launcher"),badge=r.querySelector(".bioa-chat-v5__badge"),form=r.querySelector("form"),input=r.querySelector("input"),messages=r.querySelector(".bioa-chat-v5__messages");function openChat(){r.classList.add("is-open","is-conversation");badge.style.display="none";setTimeout(function(){input.focus()},50)}function close(){r.classList.remove("is-open","is-conversation")}r.querySelectorAll("[data-open-chat]").forEach(function(x){x.onclick=openChat});r.querySelectorAll(".bioa-chat-v5__collapse").forEach(function(x){x.onclick=close});r.querySelector(".bioa-chat-v5__back").onclick=function(){r.classList.remove("is-conversation")};launch.onclick=function(){r.classList.toggle("is-open");r.classList.remove("is-conversation");badge.style.display="none"};function add(t,u){var d=document.createElement("div");d.className="bioa-chat-v5__msg"+(u?" user":"");d.innerHTML=(u?"":"<span class=\\\"bioa-chat-v5__msg-avatar\\\"><img src=\\\"/assets/bioa-monogram.svg\\\" alt=\\\"\\\"></span>")+"<div class=\\\"bioa-chat-v5__bubble\\\"></div>";d.querySelector(".bioa-chat-v5__bubble").textContent=t;messages.appendChild(d);messages.scrollTop=messages.scrollHeight}function fallback(t){var q=t.toLowerCase();if(/giá|price|cost/.test(q))return C.price;if(/moq|số lượng|quantity/.test(q))return C.moq;if(/serum|kem|cream|sữa rửa|cleanser|tóc|hair/.test(q))return C.product;return C.fallback}async function reply(t){var ep=r.dataset.endpoint||window.BIOA_CHAT_ENDPOINT;if(ep){try{var x=await fetch(ep,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:t,lang:C.lang})});var j=await x.json();if(j&&j.reply)return j.reply}catch(e){}}return fallback(t)}form.onsubmit=async function(e){e.preventDefault();var t=input.value.trim();if(!t)return;add(t,true);input.value="";add(await reply(t),false)};document.addEventListener("click",function(e){if(!r.contains(e.target))r.classList.remove("is-open","is-conversation")})})();</script>');
}

export function applyHomeHotfixV5($,route,lang){
  $("head").append('<style id="bioa-home-hotfix-v5">'+css+'</style>');
  setStats($,lang);
  viButtons($,lang);
  chat($,lang);
}
