/* Bio-A lead submission owner: no Merywood/CF7 external posting. */
(function(){
  "use strict";
  var active=false;
  // 72 bits of CSPRNG entropy -> 12 URL-safe characters, prefixed for Bio-A.
  function newSubmissionId(){
    var bytes=new Uint8Array(9);
    window.crypto.getRandomValues(bytes);
    var binary='';
    for(var i=0;i<bytes.length;i++)binary+=String.fromCharCode(bytes[i]);
    return 'bioa_'+btoa(binary).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  }
  var tsLoader=null;
  function turnstileLibrary(){
    if(window.turnstile)return Promise.resolve(window.turnstile);
    if(tsLoader)return tsLoader;
    tsLoader=new Promise(function(resolve,reject){
      var tag=document.createElement("script");
      tag.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      tag.async=true;tag.onload=function(){window.turnstile?resolve(window.turnstile):reject(new Error("turnstile_library"));};
      tag.onerror=function(){reject(new Error("turnstile_library"));};
      document.head.appendChild(tag);
    });
    return tsLoader;
  }
  async function turnstileToken(form){
    var res=await fetch("/api/lead/config",{credentials:"same-origin",cache:"no-store"});
    if(!res.ok)throw new Error("turnstile_config");
    var cfg=await res.json();
    if(cfg.misconfigured)throw new Error("turnstile_config");
    if(!cfg.enabled)return "";
    var ts=await turnstileLibrary();
    return new Promise(function(resolve,reject){
      var holder=document.createElement("div"),id=null,settled=false;
      form.appendChild(holder);
      var timer=setTimeout(function(){finish(new Error("turnstile_timeout"));},30000);
      function finish(err,token){
        if(settled)return;settled=true;clearTimeout(timer);
        try{if(id!==null)ts.remove(id);}catch(e){}
        holder.remove();
        err?reject(err):resolve(token);
      }
      try{
        id=ts.render(holder,{
          sitekey:cfg.sitekey,action:"bioa_lead",size:"invisible",execution:"execute",
          callback:function(token){finish(null,token);},
          "error-callback":function(){finish(new Error("turnstile_failed"));},
          "timeout-callback":function(){finish(new Error("turnstile_timeout"));},
          "expired-callback":function(){finish(new Error("turnstile_expired"));}
        });
        ts.execute(id);
      }catch(e){finish(new Error("turnstile_failed"));}
    });
  }
  function notify(form,lang,message,isError){
    var el=form.querySelector('[data-bioa-lead-status]');
    if(!el){
      el=document.createElement("p");
      el.setAttribute("data-bioa-lead-status","");
      el.setAttribute("role","status");
      el.setAttribute("aria-live","polite");
      el.style.cssText="margin:10px 0 0;font-size:14px;line-height:1.45;color:#fff;text-align:center";
      var button=form.querySelector(".cf-modal__button,[type=submit]");
      if(button&&button.parentNode)button.parentNode.insertBefore(el,button.nextSibling);
      else form.appendChild(el);
    }
    el.textContent=message;
  }
  document.addEventListener("submit",async function(e){
    var form=e.target;
    if(!(form instanceof HTMLFormElement)||!form.matches("#get-a-quote form.wpcf7-form"))return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if(active)return;
    var lang=/^\/en(?:\/|$)/i.test(location.pathname)?"en":"vi";
    var name=(form.querySelector('[name="your-name"]')?.value||"").trim();
    var contact=(form.querySelector('[name="your-phone"]')?.value||"").trim();
    var consent=form.querySelector('[name="your-acceptance"]');
    if(name.length<2||contact.length<4||!consent?.checked){
      notify(form,lang,lang==="vi"?"Vui lòng nhập họ tên, thông tin liên hệ và đồng ý điều khoản.":"Please enter your name and contact and accept the privacy terms.",true);
      return;
    }
    var chosen=Array.from(form.querySelectorAll('[name="your-product-type"]:checked'));
    var button=form.querySelector('.cf-modal__button,[type="submit"]');
    active=true;
    if(button)button.disabled=true;
    notify(form,lang,lang==="vi"?"Đang gửi yêu cầu…":"Sending request…",false);
    var id=(window.crypto&&window.crypto.getRandomValues)?newSubmissionId():null;
    var submitted=false;
    try{
      if(!id)throw new Error("browser_not_supported");
      var verification=await turnstileToken(form);
      var response=await fetch("/api/lead",{method:"POST",headers:{"Content-Type":"application/json"},
        credentials:"same-origin",
        body:JSON.stringify({submission_id:id,name:name,contact:contact,
          interest:chosen.map(x=>x.value).join(", "),
          consent:true,locale:lang,page_path:location.pathname,website:"",turnstile_token:verification})
      });
      if(!response.ok)throw new Error("request_"+response.status);
      var data=await response.json();
      if(!data.ok)throw new Error("submission_rejected");
      // API success is authoritative: UI close exceptions must not become a false send failure.
      submitted=true;
    }catch(error){
      if(button)button.disabled=false;
      var limited=error&&error.message==="request_429";
      notify(form,lang,limited
        ?(lang==="vi"?"Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau khoảng một giờ hoặc liên hệ Bio-A trực tiếp.":"Too many requests. Please try again in about an hour or contact Bio-A directly.")
        :(lang==="vi"?"Chưa gửi được yêu cầu. Vui lòng thử lại hoặc liên hệ Bio-A trực tiếp.":"Could not send. Please retry or contact Bio-A directly."),true);
    }finally{active=false;}
    if(submitted){
      notify(form,lang,lang==="vi"?"Bio-A đã nhận thông tin. Chúng tôi sẽ liên hệ với bạn sớm.":"Bio-A has received your request. We will contact you soon.",false);
      try{
        // Merywood js/modal.js owns the 500ms close animation.
        var modal=document.querySelector("#get-a-quote");
        var close=modal&&modal.querySelector(".modal__close");
        if(close)close.click();
      }catch(error){console.warn("Bio-A modal close failed after lead was saved",error);}
    }
  },true);
})();
