import React from 'react';
// import Signin from './Signin.js';
import { browserHistory, Router, Route, Link } from 'react-router'
import Message from './Message'
import auth from './Authorize'
import styles from '../styles/styles.css'
import utils from './utils'

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      preferences: {},
      message: ''
    };
  }

  updatePreferences(newPrefs) {

    this.setState({
      preferences: newPrefs
    });

   // updatePreferences
   var preferences = {
    preferences: newPrefs,
    username: this.state.user
   };

    utils.updatePrefs(preferences, (updated) => {
        if (updated) {
          console.log('Updated preferences in server')
        } else {
          console.log('Not updated preferences in server')
        }
      });
    }

  updateUser(name) {
    console.log("The user is now: ", name);
    this.setState({
      user: name
    });
  }

  displayMessage(message) {
    console.log("The message is now: ", message);
    this.setState({
      message: message
    });
  }

  linkUberAccount() {
    console.log('In linkUberAccount')
    if(!this.state.user){
      console.log('Username not found in state')
      browserHistory.push('/signin');
    } else {
    // util function that sends them to uber, with redirect uri set to our uber enpoint
      utils.getUberAuth( this.state.user, 
        (err, res) => {
          if (err) {
            console.error(err);
            return
          } else {
            console.log('Got uber auth: ',res);
            // have to confirm if the server has recieved 'code' & access / refresh token
            browserHistory.push('/dashboard');
            // then sends them to preferences 
          }
        });
      }
  }

  getUser() {
    return this.state.user
  }

  logout(e) {
    e.preventDefault;
    auth.logout(() => {
      browserHistory.push('/signin');
    });
  }

  render () {
    console.log('in app.js');

     var childrenWithProps = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { 
              updateUser: this.updateUser.bind(this),
              updatePreferences: this.updatePreferences.bind(this),
              displayMessage: this.displayMessage.bind(this),
              linkUberAccount: this.linkUberAccount.bind(this),
              getUser: this.getUser.bind(this),
              ...this.props });
          });
   return (
      <div>
      <nav>
        <ul>
         <li><Link activeClassName={styles['active-nav']} to="/dashboard">Dashboard</Link> </li>
         <li><Link onlyActiveOnIndex activeClassName={styles['active-nav']} to="/">Spork Now</Link> </li>
         <li><Link activeClassName={styles['active-nav']} to="/uber">Connect Uber</Link> </li>
        {auth.loggedIn() ?
         <li><a href='#' onClick={this.logout.bind(this)}>Log Out</a></li>
         : <li><Link activeClassName={styles['active-nav']} to="/signin">Sign in</Link></li> }
       </ul>
       </nav>
       <Message message={this.state.message} />
       {childrenWithProps}
      </div>
      )
    }
  }
  
export default App;