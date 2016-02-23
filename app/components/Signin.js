import React from 'react';
import Auth from './Authorize'
// import function that will send post request to DB

class Signin extends React.Component {

  constructor(props) {
    super(props);
  }

  handleSignin (e) {
    e.preventDefault();
    Auth.confirmUser(this.refs.username.value, this.refs.password.value, (loggedIn) => {
      console.log('handlesignin working', loggedIn);
      if(loggedIn) {
        this.props.updateUser(this.refs.username.value);
      }
    });
  }

  handleSignup (e) {
    e.preventDefault();
    var url = 'http://0.0.0.0:8080/api/users/signup';
    Auth.confirmUser(this.refs.username.value, this.refs.password.value, (loggenIn) => {
      console.log('handlesignup working', loggenIn);

    }, url);
  }

  render() {
    console.log('Preferences passed down: ', this.props.state)
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
