const allSelectorClasses = {
  formSelector: '.popup__form',
  setSelector: '.popup__set',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_data_error',
  errorClass: 'popup__error_visible'
};

/* Показ / скрытие сообщения об ошибке */
const showInputError = (formElement, inputElement, errorMessage, allClasses) => {
  const inputError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(allClasses.inputErrorClass);
  inputError.textContent = errorMessage;
  inputError.classList.add(allClasses.errorClass);
}

const hideInputError = (formElement, inputElement, allClasses) => {
  const inputError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(allClasses.inputErrorClass);
  inputError.classList.remove(allClasses.errorClass);
  inputError.textContent = "";
}

/* Проверка данных на валидность */
const checkInputValidity = (formElement, inputElement, allClasses) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, allClasses);
  } else {
    hideInputError(formElement, inputElement, allClasses);
  }
};

/* Добавление слушателей событий на поля ввода */
const setEventListeners = (formElement, allClasses) => {
  const inputList = Array.from(formElement.querySelectorAll(allClasses.inputSelector));
  const submitButtonElement = formElement.querySelector(allClasses.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, allClasses);
      toggleButtonState(inputList, submitButtonElement, allClasses);
    });
  });
}; 

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

/* Переключение классов для кнопки "submit" */
const toggleButtonState = (inputList, submitButtonElement, allClasses) => {
  if (hasInvalidInput(inputList)) {
    submitButtonElement.classList.add(allClasses.inactiveButtonClass);
    submitButtonElement.disabled = true;
  } else {
    submitButtonElement.classList.remove(allClasses.inactiveButtonClass);
    submitButtonElement.disabled = false;
  }
};

/* Функция валидации форм */
const enableValidation = (allClasses) => {
  const formList = Array.from(document.querySelectorAll(allClasses.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
      const fieldsetList = Array.from(formElement.querySelectorAll(allClasses.setSelector));
      fieldsetList.forEach((fieldSet) => {
        setEventListeners(fieldSet, allClasses);
      });
  });
};

/* Вызов функции валидации форм */
enableValidation(allSelectorClasses);