'use strict';

var WebpackNotifierPlugin = require('webpack-notifier');
var path = require('path');

module.exports = {
  devtool: 'eval',
  context: __dirname,
  entry: [path.resolve(__dirname, 'client', 'js', 'main.js')],
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  module: {
    preloaders: [

    ],
    loaders: [{
      test: /\.js$/,
      loaders: ['babel?presets[]=react,presets[]=es2015'],
      exclude: path.join(__dirname, 'node_modules')
    },
    {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }]
  },
  sassLoader: {
    includePaths: path.join(__dirname, 'node_modules')
  },
  resolve: {
    extensions: ['', '.js', '.sass', '.css'],
    alias: {
      js: path.resolve(__dirname, 'client', 'js'),
      sass: path.resolve(__dirname, 'client', 'sass')
    }
  },
  plugins: [
    new WebpackNotifierPlugin({ title: 'webpack',
                                alwaysNotify: true })
  ]
};
