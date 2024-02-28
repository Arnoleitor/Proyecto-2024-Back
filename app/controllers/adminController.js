const User = require('../models/users');
const Pedido = require('../models/pedidos');
const Producto = require('../models/productos');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username email');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPedidos = async (req, res) => {
  try {
    const pedidos = await Order.find();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const anadirProducto = async (req, res) => {
};

module.exports = { getUsers, getPedidos, anadirProducto };
