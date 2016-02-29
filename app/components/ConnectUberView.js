import React from 'react'
import LoadingAnimation from './LoadingAnimation'

class ConnectUber extends React.Component {
  constructor(props){
    super(props);
    this.state = { loading: false };
  }

  handleUberSignin (e) {
    console.log('In handleUberSignin')
    e.preventDefault();
    this.setState({loading: true});
    this.props.linkUberAccount();
  }

  render() {
    return (
      <div>
      <span><h3>You need an UBER account to use this app</h3></span>
      {this.state.loading ? <LoadingAnimation /> :
      <form onSubmit={this.handleUberSignin.bind(this)}> 
        <button type="submit" className="connect-uber">
          <span>Connect Your Uber Account</span>
        </button>
      </form>
      }
      </div>
    )  
  }
}
export default ConnectUber;