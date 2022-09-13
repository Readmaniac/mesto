export const profileOpen = document.querySelector('.profile__edit-button');

export const selectors = {
    formCard: '.popup-card',
    popupProfile: '.popup-profile',
    inputMesto: 'name',
    inputLink: 'link',
    addCard: '.profile__add-elements',
    template: '#element-template',
    container: '.elements__container',
    list: '.elements',
    mestoTitle: '.elements__name',
    mestoImage: '.elements__image',
    mestodelete: '.elements__delete',
    mestoLike: '.elements__like',
    activeLike: 'elements__like_active',
    addCardFormClose: 'closecards',
    popupImage: '.picture',
    pictureImage: '.picture__image',
    closePicture:'closedpicture',
    pictureName:'.picture__name',
    submitForm: '.form__save',
    profileName: '.profile__title',
    profileJob: '.profile__subtitle'
}
export const cardAdd = document.querySelector(selectors.addCard);
export const configs = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save',
    inputErrorClass: '.form__item-input_invalid',
    errorClass: '.form__item-error_field_',
    submitForm: '.form__save'
}; 

export const formValidators = {};