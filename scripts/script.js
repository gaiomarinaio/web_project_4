import { enableValidation, formObject } from './validate.js';

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

//add image popup
const addPlace = document.querySelector('.add-place');
const addPlaceCloseButton = document.querySelector('.add-place__close-button');
const addPlaceBox = document.querySelector('.add-place__box');
const addPlaceImageTitle = document.querySelector('.add-place__image-title');
const addPlaceImageLink = document.querySelector('.add-place__image-link');

//image grid
const cardTemplate = document.querySelector('.card-template').content.querySelector('.elements__grid-element');
const elementsBlock = document.querySelector('.elements__block');

//image preview popups
const popupImage = document.querySelector('.popup-image');
const popupImageElement = popupImage.querySelector('.popup-image__element');
const popupImageCloseButton = popupImage.querySelector('.popup-image__close-button');
const popupImageImage = popupImage.querySelector('.popup-image__image');
const popupImageTitle = popupImage.querySelector('.popup-image__title');

//initial card layout
const initialCards = [
  {
    name: 'Yosemite Valley',
    link: 'https://code.s3.yandex.net/web-code/yosemite.jpg'
  },
  {
    name: 'Lake Louise',
    link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg'
  },
  {
    name: 'Bald Mountains',
    link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg'
  },
  {
    name: 'Latemar',
    link: 'https://code.s3.yandex.net/web-code/latemar.jpg'
  },
  {
    name: 'Vanoise National Park',
    link: 'https://code.s3.yandex.net/web-code/vanoise.jpg'
  },
  {
    name: 'Lago di Braies',
    link: 'https://code.s3.yandex.net/web-code/lago.jpg'
  }
];

//card creating function
const createNewCard = (cardName, cardLink) => {
  const elementsGridElement = cardTemplate.cloneNode(true); //cloned with child
  const elementsImage = elementsGridElement.querySelector('.elements__image');
  const elementsText = elementsGridElement.querySelector('.elements__text');
  const elementsLikeButton = elementsGridElement.querySelector('.elements__like-button');
  const elementsDeleteButton = elementsGridElement.querySelector('.elements__delete-button');
  //cards creation
  elementsText.textContent = cardName;
  elementsImage.alt = cardName;
  elementsImage.src = cardLink;
  
  //card functionality
  elementsLikeButton.addEventListener('click', () => {elementsLikeButton.classList.toggle('elements__like-button_active');
});  
  elementsDeleteButton.addEventListener('click', () => {
    const deletableElement = elementsDeleteButton.closest('.elements__grid-element');
    deletableElement.remove();
  });

  elementsImage.addEventListener('click', () => {openPopupImage(cardName, cardLink)});
  return elementsGridElement;
};

//close popup using 'escape' key and clicking on overlay
const closePopupWithEsc = (evt) => {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    if(popupOpened) {
      togglePopup(popupOpened);
    };
  }
};
const closePopupWithOverlayClick = () => {
  const popup = Array.from(document.querySelectorAll('.popup'));
  popup.forEach((popupForm) => {
    popupForm.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup_opened')) {
        togglePopup(evt.target);
      }
    });
  });
};

popupImageCloseButton.addEventListener('click', () => {
  popupImage.classList.remove('popup_opened');
});

//generic popup toggle
const togglePopup = (popup) => {
  popup.classList.toggle('popup_opened');
};

//picture popup
const openPopupImage = (cardName, cardLink) => {
  popupImageTitle.textContent = cardName;
  popupImageImage.src = cardLink;
  togglePopup(popupImage);
};

//load initial cards
initialCards.forEach((properties) => {
  elementsBlock.prepend(createNewCard(properties.name, properties.link));
});

//card add popup functions
const toggleAddPlacePopup = () => {
  togglePopup(addPlace);
};

//card adding clickables
profileAddButton.addEventListener('click', toggleAddPlacePopup);
addPlaceCloseButton.addEventListener('click', toggleAddPlacePopup);

addPlaceBox.addEventListener('submit', ((evt) => {
  evt.preventDefault();
  elementsBlock.prepend(createNewCard(addPlaceImageTitle.value, addPlaceImageLink.value));
  togglePopup(addPlace);
  popupFormReset(addPlaceBox);
}));

//profile popup functions
const openPopupEditForm = () => {
    inputName.value = profileName.textContent;
    inputAboutMe.value = profileAboutMe.textContent;
    togglePopup(editForm);
    popupFormReset(editFormBox);
};
const closePopupEditForm = () => {
  togglePopup(editForm);
};
const saveEditFormButton = (evt) => {
    evt.preventDefault();
    profileAboutMe.textContent = inputAboutMe.value;
    profileName.textContent = inputName.value;
    togglePopup(editForm);
};
profileEditButton.addEventListener('click', openPopupEditForm);
editFormCloseButton.addEventListener('click', closePopupEditForm);
editFormBox.addEventListener('submit', saveEditFormButton);

//forms reset content
const popupFormReset = (popupForm) => {
  popupForm.reset();
};

//closing popup listener and function
document.addEventListener('keydown', closePopupWithEsc);
closePopupWithOverlayClick();

//enable form validation
enableValidation(formObject);