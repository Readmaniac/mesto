import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor(popupSelector, handleSubmitForm){
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._form = this._popup.querySelector('.form');
    }

    _getInputValues(e){
        const name = e.target.name.value;
        const link = e.target.link.value;
        return {name, link}
    }

    setEventListeners(){
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleSubmitForm(this._getInputValues(e));
        });
        super.setEventListeners();
    }
    close(){
        this._form.name.value = ""; 
        this._form.link.value = "";
        super.close();
    }
}