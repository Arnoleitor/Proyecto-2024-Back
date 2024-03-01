const Pedidos = require('../models/pedidosModel');

const getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedidos.find();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { getPedidos };