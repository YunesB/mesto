/* variables */

const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');

const popupOpen = document.querySelector('.profile-info__customization');
const popupHeading = document.querySelector('.popup__heading');

const imgPopup = document.querySelector('.img-popup');
const imgClose = document.querySelector('.img-popup__close');
const imgPopupSrc = document.querySelector('.img-popup__image');
const imgPopupTxt = document.querySelector('.img-popup__subline');


const popupOpenCards = document.querySelector('.profile__button');
const popupBtn = document.querySelector('.popup__button');

const cardList = document.querySelector('.cards');
const cardLike = document.querySelector('.card__like');
const cardDlt = document.querySelector('.card__delete-button');
const cardImg = document.querySelector('.card__image');

let nameInput = document.querySelector('.popup__input_data_name');
let jobInput = document.querySelector('.popup__input_data_job');
let nameOutput = document.querySelector('.profile-info__name');
let jobOutput = document.querySelector('.profile-info__job');

let formElement = document.querySelector('.popup__form');

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
    cardTxt.textContent = item.name;
    cardList.prepend(cardElement);
};

function cardButtonsActive (cardImg, cardLike, cardDelete) {
    cardImg.addEventListener('click', function(item) {
        if (imgPopup.classList.contains('img-popup_opened') === false) {
            imgPopup.classList.add('img-popup_opened');
            imgPopupSrc.setAttribute('src', item.link);
            imgPopupTxt.textContent = item.name;
        }
    });

    cardLike.addEventListener('click', function(evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('card__like_state_posted');
    });

    cardDelete.addEventListener('click', function(evt) {
        const listItem = cardDelete.closest('.card');
        listItem.remove();
    });
};

ReversedCards.forEach(addCard);

const openProfilePopup = () => openPopup('profile');
const openCardPopup = () => openPopup('card');

const openPopup = (type) => {
    let valueForInput1;
    let valueForInput2;

    if (type === 'profile') {
        valueForInput1 = nameOutput.textContent;
        valueForInput2 = jobOutput.textContent;
        
        popupHeading.textContent = 'Редактировать профиль';
        nameInput.placeholder = 'Имя';
        jobInput.placeholder = 'О себе';
        popupBtn.textContent = 'Сохранить';
        popup.classList.add('popup-info');
    }

    else {
        valueForInput1 = '';
        valueForInput2 = '';

        popupHeading.textContent = 'Новое место';
        nameInput.placeholder = 'Название';
        jobInput.placeholder = 'Ссылка на картинку';
        nameInput.name = 'place';
        jobInput.name = 'link';
        popupBtn.textContent = 'Создать';
    };

    nameInput.value = valueForInput1;
    jobInput.value = valueForInput2;
    popup.classList.add('popup_opened');
};

function closePopup() {
    if (popup.classList.contains('popup_opened') === true) {
        popup.classList.remove('popup-info');
        popup.classList.remove('popup_opened');
    }
}

popup.onclick = function(evt) {
    if (evt.target === popup) {
        closePopup();
    };
};


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

function formSubmitHandler (evt) {
    if (popup.classList.contains('popup-info') === true) {
        evt.preventDefault();
        nameOutput.textContent = nameInput.value;
        jobOutput.textContent = jobInput.value;
        popup.classList.remove('popup-info');
    }
    
    else {
        evt.preventDefault();
        addCard({name: nameInput.value, link: jobInput.value});
    }
    popup.classList.remove('popup_opened');
}


/* event listeners */

formElement.addEventListener('submit', formSubmitHandler);
popupOpen.addEventListener('click', openProfilePopup);
popupClose.addEventListener('click', closePopup);
popupOpenCards.addEventListener('click', openCardPopup);
imgClose.addEventListener('click', imgPopupClose);






        /*
        const cardTemplate = document.querySelector('.card-template').content;
        const cardList = document.querySelector('.cards')
        const cardElement = cardTemplate.cloneNode(true);
        cardElement.querySelector('.card__image').src = jobInput.value;
        cardElement.querySelector('.card__title').textContent = nameInput.value;
        cardList.prepend(cardElement); */

/*
const cardLike = document.querySelector('.card__like').content;
cardLike.addEventListener('click', function(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like_state_posted');
});


const cardDelete = document.querySelector('.card__delete-button').content;
cardDelete.addEventListener('click', function(evt) {
        const listItem = cardDelete.closest('.card');
        listItem.remove();
}); 
*/

/*
cardList.addEventListener('click', function(evt) {
    if (evt.target = cardLike) {
         cardLike.classList.toggle('card__like_state_posted');
    }
 
    else if (evt.target = cardDlt) {
         const listItem = cardDlt.closest('.card');
         listItem.remove();
    }
 
    else if (evt.target = cardImg) {
         imgPopupBackground.setAttribute('background-image', xxx);
         ImgPopupOpen();
    }
 
    else {
        console.log('error');
    }
 }); */

 /*
cardLike.addEventListener('click', function(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like_state_posted');
});

cardDlt.addEventListener('click', function(evt) {
    const listItem = cardDlt.closest('.card');
    listItem.remove();
}); */