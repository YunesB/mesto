import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js';
import {Section} from './Section.js';


/* variables */
/* Pop-up для добавления информации о себе */
const popupInfo = document.getElementById('popupInfo');
const popupOpen = document.querySelector('.profile-info__customization');
const popupClose = document.getElementById('popupInfoClose');

const formInfo = document.forms.popupFormInfo;
const nameInput = formInfo.elements.name;
const infoInput = formInfo.elements.info;

/* Pop-up для добавления карточки */
const popupOpenCard = document.querySelector('.profile__button');
const popupCloseCard = document.getElementById('popupCardClose');

const formCard = document.forms.popupFormCard;
const nameInputCard = formCard.elements.place;
const infoInputCard = formCard.elements.url;

/* Pop-up с картинкой */
export const imgPopup = document.getElementById('popupImg');
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
const cardsList = new Section({
    data: reversedCards,
    renderer: (data) => {
        const card = new Card({
            data,
            externalHandler: (img, title) => openImage.open(img, title)}, 
            ".card-template");
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
      },
    },
'.cards');

cardsList.renderItems()

/* Общие функции для Pop-up */
export function openPopup(popup) {
    popup.open();
    popup.setEventListeners();
};

function closePopup(popup) {
    popup.close();
}; 

function removeError(input, output) {
    input.textContent ='';
    output.classList.remove('popup__input_data_error');
};

/* Открытие Pop-up с формой добавления карточки */


/* Открытие Pop-up с формой редактирования профиля */
const submitPopupInfo = () => {
    const infoSubmit = document.getElementById('infoSubmit');
    enableSubmitButton(infoSubmit, allSelectorClasses.inactiveButtonClass);
    nameInput.value = nameOutput.textContent;
    infoInput.value = infoOutput.textContent;
}

export const enableSubmitButton = function (button, selector) {
    button.classList.remove(selector);
    button.disabled = false;
};

export const disableSubmitButton = function (button, selector) {
    button.classList.add(selector);
    button.disabled = true;
};

/* Действия по нажатию на submit в формах */
function handleFormSubmit (data) {
    infoUser.setUserInfo(data);
    openInfo.close();
};
    
function handleFormSubmitCard () {
    const card = new Card({
        data: {name: nameInputCard.value, link: infoInputCard.value},
        externalHandler: (img, title) => openImage.open(img, title)}, 
        ".card-template");
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
    openCard.close();
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


popupOpen.addEventListener('click', function () {
    openPopup(openInfo, submitPopupInfo);
    const inputErrorName = document.getElementById(`name-input-error`);
    const inputErrorData = document.getElementById(`data-input-error`);
    removeError(inputErrorName, nameInput);
    removeError(inputErrorData, infoInput);
    const userData = infoUser.getUserInfo();
    nameInput.value = userData.name;
    infoInput.value = userData.info;
});
popupClose.addEventListener('click', function () {closePopup(openInfo)});

popupOpenCard.addEventListener('click', function () {
    const inputErrorPlace = document.getElementById(`place-input-error`);
    const inputErrorUrl = document.getElementById(`url-input-error`);
    removeError(inputErrorPlace, nameInputCard);
    removeError(inputErrorUrl, infoInputCard);

    const disableBtn = formCard.querySelector('.popup__button');
    disableSubmitButton(disableBtn, allSelectorClasses.inactiveButtonClass);

    openPopup(openCard);
});
popupCloseCard.addEventListener('click', function () {closePopup(openCard)});

imgClose.addEventListener('click', function () {closePopup(openImage)});


const openImage = new PopupWithImage('popupImg');
const openInfo = new PopupWithForm('popupInfo', handleFormSubmit);
const openCard = new PopupWithForm('popupCard', handleFormSubmitCard);
const infoUser = new UserInfo({
    name: '.profile-info__name',
    info: '.profile-info__job'
});



/*
const openPopupInfo = function() {
    formInfo.reset();
    const inputErrorName = document.getElementById(`name-input-error`);
    const inputErrorData = document.getElementById(`data-input-error`);
    removeError(inputErrorName, nameInput);
    removeError(inputErrorData, infoInput);

    const infoSubmit = document.getElementById('infoSubmit');
    enableSubmitButton(infoSubmit, allSelectorClasses.inactiveButtonClass);

    nameInput.value = nameOutput.textContent;
    infoInput.value = infoOutput.textContent;
    openPopup(popupInfo);
};

const openPopupCard = function() {
    const inputErrorPlace = document.getElementById(`place-input-error`);
    const inputErrorUrl = document.getElementById(`url-input-error`);
    removeError(inputErrorPlace, nameInputCard);
    removeError(inputErrorUrl, infoInputCard);

    formCard.reset();
    const disableBtn = formCard.querySelector('.popup__button');
    disableSubmitButton(disableBtn, allSelectorClasses.inactiveButtonClass);
    openPopup(popupCard)
};

const popupCard = document.getElementById('popupCard');
formInfo.addEventListener('submit', handleFormSubmit);
formCard.addEventListener('submit', handleFormSubmitCard);
*/
