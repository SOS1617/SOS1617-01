 angular
  .module("Sos161701App")
  .controller("EditCtrl",["$scope","$http","$routeParams","$location",function ($scope,$http,$routeParams,$location){
                console.log("Edit Controller initialized");
            $scope.url="/api/v2/gvg";
        
  
  function refresh(){
      
      $http
      .get($scope.url+"/"+$routeParams.country+"?apikey=sos161701")
      .then(function(response){
   
         $scope.updateCountry={};
         $scope.updateCountry.country=response.data.country;
         $scope.updateCountry.year=response.data.year;
         $scope.updateCountry.income_million=response.data.income_million;
         $scope.updateCountry.income_ratio=response.data.income_ratio;
         
       
      });
  }
     refresh();
  $scope.editCountry=function(){
                $http.put($scope.url+"/"+$routeParams.country+"?apikey=sos161701",$scope.updateCountry)
                .then(function(){
                     sweetAlert("PUT 200 ok");
                     var pais=JSON.stringify($scope.updateCountry,null,2);
                     console.log("El pais actualizado es-> "+pais);
                      
                $location.path("/");
                },function error(response){
                     if(response.apikey!=$scope.apikey&response.status==403){
                              sweetAlert("Incorrect apikey!!! ->Error "+response.status);
                          }else if(response.status==401){
                          sweetAlert("Empty apikey!!! ->Error "+response.status);
                          }else if(response.status==400){
                        sweetAlert("El pais introducido no existe o no es correcto ->"+response.status);
                    }
                });
              
  };
  
  
  }]);