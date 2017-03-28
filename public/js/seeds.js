// $(function() {
//   $.get('http://api.dronestre.am/data')
//     .done(function(data) {
//       console.log(data.strike);
//     });
// });

var request = require('xhr-request');

request('http://api.dronestre.am/data', {
  json: true
}, function(err, data) {
  if (err) {throw err;}
  console.log(data.strike);
});
