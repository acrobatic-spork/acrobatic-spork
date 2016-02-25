import React from 'react';
import Auth from './Authorize';
import { browserHistory } from 'react-router';
import utils from './utils'
// import function that will send post request to DB

class Signin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      confirm: false,
      passNotMatch: false
    }
  }

  handleLogin (e) {
    e.preventDefault();
    Auth.confirmUser(this.refs.username.value, this.refs.password.value, (loggedIn, res) => {
      if(loggedIn) {
        //get location permission on sign so spork request had better user experience
        utils.getLocation( () => console.log('Got location on Login') );
        this.props.updateUser(this.refs.username.value);
        browserHistory.push('/');
      }  else {
        var message = res.error.responseText.substr(0, res.error.responseText.indexOf('<'));
        this.props.displayMessage(message);
      }
    });
  }

  confirmPass (e) {
    e.preventDefault();
    // show password confirmation
    this.setState({
      confirm: true
    });
  }

  signupNewUser (e) {
    e.preventDefault();

    this.setState({
      confirm: false
    });

    if(this.refs.confirm.value === this.refs.password.value) {
      var url = '/api/users/signup';
      Auth.confirmUser(this.refs.username.value, this.refs.password.value, (loggedIn, res) => {
        if (loggedIn) {
          //get location permission on signup
          utils.getLocation( () => console.log('Got location on Login') );
          this.props.updateUser(this.refs.username.value);
          browserHistory.push('/dashboard');
        } else {
          var message = res.error.responseText.substr(0, res.error.responseText.indexOf('<'));
          this.props.displayMessage(message);
        }

      }, url);
    } else {
      // give feedback, as user to re-enter password
      this.refs.password.value = '';
      this.refs.confirm.value = '';
      this.setState({
        confirm: true,
        passNotMatch: true
      });
    }

  }

  render () {
    return (
      <div className="">
        <form className="loginform" >
          <input className="username" type="text" ref="username" name="username" placeholder="username" />
          <input className="passord" type="password" ref="password" name="password" placeholder="password" />
          <button className="signin" onClick={this.handleLogin.bind(this)}>
            <span className="">Login</span>
          </button>
          <button className="signup" onClick={this.confirmPass.bind(this)}>
            <span className="">Signup</span>
          </button>
        </form>
        {this.state.passNotMatch ? <p>Password did not match. Please try again.</p> : null}
        {this.state.confirm ?
          <div> 
            <label htmlFor='confirm'>Confirm your password</label>
            <input className='confirm' name='confirm' type='text' ref='confirm' /> 
            <button onClick={this.signupNewUser.bind(this)}>Create account</button>
          </div> : null}
      </div>
    )
  }
}

export default Signin;
