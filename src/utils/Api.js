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

  register = (username, password, email) => {
    return fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password, email})
    })
    .then((response) => {
      try {
        if (response.status === 200){
          return response.json();
        }
      } catch(e){
          return (e)
      }
    })
    .then((res) => {
      return res;     
    })
    .catch((err) => console.log(err));
  };
  
  authorize = (identifier, password) => {
    return fetch(`${this.baseUrl}/auth/local`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({identifier, password})
    })
    .then((response => response.json()))
    .then((data) => {
      if (data.jwt){
        // if user has a token, save it to local storage
        localStorage.setItem('jwt', data.jwt);
        return data;
          }
    })
    .catch(err => console.log(err))
  };
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-2",
  headers: {
    authorization: "dc340326-95ec-4474-9060-e6102316f742",
    "Content-Type": "application/json",
  },
});

export default api;
