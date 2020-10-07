import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class HeaderLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loggedIn: ''
    };
  }

  render() {
    return (
      <>
        {this.props.loggedIn && (
          <ul className='header__links'>
            <li className='header__email'>{this.props.email}</li>
            <li>
              <Link className='header__link' to='/signout'>
                Log out
              </Link>
            </li>
          </ul>)}
      </>
    );
  }
}

export default withRouter(HeaderLinks);
