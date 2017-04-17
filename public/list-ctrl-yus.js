angular
    .module("YUSManagerApp")
    .controller("ListCtrl",["$scope","$http",function ($scope,$http){
        console.log("Controller initialized");
         $scope.url = "/api/v2/youthunemploymentstats";
         $scope.apikey="?apikey=sos161701";
         function refresh(){
         $http
              .get($scope.url+$scope.apikey)
              .then(function (response){
                    console.log("Data received:"+ JSON.stringify(response.data,null,2));
                    $scope.countries = response.data;
              });
         }
         $scope.addCountry= function(){
             $http.post($scope.url+$scope.apikey,$scope.newCountry).then(function(response){
                 console.log("post finished");
                 refresh();
             });
    
             
         };
         $scope.editCountry=function(){
                $http.put($scope.url+"/$scope.updateCountry.name"+$scope.apikey,$scope.updateCountry)
                .then(function(){
                     console.log("PUT finished");
                      refresh();
                });

        };
           $scope.deleteCountry=function(country){
                  $http.delete($scope.url+"/"+country+$scope.apikey)
                .then(function(response){
                    console.log("DELETE ONE 200 ok");
                    refresh();
                });
                       
                    
               };
           $scope.removeAll=function(){
                   $http.delete($scope.url+$scope.apikey)
                        .then(function(){
                            console.log("REMOVE All 200 ok");
                            refresh();
                        });
                        
               };
         refresh();
}]);