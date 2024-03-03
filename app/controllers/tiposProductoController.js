const tiposProducto = require('../models/tiposProductoModel');

const obtenerTiposProducto = async (req, res) => {
  try {
    const tiposProductos = await tiposProducto.find();
    res.json(tiposProductos);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { obtenerTiposProducto };
