var Strike                  = require('mongoose').model('Strike');
var request                 = require('xhr-request');
var mongoose                = require('mongoose');


function convertCasualties(deaths) {
  // if (deaths === 'Unknown') {return [];}
  // if (deaths === '') {return [];}
  var nums = deaths.split('-');
  deaths = nums.map(x => parseInt(x));
  if (deaths[0] === NaN) {deaths = [];}
  return deaths;
}

module.exports = function(req, res, next) {
  mongoose.connection.db.dropCollection('strikes', function(err, result) {
    if (err) {console.log(err);}

    request('http://api.dronestre.am/data', {
      json: true
    }, function(err, data) {
      if (err) {throw err;}
      var strikes = data.strike;
      strikes.map(function(strike) {
        strike.deaths                 = convertCasualties(strike.deaths);
        strike.deaths_min             = convertCasualties(strike.deaths_min);
        strike.deaths_mastrike        = convertCasualties(strike.deaths_max);
        strike.civilians              = convertCasualties(strike.civilians);
        strike.injuries               = convertCasualties(strike.injuries);
        strike.children               = convertCasualties(strike.children);
      });

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
  });

}
