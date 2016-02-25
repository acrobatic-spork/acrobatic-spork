
var request = require ('request');

var client_id = 'x8ZBOGgvve2JHQgOFuR7ib2e2dt_A66m';
var client_secret = '9ddASgYXll_qHgdq7XxWtV0iG7AQfpAwGFh-sFL0';
var server_token = '1C_9lI-9D2E1K3OuFqH9EeayNcoWzAJendBM3BfT';
var testEndpoint = 'https://sandbox-api.uber.com/v1/requests';
var productionEndpoint = 'https://api.uber.com/v1/requests';

module.exports = function(userController) {

var Uber = {};

Uber.getToken = function (req, res, next) {
  console.log('>>>>>>>>>>>>>>>>>>>>', req);
  request.post("https://login.uber.com/oauth/v2/token?code=" + req.query.code + "&redirect_uri=http://localhost:8080/auth/uber&client_id=x8ZBOGgvve2JHQgOFuR7ib2e2dt_A66m&client_secret=9ddASgYXll_qHgdq7XxWtV0iG7AQfpAwGFh-sFL0&grant_type=authorization_code", function(err, response) {
    console.log('-------------------------------', err, response.body);
    // TODO: Add to database
  });
  res.redirect('/');
};

Uber.requestCar = function (req, res, next) {
  console.log('uber request from 4square', req.body);
  var requestCar = {
    start_latitude: req.body.startLat,
    start_longitude: req.body.startLng,
    end_latitude: req.body.endLat,
    end_longitude: req.body.endLng
  }
  
  request.post({ 
    uri: testEndpoint,
    headers: {
      Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOlsicHJvZmlsZSIsImhpc3RvcnkiLCJwbGFjZXMiXSwic3ViIjoiZjU3MTg2NTctMzFmMS00NTk3LWE5OGQtMzZiODRkMDhlNzc5IiwiaXNzIjoidWJlci11czEiLCJqdGkiOiJjNDIxNGMxYS03NzMxLTQ4NjktYjczMC01Y2IyYzA1ZWQwZDEiLCJleHAiOjE0NTg5NDQ5OTksImlhdCI6MTQ1NjM1Mjk5OSwidWFjdCI6IlV1aEFkaEFwMm5DcmQyWVhGa2VjVTJYd0RLbGlleSIsIm5iZiI6MTQ1NjM1MjkwOSwiYXVkIjoieDhaQk9HZ3Z2ZTJKSFFnT0Z1UjdpYjJlMmR0X0E2Nm0ifQ.T7KxojbjevUpNTiyImT-UQx0_HEExKxdrU5t3hPCG3XklEhJT3QWUr4DVTRJAm_Y4gdvdcLNlsI5PSgwI3REDxTfG7Kee2WpwjBiWhEi6GwU1XSKPcOOakxDZuGCT9EStXZTc0X9JQKUHzFOH_ndirb8JV8t38vabRQqydSaXPHp77GAMbCWOZx9apVAseMR9vTnfqXyqIiDsqjeDWH_sBF1U1ONcpNwDamp34R6RWkDBBGtM-Du3yCu1cCuLYaVMNrB4ZB8zQRHSqcbKAkCvqiPtU9ubUFd9vMqBfKfTg4-6DkX5BRKJ5kP6RSn1oEj7bwZUh0I4jfA912caac9lg'
    },
    // headers: 'Bearer '+req.body.token,
    body: requestCar,
    json: true
  } , function(err, response) {
    console.log('Response from uber car request', err, response.body);
  });   
};


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