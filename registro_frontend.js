const express = require('express');
const router = express.Router();
const User = require('./models/User'); // Asegúrate de que la ruta sea correcta
const bcrypt = require('bcryptjs');

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    console.log('Datos recibidos:', req.body); // Verifica qué datos llegan

    // Validar que todos los campos estén presentes
    if (!nombre || !correo || !contraseña) {
        return res.status(400).json({ message: 'Faltan campos requeridos.' });
    }

    try {
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const newUser = new User({ nombre, correo, contraseña: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Error en el registro', errors: error.errors });
        } else if (error.code === 11000) {
            return res.status(400).json({ message: 'El correo ya está en uso' });
        }
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

module.exports = router;
