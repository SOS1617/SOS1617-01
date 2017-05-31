angular
    .module("Sos161701App")
    .controller('netCtrlalb',["$scope","$http",function ($scope, $http){
        var dat1=[];


        $http.get("https://netflixroulette.net/api/api.php?actor=Morgan%20Freeman").then(function(res){
            
            dat1=datos();
      
           console.log("Sus datos: "+JSON.stringify(dat1,2,null));
            
         
        
        
       Highcharts.chart('chartnet', {
    chart: {
        type: 'column',
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            viewDistance:1000,
            depth: 70
        }
    },

    title: {
        text: 'Rating in movies of Morgan Freeman  (Data collected from NetfLix API)  '
    },

    xAxis: {
        categories: dat1.map(function(d) {
            return d.show_title; 
        })
    },

    yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
            text: 'Rating of films'
        }
    },
    series: [{
        name: 'Rating',
        data: dat1.map(function(d){
            return Number(d.rating);
        })
    }]
});


           
           
       
            
            

            
                
       
            
    function datos(){
      var ret=[];
      
     res.data.forEach(function(d){
         res.data.show_title=d.show_title;
         res.data.rating=d.rating;

          ret.push({"show_title":res.data.show_title,
          "rating":res.data.rating});
         
          });
     
      return ret;
     
  }
            
        });
        
        
       
        
}]);
