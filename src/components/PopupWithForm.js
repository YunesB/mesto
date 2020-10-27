import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    open() {
        super.setEventListeners();
        super.open();
    }

    setEventListeners() {
        this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
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
        this._popup.querySelector('.popup__form').reset();
        super.close();
    }
}