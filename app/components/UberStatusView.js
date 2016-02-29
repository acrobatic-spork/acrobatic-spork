import React from 'react';
import ReactInterval from 'react-interval';


class UberStatus extends React.Component {

  constructor(props) {
    super(props);
  }

  handleCancel (e) {
    e.preventDefault();
    this.props.cancelRide(this.props.status.id);
  }

  render () {
    return (
      <div>
        <div className="venue"> 
          <span className="venue-text">Destination: {this.props.status.venue}</span>
        </div>
        <div className="uber-status"> 

          <ReactInterval timeout={5000} enabled={true}
              callback={() => {
                console.log("Tick");
                console.log(this.props.status.id);
                var id = this.props.status.id;
                this.props.updateRideStatus(id);
              }
            } />

          <span className="uber-status-text">ETA: {this.props.status.eta}</span>
        
        </div>
        <div>
          <button onClick={this.handleCancel.bind(this)}>
            <span className="">Cancel Ride</span>
          </button>
        </div>
      </div>
    )
  }
}

export default UberStatus;