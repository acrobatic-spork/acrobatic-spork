import React from 'react';
import ReactInterval from 'react-interval';


const UberStatus = (props) => (
  <div>
    <div className="venue"> 
      <span className="venue-text">Destination: {props.status.venue}</span>
    </div>
    <div className="uber-status"> 

      <ReactInterval timeout={5000} enabled={true}
          callback={() => {
            console.log("Tick");
            console.log(props.status.id);
            var id = props.status.id;
            props.updateRideStatus(id);
          }
        } />

      <span className="uber-status-text">ETA: {props.status.eta}</span>
    </div>
  </div>
)

export default UberStatus;