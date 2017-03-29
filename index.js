var express = require("express");
var time = require('time');
var path = require("path");

var port = (process.env.PORT || 17256);
var app = express();
var publicFolder = path.join(__dirname,'public');
var t = new time.Date();


//app.use("/",express.static(publicFolder));
app.get("/time", (request,response)=>{
    var day = t.getDate();
    var month = months();
    var year = t.getFullYear();
    var hour= t.getHours();
    var min = t.getMinutes();
    var sec = t.getSeconds();
    var letter = let();
   
    response.send(day+letter+" "+month+" of "+year+", "+hour+":"+min+":"+sec);
    
    });
app.listen(port,()=>{
    console.log("Port"+port+"is open");
}).on('error',(error)=>{
    console.log("Server failed on port"+ port);
});
app.get("/", (request,response)=>{
  
    response.send("<html><body><h2>Prueba a añadir a la URL <font color='red'>/time </font>:D</h2></body></html>");
    
    });

function let(){
    var d = t.getDate();
    var res;
    switch (d) {
        case 1:
            res = "st";
            break;
        case 2:
            res = "nd";
            break;
        case 3:
            res = "rd";
            break;
        default:
            res = "th";
            break;
    }
    return res;
}

function months(){
    var n=t.getMonth();
    var res;
    switch (n) {
        case 0:
            res= "January";
            break;
        case 1:
            res= "February";
            break;
        case 2:
            res= "March";
            break;
        case 3:
            res= "April";
            break;
        case 4:
            res= "May";
            break;
        case 5:
            res= "June";
            break;
        case 6:
            res= "July";
            break;
        case 7:
            res= "August";
            break;
        case 8:
            res= "September";
            break;
        case 9:
            res= "October";
            break;
        case 10:
            res= "November";
            break;
        default:
            res= "December";
    }
    return res;
}
//CODIGO BEA
