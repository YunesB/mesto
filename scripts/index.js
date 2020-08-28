let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let popupSave = document.querySelector('.popup__button');
let popupOpen = document.querySelector('.profile-info__customization');

popupOpen.addEventListener('click', function(){
    popup.setAttribute('style', 'display:flex');
});

popupClose.addEventListener('click', function(){
    popup.setAttribute('style', 'display:none');
});

popupSave.addEventListener('click', function(){
    popup.setAttribute('style', 'display:none');
});

popup.onclick = function(e){
    if (event.target == popup) {
        popup.style.display = 'none';
    };
};

let formElement = document.querySelector('.popup__form')
function formSubmitHandler (evt) {
    evt.preventDefault();
    
    let nameInput = document.querySelector('.popup__input-name');
    let jobInput = document.querySelector('.popup__input-job');
    let nameOutput = document.querySelector('.profile-info__name');
    let jobOutput = document.querySelector('.profile-info__job');

    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);