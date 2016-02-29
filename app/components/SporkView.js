import React from 'react';
import styles from '../styles/styles.css'
import utils from './utils'
import Status from './UberStatusView'
import LoadingAnimation from './LoadingAnimation'
import { browserHistory, Router, Route, Link } from 'react-router'

class Spork extends React.Component {
  constructor(props){
    super(props);

    this.state = {
       buttonDisabled: false 
     }
  }

  sporkHandler (e) {
    e.preventDefault();
    console.log('in spork handler');
    this.setState({
      buttonDisabled: true
    });

    // sends the spork request after getting location
    var successNav =  (loc) => {
      var lat = loc.coords.latitude;
      var lon = loc.coords.longitude;
      var location = {lat: lat, lng: lon};
      location.username = this.props.user;
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
          this.props.setRideStatus(rideStatus);
          browserHistory.push('/status')
        });  
      } else {
        console.log('The user name in props is: ', this.props.user, ' which is bad.');
      };
    }
    // get location
    utils.getLocation(successNav.bind(this));
  }
  
  render (){
    return (
      <div>
        {this.state.buttonDisabled ? <LoadingAnimation /> :
        <div className={styles['button-box']}>
            <button onClick={this.sporkHandler.bind(this)} className={styles['spork-button']}>Spork</button>
        </div>
        }
      </div>
      )
  }
}

export default Spork;