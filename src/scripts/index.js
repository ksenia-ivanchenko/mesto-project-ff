import "../pages/index.css";
import { initialCards } from "../scripts/cards.js";
import { createCard, deleteCard, likeCard } from "../scripts/card.js";
import {
  showPopup,
  closePopup,
  closePopupWithMouse,
} from "../scripts/modal.js";

const placesList = document.querySelector(".places__list");

const buttonOpenFormEditProfile = document.querySelector(
  ".profile__edit-button"
);
const addNewCardButton = document.querySelector(".profile__add-button");

const popups = document.querySelectorAll(".popup");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const formEditProfile = popupTypeEdit.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const nameError = formEditProfile.querySelector(`.${nameInput.name}-error`);

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
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupTypeEdit);
}

formEditProfile.addEventListener("submit", submitEditProfileForm);

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
  forms.newPlace.reset();
  closePopup(popupTypeCard);
}

popupTypeCard.addEventListener("submit", addNewCard);

// валидация форм
// показываем текст ошибки, подсвечиваем поле, если все не ок
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add("popup__input-error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-type-error_active");
};

//убираем текст ошибки и подсветку поля, если все ок
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove("popup__input-error");
  errorElement.classList.remove("popup__input-type-error_active");
  errorElement.textContent = "";
};

//проверяем правильность заполнения
const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity("Поле может содержать только латинские и кириллические буквы, знаки дефиса и пробелы");
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//проверяем, есть ли невалидные инпуты, чтобы заблочить сабмит
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//функция включающая или отключающая сабмит
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button_inactive");
  }
};

//устанавливаем слушатели на все инпуты формы
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//отслеживаем сразу все формы на странице, чтобы на инпуты каждой из них повесить слушатели
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();
