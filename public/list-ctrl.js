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
             $scope.paginacion= function(){
                    
                $http
                .get($scope.url+"?apikey="+$scope.apikey+"&from="+$scope.from+"&to="+$scope.to+"&limit="+$scope.limit+"&offset="+$scope.offset)
                .then(function (response){
                    $scope.gvg=response.data;
                    console.log("GET 200 ok");
                    
                    
                      });
            };
            
            $scope.listCountry= function(){
                    
                $http
                .get($scope.url+"?apikey="+$scope.apikey)
                .then(function (response){
                    $scope.gvg=response.data;
                    console.log("GET 200 ok");
                    
                    
                      });
            };
                $scope.busqueda= function(){
                    
                $http
                .get($scope.url+"/"+$scope.searchCountry.country+"?apikey="+$scope.apikey)
                .then(function (response){
                   
                     $scope.gvg=response.country;
                      console.log("SEARCH 200 ok");
                    
                    
                    
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