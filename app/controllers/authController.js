const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');


const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, Roles: 2 });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ userId: user._id, role: user.Roles, nombre: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({ token, role: user.Roles, nombre: user.username, email: user.email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { register, login };
