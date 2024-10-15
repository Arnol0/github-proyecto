const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Asegúrate de que la ruta al modelo sea correcta
const bcryptjs = require('bcryptjs');

// Ruta para manejar el inicio de sesión
router.post('/', async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        const user = await User.findOne({ correo });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcryptjs.compare(contraseña, user.contraseña);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Si todo es correcto, devolver el usuario
        res.json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;
