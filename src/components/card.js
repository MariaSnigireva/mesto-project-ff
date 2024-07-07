
export const template = document.querySelector("#card-template").content;
export function createCard (cardData, onDeleteCard, onLikeCard, openImagePopup){
  const cardElement = template.querySelector(".card").cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector(".card__delete-button");
 

  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardImg.addEventListener('click', () => openImagePopup(cardData));
  deleteButton.addEventListener('click', function() {
    onDeleteCard(cardElement);
  });
  likeButton.addEventListener('click', () => onLikeCard(likeButton));
  
  return cardElement;
};

//@todo: Функция удаления карточки
export function onDeleteCard (cardElement) {
  cardElement.remove();
}

export function onLikeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

// new card add
// export function addCard(evt) {
//   evt.preventDefault(); 
//   const name = newCardForm.elements['place-name'].value;
//   const link = newCardForm.elements['link'].value;
//   const cardNewElement = createCard({name, link}, deleteCard);
//   placesList.prepend(cardNewElement); 
//   closePopup(newCardPopup); 
//   newCardForm.reset(); 
// }