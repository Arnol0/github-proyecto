const express = require('express');
const bcrypt = require('bcryptjs'); // Asegúrate de que esto esté instalado
const User = require('../models/User'); // Ajusta la ruta según tu estructura de carpetas

const router = express.Router();

// Ruta para registrar usuario
router.post('/', async (req, res) => {
    console.log('Registro de usuario:', req.body);
    const { nombre, correo, contraseña } = req.body;

    if (!nombre || !correo || !contraseña) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    try {
        // Verificar si el correo ya está registrado
        const existingUser = await User.findOne({ correo });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Crear un nuevo usuario con la contraseña hasheada
        const newUser = new User({ nombre, correo, contraseña: hashedPassword });

        // Guardar el usuario en la base de datos
        await newUser.save();
        res.status(200).json({ message: 'Usuario registrado correctamente' });
    } catch (err) {
        console.error('Error en el registro:', err);
        res.status(500).json({ message: 'Error al registrar al usuario' });
    }
});

module.exports = router;

