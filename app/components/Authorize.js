import $ from 'jquery';

var Auth = {
  confirmUser(username, password, cb, url) {
    url = url || 'http://0.0.0.0:8080/api/users/signin'
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    sendRequest(username, password, url, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  getToken() {
    return localStorage.token
  },

  logout(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {
    // setState 
      // loggedIn 
  }
}

function sendRequest(username, password, url, cb) {
  var user = {username:username, password: password}
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: url,
    method: 'POST',
    data: user,

    success (data) {
      cb({
        authenticated: true,
        token: data.token,
        username: data.user
      });
    },
    error (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('Failed to store add user endpoint', data);
      cb({authenticated:false})
    }
  });

  
}

export default Auth;