export class FormValidator {
  constructor(formElement, formsConfig){
    this._formsConfig = formsConfig;
    this._formElement = formElement;
    this._inputList = this._formElement.querySelectorAll(this._formsConfig.inputSelector);
    this._buttonSubmitForm = this._formElement.querySelector(this._formsConfig.submitButtonSelector);
    this._formFields = Array.from(this._formElement.querySelectorAll(this._formsConfig.inputSelector));
  }

  enableValidation() {
    this._toggleSubmitButton({ disable: false });
    this._setEventListeners();
  }

  resetValidation(){
    this._toggleSubmitButton({ disable: false });
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  }

  _setEventListeners = () => {    
    this._formFields.forEach((elementField) => {
      elementField.addEventListener('input', () => {
        const field = elementField;
        this._checkFormValidity();
        this._checkFieldValidity(field, this._findFieldError(elementField),this._formsConfig.inputErrorClass);
      });
    });
  };

  _findFieldError(elementField){
    const errorField = this._formElement.querySelector(`${this._formsConfig.errorClass}${elementField.name}`);
    return errorField;
  }

  _checkFormValidity = () => {
    const formIsValid = this._formFields.every(({ validity }) => validity.valid);
    this._toggleSubmitButton({ disable: formIsValid });
    return formIsValid;
  };

  _checkFieldValidity = (elementField, elementError, invalidFieldClass) => {
    elementError.textContent = elementField.validationMessage;
    if (!elementField.valid) {
      elementField.classList.add(invalidFieldClass);
    } else {
      elementField.classList.remove(invalidFieldClass); 
    }
  };

  _toggleSubmitButton = ({ disable }) => {
      this._buttonSubmitForm.disabled = !disable;
  };

  _hideError(inputElement){
    this._findFieldError(inputElement).textContent = '';
  }
}