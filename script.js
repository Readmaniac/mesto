let popupProfile = document.querySelector('.popup');
let profileOpen = document.querySelector('.profile__edit-button');
let profileExit = document.querySelector('.form__close-icon');
let setStatus = document.querySelector('.popup_opened');


function controlProfile(){
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
    let nameInput = document.querySelector('.form__field-name');
    let name = document.querySelector('.profile__title');
    name.textContent = nameInput.value; 
    let jobInput = document.querySelector('.form__field-text');
    let job = document.querySelector('.profile__subtitle');
    job.textContent = jobInput.value; 
    controlProfile();
}
saveProfile.addEventListener('click', formSubmitHandler);

