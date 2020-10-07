/* variables */
/* Pop-up для добавления информации о себе */
const popupList = document.querySelectorAll('.popup')
const popupInfo = document.getElementById('popupInfo');
const popupOpen = document.querySelector('.profile-info__customization');
const popupClose = document.getElementById('popupInfoClose');

const formInfo = document.forms.popupFormInfo;
const nameInput = formInfo.elements.name;
const infoInput = formInfo.elements.info;
const nameOutput = document.querySelector('.profile-info__name');
const infoOutput = document.querySelector('.profile-info__job');

/* Pop-up для добавления карточки */
const popupCard = document.getElementById('popupCard');
const popupOpenCard = document.querySelector('.profile__button');
const popupCloseCard = document.getElementById('popupCardClose');

const cardList = document.querySelector('.cards');
const formCard = document.forms.popupFormCard;
const nameInputCard = formCard.elements.place;
const infoInputCard = formCard.elements.url;

/* Pop-up с картинкой */
const imgPopup = document.getElementById('popupImg');
const imgClose = document.getElementById('popupImgClose');
const imgPopupSrc = imgPopup.querySelector('.popup__image');
const imgPopupTxt = imgPopup.querySelector('.popup__img-subline');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const reversedCards = initialCards.reverse();

/* functions */
/* Общие функции для карточек */

class Card {
    constructor(data) {
        this._title = data.name,
        this._image = data.link
    }

    _getTemplate() {
        const cardElement = document
        .querySelector('.card-template')
        .content
        .querySelector('.card')
        .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.card__title').textContent = this._title;
        const cardImg = this._element.querySelector('.card__image');
        cardImg.src = this._image;
        cardImg.alt = this._title;

        return this._element;
    }

    _handleLikeClick() {
        this._element.querySelector('.card__like').classList.toggle('card__like_state_posted');
    }

    _handleDltClick() {
        const listItem = this._element.querySelector('.card__delete-button').closest('.card');
        listItem.remove();
    }

    _handleImageClick() {
        if (imgPopup.classList.contains('popup_opened') === false) {
            openPopup(imgPopup)
            imgPopupSrc.src = this._image;
            imgPopupSrc.alt = this._title;
            imgPopupTxt.textContent = this._title;
        }
    }

    _setEventListeners() {
        this._element.querySelector('.card__like').addEventListener('click', () => {
            this._handleLikeClick();
        });
        this._element.querySelector('.card__delete-button').addEventListener('click', () => {
            this._handleDltClick();
        });
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleImageClick();
        });
    }
}

reversedCards.forEach((item) => {
    const card = new Card(item);
    const cardElement = card.generateCard();
    cardList.prepend(cardElement);
});

/* Общие функции для Pop-up */
function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', handlePopupClosing)
    document.addEventListener('keydown', handlePopupClosingEsc);
};

function closePopup(popup) {
    popup.removeEventListener('click', handlePopupClosing)
    document.removeEventListener('keydown', handlePopupClosingEsc);
    popup.classList.remove('popup_opened');
}; 

function removeError(input, output) {
    input.textContent ='';
    output.classList.remove('popup__input_data_error');
};

function handlePopupClosing (evt) {
    if (!evt.target.closest('.popup__container' || '.popup__img-container')) {
        closePopup(evt.target);
    }
};

function handlePopupClosingEsc (evt) {
    if (evt.key === "Escape") {
        popupList.forEach((popup) => {
            if (popup.classList.contains('popup_opened')) {
                closePopup(popup);
            }
        });
    };
};

/* Открытие Pop-up с формой добавления карточки */
const openPopupCard = function() {
    const inputErrorPlace = document.getElementById(`place-input-error`);
    const inputErrorUrl = document.getElementById(`url-input-error`);
    removeError(inputErrorPlace, nameInputCard);
    removeError(inputErrorUrl, infoInputCard);

    formCard.reset();
    const disableBtn = formCard.querySelector('.popup__button');
    disableBtn.disabled = true;
    disableBtn.classList.add('popup__button_disabled');
    openPopup(popupCard)
};

/* Открытие Pop-up с формой редактирования профиля */
const openPopupInfo = function() {
    formInfo.reset();
    const inputErrorName = document.getElementById(`name-input-error`);
    const inputErrorData = document.getElementById(`data-input-error`);
    removeError(inputErrorName, nameInput);
    removeError(inputErrorData, infoInput);

    const infoSubmit = document.getElementById('infoSubmit');
    infoSubmit.classList.remove('popup__button_disabled');
    infoSubmit.disabled = false;

    nameInput.value = nameOutput.textContent;
    infoInput.value = infoOutput.textContent;
    openPopup(popupInfo);
};

/* Действия по нажатию на submit в формах */
function handleFormSubmit (evt) {
    evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    infoOutput.textContent = infoInput.value;
    closePopup(popupInfo);
};
    
function handleFormSubmitCard (evt) {
    evt.preventDefault();
    const cardItem = ({name: nameInputCard.value, link: infoInputCard.value});
    const card = new Card(cardItem);
    const cardElement = card.generateCard();
    cardList.prepend(cardElement);
    closePopup(popupCard);
};

/* event listeners */
formInfo.addEventListener('submit', handleFormSubmit);
formCard.addEventListener('submit', handleFormSubmitCard);

popupOpen.addEventListener('click', openPopupInfo);
popupClose.addEventListener('click', function () {closePopup(popupInfo)});

popupOpenCard.addEventListener('click', openPopupCard);
popupCloseCard.addEventListener('click', function () {closePopup(popupCard)});

imgClose.addEventListener('click', function () {closePopup(imgPopup)});




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