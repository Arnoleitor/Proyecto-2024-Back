const CodigosDescuento = require('../models/codigosDescuentoModel');

const obtenerCodigosDescuento = async (req, res) => {
  try {
    const codigosDescuento = await CodigosDescuento.find();
    res.json(codigosDescuento);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { obtenerCodigosDescuento };