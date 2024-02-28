const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Ver usuarios y correos
router.get('/users', adminController.getUsers);

// Ver pedidos realizados
router.get('/pedidos', adminController.getPedidos);

// Agregar productos
router.post('/anadirProducto', adminController.anadirProducto);

// Recibir productos
router.get('/recibirProducto', adminController.getProductos);

module.exports = router;
