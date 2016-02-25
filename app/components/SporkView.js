import React from 'react';
import styles from '../styles/styles.css'
import utils from './utils'

class Spork extends React.Component {
  constructor(props){
    super(props);
  }

  sporkHandler (e) {
    e.preventDefault();
    console.log('in spork handler');

    // sends the spork request after getting location
    var successNav =  (loc) => {
      var lat = loc.coords.latitude;
      var lon = loc.coords.longitude;
      var location = {lat: lat, lng: lon};
      console.log('props.geUser exists: ', this.props.getUser)
      location.username = this.props.getUser();
      if (location.username){
        console.log('got location & username', location)
        utils.sendSporkRequest(location, (res) => {
          console.log('sent spork request & response is:', res);
        });  
      } else console.log('Could not get username');
    }
    // get location
    utils.getLocation(successNav.bind(this));

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