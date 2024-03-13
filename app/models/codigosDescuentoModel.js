const mongoose = require('mongoose');

const codigosDescuentoSchema = new mongoose.Schema({
  codigo: String,
  descuento: Number
});

const CodigosDescuento = mongoose.model('codigosdescuentos', codigosDescuentoSchema);

module.exports = CodigosDescuento;
