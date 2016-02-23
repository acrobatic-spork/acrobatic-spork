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
    console.log(JSON.stringify(newPrefs));
    this.setState({
      // add or replace preferences with prefs passed in
      preferences: this.state.preferences.extend(newPrefs)
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


  render () {
    console.log('in app.js');
     var childrenWithProps = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { 
              updateUser: this.updateUser.bind(this),
              updatePreferences: this.updatePreferences,
              updateUberStatus: this.updateUberStatus,
              ...this.props });
          });
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