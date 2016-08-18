const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  entry: [
    'webpack/hot/dev-server',                 // HMR (Hot Module Replacement). ブラウザ更新せずに変更が適用される設定
    'webpack/hot/only-dev-server',            // syntax error時リロードされるのを防ぐ
    path.join(__dirname, '/src/app/app.js'),  // エントリーポイント
  ],
  // サーバー設定オプション
  devServer: {
    contentBase : 'src/www',   // ドキュメントルート（Apacheでいう/var/www/html）的な。
    devtool     : 'eval',
    hot         : true,
    inline      : true,
    port        : 3000,
    host        : 'localhost', // localhost以外からアクセスする必要がある場合は'0.0.0.0'
  },
  devtool: 'eval',
  output: {
    path: buildPath,    // buildディレクトリに出力する
    filename: 'app.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // HMR
    new webpack.NoErrorsPlugin(),             // エラー時に警告は出すが、コンパイルは止めない
    new TransferWebpackPlugin([               // wwwにあるファイルをビルドディレクトリに含める
      {from: 'www'},
    ], path.resolve(__dirname, 'src')),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,                          // jsファイルをコンパイル
        loaders: ['react-hot', 'babel-loader'], // react-hotはHMR. babel-loaderはjsxとes6(es7)
        exclude: [nodeModulesPath],             // node_modules以下のファイルはコンパイル対象から外す
      },
    ],
  },
};

module.exports = config;
