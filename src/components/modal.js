
// // open pop
// export function openPopup(popup) {
//   popup.classList.add('popup_is-opened');
//   document.addEventListener('keydown', closeEscPopup);
// }
// // close pop
// export function closePopup(popup) {
//   popup.classList.remove('popup_is-opened');
//   document.removeEventListener('keydown', closeEscPopup);
// }
// export function closeEscPopup(evt) { 
//   if(evt.key === 'Escape') { 
//     const popup = document.querySelector('.popup_is-opened'); 
//     if (popup) {
//       closePopup(popup); 
//     }
//   } 
// }


// Открытие попапа
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

// Закрытие попапа
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

// Закрытие попапа при нажатии на Esc
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}

// Закрытие попапа при клике на overlay
export function handleOverlayClose(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closePopup(evt.target);
  }
}

// Добавление обработчиков закрытия попапов
export function addPopupEventListeners() {
  document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('mousedown', handleOverlayClose);
  });
}

// Инициализация обработчиков событий для попапов
addPopupEventListeners();
