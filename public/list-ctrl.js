  angular
  .module("Sos161701App")
  .controller("ListCtrl",["$scope","$http",function ($scope,$http){
                console.log("Controller initialized");
            $scope.url="/api/v2/gvg";
           
            function refresh(){}
            
            $scope.loadinitial=function(){
                $http
                .get($scope.url+"/loadInitialData?apikey="+$scope.apikey)
                .then(function(response){
                    console.log("LOADINITIAL 200 ok");
                });
            };
            
            $scope.listCountry= function(){
                    
                $http
                .get($scope.url+"?apikey="+$scope.apikey+"&limit="+$scope.limit+"&offset="+$scope.offset)
                .then(function (response){
                    $scope.data = JSON.stringify(response.data, null, 2);
                    $scope.gvg=response.data;
                    console.log("GET 200 ok");
                    
                    
                      });
            };
             $scope.paginacion= function(){
                    
                $http
                .get($scope.url+"?apikey="+$scope.apikey+"&limit="+$scope.limit+"&offset="+$scope.offset)
                .then(function (response){
                 for(var i=$scope.limit;i<=$scope.offset;i++){
                     $scope.gvg=response.data;
                     $scope.gvg[i];
                 }
                    
                    console.log("GET 200 ok");
                    
                    
                      });
            };
            $scope.editCountry=function(){
                $http.put($scope.url+"/$scope.updateCountry.country?apikey="+$scope.apikey,$scope.updateCountry)
                .then(function(){
                     console.log("PUT 200 ok");
                      refresh();
                });

            };
                    
               $scope.addCountry= function(){
                $http.post($scope.url+"?apikey="+$scope.apikey,$scope.newCountry)
                .then(function(response){
                  console.log("POST 200 ok");
                  refresh();
                 });
                    
                }; 
               $scope.removeAll=function(){
                   $http.delete($scope.url+"?apikey="+$scope.apikey)
                        .then(function(){
                            console.log("REMOVE 200 ok");
                            refresh();
                        });
                        
               };
                  $scope.removeOne=function(country){
                  $http
                .delete($scope.url+"/"+ country +"/?apikey="+$scope.apikey)
                .then(function(response){
                    console.log("DELETE one 200 ok");
                    refresh();
                });
                       
                    
               };
                
           
            
            }]);