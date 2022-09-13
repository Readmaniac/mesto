import './index.css';
import {Card, initialCards} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {Popup} from "../components/Popup.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";

import avatarImage from '../images/Avatar.svg';
import blackheartImage from '../images/blackheart.svg';
import closeIconImage from '../images/Close_Icon.svg';
import crossImage from '../images/cross.svg';
import elementFirst from '../images/Element-1.jpg';
import elementSecond from '../images/Element-2.jpg';
import elementThird from '../images/Element-3.jpg';
import elementForth from '../images/Element-4.jpg';
import elementFifth from '../images/Element-5.jpg';
import elementImage from '../images/Element.jpg';
import heartImage from '../images/heart.svg';
import likeActiveImage from '../images/Like_active.svg';
import logoImage from '../images/logo.svg';
import trashImage from '../images/Trash.svg';
import vectorImage from '../images/Vector.svg';

const images = [
    { name: 'Avatar', image: avatarImage },
    { name: 'blackheart', link: blackheartImage },
    { name: 'Close_Icon', link: closeIconImage },
    { name: 'cross', link: crossImage },
    { name: 'Element-1', link: elementFirst },
    { name: 'Element-2', link: elementSecond },
    { name: 'Element-3', link: elementThird },
    { name: 'Element-4', link: elementForth },
    { name: 'Element-5', link: elementFifth },
    { name: 'Element', link: elementImage },
    { name: 'Like_active', link: likeActiveImage },
    { name: 'logo', link: logoImage },
    { name: 'Trash', link: trashImage },
    { name: 'Vector', link: vectorImage }
]; 

const selectors = {
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

const profileOpen = document.querySelector('.profile__edit-button');
const nameInput = document.getElementById('field-name');
const jobInput = document.getElementById('field-job');
const cardAdd = document.querySelector(selectors.addCard);

const configs = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save',
    inputErrorClass: '.form__item-input_invalid',
    errorClass: '.form__item-error_field_',
    submitForm: '.form__save'
}; 

const formValidators = {};
const imagePopup = new PopupWithImage(selectors.popupImage);
const placePopup = new Popup(selectors.formCard);
const profilePopup = new Popup(selectors.popupProfile);

const cardSection = new Section(selectors.list, (cardItem) => {
    cardSection.addItem(renderNewCards(cardItem))
  });

cardSection.renderItems(initialCards);

const profileUserInfo = new UserInfo(selectors.profileName, selectors.profileJob);

const profilePopupWithForm = new PopupWithForm(selectors.popupProfile, handleProfileFormSubmit);
profilePopupWithForm.setEventListeners();
const placePopupWithForm = new PopupWithForm(selectors.formCard, handleSubmitPlace);
placePopupWithForm.setEventListeners();

function renderNewCards(data) {
    const card = new Card (data, selectors.template, () =>{
        imagePopup.open(data.name, data.link);
        imagePopup.setEventListeners();
    });
    return card.createNewCard();
}

function handleProfileFormSubmit (data) {
    profileUserInfo.getUserInfo()
    profileUserInfo.setUserInfo(data);
    profilePopup.close();
};

function handleSubmitPlace (data) {
    placePopupWithForm.close();
    cardSection.addItem(renderNewCards(data));
};

profileOpen.addEventListener('click', () => {
    const infoFromPage = profileUserInfo.getUserInfo();
    nameInput.value=infoFromPage.name;
    jobInput.value=infoFromPage.job;
    profilePopup.setEventListeners();
    profilePopup.open();
});

cardAdd.addEventListener('click', () => {
    formValidators['place'].resetValidation();
    placePopup.setEventListeners();
    placePopup.open();
});

function enableValidation(formsConfig) {
    const formList = Array.from(document.querySelectorAll(formsConfig.formSelector));
    formList.forEach((formElement) => {
      const validator = new FormValidator(formElement, formsConfig);
      const formName = formElement.getAttribute('name')
      formValidators[formName] = validator;
      validator.enableValidation();
    });
}

enableValidation(configs);