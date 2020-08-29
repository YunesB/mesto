/* variables */

let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let popupOpen = document.querySelector('.profile-info__customization');

let nameInput = document.querySelector('.popup__input_data_name');
let jobInput = document.querySelector('.popup__input_data_job');
let nameOutput = document.querySelector('.profile-info__name');
let jobOutput = document.querySelector('.profile-info__job');

let formElement = document.querySelector('.popup__form')


/* functions */

function popupOpener() {
    popup.classList.add('popup_opened');
    nameInput.setAttribute('value', nameOutput.textContent);
    jobInput.setAttribute('value', jobOutput.textContent);
};

function popupCloser() {
    popup.classList.remove('popup_opened');
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    popupCloser();
}

/* Пробовал обхединить 2 функции в одну, но не понял, на какое действие проверяем функцией if? На клик по кнопке?
Буду признателен, если сможете дать подсказку. Спасибо! */

popup.onclick = function(e) {
    if (e.target == popup) {
        popup.classList.remove('popup_opened');
    };
};

/* event listeners */

formElement.addEventListener('submit', formSubmitHandler);
popupOpen.addEventListener('click', popupOpener);
popupClose.addEventListener('click', popupCloser);