const editForm = document.querySelector('.edit-form');
const overlay = document.querySelector('.overlay');
const profileEditButton = document.querySelector('.profile__edit-button');
let inputName = document.querySelector('#name');
let inputAboutMe = document.querySelector('#aboutme');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__profession');
const editFormCloseButton = document.querySelector('.edit-form__close-button');
const elementsGridElement = document.querySelector('.elements__grid-element');
const saveButton = document.querySelector('.edit-form__save-button');

function popupEditForm() {
    inputName.value = "";
    inputAboutMe.value = "";
    editForm.classList.toggle('popup');
    overlay.classList.toggle('popup');
    
    inputName.value = profileName.textContent;
    inputAboutMe.value = profileAboutMe.textContent;
}

function editFormSaveButton() {
    editForm.classList.remove('popup');
    overlay.classList.remove('popup');

    profileAboutMe.textContent = inputAboutMe.value;
    profileName.textContent = inputName.value;    
}

profileEditButton.addEventListener('click', popupEditForm);

editFormCloseButton.addEventListener('click', popupEditForm);

saveButton.addEventListener('click', editFormSaveButton);

