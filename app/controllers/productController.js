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
  
 
// Recibir los productos por tipo
const getProductosPorTipo = async (req, res) => {
  try {
    const tipoProducto = req.params.tipo;
    const productosPorTipo = await Producto.find({ tipo: tipoProducto });

    const productosConImagenBase64 = productosPorTipo.map(producto => {
      const imagenBase64 = producto.imagen.toString('base64');
      return {
        ...producto.toObject(),
        imagen: `data:image/png;base64,${imagenBase64}`,
      };
    });

    res.status(200).json(productosConImagenBase64);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { postProducto, getProductosPorTipo };