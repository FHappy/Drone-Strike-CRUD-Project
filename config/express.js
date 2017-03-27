var config               = require('./config.js');
var express              = require('express');
var logger               = require('morgan');
var compress             = require('compression');
var bodyParser           = require('body-parser');
var methodOverride       = require('method-override');
var session              = require('express-session');
var passport             = require('passport');
var flash                = require('connect-flash');


module.exports = function() {
  var app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({
    extended: true
   }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
  });
  app.set('views', './app/views');
  app.set("view engine", "hbs");

  require('../app/routes/index.server.routes.js')(app);
  require('../app/routes/users.server.routes.js')(app);

  app.use(express.static('./public'));

  return app;
};
