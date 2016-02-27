import React from 'react'

const UberStatus = (props) => (
  <div>
    <div className="venue"> 
      <span className="venue-text">Destination: {props.status.venue}</span>
    </div>
    <div className="uber-status"> 
      <span className="uber-status-text">ETA: {props.status.eta}</span>
    </div>
  </div>
)

export default UberStatus;