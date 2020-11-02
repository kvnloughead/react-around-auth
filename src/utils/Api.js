class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getCardList() {
    return fetch(this.baseUrl + "/cards", {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  getUserInfo() {
    return fetch(this.baseUrl + "/users/me", {
      headers: this.headers,
    }).then((res) => {
      console.log(res)
      if (res.ok) {
        return res.json();
      }
    });
  }

  setAvatar(link) {
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

  setUserInfo({ name, about }) {
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  addNewCard({ title, link }) {
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: title,
        link,
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
  // baseUrl: "https://around.nomoreparties.co/v1/group-2",
  baseUrl: "http://localhost:4000",
  headers: {
    // authorization: "dc340326-95ec-4474-9060-e6102316f742",  
    "Content-Type": "application/json",
  },
});

export default api;
