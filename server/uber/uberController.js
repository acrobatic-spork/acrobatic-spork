
var request = require ('request');
var client_id = 'x8ZBOGgvve2JHQgOFuR7ib2e2dt_A66m';
var client_secret = '9ddASgYXll_qHgdq7XxWtV0iG7AQfpAwGFh-sFL0';
var server_token = '1C_9lI-9D2E1K3OuFqH9EeayNcoWzAJendBM3BfT';
var endpoint = 'https://sandbox-api.uber.com/v1/sandbox/requests';

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
  console.log('uber request from yelp', req);
  var startLoc = req.body.startLoc;
  var endLoc = req.body.endLoc;

  // start_latitude
  // start_longitude
  // end_latitude
  // end_longitude
  // Bearer


  
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