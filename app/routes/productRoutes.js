const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/agregarproducto', productController.postProducto);

module.exports = router;
