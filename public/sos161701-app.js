angular.module("Sos161701App",["ngRoute"])
.config(function($routeProvider){
 
 $routeProvider
 .when("/",{
  
  templateUrl:"/GVG/lista.html",
  controller:"ListCtrl"
 })
 .when("/gvg/:country",{
  templateUrl:"/GVG/edit.html",
  controller:"EditCtrl"
 })
 .when("/analyticsBea",{
  templateUrl:"/GVG/chart.html",
  controller:"lisChartCtrl"
  
 });
 console.log("App initialized");
});