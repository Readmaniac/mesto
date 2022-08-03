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
    inputMesto: 'field-mesto',
    inputLink: 'link-mesto',
    list: '.todos__list',
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
    pictureName:'.picture__name'
}
const cardProfile = document.getElementById(selectors.formCard);
const list = document.querySelector(selectors.list);
const inputMesto = document.getElementById(selectors.inputMesto);
const inputLink =  document.getElementById(selectors.inputLink);
const cardAdd = document.querySelector(selectors.addCard);
const template = document.querySelector(selectors.template).content.querySelector(selectors.container);
const cardClose = document.getElementById(selectors.addCardFormClose);
const picturePopap = document.getElementById(selectors.popupImage);
const pictureImage = document.querySelector(selectors.pictureImage);
const pictureName = document.querySelector(selectors.pictureName);
const pictureClose = document.getElementById(selectors.closePicture);

function openPopups(popap){
    nameInput.value=nameProfile.textContent;
    jobInput.value=jobProfile.textContent;
    popap.classList.add('popup_opened');
}

function closePopups(popap){
    popap.classList.remove('popup_opened');
}

function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value; 
    jobProfile.textContent = jobInput.value; 
    closePopups(popupProfile);
}

function createCard(title, link){
    const cardElement = template.cloneNode(true);
    const cardTitle = cardElement.querySelector(selectors.mestoTitle);
    cardTitle.textContent = title;
    const cardLink = cardElement.querySelector(selectors.mestoImage);
    cardLink.src = link;
    cardLink.alt = title;

    const deleteCard = cardElement.querySelector(selectors.mestodelete);
    deleteCard.addEventListener('click', function(){
        cardElement.remove();
    });

    const likeButton = cardElement.querySelector(selectors.mestoLike);
    likeButton.addEventListener('click', function(){
        addLike(likeButton);
    });

    cardLink.addEventListener('click', function(){
        openPicture(cardLink,cardTitle);
    });

    return cardElement;
}

function addLike(like){
    like.classList.toggle(selectors.activeLike);
}

function openPicture(picture,title){
    pictureImage.src=picture.src;
    pictureName.textContent=title.textContent;
    pictureImage.alt=title.textContent;
    openPopups(picturePopap)
}

function createInitialCards(){
    initialCards.forEach((item) => renderCards(item, list))
    }

function renderCards(data, container, position = 'prepend') {
    const cards = createCard(data.name, data.link);
    switch (position) {
      case "append": return container.append(cards);
      case "prepend": return container.prepend(cards);
      case "before": return container.before(cards);
      case "after": return container.after(cards);
      default: return;
    }
}

function createNewCard(){
    cardProfile.addEventListener('submit', function (event) {
        event.preventDefault();
        const inputCard = {
            name: inputMesto.value,
            link: inputLink.value
        }
        renderCards(inputCard,list);
        closePopups(cardProfile);
    })
}

profileOpen.addEventListener('click', function(){
    openPopups(popupProfile)});
profileExit.addEventListener('click', function(){
    closePopups(popupProfile)});

profileSave.addEventListener('click', handleProfileFormSubmit);
profileSave.addEventListener('submit', handleProfileFormSubmit);

cardAdd.addEventListener('click', function(){
    openPopups(cardProfile);
});

cardClose.addEventListener('click', function(){
    closePopups(cardProfile);
});

pictureClose.addEventListener('click', function(){
    closePopups(picturePopap);
})

createNewCard();
createInitialCards();