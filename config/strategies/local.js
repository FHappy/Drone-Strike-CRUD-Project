var passport             = require('passport');
var LocalStrategy        = require('passport-local').Strategy;
var User                 = require('mongoose').model('User');

// basiclally taken verbatim from the github page for passport-local npm package
// with minor modifications
module.exports = function(passport) {
  passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
    function(req, username, password, done) {
      User.findOne({username: username}, function(err, user) {

      // })
        // .exec(function(err, user) {
          if (err) {return done(err);}
          if (!user) {return done(null, false, {message: 'Incorrect password.'});}
          if (!user.authenticate(password)) {
            return done(null, false);
          }

          return done(null, user);
        });
  }));
};
