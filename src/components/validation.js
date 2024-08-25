
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {    
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

export const clearValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((input) => {
    hideInputError(formElement, input, config);
  });
  toggleButtonState(inputList, buttonElement, config);
}

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(formElement, input);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_visible'
}



// // Функция для проверки валидности поля ввода
// function isValidInput(inputElement, { inputErrorClass, errorClass }) {
//   const isValid = inputElement.validity.valid;
//   const errorElement = document.querySelector(`#${inputElement.id}-error`);

//   if (isValid) {
//     hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
//   } else {
//     showInputError(inputElement, errorElement, inputElement.validationMessage, inputErrorClass, errorClass);
//   }

//   return isValid;
// }

// // Функция для отображения ошибки
// function showInputError(inputElement, errorElement, message, inputErrorClass, errorClass) {
//   if (inputElement && errorElement) {
//     errorElement.textContent = message;
//     errorElement.classList.add(errorClass);
//     inputElement.classList.add(inputErrorClass);
//   } else {
//     console.error('Input or error element not found');
//   }
// }

// // Функция для скрытия ошибки
// function hideInputError(inputElement, errorElement, inputErrorClass, errorClass) {
//   if (inputElement && errorElement) {
//     errorElement.textContent = '';
//     errorElement.classList.remove(errorClass);
//     inputElement.classList.remove(inputErrorClass);
//   } else {
//     console.error('Input or error element not found');
//   }
// }

// // Функция для проверки валидности всей формы
// function checkFormValidity(formElement, validationConfig) {
//   const inputs = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
//   const isValid = inputs.every(input => isValidInput(input, validationConfig));

//   const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
//   if (submitButton) {
//     submitButton.disabled = !isValid;
//     submitButton.classList.toggle(validationConfig.inactiveButtonClass, !isValid);
//   } else {
//     console.error('Submit button not found');
//   }
// }

// // Функция для обработки событий на поле ввода
// function handleInput(event, validationConfig) {
//   const inputElement = event.target;
//   checkFormValidity(inputElement.form, validationConfig);
// }

// // Функция для включения валидации на странице
// function enableValidation(validationConfig) {
//   const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
//   forms.forEach(form => {
//     form.addEventListener('submit', event => {
//       event.preventDefault();
//       checkFormValidity(form, validationConfig);
//     });

//     const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
//     inputs.forEach(input => {
//       input.addEventListener('input', event => handleInput(event, validationConfig));
//       input.addEventListener('change', event => handleInput(event, validationConfig));
//     });

//     // Изначально проверяем форму при загрузке страницы
//     checkFormValidity(form, validationConfig);
//   });
// }

// // Функция для очистки валидации формы
// function clearValidation(formElement, validationConfig) {
//   const inputs = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
//   inputs.forEach(input => {
//     const errorElement = document.querySelector(`#${input.id}-error`);
//     hideInputError(input, errorElement, validationConfig.inputErrorClass, validationConfig.errorClass);
//   });

//   const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
//   if (submitButton) {
//     submitButton.disabled = true;
//     submitButton.classList.add(validationConfig.inactiveButtonClass);
//   }
// }

// export { enableValidation, clearValidation };
