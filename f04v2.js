


var express = require("express");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var path = require('path');
var cors=require("cors");
var MongoClient=require("mongodb").MongoClient;
var app = express();



var mdbURL="mongodb://bearuirei2:us33ak7x@ds137360.mlab.com:37360/sos161701";
var publicFolder=path.join(__dirname,'public/');

//app.use(cors());  //Permite que de manera externa se pueda acceder a nuestro servidor
//Para poder acceder a otro servidores estos tienen que tener implementado cors

var port = (process.env.PORT || 10000);
var BASE_API_PATH = "/api/v2";
var BASE_API_PATH_2 = "/api/v3";

var db;
var db2;
var dba;

var APIgvg=require("./api/gvg.js");
var APIgvg2=require("./api/gvg2.js");
var APIstartups=require("./api/startups-stats.js");
var APIstartups2=require("./api/startups-stats2.js");
var APIyouthunemploymentstats=require("./api/youthunemploymentstats.js");
var APIyouthunemploymentstats2=require("./api/youthunemploymentstats2.js");

var apikey="sos161701";


var ApikeyFunction = function(request, response) {
    if (!request.query.apikey) {
        console.error('WARNING: apikey is empty!');
        response.sendStatus(401);
        return false;
    }
    if (request.query.apikey !== apikey) {
        console.error('WARNING: Invalid apikey!');
        response.sendStatus(403);
        return false;
    }
    return true;
};

MongoClient.connect(mdbURL,{native_parser:true},function(err,database){
    
    if(err){
        console.log(err);
        process.exit("CONECTION DB FAILED"+err);
    }
       db= database.collection("gvg");
       db2 = database.collection("startups-stats");
       dba = database.collection("youthunemploymentstats");
       
       APIgvg.initial(app, db, BASE_API_PATH, ApikeyFunction);
       APIgvg2.initial(app,db,BASE_API_PATH_2);
       APIstartups.initial(app,db2,BASE_API_PATH,ApikeyFunction);
       APIstartups2.initial(app,db2,BASE_API_PATH_2,ApikeyFunction);
       APIyouthunemploymentstats.initial(app,dba,BASE_API_PATH,ApikeyFunction);
       APIyouthunemploymentstats2.initial(app,dba,BASE_API_PATH_2);


       app.listen(port,()=>{
           console.log("Magic is happening on port " + port);
       });

    
});




app.use("/",express.static(path.join('public')));
app.use(bodyParser.json()); //use default json enconding/decoding
app.use(helmet()); //improve security
app.use(cors());

app.get(BASE_API_PATH+"/test",function(request, response) {
    response.sendfile(publicFolder+"botones.html");
});

app.get(BASE_API_PATH+"/test",function(request, response) {
    response.sendfile(publicFolder+"botones.html");
});

app.get("/proxyirene", (req, res)=>{
    var http = require('http');
    
    var options = {
        host: 'sos1617-09.herokuapp.com',
        path: '/api/v2/internetandphones-stats?apikey=internetstats'
    };
    
    callback = function(response){
        var str = '';
        
        response.on('data',function(chunk){
            str += chunk;
        })
        
        response.on('end', function(){
            res.send(str);
        });
    }
    
    http.request(options,callback).end();
});

    
 app.get("/proxyBea",(req,res)=>{
                 var http=require("http");
                var options={
                    host:"sos1617-07.herokuapp.com",
                    path:'/api/v1/birthRateStats/?apikey=sos07'
                }
            
              callback=function(response){
                  var str='';
                  response.on('data',function(chunk){
                      str+=chunk;
                  });
                  response.on('end',function(){
                     res.send(str);
                  })
              }
              http.request(options,callback).end();
 });
  app.get("/proxyBea2",(req,res)=>{
                 var http=require("http");
                var options={
                    host:"iatacodes.org",
                    path:'/api/v6/countries?api_key=3711a9ff-7117-4305-bb2b-1247730e2b1d'
                }
            
              callback=function(response){
                  var str='';
                  response.on('data',function(chunk){
                      str+=chunk;
                  });
                  response.on('end',function(){
                     res.send(str);
                  })
              }
              http.request(options,callback).end();
 });
 
 app.get("/proxyalb", (req,res) => {
    var http=require('http');
    var options={
        host:'sos1617-03.herokuapp.com',
        path:'/api/v2/earlyleavers/?apikey=apisupersecreta'
    };
    callback = function(response){
       var str ='';
       
       response.on('data',function(chunk){
          str+=chunk; 
       });
       response.on('end', function() {
           res.send(str);
       });
       
    }
    
    http.request(options, callback).end();
});