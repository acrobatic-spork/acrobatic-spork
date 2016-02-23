import React from 'react';
// import function that will send post request to DB

class Signin extends React.Component {

  constructor(props) {
    super(props);
  }

  handleSignin (e) {
    e.preventDefault();
    //confirmUser(this.refs.username.value, this.refs.password.value);
    this.props.updateUser(this.refs.username.value);
  }

  handleSignup (e) {
    e.preventDefault();
    //addUser(this.refs.username.value, this.refs.password.value);
    this.props.updateUser(this.refs.username.value);

  }

  render() {
    console.log('Preferences passed down: ', this.props.preferences)
    return (
      <div className="">
        <form className="loginform" >
          <input className="username" type="text" ref="username" name="username" placeholder="username" />
          <input className="password" type="password" ref="password" name="password" placeholder="password" />
          <button className="signin" onClick={this.handleSignin.bind(this)}>
            <span className="">Signin</span>
          </button>
          <button className="signup" onClick={this.handleSignup.bind(this)}>
            <span className="">Signup</span>
          </button>
        </form>
      </div> 
    )
  }
}

export default Signin;
