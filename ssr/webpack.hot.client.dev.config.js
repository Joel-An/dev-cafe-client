/* eslint-disable */
const path = require('path');

const CLIENT_CONFIG = require('../webpack.client.dev.config');

const webpackServeUrl = 'http://localhost:3002';

module.exports = {
  ...CLIENT_CONFIG,
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'app.dev.js',
    publicPath: `${webpackServeUrl}/dist/`,
  },
}
