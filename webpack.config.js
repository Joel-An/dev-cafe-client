const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 4000;

module.exports = {
  mode: 'development',
  entry: {
    app: ['@babel/polyfill', './src/index.jsx'],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { node: 'current' },
                modules: 'false',
              },
            ],
            '@babel/preset-react',
          ],
        },
        exclude: ['/node_modules', '/config'],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          name: '[hash].[ext]',
          limit: 10000,
        },
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
    }),
    new ExtractTextPlugin({
      filename: 'app.css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {},
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: 'localhost',
    port,
    historyApiFallback: true,
    open: true,
    hot: true,
    proxy: { '/api': 'http://localhost:3000' },
    disableHostCheck: true,
  },
};
