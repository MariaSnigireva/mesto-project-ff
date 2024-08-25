

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
const popAva = document.querySelector('.popup_type_avatar');
const buttonClosePopupAvatar = popAva.querySelector('.popup__close');
const formAva= document.querySelector('.avatar');
const inputUpdateAvatar = formAva.querySelector('.popup__input_type_url');
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
  openPopup(popAva);
  clearValidation(popAva, validationConfig);
});


buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));
buttonClosePopupNewCard.addEventListener('click', () => closePopup(popupNewCard));
buttonClosePopupImage.addEventListener('click', () => closePopup(popupImage));
buttonClosePopupAvatar.addEventListener('click', () => closePopup(popAva));

popupProfile.addEventListener('click', handleOverlayClick);
popupNewCard.addEventListener('click', handleOverlayClick);
popupImage.addEventListener('click', handleOverlayClick);
popAva.addEventListener('click', handleOverlayClick);


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


formAva.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, formAva);
  avatarUpdate(inputUpdateAvatar.value)
    .then((profileData) => {
      profileImage.src = profileData.avatar;
      formAva.reset();
      closePopup(popAva);
    })
    .catch(err => console.log(err))
    .finally(() => renderLoading(false, formAva));
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




// const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,40}$/;
// const descriptionPattern = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,200}$/;
// const placeNamePattern = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,30}$/;
// const urlPattern = /^(https?:\/\/[^\s]+)$/;

// // Функция для проверки поля формы и активации/деактивации кнопки отправки
// function validateEditProfileForm() {
//   const nameValue = nameInput.value;
//   const descriptionValue = descriptionInput.value;
//   let isValid = true;


//   if (!namePattern.test(nameValue)) {
//     showError(nameInput, 'Имя должно содержать от 2 до 40 символов и может включать латинские и кириллические буквы, пробелы и знаки дефиса.');
//     isValid = false;
//   } else {
//     hideError(nameInput);
//   }

//   if (!descriptionPattern.test(descriptionValue)) {
//     showError(descriptionInput, 'Описание должно содержать от 2 до 200 символов и может включать латинские и кириллические буквы, пробелы и знаки дефиса.');
//     isValid = false;
//   } else {
//     hideError(descriptionInput);
//   }
//   toggleSubmitButton(formEditProfile, isValid);
// }

// function validateNewPlaceForm() {
//   const placeNameValue = newCardForm.querySelector('.popup__input_type_card-name').value;
//   const linkValue = newCardForm.querySelector('.popup__input_type_url').value;
//   let isValid = true;

//   if (!placeNamePattern.test(placeNameValue)) {
//     showError(newCardForm.querySelector('.popup__input_type_card-name'), 'Название должно содержать от 2 до 30 символов и может включать латинские и кириллические буквы, пробелы и знаки дефиса.');
//     isValid = false;
//   } else {
//     hideError(newCardForm.querySelector('.popup__input_type_card-name'));
//   }

//   if (!urlPattern.test(linkValue)) {
//     showError(newCardForm.querySelector('.popup__input_type_url'), 'Введите корректный URL.');
//     isValid = false;
//   } else {
//     hideError(newCardForm.querySelector('.popup__input_type_url'));
//   }
//   toggleSubmitButton(newCardForm, isValid);
// };

// function toggleSubmitButton(form, isValid) {
//   const saveButton = form.querySelector('button[type="submit"]');
//   if (isValid) {
//     saveButton.classList.remove('button_inactive');
//     saveButton.disabled = false;
//   } else {
//     saveButton.classList.add('button_inactive');
//     saveButton.disabled = true;
//   }
// }

// function showError(input, message) {
//   const errorSpan = input.nextElementSibling;
//   if (errorSpan && errorSpan.classList.contains('popup__input-error')) {
//     errorSpan.textContent = message;
//     errorSpan.classList.add('popup__input-error_visible');
//     input.classList.add('popup__input_type_error');
//   }
// }

// function hideError(input) {
//   const errorSpan = input.nextElementSibling;
//   if (errorSpan && errorSpan.classList.contains('popup__input-error')) {
//     errorSpan.textContent = '';
//     input.classList.remove('popup__input_type_error');
//   }
// }

// function resetFormValidation(form) {
//   form.reset();
//   const errorSpans = form.querySelectorAll('.popup__input-error');
//   errorSpans.forEach(span => span.textContent = '');
//   form.querySelectorAll('.popup__input').forEach(input => input.classList.remove('popup__input_type_error'));
//   toggleSubmitButton(form, false);
// }

// formEditProfile.addEventListener('input', validateEditProfileForm);
// editButton.addEventListener('click', function() {
//   nameInput.value = profileName.textContent;
//   descriptionInput.value = profileDescription.textContent;
//   openPopup(document.querySelector('.popup_type_edit'));
//   resetFormValidation(formEditProfile);
// });
// newCardForm.addEventListener('input', validateNewPlaceForm);
