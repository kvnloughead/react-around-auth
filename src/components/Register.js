import React from 'react';
import { withRouter } from 'react-router-dom';
import api from '../utils/Api';
import '../blocks/splash-page/splash-page.css';
import AuthorizeUser from './AuthorizeUser';

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
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value 
    });
  }
  handleSubmit(e){
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword){
      let { email, password } = this.state;
      api.register(email, password).then((res) => {
        if(res){
          this.setState({
            message: ''
          }, () => {
            this.props.history.push('/login');
          })
        } else {
          this.setState({
            message: 'Something went wrong!'
          })
        }
      });
    }
  }

  render() {
    return (
        <AuthorizeUser title='Sign up' handleChange={this.handleChange} handleSubmit={this.handleSubmit} text='Already a member? Log in here!'/>
      );
  }
}

export default withRouter(Login);
