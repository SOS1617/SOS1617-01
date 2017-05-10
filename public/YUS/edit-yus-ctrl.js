angular
    .module("Sos161701App")
    .controller("EditCtrlyus",["$scope","$http","$routeParams",function ($scope,$http,$routeParams){
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

              });
         }
                  $scope.editCountry=function(){
                $http.put($scope.url+"/"+$routeParams.country+"?apikey=sos161701",$scope.updateCountry)
                .then(function(){
                    console.log("PUT finished");
                    sweetAlert("Updated Data");
                    $scope.refresh();
                });

        };
        refresh();
         
}]);
    