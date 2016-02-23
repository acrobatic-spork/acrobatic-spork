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
var yelp = require ('./yelp/yelpController')(uberController);

var isDeveloping = process.env.NODE_ENV !== 'production';
// var port = isDeveloping ? 3000 : process.env.PORT;
var port = 8080;
var app = express();




// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 


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
  app.get('/', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('/', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

var router = require ('./routes.js');
router(app, express);

mongoose.connect('mongodb://localhost/spork');
User.seed();


app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
