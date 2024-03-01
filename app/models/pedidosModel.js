const mongoose = require('mongoose');

const pedidosSchema = new mongoose.Schema({
    idUser: String,
    productos: [{
        id: Number,
        cantidad: Number
    }],
    totalImporte: Number
});

const Pedidos = mongoose.model('pedidos', pedidosSchema);

module.exports = Pedidos;
