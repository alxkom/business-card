const path = require('path');


// Options passed to node-sass
const sassIncludePaths = [
  path.resolve(__dirname, 'styles'),
];


// These files will be imported in every sass file
const sassResourcesPaths = [
  path.resolve(__dirname, 'styles/abstracts/_variables.scss'),
  path.resolve(__dirname, 'styles/abstracts/_mixins.scss')
];

// noinspection WebpackConfigHighlighting
module.exports = [
  // =========
  // = Babel =
  // =========
  // Load jsx extensions with babel so we can use
  // 'import' instead of 'require' and es6 syntax
  {
    test: /\.(js|jsx)$/,
    include: path.resolve(__dirname, 'src'),
    loader: "babel-loader",
    options: {
      // This is a feature of `babel-loader` for Webpack (not Babel itself).
      // It enables caching results in ./node_modules/.cache/babel-loader/
      // directory for faster rebuilds.
      cacheDirectory: true,
      plugins: ['react-hot-loader/babel'],
    }
  },
  // =========
  // = Fonts =
  // =========
  {
    test: /\.(woff|woff2|ttf|eot)$/,
    exclude: path.resolve(__dirname, "node_modules"),
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "application/octet-stream"
        }
      }
    ]
  },
  // ==========
  // = Images =
  // ==========
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    exclude: path.resolve(__dirname, "node_modules"),
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/svg+xml"
        }
      }
    ]
  },
  {
    test: /\.gif/,
    exclude: path.resolve(__dirname, "node_modules"),
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/gif"
        }
      }
    ]
  },
  {
    test: /\.(jpg|jpeg)/,
    exclude: path.resolve(__dirname, "node_modules"),
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/jpeg"
        }
      }
    ]
  },
  {
    test: /\.png/,
    exclude: path.resolve(__dirname, "node_modules"),
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/png",
          name: "[path][name].[ext]"
        }
      }
    ]
  },
  // ==========
  // = Styles =
  // ==========
  // Global CSS (from node_modules)
  // ==============================
  {
    test: /\.css/,
    include: path.resolve(__dirname, "node_modules"),
    use: [
      {
        loader: "style-loader"
      },
      {
        loader: 'css-loader'
      }
    ]
  },
  // Global SASS (from app)
  // ===============================
  // Do not modularize these imports
  // (leave them as global css styles)
  {
    test: /\.(sass|scss)$/,
    include: path.resolve(__dirname, 'styles/base'),
    use: [
      {
        loader: "style-loader",
      },
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
        }
      }
    ]
  },
  // Local SASS css-modules
  // ======================
  {
    test: /\.(sass|scss)$/,
    exclude: path.resolve(__dirname, 'styles/base'),
    use: [
      {
        loader: "style-loader",
      },
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
  }
];
