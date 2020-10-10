const BASE_URL = 'https://register.nomoreparties.co';

module.exports.register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Acccept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => {
    debugger;
    return res.json();
  })
  .then((res) => {
    debugger;
    return res;
  })
  .catch((err) => console.log(err));
}

module.exports.authorize = (identifier, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Acccept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: identifier, password: password})
  })
  .then((res) => {
    debugger;
    return res.json();
  })
  .then((data) => {
    
    if (!data.message) {
      localStorage.setItem('token', data.token);
      return data;
    } else {
      throw new Error('401 - the user with the specified email not found');
    }
  })
  .catch(err => console.log(err, err.message))
}

module.exports.getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  // .then((res) => { 
  //   debugger;
  //   return res.json()})
  // .then((data) => { 
  //   debugger;
  //   return data })
  .then((res)=>{
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
})
.then((data)=>data)
.catch((err)=>console.log(err));
}

// module.exports.register = (email, password) => {

//   return fetch(`${BASE_URL}/signup`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ email: email, password: password }),
//   }).then((res) => {
//     console.log(res);
//     return res;
//     })
// };

// module.exports.authorize = (identifier, password) => {
//   return fetch(`${BASE_URL}/signin`, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ identifier, password }),
//   })
//     .then((res) => {
//       return res.ok ? res.json() : Promise.reject(`${res.status} - Incorrect email address or password`);
//     })
//     .then((data) => {
//       console.log("data", data)
//       if (data.token) {
//         // if user has a token, save it to local storage
//         localStorage.setItem('token', data.token);
//         return data;
//       }
//     })
//     .catch((err) => console.log(err));
// };

// module.exports.getContent = (token) => {
//   // parameter token -- a json token
//   // if token is valid, returns response containing user info
//   return fetch(`${BASE_URL}/users/me`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((res) => res.ok ? res.json() : Promise.reject(`${res.status} - an error has occured`))
//     .then((data) => data)
//     .catch((err) => console.log(err));
// };
