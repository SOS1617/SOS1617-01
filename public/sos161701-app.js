angular.module("Sos161701App",["ngRoute"])
.config(function($routeProvider){
 
 $routeProvider
 .when("/",{
  
  templateUrl:"/lista.html",
  controller:"ListCtrl"
 })
 .when("/gvg/:country",{
  templateUrl:"/edit.html",
  controller:"EditCtrl"
 });
 console.log("App initialized");
});