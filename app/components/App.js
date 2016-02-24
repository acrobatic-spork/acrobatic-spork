import React from 'react';
// import Signin from './Signin.js';
import { browserHistory, Router, Route, Link } from 'react-router'
import Message from './Message'
import auth from './Authorize'
import styles from '../styles/styles.css'

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      preferences: {},
      uberStatus: null,
      message: ''
    };
  }

  updatePreferences(newPrefs) {
    
    // Create a new object with the current preference
    var preferences = {};
    for(var p in this.state.preferences) {
      preferences[p] = this.state.preferences[p];
    }
    // Overwrite any preferences to update
    for(var p in newPrefs) {
      preferences[p] = newPrefs[p];
    }
    // Set the state
    this.setState({
      preferences: preferences
    });

    console.log(this.state);
  }

  updateUser(name) {
    console.log("The user is now: ", name);
    this.setState({
      user: name
    });
  }

  displayMessage(message) {
    console.log("The user is now: ", name);
    this.setState({
      message: message
    });
  }

  updateUberStatus(status) {
    this.setState({
      uberStatus: status
    });
  }

  getUsername(){
    return this.state.user;
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
              updateUberStatus: this.updateUberStatus.bind(this),
              getUsername: this.getUsername.bind(this),
              displayMessage: this.displayMessage.bind(this),
              ...this.props });
          });
    console.log('in app.js');
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