import React from 'react';
import Yelp from '../../server/yelp/yelpController';
import Uber from '../../server/uber/uberController';

class Spork extends React.Component {
  constructor(props){
    super(props);
  }

  sporkHandler (e) {
    e.preventDefault();
    // get user preferences from state
    // query yelp
      // on response, choose a place (helper function?)
        // on response query uber for a ride
          // on response
            // update state to ride on the way
            // route user to uber?

  }
  
  render (){
    return (
      <div>
        <button onClick={this.sporkHandler.bind(this)}className='spork-button'>SporkButton</button>
      </div>
      )
  }
}

export default Spork;