const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Obtener todos los usuarios
router.get('/users', userController.getAllUsers);

// Obtener un usuario por ID
router.get('/users/:id', userController.getUserById);

// Crear un nuevo usuario
router.post('/users', userController.createUser);

// Eliminar un usuario por ID
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
