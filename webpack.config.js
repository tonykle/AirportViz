'use strict';

var WebpackNotifierPlugin = require('webpack-notifier');
var path = require('path');

module.exports = {
  devtool: 'eval',
  context: __dirname,
  entry: [('./client/js/main.js')],
  output: {
    path: './build',
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
    includePaths: ['./node_modules']
  },
  resolve: {
    extensions: ['', '.js', '.sass', '.css'],
    alias: {
      js: './client/js',
      sass: './client/sass'
    }
  },
  plugins: [
    new WebpackNotifierPlugin({ title: 'webpack',
                                alwaysNotify: true })
  ]
};
