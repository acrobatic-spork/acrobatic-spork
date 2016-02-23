var userController = require ('./users/userController.js');
var yelp = require ('./yelp/yelpController');
var request = require ('request');
var User = require ('./users/user');
var Uber = require ('./uber/uberController')(User);


var router = function (app, express) {
  console.log('initializing routes...................');
  app.post('/api/users/signup', userController.signup);
  app.post('/api/users/signin', userController.signin);
  app.get('/api/users/signedin', userController.checkAuth);
  app.post('/api/users/signout');
  app.get('/api/users', userController.getUser);
  app.post('/api/yelp', yelp);
  app.post('/api/uber', Uber.requestCar);
  app.get('/auth/uber', Uber.getToken);
};
module.exports = router;
