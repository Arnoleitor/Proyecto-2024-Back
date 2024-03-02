const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  tipo: Number,
  descripcion: String,
  precio: Number,
  imagen: String,
  quantity: Number,
});

const Producto = mongoose.model('componentes', productSchema);

module.exports = Producto;
