(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n,o,r){var c=e.querySelector(".card").cloneNode(!0),p=c.querySelector(".card__image"),u=c.querySelector(".card__title"),d=c.querySelector(".card__like-button"),i=c.querySelector(".card__delete-button");return p.src=t.link,p.alt=t.name,u.textContent=t.name,p.addEventListener("click",(function(){return r(t)})),i.addEventListener("click",(function(){n(c)})),d.addEventListener("click",(function(){return o(d)})),c}function n(e){e.remove()}function o(e){e.classList.toggle("card__like-button_is-active")}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",p)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",p)}function p(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&c(t)}}var u=document.querySelector(".places__list"),d=document.querySelector('.popup__form[name="new-place"]'),i=document.querySelector(".popup_type_new-card"),a=document.querySelector(".popup_type_image"),l=a.querySelector(".popup__image"),s=a.querySelector(".popup__caption"),_=document.querySelector(".profile__edit-button"),m=document.querySelector(".profile__title"),y=document.querySelector('.popup__form[name="edit-profile"]'),f=document.querySelector(".profile__description"),v=y.querySelector(".popup__input_type_name"),k=y.querySelector(".popup__input_type_description"),q=document.querySelector(".profile__add-button"),S=document.querySelectorAll(".popup");function E(e){l.src=e.link,l.alt=e.name,s.textContent=e.name,r(a)}y.addEventListener("submit",(function(e){e.preventDefault(),m.textContent=v.value,f.textContent=k.value,c(document.querySelector(".popup_type_edit"))})),d.addEventListener("submit",(function(e){e.preventDefault();var r={name:d.querySelector(".popup__input_type_card-name").value,link:d.querySelector(".popup__input_type_url").value};u.prepend(t(r,n,o,E)),c(i)})),_.addEventListener("click",(function(){v.value=m.textContent,k.value=f.textContent,r(document.querySelector(".popup_type_edit"))})),q.addEventListener("click",(function(){r(i)})),S.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_is-opened")&&c(e)}))})),document.querySelectorAll(".popup__close").forEach((function(e){e.addEventListener("click",(function(e){c(e.target.closest(".popup"))}))})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){u.append(t(e,n,o,E))}))})();