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

function convertCasualties(attr) {
  if (attr.indexOf('-') !== -1) {
    var nums = attr.split('-');
    nums = nums.map(x => parseInt(x));
    attr = nums;
  } else {
    attr = parseInt(attr);
  }
  return attr;
}

StrikeSchema.pre('save', function(next) {
  this.deaths = convertCasualties(this.deaths);
  convertCasualties(this.deaths_min);
  convertCasualties(this.deaths_max);
  convertCasualties(this.civilians);
  convertCasualties(this.injuries);
  convertCasualties(this.children);
  next();
});

StrikeSchema.post('save', function(next) {
  
});

StrikeSchema.set('toJSON', {getters: true, virtuals: true});

mongoose.model('Strike', StrikeSchema);
