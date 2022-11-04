import './index.css';
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithSubmit} from "../components/PopupWithSubmit.js";
import {UserInfo} from "../components/UserInfo.js";
import {Api} from "../components/Api";
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
        profileAvatar,
        formValidators,
        popupDeleteCard} from "../utils/constants.js";

/*---API---*/
const config = {
  url: 'https://nomoreparties.co/v1/cohort-51',
  headers: {
    'Content-Type': 'application/json',
      authorization: '0b524fe0-ba0b-48ec-97a9-90bd5fb80134'
  }
}

const api = new Api(config);
let userId = null;

/*---Загрузка готовых карточек и данных о пользователе с сервера---*/
Promise.all([api.getAllCards(), api.getUsersInfo()])
  .then(([allCards, userData]) => {
    userId = userData._id;
    profileUserInfo.setUserInfo(userData);
    allCards.slice(0,9).forEach((card) => {
        cardSection.renderItem(card)
    })
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

/*---Попап редактирования профиля---*/
const profilePopupWithForm = new PopupWithForm({
  popupSelector: selectors.popupProfile,
  handleFormSubmit: (dataForm) => {
    api.editUserInfo(dataForm)
      .then((dataForm) => {
        profileUserInfo.setUserInfo(dataForm);
        profilePopupWithForm.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }
});

profilePopupWithForm.setEventListeners();

/*---Попап редактирования аватара---*/
const avatarPopup = new PopupWithForm({
  popupSelector: selectors.popupAvatar,
  handleFormSubmit: (data) => {
    api.editUserAvatar(data)
      .then((data) => {
        console.log(profileAvatar);
        profileAvatar.src = data.avatar;
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }
});
avatarPopup.setEventListeners();

/*---Попап редактирования карточек---*/
const placePopupWithForm = new PopupWithForm({
  popupSelector: selectors.formCard, 
  handleFormSubmit: (data) => {
    api.addCard(data)
    .then((data) =>{
      placePopupWithForm.close();
      cardSection.renderItem(data);
    }
)}
});

placePopupWithForm.setEventListeners();

const imagePopup = new PopupWithImage(selectors.popupImage);
imagePopup.setEventListeners();

const cardSection = new Section(selectors.list, (cardItem) => {
    cardSection.addItem(renderNewCard(cardItem))
});

const profileUserInfo = new UserInfo(selectors.profileName, selectors.profileJob, selectors.profileAvatar);

const deleteCardPopup = new PopupWithSubmit(selectors.popupDeleteCard);
deleteCardPopup.setEventListeners();

function renderNewCard(data) {
    const card = new Card ({
      data, 
      template: selectors.template,
      userId: userId,
      popupDeleteCard,
      handleCardClick:() =>{
        imagePopup.open(data.name, data.link);
      },
      handleCardDelete: (cardId) => {
        deleteCardPopup.open();
        deleteCardPopup.submitCallback(() => {
          api.removeCard(cardId)
            .then(() => {
              deleteCardPopup.close();
              card.deleteCard();
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
        });
      },
      handleSetLike: (cardId) =>{
        api.setLike(cardId)
          .then((data) => {
            card.handleLikeCard(data)
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      },
      handleRemoveLike: (cardId) => {
        api.removeLike(cardId)
          .then((data) => {
            card.handleLikeCard(data)
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      }
  });
    return card.createNewCard();
}

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

profileAvatar.addEventListener('click', () => {
  //formValidators['place'].resetValidation();
  avatarPopup.open();
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