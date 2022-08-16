const configs = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save',
    inputErrorClass: '.form__item-input_invalid',
    errorClass: '.form__item-error'
  }; 


const setEventListeners = (formElement, formsConfig) => {
  const formFields = Array.from(formElement.querySelectorAll(formsConfig.inputSelector));
  const buttonSubmitForm = formElement.querySelector(formsConfig.submitButtonSelector);
  formFields.forEach((elementField) => {
    const elementError = formElement.querySelector(`.form__item-error_field_${elementField.name}`);
    elementField.addEventListener('input', (e) => {
      const field = e.target;
      checkFormValidity(formFields, buttonSubmitForm);
      checkFieldValidity(field, elementError,configs.inputErrorClass);
    });
});
};

const checkFieldValidity = (elementField, elementError, invalidFieldClass) => {
  elementError.textContent = elementField.validationMessage;
  if (!elementField.valid) {
    elementField.classList.add(invalidFieldClass);
  } else {
    elementField.classList.remove(invalidFieldClass); 
  }
  return valid;
};

const toggleFormSubmit = (elementSubmit, { disable }) => {
  if (disable) {
    elementSubmit.removeAttribute('disabled');
  } else {
    elementSubmit.setAttribute('disabled', 'disabled');
  }
};

const checkFormValidity = (elementsFields, elementSubmit) => {
  toggleFormSubmit(elementSubmit, { disable: true });
  const formIsValid = elementsFields.every(({ validity }) => validity.valid);
  if (!formIsValid) {
    toggleFormSubmit(elementSubmit, { disable: false });
  }
  return formIsValid;
};

const submitCommonHandler = (e) => {
  e.preventDefault();
  const formIsValid = checkFormValidity(formFields, buttonSubmitForm);
  if (!formIsValid) {
    e.stopImmediatePropagation();
  }
}

function enableValidation(formsConfig) {
  const formList = Array.from(document.querySelectorAll(formsConfig.formSelector));
  formList.forEach((formElement) => {setEventListeners(formElement, formsConfig)})
}

enableValidation(configs);
