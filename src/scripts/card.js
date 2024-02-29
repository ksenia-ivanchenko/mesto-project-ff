export { createCard, deleteCard, likeCard };

const cardTemplate = document.querySelector("#card-template").content;

function deleteCard(element) {
  element.remove();
}

function likeCard(button) {
  button.classList.toggle("card__like-button_is-active");
}

function createCard(cardData, deleteCard, showPopupTypeImage, likeCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  // по жматию на кнопку удаления, вызываем функцию удаления карточки
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });
  // обработчик лайка
  likeButton.addEventListener("click", () => {
    likeCard(likeButton);
  });
  // открываем и заполняем попап при жматии на картинку
  cardImage.addEventListener("click", () => {
    showPopupTypeImage(cardData);
  });

  return cardElement;
}