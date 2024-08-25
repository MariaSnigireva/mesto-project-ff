
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
//     saveButton.classList.remove('popup__button_disabled');
//     saveButton.disabled = false;
//   } else {
//     saveButton.classList.add('popup__button_disabled');
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
//     errorSpan.classList.remove('popup__input-error_visible');
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


// const placesList = document.querySelector(".places__list");
// const modalProfile = document.querySelector('.popup_type_edit');
// const modalNewCard = document.querySelector('.popup_type_new-card');
// const modalNewAvatar = document.querySelector('.popup_type_avatar');
// const popupTypeImage = document.querySelector('.popup_type_image');
// const popupImage = popupTypeImage.querySelector('.popup__image');
// const popupCaption = popupTypeImage.querySelector('.popup__caption');

// const buttonOpenModalProfile = document.querySelector('.profile__edit-button');
// const buttonOpenModalNewCard = document.querySelector('.profile__add-button');
// const buttonOpenModalNewAvatar = document.querySelector('.profile__image');
// const popupCloseButtons = document.querySelectorAll('.popup__close');

// const formElementProfile = modalProfile.querySelector('.popup__form');
// const nameInput = formElementProfile.querySelector('.popup__input_type_name');
// const jobInput = formElementProfile.querySelector('.popup__input_type_description');
// const profileTitle = document.querySelector('.profile__title');
// const profileDescription = document.querySelector('.profile__description');

// const formElementCard = modalNewCard.querySelector('.popup__form');
// const imageName = formElementCard.querySelector('.popup__input_type_card-name');
// const urlImage = formElementCard.querySelector('.popup__input_type_url');

// const formElementAvatar = modalNewAvatar.querySelector('.popup__form');
// const urlAvatar = formElementAvatar.querySelector('.popup__input_type_url_img');
// const avatarImg = document.querySelector('.profile__image');

// let userId = null;

// // Конфигурация валидации
// const validationConfig = {
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
// };

// // Функции управления попапами
// function openModal(modal) {
//     modal.classList.add('popup_is-opened');
//     document.addEventListener('keydown', closeModalOnEsc);
// }

// function closeModal(modal) {
//     modal.classList.remove('popup_is-opened');
//     document.removeEventListener('keydown', closeModalOnEsc);
// }

// function closeModalOnEsc(evt) {
//     if (evt.key === 'Escape') {
//         const openedPopup = document.querySelector('.popup_is-opened');
//         if (openedPopup) closeModal(openedPopup);
//     }
// }

// function handleOverlayClick(evt) {
//     if (evt.target.classList.contains('popup_is-opened')) {
//         closeModal(evt.target);
//     }
// }

// popupCloseButtons.forEach(button => {
//     button.addEventListener('click', (evt) => {
//         const modal = evt.target.closest('.popup');
//         closeModal(modal);
//     });
// });

// document.querySelectorAll('.popup').forEach(popup => {
//     popup.addEventListener('mousedown', handleOverlayClick);
// });

// // Функции обработки форм
// function handleFormSubmitAvatar(evt) {
//     evt.preventDefault();
//     const newLinkAvatar = urlAvatar.value;
//     evt.submitter.textContent = "Сохранение...";
//     newAvatar(newLinkAvatar)
//         .then((newLink) => {
//             avatarImg.style.backgroundImage = `url(${newLink.avatar})`;
//             closeModal(modalNewAvatar);
//         })
//         .catch(console.error)
//         .finally(() => {
//             evt.submitter.textContent = "Сохранить";
//         });
//     formElementAvatar.reset();
// }

// function handleFormSubmitProfile(evt) {
//     evt.preventDefault();
//     const userData = {
//         name: nameInput.value,
//         about: jobInput.value
//     };
//     evt.submitter.textContent = 'Сохранение...';
//     updateProfileInfo(userData)
//         .then(() => {
//             profileTitle.textContent = nameInput.value;
//             profileDescription.textContent = jobInput.value;
//             closeModal(modalProfile);
//         })
//         .catch(console.error)
//         .finally(() => {
//             evt.submitter.textContent = 'Сохранить';
//         });
// }

// function handleFormSubmitCard(evt) {
//     evt.preventDefault();
//     const newCard = {
//         name: imageName.value,
//         link: urlImage.value
//     };
//     evt.submitter.textContent = 'Создать';
//     addCard(newCard)
//         .then((newCardData) => {
//             placesList.prepend(createCard(newCardData, newCardData.owner._id, cardDelete, likeCard, showImage));
//             closeModal(modalNewCard);
//         })
//         .catch(console.error)
//         .finally(() => {
//             evt.submitter.textContent = 'Сохранить';
//         });
//     formElementCard.reset();
// }

// formElementAvatar.addEventListener('submit', handleFormSubmitAvatar);
// formElementProfile.addEventListener('submit', handleFormSubmitProfile);
// formElementCard.addEventListener('submit', handleFormSubmitCard);

// // Функция просмотра картинок
// function showImage(link, name) {
//     popupImage.src = link;
//     popupImage.alt = name;
//     popupCaption.textContent = name;
//     openModal(popupTypeImage);
// }

// // Валидация
// function showInputError(formElement, inputElement, errorMessage, config) {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add(config.inputErrorClass);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(config.errorClass);
// }

// function hideInputError(formElement, inputElement, config) {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove(config.inputErrorClass);
//     errorElement.classList.remove(config.errorClass);
//     errorElement.textContent = '';
// }

// function isValid(formElement, inputElement, config) {
//     if (inputElement.validity.patternMismatch) {
//         inputElement.setCustomValidity(inputElement.dataset.errorMessage);
//     } else {
//         inputElement.setCustomValidity("");
//     }
//     if (!inputElement.validity.valid) {
//         showInputError(formElement, inputElement, inputElement.validationMessage, config);
//     } else {
//         hideInputError(formElement, inputElement, config);
//     }
// }

// function hasInvalidInput(inputList) {
//     return inputList.some(inputElement => !inputElement.validity.valid);
// }

// function toggleButtonState(inputList, buttonElement, config) {
//     if (hasInvalidInput(inputList)) {
//         buttonElement.disabled = true;
//         buttonElement.classList.add(config.inactiveButtonClass);
//     } else {
//         buttonElement.disabled = false;
//         buttonElement.classList.remove(config.inactiveButtonClass);
//     }
// }

// function setEventListeners(formElement, config) {
//     const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
//     const buttonElement = formElement.querySelector(config.submitButtonSelector);
//     inputList.forEach(inputElement => {
//         inputElement.addEventListener('input', () => {
//             isValid(formElement, inputElement, config);
//             toggleButtonState(inputList, buttonElement, config);
//         });
//     });
// }

// function enableValidation(config) {
//     const formList = Array.from(document.querySelectorAll(config.formSelector));
//     formList.forEach(formElement => setEventListeners(formElement, config));
// }

// function clearValidation(formElement, config) {
//     const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
//     const buttonElement = formElement.querySelector(config.submitButtonSelector);
//     inputList.forEach(inputElement => hideInputError(formElement, inputElement, config));
//     toggleButtonState(inputList, buttonElement, config);
// }

// // Инициализация валидации
// enableValidation(validationConfig);

// // Загрузка данных пользователя и карточек
// Promise.all([getProfileInfo(), getInitialCards()])
//     .then(([userData, initialCards]) => {
//         userId = userData._id;
//         profileTitle.textContent = userData.name;
//         profileDescription.textContent = userData.about;
//         avatarImg.style.backgroundImage = `url(${userData.avatar})`;
//         initialCards.forEach(card => {
//             const cardElement = createCard(card, userId, cardDelete, likeCard, showImage);
//             placesList.append(cardElement);
//         });
//     })
//     .catch(error => console.error('Ошибка: ', error));

// const placesList = document.querySelector(".places__list");
// const newCardForm = document.querySelector('.popup__form[name="new-place"]');
// const newCardPopup = document.querySelector('.popup_type_new-card');
// const imagePopup = document.querySelector('.popup_type_image');
// const popupImage = imagePopup.querySelector('.popup__image');
// const popupImageCaption = imagePopup.querySelector('.popup__caption');
// const editButton = document.querySelector('.profile__edit-button');
// const profileName = document.querySelector('.profile__title');
// const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
// const profileDescription = document.querySelector('.profile__description');
// const nameInput = formEditProfile.querySelector('.popup__input_type_name');
// const descriptionInput = formEditProfile.querySelector('.popup__input_type_description');
// const addButton = document.querySelector('.profile__add-button');
// const popups = document.querySelectorAll('.popup');


// // Настройка валидации форм
// const validationConfig = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// };

// enableValidation(validationConfig);


// // Функции
// function addCard(evt) {
//   evt.preventDefault();
//   const name = newCardForm.querySelector('.popup__input_type_card-name').value;
//   const link = newCardForm.querySelector('.popup__input_type_url').value;
//   const cardData = { name, link };
//   placesList.prepend(createCard(cardData, onDeleteCard, onLikeCard, openImagePopup));
//   closePopup(newCardPopup);
//    clearValidation(newCardForm, validationConfig);
// }

// function openImagePopup(cardData) {
//   popupImage.src = cardData.link;
//   popupImage.alt = cardData.name;
//   popupImageCaption.textContent = cardData.name;
//   openPopup(imagePopup);
// }

// function handleProfileSubmit(evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileDescription.textContent = descriptionInput.value;
//   closePopup(document.querySelector('.popup_type_edit'));
// }

// // function handleProfileSubmit(evt) {
// //   evt.preventDefault();
// //   updateUserInfo(nameInput.value, descriptionInput.value)
// //     .then(userInfo => {
// //       profileName.textContent = userInfo.name;
// //       profileDescription.textContent = userInfo.description;
// //       closePopup(document.querySelector('.popup_type_edit'));
// //     })
// //     .catch(err => console.log(err));
// // }

//  formEditProfile.addEventListener('submit', handleProfileSubmit);

// // function handleAvatarSubmit(evt) {
// //   evt.preventDefault();
// //   const avatarUrl = avatarInput.value;
// //   updateAvatar(avatarUrl)
// //     .then(userInfo => {
// //       renderUserInfo(userInfo);
// //       closePopup(avatarPopup);
// //     })
// //     .catch(err => console.log(err));
// // }
// //Обработчики событий
// newCardForm.addEventListener('submit', addCard);
// editButton.addEventListener('click', function() {
//   nameInput.value = profileName.textContent;
//   descriptionInput.value = profileDescription.textContent;
//   openPopup(document.querySelector('.popup_type_edit'));
//   clearValidation(formEditProfile, validationConfig);
// });

// addButton.addEventListener('click', () => {
//   openPopup(newCardPopup);
//   clearValidation(newCardForm, validationConfig);
// });

// popups.forEach(popup => {
//   popup.addEventListener('mousedown', evt => {
//     if (evt.target.classList.contains('popup_is-opened')) {
//       closePopup(popup);
//     }
//   });
// });
// document.querySelectorAll('.popup__close').forEach(closeButton => {
//   closeButton.addEventListener('click', evt => {
//     const popup = evt.target.closest('.popup');
//     closePopup(popup);
//     if (popup.classList.contains('popup_type_edit')) {
//       clearValidation(formEditProfile, {
//         errorClass: 'popup__error_visible',
//         inputErrorClass: 'popup__input_type_error',
//         submitButtonSelector: '.popup__button',
//         inactiveButtonClass: '.button_inactive'
//       });
//     } else if (popup.classList.contains('popup_type_new-card')) {
//       clearValidation(newCardForm, validationConfig);
//     // } else if (popup.classList.contains('popup_type_avatar')) {
//     //   clearValidation(avatarForm, validationConfig);
//     }
//   });
// });

// // Инициализация карточек
// initialCards.forEach(cardData => {
//   placesList.append(createCard(cardData, onDeleteCard, onLikeCard, openImagePopup));
// });


// Promise.all([getUserInfo(), getInitialCards()])
//   .then(([userInfo, initialCards]) => {
//     renderUserInfo(userInfo);
//     initialCards.forEach(cardData => {
//       placesList.append(createCard(cardData, onDeleteCard, onLikeCard, openImagePopup));
//     });
//   })
//   .catch(err => console.log(err));


// Promise.all([getUserInfo(), getInitialCards()])
//   .then(([userInfo, initialCards]) => {
//     renderUserInfo(userInfo);
//     initialCards.forEach(cardData => {
//       placesList.append(renderCard(cardData));
//     });
//   })
//   .catch(err => console.log(err));






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
