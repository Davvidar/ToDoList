
function login() {
    let username = document.getElementById('username').value;
    if (username.trim() !== '') {

        sessionStorage.setItem('username', username);
        window.location.href = './index.html';
    } else {
        alert('Por favor, introduce un nombre de usuario válido.');
    }
}



document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        login(); 
    }
});
