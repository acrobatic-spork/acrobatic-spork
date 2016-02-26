var request = require ('request');

var config = {
  client_id: 'x8ZBOGgvve2JHQgOFuR7ib2e2dt_A66m',
  client_secret: 'S5gtX14LRlWMs_oo_F1ANa0lVDjw7kkf6Q0f5QPg',
  server_token: '1C_9lI-9D2E1K3OuFqH9EeayNcoWzAJendBM3BfT',
  endpoint: 'https://api.uber.com/v1/requests'
}

var test = {
  endpoint: 'https://sandbox-api.uber.com/v1/requests',
  redirectUri: 'http://localhost:3000/auth/uber',
  access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOlsicmVxdWVzdCJdLCJzdWIiOiJmNTcxODY1Ny0zMWYxLTQ1OTctYTk4ZC0zNmI4NGQwOGU3NzkiLCJpc3MiOiJ1YmVyLXVzMSIsImp0aSI6IjI4MjBkYTZjLTcxNWQtNDM1Ni1hNGExLTIyYmNjYWQ1NTgwYiIsImV4cCI6MTQ1ODk0NjU3NCwiaWF0IjoxNDU2MzU0NTc0LCJ1YWN0IjoidUhHQm9RWXJqbUtzSHRVbmtYbFJwbjVrRXhHQTc2IiwibmJmIjoxNDU2MzU0NDg0LCJhdWQiOiJ4OFpCT0dndnZlMkpIUWdPRnVSN2liMmUyZHRfQTY2bSJ9.nBh2WRXLQ-p_hWSMnbWC6jXTOURqZzgwemivQ3YyJrKQLGzhvrOqsbqlWwwOhB2dMco9KwV6JNKoZSskMzvPVdt6Ou15RLnyxYgkHpVsrBb-vgdztvDIWj0VUV55cjqX3KiUNgZwH0ndGDKAvAvFS-OILm_yFegCWnt_CteFXPRuN-S-Q-cE4WZDzMtu7FCDSdPiQC0o83cw9Owf7C_01TnKidpMLY_JTYIaYio_bfdbhQy5MwIttHAbSwrltK8s2lnvBh-qGMnV5Og6iV7RInSQu9YF8s8KbGsZKrFy8MbGBY-kInWdv5dRGMtSHkPd14Fg8FZGaJAaF1HH9w6DyQ'
}

module.exports = function(userController) {

var Uber = {};

Uber.getToken = function (req, res, next) {
  request.post("https://login.uber.com/oauth/v2/token?code=" + req.query.code + "&redirect_uri=" + test.redirectUri + "&client_id=" + config.client_id + "&client_secret=" + config.client_secret + "&grant_type=authorization_code", function(err, response) {

    var token = {
      uberToken: JSON.parse(response.body).access_token
    }

    request.put({
      uri: 'http://localhost:3000/api/users?username=' + req.session.user,
      body: token,
      json: true
    })
  });
  res.redirect('/');
};

Uber.requestCar = function (req, res, next) {
  // var token = req.body.token;
  var requestCar = {
    start_latitude: req.body.startLat,
    start_longitude: req.body.startLng,
    end_latitude: req.body.endLat,
    end_longitude: req.body.endLng
  }
  
  request.post({ 
    uri: test.endpoint,
    headers: {
      'Authorization': 'Bearer '+test.access_token
    },
    body: requestCar,
    json: true
  } , function(err, response) {
    console.log('Response from uber car request', err, response.body);
  });   
};

Uber.checkStatus = function (req, res, next) {
  request.get({ 
    uri: test.endpoint+'/<REQUEST_ID>',
    headers: {
      'Authorization': 'Bearer '+test.access_token
    }
  } , function(err, response) {
    console.log('Status of uber ride', err, response.body);
  });
}

Uber.cancelRequest = function (req, res, next) {
  request.delete({ 
    uri: test.endpoint+'/<REQUEST_ID>',
    headers: {
      'Authorization': 'Bearer '+test.access_token
    }
  } , function(err, response) {
    console.log('Cancelling uber request', err, response.body);
  });
}


// example response
/*{
   "request_id": "852b8fdd-4369-4659-9628-e122662ad257",
   "status": "processing",
   "vehicle": null,
   "driver": null,
   "location": null,
   "eta": 5,
   "surge_multiplier": null
}*/

return Uber;
};
// module.exports = Uber;