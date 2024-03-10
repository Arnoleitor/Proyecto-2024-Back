const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.get('/recibirTicket', ticketController.getAllTickets);
router.get('/recibirTicketId', ticketController.getTicketsPorIdUsuario);
router.post('/nuevoTicket', ticketController.crearTicket);
router.post('/responderTicket/:_id', ticketController.responderTicket);

module.exports = router;
