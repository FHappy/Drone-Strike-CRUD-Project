var Strike                  = require('mongoose').model('Strike');
var request                 = require('xhr-request');

module.exports = function(req, res, next) {

  request('http://api.dronestre.am/data', {
    json: true
  }, function(err, data) {
    if (err) {throw err;}
    var strikes = data.strike;
    for (var i = 0; i < strikes.length; i++) {
      var newStrike = new Strike({
        number: strikes[i].number,
        country: strikes[i].country,
        date: strikes[i].date,
        narrative: strikes[i].narrative,
        town: strikes[i].town,
        location: strikes[i].location,
        deaths: strikes[i].deaths,
        deaths_min: strikes[i].deaths_min,
        deaths_max: strikes[i].deaths_max,
        civilians: strikes[i].civilians,
        injuries: strikes[i].injuries,
        children: strikes[i].children,
        tweet_id: strikes[i].tweet_id,
        bureau_id: strikes[i].bureau_id,
        bij_summary_short: strikes[i].bij_summary_short,
        bij_link: strikes[i].bij_link,
        target: strikes[i].target,
        lat: strikes[i].lat,
        lon: strikes[i].lon,
        articles: strikes[i].articles,
        names: strikes[i].names
      });
      
      newStrike.save(function(err) {
        if (err) {console.log(err);}
      });
    }
  });
  res.redirect('/');
}
