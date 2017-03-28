var config            = require('./config.js');
var mongoose          = require('mongoose');

module.exports = function() {
  mongoose.Promise  = global.Promise;
  mongoose.connect(config.db);
  var db = mongoose.connection;

  require('../app/models/strike.model.js');
  // require('../app/models/list.model.js');
  require('../app/models/user.model.js');

  db.on('error', function(err) {
    console.log(err);
  });

  db.once('open', function() {
    console.log('database is connected, lol');
  });

  return db;
}
