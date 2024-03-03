const mongoose = require('mongoose');

const pedidosSchema = new mongoose.Schema({
    id: String,
    productos: [{
        id: String,
        cantidad: Number
    }],
    totalImporte: Number,
    fecha: {
        type: Date,
        default: Date.now
    },
    direccion: String
});

const Pedidos = mongoose.model('pedidos', pedidosSchema);

module.exports = Pedidos;
