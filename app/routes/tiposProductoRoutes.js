const express = require('express');
const router = express.Router();
const tiposProductoController = require('../controllers/tiposProductoController'); 

router.get('/tiposProducto', tiposProductoController.obtenerTiposProducto);

module.exports = router;
