import './index.css';
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithSubmit} from "../components/PopupWithSubmit.js";
import {UserInfo} from "../components/UserInfo.js";
import {Api} from "../components/Api";

import {profileOpen,
        selectors,
        configs,
        cardAdd,
        profileAvatar,
        formValidators,
        popupDeleteCard,
        waitText,
        saveText} from "../utils/constants.js";

/*---API---*/
const apiConfig = {
  url: 'https://nomoreparties.co/v1/cohort-54',
  headers: {
    'Content-Type': 'application/json',
      authorization: '7ad4b367-9863-4a09-9138-d86794effb54'
  }
}

const api = new Api(apiConfig);
let userId = null;

/*---Загрузка готовых карточек и данных о пользователе с сервера---*/
Promise.all([api.getAllCards(), api.getUsersInfo()])
  .then(([allCards, userData]) => {
    userId = userData._id;
    profileUserInfo.setUserInfo(userData);
    allCards.forEach((card) => {
    //allCards.slice(0,9).forEach((card) => {
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
    profilePopupWithForm.toggleSubmitButtonText(waitText);
    api.editUserInfo(dataForm)
      .then((dataForm) => {
        profileUserInfo.setUserInfo(dataForm);
        profilePopupWithForm.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        profilePopupWithForm.toggleSubmitButtonText(saveText);
      });
  }
});

profilePopupWithForm.setEventListeners();

/*---Попап редактирования аватара---*/
const avatarPopup = new PopupWithForm({
  popupSelector: selectors.popupAvatar,
  handleFormSubmit: (data) => {
    avatarPopup.toggleSubmitButtonText(waitText);
    api.editUserAvatar(data)
      .then((data) => {
        profileUserInfo.setAvatar(data);
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        profilePopupWithForm.toggleSubmitButtonText(saveText);
      });
  }
});
avatarPopup.setEventListeners();

/*---Попап редактирования карточек---*/
const placePopupWithForm = new PopupWithForm({
  popupSelector: selectors.formCard, 
  handleFormSubmit: (data) => {
    placePopupWithForm.toggleSubmitButtonText(waitText);
    api.addCard(data)
    .then((data) =>{
      placePopupWithForm.close();
      cardSection.renderItem(data);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      profilePopupWithForm.toggleSubmitButtonText(saveText);
    });
  }
});

placePopupWithForm.setEventListeners();

const imagePopup = new PopupWithImage(selectors.popupImage);
imagePopup.setEventListeners();

const cardSection = new Section(selectors.list, (cardItem) => {
    cardSection.addItem(renderNewCard(cardItem))
});

const profileUserInfo = new UserInfo(selectors.profileName, selectors.profileJob, selectors.profileAvatar);

const cardDeleteConfirmPopup = new PopupWithSubmit(selectors.popupDeleteCard);
cardDeleteConfirmPopup.setEventListeners();

//Функционал создания новой карточки
function renderNewCard(data) {
    const card = new Card ({
      data, 
      template: selectors.template,
      userId: userId,

      handleCardClick:() =>{
        imagePopup.open(data.name, data.link);
      },

      handleCardDelete: (cardId) => {
        cardDeleteConfirmPopup.open();
        cardDeleteConfirmPopup.setSubmitCallback(() => {
          api.removeCard(cardId)
            .then(() => {
              cardDeleteConfirmPopup.close();
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

function openPopupProfile(){
    const infoFromPage = profileUserInfo.getUserInfo();
    profilePopupWithForm.setInputValues(infoFromPage);
    profilePopupWithForm.open();
    formValidators['profile'].resetValidation();
}

profileOpen.addEventListener('click', openPopupProfile);

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