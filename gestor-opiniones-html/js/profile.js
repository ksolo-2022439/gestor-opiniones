const API_URL = 'http://localhost:3000/gestorOpiniones/v1/users';
const token = localStorage.getItem('token');
const uid = localStorage.getItem('uid');
const alertBox = document.getElementById('profile-alert');

if (!token) window.location.href = 'index.html';

document.getElementById('profileUsername').value = localStorage.getItem('username') || '';

document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('profileName').value;
    const surname = document.getElementById('profileSurname').value;
    const username = document.getElementById('profileUsername').value;

    const body = {};
    if (name) body.name = name;
    if (surname) body.surname = surname;
    if (username) body.username = username;

    try {
        const response = await fetch(`${API_URL}/${uid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (response.ok) {
            showAlert('success', 'Datos actualizados correctamente');
            if (username) localStorage.setItem('username', username);
        } else {
            showAlert('danger', data.msg || 'Error al actualizar');
        }
    } catch (error) {
        console.error(error);
        showAlert('danger', 'Error de conexión');
    }
});

document.getElementById('passwordForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const oldPassword = document.getElementById('oldPassword').value;
    const password = document.getElementById('newPassword').value;

    try {
        const response = await fetch(`${API_URL}/${uid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify({ oldPassword, password })
        });

        const data = await response.json();

        if (response.ok) {
            showAlert('success', 'Contraseña actualizada. Por favor inicia sesión de nuevo.');
            setTimeout(() => {
                localStorage.clear();
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showAlert('danger', data.msg || 'La contraseña anterior no es correcta');
        }
    } catch (error) {
        console.error(error);
        showAlert('danger', 'Error de conexión');
    }
});

function showAlert(type, msg) {
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = msg;
    alertBox.classList.remove('d-none');
}