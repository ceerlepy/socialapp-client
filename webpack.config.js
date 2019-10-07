const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              // THIS will resolve relative URLs to reference from the PUBLIC/ directory
              root: resolve(__dirname, 'public')
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        // Now we apply rule for images
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: [
          // Using file-loader for these files
          'file-loader?name=[name].[ext]'
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      entryPoint: './public/index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      chunkFilename: './App.css',
      entryPoint: './App.css',
      inject: true
    })
  ]
};
