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

//picture popup
const openPopupImage = (cardName, cardLink) => {
  popupImageTitle.textContent = cardName;
  popupImageImage.src = cardLink;
  openPopup(popupImage);
};

//load initial cards
initialCards.forEach((properties) => {
  elementsBlock.prepend(createNewCard(properties.name, properties.link));
});

//card adding listeners on popup
profileAddButton.addEventListener('click', () => {
  openPopup(addPlace); 
});
addPlaceBox.addEventListener('submit', ((evt) => {
  evt.preventDefault();
  elementsBlock.prepend(createNewCard(addPlaceImageTitle.value, addPlaceImageLink.value));
  closePopup(addPlace);
  popupFormReset(addPlaceBox);
}));

//profile popup functions
const openPopupEditForm = () => {
    inputName.value = profileName.textContent;
    inputAboutMe.value = profileAboutMe.textContent;
    openPopup(editForm);
    popupFormReset(editFormBox);
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

//enable form validation
enableValidation(formObject);