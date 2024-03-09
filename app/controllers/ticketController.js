const Ticket = require('../models/ticketModel');

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los tickets' });
  }
};

const crearTicket = async (req, res) => {
  try {
    const { titulo, descripcion, idUsuario, fecha, estado } = req.body;
    const newTicket = new Ticket({ titulo, descripcion, idUsuario, fecha, estado });
    await newTicket.save();
    res.json(newTicket);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el ticket' });
  }
};

module.exports = { getAllTickets,  crearTicket};