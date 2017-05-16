angular
    .module("Sos161701App")
    .controller('proxyCtrlalb',["$scope","$http",function ($scope, $http){
        var dat1=[];
        var dat2=[];

        var all=[];
        $scope.apikey="sos161701";
        
        $http.get("/proxyalb").then(function(res){
            
            dat1=datos();
      
            all.push(dat1);
           console.log("Sus datos: "+JSON.stringify(dat1,2,null));
            
            $http.get("/api/v2/youthunemploymentstats?apikey=sos161701").then(function(response){
                
            dat2=datos2();
            all.push(dat2);
          console.log("TODOS"+JSON.stringify(all,2,null));
          
           
           
    Highcharts.chart('proxya', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Male unemployment and RPC per country'
    },
    xAxis: {
        categories: dat2.map(function(d) {
            return d.country+" - "+d.year; 
        })
    },
    yAxis: {
        title: {
            text: 'Male Unemployment and Early School Leavers'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Male unemployment',
        data: dat2.map(function(d){
            return Number(d.male_unemployment_ratio);
        })
    },  {
        name: 'ESL',
        data: dat1.map(function(d){
            return Number(d.esltotal);
        })
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
         res.data.eslmale=d.eslmale;
         res.data.eslfemale=d.eslfemale;
         res.data.esltotal=d.esltotal;
         res.data.eslobjective=d.eslobjective;
          ret.push({"country":res.data.country,
          "year":res.data.year,
          "eslmale":res.data.eslmale,
          "eslfemale":res.data.eslfemale,
           "esltotal":res.data.esltotal,
           "eslobjective":res.data.eslobjective});
         
          });
     
      return ret;
     
  }
            
        });
        
        
       
        
}]);