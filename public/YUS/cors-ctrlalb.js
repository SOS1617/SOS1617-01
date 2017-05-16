angular
    .module("Sos161701App")
    .controller('CorsCtrlalb',["$scope","$http",function ($scope, $http){
        var dat1=[];
        var dat2=[];

        var all=[];
        $scope.apikey="sos161701";
        
        $http.get("https://sos1617-02.herokuapp.com/api/v1/rpc-stats/?apikey=GVAODcH3").then(function(res){
            
            dat1=datos();
      
            all.push(dat1);
           console.log("Sus datos: "+JSON.stringify(dat1,2,null));
            
            $http.get("/api/v2/youthunemploymentstats?apikey=sos161701").then(function(response){
                
            dat2=datos2();
            all.push(dat2);
          console.log("TODOS"+JSON.stringify(all,2,null));
          
           
        
        
       Highcharts.chart('corsalb', {
    chart: {
        type: 'column',
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            viewDistance: 25,
            depth: 40
        }
    },

    title: {
        text: 'Male Unemployment and RPC Variation'
    },

    xAxis: {
        categories: dat2.map(function(d) {
            return d.country+" - "+d.year; 
        })
    },

    yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
            text: 'RPC Variation and Male unemployment'
        }
    },

    tooltip: {
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
    },

    plotOptions: {
        column: {
            stacking: 'normal',
            depth: 40
        }
    },

    series: [{
        name: 'Male unemployment',
        data: dat2.map(function(d){
            return Number(d.male_unemployment_ratio);
        }),stack:'1'
    },  {
        name: 'RPC Variation',
        data: dat1.map(function(d){
            return Number(d.rpcvariation);
        }),stack:'2'
    }]
});


           
           
            function datos2(){
      var ret=[];
      
     response.data.forEach(function(d){
         response.data.country=d.country;
         response.data.year=d.year;
         response.data.male_unemployment_ratio=d.male_unemployment_ratio;
         response.data.female_unemployment_ratio=d.female_unemployment_ratio;
          ret.push({"country":response.data.country,
          "year":response.data.year,
          "male_unemployment_ratio":response.data.male_unemployment_ratio,
          "female_unemployment_ratio":response.data.female_unemployment_ratio});
         
          });
     
      return ret;
     
  }
            
            

            
                
            });
            
    function datos(){
      var ret=[];
      
     res.data.forEach(function(d){
         res.data.country=d.country;
         res.data.year=d.year;
         res.data.rpcyear=d.rpcyear;
         res.data.rpcvariation=d.rpcvariation;
          ret.push({"country":res.data.country,
          "year":res.data.year,
          "rpcyear":res.data.rpcyear,
          "rpcvariation":res.data.rpcvariation});
         
          });
     
      return ret;
     
  }
            
        });
        
        
       
        
}]);
