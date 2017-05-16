/*global angular*/
/*global Highcharts*/
/*global $*/
angular
    .module("Sos161701App")
    .controller("ProxyIreneCtrl", ["$http","$scope", function($http,$scope) {
        
        
        var dato1 = [];
        var dato2 = [];
        var total = [];
        
            $http
                .get("/api/v2/startups-stats?apikey=sos161701")
                .then(function(res) {
                    dato1 = funciondatos();
                    total.push(dato1);
                     $http
                        .get("/proxyirene")
                        .then(function(res) {
                            dato2 = funciondatos2();
                            total.push(dato2);
                            
                    Highcharts.chart('container3', {
                        chart: {
                            type: 'column',
                            
                    },
                    title: {
                        text: 'Highcharts'
                    },
                    subtitle: {
                        text: 'Comparason between increase of startups and usage of phone lines'
                    },
                    plotOptions: {
                        column: {
                            depth: 25
                        }
                    },
                    xAxis: {
                        categories: dato2.map(function(d) {
                            return d.country;
                        })
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    series: [{
                        name: 'Increase (%)',
                        data: dato1.map(function(d){
                            return Number(d.increase);
                        })
                    },{
                        name: 'Usage Phone Lines',
                        data: dato2.map(function(d){
                            return Number(d.usagephoneline);
                        })
                        }]
                });
                
                
                
                
                        
              
              function funciondatos2(){
                  var ret=[];
                  
                 res.data.forEach(function(d){
                     res.data.country=d.country;
                     res.data.year=d.year;
                     res.data.usageinternet=d.usageinternet;
                     res.data.usagephoneline=d.usagephoneline;
                      ret.push({"country":res.data.country,
                      "year":res.data.year,
                      "usageinternet":res.data.usageinternet,
                      "usagephoneline":res.data.usagephoneline
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
