var passport             = require('passport');
var mongoose             = require('mongoose');

module.exports = function() {
  var User = mongoose.model('User');

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id)
      .exec(function(err, user) {
        done(err, user);
      });
  });

  //server loads passport config file which then loads strategies file
  require('./strategies/local.js');

};
