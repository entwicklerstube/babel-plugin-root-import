var webpack = require("webpack");

module.exports = {
  entry: './plugin',
  output: {
    library: 'babel-root-import',
    libraryTarget: 'commonjs2',
    path: process.cwd() + '/lib',
    filename: 'babel-root-import.js',
    pathinfo: false
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
