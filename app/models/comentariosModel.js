const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  comentario:String,
  idUsuario:String,
  valoracion:Number,
  idProducto:String,
  nombreUsuario:String
});

const Comentario = mongoose.model('comentarios', comentarioSchema);

module.exports = Comentario;
