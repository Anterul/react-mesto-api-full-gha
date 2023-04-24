class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
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
    const token = localStorage.getItem("jwt");
    return this._request("/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getInitialCards() {
    const token = localStorage.getItem("jwt");
    return this._request("/cards", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  submitProfileData(name, about) {
    const token = localStorage.getItem("jwt");
    return this._request("/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  deleteCard(id) {
    const token = localStorage.getItem("jwt");
    return this._request(`/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  addNewCard(name, link) {
    const token = localStorage.getItem("jwt");
    return this._request("/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  likeCard(id) {
    const token = localStorage.getItem("jwt");
    return this._request(`/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  dislikeCard(id) {
    const token = localStorage.getItem("jwt");
    return this._request(`/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateAvatar(avatarUrl) {
    const token = localStorage.getItem("jwt");
    return this._request("/users/me/avatar", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
  baseUrl: `http://localhost:3000`,
});

export default api;
