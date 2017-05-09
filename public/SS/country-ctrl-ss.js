angular.module("SSApp")   //Nos pasa dicho módulo que ya hemos creado.
.controller("CountryController",["$scope","$http","$location","$routeParams",function($scope,$http,$location,$routeParams){      //En este array están los paquetes que queremos que cargue nuestro controlador. El último elemento del array tiene que ser un callback que debe tener todos los módulos anteriores.
    $scope.url = "/api/v2/startups-stats";
   $scope.apikey="?apikey=";
   refresh();
    function refresh(){
       $http
              .get($scope.url+"/"+ $routeParams.country + $scope.apikey+"sos161701")
              .then(function (response){
                    console.log("Data received:"+ JSON.stringify(response.data,null,2));
                    $scope.edit2 ={};
                    $scope.edit2.country = response.data.country;
                    $scope.edit2.year = response.data.year;
                    $scope.edit2.total = response.data.total;
                    $scope.edit2.increase = response.data.increase;
                    $scope.edit2.investment = response.data.investment;
              });
    }
    $scope.loadinitial=function(){
        $http
            .get($scope.url+"/loadInitialData"+$scope.apikey+$scope.key)
            .then(function(response){
            console.log("LOADINITIAL 200 ok");
            refresh();
            });
    };
    $scope.addData= function(){
        $http.post($scope.url+$scope.apikey+$scope.key,$scope.newData).then(function(response){
            console.log("POST finished");
            refresh();
        });
    };
    $scope.editData=function(){
        var url=$scope.url+"/"+$routeParams.country+$scope.apikey+$scope.key;
        console.log("Dato url "+url);
        var coun=JSON.stringify($scope.edit);
        console.log(("Country->"+coun));
        $http.put(url,coun)
            .then(function(){
                console.log("PUT finished");
                refresh();
            });
    };
   $scope.deleteData=function(data2){
        $http.delete($scope.url+"/"+data2+$scope.apikey+$scope.key)
            .then(function(response){
                console.log("DELETE ONE 200 ok");
                refresh();
            });
    };
    $scope.loadData=function(data3){
        $http.get($scope.url+"/"+data3+$scope.apikey+$scope.key)
            .then(function(response){
                console.log("GET 200 ok");
                $scope.load = response.data;
                refresh();
                
            });
    };
    $scope.removeAll=function(){
        $http.delete($scope.url+$scope.apikey+$scope.key)
            .then(function(){
                console.log("REMOVE All ok");
            });
    };
         
         
    $scope.listCountry= function(){
        $http
            .get($scope.url+"?apikey="+$scope.apikey+$scope.key+"&limit="+$scope.limit+"&offset="+$scope.offset)
            .then(function (response){
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.datas=response.data;
            console.log("GET 200 ok"); 
            });
    };
    
    $scope.paginacion= function(){  
            $http
                .get($scope.url+$scope.apikey+$scope.key+"&limit="+$scope.limit+"&offset="+$scope.offset)
                .then(function (response){
                 for(var i=$scope.limit;i<=$scope.offset;i++){
                     $scope.datas2=response.data2;
                     $scope.datas2[i];
                     
                }
                    console.log("GET 200 ok");
                });
    };
    
    $scope.check = function(){
        if($scope.key2 === "sos161701"){
            $scope.key = $scope.key2;
            swal("Nice!", "Correct Password!", "success");
            
        }
        if ($scope.key2 != "sos161701"){
            if ($scope.key2 == ""){
                sweetAlert("Oops...", "Empty Password!", "error");
            }else{
               sweetAlert("Oops...", "Incorrect Password!", "error"); 
            }
            
            $scope.key = $scope.key2;
        }
    }
    
    
           
}]);
