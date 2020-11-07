import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._submit = this._form.querySelector('.popup__button');
        this._defaultSubmit = this._submit.textContent
    }

    open() {
        super.open();
    }

    editButtonText(text) {    
        this._submit.textContent = text;
    }

    resetButtonText() {
        this._submit.textContent = this._defaultSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
    
    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__input');
        
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    close() {
        this._form.reset();
        super.close();
    }
}