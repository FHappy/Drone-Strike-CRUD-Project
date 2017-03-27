var passport             = require('passport');
var LocalStrategy        = require('passport-local').Strategy;
var User                 = require('mongoose').model('User');

// basiclally taken verbatim from the github page for passport-local npm package
// with minor modifications
module.exports = function() {
  passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({username: username})
      .exec(function(err, user) {
        if (err) {return done(err);}
        if (!user) {return done(null, false, {message: 'Incorrect password.'});}
        if (!user.authenticate(password)) {
          return done(null, false);
        }

        return done(null, user);
      });
  }));
};
