const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Asegúrate de que la ruta es correcta

// Ruta para registrar usuario
router.post('/', async (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    if (!nombre || !correo || !contraseña) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    try {
        const existingUser = await User.findOne({ correo });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const newUser = new User({ nombre, correo, contraseña: hashedPassword });

        await newUser.save();
        res.status(200).json({ message: 'Usuario registrado correctamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error al registrar al usuario' });
    }
});

module.exports = router;
