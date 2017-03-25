process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express.js');
var app = express();


app.listen(4000, function() {
  console.log('listening on port 4000');
});

module.exports = app;
