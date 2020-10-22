export class Card {
    constructor({data: {link, name}, externalHandler}, template) {
        this._title = name,
        this._image = link,
        this.externalHandler = externalHandler,
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
       this.externalHandler(this._image, this._title);
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