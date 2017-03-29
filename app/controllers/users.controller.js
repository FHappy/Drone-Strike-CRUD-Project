
var User                  = require('mongoose').model('User');
var List                  = require('mongoose').model('List');
var passport              = require('passport');

exports.create = function(req, res, next) {
  var user = new User(req.body);

  user.save(function(err) {
    if (err) {return next(err);}
    res.json(user);
  });
};

exports.getUserPage = function(req, res, next) {
  res.render('users/show.hbs', {
    user: req.user,
    comments: req.user.list.comments
  });
};

exports.userById = function(req, res, next, id) {
  User.findById(id)
    .exec(function(err, user) {
      if (err) {return next(err);}
      req.user = user;
      next();
    });
};

exports.getUserEdit = function(req, res, next) {
  res.render('users/edit.hbs', {
    user: req.user
  });
}

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
  res.render('users/login.hbs', {
    message: req.flash('loginMessage')
  });
};

exports.postLogin = function(req, res, next) {
  var loginStrategy = passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  });
  return loginStrategy(req, res, next);
};

exports.getSignup = function(req, res, next) {
  console.log(req.user);
  res.render('users/signup.hbs', {
    message: req.flash('signupMessage')
  });
};

exports.postSignup = function(req, res, next) {
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  });
  return signupStrategy(req, res, next);
};

exports.getLogout = function(req, res, next) {
  req.logout();
  res.redirect('/');
};

exports.addStrike = function(req, res, next) {
  // var user = req.user;
  console.log(user);
  console.log(req.strike);
  console.log(user.list.strikes);
  User.findById(req.user.id)
    .exec(function(err, user) {
      user.list.strikes.push(req.strike);
      user.save(function(err) {
        if (err) {console.log(err);}
        console.log('new user details');
        console.log(user);
        res.redirect('/users/' + user.id);
    });

  });
};

exports.addComment = function(req, res, next) {
  var user = req.user;
  var index = req.params.listIndex;
  console.log(user);
  console.log(req.strike);
  console.log(user.list.strikes);
  user.list.comments[index].push(req.body.comment);
  user.save(function(err) {
    if (err) {console.log(err);}
    console.log('user saved');
    res.redirect('/users/' + user.id);
  });
}
