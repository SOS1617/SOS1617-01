


angular
    .module("Sos161701App")
    .controller('iataCtrl',["$scope","$http",function ($scope, $http){
       var array=[];
       var array2=[];
     var p=[];
      
      
        $http.get("/api/v3/gvg").then(function(res){
             $http.get("/proxyBea2").then(function(response){
  
array2.push(datos());
//console.log("ARRAY2"+JSON.stringify(array2,2,null));
    array.push(response.data.response[0]);
    array.push(response.data.response[1]);
    array.push(response.data.response[2]);
    array.push(response.data.response[3]);
    array.push(response.data.response[4]);
    
    array2.push(res.data[0]);
    array2.push(res.data[1]);
    array2.push(res.data[2]);
    array2.push(res.data[3]);
    array2.push(res.data[4]);
    array2.push(res.data[5]);
 
    


//console.log("P->"+JSON.stringify(array,2,null));
    google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawSeriesChart);

    function drawSeriesChart() {
        var myData= [ ['Country' ,'income_million','iso_numeric' ]];
       
    
        array2.forEach(function(d) {
           
            myData.push([d.country,Number(d.income_million),Number(100)]); 
           console.log("D"+JSON.stringify(d,2,null));
         });
          array.forEach(function(c){
            myData.push([c.name,Number(2000),Number(c.iso_numeric)]); 
         });
        
         console.log("MyData->"+myData);
         
      var data = google.visualization.arrayToDataTable(myData);
      console.log("TABLE"+JSON.stringify(data,2,null));
      var options = {
        title: 'Integration between Growth of videogames market & IataCodes ' ,
        hAxis: {title: 'Income Million'},
        vAxis: {title: 'Iso Numeric'},
       
        bubble: {textStyle: {fontSize: 11}}
      };

      var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
      chart.draw(data, options);
    }
 
    
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
  
   
       
             });//fin get propio
});//fin get externo

}]);