import React from 'react';
import { Link } from 'react-router-dom';

function HeaderLinks({ loggedIn, userEmail, handleSignOut }) {
  return (
    <>
      {loggedIn && (
        <ul className='header__links'>
          <li className='header__email'>{userEmail}</li>
          <li>
            <Link className='header__link' onClick={handleSignOut} to='/signin'>
              Log out
            </Link>
          </li>
        </ul>)}
    </>
  );
}

export default HeaderLinks;


// class HeaderLinks extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       loggedIn: ''
//     };
//   }

//   render() {
//     return (
//       <>
//         {this.props.loggedIn && (
//           <ul className='header__links'>
//             <li className='header__email'>{this.props.email}</li>
//             <li>
//               <Link className='header__link' onClick={this.props.handleSignOut} to='/signin'>
//                 Log out
//               </Link>
//             </li>
//           </ul>)}
//       </>
//     );
//   }
// }


