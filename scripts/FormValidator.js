//declare the form's objects
const formObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input_error',
};

class FormValidator {
  constructor(formObject, formElement) {
    this._formObject = formObject;
    this._formSelector = formObject.formSelector;
    this._inputSelector = formObject.inputSelector;
    this._submitButtonSelector = formObject.submitButtonSelector;
    this._inactiveButtonClass = formObject.inactiveButtonClass;
    this._inputErrorClass = formObject.inputErrorClass;
    this._errorClass = formObject.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  //input error is shown
  _showInputError(inputSelector, errorMessage) {
    const errorElement = document.querySelector(`#${inputSelector.id}-error`);
    errorElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    inputSelector.classList.add(this._errorClass);
  };

  //input error is hidden
  _hideInputError(inputSelector) {
    const errorElement = document.querySelector(`#${inputSelector.id}-error`);
    inputSelector.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  //if the input is valid, either show or hide error message
  _checkInputValidity(inputSelector) {
    if (!inputSelector.validity.valid) {
      this._showInputError(inputSelector, inputSelector.validationMessage);
    } else {
      this._hideInputError(inputSelector);
    }
  };

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });

    this._toggleButtonState();
  }

  //define whether input is valid
  _hasInvalidInput(_inputList) {
    return this._inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  };

  //if the input is valid, activate submit button
  _toggleButtonState(_inputList, _buttonElement) {
    if (this._hasInvalidInput(_inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  //attach event listeners to form inputs
  _setEventListeners() {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputSelector) => {
      
      inputSelector.addEventListener('input', () => {
        
        this._checkInputValidity(inputSelector);
        this._toggleButtonState();
        
      });
    });
  };  

  //run custom validation of form
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    this._setEventListeners();
  };
}

export { formObject, FormValidator };