const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  // エントリーポイント
  entry: [path.join(__dirname, '/src/app/app.js')],

  // 出力ファイル
  output: {
    path    : path.resolve(__dirname, 'build'),
    filename: 'app.js',
  },

  module: {
    // コンパイル設定
    loaders: [
      {
        test   : /\.js$/,           // jsファイルをコンパイル
        loaders: ['babel-loader'],  // babel-loderはjsxとes6(es7)のコンパイラ
        exclude: /node_modules/,    // node_modules以下のファイルはコンパイル対象から外す
      },
    ],
  },

  // サーバーの設定
  devServer: {
    contentBase: 'src/www',
    port       : 3000,
  },

  // コンパイル以外の処理
  plugins: [
    // src/wwwにあるファイルをビルドディレクトリに含める
    new TransferWebpackPlugin([
      {from: 'www'},
    ], path.resolve(__dirname, 'src')),
  ],
};

module.exports = config;
