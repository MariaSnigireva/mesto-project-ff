
import './pages/index.css';
import {initialCards} from './cards.js';
import {template, createCard, deleteCard, addCard} from './components/card.js';
import {openPopup, closePopup} from './components/modal.js'

const placesList = document.querySelector(".places__list");
//const template = document.querySelector("#card-template").content;

// @todo: Вывести карточки на страницу
initialCards.forEach(cardData => {
  placesList.append(
    createCard(cardData, deleteCard)
  );
});

// Добавляем обработчик событий для формы добавления новой карточки
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const newCardPopup = document.querySelector('.popup_type_new-card');
newCardForm.addEventListener('submit', addCard);

// Добавляем обработчики для закрытия всех попапов
document.querySelectorAll('.popup__close').forEach(closeButton => {
  closeButton.addEventListener('click', function (evt) {
    const popup = evt.target.closest('.popup');
    closePopup(popup);
  });
});

// Добавляем начальные карточки на страницу
initialCards.forEach(cardData => {
  placesList.append(createCard(cardData, deleteCard));
});


// Обработчик событий для кнопки редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', function() {
  const profileName = document.querySelector('.profile__title');
  const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
  const profileDescription = document.querySelector('.profile__description');
  const nameInput = formEditProfile.querySelector('.popup__input_type_name');
  const descriptionInput = formEditProfile.querySelector('.popup__input_type_description');
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(document.querySelector('.popup_type_edit'));
});

// Обработчик событий для формы добавления новой карточки

newCardForm.addEventListener('submit', function(evt) {
  addCard(evt);
});

const addButton = document.querySelector('.profile__add-button');

   // Обработчик клика по кнопке добавления карточки
 addButton.addEventListener('click', () => {
  openPopup(document.querySelector('.popup_type_new-card'));
  });
 const popups = document.querySelectorAll('.popup');


// Esc
function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
document.addEventListener('keydown', closePopupOnEsc);

 
   // overlay
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_is-opened')) {
        closePopup(popup);
      }
    });
  });

  
