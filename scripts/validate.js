const showInputError = (formSelector, inputSelector, errorMessage) => {
  const inputErrorClass = formSelector.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.add('popup__input_data_error');
  inputErrorClass.textContent = errorMessage;
  inputErrorClass.classList.add('popup__error_visible');
}

const hideInputError = (formSelector, inputSelector) => {
  const inputErrorClass = formSelector.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.remove('popup__input_data_error');
  inputErrorClass.classList.remove('popup__error_visible');
  inputErrorClass.textContent = "";
}

const checkInputValidity = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(formSelector, inputSelector);
  }
};

const setEventListeners = (formSelector) => {
  const inputList = Array.from(formSelector.querySelectorAll('.popup__input'));
  const submitButtonSelector = formSelector.querySelector('.popup__button');
  
  //toggleButtonState(inputList, submitButtonSelector);//

  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      checkInputValidity(formSelector, inputSelector);
      toggleButtonState(inputList, submitButtonSelector);
    });
  });
}; 

const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  })
}; 

const toggleButtonState = (inputList, submitButtonSelector) => {
  if (hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add('popup__button_disabled');
    submitButtonSelector.disabled = true;
  } else {
    submitButtonSelector.classList.remove('popup__button_disabled');
    submitButtonSelector.disabled = false;
  }
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
      const fieldsetList = Array.from(formSelector.querySelectorAll('.popup__set'));
      fieldsetList.forEach((fieldSet) => {
        setEventListeners(fieldSet);
      });
  });
};

enableValidation ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_data_error',
  errorClass: 'popup__error_visible',
}); 