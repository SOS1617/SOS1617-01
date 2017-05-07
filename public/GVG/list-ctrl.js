

  angular
  .module("Sos161701App")
  .controller("ListCtrl",["$scope","$http",function ($scope,$http){
                console.log("List Controller initialized");
            $scope.url="/api/v2/gvg";
  
  
    $scope.gvg = {};
    var datos = {};
    $scope.actual = 1;
    $scope.max = 1;
    $scope.paginas = [];
    $scope.izq = [];
    $scope.centro = [];
    $scope.der = [];



    var elementsPerPage = 4;

    function pagination() {
        var pagesNearby = 2;
        $scope.izq = [];
        $scope.centro = [];
        $scope.der = [];
        if ($scope.max <= pagesNearby * 2) {
            for (var i = 1; i <= $scope.max; i++) $scope.izq.push(i);
        }
        else if ($scope.actual >= 0 && $scope.actual <= pagesNearby) {
            for (var i = 1; i <= pagesNearby; i++) $scope.izq.push(i);
            for (i = $scope.max - pagesNearby + 1; i <= $scope.max; i++) $scope.centro.push(i);
        }
        else if ($scope.actual >= $scope.max - pagesNearby + 1 && $scope.actual <= $scope.max) {
            for (var i = 1; i <= pagesNearby; i++) $scope.centro.push(i);
            for (i = $scope.max - pagesNearby + 1; i <= $scope.max; i++) $scope.der.push(i);
        }
        else {
            
            for (var i = 1; i <= pagesNearby; i++) $scope.izq.push(i);
            for (var i = Math.max($scope.actual - 1, pagesNearby + 1); i <= Math.min($scope.actual + 1, $scope.max - pagesNearby); i++) $scope.centro.push(i);
            for (i = $scope.max - pagesNearby + 1; i <= $scope.max; i++) $scope.der.push(i);
            if (($scope.izq[$scope.izq.length - 1] == $scope.centro[0] - 1) && ($scope.centro[$scope.centro.length - 1] == $scope.der[0] - 1)) {
                $scope.centro = $scope.centro.concat($scope.der);
                $scope.izq = $scope.izq.concat($scope.centro);
                $scope.centro = [];
                $scope.der = [];
            }
            else if ($scope.izq[$scope.izq.length - 1] == $scope.centro[0] - 1) {
                $scope.izq = $scope.izq.concat($scope.centro);
                $scope.centro = [];
            }
            else if ($scope.centro[$scope.centro.length - 1] == $scope.der[0] - 1) {
                $scope.der = $scope.centro.concat($scope.der);
                $scope.centro = [];
            }
        }
    }


    $scope.cambio = function(page) {
        $scope.actual = page;
        $scope.refrescar();
    };

    $scope.anterior = function() {
        $scope.actual--;
        $scope.refrescar();
    };

    $scope.siguiente = function() {
        $scope.actual++;
        $scope.refrescar();
    };

    $scope.refrescar = function() {
        if ($scope.actual <= 0) $scope.actual = 1;
        if ($scope.actual > $scope.max) $scope.actual = $scope.max;
        pagination();
        if (datos.length > elementsPerPage) {
            $scope.gvg = datos.slice(Number(($scope.actual - 1) * elementsPerPage), Number(($scope.actual) * elementsPerPage));
        }
        else {
            $scope.gvg = datos;
        }
    };
    $scope.load=function(){
                    
                $http
                .get($scope.url +"?" + "apikey=" + $scope.apikey )
                 .then(function(response) {
                $scope.max = Math.max(Math.ceil(response.data.length / elementsPerPage), 1);

                     datos = response.data;
                     $scope.refrescar();
                    
                   sweetAlert("200 OK!!");
                   
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
                            $scope.refrescar();
                              sweetAlert("CORRECT apikey!! "+response.status);
                          }
                      });
                   
                 
            };
          
               $scope.load();

            $scope.loadinitial=function(){
                $http
                .get($scope.url+"/loadInitialData?apikey="+$scope.apikey)
                .then(function(response){
                      $scope.max = Math.max(Math.ceil(response.data.length / elementsPerPage), 1);

                     $scope.gvg= response.data;
                     $scope.refrescar();
                    sweetAlert("LOADINITIAL 200 ok and CORRECT APIKEY!!");
                  //$scope.load();
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
            
