export class Popup {
    constructor (popupSelector) {
        this._popup = document.getElementById(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
        this.handleCloseEsc = this._handleEscClose.bind(this);
        document.addEventListener('keyup', this.handleCloseEsc);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this.handleCloseEsc);
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