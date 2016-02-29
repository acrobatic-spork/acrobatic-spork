var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var User = require('./user');

// var redirectUri = 'https://login.uber.com/oauth/v2/authorize?response_type=code&client_id=x8ZBOGgvve2JHQgOFuR7ib2e2dt_A66m&scope=request&redirect_uri=http://localhost:3000/auth/uber'

Promise.promisifyAll(User);
var Controller = {};

var sendUserInfo = function (user, req, res, next) {



  var token = jwt.encode(user, 'blahblahblah');
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
        res.status(400).send('User does not exist!');
      } else {
        return user.comparePasswords(password)
          .then(function(foundUser) {
            if (foundUser) {
              sendUserInfo(user, req, res, next);
            } else {
              res.status(400).send('Password doesn\'t match');
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
  var prefsToUpdate = {preferences: req.body};
  var options = { new: true };
  User.findOneAndUpdateAsync(query, prefsToUpdate, options)
    .then(function (updatedPrefs) {
      console.log('Prefences Updated: ', updatedPrefs.preferences);
      res.json(updatedPrefs);
    })
    .catch(function (err) {
      next(err);
    });
};

Controller.checkAuth = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) {
    next(new Error('No token'));
  } else {
    var user = jwt.decode(token, 'blahblahblah');
    User.findOneAsync({ username: user.username })
      .then(function(foundUser) {
        if (foundUser) {
          res.json({
            username: foundUser.username,
            preferences: foundUser.preferences
          });
        } else {
          res.sendStatus(401);
        }
      })
      .catch(function(error) {
        next(error);
      });
  }
};


module.exports = Controller;
