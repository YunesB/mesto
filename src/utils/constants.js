export const allSelectorClasses = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_data_error',
    errorClass: 'popup__error_visible'
};

export const popupOpen = document.querySelector('.profile-info__customization');
export const popupOpenCard = document.querySelector('.profile__button');
export const popupOpenAvatar = document.querySelector('.profile-info__avatar-customizaton');
export const userAvatar = document.querySelector('.profile-info__image');

export const formAvatar = document.forms.popupFormAvatar;
export const infoInputAvatar = formAvatar.elements.link;

export const formInfo = document.forms.popupFormInfo;
export const nameInput = formInfo.elements.name;
export const infoInput = formInfo.elements.info;

export const formCard = document.forms.popupFormCard;
export const nameInputCard = formCard.elements.name;
export const infoInputCard = formCard.elements.link;

export const popupLoading = document.getElementById('popupLoading');