// находим попап редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit');
// находим кнопку для открытия попапа редактирования профиля
const profileEditBtn = document.querySelector('.profile__edit-button');
// находим форму попапа редактирования профиля
const formEditProfile = popupEditProfile.querySelector('.popup__form');
// находим инпуты формы попапа редактирования профиля
const nameInput = formEditProfile.querySelector('#name');
const jobInput = formEditProfile.querySelector('#job');
// Находим попап добавления карточки
const popupAddNewCard = document.querySelector('.popup_type_new-card');
// находим кнопку для открытия попапа добавления новой карточки
const popupAddNewCardOpenBtn = document.querySelector('.profile__add-button');
// находим форму попапа добавления новой карточки
const formAddNewCard = popupAddNewCard.querySelector('.popup__form');
// попап редактирования аватара пользователя
const popupEditAvatar = document.querySelector('.popup_type_avatar');
// Форма редактирования аватара пользователя
const formEditAvatar = popupEditAvatar.querySelector('.popup__form');
// кнопка редактирования аватара пользователя
const buttonEditAvatar = document.querySelector('.profile__avatar-btn');
// аватар пользователя
const avatar = document.querySelector('.profile__avatar');

// объект с селекторами
const config = {
  popupForm : '.popup__form',
  inputErrorClass : 'form__input_type_error',
  inputErrorActive : 'form__input-error_active',
  formInput : '.form__input',
  formSubmit : '.form__submit',
};


export {popupEditProfile, profileEditBtn, formEditProfile, nameInput, jobInput, formAddNewCard,
  popupAddNewCardOpenBtn, popupAddNewCard, config, buttonEditAvatar, formEditAvatar,
avatar};
