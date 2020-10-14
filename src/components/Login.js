import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../blocks/splash-page/splash-page.css';
import PopupWithForm from './PopupWithForm';
import auth from '../utils/Auth';

function Login({ loggedIn, handleLogin, handleToolTip, onClose }) {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .authorize(email, password)
      .then((data) => {
        if (!email || !password) {
          throw new Error('400 - one or more of the fields were not provided');
        }
        if (!data) {
          throw new Error('401 - the user with the specified email not found');
        }
        if (data.token) {
          handleLogin();
        } 
      })
      .then(() => {
        resetForm();
      })
      .then(() => {
        history.push('/around');
      })
      .catch((err) => console.log(err.message));
  };

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/around');
    }
  });

  return (
    <>
      <Link className='splash-page__call-out' to='/signup'>
        Sign up
      </Link>
      <PopupWithForm
        name='signin'
        title='Log in'
        isOpen={true}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
          className='splash-page__input'
          type='email'
          id='email'
          name='email'
          placeholder='Email'
          minLength='2'
          maxLength='40'
          required
          value={email || ''}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='on'
        />
        <input
          className='splash-page__input'
          type='password'
          id='password'
          name='password'
          placeholder='Password'
          minLength='2'
          maxLength='200'
          required
          value={password || ''}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='on'
        />
        <Link
          className='splash-page__submit'
          onClick={handleSubmit}
          to='/around'
        >
          Log in
        </Link>
        <Link className='splash-page__text' to='/signup'>
          Not a member yet? Sign up here!
        </Link>
      </PopupWithForm>
    </>
  );
}

export default Login;
