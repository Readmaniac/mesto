export class Card{
    constructor({data, template, userId, handleCardClick, handleCardDelete, handleSetLike, handleRemoveLike}){
        this._data = data;
        this._cardId = data._id;
        this._userId = userId;
        this._cardOwnerId = data.owner._id;
        this._template = template;
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleSetLike = handleSetLike;
        this._handleRemoveLike = handleRemoveLike;
        this._likes = data.likes;

    }
  
    createNewCard(){
        this._cardElement = this._getTemplate();
        this._cardTitle = this._cardElement.querySelector('.elements__name');
        this._cardTitle.textContent = this._name;
        this._cardImage = this._cardElement.querySelector('.elements__image');
        this._buttonLike = this._cardElement.querySelector('.elements__likes-btn');
        this._likesNumber = this._cardElement.querySelector('.elements__likes-number');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._buttonDelete = this._cardElement.querySelector('.elements__delete');
        this._cardOwnerLike = this._hasUserLike();
        this._isCardLiked();
        this._setDeleteBtn()
        this._likesNumber.textContent = this._likes.length;
        this._setsEventListeners();

        return this._cardElement;
    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._template)
          .content
          .querySelector('.elements__container')
          .cloneNode(true);
    
        return cardElement;
      }

    deleteCard(){
        this._cardElement.remove();
        this._cardElement = null;
    }

    _setsEventListeners(){
        this._buttonDelete.addEventListener('click', () => {
            this._handleCardDelete(this._cardId);
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this)});

        this._buttonLike.addEventListener('click', () => {
            if (this._buttonLike.classList.contains('elements__likes_active')){
                this._handleRemoveLike(this._cardId);
            } else {
                this._handleSetLike(this._cardId)
            }
        });
    }

    handleLikeCard(data){
        this._buttonLike.classList.toggle('elements__likes_active');
        this._likes = data.likes;
        this._likesNumber.textContent = this._likes.length;
    }

    _isCardLiked() {
        if (this._cardOwnerLike) {
          this._buttonLike.classList.add('elements__likes_active');
        }
      }

    _hasUserLike(){
      this._likes.some((user) => {
        return this._userId === user._id;
      })
    }

    _setDeleteBtn() {
      if (this._userId !== this._cardOwnerId) {
        this._buttonDelete.remove();
      }
    }
}

