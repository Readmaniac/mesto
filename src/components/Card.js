export const initialCards = [
    {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 

export class Card{
    constructor(data, template, handleCardClick){
      this._template = template;
      this._name = data.name;
      this._link = data.link;
      this._handleCardClick = handleCardClick;
      
    }
  
    createNewCard(){
        this._cardElement = this._getTemplate();
        this._cardTitle = this._cardElement.querySelector('.elements__name');
        this._cardTitle.textContent = this._name;
        this._cardImage = this._cardElement.querySelector('.elements__image');
        this._elementsLike = this._cardElement.querySelector('.elements__like');
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

    _deleteCard(){
        this._cardElement.remove();
    }

    _setsEventListeners(){
        this._deleteCardButton.addEventListener('click', () => {
            this._deleteCard()});

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)});

        this._elementsLike.addEventListener('click', () => {
            this._toggleLike()});
    }

    _toggleLike(){
        this._elementsLike.classList.toggle('elements__like_active');
    }
}

