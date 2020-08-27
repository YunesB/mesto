let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close')

document.getElementById('link').addEventListener('click', function(){
    popup.setAttribute('style', 'display:flex');
});

popupClose.addEventListener('click', function(){
    popup.setAttribute('style', 'display:none');
});


let formElement = document.querySelector('.popup__form')
function formSubmitHandler (evt) {
    evt.preventDefault();
    
    let nameInput = document.querySelector('.popup__input_name');
    let jobInput = document.querySelector('.popup__input_job');
    let nameOutput = document.querySelector('.profile-info__name');
    let jobOutput = document.querySelector('.profile-info__job');

    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);