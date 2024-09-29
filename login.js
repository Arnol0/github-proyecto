const express = require('express');
const router = express.Router();
const User = require('./models/User'); // Asegúrate de tener el modelo del usuario
const bcrypt = require('bcryptjs');

// Ruta de inicio de sesión
router.post('./login', async (req, res) => {
  const { identifier, password } = req.body; // identifier puede ser el correo o nombre de usuario

    try {
    // Buscar el usuario por correo o nombre de usuario
    const user = await User.findOne({ 
        $or: [{ correo: identifier }, { nombre: identifier }]
    });

    if (!user) {
        return res.status(400).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.contraseña);

    if (!isMatch) {
        return res.status(400).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }

    // Si todo está bien, inicia la sesión
    res.status(200).json({ mensaje: 'Inicio de sesión exitoso', user });
    } catch (error) {
    res.status(500).json({ mensaje: 'Error del servidor', error });
    }
});

module.exports = router;
