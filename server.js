const express = require('express');
const app = express();
const url = require('url');
const https = require('https');
const { MongoClient } = require('mongodb');

const rapidAPIBaseUrl = "https://rapidapi.p.rapidapi.com/json/?ip=";

app.listen(4000, function () {
    initialize();
    console.log('Listening on 4000');
});

function initialize() {
    const uri = "mongodb://root:passw0rd@192.168.1.110:27017";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    var result = client.connect(err => {
        if (err) {
            console.log("error");
            console.log(err);
            client.close();
        }
    });

    console.log("Connected to db!");
    const employees = client.db("test").collection("employees");
    app.get('/employees', function (req, res) {
        console.log("in GET /employees");
        handleShow(res, employees);
    });

    // console.log(client);
}

/* function to handle show*/
function handleShow(res, db) {
    //db.collection('geolocation').find({},{projection:{_id:0}}).toArray()
    db.find({}, { projection: { _id: 0 } }).toArray()
        .then(results => {
            // set the header and status
            res.setHeader('content-type', 'Application/json');
            res.statusCode = 200;
            // create an array from the map 
            res.send(JSON.stringify(results));
        })
        .catch(error => console.error(error));
}
