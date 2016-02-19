class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  loginSubmit (username, password) {
    //$.ajax();
    console.log('logging in with username ' + username + ' and password ' + password);
  }

  render () {
   return (
      <div>
        <Signin onSubmit={this.loginSubmit.bind(this)} />
      </div>
    )
  }
}
  
ReactDOM.render(<App />, document.getElementById("app"));
  
