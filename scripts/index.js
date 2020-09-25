/* variables */

/* popup for name / occupancy */
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const popupOpen = document.querySelector('.profile-info__customization');
const popupBtn = document.querySelector('.popup__button');

const form = document.forms.popupFormInfo;
const nameInput = form.elements.name;
const infoInput = form.elements.info;
const nameOutput = document.querySelector('.profile-info__name');
const infoOutput = document.querySelector('.profile-info__job');

/* popup for the cards */
const popupOpenCard = document.querySelector('.profile__button');
const popupCard = document.querySelector('.card-popup');
const popupCloseCard = document.querySelector('.card-popup__close');

const cardList = document.querySelector('.cards');
const formCard = document.forms.popupFormCard;
const nameInputCard = formCard.elements.place;
const infoInputCard = formCard.elements.url;

/* popup with an image */
const imgPopup = document.querySelector('.img-popup');
const imgClose = document.querySelector('.img-popup__close');
const imgPopupSrc = document.querySelector('.img-popup__image');
const imgPopupTxt = document.querySelector('.img-popup__subline');

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
    cardImg.src = item.link;
    cardImg.alt = item.name;
    cardTxt.textContent = item.name;
    cardList.prepend(cardElement);
};

function cardButtonsActive (evt) {
    if (evt.target.classList.contains('card__image') && imgPopup.classList.contains('img-popup_opened') === false) {
        imgPopup.classList.add('img-popup_opened');
        imgPopupSrc.src = evt.target.src;
        imgPopupSrc.alt = evt.target.alt;
        imgPopupTxt.textContent = evt.target.alt;
        document.addEventListener('keydown', closePopupWindow);

    } else if (evt.target.classList.contains('card__like')) {
        evt.target.classList.toggle('card__like_state_posted');
        
    } else if (evt.target.classList.contains('card__delete-button')) {
        const listItem = evt.target.closest('.card');
        listItem.remove();
    }
}

ReversedCards.forEach(addCard);


/* Открытие / закрытие Pop-up с формой редактирования профиля */
const openPopup = function() {
    nameInput.value = nameOutput.textContent;
    infoInput.value = infoOutput.textContent;
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupWindow);
}

function closePopup() {
    if (popup.classList.contains('popup_opened') === true) {
        popup.classList.remove('popup_opened');

    } else if (popupCard.classList.contains('card-popup_opened') === true) {
        popupCard.classList.remove('card-popup_opened');

    } else if (imgPopup.classList.contains('img-popup_opened') === true) {
        imgPopup.classList.remove('img-popup_opened');
    }
    document.removeEventListener('keydown', closePopupWindow);
}

const closePopupWindow = function(evt) {
    if (evt.target === popup || evt.target === popupCard || evt.target === imgPopup) {
      closePopup();
    } else if (evt.key === 'Escape') {
      closePopup();
    }
};

/* Открытие / закрытие Pop-up с формой добавления карточки */
const openPopupCard = function() {
    formCard.reset();
    const disableBtn = formCard.querySelector('.popup__button');
    disableBtn.disabled = true;
    disableBtn.classList.add('popup__button_disabled');
    popupCard.classList.add('card-popup_opened');
    document.addEventListener('keydown', closePopupWindow);
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

cardList.addEventListener('click', cardButtonsActive);

form.addEventListener('submit', formSubmitHandler);
formCard.addEventListener('submit', formSubmitHandlerCard);

popup.addEventListener('click', closePopupWindow);
popupCard.addEventListener('click', closePopupWindow);
imgPopup.addEventListener('click', closePopupWindow);

popupOpen.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);

popupOpenCard.addEventListener('click', openPopupCard);
popupCloseCard.addEventListener('click', closePopup);

imgClose.addEventListener('click', closePopup);