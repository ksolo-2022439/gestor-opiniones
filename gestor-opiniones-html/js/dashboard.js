const API_URL = 'http://localhost:3000/gestorOpiniones/v1';
const token = localStorage.getItem('token');
const uid = localStorage.getItem('uid');

if (!token) {
    window.location.href = 'index.html';
}

document.getElementById('nav-username').textContent = localStorage.getItem('username');

const loadPosts = async () => {
    const container = document.getElementById('posts-container');

    try {
        const response = await fetch(`${API_URL}/posts`, {
            headers: { 'x-token': token }
        });
        const data = await response.json();

        container.innerHTML = '';

        if (data.posts.length === 0) {
            container.innerHTML = '<p class="text-center text-muted">No hay publicaciones aún.</p>';
            return;
        }

        data.posts.forEach(post => {

            const authorId = post.author.uid || post.author._id || post.author;
            const isMyPost = authorId === uid;

            const card = `
        <div class="col-md-6 mb-4">
            <div class="card card-post shadow-sm h-100 bg-white">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="card-title fw-bold text-dark">${post.title}</h5>
                        <span class="badge bg-light text-primary border">${post.category}</span>
                    </div>
                    <h6 class="card-subtitle mb-3 text-muted" style="font-size: 0.9rem;">
                        <i class="bi bi-person-circle"></i> ${post.author.username || 'Anónimo'}
                    </h6>
                    <p class="card-text text-secondary">${post.content}</p>

                    <a href="post.html?id=${post._id}" class="btn btn-outline-primary w-100 mt-2">
                        <i class="bi bi-chat-left-text"></i> Ver Opiniones
                    </a>
                </div>

                ${isMyPost ? `
                <div class="card-footer bg-transparent border-0 d-flex justify-content-end pb-3">
                    <button class="btn btn-sm btn-outline-secondary me-2" onclick="editPost('${post._id}')">Editar</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deletePost('${post._id}')">Eliminar</button>
                </div>
                ` : ''}
            </div>
        </div>
    `;
            container.innerHTML += card;
        });


    } catch (error) {
        console.error(error);
        container.innerHTML = '<div class="alert alert-danger">Error cargando publicaciones</div>';
    }
};

document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('postTitle').value;
    const category = document.getElementById('postCategory').value;
    const content = document.getElementById('postContent').value;

    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify({ title, category, content })
        });

        if (response.ok) {
            window.location.reload();
        } else {
            alert('Error al crear publicación');
        }
    } catch (error) {
        console.error(error);
    }
});

window.deletePost = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta opinión?')) return;

    try {
        const response = await fetch(`${API_URL}/posts/${id}`, {
            method: 'DELETE',
            headers: { 'x-token': token }
        });

        if (response.ok) {
            window.location.reload();
        } else {
            alert('No se pudo eliminar');
        }
    } catch (error) {
        console.error(error);
    }
};

window.editPost = (id) => {
    alert('Funcionalidad de edición pendiente de implementar modal. ID: ' + id);
};

window.logout = () => {
    localStorage.clear();
    window.location.href = 'index.html';
};

loadPosts();