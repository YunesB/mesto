import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js';
import {Section} from './Section.js';
import {reversedCards, allSelectorClasses} from '../utils/constants.js';


/* variables */
const popupInfo = new PopupWithForm('popupInfo', handleFormSubmit);
const popupOpen = document.querySelector('.profile-info__customization');
const popupClose = document.getElementById('popupInfoClose');

const formInfo = document.forms.popupFormInfo;
const nameInput = formInfo.elements.name;
const infoInput = formInfo.elements.info;

const popupCard = new PopupWithForm('popupCard', handleFormSubmitCard);
const popupOpenCard = document.querySelector('.profile__button');
const popupCloseCard = document.getElementById('popupCardClose');

const formCard = document.forms.popupFormCard;
const nameInputCard = formCard.elements.place;
const infoInputCard = formCard.elements.url;

const infoUser = new UserInfo({
    name: '.profile-info__name',
    info: '.profile-info__job'
});

const popupImage = new PopupWithImage('popupImg');
export const imgPopup = document.getElementById('popupImg');
const imgClose = document.getElementById('popupImgClose');

/* functions */
/* Загрузка начальных карточек */
const cardsList = new Section({
    data: reversedCards,
    renderer: (data) => {
        const card = new Card({
            data,
            externalHandler: (img, title) => popupImage.open(img, title)}, 
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

function errorRemover({
    firstErrorSelector, 
    secondErrorSelector,
    firstInputSelector,
    secondInputSelector
}) {
    const inputErrorPlace = document.getElementById(firstErrorSelector);
    const inputErrorUrl = document.getElementById(secondErrorSelector);
    removeError(inputErrorPlace, firstInputSelector);
    removeError(inputErrorUrl, secondInputSelector);
}

export const enableSubmitButton = function (button, selector) {
    button.classList.remove(selector);
    button.disabled = false;
};

export const disableSubmitButton = function (button, selector) {
    button.classList.add(selector);
    button.disabled = true;
};

const validation = (data, form) => {
    const validate = new FormValidator(data);
    validate.enableValidation(form);
};

/* Действия по нажатию на submit в формах */
function handleFormSubmit (data) {
    infoUser.setUserInfo(data);
    popupInfo.close();
};
    
function handleFormSubmitCard () {
    const card = new Card({
        data: {
            name: nameInputCard.value, 
            link: infoInputCard.value
        },
        externalHandler: (img, title) => popupImage.open(img, title)}, 
        ".card-template");
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
    popupCard.close();
};

/* Вызов функции валидации форм */
validation(allSelectorClasses, formInfo);
validation(allSelectorClasses, formCard);


/* event listeners */
popupOpen.addEventListener('click', function () {
    errorRemover({
        firstErrorSelector: (`name-input-error`),
        secondErrorSelector: (`data-input-error`),
        firstInputSelector: nameInput,
        secondInputSelector: infoInput
    });
    const userData = infoUser.getUserInfo();
    nameInput.value = userData.name;
    infoInput.value = userData.info;

    const submitBtn = formInfo.querySelector('.popup__button');
    enableSubmitButton(submitBtn, allSelectorClasses.inactiveButtonClass);

    openPopup(popupInfo);

});
popupClose.addEventListener('click', function () {closePopup(popupInfo)});

popupOpenCard.addEventListener('click', function () {
    errorRemover({
        firstErrorSelector: (`place-input-error`),
        secondErrorSelector: (`url-input-error`),
        firstInputSelector: nameInputCard,
        secondInputSelector: infoInputCard
    });

    nameInputCard.value = '';
    infoInputCard.value = '';

    const submitBtn = formCard.querySelector('.popup__button');
    disableSubmitButton(submitBtn, allSelectorClasses.inactiveButtonClass);

    openPopup(popupCard);
});
popupCloseCard.addEventListener('click', function () {closePopup(popupCard)});

imgClose.addEventListener('click', function () {closePopup(popupImage)});
