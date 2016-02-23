import userController from './users/userController.js';
import yelp from './yelp/yelpController';
import request from 'request';
import Uber from './uber/uberController';

// var helpers = require('./helpers.js'); // our custom middleware
var router = (app, express) => {
  console.log('initializing routes...................');
  app.post('/api/users/signup', userController.signup);
  app.post('/api/users/signin', userController.signin);
  app.get('/api/users/signedin', userController.checkAuth);
  app.post('/api/users/signout');
  app.post('/api/yelp', yelp);
  app.post('/api/uber', Uber.requestCar);
  app.get('/auth/uber', Uber.getToken);
};
export default router;
