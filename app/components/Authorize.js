import $ from 'jquery';
import utils from './utils'
var Auth = {
  confirmUser(username, password, cb, url) {
    url = url || 'http://0.0.0.0:8080/api/users/signin'
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    utils.sendRequest(username, password, url, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
      } else {
        if (cb) cb(false)
      }
    })
  },

  getToken() {
    return localStorage.token
  },

  logout(cb) {
    delete localStorage.token
    if (cb) cb()
  },

  loggedIn() {
    return !!localStorage.token
  }
}



export default Auth;