import React from 'react';

class Signin extends React.Component {

  constructor(props) {
    super(props);
  }
  handleSubmit (e) {
    e.preventDefault();
    this.props.onSubmit(this.refs.username.getDOMNode().value, this.refs.password.getDOMNode().value);
  }

  render() {
    return (
      <div className="">
        <form className="loginform" onSubmit={this.handleSubmit.bind(this)} >
          <input className="username" type="text" ref="username" name="username" placeholder="username" />
          <input className="passord" type="password" ref="password" name="password" placeholder="password" />
            <button type="submit" className="">
              <span className="">Signin/Signup</span>
          </button>
        </form>
      </div> 
    )
  }
}

export default Signin;
