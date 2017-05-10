
        angular
            .module("Sos161701App")
            .controller("ChartCtrl", ["$http","$scope", function($http,$scope) {
                console.log("Controller chart intialized");
            
                $http
                    .get("/api/v2/startups-stats?apikey=sos161701")
                    .then(function(res) {
                      
   Highcharts.chart('chart', {
        chart: {
            type: 'column',
            options3d: {
            enabled: true,
            alpha: 10,
            beta: 25,
            depth: 70
            
        }
    },
    title: {
        text: 'Highcharts'
    },
    subtitle: {
        text: 'total of starts-ups'
    },
    plotOptions: {
        column: {
            depth: 25
        }
    },
    xAxis: {
        categories: res.data.map(function(d) {
            return d.country;
        })
    },
    yAxis: {
        title: {
            text: null
        }
    },
    series: [{
        name: 'Inco',
        data: res.data.map(function(d){
            return Number(d.total);
        })
    }]
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
                        
                        

   
                    });
            }]);
