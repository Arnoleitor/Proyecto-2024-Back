const mongoose = require('mongoose');

const tipoProducto = new mongoose.Schema({
    tipo: String,
    id: Number
});

const tiposProducto = mongoose.model('tipocomponentes', tipoProducto);

module.exports = tiposProducto;
