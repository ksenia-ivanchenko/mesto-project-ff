export {
  allDataPromise,
  changeAvatarPromise,
  addNewCardPromise,
  editProfilePromise,
  deleteCardPromise,
  unlikeCardPromise,
  likeCardPromise,
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// настройки запросов
const configApi = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "278e847c-44dd-45b9-a59c-b2a0939f7aef",
    "Content-Type": "application/json",
  },
};

//подтягиваем карточки с сервера
const fetchCardsData = () => {
  return fetch(`${configApi.baseUrl}/cards`, {
    headers: configApi.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

//подтягиваем инфу о пользователе с сервера
const fetchProfileData = () => {
  return fetch(`${configApi.baseUrl}/users/me`, {
    headers: configApi.headers,
  }).then((res) => handleResponse(res));
};

//обрабатываем все промисы
const allDataPromise = () => {
  return Promise.all([
    fetchProfileData().catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    }),
    fetchCardsData().catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    }),
  ]);
};

//отдаем на сервер новую аватарку
const changeAvatarPromise = (newAvatar) => {
  return fetch(`${configApi.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: configApi.headers,
    body: JSON.stringify({
      avatar: newAvatar,
    }),
  }).then((res) => handleResponse(res));
};

//отправляем на сервер новую карточку
const addNewCardPromise = (newCardName, newCardUrl) => {
  return fetch(`${configApi.baseUrl}/cards`, {
    method: "POST",
    headers: configApi.headers,
    body: JSON.stringify({
      name: newCardName,
      link: newCardUrl,
    }),
  }).then((res) => handleResponse(res));
};

//отправляем на сервер новые данные о пользователе
const editProfilePromise = (newProfileName, newProfileDescription) => {
  return fetch(`${configApi.baseUrl}/users/me`, {
    method: "PATCH",
    headers: configApi.headers,
    body: JSON.stringify({
      name: newProfileName,
      about: newProfileDescription,
    }),
  }).then((res) => handleResponse(res));
};

//удаляем карточку с сервера
const deleteCardPromise = (cardId) => {
  return fetch(`${configApi.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: configApi.headers,
  }).then((res) => handleResponse(res));
};

// удаляем айдишник юзера из массива лайков на сервере
const unlikeCardPromise = (cardId) => {
  return fetch(`${configApi.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: configApi.headers,
  }).then((res) => handleResponse(res));
};

// добавляем айдишник юзера в массив лайков на сервере
const likeCardPromise = (cardId) => {
  return fetch(`${configApi.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: configApi.headers,
  }).then((res) => handleResponse(res));
};
