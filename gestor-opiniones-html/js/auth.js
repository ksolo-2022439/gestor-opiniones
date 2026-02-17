const API_URL = 'http://localhost:3000/gestorOpiniones/v1/auth';

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const identifier = document.getElementById('identifier').value;
        const password = document.getElementById('password').value;
        const alertError = document.getElementById('alert-error');

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ identifier, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('uid', data.user.uid);
                localStorage.setItem('username', data.user.username);
                window.location.href = 'dashboard.html';
            } else {
                alertError.textContent = data.msg || 'Error al iniciar sesión';
                alertError.classList.remove('d-none');
            }

        } catch (error) {
            console.error(error);
            alertError.textContent = 'Error de conexión con el servidor';
            alertError.classList.remove('d-none');
        }
    });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('regName').value;
        const surname = document.getElementById('regSurname').value;
        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const phone = document.getElementById('regPhone').value;
        const password = document.getElementById('regPassword').value;
        const alertBox = document.getElementById('register-alert');

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ name, surname, username, email, phone, password })
            });

            const data = await response.json();

            if (response.ok) {
                alertBox.className = 'alert alert-success';
                alertBox.textContent = '¡Registro exitoso! Redirigiendo al login...';
                alertBox.classList.remove('d-none');
                setTimeout(() => window.location.href = 'index.html', 2000);
            } else {
                const errorMsg = data.errors ? data.errors[0].msg : data.msg;
                alertBox.className = 'alert alert-danger';
                alertBox.textContent = errorMsg || 'Error en el registro';
                alertBox.classList.remove('d-none');
            }
        } catch (error) {
            console.error(error);
            alertBox.textContent = 'Error de conexión';
            alertBox.classList.remove('d-none');
        }
    });
}
