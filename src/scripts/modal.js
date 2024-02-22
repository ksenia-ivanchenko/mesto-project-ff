export { showPopup, closePopup, showPopupTypeImage };
import { popupTypeImage } from "../scripts/index.js";

// функция появления модального окна
function showPopup(popupType) {
  popupType.classList.add("popup_is-opened");
}

// функция закрытия модального окна
function closePopup() {
  const openedPopup = document.querySelector(".popup_is-opened");
  openedPopup.classList.remove("popup_is-opened");
}

// функция отрисовки попапа для картинок
function showPopupTypeImage(cardData) {
  showPopup(popupTypeImage);

  document.querySelector(".popup__image").src = cardData.link;
  document.querySelector(".popup__image").alt = cardData.name;
  document.querySelector(".popup__caption").textContent = cardData.name;
  popupTypeImage.style.backgroundColor = "rgba(0, 0, 0, .9)";
}
