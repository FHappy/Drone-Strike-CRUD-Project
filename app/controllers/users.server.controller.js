var User                  = require('mongoose').model('User');
var passport              = require('passport');

exports.create = function(req, res, next) {
  var user = new User(req.body);

  user.save(function(err) {
    if (err) {return next(err);}
    res.json(user);
  });
};

exports.read = function(req, res, next) {
  res.json(req.user);
}

exports.userById = function(req, res, next, id) {
  User.findById(id)
    .exec(function(err, user) {
      if (err) {return next(err);}
      req.user = user;
      next();
    });
};

exports.update = function(req, res, next) {
  User.findByIdAndUpdate(req.user.id, req.body)
    .exec(function(err, user) {
      if (err) {return next(err);}
      res.json(user);
    });
};

exports.delete = function(req, res, next) {
  req.user.remove(function(err) {
    if (err) {return next(err);}
    res.json(req.user);
  })
};

exports.getLogin = function(req, res, next) {
  res.render('login.hbs');
};

exports.postLogin = function(req, res, next) {
  var loginStrategy = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  });
  return loginStrategy(req, res, next);
};

exports.getSignup = function(req, res, next) {
  res.render('signup.hbs', {
    message: req.flash('signupMessage')
  });
};

exports.postSignup = function(req, res, next) {
  console.log(req.user);
  if (!req.user) {
    var user = new User(req.body);
    user.provider = 'local';
    user.save(function(err) {
      if (err) {return res.redirect('/register');}
      req.login(user, function(err) {
        if (err) {return next(err);}
        return res.redirect('/');
      });
    });
  } else {
    return res.redirect('/');
  }
  // var signupStrategy = passport.authenticate('local-signup', {
  //   successRedirect: '/',
  //   failureRedirect: '/signup',
  //   failureFlash: true
  // });
  // return signupStrategy(req, res, next);
  next();
}
