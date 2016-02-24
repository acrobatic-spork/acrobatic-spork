import Auth from './Authorize'
import $ from 'jquery';


var utils = {};
utils.sendAuthRequest = (username, password, url, cb) => {
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
};

utils.updatePrefs = (prefs, username, cb) => {
  $.ajax({
    url: '/api/users/username='+username,
    beforeSend: function (request){
      if(Auth.loggedIn()){
        request.setRequestHeader("x-access-token", Auth.getToken());
      }
    },
    method: 'POST',
    data: prefs,
    success (data) {
      cb(true);
    },
    error (data) {
     console.error('Failed to store preferences at endpoint', data);
     cb(false) 
    }
  })
};

export default utils;