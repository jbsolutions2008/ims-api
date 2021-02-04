var express = require('express');
//var app = express();
var globalfunction = require('../methods/global');
var fs = require("fs");

var functions = {

    // Admin Login
    adminLogin: function(req, res) {        
       var params = {
           table: "tAdminUser",
           username: req.body["ParamUsername"],
           password: req.body["ParamPassword"]
       }
       globalfunction.GetDataSet(params).then((data) => {           
           if (data["docs"] == "")
                res.json({ success: false, data: 'No Matching Found!!!' });
            else
                res.json({ success: true, data: data["docs"] });
        });       
    },    
    
    // Add/Edit PRODUCT details
    updateProductDetails: function(req, res) {        
        var params = {
            _id: req.body["ParamProductID"],
            name: req.body["ParamName"],
            price: req.body["ParamPrice"],
            brand: req.body["ParamBrand"],
            details: req.body["ParamDetails"],
            table: 'tProduct'          
        }        
        globalfunction.SaveDataSet(params).then((data) => {
            console.log(data["docs"]);
            if (data["docs"] == "")
                res.json({ success: false, msg: 'Got issue!!!' });
            else
                res.json({ success: true, msg: 'Saved/Updated Successfully' });
        });
       
    },


    // Get Assignment details
    getProductDetails: function(req, res) {
        var params = {
            table: "tProduct",
            _id: req.query["ParamProductID"]
        }
        globalfunction.GetDataSet(params).then((data) => {
        console.log(data["docs"])
           if (data["docs"] == "")
                res.json({ success: false, data: 'No Product Found!!!' });
            else
                res.json({ success: true, data: data["docs"] });
        });
    },


    // Get Assignment List
    getProductList: function(req, res) {
        var params = {
            table: "tProduct"
        }
        globalfunction.GetDataSet(params).then((data) => {
        
           if (data["docs"] == "")
                res.json({ success: false, data: 'No Product Found!!!' });
            else
                res.json({ success: true, data: data["docs"] });
        });
    },

    // Delete Assignments
    deleteProduct: function(req, res) {        
        var param = {
            _id: req.body["ParamProductID"]
        }
        globalfunction.DeleteDataSet(param).then((data) => {            
            if (data["docs"] == "")
                res.json({ success: false, msg: 'Got issue!!!' });
            else
                res.json({ success: true, msg: 'Deleted Successfully' });
        });
        
    },  
}

module.exports = functions;