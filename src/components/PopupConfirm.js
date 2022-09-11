import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._submit = this._form.querySelector(".popup__button");
    this._defaultSubmit = this._submit.textContent;
    this._heading = this._popup.querySelector(".popup__heading");
  }

  open(title) {
    super.open();
    this._heading.textContent = `Вы уверены, что хотите удалить "${title}"?`;
  }

  setSubmitCallback(callback) {
    this._handleSubmitCallback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
  }

  editButtonText(text) {
    this._submit.textContent = text;
  }

  resetButtonText() {
    this._submit.textContent = this._defaultSubmit;
  }
}
