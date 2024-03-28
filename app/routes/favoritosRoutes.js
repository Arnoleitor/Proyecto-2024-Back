const express = require('express');
const router = express.Router();
const { anadirFavorito } = require('../controllers/favoritosController');

router.post('/usuarios/:idUsuario/favoritos/:idProducto', anadirFavorito);

module.exports = router;
