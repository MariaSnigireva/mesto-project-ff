import { deleteCard, toggleLike } from './api.js';

export const handlerDeleteIconClick = (cardElement, cardID) => {
  deleteCard(cardID)
    .then(() => cardElement.remove())
    .catch(err => console.log(err));
}

export const handlerLikeIconCard = (cardID, likeButton, likesCount) => {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  toggleLike(cardID, isLiked)
    .then((cardData) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likesCount.textContent = cardData.likes.length;
    })
    .catch(err => console.log(err));  
}

// Функция создания карточки
export const createCard = (cardData, userID, onImage, onDelete, onLike) => { //названия короче
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const counterLikes = cardElement.querySelector('.card__like-counter'); //счет лайков
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  counterLikes.textContent = cardData.likes.length;

  cardData.likes.forEach((likeObj) => {
    if (likeObj._id == userID) likeButton.classList.add('card__like-button_is-active')
  });

  cardImage.onerror = function() {
    cardElement.remove();
  }; 

  cardImage.addEventListener('click', onImage);
  likeButton.addEventListener('click', () => {
    onLike(cardData._id, likeButton, counterLikes);
  });
  cardData.owner._id == userID ? 
  cardDeleteButton.addEventListener('click', () => {
    onDelete(cardElement, cardData._id);
  }) : 
  cardDeleteButton.remove();

  return cardElement;
}

