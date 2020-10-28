import './index.css';

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
popupImage.setEventListeners();

const userInfo = new UserInfo({
    nameSelector: '.profile-info__name',
    infoSelector: '.profile-info__job'
});

const infoFormValidator = new FormValidator(allSelectorClasses, formInfo);
infoFormValidator.enableValidation(formInfo);
const cardFormValidator = new FormValidator(allSelectorClasses, formCard);
cardFormValidator.enableValidation(formCard);

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
/* Действия по нажатию на submit в формах */
function handleFormSubmit (data) {
    userInfo.setUserInfo(data);
    popupInfo.close();
};


/* event listeners */
popupOpen.addEventListener('click', function () {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    infoInput.value = userData.info;

    const submitBtn = formInfo.querySelector('.popup__button');
    infoFormValidator.enableSubmitButton(submitBtn, allSelectorClasses.inactiveButtonClass);
    infoFormValidator.errorRemover({
        firstErrorSelector: (`name-input-error`),
        secondErrorSelector: (`data-input-error`),
        firstInputSelector: nameInput,
        secondInputSelector: infoInput
    });

    popupInfo.open();
});

popupOpenCard.addEventListener('click', function () {
    nameInputCard.value = '';
    infoInputCard.value = '';

    const submitBtn = formCard.querySelector('.popup__button');
    cardFormValidator.disableSubmitButton(submitBtn, allSelectorClasses.inactiveButtonClass);
    cardFormValidator.errorRemover({
        firstErrorSelector: (`place-input-error`),
        secondErrorSelector: (`url-input-error`),
        firstInputSelector: nameInputCard,
        secondInputSelector: infoInputCard
    });

    popupCard.open();
});