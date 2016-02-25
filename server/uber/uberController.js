
var request = require ('request');

var client_id = 'x8ZBOGgvve2JHQgOFuR7ib2e2dt_A66m';
var client_secret = '9ddASgYXll_qHgdq7XxWtV0iG7AQfpAwGFh-sFL0';
var server_token = '1C_9lI-9D2E1K3OuFqH9EeayNcoWzAJendBM3BfT';
var testEndpoint = 'https://sandbox-api.uber.com/v1/requests';
var productionEndpoint = 'https://api.uber.com/v1/requests';

var testAccessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOlsicmVxdWVzdCJdLCJzdWIiOiJmNTcxODY1Ny0zMWYxLTQ1OTctYTk4ZC0zNmI4NGQwOGU3NzkiLCJpc3MiOiJ1YmVyLXVzMSIsImp0aSI6IjI4MjBkYTZjLTcxNWQtNDM1Ni1hNGExLTIyYmNjYWQ1NTgwYiIsImV4cCI6MTQ1ODk0NjU3NCwiaWF0IjoxNDU2MzU0NTc0LCJ1YWN0IjoidUhHQm9RWXJqbUtzSHRVbmtYbFJwbjVrRXhHQTc2IiwibmJmIjoxNDU2MzU0NDg0LCJhdWQiOiJ4OFpCT0dndnZlMkpIUWdPRnVSN2liMmUyZHRfQTY2bSJ9.nBh2WRXLQ-p_hWSMnbWC6jXTOURqZzgwemivQ3YyJrKQLGzhvrOqsbqlWwwOhB2dMco9KwV6JNKoZSskMzvPVdt6Ou15RLnyxYgkHpVsrBb-vgdztvDIWj0VUV55cjqX3KiUNgZwH0ndGDKAvAvFS-OILm_yFegCWnt_CteFXPRuN-S-Q-cE4WZDzMtu7FCDSdPiQC0o83cw9Owf7C_01TnKidpMLY_JTYIaYio_bfdbhQy5MwIttHAbSwrltK8s2lnvBh-qGMnV5Og6iV7RInSQu9YF8s8KbGsZKrFy8MbGBY-kInWdv5dRGMtSHkPd14Fg8FZGaJAaF1HH9w6DyQ'


module.exports = function(userController) {

var Uber = {};

Uber.getToken = function (req, res, next) {
  request.post("https://login.uber.com/oauth/v2/token?code=" + req.query.code + "&redirect_uri=http://localhost:8080/auth/uber&client_id=x8ZBOGgvve2JHQgOFuR7ib2e2dt_A66m&client_secret=9ddASgYXll_qHgdq7XxWtV0iG7AQfpAwGFh-sFL0&grant_type=authorization_code", function(err, response) {
    console.log('-------------------------------', err, response.body);
    request.post({
      uri: 'http://localhost:8080/api/users/auth',
      body: req.body.access_token
    })
    // TODO: Add to database
  });
  // res.redirect('/');
};

Uber.requestCar = function (req, res, next) {
  console.log('uber request from 4square', req.body);
  // var token = req.body.token;
  var requestCar = {
    start_latitude: req.body.startLat,
    start_longitude: req.body.startLng,
    end_latitude: req.body.endLat,
    end_longitude: req.body.endLng
  }
  
  request.post({ 
    uri: testEndpoint,
    headers: {
      'Authorization': 'Bearer '+testAccessToken
    },
    body: requestCar,
    json: true
  } , function(err, response) {
    console.log('Response from uber car request', err, response.body);
  });   
};

Uber.checkStatus = function (req, res, next) {
  request.get({ 
    uri: testEndpoint+'/<REQUEST_ID>',
    headers: {
      'Authorization': 'Bearer '+testAccessToken
    }
  } , function(err, response) {
    console.log('Status of uber ride', err, response.body);
  });
}

Uber.cancelRequest = function (req, res, next) {
  request.delete({ 
    uri: testEndpoint+'/<REQUEST_ID>',
    headers: {
      'Authorization': 'Bearer '+testAccessToken
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