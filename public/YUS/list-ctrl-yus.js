angular
    .module("Sos161701App")
    .controller("ListCtrlyus", ["$scope", "$http", function($scope, $http) {
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
                        sweetAlert("Incorrect Apikey!!");
                    }
                    else if (response.status == 200) {
                        console.log("Correct Apikey." + response.status);
                        sweetAlert("Correct Apikey!!");

                    }
                    else if (response.status == 401) {
                        console.log("Empty Apikey. Error ->" + response.status);
                        sweetAlert("Empty Apikey!!");
                    }

                });
        };



        $scope.loadinitial = function() {
            $http
                .get($scope.url + "/loadInitialData?apikey=" + $scope.apikey)
                .then(function(response) {
                    console.log("LOADINITIAL 200 ok");
                    sweetAlert("data load done!!");
                    $scope.refresh();
                }, function error(response) {
                    if (response.apikey != $scope.apikey & response.status == 403) {
                        console.log("Incorrect apikey. Error ->" + response.status);
                        sweetAlert("Incorrect Apikey!!");

                    }
                    else if (response.status == 401) {
                        console.log("Empty Apikey. Error ->" + response.status);
                        sweetAlert("Empty Apikey!!");

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
                    sweetAlert("Pagination done");
                }, function error(response) {
                    if (response.apikey != $scope.apikey & response.status == 403) {
                        console.log("Incorrect apikey. Error ->" + response.status);
                        sweetAlert("Incorrect apikey!!!");
                    }
                    else if (response.status == 401) {
                        console.log("Empty Apikey. Error ->" + response.status);
                        sweetAlert("Empty apikey!!!");

                    }

                });
        };

        $scope.busqueda = function() {

            $scope.countries = {};


            $http
                .get($scope.url + "/?apikey=" + $scope.apikey + "&from=" + $scope.from + "&to=" + $scope.to)
                .then(function(response) {

                    $scope.countries = response.data;
                    console.log("SEARCH 200 ok");
                    sweetAlert("Search done");

                },function error(response) {
                           if(response.status==403){
                             sweetAlert("Incorrect apikey!!!");
                          }else if(response.status==401){
                         sweetAlert("Empty apikey!!!");
                          }else if(response.status==404){
                         sweetAlert("No data found!!!");
                          }
                      });
        };

        $scope.addCountry = function() {
            $http.post($scope.url + "?apikey=" + $scope.apikey, $scope.newCountry).then(function(response) {
                console.log("post finished");
                sweetAlert("POST done");
                $scope.refresh();
            }, function error(response) {
                if (response.apikey != $scope.apikey & response.status == 403) {
                    console.log("Incorrect apikey. Error ->" + response.status);
                    sweetAlert("Incorrect apikey");

                }
                else if (response.status == 401) {
                    console.log("Empty Apikey. Error ->" + response.status);
                    sweetAlert("Empty apikey");
                }
                else if (response.status == 409) {
                    console.log("Data conflict. Error ->" + response.status);
                    sweetAlert("Data already exists");
                }

            });


        };

        $scope.deleteCountry = function(country) {
            $http.delete($scope.url + "/" + country + "?apikey=" + $scope.apikey)
                .then(function(response) {
                    console.log("DELETE ONE 200 ok");
                    sweetAlert("Data deleted!!");
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
                    sweetAlert("All data removed!!");
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
