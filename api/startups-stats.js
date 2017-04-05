var exports=module.exports={};

exports.initial=function(app,db2,BASE_API_PATH,ApikeyFunction){
    
//GET/LoadInititalData


app.get(BASE_API_PATH + "/startups-stats/loadInitialData", function (request, response) {
    if(!ApikeyFunction(request,response))return;
    console.log("INFO: New GET request to /startups-stats when BD is empty");
    db2.find({}).toArray(function (err, datas) { //Callback que devuelve todos los contactos
    console.log('INFO: Initialiting DB...');

    if (err) {
        console.error('WARNING: Error while getting initial data from DB');
        return 0;
    }


    if (datas.length === 0) {
        console.log('INFO: Empty DB, loading initial data');

        var datasD = [{
                "country": "Spain",
                "year": "2016",
                "total": "2663",
                "increase": "1%",
                "investment": "568 millions"
            },
            {
                "country": "Germany",
                "year": "2015",
                "total": "2551",
                "increase": "26%",
                "investment": "659,4 millions"
            },
            {
                "country": "France",
                "year": "2014",
                "total": "1224",
                "increase": "17%",
                "investment": "89 millions"
            },
            {
                "country": "Italy",
                "year": "2016",
                "total": "2420",
                "increase": "24%",
                "investment": "182 millions"
            }];
        db2.insert(datasD);  //Mete un array o un objeto dentro de la base de datos
        response.sendStatus(201);
    } else {
        console.log('INFO: DB has ' + datas.length + ' datas ');
    }
});
});

// Base GET
/*app.get("/", function (request, response) {
    console.log("INFO: Redirecting to /startups-stats");
    response.redirect(301, BASE_API_PATH + "/startups-stats");
});*/



// GET a collection
app.get(BASE_API_PATH + "/startups-stats", function (request, response) {
    if (!ApikeyFunction(request, response)) return;
    
    var limit = parseInt(request.query.limit);
    var offset = parseInt(request.query.offset);
    var from = parseInt(request.query.from);
    var to = parseInt(request.query.to);
    var c = [];
    var c2=[];
    if (limit && offset>=0) {
        db2.find({}).toArray(function(err, ss) {    
            if (err) {
                console.error('ERROR from database');
                response.sendStatus(500); // internal server error
            }else {
                if (ss.length === 0) {
                    response.sendStatus(404);
                }
                if (from && to) {
                    c = search(ss, c, from, to);
                        if (c.length > 0) {
                            c2=c.slice(offset,offset+limit);
                            response.send(c2);
                        }
                        else {
                            response.sendStatus(404); 
                        }
                        }else {
                            response.send(ss);
                            console.log("INFO: Sending results: " + JSON.stringify(ss, 2, null));
                        }
                    }
                });
                
            } else {
                db2.find({}).toArray(function(err, ss) {
                    if (err) {
                        console.error('ERROR from database');
                        response.sendStatus(500); // internal server error
                    }
                    else{
                        if (ss.length === 0) {
                            response.sendStatus(404);
                        }
                        if (from && to) {
                            c = search(ss, c, from, to);
                            if (c.length > 0) {
                            response.send(c);
                            console.log("INFO: Sending results with from and to but without limit and offset: " + JSON.stringify(ss, 2, null));
                            }
                            else {
                                response.sendStatus(404);
                            }
                        }
                        else {
                            response.send(ss);
                            console.log("INFO: Sending gvg: " + JSON.stringify(ss, 2, null));

                        }
                    }
                });
            }
});


// GET a single resource
app.get(BASE_API_PATH + "/startups-stats/:country", function (request, response) {
    if(!ApikeyFunction(request,response))return;
    var countryP = request.params.country;
    if (!countryP) {
        console.log("WARNING: New GET request to /startups-stats/:country without country, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New GET request to /startups-stats/" + countryP);
        db2.find({country : countryP}).toArray(function (err, filteredDatas) {   //Busca todos los elementos que cumplan determinados criterios (colocados en {}), en este caso todos.
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else {
                
                if (filteredDatas.length > 0) {
                    var data = filteredDatas[0]; //since we expect to have exactly ONE contact with this name
                    console.log("INFO: Sending datas: " + JSON.stringify(data, 2, null));
                    response.send(data);
                } else {
                    console.log("WARNING: There are not any data with country " + countryP);
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});


//POST over a collection
app.post(BASE_API_PATH + "/startups-stats", function (request, response) {
    if(!ApikeyFunction(request,response))return;
    var newData = request.body;
    if (!newData) {
        console.log("WARNING: New POST request to /startups-stats/ without datas, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New POST request to /contacts with body: " + JSON.stringify(newData, 2, null));
        if (!newData.country || !newData.year || !newData.total || !newData.increase || !newData.investment) {
            console.log("WARNING: The contact " + JSON.stringify(newData, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            db2.find({country:newData.country}).toArray(function (err, datas) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    //var countriesBeforeInsertion = datas.filter((contact) => {
                     //   return (contact.country.localeCompare(newData.country, "en", {'sensitivity': 'base'}) === 0);
                    //});
                    if (datas.length > 0) {
                        console.log("WARNING: The data " + JSON.stringify(newData, 2, null) + " already extis, sending 409...");
                        response.sendStatus(409); // conflict
                    } else {
                        console.log("INFO: Adding data " + JSON.stringify(newData, 2, null));
                        db2.insert(newData);
                        response.sendStatus(201); // created
                    }
                }
            });
        }
    }
});


//POST over a single resource
app.post(BASE_API_PATH + "/startups-stats/:country", function (request, response) {
    if(!ApikeyFunction(request,response))return;
    var country = request.params.country;
    console.log("WARNING: New POST request to /country/" + country + ", sending 405...");
    response.sendStatus(405); // method not allowed
});


//PUT over a collection
app.put(BASE_API_PATH + "/startups-stats", function (request, response) {
    if(!ApikeyFunction(request,response))return;
    console.log("WARNING: New PUT request to /contacts, sending 405...");
    response.sendStatus(405); // method not allowed
});


//PUT over a single resource

app.put(BASE_API_PATH + "/startups-stats/:country", function (request, response) {
    if(!ApikeyFunction(request,response))return;
    var updatedData = request.body;
    var country = request.params.country;
    if (!updatedData || (updatedData.country != country)) {
        console.log("WARNING: New PUT request to /startups-stats/ without data, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New PUT request to /startups-stats/" + country + " with data " + JSON.stringify(updatedData, 2, null));
        if (!updatedData.country || !updatedData.year || !updatedData.total || !updatedData.increase || !updatedData.investment) {
            console.log("WARNING: The contact " + JSON.stringify(updatedData, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            db2.find({}).toArray( function (err, datas) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    var contactsBeforeInsertion = datas.filter((data) => {
                        return (data.country.localeCompare(country, "en", {'sensitivity': 'base'}) === 0);
                       
                    });
                    if (contactsBeforeInsertion.length > 0) {
                        db2.update({country: country}, updatedData);
                        console.log("INFO: Modifying contact with name " + country + " with data " + JSON.stringify(updatedData, 2, null));
                        response.send(updatedData); // return the updated contact
                    //    response.sendStatus(200);
                    } else {
                        console.log("WARNING: There are not any contact with name " + country);
                        response.sendStatus(404); // not found
                    }
                }
            });
        }
    }
});


//DELETE over a collection
app.delete(BASE_API_PATH + "/startups-stats", function (request, response) {
    if(!ApikeyFunction(request,response))return;
    console.log("INFO: New DELETE request to /startups-stats");
    db2.remove({}, {multi: true}, function (err, numRemoved) {
        var num = JSON.parse(numRemoved);
        if (err) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        } else {
            if (num.n > 0) {
                console.log("INFO: All the datas (" + numRemoved + ") have been succesfully deleted, sending 204...");
                response.sendStatus(204); // no content
            } else {
                console.log("WARNING: There are no datas to delete");
                response.sendStatus(404); // not found
            }
        }
    });
});


//DELETE over a single resource
app.delete(BASE_API_PATH + "/startups-stats/:country", function (request, response) {
    if(!ApikeyFunction(request,response))return;
    var country = request.params.country;
    console.log(request.params.country);
    if (!country) {
        console.log("WARNING: New DELETE request to /startups-stats/:country without country, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New DELETE request to /startups-stats/" + country);
        db2.deleteOne({country: country}, function (err, result) {
            var numRemoved = JSON.parse(result);
            if (err) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            } else {
                console.log("INFO: Datas removed: " + numRemoved.n);
                if (numRemoved.n > 0) {
                    console.log("INFO: The data with country " + country + " has been succesfully deleted, sending 204...");
                    response.sendStatus(204); // no content
                } else {
                    console.log("WARNING: There are no country to delete");
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});

    
}

var search = function(recurso, conj, f,t) {

    var from = parseInt(f);
    var to = parseInt(t);


    for (var j = 0; j < recurso.length; j++) {
        var valor = recurso[j].total;
        if (to >= valor && from <= valor) {

            conj.push(recurso[j]);
        }
    }

    return conj;

};