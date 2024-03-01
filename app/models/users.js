const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    Roles: Number,
    direccion: String
});

const Users = mongoose.model('users', userSchema);

module.exports = Users;
