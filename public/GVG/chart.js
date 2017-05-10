    angular
            .module("Sos161701App")
            .controller("lisChartCtrl", ["$http","$scope", function($http,$scope) {
                console.log("Controller chart intialized");
            
                $http
                    .get("/api/v2/gvg?apikey=sos161701")
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
        text: 'Income Ratio per Country'
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
        name: 'Income %',
        data: res.data.map(function(d){
            return Number(d.income_ratio);
        })
    }]
});
                      
                        google.charts.load('current', {
                            'packages': ['geochart']
                        });
                        google.charts.setOnLoadCallback(drawRegionsMap);
                        function drawRegionsMap() {
                            var myData = [['Country','income_million']];
                         res.data.forEach(function (d){
                                myData.push([d.country,Number(d.income_million)]);
                                
                            });
                            var data = google
                                            .visualization
                                            .arrayToDataTable(myData);
                            var options = {colorAxis: {colors: ['pink','pink']}};
                            var chart = new google.visualization.GeoChart(
                                        document.getElementById('regions_div'));
                            chart.draw(data, options);
                        }
                        
                        
   //MORRIS
   
  function datos(){
      var ret=[];
      
     res.data.forEach(function(d){
         res.data.country=d.country;
         res.data.year=d.year;
         res.data.income_million=d.income_million;
         res.data.income_ratio=d.income_ratio;
          ret.push({"country":res.data.country,
          "year":res.data.year,
          "income_million":res.data.income_million,
          "income_ratio":res.data.income_ratio});
         
          });
     
      return ret;
     
  }
     console.log(JSON.stringify(datos(),2,null));
//hola
Morris.Bar({
  element: 'prueba',
  data: datos(),
  xkey: ['country'],
  ykeys: ['income_ratio','income_million','year'],
  labels: ['Income Ratio:','Income Million:','Year:']
});
  
   
                    });
            }]);
