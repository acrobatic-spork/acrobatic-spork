import React from 'react';
import Auth from './Authorize'
import { browserHistory } from 'react-router'

// import function that will send post request to DB

class Signin extends React.Component {

  constructor(props) {
    super(props);
  }

  handleSignin (e) {
    e.preventDefault();
    Auth.confirmUser(this.refs.username.value, this.refs.password.value, (loggedIn, res) => {
      if(loggedIn) {
        this.props.updateUser(this.refs.username.value);
        browserHistory.push('/');
      }  else {
        var message = res.error.responseText.substr(0, res.error.responseText.indexOf('<'));
        this.props.displayMessage(message);
      }
    });
  }

  handleSignup (e) {
    e.preventDefault();
    var url = 'http://0.0.0.0:8080/api/users/signup';
    Auth.confirmUser(this.refs.username.value, this.refs.password.value, (loggedIn, res) => {
      if (loggedIn) {
        this.props.updateUser(this.refs.username.value);
        browserHistory.push('/dashboard');
      } else {
        var message = res.error.responseText.substr(0, res.error.responseText.indexOf('<'));
        this.props.displayMessage(message);
      }

    }, url);
  }

  render() {
    console.log('Preferences passed down: ', this.props)
    return (
      <div className="">
        <form className="loginform" >
          <input className="username" type="text" ref="username" name="username" placeholder="username" />
          <input className="passord" type="password" ref="password" name="password" placeholder="password" />
          <button className="signin" onClick={this.handleSignin.bind(this)}>
            <span className="">Signin</span>
          </button>
          <button className="signup" onClick={this.handleSignup.bind(this)}>
            <span className="">Signup</span>
          </button>
        </form>
      </div> 
    )
  }
}

export default Signin;
