export class FormValidator {
    constructor(data, form) {
        this._form = form,
        this._input = data.inputSelector,
        this._button = data.submitButtonSelector,
        this._buttonClass = data.inactiveButtonClass,
        this._inputErrorClass = data.inputErrorClass,
        this._errorClass = data.errorClass
    }

    enableSubmitButton (button, selector) {
      button.classList.remove(selector);
      button.disabled = false;
    };
  
    disableSubmitButton (button, selector) {
      button.classList.add(selector);
      button.disabled = true;
    };
  
    /* Показ / скрытие сообщения об ошибке */
    _showInputError(form, input, errorMessage) {
      const inputError = form.querySelector(`#${input.id}-error`);
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
  
    /* Проверка данных на валидность */
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
  
    /* Переключение классов для кнопки "submit" */
    _toggleButtonState(inputList, button) {
      if (this._hasInvalidInput(inputList)) {
        this.disableSubmitButton(button, this._buttonClass);
      } else {
        this.enableSubmitButton(button, this._buttonClass);
      }
    };
  
    /* Функция валидации форм */
    enableValidation(form) {
      form.querySelector('.popup__button').addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
  
      this._setEventListeners(form);
    };
  
    /* Добавление слушателей событий на поля ввода */
    _setEventListeners(form) {
      const inputList = Array.from(form.querySelectorAll(this._input));
      const submitButtonElement = form.querySelector(this._button);
      inputList.forEach((input) => {
        input.addEventListener('input', () => {
          this._checkInputValidity(form, input);
          this._toggleButtonState(inputList, submitButtonElement);
        });
      });
    }

    _removeError(input, output) {
      input.textContent ='';
      output.classList.remove('popup__input_data_error');
    };
  
    errorRemover({
      firstErrorSelector, 
      secondErrorSelector,
      firstInputSelector,
      secondInputSelector
    }) {
      const inputErrorPlace = document.getElementById(firstErrorSelector);
      const inputErrorUrl = document.getElementById(secondErrorSelector);
      this._removeError(inputErrorPlace, firstInputSelector);
      this._removeError(inputErrorUrl, secondInputSelector);
    }
}