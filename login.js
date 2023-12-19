
function login() {
    let username = document.getElementById('username').value;

    if (username.trim() !== '') {
        // Almacenar el nombre de usuario en el almacenamiento de sesión
        sessionStorage.setItem('username', username);

        // Redirigir a la página principal
        window.location.href = './index.html';
    } else {
        alert('Por favor, introduce un nombre de usuario válido.');
    }
}



document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        login(); // Llamar a la función login() cuando se presiona "Enter"
    }
});
