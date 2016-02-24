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
      message: ''
    };
  }

  updatePreferences(newPrefs) {

    this.setState({
      preferences: preferences
    });

    // call the utility function to update preferences in the db
    // get the location when user signs in

    // var options = {
    //   enableHighAccuracy: true
    // }

  //   var successNav =  (loc) => {
  //     var lat = loc.coords.latitude;
  //     var lon = loc.coords.longitude;
  //     var location = {lat: lat, lon: lon}
  //    utils.updatePrefs(prefs, username, location, (updated) => {
  //       if (updated) {
  //       this.props.updatePreferences(prefs);
  //       } else {
  //         console.log('Not updated preferences in server')
  //       }
  //     });
  //   }
  //   var errorNav =  () => {
  //     console.error('Error getting location');
  //   }
  //   navigator.geolocation.getCurrentPosition(successNav, errorNav, options);
  } // updatePreferences

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