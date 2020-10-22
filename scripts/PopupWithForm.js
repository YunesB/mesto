import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._handleFormSubmit(this._getInputValues());
    
          this._popup.reset();
        })
    }
    
    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__input');   
    }

    close() {
        super.close();
        this._popup.querySelector('.popup__form').reset();
    }
}