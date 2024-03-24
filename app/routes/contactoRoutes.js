const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoController');

router.get('/getcontacto', contactoController.getContacto);
router.post('/postcontacto', contactoController.postContacto);

module.exports = router;
