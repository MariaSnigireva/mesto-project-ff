export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscapeKeydown);
};

export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscapeKeydown);
};

export const handleOverlayClick = (evt) => {
  if (evt.target == evt.currentTarget) {
  closePopup(evt.currentTarget);
  }
};

export const handleEscapeKeydown = (evt) => {
  if (evt.key == 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    closePopup(activePopup);
  }
};


