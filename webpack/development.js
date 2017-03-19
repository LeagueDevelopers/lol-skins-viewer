/* eslint-disable max-len */
/**
 * Build config for development process that uses Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */

import webpack from 'webpack';
import validate from 'webpack-validator';
import merge from 'webpack-merge';
import formatter from 'eslint-formatter-pretty';
import baseConfig from './base';

const port = process.env.PORT || 3000;

export default validate(merge(baseConfig, {
  debug: true,

  devtool: 'inline-source-map',

  entry: [
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
    'babel-polyfill',
    './app/index.renderer'
  ],

  output: {
    publicPath: `http://localhost:${port}/dist/renderer/`
  },

  resolve: {
    extensions: ['.renderer.js']
  },

  module: {
    // preLoaders: [
    //   {
    //     test: /\.js$/,
    //     loader: 'eslint-loader',
    //     exclude: /node_modules/
    //   }
    // ],
    loaders: [
      {
        test: /\.global\.css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap'
        ]
      },

      {
        test: /\.global\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap',
          'sass-loader'
        ]
      },

      {
        test: /^((?!\.global).)*\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        ]
      },

      {
        test: /^((?!\.global).)*\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass-loader'
        ]
      },

      { test: /\.otf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=application/font-otf' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=image/svg+xml' },
      { test: /\.png$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: 'file-loader' },
      { test: /\.webm/, loader: 'file-loader' },
      { test: /\.ogg/, loader: 'file-loader' }
    ]
  },

  eslint: {
    formatter
  },

  plugins: [
    // https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
    new webpack.HotModuleReplacementPlugin(),

    // “If you are using the CLI, the webpack process will not exit with an error code by enabling this plugin.”
    // https://github.com/webpack/docs/wiki/list-of-plugins#noerrorsplugin
    new webpack.NoErrorsPlugin(),

    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],

  // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  target: 'electron-renderer'
}));
