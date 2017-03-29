var users = require('../../app/controllers/users.controller.js');
var passport = require('passport');
// var passport = require('../../config/passport.js');
var seeds = require('../../config/seeds.js');

module.exports = function(app) {
  app.route('/users')
     .post(users.create);

  app.route('/signup')
     .get(users.getSignup)
     .post(users.postSignup);

  app.route('/users/login')
     .get(users.getLogin)
     .post(users.postLogin);

  app.route('/users/logout')
     .get(users.getLogout);

  app.route('/users/:userId')
     .get(users.getUserPage)
     .put(users.update)
     .delete(users.delete);

  app.route('/seeds')
     .get(seeds);

  app.route('/users/:userId/strikes/:strikeNumber/addStrike')
     .post(users.addStrike);


  // middleware is executed before any other middleware that uses this parameter
  // defines the req.user object
  app.param('userId', users.userById);
};
