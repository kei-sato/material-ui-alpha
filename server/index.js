const express = require('express');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpack = require('webpack');
const path = require('path');
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

const indexHtml = `
<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Material-UI Example</title>
  <meta name="description" content="Google's material design UI components built with React.">

  <!-- Use minimum-scale=1 to enable GPU rasterization -->
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"
  >
  <style>
    html {
      font-family: 'Roboto', sans-serif;
    }

    body {
      font-size: 13px;
      line-height: 20px;
    }
  </style>
</head>

<body>
  <div id="app"></div>

  <!-- This script adds the Roboto font to our project. For more detail go to this site:  http://www.google.com/fonts#UsePlace:use/Collection:Roboto:400,300,500 -->
  <script>
    var WebFontConfig = {
      google: { families: [ 'Roboto:400,300,500:latin' ] }
    };
    (function() {
      var wf = document.createElement('script');
      wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
      wf.type = 'text/javascript';
      wf.async = 'true';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(wf, s);
    })();
  </script>
  <script src="app.js"></script>
</body>

</html>
`;

app.get('*', function (req, res) {
  res.send(indexHtml);
});

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
