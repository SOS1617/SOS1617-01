var exports=module.exports={};


exports.initial=function(app,dba,BASE_API_PATH,ApikeyFunction){
    
    
    app.get(BASE_API_PATH + "/youthunemploymentstats/loadInitialData", function (request, response) {
    console.log("INFO: New GET request to /youthunemploymentstats when BD is empty");
   
   dba.find({}).toArray(function (err, data) {
    console.log('INFO: Initialiting DB...');

    if (err) {
        console.error('WARNING: Error while getting initial data from DB');
        return 0;
    }


    if (data.length === 0) {
        console.log('INFO: Empty DB, loading initial data');

        var countries = [{
                "country":"germany",
                "year":2017,
                "male_unemployment_ratio":7.3,
                "female_unemployment_ratio":5.5
            },
            {
                "country":"spain",
                "year":2017,
                "male_unemployment_ratio":42.2,
                "female_unemployment_ratio":42.3
            },
            {
                "country":"italy",
                "year":2017,
                "male_unemployment_ratio":35.4,
                "female_unemployment_ratio":40.5
            }];
        dba.insert(countries);
        console.log("DB CREATE ");
    } else {
        console.log('INFO: DB has ' + dba.length + ' countries ');
    }
        response.redirect(301, BASE_API_PATH + "/youthunemploymentstats");

});
   
});


/*
// Base GET
app.get("/", function (request, response) {
    console.log("INFO: Redirecting to /youthunemploymentstats");
    response.redirect(301, BASE_API_PATH + "/youthunemploymentstats");
});
*/

// GET a collection
app.get(BASE_API_PATH + "/youthunemploymentstats", function (request, response) {
    console.log("INFO: New GET request to /youthunemploymentstats");
    dba.find({}).toArray(function (err, contacts) {
        if (err) {
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
        } else {
            console.log("INFO: Sending contacts: " + JSON.stringify(contacts, 2, null));
            response.send(contacts);
        }
    });
});


// GET a single resource
app.get(BASE_API_PATH + "/youthunemploymentstats/:country", function (request, response) {
    var country = request.params.country;
    if (!country) {
        console.log("WARNING: New GET request to /youthunemploymentstats/:country without country, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New GET request to /youthunemploymentstats/" + country);
        dba.find({country:country}).toArray(function (err, paises) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else {
            
                if (paises.length > 0) {
                    var pais = paises[0]; //since we expect to have exactly ONE contact with this name
                    console.log("INFO: Sending contact: " + JSON.stringify(pais, 2, null));
                    response.send(pais);
                } else {
                    console.log("WARNING: There are not any country with name " + country);
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});


//POST over a collection
app.post(BASE_API_PATH + "/youthunemploymentstats", function (request, response) {
    var newData = request.body;
    if (!newData) {
        console.log("WARNING: New POST request to /youthunemploymentstats/ without country, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New POST request to /youthunemploymentstats with body: " + JSON.stringify(newData, 2, null));
        if (!newData.country || !newData.male_unemployment_ratio || !newData.female_unemployment_ratio || !newData.year) {
            console.log("WARNING: The contact " + JSON.stringify(newData, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            dba.find({country:newData.country}).toArray(function (err, paises) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                  
                    if (paises.length > 0) {
                        console.log("WARNING: The contact " + JSON.stringify(newData, 2, null) + " already extis, sending 409...");
                        response.sendStatus(409); // conflict
                    } else {
                        console.log(paises.length);
                        console.log("INFO: Adding contact " + JSON.stringify(newData, 2, null));
                        dba.insert(newData);
                        response.sendStatus(201); // created
                    }
                }
            });
        }
    }
});


//POST over a single resource
app.post(BASE_API_PATH + "/youthunemploymentstats/:country", function (request, response) {
    var country = request.params.country;
    console.log("WARNING: New POST request to /contacts/" + country + ", sending 405...");
    response.sendStatus(405); // method not allowed
});


//PUT over a collection
app.put(BASE_API_PATH + "/youthunemploymentstats", function (request, response) {
    console.log("WARNING: New PUT request to /youthunemploymentstats, sending 405...");
    response.sendStatus(405); // method not allowed
});


//PUT over a single resource
app.put(BASE_API_PATH + "/youthunemploymentstats/:country", function (request, response) {
    var updatedCountry = request.body;
    var country = request.params.country;
    // compare that body has the same country than request
   // var bodyCountry = JSON.parse(updatedCountry).country;

    if (!updatedCountry ) {
        console.log("WARNING: New PUT request to /youthunemploymentstats/ without country, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New PUT request to /youthunemploymentstats/" + country + " with data " + JSON.stringify(updatedCountry, 2, null));
        if (!updatedCountry.country || !updatedCountry.male_unemployment_ratio || !updatedCountry.female_unemployment_ratio || !updatedCountry.year) {
            //console.log("WARNING: The country " + JSON.stringify(updatedCountry, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            
            dba.find({country:updatedCountry.country}).toArray(function (err, paises) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                
                    if (paises.length > 0) {
                        dba.update({country: updatedCountry.country}, updatedCountry);
                        console.log("INFO: Modifying country with name " + country + " with data " + JSON.stringify(updatedCountry, 2, null));
                        response.send(updatedCountry); // return the updated contact
                    } else {
                        console.log("WARNING: There are not any country with name " + country);
                        response.sendStatus(404); // not found
                    }
                }
            });
        }
    }
});


//DELETE over a collection
app.delete(BASE_API_PATH + "/youthunemploymentstats", function (request, response) {
    console.log("INFO: New DELETE request to /youthunemploymentstats");
    dba.remove({}, function (err, result) {
        var numRemoved = JSON.parse(result);

        if (err) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        } else {
            if (numRemoved.n > 0) {
                console.log("INFO: All the countries (" + numRemoved + ") have been succesfully deleted, sending 204...");
                response.sendStatus(204); // no content
            } else {
                console.log("WARNING: There are no countries to delete");
                response.sendStatus(404); // not found
            }
        }
    });
});


//DELETE over a single resource
app.delete(BASE_API_PATH + "/youthunemploymentstats/:country", function (request, response) {
    var country = request.params.country;
    if (!country) {
        console.log("WARNING: New DELETE request to /youthunemploymentstats/:country without country, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New DELETE request to /youthunemploymentstats/" + country);
        dba.remove({country: country}, function (err, result) {
                    var numRemoved = JSON.parse(result);

            if (err) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            } else {
                console.log("INFO: country removed: " + numRemoved);
                if (numRemoved.n ===1) {
                    console.log("INFO: The country with name " + country + " has been succesfully deleted, sending 204...");
                    response.sendStatus(204); // no content
                } else {
                    console.log("WARNING: There are no countries to delete");
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});

    
    
}