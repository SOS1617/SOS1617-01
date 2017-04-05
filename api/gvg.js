var exports=module.exports={};



exports.initial=function(app,db,BASE_API_PATH,ApikeyFunction){
    
//LOADINITIALDATA
    app.get(BASE_API_PATH + "/gvg/loadInitialData/", function (request, response) {
    console.log("INFO: New GET request to /gvg when BD is empty");
   
   if(!ApikeyFunction(request,response))return;
   
   db.find({}).toArray(function (err, gvg) {
    console.log('INFO: Initialiting DB...');

    if (err) {
        console.error('WARNING: Error while getting initial data from DB');
        return 0;
    }
  
    if (gvg.length === 0) {
        console.log('INFO: Empty DB, loading initial data');

        var countries = [{
               
                "country":"Alemania",
                "year":"2016",
                "income_million":"4000",
                "income_ratio":"8.5"
            },
            {
               
                "country":"Reino Unido",
                "year":"2016",
                "income_million":"3800",
                "income_ratio":"8.5"
            },
            {
           
                "country":"Francia",
                "year":"2016",
                "income_million":"2700",
                "income_ratio":"8.5"
            },
            {
                
                "country":"Asia",
                "year":"2016",
                "income_million":"46600",
                "income_ratio":"10.7"
            },
            {
               
                "country":"Africa",
                "year":"2016",
                "income_million":"3200",
                "income_ratio":"26.2"
            },
            {
              
                "country":"LatinoAmerica",
                "year":"2016",
                "income_million":"4100",
                "income_ratio":"20.1"
            }];
        db.insert(countries);
        console.log("DB CREATE ");
        response.sendStatus(201);
    } else {
        console.log('INFO: DB has ' + gvg.length + ' countries ');
    }
});
   
});

// GET a collection

app.get(BASE_API_PATH + "/gvg", function (request, response) {
    if (!ApikeyFunction(request, response)) return;
    
    console.log("INFO: New GET request to /gvg");
           var limit = parseInt(request.query.limit);
          var offset = parseInt(request.query.offset);

            var from = parseInt(request.query.from);
            var to = parseInt(request.query.to);
            var c = [];
            var c2=[];
            if (limit>0 && offset>=0) {
             //  
                db.find({}).toArray(function(err, gvg) {    
               
                    if (err) {
                        console.error('ERROR from database');
                        response.sendStatus(500); // internal server error
                    }else {
                        if (gvg.length === 0) {
                            response.sendStatus(404);

                        }
                      
                       if (from && to) {

                           c = search(gvg, c, from, to);
                            if (c.length > 0) {
                                c2=c.slice(offset,offset+limit);
                                response.send(c2);
                            }
                            else {
                                response.sendStatus(404); 
                            }
                       }else {
                            response.send(gvg);
                          console.log("INFO: Sending results: " + JSON.stringify(gvg, 2, null));

                      }
                    }
                });
            } else {

                db.find({}).toArray(function(err, gvg) {
                    if (err) {
                        console.error('ERROR from database');
                        response.sendStatus(500); // internal server error
                    }
                    else {
                        if (gvg.length === 0) {
                            response.sendStatus(404);
                        }
                        if (from && to) {

                            c = search(gvg, c, from, to);
                            if (c.length > 0) {
                                response.send(c);
                             console.log("INFO: Sending results with from and to but without limit and offset: " + JSON.stringify(gvg, 2, null));

                            }
                            else {
                                response.sendStatus(404);
                            }
                        }
                        else {
                            response.send(gvg);
                            console.log("INFO: Sending gvg: " + JSON.stringify(gvg, 2, null));

                        }
                    }
                });
            }
});


// GET a single resource 
app.get(BASE_API_PATH + "/gvg/:country", function (request, response) {
    var country = request.params.country;
  if(!ApikeyFunction(request,response))return;
    if (!country) {
        console.log("WARNING: New GET request to /gvg/:country without country, sending 400...");
        response.sendStatus(400); // bad request
    } else{
               console.log("INFO: New GET request to /gvg/" + country);
        db.find({"country":country}).toArray(function (err, filteredCountries) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else {
                
                if (filteredCountries.length > 0) {
                    var country = filteredCountries[0]; //since we expect to have exactly ONE contact with this name
                    console.log("INFO: Sending country: " + JSON.stringify(country, 2, null));
                    response.send(country);
                } else {
                    console.log("WARNING: There are not any country with name " + country);
                    response.sendStatus(404); // not found
                }
            }
        });
        
    }
});


//POST over a collection
app.post(BASE_API_PATH + "/gvg", function (request, response) {
    var newData = request.body;
    if(!ApikeyFunction(request,response))return;
    if (!newData) {
        console.log("WARNING: New POST request to /gvg/ without country, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New POST request to /gvg with body: " + JSON.stringify(newData, 2, null));
        if (!newData.country || !newData.year || !newData.income_million || !newData.income_ratio) {
            console.log("WARNING: The country " + JSON.stringify(newData, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            db.find({country:newData.country}).toArray(function (err, count) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                  
                    if (count.length > 0) {
                        console.log("WARNING: The country " + JSON.stringify(newData, 2, null) + " already extis, sending 409...");
                        response.sendStatus(409); // conflict
                    } else {
                        console.log("INFO: Adding country" + JSON.stringify(newData, 2, null));
                        db.insert(newData);
                        response.sendStatus(201); // created
                    }
                }
            });
        }
    }
});


//POST over a single resource
app.post(BASE_API_PATH + "/gvg/:country", function (request, response) {
    if(!ApikeyFunction(request,response))return;
    var country = request.params.country;
    console.log("WARNING: New POST request to /gvg/" + country + ", sending 405...");
    response.sendStatus(405); // method not allowed
});


//PUT over a collection
app.put(BASE_API_PATH + "/gvg", function (request, response) {
    if(!ApikeyFunction(request,response))return;
    console.log("WARNING: New PUT request to /gvg, sending 405...");
    response.sendStatus(405); // method not allowed
});

//PUT over a single resource
app.put(BASE_API_PATH + "/gvg/:country", function (request, response) {
    if (!ApikeyFunction(request, response)) return;
    var updatedCountry = request.body;
    var country = request.params.country;
   
    if (!updatedCountry) {
        console.log("WARNING: New PUT request to /gvg/ without countries, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New PUT request to /gvg/" + country + " with data " + JSON.stringify(updatedCountry, 2, null));
        if (!updatedCountry.country || !updatedCountry.year || !updatedCountry.income_million || !updatedCountry.income_ratio ) { //keep an eye on this
            console.log("WARNING: The gvg " + JSON.stringify(updatedCountry, 2, null) + " is not well-formed, sending 400...");
            response.sendStatus(400); // bad request
        } else {
            db.find({country:updatedCountry.country}).toArray(function (err, gvg) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else if (gvg.length > 0) {
                        db.update({country: updatedCountry.country}, updatedCountry);
                        console.log("INFO: Modifying gvg with country " + country + " with data " + JSON.stringify(updatedCountry, 2, null));
                        response.send(updatedCountry); // return the updated contact
                    } else {
                        console.log("WARNING: There are not any gvg with country " + country);
                        response.sendStatus(404); // not found
                    }
                }
            )}
        }
    });


//DELETE over a collection
app.delete(BASE_API_PATH + "/gvg", function (request, response) {
    if(!ApikeyFunction(request,response))return;
    console.log("INFO: New DELETE request to /gvg");
    db.remove({}, {multi: true}, function (err, result) {
        var numRemoved = JSON.parse(result);
        if (err) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        } else {
            if (numRemoved.n > 0) {
                console.log("INFO: All countries (" + numRemoved + ") have been succesfully deleted, sending 204...");
                response.sendStatus(204); // no content
            } else {
                console.log("WARNING: There are no countries to delete");
                response.sendStatus(404); // not found
            }
               
        }
       
    });
});


//DELETE over a single resource
app.delete(BASE_API_PATH + "/gvg/:country", function (request, response) {
    if(!ApikeyFunction(request,response))return;
    var country = request.params.country;
    if (!country) {
        console.log("WARNING: New DELETE request to /gvg/:country without name, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New DELETE request to /gvg/" + country);
        db.deleteOne({country: country}, function (err, result) {
            var numRemoved = JSON.parse(result);
            if (err) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            } else {
                console.log("INFO: Countries removed: " + numRemoved);
                if (numRemoved.n ===1) {
                    console.log("INFO: The country with name " + country + " has been succesfully deleted, sending 204...");
                    response.sendStatus(204); // no content
                } else {
                    console.log("WARNING: There are no countries to delete");
                    response.sendStatus(404); // not found
                    console.log("Contenido de numRemoved"+numRemoved);
                }
            }
        });
    }
});


};

var search = function(recurso, conj, f,t) {
    
    var from = parseInt(f);
    var to = parseInt(t);

    for (var j = 0; j < recurso.length; j++) {
    
                if(recurso[j].income_million>=from &&recurso[j].income_million<=to){
                   
                     conj.push(recurso[j]);
             
                }
    }

    return conj;
};
