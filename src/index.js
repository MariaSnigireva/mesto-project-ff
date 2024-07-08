
import './pages/index.css';
import {initialCards} from './cards.js';
import { template, createCard, onLikeCard, onDeleteCard} from './components/card.js';
import {openPopup, closePopup, closeEscPopup} from './components/modal.js'

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