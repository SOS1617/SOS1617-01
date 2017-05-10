
        angular
            .module("Sos161701App")
            .controller("ChartCtrl", ["$http","$scope", function($http,$scope) {
                console.log("Controller chart intialized");
            
                $http
                    .get("/api/v2/startups-stats?apikey=sos161701")
                    .then(function(res) {
                      
   Highcharts.chart('container2', {
    chart: {
        type: 'area'
    },
    title: {
        text: 'Historic and Estimated Worldwide Population Distribution by Region'
    },
    subtitle: {
        text: 'Source: Wikipedia.org'
    },
    xAxis: {
        categories: ['2010', '2011', '2012', '2013', '2014', '2015', '2016'],
        tickmarkPlacement: 'on',
        title: {
            enabled: false
        }
    },
    yAxis: {
        title: {
            text: 'Percent'
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} millions)<br/>',
        split: true
    },
    plotOptions: {
        area: {
            stacking: 'percent',
            lineColor: '#ffffff',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#ffffff'
            }
        }
    },
    series: [{
        name: 'Total',
        data: res.data.map(function(d) {
            return Number(d.total/10);
        })
    }, {
        name: 'Increase',
        data: res.data.map(function(d) {
            return Number(d.increase);
        })
    }, {
        name: 'Investment',
        data: res.data.map(function(d) {
            return Number(d.investment);
        })
    }, 
    ]
});
                      
                        google.charts.load('current', {
                            'packages': ['geochart']
                        });
                        google.charts.setOnLoadCallback(drawRegionsMap);
                        function drawRegionsMap() {
                            var myData = [['Country','total']];
                         res.data.forEach(function (d){
                                myData.push([d.country,Number(d.total)]);
                                
                            });
                            var data = google
                                            .visualization
                                            .arrayToDataTable(myData);
                            var options = {colorAxis: {colors: ['pink','pink']}};
                            var chart = new google.visualization.GeoChart(
                                        document.getElementById('regions_div'));
                            chart.draw(data, options);
                        }
                        
                        
                        
                        
                        anychart.onDocumentReady(function () {
    // create data set on our data
    var dataSet = anychart.data.set([
        res.data.map(function(d) {
            return Number(d.total);
        }),
        res.data.map(function(d) {
            return Number(d.investment);
        }),
        res.data.map(function(d) {
            return Number(d.increase);
        }),
    ]);
    
    function datos(){
      var ret=[];
      res.data.forEach(function(d){
         res.data.country=d.country;
         res.data.year=d.year;
         res.data.income_million=d.income_million;
         res.data.income_ratio=d.income_ratio;
          ret.push({"Year":res.data.country,
          "Total":res.data.year,
          "Increase":res.data.income_million,
          "Investment":res.data.income_ratio});
         
          });
     
      return ret;
     
  }

    // map data for the first series, take x from the zero column and value from the first column of data set
    var data1 = dataSet.mapAs({x: [0], value: [1]});
    // map data for the second series, take x from the zero column and value from the second column of data set
    var data2 = dataSet.mapAs({x: [0], value: [2]});
    // map data for the third series, take x from the zero column and value from the third column of data set
    var data3 = dataSet.mapAs({x: [0], value: [3]});

    // create radar chart
    chart = anychart.radar();

    // set container id for the chart
    chart.container('container');

    // set chart title text settings
    chart.title('Comparison between resources');

    // set chart yScale settings
    chart.yScale()
            .minimum(0)
            .maximumGap(0)
            .ticks().interval(50);

    // set xAxis labels settings
    chart.xAxis().labels().padding(5);

    // set chart legend settings
    chart.legend()
            .align('center')
            .enabled(true);

    // set chart grinds settings
    chart.grid(0).oddFill('white').evenFill('white').stroke('rgb(221,221,221)');
    chart.grid(1).oddFill(null).evenFill(null).stroke('rgb(192,192,192)');

    // create point data labels formation function
    var labelFormattingFunction = function () {
        return this.x + ': ' + this.value.toFixed(2)
    };

    // create first series with mapped data
    var series1 = chart.line(data1).name('');
    series1.markers().size(3);
    series1.tooltip().format(labelFormattingFunction);
    // create first series with mapped data
    var series2 = chart.line(data2).name('');
    series2.markers().size(2);
    series2.tooltip().format(labelFormattingFunction);
    // create first series with mapped data
    var series3 = chart.line(data3).name('');
    series3.markers().size(3);
    series3.tooltip().format(labelFormattingFunction);

    chart.draw();
});
                        

   
                    });
                    
                    
            }]);
