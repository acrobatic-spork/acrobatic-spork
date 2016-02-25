import React from 'react'

class Confirm extends React.Component {

  signupUser (e) {
    var username = '';
    var url = 'http://0.0.0.0:8080/api/users/signup';
    Auth.confirmUser(username, this.refs.password.value, (loggedIn, res) => {
      if (loggedIn) {
        this.props.updateUser(this.refs.username.value);
        browserHistory.push('/dashboard');
      } else {
        var message = res.error.responseText.substr(0, res.error.responseText.indexOf('<'));
        this.props.displayMessage(message);
      }

    }, url);
  }

  render () {
    return (
      <form>
        <label htmlFor='confirm'>Confirm your password</label>
        <input className='confirm' name='confirm' type='text' ref='confirm'/> 
        <button type='submit'>Create account</button>
      </form>
    )
  }  


}



export default Confirm;