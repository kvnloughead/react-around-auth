import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../blocks/splash-page/splash-page.css';
import PopupWithForm from './PopupWithForm';
import auth from '../utils/Auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      console.log('400 - one or more of the fields were not provided');
    }
    auth
      .authorize(this.state.email, this.state.password)
      .then((data) => {
        this.props.handleToolTip();
        if (data.token) {
          this.setState({ email: '', password: ''});
          this.props.handleLogin();
          this.props.history.push('/');
        }
      })
        
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        <Link className='splash-page__call-out' to='/signup'>
          Sign up
        </Link>
        <PopupWithForm
          name='signin'
          title='Log in'
          isOpen={true}
          onClose={this.state.onClose}
          onSubmit={this.handleSubmit}
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
            value={this.state.email || ''}
            onChange={this.handleChange}
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
            value={this.state.password || ''}
            onChange={this.handleChange}
          />
          <Link
            className='splash-page__submit'
            onClick={this.handleSubmit}
            to='/'
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
}

export default withRouter(Login);
