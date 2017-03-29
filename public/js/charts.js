var Strike = require('mongoose').model('Strike');

Strike.find({})
  .sort({number: 'asc'})
  .exec(function(err, strikes) {
    if (err) {console.log(err);}
    var xData = [];
    var yData = [];
    strikes.forEach(function(x) {
      xData.push(x.date);
      if (x.deaths.length === 2 && x.deaths[0] > x.deaths[1]) {
        yData.push(x.deaths[0]);
      } else {yData.push(x.deaths[1]);}
    });
  });


$(function () {
    var myChart = Highcharts.chart('container', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
});
