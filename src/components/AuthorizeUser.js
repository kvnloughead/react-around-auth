import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../blocks/splash-page/splash-page.css';

class AuthorizeUser extends React.Component {

  render() {
    return (
      <div className='login'>
        <h2 className='login__title'>{this.props.title}</h2>
        <form onSubmit={this.props.buttonhandleSubmit} className='login__form'>
          <label for='email'>email:</label>
          <input
            class='login__input'
            id='email'
            required
            name='email'
            type='email'
            placeholder='Email'
            value={this.props.email}
            onChange={this.props.handleChange}
            autocomplete="on"
          />
          <label for='password'>Password:</label>
          <input
            class='login__input'
            id='password'
            required
            name='password'
            type='password'
            placeholder='Password'
            value={this.props.password}
            onChange={this.props.handleChange}
            autocomplete="on"
          />
          <Link
            to={`/${this.props.title === 'Sign up' ? 'signup' : 'signin'}`}
            className='login__link'
          >
            {this.props.title}
          </Link>
          <Link to={`/${this.props.title === 'Sign up' ? 'signin' : 'signup'}`}>
            <p className='login__call-out'>{this.props.text}</p>
          </Link>
        </form>
        {this.props.loggedIn || (
          <Link to={`/${this.props.title === 'Sign up' ? 'signin' : 'signup'}`}>
            <p className='login__signup'>
              {this.props.title === 'Sign up' ? 'Log in' : 'Sign up'}
            </p>
          </Link> 
        )}
      </div>
    );
  }
}

export default withRouter(AuthorizeUser);
