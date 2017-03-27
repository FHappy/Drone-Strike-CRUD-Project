exports.index = function(req, res, next) {
  return res.render('index.hbs', {
    userFullName: req.user ? req.user.fullName : ''
  });
}
