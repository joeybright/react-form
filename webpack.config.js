
var webpack = require('webpack')
    extractTextPlugin = require('extract-text-webpack-plugin')

// webpack.config.js
module.exports = {
  entry: './entry.jsx',

  output: {
    filename: 'bundle.js',
    path: './',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      // { test: /\.css$/, loader: 'css-loader' },
      // Finds .sass files and loads them
      { test: /\.scss$/, loader: extractTextPlugin.extract('css!sass'), exclude: /node_modules/},
      // Finds .jsx files and loads them using the jsx loader
      { test: /\.jsx$/, loader: 'jsx-loader' },
      // Finds JSON files and loads them
      { test: /\.json$/, loader: "json-loader"}
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new extractTextPlugin('style.css', {
            allChunks: true
        })
  ]

}
