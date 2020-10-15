/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

let config = {
  entry: path.resolve(__dirname, 'src', 'index'),
  plugins: [
    new CleanWebpackPlugin({
      verbose: false,
      cleanStaleWebpackAssets: false,
    }),
    new HtmlWebpackPlugin({
      title: 'mantium',
      filename: path.resolve(__dirname, 'dist', 'index.html'),
      favicon: path.resolve(__dirname, 'static', 'favicon.ico'),
      template: path.resolve(__dirname, 'template.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'static', 'healthcheck.html'),
          to: 'static/',
        },
        {
          from: path.resolve(__dirname, 'static', 'global.css'),
          to: 'static/',
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './**/*.{ts,tsx,js,jsx}',
      },
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/[name].[hash].js',
    sourceMapFilename: 'static/[name].[hash].js.map',
    publicPath: '/',
  },
  optimization: {
    minimize: true,
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all',
    },
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true,
    port: 8080,
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'source-map-loader',
      },
    ],
  },
};

if (process.env.NODE_ENV === 'production') {
  config.devtool = 'source-map';
} else if (process.env.NODE_ENV === 'clean') {
  config.devtool = 'none';
  config.optimization.minimize = false;
  config.optimization.runtimeChunk = true;
}

module.exports = config;
