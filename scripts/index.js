/* variables */

/* popup */
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const popupOpen = document.querySelector('.profile-info__customization');
const popupHeading = document.querySelector('.popup__heading');
const popupBtn = document.querySelector('.popup__button');

const nameInput = document.querySelector('.popup__input_data_name');
const infoInput = document.querySelector('.popup__input_data_info');
const nameOutput = document.querySelector('.profile-info__name');
const infoOutput = document.querySelector('.profile-info__job');

/* popup for cards */
const popupOpenCard = document.querySelector('.profile__button');
const popupCard = document.querySelector('.card-popup');
const popupCloseCard = document.querySelector('.card-popup__close');
const popupHeadingCard = document.querySelector('.card-popup__heading');
const popupBtnCard = document.querySelector('.card-popup__button');

const cardList = document.querySelector('.cards');
const nameInputCard = document.querySelector('.card-popup__input_data_name');
const infoInputCard = document.querySelector('.card-popup__input_data_info');

/* popup with image */
const imgPopup = document.querySelector('.img-popup');
const imgClose = document.querySelector('.img-popup__close');
const imgPopupSrc = document.querySelector('.img-popup__image');
const imgPopupTxt = document.querySelector('.img-popup__subline');

/* for submit */
let formElement = document.querySelector('.popup__form');
let formElementCard = document.querySelector('.card-popup__form');

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

const ReversedCards = initialCards.reverse();


/* functions */

function addCard(item) {
    const cardTemplate = document.querySelector('.card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    const cardImg = cardElement.querySelector('.card__image');
    const cardTxt = cardElement.querySelector('.card__title');
    const cardLike = cardElement.querySelector('.card__like');
    const cardDelete = cardElement.querySelector('.card__delete-button');

    cardButtonsActive (cardImg, cardLike, cardDelete);

    cardImg.src = item.link;
    cardImg.alt = item.name;
    cardTxt.textContent = item.name;
    cardList.prepend(cardElement);
};

function cardButtonsActive (cardImg, cardLike, cardDelete) {
    cardImg.addEventListener('click', function() {
        if (imgPopup.classList.contains('img-popup_opened') === false) {
            imgPopup.classList.add('img-popup_opened');
            imgPopupSrc.src = cardImg.src;
            imgPopupSrc.alt = cardImg.alt;
            imgPopupTxt.textContent = cardImg.alt;
        }
    });

    cardLike.addEventListener('click', function(evt) {
        cardLike.classList.toggle('card__like_state_posted');
    });

    cardDelete.addEventListener('click', function() {
        const listItem = cardDelete.closest('.card');
        listItem.remove();
    });
};

ReversedCards.forEach(addCard);


/* Открытие / закрытие Pop-up с формой редактирования профиля */
const openPopup = () => {
    nameInput.value = nameOutput.textContent;
    infoInput.value = infoOutput.textContent;
    popup.classList.add('popup_opened');
}

function closePopup() {
    if (popup.classList.contains('popup_opened') === true) {
        popup.classList.remove('popup_opened');
    }
}

popup.onclick = function(evt) {
    if (evt.target === popup) {
        closePopup();
    };
};

/* Открытие / закрытие Pop-up с формой добавления карточки */
const openPopupCard = () => {
    nameInputCard.value = '';
    infoInputCard.value = '';
    popupCard.classList.add('card-popup_opened');
};

function closePopupCard() {
    if (popupCard.classList.contains('card-popup_opened') === true) {
        popupCard.classList.remove('card-popup_opened');
    }
}

popupCard.onclick = function(evt) {
    if (evt.target === popupCard) {
        closePopupCard();
    };
};


/* Открытие / закрытие Pop-up с картинкой */
function ImgPopupOpen () {
    if (imgPopup.classList.contains('img-popup_opened') === false) {
        imgPopup.classList.add('img-popup_opened');
    }
}

function imgPopupClose () {
    if (imgPopup.classList.contains('img-popup_opened') === true) {
        imgPopup.classList.remove('img-popup_opened');
    }
}

imgPopup.onclick = function(evt) {
    if (evt.target === imgPopup) {
        imgPopupClose();
    };
};


/* Действия по нажатию на submit в формах */
function formSubmitHandler (evt) {
    evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    infoOutput.textContent = infoInput.value;
    popup.classList.remove('popup_opened');
}
    
function formSubmitHandlerCard (evt) {
    evt.preventDefault();
    addCard({name: nameInputCard.value, link: infoInputCard.value});
    popupCard.classList.remove('card-popup_opened');
}


/* event listeners */
formElement.addEventListener('submit', formSubmitHandler);
formElementCard.addEventListener('submit', formSubmitHandlerCard);

popupOpen.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);

popupOpenCard.addEventListener('click', openPopupCard);
popupCloseCard.addEventListener('click', closePopupCard);

imgClose.addEventListener('click', imgPopupClose);