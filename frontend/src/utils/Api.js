class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}${url}`, options).then(this._getResponseData);
  }

  getUserInfo() {
    return this._request("/users/me", {
      method: "GET",
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request("/cards", {
      method: "GET",
      headers: this._headers,
    });
  }

  submitProfileData(name, about) {
    return this._request("/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  deleteCard(id) {
    return this._request(`/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  addNewCard(name, link) {
    return this._request("/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  likeCard(id) {
    return this._request(`/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  dislikeCard(id) {
    return this._request(`/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  updateAvatar(avatarUrl) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.likeCard(id);
    } else {
      return this.dislikeCard(id);
    }
  }
}

const api = new Api({
  baseUrl: "https://api.bmesto.nomoredomains.monster",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
