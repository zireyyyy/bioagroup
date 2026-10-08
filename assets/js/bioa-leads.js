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
    try{
      if(!id)throw new Error("browser_not_supported");
      var response=await fetch("/api/lead",{method:"POST",headers:{"Content-Type":"application/json"},
        credentials:"same-origin",
        body:JSON.stringify({submission_id:id,name:name,contact:contact,
          interest:chosen.map(x=>x.value).join(", "),
          consent:true,locale:lang,page_path:location.pathname,website:""})
      });
      if(!response.ok)throw new Error("request_"+response.status);
      var data=await response.json();
      if(!data.ok)throw new Error("submission_rejected");
      notify(form,lang,lang==="vi"?"Bio-A đã nhận thông tin. Chúng tôi sẽ liên hệ với bạn sớm.":"Bio-A has received your request. We will contact you soon.",false);
      // Trigger the source modal's close affordance; never alter Merywood layout.
      var modal=document.querySelector("#get-a-quote");
      if(modal){
        // Merywood modal.js listens for click on .modal__close and closes with its own animation.
        var close=modal.querySelector(".modal__close");
        if(close)close.click();
      }
    }catch(error){
      if(button)button.disabled=false;
      notify(form,lang,lang==="vi"?"Chưa gửi được yêu cầu. Vui lòng thử lại hoặc liên hệ Bio-A trực tiếp.":"Could not send. Please retry or contact Bio-A directly.",true);
    }finally{active=false;}
  },true);
})();
