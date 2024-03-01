// pedidosRoutes.js
const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController'); 

router.get('/pedidos', pedidosController.getPedidos);

module.exports = router;
