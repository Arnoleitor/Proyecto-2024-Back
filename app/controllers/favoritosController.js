const User = require('../models/users');
const Producto = require('../models/productModel');

const anadirFavorito = async (req, res) => {
    try {
        const { idUsuario, idProducto } = req.params;

        const cleanIdProducto = idProducto.trim();

        const usuario = await User.findById(idUsuario);
        const producto = await Producto.findById(cleanIdProducto);

        if (!usuario || !producto) {
            return res.status(404).json({ error: 'Usuario o producto no encontrado' });
        }

        // Verifica si el producto ya está en la lista de favoritos del usuario
        const existente = usuario.productosFavoritos.find(favorito => String(favorito._id) === cleanIdProducto);
        if (existente) {
            return res.status(400).json({ error: 'El producto ya está en la lista de favoritos del usuario' });
        }

        usuario.productosFavoritos.push({
            _id: producto._id,
            descripcion: producto.descripcion,
            precio: producto.precio,
            imagen:producto.imagen
        });

        await usuario.save();
        
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al añadir favorito' });
    }
};

module.exports = { anadirFavorito };
