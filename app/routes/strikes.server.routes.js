var strikes = require('../../app/controllers/strikes.server.controller.js');

module.exports = function(app) {
  app.route('/strikes/list')
     .get(strikes.getList);

  app.route('/strikes/listDesc')
     .get(strikes.getListDesc);

  app.route('/strikes/listAsc')
     .get(strikes.getListAsc);
};
