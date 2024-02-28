const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Ver usuarios y correos
router.get('/users', adminController.getUsers);

// Ver pedidos realizados
router.get('/pedidos', adminController.getPedidos);

// Agregar productos
router.post('/add-producto', adminController.addProducto);

module.exports = router;
