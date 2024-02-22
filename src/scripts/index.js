import "../pages/index.css";
import { initialCards, createCard, deleteCard } from "../scripts/cards.js";
import { showPopup, closePopup, showPopupTypeImage } from "../scripts/modal.js";

export { cardTemplate, popupTypeImage };

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

const editButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");

const popups = document.querySelectorAll(".popup");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

// анимируем появление/исчезание модалок
for (const popup of popups) {
  popup.classList.add("popup_is-animated");
}

// для каждого элемента объекта карточек создаем карточку и добавляем на страницу
initialCards.forEach((cardData) => {
  placesList.append(createCard(cardData, deleteCard, showPopupTypeImage));
});

// открытие модалок для редактирования профиля и добавления карточки
editButton.addEventListener("click", () => {
  showPopup(popupTypeEdit);
});

addNewCardButton.addEventListener("click", () => {
  showPopup(popupTypeCard);
});

// закрытие модалок по кнопке крестик
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", closePopup);
});

// закрытие модалки кликом по оверлею
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup();
    }
  });
});

// закрытие модалки ескейпом
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closePopup();
  }
});

