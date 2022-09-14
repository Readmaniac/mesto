import './index.css';
import {Card, initialCards} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
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
import {profileOpen,
        selectors,
        configs,
        cardAdd,
        formValidators} from "../utils/constants.js";

const imagePopup = new PopupWithImage(selectors.popupImage);
imagePopup.setEventListeners();
const cardSection = new Section(selectors.list, (cardItem) => {
    cardSection.addItem(renderNewCard(cardItem))
});

initialCards.forEach( card => {
    cardSection.renderItem(card)
});

const profileUserInfo = new UserInfo(selectors.profileName, selectors.profileJob);

const profilePopupWithForm = new PopupWithForm(selectors.popupProfile, handleProfileFormSubmit);
profilePopupWithForm.setEventListeners();

const placePopupWithForm = new PopupWithForm(selectors.formCard, handleSubmitPlace);
placePopupWithForm.setEventListeners();

function renderNewCard(data) {
    const card = new Card (data, selectors.template, () =>{
        imagePopup.open(data.name, data.link);
    });
    return card.createNewCard();
}

function handleProfileFormSubmit (data) {
    profileUserInfo.setUserInfo(data);
    profilePopupWithForm.close();
};

function handleSubmitPlace (data) {
    placePopupWithForm.close();
    cardSection.renderItem(data);
};

profileOpen.addEventListener('click', () => {
    const infoFromPage = profileUserInfo.getUserInfo();
    profilePopupWithForm.setInputValues(infoFromPage);
    profilePopupWithForm.open();
    formValidators['profile'].resetValidation();
});

cardAdd.addEventListener('click', () => {
    formValidators['place'].resetValidation();
    placePopupWithForm.open();
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