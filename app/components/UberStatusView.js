import React from 'react';
import ReactInterval from 'react-interval';
import { browserHistory } from 'react-router';


class UberStatus extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      checkStatus: !!Object.keys(this.props.status).length
    };
  }

  handleCancel (e) {
    e.preventDefault();
    var ride = {
      id: this.props.status.id,
      user: this.props.user
    };
    this.props.cancelRide(ride);
    browserHistory.push('/');
  }

  render () {
    return (
      <div>
        <div className="venue"> 
          <span className="venue-text">Destination: {this.props.status.venue}</span>
        </div>
        <div className="uber-status"> 

          <ReactInterval timeout={5000} enabled={this.state.checkStatus}
              callback={() => {
                console.log("Tick");
                console.log(this.props.status.id);
                var ride = {
                  id: this.props.status.id,
                  user: this.props.user
                };
                this.props.updateRideStatus(ride);
              }
            } />

          <span className="uber-status-text">Status: {this.props.status.status}</span>
        
        </div>
        <div>
          <button onClick={this.handleCancel.bind(this)}>
            <span className="">Cancel Ride</span>
          </button>
        </div>
        <div>
          <button>
            <a target="_blank" href="https://m.uber.com/">Open Uber</a>
          </button>
        </div>
      </div>
    )
  }
}

export default UberStatus;