async function handleRegister(event) {
    event.preventDefault();

    const formData = {
        nombre: document.getElementById('register-name').value,  // Cambié 'nombre' por 'register-name'
        correo: document.getElementById('register-email').value, // Cambié 'correo' por 'register-email'
        contraseña: document.getElementById('register-password').value, // Cambié 'contraseña' por 'register-password'
    };

    const response = await fetch('/register', { // Asegúrate de que la ruta es '/register'
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
        alert(data.message);  // Mensaje de éxito
    } else {
        alert(data.message || 'Error desconocido'); // Mensaje de error
    }
}

// Asignar el manejador de eventos al formulario
document.getElementById('register-form').addEventListener('submit', handleRegister); // Asignamos la función
