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

//addAdminUser();
//showTodos();
//var result = findTodos('Test');
//console.log(result);
//addProduct('Shoes', '$50', 'Sports Shoes', 'Puma')

function addTodo(text) {	
	var todo = {
	  _id: new Date().toISOString(),
	  title: text,
	  completed: false
	};
	db.put(todo, function callback(err, result) {
	  if (!err) {
		console.log('Successfully posted a todo!');
	  }
	});
  }

  function addAdminUser(name, username, password) {	
	var adminuser = {
	  _id: new Date().toISOString(),
	  table: 'tAdminUser',
	  name: 'JBSolutions',
	  username: 'jbsolutions',
	  password: 'jb%0lutions',	  
	};
	db.put(adminuser, function callback(err, result) {
	  if (!err) {
		console.log('Successfully added user!');
	  }
	});
  }

  function addProduct(name, price, details, brand) {	
	var adminuser = {
	  _id: new Date().toISOString(),
	  table: 'tProduct',
	  name: name,
	  price: price,
	  details: details,	  
	  brand: brand,	  
	};
	db.put(adminuser, function callback(err, result) {
	  if (!err) {
		console.log('Successfully added product!');
	  }
	});
  }

function showTodos() {	
	db.allDocs({include_docs: true, descending: true}, function(err, doc) {
		console.log(doc.rows);
		//redrawTodosUI(doc.rows);
	});
}

function findTodos(searchtext) {
	return Promise.all(db.find({
		selector: {
		  title: searchtext
		}	  
	}));
}