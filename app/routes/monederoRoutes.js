const express = require('express');
const router = express.Router();
const monederoController = require('../controllers/monederoController');

router.post('/monedero/:userId', monederoController.agregarDineroMonedero);
router.get('/getmonedero/:userId', monederoController.getMonedero);

module.exports = router;
