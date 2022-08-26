export class FormValidator {
  constructor(formElement, formsConfig){
    this._formsConfig = formsConfig;
    this._formElement = formElement;
  }

  enableValidation() {
    this._buttonSubmitForm = this._formElement.querySelector(this._formsConfig.submitButtonSelector);
    this._toggleFormSubmit(this._buttonSubmitForm, { disable: false });
    this._setEventListeners();
  }

  _setEventListeners = () => {
    const formFields = Array.from(this._formElement.querySelectorAll(this._formsConfig.inputSelector));
    formFields.forEach((elementField) => {
      const elementError = this._formElement.querySelector(`${this._formsConfig.errorClass}${elementField.name}`);
      elementField.addEventListener('input', (e) => {
        const field = e.target;
        this._checkFormValidity(formFields, this._buttonSubmitForm);
        this._checkFieldValidity(field, elementError,this._formsConfig.inputErrorClass);
      });
  });
  };

  _checkFormValidity = (elementsFields, elementSubmit) => {
    this._toggleFormSubmit(elementSubmit, { disable: true });
    const formIsValid = elementsFields.every(({ validity }) => validity.valid);
    if (!formIsValid) {
      this._toggleFormSubmit(elementSubmit, { disable: false });
    }
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

  _toggleFormSubmit = (elementSubmit, { disable }) => {
    if (disable) {
      elementSubmit.removeAttribute('disabled');
    } else {
      elementSubmit.setAttribute('disabled', 'disabled');
    }
  };
}