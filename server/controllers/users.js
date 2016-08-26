var passport = require('passport');

exports.postLogin = function(req, res, next) {
  // Do username and password validation for the server
  passport.authenticate('local', function(err, user, info) {
    if(err) return next(err);
    // Passport exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session
    req.login(user, function(err) {
      if(err) return next(err);
      res.status(200).send(user);
    });
  })(req, res, next);
};

exports.postLogout = function(req, res) {
  req.logout();
  res.sendStatus(200);
};
