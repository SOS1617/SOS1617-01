/*global angular*/

angular
    .module("Sos161701App")
    .controller('corsCtrl',["$scope","$http",function ($scope, $http){
        var dat1=[];
        var dat2=[];

        var all=[];
        $scope.apikey="sos161701";
        
        $http.get("/api/v2/gvg?apikey=sos161701").then(function(res){
            
            dat1=datos();
      
            all.push(dat1);
        
            
            $http.get("https://sos1617-02.herokuapp.com/api/v1/smi-stats?apikey=rXD8D2b1vP").then(function(response){
                
            dat2=datos2();
        
            all.push(dat2);
             console.log("Sus datos: "+JSON.stringify(dat2,2,null));
          
            
              Highcharts.chart('cors', {
        chart: {
            type: 'line',
            options3d: {
            enabled: true,
            alpha: 10,
            beta: 25,
            depth: 70
            
        }
    },
    title: {
        text: 'Highcharts integrated'
    },
    subtitle: {
        text: 'Income Ratio per Country and SMI'
    },
    plotOptions: {
        column: {
            depth: 25
        }
    },
    xAxis: {
        categories: dat1.map(function(d) {
            return d.year;
        })
    },
    yAxis: {
        title: null
        
            
        
    },
    series: [{
        name: 'Income milliion',
        data: dat1.map(function(d){
            return Number(d.income_million);
        })
    },
    {
        name: 'year',
        data: dat2.map(function(d){
            return Number(d.year);
        })
    }
    
    ],
    
});
            
            function datos2(){
      var ret=[];
      
     response.data.forEach(function(d){
         response.data.country=d.country;
         response.data.year=d.year;
         response.data.smiyear=d.smiyear;
         response.data.smivariation=d.smivariation;
          ret.push({"country":response.data.country,
          "year":response.data.year,
          "smi-year":response.data.smiyear,
          "smi-variation":response.data.smivariation});
         
          });
     
      return ret;
     
  }
            
                
            });
            
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
            
        });
        
        
       
        
}]);