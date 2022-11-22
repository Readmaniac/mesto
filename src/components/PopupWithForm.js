import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor({popupSelector, handleFormSubmit}){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.form__input');
        this._btnSubmit = this._form.querySelector('.form__save');
        this._btnSubmitText = this._btnSubmit.textContent;
    }

    _getInputValues(){
        this._formValues = {};
        this._inputList.forEach(input => {
          this._formValues[input.name] = input.value;
        });
        return this._formValues
    }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
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

    toggleSubmitButtonText(isLoading) {
        if (this._btnSubmitText!==isLoading) {
            this._btnSubmit.textContent = 'Сохранение...';
        } else {
            this._btnSubmit.textContent = this._btnSubmitText;
        }
    }
}