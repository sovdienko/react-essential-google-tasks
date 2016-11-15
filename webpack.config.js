const webpack     = require('webpack');
const path        = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: `${__dirname}/public/build/`,
    publicPath: 'build/',
    filename: 'bundle.js'
  },
  resolve: {
    root:               path.join(__dirname, 'src'),
    modulesDirectories: [ 'node_modules' ],
    extensions:         ['', '.js', '.jsx']
  },
  eslint: { configFile: '.eslintrc' },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'react-hot!babel', exclude: [/node_modules/, /public/] },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader', exclude: [/node_modules/, /public/] },
      { test: /\.less$/, loader: 'style-loader!css-loader!postcss-loader!less-loader',  exclude: [/node_modules/, /public/] },
      { test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
      { test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
      { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
      { test: /\.svg/, loader: 'url-loader?limit=26000&mimetype=image/svg+xml' },
      { test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1' },
      { test: /\.jsx$/, loader: 'react-hot!babel!eslint-loader', exclude: [/node_modules/, /public/] },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  }
};
