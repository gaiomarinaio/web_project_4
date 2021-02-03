import { FormValidator, formObject } from './FormValidator.js';
import { initialCards, Card } from './Card.js';

//profile box
const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__profession');
const profileAddButton = document.querySelector('.profile__add-button');

//general popup
const popupForm = document.querySelector('.popup__form');

//edit form popup
const editForm = document.querySelector('.edit-form');
const editFormBox = document.querySelector('.edit-form__box');
const inputName = document.querySelector('.edit-form__name');
const inputAboutMe = document.querySelector('.edit-form__aboutme');
const editFormCloseButton = document.querySelector('.edit-form__close-button');
const saveButton = document.querySelector('.edit-form__save-button');
const editFormValidator = new FormValidator(formObject, editForm);

//add image popup
const addPlace = document.querySelector('.add-place');
const addPlaceCloseButton = document.querySelector('.add-place__close-button');
const addPlaceBox = document.querySelector('.add-place__box');
const addPlaceImageTitle = document.querySelector('.add-place__image-title');
const addPlaceImageLink = document.querySelector('.add-place__image-link');
const addFormValidator = new FormValidator(formObject, addPlace);

//image grid
const cardTemplate = document.querySelector('.card-template').content.querySelector('.elements__grid-element');
const elementsBlock = document.querySelector('.elements__block');

//image preview popups
const popupImage = document.querySelector('.popup-image');
const popupImageElement = popupImage.querySelector('.popup-image__element');
const popupImageCloseButton = popupImage.querySelector('.popup-image__close-button');
const popupImageImage = popupImage.querySelector('.popup-image__image');
const popupImageTitle = popupImage.querySelector('.popup-image__title');


//opening and closing functionalities
//close popup using 'escape' key and clicking on overlay
const closePopupWithEsc = (evt) => {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    if(popupOpened) {
      closePopup(popupOpened);
    };
  }
};
const closePopupWithOverlayClick = () => {
  const popups = Array.from(document.querySelectorAll('.popup'));
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
      }
      if (evt.target.classList.contains('close-button')) {
        closePopup(popup)
      }
    });
  });
};
//generic popup toggles
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEsc);
}
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEsc);
}

//apply the validation to all forms
editFormValidator.enableValidation();
addFormValidator.enableValidation();

const createCard = (cardInfo, cardTemplate) => {
  const card = new Card(cardInfo, cardTemplate);
  elementsBlock.prepend(card.createNewCard());
}

addPlaceBox.addEventListener('submit', ((evt) => {
  evt.preventDefault();
  createCard({
    name: addPlaceImageTitle.value,
    link: addPlaceImageLink.value
  }, '#card-template');
  closePopup(addPlace);
  popupFormReset(addPlaceBox);
}));

//card adding listeners on popup
profileAddButton.addEventListener('click', () => {
  addFormValidator.resetValidation();
  openPopup(addPlace); 
});


//profile popup functions
const openPopupEditForm = () => {
    
    inputName.value = profileName.textContent;
    inputAboutMe.value = profileAboutMe.textContent;
    editFormValidator.resetValidation();
    openPopup(editForm);
    //popupFormReset(editFormBox);
};
const saveEditFormButton = (evt) => {
    evt.preventDefault();
    profileAboutMe.textContent = inputAboutMe.value;
    profileName.textContent = inputName.value;
    closePopup(editForm);
};
profileEditButton.addEventListener('click', openPopupEditForm);

editFormBox.addEventListener('submit', saveEditFormButton);

//forms reset content
const popupFormReset = (popupForm) => {
  popupForm.reset();
};

//closing popup from overlay
closePopupWithOverlayClick();

const initialCardsLoader = () => {
  initialCards.forEach((properties) => {
    createCard(properties, '#card-template');
  })
}
initialCardsLoader();

export { openPopup, popupImage, popupImageImage, popupImageTitle };
