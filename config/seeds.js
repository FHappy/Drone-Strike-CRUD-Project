var $ = require('jquery');
module.exports = function() {
  $.get('http://api.dronestre.am/data')
    .done(function(data) {
      console.log(data);
    });

}
