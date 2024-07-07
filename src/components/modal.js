
// open pop
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEscPopup);
}
// close pop
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEscPopup);
}
export function closeEscPopup(evt) { 
  if(evt.key === 'Escape') { 
    const popup = document.querySelector('.popup_is-opened'); 
    if (popup) {
      closePopup(popup); 
    }
  } 
}