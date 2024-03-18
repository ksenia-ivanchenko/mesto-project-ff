export { showPopup, closePopup, closePopupWithMouse, renderLoading };

// функция появления модального окна
function showPopup(popupType, submitButtonText) {
  const submitButton = popupType.querySelector(".popup__button");

  submitButton.textContent = submitButtonText;
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

// функция отрисовки статуса загрузки для пользователя
function renderLoading(isLoading, button, buttonText) {
  if (isLoading) {
    button.textContent = buttonText;
  } else {
    button.textContent = "Готово!";
  }
}
