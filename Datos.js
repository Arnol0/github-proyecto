const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/nombre_de_tu_base_de_datos';

mongoose.connect(mongoURI, { usuario: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB local'))
    .catch(err => console.log('Error al conectar a MongoDB:', err));
