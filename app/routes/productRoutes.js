const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/agregarproducto', productController.postProducto);
router.get('/productosPorTipo/:tipo', productController.getProductosPorTipo);

module.exports = router;
