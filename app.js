const express = require('express');
const mongoose = require('mongoose');
const loginRouter = require('./login');
const registerRouter = require('./registro_frontend');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json()); // Asegúrate de que esto esté presente

// Conectar a MongoDB
mongoose.connect('mongodb+srv://72963047:cAZKWOSTxC57BxJK@cluster0.wjj7u.mongodb.net/Información?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Rutas de autenticación
app.use('/api', registerRouter); 
app.use('/api', loginRouter); // Asegúrate de que este router esté correctamente definido

app.use((req, res) => {
    res.status(404).send('Ruta no encontrada');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
