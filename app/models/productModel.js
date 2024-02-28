const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  tipo: Number,
  descripcion: String,
  precio: Number,
  imagen: Buffer,
});

const Product = mongoose.model('componentes', productSchema);

module.exports = Product;
