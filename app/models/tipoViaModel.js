const mongoose = require('mongoose');

const tipoViaSchema = new mongoose.Schema({
    tipo: String,
    id: Number
});

const TipoVia = mongoose.model('tiposVia', tipoViaSchema);

module.exports = TipoVia;
