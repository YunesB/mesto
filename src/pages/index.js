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
infoFormValidator.enableValidation();
const cardFormValidator = new FormValidator(allSelectorClasses, formCard);
cardFormValidator.enableValidation();

/* Загрузка начальных карточек */
const cardsList = new Section({
    data: reversedCards,
    renderer: (data) => {
        const card = new Card({
            data,
            handleImageClick: (img, title) => popupImage.open(img, title)}, 
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
    infoFormValidator.enableSubmitButton();
    infoFormValidator.removeErrors()
    popupInfo.open();
});

/* Ваш комментарий:
"и нужно disableSubmitButton использовать тут - 
ведь без проверки открывается форма, значит, нужно Неактивную кнопку делать, 
как при добавлении карточки"

Не совсем согласен, потому что тут в любом случае будут сохранены только валидные данные, 
валидатор не даст сабмитнуть некорректный инпут, поэтому, на мой взгляд, кнопка сохранить 
должна быть активна при открытии, исключительно в рамках корректного UX.

В остальном большое Вам спасибо за ревью, код в FormValidator разобрал и отредактировал как Вы написали.
*/

popupOpenCard.addEventListener('click', function () {
    nameInputCard.value = '';
    infoInputCard.value = '';
    cardFormValidator.disableSubmitButton();
    cardFormValidator.removeErrors()
    popupCard.open();
});