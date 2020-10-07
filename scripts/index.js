import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';


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
export const imgPopup = document.getElementById('popupImg');
export const imgPopupSrc = imgPopup.querySelector('.popup__image');
export const imgPopupTxt = imgPopup.querySelector('.popup__img-subline');
const imgClose = document.getElementById('popupImgClose');

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

const allSelectorClasses = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_data_error',
    errorClass: 'popup__error_visible'
};


/* functions */
/* Общие функции для карточек */
reversedCards.forEach((item) => {
    const card = new Card(item);
    const cardElement = card.generateCard();
    cardList.prepend(cardElement);
});

/* Общие функции для Pop-up */
export function openPopup(popup) {
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

/* Общая функция валидации форм */
const validation = (data, form) => {
    const validate = new FormValidator(data);
    validate.enableValidation(form);
};

/* Вызов функции валидации форм */
validation(allSelectorClasses, formInfo);
validation(allSelectorClasses, formCard);


/* event listeners */
formInfo.addEventListener('submit', handleFormSubmit);
formCard.addEventListener('submit', handleFormSubmitCard);

popupOpen.addEventListener('click', openPopupInfo);
popupClose.addEventListener('click', function () {closePopup(popupInfo)});

popupOpenCard.addEventListener('click', openPopupCard);
popupCloseCard.addEventListener('click', function () {closePopup(popupCard)});

imgClose.addEventListener('click', function () {closePopup(imgPopup)});