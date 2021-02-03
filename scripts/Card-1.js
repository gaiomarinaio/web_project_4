import { popupImageTitle, popupImageImage, popupImage, openPopup } from './index.js';

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

class Card {
  constructor(cardInfo, cardTemplate) {
    this._template = cardTemplate;
    this._name = cardInfo.name;
    this._link = cardInfo.link;
    this._alt = cardInfo.name;
  }

  _getTemplate() {
    const cardTemplateSelector = document.querySelector(this._template).content.querySelector('.elements__grid-element');
    return cardTemplateSelector;
  }

  _openPopupImage() {
    popupImageTitle.textContent = this._name;
    popupImageImage.src = this._link;
    popupImageImage.alt = this._alt;
    openPopup(popupImage);
  }

  _toggleLikeButton(evt) {
    evt.target.classList.toggle('elements__like-button_active');
  }

  _deleteCardButton(evt) {
    evt.target.closest('.elements__grid-element').remove();
  }

  _setEvenetListeners() {
    this.cardImage.addEventListener('click', this._openPopupImage.bind(this));
    this.cardLikeButton.addEventListener('click', this._toggleLikeButton);
    this.cardDeleteButton.addEventListener('click', this._deleteCardButton);
  }

  createNewCard() {
    this._cardElement = this._getTemplate().cloneNode(true);
    
    this.cardImage = this._cardElement.querySelector('.elements__image');
    this.cardText = this._cardElement.querySelector('.elements__text');
    this.cardImage.src = this._link;
    this.cardImage.alt = this._alt;
    this.cardText.textContent = this._name;
    this.cardLikeButton = this._cardElement.querySelector('.elements__like-button');
    this.cardDeleteButton = this._cardElement.querySelector('.elements__delete-button');
    this._setEvenetListeners();
    
    return this._cardElement;
  }

}

export { initialCards, Card };