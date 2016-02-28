import React from 'react';
import styles from '../styles/styles.css'
import utils from './utils'
import Status from './UberStatusView'

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
        utils.sendSporkRequest(location, (err, res) => {
          console.log('sent spork request & response is:', res);
          var rideStatus = {
            venue: res.venue,
            status: res.uberStatus.status,
            eta: res.uberStatus.eta,
            id: res.uberStatus.request_id
          };
          this.props.upDateRideStatus(rideStatus);
        });  
      } else console.log('Could not get username');
    }
    // get location
    utils.getLocation(successNav.bind(this));

  }
  
  render (){
    return (
      <div className={styles['button-box']}>
        <div>
          <button onClick={this.sporkHandler.bind(this)} className={styles['spork-button']}>Spork</button>
        </div>
      </div>
      )
  }
}

export default Spork;