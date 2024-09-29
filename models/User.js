const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true } // Asegúrate de que este campo esté presente
});

const User = mongoose.model('User', userSchema);

module.exports = User;