const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const registerRoutes = require('./routes/register'); 

const loginRoutes = require('./routes/login');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'github;proyecto')));

// Conexión a MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://72963047:cAZKWOSTxC57BxJK@cluster0.wjj7u.mongodb.net/Información?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
    .then(() => console.log('Conectado correctamente a MongoDB'))
    .catch((err) => {
        console.error('Error conectando a MongoDB:', err);
        process.exit(1);
    });

// Usar las rutas de registro
app.use('/register', registerRoutes);
app.use(express.json()); // Importante para manejar JSON
app.use('/login', loginRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
