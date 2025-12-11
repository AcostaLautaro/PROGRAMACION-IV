const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta de productos - CORREGIDA
router.get('/products', productController.getProducts);

// Ruta opcional para producto por ID (también protegida)
router.get('/products/:id', productController.getProductById);

module.exports = router;