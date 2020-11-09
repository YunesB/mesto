import {Popup} from './Popup.js';

export class PopupConfirm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._submit = this._form.querySelector('.popup__button');
        this._defaultSubmit = this._submit.textContent
    }

    setSubmitCallback(callback) {
        this._handleSubmitCallback = callback;
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitCallback();
        });
    }

    editButtonText(text) {    
        this._submit.textContent = text;
    }

    resetButtonText() {
        this._submit.textContent = this._defaultSubmit;
    }
}