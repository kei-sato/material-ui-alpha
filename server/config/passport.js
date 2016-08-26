const LocalStrategy = require('passport-local').Strategy;
const db = require('../db');

module.exports = function(passport) {
  passport.use(new LocalStrategy(function(username, password, done) {
    db.users.findByUsername(username, function(err, user) {
      if (err) return done(err);
      if (!user) return done(new Error('user not found for username: ' + username));
      if (user.password !== password) return done(new Error('wrong password'));
      return done(null, user);
    });
  }));

  passport.serializeUser(function(user, callback) {
    if (!user) return callback(new Error('user is empty'));
    callback(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
    db.users.findById(id, function (err, user) {
      if (err) return callback(err);
      callback(null, user);
    });
  });
};
