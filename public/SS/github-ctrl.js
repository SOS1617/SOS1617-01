angular
    .module("Sos161701App")
    .controller('GithubCtrl',["$scope","$http",function ($scope, $http){
        var dat1=[];


        $http.get("https://api.github.com/users/HackerYou/repos").then(function(res){
            
            dat1=datos();
           console.log("Sus datos: "+JSON.stringify(dat1,2,null));
 
        
       Highcharts.chart('chartnet4', {
    chart: {
        type: 'areaspline',
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            viewDistance:1000,
            depth: 70
        }
    },

    title: {
        text: 'Repositories of Github '
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
        name: 'id',
        data: dat1.map(function(d){
            return Number(d.id);
        })
    }]
});
  
            
    function datos(){
      var ret=[];
      
     res.data.forEach(function(d){
         res.data.name=d.name;
         res.data.id=d.id;

          ret.push({"name":res.data.name,
          "id":res.data.id});
         
          });
     
      return ret;
     
  }
            
        });
              
        
}]);
