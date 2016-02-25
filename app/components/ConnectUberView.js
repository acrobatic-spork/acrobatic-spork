import React from 'react'

class ConnectUber extends React.Component {
  constructor(props){
    super(props);
  }

  handleUberSignin (e) {
    e.preventDefault();
    this.props.linkUberAccount();
  }

  render() {
    return (
      <form onSubmit={this.handleUberSignin.bind(this)}> 
        <button type="submit" className="connect-uber">
          <span>Connect Your Uber Account</span>
        </button>
      </form>
    )  
  }
}
export default ConnectUber;