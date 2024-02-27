// Carga las variables de entorno desde el archivo .env

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require('./app/routes/authRoutes');
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());
// Conexión a MongoDB utilizando la variable de entorno
mongoose.connect(process.env.DB_CONNECTION_STRING, {

});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Error al conectar con MongoDB:', error);
});

db.once('open', () => {
  console.log('Conexión a MongoDB establecida');

  // Importa las rutas de usuarios
  const userRoutes = require('./app/routes/userRoutes');

  // Usa las rutas de usuarios
  app.use('/api', userRoutes);

  // Ruta principal
  app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi aplicación!');
  });

  // Ruta Autentificación
  app.use('/auth', authRoutes);

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