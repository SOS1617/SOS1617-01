angular.module("Sos161701App",["ngRoute"])
.config(function($routeProvider){
 
 $routeProvider
 .when("/",{
  
  templateUrl:"index.html",

 })
 .when("/analytics",{
  templateUrl:"analytics.html"
 })
 .when("/gvg",{
  
  templateUrl:"/GVG/lista.html",
  controller:"ListCtrl"
 })
 .when("/GVG/gvgChart",{
  templateUrl:"/GVG/chart.html",
  controller:"lisChartCtrl"
 })
 .when("/gvg/:country",{
  templateUrl:"/GVG/edit.html",
  controller:"EditCtrl"
 });

 
 console.log("App initialized");
});