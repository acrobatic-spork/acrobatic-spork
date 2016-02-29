import React from 'react';
// import Signin from './Signin.js';
import { browserHistory, Router, Route, Link } from 'react-router'
import Message from './Message'
import Status from './UberStatusView'
import auth from './Authorize'
import styles from '../styles/styles.css'
import utils from './utils'

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      preferences: {
        price: 2,
        range: 2,
        chooseFood: true
      },
      message: '',
      rideStatus: {}
    };
  }

  updatePreferences(newPrefs) {

    this.setState({
      preferences: newPrefs
    });

    utils.updatePrefs(newPrefs, this.state.user, (updated) => {
        if (updated) {
          console.log('Updated preferences in server')
          browserHistory.push('/');
        } else {
          console.log('Not updated preferences in server');
          this.displayMessage('There was a problem updating your preferences. Please try again');
        }
      });
    }

  updateUser(name) {
    console.log("The user is now: ", name);
    this.setState({
      user: name
    });
  }

  setRideStatus(rideStatus) {
    this.setState({
      rideStatus: rideStatus
    });
  }

  updateRideStatus(rideId) {
    // call utility
    utils.updateETA(rideId, (err, res) => {
      if(err) {
        console.log("Error getting ride update.");
      } else {
        console.log("The ride update is: ", res);
      }
    });
    
    // update state
  }

  displayMessage(message) {
    this.setState({
      message: message
    });
  }

  componentWillMount () {
    if (auth.loggedIn() && !this.state.user) {
      auth.getUserInfoFromJWT(function(data) {
        this.setState({
          user: data.username,
          preferences: data.preferences
        });      
      }.bind(this));
    }
  }

  linkUberAccount() {
    console.log('In linkUberAccount')
    if(!this.state.user){
      console.log('Username not found in state')
      this.logout();
      // browserHistory.push('/signin');
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

  logout(e) {
    if (e) e.preventDefault;
    auth.logout(() => {
      browserHistory.push('/signin');
    });
  }

  render () {
     var childrenWithProps = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { 
              updateUser: this.updateUser.bind(this),
              updatePreferences: this.updatePreferences.bind(this),
              updateRideStatus: this.updateRideStatus.bind(this),
              setRideStatus: this.setRideStatus.bind(this),
              displayMessage: this.displayMessage.bind(this),
              linkUberAccount: this.linkUberAccount.bind(this),
              user: this.state.user,
              status: this.state.rideStatus,
              preferences: this.state.preferences,
              ...this.props });
          });
   return (
      <div className={styles["container"]}>
      <nav>
        <ul>
        { auth.loggedIn() ? [
         <li><Link activeClassName={styles['active-nav']} to="/dashboard">Dashboard</Link> </li>,
         <li><Link activeClassName={styles['active-nav']} to="/status">Status</Link> </li>,
         <li><Link onlyActiveOnIndex activeClassName={styles['active-nav']} to="/">Spork Now</Link> </li>,
         <li><Link activeClassName={styles['active-nav']} to="/uber">Connect Uber</Link> </li>,
         <li><a href='#' onClick={this.logout.bind(this)}>Log Out</a></li>,
         ]
         :  <li><Link activeClassName={styles['active-nav']} to="/signin">Sign in</Link></li>  }
       </ul>
       </nav>
       <Message message={this.state.message} />
       {childrenWithProps}
      <div className={styles['anim-box']} style={{display: 'none'}}><img src="images/wc-spork.png" /></div>
      </div>
      )
    }
  }
  
export default App;