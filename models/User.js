// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true }, // Asegúrate de que el correo sea único
    contraseña: { type: String, required: true } // Esta propiedad debe coincidir con el nombre en el registro
});

const User = mongoose.model('User', userSchema);
module.exports = User;
