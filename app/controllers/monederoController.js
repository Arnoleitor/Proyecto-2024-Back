const User = require('../models/users');

const agregarDineroMonedero = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
// Actualiza el monedero del usuario
        user.monedero += req.body.monedero;
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMonedero = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ monedero: user.monedero });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const putMonedero = async (req, res) => {
    try {
        const { userId } = req.params;
        const { totalPedido } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        if (user.monedero < totalPedido) {
            return res.status(400).json({ error: 'Saldo insuficiente en el monedero' });
        }

        user.monedero -= totalPedido;
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { agregarDineroMonedero, getMonedero, putMonedero };
