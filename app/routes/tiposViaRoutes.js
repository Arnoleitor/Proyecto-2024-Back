const express = require('express');
const router = express.Router();
const tiposViaController = require('../controllers/tiposViaController'); 

router.get('/tiposdevias', tiposViaController.obtenerTiposDeVias);

module.exports = router;
