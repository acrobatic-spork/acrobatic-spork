import React from 'react';
import Auth from './Authorize';
import { browserHistory } from 'react-router';
import utils from './utils'
import styles from '../styles/styles.css'
import { spring } from 'react-motion'
import Transition from 'react-motion-ui-pack'

// import function that will send post request to DB

class Signin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      confirm: false,
      passNotMatch: false
    };
  }

  handleLogin (e) {
    e.preventDefault();
    Auth.confirmUser(this.refs.username.value, this.refs.password.value, (loggedIn, res) => {
      if(loggedIn) {
        //get location permission on sign so spork request had better user experience
        utils.getLocation( () => console.log('Got location on Login') );
        this.props.updateUser(res.user.username);
        this.props.updatePreferences(res.user.preferences);
        // browserHistory.push('/');
        // check for uber token, if not valid, route to connect uber
        utils.checkUberToken(this.refs.username.value, (err, tokenLength) => {
          if(err) {
            console.error(err);
          } else {
            console.log("The token length: ", tokenLength);
            if(tokenLength) {
              browserHistory.push('/');  
            } else {
              browserHistory.push('/uber');
            }
          }
        });
        this.props.displayMessage('');
      }  else {
        var message = res.error.responseText.substr(0, res.error.responseText.indexOf('<')) || res.error.responseText;
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
          this.props.updateUser(res.user.username);
          this.props.updatePreferences(res.user.preferences);
          this.props.displayMessage('');
          console.log("Sending new user to uber route");
          browserHistory.push('/uber');
        } else {
          var message = res.error.responseText.substr(0, res.error.responseText.indexOf('<')) || res.error.responseText;
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
      <div className={styles["content"]}>
        <form className="loginform" >
        <fieldset>
        <legend>Please Login/Signup to begin</legend>
          <div className={styles["form-item"]} >
            <input className="username" type="text" ref="username" name="username" placeholder="username" required autoFocus={!this.state.confirm} />
          </div>
          <div className={styles["form-item"]} >
            <input className="password" type="password" ref="password" name="password" placeholder="password" required />
          </div>
          <div className={styles["form-item"]} >
            <button className={styles['default-button']}  onClick={this.handleLogin.bind(this)}>
              <span className="">Login</span>
            </button>
            <button onClick={this.confirmPass.bind(this)}>
              <span className="">Signup</span>
            </button>
          </div>
          </fieldset>
          </form>
          <Transition
            component={false} // don't use a wrapping component
            enter={{
                height: 'auto',
                opacity: 1,
            }}
            leave={{
              opacity: 0,
              height:0
            }}
            >
            
            {this.state.confirm &&
              <form key="confirm-form">
              <fieldset>
                <legend>Confirm your password</legend>
          {this.state.passNotMatch ? <p className={styles['message']}>Password did not match. Please try again.</p> : null}
            <div className={styles["form-item"]} key="confirm" > 
                <input className='confirm' name='confirm' type='password' placeholder='confirm password' ref='confirm' autoFocus={this.state.confirm} />
                <br/>
                <button type="submit" className={styles['default-button']} onClick={this.signupNewUser.bind(this)}>Create account</button>
            </div>
        </fieldset>
        </form>
          }
          </Transition>
      </div>
    )
  }
}

export default Signin;
