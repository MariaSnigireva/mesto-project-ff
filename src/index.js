
import './pages/index.css';
// @todo: Темплейт карточки
  const template = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard (cardData, deleteCard){
  const cardElement = template.querySelector(".card").cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard (event) {
  const cardRemove = event.target.closest(".card");
  cardRemove.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(cardData => {
  placesList.append(
    createCard(cardData, deleteCard)
  );
});



