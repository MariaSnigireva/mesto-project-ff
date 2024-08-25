
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
  // likeCount.textContent = cardData.likes.length;

  // if (cardData.owner._id !== userId) {
  //   deleteButton.style.display = 'none';
  // } else {
  //   deleteButton.addEventListener('click', () => onDelete(cardData._id));
  // }


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

// export const template = document.querySelector("#card-template").content;

// // Функция создания карточки
// export function createCard(cardData, userId, onDeleteCard, onLikeCard, openImagePopup) {
//   const cardElement = template.querySelector(".card").cloneNode(true);
//   const cardImg = cardElement.querySelector(".card__image");
//   const cardTitle = cardElement.querySelector(".card__title");
//   const likeButton = cardElement.querySelector('.card__like-button');
//   const deleteButton = cardElement.querySelector(".card__delete-button");

//   cardImg.src = cardData.link;
//   cardImg.alt = cardData.name;
//   cardTitle.textContent = cardData.name;
  
//   // Обновление состояния кнопки удаления
//   if (cardData.owner._id !== userId) {
//     deleteButton.style.display = 'none';
//   } else {
//     deleteButton.addEventListener('click', () => onDeleteCard(cardElement, cardData._id));
//   }

//   // Обработчики событий
//   cardImg.addEventListener('click', () => openImagePopup(cardData));
//   likeButton.addEventListener('click', () => onLikeCard(likeButton));

//   return cardElement;
// }

// // Функция удаления карточки
// export function onDeleteCard(cardElement, cardId) {
//   // Можно добавить логику для удаления карточки на сервере
//   // Например, отправить запрос на удаление
//   cardElement.remove();
// }

// // Функция для обработки лайков
// export function onLikeCard(likeButton) {
//   likeButton.classList.toggle('card__like-button_is-active');