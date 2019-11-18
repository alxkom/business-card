var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// Options passed to node-sass
const sassIncludePaths = [
  path.resolve(__dirname, 'styles'),
];


// These files will be imported in every sass file
const sassResourcesPaths = [
  path.resolve(__dirname, 'styles/abstracts/_variables.scss'),
  path.resolve(__dirname, 'styles/abstracts/_mixins.scss')
];

loaders.push({
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
          camelCase: "dashes",
          importLoaders: 1
        }
      },
      {
        loader: "sass-loader",
        options: {
          data: '@import "./styles/abstracts/_variables";',
          sourceMap: true,
          outputStyle: "expanded",
          indentedSyntax: false,
          includePaths: sassIncludePaths
        }
      },
      {
        loader: "sass-resources-loader",
        options: {
          sourceMap: true,
          resources: sassResourcesPaths
        },
      }
    ]
  }),
  exclude: ['node_modules']
});

module.exports = {
  entry: [
    './src/index.jsx'
  ],
  output: {
    publicPath: '',
    path: path.join(__dirname, 'build'),
    filename: '[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      "styles": path.resolve(__dirname, 'styles/'),
    }
  },
  module: {
    loaders
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        REACT_APP_ENV: JSON.stringify(process.env.REACT_APP_ENV),
        REACT_APP_CLIENT_ID: JSON.stringify(process.env.REACT_APP_CLIENT_ID),
        REACT_APP_URL: JSON.stringify(process.env.REACT_APP_URL),
        REACT_APP_OAUTH_REDIRECT_URL: JSON.stringify(process.env.REACT_APP_OAUTH_REDIRECT_URL),
        REACT_APP_API_DOMAIN: JSON.stringify(process.env.REACT_APP_API_DOMAIN),
        REACT_APP_FS: JSON.stringify(process.env.REACT_APP_FS),
        REACT_APP_FS_CRED: JSON.stringify(process.env.REACT_APP_FS_CRED),
        REACT_APP_PROXY: JSON.stringify(process.env.REACT_APP_PROXY)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      files: {
        css: ['style.css'],
        js: ['bundle.js'],
      }
    })
  ]
};
