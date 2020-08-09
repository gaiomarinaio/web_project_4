const editForm = document.querySelector('.edit-form');
const editFormBox = document.querySelector('.edit-form__box');
const profileEditButton = document.querySelector('.profile__edit-button');
const inputName = document.querySelector('.edit-form__name');
const inputAboutMe = document.querySelector('.edit-form__aboutme');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__profession');
const editFormCloseButton = document.querySelector('.edit-form__close-button');
const elementsGridElement = document.querySelector('.elements__grid-element');
const saveButton = document.querySelector('.edit-form__save-button');

function popupEditForm() {
    inputName.value = profileName.textContent;
    inputAboutMe.value = profileAboutMe.textContent;
    editForm.classList.toggle('edit-form_opened');
}

function popupCloseForm() {
    editForm.classList.toggle('edit-form_opened');
}

function editFormSaveButton(e) {
    e.preventDefault();
    profileAboutMe.textContent = inputAboutMe.value;
    profileName.textContent = inputName.value;
    popupCloseForm();
}

profileEditButton.addEventListener('click', popupEditForm);

editFormCloseButton.addEventListener('click', popupCloseForm);

editFormBox.addEventListener('submit', editFormSaveButton);