import {Card, initialCards} from "./card.js";
import {FormValidator} from "./validate.js";

const popupProfile = document.getElementById('popup-profile');
const profileOpen = document.querySelector('.profile__edit-button');
const profileExit = document.querySelector('.form__close-icon');
const nameInput = document.getElementById('field-name');
const nameProfile = document.querySelector('.profile__title');
const jobInput = document.getElementById('field-job');
const jobProfile = document.querySelector('.profile__subtitle');
const profileSave = document.querySelector('.form__save');

const selectors = {
    formCard: 'popup-card',
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
    popupImage: 'image',
    pictureImage: '.picture__image',
    closePicture:'closedpicture',
    pictureName:'.picture__name',
    submitFormPlace: '.form__save'
}
const cardProfile = document.getElementById(selectors.formCard);
const list = document.querySelector(selectors.list);
const cardAdd = document.querySelector(selectors.addCard);
const template = document.querySelector(selectors.template).content.querySelector(selectors.container);
const cardClose = document.getElementById(selectors.addCardFormClose);
const picturePopap = document.getElementById(selectors.popupImage);
const pictureImage = document.querySelector(selectors.pictureImage);
const pictureName = document.querySelector(selectors.pictureName);
const pictureClose = document.getElementById(selectors.closePicture);
const formPlace = document.forms.place;
const overlay = document.querySelector('.overlay');
const popupPlace = document.querySelector('#popup-card');

const configs = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save',
    inputErrorClass: '.form__item-input_invalid',
    errorClass: '.form__item-error_field_'
  }; 

const handleSubmitPlace = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const link = e.target.link.value;
    closePopups(popupPlace);
    renderNewCards({name, link},list);
};

function renderNewCards(data, container) {
    const card = new Card (data, selectors.template)
    const cardElement = card.createNewCard();
    container.prepend(cardElement);
}

function openPopups(popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeEscapeKey);
    popup.querySelector('.overlay').addEventListener('click', function(e) {
        closePopupOverlay(e,popup)});
}

function openProfile(popap){
    nameInput.value=nameProfile.textContent;
    jobInput.value=jobProfile.textContent;
    openPopups(popap);
}

function closePopups(popap){
    popap.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEscapeKey);
}

function closePopupOverlay(event,popap){
    if(event.target === event.currentTarget){
    closePopups(popap);}
}

function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value; 
    jobProfile.textContent = jobInput.value; 
    closePopups(popupProfile);
}

export function openPicture(picture,title){
    pictureImage.src=picture;
    pictureName.textContent=title;
    pictureImage.alt=title;
    picturePopap.classList.add('popup_opened');
    picturePopap.querySelector('.overlay').addEventListener('click', function(e) {
        closePopupOverlay(e,picturePopap)});
    document.addEventListener('keydown', closeEscapeKey);
}

function closeEscapeKey(evt){
    if(evt.code === 'Escape'){
      closePopups(document.querySelector('.popup_opened'));
    }
}

function createInitialCards(){
    initialCards.forEach((item) => renderNewCards(item, list))
    }

function openPopupPlace(cardProfile){
    formPlace.name.value = ""; 
    formPlace.link.value = "";
    openPopups(cardProfile);
};

function enableValidation(formsConfig) {
    const formList = Array.from(document.querySelectorAll(formsConfig.formSelector));
    formList.forEach((formElement) => {
      const validator = new FormValidator(formElement, formsConfig);
      
      validator.enableValidation();
    });
}

enableValidation(configs);

cardAdd.addEventListener('click', function(){
    formPlace.querySelector(selectors.submitFormPlace).setAttribute('disabled', 'disabled');
    openPopupPlace(cardProfile)});

cardClose.addEventListener('click', function(){
    closePopups(cardProfile)});

pictureClose.addEventListener('click', function(){
    closePopups(picturePopap)});

profileOpen.addEventListener('click', function(){
    openProfile(popupProfile)});

profileExit.addEventListener('click', function(){
    closePopups(popupProfile)});

popupProfile.addEventListener('submit', handleProfileFormSubmit);

createInitialCards();

formPlace.addEventListener('submit', handleSubmitPlace);