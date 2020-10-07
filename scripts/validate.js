
/* 
function createCard(item) {
    const cardTemplate = document.querySelector('.card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    const cardImg = cardElement.querySelector('.card__image');
    const cardTxt = cardElement.querySelector('.card__title');
    const cardLike = cardElement.querySelector('.card__like');
    const cardDelete = cardElement.querySelector('.card__delete-button');

    cardImg.src = item.link;
    cardImg.alt = item.name;
    cardTxt.textContent = item.name;

    cardImg.addEventListener('click', function() {
        if (imgPopup.classList.contains('popup_opened') === false) {
            openPopup(imgPopup)
            imgPopupSrc.src = cardImg.src;
            imgPopupSrc.alt = cardImg.alt;
            imgPopupTxt.textContent = cardImg.alt;
        }
    });

    cardLike.addEventListener('click', function() {
        cardLike.classList.toggle('card__like_state_posted');
    });

    cardDelete.addEventListener('click', function() {
        const listItem = cardDelete.closest('.card');
        listItem.remove();
    });
    return cardElement;
}; 


class Card {
  constructor(title, description, price, image) {
    this._title = title,
    this._description = description, 
    this._price = price, 
    this._image = image
  }
  
  _getTemplate() {
      const cardElement = document
      .querySelector('.horizontal-card')
      .content
      .querySelector('.card')
      .cloneNode(true);
      return cardElement;
  }

  generateCard() {
  // Запишем разметку в приватное поле _element. 
  // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners();

  // Добавим данные
    this._element.querySelector('.card__avatar').src = this._image;
    this._element.querySelector('.card__paragraph').textContent = this._text;

  // Вернём элемент наружу
    return this._element;
  }

  _handleMessageClick() {
    this._element.querySelector('.card__text').classList.toggle('card__text_is-active');
  }

  _setEventListeners() {
  this._element.querySelector('.card__text').addEventListener('click', () => {
    this._handleMessageClick();
  });

  messageList.forEach((item) => {
    // Создадим экземпляр карточки
    const card = new Card(item.text, item.image);
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();

    // Добавляем в DOM
    document.body.append(cardElement);
  });
}




function renderCard(cardList, cardElement) {
    cardList.prepend(cardElement);
};

ReversedCards.forEach((item) => {
    const cardElement = createCard(item);
    renderCard(cardList, cardElement);
}); 


*/

/* 
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


