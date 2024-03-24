const Contacto = require('../models/contactoModel');

const getContacto = async (req, res) => {
    try {
      const contacto = await Contacto.find();
      res.json(contacto);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  const postContacto = async (req, res) => {
    try {
      const { nombre, email, mensaje } = req.body;
      const newContacto = new Contacto({nombre, email, mensaje});
      await newContacto.save();
      res.json(newContacto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = { getContacto, postContacto };