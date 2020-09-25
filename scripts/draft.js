/*

const showInputError = (formSelector, inputSelector, errorMessage) => {
  const inputErrorClass = formSelector.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.add('popup__input_data_error');
  inputErrorClass.textContent = errorMessage;
  inputErrorClass.classList.add('popup__input-error_active');
};

const hideInputError = (formSelector, inputSelector) => {
  const inputErrorClass = formSelector.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.remove('popup__input_data_error');
  inputErrorClass.classList.remove('popup__input-error_active');
  inputErrorClass.textContent = '';
}; 

const isValid = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(formSelector, inputSelector);
  }
};

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

form.addEventListener('input', isValid);

const setEventListeners = (formSelector) => {
  const inputList = Array.from(formSelector.querySelectorAll('.popup__input'));
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      isValid(formSelector, inputSelector)
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formSelector);
  });
};

enableValidation(); 

/*
const hasInvalidInput = (inputList) => {
// проходим по этому массиву методом some
return inputList.some((inputSelector) => {
      // Если поле не валидно, колбэк вернёт true
  // Обход массива прекратится и вся фунцкция
  // hasInvalidInput вернёт true

  return !inputSelector.validity.valid;
})
};

const toggleButtonState = (inputList, submitButtonSelector) => {
// Если есть хотя бы один невалидный инпут
if (hasInvalidInput(inputList)) {
  // сделай кнопку неактивной
  submitButtonSelector.classList.add('form__submit_inactive');
} else {
      // иначе сделай кнопку активной
  submitButtonSelector.classList.remove('form__submit_inactive');
}
};

const setEventListeners = (formSelector) => {
  // Найдём все поля формы и сделаем из них массив
const inputList = Array.from(formSelector.querySelectorAll(`.form__input`));
  // Найдём в текущей форме кнопку отправки
const submitButtonSelector = formSelector.querySelector('.form__submit');

inputList.forEach((inputSelector) => {
  inputSelector.addEventListener('input', () => {
    isValid(formSelector, inputSelector);

          // Вызовем toggleButtonState и передадим ей массив полей и кнопку
    toggleButtonState(inputList, submitButtonSelector);
  });
});
};

/*

// Вынесем все необходимые элементы формы в константы
const formSelector = document.querySelector('.form');
const formInput = formSelector.querySelector('.form__input');

// Функция, которая добавляет класс с ошибкой
const showInputError = (element) => {
  element.classList.add('popup__input_data_error');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (element) => {
  element.classList.remove('form__input_data_error');
};

// Функция, которая проверяет валидность поля
const isValid = () => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formInput);
  } else {
    // Если проходит, скроем
    hideInputError(formInput);
  }
};
 
formSelector.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault();
});

// Вызовем функцию isValid на каждый ввод символа
formInput.addEventListener('input', isValid);


const setEventListeners = (formSelector) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formSelector.querySelectorAll('.form__input'));
  
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputSelector) => {
      // каждому полю добавим обработчик события input
      inputSelector.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(formSelector, inputSelector)
      });
    });
  };

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputSelector) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputSelector.validity.valid;
  })
};

const toggleButtonState = (inputList, submitButtonSelector) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    submitButtonSelector.classList.add('form__submit_inactive');
  } else {
        // иначе сделай кнопку активной
    submitButtonSelector.classList.remove('form__submit_inactive');
  }
};

const setEventListeners = (formSelector) => {
    // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(formSelector.querySelectorAll(`.form__input`));
    // Найдём в текущей форме кнопку отправки
  const submitButtonSelector = formSelector.querySelector('.form__submit');

  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      isValid(formSelector, inputSelector);

            // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, submitButtonSelector);
    });
  });
};

  */

  /*
enableValidation ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_data_error',
    errorClass: 'popup__error_visible',
  }); */