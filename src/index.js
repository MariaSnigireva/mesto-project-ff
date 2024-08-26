

import './pages/index.css';
import { createCard, handlerDeleteIconClick, handlerLikeIconCard } from './components/card.js';
import {openPopup, closePopup, handleOverlayClick } from './components/modal.js';
import { validationConfig, clearValidation, enableValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, userDataUpdate, addCard, avatarUpdate } from './components/api.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const buttonOpenPopupAvatar = document.querySelector('.profile__avatar-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const popupProfile= document.querySelector('.popup_type_edit');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__close');
const formProfile = document.querySelector('.edit-profile');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const descriptionInput = formProfile.querySelector('.popup__input_type_description');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const buttonClosePopupAvatar = popupTypeAvatar.querySelector('.popup__close');
const formAvatar= document.querySelector('.avatar');
const inputUpdateAvatar = formAvatar.querySelector('.popup__input_type_url');
const containerCards = document.querySelector('.places__list');
const popupNewCard = document.querySelector('.popup_type_new-card');
const buttonClosePopupNewCard = popupNewCard.querySelector('.popup__close');
const formNewPlace = document.querySelector('.new-place');
const popuppImageCardCaption = document.querySelector('.popup__caption');
const inputNameNewCard = formNewPlace.querySelector('.popup__input_type_card-name');
const inputImageLinkNewCard = formNewPlace.querySelector('.popup__input_type_url');
const popupImage = document.querySelector('.popup_type_image');
const buttonClosePopupImage = popupImage.querySelector('.popup__close');
const popupImageCard = document.querySelector('.popup__image');


// - Функции
const handleCardImgClick = (evt) => {
  popupImageCard.src = evt.currentTarget.src;
  popupImageCard.alt = evt.currentTarget.alt;
  popuppImageCardCaption.textContent = evt.currentTarget.alt;
  openPopup(popupImage);
}

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.src = userData.avatar;

    cardsData.forEach( (card) => {
      containerCards.append(createCard(
        card,
        userData._id,
        handleCardImgClick,
        handlerDeleteIconClick,
        handlerLikeIconCard
      ));
    })
  })
  .catch(err => console.log(err)); 

enableValidation(validationConfig);

 const fillProfileValuesToForm = (nameInput, jobInput, title, description) => {
  nameInput.value = title.textContent;
  jobInput.value = description.textContent;
};

const renderLoading = (isLoading, form) => {
  const formButton = form.querySelector('.popup__button');

  if (isLoading) {
    formButton.textContent = 'Сохранение...';
  } else {
    formButton.textContent = 'Сохранение';
  }
}

// - Обработчики событий

 editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  fillProfileValuesToForm(nameInput, descriptionInput, profileName, profileDescription);
  clearValidation(popupProfile, validationConfig);
});

addButton.addEventListener('click', () => {
  openPopup(popupNewCard);
  clearValidation(popupNewCard, validationConfig);
});

buttonOpenPopupAvatar.addEventListener('click', () => {
  openPopup(popupTypeAvatar);
  clearValidation(popupTypeAvatar, validationConfig);
});


buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));
buttonClosePopupNewCard.addEventListener('click', () => closePopup(popupNewCard));
buttonClosePopupImage.addEventListener('click', () => closePopup(popupImage));
buttonClosePopupAvatar.addEventListener('click', () => closePopup(popupTypeAvatar));

popupProfile.addEventListener('click', handleOverlayClick);
popupNewCard.addEventListener('click', handleOverlayClick);
popupImage.addEventListener('click', handleOverlayClick);
popupTypeAvatar.addEventListener('click', handleOverlayClick);


formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, formProfile);
  userDataUpdate(nameInput.value, descriptionInput.value)
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closePopup(popupProfile);
    })
    .catch(err => console.log(err))
    .finally(() => renderLoading(false, formProfile));
});


formAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, formAvatar);
  avatarUpdate(inputUpdateAvatar.value)
    .then((profileData) => {
      profileImage.src = profileData.avatar;
      formAvatar.reset();
      closePopup(popupTypeAvatar);
    })
    .catch(err => console.log(err))
    .finally(() => renderLoading(false, formAvatar));
});

formNewPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, formNewPlace);
  addCard(inputNameNewCard.value, inputImageLinkNewCard.value)
    .then((dataCard) => {
      containerCards.prepend(createCard(
        dataCard,
        dataCard.owner._id,
        handleCardImgClick,
        handlerDeleteIconClick,
        handlerLikeIconCard
      ));
      closePopup(popupNewCard);
      formNewPlace.reset();
    })
    .catch(err => console.log(err))
    .finally(() => renderLoading(false, formNewPlace));
});




