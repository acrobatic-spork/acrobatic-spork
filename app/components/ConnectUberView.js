import React from 'react'

class ConnectUber extends React.Component {
  constructor(props){
    super(props);
  }

  handleUberSignin (e) {
    e.preventDefault();
    // send them to Uber
      // Uber link? "https://login.uber.com/oauth/v2/authorize?response_type=code&client_id=x8ZBOGgvve2JHQgOFuR7ib2e2dt_A66m"
      // when done, route them to the prefs page?
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