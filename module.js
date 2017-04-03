var exports=module.exports={};

var apikey="sos161701";

exports.ApikeyFunction = function(req,resp){
       if(!req.query.apikey){
        console.log("Apikey is empty");
        resp.sendStatus(401);
        return false;
    }
    if(req.query.apikey !==apikey){
        console.error("Apikey incorrect!!");
        resp.sendStatus(403);
        return false;
        
    }
    
};