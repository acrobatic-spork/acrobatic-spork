import userController from './users/userController.js';
import yelp from './yelp/yelpController';

// var helpers = require('./helpers.js'); // our custom middleware
var router = (app, express) => {
  console.log('initializing routes...................');
  app.post('/api/users/signup', userController.signup);
  app.post('/api/users/signin', userController.signin);
  app.get('/api/users/signedin', userController.checkAuth);
  app.post('/api/users/signout');
  app.post('/api/yelp', yelp);


  app.get('/auth/uber', function(req, res, next) {
    console.log('..............', req.query.code);
    request.post("https://login.uber.com/oauth/v2/token?code=" + req.query.code + "&redirect_uri=http://localhost:8080/auth/uber&client_id=x8ZBOGgvve2JHQgOFuR7ib2e2dt_A66m&client_secret=9ddASgYXll_qHgdq7XxWtV0iG7AQfpAwGFh-sFL0&grant_type=authorization_code", function(err, response) {
      console.log('-------------------------------', err, response);
    });
  });
};
export default router;
