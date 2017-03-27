var users = require('../../app/controllers/users.server.controller.js');
var passport = require('passport');
// var passport = require('../../config/passport.js');

module.exports = function(app) {
  app.route('/users')
     .post(users.create);

  app.route('/register')
     .get(users.renderRegister)
     .post(users.register);

  app.route('/users/login')
     .get(users.renderLogin)
     .post(passport.authenticate('local', { successRedirect: '/',
                                            failureRedirect: '/users/login'
                                          }
     ));

  app.route('/users/:userId')
     .get(users.read)
     .put(users.update)
     .delete(users.delete);

  // middleware is executed before any other middleware that uses this parameter
  // defines the req.user object
  app.param('userId', users.userById);
};
