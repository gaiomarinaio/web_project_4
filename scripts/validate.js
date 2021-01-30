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

  //define whether input is valid
  _hasInvalidInput(inputList) {
    return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  };

  //if the input is valid, activate submit button
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  //attach event listeners to form inputs
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputSelector) => {
      
      inputSelector.addEventListener('input', () => {
        
        this._checkInputValidity(inputSelector);
        this._toggleButtonState(inputList, buttonElement);
        
      });
    });
  };

  //run custom validation of form
  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formSelector) => {
      formSelector.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })
      this._setEventListeners(formSelector);
    });
  };
}

export { formObject, FormValidator };