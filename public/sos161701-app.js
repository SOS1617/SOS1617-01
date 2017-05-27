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
   .when("/integrations/bea", {
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
   })

   .when("/integrations/corsBea",{
    templateUrl:"/GVG/cors.html",
    controller:"corsCtrl"
    
  })
  .when("/integrations/proxyBea",{
   templateUrl:"/GVG/proxyBea.html",
   controller:"proxyCtrl"
  })

   
   .when("/corsirene",{
      templateUrl : "/SS/corsirene.html",
      controller: "CorsIreneCtrl"
   })

   .when("/proxyirene",{
      templateUrl : "/SS/proxyirene.html",
      controller: "ProxyIreneCtrl"

   }).when("/proxyAlb",{
     templateUrl:"/YUS/proxyalb.html",
     controller:"proxyCtrlalb"
     
  }).when("/corsAlb",{
     templateUrl:"/YUS/corsalb.html",
     controller:"CorsCtrlalb"
  });
  
  console.log("App initialized");
 });