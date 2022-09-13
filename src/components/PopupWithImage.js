import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._pictureImage = this._popup.querySelector('.picture__image');
        this._pictureName = this._popup.querySelector('.picture__name');
    }

    open(title, picture){
        this._pictureImage.src=picture;
        this._pictureName.textContent=title;
        this._pictureImage.alt=title;
        super.open();
    }
}
