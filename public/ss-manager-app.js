angular.module("SSApp",["ngRoute"]).config(function($routeProvider){
    $routeProvider
    .when("/", {
      templateUrl : "/list_ss.html",
      controller: "ListController"
  })
  
  .when("/edit", {
      templateUrl : "/edit_ss.html",
      controller: "EditController"
  });
});