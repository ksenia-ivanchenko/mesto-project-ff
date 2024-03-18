export { showPopup, closePopup, closePopupWithMouse };

// функция появления модального окна
function showPopup(popupType) {
  popupType.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupWithEsc);
}

// закрытие кликом по оверлею
function closePopupWithMouse(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.target === evt.currentTarget) {
    closePopup(openedPopup);
  }
}

//закрытие ескейпом
function closePopupWithEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

// функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupWithEsc);
}
