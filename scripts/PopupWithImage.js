import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
    }

    open(image, title) {
        super.open();
        const imageSelector = this._popup.querySelector('.popup__image');
        imageSelector.src = image;
        imageSelector.alt = title;
        this._popup.querySelector('.popup__img-subline').textContent = title;
        this.setEventListeners();
    }
}