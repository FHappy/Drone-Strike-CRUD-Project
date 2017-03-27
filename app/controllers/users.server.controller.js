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

exports.renderLogin = function(req, res, next) {
  if (!req.user) {
    res.send('login page');
  } else {
    return res.redirect('/');
  }
};

exports.renderRegister = function(req, res, next) {
  if (!req.user) {
    res.send('register page');
  }
  return res.redirect('/');
};

exports.register = function(req, res, next) {
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
  next();
}
