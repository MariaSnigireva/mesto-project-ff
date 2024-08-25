const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-20',
    headers: {
      authorization: 'a92b4dd4-8333-403b-9488-d334c738bb3e',
      'Content-Type': 'application/json'
    }
  };

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject('...'); //Если ответ успешный/Если ответ не успешный
}

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => checkResponse(res))
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => checkResponse(res))
};

export const userDataUpdate = (nameUser, aboutUser) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameUser,
      about: aboutUser
    })
  })
  .then(res => checkResponse(res))
};

export const addCard = (placeName, linkImg) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: placeName,
      link: linkImg
    })
  })
  .then(res => checkResponse(res))
};

export const deleteCard = (cardID) => {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => checkResponse(res))
};

export const toggleLike = (cardID, isLiked) => {
  if (isLiked) {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(res => checkResponse(res))
  } else {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
      method: 'PUT',
      headers: config.headers
    })
    .then(res => checkResponse(res))
    
  }
};

export const avatarUpdate = (linkImg) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkImg
    })
  })
  .then(res => checkResponse(res))
};
