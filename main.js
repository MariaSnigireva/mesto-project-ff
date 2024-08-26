(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-20",headers:{authorization:"a92b4dd4-8333-403b-9488-d334c738bb3e","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("...")},n=function(n,r){(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))})(r).then((function(){return n.remove()})).catch((function(e){return console.log(e)}))},r=function(n,r,o){(function(n,r){return r?fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)})):fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))})(n,isLiked).then((function(e){r.classList.toggle("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){return console.log(e)}))},o=function(e,t,n,r,o){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),u=c.querySelector(".card__title"),a=c.querySelector(".card__image"),i=c.querySelector(".card__delete-button"),l=c.querySelector(".card__like-button"),s=c.querySelector(".card__like-counter");return a.src=e.link,a.alt=e.name,u.textContent=e.name,s.textContent=e.likes.length,e.likes.forEach((function(e){e._id==t&&l.classList.add("card__like-button_is-active")})),a.onerror=function(){c.remove()},a.addEventListener("click",n),l.addEventListener("click",(function(){o(e._id,l,s)})),e.owner._id==t?i.addEventListener("click",(function(){r(c,e._id)})):i.remove(),c},c=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",i)},u=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i)},a=function(e){e.target==e.currentTarget&&u(e.currentTarget)},i=function(e){if("Escape"==e.key){var t=document.querySelector(".popup_is-opened");u(t)}},l=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},s=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))},d=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){l(e,n,t)})),s(n,r,t)},p={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input_error_visible"};function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var _=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__add-button"),m=document.querySelector(".profile__avatar-button"),v=document.querySelector(".profile__title"),h=document.querySelector(".profile__description"),S=document.querySelector(".profile__image"),b=document.querySelector(".popup_type_edit"),q=b.querySelector(".popup__close"),E=document.querySelector(".edit-profile"),L=E.querySelector(".popup__input_type_name"),g=E.querySelector(".popup__input_type_description"),k=document.querySelector(".popup_type_avatar"),C=k.querySelector(".popup__close"),x=document.querySelector(".avatar"),A=x.querySelector(".popup__input_type_url"),T=document.querySelector(".places__list"),U=document.querySelector(".popup_type_new-card"),w=U.querySelector(".popup__close"),j=document.querySelector(".new-place"),O=document.querySelector(".popup__caption"),B=j.querySelector(".popup__input_type_card-name"),P=j.querySelector(".popup__input_type_url"),D=document.querySelector(".popup_type_image"),M=D.querySelector(".popup__close"),N=document.querySelector(".popup__image"),I=function(e){N.src=e.currentTarget.src,N.alt=e.currentTarget.alt,O.textContent=e.currentTarget.alt,c(D)};Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t,c,u=(c=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,c)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=u[0],i=u[1];v.textContent=a.name,h.textContent=a.about,S.src=a.avatar,i.forEach((function(e){T.append(o(e,a._id,I,n,r))}))})).catch((function(e){return console.log(e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);s(n,r,p),n.forEach((function(t){t.addEventListener("input",(function(){!function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?l(e,t,p):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,p)}(e,t),s(n,r,p)}))}))}(t,e)}))}(p);var J=function(e,t){t.querySelector(".popup__button").textContent=e?"Сохранение...":"Сохранение"};_.addEventListener("click",(function(){c(b),function(e,t,n,r){e.value=n.textContent,t.value=r.textContent}(L,g,v,h),d(b,p)})),y.addEventListener("click",(function(){c(U),d(U,p)})),m.addEventListener("click",(function(){c(k),d(k,p)})),q.addEventListener("click",(function(){return u(b)})),w.addEventListener("click",(function(){return u(U)})),M.addEventListener("click",(function(){return u(D)})),C.addEventListener("click",(function(){return u(k)})),b.addEventListener("click",a),U.addEventListener("click",a),D.addEventListener("click",a),k.addEventListener("click",a),E.addEventListener("submit",(function(n){var r,o;n.preventDefault(),J(!0,E),(r=L.value,o=g.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then((function(e){return t(e)}))).then((function(e){v.textContent=e.name,h.textContent=e.about,u(b)})).catch((function(e){return console.log(e)})).finally((function(){return J(!1,E)}))})),x.addEventListener("submit",(function(n){var r;n.preventDefault(),J(!0,x),(r=A.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then((function(e){return t(e)}))).then((function(e){S.src=e.avatar,x.reset(),u(k)})).catch((function(e){return console.log(e)})).finally((function(){return J(!1,x)}))})),j.addEventListener("submit",(function(c){var a,i;c.preventDefault(),J(!0,j),(a=B.value,i=P.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:a,link:i})}).then((function(e){return t(e)}))).then((function(e){T.prepend(o(e,e.owner._id,I,n,r)),u(U),j.reset()})).catch((function(e){return console.log(e)})).finally((function(){return J(!1,j)}))}))})();