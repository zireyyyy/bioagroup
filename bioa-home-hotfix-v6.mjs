const CONTACT={
  zalo:"https://zalo.me/84779399379",
  phone:"0779 399 379"
};

const zaloIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.49 10.2722v-.4496h1.3467v6.3218h-.7704a.576.576 0 01-.5763-.5729l-.0006.0005a3.273 3.273 0 01-1.9372.6321c-1.8138 0-3.2844-1.4697-3.2844-3.2823 0-1.8125 1.4706-3.2822 3.2844-3.2822a3.273 3.273 0 011.9372.6321l.0006.0005zM6.9188 7.7896v.205c0 .3823-.051.6944-.2995 1.0605l-.03.0343c-.0542.0615-.1815.206-.2421.2843L2.024 14.8h4.8948v.7682a.5764.5764 0 01-.5767.5761H0v-.3622c0-.4436.1102-.6414.2495-.8476L4.8582 9.23H.1922V7.7896h6.7266zm8.5513 8.3548a.4805.4805 0 01-.4803-.4798v-7.875h1.4416v8.3548H15.47zM20.6934 9.6C22.52 9.6 24 11.0807 24 12.9044c0 1.8252-1.4801 3.306-3.3066 3.306-1.8264 0-3.3066-1.4808-3.3066-3.306 0-1.8237 1.4802-3.3044 3.3066-3.3044zm-10.1412 5.253c1.0675 0 1.9324-.8645 1.9324-1.9312 0-1.065-.865-1.9295-1.9324-1.9295s-1.9324.8644-1.9324 1.9295c0 1.0667.865 1.9312 1.9324 1.9312zm10.1412-.0033c1.0737 0 1.945-.8707 1.945-1.9453 0-1.073-.8713-1.9436-1.945-1.9436-1.0753 0-1.945.8706-1.945 1.9436 0 1.0746.8697 1.9453 1.945 1.9453z"/></svg>';

const css=`
/* compact transparent header like Merywood */
.header{background:rgba(252,254,241,.10)!important;backdrop-filter:blur(5px)!important;-webkit-backdrop-filter:blur(5px)!important;box-shadow:0 1px 0 rgba(5,47,33,.035)!important}
.header__inner{min-height:68px!important;height:68px!important;padding-top:0!important;padding-bottom:0!important}
.header__logo{flex:0 0 50px!important;width:50px!important;height:50px!important}
.header__logo img{width:42px!important;max-width:42px!important;height:47px!important;max-height:47px!important;object-fit:contain!important}
.header__socials .socials__link{width:42px!important;height:42px!important}
.bioa-lang a{min-width:38px!important;height:38px!important}
.header__btn{height:44px!important;min-width:132px!important}

/* keep original footer email geometry; only BIO-A contrast */
.footer-top__email{min-width:0!important;width:auto!important;display:block!important}
.footer-top__email a{width:auto!important;min-width:0!important;max-width:none!important;height:auto!important;min-height:0!important;padding:0!important;border-radius:0!important;background:transparent!important;border:0!important;box-shadow:none!important;color:#F3F0E4!important;font-weight:400!important;line-height:inherit!important;white-space:nowrap!important;text-decoration:none!important}
.footer-top__email a:hover{color:#fff!important}

/* wider stat cards so long numbers never collide */
.block-title .info.desctop{width:min(40vw,720px)!important;min-width:620px!important}
.block-title .info .item{width:100%!important;min-height:112px!important;padding:20px 32px!important;display:grid!important;grid-template-columns:minmax(250px,1.4fr) minmax(170px,.6fr)!important;column-gap:30px!important;align-items:center!important;box-sizing:border-box!important}
.block-title .info .item__number{font-size:clamp(36px,2.45vw,52px)!important;line-height:.98!important;white-space:nowrap!important;letter-spacing:-.035em!important}
.block-title .info .item:nth-child(3) .item__number{font-size:clamp(30px,2vw,42px)!important}
.block-title .info .item:nth-child(5) .item__number{font-size:clamp(31px,2.1vw,44px)!important}
.block-title .info .item__text{font-size:clamp(15px,.95vw,19px)!important;line-height:1.2!important;white-space:normal!important}

/* Merywood-style chat shell */
.bioa-chat-v6{position:fixed;right:18px;bottom:18px;z-index:100001;font-family:inherit}
.bioa-chat-v6__launcher{position:relative;width:58px;height:58px;border:0;border-radius:50%;background:#FCFEF1;box-shadow:0 10px 30px rgba(0,0,0,.20);padding:8px;cursor:pointer}
.bioa-chat-v6__launcher img{width:100%;height:100%;object-fit:contain}
.bioa-chat-v6__badge{position:absolute;top:-2px;right:-2px;width:22px;height:22px;border-radius:50%;background:#ff3b30;color:#fff;border:2px solid #fff;display:flex;align-items:center;justify-content:center;font:700 11px/1 Arial}
.bioa-chat-v6__panel{display:none;position:absolute;right:0;bottom:70px;width:338px;height:560px;border-radius:24px;background:#fff;box-shadow:0 18px 58px rgba(0,0,0,.22);overflow:hidden;border:1px solid rgba(0,0,0,.05)}
.bioa-chat-v6.is-open .bioa-chat-v6__panel{display:flex;flex-direction:column}
.bioa-chat-v6__home,.bioa-chat-v6__conversation{height:100%;display:flex;flex-direction:column}
.bioa-chat-v6__conversation{display:none}.bioa-chat-v6.is-conversation .bioa-chat-v6__home{display:none}.bioa-chat-v6.is-conversation .bioa-chat-v6__conversation{display:flex}
.bioa-chat-v6__head{position:relative;background:#ECECEC;padding:18px 18px 16px;text-align:center}
.bioa-chat-v6__avatars{display:flex;justify-content:center;margin-bottom:9px}.bioa-chat-v6__avatar{width:44px;height:44px;margin-left:-7px;border-radius:50%;background:#fff;border:2px solid #fff;box-shadow:0 1px 5px rgba(0,0,0,.08);display:flex;align-items:center;justify-content:center;color:#073D29;font-size:9px;font-weight:700}.bioa-chat-v6__avatar:first-child{margin-left:0}.bioa-chat-v6__avatar img{width:78%;height:78%;object-fit:contain}
.bioa-chat-v6__title{font-size:19px;font-weight:650;color:#303030}.bioa-chat-v6__status{margin-top:3px;font-size:13px;color:#6f706f}
.bioa-chat-v6__collapse,.bioa-chat-v6__back{position:absolute;top:16px;width:38px;height:38px;border:0;border-radius:50%;background:rgba(255,255,255,.55);color:#303030;font-size:20px;cursor:pointer}.bioa-chat-v6__collapse{right:14px}.bioa-chat-v6__back{left:14px}
.bioa-chat-v6__actions{display:grid;grid-template-columns:1fr 1fr;padding:15px 26px 14px;background:#fff;border-bottom:1px solid #dedede}
.bioa-chat-v6__action{border:0;background:transparent;text-decoration:none;color:#303030;display:flex;flex-direction:column;align-items:center;gap:7px;font-size:13px;font-weight:600;cursor:pointer}
.bioa-chat-v6__action-icon{width:50px;height:50px;border-radius:50%;background:#EFEFEF;display:flex;align-items:center;justify-content:center;color:#2F332F}.bioa-chat-v6__action-icon svg{width:25px;height:25px;fill:currentColor}
.bioa-chat-v6__history-title{padding:9px 16px 7px;text-align:right;color:#8d8d8d;font-size:13px;font-weight:600}.bioa-chat-v6__history{padding:0 12px;flex:1}
.bioa-chat-v6__history-card{width:100%;display:flex;align-items:center;gap:10px;padding:11px 12px;border:0;border-radius:15px;background:#F1F1F1;text-align:left;cursor:pointer}
.bioa-chat-v6__history-avatar{width:39px;height:39px;border-radius:50%;background:#fff;padding:7px;flex:0 0 auto}.bioa-chat-v6__history-avatar img{width:100%;height:100%;object-fit:contain}
.bioa-chat-v6__history-copy{min-width:0;flex:1}.bioa-chat-v6__history-name{display:block;font-size:13px;font-weight:650;color:#333}.bioa-chat-v6__history-preview{display:block;font-size:12px;color:#696969;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bioa-chat-v6__history-badge{width:21px;height:21px;border-radius:50%;background:#ff3b30;color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700}
.bioa-chat-v6__powered{text-align:center;padding:10px;color:#707070;font-size:11px}.bioa-chat-v6__powered b{color:#073D29}
.bioa-chat-v6__conversation .bioa-chat-v6__head{padding:22px 54px 15px}.bioa-chat-v6__messages{flex:1;overflow:auto;padding:16px;background:#fff}
.bioa-chat-v6__msg{display:flex;gap:8px;margin-bottom:11px;align-items:flex-end}.bioa-chat-v6__msg.user{justify-content:flex-end}.bioa-chat-v6__msg-avatar{width:27px;height:27px;border-radius:50%;background:#E7F0E8;padding:5px;flex:0 0 auto}.bioa-chat-v6__msg-avatar img{width:100%;height:100%;object-fit:contain}
.bioa-chat-v6__bubble{max-width:78%;padding:9px 11px;border-radius:15px;background:#F0F0F0;color:#343434;font-size:13px;line-height:1.4}.bioa-chat-v6__msg.user .bioa-chat-v6__bubble{background:#116F47;color:#fff}
.bioa-chat-v6__input{display:flex;gap:7px;padding:10px;border-top:1px solid #e1e1e1}.bioa-chat-v6__input input{flex:1;height:40px;border:1px solid #d8ddd9;border-radius:999px;padding:0 14px;font:inherit;outline:none}.bioa-chat-v6__input button{width:40px;height:40px;border:0;border-radius:50%;background:#116F47;color:#fff;font-size:17px;cursor:pointer}

@media(max-width:1450px){.block-title .info.desctop{width:38vw!important;min-width:520px!important}.block-title .info .item{grid-template-columns:minmax(210px,1.35fr) minmax(145px,.65fr)!important;padding:18px 24px!important}.block-title .info .item:nth-child(3) .item__number{font-size:34px!important}}
@media(max-width:1100px){.header__inner{min-height:64px!important;height:64px!important}.header__logo{width:46px!important;height:46px!important;flex-basis:46px!important}.header__logo img{width:39px!important;height:43px!important}.block-title .info.desctop{min-width:470px!important}}
@media(max-width:768px){.bioa-chat-v6{right:10px;bottom:10px}.bioa-chat-v6__panel{position:fixed;left:10px;right:10px;bottom:76px;width:auto;height:min(560px,calc(100vh - 96px))}.bioa-chat-v6__launcher{width:54px;height:54px}.block-title-continue .info .item{grid-template-columns:minmax(0,1.25fr) minmax(115px,.75fr)!important}}
`;

function forceZaloCtas($,lang){
  const vi=lang==="vi";
  $(".whatsapp__btn").attr("href",CONTACT.zalo).attr("target","_blank").attr("rel","noopener noreferrer").attr("aria-label","Zalo BIO-A Group");
  $(".whatsapp__btn .btn__text").text(vi?"Chat Zalo":"Chat on Zalo");
  $(".whatsapp__btn .icon").html(zaloIcon);
  $(".whatsapp__description").text(vi?"Nhắn Zalo 0779 399 379 để được tư vấn về công thức, số lượng và tiến độ sản xuất.":"Message us on Zalo at +84 779 399 379 for formulation, MOQ and lead-time advice.");
}

function setStats($,lang){
  if(lang!=="vi")return;
  const stats=[["2.000+","Mẫu R&D"],["5+","Năm kinh nghiệm"],["10.000.000","Sản phẩm / năm"],["1.000 m²","Quy mô nhà máy"],["OEM/ODM","Gia công trọn gói"]];
  $(".block-title .info .item,.block-title-continue .info .item").each((i,e)=>{
    const x=stats[i%5];
    $(e).find(".item__number").text(x[0]);
    $(e).find(".item__text").text(x[1]);
  });
}

function chat($,lang){
  $(".bioa-chat,.bioa-chat-v5,.bioa-chat-v6,.bioa-contact-fab").remove();
  const vi=lang==="vi";
  const hello=vi?"Xin chào! BIO-A Group có thể hỗ trợ bạn về sản phẩm nào?":"Hi! What product can BIO-A Group help you with?";
  const cfg={
    lang,
    price:vi?"Chi phí phụ thuộc công thức, bao bì và số lượng. Bạn cho tôi biết loại sản phẩm và số lượng dự kiến nhé.":"Pricing depends on formula, packaging and quantity. Please tell me the product and expected quantity.",
    moq:vi?"MOQ tùy từng dòng sản phẩm. BIO-A sẽ tư vấn mức phù hợp sau khi xác định công thức và bao bì.":"MOQ varies by product. BIO-A can advise after confirming formula and packaging.",
    fallback:vi?"Tôi đã ghi nhận. Bạn có thể mô tả thêm yêu cầu hoặc nhắn Zalo 0779 399 379 để được tư vấn nhanh.":"Got it. Please share more details or contact us on Zalo at +84 779 399 379."
  };
  $("body").append(`<div class="bioa-chat-v6" id="bioa-chat-v6" data-endpoint="">
    <div class="bioa-chat-v6__panel">
      <div class="bioa-chat-v6__home">
        <div class="bioa-chat-v6__head">
          <button class="bioa-chat-v6__collapse" type="button">⌄</button>
          <div class="bioa-chat-v6__avatars">
            <span class="bioa-chat-v6__avatar"><img src="/assets/bioa-monogram.svg" alt=""></span>
            <span class="bioa-chat-v6__avatar">CSKH</span>
            <span class="bioa-chat-v6__avatar">R&D</span>
          </div>
          <div class="bioa-chat-v6__title">BIO-A Group</div>
          <div class="bioa-chat-v6__status">${vi?"Chúng tôi sẵn sàng hỗ trợ bạn":"We're here and ready to help"}</div>
        </div>
        <div class="bioa-chat-v6__actions">
          <button class="bioa-chat-v6__action" type="button" data-open-chat><span class="bioa-chat-v6__action-icon">✎</span><span>${vi?"Nhắn tin":"Message"}</span></button>
          <a class="bioa-chat-v6__action" href="${CONTACT.zalo}" target="_blank" rel="noopener noreferrer"><span class="bioa-chat-v6__action-icon">${zaloIcon}</span><span>Zalo</span></a>
        </div>
        <div class="bioa-chat-v6__history-title">${vi?"Lịch sử":"History"}</div>
        <div class="bioa-chat-v6__history"><button class="bioa-chat-v6__history-card" type="button" data-open-chat>
          <span class="bioa-chat-v6__history-avatar"><img src="/assets/bioa-monogram.svg" alt=""></span>
          <span class="bioa-chat-v6__history-copy"><span class="bioa-chat-v6__history-name">BIO-A Tư vấn</span><span class="bioa-chat-v6__history-preview">${hello}</span></span>
          <span class="bioa-chat-v6__history-badge">1</span>
        </button></div>
        <div class="bioa-chat-v6__powered">${vi?"Hỗ trợ bởi":"Powered by"} <b>BIO-A Group</b></div>
      </div>
      <div class="bioa-chat-v6__conversation">
        <div class="bioa-chat-v6__head">
          <button class="bioa-chat-v6__back" type="button">←</button>
          <button class="bioa-chat-v6__collapse" type="button">⌄</button>
          <div class="bioa-chat-v6__title">BIO-A Tư vấn</div>
          <div class="bioa-chat-v6__status">${vi?"Đang trực tuyến":"online"}</div>
        </div>
        <div class="bioa-chat-v6__messages"><div class="bioa-chat-v6__msg"><span class="bioa-chat-v6__msg-avatar"><img src="/assets/bioa-monogram.svg" alt=""></span><div class="bioa-chat-v6__bubble">${hello}</div></div></div>
        <form class="bioa-chat-v6__input"><input type="text" autocomplete="off" placeholder="${vi?"Nhập tin nhắn...":"Type a message..."}"><button type="submit">➜</button></form>
      </div>
    </div>
    <button class="bioa-chat-v6__launcher" type="button"><img src="/assets/bioa-monogram.svg" alt=""><span class="bioa-chat-v6__badge">1</span></button>
  </div>`);
  $("body").append('<script id="bioa-chat-v6-js">(function(){var C='+JSON.stringify(cfg)+',r=document.getElementById("bioa-chat-v6");if(!r)return;var launch=r.querySelector(".bioa-chat-v6__launcher"),badge=r.querySelector(".bioa-chat-v6__badge"),form=r.querySelector("form"),input=r.querySelector("input"),messages=r.querySelector(".bioa-chat-v6__messages");function openChat(){r.classList.add("is-open","is-conversation");badge.style.display="none";setTimeout(function(){input.focus()},50)}function close(){r.classList.remove("is-open","is-conversation")}r.querySelectorAll("[data-open-chat]").forEach(function(x){x.onclick=openChat});r.querySelectorAll(".bioa-chat-v6__collapse").forEach(function(x){x.onclick=close});r.querySelector(".bioa-chat-v6__back").onclick=function(){r.classList.remove("is-conversation")};launch.onclick=function(){r.classList.toggle("is-open");r.classList.remove("is-conversation");badge.style.display="none"};function add(t,u){var d=document.createElement("div");d.className="bioa-chat-v6__msg"+(u?" user":"");d.innerHTML=(u?"":"<span class=\\\"bioa-chat-v6__msg-avatar\\\"><img src=\\\"/assets/bioa-monogram.svg\\\" alt=\\\"\\\"></span>")+"<div class=\\\"bioa-chat-v6__bubble\\\"></div>";d.querySelector(".bioa-chat-v6__bubble").textContent=t;messages.appendChild(d);messages.scrollTop=messages.scrollHeight}function fallback(t){var q=t.toLowerCase();if(/giá|price|cost/.test(q))return C.price;if(/moq|số lượng|quantity/.test(q))return C.moq;return C.fallback}async function reply(t){var ep=r.dataset.endpoint||window.BIOA_CHAT_ENDPOINT;if(ep){try{var x=await fetch(ep,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:t,lang:C.lang})});var j=await x.json();if(j&&j.reply)return j.reply}catch(e){}}return fallback(t)}form.onsubmit=async function(e){e.preventDefault();var t=input.value.trim();if(!t)return;add(t,true);input.value="";add(await reply(t),false)};document.addEventListener("click",function(e){if(!r.contains(e.target))r.classList.remove("is-open","is-conversation")})})();</script>');
}

export function applyHomeHotfixV6($,route,lang){
  $("head").append('<style id="bioa-home-hotfix-v6">'+css+'</style>');
  forceZaloCtas($,lang);
  setStats($,lang);
  chat($,lang);
}