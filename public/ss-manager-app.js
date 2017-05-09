angular.module("SSApp",["ngRoute"]).config(function($routeProvider){
    $routeProvider
    .when("/", {
      templateUrl : "/SS/list_ss.html",
      controller: "ListController"
  })
  
  .when("/edit", {
      templateUrl : "/SS/edit_ss.html",
      controller: "EditController"
  })
  .when("/:country", {
      templateUrl : "/SS/country-ss.html",
      controller: "CountryController"
  })
  .when("/analytics/irene", {
      templateUrl : "/SS/chart.html",
      controller: "ChartCtrl"
      
  });
});