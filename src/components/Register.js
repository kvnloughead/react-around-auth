import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import api from '../utils/Api';
import '../blocks/login/login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'Email',
      password: 'Password',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // TODO -- needs register logic
  
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      return;
    }
    api
      .authorize(this.state.email, this.state.password)
      .then((data) => {
        if (data.jwt) {
          this.setState({ email: '', password: '' }, () => {
            this.props.handleLogin();
            this.props.history.push('/login');
          });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className='login'>
        <h2 className='login__title'>Sign up</h2>
        <form onSubmit={this.handleSubmit} className='login__form'>
          <label for='email'>email:</label>
          <input
            class='login__input'
            id='email'
            required
            name='email'
            type='email'
            defaultValue={this.state.email}
            onChange={this.handleChange}
          />
          <label for='password'>Password:</label>
          <input
            class='login__input'
            id='password'
            required
            name='password'
            type='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Link to='/signup' className='login__link'>
            Sign up
          </Link>
          <p class='login__call-out'>Already a member? Log in here!</p>
        </form>
        <div className='login__signup-button-container'>
          <button type='submit' className='login__signup'>
            Log in
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
