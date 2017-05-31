angular
    .module("Sos161701App")
    .controller('wbCtrlalb',["$scope","$http",function ($scope, $http){
        var dat1=[];


        $http.get("https://www.quandl.com/api/v3/datasets/WIKI/FB.json?column_index=4&start_date=2014-01-01&end_date=2014-12-31&collapse=monthly&transform=rdiff&api_key=tnJYRUrsYGSdDTPuQj7q").then(function(res){
            
            dat1=datos();
      
           console.log("Sus datos: "+JSON.stringify(dat1,2,null));
            
         
        
        
              
    Highcharts.chart('chartwb', {
    chart: {
        type: 'line'
    },
    title: {
        text: "monthly % changes in Facebook's closing price for the year 2014"
    },
    xAxis: {
        categories: dat1.map(function(d) {
            return d.zero; 
        })
    },
    yAxis: {
        title: {
            text: ''
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
        name: '% changes ',
        data: dat1.map(function(d){
            return Number(d.one);
        })
    }]
});

    
            
    function datos(){
      var ret=[];
      
     res.data.dataset.data.forEach(function(d){
            ret.push({"zero":d[0],
          "one":d[1]});
            
          });
     
      return ret;
     
  }
            
        });
        
        
       
        
}]);
