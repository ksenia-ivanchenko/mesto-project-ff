import "../pages/index.css";
import { initialCards } from "../scripts/cards.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");

// создаем карточки
function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  // по клику на кнопку удаления, вызываем функцию удаления карточки
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  // открываем и заполняем попап
  // cardImage.addEventListener("click", () => {
  //   showImagePopup();
  //   document.querySelector(".popup__image").src = cardData.link;
  //   document.querySelector(".popup__image").alt = cardData.name;
  //   document.querySelector(".popup__caption").textContent = cardData.name;
  // });

  return cardElement;
}

// функция удаления карточки
function deleteCard(element) {
  element.remove();
}

// для каждого элемента объекта карточек создаем карточку и добавляем на страницу
initialCards.forEach((cardData) => {
  placesList.append(createCard(cardData, deleteCard));
});

// функция появления модального окна
function showPopup(popupType) {
  popupType.classList.add("popup_is-opened");
}

// функция появления модального окна для картинки
// function showImagePopup() {
//   const popupImage = document.querySelector(".popup_type_image");
//   showPopup(popupImage);
// }

// функция закрытия модального окна
function closePopup(popupType) {
  popupType.classList.remove("popup_is-opened");
}

// обработчики кнопок открытия и закрытия модальных окон
editButton.addEventListener("click", () => {
  const popupEdit = document.querySelector(".popup_type_edit");
  showPopup(popupEdit);
});

addNewCardButton.addEventListener("click", () => {
  const popupCard = document.querySelector(".popup_type_new-card");
  showPopup(popupCard);
});

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  });
});
