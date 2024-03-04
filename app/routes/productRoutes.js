const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Change from `register` to `postProducto`
router.post('/agregarproducto', productController.postProducto);

module.exports = router;
