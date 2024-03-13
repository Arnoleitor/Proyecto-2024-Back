const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  tipo: Number,
  descripcion: String,
  precio: Number,
  imagen: String,
  descuento: { type: Number, default: 0},
  tieneDescuento: { type: Boolean, default: false}
})

const Producto = mongoose.model('componentes', productSchema);

module.exports = Producto;
