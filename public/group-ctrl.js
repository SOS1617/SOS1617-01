angular
    .module("Sos161701App")
    .controller('groupCtrl',["$scope","$http",function ($scope, $http){
        var dat1=[];
        var dat2=[];
        var dat3=[];

        var all=[];
        $scope.apikey="sos161701";
        
        $http.get("/api/v2/gvg?apikey=sos161701").then(function(res){
            
           
            
            $http.get("/api/v2/startups-stats?apikey=sos161701").then(function(response){
                
            
             $http.get("/api/v2/youthunemploymentstats?apikey=sos161701").then(function(resp){
                 
                 
             dat1=datos();//GVG
            all.push(dat1);
            var income=[dat1.forEach(function(d) {
            return Number(d.income_ratio);
        })];
                 console.log("INCOME"+income);
            dat2=datos2;//SS
            all.push(dat2);
            var inc=[dat2.forEach(function(d) {
            return Number(d.increase);
        })];
                 console.log("INC"+inc);
             dat3=datos3();//YUS
             all.push(dat3);
             var male=[dat3.forEach(function(d) {
            return Number(d.male_unemployment_ratio);
        })];
             
             
             Highcharts.chart('group', {
    title: {
        text: 'Groupal Integration'
    },
    xAxis: {
        categories: [all.forEach(function(d){
            return d.country;
        })]
    },
    labels: {
        items: [{
            html: 'Startup-Stats  & youth unemployment & growth of videogames market',
            style: {
                left: '50px',
                top: '18px',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
            }
        }]
    },
    series: [{
        type: 'column',
        name: 'SS',
        data: [inc]
    }, {
        type: 'column',
        name: 'YUS',
        data: [male]
    },  {
        type: 'spline',
        name: 'GVG',
        data: [income],
        marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: 'white'
        }
    }, {
        type: 'pie',
        name: 'Total consumption',
        data: [{
            name: 'GVG',
            y: 2015,
            color: Highcharts.getOptions().colors[0] // Jane's color
        }, {
            name: 'SS',
            y: 2014,
            color: Highcharts.getOptions().colors[1] // John's color
        }, {
            name: 'YUS',
            y: 2016,
            color: Highcharts.getOptions().colors[2] // Joe's color
        }],
        center: [100, 80],
        size: 100,
        showInLegend: false,
        dataLabels: {
            enabled: false
        }
    }]
});


    function datos3(){
      var ret=[];
      
     resp.data.forEach(function(d){
         resp.data.country=d.country;
         resp.data.year=d.year;
         resp.data.male_unemployment_ratio=d.male_unemployment_ratio;
         resp.data.female_unemployment_ratio=d.female_unemployment_ratio;
          ret.push({"country":resp.data.country,
          "year":resp.data.year,
          "male_unemployment_ratio":resp.data.male_unemployment_ratio,
          "female_unemployment_ratio":resp.data.female_unemployment_ratio});
         
          });
     
      return ret;
     
  }
             
          
            
            function datos2(){
      var ret=[];
      
     response.data.forEach(function(d){
         response.data.country=d.country;
         response.data.year=d.year;
         response.data.total=d.total;
         response.data.increase=d.increase;
         response.data.investment=d.investment;
          ret.push({"country":response.data.country,
          "year":response.data.year,
          "toal":response.data.total,
          "increase":response.data.increase,
          "investment":response.data.investment      
          });
         
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
        
 
        
        
        });
        
        
}]);