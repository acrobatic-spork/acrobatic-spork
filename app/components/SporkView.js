import React from 'react';
import styles from '../styles/styles.css'

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
      <div className={styles['button-box']}>
        <button onClick={this.sporkHandler.bind(this)} className={styles['spork-button']}>Spork</button>
      </div>
      )
  }
}

export default Spork;