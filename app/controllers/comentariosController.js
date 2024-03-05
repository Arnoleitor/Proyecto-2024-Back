const Comentario = require('../models/comentariosModel');

const obtenerComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.find();
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const obtenerComentariosPorId = async (req, res) => {
    try {
      const { idProducto } = req.query;
  
      if (!idProducto) {
        return res.status(400).json({ error: 'La idProducto es requerida.' });
      }
      const comentarios = await Comentario.find({ idProducto });
      res.json(comentarios);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  


const agregarComentarios = async (req, res) => {
    try {
      const { idProducto, comentario, idUsuario, valoracion, nombreUsuario } = req.body;
      const comentarios = await Comentario.find({ idProducto, idUsuario });
      if(comentarios.length){
        return res.status(200).json({ error: 'Ya has valorado este producto!' });
      }
      const nuevoComentario = new Comentario({
        idProducto,
        comentario,
        idUsuario,
        valoracion,
        nombreUsuario
      });
  
      await nuevoComentario.save();
      res.json(nuevoComentario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

module.exports = { obtenerComentarios, agregarComentarios, obtenerComentariosPorId };