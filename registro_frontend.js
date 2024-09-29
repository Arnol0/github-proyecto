// registro_frontend.js
const express = require('express');
const router = express.Router();
const User = require('./models/User'); // Asegúrate de que la ruta sea correcta

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    console.log('Datos recibidos:', req.body); // Esto debería mostrar los datos en la consola
    const { nombre, correo, contraseña } = req.body;

    try {
        const nuevoUsuario = new User({ nombre, correo, contraseña });
        await nuevoUsuario.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error en el registro', error });
    }
});


module.exports = router;


