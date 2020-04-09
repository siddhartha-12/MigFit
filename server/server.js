'use strict';
const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      port = process.env.port || 3030;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//define http header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Request-With, Content-Type, Accept, Authorization");
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, DELETE, PUT, PATCH, OPTIONS");
    next();
});

// mongoose instance connection url connection
mongoose.connect('mongodb://localhost:27017/final_project_evolution', {})
    .then(() => {
        console.log('Connect to database');
    })
    .catch(() => {
        console.log('Connect failed');
    });
mongoose.Promise = global.Promise;

const initApp = require('./app/app');
initApp(app);

app.listen(port);
console.log('server started on: ' + port);