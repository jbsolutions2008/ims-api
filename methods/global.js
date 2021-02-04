'use strict';
var express = require('express');
var router = express.Router();
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'JBSPortfolio256ctr';
var mysql = require('mysql');
var fs = require("fs");
var multer = require('multer');
var mkdirp = require('mkdirp');

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

//properties
var conn;  

var config = require('../methods/webConfig');
//Connection for Local PouchDB Database
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
var db = new PouchDB('IMS');

// Get encrypt string
module.exports.encrypt = function(text) {
	var cipher = crypto.createDecipheriv(algorithm,password)
  	var crypted = cipher.update(text,'utf8','hex')
  	crypted += cipher.final('hex');
  	return crypted;
}

// Get decrypt string
module.exports.decrypt = function(text) {
  var decipher = crypto.createDecipheriv(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
};

// Generate Random String
module.exports.generateRandomString = function() {
  var token = crypto.randomBytes(4).toString('hex');
  return token;
};

// Get data call from database
exports.GetDataSet = function(values){
	return new Promise(resolve => { 		
		var result = db.find({
			  selector: values,
			//   fields: ['name', 'table', '_id'],
			});
		resolve(result);			
})};

// Get data call from database
exports.SaveDataSet = function(values){
	return new Promise(resolve => { 
		// WHEN ADDING PRODUCT		
		if (values._id == 0) {
			var product = {
				_id: new Date().toISOString(),
				table: 'tProduct',
				name: values.name,
				price: values.price,
				details: values.details,	  
				brand: values.brand,	  
			  };			
			  var result = db.put(product).then(function (response) {
				return response
			  })
			  
		}
		// WHEN UPDATE EXISTING PRODUCT DETAILS 
		else {
			var result = db.get(values._id).then(function (doc) {
				doc.price = values.price;
				doc.brand = values.brand;
				doc.name = values.name;
				doc.details = values.details;
				doc.table = values.table;
				return db.put(doc);
			  });
		}		
		resolve(result);			
})};


// DELETE DATA 
exports.DeleteDataSet = function(values){
	return new Promise(resolve => { 
		// console.log(values._id);		
			var result = db.get(values._id).then(function (doc) {				
				return db.remove(doc._id, doc._rev);
			  }).catch(function (err) {
				return err;
			  });
			  console.log(result);	
		resolve(result);
})};


