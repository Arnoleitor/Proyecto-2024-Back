const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  idUsuario:String,
  fecha: {
    type: Date,
    default: Date.now
},
  estado: { type: String, default: 'Abierto' },
});

const Ticket = mongoose.model('tickets', ticketSchema);

module.exports = Ticket;
