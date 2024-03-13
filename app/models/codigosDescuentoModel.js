const mongoose = require('mongoose');

const codigosDescuentoSchema = new mongoose.Schema({
  codigo: String
});

const CodigosDescuento = mongoose.model('codigosdescuentos', codigosDescuentoSchema);

module.exports = CodigosDescuento;
