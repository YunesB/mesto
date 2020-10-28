import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    open(image, title) {
        const popupImage = this._popup.querySelector('.popup__image');
        popupImage.src = image;
        popupImage.alt = title;
        this._popup.querySelector('.popup__img-subline').textContent = title;
        super.open();
    }
}