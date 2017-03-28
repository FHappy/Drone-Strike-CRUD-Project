var Strike = require('mongoose').model('Strike');


exports.getList = function(req, res, next) {
  Strike.find({})
    .exec(function(err, strikes) {
      if (err) {console.log(err);}
      res.render('strikes/list.hbs', {
        strikes: strikes
      });
    });
};

exports.getListDesc = function(req, res, next) {
  Strike.find({}).sort({ number: 'desc' })
    .exec(function(err, strikes) {
      res.render('strikes/list.hbs', {
        strikes: strikes
      });
    });
};

exports.getListAsc = function(req, res, next) {
  Strike.find({}).sort({number: 'asc'})
    .exec(function(err, strikes) {
      res.render('strikes/list.hbs', {
        strikes: strikes
      });
    });
};

exports.getDefaultQuery = function(req, res, next) {
  var regex  = new RegExp(req.params.query, "i");
  var narrativeQuery = {narrative: regex};
  var summaryQuery = {bij_summary_short: regex};
  // var query = {narrative: regex, bij_summary_short: regex};
  Strike.find({$or: [narrativeQuery, summaryQuery]})
        .sort({number: 'asc'})
        .exec(function(err, strikes) {
          if (err) {console.log(err);}
          console.log(strikes);
          res.render('strikes/list.hbs', {
            strikes: strikes,
            strikesCount: strikes.length
          });
        });
}
