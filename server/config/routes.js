var users = require('../controllers/users');

module.exports = function (app) {
  app.post('/user/login', users.postLogin);
  app.post('/user/logout', users.postLogout);
};
