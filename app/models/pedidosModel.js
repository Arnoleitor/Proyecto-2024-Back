const mongoose = require('mongoose');

const pedidosSchema = new mongoose.Schema({
    id: String,
    productos: [{
        id: String,
        cantidad: Number
    }],
    totalImporte: Number
});

const Pedidos = mongoose.model('pedidos', pedidosSchema);

module.exports = Pedidos;
