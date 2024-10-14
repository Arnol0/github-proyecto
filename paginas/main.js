async function handleRegister(event) {
    event.preventDefault();

    const formData = {
        nombre: document.getElementById('nombre').value,
        correo: document.getElementById('correo').value,
        contraseña: document.getElementById('contraseña').value,
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
document.getElementById('registerForm').addEventListener('submit', handleRegister);  
