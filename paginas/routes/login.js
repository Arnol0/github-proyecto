const express = require('express');
const router = express.Router();
const User = require('../../models/User'); // Asegúrate de que la ruta hacia el modelo es correcta
const bcryptjs = require('bcryptjs');

// Ruta para manejar el inicio de sesión
router.post('/', async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        // Buscar al usuario en la base de datos por su correo
        const user = await User.findOne({ correo });

        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si la contraseña es correcta
        const isMatch = await bcryptjs.compare(contraseña, user.contraseña);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Si la autenticación es correcta, responde con éxito
        res.json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

module.exports = router;
