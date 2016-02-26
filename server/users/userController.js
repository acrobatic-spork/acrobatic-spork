var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var User = require('./user');

var redirectUri = 'https://login.uber.com/oauth/v2/authorize?response_type=code&client_id=x8ZBOGgvve2JHQgOFuR7ib2e2dt_A66m&scope=request&redirect_uri=http://localhost:3000/auth/uber'


Promise.promisifyAll(User);
var Controller = {};

// var Q = require('q');

// Promisify a few mongoose methods with the `q` promise library
// var findUser = Q.nbind(User.findOne, User);
// var User.createAsync = Q.nbind(User.create, User);

var sendUserInfo = function (user, req, res, next) {


  // GET USER INFO TO SEND
  //
  // var alteredUser = user prefs and uber staus
  //

  var token = jwt.encode(user, 'secret');
  res.json({
    token: token,
    user: user
  });
};

Controller.redirectToUber = function (req, res, next) {
  console.log('*************** connect to uber', req.query);
  req.session.user = req.query.username;
  res.redirect(redirectUri);
}

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
              sendUserInfo(foundUser, req, res, next);
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
        next(new Error('User already exists!'));
      } else {
          // make a new user if not one
        return User.createAsync({
          username: username,
          password: password
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
  console.log('-------------', req.query);
  User.findOneAsync({ username: req.query.username })
    .then(function (user) {
      console.log('userobject>>>>>>>',user);
      res.json(user);
    })
    .catch(function (err) {
      next(err);
    });
};

Controller.updatePrefs = function (req, res, next) {
  console.log('update prefs in userController params.username', req.params.username);
  console.log('update prefs in userController req.body', req.body);
  console.log('update prefs in userController req.query', req.query);

  var query = req.params.username;
  var prefsToUpdate = req.body;
  var options = { new: true };
  User.findOneAndUpdateAsync(query, prefsToUpdate, options)
    .then(function (updatedPrefs) {
      console.log('Prefences Updated: ', updatedPrefs);
      res.json(updatedPrefs);
    })
    .catch(function (err) {
      next(err);
    });
}

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
