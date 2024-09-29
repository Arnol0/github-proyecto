document.getElementById('register_form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar el envío por defecto del formulario

    // Obtener los valores de los campos
    const nombre = document.getElementById('register-name').value;
    const correo = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Crear el objeto de datos
    const userData = {
        nombre: nombre,
        correo: correo,
        password: password
    };

    // Enviar los datos al servidor
    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Error en el registro: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Usuario registrado:', data);
        alert('Registro exitoso'); // O redirigir a otra página
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Error al registrar usuario');
    }
});