var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'public', 'components', 'App.js');

var config = {
  entry: mainPath,
  output: {
    path: buildPath,
    fiename: 'bundle.js',
    // everything related to webpack goes through
    // localhost.../build, makes proxying easier
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /\/js$/,
        loader: 'babel',
        exclude: [nodeModulesPath]
      }
    ]
  }
};

module.exports = config;