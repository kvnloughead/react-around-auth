import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../blocks/splash-page/splash-page.css';
import PopupWithForm from './PopupWithForm';
import auth from '../utils/Auth';

class Register extends React.Component {
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
    debugger;
    e.preventDefault();
    let { email, password } = this.state;
    auth.register(email, password)
      .then((res) => {
        debugger;
        if (res.ok) {
          this.props.setEmail(email);
          this.props.setPassword(password);
          this.props.handleLogin();
          this.props.history.push('/');
          this.props.handleToolTip();
        } else {
          this.props.handleToolTip();
          Promise.reject(`${res.status} - one of the fields was filled in incorrectly`);          
        }
      })    
    .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        <Link className='splash-page__call-out' to='/signin'>
          Log in
        </Link>
        <PopupWithForm
          name='signup'
          title='Sign up'
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
            Sign up
          </Link>
          <Link className='splash-page__text' to='/signin'>
            Already a member? Log in here!
          </Link>
        </PopupWithForm>
      </>
    );
  }
}

export default withRouter(Register);
