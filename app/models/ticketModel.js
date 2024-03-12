const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  respuesta:String,
  idUsuario:String,
  fecha: {
    type: Date,
    default: Date.now
},
fechaRespuesta: {
  type: Date,
  default: null,
},
  estado: { type: String, default: 'Abierto' },
});

const Ticket = mongoose.model('tickets', ticketSchema);

module.exports = Ticket;
