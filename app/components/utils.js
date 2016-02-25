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
    error (err) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('Failed to store add user endpoint', err);
      cb({authenticated:false,
          error:err});
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

utils.getLocation = (successNav) => {
  var options = {
    enableHighAccuracy: true
  }

  var errorNav =  () => {
    console.error('Error getting location');
  }
  navigator.geolocation.getCurrentPosition(successNav, errorNav, options);
}

utils.getUberAuth = (username, cb) => {
  console.log('In getUberAuth: user: ', username)
  var uberParams = {
    responseType: 'code',
    client_id: 'x8ZBOGgvve2JHQgOFuR7ib2e2dt_A66m',
    redirect_uri: 'http://acrobaticspork.com/auth/uber/'
  }
   var url = 'https://login.uber.com/oauth/v2/authorize?'
   url = url + $.param( uberParams );
   window.location.replace(url);
   cb(null);
}

utils.sendSporkRequest = (userLocation, cb) => {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: '/api/spork',
    type: 'GET',
    data: userLocation,

    success (data) {
      cb(null, data);
    },
    error (data) {
      cb(data, null);
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('Failed to send Spork request, response: ', data);
    }
  });

}


export default utils;