export { createCard, likeCard };
import { closePopup, showPopup, renderLoading } from "../scripts/modal.js";
import {
  deleteCardPromise,
  unlikeCardPromise,
  likeCardPromise,
} from "../scripts/api.js";

const cardTemplate = document.querySelector("#card-template").content;
const popupTypeDelete = document.querySelector(".popup_type_delete");

function deleteCard(element, cardData) {
  showPopup(popupTypeDelete, "Да");
  popupTypeDelete.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const submitButton = popupTypeDelete.querySelector(".popup__button");
    renderLoading(true, submitButton, "Удаляем...");
    deleteCardPromise(cardData)
      .then(() => {
        renderLoading(false, submitButton, "Удаляем...");
        element.remove();
      })
      .finally(() => {
        closePopup(popupTypeDelete);
      });
  });
}

function likeCard(button, cardData, likesNumber) {
  if (button.classList.contains("card__like-button_is-active")) {
    unlikeCardPromise(cardData).then((data) => {
      likesNumber.textContent = data.likes.length;
      button.classList.remove("card__like-button_is-active");
    });
  } else {
    likeCardPromise(cardData).then((data) => {
      likesNumber.textContent = data.likes.length;
      button.classList.add("card__like-button_is-active");
    });
  }
}

function createCard(cardData, userId, showPopupTypeImage, likeCard) {
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
  }
  // по жматию на кнопку удаления, вызываем функцию удаления карточки
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement, cardData);
  });
  // делаем сердеко черным при загрузке страницы если ранее был поставлен лайк
  if (cardData.likes.some((user) => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  // обработчик лайка
  likeButton.addEventListener("click", () => {
    likeCard(likeButton, cardData, likesNumber);
  });
  // открываем и заполняем попап при жматии на картинку
  cardImage.addEventListener("click", () => {
    showPopupTypeImage(cardData);
  });

  return cardElement;
}
