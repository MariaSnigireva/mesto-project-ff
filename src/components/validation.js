// Функция для показа сообщения об ошибке
export function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }
}

// Функция для скрытия сообщения об ошибке
export function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  }
}

// Функция для проверки валидности поля
export function isValid(formElement, inputElement, config) {
  const errorMessage = inputElement.dataset.errorMessage;
  const validity = inputElement.validity;

  if (validity.valueMissing) {
    showInputError(formElement, inputElement, errorMessage, config);
  } else if (validity.tooShort || validity.tooLong) {
    showInputError(formElement, inputElement, errorMessage, config);
  } else if (!inputElement.value.match(inputElement.pattern)) {
    showInputError(formElement, inputElement, errorMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

// Функция для проверки наличия невалидных полей
export function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

// Функция для переключения состояния кнопки
export function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

// Функция для добавления обработчиков полям формы
export function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
  toggleButtonState(inputList, buttonElement, config);
}

// Функция для включения валидации для всех форм
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

// Функция для очистки ошибок валидации формы и переключения состояния кнопки
export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });
  toggleButtonState(inputList, buttonElement, config);
}


// export function showInputError(formElement, inputElement, errorMessage, config) {
// const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
// if (errorElement) {
//   inputElement.classList.add(config.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(config.errorClass);
// }
// }

// export function hideInputError(formElement, inputElement, config) {
// const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
// if (errorElement) {
//   inputElement.classList.remove(config.inputErrorClass);
//   errorElement.classList.remove(config.errorClass);
//   errorElement.textContent = '';
// }
// }

// export function isValid(formElement, inputElement, config) {
//   const errorMessage = inputElement.dataset.errorMessage || 'Invalid input';
//   if (inputElement.validity.patternMismatch) {
//     inputElement.setCustomValidity(errorMessage);
//   } else {
//     inputElement.setCustomValidity('');
//   }
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, errorMessage, config);
//   } else {
//     hideInputError(formElement, inputElement, config);
//   }
// }

// // export function isValid(formElement, inputElement, config) {
// // const errorMessage = inputElement.dataset.errorMessage || 'Invalid input';
// // if (!inputElement.validity.valid) {
// //   showInputError(formElement, inputElement, errorMessage, config);
// // } else {
// //   hideInputError(formElement, inputElement, config);
// // }
// // }

// export function hasInvalidInput(inputList) {
// return inputList.some(inputElement => !inputElement.validity.valid);
// }

// export function toggleButtonState(inputList, buttonElement, config) {
// if (hasInvalidInput(inputList)) {
//   buttonElement.disabled = true;
//   buttonElement.classList.add(config.inactiveButtonClass);
// } else {
//   buttonElement.disabled = false;
//   buttonElement.classList.remove(config.inactiveButtonClass);
// }
// }

// export function setEventListeners(formElement, config) {
// const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
// const buttonElement = formElement.querySelector(config.submitButtonSelector);
// inputList.forEach(inputElement => {
//   inputElement.addEventListener('input', () => {
//     isValid(formElement, inputElement, config);
//     toggleButtonState(inputList, buttonElement, config);
//   });
// });
// }

// export function enableValidation(config) {
// const formList = Array.from(document.querySelectorAll(config.formSelector));
// formList.forEach(formElement => {
//   setEventListeners(formElement, config);
// });
// }

// export function clearValidation(formElement, config) {
// const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
// const buttonElement = formElement.querySelector(config.submitButtonSelector);
// inputList.forEach(inputElement => {
//   hideInputError(formElement, inputElement, config);
// });
// toggleButtonState(inputList, buttonElement, config);
// }


// export function showInputError(formElement, inputElement, errorMessage, config) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   if (errorElement) {
//   inputElement.classList.add(config.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(config.errorClass);
// }
// }
// // Функция, которая удаляет класс с ошибкой
// export function hideInputError(formElement, inputElement, config) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   if (errorElement) {
//   inputElement.classList.remove(config.inputErrorClass);
//   errorElement.classList.remove(config.errorClass);
//   errorElement.textContent = '';
//   }
// }

// // Функция, которая проверяет валидность поля
// export function isValid(formElement, inputElement, config) {
//   const errorMessage = inputElement.dataset.errorMessage || 'Invalid input';
//   if (inputElement.validity.patternMismatch) {
//       inputElement.setCustomValidity(errorMessage);
//   } else {
//       inputElement.setCustomValidity("");
//   }
//   if (!inputElement.validity.valid) {
//       showInputError(formElement, inputElement, errorMessage, config);
//   } else {
//       hideInputError(formElement, inputElement, config);
//   }
// }

// // Функция проверяет наличие невалидных полей
// export function hasInvalidInput(inputList) {
//   return inputList.some((inputElement) => !inputElement.validity.valid);
// }

// // Функция для переключения состояния кнопки
// export function toggleButtonState(inputList, buttonElement, config) {
//   if (hasInvalidInput(inputList)) {
//       buttonElement.disabled = true;
//       buttonElement.classList.add(config.inactiveButtonClass);
//   } else {
//       buttonElement.disabled = false;
//       buttonElement.classList.remove(config.inactiveButtonClass);
//   }
// }

// // Добавление обработчиков полям формы
// export function setEventListeners(formElement, config) {
//   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
//   const buttonElement = formElement.querySelector(config.submitButtonSelector);
//   inputList.forEach((inputElement) => {
//       inputElement.addEventListener('input', () => {
//           isValid(formElement, inputElement, config);
//           toggleButtonState(inputList, buttonElement, config);
//       });
//   });
// }

// // Функция включает валидацию для всех форм
// export function enableValidation(config) {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((formElement) => {
//       setEventListeners(formElement, config);
//   });
// }

// // Функция очищает ошибки валидации формы и делает кнопку неактивной
// export function clearValidation(formElement, config) {
//   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
//     const buttonElement = formElement.querySelector(config.submitButtonSelector);
//   inputList.forEach((inputElement) => {
//       hideInputError(formElement, inputElement, config);
//   }); 

//   toggleButtonState(inputList, buttonElement, config);
// }



// // показ сообщения об ошибке
// function showError(input, message, errorClass, inputErrorClass) {
//   const errorSpan = input.nextElementSibling;
//   if (errorSpan && errorSpan.classList.contains(errorClass)) {
//     errorSpan.textContent = message;
//     errorSpan.classList.add(errorClass);
//     input.classList.add(inputErrorClass);
//   }
// }

// // скрытие сообщения об ошибке
// function hideError(input, errorClass, inputErrorClass) {
//   const errorSpan = input.nextElementSibling;
//   if (errorSpan && errorSpan.classList.contains(errorClass)) {
//     errorSpan.textContent = '';
//     errorSpan.classList.remove(errorClass);
//     input.classList.remove(inputErrorClass);
//   }
// }

// // проверка поля формы и активации/деактивации кнопки отправки
// function validateForm(form, inputSelector, errorClass, inputErrorClass, inactiveButtonClass) {
//   const inputs = form.querySelectorAll(inputSelector);
//   let isValid = true;

//   inputs.forEach(input => {
//     const pattern = new RegExp(input.getAttribute('data-pattern'));
//     const errorMessage = input.getAttribute('data-error-message');
//     if (!pattern.test(input.value)) {
//       showError(input, errorMessage, errorClass, inputErrorClass);
//       isValid = false;
//     } else {
//       hideError(input, errorClass, inputErrorClass);
//     }
//   });

//   toggleSubmitButton(form, isValid, inactiveButtonClass);
// }

// // активация/деактивация кнопки отправки
// function toggleSubmitButton(form, isValid, inactiveButtonClass) {
//   const saveButton = form.querySelector('button[type="submit"]');
//   if (isValid) {
//     saveButton.classList.remove(inactiveButtonClass);
//     saveButton.disabled = false;
//   } else {
//     saveButton.classList.add(inactiveButtonClass);
//     saveButton.disabled = true;
//   }
// }

// // для очистки ошибок валидации и состояния кнопки
// function clearValidation(form, settings) {
//   form.reset();
//   const errorSpans = form.querySelectorAll(`.${settings.errorClass}`);
//   errorSpans.forEach(span => span.textContent = '');
//   form.querySelectorAll(settings.inputSelector).forEach(input => input.classList.remove(settings.inputErrorClass));
//   toggleSubmitButton(form, false, settings.inactiveButtonClass);
// }

// // для включения валидации
// function enableValidation(settings) {
//   const forms = document.querySelectorAll(settings.formSelector);
//   forms.forEach(form => {
//     form.addEventListener('input', () => {
//       validateForm(form, settings.inputSelector, settings.errorClass, settings.inputErrorClass, settings.inactiveButtonClass);
//     });

//     form.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//       validateForm(form, settings.inputSelector, settings.errorClass, settings.inputErrorClass, settings.inactiveButtonClass);
//     });
//   });
// }

// export { enableValidation, clearValidation };