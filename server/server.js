var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./users/user');
var passport = require('passport');
var uberStrategy = require('passport-uber');
var request = require('request');
var session = require('express-session');
var userController = require('./users/userController');
var uberController = require('./uber/uberController')(userController);

// for ssl server
var fs = require('fs');
var https = require('https');
// var privateKey  = fs.readFileSync('sslcerts/acrobaticspork.key', 'utf8');
// var certificate = fs.readFileSync('sslcerts/acrobaticspork.crt', 'utf8');
// var credentials = {key: privateKey, cert: certificate};

var isDeveloping = process.env.NODE_ENV !== 'production';
console.log('isDeveloping: ' + isDeveloping);
// isDeveloping = false;

// Digital Ocean does not seem to have a default process.env.PORT, so it is always undefined so the followoing can choose prod or dev
var port = isDeveloping ? 3000 : 8080;
var app = express();


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'shhh, it\'s a secret',
  resave: false,
  saveUninitialized: true
}));

var allowCrossDomain = function(req, res, next) {
  // if ('OPTIONS' === req.method) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // res.send(200);
  // } else {
  next();
  // }
};

app.use(allowCrossDomain);


var distDir = path.resolve(__dirname, '../dist');
console.log('distdir: ', distDir);

if (isDeveloping) {
  var compiler = webpack(config);
  var middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
}


var router = require('./routes.js');
router(app, express);


app.use(express.static(distDir, {
  extensions: ['html', 'htm', 'css', 'js'],
  fallthrough: true
}));

app.use(function(req, res, next) {
  if (req.accepts('html') && req.method === 'GET') {
    console.log("in fallback. req is " + JSON.stringify(req.accepts('html')));
    res.sendFile(path.join(distDir, '/index.html'));
  } else {
    next();
  }
});


// app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));

mongoose.connect('mongodb://localhost/spork');

if (isDeveloping) {
  User.seed(); // THIS ERASES USER DB! DON'T DO IT IN PRODUCTION!!!
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

// start https server

// var httpsServer = https.createServer(credentials, app);
// httpsServer.listen(443);
