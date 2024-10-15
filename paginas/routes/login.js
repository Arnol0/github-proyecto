const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/User'); // Ajusta la ruta según tu estructura de carpetas

const router = express.Router();

// Ruta para inicio de sesión
router.post('/', async (req, res) => {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    try {
        // Verificar si el usuario existe
        const user = await User.findOne({ correo });
        if (!user) {
            return res.status(400).json({ message: 'El usuario no está registrado' });
        }

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Si la contraseña coincide, devolver éxito
        res.status(200).json({ message: 'Inicio de sesión exitoso', nombre: user.nombre });
    } catch (err) {
        console.error('Error en el inicio de sesión:', err);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

module.exports = router;
