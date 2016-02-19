class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  loginSubmit (e) {
    e.preventDefault()
    console.log('logging in...');
    
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
  
