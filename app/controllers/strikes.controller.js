var Strike = require('mongoose').model('Strike');


exports.strikeByNumber = function(req, res, next, number) {
  Strike.findOne({number: number})
    .exec(function(err, strike) {
      if (err) {console.log(err);}
      req.strike = strike;
      next();
    });
};

exports.getList = function(req, res, next) {
  Strike.find({})
    .exec(function(err, strikes) {
      if (err) {console.log(err);}
      res.render('strikes/list.hbs', {
        strikes: strikes,
        strikesCount: strikes.length
      });
    });
};

exports.getListDesc = function(req, res, next) {
  Strike.find({}).sort({ number: 'desc' })
    .exec(function(err, strikes) {
      if (req.session.passport) {
        res.render('strikes/list.hbs', {
          strikes: strikes,
          strikesCount: strikes.length,
          user: req.session.passport.user
        });
      } else {
        res.render('strikes/list.hbs', {
          strikes: strikes,
          strikesCount: strikes.length
        });
      }
    });
};

exports.getListAsc = function(req, res, next) {
  Strike.find({}).sort({number: 'asc'})
    .exec(function(err, strikes) {
      if (req.session.passport) {
        res.render('strikes/list.hbs', {
          strikes: strikes,
          strikesCount: strikes.length,
          user: req.session.passport.user
        });
      } else {
        res.render('strikes/list.hbs', {
          strikes: strikes,
          strikesCount: strikes.length
        });
      }
    });
};

exports.postDefaultQuery = function(req, res, next) {
  var query = req.body.query;
  var sortQuery = req.body.sortQuery;
  if (!query) {
    return res.redirect('/strikes/search/ ');
  }
  return res.redirect('/strikes/search/' + query + '/sort/' + sortQuery);
};

exports.getDefaultQuery = function(req, res, next) {
  Strike.find({$or: req.regex})
        .sort({number: 'asc'})
        .exec(function(err, strikes) {
          if (req.session.passport) {
            res.render('strikes/list.hbs', {
              strikes: strikes,
              strikesCount: strikes.length,
              user: req.session.passport.user
            });
          } else {
            res.render('strikes/list.hbs', {
              strikes: strikes,
              strikesCount: strikes.length
            });
          }
        });
};

exports.getSortQuery = function(req, res, next) {
  var sortQuery = {};
  sortQuery[req.params.sortQuery] = 'desc';
  Strike.find({$or: req.regex})
        .sort(sortQuery)
        .exec(function(err, strikes) {
          if (req.session.passport) {
            res.render('strikes/list.hbs', {
              strikes: strikes,
              strikesCount: strikes.length,
              user: req.session.passport.user
            });
          } else {
            res.render('strikes/list.hbs', {
              strikes: strikes,
              strikesCount: strikes.length
            });
          }
        });
};

exports.getStrikeShow = function(req, res, next) {
  res.render('strikes/show.hbs', {
    strike: req.strike
  })
};

exports.regexQueries = function(req, res, next) {
  var regex  = new RegExp(req.params.query, "i");
  var narrativeQuery = {narrative: regex};
  var summaryQuery = {bij_summary_short: regex};
  var countryQuery = {country: regex};
  req.regex = [narrativeQuery, summaryQuery, countryQuery];
  next();
};

exports.chartData = function() {
  Strike.find({})
    .sort({number: 'asc'})
    .exec(function(err, strikes) {
      if (err) {console.log(err);}
      var data = [];
      strikes.forEach(function(x) {
        var xData = x.date;
        if (x.deaths.length === 2 && x.deaths[0] > x.deaths[1]) {
          var yData = x.deaths[0];
        } else {var yData = x.deaths[1];}
        data.push([xData, yData]);
      });

      return data;
    });
}
