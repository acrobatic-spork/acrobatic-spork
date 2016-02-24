import React from 'react';
// import Signin from './Signin.js';
import { browserHistory, Router, Route, Link } from 'react-router'


class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      preferences: {},
      uberStatus: null
    };
  }

  updatePreferences(newPrefs) {
    this.setState({
      preferences: newPrefs
    });
  }

  updateUser(name) {
    console.log("The user is now: ", name);
    this.setState({
      user: name
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

  render () {
    console.log('in app.js');
     var childrenWithProps = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { 
              updateUser: this.updateUser.bind(this),
              updatePreferences: this.updatePreferences.bind(this),
              updateUberStatus: this.updateUberStatus.bind(this),
              getUsername: this.getUsername.bind(this),
              ...this.props });
          });
    console.log('in app.js');
   return (
      <div>
        <ul>
         <li><Link to="/signin">Sign in</Link></li>
         <li><Link to="/dashboard">Dashboard</Link> </li>
         <li><Link to="/spork">Spork Now</Link> </li>
         <li><Link to="/uber">Connect Uber</Link> </li>
       </ul>
       {childrenWithProps}
      </div>
      )
    }
  }
  
export default App;