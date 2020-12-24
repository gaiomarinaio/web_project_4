//general links to DOM
const editForm = document.querySelector('.edit-form');
const editFormBox = document.querySelector('.edit-form__box');
const profileEditButton = document.querySelector('.profile__edit-button');
const inputName = document.querySelector('.edit-form__name');
const inputAboutMe = document.querySelector('.edit-form__aboutme');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__profession');
const editFormCloseButton = document.querySelector('.edit-form__close-button');
const saveButton = document.querySelector('.edit-form__save-button');
const elementsBlock = document.querySelector('.elements__block');
const cardTemplate = document.querySelector('.card-template').content.querySelector('.elements__grid-element');
const addPlace = document.querySelector('.add-place');
const addPlaceCloseButton = document.querySelector('.add-place__close-button');
const addPlaceBox = document.querySelector('.add-place__box');
const profileAddButton = document.querySelector('.profile__add-button');
const addPlaceImageTitle = document.querySelector('.add-place__image-title');
const addPlaceImageLink = document.querySelector('.add-place__image-link');
const popupImage = document.querySelector('.popup-image');
const popupImageElement = popupImage.querySelector('.popup-image__element');
const popupImageCloseButton = popupImage.querySelector('.popup-image__close-button');
const popupImageImage = popupImage.querySelector('.popup-image__image');
const popupImageTitle = popupImage.querySelector('.popup-image__title');


//initial card layout
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

//card creating function
function createNewCard(cardName, cardLink) {
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

popupImageCloseButton.addEventListener('click', () => {
  popupImage.classList.remove('popup_opened');
});

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

//picture popup
function openPopupImage(cardName, cardLink) {
  popupImageTitle.textContent = cardName;
  popupImageImage.src = cardLink;
  
  togglePopup(popupImage)
  
};


//load initial cards
initialCards.forEach((properties) => {
  elementsBlock.prepend(createNewCard(properties.name, properties.link));
});

//card adding clickables
profileAddButton.addEventListener('click', toggleAddPlacePopup);
addPlaceCloseButton.addEventListener('click', toggleAddPlacePopup);

//card add popup functions
function toggleAddPlacePopup() {
  togglePopup(addPlace);
}

addPlaceBox.addEventListener('submit', ((e) => {
  e.preventDefault();
  elementsBlock.prepend(createNewCard(addPlaceImageTitle.value, addPlaceImageLink.value));
  togglePopup(addPlace);
}));

//profile popup functions
function openPopupEditForm() {
    inputName.value = profileName.textContent;
    inputAboutMe.value = profileAboutMe.textContent;
    togglePopup(editForm);
}
function closePopupEditForm() {
  togglePopup(editForm);
}
function saveEditFormButton(e) {
    e.preventDefault();
    profileAboutMe.textContent = inputAboutMe.value;
    profileName.textContent = inputName.value;
    togglePopup(editForm);
}

profileEditButton.addEventListener('click', openPopupEditForm);
editFormCloseButton.addEventListener('click', closePopupEditForm);
editFormBox.addEventListener('submit', saveEditFormButton);

/*

*/