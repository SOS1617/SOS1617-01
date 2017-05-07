angular.module("YUSManagerApp",["ngRoute"]).config(function ($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl: "/listyus.html",
        controller: "ListCtrl"
    })
    .when("/yuscountries/:country",{
        templateUrl: "/edityus.html",
        controller: "EditCtrl"
    });
});
