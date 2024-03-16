export { enableValidation, clearValidation };

// показываем текст ошибки, подсвечиваем поле, если все не ок
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfigObject
) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(validationConfigObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfigObject.errorClass);
};

//убираем текст ошибки и подсветку поля, если все ок
const hideInputError = (formElement, inputElement, validationConfigObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(validationConfigObject.inputErrorClass);
  errorElement.classList.remove(validationConfigObject.errorClass);
  errorElement.textContent = "";
};

//проверяем правильность заполнения
const isValid = (formElement, inputElement, validationConfigObject) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfigObject
    );
  } else {
    hideInputError(formElement, inputElement, validationConfigObject);
  }
};

//проверяем, есть ли невалидные инпуты, чтобы заблочить сабмит
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//функция включающая или отключающая сабмит
const toggleButtonState = (
  inputList,
  buttonElement,
  validationConfigObject
) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfigObject.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfigObject.inactiveButtonClass);
  }
};

//устанавливаем слушатели на все инпуты формы
const setEventListeners = (formElement, validationConfigObject) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfigObject.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfigObject.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfigObject);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationConfigObject);
      toggleButtonState(inputList, buttonElement, validationConfigObject);
    });
  });
};

//отслеживаем сразу все формы на странице, чтобы на инпуты каждой из них повесить слушатели
const enableValidation = (validationConfigObject) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfigObject.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfigObject);
  });
};

const clearValidation = (profileForm, validationConfigObject) => {
};
