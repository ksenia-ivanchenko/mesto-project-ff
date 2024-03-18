import "../pages/index.css";
import { createCard, likeCard } from "../scripts/card.js";
import {
  showPopup,
  closePopup,
  closePopupWithMouse,
} from "../scripts/modal.js";
import { enableValidation, clearValidation } from "../scripts/validation.js";

const placesList = document.querySelector(".places__list");

const buttonOpenFormEditProfile = document.querySelector(
  ".profile__edit-button"
);
const addNewCardButton = document.querySelector(".profile__add-button");

const popups = document.querySelectorAll(".popup");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const formEditProfile = popupTypeEdit.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const avatarInput = popupTypeAvatar.querySelector(".popup__input_type_avatar");

const cardName = popupTypeCard.querySelector(".popup__input_type_card-name");
const cardUrl = popupTypeCard.querySelector(".popup__input_type_url");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const forms = document.forms;
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-type-error_active",
};

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

// открытие модалок для редактирования профиля и добавления карточки
buttonOpenFormEditProfile.addEventListener("click", () => {
  clearValidation(popupTypeEdit, validationConfig);
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
  const submitButton = popupTypeEdit.querySelector(".popup__button");
  renderLoading(true, submitButton);
  fetch("https://mesto.nomoreparties.co/v1/wff-cohort-8/users/me", {
    method: "PATCH",
    headers: {
      authorization: "278e847c-44dd-45b9-a59c-b2a0939f7aef",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  })
    .then((res) => res.json())
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
    })
    .finally(() => {
      renderLoading(false, submitButton);
      closePopup(popupTypeEdit);
    });
}

formEditProfile.addEventListener("submit", submitEditProfileForm);

// добавление новой карточки пользователем
function addNewCard(evt) {
  evt.preventDefault();
  const submitButton = popupTypeCard.querySelector(".popup__button");
  renderLoading(true, submitButton);
  fetch("https://mesto.nomoreparties.co/v1/wff-cohort-8/cards", {
    method: "POST",
    headers: {
      authorization: "278e847c-44dd-45b9-a59c-b2a0939f7aef",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardName.value,
      link: cardUrl.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const userId = data.owner._id;
      placesList.prepend(
        createCard(data, userId, showPopupTypeImage, likeCard)
      );
    })
    .finally(() => {
      renderLoading(false, submitButton);
      forms.newPlace.reset();
      closePopup(popupTypeCard);
      clearValidation(forms.newPlace, validationConfig);
    });
}

popupTypeCard.addEventListener("submit", addNewCard);

// валидация форм
enableValidation(validationConfig);

// интеграция с апи

// информация о пользователе
const fetchProfileData = fetch(
  "https://mesto.nomoreparties.co/v1/wff-cohort-8/users/me",
  {
    headers: {
      authorization: "278e847c-44dd-45b9-a59c-b2a0939f7aef",
    },
  }
)
  .then((res) => res.json())
  .catch((err) => {
    console.log("Ошибка. Запрос не выполнен: ", err);
  });

// карточки
const fetchCardsData = fetch(
  "https://mesto.nomoreparties.co/v1/wff-cohort-8/cards",
  {
    headers: {
      authorization: "278e847c-44dd-45b9-a59c-b2a0939f7aef",
    },
  }
)
  .then((res) => res.json())
  .catch((err) => {
    console.log("Ошибка. Запрос не выполнен: ", err);
  });

Promise.all([fetchProfileData, fetchCardsData]).then(
  ([profileData, cardsData]) => {
    const userId = profileData._id;
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileImage.style.backgroundImage = `url(${profileData.avatar})`;

    cardsData.forEach((cardData) => {
      placesList.append(
        createCard(cardData, userId, showPopupTypeImage, likeCard)
      );
    });
  }
);

function changeAvatar(evt) {
  evt.preventDefault();
  const submitButton = popupTypeAvatar.querySelector(".popup__button");
  renderLoading(true, submitButton);
  fetch("https://mesto.nomoreparties.co/v1/wff-cohort-8/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "278e847c-44dd-45b9-a59c-b2a0939f7aef",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarInput.value,
    }),
  })
    .then((res) => res.json())
    .then(() => {
      profileImage.style.backgroundImage = `url(${avatarInput.value})`;
    })
    .finally(() => {
      renderLoading(false, submitButton);
      forms.avatar.reset();
      closePopup(popupTypeAvatar);
      clearValidation(forms.avatar, validationConfig);
    });
}

profileImage.addEventListener("click", () => {
  showPopup(popupTypeAvatar);
});

popupTypeAvatar.addEventListener("submit", changeAvatar);

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Готово!";
  }
}
