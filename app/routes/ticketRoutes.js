const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.get('/recibirTicket', ticketController.getAllTickets);
router.post('/nuevoTicket', ticketController.crearTicket);

module.exports = router;
