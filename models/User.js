const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const saltRounds = 10;

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/.+@.+\..+/, 'Por favor ingrese un correo electrónico válido.'] // Validación de formato
    },
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

// Método para comparar la contraseña
userSchema.methods.comparePassword = async function (password) {
    return await bcryptjs.compare(password, this.contraseña);
};

module.exports = mongoose.model('User', userSchema);
