angular
    .module("YUSManagerApp")
    .controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("Controller initialized");
        $scope.url = "/api/v2/youthunemploymentstats";
        $scope.offset = 0;
        $scope.refresh = function() {
            $http
                .get($scope.url + "?apikey=" + $scope.apikey)
                .then(function(response) {
                    console.log("Data received:" + JSON.stringify(response.data, null, 2));
                    $scope.countries = response.data;
                }, function error(response) {
                    if (response.apikey != $scope.apikey & response.status == 403) {
                        console.log("Incorrect apikey. Error ->" + response.status);
                    }
                    else if (response.status == 200) {
                        console.log("Correct Apikey." + response.status);
                    }
                    else if (response.status == 401) {
                        console.log("Empty Apikey. Error ->" + response.status);
                    }

                });
        };



        $scope.loadinitial = function() {
            $http
                .get($scope.url + "/loadInitialData?apikey=" + $scope.apikey)
                .then(function(response) {
                    console.log("LOADINITIAL 200 ok");
                    $scope.refresh();
                }, function error(response) {
                    if (response.apikey != $scope.apikey & response.status == 403) {
                        console.log("Incorrect apikey. Error ->" + response.status);
                    }
                    else if (response.status == 200) {
                        console.log("Correct Apikey." + response.status);
                    }
                    else if (response.status == 401) {
                        console.log("Empty Apikey. Error ->" + response.status);
                    }

                });
        };



        $scope.siguiente = function() {
            $scope.offset = $scope.offset + 1;

            $scope.paginacion();
        };
        $scope.anterior = function() {
            if($scope.offset>0){
            $scope.offset = $scope.offset - 1;
            }
            $scope.paginacion();
        };


        $scope.paginacion = function() {
            $scope.countries = {};

            $http
                .get($scope.url + "?apikey=" + $scope.apikey + "&from=10&to=10000&limit=" + $scope.limit + "&offset=" + $scope.offset)
                .then(function(response) {
                    console.log("offset" + $scope.offset);
                    console.log("limit" + $scope.limit);
                    $scope.countries = response.data;
                    console.log("GET 200 ok");
                }, function error(response) {
                    if (response.apikey != $scope.apikey & response.status == 403) {
                        console.log("Incorrect apikey. Error ->" + response.status);
                    }
                    else if (response.status == 200) {
                        console.log("Correct Apikey." + response.status);
                    }
                    else if (response.status == 401) {
                        console.log("Empty Apikey. Error ->" + response.status);
                    }

                });
        };

        $scope.busqueda = function() {

            $http
                .get($scope.url + "/?apikey=" + $scope.apikey + "&from=" + $scope.from + "&to=" + $scope.to)
                .then(function(response) {

                    $scope.countries = response.data;
                    console.log("SEARCH 200 ok");

                });
        };

        $scope.addCountry = function() {
            $http.post($scope.url + "?apikey=" + $scope.apikey, $scope.newCountry).then(function(response) {
                console.log("post finished");
                $scope.refresh();
            }, function error(response) {
                if (response.apikey != $scope.apikey & response.status == 403) {
                    console.log("Incorrect apikey. Error ->" + response.status);
                }
                else if (response.status == 200) {
                    console.log("Correct Apikey." + response.status);
                }
                else if (response.status == 401) {
                    console.log("Empty Apikey. Error ->" + response.status);
                }

            });


        };

        $scope.deleteCountry = function(country) {
            $http.delete($scope.url + "/" + country + "?apikey=" + $scope.apikey)
                .then(function(response) {
                    console.log("DELETE ONE 200 ok");
                    $scope.refresh();
                }, function error(response) {
                    if (response.apikey != $scope.apikey & response.status == 403) {
                        console.log("Incorrect apikey. Error ->" + response.status);
                    }
                    else if (response.status == 200) {
                        console.log("Correct Apikey." + response.status);
                    }
                    else if (response.status == 401) {
                        console.log("Empty Apikey. Error ->" + response.status);
                    }

                });

        };
        $scope.removeAll = function() {
            $http.delete($scope.url + "?apikey=" + $scope.apikey)
                .then(function() {
                    console.log("REMOVE All 200 ok");
                    $scope.refresh();
                    $scope.countries = {};
                    $scope.refresh();

                }, function error(response) {
                    if (response.apikey != $scope.apikey & response.status == 403) {
                        console.log("Incorrect apikey. Error ->" + response.status);
                    }
                    else if (response.status == 200) {
                        console.log("Correct Apikey." + response.status);
                    }
                    else if (response.status == 401) {
                        console.log("Empty Apikey. Error ->" + response.status);
                    }

                });
        };


    }]);
