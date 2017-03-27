var users = require('../../app/controllers/users.server.controller.js');
var passport = require('passport');
// var passport = require('../../config/passport.js');

module.exports = function(app) {
  app.route('/users')
     .post(users.create);

  app.route('/signup')
     .get(users.getSignup)
     .post(users.postSignup);

  app.route('/users/login')
     .get(users.getLogin)
     .post(users.postLogin);

  app.route('/users/:userId')
     .get(users.read)
     .put(users.update)
     .delete(users.delete);

  // middleware is executed before any other middleware that uses this parameter
  // defines the req.user object
  app.param('userId', users.userById);
};
