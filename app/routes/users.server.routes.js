var users = require('../../app/controllers/users.server.controller.js');
var passport = require('passport');

module.exports = function(app) {
  app.route('/users')
     .post(users.create);

  app.route('/users/login')
     .get(function(req, res, next) {res.send('success')})
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
