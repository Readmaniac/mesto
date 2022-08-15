const formsConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: '.form__item-input_invalid',
    errorClass: '.form__item-error'
  }; 

const form = document.querySelector(formsConfig.formSelector);
const formInput = form.querySelector(formsConfig.inputSelector);
const formError = form.querySelector(`.form__item-error_field_${formInput.name}`);

function enableValidation(formsConfig) {
  const formList = Array.from(document.querySelectorAll(formsConfig.formSelector));
  formList.forEach((formElement) => {formElement.addEventListener('input', (event) => setEventListeners(formElement))})
}

enableValidation(formsConfig);

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

const setFieldError = (elementField, elementError, params) => {

  elementError.textContent = params.validationMessage;
  if (!params.valid) {
    elementField.classList.add(params.invalidFieldClass);
  } else {
    elementField.classList.remove(params.invalidFieldClass);
  }
};

const checkFieldValidity = (elementField, elementError, invalidFieldClass) => {

  const validationMessage = elementField.validationMessage;
  const valid = elementField.validity.valid;
  const params = {
    validationMessage,
    valid,
    invalidFieldClass,
  };
  setFieldError(elementField, elementError, params);
  return valid;
};

const setEventListeners = (formElement) => {
  const formFields = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonSubmitForm = formElement.querySelector('.form__save');
  formFields.forEach((elementField) => {
    const errorTextContainerSelector = `.form__item-error_field_${elementField.name}`;
    const elementError = formElement.querySelector(errorTextContainerSelector);

    elementField.addEventListener('input', (e) => {
      const field = e.target;
      checkFormValidity(formFields, buttonSubmitForm);
      checkFieldValidity(field, elementError, 'form__item-input_invalid');
    });
});
};

const submitCommonHandler = (e) => {
  e.preventDefault();
  const formIsValid = checkFormValidity(formFields, buttonSubmitForm);
  if (!formIsValid) {
    e.stopImmediatePropagation();
  }
}
