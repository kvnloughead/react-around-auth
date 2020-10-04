const BASE_URL = 'https://register.nomoreparties.co';

export const register = (username, password, email) => {
  return fetch(`${BASE_URL}/auth/register`, {
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

export const authorize = (identifier, password) => {
  return fetch(`${BASE_URL}/auth/local`, {
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

module.exports = { register, authorize }