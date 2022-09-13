import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor(popupSelector, handleSubmitForm){
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._form = this._popup.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.form__input');
    }

    _getInputValues(e){
        this._formValues = {};
        this._inputList.forEach(input => {
          this._formValues[input.name] = input.value;
        });
        return this._formValues
    }

    setEventListeners(){
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleSubmitForm(this._getInputValues(e));
        });
        super.setEventListeners();
    }
    close(){
        this._form.reset();
        super.close();
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
          input.value = data[input.name];
        });
      }
}