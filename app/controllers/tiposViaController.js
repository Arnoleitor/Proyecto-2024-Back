const TipoVia = require('../models/tipoViaModel');

const obtenerTiposDeVias = async (req, res) => {
  try {
    const tiposDeVias = await TipoVia.find();
    res.json(tiposDeVias);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { obtenerTiposDeVias };