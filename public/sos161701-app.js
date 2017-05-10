angular.module("Sos161701App", ["ngRoute"])
 .config(function($routeProvider) {

  $routeProvider
   .when("/", {
    templateUrl: "readme.html"
   })
   .when("/analytics", {
    templateUrl: "analytics.html"
   })
   .when("/analytics/alberto", {
    templateUrl: "/YUS/chartalberto.html",
    controller: "lisChartCtrlYUS"

   })
   .when("/analytics/bea", {
    templateUrl: "/GVG/chart.html",
    controller: "lisChartCtrl"
   })
   .when("/gvg", {
    templateUrl: "/GVG/lista.html",
    controller: "ListCtrl"
   })
   .when("/gvg/:country", {
    templateUrl: "/GVG/edit.html",
    controller: "EditCtrl"
   })
   .when("/yuscountries", {
    templateUrl: "/YUS/listyus.html",
    controller: "ListCtrlyus"
   })
   .when("/yuscountries/:country", {
    templateUrl: "/YUS/edityus.html",
    controller: "EditCtrlyus"
   })
   .when("/ss", {
      templateUrl : "/SS/list_ss.html",
      controller: "ListController"
  })
  
  .when("/ss/edit", {
      templateUrl : "/SS/edit_ss.html",
      controller: "EditController"
  })
  .when("/ss/:country", {
      templateUrl : "/SS/country-ss.html",
      controller: "CountryController"
  })
  .when("/analytics/irene", {
      templateUrl : "/SS/chart.html",
      controller: "ChartCtrl"
   });
  console.log("App initialized");
 });