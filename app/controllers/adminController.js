const User = require('../models/users');
// const Pedido = require('../models/pedidos');
const Producto = require('../models/productModel');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username email Roles');
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

    const productosConImagenBase64 = productos.map(producto => {
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

const anadirProducto = async (req, res) => {
  try {
    const { tipo, descripcion, precio, imagenBase64 } = req.body;

    // Decodificar la imagen en base64 a Buffer
    const imagenBuffer = Buffer.from(imagenBase64, 'base64');

    // Crear un nuevo producto con la imagen en formato Buffer
    const nuevoProducto = new Producto({
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

// Eliminar un producto por ID
const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting producto with ID:', id);

    const productoEliminado = await Producto.findByIdAndDelete(id);

    if (!productoEliminado) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar Producto:', error.message);
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un usuario por ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting user with ID:', id);

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error.message);
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un usuario por ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, Roles } = req.body;

    // Verificar si el usuario existe
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar los campos del usuario
    existingUser.username = username || existingUser.username;
    existingUser.email = email || existingUser.email;
    existingUser.password = password || existingUser.password;
    existingUser.Roles = Roles || existingUser.Roles;

    // Guardar los cambios
    await existingUser.save();

    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error.message);
    res.status(500).json({ error: error.message });
  }
};



module.exports = { getUsers, getPedidos, anadirProducto, getProductos, deleteUser, deleteProducto, updateUser };