const BASE_URL = 'https://register.nomoreparties.co';

module.exports.register = (email, password) => {
  debugger;
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password: password, email: email }),
  }).then((res) => {
    debugger;
    return res;
    // return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    })
};

module.exports.authorize = (identifier, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identifier, password }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.jwt) {
        // if user has a token, save it to local storage
        localStorage.setItem('jwt', data.jwt);
        return data;
      }
    })
    .catch((err) => console.log(err));
};

// yet another authorization method

module.exports.getContent = (token) => {
  // parameter token -- a json token
  // if token is valid, returns response containing user info
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};
