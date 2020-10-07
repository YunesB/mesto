const allSelectorClasses = {
  formSelector: '.popup__form',
  setSelector: '.popup__set',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_data_error',
  errorClass: 'popup__error_visible'
};

class FormValidator {
  constructor(data) {
      this._form = data.formSelector,
      this._set = data.setSelector, 
      this._input = data.inputSelector,
      this._button = data.submitButtonSelector,
      this._buttonClass = data.inactiveButtonClass,
      this._inputErrorClass = data.inputErrorClass,
      this._errorClass = data.errorClass
  }

  _showInputError(form, input, errorMessage) {
    const inputError = form.querySelector(`#${input.id}-error`);
    console.log(inputError);
    input.classList.add(this._inputErrorClass);
    inputError.textContent = errorMessage;
    inputError.classList.add(this._errorClass);
  }

  _hideInputError(form, input) {
    const inputError = form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    inputError.classList.remove(this._errorClass);
    inputError.textContent = "";
  }

  _checkInputValidity(form, input) {
    if (!input.validity.valid) {
      this._showInputError(form, input, input.validationMessage);
    } else {
      this._hideInputError(form, input);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    })
  }; 

  _toggleButtonState(inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(this._buttonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._buttonClass);
      button.disabled = false;
    }
  };

  enableValidation = (form) => {
    form.querySelector('.popup__button').addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    this._setEventListeners(form);
  };

  _setEventListeners(form) {
    const inputList = Array.from(form.querySelectorAll(this._input));
    const submitButtonElement = form.querySelector(this._button);
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(form, input);
        this._toggleButtonState(inputList, submitButtonElement);
      });
    });
  };

}

const formInfo = document.getElementById('popupFormInfo');
const formCard = document.getElementById('popupFormCard');

const validation = (data, form) => {
  const validate = new FormValidator(data);
  validate.enableValidation(form);
};

validation(allSelectorClasses, formInfo);
validation(allSelectorClasses, formCard);









/* Проверка данных на валидность 
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


const checkInputValidity = (formElement, inputElement, allClasses) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, allClasses);
  } else {
    hideInputError(formElement, inputElement, allClasses);
  }
};


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


const toggleButtonState = (inputList, submitButtonElement, allClasses) => {
  if (hasInvalidInput(inputList)) {
    submitButtonElement.classList.add(allClasses.inactiveButtonClass);
    submitButtonElement.disabled = true;
  } else {
    submitButtonElement.classList.remove(allClasses.inactiveButtonClass);
    submitButtonElement.disabled = false;
  }
};


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

*/

/* Вызов функции валидации форм */
/* Добавление слушателей событий на поля ввода */
/* Функция валидации форм */
/* Переключение классов для кнопки "submit" */
/* Показ / скрытие сообщения об ошибке */