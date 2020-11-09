import './index.css';

import {Api} from '../components/Api.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupConfirm} from '../components/PopupConfirm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Section} from '../components/Section.js';
import {allSelectorClasses} from '../utils/constants.js';

import {popupOpen, formInfo, nameInput, 
    infoInput, popupOpenCard, popupOpenAvatar, formCard, 
    nameInputCard, infoInputCard, formAvatar, infoInputAvatar, userAvatar} 
    from '../utils/constants.js';

/* Создание экземляров класса */
const userInfo = new UserInfo({
    nameSelector: '.profile-info__name',
    infoSelector: '.profile-info__job',
    avatarSelector: '.profile-info__image'
});

const api = new Api({
    address: 'https://mesto.nomoreparties.co/v1',
    token: 'faff6938-14cd-479b-b073-d27fe856bd16',
    cohort: 'cohort-17'
});

const popupAvatar = new PopupWithForm('popupAvatar', (data) => {
    popupAvatar.editButtonText("Сохранение...");
    api.setUserAva(data.link)
        .then(() => {
            userAvatar.src = data.link;
        })
        .catch ((error) => {
            console.log(error);
        })
        .finally(() => {
            popupAvatar.close();
            popupAvatar.resetButtonText();
        });
});
popupAvatar.setEventListeners();

const popupInfo = new PopupWithForm('popupInfo', (data) => {
    popupInfo.editButtonText("Сохранение...");
    api.setUserInfo(data.name, data.info)
        .then((data) => {
            userInfo.setUserInfo(data);
        })
        .catch ((error) => {
            console.log(error);
        })
        .finally(() => {
            popupInfo.close();
            popupInfo.resetButtonText();
        });
});
popupInfo.setEventListeners();

const popupConfirm = new PopupConfirm('popupConfirm', () => {
});
popupConfirm.setEventListeners();

const popupCard = new PopupWithForm('popupCard', (data) => {
    popupCard.editButtonText("Сохранение...");
    api.addCard(data)
        .then(data => {
            createCard(data);
        })
        .finally(() => {
            popupCard.close();
            popupCard.resetButtonText();
        });
});
popupCard.setEventListeners();

const popupImage = new PopupWithImage('popupImg');
popupImage.setEventListeners();

const avatarFormValidator = new FormValidator(allSelectorClasses, formAvatar);
avatarFormValidator.enableValidation();
const infoFormValidator = new FormValidator(allSelectorClasses, formInfo);
infoFormValidator.enableValidation();
const cardFormValidator = new FormValidator(allSelectorClasses, formCard);
cardFormValidator.enableValidation();

/* Загрузка начальных карточек */
const cardsList = new Section({
    renderer: (data) => {
        createCard(data);
    }
 }, '.cards');

const createCard = (data) => {
    const card = new Card({
        data,
        handleImageClick: (img, title) => popupImage.open(img, title),
        handleDltClick: () => handleCardDelete(card),
        handleLikeClick: (evt) => handleCardLike(evt, card)
        }, ".card-template");
        
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
    card.initialLikes();
    card.handleDeleteButton(data.owner);
}

const handleCardDelete = (card) => {
    popupConfirm.open();
    popupConfirm.setSubmitCallback(() => {
        popupConfirm.editButtonText("Сохранение...");
        api.deleteCard(card._id)
        .then(() => {
            card.removeCard();
            popupConfirm.close();
        })
        .catch ((error) => {
            console.log(error);
        })
        .finally(() => {
            popupConfirm.close();
            popupConfirm.resetButtonText();
        });
    })
}

const handleCardLike = (evt, card) => {
    if (!evt.target.classList.contains('card__like_state_posted')) {    
        api.postLike(card)
        .then((res) => {
            evt.target.classList.add('card__like_state_posted')
            card.setLikeCounter(res.likes);
        })
        .catch ((error) => {
            console.log(error);
        });
    } else {
        api.removeLike(card)
        .then((res) => {
            evt.target.classList.remove('card__like_state_posted')
            card.setLikeCounter(res.likes);
        })
        .catch ((error) => {
            console.log(error);
        });
    }
}

api.getInitialCards()
    .then((data) => {
        cardsList.renderItems(data);
    })
    .catch ((error) => {
       console.log(error);
    });

api.getUserInfo()
    .then((data) => {
        userInfo.setUserInfo(data);
        localStorage.setItem("userID", data._id)
    })
    .catch ((error) => {
       console.log(error);
    });


/* functions */
/* Действия по нажатию на submit в формах */

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