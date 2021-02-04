//var mongoose = require('mongoose');
var express = require('express');
var routes = require('./routes/routes');
var bodyParser = require('body-parser');
var config = require('./methods/webConfig.js');
var global = require('./methods/global.js');
var mysql      = require('mysql');

var app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");        
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// settings
app.use(express.static(__dirname + '/media'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());
app.use(routes);

// Server start on port 3333
app.listen(3333, function(){
    console.log('server is running');
});