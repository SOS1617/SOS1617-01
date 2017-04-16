  angular
  .module("Sos161701App")
  .controller("ListCtrl",["$scope","$http",function ($scope,$http){
                console.log("Controller initialized");
            $scope.url="/api/v1/gvg";
            function refresh(){}
            
            $scope.listCountry= function(){
                    
                $http
                .get($scope.url+"?apikey=sos161701")
                .then(function (response){
                    $scope.gvg=response.data;
                    console.log("GET 200 ok");
                
                    
                      });
            };
            $scope.editCountry=function(){
                $http.put("/api/v1/gvg/$scope.updateCountry.country?apikey=sos161701",$scope.updateCountry)
                .then(function(){
                     console.log("PUT 200 ok");
                      refresh();
                });

            };
                    
               $scope.addCountry= function(){
                $http.post("/api/v1/gvg?apikey=sos161701",$scope.newCountry)
                .then(function(response){
                  console.log("POST 200 ok");
                  refresh();
                 });
                    
                }; 
               $scope.removeAll=function(){
                   $http.delete("/api/v1/gvg?apikey=sos161701")
                        .then(function(){
                            console.log("REMOVE 200 ok");
                            refresh();
                        });
                        
               };
                  $scope.removeOne=function(country){
                  $http
                .delete("/api/v1/gvg/"+ country +"/?apikey=sos161701")
                .then(function(response){
                    console.log("DELETE one 200 ok");
                    refresh();
                });
                       
                    
               };
                
           
            
            }]);