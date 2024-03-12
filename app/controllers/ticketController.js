const Ticket = require('../models/ticketModel');

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los tickets' });
  }
};

const getTicketsPorIdUsuario = async (req, res) => {
  try {
    const idUsuario = req.query.idUsuario;

    if (!idUsuario) {
      return res.status(400).json({ error: 'Parámetro idUsuario no proporcionado' });
    }

    const tickets = await Ticket.find({ idUsuario: { $regex: new RegExp(idUsuario, 'i') } });

    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ error: 'No se encontraron tickets para el idUsuario proporcionado' });
    }

    return res.status(200).json({ tickets });
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener los tickets por idUsuario' });
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

const responderTicket = async (req, res) => {
  try {
    const { _id } = req.params;
    const { respuesta, estado } = req.body;

    const ticketExistente = await Ticket.findById(_id);
    if (!ticketExistente) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }

    if (estado) {
      // Actualiza el estado solo si se proporciona un nuevo estado
      ticketExistente.estado = estado;
    }

    if (respuesta !== undefined) {
      // Actualiza la respuesta solo si se proporciona una nueva respuesta
      ticketExistente.respuesta = respuesta;

      // fecha de respuesta
      ticketExistente.fechaRespuesta = Date.now();
    }

    await ticketExistente.save();

    return res.json(ticketExistente);
  } catch (error) {
    console.error('Error al responder al ticket:', error);
    res.status(500).json({ error: 'Error al responder al ticket' });
  }
};


module.exports = { getAllTickets,  crearTicket, getTicketsPorIdUsuario, responderTicket };