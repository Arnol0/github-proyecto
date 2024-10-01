const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');  // Usar bcryptjs para hashear contraseñas
const mongoose = require('mongoose');
const User = require('./models/User'); // Asegúrate de que el modelo está bien importado

const app = express();

// Middleware para procesar datos JSON y formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Servir archivos estáticos desde la carpeta 'paginas'
app.use(express.static(path.join(__dirname, 'paginas')));

//const mongo_uri = process.env.MONGO_URI;
    //Conexión a MongoDB
const mongo_uri = 'mongodb+srv://72963047:cAZKWOSTxC57BxJK@cluster0.wjj7u.mongodb.net/Información?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Conectado correctamente a MongoDB`))
    .catch((err) => {
        console.error('Error conectando a MongoDB:', err);
        process.exit(1); // Salir si hay error
    });

// Ruta para registrar usuario
app.post('/register', async (req, res) => {
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



app.post('/authenticate', async (req, res) => {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    try {
        // Buscar al usuario por correo
        const user = await User.findOne({ correo });
        if (!user) {
            return res.status(400).json({ message: 'El usuario no existe' });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (isMatch) {
            res.status(200).json({ message: 'Usuario autenticado correctamente' });
        } else {
            res.status(400).json({ message: 'Usuario y/o contraseña incorrecta' });
        }
    } catch (err) {
        console.error('Error en la autenticación:', err);
        res.status(500).json({ message: 'Error al autenticar al usuario' });
    }
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
