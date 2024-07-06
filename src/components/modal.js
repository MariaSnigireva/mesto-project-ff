
// open pop
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}
// close pop
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}
export function openImagePopup(name, link) {
  const imagePopup = document.querySelector('.popup_type_image');
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(imagePopup);
};

