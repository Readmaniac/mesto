export default class Card {
  constructor({ data, cardSelector, userId, handleCardClick, handleDeleteIconClick, handleSetLike, handleRemoveLike }) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._likes = data.likes;
    this._handleSetLike = handleSetLike;
    this._handleRemoveLike = handleRemoveLike;
  }

  // Получаем шаблон карточки
  _getTemplate() {
      this._card = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return this._card;
  }

  // Удаление карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Устанавливаем слушатели на карточку
  _setEventListeners() {
    // открытие попапа просмотра изображения кликом по изображению
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
    // слушатель кнопки удаления карточки
    this._deleteBtn.addEventListener('click', () => {
      this._handleDeleteIconClick(this._cardId);
    })
    // слушатель кнопки лайк
    this._likeBtn.addEventListener('click', () => {
      if (this._likeBtn.classList.contains('element__like-btn_active')) {
        this._handleRemoveLike(this._cardId);
      } else {
        this._handleSetLike(this._cardId);
      }
    })
  }

  // Генерируем готовую карточку
  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.element__img');
    this._likeBtn = this._element.querySelector('.element__like-btn');
    this._likesNumber = this._element.querySelector('.element__likes-number');
    this._deleteBtn = this._element.querySelector('.element__delete-btn');

    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._hasDeleteBtn();
    this._isCardLiked();
    this._likesNumber.textContent = this._likes.length;
    this._setEventListeners();

    return this._element;
  }

  // Проверка, стоит ли лайк на карточке
  _isCardLiked() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._likeBtn.classList.add('element__like-btn_active');
    }
  }

  // поставить/удалить лайк, изменение количества лайков
  handleLikeCard(data) {
    this._likes = data.likes;
    this._likesNumber.textContent = this._likes.length;
    this._likeBtn.classList.toggle('element__like-btn_active');
  }

  // проверяем владельца карточки и убираем кнопку Delete
  _hasDeleteBtn() {
    if (this._userId !== this._cardOwnerId) {
      this._deleteBtn.remove();
    }
  }
}
