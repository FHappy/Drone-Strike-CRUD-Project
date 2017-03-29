var Strike = require('mongoose').model('Strike');

function getData() {
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

// $(document).ready(function() {
  var chartData = getData();

  var chart = {
        type: 'spline'
     };
  var title = {
    text: 'U.S. Covert Drone Strikes From 2012-2017'
  };
  var subtitle = {
    text: 'Number of Reported Deaths per Strike'
  };
  var xAxis = {
    type: 'datetime',
    dateTimeLabelFormats: {
       month: '%e. %b',
       year: '%b'
    },
    title: {
       text: 'Date'
    }
  };
  var yAxis = {
    title: {
       text: 'Estimated Death Toll'
    },
    min: 0
  };
  var tooltip = {
    headerFormat: '<b>{series.name}</b><br>',
    pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
  };
  var plotOptions = {
    spline: {
       marker: {
          enabled: true
       }
    }
  };

  var series = [{
    name: 'Drone Strikes 2012-2017',
    data: chartData
  }];

  var json = {};
  json.chart = chart;
  json.title = title;
  json.subtitle = subtitle;
  json.tooltip = tooltip;
  json.xAxis = xAxis;
  json.yAxis = yAxis;
  json.series = series;
  json.plotOptions = plotOptions;

  $('#splashChart').highcharts(json);
// });
