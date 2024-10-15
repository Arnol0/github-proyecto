async function handleLogin(event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    const formData = {
        correo: document.getElementById('login-email').value,  // Obtiene el correo ingresado
        contraseña: document.getElementById('login-password').value, // Obtiene la contraseña ingresada
    };

    try {
        const response = await fetch('/login', { // Llamada a la ruta de inicio de sesión en el servidor
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Enviamos los datos del formulario al servidor
        });

        const data = await response.json(); // Convertimos la respuesta a JSON

        if (response.ok) {
            alert('Inicio de sesión exitoso, ' + data.user.nombre + '!'); // Muestra un mensaje si el inicio es exitoso

            setTimeout(() => {
                window.location.href = 'Estado.html'; // Redirige a la página "Estado" tras el éxito
            }, 1000); // Esperar 1 segundo antes de redirigir
        } else {
            alert(data.message || 'Error en el inicio de sesión'); // Muestra el mensaje de error
        }
    } catch (error) {
        console.error('Error en la solicitud:', error); // Muestra cualquier error en la consola
        alert('Ocurrió un error en la conexión');
    }
}

// Asignar el manejador de eventos al formulario
document.getElementById('login-form').addEventListener('submit', handleLogin); // Escucha el envío del formulario
