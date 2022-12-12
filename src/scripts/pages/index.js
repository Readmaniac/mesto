import './index.css';

import {
  profileEditBtn, formEditProfile, config, formAddNewCard,
  popupAddNewCardOpenBtn, nameInput, jobInput,
  buttonEditAvatar, formEditAvatar, avatar
} from '../utils/constants.js';
import Section from "../components/Section.js";
import FormValidator from '../components/FormValidator.js';
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";


/* ---------- API ----------- */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-31',
  headers: {
    authorization: '149edd5b-e153-46c6-af52-dbaf211389a2',
    'Content-Type': 'application/json'
  }
});

let userId;

// Загрузка готовых карточек и данных о пользователе с сервера
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });



/* -------------- Профиль юзера --------------- */
// создание экземпляра класса, отвечающего за отображение информации о пользователе
const userInfo = new UserInfo({
  username: '.profile__title',
  job: '.profile__description',
  avatar: '.profile__avatar'
});


// создание попапа с формой редактирования профиля
const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (dataForm) => {
    editProfilePopup.loading(true);
    api.editUserInfo(dataForm)
      .then((dataForm) => {
        userInfo.setUserInfo(dataForm);
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editProfilePopup.loading(false);
      });
  }
});
editProfilePopup.setEventListeners();

// Заносим данные в форму попапа редактирования профиля
function fillInEditProfileFormInputs({ username, job }) {
  nameInput.value = username;
  jobInput.value = job;
}

// Создание попапа редактирования аватара пользователя
const editAvatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (data) => {
    editAvatarPopup.loading(true);
    api.editAvatar(data)
      .then((data) => {
        avatar.src = data.avatar;
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editAvatarPopup.loading(false);
      });
  }
});
editAvatarPopup.setEventListeners();
// Обработчик кнопки Edit аватара пользователя
buttonEditAvatar.addEventListener('click', () => {
  formEditAvatarValidator.toggleButtonState();
  editAvatarPopup.open();
});
// Обработчик кнопки Edit попапа редактирования профиля
profileEditBtn.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  fillInEditProfileFormInputs({
    username: info.username,
    job: info.job
  });
  editProfilePopup.open();
});


/* ----------- Карточки с изображениями ----------- */

// функционал создания новой карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    cardSelector: '.element-template',
    userId: userId,
    handleCardClick: (name, link) => {
      viewImagePopup.open(name, link);
    },
    handleDeleteIconClick: (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.submitCallback(() => {
        api.deleteCard(cardId)
          .then(() => {
            deleteCardPopup.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
    handleSetLike: (cardId) => {
      api.setLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleRemoveLike: (cardId) => {
      api.deleteLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
};

// Создание экземпляра класса Section
const cardsList = new Section({
  renderer: (card) => {
    cardsList.addItem(createCard(card));
  },
}, '.elements');

// Создаем попап с подтверждением удаления карточки
const deleteCardPopup = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete-card'
});
deleteCardPopup.setEventListeners();

// создание попапа с формой добавления новой карточки
const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  handleFormSubmit: (formData) => {
    addCardPopup.loading(true);
    api.addCard(formData)
      .then((formData) => {
        cardsList.addItem(createCard(formData));
        addCardPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        addCardPopup.loading(false);
      });
  }
});
// добавляем слушатели этому попапу:
addCardPopup.setEventListeners();
// обработчик открытия попапа
popupAddNewCardOpenBtn.addEventListener('click', () => {
  formAddNewCardValidator.toggleButtonState();
  addCardPopup.open();
})

/* Попап просмотра изображения */
const viewImagePopup = new PopupWithImage('.popup_type_image');
viewImagePopup.setEventListeners();


/* Валидация форм */
// валидация формы редактирования профиля
const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();
// валидация формы добавления новой карточки
const formAddNewCardValidator = new FormValidator(config, formAddNewCard);
formAddNewCardValidator.enableValidation();
// Валидация формы редактирования аватара пользователя
const formEditAvatarValidator = new FormValidator(config, formEditAvatar);
formEditAvatarValidator.enableValidation();



