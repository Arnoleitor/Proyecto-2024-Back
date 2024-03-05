const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const authRoutes = require('./app/routes/authRoutes');
const adminRoutes = require('./app/routes/adminRoutes');
const userRoutes = require('./app/routes/userRoutes');
const tiposViasRoutes = require('./app/routes/tiposViaRoutes');
const pedidosRoutes = require('./app/routes/pedidosRoutes');
const tiposProductoRoutes = require('./app/routes/tiposProductoRoutes');
const productRoutes = require('./app/routes/productRoutes');
const comentariosRoutes = require('./app/routes/comentariosRoutes');

// Configuración del límite de tamaño a 10 MB
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
dotenv.config();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB utilizando la variable de entorno
mongoose.connect(process.env.DB_CONNECTION_STRING, {});

const db = mongoose.connection;

  db.on('error', (error) => {
    console.error('Error al conectar con MongoDB:', error);
  });

  db.once('open', () => {
    console.log('Conexión a MongoDB establecida');

  // Ruta principal
  app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi aplicación!');
  });

  // Usa las rutas de usuarios
  app.use('/api/users', userRoutes);

  // Usa las rutas de admin bajo /api
  app.use('/api', adminRoutes);

  // Ruta Autentificación
  app.use('/auth', authRoutes);

  //Ruta tipos de via
  app.use('/api', tiposViasRoutes);

  //Ruta Pedidos
  app.use('/api', pedidosRoutes);

  // Ruta tipos de producto
  app.use('/api', tiposProductoRoutes);

  // Ruta de producto
  app.use('/api', productRoutes);

  // Ruta de comentarios
  app.use('/api', comentariosRoutes);

  // Middleware para manejo de errores
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Hubo un error en el servidor' });
  });

  // Inicia el servidor
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
   });
  });

  // Manejar SIGINT
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Conexión a MongoDB cerrada');
      server.close(() => {
        console.log('Servidor detenido');
        process.exit(0);
      });
    });
  });
