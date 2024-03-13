const express = require('express');
const router = express.Router();
const codigosDescuentoController = require('../controllers/codigosDescuentoController');

router.get('/codigosDescuento', codigosDescuentoController.obtenerCodigosDescuento);


module.exports = router;
