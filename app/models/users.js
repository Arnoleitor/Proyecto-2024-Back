const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  Roles: Number,
  direccion: String,
  tipoVia: String,
  monedero: {
      type: Number,
      default: 0
  },
  productosFavoritos: [{
      _id: String,
      nombre: String,
      precio: Number,
      descripcion:String,
      imagen:String
  }]
});

const Users = mongoose.model('users', userSchema);

module.exports = Users;
