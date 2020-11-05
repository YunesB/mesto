import './index.css';

import {Api} from '../components/Api.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Section} from '../components/Section.js';
import {allSelectorClasses} from '../utils/constants.js';

import {popupOpen, formInfo, nameInput, 
    infoInput, popupOpenCard, popupOpenAvatar, formCard, 
    nameInputCard, infoInputCard, formAvatar, infoInputAvatar, userAvatar} 
    from '../utils/constants.js';

/* Создание экземляров класса */
const api = new Api({
    address: 'https://mesto.nomoreparties.co/v1',
    token: 'faff6938-14cd-479b-b073-d27fe856bd16',
    cohort: 'cohort-17'
});

const popupAvatar = new PopupWithForm('popupAvatar', handleAvatarChange);
popupAvatar.setEventListeners();

const popupInfo = new PopupWithForm('popupInfo', handleFormSubmit);
popupInfo.setEventListeners();

const popupConfirm = new PopupWithForm('popupConfirm', handleCardDelete);
popupConfirm.setEventListeners();

const popupCard = new PopupWithForm('popupCard', (data) => {
    api.addCard(data)
    .then(data => {
        const card = new Card({ 
            data, 
            handleImageClick: (img, title) => popupImage.open(img, title)
        }, ".card-template");
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
    })
    popupCard.close();
});
popupCard.setEventListeners();

const popupImage = new PopupWithImage('popupImg');
popupImage.setEventListeners();

const userInfo = new UserInfo({
    nameSelector: '.profile-info__name',
    infoSelector: '.profile-info__job'
});

const avatarFormValidator = new FormValidator(allSelectorClasses, formAvatar);
avatarFormValidator.enableValidation();
const infoFormValidator = new FormValidator(allSelectorClasses, formInfo);
infoFormValidator.enableValidation();
const cardFormValidator = new FormValidator(allSelectorClasses, formCard);
cardFormValidator.enableValidation();

/* Загрузка начальных карточек */
const cardsList = new Section({
    renderer: (data) => {
        const card = new Card({
        data,
        handleImageClick: (img, title) => popupImage.open(img, title)
        }, ".card-template");
        
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
    }
 }, '.cards');

 api.getInitialCards()
    .then((data) => {
        cardsList.renderItems(data);
        console.log(data);
    })
    .catch ((error) => {
       console.log(error);
    });

/* functions */
/* Действия по нажатию на submit в формах */
function handleFormSubmit () {
    popupInfo.close();
};

function handleAvatarChange(data) {
    userAvatar.src = data.link;
    popupAvatar.close();
};

function handleCardDelete() {
    popupConfirm.close();
}


/* event listeners */
popupOpenAvatar.addEventListener('click', function () {
    infoInputAvatar.value = '';
    avatarFormValidator.disableSubmitButton();
    avatarFormValidator.removeErrors()
    popupAvatar.open();
});

popupOpen.addEventListener('click', function () {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    infoInput.value = userData.info;
    infoFormValidator.enableSubmitButton();
    infoFormValidator.removeErrors()
    popupInfo.open();
});

popupOpenCard.addEventListener('click', function () {
    nameInputCard.value = '';
    infoInputCard.value = '';
    cardFormValidator.disableSubmitButton();
    cardFormValidator.removeErrors();
    popupCard.open();
});