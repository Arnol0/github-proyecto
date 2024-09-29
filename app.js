const express = require('express');
const mongoose = require('mongoose');
const loginRouter = require('./login');
const registerRouter = require('./registro');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect('mongodb+srv://72963047:cAZKWOSTxC57BxJK@cluster0.wjj7u.mongodb.net/informacion?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Rutas de autenticación
app.use('/api', loginRouter); // Asegúrate de que este router esté correctamente definido
app.use('/api', registerRouter); // Asegúrate de que este router esté correctamente definido

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

