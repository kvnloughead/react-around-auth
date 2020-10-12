import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../blocks/splash-page/splash-page.css';
import PopupWithForm from './PopupWithForm';
import auth from '../utils/Auth';

function Register({ handleToolTip, handleLogin, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.register(email, password)
      .then((res) => {
        debugger;
        console.log(res)
        if (!res.data) {
          handleToolTip('failure');
          throw new Error(`400 - ${res.message ? res.message : res}`);
        }})
        .then((res) => {
          history.push('/signin');
          return res;
        })
        .then((res) => {
          debugger;
          handleToolTip('success');
          return res;
        })
      .then(resetForm)
      // .then((res) => {
      //   console.log(res)
      //   history.push('/signin');
      //   handleToolTip();
      // })
      // TODO improve error handling
      .catch(err => {
        //debugger;
        console.log(err)
      });
  }

  useEffect(() => {
    if (localStorage.getItem('token')) { 
      console.log(localStorage.getItem('token'))
      history.push('/around');
    }
  }, [history]);

  return (
      <>
        <Link className='splash-page__call-out' to='/signin'>
          Log in
        </Link>
        <PopupWithForm
          name='signup'
          title='Sign up'
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
            onChange={e => setEmail(e.target.value)}
            autocomplete="on"
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
            onChange={e => setPassword(e.target.value)}
            autocomplete="on"
          />
          <Link
            className='splash-page__submit'
            onClick={handleSubmit}
            to='/around'
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

export default Register;



// class Register extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       password: '',
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(e) {
//     const { name, value } = e.target;
//     this.setState({
//       [name]: value,
//     });
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     let { email, password } = this.state;
//     auth.register(email, password)
//       .then((res) => {
//         console.log("res", res)
//         if (res.ok) {
//           this.setState({ email: '', password: ''});
//           this.props.setUserEmail(email);
//           this.props.handleLogin();
//           this.props.history.push('/');
//           this.props.handleToolTip();
//         } else {
//           this.props.handleToolTip();
//           Promise.reject(`${res.status} - one of the fields was filled in incorrectly`);          
//         }
//       })    
//     .catch((err) => console.log(err));
//   }

//   render() {
//     return (
//       <>
//         <Link className='splash-page__call-out' to='/signin'>
//           Log in
//         </Link>
//         <PopupWithForm
//           name='signup'
//           title='Sign up'
//           isOpen={true}
//           onClose={this.state.onClose}
//           onSubmit={this.handleSubmit}
//         >
//           <input
//             className='splash-page__input'
//             type='email'
//             id='email'
//             name='email'
//             placeholder='Email'
//             minLength='2'
//             maxLength='40'
//             required
//             value={this.state.email || ''}
//             onChange={this.handleChange}
//           />
//           <input
//             className='splash-page__input'
//             type='password'
//             id='password'
//             name='password'
//             placeholder='Password'
//             minLength='2'
//             maxLength='200'
//             required
//             value={this.state.password || ''}
//             onChange={this.handleChange}
//           />
//           <Link
//             className='splash-page__submit'
//             onClick={this.handleSubmit}
//             to='/'
//           >
//             Sign up
//           </Link>
//           <Link className='splash-page__text' to='/signin'>
//             Already a member? Log in here!
//           </Link>
//         </PopupWithForm>
//       </>
//     );
//   }
// }

// export default withRouter(Register);
