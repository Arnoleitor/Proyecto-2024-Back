const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController'); 

router.get('/pedidos', pedidosController.getPedidos);
router.post('/pedidos', pedidosController.postPedidos);
router.get('/pedidosid', pedidosController.getPedidosByUserId);
router.get('/factura', pedidosController.getFactura);


module.exports = router;
