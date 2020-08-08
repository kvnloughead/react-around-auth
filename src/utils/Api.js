class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(this.baseUrl + "/cards", {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  loadUserInfo() {
    return fetch(this.baseUrl + "/users/me", {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  changeAvatar(link) {
    return fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  changeUserInfo({ name, job }) {
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  addNewCard({ title, imageUrl }) {
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: title,
        link: imageUrl,
      }),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  deleteCard(cardId) {
    return fetch(this.baseUrl + `/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  updateLikes(cardId, isLiked) {  
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(
      this.baseUrl + `/cards/likes/${cardId}`,
      {
        method: method,
        headers: this.headers,
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-2",
  headers: {
    authorization: "dc340326-95ec-4474-9060-e6102316f742",
    "Content-Type": "application/json",
  },
});

export default api;
