var strikes = require('../../app/controllers/strikes.controller.js');

module.exports = function(app) {
  app.route('/strikes/list')
     .get(strikes.getList);

  app.route('/strikes/listDesc')
     .get(strikes.getListDesc);

  app.route('/strikes/listAsc')
     .get(strikes.getListAsc);

  app.route('/strikes/search/default')
     .get(strikes.getListAsc)
     .post(strikes.postDefaultQuery);

  app.route('/strikes/search/default/:query')
     .get(strikes.regexQueries, strikes.getDefaultQuery);

  app.route('/strikes/search/default/:query/sort/:sortQuery')
     .get(strikes.regexQueries, strikes.getSortQuery);

  app.route('/strikes/show/:strikeNumber')
     .get(strikes.getStrikeShow);

  app.param('strikeNumber', strikes.strikeByNumber);
};
