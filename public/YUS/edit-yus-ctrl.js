angular
    .module("YUSManagerApp")
    .controller("EditCtrl",["$scope","$http","$routeParams",function ($scope,$http,$routeParams){
        console.log("Controller initialized");
         $scope.url = "/api/v2/youthunemploymentstats";
         
      function refresh(){
         $http
              .get($scope.url+"/"+$routeParams.country+"?apikey=sos161701")
              .then(function (response){
                    console.log("Data received:"+ JSON.stringify(response.data,null,2));
                    $scope.updateCountry = {};
                    $scope.updateCountry.country = response.data.country;
                    $scope.updateCountry.year = response.data.year;
                    $scope.updateCountry.male_unemployment_ratio = response.data.male_unemployment_ratio;
                    $scope.updateCountry.female_unemployment_ratio = response.data.female_unemployment_ratio;

              },function error(response){
                    if(response.apikey!=$scope.apikey & response.status==403){
                        console.log("Incorrect apikey. Error ->"+response.status);
                    }else if(response.status==200){
                        console.log("Correct Apikey."+response.status);
                    }else if(response.status==401){
                        console.log("Empty Apikey. Error ->"+response.status);
                    }
                
                });
         }
                  $scope.editCountry=function(){
                $http.put($scope.url+"/"+$routeParams.country+"?apikey=sos161701",$scope.updateCountry)
                .then(function(){
                     console.log("PUT finished");
                      $scope.refresh();
                },function error(response){
                    if(response.apikey!=$scope.apikey & response.status==403){
                        console.log("Incorrect apikey. Error ->"+response.status);
                    }else if(response.status==200){
                        console.log("Correct Apikey."+response.status);
                    }else if(response.status==401){
                        console.log("Empty Apikey. Error ->"+response.status);
                    }
                
                });

        };
        refresh();
         
}]);
    