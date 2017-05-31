angular
    .module("Sos161701App")
    .controller('nasaCtrl',["$scope","$http",function ($scope, $http){
       var array=[];
       
       
       
        $scope.apikey="P3VG3PBb65c1XGTedK8AZiD9awfDnUqbShBcw8Jk";
        
             $http.get("https://api.nasa.gov/neo/rest/v1/neo/browse?page=1&size=4&api_key="+$scope.apikey).then(function(response){
  

          array.push(response.data.near_earth_objects[0]);
      

       array.push(response.data.near_earth_objects[1]);
        
 
        array.push(response.data.near_earth_objects[2]);
        
  
        array.push(response.data.near_earth_objects[3]);
        
      
       

 
  
  Morris.Bar({
  element: 'nasa',
  data:array,
  xkey: ['name'],
  ykeys: ['neo_reference_id'],
  labels: ['ID']
});
  
 
             });//fin get externo

}]);
