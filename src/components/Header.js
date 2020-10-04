import React from 'react';
import HeaderLinks from './HeaderLinks.js'
import headerLogo from '../images/icons/header-logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="Around the U.S. Logo"
      />
      {props.loggedIn && <HeaderLinks email={props.email}/>}
    </header>
  )
}

export default Header; 