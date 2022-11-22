import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
    }

    setSubmitCallback(del){
        this._handleSubmit = del;
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('click', (e) => {
            e.preventDefault();
            this._handleSubmit();
        });
    }

}