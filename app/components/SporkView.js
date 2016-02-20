import React from 'react';

class Spork extends React.Component {
  constructor(props){
    super(props);
  }
  
  render (){
    return (
      <div>
        <div onClick={this.props.sporkHandler}className='spork-button'>SporkButton</div>
      </div>
      )
  }
}

export default Spork