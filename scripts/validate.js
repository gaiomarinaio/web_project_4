//import { createNewCard } from "./script.js";

settingsObject({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: ".popup__save-button_disabled",
    inputErrorClass: ".popup__input-error",
    errorClass: ".popup__input-error_visible"
  });

const showInputError = (formElement, inputElement, errorMessage) => {
const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
inputElement.classList.add(settingsObject.inputErrorClass);
errorElement.textContent = errorMessage;
errorElement.classList.add(settingsObject.errorClass);
};

const hideInputError = (formElement, inputElement) => {
const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
inputElement.classList.remove(settingsObject.inputErrorClass);
errorElement.classList.remove(settingsObject.errorClass);
errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
} else {
    hideInputError(formElement, inputElement);
}
};

const hasInvalidInput = (inputList) => {
return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
});
};

const toggleButtonState = (inputList, buttonElement) => {
console.log(hasInvalidInput(inputList));
if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settingsObject.inactiveButtonClass);
} else {
    buttonElement.classList.remove(settingsObject.inactiveButtonClass);
}
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(settingsObject.inputSelector));
    const buttonElement = formElement.querySelector(settingsObject.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
        });
    });
    };

const enableValidation = (formElement) => {
const formList = Array.from(formElement.querySelectorAll(settingsObject.formSelector));
formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
    });

    const popupInputList = Array.from(formElement.querySelectorAll(settingsObject.inputSelector));

    popupInputList.forEach((popupInput) => {
    setEventListeners(popupInput);
    });
});
};


export { enableValidation };