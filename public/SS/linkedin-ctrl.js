/*angular
    .module("Sos161701App")
    .controller('LinkedinCtrl',["$scope","$http",function ($scope, $http){
        var dat1=[];


        $http.get("https://swapi.co/api/planets/").then(function(res){
            
            dat1=datos();
           console.log("Sus datos: "+JSON.stringify(dat1,2,null));
 
        
       Highcharts.chart('chartnet3', {
    chart: {
        type: 'area',
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            viewDistance:1000,
            depth: 70
        }
    },

    title: {
        text: 'Planets diameter of Star Wars Universe '
    },

    xAxis: {
        categories: dat1.map(function(d) {
            return d.name; 
        })
    },

    yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
            text: 'Diameter of planets'
        }
    },
    series: [{
        name: 'diameter',
        data: dat1.map(function(d){
            return Number(d.diameter);
        })
    }]
});
  
            
    function datos(){
      var ret=[];
      
     res.data.results.forEach(function(d){
         res.data.name=d.name;
         res.data.diameter=d.diameter;

          ret.push({"name":res.data.name,
          "diameter":res.data.diameter});
         
          });
     
      return ret;
     
  }
            
        });
              
        
}]);
*/


/*global angular*/
/*global Highcharts*/
/*global $*/
angular
    .module("Sos161701App")
    .controller("LinkedinCtrl", ["$http","$scope", function($http,$scope) {
        
        
        var dato1 = [];
        var dato2 = [];
        var total = [];
        
        
            $http
                .get("/api/v2/startups-stats?apikey=sos161701")
                .then(function(res) {
                    dato1 = funciondatos();
                    total.push(dato1);
                     $http
                        .get("https://swapi.co/api/planets/")
                        .then(function(res) {
                            dato2 = funciondatos2();
                            total.push(dato2);
                        
                            
                    Highcharts.chart('chartnet3', {
                        chart: {
                            type: 'pie',
                            
                    },
                    title: {
                        text: 'Highcharts'
                    },
                    subtitle: {
                        text: 'Orbital Period and Total of Startups'
                    },
                    plotOptions: {
                        column: {
                            depth: 25
                        }
                    },
                    xAxis: {
                        categories: dato2.map(function(d) {
                            var text = d.name + " - " + d.terrain;
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
                        name: 'Orbital Period',
                        data: dato2.map(function(d){
                            var res = Number(d.orbital_period);
                            return res;
                        })
                        }]
                });
                
                
                
                
                        
              
              function funciondatos2(){
      var ret=[];
      
     res.data.results.forEach(function(d){
         res.data.name=d.name;
         res.data.diameter=d.diameter;
         res.data.terrain=d.terrain;
         res.data.population=d.population;
         res.data.orbital_period=d.orbital_period;

          ret.push({"name":res.data.name,
          "diameter":res.data.diameter,
          "terrain":res.data.terrain,
          "population":res.data.population,
          "orbital_period":res.data.orbital_period
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
