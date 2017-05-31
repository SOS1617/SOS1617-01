/*global angular*/
/*global Highcharts*/
/*global $*/
angular
    .module("Sos161701App")
    .controller("CorsIreneCtrl", ["$http","$scope", function($http,$scope) {
        
        
        var dato1 = [];
        var dato2 = [];
        var total = [];
        
        
            $http
                .get("/api/v2/startups-stats?apikey=sos161701")
                .then(function(res) {
                    dato1 = funciondatos();
                    total.push(dato1);
                     $http
                        .get("https://sos1617-03.herokuapp.com/api/v1/results/?apikey=apisupersecreta")
                        .then(function(res) {
                            dato2 = funciondatos2();
                            total.push(dato2);
                        
                            
                    Highcharts.chart('container4', {
                        chart: {
                            type: 'areaspline',
                            
                    },
                    title: {
                        text: 'Highcharts'
                    },
                    subtitle: {
                        text: 'Comparason between the total of startups and the math PISA results'
                    },
                    plotOptions: {
                        column: {
                            depth: 25
                        }
                    },
                    xAxis: {
                        categories: dato2.map(function(d) {
                            var text = d.country + " - " + d.year;
                            return text;
                        })
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    series: [{
                        name: 'Totals Startups',
                        data: dato1.map(function(d){
                            return Number(d.total);
                        })
                    },{
                        name: 'Math Stats',
                        data: dato2.map(function(d){
                            var res = Number(d.math);
                            return res;
                        })
                        }]
                });
                
                
                
                
                        
              
              function funciondatos2(){
                  var ret=[];
                  
                 res.data.forEach(function(d){
                     res.data.country=d.country;
                     res.data.year=d.year;
                     res.data.science=d.science;
                     res.data.reading=d.reading;
                     res.data.math=d.math;
                      ret.push({"country":res.data.country,
                      "year":res.data.year,
                      "science":res.data.science,
                      "reading":res.data.reading,
                      "math":res.data.math
                      });
                     
                      });
                 
                  return ret;
                 
              }
                        });
              function funciondatos(){
                  var ret=[];
                  
                 res.data.forEach(function(d){
                     res.data.country=d.country;
                     res.data.year=d.year;
                     res.data.total=d.total;
                     res.data.increase=d.increase;
                     res.data.investment=d.investment;
                      ret.push({"country":res.data.country,
                      "year":res.data.year,
                      "total":res.data.total,
                      "increase":res.data.increase,
                      "investment":res.data.investment
                      });
                     
                      });
                 
                  return ret;
                 
              }
                        
                        
                });
    }]);
