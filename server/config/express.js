const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

const sessionOptions = {
  name: 'sessionId',
  secret: 'qwertyverysecure',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000
  },
};

module.exports = function (app, passport) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
  app.use(methodOverride());
  app.use(session(sessionOptions));
  app.use(passport.initialize());
  app.use(passport.session());
};
