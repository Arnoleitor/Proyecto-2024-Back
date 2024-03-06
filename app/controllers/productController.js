const Producto = require('../models/productModel');

const postProducto = async (req, res) => {
    try {
      const newProducto = new Producto(req.body);
      await newProducto.save();
      res.json(newProducto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
 
  const getProductosPorTipo = async (req, res) => {
    try {
        const tipoProducto = req.params.tipo;
        const productosPorTipo = await Producto.find({ tipo: tipoProducto });
        res.json(productosPorTipo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { postProducto, getProductosPorTipo };