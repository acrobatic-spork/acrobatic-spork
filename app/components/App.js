import React from 'react';
// import Signin from './Signin.js';
import { browserHistory, Router, Route, Link } from 'react-router'


class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  // loginSubmit (username, password) {
  //   //$.ajax();
  //   console.log('logging in with username ' + username + ' and password ' + password);
  // }

  render () {
    console.log('in app.js');
   return (
      <div>
        <ul>
         <li>
            <Link to="/signin">Sign in</Link>
         </li>
         <li><Link to="/dashboard">Dashboard</Link> </li>
       </ul>
      </div>
    )
  }
}
  
export default App;