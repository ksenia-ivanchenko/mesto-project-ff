export { showPopup, closePopup, showPopupTypeImage };
import { popupTypeImage, popups } from "../scripts/index.js";

const popupCloseButtons = document.querySelectorAll(".popup__close");

// функция появления модального окна
function showPopup(popupType) {
  popupType.classList.add("popup_is-opened");
  popups.forEach((popup) => {
    popup.addEventListener("click", closePopupWithMouse);
  });
  document.addEventListener("keydown", closePopupWithEsc);
}

const closePopupWithMouse = (evt) => {
  popups.forEach((popup) => {
    if (evt.target === popup) {
      closePopup();
    }
  });
};

const closePopupWithEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup();
  }
};

// закрытие модалок по кнопке крестик
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", closePopup);
});

// функция закрытия модального окна
function closePopup() {
  const openedPopup = document.querySelector(".popup_is-opened");
  openedPopup.classList.remove("popup_is-opened");
  popups.forEach((popup) => {
    popup.removeEventListener("click", closePopupWithMouse);
  });
  document.removeEventListener("keydown", closePopupWithEsc);
}

// функция отрисовки попапа для картинок
function showPopupTypeImage(cardData) {
  showPopup(popupTypeImage);

  document.querySelector(".popup__image").src = cardData.link;
  document.querySelector(".popup__image").alt = cardData.name;
  document.querySelector(".popup__caption").textContent = cardData.name;
  popupTypeImage.style.backgroundColor = "rgba(0, 0, 0, .9)";
}
