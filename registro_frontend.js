// registro_frontend.js
const express = require('express');
const router = express.Router();
const User = require('./models/User'); // Asegúrate de que la ruta sea correcta
const bcrypt = require('bcryptjs');

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    console.log('Datos recibidos:', req.body); // Verificar que los datos se reciban correctamente

    if (!nombre || !correo || !contraseña) {
        return res.status(400).json({ message: 'Faltan campos requeridos.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const newUser = new User({ nombre, correo, contraseña: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});


module.exports = router;







