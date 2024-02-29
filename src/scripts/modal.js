export {
  showPopup,
  closePopup,
  popups,
  closePopupWithMouse,
};

const popups = document.querySelectorAll(".popup");

// функция появления модального окна
function showPopup(popupType) {
  popupType.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupWithEsc);
}

// закрытие кликом по оверлею
function closePopupWithMouse(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.target === openedPopup) {
    closePopup(openedPopup);
  }
}

//закрытие ескейпом
function closePopupWithEsc (evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    closePopup(openedPopup);
  }
};

// функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupWithEsc);
}
