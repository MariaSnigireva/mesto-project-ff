import {closePopup, openImagePopup} from './modal.js'
export const template = document.querySelector("#card-template").content;
export function createCard (cardData, deleteCard){
  const cardElement = template.querySelector(".card").cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('card__like-button_is-active');
  }); 
  cardImg.addEventListener('click', function () {
    openImagePopup(cardData.name, cardData.link);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard (event) {
  const cardRemove = event.target.closest(".card");
  cardRemove.remove();
}

// new card add
export function addCard(evt) {
  evt.preventDefault(); 
  const name = newCardForm.elements['place-name'].value;
  const link = newCardForm.elements['link'].value;
  const cardNewElement = createCard({name, link}, deleteCard);
  placesList.prepend(cardNewElement); 
  closePopup(newCardPopup); 
  newCardForm.reset(); 
}
