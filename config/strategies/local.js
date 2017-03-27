var passport             = require('passport');
var LocalStrategy        = require('passport-local').Strategy;
var User                 = require('mongoose').model('User');

// basiclally taken verbatim from the github page for passport-local npm package
// with minor modifications
module.exports = function(passport) {
  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
    function(req, username, password, done) {
      User.findOne({username: username}, function(err, user) {
          if (err) {return done(err);}
          if (!user) {return done(null, false, req.flash('loginMessage', 'User not Found.'));}
          if (!user.authenticate(password)) {
            return done(null, false, req.flash('loginMessage', 'Wrong password.'));
          }

          return done(null, user);
        });
  }));

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    function(req, email, password, done) {
      User.findOne({email: email}, function(err, user) {
        if (err) {return done(err);}
        if (user) {
          return done(null, false, req.flash('signupMessage',
                                             'This email is already taken.'));
        } else {
          User.findOne({username: req.body.username}, function(err, user) {
            if (err) {return done(err);}
            if (user) {
              return done(null, false, req.flash('signupMessage',
                                                 'This username is already taken.'));
            } else {
            // neither username nor email is already taken
            var newUser = new User(req.body);
            newUser.save(function(err) {
              if (err) {throw err;}
              return done(null, newUser);
            });
            }
          });
        }
      });
    }
  ));
};
