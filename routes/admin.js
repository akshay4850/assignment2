const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

// Like a mini Express app pluggable into the other Express app
const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

module.exports = router;
