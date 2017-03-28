var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

var StrikeSchema = new Schema({
  number: Number,
  country: String,
  date: Date,
  narrative: String,
  town: String,
  location: String,
  deaths: Array,
  deaths_min: Array,
  deaths_max: Array,
  civilians: Array,
  injuries: Array,
  children: Array,
  tweet_id: String,
  bureau_id: String,
  bij_summary_short: String,
  bij_link: String,
  target: String,
  lat: String,
  lon: String,
  articles: Array,
  names: Array
});

StrikeSchema.set('toJSON', {getters: true, virtuals: true});

mongoose.model('Strike', StrikeSchema);
