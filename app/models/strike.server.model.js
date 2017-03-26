var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

var StrikeSchema = new Schema({
  number: Number,
  country: String,
  date: Date,
  narrative: String,
  town: String,
  location: String,
  deaths: String,
  deaths_min: String,
  deaths_max: String,
  civilians: String,
  injuries: String,
  children: String,
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

StrikeSchema.pre('save', function(next) {



  next();
})

StrikeSchema.set('toJSON', {getters: true, virtuals: true});

mongoose.model('Strike', StrikeSchema);
