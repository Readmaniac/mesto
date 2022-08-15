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

function enableValidation(){
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      console.log(formElement);
      evt.preventDeafault();
      setEventListeners(formElement);
    });
  });
}
enableValidation(form, formInput, formError);

const formPlace = document.forms.place;

const buttonSubmitFormPlace = formPlace.querySelector('.form__save');
const dataContainer = document.querySelector('.overlay');
const popupPlace = document.querySelector('#popup-card');
const focusHandler = ({ target }) => target.select();

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
  if (params.valid) {
    elementField.classList.remove(params.invalidFieldClass);
  } else {
    elementField.classList.add(params.invalidFieldClass);
  }
};

const checkFieldValidity = (elementField, elementError, invalidFieldClass) => {
  const { validationMessage, validity: { valid } } = elementField;
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
  const buttonSubmitFormPlace = formElement.querySelector('.form__save');
  formFields.forEach((elementField) => {
    const errorTextContainerSelector = `.form__item-error_field_${elementField.name}`;
    const elementError = formPlace.querySelector(errorTextContainerSelector);

    elementField.addEventListener('input', (e) => {
      const field = e.target;
      checkFormValidity(formFields, buttonSubmitFormPlace);
      checkFieldValidity(field, elementError, 'form__item-input_invalid');
    });
});
};


const submitCommonHandler = (e) => {
  e.preventDefault();
  const formIsValid = checkFormValidity(formFields, buttonSubmitFormPlace);
  if (!formIsValid) {
    e.stopImmediatePropagation();
  }
}

const submitPlaceHandler = (e) => {
  const name = e.target.name.value;
  const link = e.target.link.value;
  closePopups(popupPlace);
  const place = createNewCard(name, link);
};

formPlace.addEventListener('submit', submitPlaceHandler);

//dataContainer.addEventListener('focus', openPopupPlace);
