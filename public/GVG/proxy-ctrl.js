angular
    .module("Sos161701App")
    .controller('proxyCtrl',["$scope","$http",function ($scope, $http){
        var dat1=[];
        var dat2=[];

        var all=[];
        $scope.apikey="sos161701";
        
        $http.get("/proxyBea").then(function(res){
            
            dat1=datos();
      
            all.push(dat1);
           console.log("Sus datos: "+JSON.stringify(dat1,2,null));
            
            $http.get("/api/v2/gvg?apikey=sos161701").then(function(response){
                
            dat2=datos2();
        
            all.push(dat2);
          console.log("TODOS"+JSON.stringify(all,2,null));
          
            
   Highcharts.chart('proxy', {
    chart: {
        type: 'spline',
        inverted: true
    },
    title: {
        text: 'Income Ratio per Country and BirthRate'
    },
    subtitle: {
        style: {
            position: 'absolute',
            right: '0px',
            bottom: '10px'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -150,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    xAxis: {
        categories: dat2.map(function(d) {
            return d.income_ratio;
        })
           
    },
    yAxis: {
        title: {
            text: 'BirthRate VS Income Ratio'
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        },
        min: 0
    },
    plotOptions: {
        area: {
            fillOpacity: 0.5
        }
    },
    series: [{
        name: 'BirthRate',
        data: dat1.map(function(d){
            return Number(d.birthRate);
        })
    },
    {
        name: 'income_ratio',
        data: dat2.map(function(d){
            return Number(d.income_ratio);
        })
    }]
});
            
            function datos2(){
      var ret=[];
      
     response.data.forEach(function(d){
         response.data.country=d.country;
         response.data.year=d.year;
         response.data.income_million=d.income_million;
         response.data.income_ratio=d.income_ratio;
          ret.push({"country":response.data.country,
          "year":response.data.year,
          "income_million":response.data.income_million,
          "income_ratio":response.data.income_ratio});
         
          });
     
      return ret;
     
  }
            
                
            });
            
    function datos(){
      var ret=[];
      
     res.data.forEach(function(d){
         res.data.country=d.country;
         res.data.year=d.year;
         res.data.birthRate=d.birthRate;
         res.data.lifeExpectancy=d.lifeExpectancy;
         res.data.mortalityRate=d.mortalityRate;
          ret.push({"country":res.data.country,
          "year":res.data.year,
          "birthRate":res.data.birthRate,
          "lifeExpectancy":res.data.lifeExpectancy,
            "mortalityRate":res.data.mortalityRate
          });
         
          });
     
      return ret;
     
  }
            
        });
        
        
       
        
}]);