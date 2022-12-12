import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__img');
    this._popupName = this._popup.querySelector('.popup__caption');
  }

  open (name, link) {
    this._popupImage.src = link;
    this._popupName.textContent = name;
    this._popupImage.alt = name;
    super.open();
  }
}
