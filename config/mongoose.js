var config            = require('./config.js');
var mongoose          = require('mongoose');

module.exports = function() {
  mongoose.connect(config.db);
  var db = mongoose.connection;

  require('../app/models/user.server.model.js');
  require('../app/models/strike.server.model.js');
  
  db.on('error', function(err) {
    console.log(err);
  });

  db.once('open', function() {
    console.log('database is connected, lol');
  });

  return db;
}
