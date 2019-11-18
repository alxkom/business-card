"use strict";
const webpack = require('webpack');
const path = require('path');
const loadersConf = require('./webpack.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "3000";


module.exports = {
  entry: [
    // POLYFILL: Set up an ES6-ish environment
    // 'babel-polyfill',  // The entire babel-polyfill
    // Or pick es6 features needed (included into babel-polyfill)
    'core-js/fn/promise',
    'core-js/es6/object',
    'core-js/es6/array',

    './src/index.jsx', // your app's entry point
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: loadersConf
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(__dirname, "src"),
      path.join(__dirname, "node_modules"), // the old 'fallback' option (needed for npm link-ed packages)
    ],
    alias: {
      "styles": path.resolve(__dirname, 'styles/'),
    }
  },
  devServer: {
    contentBase: "./build",
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: PORT,
    host: HOST
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('staging'),
        REACT_APP_ENV: JSON.stringify('stage'),
        REACT_APP_CLIENT_ID: JSON.stringify('5afa0171cee6867e3f759fbd211191e8d6484ee982161da827772cd0dd831571'),
        REACT_APP_URL: JSON.stringify('vitrina.cobrain.io'),
        REACT_APP_OAUTH_REDIRECT_URL: JSON.stringify('staging.cobrain.io'),
        REACT_APP_API_DOMAIN: JSON.stringify('https://api.batton.cobrain.io'),
        REACT_APP_FS: JSON.stringify('https://batton.cobrain.io'),
        REACT_APP_FS_CRED: JSON.stringify('username: a.gropyanov@skoltech.ru, password: f;KAF^<3'),
        REACT_APP_PROXY: JSON.stringify('')
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      files: {
        css: ['style.css'],
        js: [ "bundle.js"],
      }
    }),
  ]
};
