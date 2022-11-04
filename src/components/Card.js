export class Card{
    constructor({data, template, userId, popupDeleteCard, handleCardClick, handleCardDelete, handleSetLike, handleRemoveLike}){
        this._data = data;
        this._cardId = data._id;
        this._userId = userId;
        //this._cardOwnerId = data.owner._id;
        this._template = template;
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._popupDeleteCard = popupDeleteCard;
        this._handleCardDelete = handleCardDelete;
        this._handleSetLike = handleSetLike;
        this._handleRemoveLike = handleRemoveLike;
    }
  
    createNewCard(){
        this._cardElement = this._getTemplate();
        this._cardTitle = this._cardElement.querySelector('.elements__name');
        this._cardTitle.textContent = this._name;
        this._cardImage = this._cardElement.querySelector('.elements__image');
        this._elementsLike = this._cardElement.querySelector('.elements__likes-btn');
        this._likesNumber = this._cardElement.querySelector('.elements__likes-number');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._deleteCardButton = this._cardElement.querySelector('.elements__delete');
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
        this._deleteCardButton.addEventListener('click', () => {
            this._handleCardDelete(this._cardId);
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)});

        this._elementsLike.addEventListener('click', () => {
            if (this._elementsLike.classList.contains('elements__like_active')){
                this._handleSetLike(this._cardId)
            } else {
                this._handleRemoveLike(this._cardId);
            }
        });
    }

    handleLikeCard(data){
        this._elementsLike.classList.toggle('elements__like_active');
/*         this._likes = data.likes;
        this._likesNumber.textContent = this._likes.length; */
    }

    getId(){
        return this._data._id;
    }
}

