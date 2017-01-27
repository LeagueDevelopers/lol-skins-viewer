/**
 * Build config for electron 'Main Process' file
 */

import webpack from 'webpack';
import validate from 'webpack-validator';
import merge from 'webpack-merge';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import baseConfig from './webpack.config.base';

export default validate(merge(baseConfig, {
  devtool: 'inline-source-map',

  entry: ['babel-polyfill', './app/index.main'],

  // 'main.js' in root
  output: {
    path: __dirname,
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    filename: './app/dist/main.js'
  },

  resolve: {
    extensions: ['.main.js']
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new CopyWebpackPlugin([{
      from: 'app/app.html',
      to: 'app/dist/app.html'
    }])
  ],

  /**
   * Set target to Electron specific node.js env.
   * https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
   */
  target: 'electron-main',

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false
  },
}));
