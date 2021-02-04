var express = require('express');
var adminAction = require('../methods/adminAction');

var router = express.Router();

//ADMIN POST METHOD 
router.post('/adminLogin', adminAction.adminLogin);
router.post('/updateProductDetails', adminAction.updateProductDetails);
router.post('/deleteProduct', adminAction.deleteProduct);

//ADMIN GET METHOD 
router.get('/getProductDetails', adminAction.getProductDetails);
router.get('/getProductList', adminAction.getProductList);

module.exports = router;