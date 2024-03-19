const User = require('../models/users');
const Producto = require('../models/productModel');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username email Roles direccion tipoVia monedero');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Recibir los pedidos
const getPedidos = async (req, res) => {
  try {
    const pedidos = await Order.find();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Recibir los productos
const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find({}, 'tipo descripcion precio imagen descuento tieneDescuento _id');

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

// Actualizar un Producto por ID
const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo, descripcion, precio, imagen } = req.body;

    const productoExistente = await Producto.findById(id);

    if (!productoExistente) {
      return res.status(404).json({ message: 'Producto existente no encontrado' });
    }

    productoExistente.tipo = tipo || productoExistente.tipo;
    productoExistente.descripcion = descripcion || productoExistente.descripcion;
    productoExistente.precio = precio || productoExistente.precio;

    const { thumbUrl } = imagen.file || {};

    const base64Data = thumbUrl.split(',')[1];

    productoExistente.imagen = base64Data || productoExistente.imagen;

    const productoGuardado = await productoExistente.save();

    res.json({ message: 'Producto actualizado correctamente', productoGuardado });
  } catch (error) {
    console.error('Error al actualizar Producto:', error.message);
    res.status(500).json({ error: error.message });
  }
};

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
    const { username, email, password, Roles, direccion, tipoVia } = req.body;

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
    existingUser.direccion = direccion || existingUser.direccion;
    existingUser.tipoVia = tipoVia || existingUser.tipoVia;

    // Guardar los cambios
    await existingUser.save();

    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error.message);
    res.status(500).json({ error: error.message });
  }
};



module.exports = { getUsers, getPedidos, getProductos, deleteUser, deleteProducto, updateUser, updateProducto };