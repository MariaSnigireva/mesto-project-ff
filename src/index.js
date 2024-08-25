
import './pages/index.css';
// import {getUserInfo, getInitialCards, addCard, updateUserInfo, deleteCard, addLike, removeLike, updateAvatar} from './components/api.js';
import {initialCards} from './cards.js';
import { template, createCard, onLikeCard, onDeleteCard} from './components/card.js';
import {openPopup, closePopup, closeEscPopup} from './components/modal.js';
import { enableValidation, clearValidation} from './components/validation.js';

const placesList = document.querySelector(".places__list");
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupImageCaption = imagePopup.querySelector('.popup__caption');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
const profileDescription = document.querySelector('.profile__description');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const descriptionInput = formEditProfile.querySelector('.popup__input_type_description');
const addButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Включение валидации
enableValidation(validationConfig);

// Функции
function addCard(evt) {
  evt.preventDefault();
  const name = newCardForm.querySelector('.popup__input_type_card-name').value;
  const link = newCardForm.querySelector('.popup__input_type_url').value;
  const cardData = { name, link };
  placesList.prepend(createCard(cardData, onDeleteCard, onLikeCard, openImagePopup));
  closePopup(newCardPopup);
}

function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupImageCaption.textContent = cardData.name;
  openPopup(imagePopup);
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(document.querySelector('.popup_type_edit'));
}

formEditProfile.addEventListener('submit', handleProfileSubmit);

// Обработчики событий
newCardForm.addEventListener('submit', addCard);
editButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(document.querySelector('.popup_type_edit'));
  clearValidation(formEditProfile, validationConfig);
});

addButton.addEventListener('click', () => {
  openPopup(newCardPopup);
});

popups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(popup);
    }
  });
});
document.querySelectorAll('.popup__close').forEach(closeButton => {
  closeButton.addEventListener('click', evt => {
    const popup = evt.target.closest('.popup');
    closePopup(popup);
  });
});

// Инициализация карточек
initialCards.forEach(cardData => {
  placesList.append(createCard(cardData, onDeleteCard, onLikeCard, openImagePopup));
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
