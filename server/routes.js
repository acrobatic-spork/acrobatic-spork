var request = require ('request');
var userController = require ('./users/userController.js');
var Uber = require ('./uber/uberController')(userController);
var FourSquare = require ('./fourSquare/fourSquareController');


var router = function (app, express) {
  console.log('initializing routes...................');
  app.post('/api/users/signup', userController.signup);
  app.post('/api/users/signin', userController.signin);
  app.get('/api/users/signedin', userController.checkAuth);
  app.post('/api/users/signout');

  app.put('/api/users', userController.updatePrefs);
  app.get('/api/users', userController.getUser);

  app.get('/api/users/auth', userController.redirectToUber);

  app.get('/api/spork', FourSquare.init);
  app.post('/api/uber', Uber.requestCar);

  app.get('/auth/uber', Uber.getToken);
};

module.exports = router;
