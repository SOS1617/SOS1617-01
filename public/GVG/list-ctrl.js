

  angular
  .module("Sos161701App")
  .controller("ListCtrl",["$scope","$http",function ($scope,$http){
                console.log("List Controller initialized");
            $scope.url="/api/v2/gvg";
  
  var datos={};

 
  
    $scope.offset = 0;



   

    $scope.anterior = function() {
           if($scope.offset>0){
            $scope.offset = $scope.offset - $scope.limit;
            }
            $scope.paginacion();
    };

    $scope.siguiente = function() {
        $scope.offset = $scope.offset + $scope.limit;

            $scope.paginacion();
    };

    $scope.refrescar = function() {
            if($scope.gvg == []){
        
        }
        if ($scope.offset == 0){
            $http
              .get($scope.url+"?apikey="+$scope.apikey+"&from=1&to=100000&limit="+$scope.limit+"&offset="+$scope.offset)
              .then(function (response){
                 
                    $scope.gvg = response.data;
              });
        }
        
    };
    $scope.load=function(){
                    
                $http
                .get($scope.url +"?" + "apikey="+$scope.apikey)
                 .then(function(response) {
             

                     datos = response.data;
                    
                      },function error(response){
                           $scope.max = 1;
                         datos = {};
                          $scope.refrescar();
                          if(response.apikey!=$scope.apikey&response.status==403){
                              datos = {};
                            $scope.refrescar();
                             sweetAlert("Incorrect apikey!!! ->Error "+response.status);
                          }else if(response.status==401){
                                datos = {};
                            $scope.refrescar();
                          sweetAlert("Empty apikey!!! ->Error "+response.status);
                          }else if(response.status==404){
                                datos = {};
                            $scope.refrescar();
                                sweetAlert("Empty Resource but CORRECT APIKEY!!! ->Error "+response.status);
                          }else if(response.status==200){
                                datos = {};
                                sweetAlert("CORRECT apikey!! "+response.status);
                            $scope.refrescar();
                              
                          }
                      });
                   
              
            };
          
               $scope.load();

            $scope.loadinitial=function(){
                $http
                .get($scope.url+"/loadInitialData?apikey="+$scope.apikey)
                .then(function(response){
                    

                     $scope.gvg= response.data;
                     $scope.paginacion();
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
                    
               $scope.datas = {};

            $http
                .get($scope.url + "?apikey=" + $scope.apikey + "&from=10&to=10000&limit=" + $scope.limit + "&offset=" + $scope.offset)
                .then(function(response) {
                  
                    $scope.gvg = response.data;
                    console.log("GET 200 ok");
                 //   sweetAlert("GET 200 ok");
                 $scope.load();
                      },function error(response){
                           if(response.apikey!=$scope.apikey&response.status==403){
                              sweetAlert("Incorrect apikey!!! ->Error "+response.status);
                          }else if(response.status==401){
                          sweetAlert("Empty apikey!!! ->Error "+response.status);
                          }else if(response.status==200){
                            //  sweetAlert("CORRECT apikey!! "+response.status);
                          }
                          
                      });
                       
            };
             $scope.paginacion2= function(){
                    
               $scope.datas = {};

            $http
                .get($scope.url + "?apikey=" + $scope.apikey + "&from="+$scope.from+"&to="+$scope.to+"&limit=100&offset=0")
                .then(function(response) {
                  
                    $scope.gvg = response.data;
                    console.log("GET 200 ok");
                 //   sweetAlert("GET 200 ok");
                 $scope.load();
                      },function error(response){
                           if(response.apikey!=$scope.apikey&response.status==403){
                              sweetAlert("Incorrect apikey!!! ->Error "+response.status);
                          }else if(response.status==401){
                          sweetAlert("Empty apikey!!! ->Error "+response.status);
                          }else if(response.status==200){
                            //  sweetAlert("CORRECT apikey!! "+response.status);
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
          
         
          
            
            $scope.editCountry=function(){
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
            };
               $scope.addCountry= function(){
                $http.post($scope.url+"?apikey=sos161701",$scope.newCountry)
                .then(function(response){
                //  sweetAlert("POST 200 ok");
                $scope.paginacion();
                 },function error(response){
                      if(response.apikey!=$scope.apikey&response.status==403){
                              sweetAlert("Incorrect apikey!!! ->Error "+response.status);
                          }else if(response.status==401){
                          sweetAlert("Empty apikey!!! ->Error "+response.status);
                          }else if(response.status==409){
                              sweetAlert("El país ya existe!!! ->Error "+response.status);
                          }
                           
                 });
                 ;
                   
                }; 
               $scope.removeAll=function(){
                   $http.delete($scope.url+"?apikey="+$scope.apikey)
                        .then(function(){
                           sweetAlert("REMOVE 200 ok");
                             $scope.paginacion();
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
                    $scope.paginacion();
                },function error(response){
                      if(response.apikey!=$scope.apikey&response.status==403){
                            sweetAlert("Incorrect apikey!!! ->Error "+response.status);
                          }else if(response.status==401){
                         sweetAlert("Empty apikey!!! ->Error "+response.status);
                          }
                });
                
                       
                    
               };
                
                
     
 
    
            }]);
            
