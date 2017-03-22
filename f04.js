"use strict";
/* global __dirname */

var express = require("express");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var path = require('path');
var DataStore = require('nedb');
var MongoClient=require("mongodb").MongoClient;

var mdbURL="mongodb://bearuirei2:us33ak7x@ds137360.mlab.com:37360/sos161701";


var port = (process.env.PORT || 10000);
var BASE_API_PATH = "/api/v1";

var db;
var db2;
//var dbFileName = path.join(__dirname, 'gvg.db');
MongoClient.connect(mdbURL,{native_parser:true},function(err,database){
    
    if(err){
        console.log(err);
        process.exit("CONECTION DB FAILED"+err);
    }
       db= database.collection("gvg");
       db2 = database.collection("startups-stats");
       app.listen(port,()=>{
           console.log("Magic is happening on port " + port);
       });

    
});



var app = express();
app.use("/api/v1",express.static(path.join('SOS1617-01')));
app.use(bodyParser.json()); //use default json enconding/decoding
app.use(helmet()); //improve security


app.get(BASE_API_PATH + "/gvg/loadInitialData", function (request, response) {
    console.log("INFO: New GET request to /gvg when BD is empty");
   
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
    } else {
        console.log('INFO: DB has ' + gvg.length + ' countries ');
    }
});
   
});


/*// Base GET
app.get("/", function (request, response) {
    console.log("INFO: Redirecting to /gvg");
    response.redirect(301, BASE_API_PATH + "/gvg");
});
*/

// GET a collection
app.get(BASE_API_PATH + "/gvg", function (request, response) {
    console.log("INFO: New GET request to /gvg");
    db.find({}).toArray(function (err, gvg) {
        if (err) {
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
        } else {
            console.log("INFO: Sending countries: " + JSON.stringify(gvg, 2, null));
            response.send(gvg);
        }
    });
});


// GET a single resource
app.get(BASE_API_PATH + "/gvg/:country", function (request, response) {
    var country = request.params.country;
    if (!country) {
        console.log("WARNING: New GET request to /gvg/:country without country, sending 400...");
        response.sendStatus(400); // bad request
    } else {
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
    var newCountry = request.body;
    if (!newCountry) {
        console.log("WARNING: New POST request to /gvg/ without country, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New POST request to /gvg with body: " + JSON.stringify(newCountry, 2, null));
        if (!newCountry.country || !newCountry.year || !newCountry.income_million||!newCountry.income_ratio) {
            console.log("WARNING: The country " + JSON.stringify(newCountry, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            db.find({}).toArray(function (err, gvg) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    var countriesBeforeInsertion = gvg.filter((countries) => {
                        return (countries.country.localeCompare(newCountry.country, "en", {'sensitivity': 'base'}) === 0);
                    });
                    if (countriesBeforeInsertion.length > 0) {
                        console.log("WARNING: The country " + JSON.stringify(newCountry, 2, null) + " already extis, sending 409...");
                        response.sendStatus(409); // conflict
                    } else {
                        console.log("INFO: Adding country " + JSON.stringify(newCountry, 2, null));
                        db.insert(newCountry);
                        response.sendStatus(201); // created
                    }
                }
            });
        }
    }
});


//POST over a single resource
app.post(BASE_API_PATH + "/gvg/:country", function (request, response) {
    var country = request.params.country;
    console.log("WARNING: New POST request to /gvg/" + country + ", sending 405...");
    response.sendStatus(405); // method not allowed
});


//PUT over a collection
app.put(BASE_API_PATH + "/gvg", function (request, response) {
    console.log("WARNING: New PUT request to /gvg, sending 405...");
    response.sendStatus(405); // method not allowed
});


//PUT over a single resource
app.put(BASE_API_PATH + "/gvg/:country", function (request, response) {
    var updatedCountry = request.body;
    var country = request.params.country;
    if (!updatedCountry) {
        console.log("WARNING: New PUT request to /gvg/ without country, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New PUT request to /gvg/" + country + " with data " + JSON.stringify(updatedCountry, 2, null));
        if (!updatedCountry.country || !updatedCountry.year || !updatedCountry.income_million||!updatedCountry.income_ratio) {
            console.log("WARNING: The country " + JSON.stringify(updatedCountry, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            db.find({}).toArray(function (err, gvg) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    var countriesBeforeInsertion = gvg.filter((countries) => {
                        return (countries.country.localeCompare(country, "en", {'sensitivity': 'base'}) === 0);
                    });
                    if (countriesBeforeInsertion.length > 0) {
                        db.update({country: country}, updatedCountry);
                        console.log("INFO: Modifying country with name " + country + " with data " + JSON.stringify(updatedCountry, 2, null));
                        response.send(updatedCountry); // return the updated contact
                    } else {
                        console.log("WARNING: There are not any country called " + country);
                        response.sendStatus(404); // not found
                    }
                }
            });
        }
    }
});


//DELETE over a collection
app.delete(BASE_API_PATH + "/gvg", function (request, response) {
    console.log("INFO: New DELETE request to /gvg");
    db.drop({}, {multi: true}, function (err, numRemoved) {
        if (err) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        } else {
            if (numRemoved > 0) {
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
    var country = request.params.country;
    if (!country) {
        console.log("WARNING: New DELETE request to /gvg/:country without name, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New DELETE request to /gvg/" + country);
        db.deleteOne({country: country}, function (err, numRemoved) {
            if (err) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            } else {
                console.log("INFO: Countries removed: " + numRemoved);
                if (numRemoved === 1) {
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




app.get(BASE_API_PATH + "/startups-stats/loadInitialData", function (request, response) {
    console.log("INFO: New GET request to /startups-stats when BD is empty");
    db.find({}).toArray(function (err, datas) { //Callback que devuelve todos los contactos
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
                "country": "Spain",
                "year": "2015",
                "total": "2551",
                "increase": "26%",
                "investment": "659,4 millions"
            },
            {
                "country": "Spain",
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
        db.insert(datasD);  //Mete un array o un objeto dentro de la base de datos
    } else {
        console.log('INFO: DB has ' + datas.length + ' datas ');
    }
});
});

/*/ Base GET
app.get("/", function (request, response) {
    console.log("INFO: Redirecting to /startups-stats");
    response.redirect(301, BASE_API_PATH + "/startups-stats");
});
*/

// GET a collection
app.get(BASE_API_PATH + "/startups-stats", function (request, response) {
    console.log("INFO: New GET request to /startups-stats");
    db2.find({}, function (err, datas) { 
        if (err) {
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
        } else {
            console.log("INFO: Sending datas: " + JSON.stringify(datas, 2, null));
            response.send(datas);
        }
    });
});


// GET a single resource
app.get(BASE_API_PATH + "/startups-stats/:country", function (request, response) {
    var countryP = request.params.country;
    if (!countryP) {
        console.log("WARNING: New GET request to /startups-stats/:country without country, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New GET request to /startups-stats/" + countryP);
        db2.find({country : countryP}, function (err, filteredDatas) {   //Busca todos los elementos que cumplan determinados criterios (colocados en {}), en este caso todos.
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else {
                
                if (filteredDatas.length > 0) {
                    var data = filteredDatas[0]; //since we expect to have exactly ONE contact with this name
                    console.log("INFO: Sending datas: " + JSON.stringify(data, 2, null));
                    response.send(data);
                } else {
                    console.log("WARNING: There are not any contact with name " + countryP);
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});


//POST over a collection
app.post(BASE_API_PATH + "/startups-stats", function (request, response) {
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
            db2.find({}, function (err, contacts) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    var contactsBeforeInsertion = contacts.filter((contact) => {
                        return (contact.country.localeCompare(newData.country, "en", {'sensitivity': 'base'}) === 0);
                    });
                    if (contactsBeforeInsertion.length > 0) {
                        console.log("WARNING: The contact " + JSON.stringify(newData, 2, null) + " already extis, sending 409...");
                        response.sendStatus(409); // conflict
                    } else {
                        console.log("INFO: Adding contact " + JSON.stringify(newData, 2, null));
                        db.insert(newData);
                        response.sendStatus(201); // created
                    }
                }
            });
        }
    }
});


//POST over a single resource
app.post(BASE_API_PATH + "/startups-stats/:country", function (request, response) {
    var country = request.params.country;
    console.log("WARNING: New POST request to /contacts/" + country + ", sending 405...");
    response.sendStatus(405); // method not allowed
});


//PUT over a collection
app.put(BASE_API_PATH + "/startups-stats", function (request, response) {
    console.log("WARNING: New PUT request to /contacts, sending 405...");
    response.sendStatus(405); // method not allowed
});


//PUT over a single resource
app.put(BASE_API_PATH + "/startups-stats/:country", function (request, response) {
    var updatedData = request.body;
    var country = request.params.country;
    if (!updatedData) {
        console.log("WARNING: New PUT request to /startups-stats/ without data, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New PUT request to /startups-stats/" + country + " with data " + JSON.stringify(updatedData, 2, null));
        if (!updatedData.country || !updatedData.year || !updatedData.total || !updatedData.increase || !updatedData.investment) {
            console.log("WARNING: The contact " + JSON.stringify(updatedData, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            db2.find({}, function (err, contacts) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    var contactsBeforeInsertion = contacts.filter((contact) => {
                        return (contact.name.localeCompare(country, "en", {'sensitivity': 'base'}) === 0);
                    });
                    if (contactsBeforeInsertion.length > 0) {
                        db2.update({country: country}, updatedData);
                        console.log("INFO: Modifying contact with name " + country + " with data " + JSON.stringify(updatedData, 2, null));
                        response.send(updatedData); // return the updated contact
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
    console.log("INFO: New DELETE request to /startups-stats");
    db2.remove({}, {multi: true}, function (err, numRemoved) {
        if (err) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        } else {
            if (numRemoved > 0) {
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
app.delete(BASE_API_PATH + "/startups-stats/:name", function (request, response) {
    var country = request.params.country;
    if (!country) {
        console.log("WARNING: New DELETE request to /startups-stats/:country without country, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New DELETE request to /startups-statss/" + country);
        db2.remove({country: country}, {}, function (err, numRemoved) {
            if (err) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            } else {
                console.log("INFO: Datas removed: " + numRemoved);
                if (numRemoved === 1) {
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


