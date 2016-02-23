import React from 'react';

class Spork extends React.Component {
  constructor(props){
    super(props);
  }

  sporkHandler (e) {
    e.preventDefault();
    this.props.onSubmit();
  }
  
  render (){
    return (
      <div>
        <button onClick={this.sporkHandler}className='spork-button'>SporkButton</button>
      </div>
      )
  }
}

export default Spork