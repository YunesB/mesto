import {imgPopup, openPopup} from './index.js';

export class Card {
    constructor(data, template) {
        this._title = data.name,
        this._image = data.link,
        this._card = template
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._card)
        .content
        .querySelector('.card')
        .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.card__title').textContent = this._title;
        const cardImg = this._element.querySelector('.card__image');
        cardImg.src = this._image;
        cardImg.alt = this._title;

        return this._element;
    }

    _handleLikeClick() {
        this._element.querySelector('.card__like').classList.toggle('card__like_state_posted');
    }

    _handleDltClick() {
        const listItem = this._element.querySelector('.card__delete-button').closest('.card');
        listItem.remove();
    }

    _handleImageClick() {
        if (imgPopup.classList.contains('popup_opened') === false) {
            openPopup(imgPopup)
            const imageSelector = document.querySelector('.popup__image');
            imageSelector.src = this._image;
            imageSelector.alt = this._title;
            document.querySelector('.popup__img-subline').textContent = this._title;
        }
    }

    _setEventListeners() {
        this._element.querySelector('.card__like').addEventListener('click', () => {
            this._handleLikeClick();
        });
        this._element.querySelector('.card__delete-button').addEventListener('click', () => {
            this._handleDltClick();
        });
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleImageClick();
        });
    }
}