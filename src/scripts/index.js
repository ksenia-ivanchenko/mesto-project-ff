import "../pages/index.css";
import { initialCards } from "../scripts/cards.js";
import { createCard, deleteCard, likeCard } from "../scripts/card.js";
import {
  showPopup,
  closePopup,
  popups,
  closePopupWithMouse,
} from "../scripts/modal.js";

const placesList = document.querySelector(".places__list");

const buttonOpenFormEditProfile = document.querySelector(
  ".profile__edit-button"
);
const addNewCardButton = document.querySelector(".profile__add-button");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const formEditProfile = document.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);

const cardName = popupTypeCard.querySelector(".popup__input_type_card-name");
const cardUrl = popupTypeCard.querySelector(".popup__input_type_url");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const forms = document.forms;

// анимируем появление/исчезание модалок
for (const popup of popups) {
  popup.classList.add("popup_is-animated");
}

// функция отрисовки попапа для картинок
function showPopupTypeImage(cardData) {
  showPopup(popupTypeImage);

  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
}

// для каждого элемента объекта карточек создаем карточку и добавляем на страницу
initialCards.forEach((cardData) => {
  placesList.append(
    createCard(cardData, deleteCard, showPopupTypeImage, likeCard)
  );
});

// открытие модалок для редактирования профиля и добавления карточки
buttonOpenFormEditProfile.addEventListener("click", () => {
  showPopup(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

addNewCardButton.addEventListener("click", () => {
  showPopup(popupTypeCard);
});

// закрытие попапа кликом по оверлею
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    closePopupWithMouse(evt);
  });
});

// закрытие модалок по кнопке крестик
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  });
});

// редактирование данных профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  const openedPopup = document.querySelector(".popup_is-opened");
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(openedPopup);
}

formEditProfile.addEventListener("submit", handleFormSubmit);

// добавление новой карточки пользователем
function addNewCard(evt) {
  evt.preventDefault();
  const openedPopup = document.querySelector(".popup_is-opened");
  const cardData = {
    name: cardName.value,
    link: cardUrl.value,
  };
  placesList.prepend(
    createCard(cardData, deleteCard, showPopupTypeImage, likeCard)
  );
  forms.newPlace.reset();
  closePopup(openedPopup);
}

popupTypeCard.addEventListener("submit", addNewCard);