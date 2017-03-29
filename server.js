process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var mongoose          = require('./config/mongoose.js');
var express           = require('./config/express.js');
var passport          = require('./config/passport.js');
var db                = mongoose();
var app               = express();
var passport          = passport();

var port = process.env.PORT || 4000;

app.listen(port, function() {
  console.log('server slinging hot data on port ' + port);
});

module.exports = app;
