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
/* Большое спасибо за подробный комментраий, все понятно.
Отличное ревью, спасибо! */

function popupToggle() {
    if (popup.classList.contains('popup_opened') === false) {
        nameInput.setAttribute('value', nameOutput.textContent);
        jobInput.setAttribute('value', jobOutput.textContent);
    }
    popup.classList.toggle('popup_opened');
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    popupToggle();
}

popup.onclick = function(e) {
    if (e.target == popup) {
        popupToggle();
    };
};

/* event listeners */

formElement.addEventListener('submit', formSubmitHandler);
popupOpen.addEventListener('click', popupToggle);
popupClose.addEventListener('click', popupToggle);
