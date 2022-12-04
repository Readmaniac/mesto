export const profileOpen = document.querySelector('.profile__edit-button');

export const selectors = {
    formCard: '.popup-card',
    popupProfile: '.popup-profile',
    popupDeleteCard: '.delete-card',
    popupAvatar: '.popup-avatar',
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
    activeLike: 'elements__likes_active',
    addCardFormClose: 'closecards',
    popupImage: '.picture',
    pictureImage: '.picture__image',
    closePicture:'closedpicture',
    pictureName:'.picture__name',
    submitForm: '.form__save',
    profileName: '.profile__title',
    profileJob: '.profile__subtitle',
    profileAvatar: '.profile__avatar',
    profileAvatarBtn: '.profile__btn'
}
export const cardAdd = document.querySelector(selectors.addCard);
export const profileAvatar = document.querySelector(selectors.profileAvatarBtn);
export const configs = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save',
    inputErrorClass: '.form__item-input_invalid',
    errorClass: '.form__item-error_field_',
    submitForm: '.form__save'
};

export const waitText = 'Сохранение...';
export const saveText = 'Сохранить';

export const popupDeleteCard = document.querySelector(selectors.popupDeleteCard);
export const formValidators = {};

