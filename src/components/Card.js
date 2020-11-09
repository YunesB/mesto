export class Card {
    constructor({data: {name, link, _id, likes, owner}, handleImageClick, handleDltClick, handleLikeClick}, cardTemplate) {
        this._title = name,
        this._image = link,
        this.handleImageClick = handleImageClick,
        this.handleDltClick = handleDltClick,
        this.handleLikeClick = handleLikeClick,
        this._cardTemplate = cardTemplate,
        this._id = _id,
        this._likes = likes,
        this._owner = owner;
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
        this._likeCounter = this._element.querySelector('.card__like-counter');
        this._cardImg.src = this._image;
        this._cardImg.alt = this._title;
        this._likeCounter.textContent = this._likes.length;
        this._setEventListeners();

        return this._element;
    }

    _isOwned(user) {
        if (user._id === localStorage.userID) { 
                return true;
           } else {
                return false;
           };
    }

    initialLikes() {
        this._likes.forEach((user) => {
            if(this._isOwned(user)) {
                this._toggleLikestate();
            }
        });
    }

    handleDeleteButton(data) {
            if(this._isOwned(data)) {
                this._element.querySelector('.card__delete-button').style.display = 'flex';
            }; 
    }

    setLikeCounter(data) {
        this._likeCounter.textContent = data.length;
    }

    removeCard() {
        this._element.remove();
        this._element = null;
    }

    _toggleLikestate() {
        this._element.querySelector('.card__like').classList.toggle('card__like_state_posted');
    }

    _handleLikeClick(evt, card) {
        this.handleLikeClick(evt, card);
    }

    _handleDltClick(card) {
        this.handleDltClick(card);
    }

    _handleImageClick() {
       this.handleImageClick(this._image, this._title);
    }

    _setEventListeners() {
        this._element.querySelector('.card__like').addEventListener('click', (evt) => {
            this._handleLikeClick(evt);
        });
        this._element.querySelector('.card__delete-button').addEventListener('click', () => {
            this._handleDltClick();
        });
        this._cardImg.addEventListener('click', () => {
            this._handleImageClick();
        });
    }
}