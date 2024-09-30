const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const saltRounds = 10;

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true }
});

// Middleware para hashear la contraseña antes de guardar
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('contraseña')) {
        try {
            const hashedPassword = await bcryptjs.hash(this.contraseña, saltRounds);
            this.contraseña = hashedPassword;
        } catch (err) {
            return next(err);
        }
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
