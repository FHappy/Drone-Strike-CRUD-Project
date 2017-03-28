var mongoose            = require('mongoose');
var Schema              = mongoose.Schema;
var StrikeSchema        = require('mongoose').model('Strike');

var ListSchema = new Schema({
  name: String,
  strikes: Array,
  comments: Array
});


mongoose.model('List', ListSchema);
