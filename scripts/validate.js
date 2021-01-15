//declare the form's objects
const formObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input_error',
};

//input error is shown
const showInputError = (formSelector, inputSelector, errorMessage) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
  errorElement.classList.add(formObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  inputSelector.classList.add(formObject.errorClass);
};

//input error is hidden
const hideInputError = (formSelector, inputSelector) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.remove(formObject.errorClass);
  errorElement.textContent = '';
};

//if the input is valid, either show or hide error message
const checkInputValidity = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(formSelector, inputSelector);
  }
};

//define whether input is valid
const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
};

//if the input is valid, activate submit button
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formObject.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(formObject.inactiveButtonClass);
  }
};

//attach event listeners to form inputs
const setEventListeners = (formSelector) => {
  const inputList = Array.from(formSelector.querySelectorAll(formObject.inputSelector));
  const buttonElement = formSelector.querySelector(formObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', function () {
      checkInputValidity(formSelector, inputSelector);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//run custom validation of form
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(formObject.formSelector));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
    setEventListeners(formSelector);
  });
};

export { enableValidation, formObject };