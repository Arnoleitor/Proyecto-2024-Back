const express = require('express');
const router = express.Router();
const comentariosController = require('../controllers/comentariosController');

router.get('/comentarios', comentariosController.obtenerComentarios);
router.get('/comentariosPorId', comentariosController.obtenerComentariosPorId);
router.post('/comentarios', comentariosController.agregarComentarios);

module.exports = router;
