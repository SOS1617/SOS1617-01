  angular
  .module("Sos161701App")
  .controller("ListCtrl",["$scope","$http",function ($scope,$http){
                console.log("List Controller initialized");
            $scope.url="/api/v2/gvg";
   
    $scope.load=function(){
                    
                $http
                .get($scope.url+"?apikey=sos161701")
                .then(function (response){
                     $scope.gvg=response.data;
                    sweetAlert("GET 200 ok!!");
                   
                      },function error(response){
                          if(response.apikey!=$scope.apikey&response.status==403){
                              sweetAlert("Incorrect apikey!!! ->Error "+response.status);
                          }else if(response.status==401){
                          sweetAlert("Empty apikey!!! ->Error "+response.status);
                          }else if(response.status==404){
                                sweetAlert("Empty Resource but CORRECT APIKEY!!! ->Error "+response.status);
                          }else if(response.status==200){
                              sweetAlert("CORRECT apikey!! "+response.status);
                          }
                      });
                 
            };
          
               $scope.load();
            $scope.loadinitial=function(){
                $http
                .get($scope.url+"/loadInitialData?apikey="+$scope.apikey)
                .then(function(response){
                    sweetAlert("LOADINITIAL 200 ok and CORRECT APIKEY!!");
                  $scope.load();
                },function error(response){
                     if(response.apikey!=$scope.apikey&response.status==403){
                              sweetAlert("Incorrect apikey!!! ->Error "+response.status);
                          }else if(response.status==401){
                          sweetAlert("Empty apikey!!! ->Error "+response.status);
                          }
                   
                });
                  
            };
             $scope.paginacion= function(){
                    
                $http
                .get($scope.url+"?apikey="+$scope.apikey+"&from="+$scope.from+"&to="+$scope.to+"&limit="+$scope.limit+"&offset="+$scope.offset)
                .then(function (response){
                    $scope.gvg=response.data;
                    sweetAlert("GET 200 ok");
                 
                      },function error(response){
                           if(response.apikey!=$scope.apikey&response.status==403){
                              sweetAlert("Incorrect apikey!!! ->Error "+response.status);
                          }else if(response.status==401){
                          sweetAlert("Empty apikey!!! ->Error "+response.status);
                          }else if(response.status==200){
                              sweetAlert("CORRECT apikey!! "+response.status);
                          }
                          
                      });
                       
            };
            
          
                $scope.busqueda= function(country){
                    
                $http
                .get($scope.url+"/"+country+"?apikey="+$scope.apikey)
                .then(function (response){
                   
                     $scope.gvg2=response.data;
                      sweetAlert("SEARCH 200 ok");
              
                    
                      },function error(response) {
                           if(response.apikey!=$scope.apikey&response.status==403){
                             sweetAlert("Incorrect apikey!!! ->Error "+response.status);
                          }else if(response.status==401){
                         sweetAlert("Empty apikey!!! ->Error "+response.status);
                          }
                      });

            };
          
         
          
            
         /*   $scope.editCountry=function(){
                $http.put($scope.url+"/$scope.updateCountry.country?apikey="+$scope.apikey,$scope.updateCountry)
                .then(function(){
                     console.log("PUT 200 ok");
                   $scope.load();
                },function error(response){
                     if(response.apikey!=$scope.apikey&response.status==403){
                              sweetAlert("Incorrect apikey!!! ->Error "+response.status);
                          }else if(response.status==401){
                          sweetAlert("Empty apikey!!! ->Error "+response.status);
                          }else if(response.status==404){
                        sweetAlert("El pais introducido no existe o no es correcto ->"+response.status);
                    }
                });
                    $scope.load();
            };*/
               $scope.addCountry= function(){
                $http.post($scope.url+"?apikey="+$scope.apikey,$scope.newCountry)
                .then(function(response){
                  sweetAlert("POST 200 ok");
                $scope.load();
                 },function error(response){
                      if(response.apikey!=$scope.apikey&response.status==403){
                              sweetAlert("Incorrect apikey!!! ->Error "+response.status);
                          }else if(response.status==401){
                          sweetAlert("Empty apikey!!! ->Error "+response.status);
                          }
                 });
                   
                    
                }; 
               $scope.removeAll=function(){
                   $http.delete($scope.url+"?apikey="+$scope.apikey)
                        .then(function(){
                           sweetAlert("REMOVE 200 ok");
                             $scope.load();
                        },function error(response){
                              if(response.apikey!=$scope.apikey&response.status==403){
                              sweetAlert("Incorrect apikey!!! ->Error "+response.status);
                          }else if(response.status==401){
                          sweetAlert("Empty apikey!!! ->Error "+response.status);
                          }
                        });
                       
                        
               };
                  $scope.removeOne=function(country){
                  $http
                .delete($scope.url+"/"+ country +"/?apikey="+$scope.apikey)
                .then(function(response){
                    sweetAlert("DELETE one 200 ok");
                    $scope.load();
                },function error(response){
                      if(response.apikey!=$scope.apikey&response.status==403){
                            sweetAlert("Incorrect apikey!!! ->Error "+response.status);
                          }else if(response.status==401){
                         sweetAlert("Empty apikey!!! ->Error "+response.status);
                          }
                });
                
                       
                    
               };
                
    
            }]);
            
            
            
        