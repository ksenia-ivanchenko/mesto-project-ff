import "../pages/index.css";
import { createCard, likeCard } from "../scripts/card.js";
import {
  showPopup,
  closePopup,
  closePopupWithMouse,
  renderLoading,
} from "../scripts/modal.js";
import { enableValidation, clearValidation } from "../scripts/validation.js";
import {
  allDataPromise,
  changeAvatarPromise,
  addNewCardPromise,
  editProfilePromise,
} from "../scripts/api.js";

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

const cardName = popupTypeCard.querySelector(".popup__input_type_card-name");
const cardUrl = popupTypeCard.querySelector(".popup__input_type_url");

const formEditProfile = popupTypeEdit.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const avatarInput = popupTypeAvatar.querySelector(".popup__input_type_avatar");

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
  showPopup(popupTypeImage, "Сохранить");

  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
}

// открытие модалок для редактирования профиля и добавления карточки
buttonOpenFormEditProfile.addEventListener("click", () => {
  clearValidation(popupTypeEdit, validationConfig);
  showPopup(popupTypeEdit, "Сохранить");
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

addNewCardButton.addEventListener("click", () => {
  showPopup(popupTypeCard, "Сохранить");
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
  renderLoading(true, submitButton, "Сохранение...");
  editProfilePromise(nameInput, jobInput)
    .then(() => {
      renderLoading(false, submitButton, "Сохранение...");
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
    })
    .finally(() => {
      closePopup(popupTypeEdit);
    });
}

formEditProfile.addEventListener("submit", submitEditProfileForm);

// добавление новой карточки пользователем
function addNewCard(evt) {
  evt.preventDefault();
  const submitButton = popupTypeCard.querySelector(".popup__button");
  renderLoading(true, submitButton, "Сохранение...");
  addNewCardPromise(cardName, cardUrl)
    .then((data) => {
      renderLoading(false, submitButton, "Сохранение...");
      const userId = data.owner._id;
      placesList.prepend(
        createCard(data, userId, showPopupTypeImage, likeCard)
      );
    })
    .finally(() => {
      forms.newPlace.reset();
      closePopup(popupTypeCard);
      clearValidation(forms.newPlace, validationConfig);
    });
}

popupTypeCard.addEventListener("submit", addNewCard);

// валидация форм
enableValidation(validationConfig);

// интеграция с апи
// отрисовываем всю страницу (карточки и информацию о профиле)
allDataPromise().then(([profileData, cardsData]) => {
  const userId = profileData._id;
  profileTitle.textContent = profileData.name;
  profileDescription.textContent = profileData.about;
  profileImage.style.backgroundImage = `url(${profileData.avatar})`;

  cardsData.forEach((cardData) => {
    placesList.append(
      createCard(cardData, userId, showPopupTypeImage, likeCard)
    );
  });
});

// функция изменения аватарки
function changeAvatar(evt) {
  evt.preventDefault();
  const submitButton = popupTypeAvatar.querySelector(".popup__button");
  renderLoading(true, submitButton, "Сохранение...");
  changeAvatarPromise(avatarInput)
    .then(() => {
      renderLoading(false, submitButton, "Сохранение...");
      profileImage.style.backgroundImage = `url(${avatarInput.value})`;
    })
    .finally(() => {
      forms.avatar.reset();
      closePopup(popupTypeAvatar);
      clearValidation(forms.avatar, validationConfig);
    });
}

//слушатели на изменение аватарки
profileImage.addEventListener("click", () => {
  showPopup(popupTypeAvatar, "Сохранить");
});
popupTypeAvatar.addEventListener("submit", changeAvatar);
