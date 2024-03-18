export {
  allDataPromise,
  changeAvatarPromise,
  addNewCardPromise,
  editProfilePromise,
  deleteCardPromise,
  unlikeCardPromise,
  likeCardPromise
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
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    });
};

//подтягиваем инфу о пользователе с сервера
const fetchProfileData = () => {
  return fetch(`${configApi.baseUrl}/users/me`, {
    headers: configApi.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    });
};

//обрабатываем все промисы
const allDataPromise = () => {
  return Promise.all([fetchProfileData(), fetchCardsData()]);
};

//отдаем на сервер новую аватарку
const changeAvatarPromise = (avatarInput) => {
  return fetch(`${configApi.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: configApi.headers,
    body: JSON.stringify({
      avatar: avatarInput.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    });
};

//отправляем на сервер новую карточку
const addNewCardPromise = (cardName, cardUrl) => {
  return fetch(`${configApi.baseUrl}/cards`, {
    method: "POST",
    headers: configApi.headers,
    body: JSON.stringify({
      name: cardName.value,
      link: cardUrl.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    });
};

//отправляем на сервер новые данные о пользователе
const editProfilePromise = (nameInput, jobInput) => {
  return fetch(`${configApi.baseUrl}/users/me`, {
    method: "PATCH",
    headers: configApi.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    });
};

//удаляем карточку с сервера
const deleteCardPromise = (cardData) => {
  return fetch(`${configApi.baseUrl}/cards/${cardData._id}`, {
    method: "DELETE",
    headers: configApi.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    });
};

// удаляем айдишник юзера из массива лайков на сервере
const unlikeCardPromise = (cardData) => {
  return fetch(`${configApi.baseUrl}/cards/likes/${cardData._id}`, {
    method: "DELETE",
    headers: configApi.headers,
    body: JSON.stringify({
      likes: cardData.likes.filter((userId) => userId !== cardData._id),
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    });
};

// добавляем айдишник юзера в массив лайков на сервере
const likeCardPromise = (cardData) => {
  return fetch(`${configApi.baseUrl}/cards/likes/${cardData._id}`, {
    method: "PUT",
    headers: configApi.headers,
    body: JSON.stringify({
      likes: cardData.likes.push(cardData._id),
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    });
};
