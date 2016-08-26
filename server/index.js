const express = require('express');
const passport = require('passport');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpack = require('webpack');
const path = require('path');
const indexHtml = require('./indexHtml');
const app = express();

if (process.env.NODE_ENV === 'development') {
  const webpackConfig = require('../webpack-development.config.js');
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'app.js',
    stats: {
      colors: true,
    },
    historyApiFallback: true,
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));

  app.use(express.static(path.join(__dirname, '..', 'src/www')));
} else {
  app.use(express.static(path.join(__dirname, '..', 'build')));
}

require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/routes')(app);

app.get('*', function (req, res) {
  const user = req.user || {};
  const isAuthenticated = req.isAuthenticated();
  res.send(indexHtml({ user: Object.assign({}, user, { isAuthenticated }) }));
});

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
