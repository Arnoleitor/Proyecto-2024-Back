const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    Roles: Number
});

const Users = mongoose.model('users', userSchema);

module.exports = Users;
