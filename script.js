const popupProfile = document.querySelector('.popup');
const profileOpen = document.querySelector('.profile__edit-button');
const profileExit = document.querySelector('.form__close-icon');
const setStatus = document.querySelector('.popup_opened');
const nameInput = document.getElementById('field-name');
const nameProfile = document.querySelector('.profile__title');
const jobInput = document.getElementById('field-job');
const jobProfile = document.querySelector('.profile__subtitle');

function controlProfile(){
    nameInput.value=nameProfile.textContent;
    jobInput.value=jobProfile.textContent;
    popupProfile.classList.toggle('popup_opened');
}
profileOpen.addEventListener('click', controlProfile);



profileExit.addEventListener('click', controlProfile);

popupProfile.addEventListener('click', function(event) {
    if (event.target === event.currentTarget){
        controlProfile()
    }
});

let saveProfile = document.querySelector('.form__save');


function formSubmitHandler (evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value; 
    jobProfile.textContent = jobInput.value; 
    controlProfile();
}
saveProfile.addEventListener('click', formSubmitHandler);


let likeButton = document.querySelector('.elements__like');
function likeAdd(){
    likeButton.classList.toggle('elements__like_active');
}
likeButton.addEventListener('click', likeAdd);
