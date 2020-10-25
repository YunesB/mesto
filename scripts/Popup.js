export class Popup {
    constructor (popupSelector) {
        this._popup = document.getElementById(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
            document.removeEventListener('keyup', this._handleEscClose);
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

        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }
}