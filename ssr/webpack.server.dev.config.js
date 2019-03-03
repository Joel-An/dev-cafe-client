/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  target: 'node',
  entry: [
      '@babel/polyfill', 
      './ssr/server/server.js',
  ],
  output: {
    path: path.resolve(__dirname,'build'),
    filename: 'server.dev.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
               {
                  targets: { node: 'current' },
               },
              ],
              ['@babel/react']
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'ignore-loader',
      },
      {
        test: /\.scss$/,
        loader: 'ignore-loader',
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
  externals: [webpackNodeExternals({
    whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
  })],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
};
