import $ from 'jquery';
import utils from './utils'

var Auth = {
  confirmUser(username, password, cb, url) {
    url = url || 'http://0.0.0.0:8080/api/users/signin'
    if (localStorage.getItem('token')) {
      if (cb) cb(true)
      return
    }
    utils.sendAuthRequest(username, password, url, (res) => {
      if (res.authenticated) {
        localStorage.setItem('token', res.token);
        if (cb) cb(true, res)
      } else {
        if (cb) cb(false, res)
      }
    })
  },

  getToken() {
    return localStorage.getItem('token');
  },

  logout(cb) {
    localStorage.removeItem('token');
    if (cb) cb()
  },

  loggedIn() {
    return !!localStorage.getItem('token')
  }
}



export default Auth;