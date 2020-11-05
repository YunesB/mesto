export class Card {
    constructor({data: {name, link}, handleImageClick}, cardTemplate) {
        this._title = name,
        this._image = link,
        this.handleImageClick = handleImageClick,
        this._cardTemplate = cardTemplate        
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardTemplate)
        .content
        .querySelector('.card')
        .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.card__title').textContent = this._title;
        this._cardImg = this._element.querySelector('.card__image');
        this._cardImg.src = this._image;
        this._cardImg.alt = this._title;
        this._setEventListeners();

        return this._element;
    }

    _handleLikeClick(evt) {
        evt.target.classList.toggle('card__like_state_posted');
    }

    _handleDltClick(evt) {
        const currentCard = evt.target.closest('.card');
        const popup = document.getElementById('popupConfirm');   
        popup.classList.add('popup_opened');
        popup.addEventListener('submit', () => {
            currentCard.remove();
        });
    }

    _handleImageClick() {
       this.handleImageClick(this._image, this._title);
    }

    _setEventListeners() {
        this._element.querySelector('.card__like').addEventListener('click', (evt) => {
            this._handleLikeClick(evt);
        });
        this._element.querySelector('.card__delete-button').addEventListener('click', (evt) => {
            this._handleDltClick(evt);
        });
        this._cardImg.addEventListener('click', () => {
            this._handleImageClick();
        });
    }
}