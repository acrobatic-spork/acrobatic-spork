var path = require( 'path');
var express = require( 'express');
var webpack = require( 'webpack');
var webpackMiddleware = require( 'webpack-dev-middleware');
var webpackHotMiddleware = require( 'webpack-hot-middleware');
var config = require( '../webpack.config.js');
var mongoose = require( 'mongoose');
var bodyParser = require( 'body-parser');
var User = require( './users/user' );
var passport = require ('passport');
var uberStrategy = require ('passport-uber');
var request = require ('request');


var userController = require ('./users/userController');
var uberController = require ('./uber/uberController')(userController);

var isDeveloping = process.env.NODE_ENV !== 'production';
console.log('isDeveloping: ' + isDeveloping);
// isDeveloping = false;
var port = process.env.PORT || 8080;
//var port = 80;
var app = express();


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 

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
  app.get(function response(req, res, next) {
    if (req.accepts('html')) {
      res.write(middleware.fileSystem.readFileSync(path.join(distDir, '/index.html')));
      res.end();
    } else {
      next();
    }
  });
} else {
  console.log('using static middleware ' + distDir);
  app.use(express.static(distDir, {
    extensions: ['html', 'htm'],
    fallthrough: true
  }));
  app.use(function (req, res, next) {
    if (req.accepts('html') && req.method === 'GET') {
      console.log("in fallback. req is " + JSON.stringify(req.accepts('html')));
      res.sendFile(path.join(distDir, '/index.html'));
    } else {
      next();
    } 
  });
}

var router = require ('./routes.js');
router(app, express);
// app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));

mongoose.connect('mongodb://localhost/spork');
User.seed();


app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
