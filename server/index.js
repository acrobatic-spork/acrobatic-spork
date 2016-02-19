const express = require('express');
const yelp = require('./yelp/yelpController');
const passport = require('passport');
const uberStrategy = require('passport-uber');
const request = require('request');

const app = express();

app.use(express.static(__dirname + '/../public'));

app.post('/api/users/signup');
app.post('/api/users/signin');
app.post('/api/users/signout');
app.post('/api/yelp', yelp);


app.get('/auth/uber', function(req, res, next) {
  console.log('..............', req.query.code);
  request.post("https://login.uber.com/oauth/v2/token?code=" + req.query.code + "&redirect_uri=http://localhost:8080/auth/uber&client_id=x8ZBOGgvve2JHQgOFuR7ib2e2dt_A66m&client_secret=9ddASgYXll_qHgdq7XxWtV0iG7AQfpAwGFh-sFL0&grant_type=authorization_code", function(err, response) {
    console.log('-------------------------------', err, response);
  });
});


app.listen(8080, function(err) {
  if (err)
    return console.log(err);
  console.log('running on localhost:8080');
});