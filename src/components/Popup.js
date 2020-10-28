export class Popup {
    constructor (popupSelector) {
        this._popup = document.getElementById(popupSelector);
        this.handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', this.handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this.handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        };
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (!evt.target.closest('.popup__container') && !evt.target.closest('.popup__img-container')) {
                this.close();
            }
        });
        
        this._popup.querySelector('.popup__close').addEventListener('click', () => {
            this.close();
        });
    }
}