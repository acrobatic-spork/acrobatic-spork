var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var User = require('./user');

var redirectUri = 'https://login.uber.com/oauth/v2/authorize?response_type=code&client_id=x8ZBOGgvve2JHQgOFuR7ib2e2dt_A66m&scope=request&redirect_uri=http://localhost:3000/auth/uber'

Promise.promisifyAll(User);
var Controller = {};

var sendUserInfo = function (user, req, res, next) {



  var token = jwt.encode(user, 'secret');
  res.json({
    token: token,
    user: user
  });
};



Controller.signin = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOneAsync({ username: username })
    .then(function(user) {
      if (!user) {
        next(new Error('User does not exist'));
      } else {
        return user.comparePasswords(password)
          .then(function(foundUser) {
            if (foundUser) {
              sendUserInfo(user, req, res, next);
            } else {
              return next(new Error('No user'));
            }
          });
      }
    })
    .catch(function(error) {
      next(error);
    });
};

Controller.signup = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  console.log('--------------------------req.body: '+ JSON.stringify(req.body));


  // check to see if user already exists
  User.findOneAsync({ username: username })
    .then(function(user) {
      if (user) {
        res.status(400).send('User already exists!');
      } else {
          // make a new user if not one
        return User.createAsync({
          username: username,
          password: password,
          uberToken: ''
        });
      }
    })
    .then(function(user) {
      sendUserInfo(user, req, res, next);
    })
    .catch(function(error) {
      next(error);
    });
};

Controller.getUsername = function(username, req, res, next) {
  User.findOneAsync({ username: username })
    .then(function(user) {
      if (user) {
        return user.username;
      } else {
        return null;
      }
    })
    .then(function(user) {
      res.json(user);
    })
    .catch(function(error) {
      next(error);
    });
};

Controller.getUser = function (req, res, next) {
  User.findOneAsync({ username: req.query.username })
    .then(function (user) {
      res.json(user);
    })
    .catch(function (err) {
      next(err);
    });
};

Controller.updateUberToken = function(username, token, cb) {
  User.findOneAndUpdate({username: username}, {uberToken: token}, {new: true}, function (err, user) {
    cb(err, user);
  });
};

Controller.updatePrefs = function (req, res, next) {
  var query = { username: req.query.username };
  console.log("About to update prefs. The request body is: ", req.body);
  var prefsToUpdate = {preferences: req.body};
  console.log("And the prefs to update: ", prefsToUpdate);
  var options = { new: true };
  User.findOneAndUpdateAsync(query, prefsToUpdate, options)
    .then(function (updatedPrefs) {
      console.log('Prefences Updated: ', updatedPrefs);
      res.json(updatedPrefs);
    })
    .catch(function (err) {
      next(err);
    });
};

Controller.checkAuth = function(req, res, next) {
  // checking to see if the user is authenticated
  // grab the token in the header is any
  // then decode the token, which we end up being the user object
  // check to see if that user exists in the database
  var token = req.headers['x-access-token'];
  if (!token) {
    next(new Error('No token'));
  } else {
    var user = jwt.decode(token, 'secret');
    User.findOneAsync({ username: user.username })
      .then(function(foundUser) {
        if (foundUser) {
          res.send(200);
        } else {
          res.send(401);
        }
      })
      .catch(function(error) {
        next(error);
      });
  }
};


module.exports = Controller;
