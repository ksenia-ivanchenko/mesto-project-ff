import "../pages/index.css";
import {
  initialCards,
  createCard,
  deleteCard,
  likeCard,
} from "../scripts/cards.js";
import { showPopup, closePopup, showPopupTypeImage } from "../scripts/modal.js";

export { cardTemplate, popupTypeImage, popups };

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

const editButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

const popups = document.querySelectorAll(".popup");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

const cardName = popupTypeCard.querySelector(".popup__input_type_card-name");
const cardUrl = popupTypeCard.querySelector(".popup__input_type_url");

// анимируем появление/исчезание модалок
for (const popup of popups) {
  popup.classList.add("popup_is-animated");
}

// для каждого элемента объекта карточек создаем карточку и добавляем на страницу
initialCards.forEach((cardData) => {
  placesList.append(
    createCard(cardData, deleteCard, showPopupTypeImage, likeCard)
  );
});

// открытие модалок для редактирования профиля и добавления карточки
editButton.addEventListener("click", () => {
  showPopup(popupTypeEdit);
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
});

addNewCardButton.addEventListener("click", () => {
  showPopup(popupTypeCard);
});

// редактирование данных профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener("submit", handleFormSubmit);

// добавление новой карточки пользователем
function addNewCard(evt) {
  evt.preventDefault();
  const cardData = {
    name: cardName.value,
    link: cardUrl.value,
  };
  placesList.prepend(
    createCard(cardData, deleteCard, showPopupTypeImage, likeCard)
  );
  closePopup();
  document.forms.newPlace.reset();
}

popupTypeCard.addEventListener("submit", addNewCard);
