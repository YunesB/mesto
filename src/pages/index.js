import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Section} from '../components/Section.js';
import {reversedCards, allSelectorClasses} from '../utils/constants.js';

import {popupOpen, formInfo, nameInput, 
    infoInput, popupOpenCard, formCard, 
    nameInputCard, infoInputCard} 
    from '../utils/constants.js';


/* Создание эксземляров класса */
const popupInfo = new PopupWithForm('popupInfo', handleFormSubmit);
popupInfo.setEventListeners();

const popupCard = new PopupWithForm('popupCard', (data) => {
    cardsList.renderCard(data);
    popupCard.close(); 
});
popupCard.setEventListeners();

const popupImage = new PopupWithImage('popupImg');

const infoUser = new UserInfo({
    name: '.profile-info__name',
    info: '.profile-info__job'
});

const validation = (data, form) => {
    const validate = new FormValidator(data);
    validate.enableValidation(form);
};

validation(allSelectorClasses, formInfo);
validation(allSelectorClasses, formCard);

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

cardsList.renderItems();

/* functions */
/* Функции очистки ошибки валидации */
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

/* Общие функции для Pop-up */
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
    popupInfo.close();
};


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

    popupInfo.open();
});

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

    popupCard.open();
});