export { createCard, likeCard };
import { unlikeCardPromise, likeCardPromise } from "../scripts/api.js";

const cardTemplate = document.querySelector("#card-template").content;

function likeCard(button, cardId, likesNumber) {
  const likeMethod = button.classList.contains("card__like-button_is-active")
    ? unlikeCardPromise
    : likeCardPromise;
  likeMethod(cardId)
    .then((data) => {
      likesNumber.textContent = data.likes.length;
      button.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => console.log(err));
}

function createCard(
  cardData,
  userId,
  showPopupTypeImage,
  deleteCard,
  likeCard
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardTitle = cardElement.querySelector(".card__title");
  const likesNumber = cardElement.querySelector(".card__likes-number");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likesNumber.textContent = cardData.likes.length;

  //удаляем кнопку корзины если карточка чужая
  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  } else {
    // по жматию на кнопку удаления, вызываем функцию удаления карточки
    deleteButton.addEventListener("click", () => {
      deleteCard(cardElement, cardData._id);
    });
  }
  // делаем сердеко черным при загрузке страницы если ранее был поставлен лайк
  if (cardData.likes.some((user) => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  // обработчик лайка
  likeButton.addEventListener("click", () => {
    likeCard(likeButton, cardData._id, likesNumber);
  });
  // открываем и заполняем попап при жматии на картинку
  cardImage.addEventListener("click", () => {
    showPopupTypeImage(cardData);
  });

  return cardElement;
}
