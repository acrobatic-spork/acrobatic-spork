import React from 'react';
// import Signin from './Signin.js';
import { browserHistory, Router, Route, Link } from 'react-router'


class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    console.log('in app.js');
     var childrenWithProps = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { ...this.props });
          });
   return (
      <div>
        <ul>
         <li><Link to="/signin">Sign in</Link></li>
         <li><Link to="/dashboard">Dashboard</Link> </li>
         <li><Link to="/spork">Spork Now</Link> </li>
         <li><Link to="/uber">Connect Uber</Link> </li>
       </ul>
       {this.props.children}
      </div>
    )
  }
}
  
export default App;