const express = require('express');
const router = express.Router();
const User = require('./models/User'); // Asegúrate de que la ruta sea correcta

// Ruta para el registro
router.post('/register', async (req, res) => {
    const { nombre, correo, password } = req.body;
    try {
        const nuevoUsuario = new User({ nombre, correo, password });
        await nuevoUsuario.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error en el registro' });
    }
});

module.exports = router;