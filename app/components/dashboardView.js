import React from 'react';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
  }

  render (){
    return (
      <div>
        <div className='dashboard'>Dashboard</div>
        <div className='preferences'>
          <div className='price'>$$$$</div>
          <div className='stars'>****</div>
          <div className='distance'>Distance: 5mi</div>
          <div className='category'>Restaurants</div>
        </div>
      </div>
      )
  }
}

export default Dashboard