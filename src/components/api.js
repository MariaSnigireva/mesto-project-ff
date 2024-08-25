


// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/wff-cohort-20',
//   headers: {
//     authorization: 'a92b4dd4-8333-403b-9488-d334c738bb3e',
//     'Content-Type': 'application/json'
//   }
// };

// export const getUserInfo = () => {
//   return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Ошибка: ${res.status}`);
//     });
// };

// // Обновление данных пользователя
// export const updateUserInfo = (name, about) => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     method: 'PATCH',
//     headers: config.headers,
//     body: JSON.stringify({ name, about })
//   })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Ошибка: ${res.status}`);
//     });
// };

// // Получение карточек
// export const getInitialCards = () => {
//   return fetch(`${config.baseUrl}/cards`, { headers: config.headers })
//     .then(res => {
//       if (res.ok) {
//          return res.json();
//       }
//       return Promise.reject(`Ошибка: ${res.status}`);
//     });
// };

// // Добавление новой карточки
// export const addCard = (name, link) => {
//   return fetch(`${config.baseUrl}/cards`, {
//     method: 'POST',
//     headers: config.headers,
//     body: JSON.stringify({ name, link })
//   })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Ошибка: ${res.status}`);
//     });
// };

// // Удаление карточки
// export const deleteCard = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/${cardId}`, {
//     method: 'DELETE',
//     headers: config.headers
//   })
//     .then(res => {
//       if (res.ok) {
//          return res.json();
//       }
//       return Promise.reject(`Ошибка: ${res.status}`);
//     });
// };

// // Постановка лайка
// export const addLike = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
//     method: 'PUT',
//     headers: config.headers
//   })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Ошибка: ${res.status}`);
//     });
// };

// // Снятие лайка
// export const removeLike = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
//     method: 'DELETE',
//     headers: config.headers
//   })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Ошибка: ${res.status}`);
//     });
// };

// // Обновление аватара пользователя
// export const updateAvatar = (avatar) => {
//   return fetch(`${config.baseUrl}/users/me/avatar`, {
//     method: 'PATCH',
//     headers: config.headers,
//     body: JSON.stringify({ avatar })
//   })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Ошибка: ${res.status}`);
//     });
// };