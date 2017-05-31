angular
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
