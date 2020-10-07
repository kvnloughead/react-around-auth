import React from 'react';
import HeaderLink from './HeaderLinks.js'
import headerLogo from '../images/icons/header-logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="Around the U.S. Logo"
      />
      <HeaderLink loggedIn={props.loggedIn} email={props.email}/>
    </header>
  )
}

export default Header; 