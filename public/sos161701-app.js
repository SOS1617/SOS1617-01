angular.module("Sos161701App", ["ngRoute"])
 .config(function($routeProvider) {

  $routeProvider
  
  //TODOS
   .when("/", {
    templateUrl: "readme.html"
   })
    .when("/governance",{
   templateUrl:"governance.html"
  })
   .when("/analytics", {
    templateUrl: "analytics.html"
   })
   .when("/integrations",{
    templateUrl:"integrations.html"
   })
   .when("/about",{
    templateUrl:"/videos.thml"
   })
   .when("/analytics/group",{
    templateUrl:"/group.html",
    controller: "groupCtrl"
   })
   .when("/about",{
     templateUrl:"about.html"
   })
   
   
   
   //ALBERTO
   .when("/analytics/alberto", {
    templateUrl: "/YUS/chartalberto.html",
    controller: "lisChartCtrlYUS"

   })
   .when("/yuscountries", {
    templateUrl: "/YUS/listyus.html",
    controller: "ListCtrlyus"
   })
   .when("/yuscountries/:country", {
    templateUrl: "/YUS/edityus.html",
    controller: "EditCtrlyus"
   })
   
   .when("/integrations/proxyAlb",{
     templateUrl:"/YUS/proxyalb.html",
     controller:"proxyCtrlalb"
     
  })
  .when("/integrations/corsAlb",{
     templateUrl:"/YUS/corsalb.html",
     controller:"CorsCtrlalb"
  })
  .when("/integrations/netflix",{
     templateUrl:"/YUS/chartnet.html",
     controller:"netCtrlalb"
  })
   .when("/integrations/quandl",{
     templateUrl:"/YUS/chartwb.html",
     controller:"wbCtrlalb"
  })
 
  
  //IRENE
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
   .when("/integrations/corsirene",{
      templateUrl : "/SS/corsirene.html",
      controller: "CorsIreneCtrl"
   })

   .when("/integrations/proxyirene",{
      templateUrl : "/SS/proxyirene.html",
      controller: "ProxyIreneCtrl"
  })
  .when("/integrations/linkedin",{
   templateUrl:"/SS/linkedin.html",
   controller:"LinkedinCtrl"
  })
  .when("/integrations/github",{
   templateUrl:"/SS/github.html",
   controller:"GithubCtrl"
  })
  
  //BEA
  
  .when("/integrations/nasa",{
   templateUrl:"/GVG/nasa.html",
   controller:"nasaCtrl"
  })
  .when("/integrations/iata",{
   templateUrl:"/GVG/iata.html",
   controller:"iataCtrl"
  })

   .when("/analytics/bea", {
    templateUrl: "/GVG/chart.html",
    controller: "lisChartCtrl"
   })
  .when("/integrations/proxyBea",{
   templateUrl:"/GVG/proxyBea.html",
   controller:"proxyCtrl"
  })
.when("/integrations/corsBea",{
    templateUrl:"/GVG/cors.html",
    controller:"corsCtrl"
    
  })
  .when("/gvg", {
    templateUrl: "/GVG/lista.html",
    controller: "ListCtrl"
   })
   .when("/gvg/:country", {
    templateUrl: "/GVG/edit.html",
    controller: "EditCtrl"
   })
  ;
  
  console.log("App initialized");
 });