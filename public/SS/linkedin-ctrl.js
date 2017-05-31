angular
    .module("Sos161701App")
    .controller('LinkedinCtrl',["$scope","$http",function ($scope, $http){
       var array=[];
       
       
       
        
        
             $http.get("https://swapi.co/api/planets/").then(function(response){
  

          array.push(response.data.name[0]);
      

       array.push(response.data.name[1]);
        
 
        array.push(response.data.name[2]);
        
  
        array.push(response.data.name[3]);
        
      
       

 
  
  Morris.Bar({
  element: 'asterank',
  data:array,
  xkey: ['name'],
  ykeys: ['neo_reference_id'],
  labels: ['ID']
});
  
 
             });//fin get externo

}]);
