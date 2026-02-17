const API_URL = 'http://localhost:3000/gestorOpiniones/v1';
const token = localStorage.getItem('token');
const uid = localStorage.getItem('uid');
const username = localStorage.getItem('username');

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

if (!token || !postId) window.location.href = 'index.html';

document.getElementById('nav-username').textContent = username;

const loadPostDetail = async () => {
    try {
        const response = await fetch(`${API_URL}/posts`, { headers: { 'x-token': token } });
        const data = await response.json();
        const post = data.posts.find(p => p._id === postId);

        if (!post) {
            document.getElementById('post-detail-container').innerHTML = '<div class="alert alert-danger">Publicación no encontrada</div>';
            return;
        }

        const html = `
            <div class="card border-0 shadow-lg">
                <div class="card-body p-5">
                    <div class="mb-3">
                        <span class="badge bg-primary">${post.category}</span>
                        <small class="text-muted ms-2">Publicado por <strong>${post.author.username}</strong></small>
                    </div>
                    <h1 class="card-title fw-bold mb-4 display-6">${post.title}</h1>
                    <p class="card-text fs-5 text-secondary" style="line-height: 1.8;">${post.content}</p>
                </div>
            </div>
        `;
        document.getElementById('post-detail-container').innerHTML = html;

        loadComments();

    } catch (error) {
        console.error(error);
    }
};

const loadComments = async () => {
    const container = document.getElementById('comments-container');
    container.innerHTML = '<div class="text-center"><div class="spinner-border spinner-border-sm"></div></div>';

    try {
        const response = await fetch(`${API_URL}/comments/${postId}`, {
            headers: { 'x-token': token }
        });
        const data = await response.json();

        container.innerHTML = '';

        if (!data.comments || data.comments.length === 0) {
            container.innerHTML = '<p class="text-muted text-center mt-4">Sé el primero en opinar.</p>';
            return;
        }

        data.comments.forEach(comment => {
            const authorId = comment.author.uid || comment.author._id;
            const isMyComment = authorId === uid;

            const html = `
        <div class="d-flex mb-4">
            <div class="flex-shrink-0">
                <div class="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                    ${comment.author.username.charAt(0).toUpperCase()}
                </div>
            </div>
            <div class="flex-grow-1 ms-3">
                <div class="bg-white p-3 rounded shadow-sm border position-relative">
                    
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <h6 class="fw-bold mb-0">${comment.author.username}</h6>
                        
                        ${isMyComment ? `
                            <div class="dropdown">
                                <button class="btn btn-link text-muted p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-three-dots-vertical"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end shadow">
                                    <li><a class="dropdown-item" href="#" onclick="openEditModal('${comment._id}', '${comment.content}')">Editar</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item text-danger" href="#" onclick="deleteComment('${comment._id}')">Eliminar</a></li>
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                    
                    <p class="mb-0 text-secondary">${comment.content}</p>
                </div>
            </div>
        </div>
    `;
            container.innerHTML += html;
        });

    } catch (error) {
        console.error(error);
    }
};

document.getElementById('commentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = document.getElementById('newCommentContent').value;

    try {
        const response = await fetch(`${API_URL}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify({ content, post: postId })
        });

        if (response.ok) {
            document.getElementById('newCommentContent').value = '';
            loadComments();
        } else {
            alert('Error al publicar comentario');
        }
    } catch (error) {
        console.error(error);
    }
});

window.deleteComment = async (commentId) => {
    if (!confirm('¿Eliminar tu comentario?')) return;

    try {
        const response = await fetch(`${API_URL}/comments/${commentId}`, {
            method: 'DELETE',
            headers: { 'x-token': token }
        });

        if (response.ok) {
            loadComments();
        } else {
            alert('No puedes eliminar este comentario');
        }
    } catch (error) {
        console.error(error);
    }
};

let editModalInstance;

window.openEditModal = (id, currentContent) => {
    document.getElementById('editCommentId').value = id;
    document.getElementById('editCommentContent').value = currentContent;

    const el = document.getElementById('editCommentModal');
    editModalInstance = new bootstrap.Modal(el);
    editModalInstance.show();
};

window.submitEditComment = async () => {
    const id = document.getElementById('editCommentId').value;
    const content = document.getElementById('editCommentContent').value;

    try {
        const response = await fetch(`${API_URL}/comments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify({ content })
        });

        if (response.ok) {
            editModalInstance.hide();
            loadComments();
        } else {
            alert('Error al editar');
        }
    } catch (error) {
        console.error(error);
    }
};

loadPostDetail();