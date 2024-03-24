const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
  nombre:String,
  email:String,
  mensaje:String,
});

const Contacto = mongoose.model('contacto', contactoSchema);

module.exports = Contacto;
