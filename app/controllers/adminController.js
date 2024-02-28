const User = require('../models/users');
// const Pedido = require('../models/pedidos');
const Producto = require('../models/productModel');

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

const getProductos = async (req, res) => {
    try {
      const productos = await Producto.find({});
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

module.exports = { getProductos };

const anadirProducto = async (req, res) => {
    try {
      const { tipo, descripcion, precio, imagenBase64 } = req.body;
  
      // Decodificar la imagen en base64 a Buffer
      const imagenBuffer = Buffer.from(imagenBase64, 'base64');
  
      // Crear un nuevo producto con la imagen en formato Buffer
      const nuevoProducto = new Product({
        tipo,
        descripcion,
        precio,
        imagen: imagenBuffer,
      });
  
      // Guardar el producto en la base de datos
      await nuevoProducto.save();
  
      res.status(201).json({ mensaje: 'Producto añadido correctamente' });
    } catch (error) {
      console.error('Error al añadir producto:', error.message);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  module.exports = { getUsers, getPedidos, anadirProducto, getProductos };