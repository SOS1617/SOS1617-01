var express = require("express");
var time = require('time');
var port = (process.env.PORT || 17256);
var app = express();
var t = new time.Date();


app.get("/",(req,res) => {
res.send("<html> <body>Servidor del Grupo SOS1617-01 </body> </html")    
    
    
});

app.get("/time", (request,response)=>{
    var day = t.getDate();
    var month = months();
    var year = t.getFullYear();
    var hour= t.getHours();
    var min = t.getMinutes();
    var sec = t.getSeconds();
    
    response.send(day+"--"+month+" of "+year+",  "+hour+":"+min+":"+sec);
    
    
    });
app.listen(port,(err)=>{
    if(!err)
    console.log("Server on port ->"+port);
    else
    console.log("ERROR initializing server on port ->"+port+" : "+err);
});

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