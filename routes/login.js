const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./models/user'); // Asegúrate de que la ruta es correcta
const router = express.Router();

router.post('/login', async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        // Busca al usuario por su correo
        const user = await User.findOne({ correo });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Imprime la contraseña ingresada y la almacenada (hasheada) para depuración
        console.log('Contraseña ingresada:', contraseña);
        console.log('Contraseña almacenada (hasheada):', user.contraseña);

        // Compara las contraseñas
        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        console.log('¿Contraseña coincide?:', isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Si todo es correcto, enviar respuesta exitosa
        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;
